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

-- CONSULTA DE GRUPOS

SELECT * FROM grupos;


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