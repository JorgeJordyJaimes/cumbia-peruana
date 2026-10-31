# 06 · Seguridad, Políticas RLS y Protección de Datos Fonográficos

> **Propósito:** Especificar las directrices de seguridad, control de acceso basado en roles (RBAC), políticas de seguridad a nivel de fila (Row Level Security - RLS) en Supabase y custodia de la propiedad intelectual fonográfica.
> **Responde a:**
> - ¿Qué permisos de lectura y escritura tienen los usuarios anónimos frente a los administradores?
> - ¿Cómo están configuradas las políticas RLS en las tablas fonográficas y en el bucket de almacenamiento?
> - ¿Cómo se gestionan y protegen las claves y secretos del entorno (`.env.local`)?
> - ¿Qué medidas legales y técnicas impiden la distribución no autorizada de fonogramas protegidos?
> **Fuente principal de:** Políticas RLS de PostgreSQL, permisos de PostgREST, reglas de seguridad de Supabase Storage y protocolo de custodia de datos.
> **No contiene (ver):**
> - Estructura física y llaves de las tablas → [modelo-de-datos.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/03-arquitectura/modelo-de-datos.md)
> - Variables de entorno y despliegue → [despliegue.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/05-entorno-y-operacion/despliegue.md)
> - Decisiones arquitectónicas sobre audio → [decisiones.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/03-arquitectura/decisiones.md)
> **Depende de:**
> - [arquitectura.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/03-arquitectura/arquitectura.md)
> - [dominio.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/01-proyecto/dominio.md)
> **Entregar a otra IA para:** Auditar vulnerabilidades en políticas RLS, verificar fugas de credenciales en commits o configurar roles de usuario en Supabase Auth.
> **Estado:** VIGENTE · **Última revisión:** 2026-10-31 · **Describe la versión:** commit 04ef58c

---

## 1. Inventario de Datos Sensibles y Credenciales

| Recurso / Dato | Clasificación | Dónde Vive | Nivel de Exposición Permitido |
| :--- | :--- | :--- | :--- |
| **`NEXT_PUBLIC_SUPABASE_URL`** | Público | `.env.local`, Vercel | Público (embebido en el bundle cliente). |
| **`NEXT_PUBLIC_SUPABASE_ANON_KEY`** | Público Restringido | `.env.local`, Vercel | Público, limitado estrictamente por políticas RLS. |
| **`SUPABASE_ACCESS_TOKEN`** | Secreto Crítico | `.env.local` (Local admin) | Estrictamente privado. Prohibido en Vercel o en Git. |
| **Contraseñas de Administrador** | Secreto Crítico | Supabase Auth (Vault) | Cifrado con algoritmo bcrypt/Argon2 en Supabase. |
| **Metadatos Fonográficos** | Patrimonio Público | Tablas PostgreSQL | Lectura pública abierta para toda la comunidad. |
| **Archivos de Audio Comercial** | Prohibido (`INV-005`) | Fuera del sistema | No se almacenan en el sistema bajo ninguna circunstancia. |

---

## 2. Matriz de Roles y Control de Acceso (RBAC)

El acceso a los recursos de Supabase se segmenta en tres roles principales:

| Rol Supabase | Ámbito de Operación | Permisos en Tablas Fonográficas | Permisos en Bucket `portadas` |
| :--- | :--- | :--- | :--- |
| **`anon` (Visitante Web)** | Navegación pública, DJs, coleccionistas | `SELECT` en todas las tablas maestras y relacionales. | `SELECT` (lectura y descarga de portadas WebP vía CDN). |
| **`authenticated` (Admin)**| Panel de catalogación (`/admin`) | `SELECT`, `INSERT`, `UPDATE`, `DELETE` en catálogo. | `INSERT`, `UPDATE`, `DELETE` (solo archivos `image/webp`). |
| **`service_role` (Script)** | Scripts de ingesta masiva (`db:poblar`)| Bypass de RLS para mantenimiento y sincronización. | Control total administrativo. |

---

## 3. Políticas de Seguridad a Nivel de Fila (RLS)

### 3.1 Tablas Fonográficas (`Albumes`, `Temas`, `Grupos`, `Personas`, etc.)
- **Lectura Pública Garantizada:** Todas las tablas maestras cuentan con políticas RLS que otorgan permiso de lectura (`SELECT`) al rol público `anon`.
  ```sql
  CREATE POLICY "Acceso público de lectura a Albumes"
  ON Albumes FOR SELECT
  TO anon, authenticated
  USING (true);
  ```
- **Modificación Protegida:** Las mutaciones (`INSERT`, `UPDATE`, `DELETE`) están estrictamente restringidas a sesiones autenticadas mediante Supabase Auth.
  ```sql
  CREATE POLICY "Solo administradores pueden mutar Albumes"
  ON Albumes FOR ALL
  TO authenticated
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');
  ```

### 3.2 Bucket de Almacenamiento (`portadas`)
- **Acceso Público:** Lectura pública de objetos permitida sin token para alimentar el CDN y la visualización de carátulas en el navegador.
- **Inserción Filtrada por MIME:**
  ```sql
  CREATE POLICY "Permitir subida de WebP solo a administradores"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'portadas' AND
    (storage.extension(name) = 'webp')
  );
  ```

---

## 4. Custodia Patrimonial y Propiedad Intelectual (`INV-005`)

Para proteger la viabilidad jurídica del proyecto y respetar la legislación peruana e internacional sobre derechos de autor y derechos conexos de los productores fonográficos:
1. **Ausencia Absoluta de Streaming de Audio:** Kumbia Sound no aloja ni distribuye archivos de música digitalizada (`.mp3`, `.wav`, `.aac`).
2. **Naturaleza de Archivo Documental:** La plataforma documenta la existencia material de las piezas, los créditos periciales de autoría, los directores, las matrices y las medidas acústicas (BPM y Camelot) con fines estrictamente educativos, musicológicos y de consulta técnica.
3. **Enlaces Externos:** Toda referencia sonora se realiza mediante enlaces a las plataformas oficiales de los sellos o canales del autor en YouTube / Spotify.

---

## 5. Procedimiento ante Incidentes de Seguridad

Si se sospecha la filtración de una clave o compromiso de cuenta:
1. **Revocación Inmediata de Tokens:** Ingrese a Supabase Dashboard (*Project Settings -> API*) y regenere el `ANON_KEY` o revoque el `SUPABASE_ACCESS_TOKEN`.
2. **Actualización de Variables en Vercel:** Reemplace de inmediato las claves en las variables de entorno de producción de Vercel y ejecute un redespliegue.
3. **Auditoría de Registros de Acceso:** Examine la pestaña *Database -> Logs* en Supabase para verificar si se ejecutaron mutaciones no autorizadas en el catálogo fonográfico.

---

## 6. Actualizar Cuando

- Se modifiquen o creen nuevas políticas RLS en Supabase.
- Se agregue un nuevo bucket de almacenamiento.
- Se introduzca un nuevo rol o nivel de privilegios en el panel administrativo.
