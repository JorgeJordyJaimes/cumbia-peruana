-- ============================================================
-- INGRESO DE TEMAS HISTÓRICOS Y ESPECIFICACIONES DJ
-- Agrupación: Grupo Celeste (id_grupo: 12)
-- Fuente: Archivo Histórico / Control de Datos BD Cumbia Peruana (45 RPM)
-- Base de Datos: Kumbia Sound - Cumbia Peruana (1968-2005)
-- ============================================================

-- 1. CATÁLOGO DE TEMAS (OBRAS MUSICALES)
-- Asegurar que las columnas de análisis técnico existan en la tabla física
ALTER TABLE Temas ADD COLUMN IF NOT EXISTS bpm INT;
ALTER TABLE Temas ADD COLUMN IF NOT EXISTS camelot_code VARCHAR(10);
ALTER TABLE Temas ADD COLUMN IF NOT EXISTS musical_key VARCHAR(20);

-- Nota: Campos de análisis técnico, duración y género quedan en NULL para posterior catalogación.
INSERT INTO Temas (id_tema, titulo_tema, duracion_segundos, id_genero, bpm, camelot_code, musical_key) VALUES
(1, 'En el campo', NULL, NULL, NULL, NULL, NULL),
(2, 'Melodía celeste', NULL, NULL, NULL, NULL, NULL),
(3, 'Mi lamento', NULL, NULL, NULL, NULL, NULL),
(4, 'Canción del maestro', NULL, NULL, NULL, NULL, NULL),
(5, 'Recuerdos', NULL, NULL, NULL, NULL, NULL),
(6, 'Pescador', NULL, NULL, NULL, NULL, NULL),
(7, 'Viento', NULL, NULL, NULL, NULL, NULL),
(8, 'Te perdí', NULL, NULL, NULL, NULL, NULL),
(9, 'La noche', NULL, NULL, NULL, NULL, NULL),
(10, 'Frescura de invierno', NULL, NULL, NULL, NULL, NULL),
(11, 'Como un ave', NULL, NULL, NULL, NULL, NULL),
(12, 'No te dejaré', NULL, NULL, NULL, NULL, NULL),
(13, 'Tu retrato', NULL, NULL, NULL, NULL, NULL),
(14, 'Pueblo', NULL, NULL, NULL, NULL, NULL),
(15, 'La plaga rock de la cárcel', NULL, NULL, NULL, NULL, NULL),
(16, 'Soy obrero', NULL, NULL, NULL, NULL, NULL),
(17, 'Piel Morena', NULL, NULL, NULL, NULL, NULL),
(18, 'Todo lo tengo de ti menos tu amor', NULL, NULL, NULL, NULL, NULL),
(19, 'El reencuentro', NULL, NULL, NULL, NULL, NULL),
(20, 'Soy chofer', NULL, NULL, NULL, NULL, NULL),
(21, 'Juventud', NULL, NULL, NULL, NULL, NULL),
(22, 'Mi destino', NULL, NULL, NULL, NULL, NULL),
(23, 'Provinciano', NULL, NULL, NULL, NULL, NULL),
(24, 'Quiero navegar', NULL, NULL, NULL, NULL, NULL),
(25, 'Vida', NULL, NULL, NULL, NULL, NULL),
(26, 'Una carta para ti', NULL, NULL, NULL, NULL, NULL),
(27, 'Espérame', NULL, NULL, NULL, NULL, NULL),
(28, 'Camina, camina', NULL, NULL, NULL, NULL, NULL),
(29, 'Perdón amor', NULL, NULL, NULL, NULL, NULL),
(30, 'Corazón de piedra', NULL, NULL, NULL, NULL, NULL),
(31, 'Mentirosa', NULL, NULL, NULL, NULL, NULL),
(32, 'Compañera', NULL, NULL, NULL, NULL, NULL),
(33, 'Verano', NULL, NULL, NULL, NULL, NULL),
(34, 'Sin éxito', NULL, NULL, NULL, NULL, NULL),
(35, 'Gitana', NULL, NULL, NULL, NULL, NULL),
(36, 'Pobre soy', NULL, NULL, NULL, NULL, NULL),
(37, 'El viejo molino', NULL, NULL, NULL, NULL, NULL),
(38, 'Brillantina', NULL, NULL, NULL, NULL, NULL),
(39, 'Vete ya', NULL, NULL, NULL, NULL, NULL),
(40, 'Sin ti', NULL, NULL, NULL, NULL, NULL),
(41, 'Muchachita', NULL, NULL, NULL, NULL, NULL),
(42, 'Mujer', NULL, NULL, NULL, NULL, NULL),
(43, 'Plegaria', NULL, NULL, NULL, NULL, NULL),
(44, 'Mujeres', NULL, NULL, NULL, NULL, NULL),
(45, 'Vanidad', NULL, NULL, NULL, NULL, NULL),
(46, 'Pides que me vaya', NULL, NULL, NULL, NULL, NULL),
(47, 'Lluvia', NULL, NULL, NULL, NULL, NULL),
(48, 'Sentimientos', NULL, NULL, NULL, NULL, NULL),
(49, 'Sobreviviendo', NULL, NULL, NULL, NULL, NULL),
(50, 'Parranda Chaca Chaca', NULL, NULL, NULL, NULL, NULL),
(51, 'Te quiero', NULL, NULL, NULL, NULL, NULL),
(52, 'La alborada', NULL, NULL, NULL, NULL, NULL),
(53, 'El aventurero', NULL, NULL, NULL, NULL, NULL),
(54, 'El enamorado', NULL, NULL, NULL, NULL, NULL),
(55, 'El Super Show (Mi lamento, Compañera, Recuerdos, Verano, Pescador)', NULL, NULL, NULL, NULL, NULL),
(56, 'El Super Show (Viento, Tu retrato, Soy obrero, Como un ave, Vida)', NULL, NULL, NULL, NULL, NULL),
(57, 'Gaviota', NULL, NULL, NULL, NULL, NULL),
(58, 'Somos iguales', NULL, NULL, NULL, NULL, NULL),
(59, 'Cállate', NULL, NULL, NULL, NULL, NULL),
(60, 'Conflictos', NULL, NULL, NULL, NULL, NULL),
(61, 'Vuelve a casa', NULL, NULL, NULL, NULL, NULL),
(62, 'Rutina', NULL, NULL, NULL, NULL, NULL),
(63, 'Caridad', NULL, NULL, NULL, NULL, NULL),
(64, 'Hombre del río', NULL, NULL, NULL, NULL, NULL),
(65, 'Ternura', NULL, NULL, NULL, NULL, NULL),
(66, 'Palomita', NULL, NULL, NULL, NULL, NULL)
ON CONFLICT (id_tema) DO UPDATE SET
  titulo_tema = EXCLUDED.titulo_tema,
  duracion_segundos = EXCLUDED.duracion_segundos,
  id_genero = EXCLUDED.id_genero,
  bpm = EXCLUDED.bpm,
  camelot_code = EXCLUDED.camelot_code,
  musical_key = EXCLUDED.musical_key;

