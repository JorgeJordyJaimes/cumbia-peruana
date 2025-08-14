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

-- Tabla Grupos: Almacena la información de los grupos musicales.
CREATE TABLE Grupos (
    id_grupo INT AUTO_INCREMENT PRIMARY KEY,
    nombre_grupo VARCHAR(100) NOT NULL,
    director VARCHAR(100),
    region VARCHAR(100)
);

-- Tabla Musicos: Almacena la información de los músicos.
CREATE TABLE Musicos (
    id_musico INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apodo VARCHAR(100),
    instrumento_principal VARCHAR(50),
    fecha_nacimiento DATE,
    lugar_nacimiento VARCHAR(100)
);

-- Tabla Compositores: Almacena la información de los compositores.
CREATE TABLE Compositores (
    id_compositor INT AUTO_INCREMENT PRIMARY KEY,
    nombre_compositor VARCHAR(100)
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
    tipo_album ENUM('45','EP', 'LP', 'Casete', 'CD') NOT NULL,
    comentario VARCHAR (255), -- Aumentado el tamaño para comentarios más largos
    FOREIGN KEY (id_grupo) REFERENCES Grupos(id_grupo) ON DELETE CASCADE,
    FOREIGN KEY (id_sello) REFERENCES Sellos_Discograficos(id_sello) ON DELETE CASCADE
);

-- Tabla Temas: Almacena información sobre un tema musical (canción) único.
-- Hemos separado la información del tema de su aparición en un álbum
-- para manejar casos donde un tema puede aparecer en varios álbumes (ej. un single y un LP).
CREATE TABLE Temas (
    id_tema INT AUTO_INCREMENT PRIMARY KEY,
    titulo_tema VARCHAR(100) NOT NULL,
    duracion TIME,
    letra VARCHAR(5000),
    id_compositor INT,
    id_genero INT,
    id_grupo INT,
    FOREIGN KEY (id_compositor) REFERENCES Compositores(id_compositor) ON DELETE SET NULL,
    FOREIGN KEY (id_genero) REFERENCES Generos(id_genero) ON DELETE SET NULL,
    FOREIGN KEY (id_grupo) REFERENCES Grupos(id_grupo) ON DELETE SET NULL
);

-- Tabla Albumes_Temas: Tabla intermedia para la relación muchos a muchos entre Albumes y Temas.
-- Esta tabla maneja la información específica de un tema en un álbum particular.
CREATE TABLE Albumes_Temas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_album INT,
    id_tema INT,
    numero_pista INT,
    lado ENUM('A', 'B'),
    FOREIGN KEY (id_album) REFERENCES Albumes(id_album) ON DELETE CASCADE,
    FOREIGN KEY (id_tema) REFERENCES Temas(id_tema) ON DELETE CASCADE
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