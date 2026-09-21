-- ============================================================
-- MIGRACIÓN: CREACIÓN DE BUCKET 'media' Y POLÍTICAS DE ACCESO
-- ============================================================

-- 1. Crear el bucket público 'media' en storage.buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'media',
  'media',
  true,
  10485760, -- 10MB límite
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 10485760,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif'];

DROP POLICY IF EXISTS "Public read for buckets" ON storage.buckets;
CREATE POLICY "Public read for buckets" ON storage.buckets FOR SELECT USING (true);

-- 2. Políticas de Seguridad RLS en storage.objects
DROP POLICY IF EXISTS "Acceso de lectura pública para media" ON storage.objects;
CREATE POLICY "Acceso de lectura pública para media"
ON storage.objects FOR SELECT
USING (bucket_id = 'media');

DROP POLICY IF EXISTS "Subida de archivos en media para autenticados" ON storage.objects;
CREATE POLICY "Subida de archivos en media para autenticados"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'media');

DROP POLICY IF EXISTS "Actualización de archivos en media para autenticados" ON storage.objects;
CREATE POLICY "Actualización de archivos en media para autenticados"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'media');

DROP POLICY IF EXISTS "Eliminación de archivos en media para autenticados" ON storage.objects;
CREATE POLICY "Eliminación de archivos en media para autenticados"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'media');

-- 3. Habilitar actualización de registros en las tablas maestras para usuarios autenticados
DROP POLICY IF EXISTS "Permitir actualizar albumes a usuarios autenticados" ON albumes;
CREATE POLICY "Permitir actualizar albumes a usuarios autenticados"
ON albumes FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir actualizar grupos a usuarios autenticados" ON grupos;
CREATE POLICY "Permitir actualizar grupos a usuarios autenticados"
ON grupos FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir actualizar personas a usuarios autenticados" ON personas;
CREATE POLICY "Permitir actualizar personas a usuarios autenticados"
ON personas FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir actualizar sellos a usuarios autenticados" ON sellos_discograficos;
CREATE POLICY "Permitir actualizar sellos a usuarios autenticados"
ON sellos_discograficos FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);
