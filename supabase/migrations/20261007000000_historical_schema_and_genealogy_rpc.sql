-- ============================================================
-- MIGRACIÓN: MEJORAS HISTÓRICAS, MOSAICOS Y RPCs GENEALÓGICOS
-- Preservación fonográfica de la Cumbia Peruana (1968-2005)
-- ============================================================

-- 1. Seudónimos y Créditos Reales ("Piratería blanca / Contratos de exclusividad")
-- Permite registrar el crédito literal impreso en la galleta del vinilo
-- manteniendo la vinculación a la identidad real en Personas.
ALTER TABLE Tema_Musicos 
ADD COLUMN IF NOT EXISTS credito_como TEXT DEFAULT NULL;

ALTER TABLE Temas_Compositores 
ADD COLUMN IF NOT EXISTS credito_como TEXT DEFAULT NULL;

-- 2. Mosaicos, Popurrís y Enganchados
-- Bandera en la pista física de Albumes_Temas (un surco físico en el vinilo)
ALTER TABLE Albumes_Temas 
ADD COLUMN IF NOT EXISTS es_mosaico BOOLEAN DEFAULT FALSE;

-- Validación estricta histórica: Solo Lados A y B (1968-2005)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'chk_albumes_temas_lados_ab'
    ) THEN
        ALTER TABLE Albumes_Temas
        ADD CONSTRAINT chk_albumes_temas_lados_ab
        CHECK (lado IS NULL OR lado IN ('A', 'B'));
    END IF;
END $$;

-- Tabla relacional para desglosar los temas que componen un mosaico
CREATE TABLE IF NOT EXISTS Mosaicos_Temas (
    id_mosaico_tema SERIAL PRIMARY KEY,
    id_album_tema INT NOT NULL REFERENCES Albumes_Temas(id_album_tema) ON DELETE CASCADE,
    id_tema INT NOT NULL REFERENCES Temas(id_tema) ON DELETE CASCADE,
    orden_segmento SMALLINT NOT NULL,
    duracion_segmento_segundos INT DEFAULT NULL,
    UNIQUE (id_album_tema, orden_segmento),
    CONSTRAINT chk_orden_segmento_pos CHECK (orden_segmento > 0)
);

-- Índices de optimización relacional
CREATE INDEX IF NOT EXISTS idx_mosaicos_temas_album_tema ON Mosaicos_Temas(id_album_tema);
CREATE INDEX IF NOT EXISTS idx_mosaicos_temas_tema ON Mosaicos_Temas(id_tema);
CREATE INDEX IF NOT EXISTS idx_tema_musicos_musico ON Tema_Musicos(id_musico);
CREATE INDEX IF NOT EXISTS idx_temas_compositores_compositor ON Temas_Compositores(id_compositor);
CREATE INDEX IF NOT EXISTS idx_versiones_tema_original ON Versiones(id_tema_original);
CREATE INDEX IF NOT EXISTS idx_versiones_tema ON Versiones(id_tema);
CREATE INDEX IF NOT EXISTS idx_albumes_temas_tema ON Albumes_Temas(id_tema);
CREATE INDEX IF NOT EXISTS idx_grupos_musicos_musico ON Grupos_Musicos(id_musico);
CREATE INDEX IF NOT EXISTS idx_grupos_director ON Grupos(id_director);

-- Políticas RLS y Permisos Explícitos para Data API (PostgREST / Supabase)
ALTER TABLE Mosaicos_Temas ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Lectura publica mosaicos_temas" ON Mosaicos_Temas;
CREATE POLICY "Lectura publica mosaicos_temas" ON Mosaicos_Temas FOR SELECT USING (true);

DROP POLICY IF EXISTS "Modificacion autenticada mosaicos_temas" ON Mosaicos_Temas;
CREATE POLICY "Modificacion autenticada mosaicos_temas" ON Mosaicos_Temas
    FOR ALL TO authenticated, service_role USING (true) WITH CHECK (true);

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE Mosaicos_Temas TO anon, authenticated, service_role;
GRANT USAGE, SELECT ON SEQUENCE mosaicos_temas_id_mosaico_tema_seq TO anon, authenticated, service_role;

COMMENT ON TABLE Mosaicos_Temas IS 'Desglose de temas y compositores incluidos dentro de una pista tipo mosaico/enganchado';
COMMENT ON COLUMN Tema_Musicos.credito_como IS 'Nombre artístico o seudónimo literal acreditado en la galleta física del disco';
COMMENT ON COLUMN Temas_Compositores.credito_como IS 'Seudónimo o variación del compositor acreditado en el prensaje físico';
COMMENT ON COLUMN Albumes_Temas.es_mosaico IS 'Indica si la pista física agrupa múltiples canciones en enganchado/popurrí';

