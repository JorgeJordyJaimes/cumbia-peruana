-- ============================================================
-- BASE DE DATOS: Cumbia_Peruana
-- Motor: PostgreSQL
-- ============================================================

DROP TABLE IF EXISTS Versiones CASCADE;
DROP TABLE IF EXISTS Tema_Musicos CASCADE;
DROP TABLE IF EXISTS Albumes_Temas CASCADE;
DROP TABLE IF EXISTS Temas_Compositores CASCADE;
DROP TABLE IF EXISTS Albumes_Grupos_Lados CASCADE;
DROP TABLE IF EXISTS Grupos_Musicos CASCADE;
DROP TABLE IF EXISTS Albumes CASCADE;
DROP TABLE IF EXISTS Temas CASCADE;
DROP TABLE IF EXISTS Roles CASCADE;
DROP TABLE IF EXISTS Tipos_Album CASCADE;
DROP TABLE IF EXISTS Generos CASCADE;
DROP TABLE IF EXISTS Sellos_Discograficos CASCADE;
DROP TABLE IF EXISTS Grupos CASCADE;
DROP TABLE IF EXISTS Personas CASCADE;

---
--- Tablas maestras
---

CREATE TABLE Personas (
    id_persona SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apodo VARCHAR(100),
    fecha_nacimiento DATE,
    lugar_nacimiento VARCHAR(100),
    biografia TEXT,
    url_foto VARCHAR(500)
);

CREATE TABLE Grupos (
    id_grupo SERIAL PRIMARY KEY,
    nombre_grupo VARCHAR(100) NOT NULL,
    id_director INT,
    region VARCHAR(100),
    fecha_formacion DATE,
    url_foto VARCHAR(500),
    FOREIGN KEY (id_director) REFERENCES Personas(id_persona) ON DELETE SET NULL
);

CREATE TABLE Sellos_Discograficos (
    id_sello SERIAL PRIMARY KEY,
    nombre_sello VARCHAR(100) NOT NULL,
    pais VARCHAR(100),
    url_logo VARCHAR(500)
);

CREATE TABLE Generos (
    id_genero SERIAL PRIMARY KEY,
    nombre_genero VARCHAR(50) NOT NULL
);

