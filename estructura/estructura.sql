DROP DATABASE IF EXISTS Cumbia_Peruana;

-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS Cumbia_Peruana;
USE Cumbia_Peruana;

-- Tabla Grupos
CREATE TABLE Grupos (
    id_grupo INT AUTO_INCREMENT PRIMARY KEY,
    nombre_grupo VARCHAR(100) NOT NULL,
    director VARCHAR(100),
    region VARCHAR(100)
);

-- Tabla Cantantes
CREATE TABLE Cantantes (
    id_cantante INT AUTO_INCREMENT PRIMARY KEY,
    nombre_cantante VARCHAR(100) NOT NULL,
    apodo VARCHAR(100),
    genero VARCHAR(50)
);

-- Tabla Compositores
CREATE TABLE Compositores (
    id_compositor INT AUTO_INCREMENT PRIMARY KEY,
    nombre_compositor VARCHAR(100)
);

-- Tabla Sellos_Discograficos
CREATE TABLE Sellos_Discograficos (
    id_sello INT AUTO_INCREMENT PRIMARY KEY,
    nombre_sello VARCHAR(100) NOT NULL
);

-- Tabla Generos
CREATE TABLE Generos (
    id_genero INT AUTO_INCREMENT PRIMARY KEY,
    nombre_genero VARCHAR(50)
);

-- Tabla Albumes
-- Esta tabla almacena los álbumes de los grupos
CREATE TABLE Albumes (
    id_album INT AUTO_INCREMENT PRIMARY KEY,
    id_grupo INT,
    id_sello INT,
    numero_catalogo VARCHAR(50),
    año_publicacion YEAR,
    nombre_album VARCHAR(100) NOT NULL,
    tipo_album ENUM('45','EP', 'LP', 'Casete') NOT NULL,
    comentario VARCHAR (100),
    FOREIGN KEY (id_grupo) REFERENCES Grupos(id_grupo),
    FOREIGN KEY (id_sello) REFERENCES Sellos_Discograficos(id_sello)
);

-- Tabla Temas
-- Esta tabla almacena los temas de los álbumes
CREATE TABLE Temas (
    id_tema INT AUTO_INCREMENT PRIMARY KEY,
    id_album INT,
    id_compositor INT,
    id_cantante INT,
    id_genero INT,
    titulo_tema VARCHAR(100) NOT NULL,
    numero_pista INT,
    duracion TIME,
    lado ENUM('A', 'B') NULL,
    en_lp BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (id_album) REFERENCES Albumes(id_album),
    FOREIGN KEY (id_compositor) REFERENCES Compositores(id_compositor),
    FOREIGN KEY (id_cantante) REFERENCES Cantantes(id_cantante),
    FOREIGN KEY (id_genero) REFERENCES Generos(id_genero)
);

-- Tabla Temas_en_LP
-- Esta tabla relaciona un tema con su versión en un LP
CREATE TABLE Temas_en_LP (
    id_tema_lp INT AUTO_INCREMENT PRIMARY KEY,
    id_tema INT,
    id_album_lp INT,
    numero_pista_lp INT,
    FOREIGN KEY (id_tema) REFERENCES Temas(id_tema),
    FOREIGN KEY (id_album_lp) REFERENCES Albumes(id_album)
);

-- Tabla de Versiones
-- Esta tabla relaciona un tema original con su versión
CREATE TABLE Versiones (
    id_version INT AUTO_INCREMENT PRIMARY KEY,
    id_tema_original INT,
    id_tema_version INT,
    FOREIGN KEY (id_tema_original) REFERENCES Temas(id_tema),
    FOREIGN KEY (id_tema_version) REFERENCES Temas(id_tema)
);
