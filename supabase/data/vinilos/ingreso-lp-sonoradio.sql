-- ======================================================================================================================
-- GUÍA DE COLUMNAS PARA EL REGISTRO DE LONG PLAYS / LPs (TABLA: Albumes)
-- ======================================================================================================================
-- A continuación se listan y explican las columnas disponibles para registrar álbumes en formato LP (Long Play)
-- y los criterios musicológicos para saber cuándo y cómo utilizar cada una:
--
-- 1. es_recopilatorio (BOOLEAN) [DEFAULT FALSE]
--    • Cuándo usarla: Marcar como TRUE cuando el disco sea un prensaje recopilatorio, grandes éxitos o antología.
--
-- 2. es_varios_artistas (BOOLEAN) [DEFAULT FALSE]
--    • Cuándo usarla: Marcar como TRUE cuando el LP reúna temas de diversas agrupaciones (compilados variados).
--      Nota: En estos casos, id_grupo puede ser NULL o asignarse al identificador comodín de Variados.
--
-- 3. es_disco_split (BOOLEAN) [DEFAULT FALSE]
--    • Cuándo usarla: Marcar como TRUE cuando el LP sea un disco compartido o mano a mano (ej. un lado de un grupo y el otro de otro).
--
-- 4. es_reedicion (BOOLEAN) [DEFAULT FALSE]
--    • Cuándo usarla: Marcar como TRUE si el LP es un segundo tiraje, prensaje posterior o reedición con variante de diseño.
--
-- 5. id_album_original (INT) [NULLABLE]
--    • Cuándo usarla: Cuando 'es_reedicion = TRUE', se ingresa el 'id_album' de la edición original para enlazar la discografía.
--
-- 6. comentario (TEXT)
--    • Cuándo usarla: Para documentar número de tiraje ('1 Ed.', '2 Ed.'), particularidades del vinilo, portada o notas históricas.
--
-- 7. url_portada / url_contraportada / url_etiqueta (VARCHAR) [Opcional]
--    • Cuándo usarla: Para enlazar las fotografías o digitalizaciones de la portada, contraportada o galletas del vinilo de 33 RPM.
-- ======================================================================================================================

--------------------------------------------------------------------------------------- LOS DIABLOS ROJOS ---------------------------------------------------------------------------------------

-- SONO RADIO

INSERT INTO Albumes (
    id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, 
    id_tipo_album, es_recopilatorio, es_varios_artistas, es_disco_split, es_reedicion, 
    id_album_original, comentario)

