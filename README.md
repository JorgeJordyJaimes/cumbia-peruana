# 🪗 Kumbia Sound: Archivo Integral de la Cumbia Peruana (1968–2005)

Plataforma web de rescate patrimonial, catalogación fonográfica pericial, genealogía de sesionistas y herramientas acústicas para DJs (BPM exacto y rueda Camelot) sobre la era dorada de la cumbia grabada en el Perú.

---

## 🏛️ Sistema Documental Canónico

La documentación oficial del proyecto opera bajo el estándar **Docs-as-Code** estructurado en [`docs/`](docs/):

- 🧭 **[Mapa Maestro de Documentación](docs/README.md):** Índice general y correspondencia de fuentes únicas de verdad.
- 📜 **[Dominio Fonográfico e Invariantes](docs/01-proyecto/dominio.md):** Reglas materiales de prensaje analógico (`INV-001` a `INV-010`).
- 🏛️ **[Arquitectura de Software y Pipeline](docs/03-arquitectura/arquitectura.md):** Next.js 16 (RSC), Supabase PostgreSQL y compresión WebP en cliente.
- 🗄️ **[Modelo de Datos y Diccionario](docs/03-arquitectura/modelo-de-datos.md):** Diagrama E-R, tablas, restricciones y mapeos de catalogación.
- 🎨 **[Sistema de Diseño Neo-Brutalista](docs/04-diseno/sistema-visual.md):** Estética de archivo desclasificado, tokens CSS y componentes periciales.
- 🤖 **[Directivas para Agentes de IA](AGENTS.md):** Reglas operativas mandatorias, gate de verificación y flujo Git.

---

## 🚀 Puesta en Marcha en 3 Pasos

### 1. Clonar e Instalar Dependencias
```bash
git clone https://github.com/tu-usuario/cumbia-peruana.git
cd cumbia-peruana
npm install
```

### 2. Configurar Variables de Entorno (`.env.local`)
Cree un archivo `.env.local` en la raíz con sus credenciales de Supabase:
```ini
NEXT_PUBLIC_SUPABASE_URL=https://<tu-proyecto>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsIn...
```

### 3. Iniciar el Servidor de Desarrollo
```bash
npm run dev
```
Abra [http://localhost:3000](http://localhost:3000) en su navegador.

---

## 🛠️ Stack Tecnológico

- **Frontend:** Next.js 16.3.5 (App Router, Turbopack) + React 19.2.8 + TypeScript 5
- **Estilos:** Tailwind CSS v4 (Diseño Neo-Brutalista Editorial y fuentes Anton / Cooper / Geist)
- **Backend & Datos:** Supabase Cloud (PostgreSQL 15+, PostgREST, Funciones RPC recursivas y Storage WebP)
- **SEO Semántico:** Schema.org JSON-LD (`MusicAlbum`, `MusicRecording`, `MusicGroup`)
- **Alojamiento:** Vercel Edge Network
