-- ============================================================
-- INGRESO DE TEMAS HISTÓRICOS Y ESPECIFICACIONES DJ
-- Base de Datos: Kumbia Sound - Cumbia Peruana (1968-2005)
-- ============================================================

-- Asegurar compatibilidad de columnas en tablas de la BD local
ALTER TABLE Temas ADD COLUMN IF NOT EXISTS bpm INT;
ALTER TABLE Temas ADD COLUMN IF NOT EXISTS camelot_code VARCHAR(10);
ALTER TABLE Temas ADD COLUMN IF NOT EXISTS musical_key VARCHAR(20);

ALTER TABLE Albumes ADD COLUMN IF NOT EXISTS es_recopilatorio BOOLEAN DEFAULT FALSE;
ALTER TABLE Albumes ADD COLUMN IF NOT EXISTS es_varios_artistas BOOLEAN DEFAULT FALSE;
ALTER TABLE Albumes ADD COLUMN IF NOT EXISTS es_disco_split BOOLEAN DEFAULT FALSE;
ALTER TABLE Albumes ADD COLUMN IF NOT EXISTS incluido_en_lp BOOLEAN DEFAULT FALSE;
ALTER TABLE Albumes ADD COLUMN IF NOT EXISTS extraido_de_lp BOOLEAN DEFAULT FALSE;
ALTER TABLE Albumes ADD COLUMN IF NOT EXISTS solo_en_45 BOOLEAN DEFAULT FALSE;
ALTER TABLE Albumes ADD COLUMN IF NOT EXISTS lados_en_lp VARCHAR(20) DEFAULT NULL;
ALTER TABLE Albumes ADD COLUMN IF NOT EXISTS id_lp_relacionado INT REFERENCES Albumes(id_album) ON DELETE SET NULL;
ALTER TABLE Albumes ADD COLUMN IF NOT EXISTS es_reedicion BOOLEAN DEFAULT FALSE;
ALTER TABLE Albumes ADD COLUMN IF NOT EXISTS id_album_original INT REFERENCES Albumes(id_album) ON DELETE SET NULL;

ALTER TABLE Albumes_Temas ADD COLUMN IF NOT EXISTS id_album_origen INT REFERENCES Albumes(id_album) ON DELETE SET NULL;
ALTER TABLE Albumes_Temas ADD COLUMN IF NOT EXISTS es_grabacion_inedita BOOLEAN DEFAULT FALSE;

-- ============================================================
-- 1. TEMAS CLÁSICOS INICIALES (LOS DESTELLOS, LOS MIRLOS, LOS ECOS, CHACALÓN)
-- ============================================================
INSERT INTO Temas (id_tema, titulo_tema, duracion_segundos, id_genero, bpm, camelot_code, musical_key) VALUES
(1, 'El Avispón', 174, 1, 112, '8A', 'Am'),
(2, 'La Charapita', 180, 1, 115, '9A', 'Em'),
(3, 'Guajira Sicodélica', 195, 1, 118, '7A', 'Dm'),
(4, 'El Descarga Destello', 185, 1, 122, '8A', 'Am'),
(5, 'Elsa', 215, 1, 108, '8B', 'C'),
(6, 'A Patricia', 188, 1, 110, '8A', 'Am'),
(7, 'Muchachita Celosa', 192, 1, 114, '9A', 'Em'),
(8, 'Caminito Serrano', 204, 1, 116, '9B', 'G'),
(9, 'La Danza de los Mirlos', 168, 2, 124, '8A', 'Am'),
(10, 'Sonido Amazónico', 154, 2, 122, '7A', 'Dm'),
(11, 'El Lamento en la Selva', 178, 2, 118, '6A', 'Gm'),
(12, 'El Milagro Verde', 182, 2, 120, '8B', 'C'),
(13, 'Mujer Hilandera', 198, 2, 128, '8A', 'Am'),
(14, 'Ya Se Ha Muerto Mi Abuelo', 210, 2, 126, '9A', 'Em'),
(15, 'Vacacionando en la Selva', 172, 2, 124, '7A', 'Dm'),
(16, 'La Danza del Petrolero', 186, 2, 130, '8A', 'Am'),
(17, 'Dime Si Me Quieres', 190, 1, 110, '7A', 'Dm'),
(18, 'Cumbia del Amor', 184, 1, 112, '8A', 'Am'),
(19, 'Peligrosa', 175, 1, 114, '8A', 'Am'),
(20, 'Aguita Clara', 192, 1, 108, '7B', 'F'),
(21, 'Viento', 205, 3, 92, '7A', 'Dm'),
(22, 'Muchacho Provinciano', 218, 3, 94, '8A', 'Am'),
(23, 'Cariñito', 194, 1, 108, '8A', 'Am'),
(24, 'Colegiala', 202, 1, 106, '8A', 'Am'),
(25, 'El Aguajal', 188, 3, 98, '9A', 'Em')
ON CONFLICT (id_tema) DO UPDATE SET
  titulo_tema = EXCLUDED.titulo_tema,
  duracion_segundos = EXCLUDED.duracion_segundos,
  id_genero = EXCLUDED.id_genero,
  bpm = EXCLUDED.bpm,
  camelot_code = EXCLUDED.camelot_code,
  musical_key = EXCLUDED.musical_key;

