DROP DATABASE IF EXISTS Cumbia_Peruana;

-- Crear la base de datos si no existe y seleccionarla
CREATE DATABASE IF NOT EXISTS Cumbia_Peruana;
USE Cumbia_Peruana;

---
--- Tablas maestras
---

-- Tabla Personas: Almacena la información personal de los involucrados en la escena, 
-- permite que tengan diferentes roles al mismo tiempo
CREATE TABLE Personas (
    id_persona INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apodo VARCHAR(100),
    fecha_nacimiento DATE,
    lugar_nacimiento VARCHAR(100)
);

-- TABLA MODIFICADA: Grupos, ahora con una clave foránea para el director
CREATE TABLE Grupos (
    id_grupo INT AUTO_INCREMENT PRIMARY KEY,
    nombre_grupo VARCHAR(100) NOT NULL,
    id_director INT, -- Cambiado de VARCHAR(100) a INT
    region VARCHAR(100),
    FOREIGN KEY (id_director) REFERENCES Personas(id_persona) ON DELETE SET NULL
);

-- Tabla Sellos_Discograficos: Almacena la información de los sellos discográficos.
CREATE TABLE Sellos_Discograficos (
    id_sello INT AUTO_INCREMENT PRIMARY KEY,
    nombre_sello VARCHAR(100) NOT NULL
);

-- Tabla Generos: Almacena los géneros musicales (ej. Cumbia, Huayno, etc.).
CREATE TABLE Generos (
    id_genero INT AUTO_INCREMENT PRIMARY KEY,
    nombre_genero VARCHAR(50)
);

-- Tabla Tipos_Album: Nueva tabla de referencia para los tipos de álbumes
CREATE TABLE Tipos_Album (
    id_tipo_album INT AUTO_INCREMENT PRIMARY KEY,
    nombre_tipo VARCHAR(50) NOT NULL UNIQUE
);

-- Tabla Roles: Tabla de referencia para los roles de los músicos.
CREATE TABLE Roles (
    id_rol INT AUTO_INCREMENT PRIMARY KEY,
    nombre_rol VARCHAR(50) NOT NULL UNIQUE
);

---
--- Tablas de relaciones
---

-- Tabla Albumes: Almacena los álbumes de los grupos.
CREATE TABLE Albumes (
    id_album INT AUTO_INCREMENT PRIMARY KEY,
    id_grupo INT,
    id_sello INT,
    numero_catalogo VARCHAR(50),
    año_publicacion YEAR,
    nombre_album VARCHAR(100) NOT NULL,
    id_tipo_album INT NOT NULL, -- Ahora usa la clave foránea a Tipos_Album
    comentario TEXT,
    FOREIGN KEY (id_grupo) REFERENCES Grupos(id_grupo) ON DELETE CASCADE,
    FOREIGN KEY (id_sello) REFERENCES Sellos_Discograficos(id_sello) ON DELETE CASCADE,
    FOREIGN KEY (id_tipo_album) REFERENCES Tipos_Album(id_tipo_album) ON DELETE CASCADE
);

-- TABLA MODIFICADA: Tabla Temas, ahora sin id_grupo
CREATE TABLE Temas (
    id_tema INT AUTO_INCREMENT PRIMARY KEY,
    titulo_tema VARCHAR(100) NOT NULL,
    duracion TIME,
    letra TEXT, -- Cambiado a TEXT para textos largos
    id_genero INT,
    FOREIGN KEY (id_genero) REFERENCES Generos(id_genero) ON DELETE SET NULL
);

-- TABLA NUEVA: Temas_Compositores para la relación muchos a muchos.
CREATE TABLE Temas_Compositores (
    id_tema INT,
    id_compositor INT,
    PRIMARY KEY (id_tema, id_compositor),
    FOREIGN KEY (id_tema) REFERENCES Temas(id_tema) ON DELETE CASCADE,
    FOREIGN KEY (id_compositor) REFERENCES Personas(id_persona) ON DELETE CASCADE
);

-- Tabla Albumes_Temas: Tabla intermedia para la relación muchos a muchos entre Albumes y Temas.
CREATE TABLE Albumes_Temas (
    id_albumes_temas INT AUTO_INCREMENT PRIMARY KEY,
    id_album INT,
    id_tema INT,
    numero_pista INT,
    lado VARCHAR(10),
    FOREIGN KEY (id_album) REFERENCES Albumes(id_album) ON DELETE CASCADE,
    FOREIGN KEY (id_tema) REFERENCES Temas(id_tema) ON DELETE CASCADE
);

-- TABLA NUEVA: Grupos_Musicos para el historial de miembros.
CREATE TABLE Grupos_Musicos (
    id_grupo INT,
    id_musico INT,
    desde DATE,
    hasta DATE,
    PRIMARY KEY (id_grupo, id_musico),
    FOREIGN KEY (id_grupo) REFERENCES Grupos(id_grupo) ON DELETE CASCADE,
    FOREIGN KEY (id_musico) REFERENCES Personas(id_persona) ON DELETE CASCADE
);

-- Tabla Tema_Musicos: Tabla intermedia para la relación muchos a muchos entre Temas y Músicos.
-- Esto permite asignar múltiples músicos a un solo tema y especificar su rol.
CREATE TABLE Tema_Musicos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_tema INT,
    id_musico INT,
    instrumento VARCHAR(50),
    rol ENUM('guitarra líder', 'segunda guitarra', 'bajista', 'baterista', 'tecladista', 'percusionista', 'cantante', 'coros', 'productor') NOT NULL,
    FOREIGN KEY (id_tema) REFERENCES Temas(id_tema) ON DELETE CASCADE,
    FOREIGN KEY (id_musico) REFERENCES Musicos(id_musico) ON DELETE CASCADE
);

-- Tabla Versiones: Relaciona un tema original con su versión.
CREATE TABLE Versiones (
    id_version INT AUTO_INCREMENT PRIMARY KEY,
    id_tema_original INT,
    FOREIGN KEY (id_tema_original) REFERENCES Temas(id_tema) ON DELETE CASCADE
);