import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv
import os

# Carga las variables del archivo .env
load_dotenv()

# Lee los datos de conexión
DB_HOST = os.getenv('DB_HOST')
DB_NAME = os.getenv('DB_NAME')
DB_USER = os.getenv('DB_USER')
DB_PASSWORD = os.getenv('DB_PASSWORD')
DB_PORT = os.getenv('DB_PORT')


class Database:
    """
    Clase que maneja la conexión a PostgreSQL.
    Solo debe existir UNA instancia de esta clase en toda la aplicación.
    """
    
    def __init__(self):
        self.conn = None
    
    def connect(self):
        """Abre la conexión a la base de datos."""
        try:
            self.conn = psycopg2.connect(
                host=DB_HOST,
                database=DB_NAME,
                user=DB_USER,
                password=DB_PASSWORD,
                port=DB_PORT
            )
            print("✅ Conexión a PostgreSQL exitosa")
            return True
        except psycopg2.Error as e:
            print(f"❌ Error de conexión: {e}")
            return False
    
    def close(self):
        """Cierra la conexión."""
        if self.conn:
            self.conn.close()
            print("🔌 Conexión cerrada")
    
    def query(self, sql, params=None):
        """
        Ejecuta una consulta SELECT y devuelve los resultados.
        params: tupla con los valores (ej: ('Los Shapis',))
        """
        if not self.conn:
            print("❌ No hay conexión activa")
            return []
        
        with self.conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(sql, params or ())
            return cur.fetchall()
    
    def execute(self, sql, params=None):
        """
        Ejecuta INSERT, UPDATE o DELETE.
        Devuelve la cantidad de filas afectadas.
        """
        if not self.conn:
            print("❌ No hay conexión activa")
            return 0
        
        with self.conn.cursor() as cur:
            cur.execute(sql, params or ())
            self.conn.commit()
            return cur.rowcount


# Instancia única que usaremos en toda la aplicación
db = Database()