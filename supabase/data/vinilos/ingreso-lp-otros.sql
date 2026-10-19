-- ======================================================================================================================
-- REGISTRO DE LONG PLAYS / LPs (TABLA: Albumes) - SELLOS DIVERSOS (DIFA, MUSIC SHOP, WALTER RODRÍGUEZ, OTROS)
-- Base de Datos: Kumbia Sound - Cumbia Peruana (1968-2005)
-- Datos reales catalogados desde docs/datos-investigacion/Datos BD.ods (Hoja Ingreso LP)
-- ======================================================================================================================

---------------------------------------------------------------------------------------------------------------------- EL SUPER GRUPO ----------------------------------------------------------------------------------------------------------------------

-- DIFA
INSERT INTO Albumes (
    id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, 
    id_tipo_album, es_recopilatorio, es_varios_artistas, es_disco_split, es_reedicion, 
    id_album_original, comentario)

VALUES
(23, 11, 'Canta y Baila con El Super Grupo', 'DLPS-81009', 1981, 2, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- MUSIC SHOP
INSERT INTO Albumes (
    id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, 
    id_tipo_album, es_recopilatorio, es_varios_artistas, es_disco_split, es_reedicion, 
    id_album_original, comentario)

VALUES
(23, 7, 'El Super Disco Tropical', 'LPN-0285147', 1985, 2, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- WALTER RODRÍGUEZ
INSERT INTO Albumes (
    id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, 
    id_tipo_album, es_recopilatorio, es_varios_artistas, es_disco_split, es_reedicion, 
    id_album_original, comentario)

VALUES
(23, 56, 'Conmigo Vas a Gozar', 'LP-020', 1986, 2, FALSE, FALSE, FALSE, FALSE, NULL, '');
