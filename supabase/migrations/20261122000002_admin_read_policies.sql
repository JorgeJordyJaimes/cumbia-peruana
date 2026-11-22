-- ============================================================================
-- ENDURECIMIENTO DE LECTURA EDITORIAL
-- ============================================================================
-- Las políticas originales permitían a cualquier usuario `authenticated` leer
-- borradores. Con el registro público abierto, eso expone contenido no publicado.
-- Ahora los borradores solo son visibles para public.is_admin().
-- ============================================================================

DROP POLICY IF EXISTS "Lectura articulos" ON articulos;
CREATE POLICY "Lectura articulos" ON articulos
  FOR SELECT
  USING (publicado = true OR public.is_admin());

DROP POLICY IF EXISTS "Lectura informes_personas" ON informes_personas;
CREATE POLICY "Lectura informes_personas" ON informes_personas
  FOR SELECT
  USING (
    (estado = 'publicado' AND (publish_at IS NULL OR publish_at <= now()))
    OR public.is_admin()
  );

DROP POLICY IF EXISTS "Lectura grupo_historias" ON grupo_historias;
CREATE POLICY "Lectura grupo_historias" ON grupo_historias
  FOR SELECT
  USING (estado = 'publicado' OR public.is_admin());

DROP POLICY IF EXISTS "Lectura radar_hallazgos" ON radar_hallazgos;
CREATE POLICY "Lectura radar_hallazgos" ON radar_hallazgos
  FOR SELECT
  USING (
    (estado = 'publicado' AND (publish_at IS NULL OR publish_at <= now()))
    OR public.is_admin()
  );