-- 2. VINCULACIÓN CON DISCOS DE 45 RPM (Álbumes / Singles y Reediciones)
-- Tabla Albumes_Temas: id_album (332 al 368), id_tema, numero_pista, lado, id_album_origen
INSERT INTO Albumes_Temas (id_album, id_tema, numero_pista, lado, id_album_origen) VALUES
(332, 1, 1, 'A', NULL), -- DIFA 9 (1973): En el campo
(332, 2, 1, 'B', NULL), -- DIFA 9 (1973): Melodía celeste
(333, 3, 1, 'A', 341), -- DIFA 141 (1982): Mi lamento
(333, 4, 1, 'B', 341), -- DIFA 141 (1982): Canción del maestro
(334, 5, 1, 'A', 337), -- DIFA 142 (1982): Recuerdos
(334, 6, 1, 'B', 337), -- DIFA 142 (1982): Pescador
(335, 7, 1, 'A', 338), -- DIFA 144 (1982): Viento
(335, 8, 1, 'B', 338), -- DIFA 144 (1982): Te perdí
(336, 9, 1, 'A', NULL), -- DISCOPE 1 (1974): La noche
(336, 10, 1, 'B', NULL), -- DISCOPE 1 (1974): Frescura de invierno
(337, 5, 1, 'A', NULL), -- DISCOPE 3 (1974): Recuerdos
(337, 6, 1, 'B', NULL), -- DISCOPE 3 (1974): Pescador
(338, 7, 1, 'A', NULL), -- DISCOPE 6 (1974): Viento
(338, 8, 1, 'B', NULL), -- DISCOPE 6 (1974): Te perdí
(339, 11, 1, 'A', 127), -- DISCOPE 14 (1975): Como un ave
(339, 12, 1, 'B', 127), -- DISCOPE 14 (1975): No te dejaré
(340, 13, 1, 'A', 127), -- DISCOPE 15 (1975): Tu retrato
(340, 14, 1, 'B', 127), -- DISCOPE 15 (1975): Pueblo
(341, 3, 1, 'A', 127), -- DISCOPE 16 (1975): Mi lamento
(341, 4, 1, 'B', 127), -- DISCOPE 16 (1975): Canción del maestro
(342, 15, 1, 'A', NULL), -- DISCOPE 18 (1975): La plaga rock de la cárcel
(342, 16, 1, 'B', NULL), -- DISCOPE 18 (1975): Soy obrero
(343, 17, 1, 'A', NULL), -- DISCOPE 19 (1975): Piel Morena
(343, 18, 1, 'B', NULL), -- DISCOPE 19 (1975): Todo lo tengo de ti menos tu amor
(344, 19, 1, 'A', 128), -- DISCOPE 76-032 (1976): El reencuentro
(344, 20, 1, 'B', 128), -- DISCOPE 76-032 (1976): Soy chofer
(345, 21, 1, 'A', 128), -- DISCOPE 76-033 (1976): Juventud
(345, 22, 1, 'B', 128), -- DISCOPE 76-033 (1976): Mi destino
(346, 23, 1, 'A', NULL), -- PRODIC 1 (1977): Provinciano
(346, 24, 1, 'B', NULL), -- PRODIC 1 (1977): Quiero navegar
(347, 25, 1, 'A', NULL), -- PRODIC 3 (1977): Vida
(347, 26, 1, 'B', NULL), -- PRODIC 3 (1977): Una carta para ti
(348, 27, 1, 'A', NULL), -- PRODIC 4 (1977): Espérame
(348, 28, 1, 'B', NULL), -- PRODIC 4 (1977): Camina, camina
(349, 29, 1, 'A', NULL), -- PRODIC 6 (1978): Perdón amor
(349, 30, 1, 'B', NULL), -- PRODIC 6 (1978): Corazón de piedra
(350, 31, 1, 'A', NULL), -- PRODIC 9 (1978): Mentirosa
(350, 32, 1, 'B', NULL), -- PRODIC 9 (1978): Compañera
(351, 33, 1, 'A', NULL), -- PRODIC 10 (1978): Verano
(351, 34, 1, 'B', NULL), -- PRODIC 10 (1978): Sin éxito
(352, 35, 1, 'A', NULL), -- PRODIC 11 (1979): Gitana
(352, 36, 1, 'B', NULL), -- PRODIC 11 (1979): Pobre soy
(353, 37, 1, 'A', NULL), -- PRODIC 12 (1979): El viejo molino
(353, 38, 1, 'B', NULL), -- PRODIC 12 (1979): Brillantina
(354, 39, 1, 'A', NULL), -- PRODIC 13 (1979): Vete ya
(354, 40, 1, 'B', NULL), -- PRODIC 13 (1979): Sin ti
(355, 41, 1, 'A', NULL), -- PRODIC 001-80 (1980): Muchachita
(355, 42, 1, 'B', NULL), -- PRODIC 001-80 (1980): Mujer
(356, 42, 1, 'A', 355), -- INFOPESA 171110 (1980): Mujer
(356, 41, 1, 'B', 355), -- INFOPESA 171110 (1980): Muchachita
(357, 43, 1, 'A', NULL), -- INFOPESA 171143 (1980): Plegaria
(357, 44, 1, 'B', NULL), -- INFOPESA 171143 (1980): Mujeres
(358, 45, 1, 'A', 130), -- INFOPESA 171168 (1980): Vanidad
(358, 46, 1, 'B', 130), -- INFOPESA 171168 (1980): Pides que me vaya
(359, 47, 1, 'A', 131), -- INFOPESA 171336 (1982): Lluvia
(359, 48, 1, 'B', 131), -- INFOPESA 171336 (1982): Sentimientos
(360, 49, 1, 'A', NULL), -- SONORADIO 13742 (1981): Sobreviviendo
(360, 50, 1, 'B', NULL), -- SONORADIO 13742 (1981): Parranda Chaca Chaca
(361, 51, 1, 'A', NULL), -- EMUCEL 80-001 (1980): Te quiero
(361, 52, 1, 'B', NULL), -- EMUCEL 80-001 (1980): La alborada
(362, 53, 1, 'A', NULL), -- EMUCEL 81-001 (1981): El aventurero
(362, 54, 1, 'B', NULL), -- EMUCEL 81-001 (1981): El enamorado
(363, 55, 1, 'A', NULL), -- EMUCEL 81-003 (1981): El Super Show (Mi lamento, Compañera, Recuerdos, Verano, Pescador)
(363, 56, 1, 'B', NULL), -- EMUCEL 81-003 (1981): El Super Show (Viento, Tu retrato, Soy obrero, Como un ave, Vida)
(364, 57, 1, 'A', NULL), -- EMUCEL 83-001 (1983): Gaviota
(364, 58, 1, 'B', NULL), -- EMUCEL 83-001 (1983): Somos iguales
(365, 59, 1, 'A', NULL), -- EMUCEL 83-002 (1983): Cállate
(365, 60, 1, 'B', NULL), -- EMUCEL 83-002 (1983): Conflictos
(366, 61, 1, 'A', NULL), -- EMUCEL 84-004 (1984): Vuelve a casa
(366, 62, 1, 'B', NULL), -- EMUCEL 84-004 (1984): Rutina
(367, 63, 1, 'A', NULL), -- HORÓSCOPO 1195 (1985): Caridad
(367, 64, 1, 'B', NULL), -- HORÓSCOPO 1195 (1985): Hombre del río
(368, 65, 1, 'A', NULL), -- HORÓSCOPO 1229 (1986): Ternura
(368, 66, 1, 'B', NULL) -- HORÓSCOPO 1229 (1986): Palomita
ON CONFLICT (id_album, id_tema) DO UPDATE SET
  numero_pista = EXCLUDED.numero_pista,
  lado = EXCLUDED.lado,
  id_album_origen = EXCLUDED.id_album_origen;