-- Vinculación inicial de LPs históricos con sus temas
INSERT INTO Albumes_Temas (id_album, id_tema, numero_pista, lado) VALUES
(1, 1, 1, 'A'), (1, 2, 2, 'A'), (1, 3, 1, 'B'), (1, 4, 2, 'B'),
(7, 5, 1, 'A'), (7, 6, 2, 'A'), (7, 7, 1, 'B'), (7, 8, 2, 'B'),
(133, 9, 1, 'A'), (133, 10, 2, 'A'), (133, 11, 1, 'B'), (133, 12, 2, 'B'),
(114, 13, 1, 'A'), (114, 14, 2, 'A'), (114, 15, 1, 'B'), (114, 16, 2, 'B'),
(101, 17, 1, 'A'), (101, 18, 2, 'A'),
(105, 19, 1, 'A'),
(110, 20, 1, 'A')
ON CONFLICT DO NOTHING;

-- Vinculación inicial de agrupaciones históricas
INSERT INTO Temas_Grupos (id_tema, id_grupo, rol_participacion) VALUES
(1, 1, 'Principal'), (2, 1, 'Principal'), (3, 1, 'Principal'), (4, 1, 'Principal'),
(5, 1, 'Principal'), (6, 1, 'Principal'), (7, 1, 'Principal'), (8, 1, 'Principal'),
(9, 3, 'Principal'), (10, 3, 'Principal'), (11, 3, 'Principal'), (12, 3, 'Principal'),
(13, 6, 'Principal'), (14, 6, 'Principal'), (15, 6, 'Principal'), (16, 6, 'Principal'),
(17, 4, 'Principal'), (18, 4, 'Principal'), (19, 4, 'Principal'), (20, 4, 'Principal'),
(21, 12, 'Principal'), (22, 12, 'Principal')
ON CONFLICT DO NOTHING;

-- Vinculación con Compositores iniciales
INSERT INTO Temas_Compositores (id_tema, id_compositor) VALUES
(1, 1), (2, 1), (3, 1), (4, 1), (5, 1), (6, 1), (7, 1), (8, 1),
(17, 4), (18, 4), (19, 4), (20, 4),
(21, 7), (22, 7)
ON CONFLICT DO NOTHING;


