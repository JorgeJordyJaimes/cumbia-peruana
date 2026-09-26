-- CONSULTA DE TIPOS DE ÁLBUM

SELECT * FROM Tipos_Album;


-- CONSULTA DE GRUPOS

SELECT * FROM grupos;

-- CONSULTA DE SELLOS DISCOGRÁFICOS

SELECT * FROM sellos_discograficos;


-- CONSULTA DE OTROS SELLOS
SELECT
    Grupos.nombre_grupo,
    Albumes.nombre_album,
    Albumes.numero_catalogo,
    Albumes.año_publicacion,
    Sellos_Discograficos.nombre_sello
FROM
    Albumes
JOIN 
    Grupos ON Albumes.id_grupo = Grupos.id_grupo
JOIN 
    Sellos_Discograficos ON Albumes.id_sello = Sellos_Discograficos.id_sello
WHERE 
    Sellos_Discograficos.nombre_sello = 'Horoscopo'
ORDER BY 
    Albumes.año_publicacion ASC,
    Albumes.numero_catalogo ASC;


--- CONSULTA CATÁLOGO DE INFOPESA
SELECT
    Grupos.nombre_grupo,
    Albumes.nombre_album,
    Albumes.numero_catalogo,
    Albumes.año_publicacion,
    Sellos_Discograficos.nombre_sello
FROM
    Albumes
JOIN 
    Grupos ON Albumes.id_grupo = Grupos.id_grupo
JOIN 
    Sellos_Discograficos ON Albumes.id_sello = Sellos_Discograficos.id_sello
WHERE 
    Sellos_Discograficos.nombre_sello = 'Infopesa'
ORDER BY 
    Albumes.año_publicacion ASC,
    Albumes.numero_catalogo ASC;


-- ============================================================
-- CONSULTAS DE TRAZABILIDAD DE SINGLES 45 RPM Y FORMATOS
-- ============================================================

-- 1. CONSULTA DE SINGLES 45 RPM EXTRAÍDOS DE UN LP
SELECT
    COALESCE(g.nombre_grupo, 'Varios Grupos') AS grupo,
    a.numero_catalogo AS catalogo_45,
    a.año_publicacion AS año_45,
    s.nombre_sello,
    lp.nombre_album AS lp_origen,
    lp.numero_catalogo AS catalogo_lp
FROM Albumes a
LEFT JOIN Grupos g ON a.id_grupo = g.id_grupo
LEFT JOIN Sellos_Discograficos s ON a.id_sello = s.id_sello
LEFT JOIN Albumes lp ON a.id_lp_relacionado = lp.id_album
WHERE a.extraido_de_lp = TRUE
ORDER BY a.año_publicacion ASC, a.numero_catalogo ASC;


-- 2. CONSULTA DE 45s LANZADOS PRIMERO Y LUEGO INCLUIDOS EN UN LP
SELECT
    COALESCE(g.nombre_grupo, 'Varios Grupos') AS grupo,
    a.numero_catalogo AS catalogo_45,
    a.año_publicacion AS año_45,
    s.nombre_sello,
    lp.nombre_album AS lp_destino,
    lp.año_publicacion AS año_lp
FROM Albumes a
LEFT JOIN Grupos g ON a.id_grupo = g.id_grupo
LEFT JOIN Sellos_Discograficos s ON a.id_sello = s.id_sello
LEFT JOIN Albumes lp ON a.id_lp_relacionado = lp.id_album
WHERE a.incluido_en_lp = TRUE
ORDER BY a.año_publicacion ASC, a.numero_catalogo ASC;


-- 3. CONSULTA DE SINGLES EXCLUSIVOS EN 45 RPM (NUNCA EN LP)
SELECT
    COALESCE(g.nombre_grupo, 'Varios Grupos') AS grupo,
    a.numero_catalogo AS catalogo_45,
    a.año_publicacion,
    s.nombre_sello,
    a.comentario
FROM Albumes a
LEFT JOIN Grupos g ON a.id_grupo = g.id_grupo
LEFT JOIN Sellos_Discograficos s ON a.id_sello = s.id_sello
WHERE a.solo_en_45 = TRUE
ORDER BY a.año_publicacion ASC, a.numero_catalogo ASC;


