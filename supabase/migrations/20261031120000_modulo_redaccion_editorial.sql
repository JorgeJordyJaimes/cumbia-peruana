-- ============================================================
-- MIGRACIÓN: MÓDULO DE REDACCIÓN EDITORIAL Y ESPACIOS DE ESCRITURA
-- ============================================================

-- 1. INFORMES PERICIALES DE MÚSICOS (1 a 1 con Personas)
CREATE TABLE IF NOT EXISTS informes_personas (
  id_persona INT PRIMARY KEY REFERENCES personas(id_persona) ON DELETE CASCADE,
  contenido_md TEXT NOT NULL DEFAULT '',
  sello_verificacion TEXT NOT NULL DEFAULT 'SIN_VERIFICAR', -- 'PRIMARIA', 'SECUNDARIA', 'SIN_VERIFICAR'
  fuentes JSONB NOT NULL DEFAULT '[]'::jsonb,
  estado TEXT NOT NULL DEFAULT 'borrador', -- 'borrador', 'publicado'
  publish_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE informes_personas ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Lectura informes_personas" ON informes_personas;
CREATE POLICY "Lectura informes_personas" ON informes_personas
  FOR SELECT
  USING (
    (estado = 'publicado' AND (publish_at IS NULL OR publish_at <= now()))
    OR auth.role() = 'authenticated'
  );

DROP POLICY IF EXISTS "Escritura informes_personas autenticados" ON informes_personas;
CREATE POLICY "Escritura informes_personas autenticados" ON informes_personas
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 2. HISTORIA GENERAL DE AGRUPACIONES (1 a 1 con Grupos)
CREATE TABLE IF NOT EXISTS grupo_historias (
  id_grupo INT PRIMARY KEY REFERENCES grupos(id_grupo) ON DELETE CASCADE,
  contenido_md TEXT NOT NULL DEFAULT '',
  fuentes JSONB NOT NULL DEFAULT '[]'::jsonb,
  estado TEXT NOT NULL DEFAULT 'borrador',
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE grupo_historias ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Lectura grupo_historias" ON grupo_historias;
CREATE POLICY "Lectura grupo_historias" ON grupo_historias
  FOR SELECT
  USING (estado = 'publicado' OR auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Escritura grupo_historias autenticados" ON grupo_historias;
CREATE POLICY "Escritura grupo_historias autenticados" ON grupo_historias
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 3. ETAPAS CRONOLÓGICAS DE AGRUPACIONES (N a 1 con Grupos)
CREATE TABLE IF NOT EXISTS grupo_etapas (
  id_etapa SERIAL PRIMARY KEY,
  id_grupo INT NOT NULL REFERENCES grupos(id_grupo) ON DELETE CASCADE,
  orden INT NOT NULL DEFAULT 1,
  fecha_inicio TEXT,
  fecha_fin TEXT,
  titulo TEXT NOT NULL,
  id_director INT REFERENCES personas(id_persona) ON DELETE SET NULL,
  id_vocalista INT REFERENCES personas(id_persona) ON DELETE SET NULL,
  estilo TEXT,
  texto_md TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE grupo_etapas ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Lectura grupo_etapas" ON grupo_etapas;
CREATE POLICY "Lectura grupo_etapas" ON grupo_etapas
  FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Escritura grupo_etapas autenticados" ON grupo_etapas;
CREATE POLICY "Escritura grupo_etapas autenticados" ON grupo_etapas
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 4. RADAR Y HALLAZGOS MENSUALES
CREATE TABLE IF NOT EXISTS radar_hallazgos (
  mes TEXT PRIMARY KEY, -- formato 'YYYY-MM'
  año INT NOT NULL,
  nombre_mes TEXT NOT NULL,
  categoria TEXT NOT NULL, -- 'Álbum del Mes', 'Voz Rescatada', 'Agrupación Olvidada', 'Subgénero a Descubrir'
  titulo TEXT NOT NULL,
  subtitulo TEXT,
  artista TEXT NOT NULL,
  año_grabacion INT,
  sello TEXT,
  por_que_importa_md TEXT NOT NULL,
  portada_url TEXT,
  url_youtube TEXT,
  url_spotify TEXT,
  destino_tipo TEXT NOT NULL DEFAULT 'vinilo', -- 'vinilo', 'informe', 'genealogia'
  destino_url TEXT,
  estado TEXT NOT NULL DEFAULT 'borrador', -- 'borrador', 'publicado'
  publish_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE radar_hallazgos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Lectura radar_hallazgos" ON radar_hallazgos;
CREATE POLICY "Lectura radar_hallazgos" ON radar_hallazgos
  FOR SELECT
  USING (
    (estado = 'publicado' AND (publish_at IS NULL OR publish_at <= now()))
    OR auth.role() = 'authenticated'
  );

DROP POLICY IF EXISTS "Escritura radar_hallazgos autenticados" ON radar_hallazgos;
CREATE POLICY "Escritura radar_hallazgos autenticados" ON radar_hallazgos
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 5. BLOQUES INSTITUCIONALES DE LEGAJO
CREATE TABLE IF NOT EXISTS legajo_bloques (
  clave TEXT PRIMARY KEY, -- 'acta_fundacional', 'equipo_peritaje', 'normas_catalogacion', 'solicitud_rectificacion', 'contacto_canales'
  titulo TEXT NOT NULL,
  contenido_md TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE legajo_bloques ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Lectura legajo_bloques" ON legajo_bloques;
CREATE POLICY "Lectura legajo_bloques" ON legajo_bloques
  FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Escritura legajo_bloques autenticados" ON legajo_bloques;
CREATE POLICY "Escritura legajo_bloques autenticados" ON legajo_bloques
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 6. COLUMNAS EDITORIALES ADICIONALES EN ARTÍCULOS
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'articulos' AND column_name = 'tipo_nota') THEN
    ALTER TABLE articulos ADD COLUMN tipo_nota TEXT DEFAULT 'cronica';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'articulos' AND column_name = 'entidades_relacionadas') THEN
    ALTER TABLE articulos ADD COLUMN entidades_relacionadas JSONB DEFAULT '[]'::jsonb;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'articulos' AND column_name = 'credito_imagen') THEN
    ALTER TABLE articulos ADD COLUMN credito_imagen TEXT;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'articulos' AND column_name = 'publish_at') THEN
    ALTER TABLE articulos ADD COLUMN publish_at TIMESTAMPTZ DEFAULT now();
  END IF;
END $$;

-- 7. CONCESIÓN DE PERMISOS
GRANT SELECT ON informes_personas TO anon, authenticated;
GRANT ALL ON informes_personas TO authenticated;

GRANT SELECT ON grupo_historias TO anon, authenticated;
GRANT ALL ON grupo_historias TO authenticated;

GRANT SELECT ON grupo_etapas TO anon, authenticated;
GRANT ALL ON grupo_etapas TO authenticated;

GRANT SELECT ON radar_hallazgos TO anon, authenticated;
GRANT ALL ON radar_hallazgos TO authenticated;

GRANT SELECT ON legajo_bloques TO anon, authenticated;
GRANT ALL ON legajo_bloques TO authenticated;
