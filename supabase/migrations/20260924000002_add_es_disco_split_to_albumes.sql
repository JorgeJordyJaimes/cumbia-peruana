-- ============================================================
-- MIGRACIÓN: AGREGAR COLUMNA es_disco_split A LA TABLA Albumes
-- Soporte para singles de 45 RPM compartidos por lados (Splits)
-- ============================================================

ALTER TABLE Albumes
ADD COLUMN IF NOT EXISTS es_disco_split BOOLEAN DEFAULT FALSE;

-- Índice para optimizar filtrado de discos split
CREATE INDEX IF NOT EXISTS idx_albumes_es_disco_split ON Albumes(es_disco_split);

-- Comentario explicativo
COMMENT ON COLUMN Albumes.es_disco_split IS 'Indica si el disco de 45 RPM es un split (Lado A y Lado B pertenecen a agrupaciones diferentes)';
