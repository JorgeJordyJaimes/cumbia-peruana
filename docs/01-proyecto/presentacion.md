# Presentación del Proyecto: Kumbia Sound

> **Propósito:** Exponer la visión, contexto histórico, propuesta de valor, usuarios, alcance y arquitectura de alto nivel de Kumbia Sound.
> **Responde a:** ¿Qué es Kumbia Sound y por qué existe? ¿A quiénes sirve? ¿Qué resuelve que otras plataformas no pueden? ¿Cuáles son sus límites y no-objetivos?
> **Fuente principal de:** Definición del producto, principios rectores, perfiles de usuario y delimitación de alcance.
> **No contiene (ver):** Términos del dominio → [glosario.md](glosario.md); reglas e invariantes del vinilo → [dominio.md](dominio.md); requisitos funcionales y no funcionales → [../02-requisitos/requisitos.md](../02-requisitos/requisitos.md); arquitectura técnica → [../03-arquitectura/arquitectura.md](../03-arquitectura/arquitectura.md).
> **Depende de:** [glosario.md](glosario.md)
> **Entregar a otra IA para:** Onboarding integral del proyecto, evaluación de alcance, redacción de contenidos editoriales y fundamentación de producto.
> **Estado:** VIGENTE · **Última revisión:** 2026-10-31 · **Describe la versión:** 0.1.0 / commit 04ef58c

---

## 1. Resumen Ejecutivo y Pitch

**Kumbia Sound** es la primera plataforma digital de archivo patrimonial, genealogía discográfica y análisis armónico dedicada íntegramente a la preservación y estudio de la **cumbia peruana** (1968–2005).

> **Pitch:** *El archivo pericial y fonográfico definitivo de la cumbia peruana: documenta quién grabó y cantó realmente en cada surco histórico, ayuda a los coleccionistas a completar las discografías de sus grupos favoritos y dota a los DJs de BPM y notación Camelot para difundir joyas ocultas en mezclas armónicas perfectas.*

---

## 2. Contexto y Motivación

### 2.1. El Problema Histórico
Durante la época de oro de la cumbia en el Perú (décadas de 1970 y 1980), la industria musical operaba bajo prácticas que invisibilizaron sistemáticamente la autoría y la participación de los músicos:
1. **Contratos leoninos y "Piratería Blanca":** Sellos rivales grababan a los mismos sesionistas bajo seudónimos en galleta para eludir cláusulas de exclusividad.
2. **Prensajes físicos sin trazabilidad:** Múltiples tirajes de 45 RPM y LPs no acreditaban a los cantantes solistas o los confundían con los directores de grupo.
3. **Pérdida de la memoria material:** El deterioro de fundas, matrices y cintas máster amenaza con extinguir la información técnica exacta de los surcos originales.

### 2.2. Por qué las Alternativas Existentes no Bastan
* **Discogs / MusicBrainz:** Son bases de datos genéricas globales que no modelan las peculiaridades de la fonografía peruana (como el desglose de mosaicos de un solo surco sin romper el conteo de pistas físicas, la estricta dualidad Lado A / Lado B, o el aislamiento de seudónimos autorales frente a identidades reales).
* **Spotify / Apple Music:** Plataformas comerciales de streaming que muestran únicamente reediciones digitales comprimidas, con fechas erróneas (frecuentemente asignan "2015" o "2020" a vinilos de 1974), créditos nulos de sesionistas y nula información técnica de mezcla.
* **YouTube:** Repositorio fragmentado con ripeos de calidad desigual, sin metadatos estructurados ni cronología verificable.

---

## 3. Propuesta de Valor y Principios Rectores

Kumbia Sound no es un clon de Discogs: es una obra de rescate cultural especializada en un género matriz que articula tres ejes:

1. **Rigor Pericial Fonográfico:** Cada dato parte de la auditoría visual y acústica del disco físico (galletas, surco muerto, número de catálogo y matriz).
2. **Trazabilidad de la Voz y la Sesión:** Resuelve con exactitud **quién cantó** y **quién tocó** en cada corte sonoro, diferenciando al compositor del cantante y al director de los músicos de planta.
3. **Divulgación Activa mediante Herramientas DJ:** Pone la musicología al servicio de las pistas de baile: cada tema se cataloga con su **BPM medido** y su **código Camelot**, facilitando a selectores y DJs la creación de sesiones armónicas para dar a conocer agrupaciones y temas olvidados.
4. **Estética de Archivo Desclasificado:** Interfaz neo-brutalista inspirada en legajos periciales y expedientes bajo custodia de las décadas de 1970 y 1980.
5. **Cero Distribución Ilegal de Audio:** Protege el valor documental e intelectual: el archivo custodia metadatos, letras y carátulas periciales de alta fidelidad, **sin distribuir archivos de audio completos protegidos por derechos de autor**.

---

## 4. Perfiles de Usuario

| Perfil | Quién es | Qué necesita en la plataforma | Entorno y Nivel Técnico |
| :--- | :--- | :--- | :--- |
| **Coleccionista Fonográfico** | Poseedor o buscador de vinilos de 45 RPM, LPs y casetes históricos. | Consultar cronologías discográficas completas para saber qué prensajes le faltan para completar la colección de una agrupación. | Desktop / Móvil en ferias de vinilo; nivel técnico medio. |
| **DJ y Selector Musical** | DJ profesional o aficionado de cumbia, vinilo y tropical bass. | Buscar temas compatibles en tempo (BPM) y tono armónico (Camelot) para armar sets continuos sin disonancias. | Laptop / iPad en cabina de mezcla o preparación; nivel técnico alto. |
| **Investigador Musicológico** | Historiador, periodista musical o académico cultural. | Rastrear la genealogía de covers (árbol de versiones), directores fundadores y movimientos de sesionistas entre orquestas. | Desktop; análisis profundo de grafos y metadatos periciales. |
| **Curador / Administrador** | Propietario e investigadores que catalogan datos. | Gestionar fichas técnicas, subir portadas optimizadas a WebP y redactar crónicas históricas. | Desktop; panel `/admin` con autenticación. |

