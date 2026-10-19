-- ======================================================================================================================
-- GÉNEROS Y VERTIENTES MUSICALES (TABLA: Generos)
-- Base de Datos: Kumbia Sound - Cumbia Peruana (1968-2005)
-- Datos reales catalogados desde la discografía física (Docs BD.ods)
-- ======================================================================================================================

INSERT INTO Generos (id_genero, nombre_genero) 
VALUES
(1, 'Cumbia Costeña'),
(2, 'Cumbia Amazónica'),
(3, 'Cumbia Andina / Chicha'),
(4, 'Cumbia Norteña'),
(5, 'Cumbia Sureña'),
(6, 'Cumbia Romántica / Sanjuanera'),
(7, 'Cumbia Chey'),
(8, 'Cumbia Pompo'),
(9, 'Guaracha'),
(10, 'Cumbión'),
(11, 'Instrumental'),
(12, 'Cumbia Fuzz'),
(13, 'Cumbia Rítmica'),
(14, 'Cumbia Elegante'),
(15, 'Chicha Andina'),
(16, 'Balada'),
(17, 'Bolero'),
(18, 'Merengue'),
(19, 'Rock'),
(20, 'Mosaico'),
(21, 'Cumbia Andina'),
(22, 'Chicha'),
(23, 'Beat Soul'),
(24, 'Cumbia Carretera'),
(25, 'Cumbión Amazónico'),
(26, 'Cumbia Fusión'),
(27, 'Cumbia Tropical'),
(28, 'Pop'),
(29, 'Rumba'),
(30, 'Salsa'),
(31, 'Soul')
ON CONFLICT (id_genero) DO UPDATE SET nombre_genero = EXCLUDED.nombre_genero;