-- ============================================================
-- CONSULTAS DE RECOPILATORIOS Y REEDICIONES
-- ============================================================

-- 4. CONSULTA DE LPs VARIADOS / RECOPILATORIOS DE DISQUERAS
SELECT
    a.nombre_album,
    a.numero_catalogo,
    a.año_publicacion,
    s.nombre_sello,
    ta.nombre_tipo AS formato
FROM Albumes a
LEFT JOIN Sellos_Discograficos s ON a.id_sello = s.id_sello
LEFT JOIN Tipos_Album ta ON a.id_tipo_album = ta.id_tipo_album
WHERE a.es_recopilatorio = TRUE
ORDER BY a.año_publicacion ASC, a.nombre_album ASC;


-- 5. CONSULTA DE REEDICIONES / RELANZAMIENTOS CON SU DISCO ORIGINAL
SELECT
    reedicion.nombre_album,
    reedicion.numero_catalogo AS catalogo_reedicion,
    reedicion.año_publicacion AS año_reedicion,
    sello_re.nombre_sello AS sello_reedicion,
    original.numero_catalogo AS catalogo_original,
    original.año_publicacion AS año_original,
    sello_orig.nombre_sello AS sello_original
FROM Albumes reedicion
LEFT JOIN Sellos_Discograficos sello_re ON reedicion.id_sello = sello_re.id_sello
LEFT JOIN Albumes original ON reedicion.id_album_original = original.id_album
LEFT JOIN Sellos_Discograficos sello_orig ON original.id_sello = sello_orig.id_sello
WHERE reedicion.es_reedicion = TRUE;


-- ============================================================
-- CONSULTAS DE COLABORACIONES ENTRE GRUPOS EN TEMAS
-- ============================================================

-- 6. CONSULTA DE TEMAS CON MÁS DE UN GRUPO (COLABORACIÓN O ACOMPAÑAMIENTO)
SELECT
    t.titulo_tema,
    STRING_AGG(CONCAT(g.nombre_grupo, ' (', tg.rol_participacion, ')'), ', ') AS interpretes
FROM Temas t
JOIN Temas_Grupos tg ON t.id_tema = tg.id_tema
JOIN Grupos g ON tg.id_grupo = g.id_grupo
GROUP BY t.id_tema, t.titulo_tema
HAVING COUNT(tg.id_grupo) > 1;


-- ============================================================
-- CONSULTAS DE TRAZABILIDAD DE PISTAS EN RECOPILATORIOS
-- ============================================================

-- 7. CONSULTA DE PISTAS DE UN RECOPILATORIO CON SU ÁLBUM O SINGLE DE ORIGEN
SELECT
    recop.nombre_album AS recopilatorio,
    sello_recop.nombre_sello AS sello,
    at.numero_pista,
    at.lado,
    t.titulo_tema,
    COALESCE(g.nombre_grupo, 'Varios Artistas') AS interprete,
    CASE
        WHEN at.es_grabacion_inedita = TRUE THEN 'Grabación Inédita'
        WHEN orig.id_album IS NOT NULL THEN CONCAT(orig.nombre_album, ' (', ta_orig.nombre_tipo, ' - ', orig.año_publicacion, ')')
        ELSE 'Origen no catalogado'
    END AS procedencia_audio
FROM Albumes recop
JOIN Albumes_Temas at ON recop.id_album = at.id_album
JOIN Temas t ON at.id_tema = t.id_tema
LEFT JOIN Temas_Grupos tg ON t.id_tema = tg.id_tema AND tg.rol_participacion = 'Principal'
LEFT JOIN Grupos g ON tg.id_grupo = g.id_grupo
LEFT JOIN Sellos_Discograficos sello_recop ON recop.id_sello = sello_recop.id_sello
LEFT JOIN Albumes orig ON at.id_album_origen = orig.id_album
LEFT JOIN Tipos_Album ta_orig ON orig.id_tipo_album = ta_orig.id_tipo_album
WHERE recop.es_recopilatorio = TRUE
ORDER BY recop.año_publicacion, at.lado, at.numero_pista;


-- 8. CONSULTA DE RECOPILATORIOS DE VARIOS ARTISTAS POR SELLO DISCOGRÁFICO
SELECT
    a.nombre_album,
    a.numero_catalogo,
    a.año_publicacion,
    s.nombre_sello,
    COUNT(DISTINCT at.id_tema) AS total_temas
