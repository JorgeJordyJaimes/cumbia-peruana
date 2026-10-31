# 03 · Arquitectura de Software y Pipeline Multimedia

> **Propósito:** Explicar cómo está construido el sistema Kumbia Sound, sus capas de software, flujos de datos, pipeline de conversión multimedia en cliente, estructura física del código y restricciones inviolables de desarrollo.
> **Responde a:**
> - ¿Cómo se organizan y comunican las capas entre cliente (React 19), servidor (Next.js 16 App Router) y base de datos (Supabase PostgREST / RPC)?
> - ¿Cómo funciona el pipeline de compresión y sanitización de portadas a WebP en el navegador mediante HTML5 Canvas API?
> - ¿Cuál es la estructura física real de directorios y qué responsabilidades tiene cada módulo en `src/`?
> - ¿Qué restricciones arquitectónicas rigen el desarrollo y cómo se verifican para evitar regresiones?
> **Fuente principal de:** Capas de software, componentes de `src/`, pipeline Canvas WebP, flujos de secuencia e invariantes técnicas de código.
> **No contiene (ver):**
> - Diccionario de tablas, campos y relaciones de base de datos → [modelo-de-datos.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/03-arquitectura/modelo-de-datos.md)
> - Contratos de funciones RPC y JSON-LD → [interfaces.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/03-arquitectura/interfaces.md)
> - Decisiones de diseño y ADRs → [decisiones.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/03-arquitectura/decisiones.md)
> - Guía de instalación y entorno local → [instalacion-y-entorno.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/05-entorno-y-operacion/instalacion-y-entorno.md)
> **Depende de:**
> - [glosario.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/01-proyecto/glosario.md)
> - [dominio.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/01-proyecto/dominio.md)
> - [requisitos.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/02-requisitos/requisitos.md)
> **Entregar a otra IA para:** Evaluar refactorizaciones arquitectónicas, auditar capas de Server vs. Client Components, revisar dependencias circulares o implementar nuevos módulos en `src/features/`.
> **Estado:** VIGENTE · **Última revisión:** 2026-10-31 · **Describe la versión:** commit 04ef58c

---

## 1. Visión Global del Sistema

Kumbia Sound implementa una arquitectura web moderna desacoplada en tres capas principales: Capa de Presentación en Navegador (React 19 Client Components), Capa de Servidor (Next.js 16 App Router sobre Node.js / Vercel Edge Runtime) y Capa de Datos y Persistencia (Supabase PostgreSQL, PostgREST y Storage Bucket).

```mermaid
flowchart TD
    subgraph ClientLayer["1. Capa Cliente (Navegador Web)"]
        UI["React 19 Client Components\n(Modales interactivos, Camelot Wheel SVG, Filtros rápidos)"]
        CanvasAPI["HTML5 Canvas API en Memoria\n(Compresión WebP 0.90, max 1600px, 0 dependencias backend)"]
        BrowserSupabase["@supabase/ssr Browser Client\n(src/lib/supabase/client.ts)"]
    end

    subgraph ServerLayer["2. Capa Servidor (Vercel App Router)"]
        RSC["React Server Components (RSC)\n(/, /album/[id], /vinilos, /blog/[slug])"]
        SEO["Generador JSON-LD Schema.org\n(MusicAlbum, MusicRecording, MusicGroup)"]
        ServerSupabase["@supabase/ssr Server Client\n(src/lib/supabase/server.ts)"]
        Cache["React.cache & Next.js Data Cache\n(Deduplicación de peticiones por ciclo de render)"]
    end

    subgraph DatabaseLayer["3. Capa de Datos (Supabase / PostgreSQL)"]
        PostgREST["Motor PostgREST\n(Filtros HTTP REST, RLS, Grants para anon y authenticated)"]
        RelationalTables["Tablas Relacionales Fonográficas\n(Albumes, Temas, Albumes_Temas, Mosaicos_Temas)"]
        RPC["Funciones Almacenadas SQL (RPC)\n(get_arbol_genealogico, get_genealogia_versiones)"]
        Storage["Bucket de Almacenamiento Supabase\n(portadas / solo archivos image/webp)"]
    end

    UI -->|"Consultas interactivas cliente"| BrowserSupabase
    UI -->|"Sanitización y compresión local"| CanvasAPI
    CanvasAPI -->|"Subida directa de binario WebP"| Storage
    BrowserSupabase -->|"Llamadas API autenticadas"| PostgREST
    RSC -->|"Inyección en metadatos HTML"| SEO
    RSC -->|"Acceso a datos en servidor"| Cache
    Cache -->|"Instancia cookies()/headers()"| ServerSupabase
    ServerSupabase -->|"Consultas SELECT / RPC"| PostgREST
    PostgREST --> RelationalTables
    PostgREST --> RPC
```

