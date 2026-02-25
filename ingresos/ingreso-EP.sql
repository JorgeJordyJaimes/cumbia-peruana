
USE Cumbia_Peruana;

SELECT * FROM Albumes
WHERE id_tipo_album = 3;

--------------------------------------------------------- JUANECO Y SU COMBO --------------------------------------------------------------

-- IEMPSA
INSERT INTO albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES
(6, 38, 'Juaneco y su Combo', 'MLD-011', 1968, 3);

-- INFOPESA
INSERT INTO albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES 
(6, 1, 'La Pastita', 'MLP-019', 1977, 3);



--------------------------------------------------------------------------------------- LOS WEMBLER'S DE IQUITOS ------------------------------------------------------------------------------

-- DECIBEL
INSERT INTO albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES 
(49, 34, "Los Wembler's en el Prado", 'MLP-33-004', 1975, 3);