---

## 5. Alcance del Sistema

### 5.1. Lo que el Sistema HACE (Objetivos Activos)
* Catálogo interactivo de lanzamientos discográficos filtrable por sello, formato físico (45 RPM, LP, EP, Casete, CD), década y vertiente.
* Ficha técnica pericial de cada disco con visualización de Lado A y Lado B, galletas giratorias (*VinylSpinner*) y créditos desglosados.
* Identificación estricta de vocalistas solistas en cada tema mediante `Tema_Musicos`.
* Desglose relacional de mosaicos y popurrís (`Mosaicos_Temas`) sin alterar el conteo de pistas físicas.
* Grafo genealógico de músicos (bandas fundadas, orquestas integradas, créditos de sesión y composiciones).
* Genealogía recursiva de versiones/covers de canciones mediante procedimiento almacenado en PostgreSQL (`WITH RECURSIVE`).
* Motor de compatibilidad DJ armónica en `/match-bpm` con rueda Camelot interactiva.
* Panel administrativo para curaduría y subida de carátulas convertidas automáticamente a WebP en el navegador.

### 5.2. Lo que el Sistema NO HACE (No-Objetivos Explícitos)
* **No es una plataforma de streaming o descarga ilegal de MP3:** No aloja ni distribuye archivos completos de audio comercial.
* **No es una tienda de venta de discos (e-commerce):** No procesa transacciones monetarias, carritos de compra ni pasarelas de pago.
* **No admite formatos ni lados ficticios:** No modela Lados C o D en el período 1968–2005.
* **No altera las identidades reales por seudónimos:** Las personas se registran con su identidad verificada; los alias viven exclusivamente en los atributos de crédito.

---

## 6. Estado Actual del Proyecto

* **Versión:** `0.1.0` (Fase de consolidación de catálogo histórico).
* **Catálogo cargado:** Discografía completa de **Grupo Celeste** (37 sencillos de 45 RPM y 6 LPs de 33 RPM: 109 temas únicos, 136 pistas físicas, 101 créditos de voz, 13 segmentos de mosaico, 22 géneros y 16 roles).
* **Infraestructura:** Supabase PostgreSQL con migraciones y RLS activo, Next.js 16 App Router con Turbopack desplegado en Vercel.

---

## 7. Stack Tecnológico Resumido

| Capa | Tecnología | Rol en el Sistema |
| :--- | :--- | :--- |
| **Frontend Framework** | Next.js 16.3.5 (React 19.2.8) | App Router, Server Components para SEO y Client Components para herramientas interactivas. |
| **Estilos & UI** | Tailwind CSS v4 + Radix UI | Sistema de diseño neo-brutalista editorial con tokens ortogonales. |
| **Base de Datos** | PostgreSQL 15+ (Supabase) | Esquema relacional fonográfico, funciones RPC recursivas e índices GIN de texto completo. |
| **Data API & Auth** | Supabase PostgREST & Auth | Acceso tipado desde servidor y cliente con RLS estricto y cookies SSR. |
| **Multimedia** | Supabase Storage + HTML5 Canvas API | Almacenamiento restringido a `image/webp` con pipeline de compresión en cliente. |
| **Hosting & Monitoreo** | Vercel | Despliegue continuo desde rama `main` y métricas de `@vercel/analytics`. |

*(Para requisitos de versiones y comandos de instalación, consultar [../05-entorno-y-operacion/instalacion-y-entorno.md](../05-entorno-y-operacion/instalacion-y-entorno.md))*.

---

## 8. Mapa de la Documentación

```text
docs/
├── README.md                      # Índice general y mapa de consulta rápida
├── 01-proyecto/                   # Glosario, presentación y reglas del dominio
├── 02-requisitos/                 # Requisitos funcionales, no funcionales y flujos de usuario
├── 03-arquitectura/               # Arquitectura de software, modelo ER, interfaces y decisiones
├── 04-diseno/                     # Sistema visual neo-brutalista y catálogo de pantallas
├── 05-entorno-y-operacion/        # Instalación local, variables de entorno y despliegue
├── 06-calidad/                    # Pruebas, optimizaciones de rendimiento y seguridad RLS
└── 07-gestion/                    # Flujo Git, roadmap de grupos, changelog y problemas conocidos
```

---

## 9. Autoría, Licencia y Derechos

* **Propietario & Curador Principal:** Jordy Jaimes.
* **Código Fuente:** Distribuido bajo licencia [MIT](../../LICENSE).
* **Investigación Fonográfica & Metadatos:** Patrimonio cultural documental compilado con fines educativos, de investigación y divulgación histórica.
* **Material Gráfico Histórico:** Carátulas y sellos de archivo reproducidos bajo doctrina de uso legítimo e informativo sobre soportes históricos descatalogados.

---

## 10. Actualizar cuando
- Se complete la ingesta de una nueva discografía masiva (ej. Los Destellos, Juaneco y su Combo).
- Cambie el alcance de la plataforma (ej. apertura futura a cumbia colombiana o reproductor de muestras).
- Se incorpore un nuevo perfil de usuario o funcionalidad medular.

## 11. Pendientes
- `PEND-001`: Definición de la integración con canal de YouTube y listas curadas de Spotify para recomendaciones mensuales del administrador.
