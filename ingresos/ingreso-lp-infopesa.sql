USE Cumbia_Peruana;

SELECT * FROM Albumes;


-------------------------------------------------------------- LOS ECOS --------------------------------------------------------------
INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES (4, 6, 'Ven y Goza Esta Cumbia', 'FLPS-142', 1973, 2), (4, 6, 'Peligro... Rítmo Explosivo', 'FLPS-195', 1974, 2), (4, 6, 'Peligrosa', 'FLPS-223', 1975, 2), 
(4, 6, 'Dame Tu Amor', 'FLPS-242', 1976, 2), (4, 6, 'Lo Mejor de Los Ecos', 'FLPS-252', 1976, 2), (4, 6, 'Baila Con Mis Éxitos', 'FLPS-293', 1978, 2),
(4, 13, 'Rítmo Espectacular', 'LP-001', 1978, 2), (4, 1, 'El Retorno Triunfal', 'INF-208180', 1980, 2), (4, 1, 'Lo Mejor de Los Ecos', 'INF-208253', 1981, 2), 
(4, 3, 'Aguita Clara', 'SE-9815', 1984, 2);

-------------------------------------------------------------- LOS ORIENTALES --------------------------------------------------------------

INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES (46, 15, 'Los Orientales de Paramonga', 'LPS-0066', 1971, 2), (46, 1, 'Fiesta En Oriente', 'LPS-8058', 1973, 2);

-------------------------------------------------------------- JUANECO Y SU COMBO --------------------------------------------------------------

INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album, comentario)
VALUES (6, 38, 'Juaneco Y Su Combo', 'LP-007', 1969, 2, ''), (6, 1, 'El Gran Cacique', 'LPS-8063', 1973, 2, ''), 
(6, 1, 'Dale Juaneco', 'LPS-8067', 1974, 2, '1 Ed.'), (6, 1, 'El Brujo', 'LPS-8081', 1975, 2, '1 Ed.'),
(6, 1, 'Linda Nena', 'LPS-8093', 1976, 2, ''), (6, 1, 'Aquí Están Los Reyes De La Selva', 'INF-8125', 1978, 2, ''),
(6, 1, 'Ven A Bailar Con Juaneco Y Su Combo', 'INF-8143', 1979, 2, ''), (6, 1, 'Dale Juaneco', 'INF-208067', 1979, 2, '2 Ed.'),
(6, 1, 'La Cumbia De Mi Pueblo', 'INF-208202', 1980, 2, ''), (6, 1, 'Viajando Por La Selva', 'INF-208298', 1982, 2, ''), 
(6, 1, 'El Brujo', 'INF-208081', 1981, 2, '2 Ed.'), (6, 1, 'Parranda Selvática', 'INF-208343', 1984, 2, ''), 
(6, 1, 'El Pescador', 'INF-208346', 1984, 2, ''), (6, 12, 'No Llores Abuelita', 'LPU-088', 1988, 2, '');

-------------------------------------------------------------- GRUPO CELESTE --------------------------------------------------------------

INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES (12, 25, 'El Fabuloso Grupo Celeste', 'LPD-1', 1975, 2), (12, 25, 'El Tropiloco Mundo del Grupo Celeste', 'LPD-2', 1976, 2), 
(12, 1, 'Reviviendo Lo Máximo', 'INF-208174', 1980, 2), (12, 1, 'El Mensaje Tropical del Fabuloso Grupo Celeste', 'INF-208191', 1980, 2),
(12, 1, 'Sentimientos', 'INF-208304', 1982, 2), (12, 2, 'Palomita', 'HLP-1044', 1986, 2);

-------------------------------------------------------------- LOS MIRLOS --------------------------------------------------------------

INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES (3, 1, 'El Sonido Selvático', 'LPS-8043', 1973, 2), (3, 1, 'El Poder Verde', 'LPS-8061', 1974, 2), (3, 1, 'Los Charapas de Oro', 'LPS-8069', 1975, 2),
(3, 1, 'El Milagro Verde', 'LPS-8088', 1975, 2), (3, 1, 'Tirense Con La Escoba', 'LPS-8097', 1976, 2), (3, 1, 'Tu Ñaña', 'LPS-8108', 1977, 2),
(3, 1, 'Lo Mejor de Los Mirlos', 'INF-8123', 1978, 2), (3, 1, 'Internacionalmente', 'INF-8124', 1978, 2), (3, 1, 'Lo Mejor de Los Mirlos Vol. 2', 'INF-208203', 1980, 2),
(3, 1, 'Con Sabor A Selva', 'INF-208209', 1980, 2), (3, 1, 'Tiro Al Blanco', 'INF-208267', 1982, 2), (3, 89, 'Los Mirlos', '15.1014', 1982, 2),
(3, 43, 'Cumbia Thriller', 'SE-8662', 1984, 2), (3, 36, 'El Encanto de Los Mirlos', 'ELD-30.15.1453', 1986, 2);

-------------------------------------------------------------- LOS WALKER'S --------------------------------------------------------------

INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES (20, 1, 'Sábado y Domingo Con Los Walkers', 'INF-208345', 1984, 2), (20, 1, 'Poco a Poquito', 'INF-208354', 1985, 2), (20, 1, 'Pollerita', 'INF-208373', 1985, 2),
(20, 1, 'Parrandeando con Los Walkers', 'INF-208419', 1987, 2), (20, 17, '¡Que Viva El Amor!', 'COL-05100114', 1988, 2);

-------------------------------------------------------------- LOS SILVER'S DE IQUITOS --------------------------------------------------------------

INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES (135, 1, 'Esta Es Tu Cumbia', 'LPS-8035', 1972, 2), (135, 1, 'Sueño Amazónico', 'LPS-8060', 1973, 2), (135, 1, 'Amazonía', 'LPS-8085', 1974, 2);

-------------------------------------------------------------- LOS PAKINES --------------------------------------------------------------

INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album, comentario)
VALUES (38, 1, 'Los Pakines', 'LPS-8023', 1972, 2, '1 Ed.'), (38, 1, 'Pasto Azul', 'LPS-8054', 1973, 2, ''), (38, 1, 'Los Pakines', 'INF-208023', 1987, 2, '2 Ed.'),
(38, 3, 'Los Pakines', 'SE-9465', 1974, 2, ''), (38, 3, 'En Escena', 'SE-9481', 1975, 2, ''), (38, 3, 'Los Pakines en Miami', 'SE-9521', 1975, 2, ''), 
(38, 3, 'Pakines 76', 'SE-9550', 1976, 2, ''), (38, 1, 'Lo Mejor De Lo Mejor', 'INF-208158', 1980, 2, 'Compilado');

-------------------------------------------------------------- LOS DEXTER'S DE UCHIZA --------------------------------------------------------------

INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES (16, 1, 'Los Dexters de Uchiza', 'LPS-8065', 1975, 2), (16, 7, 'Toma Lo Mejorcito', 'LP-0281016', 1981, 2), (16, 7, 'Fiesta En La Jungla', 'LP-0282036', 1982, 2),
(16, 7, 'La Nueva Dimensión', 'LP-0282060', 1982, 2), (16, 7, 'Alegría y Amor', 'LP-0283087', 1983, 2), (16, 7, '12 Super Éxitos Bailables', 'LP-0284110', 1984, 2),
(16, 7, 'A Bailar Empujaito', 'LP-0284121', 1984, 2), (16, 7, 'Los Embajadores De La Cumbia', 'LP-0285146', 1985, 2), (16, 1, 'Con El Mismo Son', 'INF-208420', 1987, 2);

-------------------------------------------------------------- LOS INVASORES DE PROGRESO --------------------------------------------------------------

INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES (15, 10, 'Selva Mía', 'DLPS-211', 1980, 2), (15, 10, 'Naranjitay', 'DLPS-217', 1981, 2), (15, 1, 'Disco de Oro', 'INF-208314', 1982, 2),
(15, 1, 'La Cumbia del Sharutero', 'INF-208316', 1982, 2), (15, 1, 'Invasión Tropical', 'INF-208367', 1985, 2), (15, 1, 'La Cumbia', 'INF-208397', 1986, 2);

