-- ======================================================================================================================
-- TIPOS DE ÁLBUM / FORMATOS FÍSICOS (TABLA: Tipos_Album)
-- Base de Datos: Kumbia Sound - Cumbia Peruana (1968-2005)
-- ======================================================================================================================

INSERT INTO Tipos_Album (id_tipo_album, nombre_tipo)
VALUES  
(1, '45'),
(2, 'LP'),
(3, 'EP'),
(4, 'Casete'),
(5, 'CD')
ON CONFLICT (id_tipo_album) DO UPDATE SET nombre_tipo = EXCLUDED.nombre_tipo;