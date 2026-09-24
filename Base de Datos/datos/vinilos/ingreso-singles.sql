-- ======================================================================================================================
-- GUÍA DE COLUMNAS PARA EL REGISTRO DE SINGLES / DISCOS DE 45 RPM (TABLA: Albumes)
-- ======================================================================================================================
-- A continuación se listan y explican las columnas disponibles para registrar discos en formato 45 RPM (Singles)
-- y los criterios musicológicos para saber cuándo y cómo utilizar cada una:
--
-- 1. id_grupo (INT)
--    • Cuándo usarla: Siempre que el single pertenezca a una agrupación o solista principal identificado (FK hacia la tabla 'Grupos').
--    • Nota: En caso de discos compartidos (split A/B de diferentes grupos), se coloca el grupo principal o se vincula mediante 'Albumes_Grupos_Lados'.
--
-- 2. id_sello (INT)
--    • Cuándo usarla: Siempre que se conozca la disquera o sello editor que prensó el vinilo (FK hacia 'Sellos_Discograficos', ej. Infopesa, Difa, Horóscopo).
--
-- 3. numero_catalogo (VARCHAR)
--    • Cuándo usarla: Para colocar el código alfanumérico, serie de prensaje o número de matriz oficial grabado en la galleta/etiqueta central o funda (ej. '009', '171110', '76-032').
--
-- 4. año_publicacion (SMALLINT)
--    • Cuándo usarla: Cuando se dispone de la fecha o año exacto/estimado en que el 45 RPM fue lanzado comercialmente (ej. 1974).
--
-- 5. id_tipo_album (INT)
--    • Cuándo usarla: OBLIGATORIO. Para discos de 45 RPM / Singles el valor es SIEMPRE 1 (corresponde a '45' en la tabla 'Tipos_Album').
--
-- 6. nombre_album (VARCHAR) [Opcional en singles]
--    • Cuándo usarla: La mayoría de los 45 RPM no tenían nombre de álbum (solo tema en Lado A y tema en Lado B), por lo que suele quedar NULL o no incluirse.
--      Solo se llena si el single tuvo un título comercial promocional explícito o nombre de portada especial.
--
-- 7. incluido_en_lp (BOOLEAN) [DEFAULT FALSE]
--    • Cuándo usarla: Marcar como TRUE cuando este single de 45 RPM se grabó y publicó de forma independiente primero, y posteriormente sus canciones fueron incluidas en un LP de larga duración.
--
-- 8. extraido_de_lp (BOOLEAN) [DEFAULT FALSE]
--    • Cuándo usarla: Marcar como TRUE cuando el single de 45 RPM fue cortado y prensado como corte promocional o desprendimiento a partir de un LP que ya existía en el mercado.
--
-- 9. solo_en_45 (BOOLEAN) [DEFAULT FALSE]
--    • Cuándo usarla: Marcar como TRUE cuando las grabaciones contenidas en este disco NUNCA salieron en ningún LP ni compilatorio oficial de la época (rarezas o temas exclusivos en 45 RPM).
--
-- 10. id_lp_relacionado (INT) [NULLABLE]
--     • Cuándo usarla: Cuando 'incluido_en_lp = TRUE' o 'extraido_de_lp = TRUE', se ingresa aquí el 'id_album' del LP correspondiente para crear la trazabilidad directa entre el single y el álbum grande.
--
-- 11. es_reedicion (BOOLEAN) [DEFAULT FALSE]
--     • Cuándo usarla: Marcar como TRUE si el vinilo es un re-prensaje posterior, segundo tiraje con cambio de etiqueta/diseño, o reedición bajo otra casa disquera en años posteriores al original.
--
-- 12. id_album_original (INT) [NULLABLE]
--     • Cuándo usarla: Cuando 'es_reedicion = TRUE', se ingresa el 'id_album' del prensaje original primigenio (la primera edición) para enlazar el árbol de reediciones.
--
-- 13. comentario (TEXT)
--     • Cuándo usarla: Para documentar particularidades históricas, estado del soporte físico, variantes de color de vinilo, cambios de sello, dedicatorias o notas de coleccionista.
--
-- 14. url_etiqueta / url_portada / url_contraportada (VARCHAR) [Opcional]
--     • Cuándo usarla: Para enlazar las fotografías o digitalizaciones de la galleta/etiqueta central circular ('url_etiqueta') o carátula de papel/funda si la tuviera ('url_portada').
-- ======================================================================================================================

---------------------------------------------------------------------------------------------------------------------- GRUPO CELESTE ----------------------------------------------------------------------------------------------------------------------


