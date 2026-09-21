-- ============================================================
-- SEED DATA: Catálogos Base
-- ============================================================

-- 1. Tipos de Álbum (Formatos físicos)
INSERT INTO Tipos_Album (id_tipo_album, nombre_tipo)
VALUES  
(1, '45'),
(2, 'LP'),
(3, 'EP'),
(4, 'Casete'),
(5, 'CD')
ON CONFLICT (nombre_tipo) DO NOTHING;

-- 2. Géneros y vertientes de la Cumbia Peruana
INSERT INTO Generos (id_genero, nombre_genero)
VALUES
(1, 'Cumbia Costeña'),
(2, 'Cumbia Amazónica'),
(3, 'Cumbia Andina / Chicha'),
(4, 'Cumbia Norteña'),
(5, 'Cumbia Sureña'),
(6, 'Cumbia Romántica / Sanjuanera')
ON CONFLICT DO NOTHING;

-- 3. Roles de participación musical
INSERT INTO Roles (id_rol, nombre_rol)
VALUES
(1, 'Director Musical'),
(2, 'Primera Guitarra'),
(3, 'Segunda Guitarra'),
(4, 'Bajo Eléctrico'),
(5, 'Voz Principal'),
(6, 'Coros'),
(7, 'Timbales'),
(8, 'Congas'),
(9, 'Bongó / Campana'),
(10, 'Güiro / Maracas'),
(11, 'Teclados / Sintetizador'),
(12, 'Animación'),
(13, 'Compositor')
ON CONFLICT (nombre_rol) DO NOTHING;
