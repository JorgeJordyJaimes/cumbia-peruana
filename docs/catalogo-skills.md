# 🧰 Catálogo de Skills para Agentes Autónomos (Kumbia Sound)

> **Inventario, Guía de Uso y Registro de Capacidades Especializadas**  
> *Este documento registra formalmente todas las skills instaladas en el repositorio para que tanto los agentes autónomos de IA como los desarrolladores conozcan las herramientas, frameworks y pautas activas en el entorno.*

---

## 1. 📌 ¿Cómo se gestionan las Skills en este Repositorio?

Las skills son paquetes de directivas, workflows y herramientas especializadas que expanden las capacidades de los agentes de IA (Antigravity, Cursor, Claude Code, Codex, etc.). En este repositorio se gestionan de forma auditable mediante:

1. **`skills-lock.json` (Raíz):** Archivo de bloqueo que registra la procedencia (`source`), tipo (`sourceType`), ruta canónica del paquete (`skillPath`) y el hash criptográfico SHA-256 (`computedHash`) de cada skill instalada.
2. **`.agents/skills/`:** Directorio versionado en Git que aloja las directivas `SKILL.md` y recursos auxiliares de cada skill.
3. **`docs/catalogo-skills.md` (Este documento):** Registro legible para humanos y agentes con la clasificación, propósito y contexto de aplicación en el proyecto Kumbia Sound.

---

## 2. 📊 Resumen Ejecutivo del Catálogo Instalado

Actualmente se encuentran **28 skills instaladas** provenientes de 4 fuentes oficiales:

| Fuente / Repositorio | Cantidad | Enfoque Principal |
| :--- | :---: | :--- |
| `heygen-com/hyperframes` | 21 | Video programático, motion graphics, clips musicales y composiciones HTML |
| `Leonxlnx/taste-skill` | 14 | Diseño de interfaz de alto nivel, UI brutalista/minimalista, maquetación visual |
| `obra/superpowers` | 2 | Metodología de brainstorming estructurado y depuración sistemática de bugs |
| `vercel-labs/agent-skills` | 1 | Reglas de rendimiento extremo, optimización de React 19 y Next.js App Router |

*(Nota: Algunas skills de diseño comparten catálogo base).*

---

## 3. 🎬 Suite HyperFrames (Video, Animación y Motion Graphics)

Instaladas desde `heygen-com/hyperframes` para habilitar la generación de piezas audiovisuales, videos explicativos de archivo, lyric videos de cumbia y contenido promocional basado en código web determinista (HTML/CSS/GSAP).

| Skill | Propósito y Cuándo Utilizarla |
| :--- | :--- |
| **`hyperframes`** | Punto de entrada obligatorio para crear, diagnosticar, previsualizar o renderizar composiciones de video en HyperFrames. |
| **`hyperframes-core`** | Contrato de composición (estructura HTML, atributos `data-*`, clips, pistas, subcomposiciones y render determinista). |
| **`hyperframes-animation`** | Coreografía y motores de movimiento (GSAP, Lottie, Three.js, Anime.js, animaciones tipográficas). |
| **`hyperframes-audio`** | Mezcla y automatización de audio (fade, crossfade, ganancia, ducking, ecualización, limitadores, SFX). |
| **`hyperframes-keyframes`** | Movimientos de cámara (punch-in/out, Ken Burns, reframes 2D/3D, morphing SVG). |
| **`hyperframes-cli`** | Ciclo de comandos CLI (`render`, `preview`, `check`, `doctor`, `beats`, `transcribe`). |
| **`hyperframes-creative`** | Dirección de arte no animada (paletas de color, tipografía de época, beats, spec visual). |
| **`hyperframes-registry`** | Búsqueda e integración de bloques preconstruidos (glitches, CRT scanlines, grano de película analógica, partículas). |
| **`hyperframes-studio`** | Protocolo de interacción y edición asistida de líneas de tiempo en Studio. |
| **`music-to-video`** | Generación de videos sincronizados al ritmo musical (lyric videos de cumbia, promos cinemáticas sincronizadas al beat). |
| **`motion-graphics`** | Micro-piezas de motion graphics de alta gama (<10s-30s): bumpers, stingers de sello discográfico, count-ups y gráficas de datos. |
| **`embedded-captions`** | Subtitulado y textos cinemáticos embebidos en video. |
| **`faceless-explainer`** | Creación de videos explicativos sin presentador a partir de artículos o notas históricas de sellos. |
| **`talking-head-recut`** | Empaquetado y montaje de entrevistas/documentales con overlays gráficos, tercios inferiores y citas. |
| **`media-use`** | Resolución y manipulación de pistas BGM, SFX, texturas analógicas y voces sintéticas (TTS). |
| **`figma`** | Importación y reconstrucción de componentes y storyboards desde Figma a composiciones HyperFrames. |
| **`pr-to-video`** | Conversión de Pull Requests o changelogs técnicos en videos explicativos de cambios. |
| **`product-launch-video`** | Videos promocionales y lanzamientos de nuevas funcionalidades de Kumbia Sound. |
| **`remotion-to-hyperframes`** | Migración de composiciones React Remotion a HyperFrames HTML puro. |
| **`slideshow`** | Creación de presentaciones interactivas y diapositivas navegables con fragments. |
| **`general-video`** | Autoría de videos multiescena cuando ningún flujo predefinido se ajusta al requerimiento. |

