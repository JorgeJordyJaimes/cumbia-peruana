# 🪗 Lineamientos del Proyecto: Archivo Histórico de la Cumbia Peruana (1968–2005)

Bienvenido/a a la documentación técnica y lineamientos arquitectónicos de **Kumbia Sound / Archivo Histórico de la Cumbia Peruana**. Este documento está diseñado para cualquier desarrollador/a, investigador/a o colaborador/a que clone este repositorio, asegurando un despliegue correcto, seguro y alineado con los estándares del proyecto.

---

## 1. 🎯 Descripción y Propósito del Proyecto

Este proyecto es una plataforma web especializada en la preservación documental, la genealogía musical y el análisis técnico del patrimonio discográfico de la cumbia grabada en el Perú durante su etapa de génesis, apogeo y transformación (1968–2005).

### Pilares Fundamentales:
* **Preservación y Fidelidad al Soporte Físico:** Modela con precisión la industria fonográfica peruana de la época: prensajes en vinilo de 45 RPM (singles), LPs de 33 RPM, EPs, Casetes, CDs, reediciones históricas, ediciones *split* (discos compartidos por lados con distintos grupos) y sellos discográficos icónicos (*Infopesa, Discos Horóscopo, Sono Radio, El Virrey, Odeón, Difa, Discope*, etc.).
* **Genealogía Musical y Créditos:** Mapeo de compositores originales, directores musicales, alineaciones de bandas con rangos temporales (`desde` / `hasta`), créditos por sesión instrumental y árbol de versiones (*covers*).
* **Herramientas Técnicas para DJs:** Motor de búsqueda armónica que cataloga tempo exacto (**BPM**), tonalidad musical estándar y codificación en la **Rueda Camelot** (1A a 12B) para facilitar mezclas armónicas en vivo.
* **Divulgación y CMS Cultural:** Módulo de blog con soporte para artículos en Markdown y panel de administración para gestionar contenidos destacados en la portada.

---

## 2. 🛠️ Stack Tecnológico

El proyecto está construido bajo una arquitectura moderna desacoplada:

