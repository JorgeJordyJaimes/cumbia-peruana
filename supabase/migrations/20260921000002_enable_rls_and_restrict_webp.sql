-- ============================================================
-- MIGRACIÓN: HABILITACIÓN DE RLS EN TABLAS PÚBLICAS Y RESTRICCIÓN WEBP
-- Soluciona los avisos del Supabase Security Advisor (Splinter)
-- ============================================================

-- 1. Restringir el bucket 'media' exclusivamente al tipo MIME image/webp
UPDATE storage.buckets
SET allowed_mime_types = ARRAY['image/webp']
WHERE id = 'media';

-- 2. Habilitar Row Level Security (RLS) en todas las tablas maestras y relacionales
ALTER TABLE albumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE tipos_album ENABLE ROW LEVEL SECURITY;
ALTER TABLE grupos ENABLE ROW LEVEL SECURITY;
ALTER TABLE personas ENABLE ROW LEVEL SECURITY;
ALTER TABLE sellos_discograficos ENABLE ROW LEVEL SECURITY;
ALTER TABLE temas ENABLE ROW LEVEL SECURITY;
ALTER TABLE generos ENABLE ROW LEVEL SECURITY;
ALTER TABLE temas_compositores ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE versiones ENABLE ROW LEVEL SECURITY;
ALTER TABLE temas_grupos ENABLE ROW LEVEL SECURITY;
ALTER TABLE albumes_temas ENABLE ROW LEVEL SECURITY;
ALTER TABLE grupos_musicos ENABLE ROW LEVEL SECURITY;
ALTER TABLE tema_musicos ENABLE ROW LEVEL SECURITY;
ALTER TABLE albumes_grupos_lados ENABLE ROW LEVEL SECURITY;

-- 3. POLÍTICAS DE LECTURA PÚBLICA (SELECT)
-- Esencial: Permite que el catálogo público y visitantes sigan leyendo la información musical sin requerir login
DROP POLICY IF EXISTS "Lectura publica albumes" ON albumes;
CREATE POLICY "Lectura publica albumes" ON albumes FOR SELECT USING (true);

DROP POLICY IF EXISTS "Lectura publica tipos_album" ON tipos_album;
CREATE POLICY "Lectura publica tipos_album" ON tipos_album FOR SELECT USING (true);

DROP POLICY IF EXISTS "Lectura publica grupos" ON grupos;
CREATE POLICY "Lectura publica grupos" ON grupos FOR SELECT USING (true);

DROP POLICY IF EXISTS "Lectura publica personas" ON personas;
CREATE POLICY "Lectura publica personas" ON personas FOR SELECT USING (true);

DROP POLICY IF EXISTS "Lectura publica sellos" ON sellos_discograficos;
CREATE POLICY "Lectura publica sellos" ON sellos_discograficos FOR SELECT USING (true);

DROP POLICY IF EXISTS "Lectura publica temas" ON temas;
CREATE POLICY "Lectura publica temas" ON temas FOR SELECT USING (true);

DROP POLICY IF EXISTS "Lectura publica generos" ON generos;
CREATE POLICY "Lectura publica generos" ON generos FOR SELECT USING (true);

DROP POLICY IF EXISTS "Lectura publica temas_compositores" ON temas_compositores;
CREATE POLICY "Lectura publica temas_compositores" ON temas_compositores FOR SELECT USING (true);

DROP POLICY IF EXISTS "Lectura publica roles" ON roles;
CREATE POLICY "Lectura publica roles" ON roles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Lectura publica versiones" ON versiones;
CREATE POLICY "Lectura publica versiones" ON versiones FOR SELECT USING (true);

DROP POLICY IF EXISTS "Lectura publica temas_grupos" ON temas_grupos;
CREATE POLICY "Lectura publica temas_grupos" ON temas_grupos FOR SELECT USING (true);

DROP POLICY IF EXISTS "Lectura publica albumes_temas" ON albumes_temas;
CREATE POLICY "Lectura publica albumes_temas" ON albumes_temas FOR SELECT USING (true);

DROP POLICY IF EXISTS "Lectura publica grupos_musicos" ON grupos_musicos;
CREATE POLICY "Lectura publica grupos_musicos" ON grupos_musicos FOR SELECT USING (true);

DROP POLICY IF EXISTS "Lectura publica tema_musicos" ON tema_musicos;
CREATE POLICY "Lectura publica tema_musicos" ON tema_musicos FOR SELECT USING (true);

DROP POLICY IF EXISTS "Lectura publica albumes_grupos_lados" ON albumes_grupos_lados;
CREATE POLICY "Lectura publica albumes_grupos_lados" ON albumes_grupos_lados FOR SELECT USING (true);

-- 4. POLÍTICAS DE ESCRITURA Y MODIFICACIÓN (SOLO USUARIOS AUTENTICADOS / ADMIN)
DROP POLICY IF EXISTS "Permitir insertar albumes a autenticados" ON albumes;
CREATE POLICY "Permitir insertar albumes a autenticados" ON albumes FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir eliminar albumes a autenticados" ON albumes;
CREATE POLICY "Permitir eliminar albumes a autenticados" ON albumes FOR DELETE TO authenticated USING (true);

DROP POLICY IF EXISTS "Permitir insertar grupos a autenticados" ON grupos;
CREATE POLICY "Permitir insertar grupos a autenticados" ON grupos FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir eliminar grupos a autenticados" ON grupos;
CREATE POLICY "Permitir eliminar grupos a autenticados" ON grupos FOR DELETE TO authenticated USING (true);

DROP POLICY IF EXISTS "Permitir insertar personas a autenticados" ON personas;
CREATE POLICY "Permitir insertar personas a autenticados" ON personas FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir eliminar personas a autenticados" ON personas;
CREATE POLICY "Permitir eliminar personas a autenticados" ON personas FOR DELETE TO authenticated USING (true);

DROP POLICY IF EXISTS "Permitir insertar sellos a autenticados" ON sellos_discograficos;
CREATE POLICY "Permitir insertar sellos a autenticados" ON sellos_discograficos FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir eliminar sellos a autenticados" ON sellos_discograficos;
CREATE POLICY "Permitir eliminar sellos a autenticados" ON sellos_discograficos FOR DELETE TO authenticated USING (true);

DROP POLICY IF EXISTS "Permitir insertar temas a autenticados" ON temas;
CREATE POLICY "Permitir insertar temas a autenticados" ON temas FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir actualizar temas a autenticados" ON temas;
CREATE POLICY "Permitir actualizar temas a autenticados" ON temas FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir eliminar temas a autenticados" ON temas;
CREATE POLICY "Permitir eliminar temas a autenticados" ON temas FOR DELETE TO authenticated USING (true);
