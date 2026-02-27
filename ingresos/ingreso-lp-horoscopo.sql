----------------------------------------------------------- INGRESO DE LONGPLAYS DE HORÓSCOPO -----------------------------------------------------------

USE cumbia_peruana;

SELECT * FROM Albumes;

---------------------------------------------------------------------------------------- LOS DESTELLOS ---------------------------------------------------------------------------------

-- ODEON
INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES
(1, 4, 'Los Destellos', 'ELD-1735', 1968, 2), 
(1, 4, 'En Orbita', 'ELD-1795', 1968, 2), 
(1, 4, 'Solo Ellos: Los Destellos', 'ELD-1855', 1969, 2), 
(1, 4, 'Mundial', 'ELD-1915', 1970, 2), 
(1, 4, 'En La Cumbre', 'ELD-1953', 1970, 2), 
(1, 4, 'Clase Aparte', 'ELD-2034', 1971, 2), 
(1, 4, 'Constelación', 'ELD-2105', 1972, 2), 
(1, 4, 'Arrollando', 'ELD-020112', 1973, 2), 
(1, 4, 'Destellantes', 'ELD-0201126', 1974, 2),
(1, 4, 'El Millón de Los Destellos', 'ELD-0201170', 1974, 2),
(1, 4, 'Linda Chiquilina', 'ELD-0201218', 1975, 2),
(1, 4, 'Ojos Azules', 'ELD-0201314', 1976, 2),
(1, 4, 'En Jira Por Todo El Perú', 'ELD-0201371', 1976, 2),
(1, 4, 'Carmen Rosa y otros Éxitos', 'ELD-0201411', 1976, 2),
(1, 4, 'Los Incomparables Del Rítmo', 'ELD-0201510', 1977, 2),
(1, 4, '10 Años De Triunfo', 'ELD-0201644', 1978, 2),
(1, 4, 'Yo Mismo Soy', 'ELD-0201746', 1979, 2),
(1, 4, 'Para Todo El Mundo', 'ELD-0201834', 1980, 2),
(1, 4, 'Una Hora con Los Destellos', 'ELD-05011276', 1985, 2);

-- HORÓSCOPO
INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES
(1, 2, 'El Retorno Triunfal', 'HLP-1054', 1986, 2);

-------------------------------------------------------------------------------- CHACALÓN Y LA NUEVA CREMA ---------------------------------------------------------------------------------

-- HORÓSCOPO
INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES
(7, 2, 'Chacalón y La Nueva Crema','HLP-1001', 1981, 2), 
(7, 2, 'Éxitos, Éxitos, Éxitos', 'HLP-1002', 1981, 2),
(7, 2, 'El Soberano de la Cumbia', 'HLP-1009', 1982, 2), 
(7, 2, 'Los Admirados', 'HLP-1018', 1983, 2),
(7, 2, 'Tu Vida, Mi Vida', 'HLP-1038', 1985, 2);

-- PRODISAR
INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES
(7, 8, 'Soy Feliz', 'LP-2055', 1986, 2);

-- MARKAHUASI
INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES
(7, 18, 'La Voz del Pueblo', 'LP-002', 1987, 2),
(7, 18, 'Loco Amor', 'LP-002', 1988, 2), 
(7, 18, 'Niños Pobres del Mundo', 'LP-003', 1989, 2);

--------------------------------------------------------------------------------------- LOS OVNIS -------------------------------------------------------------------------------------

-- HORÓSCOPO
INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES
(27, 2, 'Bailando con Los Ovnis', 'HLP-1005', 1981, 2),
(27, 2, 'Los Creadores Del Ritmo Tropical Andino', 'HLP-1035', 1985, 2),
(27, 2, 'Invasión Musical', 'HLP-1062', 1986, 2),
(27, 2, 'Desde Huancayo', 'HLP-1078', 1987, 2);

-- DISGONZA
INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES
(27, 14, 'Insuperables', 'LPD-002', 1982, 2),
(27, 14, 'La Gira de Los Ovnis', 'LPD-003', 1983, 2),
(27, 14, 'Ven a Bailar Conmigo', 'LPD-004', 1984, 2);


----------------------------------------------------------------------------- CUARTETO UNIVERSAL ----------------------------------------------------------------------------------------