CREATE TABLE Tipos_Album (
    id_tipo_album SERIAL PRIMARY KEY,
    nombre_tipo VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE Roles (
    id_rol SERIAL PRIMARY KEY,
    nombre_rol VARCHAR(50) NOT NULL UNIQUE
);

---
--- Tablas de relaciones
---

CREATE TABLE Albumes (
    id_album SERIAL PRIMARY KEY,
    id_grupo INT,
    id_sello INT,
    numero_catalogo VARCHAR(50),
    año_publicacion SMALLINT,
    nombre_album VARCHAR(100) NOT NULL,
    id_tipo_album INT NOT NULL,
    comentario TEXT,
    url_portada VARCHAR(500),
    url_contraportada VARCHAR(500),
    url_etiqueta VARCHAR(500),
    FOREIGN KEY (id_grupo) REFERENCES Grupos(id_grupo) ON DELETE CASCADE,
    FOREIGN KEY (id_sello) REFERENCES Sellos_Discograficos(id_sello) ON DELETE CASCADE,
    FOREIGN KEY (id_tipo_album) REFERENCES Tipos_Album(id_tipo_album) ON DELETE CASCADE
);

CREATE TABLE Albumes_Grupos_Lados (
    id_album INT NOT NULL,
    lado VARCHAR(10) NOT NULL,
    id_grupo INT NOT NULL,
    PRIMARY KEY (id_album, lado),
    FOREIGN KEY (id_album) REFERENCES Albumes(id_album) ON DELETE CASCADE,
    FOREIGN KEY (id_grupo) REFERENCES Grupos(id_grupo) ON DELETE CASCADE
);

CREATE TABLE Temas (
    id_tema SERIAL PRIMARY KEY,
    titulo_tema VARCHAR(100) NOT NULL,
    duracion_segundos INT,
    letra TEXT,
    id_genero INT,
    FOREIGN KEY (id_genero) REFERENCES Generos(id_genero) ON DELETE SET NULL
);

CREATE TABLE Temas_Compositores (
    id_tema INT,
    id_compositor INT,
    PRIMARY KEY (id_tema, id_compositor),
    FOREIGN KEY (id_tema) REFERENCES Temas(id_tema) ON DELETE CASCADE,
    FOREIGN KEY (id_compositor) REFERENCES Personas(id_persona) ON DELETE CASCADE
);

CREATE TABLE Albumes_Temas (
    id_album_tema SERIAL PRIMARY KEY,
    id_album INT NOT NULL,
    id_tema INT NOT NULL,
    numero_pista INT,
    lado VARCHAR(10),
    UNIQUE (id_album, id_tema),
    FOREIGN KEY (id_album) REFERENCES Albumes(id_album) ON DELETE CASCADE,
    FOREIGN KEY (id_tema) REFERENCES Temas(id_tema) ON DELETE CASCADE
);

CREATE TABLE Grupos_Musicos (
    id_grupo_musico SERIAL PRIMARY KEY,
    id_grupo INT NOT NULL,
    id_musico INT NOT NULL,
    desde DATE,
    hasta DATE,
    UNIQUE (id_grupo, id_musico, desde),
    CONSTRAINT chk_fechas CHECK (hasta IS NULL OR hasta >= desde),
    FOREIGN KEY (id_grupo) REFERENCES Grupos(id_grupo) ON DELETE CASCADE,
    FOREIGN KEY (id_musico) REFERENCES Personas(id_persona) ON DELETE CASCADE
);

CREATE TABLE Tema_Musicos (
    id_tema_musicos SERIAL PRIMARY KEY,
    id_tema INT NOT NULL,
    id_musico INT NOT NULL,
    instrumento VARCHAR(50),
    id_rol INT NOT NULL,
    UNIQUE (id_tema, id_musico),
    FOREIGN KEY (id_tema) REFERENCES Temas(id_tema) ON DELETE CASCADE,
    FOREIGN KEY (id_musico) REFERENCES Personas(id_persona) ON DELETE CASCADE,
    FOREIGN KEY (id_rol) REFERENCES Roles(id_rol) ON DELETE CASCADE
);

CREATE TABLE Versiones (
    id_version SERIAL PRIMARY KEY,
    id_tema INT NOT NULL,
    id_tema_original INT NOT NULL,
    UNIQUE (id_tema, id_tema_original),
    FOREIGN KEY (id_tema) REFERENCES Temas(id_tema) ON DELETE CASCADE,
    FOREIGN KEY (id_tema_original) REFERENCES Temas(id_tema) ON DELETE CASCADE,
    CONSTRAINT chk_no_autoversion CHECK (id_tema <> id_tema_original)
);

---
--- Índices
---

CREATE INDEX idx_personas_nombre ON Personas(nombre);
CREATE INDEX idx_grupos_nombre ON Grupos(nombre_grupo);
CREATE INDEX idx_albumes_año ON Albumes(año_publicacion);
CREATE INDEX idx_albumes_grupo ON Albumes(id_grupo);
CREATE INDEX idx_temas_titulo ON Temas(titulo_tema);
CREATE INDEX idx_temas_genero ON Temas(id_genero);
CREATE INDEX idx_temas_letra_gin ON Temas USING gin(to_tsvector('spanish', letra));

---
--- Comentarios
---

COMMENT ON TABLE Personas IS 'Músicos, compositores y personalidades de la cumbia peruana';
COMMENT ON TABLE Grupos IS 'Grupos musicales de cumbia peruana';
COMMENT ON TABLE Albumes IS 'Álbumes publicados por los grupos';
COMMENT ON TABLE Albumes_Grupos_Lados IS 'Splits y recopilatorios donde cada lado pertenece a un grupo diferente';
COMMENT ON TABLE Temas IS 'Canciones/temas musicales';
COMMENT ON TABLE Versiones IS 'Relación de versiones: un tema puede ser versión de otro tema original';
COMMENT ON TABLE Grupos_Musicos IS 'Historial de membresía de músicos en grupos';