-- ============================================================
-- 2. TEMAS DE SINGLES 45 RPM: GRUPO CELESTE (id_grupo: 12)
-- Catálogo de obras musicales (IDs 26 al 91)
-- ============================================================
INSERT INTO Temas (id_tema, titulo_tema, duracion_segundos, id_genero, bpm, camelot_code, musical_key) VALUES
(26, 'En el campo', NULL, NULL, NULL, NULL, NULL),
(27, 'Melodía celeste', NULL, NULL, NULL, NULL, NULL),
(28, 'Mi lamento', NULL, NULL, NULL, NULL, NULL),
(29, 'Canción del maestro', NULL, NULL, NULL, NULL, NULL),
(30, 'Recuerdos', NULL, NULL, NULL, NULL, NULL),
(31, 'Pescador', NULL, NULL, NULL, NULL, NULL),
(32, 'Viento', NULL, NULL, NULL, NULL, NULL),
(33, 'Te perdí', NULL, NULL, NULL, NULL, NULL),
(34, 'La noche', NULL, NULL, NULL, NULL, NULL),
(35, 'Frescura de invierno', NULL, NULL, NULL, NULL, NULL),
(36, 'Como un ave', NULL, NULL, NULL, NULL, NULL),
(37, 'No te dejaré', NULL, NULL, NULL, NULL, NULL),
(38, 'Tu retrato', NULL, NULL, NULL, NULL, NULL),
(39, 'Pueblo', NULL, NULL, NULL, NULL, NULL),
(40, 'La plaga rock de la cárcel', NULL, NULL, NULL, NULL, NULL),
(41, 'Soy obrero', NULL, NULL, NULL, NULL, NULL),
(42, 'Piel Morena', NULL, NULL, NULL, NULL, NULL),
(43, 'Todo lo tengo de ti menos tu amor', NULL, NULL, NULL, NULL, NULL),
(44, 'El reencuentro', NULL, NULL, NULL, NULL, NULL),
(45, 'Soy chofer', NULL, NULL, NULL, NULL, NULL),
(46, 'Juventud', NULL, NULL, NULL, NULL, NULL),
(47, 'Mi destino', NULL, NULL, NULL, NULL, NULL),
(48, 'Provinciano', NULL, NULL, NULL, NULL, NULL),
(49, 'Quiero navegar', NULL, NULL, NULL, NULL, NULL),
(50, 'Vida', NULL, NULL, NULL, NULL, NULL),
(51, 'Una carta para ti', NULL, NULL, NULL, NULL, NULL),
(52, 'Espérame', NULL, NULL, NULL, NULL, NULL),
(53, 'Camina, camina', NULL, NULL, NULL, NULL, NULL),
(54, 'Perdón amor', NULL, NULL, NULL, NULL, NULL),
(55, 'Corazón de piedra', NULL, NULL, NULL, NULL, NULL),
(56, 'Mentirosa', NULL, NULL, NULL, NULL, NULL),
(57, 'Compañera', NULL, NULL, NULL, NULL, NULL),
(58, 'Verano', NULL, NULL, NULL, NULL, NULL),
(59, 'Sin éxito', NULL, NULL, NULL, NULL, NULL),
(60, 'Gitana', NULL, NULL, NULL, NULL, NULL),
(61, 'Pobre soy', NULL, NULL, NULL, NULL, NULL),
(62, 'El viejo molino', NULL, NULL, NULL, NULL, NULL),
(63, 'Brillantina', NULL, NULL, NULL, NULL, NULL),
(64, 'Vete ya', NULL, NULL, NULL, NULL, NULL),
(65, 'Sin ti', NULL, NULL, NULL, NULL, NULL),
(66, 'Muchachita', NULL, NULL, NULL, NULL, NULL),
(67, 'Mujer', NULL, NULL, NULL, NULL, NULL),
(68, 'Plegaria', NULL, NULL, NULL, NULL, NULL),
(69, 'Mujeres', NULL, NULL, NULL, NULL, NULL),
(70, 'Vanidad', NULL, NULL, NULL, NULL, NULL),
(71, 'Pides que me vaya', NULL, NULL, NULL, NULL, NULL),
(72, 'Lluvia', NULL, NULL, NULL, NULL, NULL),
(73, 'Sentimientos', NULL, NULL, NULL, NULL, NULL),
(74, 'Sobreviviendo', NULL, NULL, NULL, NULL, NULL),
(75, 'Parranda Chaca Chaca', NULL, NULL, NULL, NULL, NULL),
(76, 'Te quiero', NULL, NULL, NULL, NULL, NULL),
(77, 'La alborada', NULL, NULL, NULL, NULL, NULL),
(78, 'El aventurero', NULL, NULL, NULL, NULL, NULL),
(79, 'El enamorado', NULL, NULL, NULL, NULL, NULL),
(80, 'El Super Show (Mi lamento, Compañera, Recuerdos, Verano, Pescador)', NULL, NULL, NULL, NULL, NULL),
(81, 'El Super Show (Viento, Tu retrato, Soy obrero, Como un ave, Vida)', NULL, NULL, NULL, NULL, NULL),
(82, 'Gaviota', NULL, NULL, NULL, NULL, NULL),
(83, 'Somos iguales', NULL, NULL, NULL, NULL, NULL),
(84, 'Cállate', NULL, NULL, NULL, NULL, NULL),
(85, 'Conflictos', NULL, NULL, NULL, NULL, NULL),
(86, 'Vuelve a casa', NULL, NULL, NULL, NULL, NULL),
(87, 'Rutina', NULL, NULL, NULL, NULL, NULL),
(88, 'Caridad', NULL, NULL, NULL, NULL, NULL),
(89, 'Hombre del río', NULL, NULL, NULL, NULL, NULL),
(90, 'Ternura', NULL, NULL, NULL, NULL, NULL),
(91, 'Palomita', NULL, NULL, NULL, NULL, NULL)
ON CONFLICT (id_tema) DO UPDATE SET
  titulo_tema = EXCLUDED.titulo_tema,
  duracion_segundos = EXCLUDED.duracion_segundos,
  id_genero = EXCLUDED.id_genero,
  bpm = EXCLUDED.bpm,
  camelot_code = EXCLUDED.camelot_code,
  musical_key = EXCLUDED.musical_key;


