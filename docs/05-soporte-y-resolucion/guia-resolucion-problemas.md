# 🛠️ Guía de Resolución de Problemas y Troubleshooting (FAQ)

> **Manual de Diagnóstico, Mitigación de Errores Comunes y Preguntas Frecuentes**  
> *Referencia operativa para desarrolladores e inteligencias artificiales en Kumbia Sound.*

---

## 1. 🚨 Problemas Comunes en Next.js y Supabase

### A. Error: `cookies() cannot be called inside a Client Component`
* **Síntoma:** Error en tiempo de ejecución o compilación al interactuar con un componente cliente.
* **Causa Raíz:** Se importó el cliente de servidor (`@/lib/supabase/server`) o un servicio `.server.ts` dentro de un archivo con la directiva `'use client'`.
* **Solución:**
  * En componentes clientes, importa estrictamente `createClient` desde `@/lib/supabase/client` o servicios de cliente (ej. `genealogia-service.ts`).
  * En Server Components o Route Handlers, utiliza `src/lib/supabase/server.ts` o servicios terminados en `.server.ts`.

---

### B. Error: `Hydration failed because the initial UI does not match that rendered on the server`
* **Síntoma:** Parpadeo o advertencia en consola del navegador durante la carga de páginas dinámicas.
* **Causas Frecuentes y Mitigaciones:**
  1. **Renderizado Condicional con Booleanos Implícitos:**
     * *Incorrecto:* `{items.length && <Lista />}` (puede renderizar un `0` en el servidor).
     * *Correcto:* `{items.length > 0 ? <Lista /> : null}`.
  2. **Acceso a `window` o `localStorage` en el primer render:**
     * Encapsula la lectura en un hook `useEffect` o utiliza `useState` con montaje condicional (`isMounted`).
  3. **Modales interactivos pesados:**
     * Utiliza `dynamic(() => import(...), { ssr: false })` para componentes como `CommandPalette` o modales de inspección.

---

### C. Error: `StorageApiError: invalid mime type` o `Access Denied 403` al Subir Portadas
* **Síntoma:** La subida de imágenes falla en el panel de administración `/admin`.
* **Causa Raíz:** El bucket de Supabase Storage está configurado con política estricta que rechaza archivos que no sean `image/webp`, o el usuario intentó enviar un PNG/JPG directo sin compresión.
* **Solución:**
  * Asegúrate de canalizar la subida a través de `src/features/storage/components/image-uploader.tsx`.
  * Este componente utiliza la **HTML5 Canvas API** en el navegador para convertir automáticamente cualquier JPG o PNG a WebP con calidad 0.90 antes de realizar la petición HTTP.

---

### D. Discrepancias entre `Datos BD.ods` y los Archivos `.sql`
* **Síntoma:** Un dato biográfico, año de prensaje o duración en los archivos `.sql` no coincide con la hoja de cálculo de investigación.
* **Protocolo Mandatorio de Resolución:**
  1. **Prevalencia Absoluta:** La hoja [`docs/04-especificaciones-y-requisitos/datos-investigacion/Datos BD.ods`](../04-especificaciones-y-requisitos/datos-investigacion/Datos%20BD.ods) representa la auditoría directa del disco físico y prevalece sobre cualquier SQL.
  2. **Actualización Obligatoria:** El agente o desarrollador debe actualizar el archivo `.sql` correspondiente en `supabase/data/`.
  3. **Reporte al Usuario:** Es mandatorio señalar explícitamente en el commit o informe qué dato cambió (ej. *Valor previo en SQL: 180s vs Nuevo valor en ODS: 195s*).

---

### E. Error de Cascada o Tiempo de Espera Agotado en Consultas Masivas
* **Síntoma:** La página de inicio o `/vinilos` demora varios segundos en responder.
* **Causa Raíz:** Consultas secuenciales encadenadas (`await` tras `await`).
* **Solución:**
  * Aplica la regla `async-parallel`: agrupa consultas independientes en `Promise.all()`.
  * Utiliza `React.cache()` en funciones compartidas con `generateMetadata` para no duplicar peticiones a Supabase por petición de usuario.

---

## 2. 🧰 Problemas con Skills y Entorno de Agentes Autónomos

### A. Las Skills no se Detectan o Muestran Errores de Dependencias
* **Síntoma:** El agente de IA desconoce las herramientas de diseño o debugging.
* **Solución:** Ejecutar la restauración limpia desde el archivo de bloqueo:
  ```bash
  npm run skills:install
  ```
  Esto descargará y vinculará exactamente las 28 skills aprobadas en [`skills-lock.json`](../../skills-lock.json).

---

### B. Fallos de Tipos en TypeScript tras una Migración de Base de Datos
* **Síntoma:** `npx tsc --noEmit` arroja errores de campos inexistentes.
* **Solución:**
  * Revisa [`src/types/database.ts`](../../src/types/database.ts) para asegurarte de que los tipos de las tablas reflejen los nuevos campos DDL (ej. `es_mosaico`, `credito_como`, `credito_galleta`).
  * Ejecuta la comprobación estricta:
    ```bash
    npx tsc --noEmit
    ```
