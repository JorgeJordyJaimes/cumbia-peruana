-- ============================================================
-- BASE DE DATOS: Kumbia Sound - Cumbia Peruana (1968-2005)
-- ARCHIVO MAESTRO DE CONSULTAS Y REPORTES SQL
-- ============================================================

-- ============================================================
-- 1. CONSULTAS GENERALES DE CATÁLOGOS BASE
-- ============================================================

-- 1.1 Formatos de Álbum (Tipos)
SELECT * FROM Tipos_Album ORDER BY id_tipo_album ASC;

-- 1.2 Agrupaciones Musicales
SELECT * FROM Grupos ORDER BY id_grupo ASC;

-- 1.3 Sellos Discográficos
SELECT * FROM Sellos_Discograficos ORDER BY nombre_sello ASC;


-- ============================================================
-- 2. CONSULTAS DE CATÁLOGO POR SELLO DISCOGRÁFICO
-- ============================================================

-- 2.1 Catálogo de Producciones Horóscopo (LPs y Singles)
SELECT
    g.nombre_grupo,
    ta.nombre_tipo AS formato,
    a.numero_catalogo,
    a.año_publicacion,
    COALESCE(a.nombre_album, '(Single 45 RPM)') AS nombre_album,
    s.nombre_sello
FROM Albumes a
JOIN Grupos g ON a.id_grupo = g.id_grupo
JOIN Sellos_Discograficos s ON a.id_sello = s.id_sello
JOIN Tipos_Album ta ON a.id_tipo_album = ta.id_tipo_album
WHERE s.nombre_sello IN ('Horóscopo', 'Horoscopo')
ORDER BY a.año_publicacion ASC, a.numero_catalogo ASC;

-- 2.2 Catálogo de Infopesa
SELECT
    g.nombre_grupo,
    ta.nombre_tipo AS formato,
    a.numero_catalogo,
    a.año_publicacion,
    COALESCE(a.nombre_album, '(Single 45 RPM)') AS nombre_album,
    s.nombre_sello
FROM Albumes a
JOIN Grupos g ON a.id_grupo = g.id_grupo
JOIN Sellos_Discograficos s ON a.id_sello = s.id_sello
JOIN Tipos_Album ta ON a.id_tipo_album = ta.id_tipo_album
WHERE s.nombre_sello = 'Infopesa'
ORDER BY a.año_publicacion ASC, a.numero_catalogo ASC;


-- ============================================================
-- 3. CONSULTAS DE TRAZABILIDAD DE SINGLES 45 RPM
-- ============================================================

-- 3.1 Singles 45 RPM extraídos de un LP (Cortes promocionales de álbum)
SELECT
    COALESCE(g.nombre_grupo, 'Varios Grupos') AS grupo,
    a.numero_catalogo AS catalogo_45,
    a.año_publicacion AS año_45,
    s.nombre_sello,
    COALESCE(a.lados_en_lp, 'Ambos Lados') AS lados_extraidos,
    COALESCE(lp.nombre_album, lp.numero_catalogo, 'LP no vinculado aún') AS lp_origen,
    lp.año_publicacion AS año_lp
FROM Albumes a
LEFT JOIN Grupos g ON a.id_grupo = g.id_grupo
LEFT JOIN Sellos_Discograficos s ON a.id_sello = s.id_sello
LEFT JOIN Albumes lp ON a.id_lp_relacionado = lp.id_album
WHERE a.extraido_de_lp = TRUE AND a.id_tipo_album = 1
ORDER BY a.año_publicacion ASC, a.numero_catalogo ASC;

-- 3.2 Singles 45 RPM publicados primero y posteriormente incluidos en un LP
SELECT
    COALESCE(g.nombre_grupo, 'Varios Grupos') AS grupo,
    a.numero_catalogo AS catalogo_45,
    a.año_publicacion AS año_45,
    s.nombre_sello,
    COALESCE(a.lados_en_lp, 'Ambos Lados') AS lados_en_lp,
    COALESCE(lp.nombre_album, lp.numero_catalogo, 'LP no vinculado aún') AS lp_destino,
    lp.año_publicacion AS año_lp
FROM Albumes a
LEFT JOIN Grupos g ON a.id_grupo = g.id_grupo
LEFT JOIN Sellos_Discograficos s ON a.id_sello = s.id_sello
LEFT JOIN Albumes lp ON a.id_lp_relacionado = lp.id_album
WHERE a.incluido_en_lp = TRUE AND a.id_tipo_album = 1
ORDER BY a.año_publicacion ASC, a.numero_catalogo ASC;

-- 3.3 Singles exclusivos en 45 RPM (Rarezas nunca incluidas en ningún LP oficial)
SELECT
    COALESCE(g.nombre_grupo, 'Varios Grupos') AS grupo,
    a.numero_catalogo AS catalogo_45,
    a.año_publicacion AS año,
    s.nombre_sello,
    a.comentario
FROM Albumes a
LEFT JOIN Grupos g ON a.id_grupo = g.id_grupo
LEFT JOIN Sellos_Discograficos s ON a.id_sello = s.id_sello
WHERE a.solo_en_45 = TRUE AND a.id_tipo_album = 1
ORDER BY a.año_publicacion ASC, a.numero_catalogo ASC;

