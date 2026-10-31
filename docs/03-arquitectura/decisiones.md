# 03 · Registro Canónico de Decisiones Arquitectónicas (ADR)

> **Propósito:** Memoria técnica e histórica de las decisiones de diseño, modelado fonográfico, optimización de rendimiento y restricciones arquitectónicas adoptadas en el proyecto.
> **Responde a:**
> - ¿Por qué se restringen los soportes físicos exclusivamente a Lado A y Lado B?
> - ¿Cómo y por qué se desacoplan los mosaicos y popurrís en una tabla independiente (`Mosaicos_Temas`)?
> - ¿Por qué se delegó la resolución del árbol genealógico a procedimientos almacenados en PostgreSQL en vez del frontend?
> - ¿Por qué se implementó la compresión WebP en el navegador con HTML5 Canvas en lugar de un worker backend?
> - ¿Cuáles son las decisiones explícitas de "no hacer algo" en el sistema?
> **Fuente principal de:** Registro de decisiones de arquitectura `DEC-001` a `DEC-007`.
> **No contiene (ver):**
> - Estructura física actual de tablas → [modelo-de-datos.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/03-arquitectura/modelo-de-datos.md)
> - Capas de software y dependencias → [arquitectura.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/03-arquitectura/arquitectura.md)
> - Reglas de dominio inmutables → [dominio.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/01-proyecto/dominio.md)
> **Depende de:**
> - [dominio.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/01-proyecto/dominio.md)
> - [requisitos.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/02-requisitos/requisitos.md)
> **Entregar a otra IA para:** Evaluar el impacto de cambios mayores, evitar reincidir en alternativas descartadas o auditar la consistencia del sistema frente a su visión original.
> **Estado:** VIGENTE · **Última revisión:** 2026-10-31 · **Describe la versión:** commit 04ef58c

---

## 1. Índice de Decisiones Arquitectónicas

| ID | Fecha | Título | Decisión | Implementación |
| :--- | :--- | :--- | :--- | :--- |
| **`DEC-001`** | 2026-10-07 | Restricción Estricta de Soportes Físicos a Lados A y B (1968–2005) | `CONFIRMADA` | `IMPLEMENTADO` |
| **`DEC-002`** | 2026-10-07 | Modelado Relacional Desacoplado de Mosaicos y Popurrís | `CONFIRMADA` | `IMPLEMENTADO` |
| **`DEC-003`** | 2026-10-07 | Resolución de Grafos y Genealogía Recursiva mediante RPC en PostgreSQL | `CONFIRMADA` | `IMPLEMENTADO` |
| **`DEC-004`** | 2026-10-07 | Conversión e Intercepción de Portadas a WebP en Cliente (Canvas API) | `CONFIRMADA` | `IMPLEMENTADO` |
| **`DEC-005`** | 2026-10-13 | Adopción de Directrices Vercel React Best Practices y Caché de Petición | `CONFIRMADA` | `IMPLEMENTADO` |
| **`DEC-006`** | 2026-10-07 | Prohibición Expresa de Almacenamiento y Streaming de Archivos de Audio Ilegal | `CONFIRMADA` | `IMPLEMENTADO` |
| **`DEC-007`** | 2026-10-07 | Descarte de Procesamiento Backend de Imágenes con Sharp o Servidores Dedicados | `CONFIRMADA` | `IMPLEMENTADO` |

---

## 2. Registro Detallado de Decisiones

### DEC-001 · Restricción Estricta de Soportes Físicos a Lados A y B (1968–2005)
* **Fecha:** 2026-10-07
* **Estado de Decisión:** `CONFIRMADA`
* **Estado de Implementación:** `IMPLEMENTADO`
* **Quién decidió:** Propietario del proyecto tras peritaje fonográfico.
* **Contexto:** En catálogos genéricos (Discogs, MusicBrainz) se permite un esquema flexible de discos y caras (Lado A, B, C, D, Disco 1, 2, etc.) para abarcar box sets internacionales. Sin embargo, en el período formativo de la cumbia peruana (1968–2005), la industria jamás produjo prensajes dobles de un solo título con cuatro caras. Las recopilaciones se editaban como álbumes independientes con números de catálogo propios (*Vol. 1*, *Vol. 2*).
* **Opciones Consideradas:**
  1. *Permitir lados alfanuméricos libres (`VARCHAR` sin restricción):* Ventaja: flexibilidad abstracta. Desventaja: permitía erratas de catalogación (`'Lado 1'`, `'C'`, `'a'`), rompiendo la búsqueda y el orden de surcos.
  2. *Imponer restricción CHECK estricta a nivel DDL (`lado IN ('A', 'B')`):* Ventaja: blindaje absoluto del modelo fonográfico contra inconsistencias. Desventaja: no admite vinilos dobles de otros géneros (irrelevante para el alcance de este proyecto).