-------------------------------------------------------------- SONIDO 2000 DE TARAPOTO --------------------------------------------------------------

INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES (29, 1, 'Fiesta En La Selva', 'LPS-8094', 1976, 2), (29, 1, 'Buena Mujer', 'INF-208139', 1979, 2), (29, 1, 'Eterno Amor', 'INF-208178', 1980, 2),
(29, 1, 'Las Muchachas', 'INF-208283', 1982, 2), (29, 1, 'Mensaje de Amor', 'INF-208410', 1987, 2);

-------------------------------------------------------------- LOS TIGRES DE TARAPOTO --------------------------------------------------------------

INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES (21, 10, 'La Danza de Los Tigres', 'DLPS-168', 1979, 2), (21, 10, 'Mi Selva Majestuosa', 'DLPS-191', 1980, 2), 
(21, 1, 'Los Grandes Exitos De Los Tigres De Tarapoto', 'INF-208241', 1981, 2), (21, 1, 'Para Ti Cariño', 'INF-208255', 1981, 2), (21, 1, 'El Tunchi Loco', 'INF-208334', 1984, 2),
(21, 1, 'La Vaca Loca', 'INF-208409', 1987, 2);

-------------------------------------------------------------- LOS DIFERENTES KENNEDY'S --------------------------------------------------------------

INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES (555, 1, 'Viajando Por el Amazonas', 'LPS-8073', 1975, 2), (555, 1, 'La Fiesta Comenzó', 'LPS-8106', 1976, 2);

-------------------------------------------------------------- LOS TIERRA ROJA --------------------------------------------------------------

INSERT INTO albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES (576, 1, 'Pa Mi Terruño', 'LPS-8075', 1975, 2), (576, 1, 'Mi Pueblo Hermoso', 'LPS-8100', 1976, 2);

-------------------------------------------------------------- LA SÉPTIMA REGIÓN DE PUCALLPA --------------------------------------------------------------

INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES (210, 1, 'El Sonido Mágico de la Selva', 'LPS-8102', 1976, 2);

-------------------------------------------------------------- LOS TRIONIX DE RIOJA --------------------------------------------------------------

INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES (492, 1, 'Bonita y Caprichosa', 'LPS-8079', 1975, 2), (492, 1, 'Vuelven Los Trionix', 'LPS-8101', 1976, 2);

-------------------------------------------------------------- ARMONIA 10 --------------------------------------------------------------

INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES (35, 1, 'El Chinchorro', 'INF-208350', 1985, 2), (35, 1, 'Se Quema, Se Quemó', 'INF-208363', 1985, 2),
(35, 1, 'Tonto Amor', 'INF-208378', 1985, 2), (35, 1, 'Gracias', 'INF-208418', 1987, 2);

-------------------------------------------------------------- AGUA MARINA --------------------------------------------------------------

INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES (40, 1, 'Baila Suavecito', 'INF-208393', 1986, 2), (40, 1, 'Sirena del Amor', 'INF-208404', 1987, 2),
(40, 1, 'Soy Pescador', 'INF-208430', 1988, 2);

-------------------------------------------------------------- LOS VIRTUOSOS DE LA SALSA --------------------------------------------------------------

INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES (47, 1, 'La Cachetoncita', 'INF-8133', 1978, 2), (47, 1, 'El Negro José', 'INF-208159', 1980, 2),
(47, 1, 'Mirame y otros Éxitos', 'INF-208160', 1980, 2), (47, 1, 'Dulce', 'INF-208234', 1981, 2), 
(47, 1, 'Cumbias y Salsas', 'INF-208254', 1981, 2), (47, 1, 'Chica Bonita', 'INF-208332', 1983, 2);

-------------------------------------------------------------- GRUPO ATLANTIC DE SAN MARTÍN --------------------------------------------------------------

INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES (64, 10, 'Fiesta Amazónica', 'LP-234', 1984, 2), (64, 1, 'Surcando el Huallaga', 'INF-208392', 1986, 2);

-------------------------------------------------------------- LOS LEONES --------------------------------------------------------------

INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES (108, 1, 'La Garra Musical', 'INF-208425', 1988, 2);

-------------------------------------------------------------- GRUPO 5 --------------------------------------------------------------

INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES (577, 1, 'No Pongas ese Disco', 'INF-208192', 1980, 2), (577, 1, 'Recuérdame', 'INF-208240', 1981, 2),
(577, 1, 'El Show Internacional', 'INF-208315', 1982, 2), (577, 1, 'Sueño Contigo', 'INF-208348', 1984, 2);

-------------------------------------------------------------- GRUPO MIRAMAR --------------------------------------------------------------

INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES (111, 1, 'Lucerito Madrugador', 'INF-208426', 1988, 2);

-------------------------------------------------------------- GRUPO FANTASIA --------------------------------------------------------------

INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES (331, 3,'El Poder Musical', 'SE-9841', 1984, 2), (331, 5, 'Con Cariño', 'LPG-216049', 1984, 2),
(331, 1, 'Pa Todo el Año', 'INF-208375', 1985, 2), (331, 1, 'Cumbia Poderosas', 'INF-208394', 1986, 2);

-------------------------------------------------------------- LOS YENNY'S --------------------------------------------------------------

INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES (141, 1, 'Cumbia del Cajascal', 'INF-208381', 1986, 2), (141, 1, 'La Negra Coqueta', 'INF-208421', 1988, 2);

-------------------------------------------------------------- GRUPO PARAISO DE LIZARDO PAOLO --------------------------------------------------------------

INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES (578, 1, 'Tropicalísimo', 'INF-208379', 1985, 2);

-------------------------------------------------------------- RICHARD Y SU GRUPO PARAISO --------------------------------------------------------------

INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES (56, 1, 'Chichas Pegaditas', 'INF-208383', 1986, 2), (56, 1, 'No Te Equivoques', 'INF-208400', 1986, 2),
(56, 1, 'La Carta', 'INF-208413', 1987, 2);

-------------------------------------------------------------- GRUPO AROMA --------------------------------------------------------------

INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES (103, 1, 'Los Magnificos del Grupo Aroma', 'INF-208344', 1984, 2);

-------------------------------------------------------------- GRUPO FLASH --------------------------------------------------------------

INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES (152, 1, 'Río Huallaga', 'INF-208431', 1988, 2);

-------------------------------------------------------------- LAS MANOS CRUZADAS --------------------------------------------------------------

INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES (98, 1, 'Mi Chacrita', 'INF-8146', 1979, 2);

-------------------------------------------------------------- ORO NEGRO --------------------------------------------------------------

INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES (110, 1, '14 Cumbias de Oro', 'LPCO-207003', 1983, 2);

-------------------------------------------------------------- COMBO PALACIO --------------------------------------------------------------

INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES (53, 5, 'A la Feria de Cali', 'LPG-216016', 1982, 2), (53, 1, 'Chofercito', 'INF-208365', 1985, 2);

-------------------------------------------------------------- EUSEBIO Y SU BANJO --------------------------------------------------------------

INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES (579, 1, 'Cumbia con Banjo', 'INF-208248', 1981, 2);

-------------------------------------------------------------- LOS CARIÑOSOS --------------------------------------------------------------

INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES (66, 1, 'Rica Música', 'LPS-8032', 1972, 2), (66, 1, 'Disco Fiesta', 'INF-208153', 1980, 2), 
(66, 1, '21 Éxitos con Los Cariñosos Vol. 1', 'INF-208318', 1982, 2), (66, 1, '21 Éxitos con Los Cariñosos Vol. 2', 'INF-208327', 1983, 2), 
(66, 1, '21 Éxitos con Los Cariñosos Vol. 3', 'INF-208361', 1985, 2);

