-- ======================================================================================================================
-- GUÍA DE COLUMNAS PARA EL REGISTRO DE EXTENDED PLAYS / EPs (TABLA: Albumes)
-- Base de Datos: Kumbia Sound - Cumbia Peruana (1968-2005)
-- Datos reales catalogados desde docs/datos-investigacion/Datos BD.ods (Ingreso EP)
-- ======================================================================================================================

--------------------------------------------------------------------------------------- LOS MIRLOS ---------------------------------------------------------------------------------------

-- INFOPESA
INSERT INTO Albumes (
    id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, 
    id_tipo_album, es_recopilatorio, es_varios_artistas, es_disco_split, es_reedicion, 
    id_album_original, comentario)

VALUES
(3, 1, 'El Milagro Verde', 'EP-015', 1974, 3, FALSE, FALSE, FALSE, FALSE, NULL, 'Extended Play de 4 temas en vinilo de 7 pulgadas a 33 RPM');
