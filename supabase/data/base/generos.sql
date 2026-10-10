-- ======================================================================================================================
-- GÉNEROS Y VERTIENTES MUSICALES (TABLA: Generos)
-- Base de Datos: Kumbia Sound - Cumbia Peruana (1968-2005)
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
(11, 'Instrumental')
ON CONFLICT (id_genero) DO UPDATE SET nombre_genero = EXCLUDED.nombre_genero;
