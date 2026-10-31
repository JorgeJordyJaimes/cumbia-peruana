# Requisitos del Sistema: Kumbia Sound

> **Propósito:** Definir los requisitos funcionales, no funcionales y reglas de negocio del sistema, con criterios de aceptación verificables.
> **Responde a:** ¿Qué debe hacer exactamente la plataforma? ¿Cuáles son los criterios de aceptación medibles de cada función? ¿Qué estándares de calidad técnica y rendimiento debe cumplir?
> **Fuente principal de:** Requisitos `RF-NNN`, `RNF-NNN`, reglas de negocio `RN-NNN` y matriz de trazabilidad.
> **No contiene (ver):** Visión y alcance estratégico → [../01-proyecto/presentacion.md](../01-proyecto/presentacion.md); invariantes fonográficas inviolables → [../01-proyecto/dominio.md](../01-proyecto/dominio.md); arquitectura técnica de implementación → [../03-arquitectura/arquitectura.md](../03-arquitectura/arquitectura.md).
> **Depende de:** [../01-proyecto/glosario.md](../01-proyecto/glosario.md), [../01-proyecto/dominio.md](../01-proyecto/dominio.md).
> **Entregar a otra IA para:** Estimación de esfuerzo, generación de casos de prueba, auditoría de cobertura funcional y validación de features.
> **Estado:** VIGENTE · **Última revisión:** 2026-10-31 · **Describe la versión:** 0.1.0 / commit 04ef58c

---

## 1. Restricciones y Supuestos Técnicos

1. **Plataforma:** Aplicación web moderna ejecutada sobre Next.js 16 (App Router) y PostgreSQL en Supabase.
2. **Compatibilidad:** Navegadores modernos compatibles con ES2022, CSS Grid, HTML5 Canvas API y WebP (Chrome, Firefox, Safari, Edge).
3. **Propiedad Intelectual:** Exclusión intencional de distribución de audio MP3 completo; se prioriza la custodia de metadatos periciales y arte gráfico.
4. **Fuente de Datos:** La catalogación física humana en `docs/datos-investigacion/Datos BD.ods` prevalece sobre cualquier inferencia automatizada.

---

## 2. Requisitos Funcionales (`RF-NNN`)

### RF-001 · Catálogo de Prensajes y Filtrado Fonográfico
* **Descripción:** El usuario puede explorar el catálogo completo de vinilos y casetes aplicando filtros combinados por sello, formato físico, década y vertiente estilística.
* **Actor:** Coleccionista, DJ, Investigador.
* **Criterios de Aceptación:**
  * *Dado* que el usuario accede a `/vinilos`.
  * *Cuando* selecciona un filtro (ej. Sello: `Infopesa`, Formato: `LP`).
  * *Entonces* la grilla se actualiza mostrando solo los álbumes coincidentes, ordenados cronológicamente por año y número de catálogo.
* **Prioridad:** Debe tener (`Must`) · **Estado:** `CONFIRMADA` · `IMPLEMENTADO`
* **Módulo / Ruta:** `src/features/albumes/` en `/vinilos`

### RF-002 · Ficha Técnica de Expediente y Separación Lado A / Lado B
* **Descripción:** La ficha técnica de cada disco visualiza sus atributos físicos, carátulas en alta resolución y el tracklist desglosado estrictamente por Lado A y Lado B, con créditos de compositores y cantantes reales.
* **Actor:** Todos los perfiles.
* **Criterios de Aceptación:**
  * *Dado* un disco con surcos en ambas caras.
  * *Cuando* se carga la ruta `/album/[id]`.
  * *Entonces* las canciones se agrupan en dos pestañas ("Lado A" y "Lado B"); cada pista muestra orden de surco (A1, A2... / B1, B2...), título, duración en `MM:SS`, compositor, cantante identificado, BPM y Camelot.
* **Prioridad:** Debe tener (`Must`) · **Estado:** `CONFIRMADA` · `IMPLEMENTADO`
* **Módulo / Ruta:** `src/features/albumes/` en `/album/[id]`

### RF-003 · Sincronización Automática de Títulos para Sencillos (45 RPM)
* **Descripción:** Todo single de 45 RPM (`id_tipo_album = 1`) calcula y sincroniza automáticamente su nombre como `"Lado A / Lado B"` a partir de los títulos de las pistas asociadas en cada cara.
* **Actor:** Sistema / Base de datos.
* **Criterios de Aceptación:**
  * *Dado* un single con tema de Lado A "Viento" y tema de Lado B "Te perdí".
  * *Cuando* se ejecuta la inserción o actualización en `Albumes_Temas`.
  * *Entonces* el trigger `trg_sync_single_title_albumes_temas` actualiza `Albumes.nombre_album` exactamente a `"Viento / Te perdí"`.
* **Prioridad:** Debe tener (`Must`) · **Estado:** `CONFIRMADA` · `IMPLEMENTADO`
* **Módulo:** Procedimiento almacenado `fn_sync_single_title()` en PostgreSQL