### 1.1 Diagrama de Despliegue Físico

```mermaid
flowchart LR
    Client["Navegador Cliente\n(Desktop / Móvil)"]
    Vercel["Vercel Edge Network\n(CDN + Next.js 16 SSR/RSC)"]
    SupabaseDB["Supabase Managed PostgreSQL\n(AWS / PostgREST Engine)"]
    SupabaseS3["Supabase Storage S3-compatible\n(Bucket: portadas)"]

    Client -->|"HTTPS / HTTP2 (HTML, CSS, JS, WebP)"| Vercel
    Vercel -->|"TLS Pooling (Transacciones SQL / PostgREST)"| SupabaseDB
    Client -->|"Direct Upload (Solo autenticado en /admin / WebP)"| SupabaseS3
    Client -->|"Direct Fetch (Caché CDN de portadas WebP)"| SupabaseS3
```

---

## 2. Stack Tecnológico y Justificación

| Capa / Tecnología | Versión Verificada | Justificación Técnica | Enlace a Decisión |
| :--- | :--- | :--- | :--- |
| **Next.js (App Router)** | `16.3.5` | Renderizado híbrido RSC + SSR para indexación SEO patrimonial masiva sin coste de cliente; optimización Turbopack. | [DEC-005](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/03-arquitectura/decisiones.md#dec-005) |
| **React** | `19.2.8` | Soporte nativo para Server Actions, transiciones concurrentes y streaming de HTML con `Suspense`. | [DEC-005](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/03-arquitectura/decisiones.md#dec-005) |
| **Tailwind CSS** | `^4.0.0` | Arquitectura de estilos CSS sin JavaScript en tiempo de ejecución, variables CSS nativas y renderizado ultrarrápido para diseño neo-brutalista. | [sistema-visual.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/04-diseno/sistema-visual.md) |
| **TypeScript** | `^5` | Tipado estricto de entidades fonográficas derivadas de la base de datos para prevenir inconsistencias de catálogo. | [requisitos.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/02-requisitos/requisitos.md#rnf-005) |
| **Supabase SSR** | `@supabase/ssr` `^0.5.2` | Manejo seguro de sesiones y cookies tanto en Server Components como en Client Components sin fugas de credenciales. | [seguridad-y-datos.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/06-calidad/seguridad-y-datos.md) |
| **PostgreSQL (Supabase)** | `15+` | Integridad referencial con restricciones `CHECK`, disparadores de negocio y funciones PL/pgSQL recursivas para grafos. | [DEC-001](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/03-arquitectura/decisiones.md#dec-001), [DEC-003](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/03-arquitectura/decisiones.md#dec-003) |
| **HTML5 Canvas API** | Nativo del navegador | Pipeline cliente de compresión WebP sin dependencias pesadas en Node.js (Sharp/Jimp) ni costos de cómputo en Vercel. | [DEC-004](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/03-arquitectura/decisiones.md#dec-004) |

---

## 3. Componentes y Responsabilidades

| Componente / Módulo | Responsabilidad Principal | Depende de | Prohibido que dependa de | Ruta en el Código |
| :--- | :--- | :--- | :--- | :--- |
| **App Shell & Layout** | Estructura común, metadatos raíz, navbar brutalista y footer institucional. | `src/lib/utils.ts`, `globals.css` | Supabase Client directo (debe mantenerse agnóstico de sesión). | [`src/app/layout.tsx`](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/src/app/layout.tsx) |
| **Módulo Álbumes** | Vistas de detalle de LP/Single, tracklist de surcos A/B, visualizador de galletas y créditos. | `src/features/temas`, `@supabase/ssr` server | Componentes interactivos de DJ (`match-bpm`). | [`src/app/album/`](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/src/app/album), [`src/features/albumes`](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/src/features/albumes) |
| **Módulo Match BPM** | Motor interactivo de mezcla armónica, rueda Camelot y filtrado de temas compatibles. | `src/features/camelot`, `src/types/domain.ts` | Lógica de mutación o escritura en base de datos. | [`src/app/match-bpm/`](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/src/app/match-bpm), [`src/features/camelot`](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/src/features/camelot) |
| **Módulo Genealogía** | Renderizado del árbol de sesionistas, fundaciones y versiones recursivas mediante RPC. | `src/features/genealogia/services`, Supabase RPC | Manipulación directa del DOM o canvas externo. | [`src/app/genealogia/`](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/src/app/genealogia), [`src/features/genealogia`](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/src/features/genealogia) |
| **Pipeline Storage** | Componente visual `ImageUploader` para redimensionar, comprimir a WebP y cargar a Supabase. | HTML5 Canvas API, `@supabase/ssr` browser | Librerías pesadas de Node.js o procesamiento en SSR. | [`src/features/storage/components/image-uploader.tsx`](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/src/features/storage/components/image-uploader.tsx) |
| **Panel Admin** | Interfaz de edición fonográfica para grupos, álbumes y pistas con protección de ruta. | `@supabase/ssr` browser, `src/features/storage` | Inyección de datos sin validar o scripts externos. | [`src/app/admin/`](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/src/app/admin) |
| **Generador SEO** | Inyección de schemas `MusicAlbum`, `MusicRecording` y `MusicGroup` en formato JSON-LD. | `src/types/domain.ts` | Estado de cliente o componentes con directiva `'use client'`. | [`src/components/seo/`](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/src/components/seo) |

---

## 4. Flujos de Datos y Secuencias Críticas

### 4.1 Carga y Renderizado de Álbum Fonográfico (RSC + SEO)

```mermaid
sequenceDiagram
    autonumber
    actor Usuario
    participant Browser as Navegador Web
    participant RSC as Next.js RSC (/album/[id])
    participant Supabase as Supabase PostgREST
    participant DB as PostgreSQL

    Usuario->>Browser: Navega a /album/102
    Browser->>RSC: HTTP GET /album/102
    activate RSC
    RSC->>Supabase: SELECT * FROM Albumes JOIN Sellos JOIN Tipos WHERE id_album = 102
    RSC->>Supabase: SELECT * FROM Albumes_Temas JOIN Temas WHERE id_album = 102 ORDER BY lado, numero_pista
    activate Supabase
    Supabase->>DB: Ejecuta consulta planificada con índices
    DB-->>Supabase: Retorna registros fonográficos
    deactivate Supabase
    Supabase-->>RSC: Respuestas JSON tipadas
    RSC->>RSC: Genera JSON-LD Schema.org (MusicAlbum + MusicRecording)
    RSC->>RSC: Renderiza HTML estático/dinámico con Tailwind CSS
    RSC-->>Browser: Envía Stream HTML + Metadatos OpenGraph y JSON-LD
    deactivate RSC
    Browser-->>Usuario: Muestra ficha visual de vinilo en < 1.2 segundos
```

### 4.2 Pipeline de Conversión y Carga de Portadas WebP en Cliente

```mermaid
sequenceDiagram
    autonumber
    actor Admin as Catalogador / Admin
    participant Input as ImageUploader (Input File)
    participant Canvas as HTML5 Canvas en Memoria
    participant Client as Supabase Client Browser
    participant Bucket as Supabase Storage Bucket ("portadas")

    Admin->>Input: Selecciona imagen local (ej. portada_original.jpg, 12 MB)
    activate Input
    Input->>Input: Valida tipo MIME inicial (image/jpeg, image/png, image/webp)
    Input->>Canvas: Carga imagen en objeto Image() HTML
    activate Canvas
    Canvas->>Canvas: Calcula dimensiones proporcionales (máx 1600 px ancho/alto)
    Canvas->>Canvas: Dibuja imagen en context2d con suavizado bicúbico
    Canvas->>Canvas: Ejecuta canvas.toBlob('image/webp', 0.90)
    Canvas-->>Input: Retorna Blob binario WebP optimizado (~180 KB)
    deactivate Canvas
    Input->>Client: supabase.storage.from('portadas').upload(nombre_unico.webp, blob)
    activate Client
    Client->>Bucket: HTTP POST /storage/v1/object/portadas (MIME: image/webp)
    activate Bucket
    Bucket->>Bucket: Verifica política RLS y MIME estricto (image/webp)
    Bucket-->>Client: 201 Created (Key guardada)
    deactivate Bucket
    Client-->>Input: URL pública o ruta relativa confirmada
    deactivate Client
    Input-->>Admin: Muestra previsualización inmediata y asocia ruta al formulario
    deactivate Input
```

### 4.3 Consulta Recursiva de Árbol de Versiones (RPC)

```mermaid
sequenceDiagram
    autonumber
    actor DJ as DJ / Investigador
    participant Page as Cliente (/genealogia)
    participant Svc as genealogia-service.ts
    participant RPC as Supabase RPC (get_genealogia_versiones)
    participant DB as PostgreSQL (CTE Recursivo)

    DJ->>Page: Selecciona tema musical (ej. "Cariñito", id_tema = 1)
    Page->>Svc: getGenealogiaVersiones(1)
    Svc->>RPC: POST /rest/v1/rpc/get_genealogia_versiones { p_tema_id: 1 }
    activate RPC
    RPC->>DB: Ejecuta WITH RECURSIVE ArbolVersiones (caso base raíz + caso recursivo hijos)
    activate DB
    DB->>DB: Evalúa NOT (id_tema = ANY(camino)) para evitar ciclos
    DB-->>RPC: Retorna filas ordenadas por nivel y rama
    deactivate DB
    RPC-->>Svc: Array JSON de nodos del grafo
    deactivate RPC
    Svc-->>Page: Entrega árbol normalizado
    Page-->>DJ: Renderiza visualmente el grafo genealógico y versiones registradas
```

---

## 5. Estructura Real de Directorios del Repositorio

La siguiente estructura refleja fielmente el árbol de directorios del proyecto en el commit `04ef58c`:

```text
cumbia-peruana/
├── docs/                               # Sistema documental estricto (v1.0)
│   ├── _sistema/                       # Metadocumentación e instrucciones maestras
│   ├── 01-proyecto/                    # Glosario, presentación y dominio fonográfico
│   ├── 02-requisitos/                  # Requisitos funcionales, no funcionales y flujos
│   ├── 03-arquitectura/                # Arquitectura de software, modelo y contratos
│   ├── 04-diseno/                      # Sistema visual neo-brutalista y pantallas
│   ├── 05-entorno-y-operacion/         # Instalación limpia, entorno y despliegue
│   ├── 06-calidad/                     # Pruebas, rendimiento y seguridad de datos
│   ├── 07-gestion/                     # Git, roadmap, changelog y catálogo de skills
│   ├── datos-investigacion/            # Hoja de cálculo ODS de catalogación de campo
│   └── sql-referencia/                 # DDL estructural y esquemas PostgreSQL
├── src/                                # Código fuente de la aplicación Next.js
│   ├── app/                            # Rutas App Router (Next.js 16)
│   │   ├── admin/                      # Panel de administración y catálogo (/admin)
│   │   │   ├── grupo/                  # Edición de agrupaciones musicales
│   │   │   │   └── [id]/page.tsx       # Formulario de edición por agrupación
│   │   │   ├── login/                  # Inicio de sesión administrativo
│   │   │   ├── layout.tsx              # Shell y verificación de sesión admin
│   │   │   └── page.tsx                # Dashboard general de catalogación
│   │   ├── album/                      # Fichas discográficas detalladas
│   │   │   └── [id]/                   # Ruta dinámica por id de álbum
│   │   │       ├── loading.tsx         # Esqueleto de carga visual (Skeleton)
│   │   │       ├── opengraph-image.tsx # Generador dinámico de tarjeta OpenGraph
│   │   │       └── page.tsx            # Página RSC de detalle fonográfico
│   │   ├── blog/                       # Artículos y notas de investigación musicológica
│   │   │   ├── [slug]/page.tsx         # Detalle de artículo histórico
│   │   │   └── page.tsx                # Índice general de publicaciones
│   │   ├── genealogia/page.tsx         # Explorador interactivo de grafos de músicos
│   │   ├── match-bpm/page.tsx          # Consola DJ de mezcla armónica y rueda Camelot
│   │   ├── nosotros/page.tsx           # Manifiesto fundacional y criterios de archivo
│   │   ├── radar/page.tsx              # Radar sonoro de estilos y sellos por época
│   │   ├── vinilos/                    # Catálogo discográfico general
│   │   │   ├── loading.tsx             # Indicador de streaming de colección
│   │   │   └── page.tsx                # Grilla de vinilos con filtros rápidos
│   │   ├── error.tsx                   # Límite de captura de errores en cliente
│   │   ├── globals.css                 # Importación de Tailwind CSS v4 y tokens
│   │   ├── layout.tsx                  # Layout maestro de toda la aplicación
│   │   ├── not-found.tsx               # Vista 404 personalizada neo-brutalista
│   │   └── page.tsx                    # Portada (Home) de alto impacto visual
│   ├── components/                     # Componentes UI transversales y reutilizables
│   │   ├── seo/                        # Componentes inyectores de JSON-LD Schema.org
│   │   └── ui/                         # Botones, tarjetas y contenedores brutalistas
│   ├── features/                       # Módulos organizados por dominio funcional
│   │   ├── albumes/                    # Lógica de presentación y componentes de vinilos
│   │   ├── camelot/                    # Rueda armónica SVG y cálculo de claves
│   │   ├── genealogia/                 # Componentes y servicios del grafo musical
│   │   │   ├── components/             # Modales y exploradores del árbol
│   │   │   └── services/               # Clientes Supabase SSR (client y server)
│   │   ├── home-brutalism/             # Secciones específicas de la portada brutalista
│   │   ├── home-retro/                 # Widgets auxiliares (command palette, radar)
│   │   ├── storage/                    # Pipeline multimedia de portadas (ImageUploader)
│   │   └── temas/                      # Tablas de tracklist para vinilos y surcos
│   ├── lib/                            # Utilidades de infraestructura y clientes base
│   │   ├── services/archive-stats.ts   # Métricas y estadísticas de catálogo
│   │   ├── supabase/                   # Configuración del cliente Supabase
│   │   │   ├── client.ts               # Cliente para Client Components (Browser)
│   │   │   └── server.ts               # Cliente para Server Components (Cookies/RSC)
│   │   └── utils.ts                    # Helpers de formato, clases y tiempo
│   └── types/                          # Definiciones de tipos TypeScript del sistema
│       ├── blog.ts                     # Interfaces de artículos editoriales
│       ├── database.ts                 # Tipos automáticos de tablas de Supabase
│       └── domain.ts                   # Tipos de dominio musicológico y Camelot
├── scripts/                            # Scripts Node.js para ingesta y mantenimiento
├── public/                             # Recursos estáticos servidos en la raíz
├── package.json                        # Manifiesto de dependencias npm
├── tsconfig.json                       # Configuración de compilador TypeScript
└── next.config.ts                      # Configuración de compilación Next.js
```

---

## 6. Estado y Persistencia

| Tipo de Dato | Dónde Vive | Formato / Motor | Versión / Estrategia | Política de Respaldo |
| :--- | :--- | :--- | :--- | :--- |
| **Metadatos Fonográficos** | Supabase Cloud | Tablas relacionales PostgreSQL | Esquema estructural v1.0 ([estructural.sql](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/sql-referencia/estructural.sql)) | Copias diarias automáticas en Supabase y volcados DDL en git. |
| **Arte Gráfico (Portadas)** | Supabase Storage | Archivos binarios `image/webp` | Compresión local (calidad 0.90, máx 1600 px) | Almacenamiento distribuido S3 con versionado de archivos. |
| **Caché de Renderizado** | Vercel Edge / Node | Memoria de servidor RSC | Next.js Data Cache con revalidación bajo demanda | Volátil; se reconstituye automáticamente desde PostgreSQL. |
| **Sesión Administrativa** | Navegador (Cookies) | JWT seguro (HttpOnly, Secure) | Supabase Auth sesión PKCE | Gestionada por tokens de refresco en Supabase Auth. |
| **Investigación de Campo** | Directorio local del proyecto | Formato ODS (OpenDocument) | Archivo `docs/datos-investigacion/Datos BD.ods` | Versionado manual y commit periódico en repositorio Git. |

---

## 7. Concurrencia y Manejo de Recursos

1. **Concurrencia en Consultas Web:**
   - La capa pública de consulta es estrictamente de lectura (`SELECT`).
   - Las conexiones a Supabase desde Vercel utilizan el pooler transaccional de PostgREST, garantizando hasta cientos de lecturas concurrentes sin saturar los procesos de PostgreSQL.
2. **Consultas Complejas y Paralelismo:**
   - En componentes RSC donde se requieren datos de cabecera de álbum y su tracklist, se utiliza `Promise.all` para disparar las lecturas en paralelo, evitando cascadas de red (*waterfalls*).
   - Las funciones RPC recursivas (`get_genealogia_versiones`) ejecutan la búsqueda jerárquica dentro del motor PostgreSQL mediante CTEs en memoria, transfiriendo un único payload compacto al cliente.
3. **Manejo de Carga Multimedia:**
   - La compresión de imágenes se delega al procesador local del cliente mediante la Canvas API antes del envío. Esto elimina la necesidad de workers pesados en el backend y protege la CPU de la instancia serverless de Vercel.

---

## 8. Manejo de Errores y Registro (Logging)

- **Límites de Error en UI (`error.tsx`):** La ruta raíz y subrutas críticas cuentan con boundaries de React que capturan excepciones no controladas en tiempo de ejecución, mostrando una pantalla de error con estilo neo-brutalista y botón de reintento sin romper toda la interfaz.
- **Rutas Inexistentes (`not-found.tsx`):** Toda petición a un álbum, grupo o slug que retorne `null` desde Supabase activa la función `notFound()` de Next.js, presentando una página 404 estandarizada y rastreable.
- **Registro en Consola y Producción:** Los errores de llamadas PostgREST o Supabase Storage se capturan en bloques `try/catch` estructurados y se registran en los logs de ejecución de Vercel con el contexto de la entidad fallida (`id_album`, `id_tema`).

---

## 9. Restricciones Arquitectónicas Inviolables

Todo cambio o extensión en el código debe acatar de manera estricta las siguientes reglas:

1. **Restricción de Soporte Físico:** Ninguna consulta, mutación o interfaz admitirá lados distintos a `'A'` o `'B'` para discos de vinilo (`INV-001`, [DEC-001](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/03-arquitectura/decisiones.md#dec-001)).
2. **Formato Exclusivo Multimedia:** Ninguna imagen puede ser subida al storage si su formato no es `image/webp` sanitizado ([DEC-004](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/03-arquitectura/decisiones.md#dec-004)).
3. **Cero Dependencias de Audio Ilegal:** Queda terminantemente prohibido almacenar archivos de audio comercial (`.mp3`, `.wav`, `.flac`) en el servidor o en Supabase Storage (`INV-005`).
4. **Separación de Lados y Mosaicos:** Todo surco continuo que contenga más de una composición debe modelarse como `es_mosaico = TRUE` y desglosarse en `Mosaicos_Temas` (`INV-002`, [DEC-002](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/03-arquitectura/decisiones.md#dec-002)).
5. **Aislamiento de Clientes Supabase:** Los Server Components (`RSC`) deben utilizar exclusivamente el cliente de `src/lib/supabase/server.ts`; los Client Components deben utilizar exclusivamente `src/lib/supabase/client.ts`.

---

## 10. Puntos de Extensión

- **Adición de Nuevos Módulos Funcionales:** Se deben crear dentro de `src/features/<nuevo-modulo>/` con la estructura canónica `components/`, `services/` e `index.ts` público para encapsular la lógica antes de exponerla en `src/app/`.
- **Integración con Canales Externos (YouTube / Spotify):** Previsto en la arquitectura como enriquecimiento de metadatos mediante campos de enlace (`youtube_url`, `spotify_playlist_id`) sin almacenar binarios en la plataforma.
- **Nuevas Funciones Analíticas SQL:** Cualquier cálculo recursivo o de agregación masiva debe implementarse como procedimiento almacenado `SECURITY DEFINER` o función `STABLE` en PostgreSQL e invocarse mediante `supabase.rpc()`.

---

## 11. Límites Conocidos y Trampas Comunes

- **Confusión de Clientes Supabase:** Importar el cliente de navegador en un Server Component romperá el renderizado en servidor al intentar acceder a la API `window`.
- **N+1 en Listados de Vinilos:** Consultar los temas de cada álbum dentro de un bucle `map` en el cliente satura el pool de conexiones; los tracklists deben consultarse únicamente en la vista de detalle o unificarse en una única consulta agregada.
- **Archivos No WebP:** Intentar subir directamente un `.jpg` sin pasar por el `ImageUploader` fallará con un error `403 Forbidden` debido a la política de almacenamiento configurada en Supabase Storage.

---

## 12. Actualizar Cuando

- Se actualicen las versiones de Next.js, React o Supabase.
- Se agregue un nuevo módulo funcional dentro de `src/features/`.
- Se modifique la estrategia de almacenamiento o procesamiento de imágenes.
- Se implemente una nueva política arquitectónica de rendimiento o caché.