-- HORÓSCOPO
INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES
(24, 2, 'Yo Claudio', 'HLP-1012', 1982, 2), 
(24, 2, 'Cumbias Pegaditas Vol. 2', 'HLP-1022', 1984, 2), 
(24, 2, 'Hoy, Mañana y Siempre', 'HLP-1036', 1985, 2),
(24, 2, 'Los Inconfundibles e Inimitables', 'HLP-1047', 1986, 2), 
(24, 2, 'El Apagón Musical', 'HLP-1048', 1986, 2),
(24, 2, 'Encuentro Tropical del Año', 'HLP-1050', 1986, 2), 
(24, 2, 'Insuperables', 'HLP-1056', 1986, 2), 
(24, 2, 'Poder Musical', 'HLP-1060', 1986, 2), 
(24, 2, 'Los Únicos Por Siempre', 'HLP-1069', 1987, 2), 
(24, 2, 'Somos Profesionales', 'HLP-1070', 1987, 2);

------------------------------------------------------------------------------------ LA MERMELADA -------------------------------------------------------------------------------

-- HORÓSCOPO
INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES
(31, 2, 'La Rica Mermelada', 'HLP-1004', 1981, 2), 
(31, 2, 'A Bailar con La Mermelada', 'HLP-1013', 1982, 2);

-- IEMPSA
INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES
(31, 4, 'Sientelo...', 'IEMP-9790', 1982, 2);

-------------------------------------------------------------------------------- LOS SHAPIS ---------------------------------------------------------------------------------------------

-- HORÓSCOPO
INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)    
VALUES
(9, 2, 'Los Auténticos', 'HLP-1006', 1981, 2), 
(9, 2, 'Los Originales', 'HLP-1014', 1982, 2), 
(9, 2, 'Los Indiscutibles', 'HLP-1017', 1983, 2),
(9, 2, 'Feliz Aniversario', 'HLP-1020', 1984, 2), 
(9, 2, 'En Vivo', 'HLP-1028', 1984, 2), 
(9, 2, 'Por Los Caminos del Perú y el Mundo', 'HLP-1029', 1984, 2), 
(9, 2, 'A Bailar la Onda Tropical Andina', 'HLP-1042', 1985, 2);

-- ARCO IRIS
INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)    
VALUES
(9, 31, 'Del Pueblo para el Pueblo con Amor', 'LP-85001', 1985, 2),
(9, 31, 'Dulcemente... ¡Chicha!', 'LP-86001', 1986, 2),
(9, 31, 'El Mundo de los Pobres', 'LP-86002', 1986, 2);

-- COLIBRÍ
INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)    
VALUES
(9, 17, 'Rica Chicha', 'COL-0510006.1', 1987, 2), 
(9, 17, 'Cinco Estrellas en Chicha', 'COL-0510010.0', 1987, 2),
(9, 17, 'Corazón Andino', 'COL-0510017.6', 1987, 2);

----------------------------------------------------------------------------------- GRUPO ALEGRÍA --------------------------------------------------------------------------------------

-- HORÓSCOPO
INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES
(19, 2, 'Arrollando con Alegría', 'HLP-1016', 1983, 2), 
(19, 2, 'A Gozar con Alegría', 'HLP-1026', 1984, 2),
(19, 2, 'Lo Máximo y Punto', 'HLP-1030', 1984, 2), 
(19, 2, 'Super Clan', 'HLP-1046', 1986, 2), 
(19, 2, 'Para Ti con Alegría', 'HLP-1061', 1986, 2),
(19, 2, 'Estilo Inconfundible', 'HLP-1073', 1987, 2);

-- PRODISAR
INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES
(19, 8, 'Nacido Para Triunfar', 'LP-2090', 1988, 2);

------------------------------------------------------------------------------------- PINTURA ROJA ---------------------------------------------------------------------------------------

-- HORÓSCOPO
INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES
(28, 2, 'Yo Soy la Cumbia', 'HLP-1033', 1984, 2), 
(28, 2, 'Pinceladas Musicales', 'HLP-1043', 1985, 2), 
(28, 2, 'Siempre Juntos', 'HLP-1063', 1986, 2);

-- PRODISAR
INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES
(28, 8, 'La Fuerza Musical', 'LP-2069', 1987, 2), 
(28, 8, 'Arrollando', 'LP-2087', 1988, 2);

----------------------------------------------------------------------------------- GRUPO MARAVILLA --------------------------------------------------------------------------------------

-- FARO RECORD
INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES
(17, 22, 'Tu Corazón y el Mío', 'LPFR-204003', 1982, 2), 
(17, 22, 'Al Compás del Halley', 'LPFR-204006', 1987, 2);

-- HORÓSCOPO
INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES
(17, 2, 'Siempre Arriba', 'HLP-1015', 1983, 2), 
(17, 2, 'A Sarita Colonia', 'HLP-1031', 1984, 2);

