-- ============================================================
-- MIGRACIÓN: CREAR TABLA INTERMEDIA Temas_Generos (N:M)
-- Permite múltiples géneros y fusiones musicales por canción
-- ============================================================

-- 1. Crear tabla intermedia Temas_Generos
CREATE TABLE IF NOT EXISTS Temas_Generos (
    id_tema INT NOT NULL REFERENCES Temas(id_tema) ON DELETE CASCADE,
    id_genero INT NOT NULL REFERENCES Generos(id_genero) ON DELETE CASCADE,
    es_principal BOOLEAN DEFAULT TRUE,
    PRIMARY KEY (id_tema, id_genero)
);

-- 2. Migrar géneros existentes desde la columna escalar Temas.id_genero
INSERT INTO Temas_Generos (id_tema, id_genero, es_principal)
SELECT id_tema, id_genero, TRUE
FROM Temas
WHERE id_genero IS NOT NULL
ON CONFLICT (id_tema, id_genero) DO NOTHING;

-- 3. Índices para optimizar búsquedas por tema y por género
CREATE INDEX IF NOT EXISTS idx_temas_generos_tema ON Temas_Generos(id_tema);
CREATE INDEX IF NOT EXISTS idx_temas_generos_genero ON Temas_Generos(id_genero);

-- 4. Habilitar Row Level Security (RLS)
ALTER TABLE Temas_Generos ENABLE ROW LEVEL SECURITY;

-- 5. Política de lectura pública para el catálogo
DROP POLICY IF EXISTS "Lectura publica temas_generos" ON Temas_Generos;
CREATE POLICY "Lectura publica temas_generos" ON Temas_Generos FOR SELECT USING (true);

-- 6. Concesión explícita de permisos para Data API (PostgREST / Supabase)
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE Temas_Generos TO anon, authenticated, service_role;

-- 7. Comentario explicativo
COMMENT ON TABLE Temas_Generos IS 'Relación N:M de géneros por tema musical para clasificar fusiones y vertientes';
