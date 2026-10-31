# Flujos de Usuario del Sistema (Casos de Uso)

> **Propósito:** Especificar los recorridos paso a paso de los usuarios e investigadores al interactuar con Kumbia Sound.
> **Responde a:** ¿Cómo audita un coleccionista los discos de un grupo? ¿Cómo encuentra un DJ temas compatibles para una sesión? ¿Cómo opera un curador en el panel de administración?
> **Fuente principal de:** Casos de uso `UC-NNN`, secuencias de interacción, atajos y variantes operativas.
> **No contiene (ver):** Requisitos normativos → [requisitos.md](requisitos.md); especificación de diseño de pantallas → [../04-diseno/pantallas.md](../04-diseno/pantallas.md).
> **Depende de:** [requisitos.md](requisitos.md), [../01-proyecto/glosario.md](../01-proyecto/glosario.md).
> **Entregar a otra IA para:** Diseño de pruebas de integración de extremo a extremo (E2E), auditoría de ergonomía y guiones de prueba manual.
> **Estado:** VIGENTE · **Última revisión:** 2026-10-31 · **Describe la versión:** 0.1.0 / commit 04ef58c

---

## 1. Catálogo de Casos de Uso (`UC-NNN`)

### UC-001 · Consulta Discográfica y Detección de Faltantes para Coleccionistas
* **Actor Principal:** Coleccionista de vinilos / Investigador musical.
* **Objetivo:** Verificar la cronología completa de prensajes de una agrupación para auditar qué piezas faltan en su colección y quién cantó en cada corte.
* **Precondiciones:** La base de datos tiene cargados los registros del grupo (ej. Grupo Celeste).
* **Frecuencia:** Frecuente (uso semanal o en ferias de vinilo).
* **Flujo Principal:**
  1. El usuario accede a la página de inicio `/` o navega directamente a `/vinilos`.
  2. En la barra de filtros periciales, selecciona el grupo deseado (ej. *Grupo Celeste*).
  3. El sistema actualiza la grilla mostrando todos los singles de 45 RPM y LPs ordenados cronológicamente con sus números de catálogo de fábrica.
  4. El usuario hace clic sobre un expediente específico (ej. *Single 001 - Discope: La noche / Frescura de invierno*).
  5. El sistema abre la ficha técnica del disco (`/album/[id]`).
  6. El usuario visualiza la portada, el número de catálogo, la matriz física y el desglose de pistas por **Lado A** y **Lado B**.
  7. Al revisar la pista, lee el nombre del compositor y el cantante solista verificado (evitando confusiones de galleta).
* **Variantes y Errores:**
  * *Sin resultados:* Si el filtro no arroja lanzamientos, el sistema muestra el estado vacío institucional: `[EXPEDIENTE NO HALLADO EN BÓVEDA]`.
* **Requisitos Relacionados:** `RF-001`, `RF-002`, `RNF-001`.

---

### UC-002 · Búsqueda Armónica DJ y Preparación de Mezclas (`/match-bpm`)
* **Actor Principal:** DJ / Selector musical.
* **Objetivo:** Encontrar canciones históricas compatibles con una pista base en tempo (BPM) y tono (Camelot) para armar una transición armónica continua.
* **Precondiciones:** Canciones catalogadas con metadatos de BPM y Camelot Key.
* **Frecuencia:** Semanal o previa a presentaciones y grabaciones de sets.
* **Flujo Principal:**
  1. El DJ ingresa a `/match-bpm`.
  2. Selecciona una canción de referencia de la lista o introduce directamente los parámetros base (ej. BPM `108`, Tono `9B`).
  3. El sistema resalta en la **Rueda Camelot interactiva** la celda activa (`9B`) y sus modulaciones compatibles:
     * Tono idéntico (`9B`).
     * Tonos vecinos (+/- 1: `8B` y `10B`).
     * Tono relativo menor (`9A`).
  4. La tabla de resultados despliega las canciones coincidentes dentro del margen de tempo (+/- 3% BPM).
  5. El DJ visualiza el grupo, la duración y la etiqueta del prensaje para incorporar el tema a su lista de reproducción.
* **Requisitos Relacionados:** `RF-006`, `RNF-004`.

---

### UC-003 · Exploración del Grafo Genealógico y Árbol de Versiones
* **Actor Principal:** Investigador musicológico / Curador.
* **Objetivo:** Rastrear la trayectoria de un músico o el origen histórico de una canción regrabada por múltiples orquestas.
* **Precondiciones:** Relaciones en `Tema_Musicos`, `Grupos_Musicos` y `Versiones`.
* **Flujo Principal:**
  1. El usuario accede a `/genealogia`.
  2. Selecciona un músico (ej. *Víctor Casahuamán* o *Lorenzo Palacios "Chacalón"*).
  3. El servidor ejecuta la RPC `get_arbol_genealogico` y renderiza el árbol completo:
     * Bandas fundadas y dirigidas.
     * Orquestas que integró de planta.
     * Sesiones en estudio como instrumentista.
     * Composiciones autorales.
  4. Para una canción con múltiples versiones, el usuario abre el explorador de versiones (`VersionesExplorerModal`).
  5. El sistema ejecuta `get_genealogia_versiones` y muestra la jerarquía visual de la obra máster original y todos sus covers posteriores en orden cronológico.
* **Requisitos Relacionados:** `RF-004`, `RF-005`.

---

### UC-004 · Curaduría y Subida de Carátulas WebP en el Panel Administrador
* **Actor Principal:** Curador / Administrador del archivo.
* **Objetivo:** Actualizar la fotografía pericial de portada de un disco asegurando formato WebP sin costo de infraestructura.
* **Precondiciones:** Sesión iniciada en `/admin` con credenciales de Supabase Auth.
* **Flujo Principal:**
  1. El curador ingresa a `/admin/login` y se autentica.
  2. Navega al expediente del disco que desea actualizar.
  3. Arrastra una imagen escaneada en formato JPG o PNG de alta resolución (ej. 4000x4000 px, 6 MB) al componente `ImageUploader`.
  4. El componente intercepta la imagen en el navegador y la procesa en memoria mediante HTML5 Canvas API:
     * Redimensiona la imagen proporcionalmente manteniendo un ancho máximo de 1600 px.
     * Exporta a formato WebP con calidad 0.90.
  5. El archivo comprimido (~250 KB) se sube al bucket de Supabase Storage.
  6. El curador guarda el expediente y el registro queda inmediatamente disponible en el catálogo público.
* **Variantes y Errores:**
  * *Archivo corrupto:* Si el archivo no es una imagen válida, el sistema emite una notificación de advertencia en pantalla y bloquea el upload.
* **Requisitos Relacionados:** `RF-009`, `RNF-005`, `RNF-006`.

---

## 2. Actualizar cuando
- Se modifique el flujo de navegación de alguna herramienta central.
- Se agregue un nuevo rol de usuario o flujo operativo (ej. sistema de recomendación mensual o exportación de listas de reproducción).

## 3. Pendientes
- Ninguno activo.