-- ============================================================
-- 3. RPC: get_genealogia_versiones(p_tema_id INT)
-- Resuelve el árbol completo de versiones/covers mediante WITH RECURSIVE
-- ============================================================
CREATE OR REPLACE FUNCTION get_genealogia_versiones(p_tema_id INT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_root_id INT;
    v_result JSONB;
BEGIN
    -- 1. Encontrar la raíz original navegando ascendentemente
    WITH RECURSIVE ancestros AS (
        SELECT id_tema, id_tema_original, 1 AS depth
        FROM Versiones
        WHERE id_tema = p_tema_id
        
        UNION ALL
        
        SELECT v.id_tema, v.id_tema_original, a.depth + 1
        FROM Versiones v
        JOIN ancestros a ON v.id_tema = a.id_tema_original
        WHERE a.depth < 20
    )
    SELECT COALESCE(
        (SELECT id_tema_original FROM ancestros ORDER BY depth DESC LIMIT 1),
        p_tema_id
    ) INTO v_root_id;

    -- 2. Resolver todo el árbol descendente desde la raíz original
    WITH RECURSIVE arbol_versiones AS (
        -- Raíz original
        SELECT 
            t.id_tema,
            CAST(NULL AS INT) AS id_tema_original,
            0 AS nivel,
            ARRAY[t.id_tema] AS camino
        FROM Temas t
        WHERE t.id_tema = v_root_id

        UNION ALL

        -- Derivaciones / covers sucesivos
        SELECT 
            v.id_tema,
            v.id_tema_original,
            av.nivel + 1 AS nivel,
            av.camino || v.id_tema
        FROM Versiones v
        JOIN arbol_versiones av ON v.id_tema_original = av.id_tema
        WHERE NOT (v.id_tema = ANY(av.camino))
          AND av.nivel < 20
    ),
    nodos_enriquecidos AS (
        SELECT 
            av.id_tema,
            av.id_tema_original,
            av.nivel,
            (av.id_tema = v_root_id) AS es_original_raiz,
            (av.id_tema = p_tema_id) AS es_tema_consultado,
            t.titulo_tema,
            t.duracion_segundos,
            t.bpm,
            t.camelot_code,
            t.musical_key,
            COALESCE(
                (
                    SELECT jsonb_agg(
                        jsonb_build_object(
                            'id_grupo', g.id_grupo,
                            'nombre_grupo', g.nombre_grupo,
                            'rol_participacion', tg.rol_participacion
                        )
                    )
                    FROM Temas_Grupos tg
                    JOIN Grupos g ON g.id_grupo = tg.id_grupo
                    WHERE tg.id_tema = av.id_tema
                ),
                '[]'::jsonb
            ) AS grupos,
            COALESCE(
                (
                    SELECT jsonb_agg(
                        jsonb_build_object(
                            'id_persona', p.id_persona,
                            'nombre', p.nombre,
                            'apodo', p.apodo,
                            'credito_como', tc.credito_como
                        )
                    )
                    FROM Temas_Compositores tc
                    JOIN Personas p ON p.id_persona = tc.id_compositor
                    WHERE tc.id_tema = av.id_tema
                ),
                '[]'::jsonb
            ) AS compositores,
            COALESCE(
                (
                    SELECT jsonb_agg(
                        jsonb_build_object(
                            'id_album', a.id_album,
                            'nombre_album', a.nombre_album,
                            'año_publicacion', a.año_publicacion,
                            'numero_catalogo', a.numero_catalogo,
                            'sello', s.nombre_sello,
                            'lado', alt.lado,
                            'pista', alt.numero_pista
                        )
                    )
                    FROM Albumes_Temas alt
                    JOIN Albumes a ON a.id_album = alt.id_album
                    LEFT JOIN Sellos_Discograficos s ON s.id_sello = a.id_sello
                    WHERE alt.id_tema = av.id_tema
                ),
                '[]'::jsonb
            ) AS prensajes
        FROM arbol_versiones av
        JOIN Temas t ON t.id_tema = av.id_tema
    )
    SELECT jsonb_build_object(
        'tema_consultado_id', p_tema_id,
        'tema_raiz_id', v_root_id,
        'total_nodos', (SELECT COUNT(*) FROM nodos_enriquecidos),
        'total_versiones', GREATEST((SELECT COUNT(*) FROM nodos_enriquecidos) - 1, 0),
        'nodos', COALESCE(
            (SELECT jsonb_agg(to_jsonb(ne.*) ORDER BY ne.nivel ASC, ne.id_tema ASC) FROM nodos_enriquecidos ne),
            '[]'::jsonb
        )
    ) INTO v_result;

    RETURN v_result;
END;
$$;

-- ============================================================
-- 4. RPC: get_arbol_genealogico(p_persona_id INT)
-- Devuelve el grafo completo de un músico (trayectoria, bandas, sesiones y temas)
-- ============================================================
CREATE OR REPLACE FUNCTION get_arbol_genealogico(p_persona_id INT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_result JSONB;
BEGIN
    SELECT jsonb_build_object(
        'persona', (
            SELECT jsonb_build_object(
                'id_persona', p.id_persona,
                'nombre', p.nombre,
                'apodo', p.apodo,
                'fecha_nacimiento', p.fecha_nacimiento,
                'lugar_nacimiento', p.lugar_nacimiento,
                'biografia', p.biografia,
                'url_foto', p.url_foto
            )
            FROM Personas p
            WHERE p.id_persona = p_persona_id
        ),
        'agrupaciones', COALESCE(
            (
                SELECT jsonb_agg(agrupacion_item)
                FROM (
                    -- Como director
                    SELECT jsonb_build_object(
                        'id_grupo', g.id_grupo,
                        'nombre_grupo', g.nombre_grupo,
                        'rol', 'Director Musical',
                        'region', g.region,
                        'fecha_formacion', g.fecha_formacion,
                        'desde', NULL::date,
                        'hasta', NULL::date,
                        'url_foto', g.url_foto
                    ) AS agrupacion_item
                    FROM Grupos g
                    WHERE g.id_director = p_persona_id

                    UNION ALL

                    -- Como integrante
                    SELECT jsonb_build_object(
                        'id_grupo', g.id_grupo,
                        'nombre_grupo', g.nombre_grupo,
                        'rol', 'Músico de Planta',
                        'region', g.region,
                        'fecha_formacion', g.fecha_formacion,
                        'desde', gm.desde,
                        'hasta', gm.hasta,
                        'url_foto', g.url_foto
                    ) AS agrupacion_item
                    FROM Grupos_Musicos gm
                    JOIN Grupos g ON g.id_grupo = gm.id_grupo
                    WHERE gm.id_musico = p_persona_id
                ) sub_grupos
            ),
            '[]'::jsonb
        ),
        'grabaciones_sesion', COALESCE(
            (
                SELECT jsonb_agg(
                    jsonb_build_object(
                        'id_tema', t.id_tema,
                        'titulo_tema', t.titulo_tema,
                        'instrumento', tm.instrumento,
                        'rol', r.nombre_rol,
                        'credito_como', tm.credito_como,
                        'grupos', COALESCE((
                            SELECT jsonb_agg(g.nombre_grupo)
                            FROM Temas_Grupos tg
                            JOIN Grupos g ON g.id_grupo = tg.id_grupo
                            WHERE tg.id_tema = t.id_tema
                        ), '[]'::jsonb),
                        'prensajes', COALESCE((
                            SELECT jsonb_agg(
                                jsonb_build_object(
                                    'id_album', a.id_album,
                                    'nombre_album', a.nombre_album,
                                    'año_publicacion', a.año_publicacion,
                                    'numero_catalogo', a.numero_catalogo,
                                    'sello', s.nombre_sello,
                                    'lado', alt.lado,
                                    'pista', alt.numero_pista
                                )
                            )
                            FROM Albumes_Temas alt
                            JOIN Albumes a ON a.id_album = alt.id_album
                            LEFT JOIN Sellos_Discograficos s ON s.id_sello = a.id_sello
                            WHERE alt.id_tema = t.id_tema
                        ), '[]'::jsonb)
                    )
                    ORDER BY t.titulo_tema
                )
                FROM Tema_Musicos tm
                JOIN Temas t ON t.id_tema = tm.id_tema
                JOIN Roles r ON r.id_rol = tm.id_rol
                WHERE tm.id_musico = p_persona_id
            ),
            '[]'::jsonb
        ),
        'composiciones', COALESCE(
            (
                SELECT jsonb_agg(
                    jsonb_build_object(
                        'id_tema', t.id_tema,
                        'titulo_tema', t.titulo_tema,
                        'credito_como', tc.credito_como,
                        'duracion_segundos', t.duracion_segundos,
                        'bpm', t.bpm,
                        'camelot_code', t.camelot_code,
                        'generos', COALESCE((
                            SELECT jsonb_agg(gen.nombre_genero)
                            FROM Temas_Generos tgen
                            JOIN Generos gen ON gen.id_genero = tgen.id_genero
                            WHERE tgen.id_tema = t.id_tema
                        ), '[]'::jsonb),
                        'interpretes', COALESCE((
                            SELECT jsonb_agg(g.nombre_grupo)
                            FROM Temas_Grupos tg
                            JOIN Grupos g ON g.id_grupo = tg.id_grupo
                            WHERE tg.id_tema = t.id_tema
                        ), '[]'::jsonb),
                        'total_versiones', (
                            SELECT COUNT(*)
                            FROM Versiones v
                            WHERE v.id_tema_original = t.id_tema
                        )
                    )
                    ORDER BY t.titulo_tema
                )
                FROM Temas_Compositores tc
                JOIN Temas t ON t.id_tema = tc.id_tema
                WHERE tc.id_compositor = p_persona_id
            ),
            '[]'::jsonb
        )
    ) INTO v_result;

    RETURN v_result;
END;
$$;

-- Concesión explícita de permisos de ejecución para Data API
GRANT EXECUTE ON FUNCTION get_genealogia_versiones(INT) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION get_arbol_genealogico(INT) TO anon, authenticated, service_role;