-- DIFA
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(12, 11, '009', 1973, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(12, 11, '141', 1982, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(12, 11, '142', 1982, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(12, 11, '144', 1982, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- DISCOPE
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(12, 25, '001', 1974, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(12, 25, '003', 1974, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(12, 25, '006', 1974, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(12, 25, '014', 1975, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(12, 25, '015', 1975, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(12, 25, '016', 1975, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(12, 25, '018', 1975, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(12, 25, '019', 1975, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(12, 25, '76-032', 1976, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(12, 25, '76-033', 1976, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- PRODIC
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(12, 49, '001', 1976, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(12, 49, '003', 1977, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(12, 49, '004', 1977, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(12, 49, '006', 1978, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(12, 49, '009', 1978, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(12, 49, '010', 1978, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(12, 49, '011', 1979, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(12, 49, '012', 1979, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(12, 49, '013', 1979, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(12, 49, '001-80', 1980, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- INFOPESA
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(12, 1, '171110', 1980, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(12, 1, '171143', 1980, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(12, 1, '171168', 1980, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(12, 1, '171336', 1982, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- SONORADIO
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(12, 3, '13742', 1981, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- EMUCEL
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(12, 62, '80-001', 1980, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(12, 62, '81-001', 1981, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(12, 62, '81-003', 1981, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(12, 62, '83-001', 1983, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(12, 62, '83-002', 1983, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(12, 62, '84-004', 1984, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- HORÓSCOPO
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(12, 2, '1195', 1985, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(12, 2, '1229', 1986, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

---------------------------------------------------------------------------------------------------------------------- EL SUPER GRUPO ----------------------------------------------------------------------------------------------------------------------

-- DISCOPE
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(23, 25, '76-040', 1976, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(23, 25, '77-043', 1977, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- GALEM
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(23, 68, '001', 1977, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(23, 68, '003', 1977, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(23, 68, '006', 1978, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(23, 68, '009', 1978, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- HORÓSCOPO
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(23, 2, '1025', 1979, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(23, 2, '1029', 1979, 1, FALSE, FALSE, FALSE, FALSE, NULL, 'Tiene dos temas en el lado A y se reproduce a 45 rpm'),
(23, 2, '1099', 1982, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- DIFA
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(23, 11, '90', 1980, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(23, 11, '99', 1980, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(23, 11, '108', 1981, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(23, 11, '118', 1981, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(23, 11, '128', 1982, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(23, 11, '135', 1982, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(23, 11, '156', 1982, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- MUSIC SHOP
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(23, 7, '01-183', 1985, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- INFOPESA
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(23, 1, '171404', 1983, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(23, 1, '171433', 1984, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(23, 1, '171440', 1984, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(23, 1, '171446', 1984, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- WR
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(23, 56, '10', 1986, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- CARAVANA RECORD
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(23, 9, '42', 1987, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(23, 9, '44', 1987, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

---------------------------------------------------------------------------------------------------------------------- CIELO GRIS ----------------------------------------------------------------------------------------------------------------------

-- CARACOL
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(22, 13, '3', 1975, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(22, 13, '13', 1975, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(22, 13, '18', 1976, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- PRODITA
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(22, 84, '78-02', 1978, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(22, 84, '79-03', 1979, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(22, 84, '80-03', 1980, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- HORÓSCOPO
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(22, 2, '1036', 1980, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(22, 2, '1047', 1980, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(22, 2, '1059', 1981, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(22, 2, '1069', 1981, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(22, 2, '1211', 1985, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- SONORADIO
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(22, 3, '13805', 1983, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(22, 3, '13812', 1984, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- MIDAS
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(22, 5, '110063', 1982, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(22, 5, '110071', 1982, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(22, 5, '110091', 1982, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(22, 5, '110100', 1983, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(22, 5, '110189', 1986, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(22, 5, '110190', 1986, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(22, 5, '110195', 1987, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- AVISPA
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(22, 93, '1002', 1978, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- KOZMOZ
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(22, 93, '1002', 1983, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- ROSA RECORD
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(22, 33, '11', 1984, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');


---------------------------------------------------------------------------------------- LOS DESTELLOS ----------------------------------------------------------------------------------------

-- HORÓSCOPO
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(1, 2, '1190', 1985, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(1, 2, '1217', 1985, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- IEMPSA
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(1, 36, '19432775', 1987, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- ODEON
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(1, 4, '10237', 1968, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(1, 4, '10403', 1968, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(1, 4, '10496', 1968, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(1, 4, '10520', 1968, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(1, 4, '10556', 1968, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(1, 4, '10634', 1969, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(1, 4, '10673', 1969, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(1, 4, '10736', 1969, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(1, 4, '10764', 1969, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(1, 4, '10858', 1969, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(1, 4, '10912', 1969, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(1, 4, '10977', 1970, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(1, 4, '11056', 1970, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(1, 4, '11093', 1970, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(1, 4, '11117', 1970, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(1, 4, '11175', 1971, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(1, 4, '11231', 1971, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(1, 4, '11277', 1971, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(1, 4, '11299', 1971, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(1, 4, '11376', 1971, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(1, 4, '11420', 1971, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(1, 4, '11465', 1972, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(1, 4, '11542', 1972, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(1, 4, '11564', 1972, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(1, 4, '11650', 1972, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(1, 4, '11709', 1972, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(1, 4, '11779', 1972, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(1, 4, '010120', 1973, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(1, 4, '010129', 1973, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(1, 4, '010183', 1973, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(1, 4, '0101144', 1973, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(1, 4, '0101214', 1974, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(1, 4, '0101252', 1974, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(1, 4, '0101287', 1974, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(1, 4, '0101369', 1974, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(1, 4, '0101404', 1974, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(1, 4, '0101495', 1975, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(1, 4, '0101534', 1975, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(1, 4, '0101660', 1975, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(1, 4, '0101704', 1976, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(1, 4, '0101796', 1976, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(1, 4, '0101831', 1976, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(1, 4, '0101873', 1976, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(1, 4, '0101993', 1977, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(1, 4, '01011069', 1977, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(1, 4, '01011070', 1977, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(1, 4, '01011138', 1977, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(1, 4, '01011153', 1978, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(1, 4, '01011234', 1978, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(1, 4, '01011327', 1978, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(1, 4, '01011364', 1979, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(1, 4, '01011408', 1979, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(1, 4, '01011467', 1979, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(1, 4, '01011631', 1980, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(1, 4, '01011666', 1980, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(1, 4, '01011763', 1981, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(1, 4, '01011855', 1981, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(1, 4, '01012034', 1982, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(1, 4, '01012167', 1984, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(1, 4, '01012222', 1984, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(1, 4, '01012291', 1984, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(1, 4, '01012371', 1985, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

---------------------------------------------------------------------------------------- LOS ECOS ----------------------------------------------------------------------------------------

-- CANPARD
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(4, 123, 'CP-003', 1971, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- ECODISCOS
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(4, 206, '81001', 1981, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- FTA
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(4, 6, '50601', 1971, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(4, 6, '50641', 1971, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(4, 6, '50694', 1972, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(4, 6, '50726', 1972, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(4, 6, '50773', 1972, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(4, 6, '50849', 1973, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(4, 6, '50871', 1973, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(4, 6, '50902', 1973, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(4, 6, '50928', 1974, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(4, 6, '50951', 1974, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(4, 6, '50957', 1974, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(4, 6, '50985', 1974, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(4, 6, '51003', 1975, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(4, 6, '51041', 1975, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(4, 6, '51071', 1976, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(4, 6, '51093', 1976, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(4, 6, '51127', 1976, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(4, 6, '51134', 1976, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(4, 6, '51306', 1978, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(4, 6, '51320', 1978, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(4, 6, '51340', 1979, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- CARACOL
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(4, 13, '24', 1976, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(4, 13, '33', 1976, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(4, 13, '47', 1977, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(4, 13, '48', 1977, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(4, 13, '51', 1977, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(4, 13, '55', 1978, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(4, 13, '58', 1978, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(4, 13, '60', 1978, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(4, 13, '62', 1978, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(4, 13, '73', 1979, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- INFOPESA
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(4, 1, '70959', 1978, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(4, 1, '71078', 1980, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(4, 1, '171090', 1980, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(4, 1, '171121', 1980, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(4, 1, '171164', 1980, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(4, 1, '171189', 1980, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(4, 1, '171231', 1981, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(4, 1, '171259', 1981, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(4, 1, '171303', 1982, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(4, 1, '171317', 1982, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(4, 1, '171536', 1986, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- FONOHIT
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(4, 51, '820003', 1982, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(4, 51, '830011', 1983, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(4, 51, '830014', 1983, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- SONORADIO
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(4, 3, '13834', 1985, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(4, 3, '13837', 1985, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- HORÓSCOPO
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(4, 2, '1244', 1986, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(4, 2, '1261', 1986, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- CARAVANA
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(4, 9, '45', 1987, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

--------------------------------------------------------------------------------------- LOS ILUSIONISTAS --------------------------------------------------------------------------------------

-- DINSA
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(39, 15, '1159', 1973, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- CARACOL
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(39, 13, '37', 1977, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(39, 13, '45', 1977, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(39, 13, '53', 1978, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(39, 13, '59', 1978, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(39, 13, '63', 1978, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(39, 13, '71', 1979, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(39, 13, '74', 1980, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(39, 13, '112071', 1980, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(39, 13, '112081', 1980, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(39, 13, '112084', 1981, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(39, 13, '112086', 1981, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(39, 13, '112090', 1981, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(39, 13, '112091', 1982, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- FONOHIT
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(39, 51, '830009', 1983, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(39, 51, '840001', 1984, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- INFOPESA
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(39, 1, '171473', 1985, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- PRODUCCIONES WALTER LEON
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(39, 207, '005', 1980, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

--------------------------------------------------------------------------------------- GRUPO NARANJA -----------------------------------------------------------------------------------------

-- DIN-DON
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(43, 94, '78-dd-02', 1978, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- CARACOL
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(43, 13, '19', 1976, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(43, 13, '21', 1976, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(43, 13, '31', 1976, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(43, 13, '67', 1979, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(43, 13, '2', 1978, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- PODEROSO
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(43, 37, '03', 1977, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(43, 37, '10', 1977, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(43, 37, '13', 1977, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(43, 37, '23', 1978, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- INFOPESA
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(43, 1, '70944', 1978, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(43, 1, '70977', 1978, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- ODEON
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(43, 4, '01011444', 1979, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(43, 4, '01011525', 1979, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(43, 4, '01011587', 1980, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(43, 4, '01011681', 1980, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(43, 4, '01011771', 1981, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(43, 4, '01011816', 1981, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(43, 4, '01012017', 1982, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- IEMPSA
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(43, 36, '50152824', 1988, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(43, 36, '51152854', 1988, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

----------------------------------------------------------------------------------------- GRUPO FIESTA -----------------------------------------------------------------------------------------

-- PODEROSO
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(50, 37, '24', 1978, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(50, 37, '29', 1978, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(50, 37, '32', 1978, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- ODEON
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(50, 4, '01011478', 1979, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(50, 4, '01011533', 1979, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(50, 4, '01011682', 1980, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(50, 4, '01011705', 1980, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(50, 4, '01011762', 1981, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- CARACOL
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(50, 13, '68', 1979, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(50, 13, '112088', 1981, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- SONORADIO
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(50, 3, '13766', 1982, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(50, 3, '13835', 1985, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- CARAVANA
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(50, 9, '6', 1983, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

----------------------------------------------------------------------------------------- LOS ZÍNGAROS -----------------------------------------------------------------------------------------

-- IMSA
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(77, 38, '201', 1974, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- CARACOL
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(77, 13, '2', 1975, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(77, 13, '12', 1975, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(77, 13, '26', 1976, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(77, 13, '80', 1980, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(77, 13, '112987', 1981, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(77, 13, '112092', 1983, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(77, 13, '112093', 1983, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- PODEROSO
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(77, 37, '4', 1977, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(77, 37, '16', 1977, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(77, 37, '30', 1978, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

-------------------------------------------------------------------------------------------- CHACALÓN Y LA NUEVA CREMA -------------------------------------------------------------------------------------------
-- HORÓSCOPO
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(7, 2, '1002', 1977, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(7, 2, '1003', 1977, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(7, 2, '1010', 1978, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(7, 2, '1017', 1978, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(7, 2, '1019', 1979, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(7, 2, '1023', 1979, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(7, 2, '1026', 1979, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(7, 2, '1044', 1980, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(7, 2, '1057', 1980, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(7, 2, '1064', 1981, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(7, 2, '1072', 1981, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(7, 2, '1088', 1982, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(7, 2, '1089', 1982, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(7, 2, '1090', 1982, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(7, 2, '1106', 1983, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(7, 2, '1126', 1983, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(7, 2, '1140', 1984, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(7, 2, '1165', 1984, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(7, 2, '1209', 1985, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- DIFA
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(7, 11, '78', 1979, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- PRODISAR
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(7, 8, '161', 1986, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- MARKAHUASI
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(7, 18, '103111', 1987, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');


-------------------------------------------------------------------------------------------------- LA MERMELADA --------------------------------------------------------------------------------------------------

-- HORÓSCOPO
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(31, 2, '1006', 1978, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(31, 2, '1007', 1978, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(31, 2, '1020', 1979, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(31, 2, '1024', 1979, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(31, 2, '1033', 1980, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(31, 2, '1035', 1980, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(31, 2, '1046', 1980, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(31, 2, '1053', 1981, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(31, 2, '1070', 1981, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(31, 2, '1079', 1981, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(31, 2, '1086', 1982, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(31, 2, '1118', 1983, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(31, 2, '1132', 1983, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- INFORESA
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(31, 1, '171486', 1985, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(31, 1, '171524', 1985, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- HUATISA
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(31, 208, '1', 1978, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

------------------------------------------------------------------------------------------------------------------------ LOS SHAPIS ----------------------------------------------------------------------------------------------------------------------------

-- HORÓSCOPO
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(9, 2, '1067', 1981, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(9, 2, '1075', 1981, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(9, 2, '1082', 1981, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(9, 2, '1094', 1982, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(9, 2, '1102', 1982, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(9, 2, '1104', 1983, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(9, 2, '1107', 1983, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(9, 2, '1124', 1983, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(9, 2, '1136', 1983, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(9, 2, '1138', 1984, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(9, 2, '1145', 1984, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(9, 2, '1155', 1984, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(9, 2, '1163', 1984, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(9, 2, '1176', 1984, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(9, 2, '1177', 1984, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- ARCO IRIS
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(9, 31, '85001', 1985, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(9, 31, '85004', 1985, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(9, 31, '85006', 1985, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(9, 31, '85010', 1985, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(9, 31, '85011', 1985, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(9, 31, '86016', 1986, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(9, 31, '86026', 1986, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(9, 31, '87034', 1987, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

----------------------------------------------------------------------------------------------------- PINTURA ROJA ---------------------------------------------------------------------------------------------------------------------------------------

-- HORÓSCOPO
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(28, 2, '1147', 1984, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(28, 2, '1166', 1984, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(28, 2, '1180', 1985, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(28, 2, '1208', 1985, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(28, 2, '1233', 1985, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(28, 2, '1245', 1986, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(28, 2, '1263', 1986, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- PRODISAR
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(28, 8, '163', 1987, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');


------------------------------------------------------------------------------------------------------------------ LOS OVNIS ----------------------------------------------------------------------------------------------------------------------------

-- HORÓSCOPO
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(27, 2, '1027', 1979, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(27, 2, '1030', 1979, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(27, 2, '1039', 1980, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(27, 2, '1049', 1980, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(27, 2, '1058', 1981, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(27, 2, '1065', 1981, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(27, 2, '1076', 1981, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(27, 2, '1095', 1982, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(27, 2, '1172', 1984, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- DISGONZA
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(27, 14, 'III', 1981, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(27, 14, '1012', 1983, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(27, 14, '1014', 1983, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(27, 14, '1019', 1983, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(27, 14, '1022', 1983, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(27, 14, '1024', 1983, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- SONATA
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(27, 29, '27', 1979, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

-------------------------------------------------------------------------------------------------------------- CHACAL Y SUS ESTRELLAS -----------------------------------------------------------------------------------------------------------------------

-- SONATA
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(34, 29, '19', 1978, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(34, 29, '25', 1978, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- HUATISA
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(34, 208, '2', 1978, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- PENTAFONO
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(34, 72, '3', 1978, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- PRODIC
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(34, 49, '8', 1978, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- DISCOS YOLITA
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(34, 76, '1', 1979, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(34, 76, '1', 1979, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(34, 76, '2', 1979, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(34, 76, '11', 1980, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- DISGONZA
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(34, 14, '3', 1980, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(34, 14, '4', 1980, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(34, 14, '101', 1980, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(34, 14, '103', 1980, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(34, 14, '106', 1981, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(34, 14, '109', 1981, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(34, 14, '112', 1981, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(34, 14, '1003', 1981, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(34, 14, '1006', 1982, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(34, 14, '1011', 1983, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(34, 14, '1014', 1983, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(34, 14, '1017', 1983, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- INFOPESA
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(34, 1, '70804', 1977, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(34, 1, '70823', 1977, 1, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(34, 1, '20001', 1977, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- DISCOS CHICHA
INSERT INTO Albumes (id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, incluido_en_lp, extraido_de_lp, solo_en_45, es_reedicion, id_album_original, comentario)
VALUES

(34, 30, '20008', 1977, 1, FALSE, FALSE, FALSE, FALSE, NULL, '');


-------------------------------------------------------------------------------------------------------------- GRUPO ALEGRÍA -----------------------------------------------------------------------------------------------------------------------

