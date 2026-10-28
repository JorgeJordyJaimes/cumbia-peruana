# 🛠️ Lineamientos de Desarrollo, Código y Rendimiento

> **Estándares de Ingeniería de Software, Arquitectura Next.js, Tipado TypeScript y Optimización Frontend**  
> *Referencia técnica canónica para desarrolladores e inteligencias artificiales en Kumbia Sound.*

---

## 1. 🎯 Principios de Ingeniería

1. **Cero `any` y Tipado Estricto:** Prohibido el uso de `any` en TypeScript. Todas las funciones, props y retornos de base de datos deben tiparse explícitamente usando las definiciones en [`src/types/`](../../src/types/).
2. **Arquitectura Orientada al Dominio (Feature-Driven):** El código se organiza en módulos autónomos bajo [`src/features/`](../../src/features/) (`albumes`, `genealogia`, `dj-tools`, `temas`, `storage`, `auth`), reservando `src/components/ui/` únicamente para primitivas de diseño reutilizables.
3. **Respeto Absoluto al Rendimiento Frontend:** Cada componente debe aplicar las directrices de [ADR 005](../06-bitacora-y-decisiones/adr/005-optimizacion-rendimiento-vercel-react-best-practices.md) (eliminación de cascadas asíncronas, cache de servidor, code-splitting dinámico).
4. **Segregación Estricta de Clientes:** Separación física obligatoria entre clientes de navegador y clientes de servidor para Supabase.

---

## 2. ⚡ Server Components vs. Client Components (Next.js)

Next.js App Router ejecuta componentes en el servidor por defecto. Esta arquitectura debe aprovecharse al máximo:

### A. Server Components (RSC por defecto)
Se emplean para todas las páginas y componentes que cargan datos o generan metadatos:
* Páginas dinámicas (`/album/[id]`, `/vinilos`, `/blog/[slug]`).
* Generación de metadatos SEO y JSON-LD Schema.org.
* Consultas directas a Supabase mediante [`src/lib/supabase/server.ts`](../../src/lib/supabase/server.ts) o servicios terminados en `.server.ts`.

### B. Client Components (`'use client'`)
Se restringen únicamente a interactividad de usuario:
* Modales dinámicos (`AlbumDetailModal`, `VersionesExplorerModal`).
* Selectores interactivos (Rueda Camelot, selector de BPM, reproductor de audio).
* Subida de imágenes con compresión en vivo en Canvas API (`ImageUploader`).

```text
[Client Component: VersionesExplorerModal] ──► [genealogia-service.ts]        ──► [client.ts (Browser)]
[Server Component: /album/[id]/page.tsx]   ──► [genealogia-service.server.ts] ──► [server.ts (Server Cookies)]
```

> [!CAUTION]
> **Prohibición Absoluta:**
> Nunca importes `@/lib/supabase/server` ni módulos con dependencias de servidor (`cookies()`, `headers()`) en archivos marcados con `'use client'`.

---

## 3. 🚀 Estándares de Rendimiento Frontend (Vercel React Best Practices)

Todo código React y Next.js debe implementar estos patrones obligatorios:

### A. Eliminación de Cascadas Asíncronas (`async-parallel`)
Las consultas independientes deben ejecutarse concurrentemente mediante `Promise.all()`:
```tsx
// Correcto: Consultas paralelas
const [albumesRes, totalRes, generosRes] = await Promise.all([
  supabase.from('Albumes').select('*').limit(50),
  supabase.from('Albumes').select('id_album', { count: 'exact', head: true }),
  supabase.from('Generos').select('*')
]);
```

### B. Deduplicación en Servidor con `React.cache()` (`server-cache-react`)
Toda función consumida simultáneamente en `generateMetadata` y en la página Server Component debe envolverse en `cache()` de React:
```tsx
import { cache } from 'react';
import { createClient } from '@/lib/supabase/server';

export const getAlbumDetail = cache(async (albumId: number) => {
  const supabase = await createClient();
  return await supabase.from('Albumes').select('*').eq('id_album', albumId).single();
});
```

### C. Importaciones Dinámicas Fuera de Ruta Crítica (`bundle-dynamic-imports`)
Cargar modales y herramientas complejas bajo demanda usando `next/dynamic` y `{ ssr: false }`:
```tsx
const VersionesExplorerModal = dynamic(
  () => import('@/features/genealogia/components/versiones-explorer-modal').then(m => m.VersionesExplorerModal),
  { ssr: false }
);
```

### D. Optimización de Barrel Imports (`bundle-barrel-imports`)
Asegurar en `next.config.ts` el árbol de importaciones optimizado para iconos:
```ts
experimental: {
  optimizePackageImports: ['lucide-react']
}
```

### E. Renderizado Condicional Explícito (`rendering-conditional-render`)
Prohibido el uso de `array.length > 0 && <Component />` en JSX para evitar renderizar ceros accidentales:
```tsx
// Correcto
{items.length > 0 ? <ItemsList items={items} /> : null}
```

### F. Búsqueda Desacoplada con `useDeferredValue` (`rerender-use-deferred-value`)
En filtros de catálogo y cajas de texto de búsqueda, usar `useDeferredValue` para que la digitación nunca se congele:
```tsx
const deferredQuery = useDeferredValue(searchQuery);
```

### G. Memoización de Elementos de Listas Densas (`rerender-memo`)
Componentes que se repiten en cuadrículas masivas (ej. `AlbumCard`) deben usar `React.memo` con comparación de props.

---

## 4. 🛡️ Base de Datos, RLS y Data API Grants

En Supabase, las tablas del esquema `public` **no tienen permisos automáticos** para la Data API (PostgREST). Toda nueva migración SQL debe incluir:

```sql
-- 1. Habilitar RLS
ALTER TABLE Mi_Tabla ENABLE ROW LEVEL SECURITY;

-- 2. Políticas RLS
CREATE POLICY "Lectura publica" ON Mi_Tabla FOR SELECT USING (true);
CREATE POLICY "Escritura autenticada" ON Mi_Tabla 
    FOR ALL TO authenticated, service_role USING (true) WITH CHECK (true);

-- 3. Grants mandatorios para PostgREST:
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE Mi_Tabla TO anon, authenticated, service_role;
GRANT USAGE, SELECT ON SEQUENCE mi_tabla_id_seq TO anon, authenticated, service_role;

-- 4. Para funciones RPC:
GRANT EXECUTE ON FUNCTION mi_funcion_rpc(...) TO anon, authenticated, service_role;
```

---

## 5. 🧪 Checklist de Calidad Pre-Commit

Antes de crear un commit o enviar cambios, es mandatorio ejecutar:

```bash
# 1. Validación estricta de tipos TypeScript
npx tsc --noEmit

# 2. Análisis estático y reglas de código
npm run lint

# 3. Compilación limpia de producción
npm run build
```
