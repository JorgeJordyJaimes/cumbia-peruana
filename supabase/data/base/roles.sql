-- ======================================================================================================================
-- ROLES DE PARTICIPACIÓN MUSICAL, DIRECCIÓN Y CRÉDITOS (TABLA: Roles)
-- Base de Datos: Kumbia Sound - Cumbia Peruana (1968-2005)
-- Roles catalogados y ampliados orgánicamente por asociación con datos reales (Dirección, Composición, Interpretación, Sesión)
-- ======================================================================================================================

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
(13, 'Compositor'),
(14, 'Arreglista'),
(15, 'Participación Vocal'),
(16, 'Músico de Planta')
ON CONFLICT (id_rol) DO UPDATE SET nombre_rol = EXCLUDED.nombre_rol;
