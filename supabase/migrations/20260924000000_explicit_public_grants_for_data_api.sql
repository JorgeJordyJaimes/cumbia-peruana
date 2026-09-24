-- ============================================================
-- MIGRACIÓN: PERMISOS EXPLÍCITOS PARA SUPABASE DATA API (POSTGREST)
-- Adaptación a la política de Supabase (Octubre 2026 / Breaking Change)
-- ============================================================

-- 1. Conceder uso del esquema public a los roles de la API
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;

-- 2. Conceder permisos sobre todas las tablas existentes en el esquema public
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role;

-- 3. Conceder permisos sobre todas las secuencias existentes (IDs auto-incrementables SERIAL)
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;

-- 4. Conceder permisos sobre todas las funciones/rutinas en public
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO anon, authenticated, service_role;

-- 5. Configurar privilegios por defecto para que cualquier tabla o secuencia futura
--    creada en el esquema public herede automáticamente los permisos de la Data API
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON ROUTINES TO anon, authenticated, service_role;

-- 6. Concesión explícita por cada tabla del catálogo y del sistema (respaldo)
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE Personas TO anon, authenticated, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE Grupos TO anon, authenticated, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE Sellos_Discograficos TO anon, authenticated, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE Generos TO anon, authenticated, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE Tipos_Album TO anon, authenticated, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE Roles TO anon, authenticated, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE Albumes TO anon, authenticated, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE Albumes_Grupos_Lados TO anon, authenticated, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE Temas TO anon, authenticated, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE Temas_Compositores TO anon, authenticated, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE Temas_Grupos TO anon, authenticated, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE Albumes_Temas TO anon, authenticated, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE Grupos_Musicos TO anon, authenticated, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE Tema_Musicos TO anon, authenticated, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE Versiones TO anon, authenticated, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE articulos TO anon, authenticated, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE configuracion_home TO anon, authenticated, service_role;
