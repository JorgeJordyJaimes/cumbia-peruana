-- ============================================================
-- MIGRACIÓN INICIAL: Esquema de Cumbia Peruana y Herramientas DJ
-- Motor: PostgreSQL (Supabase)
-- ============================================================

-- Tablas Maestras

CREATE TABLE IF NOT EXISTS Personas (
    id_persona SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apodo VARCHAR(100),
    fecha_nacimiento DATE,
    lugar_nacimiento VARCHAR(100),
    biografia TEXT,
    url_foto VARCHAR(500)
);

CREATE TABLE IF NOT EXISTS Grupos (
    id_grupo SERIAL PRIMARY KEY,
    nombre_grupo VARCHAR(100) NOT NULL,
    id_director INT REFERENCES Personas(id_persona) ON DELETE SET NULL,
    region VARCHAR(100),
    fecha_formacion DATE,
    url_foto VARCHAR(500)
);

CREATE TABLE IF NOT EXISTS Sellos_Discograficos (
    id_sello SERIAL PRIMARY KEY,
    nombre_sello VARCHAR(100) NOT NULL,
    pais VARCHAR(100),
    url_logo VARCHAR(500)
);

CREATE TABLE IF NOT EXISTS Generos (
    id_genero SERIAL PRIMARY KEY,
    nombre_genero VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS Tipos_Album (
    id_tipo_album SERIAL PRIMARY KEY,
    nombre_tipo VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS Roles (
    id_rol SERIAL PRIMARY KEY,
    nombre_rol VARCHAR(50) NOT NULL UNIQUE
);

-- Tablas Relacionales y Discografía

CREATE TABLE IF NOT EXISTS Albumes (
    id_album SERIAL PRIMARY KEY,
    id_grupo INT REFERENCES Grupos(id_grupo) ON DELETE CASCADE,
    id_sello INT REFERENCES Sellos_Discograficos(id_sello) ON DELETE CASCADE,
    numero_catalogo VARCHAR(50),
    año_publicacion SMALLINT,
    nombre_album VARCHAR(100),
    id_tipo_album INT NOT NULL REFERENCES Tipos_Album(id_tipo_album) ON DELETE CASCADE,
    es_recopilatorio BOOLEAN DEFAULT FALSE,
    es_varios_artistas BOOLEAN DEFAULT FALSE,
    incluido_en_lp BOOLEAN DEFAULT FALSE,
    extraido_de_lp BOOLEAN DEFAULT FALSE,
    solo_en_45 BOOLEAN DEFAULT FALSE,
    id_lp_relacionado INT REFERENCES Albumes(id_album) ON DELETE SET NULL,
    es_reedicion BOOLEAN DEFAULT FALSE,
    id_album_original INT REFERENCES Albumes(id_album) ON DELETE SET NULL,
    comentario TEXT,
    url_portada VARCHAR(500),
    url_contraportada VARCHAR(500),
    url_etiqueta VARCHAR(500)
);

CREATE TABLE IF NOT EXISTS Albumes_Grupos_Lados (
    id_album INT NOT NULL REFERENCES Albumes(id_album) ON DELETE CASCADE,
    lado VARCHAR(10) NOT NULL,
    id_grupo INT NOT NULL REFERENCES Grupos(id_grupo) ON DELETE CASCADE,
    PRIMARY KEY (id_album, lado)
);

CREATE TABLE IF NOT EXISTS Temas (
    id_tema SERIAL PRIMARY KEY,
    titulo_tema VARCHAR(100) NOT NULL,
    duracion_segundos INT,
    letra TEXT,
    id_genero INT REFERENCES Generos(id_genero) ON DELETE SET NULL,
    bpm INT,
    camelot_code VARCHAR(10),
    musical_key VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS Temas_Compositores (
    id_tema INT REFERENCES Temas(id_tema) ON DELETE CASCADE,
    id_compositor INT REFERENCES Personas(id_persona) ON DELETE CASCADE,
    PRIMARY KEY (id_tema, id_compositor)
);

CREATE TABLE IF NOT EXISTS Temas_Grupos (
    id_tema INT NOT NULL REFERENCES Temas(id_tema) ON DELETE CASCADE,
    id_grupo INT NOT NULL REFERENCES Grupos(id_grupo) ON DELETE CASCADE,
    rol_participacion VARCHAR(50) DEFAULT 'Principal',
    PRIMARY KEY (id_tema, id_grupo)
);

CREATE TABLE IF NOT EXISTS Albumes_Temas (
    id_album_tema SERIAL PRIMARY KEY,
    id_album INT NOT NULL REFERENCES Albumes(id_album) ON DELETE CASCADE,
    id_tema INT NOT NULL REFERENCES Temas(id_tema) ON DELETE CASCADE,
    numero_pista INT,
    lado VARCHAR(10),
    id_album_origen INT REFERENCES Albumes(id_album) ON DELETE SET NULL,
    es_grabacion_inedita BOOLEAN DEFAULT FALSE,
    UNIQUE (id_album, id_tema)
);

CREATE TABLE IF NOT EXISTS Grupos_Musicos (
    id_grupo_musico SERIAL PRIMARY KEY,
    id_grupo INT NOT NULL REFERENCES Grupos(id_grupo) ON DELETE CASCADE,
    id_musico INT NOT NULL REFERENCES Personas(id_persona) ON DELETE CASCADE,
    desde DATE,
    hasta DATE,
    UNIQUE (id_grupo, id_musico, desde),
    CONSTRAINT chk_fechas CHECK (hasta IS NULL OR hasta >= desde)
);

CREATE TABLE IF NOT EXISTS Tema_Musicos (
    id_tema_musicos SERIAL PRIMARY KEY,
    id_tema INT NOT NULL REFERENCES Temas(id_tema) ON DELETE CASCADE,
    id_musico INT NOT NULL REFERENCES Personas(id_persona) ON DELETE CASCADE,
    instrumento VARCHAR(50),
    id_rol INT NOT NULL REFERENCES Roles(id_rol) ON DELETE CASCADE,
    UNIQUE (id_tema, id_musico)
);

CREATE TABLE IF NOT EXISTS Versiones (
    id_version SERIAL PRIMARY KEY,
    id_tema INT NOT NULL REFERENCES Temas(id_tema) ON DELETE CASCADE,
    id_tema_original INT NOT NULL REFERENCES Temas(id_tema) ON DELETE CASCADE,
    UNIQUE (id_tema, id_tema_original),
    CONSTRAINT chk_no_autoversion CHECK (id_tema <> id_tema_original)
);

-- Índices de consulta frecuente y búsqueda full-text
CREATE INDEX IF NOT EXISTS idx_personas_nombre ON Personas(nombre);
CREATE INDEX IF NOT EXISTS idx_grupos_nombre ON Grupos(nombre_grupo);
CREATE INDEX IF NOT EXISTS idx_albumes_año ON Albumes(año_publicacion);
CREATE INDEX IF NOT EXISTS idx_albumes_grupo ON Albumes(id_grupo);
CREATE INDEX IF NOT EXISTS idx_albumes_recopilatorio ON Albumes(es_recopilatorio);
CREATE INDEX IF NOT EXISTS idx_albumes_varios_artistas ON Albumes(es_varios_artistas);
CREATE INDEX IF NOT EXISTS idx_albumes_reedicion ON Albumes(es_reedicion);
CREATE INDEX IF NOT EXISTS idx_albumes_incluido_lp ON Albumes(incluido_en_lp);
CREATE INDEX IF NOT EXISTS idx_albumes_extraido_lp ON Albumes(extraido_de_lp);
CREATE INDEX IF NOT EXISTS idx_albumes_solo_45 ON Albumes(solo_en_45);
CREATE INDEX IF NOT EXISTS idx_albumes_temas_album_origen ON Albumes_Temas(id_album_origen);
CREATE INDEX IF NOT EXISTS idx_temas_titulo ON Temas(titulo_tema);
CREATE INDEX IF NOT EXISTS idx_temas_genero ON Temas(id_genero);
CREATE INDEX IF NOT EXISTS idx_temas_bpm ON Temas(bpm);
CREATE INDEX IF NOT EXISTS idx_temas_camelot ON Temas(camelot_code);
CREATE INDEX IF NOT EXISTS idx_temas_grupos_tema ON Temas_Grupos(id_tema);
CREATE INDEX IF NOT EXISTS idx_temas_grupos_grupo ON Temas_Grupos(id_grupo);
CREATE INDEX IF NOT EXISTS idx_temas_letra_gin ON Temas USING gin(to_tsvector('spanish', coalesce(letra, '')));
