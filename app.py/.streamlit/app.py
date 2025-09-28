import streamlit as st
import mysql.connector
import pandas as pd
from datetime import date, datetime
import plotly.express as px
import plotly.graph_objects as go

# Configuración de la página
st.set_page_config(
    page_title="🎵 Gestión Musical DB",
    page_icon="🎵",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Configuración de la base de datos
def init_connection():
    """Inicializa la conexión a MySQL"""
    try:
        connection = mysql.connector.connect(
            host="localhost",
            port=3306,
            database="Cumbia_Peruana",
            user="root",
            password="1122"
        )
        return connection
    except Exception as e:
        st.error(f"Error conectando a la base de datos: {e}")
        st.info("💡 Verifica que MySQL esté funcionando y los datos de conexión sean correctos")
        return None

# Función para ejecutar queries
def execute_query(query, params=None, fetch=False):
    """Ejecuta una query en la base de datos"""
    conn = init_connection()
    if conn is None:
        return None
    
    cursor = None
    try:
        cursor = conn.cursor()
        cursor.execute(query, params or ())
        
        if fetch:
            result = cursor.fetchall()
            columns = [desc[0] for desc in cursor.description]
            return pd.DataFrame(result, columns=columns)
        else:
            conn.commit()
            return True
    except Exception as e:
        st.error(f"Error en la consulta: {e}")
        return None
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

# Función para obtener datos de referencia
@st.cache_data(ttl=60)
def get_reference_data(table, id_col, name_col):
    """Obtiene datos de referencia para selectboxes"""
    query = f"SELECT {id_col}, {name_col} FROM {table} ORDER BY {name_col}"
    df = execute_query(query, fetch=True)
    if df is not None and not df.empty:
        return dict(zip(df[name_col], df[id_col]))
    return {}

# Sidebar para navegación
st.sidebar.title("🎵 Navegación")
section = st.sidebar.selectbox(
    "Selecciona una sección:",
    ["🏠 Dashboard", "👤 Personas", "🎤 Grupos", "💿 Álbumes", "🎵 Temas", "📊 Reportes", "⚙️ Administración"]
)

# Función para mostrar el dashboard
def show_dashboard():
    st.title("🏠 Dashboard - Base de Datos Musical")
    
    col1, col2, col3, col4 = st.columns(4)
    
    # Métricas principales
    personas_count = execute_query("SELECT COUNT(*) as count FROM personas", fetch=True)
    grupos_count = execute_query("SELECT COUNT(*) as count FROM grupos", fetch=True)
    albumes_count = execute_query("SELECT COUNT(*) as count FROM albumes", fetch=True)
    temas_count = execute_query("SELECT COUNT(*) as count FROM temas", fetch=True)
    
    if personas_count is not None:
        col1.metric("👤 Personas", personas_count['count'].iloc[0])
    if grupos_count is not None:
        col2.metric("🎤 Grupos", grupos_count['count'].iloc[0])
    if albumes_count is not None:
        col3.metric("💿 Álbumes", albumes_count['count'].iloc[0])
    if temas_count is not None:
        col4.metric("🎵 Temas", temas_count['count'].iloc[0])
    
    # Gráficos
    col1, col2 = st.columns(2)
    
    with col1:
        st.subheader("📈 Álbumes por Año")
        albums_by_year = execute_query("""
            SELECT año_publicacion, COUNT(*) as cantidad 
            FROM albumes 
            WHERE año_publicacion IS NOT NULL 
            GROUP BY año_publicacion 
            ORDER BY año_publicacion
        """, fetch=True)
        
        if albums_by_year is not None and not albums_by_year.empty:
            fig = px.line(albums_by_year, x='año_publicacion', y='cantidad', 
                         markers=True, title="Evolución de publicaciones")
            st.plotly_chart(fig, use_container_width=True)
        else:
            st.info("No hay datos de álbumes para mostrar")
    
    with col2:
        st.subheader("🎭 Géneros Musicales")
        genres = execute_query("""
            SELECT g.nombre_genero, COUNT(t.id_tema) as cantidad
            FROM generos g
            LEFT JOIN temas t ON g.id_genero = t.id_genero
            GROUP BY g.id_genero, g.nombre_genero
            ORDER BY cantidad DESC
            LIMIT 10
        """, fetch=True)
        
        if genres is not None and not genres.empty:
            fig = px.pie(genres, values='cantidad', names='nombre_genero',
                        title="Distribución por Géneros")
            st.plotly_chart(fig, use_container_width=True)
        else:
            st.info("No hay datos de géneros para mostrar")

# Función para gestionar personas
def manage_personas():
    st.title("👤 Gestión de Personas")
    
    tab1, tab2, tab3 = st.tabs(["➕ Agregar", "📋 Ver/Editar", "🔍 Buscar"])
    
    with tab1:
        st.subheader("Agregar Nueva Persona")
        
        with st.form("add_persona"):
            col1, col2 = st.columns(2)
            
            with col1:
                nombre = st.text_input("Nombre *", max_chars=100)
                apodo = st.text_input("Apodo", max_chars=100)
            
            with col2:
                fecha_nac = st.date_input("Fecha de Nacimiento", value=None)
                lugar_nac = st.text_input("Lugar de Nacimiento", max_chars=100)
            
            submitted = st.form_submit_button("💾 Guardar Persona")
            
            if submitted and nombre:
                query = """INSERT INTO personas (nombre, apodo, fecha_nacimiento, lugar_nacimiento) 
                          VALUES (%s, %s, %s, %s)"""
                params = (nombre, apodo or None, fecha_nac, lugar_nac or None)
                
                if execute_query(query, params):
                    st.success("✅ Persona agregada exitosamente")
                    st.rerun()
    
    with tab2:
        st.subheader("Lista de Personas")
        
        personas_df = execute_query("""
            SELECT id_persona, nombre, apodo, fecha_nacimiento, lugar_nacimiento
            FROM personas 
            ORDER BY nombre
        """, fetch=True)
        
        if personas_df is not None and not personas_df.empty:
            st.dataframe(personas_df, use_container_width=True)
        else:
            st.info("No hay personas registradas")
    
    with tab3:
        st.subheader("Buscar Persona")
        search_term = st.text_input("🔍 Buscar por nombre o apodo:")
        
        if search_term:
            search_query = """
                SELECT id_persona, nombre, apodo, fecha_nacimiento, lugar_nacimiento
                FROM personas 
                WHERE nombre LIKE %s OR apodo LIKE %s
                ORDER BY nombre
            """
            search_results = execute_query(search_query, (f"%{search_term}%", f"%{search_term}%"), fetch=True)
            
            if search_results is not None and not search_results.empty:
                st.dataframe(search_results, use_container_width=True)
            else:
                st.info("No se encontraron resultados")

# Función para gestionar grupos
def manage_grupos():
    st.title("🎤 Gestión de Grupos")
    
    tab1, tab2, tab3 = st.tabs(["➕ Agregar", "📋 Ver/Editar", "👥 Directores"])
    
    with tab1:
        st.subheader("Agregar Nuevo Grupo")
        
        with st.form("add_grupo"):
            nombre_grupo = st.text_input("Nombre del Grupo *", max_chars=100)
            region = st.text_input("Región", max_chars=100)
            
            submitted = st.form_submit_button("💾 Guardar Grupo")
            
            if submitted and nombre_grupo:
                query = "INSERT INTO grupos (nombre_grupo, region) VALUES (%s, %s)"
                params = (nombre_grupo, region or None)
                
                if execute_query(query, params):
                    st.success("✅ Grupo agregado exitosamente")
                    st.rerun()
    
    with tab2:
        st.subheader("Lista de Grupos")
        
        grupos_query = """
            SELECT g.id_grupo, g.nombre_grupo, g.region,
                   p.nombre as director_actual,
                   gd.fecha_inicio as director_desde
            FROM grupos g
            LEFT JOIN grupos_directores gd ON g.id_grupo = gd.id_grupo AND gd.fecha_fin IS NULL
            LEFT JOIN personas p ON gd.id_director = p.id_persona
            ORDER BY g.nombre_grupo
        """
        
        grupos_df = execute_query(grupos_query, fetch=True)
        
        if grupos_df is not None and not grupos_df.empty:
            st.dataframe(grupos_df, use_container_width=True)
        else:
            st.info("No hay grupos registrados")
    
    with tab3:
        st.subheader("Gestionar Directores")
        
        # Obtener grupos y personas para los selectboxes
        grupos_data = get_reference_data("grupos", "id_grupo", "nombre_grupo")
        personas_data = get_reference_data("personas", "id_persona", "nombre")
        
        if grupos_data and personas_data:
            with st.form("add_director"):
                col1, col2, col3 = st.columns(3)
                
                with col1:
                    grupo_selected = st.selectbox("Grupo", list(grupos_data.keys()))
                with col2:
                    director_selected = st.selectbox("Director", list(personas_data.keys()))
                with col3:
                    fecha_inicio = st.date_input("Fecha Inicio", value=date.today())
                
                comentarios = st.text_area("Comentarios")
                submitted = st.form_submit_button("🎯 Asignar Director")
                
                if submitted and grupo_selected and director_selected:
                    # Primero cerrar director actual si existe
                    close_query = """UPDATE grupos_directores 
                                    SET fecha_fin = %s 
                                    WHERE id_grupo = %s AND fecha_fin IS NULL"""
                    execute_query(close_query, (fecha_inicio, grupos_data[grupo_selected]))
                    
                    # Agregar nuevo director
                    insert_query = """INSERT INTO grupos_directores 
                                     (id_grupo, id_director, fecha_inicio, comentarios) 
                                     VALUES (%s, %s, %s, %s)"""
                    params = (grupos_data[grupo_selected], personas_data[director_selected], 
                             fecha_inicio, comentarios or None)
                    
                    if execute_query(insert_query, params):
                        st.success("✅ Director asignado exitosamente")
                        st.rerun()

# Función para gestionar álbumes
def manage_albums():
    st.title("💿 Gestión de Álbumes")
    
    tab1, tab2 = st.tabs(["➕ Agregar", "📋 Ver/Editar"])
    
    with tab1:
        st.subheader("Agregar Nuevo Álbum")
        
        grupos_data = get_reference_data("grupos", "id_grupo", "nombre_grupo")
        sellos_data = get_reference_data("sellos_discograficos", "id_sello", "nombre_sello")
        tipos_data = get_reference_data("tipos_album", "id_tipo_album", "nombre_tipo")
        
        with st.form("add_album"):
            col1, col2 = st.columns(2)
            
            with col1:
                nombre_album = st.text_input("Nombre del Álbum *", max_chars=100)
                grupo_selected = st.selectbox("Grupo", [""] + list(grupos_data.keys()))
                año = st.number_input("Año de Publicación", min_value=1900, max_value=2030, value=2024)
            
            with col2:
                numero_catalogo = st.text_input("Número de Catálogo", max_chars=50)
                sello_selected = st.selectbox("Sello Discográfico", [""] + list(sellos_data.keys()))
                tipo_selected = st.selectbox("Tipo de Álbum", [""] + list(tipos_data.keys()))
            
            comentario = st.text_area("Comentarios")
            
            submitted = st.form_submit_button("💾 Guardar Álbum")
            
            if submitted and nombre_album and grupo_selected and tipo_selected:
                query = """INSERT INTO albumes 
                          (nombre_album, id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, comentario)
                          VALUES (%s, %s, %s, %s, %s, %s, %s)"""
                params = (nombre_album, grupos_data[grupo_selected], 
                         sellos_data.get(sello_selected), numero_catalogo or None, 
                         año, tipos_data[tipo_selected], comentario or None)
                
                if execute_query(query, params):
                    st.success("✅ Álbum agregado exitosamente")
                    st.rerun()
    
    with tab2:
        st.subheader("Lista de Álbumes")
        
        albums_query = """
            SELECT a.id_album, a.nombre_album, g.nombre_grupo, 
                   s.nombre_sello, a.año_publicacion, t.nombre_tipo,
                   a.numero_catalogo
            FROM albumes a
            LEFT JOIN grupos g ON a.id_grupo = g.id_grupo
            LEFT JOIN sellos_discograficos s ON a.id_sello = s.id_sello
            LEFT JOIN tipos_album t ON a.id_tipo_album = t.id_tipo_album
            ORDER BY a.año_publicacion DESC, a.nombre_album
        """
        
        albums_df = execute_query(albums_query, fetch=True)
        
        if albums_df is not None and not albums_df.empty:
            st.dataframe(albums_df, use_container_width=True)
        else:
            st.info("No hay álbumes registrados")

# Función para gestionar temas
def manage_temas():
    st.title("🎵 Gestión de Temas")
    
    tab1, tab2 = st.tabs(["➕ Agregar", "📋 Ver/Editar"])
    
    with tab1:
        st.subheader("Agregar Nuevo Tema")
        
        generos_data = get_reference_data("generos", "id_genero", "nombre_genero")
        
        with st.form("add_tema"):
            col1, col2 = st.columns(2)
            
            with col1:
                titulo = st.text_input("Título del Tema *", max_chars=100)
                duracion = st.text_input("Duración (HH:MM:SS)", placeholder="00:03:45")
            
            with col2:
                genero_selected = st.selectbox("Género", [""] + list(generos_data.keys()))
            
            letra = st.text_area("Letra del Tema", height=200)
            
            submitted = st.form_submit_button("💾 Guardar Tema")
            
            if submitted and titulo:
                query = """INSERT INTO temas (titulo_tema, duracion, letra, id_genero)
                          VALUES (%s, %s, %s, %s)"""
                params = (titulo, duracion or None, letra or None, 
                         generos_data.get(genero_selected))
                
                if execute_query(query, params):
                    st.success("✅ Tema agregado exitosamente")
                    st.rerun()
    
    with tab2:
        st.subheader("Lista de Temas")
        
        temas_query = """
            SELECT t.id_tema, t.titulo_tema, t.duracion, g.nombre_genero,
                   CASE WHEN t.letra IS NOT NULL THEN 'Sí' ELSE 'No' END as tiene_letra
            FROM temas t
            LEFT JOIN generos g ON t.id_genero = g.id_genero
            ORDER BY t.titulo_tema
        """
        
        temas_df = execute_query(temas_query, fetch=True)
        
        if temas_df is not None and not temas_df.empty:
            st.dataframe(temas_df, use_container_width=True)
        else:
            st.info("No hay temas registrados")

# Función para reportes
def show_reports():
    st.title("📊 Reportes y Análisis")
    
    tab1, tab2, tab3 = st.tabs(["📈 Estadísticas", "🎤 Por Grupo", "👤 Por Persona"])
    
    with tab1:
        st.subheader("Estadísticas Generales")
        
        # Top géneros
        col1, col2 = st.columns(2)
        
        with col1:
            st.write("**🎭 Top Géneros Musicales**")
            top_genres = execute_query("""
                SELECT g.nombre_genero, COUNT(t.id_tema) as total_temas
                FROM generos g
                LEFT JOIN temas t ON g.id_genero = t.id_genero
                GROUP BY g.id_genero
                ORDER BY total_temas DESC
                LIMIT 10
            """, fetch=True)
            
            if top_genres is not None and not top_genres.empty:
                st.bar_chart(top_genres.set_index('nombre_genero'))
            else:
                st.info("No hay datos de géneros para mostrar")
        
        with col2:
            st.write("**📅 Actividad por Década**")
            decades = execute_query("""
                SELECT 
                    CONCAT(FLOOR(año_publicacion/10)*10, 's') as decada,
                    COUNT(*) as albumes
                FROM albumes 
                WHERE año_publicacion IS NOT NULL
                GROUP BY FLOOR(año_publicacion/10)
                ORDER BY decada
            """, fetch=True)
            
            if decades is not None and not decades.empty:
                st.bar_chart(decades.set_index('decada'))
            else:
                st.info("No hay datos de décadas para mostrar")
    
    with tab2:
        st.subheader("Reportes por Grupo")
        
        grupos_data = get_reference_data("grupos", "id_grupo", "nombre_grupo")
        
        if grupos_data:
            grupo_selected = st.selectbox("Selecciona un grupo:", list(grupos_data.keys()))
            
            if grupo_selected:
                grupo_id = grupos_data[grupo_selected]
                
                # Información del grupo
                grupo_info = execute_query("""
                    SELECT g.nombre_grupo, g.region,
                           COUNT(DISTINCT a.id_album) as total_albumes,
                           COUNT(DISTINCT at.id_tema) as total_temas
                    FROM grupos g
                    LEFT JOIN albumes a ON g.id_grupo = a.id_grupo
                    LEFT JOIN albumes_temas at ON a.id_album = at.id_album
                    WHERE g.id_grupo = %s
                    GROUP BY g.id_grupo
                """, (grupo_id,), fetch=True)
                
                if grupo_info is not None and not grupo_info.empty:
                    info = grupo_info.iloc[0]
                    
                    col1, col2, col3 = st.columns(3)
                    col1.metric("📍 Región", info['region'] or "No especificada")
                    col2.metric("💿 Álbumes", info['total_albumes'])
                    col3.metric("🎵 Temas", info['total_temas'])
                
                # Historial de directores
                st.write("**👑 Historial de Directores**")
                directores = execute_query("""
                    SELECT p.nombre, gd.fecha_inicio, gd.fecha_fin, gd.comentarios
                    FROM grupos_directores gd
                    JOIN personas p ON gd.id_director = p.id_persona
                    WHERE gd.id_grupo = %s
                    ORDER BY gd.fecha_inicio DESC
                """, (grupo_id,), fetch=True)
                
                if directores is not None and not directores.empty:
                    st.dataframe(directores, use_container_width=True)
                else:
                    st.info("No hay historial de directores para este grupo")

# Función para administración
def show_admin():
    st.title("⚙️ Administración")
    
    tab1, tab2 = st.tabs(["🗂️ Datos de Referencia", "🔧 Utilidades"])
    
    with tab1:
        st.subheader("Gestionar Datos de Referencia")
        
        col1, col2 = st.columns(2)
        
        with col1:
            st.write("**🎭 Géneros Musicales**")
            with st.form("add_genre"):
                nuevo_genero = st.text_input("Nuevo Género")
                if st.form_submit_button("➕ Agregar"):
                    if nuevo_genero:
                        query = "INSERT INTO generos (nombre_genero) VALUES (%s)"
                        if execute_query(query, (nuevo_genero,)):
                            st.success("✅ Género agregado")
                            st.rerun()
            
            # Mostrar géneros existentes
            generos_df = execute_query("SELECT * FROM generos ORDER BY nombre_genero", fetch=True)
            if generos_df is not None and not generos_df.empty:
                st.dataframe(generos_df, use_container_width=True, hide_index=True)
        
        with col2:
            st.write("**🏢 Sellos Discográficos**")
            with st.form("add_label"):
                nuevo_sello = st.text_input("Nuevo Sello")
                if st.form_submit_button("➕ Agregar"):
                    if nuevo_sello:
                        query = "INSERT INTO sellos_discograficos (nombre_sello) VALUES (%s)"
                        if execute_query(query, (nuevo_sello,)):
                            st.success("✅ Sello agregado")
                            st.rerun()
            
            # Mostrar sellos existentes
            sellos_df = execute_query("SELECT * FROM sellos_discograficos ORDER BY nombre_sello", fetch=True)
            if sellos_df is not None and not sellos_df.empty:
                st.dataframe(sellos_df, use_container_width=True, hide_index=True)
    
    with tab2:
        st.subheader("Utilidades del Sistema")
        
        col1, col2 = st.columns(2)
        
        with col1:
            if st.button("🔄 Limpiar Cache"):
                st.cache_data.clear()
                st.success("✅ Cache limpiado")
        
        with col2:
            st.write("**📊 Estado de Tablas**")
            if st.button("Ver Estadísticas"):
                tables = ['personas', 'grupos', 'albumes', 'temas', 'generos', 'sellos_discograficos']
                stats_data = []
                
                for table in tables:
                    count_query = f"SELECT COUNT(*) as count FROM {table}"
                    result = execute_query(count_query, fetch=True)
                    if result is not None:
                        stats_data.append({'Tabla': table, 'Registros': result['count'].iloc[0]})
                
                if stats_data:
                    stats_df = pd.DataFrame(stats_data)
                    st.dataframe(stats_df, use_container_width=True, hide_index=True)

# Router principal
if section == "🏠 Dashboard":
    show_dashboard()
elif section == "👤 Personas":
    manage_personas()
elif section == "🎤 Grupos":
    manage_grupos()
elif section == "💿 Álbumes":
    manage_albums()
elif section == "🎵 Temas":
    manage_temas()
elif section == "📊 Reportes":
    show_reports()
elif section == "⚙️ Administración":
    show_admin()

# Footer
st.sidebar.markdown("---")
st.sidebar.markdown("🎵 **Base de Datos Musical** v1.0")
st.sidebar.markdown("Hecho con ❤️ y Streamlit")