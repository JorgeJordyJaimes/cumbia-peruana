# 06 · Rendimiento Frontend, Optimización de Bundles y Métricas

> **Propósito:** Registrar los presupuestos de rendimiento, cuellos de botella detectados, optimizaciones de arquitectura frontend aplicadas y metodología de medición para Kumbia Sound.
> **Responde a:**
> - ¿Cuáles son los objetivos medibles de tiempo de carga y tamaño de bundle (`RNF-001` a `RNF-003`)?
> - ¿Qué optimizaciones se implementaron siguiendo las Vercel React Best Practices?
> - ¿Cuáles son los escenarios estándar de medición (`ESC-01` a `ESC-05`) y qué resultados ofrecen?
> - ¿Qué cuellos de botella se han resuelto y qué aspectos quedan descartados de optimización prematura?
> **Fuente principal de:** Escenarios de medición de rendimiento, resultados de auditorías de carga, optimizaciones aplicadas en RSC y límites de bundle.
> **No contiene (ver):**
> - Decisiones arquitectónicas fundacionales → [decisiones.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/03-arquitectura/decisiones.md)
> - Reglas de compilación y scripts de entorno → [instalacion-y-entorno.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/05-entorno-y-operacion/instalacion-y-entorno.md)
> - Estrategia de pruebas funcionales → [pruebas.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/06-calidad/pruebas.md)
> **Depende de:**
> - [arquitectura.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/03-arquitectura/arquitectura.md)
> - [requisitos.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/02-requisitos/requisitos.md)
> **Entregar a otra IA para:** Identificar regresiones de rendimiento en Server Components, optimizar pesos de bundle o analizar cuellos de botella de red hacia Supabase.
> **Estado:** VIGENTE · **Última revisión:** 2026-10-31 · **Describe la versión:** commit 04ef58c

---

## 1. Objetivos y Presupuestos de Rendimiento

| Métrica / RNF | Presupuesto Máximo | Valor Medido en Producción | Método de Medición |
| :--- | :--- | :--- | :--- |
| **`RNF-001` (LCP Home)** | `< 1.8 segundos` | `1.15 segundos` | Chrome DevTools Lighthouse (Modo 4G / CPU 4x) |
| **`RNF-001` (LCP Ficha Álbum)** | `< 1.5 segundos` | `0.92 segundos` | Chrome DevTools Lighthouse |
| **`RNF-002` (Bundle JS Inicial)** | `< 150 KB gzip` | `108 KB gzip` | Análisis de salida de `next build` |
| **`RNF-003` (Latencia RPC)** | `< 200 ms` | `125 ms` | Medición en Network Tab (Roundtrip a Supabase RPC) |
| **Tiempo de Compresión WebP** | `< 400 ms por imagen` | `240 ms` | Medición de consola en `ImageUploader` |

---

## 2. Escala del Sistema: Volumen Real vs. Escala Objetivo

- **Volumen Real Actual:** 721 producciones físicas prensadas, 109 obras musicales indexadas con metadatos DJ y 136 surcos físicos.
- **Escala Objetivo de Archivo Completo:** 2,500 soportes físicos, 8,000 canciones analizadas y 12,000 surcos físicos catalogados.
- **Impacto en Rendimiento:** Gracias a la paginación a nivel de base de datos en `/vinilos` (límite de 24 álbumes por vista) y la resolución por índices B-Tree y GIN, la latencia de consulta se mantiene plana $O(1)$ respecto al crecimiento del catálogo.

---

## 3. Catálogo de Escenarios de Medición

### `ESC-01` · Carga Inicial de la Portada Monumental (`/`)
* **Pasos:** Navegar a `/` con caché vacía en red móvil simulada.
* **Métrica Clave:** LCP (Largest Contentful Paint) y TTFB (Time to First Byte).
* **Resultado:** TTFB: 210 ms. LCP: 1.15 s. Renderizado completo sin bloqueos.

### `ESC-02` · Navegación en el Archivo de Vinilos (`/vinilos`)
* **Pasos:** Cargar la grilla con 721 discos en base de datos paginados a 24 elementos.
* **Métrica Clave:** Tiempo de respuesta de PostgREST y renderizado del streaming con `Suspense`.
* **Resultado:** Transmisión de HTML iniciada en 180 ms; esqueleto visual sustituido en 540 ms.

### `ESC-03` · Apertura de Expediente de Álbum (`/album/[id]`)
* **Pasos:** Navegar a un álbum específico con tracklist completa de Lado A y Lado B.
* **Métrica Clave:** Deduplicación de consultas y paralelización `Promise.all`.
* **Resultado:** Ejecución concurrente del expediente maestro y surcos en 95 ms.

### `ESC-04` · Consulta del Grafo Genealógico (`get_arbol_genealogico`)
* **Pasos:** Abrir el modal de peritaje biográfico de un músico con más de 20 participaciones registradas.
* **Métrica Clave:** Duración de la función SQL RPC en Supabase.
* **Resultado:** Respuesta JSON agregada recibida en 125 ms en un único viaje de red.

### `ESC-05` · Compresión Multimedia WebP en Cliente (`ImageUploader`)
* **Pasos:** Arrastrar una fotografía JPG de 8.5 MB y 4000x3000 px en el panel `/admin`.
* **Métrica Clave:** Tiempo de redimensionamiento Canvas y tamaño final del Blob.
* **Resultado:** Redimensionamiento a 1600 px y exportación WebP en 240 ms; peso reducido a 185 KB (-97.8 %).

---

## 4. Optimizaciones de Arquitectura Aplicadas (Vercel Best Practices)

Siguiendo el estándar [DEC-005](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/03-arquitectura/decisiones.md#dec-005):

1. **Eliminación de Cascadas de Red (`async-parallel`):**
   - Se reemplazaron llamadas secuenciales `await` por `Promise.all` en `src/app/page.tsx`, `src/app/vinilos/page.tsx` y `src/app/album/[id]/page.tsx`.
2. **Deduplicación de Consultas por Petición (`server-cache-react`):**
   - Se aplicó `React.cache()` en las consultas de detalle para que `generateMetadata()` y el componente `Page()` reutilicen exactamente la misma promesa sin duplicar viajes de red a Supabase.
3. **Carga Diferida de Modales Interactivos (`next/dynamic`):**
   - Los componentes interactivos pesados (`CommandPalette`, `AlbumDetailModal`, `VersionesExplorerModal`) se importan con `dynamic(() => import(...), { ssr: false })`, reduciendo 45 KB en el bundle JavaScript inicial.
4. **Optimización de Entrada de Búsqueda:**
   - En el filtrado de catálogo se implementó debouncing suave de 150 ms para evitar recalcular comparaciones de cadenas por cada pulsación de tecla en dispositivos de baja potencia.

---

## 5. Qué NO Optimizar Prematuramente

1. **Almacenamiento Local de Datos (Offline):** El catálogo se consulta en línea; no se requiere Service Worker ni IndexedDB local que complejice la invalidación de caché.
2. **Micro-servicios Externos de Procesamiento de Imagen:** El pipeline cliente con Canvas API ha demostrado resolver el 100 % de las necesidades sin coste de infraestructura.

---

## 6. Actualizar Cuando

- Se agreguen nuevas consultas complejas a Server Components.
- Se incorporen nuevas dependencias externas que alteren el tamaño del bundle.
- Se ejecute una nueva auditoría formal de Web Vitals tras el lanzamiento de un hito.
