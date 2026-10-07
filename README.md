# 🪗 Kumbia Sound: Archivo Histórico de la Cumbia Peruana (1968–2005)

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=flat-square&logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Schema.org](https://img.shields.io/badge/Schema.org-JSON--LD-orange?style=flat-square)](https://schema.org/)
[![Licencia](https://img.shields.io/badge/Licencia-MIT-green?style=flat-square)](LICENSE)

Plataforma digital especializada en la preservación discográfica, genealogía musical y análisis técnico del patrimonio fonográfico de la cumbia grabada en el Perú durante sus décadas formativas y de máxima evolución (**1968–2005**).

El proyecto combina rigor musicológico con herramientas de análisis armónico para investigadores, coleccionistas y DJs, modelando con exactitud la realidad material del soporte físico: sencillos en vinilo de 45 RPM, álbumes LP (33 RPM), EPs, Casetes y CDs de sellos legendarios como *Infopesa, Discos Horóscopo, Sono Radio, El Virrey, Odeón / IEMPSA, Difa, Discope, Prodic*, entre otros.

---

## 🗺️ Mapa de Navegación Documental (Suite `docs/`)

La documentación formal del proyecto está organizada en [`docs/`](docs/) bajo estándares de *Docs-as-Code*:

| Documento | Audiencia Principal | Descripción y Alcance |
| :--- | :--- | :--- |
| [🤖 **Manual del Proyecto (Agentes & Devs)**](docs/manual-proyecto.md) | Agentes IA / Nuevos Devs | Secuencia obligatoria de lectura, guía de setup desde cero, reglas inmutables y reorganización estándar. |
| [📖 **Manifiesto & Alcance Histórico**](docs/manifiesto-arquitectura.md) | Investigadores / General | Fundamentos socioculturales, vertientes (costeña, amazónica, chicha, norteña, tecnocumbia) y propósito patrimonial. |
| [🏛️ **Arquitectura Técnica & Modelo de Datos**](docs/arquitectura-tecnica.md) | Desarrolladores / Arquitectos | Especificación del modelo relacional, diccionario de campos críticos, procedimientos RPC recursivos y capa frontend. |
| [📜 **Manual de Criterios de Catalogación**](docs/criterios-catalogacion.md) | Catalogadores / Musicólogos | Protocolo operativo: verificación de entidades, trazabilidad 45 vs LP, enganchados/mosaicos, seudónimos y arte gráfico. |
| [🛠️ **Lineamientos de Desarrollo & Estándares**](docs/lineamientos-desarrollo.md) | Desarrolladores Full-Stack | Guía de setup, política de permisos en Supabase Data API, separación de servicios cliente/servidor y flujo Git. |
| [📑 **Registros de Decisiones de Arquitectura (ADRs)**](docs/adr/README.md) | Equipo de Ingeniería | Registro histórico y técnico de las decisiones estructurales del proyecto: |
| ↳ [ADR 001: Lados A y B Estrictos](docs/adr/001-soporte-estricto-lados-a-b.md) | Arquitectura / Datos | Justificación histórica de la restricción exclusiva a Lados A y B (sin lados C o D). |
| ↳ [ADR 002: Modelado de Mosaicos y Popurrís](docs/adr/002-modelado-mosaicos-y-enganchados.md) | Modelo Relacional | Desglose en `Mosaicos_Temas` preservando la integridad del surco físico en `Albumes_Temas`. |
| ↳ [ADR 003: Grafos Genealógicos con RPC](docs/adr/003-resolucion-grafo-genealogico-rpc.md) | Base de Datos / SQL | Resolución de versiones y árboles biográficos en PostgreSQL vía `WITH RECURSIVE`. |
| ↳ [ADR 004: Conversión WebP en Cliente](docs/adr/004-conversion-cliente-webp.md) | Frontend / Multimedia | Pipeline Canvas API en el navegador para compresión automática y ahorro de ancho de banda. |
| [📊 **Datos & Notas de Investigación**](docs/datos-investigacion/) | Curaduría Fonográfica | Planillas tabulares de control (`Control de Datos BD Cumbia Peruana.ods`) y notas históricas de sellos. |
| [🗄️ **Esquema DDL de Referencia**](docs/sql-referencia/estructural.sql) | Administradores de BD | Definición SQL consolidada de tablas maestras, claves foráneas e índices GIN. |

---

## 🛠️ Stack Tecnológico

* **Frontend:** [Next.js](https://nextjs.org/) (App Router, Server Components y TypeScript) con estilos en [Tailwind CSS](https://tailwindcss.com/) y primitivas accesibles de [Radix UI / shadcn/ui](https://ui.shadcn.com/).
* **Estilado & UI:** Diseño *Atmospheric Glassmorphism meets Retro Vinyl Editorial*, con modo brutalista editorial de alto impacto visual.
* **Base de Datos:** [PostgreSQL](https://www.postgresql.org/) en [Supabase](https://supabase.com/), con extensiones para búsqueda de texto completo en español (índices GIN), procedimientos almacenados (`SECURITY DEFINER`) y recursión jerárquica (`WITH RECURSIVE`).
* **Almacenamiento Multimedia:** Buckets de Supabase Storage configurados exclusivamente para formato **WebP** de alta fidelidad, con pipeline de compresión automática en cliente vía HTML5 Canvas API.
* **SEO Patrimonial:** Emisión de metadatos estructurados [Schema.org (JSON-LD)](https://schema.org/) para `MusicAlbum`, `MusicRecording`, `MusicGroup`, `Person` y `RecordLabel`.
* **Despliegue & Analíticas:** Alojado en [Vercel](https://vercel.com/) con métricas de privacidad de `@vercel/analytics`.

---

## 📁 Estructura del Repositorio (Estándar POSIX)

```text
cumbia-peruana/
├── docs/                                # Documentación formal (Docs-as-Code)
│   ├── adr/                             # Architecture Decision Records (ADRs)
│   │   ├── 001-soporte-estricto-lados-a-b.md
│   │   ├── 002-modelado-mosaicos-y-enganchados.md
│   │   ├── 003-resolucion-grafo-genealogico-rpc.md
│   │   ├── 004-conversion-cliente-webp.md
│   │   └── README.md                    # Índice maestro de ADRs
│   ├── datos-investigacion/             # Control tabular (.ods) y notas de investigación de sellos
│   ├── sql-referencia/                  # Esquemas DDL estructurales de referencia histórica
│   ├── arquitectura-tecnica.md          # Especificación técnica, modelo de datos y RPCs
│   ├── criterios-catalogacion.md        # Manual operativo para catalogadores e investigadores
│   ├── lineamientos-desarrollo.md       # Guía de desarrollo, políticas de Supabase y estándares
│   ├── manifiesto-arquitectura.md       # Manifiesto sociocultural, etapas de la cumbia y grafo
│   └── manual-proyecto.md               # Manual de contexto y onboarding para agentes y devs
├── public/                              # Activos estáticos públicos
│   ├── branding/                        # Logotipos e isotipos institucionales (kumbia-sound-logo*.png)
│   └── images/                          # Fotografías históricas y fondos hero (hero-brutalist.png)
├── scripts/                             # Automatización y sincronización
│   └── poblar-db.mjs                    # Poblado masivo idempotente hacia Supabase vía Data API
├── src/                                 # Código fuente de la aplicación (Next.js App Router)
│   ├── app/                             # Rutas, layouts y páginas del App Router
│   │   ├── admin/                       # Panel de administración (subida WebP y gestión)
│   │   ├── album/[id]/                  # Ficha de álbum dinámica (Server Component + JSON-LD)
│   │   ├── blog/                        # CMS de artículos históricos en Markdown
│   │   ├── genealogia/                  # Explorador genealógico interactivo
│   │   ├── match-bpm/                   # Herramientas armónicas para DJs (Camelot & BPM)
│   │   ├── radar/                       # Curaduría de 45 RPM huérfanos y ediciones split
│   │   └── layout.tsx                   # Root Layout con Vercel Analytics y tipografía
│   ├── components/                      # Componentes transversales (UI y generadores JSON-LD)
│   ├── features/                        # Módulos de dominio desacoplados (Feature-Driven Architecture)
│   ├── lib/                             # Clientes Supabase segregados (client.ts y server.ts)
│   └── types/                           # Definiciones estrictas de TypeScript (database.ts)
├── supabase/                            # Infraestructura de base de datos
│   ├── consultas/                       # Consultas SQL analíticas (trazabilidad, splits, 45 vs LP)
│   ├── data/                            # Inserts SQL históricos (base, vinilos, casetes, canciones)
│   ├── migrations/                      # Migraciones SQL versionadas y auditables
│   └── seed.sql                         # Catálogos base (roles, tipos de álbum)
├── .env.example                         # Plantilla de variables de entorno requeridas
├── package.json                         # Dependencias y scripts del proyecto
└── README.md                            # Guía principal del repositorio (este archivo)
```

---

## 🚀 Puesta en Marcha

### 1. Requisitos Previos
* [Node.js](https://nodejs.org/) (v20 o superior).
* Gestor de paquetes `npm`.
* [Git](https://git-scm.com/).
* Instancia de [Supabase](https://supabase.com/) con PostgreSQL activo.

### 2. Clonación e Instalación
```bash
git clone https://github.com/JorgeJordyJaimes/cumbia-peruana.git
cd cumbia-peruana
npm install
```

### 3. Configuración de Variables de Entorno

> [!CAUTION]
> **POLÍTICA DE SEGURIDAD ESTRICTA SOBRE CLAVES Y SECRETOS**
> Por seguridad y cumplimiento normativo, nunca almacenes claves reales ni tokens de Supabase dentro de archivos rastreados por Git.
> Si acabas de clonar el repositorio, **solicita directamente las credenciales autorizadas al mantenedor del proyecto (Jordy Jaimes)**.

Copia la plantilla y configura tus credenciales locales en `.env.local`:
```bash
cp .env.example .env.local
```

Configuración requerida en `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-clave-anonima-publica
```

### 4. Poblado de la Base de Datos
Para cargar el catálogo histórico consolidado de sellos, álbumes, pistas y seudónimos hacia Supabase:
```bash
npm run db:poblar
```

### 5. Servidor de Desarrollo
```bash
npm run dev
```
La aplicación estará disponible localmente en [http://localhost:3000](http://localhost:3000).

### 6. Scripts Disponibles
```bash
npm run dev         # Iniciar entorno de desarrollo local con Turbopack
npm run build       # Compilar aplicación para producción y validar TypeScript
npm run lint        # Ejecutar análisis estático con ESLint
npm run db:poblar   # Ejecutar script de poblado idempotente hacia Supabase Data API
```

---

## 🛡️ Políticas Obligatorias del Proyecto

1. **Soportes Físicos (Exclusividad Lado A y Lado B):** En la fonografía peruana de 1968–2005 los soportes físicos se limitan a Lado A y Lado B. Queda prohibido introducir lógica para lados C o D ([ADR 001](docs/adr/001-soporte-estricto-lados-a-b.md)).
2. **Supabase Data API (Concesión Explícita de Permisos):** Toda tabla creada en `public` debe tener RLS activo y conceder permisos explícitos de `GRANT` a `anon, authenticated, service_role`.
3. **Flujo de Trabajo Git:** Todo commit debe seguir la convención de *Conventional Commits* estrictamente en **español** (`feat:`, `fix:`, `refactor:`, `docs:`, etc.) y enviarse inmediatamente a la rama remota correspondiente.

---

## 📄 Licencia

Este proyecto está distribuido bajo la licencia [MIT](LICENSE).
