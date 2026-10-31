# 07 · Problemas Conocidos, Deuda Técnica y Riesgos

> **Propósito:** Registrar de forma centralizada los defectos conocidos, la deuda técnica acumulada (`TD-NNN`), los riesgos evaluados (`RIE-NNN`) y las decisiones pendientes del propietario (`PEND-NNN`).
> **Responde a:**
> - ¿Qué deudas técnicas existen actualmente en el código y cómo se resolverán?
> - ¿Cuáles son los riesgos técnicos o legales del proyecto y qué mitigaciones aplican?
> - ¿Qué decisiones se encuentran pendientes de definición por parte del propietario?
> **Fuente principal de:** Catálogo unificado de `TD-NNN`, `RIE-NNN` y `PEND-NNN`.
> **No contiene (ver):**
> - Decisiones ya adoptadas y confirmadas → [decisiones.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/03-arquitectura/decisiones.md)
> - Hitos y planificación futura → [roadmap.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/07-gestion/roadmap.md)
> **Depende de:**
> - [requisitos.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/02-requisitos/requisitos.md)
> - [decisiones.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/03-arquitectura/decisiones.md)
> **Entregar a otra IA para:** Evaluar riesgos arquitectónicos, priorizar tareas de refactorización o preparar propuestas de resolución para el propietario.
> **Estado:** VIGENTE · **Última revisión:** 2026-10-31 · **Describe la versión:** commit 04ef58c

---

## 1. Deuda Técnica (`TD-NNN`)

### `TD-001` · Ausencia de Suite de Pruebas Unitarias Automatizadas
* **Descripción:** El sistema carece de pruebas automatizadas con frameworks como Vitest o Jest para validar la lógica pura de la Rueda Camelot y los cálculos de pitch.
* **Impacto:** Medio. Las verificaciones dependen actualmente de guiones manuales y del tipado estricto de TypeScript.
* **Causa:** Enfoque prioritario en el modelado fonográfico, UI neo-brutalista e ingesta de datos reales.
* **Solución Propuesta:** Instalar Vitest y programar pruebas unitarias para `src/features/camelot` asegurando que las adyacencias armónicas (ej. `8A` compatible con `7A`, `9A`, `8B`) se verifiquen en el pipeline de CI.
* **Prioridad:** Media · **Estado:** `ABIERTO`

### `TD-002` · Normalización de Búsquedas Textuales sin Acentos (Unaccent)
* **Descripción:** En la barra de búsqueda de vinilos y canciones, términos con tilde (ej. *"Cariñito"*) pueden no coincidir si el usuario escribe *"Carinito"*, dependiendo del collation de la columna.
* **Impacto:** Bajo. Afecta la ergonomía de búsqueda en nombres específicos.
* **Causa:** Uso de filtros `ilike` estándar en PostgREST sin la extensión `unaccent` de PostgreSQL.
* **Solución Propuesta:** Habilitar la extensión `unaccent` en Supabase y crear índices de búsqueda sobre `immutable_unaccent(lower(titulo_tema))`.
* **Prioridad:** Baja · **Estado:** `ABIERTO`

---

## 2. Matriz de Riesgos (`RIE-NNN`)

| ID | Riesgo Identificado | Probabilidad | Impacto | Mitigación Implementada / Propuesta |
| :--- | :--- | :--- | :--- | :--- |
| **`RIE-001`** | **Saturación del Límite de Almacenamiento Free de Supabase (1 GB)** | Media | Alta | El pipeline obligatorio con Canvas API en `ImageUploader` comprime todas las carátulas a WebP (0.90, máx 1600 px) con un peso medio de 180 KB. 1 GB alberga cómodamente más de 5,500 portadas. |
| **`RIE-002`** | **Ciclos Infinitos en Grafos Recursivos de Versiones** | Baja | Alta | La función RPC `get_genealogia_versiones` incorpora protección matemática mediante arrays de caminos `NOT (v.id_tema = ANY(av.camino))` que corta cualquier bucle histórico. |
| **`RIE-003`** | **Reclamaciones de Propiedad Intelectual por Fonogramas** | Baja | Crítica | El sistema tiene prohibición constitucional de alojar o transmitir audio comercial (`INV-005`, `DEC-006`). Solo preserva metadatos técnicos y periciales. |

---

## 3. Decisiones Pendientes del Propietario (`PEND-NNN`)

### `PEND-001` · Crédito en Galleta para Intérpretes en Vinilo
* **Qué se necesita del propietario:** Definir si conviene agregar la columna `credito_como` en la relación de grupos intérpretes (`Albumes_Temas` o `Temas_Grupos`) para aquellos casos excepcionales donde una orquesta grabó bajo un nombre comercial ficticio o seudónimo de banda impuesto por la disquera (ej. "Los Hijos del Sol" impresos como "El Conjunto Tropical de Manzanita").
* **Opciones Consideradas:**
  1. *Opción A:* Agregar `credito_interprete_galleta VARCHAR(150)` en `Albumes_Temas`.
  2. *Opción B:* Utilizar el campo de texto libre `comentario` en `Albumes` para registrar la anécdota discográfica sin alterar el esquema relacional.
* **Documentos Afectados:** [dominio.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/01-proyecto/dominio.md), [modelo-de-datos.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/03-arquitectura/modelo-de-datos.md).
* **Fecha de Apertura:** 2026-10-31 · **Estado:** `ABIERTO`

---

## 4. Actualizar Cuando

- Se resuelva una deuda técnica (`TD`) o se cierre un pendiente (`PEND`).
- Se identifique un nuevo defecto reproducible o riesgo operativo.
- Se adopte una decisión formal para un `PEND`, migrándolo a `decisiones.md`.