-- INFOPESA
INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES
(17, 1, 'Disco de Oro', 'INF-208412', 1985, 2);

-- COLIBRÍ
INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)    
VALUES
(17, 17, 'Un... Dos... Tres... Maravilla Otra Vez', 'COL-051001.6', 1988, 2);

--------------------------------------------------------------------------------- GRUPO HALLEY ------------------------------------------------------------------------------------------

-- HORÓSCOPO
INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES
(36, 2, 'Bailando al Rítmo', 'HLP-1052', 1986, 2), 
(36, 2, 'Cruel Traición', 'HLP-1068', 1987, 2), 
(36, 2, 'Por Este Loco Corazón', 'HLP-1072', 1987, 2);

-------------------------------------------------------------- GRUPO IMAGINACIÓN --------------------------------------------------------------

-- INFOPESA
INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES
(41, 1, 'De Cantina en Cantina', 'INF-208243', 1981, 2);

-- HORÓSCOPO
INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES
(41, 2, 'Tongo el Grande', 'HLP-1011', 1982, 2);

-------------------------------------------------------------- LOS NILOS --------------------------------------------------------------

-- HORÓSCOPO
INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES
(148, 2, 'Homenaje a Los Cantantes', 'HLP-1066', 1986, 2);

-------------------------------------------------------------- GRUPO MELODÍA --------------------------------------------------------------

-- HORÓSCOPO
INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES
(45, 2, 'En La Cuspide del Rítmo Tropical Andino', 'HLP-1040', 1985, 2);

-------------------------------------------------------------- NUBE GRIS --------------------------------------------------------------

-- HORÓSCOPO
INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES
(83, 2, 'Lluvia Tropical', 'HLP-1025', 1984, 2);

-------------------------------------------------------------- LOS CANTARITOS DE ORO --------------------------------------------------------------

-- HORÓSCOPO
INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album) 
VALUES
(126, 2, 'Los Cantaritos de Oro', 'HLP-1058', 1986, 2);

-- INFOPESA
INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES
(126, 1, 'Ven a Bailar', 'INF-208408', 1987, 2), 
(126, 1, 'Por Ella', 'INF-208435', 1988, 2);

-------------------------------------------------------------- GRUPO KARIÑO --------------------------------------------------------------

-- HORÓSCOPO
INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES
(119, 2, 'Ensueño Tropical', 'HLP-1055', 1986, 2);

-------------------------------------------------------------- LOS BLACKIES --------------------------------------------------------------

-- HORÓSCOPO
INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES
(125, 2, 'Me Recordarás', 'HLP-1065', 1986, 2);

-------------------------------------------------------------- LOS VIRTUOSOS DE LA CUMBIA --------------------------------------------------------------

-- HORÓSCOPO
INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES
(170, 2, 'A Romper Parlantes', 'HLP-1057', 1986, 2);

-------------------------------------------------------------- LOS BELLKINGS DE PIURA --------------------------------------------------------------

-- HORÓSCOPO
INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES
(81, 2, 'Pa Mi Tierra', 'HLP-1059', 1986, 2);

-- MAG
INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES
(81, 24, 'La Supremacia Musical', 'LPN-2732', 1988, 2);

-------------------------------------------------------------- CUARTETO IMBATIBLE --------------------------------------------------------------

-- HORÓSCOPO
INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES
(151, 2, 'A Mi Gente con Cariño', 'HLP-1053', 1986, 2);

-------------------------------------------------------------- VARIADO --------------------------------------------------------------

-- HORÓSCOPO
INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES
(581, 2, 'Festival Tropical', 'HLP-1019', 1983, 2), 
(581, 2, 'Festival de Cumbias Vol. 2', 'HLP-1027', 1984, 2), 
(581, 2, 'Como Pan Caliente', 'HLP-1041', 1985, 2);


USE cumbia_peruana;
--- CONSULTA DE OTROS SELLOS
SELECT
    Grupos.nombre_grupo,
    Albumes.nombre_album,
    Albumes.numero_catalogo,
    Albumes.año_publicacion,
    Sellos_Discograficos.nombre_sello
FROM
    Albumes
JOIN 
    Grupos ON Albumes.id_grupo = Grupos.id_grupo
JOIN 
    Sellos_Discograficos ON Albumes.id_sello = Sellos_Discograficos.id_sello
WHERE 
    Sellos_Discograficos.nombre_sello = 'Horoscopo'
ORDER BY 
    Albumes.año_publicacion ASC,
    Albumes.numero_catalogo ASC;