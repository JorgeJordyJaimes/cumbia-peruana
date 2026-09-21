-- ============================================================
-- INGRESO DE TEMAS HISTÓRICOS Y ESPECIFICACIONES DJ
-- Base de Datos: Kumbia Sound - Cumbia Peruana (1968-2005)
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

-- VINCULACIÓN CON ÁLBUMES (Lado y Pista de prensaje en vinilo)
INSERT INTO Albumes_Temas (id_album, id_tema, numero_pista, lado) VALUES
-- LP Los Destellos (1968) - id_album: 1
(1, 1, 1, 'A'),
(1, 2, 2, 'A'),
(1, 3, 1, 'B'),
(1, 4, 2, 'B'),
-- LP Constelación (1972) - id_album: 7
(7, 5, 1, 'A'),
(7, 6, 2, 'A'),
(7, 7, 1, 'B'),
(7, 8, 2, 'B'),
-- LP El Sonido Selvático (1973) - id_album: 133
(133, 9, 1, 'A'),
(133, 10, 2, 'A'),
(133, 11, 1, 'B'),
(133, 12, 2, 'B'),
-- LP El Gran Cacique (1973) - id_album: 114
(114, 13, 1, 'A'),
(114, 14, 2, 'A'),
(114, 15, 1, 'B'),
(114, 16, 2, 'B'),
-- LP Ven y Goza Esta Cumbia (1973) - id_album: 101
(101, 17, 1, 'A'),
(101, 18, 2, 'A'),
-- LP Lo Mejor de Los Ecos (1976) - id_album: 105
(105, 19, 1, 'A'),
-- LP Aguita Clara (1984) - id_album: 110
(110, 20, 1, 'A')
ON CONFLICT DO NOTHING;

-- VINCULACIÓN CON AGRUPACIONES
INSERT INTO Temas_Grupos (id_tema, id_grupo, rol_participacion) VALUES
(1, 1, 'Principal'),
(2, 1, 'Principal'),
(3, 1, 'Principal'),
(4, 1, 'Principal'),
(5, 1, 'Principal'),
(6, 1, 'Principal'),
(7, 1, 'Principal'),
(8, 1, 'Principal'),
(9, 3, 'Principal'),
(10, 3, 'Principal'),
(11, 3, 'Principal'),
(12, 3, 'Principal'),
(13, 6, 'Principal'),
(14, 6, 'Principal'),
(15, 6, 'Principal'),
(16, 6, 'Principal'),
(17, 4, 'Principal'),
(18, 4, 'Principal'),
(19, 4, 'Principal'),
(20, 4, 'Principal'),
(21, 12, 'Principal'),
(22, 12, 'Principal')
ON CONFLICT DO NOTHING;

-- VINCULACIÓN CON COMPOSITORES
INSERT INTO Temas_Compositores (id_tema, id_compositor) VALUES
(1, 1),  -- Enrique Delgado Montes
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 1),
(7, 1),
(8, 1),
(17, 4), -- Segundo Edilberto Cuestas Chacón
(18, 4),
(19, 4),
(20, 4),
(21, 7), -- Lorenzo Palacios Quispe (Chacalón)
(22, 7)
ON CONFLICT DO NOTHING;