* **Decisión:** Imponer la restricción `CHECK (lado IS NULL OR lado IN ('A', 'B'))` en `Albumes_Temas` y `Albumes_Grupos_Lados`. Prohibir que la lógica admita Lados C o D (`INV-001`).
* **Consecuencias:** Garantiza que el 100 % de las fichas de vinilo y casete reflejen la realidad mecánica del prensaje peruano.
* **Documentos Afectados:** [dominio.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/01-proyecto/dominio.md), [modelo-de-datos.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/03-arquitectura/modelo-de-datos.md).

---

### DEC-002 · Modelado Relacional Desacoplado de Mosaicos y Popurrís
* **Fecha:** 2026-10-07
* **Estado de Decisión:** `CONFIRMADA`
* **Estado de Implementación:** `IMPLEMENTADO`
* **Quién decidió:** Propietario del proyecto tras análisis de agrupaciones tropicales (Cuarteto Continental, Armonía 10).
* **Contexto:** Los mosaicos o enganchados son surcos físicos continuos en vinilo que en su interior contienen entre dos y cinco canciones distintas con compositores independientes. Modelarlos como canciones planas invisibilizaba las autorías; modelarlos como surcos separados inventaba pistas físicas inexistentes.
* **Opciones Consideradas:**
  1. *Crear pistas falsas en el tracklist:* Rechazada porque falseaba la correspondencia con la galleta del disco físico.
  2. *Guardar los nombres de canciones en un campo de texto plano entre paréntesis:* Rechazada porque impedía la búsqueda relacional de compositores y temas.
  3. *Arquitectura desacoplada: bandera booleana `es_mosaico` en `Albumes_Temas` + tabla hija `Mosaicos_Temas`:* Seleccionada.
* **Decisión:** Registrar el surco físico en `Albumes_Temas` con `es_mosaico = TRUE` y desglosar cada canción en `Mosaicos_Temas` vinculada a su respectivo `id_tema` canónico (`INV-002`).
* **Consecuencias:** Se preserva la exactitud del surco físico y simultáneamente se mantiene la trazabilidad autoral individual y la conexión con el árbol genealógico.
* **Documentos Afectados:** [dominio.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/01-proyecto/dominio.md), [modelo-de-datos.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/03-arquitectura/modelo-de-datos.md).

---

### DEC-003 · Resolución de Grafos y Genealogía Recursiva mediante RPC en PostgreSQL
* **Fecha:** 2026-10-07
* **Estado de Decisión:** `CONFIRMADA`
* **Estado de Implementación:** `IMPLEMENTADO`
* **Quién decidió:** Agente técnico con aprobación del propietario.
* **Contexto:** Consultar las múltiples bandas, sesiones de estudio, composiciones y regrabaciones de un artista mediante sucesivas llamadas anidadas de `supabase.from()` generaba cascadas N+1 inaceptables (> 12 viajes de red por modal) y riesgo de bucles infinitos en el cliente.
* **Opciones Consideradas:**
  1. *Consultas anidadas en JavaScript en el navegador:* Descartada por lentitud y sobrecarga de transferencia.
  2. *Uso de base de datos de grafos (Neo4j):* Descartada por introducir complejidad operativa y costos innecesarios para el volumen del archivo.
  3. *Procedimientos almacenados en PostgreSQL (`get_arbol_genealogico`, `get_genealogia_versiones` con `WITH RECURSIVE`):* Seleccionada.
* **Decisión:** Implementar dos funciones RPC en PostgreSQL con retorno en formato JSON estructurado y protección de ciclo con arrays de camino `NOT (v.id_tema = ANY(av.camino))`.
* **Consecuencias:** Reducción del tiempo de respuesta del modal genealógico de ~3,200 ms a < 150 ms en un único viaje de red.
* **Documentos Afectados:** [arquitectura.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/03-arquitectura/arquitectura.md), [interfaces.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/03-arquitectura/interfaces.md).

---

### DEC-004 · Conversión e Intercepción de Portadas a WebP en Cliente (Canvas API)
* **Fecha:** 2026-10-07
* **Estado de Decisión:** `CONFIRMADA`
* **Estado de Implementación:** `IMPLEMENTADO`
* **Quién decidió:** Agente técnico con aprobación del propietario.
* **Contexto:** Las carátulas escaneadas por investigadores pesan entre 5 MB y 15 MB en formatos PNG/JPG. Supabase Storage impone política estricta de admisión exclusiva de `image/webp`. Exigir conversión manual externa a los catalogadores causaba fricción y errores de carga.
* **Opciones Consideradas:**
  1. *Serverless Function en Vercel con Sharp:* Descartada por saturar la memoria y cuotas de cómputo en plan gratuito/hobby.
  2. *Servicio SaaS externo (Cloudinary / ImageKit):* Descartada por costos mensuales recurrentes y dependencia de terceros.
  3. *Compresión en navegador con HTML5 Canvas API en `ImageUploader`:* Seleccionada.
