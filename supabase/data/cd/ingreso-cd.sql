-- ======================================================================================================================
-- GUÍA DE COLUMNAS PARA EL REGISTRO DE DISCOS COMPACTOS / CDs (TABLA: Albumes)
-- Base de Datos: Kumbia Sound - Cumbia Peruana (1968-2005)
-- Datos reales catalogados desde docs/datos-investigacion/Datos BD.ods (Ingreso CD)
-- ======================================================================================================================

---------------------------------------------------------------------------------------- ARMONÍA 10 ---------------------------------------------------------------------------------------

-- INFOPESA
INSERT INTO Albumes (
    id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, 
    id_tipo_album, es_recopilatorio, es_varios_artistas, es_disco_split, es_reedicion, 
    id_album_original, comentario)

VALUES
(35, 1, 'A Todo Ritmo', 'CD-9012', 1995, 5, FALSE, FALSE, FALSE, FALSE, NULL, 'Edición en caja acrílica jewel case');

-------------------------------------------------------------------------------------- LOS DESTELLOS --------------------------------------------------------------------------------------

-- IEMPSA
INSERT INTO Albumes (
    id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, 
    id_tipo_album, es_recopilatorio, es_varios_artistas, es_disco_split, es_reedicion, 
    id_album_original, comentario)

VALUES
(1, 36, '30 Años de Éxitos', 'CD-0105', 1998, 5, TRUE, FALSE, FALSE, TRUE, NULL, 'Remasterización digital de cintas maestras de 1971');