-------------------------------------------------------------- CUARTETO AMAZÓNICO --------------------------------------------------------------

INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES (172, 1, 'Cumbia Loca', 'INF-208313', 1982, 2), (172, 1, 'Cumbia Americana', 'INF-208325', 1983, 2),
(172, 1, 'Parranda Amazónica', 'INF-208364', 1985, 2);

-------------------------------------------------------------- TONY MARÍN --------------------------------------------------------------

INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES (575, 1, 'Grandes Éxitos de Tony Marín', 'INF-208287', 1982, 2);

-------------------------------------------------------------- V REVELACIÓN DE JAÉN --------------------------------------------------------------

INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES (580, 1, 'Negra Cumbianbera', 'INF-208384', 1987, 2);

-------------------------------------------------------------- GRUPO IMPACTO DE BELLAVISTA --------------------------------------------------------------

INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES (524, 1, 'La Farra', 'INF-208382', 1986, 2);

-------------------------------------------------------------- LOS ILUSIONISTAS --------------------------------------------------------------

INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES (39, 5, 'Lo Mejor de Los Ilusionistas', 'LPC-212002', 1980, 2), (99, 1, 'Sabor a Chicha', 'INF-208402', 1987, 2);

-------------------------------------------------------------- VARIADOS --------------------------------------------------------------

INSERT INTO Albumes (id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, id_tipo_album)
VALUES (581, 1, 'Super Cumbias', 'INF-8151', 1980, 2), (581, 1, 'Mano a Mano Tropical', 'INF-208358', 1985, 2),
(581, 1,  'Tremendas Cumbias', 'INF-208189', 1980, 2), (581, 1, 'Super Selva', 'LPS-8087', 1976, 2), 
(581, 1,  'Chicha en Poto Vol. 1', 'INF-208331', 1984, 2), (581, 1,  'Chicha en Poto Vol. 2', 'INF-208366', 1985, 2), 
(581, 1,  'Chicha en Poto Vol. 3', 'INF-208391', 1986, 2), (581, 1,  'Fiesta Regional Selvática', 'INF-208230', 1981, 2),
(581, 1, 'Festival de la Cumbia', 'INF-208229', 1980, 2), (581, 1, 'Lo Nuevo de La Onda Piruana', 'INF-208436', 1988, 2), 
(581, 1, 'Los Magnificos Vol. 1', 'INF-208371', 1985, 2), (581, 1, 'Los Magnificos Vol. 2', 'INF-208388', 1986, 2), 
(581, 1, 'Pura Selva Vol. 1', 'INF-208417', 1987, 2), (581, 1, 'Pura Selva Vol. 2', 'INF-208429', 1988, 2),
(581, 1, 'Los Poderosos de la Cumbia', 'INF-208157', 1980, 2), (581, 1, 'Cumbias Para Mi Pueblo', 'INF-208265', 1982, 2), 
(581, 1, 'Super Chicha Vol. 1', 'LPS-8104', 1976, 2), (581, 1,  'Super Chicha Vol. 2', 'INF-208256', 1981, 2),
(581, 1, 'Fiesta en la Selva', 'INF-208395', 1987, 2), (581, 1, 'Festival Amazónico', 'INF-208286', 1982, 2),
(581, 1, 'Puro Norte', 'INF-208370', 1985, 2), (581, 1, 'Festival de Chichas Pegaditas', 'INF-208399', 1986, 2), 
(581, 1, 'Éxitos del Año', 'INF-208403', 1987, 2), (581, 1, 'Cumbias de Oro con Acordeón', 'INF-208368', 1985, 2),
(581, 1, 'Mano a Mano', 'INF-208398', 1986, 2), (581, 1, 'Salsas & Cumbias Pegaditas', 'LPCO-207005', 1983, 2);



USE cumbia_peruana;

--- CONSULTA CATÁLOGO DE INFOPESA
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
    Sellos_Discograficos.nombre_sello = 'Infopesa'
ORDER BY 
    Albumes.año_publicacion ASC,
    Albumes.numero_catalogo ASC;


