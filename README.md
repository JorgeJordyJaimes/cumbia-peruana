# 🪗 Archivo Histórico de la Cumbia Peruana (1968–2005)

Plataforma digital especializada en la preservación discográfica, genealogía musical y consulta técnica de la cumbia grabada en el Perú durante su era dorada y etapas de evolución (1968–2005).

El proyecto combina el rigor musicológico con herramientas de análisis armónico para coleccionistas, investigadores y DJs, modelando con exactitud la realidad del soporte físico (vinilos de 45 RPM, LPs, casetes, CDs y ediciones split).

---

## 🎯 Propósitos del Proyecto

* **🧠 Preservación Cultural y Genealogía Musical:** Mapear la trazabilidad completa de grabaciones: identificar compositores originales, versiones (*covers*), cronología de temas y el árbol genealógico de músicos que formaron parte de múltiples agrupaciones a lo largo del tiempo.
* **🎛️ Herramienta Técnica para DJs:** Proporcionar un motor de búsqueda armónica que cataloga métricas de audio precisas por cada grabación: valores exactos de **BPM**, tonalidad musical estándar y codificación en la **Rueda Camelot** (1A a 12B).
* **🗂️ Fidelidad al Formato Físico:** Documentar lanzamientos respetando la industria discográfica peruana de la época: prensajes en 45 RPM, LPs estándar, splits compartidos por lados (Lado A / Lado B de distintos artistas), reediciones y sellos discográficos emblemáticos (Infopesa, Discos Horóscopo, Sono Radio, El Virrey, etc.).
* **🔍 Rescate Histórico:** Visibilizar agrupaciones y músicos sesionistas que tuvieron producciones reducidas o efímeras, pero cuyo aporte enriqueció el desarrollo de la cumbia costeña, andina, amazónica y psicodélica.

---

## 📚 Modelo de Datos Relacional

A diferencia de una base de datos plana, el sistema utiliza un esquema altamente normalizado en **PostgreSQL** para resolver consultas relacionales complejas:

* **Personas & Músicos:** Biografías, fotos, lugares de nacimiento y créditos por tema con múltiples roles simultáneos (arreglista, primera guitarra, voz, percusión).
* **Grupos & Historial de Membresía:** Agrupaciones, directores, regiones de origen y períodos de vigencia por músico (`desde` / `hasta`).
* **Sellos Discográficos:** Información institucional, país de operación y catálogos asociados.
* **Álbumes & Formatos Físicos:** Identificación de matriz física (LP, 45 RPM, Cassette, CD), números de catálogo, reediciones, relaciones split por lado y carátulas restauradas.
* **Temas & Grabaciones:** Pistas con duración, metadatos para DJ (BPM, Camelot, tonalidad), letras indexadas para búsqueda de texto completo y compositores.
* **Versiones:** Relación directa entre canciones matrices/originales y sus adaptaciones posteriores.

---

## 🛠️ Stack Tecnológico

El proyecto está diseñado bajo una arquitectura modular desacoplada:

* **Frontend:** [Next.js](https://nextjs.org/) (App Router, Server Components y TypeScript) con estilado en [Tailwind CSS](https://tailwindcss.com/) y componentes accesibles de [shadcn/ui](https://ui.shadcn.com/).
* **Diseño UI/UX:** Interfaz *Atmospheric Glassmorphism meets Retro Vinyl Editorial*, inspirada en paneles de catalogación modernos (fondos oscuros, degradados suaves y tipografía display de alta legibilidad).
* **Base de Datos:** [PostgreSQL](https://www.postgresql.org/) alojado en [Supabase](https://supabase.com/), con índices optimizados B-Tree y GIN para búsqueda de letras y mezclas DJ.
* **Almacenamiento Multimedia:** Buckets de Supabase Storage para alojar imágenes de portadas, sellos y músicos procesadas localmente en formato **WebP**.
* **Gestión de Base de Datos e Infraestructura:** Control de versiones mediante migraciones físicas en texto plano (`supabase/migrations/`), garantizando un respaldo auditable dentro del repositorio de GitHub.
* **Despliegue:** [Vercel](https://vercel.com/) con integración continua desde GitHub.

---

## 📁 Estructura del Proyecto

```text
├── src/
│   ├── app/              # Rutas públicas (catálogo, fichas, DJ) y panel de administración
│   ├── features/         # Módulos de dominio (dj-tools, temas, albumes, grupos, storage)
│   ├── components/ui/    # Componentes base reutilizables (shadcn/ui)
│   ├── lib/supabase/     # Clientes de Supabase para navegador y servidor (SSR)
│   └── types/            # Tipos de TypeScript (database.ts y domain.ts)
├── supabase/
│   ├── migrations/       # Migraciones versionadas en SQL (.sql)
│   └── seed.sql          # Catálogos base (Roles, Géneros, Tipos de Álbum)
├── Base de Datos/        # Catálogo histórico documental y esquemas relacionales
└── README.md
```

---

## 🚀 Puesta en Marcha

### 1. Requisitos Previos
* [Node.js](https://nodejs.org/) (v20 o superior).
* Instancia activa en [Supabase](https://supabase.com/).

### 2. Configuración de Variables de Entorno
Copia el archivo de ejemplo y completa tus credenciales:
```bash
cp .env.local.example .env.local
```

Configura las variables correspondientes en `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-clave-anonima
```

### 3. Instalación de Dependencias
```bash
npm install
```

### 4. Servidor de Desarrollo
Inicia el entorno de desarrollo local en `http://localhost:3000`:
```bash
npm run dev
```

### 5. Compilación y Calidad de Código
```bash
# Comprobación de tipos y build de producción
npm run build

# Verificación de linter
npm run lint
```

---

## 📄 Licencia

Este proyecto está distribuido bajo la licencia [MIT](LICENSE).
