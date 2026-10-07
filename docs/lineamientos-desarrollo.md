# 🪗 Lineamientos de Desarrollo: Archivo Histórico de la Cumbia Peruana (1968–2005)

Bienvenido/a a la documentación técnica, lineamientos de desarrollo y arquitectura de software de **Kumbia Sound / Archivo Histórico de la Cumbia Peruana**. Este documento establece los estándares de ingeniería, la estructura de directorios del proyecto, las reglas del dominio fonográfico y las pautas de colaboración para cualquier desarrollador/a o investigador/a.

---

## 1. 🎯 Descripción y Propósito del Proyecto

**Kumbia Sound** es una plataforma web especializada en la preservación documental, la genealogía musical y el análisis técnico del patrimonio discográfico de la cumbia grabada en el Perú durante su etapa de génesis, apogeo y transformación (1968–2005).

### Pilares Fundamentales:
* **Preservación y Fidelidad al Soporte Físico:** Modela con precisión la industria fonográfica peruana de la época: prensajes en vinilo de 45 RPM (singles), LPs de 33 RPM, EPs, Casetes, CDs, reediciones históricas, ediciones *split* (discos compartidos por lados con distintos grupos) y sellos discográficos icónicos (*Infopesa, Discos Horóscopo, Sono Radio, El Virrey, Odeón, Difa, Discope*, etc.).
* **Regla Histórica Estricta de Soportes (Solo Lados A y B):** En la fonografía peruana de 1968–2005 los soportes físicos se dividen exclusivamente en **Lado A** y **Lado B**. Queda terminantemente prohibido incorporar lados C o D.
* **Genealogía Musical y Seudónimos ("Piratería blanca / Contratos de exclusividad"):** Trazabilidad de músicos de sesión que grababan para sellos rivales bajo nombres ficticios o variaciones de crédito, resolviendo tanto su identidad biográfica real como el crédito literal impreso en la galleta del disco físico (`credito_como`).
* **Mosaicos, Popurrís y Enganchados:** Preservación de la pista física en el vinilo sin distorsionar métricas de BPM/Camelot, desglosando los temas y compositores participantes mediante una entidad relacional dedicada (`Mosaicos_Temas`).
* **Herramientas Técnicas para DJs:** Motor de búsqueda armónica que cataloga tempo exacto (**BPM**), tonalidad musical estándar y codificación en la **Rueda Camelot** (1A a 12B) para facilitar mezclas armónicas en vivo.
* **SEO Patrimonial y Datos Estructurados:** Generación de metadatos Schema.org (`MusicAlbum`, `MusicRecording`, `MusicGroup`, `Person`, `RecordLabel`) para consolidar a Kumbia Sound como la fuente de verdad primaria en buscadores.
* **Divulgación y CMS Cultural:** Módulo de blog con soporte para artículos en Markdown y panel de administración para gestionar contenidos y material gráfico.

---

## 2. 🛠️ Stack Tecnológico

El proyecto utiliza una arquitectura desacoplada y moderna optimizada para rendimiento y SEO:

