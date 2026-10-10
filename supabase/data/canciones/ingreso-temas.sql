-- ======================================================================================================================
-- INGRESO DE TEMAS HISTÓRICOS Y ESPECIFICACIONES DJ
-- Base de Datos: Kumbia Sound - Cumbia Peruana (1968-2005)
-- Datos reales catalogados desde docs/datos-investigacion/Datos BD.ods
-- ======================================================================================================================

-- ======================================================================================================================
-- 1. OBRAS MUSICALES Y METADATOS DJ (TABLA: Temas)
-- ======================================================================================================================
INSERT INTO Temas (id_tema, titulo_tema, duracion_segundos, id_genero, bpm, camelot_code, musical_key, letra) VALUES
(1, 'En el campo', NULL, 7, 108, '9B', NULL, NULL),
(2, 'Melodía Celeste', NULL, 11, 94, '9A', NULL, NULL),
(3, 'La noche', NULL, 8, 88, '8B', NULL, NULL),
(4, 'Frescura de invierno', NULL, 11, 103, '11B', NULL, NULL),
(5, 'Recuerdos', NULL, 7, 108, '1B', NULL, NULL),
(6, 'Pescador', NULL, 8, 119, '3B', NULL, NULL),
(7, 'Viento', NULL, 7, 108, '5B', NULL, NULL),
(8, 'Te perdí', NULL, 8, 113, '9B', NULL, NULL)
ON CONFLICT (id_tema) DO UPDATE SET
  titulo_tema = EXCLUDED.titulo_tema,
  duracion_segundos = EXCLUDED.duracion_segundos,
  id_genero = EXCLUDED.id_genero,
  bpm = EXCLUDED.bpm,
  camelot_code = EXCLUDED.camelot_code,
  musical_key = EXCLUDED.musical_key,
  letra = EXCLUDED.letra;

-- ======================================================================================================================
-- 2. ASOCIACIÓN CON SOPORTES FÍSICOS (TABLA: Albumes_Temas)
-- Vinculación de pistas a los singles respectivos de 45 RPM
-- ======================================================================================================================
INSERT INTO Albumes_Temas (id_album, id_tema, numero_pista, lado, id_album_origen, es_grabacion_inedita, es_mosaico) VALUES
((SELECT id_album FROM Albumes WHERE id_grupo = 12 AND id_sello = 11 AND numero_catalogo = '009'), 1, 1, 'A', NULL, FALSE, FALSE),
((SELECT id_album FROM Albumes WHERE id_grupo = 12 AND id_sello = 11 AND numero_catalogo = '009'), 2, 1, 'B', NULL, FALSE, FALSE),
((SELECT id_album FROM Albumes WHERE id_grupo = 12 AND id_sello = 25 AND numero_catalogo = '001'), 3, 1, 'A', NULL, FALSE, FALSE),
((SELECT id_album FROM Albumes WHERE id_grupo = 12 AND id_sello = 25 AND numero_catalogo = '001'), 4, 1, 'B', NULL, FALSE, FALSE),
((SELECT id_album FROM Albumes WHERE id_grupo = 12 AND id_sello = 25 AND numero_catalogo = '003'), 5, 1, 'A', NULL, FALSE, FALSE),
((SELECT id_album FROM Albumes WHERE id_grupo = 12 AND id_sello = 25 AND numero_catalogo = '003'), 6, 1, 'B', NULL, FALSE, FALSE),
((SELECT id_album FROM Albumes WHERE id_grupo = 12 AND id_sello = 25 AND numero_catalogo = '006'), 7, 1, 'A', NULL, FALSE, FALSE),
((SELECT id_album FROM Albumes WHERE id_grupo = 12 AND id_sello = 25 AND numero_catalogo = '006'), 8, 1, 'B', NULL, FALSE, FALSE)
ON CONFLICT (id_album, id_tema) DO UPDATE SET
  numero_pista = EXCLUDED.numero_pista,
  lado = EXCLUDED.lado,
  id_album_origen = EXCLUDED.id_album_origen,
  es_grabacion_inedita = EXCLUDED.es_grabacion_inedita,
  es_mosaico = EXCLUDED.es_mosaico;

-- ======================================================================================================================
-- 3. AGRUPACIÓN EJECUTANTE (TABLA: Temas_Grupos)
-- ======================================================================================================================
INSERT INTO Temas_Grupos (id_tema, id_grupo, rol_participacion) VALUES
(1, 12, 'Principal'),
(2, 12, 'Principal'),
(3, 12, 'Principal'),
(4, 12, 'Principal'),
(5, 12, 'Principal'),
(6, 12, 'Principal'),
(7, 12, 'Principal'),
(8, 12, 'Principal')
ON CONFLICT (id_tema, id_grupo) DO NOTHING;

-- ======================================================================================================================
-- 4. CRÉDITOS DE COMPOSITORES Y GALLETA (TABLA: Temas_Compositores)
-- ======================================================================================================================
INSERT INTO Temas_Compositores (id_tema, id_compositor, credito_como) VALUES
(1, 12, 'Víctor Casahuamán B.'),
(2, 361, 'Gustavo Rosas García'),
(3, 12, 'Víctor Casahuamán Bendezú'),
(4, 23, 'Lener Muñoz Reyes'),
(5, 12, 'Víctor Casahuamán B.'),
(6, 12, 'Víctor Casahuamán B.'),
(7, 12, 'Víctor Casahuamán Bendezú'),
(8, 12, 'Víctor Casahuamán Bendezú')
ON CONFLICT (id_tema, id_compositor) DO UPDATE SET
  credito_como = EXCLUDED.credito_como;

-- ======================================================================================================================
-- 5. CLASIFICACIÓN DE GÉNEROS Y RITMOS (TABLA: Temas_Generos)
-- ======================================================================================================================
INSERT INTO Temas_Generos (id_tema, id_genero, es_principal) VALUES
(1, 7, TRUE),   -- Cumbia Chey
(1, 9, FALSE),  -- Guaracha
(2, 11, TRUE),  -- Instrumental
(3, 8, TRUE),   -- Cumbia Pompo
(3, 10, FALSE), -- Cumbión
(4, 11, TRUE),  -- Instrumental
(5, 7, TRUE),   -- Cumbia Chey
(6, 8, TRUE),   -- Cumbia Pompo
(7, 7, TRUE),   -- Cumbia Chey
(8, 8, TRUE)    -- Cumbia Pompo
ON CONFLICT (id_tema, id_genero) DO UPDATE SET
  es_principal = EXCLUDED.es_principal;