### RF-004 · Árbol Genealógico de Músicos
* **Descripción:** Consulta exhaustiva de la trayectoria de un músico: agrupaciones fundadas como director, orquestas que integró como músico de planta, sesiones instrumentales y canciones compuestas.
* **Actor:** Investigador, Coleccionista.
* **Criterios de Aceptación:**
  * *Dado* un `id_persona`.
  * *Cuando* se invoca la RPC `get_arbol_genealogico(p_persona_id)`.
  * *Entonces* retorna un objeto JSON con las 4 secciones biográficas en una única llamada de red de alto rendimiento.
* **Prioridad:** Debe tener (`Must`) · **Estado:** `CONFIRMADA` · `IMPLEMENTADO`
* **Módulo / Ruta:** `src/features/genealogia/` en `/genealogia`

### RF-005 · Genealogía Recursiva de Versiones (Covers)
* **Descripción:** Resolución en grafo del árbol completo de versiones de una canción, ascendiendo a la obra original y descendiendo a todas sus regrabaciones históricas, sin bucles infinitos.
* **Actor:** Investigador, DJ.
* **Criterios de Aceptación:**
  * *Dado* cualquier `id_tema` que sea versión o tema original.
  * *Cuando* se llama a `get_genealogia_versiones(p_tema_id)`.
  * *Entonces* la consulta `WITH RECURSIVE` identifica la raíz (`es_raiz = TRUE`), el nivel de profundidad jerárquico y previene bucles cíclicos con `NOT (v.id_tema = ANY(av.camino))`.
* **Prioridad:** Debe tener (`Must`) · **Estado:** `CONFIRMADA` · `IMPLEMENTADO`
* **Módulo / Ruta:** `src/features/genealogia/` en modal `VersionesExplorerModal`

### RF-006 · Herramienta DJ Match BPM y Rueda Camelot
* **Descripción:** Buscador y comparador armónico para DJs que permite encontrar temas compatibles por rango de tempo (BPM) y tonalidad en la Rueda Camelot (mismo número, saltos de +/- 1 o modulación A/B).
* **Actor:** DJ, Selector musical.
* **Criterios de Aceptación:**
  * *Dado* un tema base con BPM 108 y Camelot `9B`.
  * *Cuando* el DJ activa la búsqueda armónica en `/match-bpm`.
  * *Entonces* el sistema retorna pistas con BPM entre 104 y 112 en los tonos `9B` (tono idéntico), `8B` y `10B` (tonos vecinos), y `9A` (relativo menor).
* **Prioridad:** Debe tener (`Must`) · **Estado:** `CONFIRMADA` · `IMPLEMENTADO`
* **Módulo / Ruta:** `src/features/dj-tools/` en `/match-bpm`

### RF-007 · Modelado Relacional de Mosaicos y Popurrís
* **Descripción:** Desglose relacional de enganchados continuos sin quebrar el surco físico único en el disco.
* **Actor:** Catalogador, Coleccionista.
* **Criterios de Aceptación:**
  * *Dado* un mosaico en vinilo (ej. *Parranda Chaca Chaca* en Pista B1).
  * *Cuando* se consulta el tracklist.
  * *Entonces* la pista física figura con `es_mosaico = TRUE` y la tabla `Mosaicos_Temas` expone ordenadamente los 3 temas encadenados con sus respectivos autores.
* **Prioridad:** Debe tener (`Must`) · **Estado:** `CONFIRMADA` · `IMPLEMENTADO`
* **Módulo:** `src/features/albumes/`

### RF-008 · Ingesta Idempotente desde Hoja Tabular
* **Descripción:** Script de sincronización (`scripts/poblar-db.mjs`) que traduce la hoja `Datos BD.ods` a sentencias SQL normalizadas (`ingreso-temas.sql`, `generos.sql`, `personas.sql`, `roles.sql`) y puebla Supabase de forma limpia y reproducible.
* **Actor:** Administrador / Agente IA.
* **Prioridad:** Debe tener (`Must`) · **Estado:** `CONFIRMADA` · `IMPLEMENTADO`

### RF-009 · Pipeline Multimedia WebP en Cliente (`Canvas API`)
* **Descripción:** Interceptación y conversión de imágenes JPG/PNG a formato WebP optimizado en memoria antes de transmitirse a Supabase Storage.
* **Actor:** Administrador / Curador.
* **Criterios de Aceptación:**
  * *Dado* un archivo de imagen en formato JPG o PNG de 5 MB.
  * *Cuando* el curador lo selecciona en `/admin`.
  * *Entonces* `ImageUploader` lo redimensiona a un máximo de 1600 px y genera un blob WebP con calidad 0.90 con tamaño inferior a 400 KB antes del upload.
* **Prioridad:** Debe tener (`Must`) · **Estado:** `CONFIRMADA` · `IMPLEMENTADO`
* **Módulo / Ruta:** `src/features/storage/components/image-uploader.tsx` en `/admin`