VALUES
(2, 3, 'Al Rojo Vivo', 'SE-9379', 1971, 2, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(2, 3, 'Paseo Tropical', 'SE-9409', 1972, 2, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(2, 3, 'Vuelo Tropical', 'SE-9431', 1972, 2, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(2, 3, 'Triunfadores', 'SE-9454', 1973, 2, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(2, 3, 'A Todo Tren', 'SE-9471', 1973, 2, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(2, 3, 'Sonido Diablo', 'SE-9492', 1974, 2, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(2, 3, '¡El Superritmo!', 'SE-9514', 1975, 2, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(2, 3, 'El Sonido Alegre', 'SE-9539', 1975, 2, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(2, 3, 'Los Diablos en Ambiente', '9555', 1976, 2, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(2, 3, '¡Otro Lote!', 'SE-9572', 1976, 2, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(2, 3, 'Los Reyes de la Popularidad', 'SE-9596', 1977, 2, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(2, 3, 'Flor Delicada', 'SE-9619', 1978, 2, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(2, 3, 'Corazón Celoso', 'SE-9637', 1979, 2, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(2, 3, 'Música de Fiesta', 'SE-9655', 1979, 2, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(2, 3, 'Música de Fiesta Vol. 2', 'SE-9674', 1980, 2, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(2, 3, 'Antología de la Cumbia Peruana Vol. 1', 'SE-9703', 1980, 2, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(2, 3, 'Antología de la Cumbia Peruana Vol. 2', 'SE-9720', 1981, 2, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(2, 3, 'Antología de la Cumbia Peruana Vol. 3', 'SE-9736', 1981, 2, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(2, 3, 'Antología de la Cumbia Peruana Vol. 4', 'SE-9757', 1982, 2, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(2, 3, 'Antología de la Cumbia Peruana Vol. 5', 'SE-9777', 1982, 2, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(2, 3, 'Antología de la Cumbia Peruana Vol. 6', 'SE-9798', 1983, 2, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(2, 3, 'Antología de la Cumbia Peruana Vol. 7', 'SE-9818', 1984, 2, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(2, 43, 'Antología de la Cumbia Peruana Vol. 8', 'SE-8699', 1984, 2, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- CBS

INSERT INTO Albumes (
    id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, 
    id_tipo_album, es_recopilatorio, es_varios_artistas, es_disco_split, es_reedicion, 
    id_album_original, comentario)

VALUES
(2, 43, 'Costa, Sierra, Selva', 'SE-8745', 1985, 2, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(2, 43, 'Dimensión Bailable Vol. 1', 'SE-8761', 1985, 2, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- NINSA

INSERT INTO Albumes (
    id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, 
    id_tipo_album, es_recopilatorio, es_varios_artistas, es_disco_split, es_reedicion, 
    id_album_original, comentario)

VALUES
(2, 204, 'Dimensión Bailable Vol. 2', '02.049', 1986, 2, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- RECOPILATORIO SONO RADIO

INSERT INTO Albumes (
    id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, 
    id_tipo_album, es_recopilatorio, es_varios_artistas, es_disco_split, es_reedicion, 
    id_album_original, comentario)

VALUES
(2, 3, 'Lo Mejor de Lo Mejor', 'SE-9639', 1979, 2, TRUE, FALSE, FALSE, FALSE, NULL, ''),
(2, 3, 'Disco de Oro', 'SE-9794', 1983, 2, TRUE, FALSE, FALSE, FALSE, NULL, '');

--------------------------------------------------------------------------------------- LOS YUNGAS ---------------------------------------------------------------------------------------

-- SONO RADIO

INSERT INTO Albumes (
    id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, 
    id_tipo_album, es_recopilatorio, es_varios_artistas, es_disco_split, es_reedicion, 
    id_album_original, comentario)

VALUES
(5, 3, '¡Rítmos Tropicales!', 'SE-9478', 1974, 2, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(5, 3, 'Bailando con... Los Yungas', 'SE-9535', 1975, 2, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(5, 3, '¡Qué Tal Rítmo!', 'SE-9556', 1976, 2, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(5, 3, 'La Fiesta es con Los Yungas', 'SE-9583', 1977, 2, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(5, 3, 'Estilo y Sabor de Los Yungas', 'SE-9607', 1977, 2, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(5, 3, 'Los Consagrados', 'SE-9633', 1978, 2, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(5, 3, 'Están Bailando, Están Gozando con Los Yungas', 'SE-9650', 1979, 2, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(5, 3, 'Para Todo el Mundo', 'SE-9683', 1980, 2, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(5, 3, 'Hasta que Amanezca Bailando con Los Yungas', 'SE-9706', 1980, 2, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(5, 3, 'Diluvio Tropical', 'SE-9773', 1982, 2, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- INFOPESA

INSERT INTO Albumes (
    id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, 
    id_tipo_album, es_recopilatorio, es_varios_artistas, es_disco_split, es_reedicion, 
    id_album_original, comentario)

VALUES
(5, 1, 'Vuelven', 'INF-208359', 1985, 2, FALSE, FALSE, FALSE, FALSE, NULL, '');

--------------------------------------------------------------------------------------- GRUPO FANTASIA DE MONSEFÚ -----------------------------------------------------------------------------

-- SONO RADIO

INSERT INTO Albumes (
    id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, 
    id_tipo_album, es_recopilatorio, es_varios_artistas, es_disco_split, es_reedicion, 
    id_album_original, comentario)

VALUES
(330, 3, 'El Poder Musical', 'SE-9841', 1984, 2, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- MIDAS

INSERT INTO Albumes (
    id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, 
    id_tipo_album, es_recopilatorio, es_varios_artistas, es_disco_split, es_reedicion, 
    id_album_original, comentario)

VALUES
(330, 5, 'Con Cariño', 'LPG-216049', 1984, 2, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(330, 1, 'Pa Todo el Año', 'INF-208375', 1985, 2, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- INFOPESA

INSERT INTO Albumes (
    id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, 
    id_tipo_album, es_recopilatorio, es_varios_artistas, es_disco_split, es_reedicion, 
    id_album_original, comentario)

VALUES
(330, 1, 'Cumbias Poderosas', 'INF-208394', 1986, 2, FALSE, FALSE, FALSE, FALSE, NULL, '');

--------------------------------------------------------------------------------------- LOS WEMBLER'S DE IQUITOS ------------------------------------------------------------------------------

-- ODEON

INSERT INTO Albumes (
    id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, 
    id_tipo_album, es_recopilatorio, es_varios_artistas, es_disco_split, es_reedicion, 
    id_album_original, comentario)

VALUES
(49, 4, 'Al Rítmo de Los Wembler''s', 'LD-2195', 1972, 2, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- DECIBEL

INSERT INTO Albumes (
    id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, 
    id_tipo_album, es_recopilatorio, es_varios_artistas, es_disco_split, es_reedicion, 
    id_album_original, comentario)

VALUES
(49, 34, 'La Danza del Petrolero', 'LP-2001', 1974, 2, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(49, 34, 'La Amenaza Verde', 'LP-2008', 1975, 2, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(49, 34, 'El Encanto de la Selva', 'LP-2024', 1976, 2, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(49, 34, 'Carapira', 'LP-2034', 1976, 2, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- SONO RADIO

INSERT INTO Albumes (
    id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, 
    id_tipo_album, es_recopilatorio, es_varios_artistas, es_disco_split, es_reedicion, 
    id_album_original, comentario)

VALUES
(49, 3, 'Fiesta en la Selva', 'SE-9598', 1977, 2, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(49, 3, 'Bailando Hasta el Amanecer', 'SE-9620', 1978, 2, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(49, 3, 'Fiebre en la Selva', 'SE-9636', 1978, 2, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(49, 3, 'El Sabor Tropical', 'SE-9644', 1979, 2, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(49, 3, 'Estos son los Famosos Wembler''s de Iquitos', 'SE-9671', 1979, 2, FALSE, FALSE, FALSE, FALSE, NULL, '');

------------------------------------------------------------------------------------- LOS ORIENTALES DE VÍCTOR ------------------------------------------------------------------------------

-- SONO RADIO

INSERT INTO Albumes (
    id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, 
    id_tipo_album, es_recopilatorio, es_varios_artistas, es_disco_split, es_reedicion, 
    id_album_original, comentario)

VALUES
(48, 3, 'Con Sabor Tropical', 'SE-9396', 1972, 2, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(48, 3, '¡Tremendo Rítmo!', 'SE-9444', 1973, 2, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- DIFA

INSERT INTO Albumes (
    id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, 
    id_tipo_album, es_recopilatorio, es_varios_artistas, es_disco_split, es_reedicion, 
    id_album_original, comentario)

VALUES
(48, 11, 'Lo Fuerte del Gua Gua', 'DLPS-81011', 1981, 2, FALSE, FALSE, FALSE, FALSE, NULL, '');

---------------------------------------------------------------------------------- LOS TIGRES DE MARINO VALENCIA ----------------------------------------------------------------------------

-- SONO RADIO

INSERT INTO Albumes (
    id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, 
    id_tipo_album, es_recopilatorio, es_varios_artistas, es_disco_split, es_reedicion, 
    id_album_original, comentario)

VALUES
(62, 3, 'El Cumbión del Año', 'SE-9643', 1979, 2, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(62, 3, 'Un Rugido Musical', 'SE-9666', 1979, 2, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(62, 3, 'Furia Tropical', 'SE-9680', 1980, 2, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(62, 3, 'Paraiso Tropical', 'SE-9710', 1981, 2, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(62, 3, 'Fuego Tropical', 'SE-9740', 1981, 2, FALSE, FALSE, FALSE, FALSE, NULL, '');

-------------------------------------------------------------------------------- LOS TIMPANOS DE CERRO DE PASCO ----------------------------------------------------------------------------

-- SONO RADIO

INSERT INTO Albumes (
    id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, 
    id_tipo_album, es_recopilatorio, es_varios_artistas, es_disco_split, es_reedicion, 
    id_album_original, comentario)

VALUES
(67, 3, 'El Super Sonido', 'SE-9768', 1982, 2, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- LESISA

INSERT INTO Albumes (
    id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, 
    id_tipo_album, es_recopilatorio, es_varios_artistas, es_disco_split, es_reedicion, 
    id_album_original, comentario)

VALUES
(67, 54, 'El Super Show de Los Tímpanos', '15-020-99', 1983, 2, FALSE, FALSE, FALSE, FALSE, NULL, '');