-- 3.4 Discos Split (Singles compartidos entre dos grupos diferentes)
SELECT
    a.numero_catalogo,
    a.año_publicacion,
    s.nombre_sello,
    STRING_AGG(CONCAT('Lado ', agl.lado, ': ', g.nombre_grupo), ' | ') AS grupos_por_lado
FROM Albumes a
JOIN Sellos_Discograficos s ON a.id_sello = s.id_sello
LEFT JOIN Albumes_Grupos_Lados agl ON a.id_album = agl.id_album
LEFT JOIN Grupos g ON agl.id_grupo = g.id_grupo
WHERE a.es_disco_split = TRUE AND a.id_tipo_album = 1
GROUP BY a.id_album, a.numero_catalogo, a.año_publicacion, s.nombre_sello
ORDER BY a.año_publicacion ASC, a.numero_catalogo ASC;


-- ============================================================
-- 4. CONSULTAS DE RECOPILATORIOS Y REEDICIONES
-- ============================================================

-- 4.1 LPs recopilatorios y compilaciones de disqueras
SELECT
    a.nombre_album,
    a.numero_catalogo,
    a.año_publicacion,
    s.nombre_sello,
    ta.nombre_tipo AS formato,
    CASE 
        WHEN a.es_varios_artistas = TRUE THEN 'Varios Artistas'
        ELSE 'Artista / Grupo Único'
    END AS tipo_artista
FROM Albumes a
LEFT JOIN Sellos_Discograficos s ON a.id_sello = s.id_sello
LEFT JOIN Tipos_Album ta ON a.id_tipo_album = ta.id_tipo_album
WHERE a.es_recopilatorio = TRUE
ORDER BY a.año_publicacion ASC, a.nombre_album ASC;

-- 4.2 Reediciones y relanzamientos con su disco matriz original
SELECT
    COALESCE(g.nombre_grupo, 'Varios Grupos') AS grupo,
    reed.numero_catalogo AS catalogo_reedicion,
    reed.año_publicacion AS año_reedicion,
    sello_re.nombre_sello AS sello_reedicion,
    orig.numero_catalogo AS catalogo_original,
    orig.año_publicacion AS año_original,
    sello_orig.nombre_sello AS sello_original
FROM Albumes reed
LEFT JOIN Grupos g ON reed.id_grupo = g.id_grupo
LEFT JOIN Sellos_Discograficos sello_re ON reed.id_sello = sello_re.id_sello
LEFT JOIN Albumes orig ON reed.id_album_original = orig.id_album
LEFT JOIN Sellos_Discograficos sello_orig ON orig.id_sello = sello_orig.id_sello
WHERE reed.es_reedicion = TRUE
ORDER BY reed.año_publicacion ASC, reed.numero_catalogo ASC;


-- ============================================================
-- 5. CONSULTAS DE COLABORACIONES Y PROCEDENCIA DE PISTAS
-- ============================================================

-- 5.1 Temas con más de una agrupación (Colaboración o Acompañamiento)
SELECT
    t.id_tema,
    t.titulo_tema,
    STRING_AGG(CONCAT(g.nombre_grupo, ' (', tg.rol_participacion, ')'), ', ') AS interpretes
FROM Temas t
JOIN Temas_Grupos tg ON t.id_tema = tg.id_tema
JOIN Grupos g ON tg.id_grupo = g.id_grupo
GROUP BY t.id_tema, t.titulo_tema
HAVING COUNT(tg.id_grupo) > 1
ORDER BY t.titulo_tema ASC;

-- 5.2 Pistas de recopilatorios con su procedencia de grabación original
SELECT
    recop.nombre_album AS recopilatorio,
    sello_recop.nombre_sello AS sello,
    at.numero_pista,
    at.lado,
    t.titulo_tema,
    COALESCE(g.nombre_grupo, 'Varios Artistas') AS interprete,
    CASE
        WHEN at.es_grabacion_inedita = TRUE THEN 'Grabación Inédita'
        WHEN orig.id_album IS NOT NULL THEN CONCAT(COALESCE(orig.nombre_album, orig.numero_catalogo), ' (', ta_orig.nombre_tipo, ' - ', orig.año_publicacion, ')')
        ELSE 'Origen pendiente de catalogar'
    END AS procedencia_audio
FROM Albumes recop
LEFT JOIN Sellos_Discograficos sello_recop ON recop.id_sello = sello_recop.id_sello
LEFT JOIN Albumes_Temas at ON recop.id_album = at.id_album
LEFT JOIN Temas t ON at.id_tema = t.id_tema
LEFT JOIN Temas_Grupos tg ON t.id_tema = tg.id_tema AND tg.rol_participacion = 'Principal'
LEFT JOIN Grupos g ON tg.id_grupo = g.id_grupo
LEFT JOIN Albumes orig ON at.id_album_origen = orig.id_album
LEFT JOIN Tipos_Album ta_orig ON orig.id_tipo_album = ta_orig.id_tipo_album
WHERE recop.es_recopilatorio = TRUE
ORDER BY recop.año_publicacion, recop.nombre_album, at.lado, at.numero_pista;

