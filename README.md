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

## 🗺️ Mapa Canónico de Navegación Documental (Suite `docs/`)

La documentación formal del proyecto está centralizada y clasificada temáticamente en [`docs/`](docs/) bajo el estándar de **Docs-as-Code**:

### 📂 `docs/01-gobernanza-y-manuales/`
* [🤖 **Manual Operativo del Proyecto**](docs/01-gobernanza-y-manuales/manual-operativo-proyecto.md): Onboarding, visión integral, guía de instalación desde cero, reglas inmutables y protocolo de documentación viva.
* [🛠️ **Lineamientos de Desarrollo y Código**](docs/01-gobernanza-y-manuales/lineamientos-desarrollo-codigo.md): Estándares de TypeScript, Server Components vs Client Components, optimización frontend Vercel/Next.js y permisos RLS.
* [🚀 **Flujo de Trabajo Git y Convenciones**](docs/01-gobernanza-y-manuales/flujo-git-y-convenciones.md): Ciclo obligatorio de trabajo, Conventional Commits en español y buenas prácticas.
* [🧠 **Reglas e Instrucciones para Agentes de IA**](docs/01-gobernanza-y-manuales/reglas-agentes-ia.md): Directivas mandatorias de seguridad, preservación de datos e ingesta para asistentes autónomos (Antigravity, Cursor, Claude).
* [🧰 **Catálogo de Skills para Agentes**](docs/01-gobernanza-y-manuales/catalogo-skills-ia.md): Inventario auditado de las 28 skills instaladas (HyperFrames, Taste UI, Superpowers, Vercel).
* [📋 **Guía Maestra para Documentar Proyectos**](docs/01-gobernanza-y-manuales/guia-documentacion-proyectos.md): Metodología transferible para auditar y documentar plataformas de catálogo y e-commerce.

### 📂 `docs/02-arquitectura-y-backend/`
* [🏛️ **Arquitectura Integral del Sistema, Modelo Fonográfico y Backend**](docs/02-arquitectura-y-backend/arquitectura-sistema-y-datos.md): Diagramas de capas (Mermaid), modelo relacional ER fonográfico, funciones recursivas RPC en PostgreSQL (`WITH RECURSIVE`) y pipeline Canvas WebP.
* [🗄️ **Esquema DDL Estructural de Referencia**](docs/sql-referencia/estructural.sql): Definición SQL canónica de tablas, índices GIN y llaves foráneas.

### 📂 `docs/03-diseno-uiux/`
* [🪗 **Sistema de Diseño Neo-Brutalista Editorial & Identidad Visual**](docs/03-diseno-uiux/sistema-diseno-brutalista.md): Filosofía del archivo pericial desclasificado, paleta cromática canónica, tokens CSS, geometría ortogonal (`rounded-none`), tipografía y componentes de expediente.

### 📂 `docs/04-especificaciones-y-requisitos/`
* [📜 **Manual de Catalogación Fonográfica e Ingesta a SQL**](docs/04-especificaciones-y-requisitos/manual-catalogacion-e-ingesta.md): Protocolo operativo musicológico, duraciones en segundos, notación Camelot, seudónimos en galleta y aislamiento de créditos de voz.
* [📊 **Hojas de Investigación y Datos Tabulares**](docs/datos-investigacion/Datos%20BD.ods): Archivo maestro tabular de auditoría fonográfica directa.

### 📂 `docs/05-soporte-y-resolucion/`
* [🛠️ **Guía de Resolución de Problemas y Troubleshooting (FAQ)**](docs/05-soporte-y-resolucion/guia-resolucion-problemas.md): Diagnóstico y mitigación de errores de cookies SSR, hydration mismatch, permisos de storage WebP y discrepancias de datos.

### 📂 `docs/06-bitacora-y-decisiones/`
* [📑 **Índice Maestro de Registros de Decisiones (ADRs)**](docs/06-bitacora-y-decisiones/adr/README.md):
  * [**ADR 001:** Restricción Estricta a Lados A y B (1968–2005)](docs/06-bitacora-y-decisiones/adr/001-soporte-estricto-lados-a-b.md)
  * [**ADR 002:** Modelado Relacional de Mosaicos y Popurrís (`Mosaicos_Temas`)](docs/06-bitacora-y-decisiones/adr/002-modelado-mosaicos-y-enganchados.md)
  * [**ADR 003:** Resolución de Grafos Genealógicos mediante RPC en PostgreSQL](docs/06-bitacora-y-decisiones/adr/003-resolucion-grafo-genealogico-rpc.md)
  * [**ADR 004:** Conversión de Imágenes a WebP en Cliente vía Canvas API](docs/06-bitacora-y-decisiones/adr/004-conversion-cliente-webp.md)
  * [**ADR 005:** Optimización de Rendimiento Frontend (Vercel React Best Practices)](docs/06-bitacora-y-decisiones/adr/005-optimizacion-rendimiento-vercel-react-best-practices.md)

---

## 🛠️ Stack Tecnológico

