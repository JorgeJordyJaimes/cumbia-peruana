# 07 · Registro Histórico de Cambios (Changelog)

> **Propósito:** Registrar cronológicamente todas las modificaciones, nuevas funcionalidades, optimizaciones y migraciones implementadas en el sistema Kumbia Sound.
> **Responde a:**
> - ¿Qué cambios se introdujeron en cada versión o fecha de desarrollo?
> - ¿Qué decisiones arquitectónicas (`DEC-NNN`) o requisitos (`RF-NNN`) motivaron cada cambio?
> - ¿Cuándo se realizaron las optimizaciones de rendimiento y migraciones de esquema?
> **Fuente principal de:** Bitácora histórica de lanzamientos y evolución del código.
> **No contiene (ver):**
> - Planes a futuro y tareas pendientes → [roadmap.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/07-gestion/roadmap.md)
> - Registro de deudas y defectos abiertos → [problemas-conocidos.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/07-gestion/problemas-conocidos.md)
> **Depende de:**
> - [decisiones.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/03-arquitectura/decisiones.md)
> - [requisitos.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/02-requisitos/requisitos.md)
> **Entregar a otra IA para:** Generar notas de release, auditar cuándo se introdujo una regresión o revisar la evolución histórica del software.
> **Estado:** VIGENTE · **Última revisión:** 2026-10-31 · **Describe la versión:** commit 04ef58c

---

## [1.1.0] - 2026-10-31 (Reorganización Canónica de 7 Secciones & Informes Periciales)

### Añadido
- Nueva ruta y módulo **EXP. 03: Informes Periciales** (`/informes` y `/informes/[id]`) con catálogo biográfico pericial, códigos `INF-NNNN`, sellos de verificación (`[FUENTE PRIMARIA]`, `[FUENTE SECUNDARIA]`, `[SIN VERIFICAR]`) y tablas automáticas de agrupaciones, grabaciones de sesión y composiciones.
- Nueva ruta y módulo **LEGAJO** (`/legajo`) con Acta Fundacional, Equipo de Peritaje, Normas de Catalogación, Solicitud de Rectificación y Canales Oficiales.
- Redirección automática HTTP permanente desde `/nosotros` hacia `/legajo`.
- Rediseño de **EXP. 02: Genealogía** (`/genealogia`) estructurado en 3 carpetas archivadoras: Agrupaciones con etapas históricas (`AGR-001`), Árbol recursivo de versiones (`VER-000`) y Grafo relacional de sesionistas (`SES-000`).
- Nueva vitrina curatorial de 4 puntos y archivo histórico en **EXP. 05: Radar** (`/radar`).
- Formalización de la Planilla de Mezcla sin reproducción de audio en **EXP. 04: Match BPM** (`/match-bpm`).
- Rediseño de la cabecera en **dos niveles editoriales** (`BrutalistNavbar`) para garantizar contención geométrica y eliminar el desbordamiento horizontal en todas las resoluciones.

### Cambiado
- Actualización integral de [`pantallas.md`](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/04-diseno/pantallas.md) reflejando el nuevo mapa canónico de navegación de 7 expedientes.
- Aislamiento completo del panel `/admin` eliminando accesos públicos en Home, TopBar y Footer.

---

## [1.0.0] - 2026-10-31 (Adopción de Sistema Documental Canónico)

### Añadido
- Implementación integral del sistema documental estándar v1.0 en `docs/` con carpetas normalizadas (`01-proyecto`, `02-requisitos`, `03-arquitectura`, `04-diseno`, `05-entorno-y-operacion`, `06-calidad`, `07-gestion`).
- Redacción de [`glosario.md`](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/01-proyecto/glosario.md) con definiciones canónicas fonográficas, musicológicas y acústicas.
- Redacción de [`dominio.md`](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/01-proyecto/dominio.md) formalizando invariantes `INV-001` a `INV-010`.
- Especificación formal de requisitos `RF-001` a `RF-010`, `RNF-001` a `RNF-006` y `RN-001` a `RN-004` en [`requisitos.md`](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/02-requisitos/requisitos.md).
- Documentación de casos de uso `UC-001` a `UC-004` en [`flujos-de-usuario.md`](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/02-requisitos/flujos-de-usuario.md).
- Creación de [`AGENTS.md`](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/AGENTS.md) en la raíz como fuente de verdad operacional para asistentes de IA.

### Cambiado
- Consolidación de decisiones arquitectónicas previas (`ADR-001` a `ADR-005`) en [`decisiones.md`](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/03-arquitectura/decisiones.md) (`DEC-001` a `DEC-007`).
- Migración y depuración de directorios desestructurados antiguos (`docs/01-gobernanza...`, `docs/02-arquitectura...`, etc.).

---

## [0.5.0] - 2026-10-19 (Sincronización de Títulos de Singles 45 RPM)

### Añadido
- Procedimiento y trigger PostgreSQL `fn_sync_single_title` en migración `20261019_sync_single_titles.sql` para forzar que los títulos de singles de 45 RPM (`id_tipo_album = 1`) se sincronicen como `"<Lado A> / <Lado B>"`.

### Corregido
- Discrepancias de nombres en catálogos de sencillos de Infopesa y Sono Radio.

---

## [0.4.0] - 2026-10-15 (Normalización Camelot y Crédito en Galleta)

### Cambiado
- Eliminación formal de la columna redundante `musical_key` de la tabla `Temas` (`20261015000000_drop_musical_key.sql`), estandarizando exclusivamente sobre `camelot_code` (`INV-004`).
- Adición de la columna `credito_galleta` en la tabla `Albumes_Temas` (`20261015010000_add_credito_galleta_to_albumes_temas.sql`) para registrar variaciones literales impresas en vinilo.

---

## [0.3.0] - 2026-10-13 (Optimización de Rendimiento Frontend)

### Añadido
- Adopción de directrices Vercel React Best Practices ([DEC-005](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/03-arquitectura/decisiones.md#dec-005)):
  - Paralelización de consultas independientes en Server Components mediante `Promise.all`.
  - Deduplicación de peticiones por solicitud HTTP con `React.cache()`.
  - Carga diferida (`next/dynamic`) de modales interactivos para reducir el bundle JS inicial en 45 KB.

---

## [0.2.0] - 2026-10-07 (Modelo Fonográfico Avanzado y Pipeline WebP)

### Añadido
- Creación de la tabla `Mosaicos_Temas` ([DEC-002](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/03-arquitectura/decisiones.md#dec-002)) para catalogación granular de popurrís en vinilo.
- Procedimientos almacenados en PostgreSQL: `get_arbol_genealogico` y `get_genealogia_versiones` con recursión CTE ([DEC-003](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/03-arquitectura/decisiones.md#dec-003)).
- Restricción DDL `chk_albumes_temas_lados_ab` forzando exclusivamente Lados A y B ([DEC-001](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/03-arquitectura/decisiones.md#dec-001)).
- Componente `ImageUploader` con conversión en cliente a WebP mediante HTML5 Canvas API ([DEC-004](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/03-arquitectura/decisiones.md#dec-004)).

---

## [0.1.0] - 2026-09-20 (Arquitectura Inicial)

### Añadido
- Esquema relacional inicial en PostgreSQL (migración `20260920000000_initial_schema.sql`).
- Interfaz gráfica neo-brutalista en Next.js App Router con Tailwind CSS.
- Integración con Supabase PostgREST y Storage.
