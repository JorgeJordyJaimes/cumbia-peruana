from src.db import db


def listar_grupos():
    """Devuelve todos los grupos ordenados alfabéticamente."""
    sql = """
        SELECT id_grupo, nombre_grupo, region
        FROM Grupos
        ORDER BY nombre_grupo
    """
    return db.query(sql)


def buscar_grupos_por_nombre(nombre):
    """Busca grupos que coincidan con el texto ingresado."""
    sql = """
        SELECT g.id_grupo, g.nombre_grupo, g.region, p.nombre as director
        FROM Grupos g
        LEFT JOIN Personas p ON g.id_director = p.id_persona
        WHERE g.nombre_grupo ILIKE %s
        ORDER BY g.nombre_grupo
    """
    return db.query(sql, (f'%{nombre}%',))


def listar_albumes_por_grupo(id_grupo):
    """Muestra todos los álbumes de un grupo específico."""
    sql = """
        SELECT a.id_album, a.nombre_album, a.año_publicacion, 
               ta.nombre_tipo, a.url_portada
        FROM Albumes a
        JOIN Tipos_Album ta ON a.id_tipo_album = ta.id_tipo_album
        WHERE a.id_grupo = %s
        ORDER BY a.año_publicacion
    """
    return db.query(sql, (id_grupo,))


def buscar_albumes_por_nombre(nombre):
    """Busca álbumes por nombre."""
    sql = """
        SELECT a.id_album, a.nombre_album, a.año_publicacion,
               g.nombre_grupo, ta.nombre_tipo, a.url_portada
        FROM Albumes a
        LEFT JOIN Grupos g ON a.id_grupo = g.id_grupo
        LEFT JOIN Tipos_Album ta ON a.id_tipo_album = ta.id_tipo_album
        WHERE a.nombre_album ILIKE %s
        ORDER BY a.año_publicacion
    """
    return db.query(sql, (f'%{nombre}%',))


def obtener_temas_de_album(id_album):
    """Devuelve todos los temas de un álbum, ordenados por lado y pista."""
    sql = """
        SELECT t.id_tema, t.titulo_tema, t.duracion_segundos,
               at.numero_pista, at.lado, g.nombre_genero
        FROM Albumes_Temas at
        JOIN Temas t ON at.id_tema = t.id_tema
        LEFT JOIN Generos g ON t.id_genero = g.id_genero
        WHERE at.id_album = %s
        ORDER BY at.lado, at.numero_pista
    """
    return db.query(sql, (id_album,))


def buscar_temas_por_titulo(titulo):
    """Busca temas por nombre."""
    sql = """
        SELECT t.id_tema, t.titulo_tema, t.duracion_segundos,
               g.nombre_genero, a.nombre_album, gr.nombre_grupo
        FROM Temas t
        LEFT JOIN Generos g ON t.id_genero = g.id_genero
        LEFT JOIN Albumes_Temas at ON t.id_tema = at.id_tema
        LEFT JOIN Albumes a ON at.id_album = a.id_album
        LEFT JOIN Grupos gr ON a.id_grupo = gr.id_grupo
        WHERE t.titulo_tema ILIKE %s
        ORDER BY t.titulo_tema
    """
    return db.query(sql, (f'%{titulo}%',))


def obtener_historial_grupo(id_grupo):
    """Muestra quién estuvo en un grupo y cuándo."""
    sql = """
        SELECT p.nombre, p.apodo, gm.desde, gm.hasta
        FROM Grupos_Musicos gm
        JOIN Personas p ON gm.id_musico = p.id_persona
        WHERE gm.id_grupo = %s
        ORDER BY gm.desde
    """
    return db.query(sql, (id_grupo,))


def contar_registros():
    """Cuenta cuántos registros hay en cada tabla principal."""
    tablas = ['Personas', 'Grupos', 'Albumes', 'Temas', 'Sellos_Discograficos']
    resultados = {}
    for tabla in tablas:
        sql = f"SELECT COUNT(*) as total FROM {tabla}"
        resultados[tabla] = db.query(sql)[0]['total']
    return resultados