# 📑 ADR 005: Adopción de Directrices de Rendimiento Frontend (Vercel React Best Practices)

* **Estado:** Aceptado
* **Fecha:** 2026-10-13
* **Área de Dominio:** Frontend / Next.js App Router / Rendimiento & Bundle

---

## Contexto

Con la expansión del catálogo fonográfico de Kumbia Sound a más de 700 producciones físicas y 2,000 pistas indexadas, se identificaron varios cuellos de botella y oportunidades críticas de rendimiento en el frontend:

1. **Cascadas de Red (Waterfalls) en Server Components:** Rutas de alto tráfico (`/`, `/vinilos`, `/album/[id]`) encadenaban múltiples llamadas `await` secuenciales hacia la base de datos Supabase, sumando latencias acumuladas antes de enviar el HTML al navegador.
2. **Duplicación de Peticiones en el Servidor:** En las páginas dinámicas (`/album/[id]`, `/blog/[slug]`), la función de metadatos (`generateMetadata`) y el componente de página (`Page`) ejecutaban consultas independientes y duplicadas a Supabase para la misma fila durante la misma solicitud HTTP.
3. **Carga Innecesaria de Bundles de Modales y Datos Mock:** Componentes pesados de visualización y modales (`CommandPalette`, `AlbumDetailModal`, `VersionesExplorerModal`), junto con sus conjuntos de datos mock asociados, se importaban de forma estática en componentes envolventes globales como `BrutalistCoordinator`, sobrecargando el bundle inicial de JavaScript de todas las rutas del sitio.
4. **Bloqueo del Hilo Principal en Filtros de Entrada:** En buscadores interactivos de discos y temas, la actualización del estado de búsqueda re-ejecutaba costosos filtros y comparaciones de cadenas (`.toLowerCase().includes()`) en cada pulsación de tecla, impactando la responsividad visual.

---

## Decisión

Se adopta como estándar mandatorio de ingeniería la guía de **Vercel React Best Practices**, implementando los siguientes patrones técnicos priorizados por impacto:

### 1. Eliminación de Cascadas mediante Paralelización (`async-parallel`)
Todas las consultas independientes en Server Components (RSC) se ejecutan de manera concurrente mediante `Promise.all()`.
- En `src/app/page.tsx`: Se unifican en un único `Promise.all` los conteos de catálogo, la consulta de álbumes, la de temas y la configuración del home.
- En `src/app/vinilos/page.tsx`: Se paralelizan los conteos de formato físico con la consulta del catálogo y la metadata de temas.
- En `src/app/album/[id]/page.tsx`: La consulta del expediente maestro del álbum y la de surcos físicos (`albumes_temas`) se consultan concurrentemente.

### 2. Deduplicación por Petición con `React.cache()` (`server-cache-react`)
Se encapsulan las funciones de consulta de datos por identificador único dentro de `cache()` de React:
- `getAlbumDetail(albumId)` en `src/app/album/[id]/page.tsx`.
- `getArticleBySlug(slug)` en `src/app/blog/[slug]/page.tsx`.
- `getArbolGenealogicoServer(personaId)` y `getGenealogiaVersionesServer(temaId)` en `src/features/genealogia/services/genealogia-service.server.ts`.

Esto garantiza que Next.js ejecute la consulta física hacia la base de datos exactamente una vez por ciclo de renderizado del servidor, compartiendo el resultado en memoria entre `generateMetadata` y el Server Component.

### 3. Carga Diferida y Code-Splitting de Modales (`bundle-dynamic-imports`)
Se reemplazan las importaciones estáticas de modales y herramientas de inspección por `next/dynamic` con `{ ssr: false }`:
- `CommandPalette` en `BrutalistCoordinator`.
- `AlbumDetailModal` en `CatalogExplorer`.
- `VersionesExplorerModal` en `TracklistTable`.

Dichos modales solo se descargan y montan en el navegador cuando el usuario interactúa explícitamente con ellos (atajo `⌘K` o click en botón de inspección).

### 4. Optimización de Importaciones de Paquetes (`bundle-barrel-imports`)
Se habilita `experimental.optimizePackageImports: ["lucide-react"]` en `next.config.ts` para que el compilador transforme automáticamente las importaciones desde el *barrel file* central a importaciones de submódulos directos, eliminando cientos de milisegundos de tiempo de análisis en dev y cold starts.

### 5. Responsividad de Entradas y Filtrado Diferido (`rerender-use-deferred-value`)
En `CatalogExplorer` y `CommandPalette`, se aplica `useDeferredValue` sobre los términos de búsqueda textual. El estado del input se actualiza instantáneamente en el hilo principal y el filtrado del catálogo se procesa de forma diferida como una transición no urgente.

### 6. Renderizado Condicional Explícito (`rendering-conditional-render`)
Se prohíbe el uso de `array.length > 0 && <Component />` o valores booleanos/numéricos implícitos en JSX. Se exige el operador ternario estricto:
```tsx
// Correcto
{catalogJsonLd.length > 0 ? <JsonLd data={catalogJsonLd} /> : null}

// Incorrecto (puede renderizar 0 o provocar hydration issues)
{catalogJsonLd.length > 0 && <JsonLd data={catalogJsonLd} />}
```

### 7. Hoisting de RegExp y Constantes de Módulo (`js-hoist-regexp` & `server-hoist-static-io`)
Las expresiones regulares en componentes que procesan texto continuo (como `MarkdownRenderer` y `camelot-utils.ts`), así como arreglos estáticos de opciones de interfaz (`DECADES`, `GRADIENTS`), se extraen fuera de las funciones y se declaran como constantes a nivel de módulo, eliminando la creación repetitiva de objetos en el Garbage Collector.

---

## Consecuencias

### Positivas
* **Tiempo de Carga Inicial (TTFB y FCP):** Reducción de latencias en Server Components al procesar datos en paralelo en lugar de secuencialmente.
* **Carga en la Base de Datos:** Eliminación de hasta un 50% de consultas redundantes en páginas dinámicas al deduplicar con `React.cache()`.
* **Tamaño del Bundle de Primer Carga:** Alivio de peso en el chunk inicial global al posponer la descarga de modales y mock data hasta su apertura.
* **Experiencia de Usuario (INP):** Filtros ágiles sin congelamiento del cursor ni pérdida de caracteres al tipear rápido en el catálogo.

### Compensaciones
* Los modales cargados dinámicamente (`next/dynamic`) requieren un micro-retraso de red en su primer clic mientras el navegador descarga el fragmento correspondiente; mitigado por el uso de conexiones rápidas y cacheado por Service Worker / navegador.

---

## Alternativas Descartadas

* **Fetching en Cliente mediante `useEffect`:** Descartado para conservar el SEO patrimonial (Schema.org), el renderizado sin parpadeos y el soporte universal de metadatos en servidores.
* **Librerías de Parseo de Markdown Pesadas (`react-markdown` + plugins):** Descartado; el renderizador editorial nativo con expresiones regulares hoisted pesa menos de 3 KB y no añade dependencias externas.