-- ============================================================
-- 3. VINCULACIÓN CON DISCOS DE 45 RPM (Álbumes / Singles Grupo Celeste)
-- Tabla Albumes_Temas: id_album (332 al 368), id_tema (26 al 91), numero_pista, lado, id_album_origen
-- ============================================================
INSERT INTO Albumes_Temas (id_album, id_tema, numero_pista, lado, id_album_origen) VALUES
(332, 26, 1, 'A', NULL),
(332, 27, 1, 'B', NULL),
(333, 28, 1, 'A', 341),
(333, 29, 1, 'B', 341),
(334, 30, 1, 'A', 337),
(334, 31, 1, 'B', 337),
(335, 32, 1, 'A', 338),
(335, 33, 1, 'B', 338),
(336, 34, 1, 'A', NULL),
(336, 35, 1, 'B', NULL),
(337, 30, 1, 'A', NULL),
(337, 31, 1, 'B', NULL),
(338, 32, 1, 'A', NULL),
(338, 33, 1, 'B', NULL),
(339, 36, 1, 'A', 127),
(339, 37, 1, 'B', 127),
(340, 38, 1, 'A', 127),
(340, 39, 1, 'B', 127),
(341, 28, 1, 'A', 127),
(341, 29, 1, 'B', 127),
(342, 40, 1, 'A', NULL),
(342, 41, 1, 'B', NULL),
(343, 42, 1, 'A', NULL),
(343, 43, 1, 'B', NULL),
(344, 44, 1, 'A', 128),
(344, 45, 1, 'B', 128),
(345, 46, 1, 'A', 128),
(345, 47, 1, 'B', 128),
(346, 48, 1, 'A', NULL),
(346, 49, 1, 'B', NULL),
(347, 50, 1, 'A', NULL),
(347, 51, 1, 'B', NULL),
(348, 52, 1, 'A', NULL),
(348, 53, 1, 'B', NULL),
(349, 54, 1, 'A', NULL),
(349, 55, 1, 'B', NULL),
(350, 56, 1, 'A', NULL),
(350, 57, 1, 'B', NULL),
(351, 58, 1, 'A', NULL),
(351, 59, 1, 'B', NULL),
(352, 60, 1, 'A', NULL),
(352, 61, 1, 'B', NULL),
(353, 62, 1, 'A', NULL),
(353, 63, 1, 'B', NULL),
(354, 64, 1, 'A', NULL),
(354, 65, 1, 'B', NULL),
(355, 66, 1, 'A', NULL),
(355, 67, 1, 'B', NULL),
(356, 67, 1, 'A', 355),
(356, 66, 1, 'B', 355),
(357, 68, 1, 'A', NULL),
(357, 69, 1, 'B', NULL),
(358, 70, 1, 'A', 130),
(358, 71, 1, 'B', 130),
(359, 72, 1, 'A', 131),
(359, 73, 1, 'B', 131),
(360, 74, 1, 'A', NULL),
(360, 75, 1, 'B', NULL),
(361, 76, 1, 'A', NULL),
(361, 77, 1, 'B', NULL),
(362, 78, 1, 'A', NULL),
(362, 79, 1, 'B', NULL),
(363, 80, 1, 'A', NULL),
(363, 81, 1, 'B', NULL),
(364, 82, 1, 'A', NULL),
(364, 83, 1, 'B', NULL),
(365, 84, 1, 'A', NULL),
(365, 85, 1, 'B', NULL),
(366, 86, 1, 'A', NULL),
(366, 87, 1, 'B', NULL),
(367, 88, 1, 'A', NULL),
(367, 89, 1, 'B', NULL),
(368, 90, 1, 'A', NULL),
(368, 91, 1, 'B', NULL) -- HORÓSCOPO 1229 (1986): Palomita
ON CONFLICT (id_album, id_tema) DO UPDATE SET
  numero_pista = EXCLUDED.numero_pista,
  lado = EXCLUDED.lado,
  id_album_origen = EXCLUDED.id_album_origen;


