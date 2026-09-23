-- ============================================================
-- MIGRACIÓN: SOPORTE PARA RECOPILATORIOS DE VARIOS ARTISTAS
-- Y TRAZABILIDAD DE PROCEDENCIA DE PISTAS (ÁLBUM ORIGEN)
-- ============================================================

-- 1. Mejora en tabla Albumes: Distinción explícita de recopilatorios de varios artistas / disquera
ALTER TABLE Albumes
ADD COLUMN IF NOT EXISTS es_varios_artistas BOOLEAN DEFAULT FALSE;

-- 2. Mejora en tabla Albumes_Temas: Trazabilidad de origen y grabaciones inéditas por pista
ALTER TABLE Albumes_Temas
ADD COLUMN IF NOT EXISTS id_album_origen INT REFERENCES Albumes(id_album) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS es_grabacion_inedita BOOLEAN DEFAULT FALSE;

-- 3. Índices para optimizar consultas de procedencia y catálogo
CREATE INDEX IF NOT EXISTS idx_albumes_varios_artistas ON Albumes(es_varios_artistas);
CREATE INDEX IF NOT EXISTS idx_albumes_temas_album_origen ON Albumes_Temas(id_album_origen);
