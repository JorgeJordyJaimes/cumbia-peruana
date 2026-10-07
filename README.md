# 🪗 Kumbia Sound: Archivo Histórico de la Cumbia Peruana (1968–2005)

Plataforma digital especializada en la preservación discográfica, genealogía musical y consulta técnica de la cumbia grabada en el Perú durante su era dorada y etapas de evolución (1968–2005).

El proyecto combina rigor musicológico con herramientas de análisis armónico para coleccionistas, investigadores y DJs, modelando con exactitud la realidad material del soporte físico (vinilos de 45 RPM, LPs, casetes, CDs y ediciones split de sellos históricos como *Infopesa, Discos Horóscopo, Sono Radio, El Virrey, Odeón / IEMPSA, Difa, Discope*, etc.).

---

## 📚 Documentación Centralizada

Para profundizar en los aspectos históricos, etnomusicológicos y relacionales del archivo, consulta los documentos en [`docs/`](docs/):

* [📖 **Manifiesto & Arquitectura del Proyecto**](docs/manifiesto-arquitectura.md): Fundamentos, períodos musicales (1968–2005), diagrama entidad-relación (ER), el grafo fonográfico y módulos web.
* [🛠️ **Lineamientos de Desarrollo & Seguridad**](docs/lineamientos-desarrollo.md): Normas de contribución, políticas de seguridad sobre credenciales, ruptura de compatibilidad en Supabase Data API y flujo Git.
* [📊 **Datos & Notas de Investigación**](docs/datos-investigacion/): Registros de control documental (`Control de Datos BD Cumbia Peruana.ods`), resolución de discrepancias y catálogos de sellos.
* [🗄️ **Esquema DDL de Referencia**](docs/sql-referencia/estructural.sql): Definición de tablas maestras, claves foráneas e índices optimizados.

---

## 🛠️ Stack Tecnológico

* **Frontend:** [Next.js](https://nextjs.org/) (App Router, Server Components y TypeScript) con estilos en [Tailwind CSS](https://tailwindcss.com/) y primitivas de [Radix UI / shadcn/ui](https://ui.shadcn.com/).
* **Estilado & UI:** Diseño *Atmospheric Glassmorphism meets Retro Vinyl Editorial*, con modo brutalista editorial de alto contraste visual.
* **Base de Datos:** [PostgreSQL](https://www.postgresql.org/) en [Supabase](https://supabase.com/), con extensiones para búsqueda de texto completo en español (índices GIN), funciones RPC (`SECURITY DEFINER`) y recursión jerárquica (`WITH RECURSIVE`).
* **Almacenamiento Multimedia:** Buckets de Supabase Storage para alojar imágenes de portadas, sellos y músicos procesadas localmente en formato **WebP** de alta fidelidad vía Canvas API.
* **SEO & Metadatos:** Datos estructurados [Schema.org (JSON-LD)](https://schema.org/) para `MusicAlbum`, `MusicRecording`, `MusicGroup` y `Person`.
* **Despliegue & Analíticas:** [Vercel](https://vercel.com/) con integración continua y métricas de privacidad con `@vercel/analytics`.

---

## 📁 Estructura del Repositorio (Estándar POSIX)

```text
├── docs/                 # Documentación técnica, manifiesto histórico y notas de investigación
│   ├── datos-investigacion/ # Control tabular de registros fonográficos y notas de sellos
│   ├── sql-referencia/   # Esquemas DDL estructurales de referencia histórica
│   ├── lineamientos-desarrollo.md # Normas para desarrolladores y políticas de Supabase Data API
│   └── manifiesto-arquitectura.md # Manifiesto, modelo relacional y grafo fonográfico
├── public/               # Activos estáticos públicos organizados
│   ├── branding/         # Logotipos oficiales e isotipos del proyecto
│   └── images/           # Fotografías y arte gráfico de presentación
├── scripts/              # Scripts de automatización (poblado y sincronización SQL)
│   └── poblar-db.mjs     # Sincronizador de inserts SQL a Supabase vía CLI
├── src/                  # Código fuente de la aplicación Next.js
│   ├── app/              # Rutas App Router (catálogo, /album/[id], /genealogia, /match-bpm, /admin)
│   ├── components/       # Componentes globales y generadores SEO JSON-LD
│   ├── features/         # Módulos de dominio (albumes, temas, genealogia, storage, admin, blog)
│   ├── lib/              # Clientes de Supabase (browser y SSR) y utilidades
│   └── types/            # Definiciones de TypeScript (database.ts, domain.ts)
├── supabase/             # Entorno de base de datos relacional
│   ├── consultas/        # Consultas SQL analíticas (trazabilidad, 45 RPM vs LP, splits)
│   ├── data/             # Inserts SQL históricos (base, vinilos, casetes, canciones)
│   ├── migrations/       # Migraciones SQL versionadas y auditables
│   └── seed.sql          # Catálogos base (roles, tipos de álbum)
└── README.md             # Guía técnica principal
```

---

## 🚀 Puesta en Marcha

### 1. Requisitos Previos
* [Node.js](https://nodejs.org/) (v20 o superior).
* Gestor de paquetes `npm`.
* [Git](https://git-scm.com/).
* Instancia vinculada o cuenta activa en [Supabase](https://supabase.com/).

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
> Si acabas de clonar el repositorio para desarrollo colaborativo, **solicita directamente las credenciales autorizadas al mantenedor del proyecto (Jordy Jaimes)**.

Copia la plantilla de ejemplo y completa tus variables locales en `.env.local`:
```bash
cp .env.local.example .env.local
```

Configuración requerida en `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-clave-anonima-publica

# (Opcional - solo para scripts administrativos de sincronización SQL con npm run db:poblar)
# SUPABASE_ACCESS_TOKEN=tu-token-personal-de-supabase
```

### 4. Servidor de Desarrollo
```bash
npm run dev
```
La aplicación se levantará en [http://localhost:3000](http://localhost:3000).

### 5. Scripts Disponibles
```bash
# Servidor de desarrollo
npm run dev

# Verificación de compilación de producción y TypeScript
npm run build

# Auditoría de linter (ESLint)
npm run lint

# Sincronización e inserción del catálogo histórico SQL hacia Supabase
npm run db:poblar
```

---

## 🛡️ Políticas Obligatorias del Proyecto

### 1. Supabase Data API (Concesión Explícita de Permisos)
Al crear o alterar tablas mediante migraciones en `supabase/migrations/`, debes habilitar RLS y otorgar permisos explícitos para los roles de la Data API (`anon`, `authenticated`, `service_role`):
```sql
ALTER TABLE <tabla> ENABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE <tabla> TO anon, authenticated, service_role;
```

### 2. Soportes Físicos (Exclusividad Lado A y Lado B)
En la discografía peruana del período 1968–2005 los soportes físicos se limitan a Lado A y Lado B (45 RPM, LPs y Casetes). Está estrictamente prohibido introducir lógica para lados C o D.

### 3. Flujo de Trabajo Git
Todo commit debe seguir la convención de *Conventional Commits* en **español** (`feat:`, `fix:`, `refactor:`, `docs:`, etc.) y enviarse inmediatamente a la rama remota correspondiente.

---

## 📄 Licencia

Este proyecto está distribuido bajo la licencia [MIT](LICENSE).
