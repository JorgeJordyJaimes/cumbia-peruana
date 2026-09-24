-- ============================================================
-- MIGRACIÓN: AGREGAR COLUMNA lados_en_lp A LA TABLA Albumes
-- Soporte para singles donde solo un lado fue incluido en LP
-- ============================================================

ALTER TABLE Albumes
ADD COLUMN IF NOT EXISTS lados_en_lp VARCHAR(20) DEFAULT NULL;

-- Restricción de comprobación para garantizar consistencia de valores
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'chk_lados_en_lp'
  ) THEN
    ALTER TABLE Albumes
    ADD CONSTRAINT chk_lados_en_lp
    CHECK (lados_en_lp IS NULL OR lados_en_lp IN ('Lado A', 'Lado B', 'Ambos'));
  END IF;
END $$;

-- Índice para optimizar consultas de coleccionistas y trazabilidad
CREATE INDEX IF NOT EXISTS idx_albumes_lados_en_lp ON Albumes(lados_en_lp);
