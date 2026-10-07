# ADR 003: Resolución de Consultas Genealógicas Complejas mediante Procedimientos en PostgreSQL (RPC) y Recursión

* **Estado:** Aceptado e Implementado
* **Fecha:** 2026-10-07
* **Contexto:** Rendimiento en grafos relacionales y prevención de ciclos en árboles de versiones

---

## Contexto

El modelo fonográfico de **Kumbia Sound** contiene una red de conocimiento altamente densa:
1. **Trayectoria de Músicos:** Un músico puede ser director de un conjunto, haber integrado tres bandas distintas con rangos temporales específicos, haber grabado como sesionista en decenas de temas para otros sellos con diferentes seudónimos (`credito_como`), y haber compuesto canciones interpretadas por múltiples orquestas.
2. **Árbol de Versiones (*Covers* y Regrabaciones):** Una canción compuesta en 1972 pudo haber sido grabada originalmente en 45 RPM, luego reeditada en LP en 1974, versionada en estilo chicha en 1982, y regrabada con arreglos de tecnocumbia en 1999.

### El Problema de Rendimiento (Waterfall N+1)
Intentar resolver estos grafos desde el navegador o servidor mediante llamadas sucesivas de `@supabase/supabase-js` (`supabase.from(...).select(...)` anidadas) provocaba:
* Múltiples viajes de red (*network roundtrips* / cascada N+1).
* Sobrecarga de transferencia de datos (*over-fetching* de campos irrelevantes).
* Riesgo de bucles infinitos en el cliente si existían referencias cíclicas accidentales en la tabla `Versiones`.
* Lógica compleja y pesada de ensamblado de grafos en JavaScript.

---

## Decisión

Trasladar la resolución del grafo fonográfico al motor de base de datos **PostgreSQL** mediante funciones almacenadas (RPC) con retorno en **JSON estructurado** y control estricto de recursión:

### 1. Grafo Biográfico: `get_arbol_genealogico(p_persona_id INT)`
* Ejecuta subconsultas optimizadas con `jsonb_agg` y `jsonb_build_object`.
* Devuelve en un único viaje de red la biografía, bandas como director o integrante de planta, sesiones instrumentales detalladas y catálogo de composiciones con recuento de versiones.

### 2. Jerarquía de Versiones: `get_genealogia_versiones(p_tema_id INT)`
* Implementa una estrategia de dos etapas con **`WITH RECURSIVE`**:
  1. **Ascenso a la Raíz Matriz:** Navega por la auto-relación `Versiones` hacia arriba hasta identificar el tema original primario (`v_root_id`), incluso si el usuario consultó un cover tardío.
  2. **Descenso y Expansión:** Desde la raíz matriz, desciende recolectando todas las derivaciones y versiones subsecuentes.
* **Protección Anti-Bucles:**
  Registra el camino recorrido en un arreglo (`camino || v.id_tema`) y condiciona la recursión con `WHERE NOT (v.id_tema = ANY(av.camino)) AND av.nivel < 20`, evitando bucles infinitos causados por datos circulares.

### 3. Segregación en Next.js App Router
Para respetar la frontera de ejecución de Next.js, se crearon dos servicios especializados:
* [`genealogia-service.ts`](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/src/features/genealogia/services/genealogia-service.ts): Invoca la RPC usando el cliente `@supabase/ssr` del navegador para modales interactivos ([VersionesExplorerModal](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/src/features/genealogia/components/versiones-explorer-modal.tsx)).
* [`genealogia-service.server.ts`](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/src/features/genealogia/services/genealogia-service.server.ts): Invoca la RPC en Server Components sin filtrar dependencias como `next/headers` hacia el bundle cliente.

---

## Consecuencias

### Positivas
* **Latencia Mínima:** El tiempo de resolución del árbol pasa de múltiples cientos de milisegundos a una única consulta SQL ejecutada en menos de 15 ms en Supabase.
* **Seguridad y Resiliencia:** La detección matemática de ciclos en SQL garantiza que el frontend nunca se congele en un bucle recursivo infinito.
* **Consumo de Memoria Reducido:** El frontend recibe exactamente la estructura de nodos y enlaces requerida para renderizar la interfaz.

### Negativas / Costes
* Toda modificación en el esquema de salida del árbol genealógico requiere versionar y desplegar una migración SQL en `supabase/migrations/` en lugar de una modificación simple en código TypeScript.

---

## Alternativas Descartadas

* **Consultas recursivas secuenciales en el cliente (Browser Fetching):** Descartado por inaceptable latencia móvil y riesgo de bloquear el hilo de ejecución principal.
* **Vistas materializadas pre-calculadas:** Descartadas porque el catálogo sufre inserciones frecuentes y requeriría una estrategia compleja de refresco inmediato (`REFRESH MATERIALIZED VIEW`).

---

## Documentación Relacionada
* [Arquitectura Técnica y Datos](../arquitectura-tecnica.md)
* [Lineamientos de Desarrollo](../lineamientos-desarrollo.md)
* [Manifiesto de Arquitectura](../manifiesto-arquitectura.md)
