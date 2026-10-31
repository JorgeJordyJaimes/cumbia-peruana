# Índice Maestro de Documentación · Kumbia Sound

> **Propósito:** Puerta de entrada, mapa de navegación y tabla de fuentes únicas de verdad para todo el sistema documental de Kumbia Sound.
> **Responde a:**
> - ¿Dónde está documentado cada aspecto del proyecto (dominio, requisitos, arquitectura, diseño, operaciones)?
> - ¿Qué documento es la fuente canónica de cada dato para evitar duplicados o contradicciones?
> - ¿Cómo está estructurado el sistema de documentación v1.0 y bajo qué reglas opera?
> **Fuente principal de:** Mapa de navegación documental, correspondencia entre preguntas y archivos, y tabla de fuentes únicas de verdad.
> **No contiene (ver):**
> - Instrucciones operativas para agentes de IA → [AGENTS.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/AGENTS.md)
> - Visión ejecutiva del producto → [01-proyecto/presentacion.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/01-proyecto/presentacion.md)
> **Depende de:**
> - [_sistema/01-estandares-transversales.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/_sistema/01-estandares-transversales.md)
> **Entregar a otra IA para:** Orientarse rápidamente en el repositorio y localizar el documento exacto donde reside cada regla.
> **Estado:** VIGENTE · **Última revisión:** 2026-10-31 · **Describe la versión:** commit 04ef58c

---

## 1. Estructura del Sistema Documental v1.0

El sistema de documentación sigue una arquitectura rigurosa de 7 carpetas temáticas orientada a la mantenibilidad humana y de agentes de IA:

```text
docs/
├── README.md                           # Este índice maestro y mapa de navegación
├── 01-proyecto/                        # Definición, alcance y reglas de dominio fonográfico
│   ├── presentacion.md                 # Visión ejecutiva, problema, usuarios y derechos
│   ├── dominio.md                      # Invariantes INV-001 a INV-010 y peritaje histórico
│   └── glosario.md                     # Términos canónicos, equivalencias y sinónimos prohibidos
├── 02-requisitos/                      # Especificación formal de comportamiento del sistema
│   ├── requisitos.md                   # Requisitos funcionales (RF), no funcionales (RNF) y reglas
│   └── flujos-de-usuario.md            # Casos de uso paso a paso (UC-001 a UC-004)
├── 03-arquitectura/                    # Diseño técnico, datos, contratos y memoria de decisiones
│   ├── arquitectura.md                 # Capas de software, componentes y pipeline WebP
│   ├── modelo-de-datos.md              # Diagrama E-R, diccionario de tablas y mapeos ODS
│   ├── interfaces.md                   # Procedimientos RPC, endpoints PostgREST y Schema.org
│   └── decisiones.md                   # Registro de decisiones arquitectónicas DEC-001 a DEC-007
├── 04-diseno/                          # Identidad visual, tokens CSS y especificación de pantallas
│   ├── sistema-visual.md               # Tokens de diseño, tipografía, colores y accesibilidad
│   └── pantallas.md                    # Wireframes textuales, regiones y estados por vista
├── 05-entorno-y-operacion/             # Puesta en marcha, dependencias e infraestructura
│   ├── instalacion-y-entorno.md        # Instalación en máquina limpia, variables y resolución de fallos
│   └── despliegue.md                   # Despliegue en Vercel, configuración de Supabase y respaldos
├── 06-calidad/                         # Verificación, rendimiento y seguridad
│   ├── pruebas.md                      # Puerta de verificación (gate) y guiones de prueba manual
│   ├── rendimiento.md                  # Vercel Best Practices, escenarios ESC-01 a ESC-05 y bundles
│   └── seguridad-y-datos.md            # Políticas RLS, roles RBAC y protección de derechos de autor
└── 07-gestion/                         # Control de versiones, roadmap y bitácoras
    ├── git.md                          # Ciclo de commits en español y flujo de ramas
    ├── roadmap.md                      # Hitos prioritarios confirmados y backlog técnico
    ├── changelog.md                    # Registro histórico de versiones (Keep a Changelog)
    ├── problemas-conocidos.md          # Deuda técnica (TD), riesgos (RIE) y pendientes (PEND)
    └── catalogo-skills.md              # Inventario clasificado de las 28 skills instaladas
```

---

## 2. Mapa "¿Dónde buscar qué?"

