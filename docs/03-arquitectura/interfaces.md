# 03 · Contratos de Interfaces, Procedimientos RPC y APIs

> **Propósito:** Definir los contratos exactos de comunicación entre el frontend, las funciones almacenadas en PostgreSQL (RPC), el motor PostgREST y la inyección de esquemas semánticos Schema.org.
> **Responde a:**
> - ¿Cuál es la firma, parámetros y estructura de respuesta JSON de los procedimientos almacenados `get_arbol_genealogico` y `get_genealogia_versiones`?
> - ¿Cómo se interactúa con PostgREST para la lectura y escritura de metadatos fonográficos?
> - ¿Cuál es el contrato del pipeline de subida a Supabase Storage para portadas WebP?
> - ¿Cómo se estructura el marcado JSON-LD Schema.org inyectado en las páginas para SEO patrimonial?
> **Fuente principal de:** Contratos de RPC SQL, endpoints de Supabase PostgREST, especificación de contratos JSON-LD y códigos de error.
> **No contiene (ver):**
> - Estructura física interna de tablas → [modelo-de-datos.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/03-arquitectura/modelo-de-datos.md)
> - Capas y flujo general del software → [arquitectura.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/03-arquitectura/arquitectura.md)
> - Políticas de seguridad RLS y permisos → [seguridad-y-datos.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/06-calidad/seguridad-y-datos.md)
> **Depende de:**
> - [dominio.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/01-proyecto/dominio.md)
> - [modelo-de-datos.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/03-arquitectura/modelo-de-datos.md)
> **Entregar a otra IA para:** Generar clientes de API tipados, programar pruebas de integración de endpoints o integrar un nuevo servicio consumidor.
> **Estado:** VIGENTE · **Última revisión:** 2026-10-31 · **Describe la versión:** commit 04ef58c

---

## 1. Procedimientos Almacenados en PostgreSQL (RPC)

### 1.1 `get_arbol_genealogico`

Permite obtener en una única llamada atómica el historial biográfico completo de un músico: agrupaciones que fundó como director, orquestas que integró como músico de planta, sesiones de estudio donde grabó instrumentos y canciones compuestas.

* **Quién llama a quién:** `src/features/genealogia/services/genealogia-service.ts` -> Supabase RPC -> PostgreSQL `get_arbol_genealogico`.
* **Idempotencia:** Sí (función `STABLE` en PostgreSQL).
* **Autenticación:** Pública (disponible para el rol `anon` y `authenticated`).
* **Límites:** 1 petición por apertura de modal en cliente.

#### Entrada
| Parámetro | Tipo | Obligatorio | Validación | Descripción |
| :--- | :--- | :--- | :--- | :--- |
| `p_persona_id` | `INT` | Sí | Entero > 0 | Identificador único de la persona en la tabla `Personas`. |

#### Salida (`JSON`)
```json
{
  "persona": {
    "id_persona": 1,
    "nombre": "Víctor Casahuamán Bendezú",
    "alias": "Víctor Casahuamán",
    "foto_url": "portadas/personas/casahuaman.webp"
  },
  "bandas_fundadas": [
    {
      "id_grupo": 1,
      "nombre_grupo": "Grupo Celeste"
    }
  ],
  "orquestas_integradas": [
    {
      "id_grupo": 1,
      "nombre_grupo": "Grupo Celeste",
      "nombre_rol": "Director / Primera Guitarra",
      "anio_inicio": "1974-01-01",
      "anio_fin": null
    }
  ],
  "sesiones_estudio": [
    {
      "id_tema": 1,
      "nombre_tema": "El Aborto",
      "instrumento": "Primera Guitarra",
      "credito_como": null
    }
  ],
  "composiciones": [
    {
      "id_tema": 1,
      "nombre_tema": "El Aborto",
      "credito_como": "Víctor Casahuamán"
    }
  ]
}
```

#### Manejo de Errores
- Si `p_persona_id` no existe, retorna un objeto JSON con campo `"persona": null` y listas vacías `[]`.
- Si se pasa un tipo no numérico, PostgREST retorna `400 Bad Request` (`PGRST100: invalid input syntax for integer`).

---

### 1.2 `get_genealogia_versiones`

Ejecuta una consulta recursiva jerárquica mediante Common Table Expressions (`WITH RECURSIVE`) para ascender hasta la canción matriz original y descender luego por todo el árbol de interpretaciones, regrabaciones y *covers*.

* **Quién llama a quién:** `src/features/genealogia/services/genealogia-service.ts` -> Supabase RPC -> PostgreSQL `get_genealogia_versiones`.
* **Idempotencia:** Sí (función `STABLE`).
* **Autenticación:** Pública (`anon` y `authenticated`).