-- 5.3 Conteo de pistas por recopilatorio de varios artistas
SELECT
    a.nombre_album,
    a.numero_catalogo,
    a.año_publicacion,
    s.nombre_sello,
    COUNT(DISTINCT at.id_tema) AS total_temas_catalogados
FROM Albumes a
JOIN Sellos_Discograficos s ON a.id_sello = s.id_sello
LEFT JOIN Albumes_Temas at ON a.id_album = at.id_album
WHERE a.es_recopilatorio = TRUE AND a.es_varios_artistas = TRUE
GROUP BY a.id_album, a.nombre_album, a.numero_catalogo, a.año_publicacion, s.nombre_sello
ORDER BY a.año_publicacion ASC, a.nombre_album ASC;


-- ============================================================
-- 6. DISCOGRAFÍA Y TRAZABILIDAD: GRUPO CELESTE (SINGLES 45 RPM)
-- ============================================================

-- 6.1 Consulta Integral de Singles 45 RPM del Grupo Celeste (REPARADA)
-- Utiliza LEFT JOIN para garantizar que los 37 discos siempre se listen en la consulta
-- y muestren todos sus datos, temas por Lado A/B y trazabilidad histórica sin vaciarse.
SELECT
    a.numero_catalogo AS catalogo,
    s.nombre_sello AS sello,
    a.año_publicacion AS año,
    COALESCE(at.lado, '-') AS lado,
    t.id_tema,
    COALESCE(t.titulo_tema, '(Temas pendientes de catalogar)') AS titulo_tema,
    g.nombre_genero AS genero,
    CASE
        WHEN a.es_reedicion = TRUE THEN CONCAT('Reedición (Original: ', COALESCE(s_orig.nombre_sello, 'Desconocido'), ' ', COALESCE(orig.numero_catalogo, ''), ' - ', COALESCE(orig.año_publicacion::TEXT, ''), ')')
        WHEN a.extraido_de_lp = TRUE THEN CONCAT('Extraído de LP: ', COALESCE(lp.nombre_album, lp.numero_catalogo, 'No vinculado'), ' (', COALESCE(lp.año_publicacion::TEXT, ''), ')')
        WHEN a.incluido_en_lp = TRUE THEN CONCAT('Incluido en LP: ', COALESCE(lp.nombre_album, lp.numero_catalogo, 'No vinculado'), ' (', COALESCE(lp.año_publicacion::TEXT, ''), ')')
        WHEN a.solo_en_45 = TRUE THEN 'Exclusivo en 45 RPM'
        ELSE 'Lanzamiento Estándar'
    END AS tipo_lanzamiento
FROM Albumes a
LEFT JOIN Sellos_Discograficos s ON a.id_sello = s.id_sello
LEFT JOIN Albumes_Temas at ON a.id_album = at.id_album
LEFT JOIN Temas t ON at.id_tema = t.id_tema
LEFT JOIN Generos g ON t.id_genero = g.id_genero
LEFT JOIN Albumes orig ON a.id_album_original = orig.id_album
LEFT JOIN Sellos_Discograficos s_orig ON orig.id_sello = s_orig.id_sello
LEFT JOIN Albumes lp ON a.id_lp_relacionado = lp.id_album
WHERE a.id_grupo = 12 AND a.id_tipo_album = 1
ORDER BY a.año_publicacion ASC, a.numero_catalogo ASC, at.lado ASC;

-- 6.2 Consulta Resumen de Reediciones del Grupo Celeste (REPARADA)
-- Compara directamente los singles relanzados con su single original matriz
SELECT
    reed.numero_catalogo AS cat_reedicion,
    s_reed.nombre_sello AS sello_reedicion,
    reed.año_publicacion AS año_reedicion,
    COALESCE(at_reed.lado, '-') AS lado_reedicion,
    COALESCE(t.titulo_tema, '(Tema pendiente)') AS titulo_tema,
    orig.numero_catalogo AS cat_original,
    s_orig.nombre_sello AS sello_original,
    orig.año_publicacion AS año_original,
    COALESCE(at_orig.lado, '-') AS lado_original
FROM Albumes reed
LEFT JOIN Sellos_Discograficos s_reed ON reed.id_sello = s_reed.id_sello
LEFT JOIN Albumes orig ON reed.id_album_original = orig.id_album
LEFT JOIN Sellos_Discograficos s_orig ON orig.id_sello = s_orig.id_sello
LEFT JOIN Albumes_Temas at_reed ON reed.id_album = at_reed.id_album
LEFT JOIN Temas t ON at_reed.id_tema = t.id_tema
LEFT JOIN Albumes_Temas at_orig ON orig.id_album = at_orig.id_album AND at_orig.id_tema = t.id_tema
WHERE reed.id_grupo = 12 AND reed.es_reedicion = TRUE
ORDER BY reed.año_publicacion ASC, reed.numero_catalogo ASC, at_reed.lado ASC;
