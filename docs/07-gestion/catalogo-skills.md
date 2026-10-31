# 07 · Catálogo de Skills para Agentes de Inteligencia Artificial

> **Propósito:** Inventariar y describir las habilidades especializadas (skills) instaladas en el repositorio para que los agentes autónomos de IA y desarrolladores conozcan las herramientas activas en el entorno.
> **Responde a:**
> - ¿Qué skills están instaladas en `.agents/skills/` y de qué fuentes oficiales provienen?
> - ¿En qué casos debe activarse cada skill especializada (diseño visual, video programático, rendimiento)?
> - ¿Cómo se garantiza la reproducibilidad de las directivas mediante `skills-lock.json`?
> **Fuente principal de:** Inventario clasificado de skills, fuentes oficiales de instalación y recomendaciones de uso por agente.
> **No contiene (ver):**
> - Reglas operativas generales para agentes de IA → [AGENTS.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/AGENTS.md)
> - Sistema de tokens visuales del proyecto → [sistema-visual.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/04-diseno/sistema-visual.md)
> - Directrices de rendimiento de Vercel → [rendimiento.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/06-calidad/rendimiento.md)
> **Depende de:**
> - [git.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/07-gestion/git.md)
> **Entregar a otra IA para:** Evaluar qué skills utilizar ante una tarea de diseño, video, refactorización o depuración sistemática.
> **Estado:** VIGENTE · **Última revisión:** 2026-10-31 · **Describe la versión:** commit 04ef58c

---

## 1. Gestión de Skills en el Repositorio

Las skills expanden el contexto operativo de los modelos de lenguaje mediante directivas `SKILL.md` y scripts auxiliares. En este repositorio:
1. **`skills-lock.json` (Raíz):** Bloquea la procedencia (`source`), tipo (`sourceType`), ruta canónica (`skillPath`) y el hash SHA-256 (`computedHash`) de cada paquete.
2. **`.agents/skills/`:** Directorio versionado que aloja el código fuente y las directivas de cada skill.

---

## 2. Resumen Ejecutivo del Catálogo Instalado

Actualmente se encuentran **28 skills instaladas** agrupadas por suite:

| Suite / Repositorio Fuente | Cantidad | Enfoque de Aplicación en Kumbia Sound |
| :--- | :---: | :--- |
| **`heygen-com/hyperframes`** | 14 | Generación de video programático, motion graphics, bumpers y clips sincronizados. |
| **`Leonxlnx/taste-skill`** | 11 | Dirección de arte UI/UX, interfaces brutalistas y minimalistas, layouts editoriales. |
| **`obra/superpowers`** | 2 | Brainstorming estructurado y depuración sistemática de incidencias complejas. |
| **`vercel-labs/agent-skills`** | 1 | Reglas de rendimiento extremo, optimización de React 19 y Next.js App Router. |

---

## 3. Catálogo Detallado por Especialidad

### 3.1 Suite de Rendimiento e Ingeniería de Software
* **`vercel-react-best-practices`:** Guía técnica mandatoria de Vercel para optimizar Next.js 16 y React 19: paralelización de consultas (`async-parallel`), deduplicación por petición (`server-cache-react`) y empaquetado de bundles.
* **`systematic-debugging`:** Metodología rigurosa para aislar causas raíz de bugs mediante hipótesis reproducibles antes de aplicar cambios en código.
* **`brainstorming`:** Protocolo estructurado de divergencia y convergencia para ideación de nuevas funcionalidades antes de su implementación.
* **`full-output-enforcement`:** Directiva de completitud que prohíbe truncamientos, elisiones de código (`// ... resto del código`) o marcadores de posición (`TODO`).

### 3.2 Suite de Diseño, UI/UX y Dirección Visual
* **`design-taste-frontend`:** Reglas anti-slop para layouts de alta gama, tipografía cuidada y consistencia visual.
* **`industrial-brutalist-ui`:** Estética cruda de terminal suiza y archivo judicial que inspira el universo visual de Kumbia Sound.
* **`minimalist-ui`:** Pautas de interfaces editoriales limpias y monocromáticas.
* **`impeccable`:** Auditoría de usabilidad, micro-interacciones, accesibilidad y tokens.
* **`high-end-visual-design`:** Estándares de espaciado, jerarquías de lectura y sombras sin desenfoque.
* **`brandkit`:** Definición de identidades de marca, sellos y tratamiento gráfico.

### 3.3 Suite HyperFrames (Video y Motion Graphics)
* **`hyperframes`:** Punto de entrada para authoring de composiciones de video web basadas en HTML/CSS/GSAP.
* **`hyperframes-core`:** Contrato de composición determinista y timing temporal con atributos `data-*`.
* **`hyperframes-animation`:** Coreografías y motores de animación (GSAP, Lottie, Three.js).
* **`hyperframes-audio`:** Mezcla y automatización de volumen, fundidos y filtros de audio.
* **`music-to-video`:** Creación de clips visuales y líricas sincronizadas al tempo musical (BPM).
* **`motion-graphics`:** Gráficas de movimiento cortas (<30s) para intros, banners y separadores de época.

---

## 4. Actualizar Cuando

- Se instale una nueva skill mediante el comando `npm run skills:install`.
- Se desinstale o actualice una versión de skill en `skills-lock.json`.
- Cambie el contexto de uso o recomendación de una suite.