-- ============================================================
-- 4. VINCULACIÓN CON LA AGRUPACIÓN (Grupo Celeste - id_grupo: 12)
-- ============================================================
INSERT INTO Temas_Grupos (id_tema, id_grupo, rol_participacion) VALUES
(26, 12, 'Principal'),
(27, 12, 'Principal'),
(28, 12, 'Principal'),
(29, 12, 'Principal'),
(30, 12, 'Principal'),
(31, 12, 'Principal'),
(32, 12, 'Principal'),
(33, 12, 'Principal'),
(34, 12, 'Principal'),
(35, 12, 'Principal'),
(36, 12, 'Principal'),
(37, 12, 'Principal'),
(38, 12, 'Principal'),
(39, 12, 'Principal'),
(40, 12, 'Principal'),
(41, 12, 'Principal'),
(42, 12, 'Principal'),
(43, 12, 'Principal'),
(44, 12, 'Principal'),
(45, 12, 'Principal'),
(46, 12, 'Principal'),
(47, 12, 'Principal'),
(48, 12, 'Principal'),
(49, 12, 'Principal'),
(50, 12, 'Principal'),
(51, 12, 'Principal'),
(52, 12, 'Principal'),
(53, 12, 'Principal'),
(54, 12, 'Principal'),
(55, 12, 'Principal'),
(56, 12, 'Principal'),
(57, 12, 'Principal'),
(58, 12, 'Principal'),
(59, 12, 'Principal'),
(60, 12, 'Principal'),
(61, 12, 'Principal'),
(62, 12, 'Principal'),
(63, 12, 'Principal'),
(64, 12, 'Principal'),
(65, 12, 'Principal'),
(66, 12, 'Principal'),
(67, 12, 'Principal'),
(68, 12, 'Principal'),
(69, 12, 'Principal'),
(70, 12, 'Principal'),
(71, 12, 'Principal'),
(72, 12, 'Principal'),
(73, 12, 'Principal'),
(74, 12, 'Principal'),
(75, 12, 'Principal'),
(76, 12, 'Principal'),
(77, 12, 'Principal'),
(78, 12, 'Principal'),
(79, 12, 'Principal'),
(80, 12, 'Principal'),
(81, 12, 'Principal'),
(82, 12, 'Principal'),
(83, 12, 'Principal'),
(84, 12, 'Principal'),
(85, 12, 'Principal'),
(86, 12, 'Principal'),
(87, 12, 'Principal'),
(88, 12, 'Principal'),
(89, 12, 'Principal'),
(90, 12, 'Principal'),
(91, 12, 'Principal')
ON CONFLICT (id_tema, id_grupo) DO NOTHING;


-- ============================================================
-- 5. TRAZABILIDAD DE REEDICIONES EN TABLA ÁLBUMES
-- Actualización de id_album_original para los singles que son relanzamientos/reediciones:
-- ============================================================
UPDATE Albumes SET id_album_original = 341 WHERE id_album = 333; -- DIFA 141 (1982) <- reedición de DISCOPE 016 (1975) [Mi lamento / Canción del maestro]
UPDATE Albumes SET id_album_original = 337 WHERE id_album = 334; -- DIFA 142 (1982) <- reedición de DISCOPE 003 (1974) [Recuerdos / Pescador]
UPDATE Albumes SET id_album_original = 338 WHERE id_album = 335; -- DIFA 144 (1982) <- reedición de DISCOPE 006 (1974) [Viento / Te perdí]
UPDATE Albumes SET id_album_original = 355 WHERE id_album = 356; -- INFOPESA 171110 (1980) <- reedición de PRODIC 001-80 (1980) [Mujer / Muchachita]

-- ============================================================
-- 6. TRAZABILIDAD DE SINGLES VINCULADOS A LPs HISTÓRICOS
-- Actualización de id_lp_relacionado según figuren extraídos o incluidos en LPs:
-- ============================================================
UPDATE Albumes SET id_lp_relacionado = 127 WHERE id_album IN (339, 340, 341, 342); -- LP El Fabuloso Grupo Celeste (1975, DISCOPE)
UPDATE Albumes SET id_lp_relacionado = 128 WHERE id_album IN (344, 345);            -- LP El Tropiloco Mundo del Grupo Celeste (1976, DISCOPE)
UPDATE Albumes SET id_lp_relacionado = 130 WHERE id_album = 358;                    -- LP El Mensaje Tropical del Fabuloso Grupo Celeste (1980, INFOPESA)
UPDATE Albumes SET id_lp_relacionado = 131 WHERE id_album = 359;                    -- LP Sentimientos (1982, INFOPESA)
UPDATE Albumes SET id_lp_relacionado = 132 WHERE id_album = 368;                    -- LP Palomita (1986, HORÓSCOPO)