* **Frontend:** [Next.js](https://nextjs.org/) (App Router, Server Components y TypeScript).
* **Estilizado e Interfaz:** [Tailwind CSS](https://tailwindcss.com/) junto a primitivas accesibles de [Radix UI / shadcn/ui](https://ui.shadcn.com/).
* **Diseño UI/UX:** Estética *Atmospheric Glassmorphism meets Retro Vinyl Editorial*, con paleta oscura, tarjetas translúcidas y tipografía pensada para catálogos fonográficos.
* **Base de Datos:** [PostgreSQL](https://www.postgresql.org/) alojado en [Supabase](https://supabase.com/), con extensiones para búsqueda de texto completo en español (índices GIN) e índices B-Tree para consultas DJ.
* **Almacenamiento Multimedia:** Buckets en Supabase Storage configurados exclusivamente para imágenes procesadas en formato **WebP** (portadas de vinilos, fotos de artistas y logotipos de sellos).
* **Seguridad:** Control de acceso mediante **Row Level Security (RLS)** y autenticación mediante Supabase Auth.

---

## 3. 🚀 Guía de Instalación para Quien Clone el Repositorio

### Requisitos Previos
* **Node.js:** Versión 20.x o superior.
* **npm:** Gestor de paquetes oficial de Node.js.
* **Git:** Para control de versiones.
* **Cuenta activa en Supabase:** Si se va a levantar un entorno personal o de pruebas.

### Paso 1: Clonar e Instalar Dependencias
```bash
git clone https://github.com/JorgeJordyJaimes/cumbia-peruana.git
cd cumbia-peruana
npm install
```

### Paso 2: Configuración de Variables de Entorno (SOLICITUD DE CLAVES)

> [!CAUTION]
> **POLÍTICA DE SEGURIDAD ESTRICTA SOBRE CLAVES Y SECRETOS**
> Por seguridad y cumplimiento normativo, **nunca almacenes claves reales, URLs privadas ni tokens de Supabase dentro de archivos rastreados por Git ni en esta documentación**.
> 
> Si acabas de clonar el repositorio, **debes solicitar directamente las credenciales de desarrollo al mantenedor o propietario del proyecto (Jordy Jaimes)**.

Una vez que recibas las claves autorizadas, crea un archivo `.env.local` en la raíz del proyecto:

```bash
# Crear tu archivo local de variables
touch .env.local
```

Define las siguientes variables en `.env.local`:

```env
# URL de la instancia de Supabase (solicitar al mantenedor)
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto-aqui.supabase.co

# Anon Key pública con permisos de lectura limitados por RLS (solicitar al mantenedor)
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui

# (Opcional - solo para scripts administrativos de sincronización SQL)
# SUPABASE_ACCESS_TOKEN=tu-token-de-acceso-personal
```

### Paso 3: Iniciar el Entorno de Desarrollo
```bash
npm run dev
```
La aplicación estará disponible localmente en `http://localhost:3000`.

---

## 4. 🗄️ Base de Datos y Política de Permisos (Supabase Data API)

### Estructura de Archivos de Base de Datos
* `supabase/migrations/`: Migraciones versionadas en SQL que definen el esquema estructural, políticas RLS, buckets de almacenamiento y permisos.
* `Base de Datos/datos/`: Catálogo documental histórico con los inserts organizados por vertiente (`base/`, `vinilos/`, `cassete/`, `canciones/`).
* `Base de Datos/consultas/`: Consultas SQL de trazabilidad (45 RPM vs LP, splits, reediciones, colaboraciones).

---

### ⚠️ Política Crítica de Permisos (Cambio en Supabase Data API)

A partir del 30 de octubre, Supabase **elimina la concesión automática de permisos de la Data API (PostgREST) sobre nuevas tablas** en el esquema `public`. 

#### ¿Qué significa esto para el proyecto?
1. Toda tabla creada en `public` debe tener una sentencia `GRANT` explícita concedida a los roles `anon`, `authenticated` y `service_role`.
2. Si se crea una tabla sin su respectivo `GRANT`, la librería `@supabase/supabase-js` devolverá un error: `permission denied for table ...`.
3. **El proyecto ya cuenta con la migración preventiva:** 
   [20260924000000_explicit_public_grants_for_data_api.sql](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/supabase/migrations/20260924000000_explicit_public_grants_for_data_api.sql), la cual aplica permisos sobre todas las tablas actuales y define `ALTER DEFAULT PRIVILEGES` para futuras tablas.
4. **Regla para nuevas migraciones:** Si en el futuro creas una nueva tabla, **debes incluir obligatoriamente**:
   ```sql
   CREATE TABLE mi_nueva_tabla (...);
   ALTER TABLE mi_nueva_tabla ENABLE ROW LEVEL SECURITY;
   
   -- Permiso obligatorio para que la Data API pueda consultar la tabla:
   GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE mi_nueva_tabla TO anon, authenticated, service_role;
   
   -- Políticas RLS correspondientes...
   ```

---

## 5. 📜 Flujo de Trabajo Git (Obligatorio)

Para mantener la integridad y consistencia del historial del proyecto, todo colaborador debe acatar las siguientes pautas:

1. **Mensajes de Commit:** Redactados en **español**, claros y concisos, siguiendo la convención de *Conventional Commits*:
   * `feat:` para nuevas características o tablas.
   * `fix:` para corrección de bugs o inconsistencias.
   * `docs:` para cambios en documentación o comentarios explicativos en SQL.
   * `style:` para formateo visual o alineación de consultas sin alterar lógica.
   * `refactor:` para reestructuración de código o esquema sin cambiar comportamiento.
2. **Ciclo Inmediato de Sincronización:** Cada vez que se modifiquen archivos del proyecto (especialmente en `Base de Datos/`, `supabase/` o `src/`):
   * Ejecutar `git add <archivos>`.
   * Realizar el `git commit -m "<mensaje en español>"`.
   * Ejecutar inmediatamente `git push` a la rama remota correspondiente.
