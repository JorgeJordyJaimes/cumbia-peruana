
USE cumbia_peruana;

--- VER COLUMNAS DE TABLA ALBUMES ---
SELECT * FROM Albumes;

---------------------------------------------------------------------------------------- GRUPO CELESTE ---------------------------------------------------------------------------------------

-- DIFA
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, comentario)
VALUES 
(12, 11, '009', 1974, 1, ''),
(12, 11, '141', 1982, 1, ''),
(12, 11, '142', 1982, 1, ''),
(12, 11, '144', 1982, 1, '');

-- DISCOPE
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, comentario)
VALUES 
(12, 25, '001', 1975, 1, ''),
(12, 25, '003', 1975, 1, ''),
(12, 25, '006', 1975, 1, ''),
(12, 25, '010', 1975, 1, ''),
(12, 25, '014', 1975, 1, ""),
(12, 25, '015', 1975, 1, ''),
(12, 25, '016', 1975, 1, ''),
(12, 25, '018', 1975, 1, ''),
(12, 25, '019', 1975, 1, ''),
(12, 25, '76-032', 1976, 1, ''),
(12, 25, '76-033', 1976, 1, '');

-- PRODIC
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, comentario)
VALUES
(12, 49, '001', 1977, 1, ''),
(12, 49, '003', 1977, 1, ''),
(12, 49, '004', 1977, 1, ''),
(12, 49, '006', 1977, 1, ''),
(12, 49, '009', 1977, 1, ''),
(12, 49, '010', 1978, 1, ''),
(12, 49, '011', 1978, 1, ''),
(12, 49, '012', 1978, 1, ''),
(12, 49, '013', 1979, 1, ''),
(12, 49, '001-80', 1980, 1, '');

-- INFOPESA
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, comentario)
VALUES
(12, 1, '171110', 1980, 1, ''),
(12, 1, '171143', 1980, 1, ''),
(12, 1, '171168', 1980, 1, ''),
(12, 1, '171336', 1982, 1, '');

-- SONORADIO
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, comentario)
VALUES
(12, 3, '13742', 1981, 1, '');

-- EMUCEL
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, comentario)
VALUES
(12, 62, '80-001', 1981, 1, ''),
(12, 62, '81-001', 1981, 1, ''),
(12, 62, '81-003', 1981, 1, ''),
(12, 62, '83-001', 1983, 1, ''),
(12, 62, '83-002', 1983, 1, ''),
(12, 62, '84-004', 1984, 1, '');

-- HORÓSCOPO
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, comentario)
VALUES
(12, 2, '1195', 1985, 1, ''),
(12, 2, '1229', 1986, 1, '');

--------------------------------------------------------------------------------------- EL SUPER GRUPO ---------------------------------------------------------------------------------------

-- DISCOPE
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, comentario)
VALUES
(23, 25, '76-040', 1976, 1, ''),
(23, 25, '76-045', 1976, 1, ''),
(23, 25, '77-043', 1977, 1, '');

-- GALEM
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, comentario)
VALUES
(23, 68, '001', 1977, 1, ''),
(23, 68, '003', 1977, 1, ''),
(23, 68, '006', 1977, 1, ''),
(23, 68, '007', 1978, 1, ''),
(23, 68, '009', 1978, 1, '');

-- HORÓSCOPO
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, comentario)
VALUES
(23, 2, '1025', 1979, 1, ''),
(23, 2, '1029', 1979, 1, 'Tiene dos temas en el lado A y se reproduce a 45 rpm'),
(23, 2, '1099', 1982, 1, '');

-- DIFA
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, comentario)
VALUES
(23, 11, '90', 1980, 1, ''),
(23, 11, '99', 1980, 1, ''),
(23, 11, '108', 1981, 1, ''),
(23, 11, '118', 1981, 1, ''),
(23, 11, '128', 1982, 1, ''),
(23, 11, '135', 1982, 1, ''),
(23, 11, '156', 1982, 1, '');

-- MUSIC SHOP
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, comentario)
VALUES
(23, 7, '01-183', 1982, 1, '');

-- INFOPESA
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, comentario)
VALUES
(23, 1, '171404', 1983, 1, ''),
(23, 1, '171433', 1984, 1, ''),
(23, 1, '171440', 1984, 1, ''),
(23, 1, '171446', 1984, 1, '');

-- WR
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, comentario)
VALUES
(23, 56, '10', 1986, 1, '');

-- CARAVANA RECORD
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, comentario)
VALUES
(23, 9, '42', 1987, 1, ''),
(23, 9, '44', 1987, 1, '');

---------------------------------------------------------------------------------------- CIELO GRIS ----------------------------------------------------------------------------------------

-- CARACOL
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, comentario)
VALUES
(22, 13, '3', 1975, 1, ''),
(22, 13, '13', 1975, 1, ''),
(22, 13, '18', 1976, 1, '');

-- PRODITA
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, comentario)
VALUES
(22, 84, '78-02', 1978, 1, ''),
(22, 84, '79-03', 1979, 1, ''),
(22, 84, '80-03', 1980, 1, '');

-- HORÓSCOPO
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, comentario)
VALUES
(22, 2, '1036', 1980, 1, ''),
(22, 2, '1047', 1980, 1, ''),
(22, 2, '1059', 1981, 1, ''),
(22, 2, '1069', 1981, 1, ''),
(22, 2, '1211', 1985, 1, '');

-- SONORADIO
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, comentario)
VALUES
(22, 3, '13805', 1983, 1, ''),
(22, 3, '13812', 1984, 1, '');

-- MIDAS
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, comentario)
VALUES
(22, 5, '110063', 1982, 1, ''),
(22, 5, '110071', 1982, 1, ''),
(22, 5, '110091', 1982, 1, ''),
(22, 5, '110100', 1983, 1, ''),
(22, 5, '110189', 1986, 1, ''),
(22, 5, '110190', 1986, 1, ''),
(22, 5, '110195', 1987, 1, '');

-- AVISPA
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, comentario)
VALUES
(22, 93, '1002', 1978, 1, '');

-- KOZMOZ
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, comentario)
VALUES
(22, 93, '1002', 1983, 1, '');

-- ROSA RECORD
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, comentario)
VALUES
(22, 33, '11', 1984, 1, '');


---------------------------------------------------------------------------------------- LOS DESTELLOS ----------------------------------------------------------------------------------------

-- HORÓSCOPO
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, comentario)
VALUES
(1, 2, '1190', 1985, 1. ''),
(1, 2, '1217', )