### RF-010 · SEO Patrimonial con Marcado Schema.org (JSON-LD)
* **Descripción:** Inyección de entidades semánticas estandarizadas (`MusicAlbum`, `MusicRecording`, `MusicGroup`, `Person`, `RecordLabel`) en el HTML generado por el servidor.
* **Actor:** Motores de búsqueda, Archivo Web.
* **Prioridad:** Debe tener (`Must`) · **Estado:** `CONFIRMADA` · `IMPLEMENTADO`
* **Módulo:** `src/components/seo/json-ld.tsx`

---

## 3. Requisitos No Funcionales (`RNF-NNN`)

| ID | Dimensión | Requisito Cuantitativo Medible | Método de Medición | Estado |
| :--- | :--- | :--- | :--- | :--- |
| **RNF-001** | **Rendimiento LCP** | Largest Contentful Paint ≤ 1.5s en páginas de catálogo en desktop y ≤ 2.2s en móvil 4G. | Vercel Analytics / Lighthouse | `CONFIRMADA` · `IMPLEMENTADO` |
| **RNF-002** | **Concurrencia Server** | Cero cascadas asíncronas: 100% de consultas independientes en Server Components empaquetadas en `Promise.all()`. | Auditoría de código en Server Components | `CONFIRMADA` · `IMPLEMENTADO` |
| **RNF-003** | **Calidad de Tipos** | Cero `any` en todo el código fuente; 0 errores en compilación estricta de TypeScript. | `npx tsc --noEmit` en CI/pre-commit | `CONFIRMADA` · `IMPLEMENTADO` |
| **RNF-004** | **Legibilidad UI** | Suelo tipográfico mínimo de 11px (`text-[11px]`) en `font-mono`; prohibidos tamaños de 8px a 10px. | Inspección de CSS / Lighthouse Accessibility | `CONFIRMADA` · `IMPLEMENTADO` |
| **RNF-005** | **Optimización Media** | 100% de imágenes de portadas y galletas en formato WebP con peso ≤ 400 KB. | Regla de bucket en Supabase Storage | `CONFIRMADA` · `IMPLEMENTADO` |
| **RNF-006** | **Seguridad RLS** | Row Level Security habilitado en el 100% de tablas públicas con lectura anónima y escritura restringida a curadores autenticados. | `pg_policies` en PostgreSQL | `CONFIRMADA` · `IMPLEMENTADO` |

---

## 4. Reglas de Negocio (`RN-NNN`)

* **RN-001 (Duraciones Numéricas):** En base de datos, `duracion_segundos = (minutos * 60) + segundos`. Una pista de 3:32 se almacena como `212`.
* **RN-002 (Camelot Normalizado):** Valores de Camelot sin ceros a la izquierda (`9B`, no `09B`).
* **RN-003 (Aislamiento de Créditos):** El atributo `credito_como` en `Tema_Musicos` es obligatoriamente `NULL` para garantizar que la interfaz renderice el nombre verificado de `Personas`.
* **RN-004 (Dualidad Lados A y B):** Solo se admiten valores `'A'` o `'B'` en el campo `lado` de la fonografía 1968–2005.

---

## 5. Matriz de Trazabilidad de Requisitos

| Requisito | Componente / Servicio | Pantalla / Ruta | Prueba / Verificación |
| :--- | :--- | :--- | :--- |
| **RF-001** | `VinilosFilterBar`, `AlbumGrid` | `/vinilos` | Filtrado interactivo en navegador y orden A/B verificado. |
| **RF-002** | `AlbumTracklist`, `VinylSpinner` | `/album/[id]` | Pestañas de Lado A y B operativas; galleta animada. |
| **RF-003** | `fn_sync_single_title()` | DB Trigger | Inserción en `Albumes_Temas` sincroniza `nombre_album`. |
| **RF-004** | `genealogia-service.server.ts` | `/genealogia` | Llamada a RPC `get_arbol_genealogico` en servidor. |
| **RF-005** | `VersionesExplorerModal` | Modales en catálogo | Consulta recursiva sin ciclos en árbol de covers. |
| **RF-006** | `CamelotWheel`, `MatchBpmEngine` | `/match-bpm` | Concordancia armónica validada matemáticamente. |
| **RF-007** | `MosaicoTrackItem` | `/album/[id]` | Visualización de segmentos encadenados de temas. |
| **RF-009** | `ImageUploader` | `/admin` | Conversión Canvas API a WebP 0.90 comprobada en storage. |

---

## 6. Actualizar cuando
- Se implemente una nueva funcionalidad (ej. reproductor de muestras de audio o sistema de recomendaciones).
- Se modifiquen los criterios de aceptación o umbrales de rendimiento.

## 7. Pendientes
- `PEND-002`: Especificación formal del sistema de recomendación mensual conectado con YouTube y Spotify.