| Si te preguntas... | Consulta este documento |
| :--- | :--- |
| ¿Qué es Kumbia Sound, qué problema resuelve y qué alcance legal tiene? | [01-proyecto/presentacion.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/01-proyecto/presentacion.md) |
| ¿Por qué los vinilos solo tienen Lado A y B o cómo se catalogan los mosaicos? | [01-proyecto/dominio.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/01-proyecto/dominio.md) |
| ¿Qué significa un término fonográfico o cómo se llama un campo en la BD? | [01-proyecto/glosario.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/01-proyecto/glosario.md) |
| ¿Cuáles son los criterios de aceptación de cada funcionalidad? | [02-requisitos/requisitos.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/02-requisitos/requisitos.md) |
| ¿Cuáles son los pasos que realiza un usuario para mezclar temas o auditar un LP? | [02-requisitos/flujos-de-usuario.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/02-requisitos/flujos-de-usuario.md) |
| ¿Cómo se comunican el cliente React 19, Next.js y Supabase? | [03-arquitectura/arquitectura.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/03-arquitectura/arquitectura.md) |
| ¿Cuáles son las tablas, columnas y tipos de datos en PostgreSQL? | [03-arquitectura/modelo-de-datos.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/03-arquitectura/modelo-de-datos.md) |
| ¿Qué parámetros recibe la función RPC `get_arbol_genealogico`? | [03-arquitectura/interfaces.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/03-arquitectura/interfaces.md) |
| ¿Por qué no usamos Sharp en el servidor o por qué no alojamos archivos MP3? | [03-arquitectura/decisiones.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/03-arquitectura/decisiones.md) |
| ¿Cuáles son los colores hexadecimales, tipografías y sombras permitidas? | [04-diseno/sistema-visual.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/04-diseno/sistema-visual.md) |
| ¿Cómo está estructurada visualmente la pantalla de detalle de álbum? | [04-diseno/pantallas.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/04-diseno/pantallas.md) |
| ¿Cómo instalo el proyecto en una máquina limpia desde cero? | [05-entorno-y-operacion/instalacion-y-entorno.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/05-entorno-y-operacion/instalacion-y-entorno.md) |
| ¿Qué variables requiere Vercel en producción y cómo se hace un rollback? | [05-entorno-y-operacion/despliegue.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/05-entorno-y-operacion/despliegue.md) |
| ¿Qué comandos debo ejecutar antes de hacer commit? | [06-calidad/pruebas.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/06-calidad/pruebas.md) |
| ¿Qué optimizaciones de Vercel Best Practices están aplicadas? | [06-calidad/rendimiento.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/06-calidad/rendimiento.md) |
| ¿Cómo están configuradas las políticas RLS y la seguridad de datos? | [06-calidad/seguridad-y-datos.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/06-calidad/seguridad-y-datos.md) |
| ¿Cómo se redacta un mensaje de commit en español? | [07-gestion/git.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/07-gestion/git.md) |
| ¿Cuáles son los próximos hitos de desarrollo confirmados? | [07-gestion/roadmap.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/07-gestion/roadmap.md) |
| ¿Qué cambios se hicieron en versiones previas del proyecto? | [07-gestion/changelog.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/07-gestion/changelog.md) |
| ¿Qué deudas técnicas o decisiones pendientes existen? | [07-gestion/problemas-conocidos.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/07-gestion/problemas-conocidos.md) |
| ¿Qué skills de IA están instaladas en el repositorio? | [07-gestion/catalogo-skills.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/07-gestion/catalogo-skills.md) |

---

## 3. Tabla de Fuentes Únicas de Verdad

Cada concepto del sistema tiene exactamente **un documento responsable** para garantizar que nunca existan contradicciones normativas:

| Concepto / Dominio | Fuente Única de Verdad | Regla de Oro |
| :--- | :--- | :--- |
| **Definiciones y Glosario** | [01-proyecto/glosario.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/01-proyecto/glosario.md) | Ningún documento redefine un término fonográfico o técnico. |
| **Invariantes del Dominio** | [01-proyecto/dominio.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/01-proyecto/dominio.md) | Las reglas físicas de prensaje (`INV-001` a `INV-010`) son inmutables. |
| **Requisitos del Sistema** | [02-requisitos/requisitos.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/02-requisitos/requisitos.md) | Todo cambio de comportamiento funcional debe tener un `RF-NNN`. |
| **Esquema de Base de Datos** | [03-arquitectura/modelo-de-datos.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/03-arquitectura/modelo-de-datos.md) | Todo campo o tabla se describe con tipo, constraint y mapeo aquí. |
| **Tokens y Estética Visual**| [04-diseno/sistema-visual.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/04-diseno/sistema-visual.md) | Los colores, tipografías y bordes se toman exclusivamente de aquí. |
| **Instalación y Variables** | [05-entorno-y-operacion/instalacion-y-entorno.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/05-entorno-y-operacion/instalacion-y-entorno.md) | Toda variable de entorno debe documentarse con ejemplo y origen aquí. |
| **Gate de Verificación** | [06-calidad/pruebas.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/06-calidad/pruebas.md) | Los comandos previos a commit se listan y ejecutan según este archivo. |
| **Decisiones y "No Hacer"** | [03-arquitectura/decisiones.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/03-arquitectura/decisiones.md) | Las razones de diseño y alternativas descartadas viven aquí. |

---

## 4. Actualizar Cuando

- Se agregue, mueva o retire cualquier documento del directorio `docs/`.
- Se modifique la estructura de carpetas o la correspondencia de fuentes de verdad.