-- 3. VINCULACIÓN CON LA AGRUPACIÓN (Grupo Celeste - id_grupo: 12)
INSERT INTO Temas_Grupos (id_tema, id_grupo, rol_participacion) VALUES
(1, 12, 'Principal'),
(2, 12, 'Principal'),
(3, 12, 'Principal'),
(4, 12, 'Principal'),
(5, 12, 'Principal'),
(6, 12, 'Principal'),
(7, 12, 'Principal'),
(8, 12, 'Principal'),
(9, 12, 'Principal'),
(10, 12, 'Principal'),
(11, 12, 'Principal'),
(12, 12, 'Principal'),
(13, 12, 'Principal'),
(14, 12, 'Principal'),
(15, 12, 'Principal'),
(16, 12, 'Principal'),
(17, 12, 'Principal'),
(18, 12, 'Principal'),
(19, 12, 'Principal'),
(20, 12, 'Principal'),
(21, 12, 'Principal'),
(22, 12, 'Principal'),
(23, 12, 'Principal'),
(24, 12, 'Principal'),
(25, 12, 'Principal'),
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
(66, 12, 'Principal')
ON CONFLICT (id_tema, id_grupo) DO NOTHING;

-- 4. TRAZABILIDAD DE REEDICIONES EN TABLA ÁLBUMES
-- Actualización de id_album_original para los singles que son relanzamientos/reediciones:
UPDATE Albumes SET id_album_original = 341 WHERE id_album = 333; -- DIFA 141 (1982) <- reedición de DISCOPE 016 (1975) [Mi lamento / Canción del maestro]
UPDATE Albumes SET id_album_original = 337 WHERE id_album = 334; -- DIFA 142 (1982) <- reedición de DISCOPE 003 (1974) [Recuerdos / Pescador]
UPDATE Albumes SET id_album_original = 338 WHERE id_album = 335; -- DIFA 144 (1982) <- reedición de DISCOPE 006 (1974) [Viento / Te perdí]
UPDATE Albumes SET id_album_original = 355 WHERE id_album = 356; -- INFOPESA 171110 (1980) <- reedición de PRODIC 001-80 (1980) [Mujer / Muchachita]

-- 5. TRAZABILIDAD DE SINGLES VINCULADOS A LPs HISTÓRICOS
-- Actualización de id_lp_relacionado según figuren extraídos o incluidos en LPs:
UPDATE Albumes SET id_lp_relacionado = 127 WHERE id_album IN (339, 340, 341, 342); -- LP El Fabuloso Grupo Celeste (1975, DISCOPE)
UPDATE Albumes SET id_lp_relacionado = 128 WHERE id_album IN (344, 345);            -- LP El Tropiloco Mundo del Grupo Celeste (1976, DISCOPE)
UPDATE Albumes SET id_lp_relacionado = 130 WHERE id_album = 358;                    -- LP El Mensaje Tropical del Fabuloso Grupo Celeste (1980, INFOPESA)
UPDATE Albumes SET id_lp_relacionado = 131 WHERE id_album = 359;                    -- LP Sentimientos (1982, INFOPESA)
UPDATE Albumes SET id_lp_relacionado = 132 WHERE id_album = 368;                    -- LP Palomita (1986, HORÓSCOPO)
