-- ============================================================================
-- CIERRE DE BRECHAS DE DOMINIO
-- ============================================================================
-- 1. Refuerza INV-001 en Albumes_Grupos_Lados.
-- 2. Refuerza INV-003 con validación Camelot a nivel DDL.
-- 3. Refuerza INV-008 normalizando créditos de voz y bloqueando futuros alias.
-- 4. Valida rangos técnicos de BPM y duración.
-- ============================================================================

-- INV-001: los discos split también deben usar exclusivamente Lado A o B.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'chk_albumes_grupos_lados_ab'
  ) THEN
    ALTER TABLE Albumes_Grupos_Lados
      ADD CONSTRAINT chk_albumes_grupos_lados_ab
      CHECK (lado IN ('A', 'B'));
  END IF;
END $$;

-- INV-003: Camelot exclusivo con formato canónico 1A–12B.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'chk_temas_camelot_code'
  ) THEN
    ALTER TABLE Temas
      ADD CONSTRAINT chk_temas_camelot_code
      CHECK (camelot_code IS NULL OR camelot_code ~ '^([1-9]|1[0-2])[AB]$');
  END IF;
END $$;

-- Rangos técnicos DJ.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'chk_temas_bpm_range'
  ) THEN
    ALTER TABLE Temas
      ADD CONSTRAINT chk_temas_bpm_range
      CHECK (bpm IS NULL OR (bpm >= 50 AND bpm <= 200));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'chk_temas_duracion_positiva'
  ) THEN
    ALTER TABLE Temas
      ADD CONSTRAINT chk_temas_duracion_positiva
      CHECK (duracion_segundos IS NULL OR duracion_segundos > 0);
  END IF;
END $$;

-- INV-008: el crédito de voz es siempre NULL; el alias pertenece al compositor.
UPDATE Tema_Musicos tm
SET credito_como = NULL
FROM Personas p
WHERE tm.id_musico = p.id_persona
  AND tm.id_rol = 5
  AND tm.credito_como IS NOT NULL;

CREATE OR REPLACE FUNCTION public.fn_tema_musicos_voz_credito_null()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.id_rol = 5 THEN
    NEW.credito_como := NULL;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_tema_musicos_voz_credito_null ON Tema_Musicos;
CREATE TRIGGER trg_tema_musicos_voz_credito_null
  BEFORE INSERT OR UPDATE ON Tema_Musicos
  FOR EACH ROW EXECUTE FUNCTION public.fn_tema_musicos_voz_credito_null();

-- Los géneros también son catálogo editorial: solo el administrador los muta.
DROP POLICY IF EXISTS "Temas generos solo admin" ON Temas_Generos;
CREATE POLICY "Temas generos solo admin" ON Temas_Generos
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());