* **Framework Web:** [Next.js](https://nextjs.org/) (App Router, Server Components, TypeScript).
* **Estilizado e Interfaz:** [Tailwind CSS](https://tailwindcss.com/) junto a primitivas accesibles de [Radix UI / shadcn/ui](https://ui.shadcn.com/) e iconografía de [Lucide React](https://lucide.dev/).
* **Diseño UI/UX:** Estética *Atmospheric Glassmorphism meets Retro Vinyl Editorial*, con paleta oscura, tarjetas translúcidas y tipografía pensada para catálogos fonográficos.
* **Base de Datos:** [PostgreSQL](https://www.postgresql.org/) alojado en [Supabase](https://supabase.com/), con extensiones para búsqueda de texto completo en español (índices GIN), procedimientos almacenados (RPCs) y control de acceso RLS.
* **Almacenamiento Multimedia:** Buckets en Supabase Storage configurados exclusivamente para imágenes procesadas en formato **WebP** (portadas de vinilos, fotos de artistas y logotipos de sellos).
* **Procesamiento de Imágenes en Cliente:** Conversión e interceptación automática de imágenes (JPG, PNG) a formato WebP de alta fidelidad mediante la **Canvas API** en el panel de administración.
* **Seguridad:** Control de acceso mediante **Row Level Security (RLS)** y autenticación mediante Supabase Auth (`@supabase/ssr`).
* **Métricas y Telemetría:** `@vercel/analytics` integrado en el layout principal.

---

## 3. 📂 Estructura de Carpetas del Repositorio (Root & Project Layout)

El repositorio sigue estrictamente el estándar de nomenclatura **POSIX** (kebab-case o nombres estándar en inglés en minúsculas, sin espacios ni caracteres especiales en la raíz):

```text
cumbia-peruana/
├── docs/                                # Documentación centralizada del proyecto
│   ├── datos-investigacion/             # Planillas (.ods) y notas de investigación de sellos (.txt)
│   ├── sql-referencia/                  # Esquemas DDL estructurales consolidados de referencia histórica
│   ├── lineamientos-desarrollo.md       # Guía para desarrolladores, arquitectura y estándares (este archivo)
│   └── manifiesto-arquitectura.md       # Manifiesto histórico, modelo de datos y diseño técnico
├── public/                              # Activos estáticos públicos
│   ├── branding/                        # Logotipos oficiales y favicons (kumbia-sound-logo*.png)
│   └── images/                          # Fotografías históricas y fondos hero (hero-brutalist.png, etc.)
├── scripts/                             # Scripts de automatización y mantenimiento
│   └── poblar-db.mjs                    # Script Node.js para poblar Supabase vía Data API de forma idempotente
├── src/                                 # Código fuente de la aplicación (Next.js App Router)
│   ├── app/                             # Rutas, layouts y páginas del App Router
│   │   ├── admin/                       # Panel de administración y gestión de contenidos
│   │   │   └── login/                   # Autenticación administrativa (Supabase Auth)
│   │   ├── album/                       # Módulo de álbumes fonográficos
│   │   │   └── [id]/                    # Ficha de álbum dinámica (Server Component + SEO JSON-LD)
│   │   ├── blog/                        # Crónicas y artículos históricos
│   │   │   └── [slug]/                  # Lectura individual de artículos en Markdown
│   │   ├── genealogia/                  # Explorador genealógico de músicos y orquestas
│   │   ├── match-bpm/                   # Herramienta interactiva para DJs (Camelot & BPM Match)
│   │   ├── nosotros/                    # Manifiesto y créditos del equipo investigador
│   │   ├── radar/                       # Curaduría de prensajes raros y singles en 45 RPM
│   │   ├── layout.tsx                   # Root Layout con fuentes, metadatos y Vercel Analytics
│   │   ├── page.tsx                     # Portada editorial brutalista
│   │   └── globals.css                  # Estilos globales y variables de Tailwind CSS
│   ├── components/                      # Componentes transversales de interfaz
│   │   ├── seo/                         # Componentes de datos estructurados (json-ld.tsx)
│   │   └── ui/                          # Primitivas accesibles (badge, modal, button, etc.)
│   ├── features/                        # Arquitectura modular orientada al dominio (Feature-Driven)
│   │   ├── admin/                       # Componentes específicos de administración
│   │   ├── albumes/                     # Componentes de visualización y catálogo de álbumes
│   │   ├── auth/                        # Componentes y formularios de autenticación
│   │   ├── blog/                        # Componentes del CMS de lectura
│   │   ├── dj-tools/                    # Lógica y componentes de la rueda Camelot y BPM
│   │   ├── genealogia/                  # Módulo genealógico (árboles y versiones)
│   │   │   ├── components/              # arbol-genealogico-viewer.tsx, versiones-explorer-modal.tsx
│   │   │   └── services/                # Capa de servicios segregada (cliente y servidor)
│   │   │       ├── genealogia-service.ts        # Consumidor cliente del navegador (RPC)
│   │   │       └── genealogia-service.server.ts # Consumidor Server Components (RPC)
│   │   ├── home-brutalism/              # Layout y componentes visuales de la portada brutalista
│   │   ├── home-retro/                  # Componentes de temática vinilo retro
│   │   ├── storage/                     # Gestión multimedia (image-uploader.tsx con Canvas WebP)
│   │   └── temas/                       # Tablas de tracklist y visualización de pistas
│   ├── lib/                             # Utilidades y clientes de infraestructura
│   │   ├── supabase/                    # Configuración de clientes Supabase segregados
│   │   │   ├── client.ts                # Cliente para el navegador (createBrowserClient)
│   │   │   └── server.ts                # Cliente para Server Components (createServerClient con cookies)
│   │   └── utils.ts                     # Funciones auxiliares de estilo (cn, formateadores)
│   └── types/                           # Definiciones de tipos TypeScript
│       ├── database.ts                  # Interfaces del esquema relacional y resultados RPC
│       └── index.ts                     # Tipos transversales de la aplicación
├── supabase/                            # Infraestructura de base de datos
│   ├── data/                            # Inserts históricos en SQL ordenados por vertiente
│   │   ├── base/                        # Datos maestros (sellos, tipos de álbum, roles, géneros)
│   │   ├── canciones/                   # Temas, letras líricas y créditos de composición
│   │   ├── cassete/                     # Catálogo de casetes fonográficos
│   │   └── vinilos/                     # Prensajes en LP y singles de 45 RPM
│   ├── consultas/                       # Consultas SQL analíticas (splits, 45 vs LP, reediciones)
│   └── migrations/                      # Migraciones versionadas DDL, RLS, storage y RPCs
├── .env.example                         # Plantilla de variables de entorno requeridas
├── .gitignore                           # Exclusiones de Git (node_modules, .env*, build artifacts)
├── next.config.mjs                      # Configuración de Next.js (optimización de imágenes WebP)
├── package.json                         # Dependencias y scripts de npm
├── tailwind.config.ts                   # Configuración del sistema de diseño Tailwind CSS
└── tsconfig.json                        # Configuración estricta de TypeScript
```

---

## 4. 🏗️ Arquitectura de Software y Separación de Responsabilidades

El proyecto implementa una arquitectura desacoplada basada en el **App Router** de Next.js y el patrón **Feature-Driven Architecture**:

### A. Server Components vs. Client Components
* **Server Components (RSC por defecto):** Todas las páginas dinámicas principales (como `src/app/album/[id]/page.tsx`) se ejecutan en el servidor. Esto permite:
  * Consultar Supabase directamente desde el servidor sin exponer consultas innecesarias en el cliente.
  * Inyectar etiquetas `<script type="application/ld+json">` y metadatos OpenGraph listos para indexación en buscadores.
  * Reducir el tamaño del bundle de JavaScript enviado al navegador.
* **Client Components (`'use client'`):** Se reservan exclusivamente para componentes con interactividad de usuario:
  * Modales de detalle y reproductores visuales (`VersionesExplorerModal`, `AlbumDetailModal`).
  * Formularios de subida y arrastre de imágenes (`ImageUploader`).
  * Controles de filtrado armónico en vivo para DJs (`MatchBpmPage`).

### B. Segregación Estricta de Clientes Supabase
Para evitar fugas de dependencias del servidor (`next/headers`, `cookies()`) hacia el navegador, el proyecto cuenta con dos clientes separados:

1. **Cliente de Navegador (`src/lib/supabase/client.ts`):**
   * Utiliza `createBrowserClient` de `@supabase/ssr`.
   * Seguro para ejecutarse en Client Components.
2. **Cliente de Servidor (`src/lib/supabase/server.ts`):**
   * Utiliza `createServerClient` de `@supabase/ssr` junto con la API asíncrona de `cookies()` de Next.js.
   * Utilizado únicamente en Server Components, Server Actions o Route Handlers.

```text
[Client Component: VersionesExplorerModal] ──► [genealogia-service.ts]        ──► [client.ts (Browser)]
[Server Component: /album/[id]/page.tsx]   ──► [genealogia-service.server.ts] ──► [server.ts (Server Cookies)]
```

> [!IMPORTANT]
> **Regla de Importación de Servicios:**
> * Si estás trabajando en un componente con `'use client'`, importa los servicios desde `src/features/genealogia/services/genealogia-service.ts`.
> * Si estás en un Server Component o Route Handler, importa desde `src/features/genealogia/services/genealogia-service.server.ts`.
> * **Nunca importes `@/lib/supabase/server` en un archivo con `'use client'`.**

### C. Procedimientos Almacenados en PostgreSQL (RPC) y Consultas Recursivas
Para evitar cuellos de botella de red generados por múltiples llamadas `.select()` anidadas (problema N+1):
* **`get_arbol_genealogico(p_persona_id INT)`:**
  Resuelve de un solo golpe el grafo biográfico completo de un músico: agrupaciones que fundó o dirigió, orquestas que integró con rango de fechas (`desde`/`hasta`), temas grabados como sesionista con su rol instrumental y temas compuestos. Devuelve un payload JSON estructurado optimizado para el navegador.
* **`get_genealogia_versiones(p_tema_id INT)`:**
  Utiliza una consulta jerárquica con **`WITH RECURSIVE`** en PostgreSQL. Primero localiza la versión original raíz navegando ascendentemente; luego, desciende recolectando todas las regrabaciones y versiones posteriores. Incluye prevención de bucles infinitos (`NOT (v.id_tema = ANY(av.camino))`) y devuelve el nivel de profundidad, compositores, intérpretes y prensajes físicos de cada nodo.

### D. Pipeline Multimedia en Cliente (`/admin`) con Canvas WebP
Para cumplir con la política estricta de Supabase Storage (que únicamente acepta archivos WebP):
* El componente `src/features/storage/components/image-uploader.tsx` intercepta cualquier archivo `.jpg`, `.jpeg` o `.png` seleccionado por el usuario.
* Mediante la **Canvas API** en el navegador:
  1. Redimensiona proporcionalmente la imagen si supera los 1600 px de ancho/alto.
  2. La dibuja en un canvas 2D en memoria.
  3. Exporta la imagen comprimida a formato `image/webp` con factor de calidad 0.90.
* Muestra al usuario feedback visual en tiempo real: estado de compresión, peso original vs. comprimido y porcentaje de reducción antes de subir el archivo a Supabase Storage.

### E. SEO Patrimonial y Datos Estructurados (Schema.org / JSON-LD)
* El componente `src/components/seo/json-ld.tsx` emite bloques de datos estructurados tipados para buscadores.
* En `src/app/album/[id]/page.tsx` se genera automáticamente un esquema semántico `MusicAlbum` que vincula pistas (`MusicRecording`), artistas (`MusicGroup`), compositores (`Person`) y sellos discográficos (`RecordLabel`).

---

## 5. 🗄️ Modelo Fonográfico y Reglas del Dominio

Al trabajar en la base de datos o en el código de la aplicación, es fundamental respetar las siguientes reglas del patrimonio fonográfico peruano:

1. **Exclusión Estricta de Lados C y D:**
   En los soportes de la época (1968–2005), la producción física de vinilos (45 RPM singles, LPs de 33 RPM) y casetes se limitaba al **Lado A** y **Lado B**.
   * La base de datos valida esto mediante:
     ```sql
     CONSTRAINT chk_albumes_temas_lados_ab CHECK (lado IS NULL OR lado IN ('A', 'B'));
     ```
   * En ningún formulario, interfaz o consulta se debe permitir la introducción de lados alternativos (C, D, etc.).
2. **"Piratería blanca" y Contratos de Exclusividad (`credito_como`):**
   * En las décadas de 1970 y 1980, músicos bajo contrato de exclusividad grababan clandestinamente para otros sellos usando seudónimos en la galleta del disco.
   * Las tablas `Tema_Musicos` y `Temas_Compositores` cuentan con la columna opcional `credito_como TEXT NULL`.
   * **Regla:** Vincula siempre `id_musico` o `id_compositor` a la identidad biográfica real en `Personas`, y utiliza `credito_como` para preservar el nombre literal impreso en el disco físico.
3. **Mosaicos, Popurrís y Enganchados (`es_mosaico` y `Mosaicos_Temas`):**
   * Una pista física en un LP o casete puede ser un mosaico continuo que une varias composiciones distintas.
   * `Albumes_Temas` contiene la bandera `es_mosaico BOOLEAN DEFAULT FALSE`.
   * El desglose se realiza mediante la tabla relacional `Mosaicos_Temas` (`id_album_tema`, `id_tema`, `orden_segmento`, `duracion_segmento_segundos`).
   * **Regla:** Esto preserva la autoría individual de cada compositor por segmento sin crear pistas físicas artificiales ni distorsionar los datos de BPM o clave Camelot del tema contenedor.
4. **Relación Multigénero (`Temas_Generos`):**
   * Permite catalogar fusiones híbridas (ej. Cumbia Costeña Psicodélica + Chicha Andina) sin encasillar un tema en un solo género.

---

## 6. 🚀 Guía de Instalación y Puesta en Marcha

### Requisitos Previos
* **Node.js:** Versión 20.x o superior.
* **npm:** Gestor de paquetes oficial de Node.js.
* **Git:** Para control de versiones.
* **Cuenta activa en Supabase:** Si se va a levantar un entorno personal o de pruebas.

### Paso 1: Clonar e Instalar Dependencias
```bash
git clone https://github.com/JorgeJordyJaimes/cumbia-peruana.git
cd cumbia-peruana
npm install
```

### Paso 2: Configuración de Variables de Entorno
Copia la plantilla `.env.example` para crear tu entorno local:

```bash
cp .env.example .env.local
```

> [!CAUTION]
> **POLÍTICA DE SEGURIDAD ESTRICTA SOBRE CLAVES Y SECRETOS**
> Por seguridad y cumplimiento normativo, **nunca almacenes claves reales, URLs privadas ni tokens de Supabase dentro de archivos rastreados por Git ni en esta documentación**.
> 
> Si acabas de clonar el repositorio, **debes solicitar directamente las credenciales de desarrollo al mantenedor del proyecto (Jordy Jaimes)**.

Define las variables requeridas en `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto-aqui.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui
```

### Paso 3: Sincronización y Carga de la Base de Datos
* Las migraciones estructurales se encuentran en `supabase/migrations/`.
* Para poblar el catálogo histórico inicial de forma automatizada mediante la API de Supabase, ejecuta el script de inserción:
```bash
node scripts/poblar-db.mjs
```

### Paso 4: Iniciar el Servidor de Desarrollo
```bash
npm run dev
```
La aplicación estará disponible localmente en `http://localhost:3000`.

### Paso 5: Comprobación de Tipos y Compilación
Antes de enviar cualquier cambio, verifica que no existan errores de TypeScript ni de linter:
```bash
npx tsc --noEmit
npm run lint
npm run build
```

---

## 7. 🛡️ Base de Datos, Permisos y Supabase Data API

### Política Obligatoria de Permisos (Supabase Data API / PostgREST)
En versiones modernas de Supabase, **no existe la concesión automática de permisos de la Data API sobre nuevas tablas** en el esquema `public`.

#### Regla Mandatoria para Nuevas Migraciones:
Toda migración que cree o modifique tablas debe incluir explícitamente:
1. Activación de Row Level Security (RLS).
2. Políticas RLS para lectura y escritura.
3. Concesión explícita de privilegios (`GRANT`) a los roles `anon`, `authenticated` y `service_role`.

```sql
-- 1. Crear tabla
CREATE TABLE IF NOT EXISTS Mi_Nueva_Tabla (
    id_registro SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL
);

-- 2. Habilitar RLS
ALTER TABLE Mi_Nueva_Tabla ENABLE ROW LEVEL SECURITY;

-- 3. Crear políticas RLS
CREATE POLICY "Lectura publica" ON Mi_Nueva_Tabla FOR SELECT USING (true);
CREATE POLICY "Escritura autenticada" ON Mi_Nueva_Tabla 
    FOR ALL TO authenticated, service_role USING (true) WITH CHECK (true);

-- 4. Concesión obligatoria para PostgREST / Data API:
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE Mi_Nueva_Tabla TO anon, authenticated, service_role;
GRANT USAGE, SELECT ON SEQUENCE mi_nueva_tabla_id_registro_seq TO anon, authenticated, service_role;
```

Para funciones almacenadas (RPC):
```sql
GRANT EXECUTE ON FUNCTION mi_nueva_funcion_rpc(...) TO anon, authenticated, service_role;
```

---

## 8. 📜 Flujo de Trabajo Git (Obligatorio)

Para mantener la integridad del historial y el despliegue continuo en Vercel, todo colaborador debe acatar las siguientes pautas:

1. **Mensajes de Commit:** Redactados en **español**, concisos y utilizando estrictamente la convención de *Conventional Commits*:
   * `feat:` para nuevas características, vistas o tablas.
   * `fix:` para corrección de bugs, tipado o inconsistencias.
   * `docs:` para actualizaciones en documentación, lineamientos o esquemas SQL de referencia.
   * `refactor:` para reorganización de código o carpetas sin alterar la funcionalidad.
   * `style:` para mejoras visuales o formateo sin cambio de lógica.
2. **Ciclo Inmediato de Sincronización:** Cada vez que se modifiquen archivos del proyecto:
   * `git add <archivos>`
   * `git commit -m "<tipo: descripción en español>"`
   * `git push origin <rama>` de forma inmediata.

---

## 9. 🔗 Documentación Relacionada
* [Manual del Proyecto para Agentes y Desarrolladores](manual-proyecto.md)
* [Arquitectura Técnica y Modelo de Datos](arquitectura-tecnica.md)
* [Manual de Criterios de Catalogación e Investigación](criterios-catalogacion.md)
* [Manifiesto del Proyecto y Alcance Histórico](manifiesto-arquitectura.md)
* [Registros de Decisiones de Arquitectura (ADRs)](adr/README.md)
* [Datos Tabulares y Notas de Investigación](datos-investigacion/)