---

## 4. 🎨 Suite de Diseño, UI/UX y Dirección Visual

Instaladas desde `Leonxlnx/taste-skill` para garantizar que la interfaz de usuario respete un diseño premium, sin aspectos genéricos ni plantillas predecibles, integrando la identidad de archivo fonográfico editorial y estética brutalista.

| Skill | Propósito y Cuándo Utilizarla |
| :--- | :--- |
| **`design-taste-frontend`** | Directivas anti-slop para interfaces web: tipografía cuidada, jerarquía visual y layout editorial. |
| **`industrial-brutalist-ui`** | Interfaces crudas de alta precisión (rejillas suizas, estética de terminal militar/archivo fonográfico, fondos oscuros). |
| **`minimalist-ui`** | Interfaces editoriales limpias con paletas monocromáticas cálidas y contrastes tipográficos finos. |
| **`impeccable`** | Auditoría y pulido integral de UX/UI, micro-interacciones, accesibilidad y consistencia visual. |
| **`high-end-visual-design`** | Estándares de agencia de diseño de alta gama para espaciados, tipografías y sombras sutiles. |
| **`brandkit`** | Generación y definición de kits de marca, logotipos, iconografía y sistemas de identidad visual. |
| **`gpt-taste`** | Ingeniería de movimiento con GSAP y ScrollTriggers, jerarquías de lectura y bento grids asimétricos. |
| **`image-to-code`** | Reconstrucción fiel de diseños a partir de referencias visuales o capturas de pantalla. |
| **`imagegen-frontend-web`** | Generación de referencias visuales para páginas web y portadas seccionales. |
| **`imagegen-frontend-mobile`** | Generación de conceptos de interfaz optimizados para dispositivos móviles. |
| **`redesign-existing-projects`** | Auditoría y modernización de interfaces existentes eliminando patrones visuales genéricos de IA. |
| **`stitch-design-taste`** | Creación y mantenimiento de sistemas de diseño semánticos (`DESIGN.md`). |
| **`full-output-enforcement`** | Pauta estricta que prohíbe placeholders (`// TODO: implement later`) forzando código íntegro. |
| **`design-taste-frontend-v1`** | Versión anterior preservada por compatibilidad regresiva. |

---

## 5. ⚡ Rendimiento & Buenas Prácticas Frontend

| Skill | Fuente | Propósito y Cuándo Utilizarla |
| :--- | :--- | :--- |
| **`vercel-react-best-practices`** | `vercel-labs/agent-skills` | Reglas oficiales de rendimiento de Vercel Engineering para Next.js App Router y React 19: paralelización con `Promise.all()`, deduplicación con `React.cache()`, optimización de bundle (`lucide-react`), y carga diferida con `next/dynamic`. |

---

## 6. 🧠 Metodología & Depuración

| Skill | Fuente | Propósito y Cuándo Utilizarla |
| :--- | :--- | :--- |
| **`brainstorming`** | `obra/superpowers` | Protocolo mandatorio para exploración previa a cualquier desarrollo nuevo o definición conceptual importante. |
| **`systematic-debugging`** | `obra/superpowers` | Procedimiento sistemático de resolución de incidencias y depuración de errores antes de proponer cambios de código. |

---

## 7. 🛠️ Protocolo para Instalar o Actualizar Skills

Cuando se requiera añadir una nueva skill al proyecto:

1. **Ejecutar el comando de instalación:**
   ```bash
   npx skills add <autor>/<repositorio>
   ```
2. **Verificar el archivo de bloqueo:**  
   Comprobar que `skills-lock.json` se actualizó con la nueva referencia y que los archivos quedaron en `.agents/skills/`.
3. **Actualizar la Documentación:**  
   Registrar la nueva skill en este catálogo ([`docs/catalogo-skills.md`](catalogo-skills.md)) especificando su propósito y relación con Kumbia Sound.
4. **Flujo Git Obligatorio:**  
   Hacer commit en español y push inmediato a `main`:
   ```bash
   git add skills-lock.json .agents/skills/ docs/catalogo-skills.md
   git commit -m "feat: instalar skill <nombre-de-skill> y registrar en catalogo"
   git push origin main
   ```
