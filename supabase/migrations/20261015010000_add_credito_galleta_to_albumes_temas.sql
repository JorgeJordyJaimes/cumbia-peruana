-- ============================================================
-- MIGRACIÓN: CRÉDITO EN GALLETA POR FORMATO ESPECÍFICO EN ALBUMES_TEMAS
-- Preservación fonográfica de la Cumbia Peruana (1968-2005)
-- ============================================================

-- Permite almacenar el crédito impreso en la galleta física según el formato
-- (por ejemplo: 'D.R.' en el Single de 45 RPM, pero el nombre del autor en el LP).
ALTER TABLE Albumes_Temas 
ADD COLUMN IF NOT EXISTS credito_galleta TEXT DEFAULT NULL;

COMMENT ON COLUMN Albumes_Temas.credito_galleta IS 'Crédito literal impreso en la galleta física de este soporte específico (Single, LP, EP, Cassette, CD)';
