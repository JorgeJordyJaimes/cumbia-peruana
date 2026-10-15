-- ======================================================================================================================
-- MIGRACIÓN: Eliminación de la columna musical_key en tabla Temas
-- Base de Datos: Kumbia Sound - Cumbia Peruana (1968-2005)
-- Notación armónica exclusiva: camelot_code (la notación clásica musical_key queda descartada)
-- ======================================================================================================================

ALTER TABLE public.temas DROP COLUMN IF EXISTS musical_key;

-- Actualizar función RPC get_genealogia_versiones para remover t.musical_key
CREATE OR REPLACE FUNCTION public.get_genealogia_versiones(p_tema_id integer)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
        SELECT 
            t.id_tema,
            CAST(NULL AS INT) AS id_tema_original,
            0 AS nivel,
            ARRAY[t.id_tema] AS camino
        FROM Temas t
        WHERE t.id_tema = v_root_id

        UNION ALL

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
$function$;