FROM Albumes a
JOIN Sellos_Discograficos s ON a.id_sello = s.id_sello
LEFT JOIN Albumes_Temas at ON a.id_album = at.id_album
WHERE a.es_recopilatorio = TRUE AND a.es_varios_artistas = TRUE
GROUP BY a.id_album, a.nombre_album, a.numero_catalogo, a.año_publicacion, s.nombre_sello
ORDER BY a.año_publicacion ASC, a.nombre_album ASC;


-- ============================================================
-- CONSULTAS DE DISCOGRAFÍA Y TRAZABILIDAD: GRUPO CELESTE (45 RPM)
-- ============================================================

-- 9. CONSULTA INTEGRAL DE SINGLES 45 RPM DEL GRUPO CELESTE
-- Muestra cada disco de 45 RPM con sus temas por Lado A / Lado B, sello, catálogo,
-- año, estado de reedición y su disco/LP original relacionado si aplica.
SELECT
    a.numero_catalogo AS catalogo,
    s.nombre_sello AS sello,
    a.año_publicacion AS año,
    at.lado,
    t.id_tema,
    t.titulo_tema,
    g.nombre_genero AS genero,
    CASE
        WHEN a.es_reedicion = TRUE THEN CONCAT('Reedición (Original: ', s_orig.nombre_sello, ' ', orig.numero_catalogo, ' - ', orig.año_publicacion, ')')
        WHEN a.extraido_de_lp = TRUE THEN CONCAT('Extraído de LP: ', COALESCE(lp.nombre_album, lp.numero_catalogo), ' (', lp.año_publicacion, ')')
        WHEN a.incluido_en_lp = TRUE THEN CONCAT('Incluido en LP: ', COALESCE(lp.nombre_album, lp.numero_catalogo), ' (', lp.año_publicacion, ')')
        WHEN a.solo_en_45 = TRUE THEN 'Exclusivo en 45 RPM'
        ELSE 'Lanzamiento Estándar'
    END AS tipo_lanzamiento
FROM Albumes a
JOIN Sellos_Discograficos s ON a.id_sello = s.id_sello
JOIN Albumes_Temas at ON a.id_album = at.id_album
JOIN Temas t ON at.id_tema = t.id_tema
LEFT JOIN Generos g ON t.id_genero = g.id_genero
LEFT JOIN Albumes orig ON a.id_album_original = orig.id_album
LEFT JOIN Sellos_Discograficos s_orig ON orig.id_sello = s_orig.id_sello
LEFT JOIN Albumes lp ON a.id_lp_relacionado = lp.id_album
WHERE a.id_grupo = 12 AND a.id_tipo_album = 1
ORDER BY a.año_publicacion ASC, a.numero_catalogo ASC, at.lado ASC;


-- 10. CONSULTA RESUMEN DE REEDICIONES DEL GRUPO CELESTE
-- Compara directamente los singles relanzados con su single original matriz
SELECT
    reed.numero_catalogo AS cat_reedicion,
    s_reed.nombre_sello AS sello_reedicion,
    reed.año_publicacion AS año_reedicion,
    at_reed.lado AS lado_reedicion,
    t.titulo_tema,
    orig.numero_catalogo AS cat_original,
    s_orig.nombre_sello AS sello_original,
    orig.año_publicacion AS año_original,
    at_orig.lado AS lado_original
FROM Albumes reed
JOIN Sellos_Discograficos s_reed ON reed.id_sello = s_reed.id_sello
JOIN Albumes orig ON reed.id_album_original = orig.id_album
JOIN Sellos_Discograficos s_orig ON orig.id_sello = s_orig.id_sello
JOIN Albumes_Temas at_reed ON reed.id_album = at_reed.id_album
JOIN Temas t ON at_reed.id_tema = t.id_tema
JOIN Albumes_Temas at_orig ON orig.id_album = at_orig.id_album AND at_orig.id_tema = t.id_tema
WHERE reed.id_grupo = 12 AND reed.es_reedicion = TRUE
ORDER BY reed.año_publicacion ASC, reed.numero_catalogo ASC, at_reed.lado ASC;

