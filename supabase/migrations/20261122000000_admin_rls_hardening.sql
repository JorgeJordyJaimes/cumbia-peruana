-- ============================================================================
-- ENDURECIMIENTO DE RLS: ADMINISTRADOR REAL, NO CUALQUIER USUARIO AUTENTICADO
-- ============================================================================
-- Contexto: el registro público de Supabase Auth está abierto y las políticas
-- anteriores concedían INSERT/UPDATE/DELETE a cualquier usuario autenticado.
-- Esta migración introduce una comprobación única de administrador y la aplica
-- a todas las mutaciones del catálogo, del CMS editorial y del bucket `media`.
-- ============================================================================

-- 1. Función canónica de administrador.
--    Acepta el rol `admin` en app_metadata o el correo propietario.
--    Si se cambia ADMIN_EMAIL en el entorno, actualizar también este valor
--    o asignar app_metadata.role = 'admin' al usuario de Supabase Auth.
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
AS $$
  SELECT COALESCE(
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
    OR lower(auth.jwt() ->> 'email') = lower('soundkumbia@gmail.com'),
    false
  );
$$;

COMMENT ON FUNCTION public.is_admin() IS
  'Retorna true solo para el administrador editorial autorizado.';

REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC;
-- anon debe poder evaluar la función en las políticas de lectura pública;
-- para un visitante siempre devuelve false.
GRANT EXECUTE ON FUNCTION public.is_admin() TO anon, authenticated;

-- 2. Defensa en profundidad: el rol anónimo no necesita mutaciones.
REVOKE INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public FROM anon;
ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE INSERT, UPDATE, DELETE ON TABLES FROM anon;

-- 3. Catálogo fonográfico.
DROP POLICY IF EXISTS "Permitir insertar albumes a autenticados" ON albumes;
DROP POLICY IF EXISTS "Permitir actualizar albumes a usuarios autenticados" ON albumes;
DROP POLICY IF EXISTS "Permitir eliminar albumes a autenticados" ON albumes;
CREATE POLICY "Albumes solo admin" ON albumes
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Permitir insertar grupos a autenticados" ON grupos;
DROP POLICY IF EXISTS "Permitir actualizar grupos a usuarios autenticados" ON grupos;
DROP POLICY IF EXISTS "Permitir eliminar grupos a autenticados" ON grupos;
CREATE POLICY "Grupos solo admin" ON grupos
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Permitir insertar personas a autenticados" ON personas;
DROP POLICY IF EXISTS "Permitir actualizar personas a usuarios autenticados" ON personas;
DROP POLICY IF EXISTS "Permitir eliminar personas a autenticados" ON personas;
CREATE POLICY "Personas solo admin" ON personas
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Permitir insertar sellos a autenticados" ON sellos_discograficos;
DROP POLICY IF EXISTS "Permitir actualizar sellos a usuarios autenticados" ON sellos_discograficos;
DROP POLICY IF EXISTS "Permitir eliminar sellos a autenticados" ON sellos_discograficos;
CREATE POLICY "Sellos solo admin" ON sellos_discograficos
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Permitir insertar temas a autenticados" ON temas;
DROP POLICY IF EXISTS "Permitir actualizar temas a autenticados" ON temas;
DROP POLICY IF EXISTS "Permitir eliminar temas a autenticados" ON temas;
CREATE POLICY "Temas solo admin" ON temas
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Modificacion autenticada mosaicos_temas" ON mosaicos_temas;
CREATE POLICY "Mosaicos solo admin" ON mosaicos_temas
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- 4. CMS editorial y configuración de portada.
DROP POLICY IF EXISTS "Escritura articulos autenticados" ON articulos;
CREATE POLICY "Articulos solo admin" ON articulos
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Escritura configuracion_home autenticados" ON configuracion_home;
CREATE POLICY "Configuracion home solo admin" ON configuracion_home
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Escritura informes_personas autenticados" ON informes_personas;
CREATE POLICY "Informes solo admin" ON informes_personas
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Escritura grupo_historias autenticados" ON grupo_historias;
CREATE POLICY "Grupo historias solo admin" ON grupo_historias
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Escritura grupo_etapas autenticados" ON grupo_etapas;
CREATE POLICY "Grupo etapas solo admin" ON grupo_etapas
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Escritura radar_hallazgos autenticados" ON radar_hallazgos;
CREATE POLICY "Radar solo admin" ON radar_hallazgos
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Escritura legajo_bloques autenticados" ON legajo_bloques;
CREATE POLICY "Legajo solo admin" ON legajo_bloques
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- 5. Storage: solo el administrador puede mutar el bucket `media`.
DROP POLICY IF EXISTS "Subida de archivos en media para autenticados" ON storage.objects;
CREATE POLICY "Subida de archivos en media para admin"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'media' AND public.is_admin());

DROP POLICY IF EXISTS "Actualización de archivos en media para autenticados" ON storage.objects;
CREATE POLICY "Actualización de archivos en media para admin"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'media' AND public.is_admin());

DROP POLICY IF EXISTS "Eliminación de archivos en media para autenticados" ON storage.objects;
CREATE POLICY "Eliminación de archivos en media para admin"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'media' AND public.is_admin());

-- ============================================================================
-- NOTA OPERATIVA
-- 1. Aplicar esta migración antes de exponer el panel en producción.
-- 2. Deshabilitar el registro público en Supabase Auth:
--    Authentication > Providers > Email > "Enable sign ups" = OFF.
-- 3. Si el propietario cambia de correo, asignar app_metadata.role = 'admin'
--    al usuario de Supabase Auth o actualizar el correo de esta función.
-- ============================================================================