* **Frontend:** [Next.js](https://nextjs.org/) (App Router, Server Components y TypeScript) con estilos en [Tailwind CSS](https://tailwindcss.com/) y primitivas accesibles de [Radix UI / shadcn/ui](https://ui.shadcn.com/).
* **Estilado & UI:** Neo-Brutalismo Editorial (*Archivo Nacional Desclasificado*), con paleta papel manila, tinta espresso, tipografía Anton/Cooper/Geist y física de sombras duras sin desenfoque.
* **Base de Datos:** [PostgreSQL](https://www.postgresql.org/) en [Supabase](https://supabase.com/), con extensiones para búsqueda de texto completo en español (índices GIN), procedimientos almacenados y recursión jerárquica (`WITH RECURSIVE`).
* **Almacenamiento Multimedia:** Buckets de Supabase Storage configurados exclusivamente para formato **WebP** de alta fidelidad, con pipeline de compresión automática en cliente vía HTML5 Canvas API.
* **SEO Patrimonial:** Emisión de metadatos estructurados [Schema.org (JSON-LD)](https://schema.org/) para `MusicAlbum`, `MusicRecording`, `MusicGroup`, `Person` y `RecordLabel`.
* **Despliegue & Analíticas:** Alojado en [Vercel](https://vercel.com/) con métricas de `@vercel/analytics`.

---

## 📁 Estructura del Repositorio (Estándar POSIX)

```text
cumbia-peruana/
├── docs/                                      # Documentación formal centralizada (Docs-as-Code)
│   ├── 01-gobernanza-y-manuales/              # Gobernanza, manuales operativos y reglas IA
│   ├── 02-arquitectura-y-backend/             # Arquitectura del sistema, capas y DDL
│   ├── 03-diseno-uiux/                        # Sistema de diseño brutalista editorial
│   ├── 04-especificaciones-y-requisitos/      # Catalogación fonográfica e investigación ODS
│   ├── 05-soporte-y-resolucion/               # Troubleshooting y solución de errores comunes
│   └── 06-bitacora-y-decisiones/              # Registros de Decisiones de Arquitectura (ADRs)
├── public/                                    # Activos estáticos públicos (branding/ e images/)
├── scripts/                                   # Scripts de automatización y poblado de BD
├── src/                                       # Código fuente de Next.js App Router
│   ├── app/                                   # Rutas, layouts y páginas
│   ├── components/                            # Componentes transversales y SEO JSON-LD
│   ├── features/                              # Módulos de dominio desacoplados (Feature-Driven)
│   ├── lib/                                   # Clientes Supabase segregados (client.ts y server.ts)
│   └── types/                                 # Interfaces TypeScript y tipos de base de datos
├── supabase/                                  # Infraestructura SQL (data/, migrations/)
├── .env.example                               # Plantilla de variables de entorno requeridas
├── package.json                               # Dependencias y scripts del proyecto
└── README.md                                  # Único archivo Markdown en la raíz del proyecto
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
npm run skills:install # Restaura las 28 skills para agentes IA desde skills-lock.json
```

### 3. Configuración de Variables de Entorno
Copia la plantilla y configura tus credenciales locales en `.env.local`:
```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-clave-anonima-publica
```

### 4. Poblado de la Base de Datos
```bash
npm run db:poblar
```

### 5. Servidor de Desarrollo
```bash
npm run dev
```
Disponible localmente en [http://localhost:3000](http://localhost:3000).

### 6. Scripts Disponibles
```bash
npm run dev            # Iniciar entorno de desarrollo local con Turbopack
npm run build          # Compilar aplicación para producción y validar TypeScript
npm run lint           # Ejecutar análisis estático con ESLint
npm run db:poblar      # Ejecutar script de poblado idempotente hacia Supabase Data API
npm run skills:install # Restaurar skills auditadas desde skills-lock.json
npm run skills:list    # Listar skills instaladas
```

---

## 🛡️ Políticas Obligatorias del Proyecto

1. **Soportes Físicos (Exclusividad Lado A y Lado B):** En la fonografía peruana de 1968–2005 los soportes físicos se limitan a Lado A y Lado B. Queda prohibido introducir lógica para lados C o D ([ADR 001](docs/06-bitacora-y-decisiones/adr/001-soporte-estricto-lados-a-b.md)).
2. **Supabase Data API (Concesión Explícita de Permisos):** Toda tabla creada en `public` debe tener RLS activo y conceder permisos explícitos de `GRANT` a `anon, authenticated, service_role`.
3. **Flujo de Trabajo Git:** Todo commit debe seguir la convención de *Conventional Commits* estrictamente en **español** (`feat:`, `fix:`, `refactor:`, `docs:`, etc.) y enviarse inmediatamente a la rama remota correspondiente.
4. **Regla de Documentación Continua (Living Docs):** Todo cambio en código, esquemas o diseño debe actualizar inmediatamente la documentación correspondiente en `docs/`.

---

## 📄 Licencia

Este proyecto está distribuido bajo la licencia [MIT](LICENSE).