#### Entrada
| Parámetro | Tipo | Obligatorio | Validación | Descripción |
| :--- | :--- | :--- | :--- | :--- |
| `p_tema_id` | `INT` | Sí | Entero > 0 | Identificador del tema inicial para explorar su árbol genealógico. |

#### Salida (`TABLE (id_tema INT, nombre_tema TEXT, id_tema_original INT, es_raiz BOOLEAN, nivel INT, camino INT[])`)
```json
[
  {
    "id_tema": 10,
    "nombre_tema": "Colegiala",
    "id_tema_original": null,
    "es_raiz": true,
    "nivel": 0,
    "camino": [10]
  },
  {
    "id_tema": 45,
    "nombre_tema": "Colegiala (Versión Orquestada)",
    "id_tema_original": 10,
    "es_raiz": false,
    "nivel": 1,
    "camino": [10, 45]
  }
]
```

#### Protección contra Ciclos Infinitos
La consulta evalúa en cada iteración la cláusula:
```sql
WHERE NOT (v.id_tema = ANY(av.camino))
```
Si se detecta un bucle de regrabaciones en los datos históricos, la rama se interrumpe matemáticamente sin causar desbordamiento de pila o tiempo de espera agotado.

---

## 2. API de Datos PostgREST (Supabase Client)

La capa de aplicación interactúa con la base de datos a través del SDK `@supabase/ssr` que traduce llamadas TypeScript a peticiones HTTP PostgREST.

### 2.1 Consulta de Álbum con Tracklist y Créditos

* **Método:** `GET /rest/v1/Albumes?select=*,Grupos(*),Sellos_Discograficos(*),Albumes_Temas(*,Temas(*,Temas_Compositores(*,Personas(*))))&id_album=eq.{id}`
* **Cabeceras Obligatorias:**
  - `apikey: <NEXT_PUBLIC_SUPABASE_ANON_KEY>`
  - `Authorization: Bearer <TOKEN_O_ANON>`
* **Respuesta Exitosa (200 OK):**
  Array de un solo elemento con la jerarquía completa del soporte físico y los temas asociados.

### 2.2 Mutación en Panel Administrativo (`/admin`)

* **Operaciones:** `INSERT`, `UPDATE`, `DELETE` sobre tablas maestras y relacionales.
* **Autenticación Requerida:** Token JWT de usuario autenticado con rol de administrador en Supabase Auth (`authenticated`).
* **Respuesta de Error:**
  - `401 Unauthorized`: Token ausente o expirado.
  - `403 Forbidden`: Violación de política RLS (Row Level Security).
  - `409 Conflict`: Violación de restricción única (`UNIQUE`) o de clave foránea.

---

## 3. Contrato de Almacenamiento Multimedia (Supabase Storage)

* **Bucket:** `portadas`
* **Acceso Público:** Solo lectura vía CDN (`GET /storage/v1/object/public/portadas/{path}`).
* **Carga de Archivos (Upload):**
  - **Endpoint:** `POST /storage/v1/object/portadas/{nombre_archivo}.webp`
  - **Restricción de Tipo MIME:** `Content-Type: image/webp` obligatorio. Cualquier otro MIME (`image/jpeg`, `image/png`, `application/octet-stream`) es rechazado con error `400 / 403` por política de bucket.
  - **Tamaño Máximo:** 1 MB por imagen WebP precomprimida.

---

## 4. Contrato de Marcado Semántico Web (Schema.org JSON-LD)

Los Server Components inyectan en el elemento `<head>` de las páginas de detalle fonográfico fragmentos `<script type="application/ld+json">` conformes al estándar internacional Schema.org para indexación profunda en Google Search.

### 4.1 Schema `MusicAlbum` (Ficha de Álbum en `/album/[id]`)

```json
{
  "@context": "https://schema.org",
  "@type": "MusicAlbum",
  "name": "A Través del Espacio",
  "albumReleaseType": "https://schema.org/AlbumRelease",
  "albumProductionType": "https://schema.org/StudioAlbum",
  "byArtist": {
    "@type": "MusicGroup",
    "name": "Los Destellos"
  },
  "recordLabel": {
    "@type": "RecordLabel",
    "name": "Odeón / IEMPSA"
  },
  "datePublished": "1969",
  "image": "https://kumbiasound.com/storage/portadas/los_destellos_a_traves_del_espacio.webp",
  "numTracks": 12,
  "track": [
    {
      "@type": "MusicRecording",
      "name": "El Avispón",
      "position": 1,
      "duration": "PT2M45S"
    }
  ]
}
```

---

## 5. Actualizar Cuando

- Se agregue o modifique un procedimiento almacenado en PostgreSQL.
- Se incorpore un nuevo bucket o política de tipos MIME en Supabase Storage.
- Se actualicen los schemas JSON-LD o se agreguen entidades como `MusicEvent` o `MusicPlaylist`.