* **Decisión:** Interceptar cualquier archivo de imagen en el cliente, redimensionar proporcionalmente a un máximo de 1600 px y exportar como Blob `image/webp` con factor de calidad 0.90 antes de transmitir por red.
* **Consecuencias:** Carga instantánea, reducción de peso de ~90 %, cero costo de cómputo en backend y 100 % de cumplimiento de la política del bucket.
* **Documentos Afectados:** [arquitectura.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/03-arquitectura/arquitectura.md), [seguridad-y-datos.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/06-calidad/seguridad-y-datos.md).

---

### DEC-005 · Adopción de Directrices Vercel React Best Practices y Caché de Petición
* **Fecha:** 2026-10-13
* **Estado de Decisión:** `CONFIRMADA`
* **Estado de Implementación:** `IMPLEMENTADO`
* **Quién decidió:** Agente técnico con aprobación del propietario.
* **Contexto:** Las vistas principales (`/`, `/vinilos`, `/album/[id]`) presentaban ejecuciones redundantes de consultas hacia Supabase entre `generateMetadata` y el componente de página `Page`, además de cascadas de promesas secuenciales.
* **Opciones Consideradas:**
  1. *Estado global con Redux o Zustand:* Descartada por innecesaria en Server Components.
  2. *Adopción estricta de Vercel React Best Practices (`Promise.all`, `React.cache()`, importaciones dinámicas `next/dynamic`):* Seleccionada.
* **Decisión:** Envolver todas las lecturas por clave en `React.cache()`, paralelizar consultas independientes en Server Components mediante `Promise.all` y diferir la carga de modales interactivos con `dynamic()`.
* **Consecuencias:** Eliminación total de consultas duplicadas en el servidor y reducción de 45 KB en el bundle JavaScript inicial de la portada.
* **Documentos Afectados:** [rendimiento.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/06-calidad/rendimiento.md), [arquitectura.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/03-arquitectura/arquitectura.md).

---

### DEC-006 · Prohibición Expresa de Almacenamiento y Streaming de Archivos de Audio Ilegal
* **Fecha:** 2026-10-07
* **Estado de Decisión:** `CONFIRMADA`
* **Estado de Implementación:** `IMPLEMENTADO`
* **Quién decidió:** Propietario del proyecto (Principio fundacional inmutable).
* **Contexto:** El proyecto tiene naturaleza de investigación histórica y archivo patrimonial. Alojar archivos de audio digitalizados vulneraría los derechos conexos de fonogramas de casas discográficas peruanas (Infopesa, IEMPSA, Horóscopo) y expondría el proyecto a reclamaciones por infracción de propiedad intelectual.
* **Decisión:** Se prohíbe terminantemente almacenar o reproducir archivos binarios de audio (`.mp3`, `.wav`, `.flac`) en el sistema. Kumbia Sound preserva únicamente metadatos técnicos (BPM, Camelot, duración, sesionistas) y enlaza opcionalmente a canales oficiales del autor en YouTube o Spotify (`INV-005`).
* **Consecuencias:** Inmunidad legal frente a demandas de derechos de reproducción fonográfica y costo cero de ancho de banda multimedia.
* **Documentos Afectados:** [presentacion.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/01-proyecto/presentacion.md), [dominio.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/01-proyecto/dominio.md).

---

### DEC-007 · Descarte de Procesamiento Backend de Imágenes con Sharp o Servidores Dedicados
* **Fecha:** 2026-10-07
* **Estado de Decisión:** `CONFIRMADA`
* **Estado de Implementación:** `IMPLEMENTADO`
* **Quién decidió:** Agente técnico y propietario del proyecto.
* **Contexto:** Evaluar si convenía levantar un microservicio en Docker o utilizar dependencias binarias en Node.js (Sharp, ImageMagick) para recortar y comprimir portadas.
* **Decisión:** Descartar de plano servidores auxiliares o dependencias C++ en backend. El navegador del catalogador asume el 100 % del procesamiento mediante Canvas API.
* **Consecuencias:** Infraestructura estática ultraligera, sin costos de VPS ni problemas de compilación multiplataforma entre Windows y Linux.
* **Documentos Afectados:** [arquitectura.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/03-arquitectura/arquitectura.md), [instalacion-y-entorno.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/05-entorno-y-operacion/instalacion-y-entorno.md).

---

## 3. Actualizar Cuando

- Se adopte una nueva decisión arquitectónica, de persistencia o de rendimiento.
- Se descarte o modifique una decisión existente (debe marcarse como `OBSOLETA` con enlace a su reemplazo).
- Se apruebe formalmente un cambio en los soportes físicos o políticas de medios.
