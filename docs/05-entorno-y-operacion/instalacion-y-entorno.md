# 05 · Guía de Instalación y Configuración del Entorno Local

> **Propósito:** Proveer las instrucciones exhaustivas para clonar, configurar dependencias, inicializar variables de entorno y ejecutar el proyecto Kumbia Sound en una máquina limpia sin asistencia externa.
> **Responde a:**
> - ¿Qué versiones exactas de Node.js, npm y herramientas se requieren para ejecutar el proyecto?
> - ¿Qué variables de entorno son obligatorias en `.env.local` y cómo se obtienen?
> - ¿Cómo se inicializa y puebla la base de datos de Supabase con los datos maestros mediante `npm run db:poblar`?
> - ¿Cómo se resuelven los errores frecuentes de conexión, compilación o políticas de storage?
> **Fuente principal de:** Pasos de instalación local, configuración de `.env.local`, comandos de ciclo de vida (`npm run ...`) y tabla de resolución de problemas.
> **No contiene (ver):**
> - Configuración de despliegue en producción en Vercel → [despliegue.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/05-entorno-y-operacion/despliegue.md)
> - Comandos de la puerta de verificación previa a commit → [pruebas.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/06-calidad/pruebas.md)
> - Políticas RLS y autenticación administrativa → [seguridad-y-datos.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/06-calidad/seguridad-y-datos.md)
> **Depende de:**
> - [arquitectura.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/03-arquitectura/arquitectura.md)
> - [modelo-de-datos.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/03-arquitectura/modelo-de-datos.md)
> **Entregar a otra IA para:** Configurar un contenedor de desarrollo (Docker/DevContainer), automatizar pipelines de CI o resolver incidencias de instalación en nuevos entornos.
> **Estado:** VIGENTE · **Última revisión:** 2026-10-31 · **Describe la versión:** commit 04ef58c

---

## 1. Matriz de Compatibilidad

| Sistema Operativo | Versión Soportada | Estado de Verificación | Notas de Compatibilidad |
| :--- | :--- | :--- | :--- |
| **Windows** | 10 / 11 (x64) | `VIGENTE` (Entorno actual) | PowerShell 5.1+ o PowerShell Core 7+. Rutas relativas compatibles. |
| **macOS** | 13+ (Ventura, Sonoma, Sequoia) | `COMPATIBLE` | Probado sobre Apple Silicon (M1/M2/M3) y arquitectura Intel. |
| **Linux** | Ubuntu 22.04+ / Debian 12+ | `COMPATIBLE` | Requiere Node.js 20 LTS instalado vía nvm o NodeSource. |

---

## 2. Requisitos Previos y Herramientas

| Herramienta | Versión Requerida | Comando de Verificación | Método de Instalación Recomendado |
| :--- | :--- | :--- | :--- |
| **Node.js** | `>= 20.9.0` (LTS recomendado) | `node --version` | Vía [nodejs.org](https://nodejs.org/) o administrador de versiones `nvm`. |
| **npm** | `>= 10.0.0` | `npm --version` | Incluido de forma nativa con Node.js. |
| **Git** | `>= 2.30.0` | `git --version` | Vía [git-scm.com](https://git-scm.com/) o `winget install Git.Git`. |
| **Supabase CLI** | `>= 1.140.0` (opcional/migraciones)| `supabase --version` | `npm install -g supabase` o `scoop install supabase`. |

---

## 3. Variables de Entorno y Configuración Local

El proyecto requiere un archivo `.env.local` en la raíz del repositorio (`cumbia-peruana/.env.local`).

| Variable de Entorno | Obligatoria | Entorno | Valor Ejemplo (Sin Secretos) | Propósito y Lectura en Código |
| :--- | :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | Sí | Local / Prod | `https://xyzcompany.supabase.co` | URL base del proyecto Supabase. Leída en `src/lib/supabase/client.ts` y `server.ts`. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Sí | Local / Prod | `eyJhbGciOiJIUzI1NiIsIn...` | Clave anónima pública con restricciones RLS. Leída en clientes Supabase. |
| `SUPABASE_ACCESS_TOKEN` | Sí (scripts) | Local (Solo ingesta)| `sbp_0123456789abcdef...` | Token personal de acceso Supabase. Leído por `scripts/poblar-db.mjs`. |

---

## 4. Pasos de Instalación en Máquina Limpia

Ejecute la siguiente secuencia numerada de comandos en su terminal:

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/cumbia-peruana.git
cd cumbia-peruana

# 2. Instalar dependencias exactas
npm install

# 3. Configurar variables de entorno
# Cree el archivo .env.local y configure las tres claves indicadas en la sección 3:
# NEXT_PUBLIC_SUPABASE_URL=...
# NEXT_PUBLIC_SUPABASE_ANON_KEY=...
# SUPABASE_ACCESS_TOKEN=...

# 4. Poblar datos iniciales maestros en Supabase (si es una instancia limpia)
npm run db:poblar

# 5. Iniciar el servidor de desarrollo local (Turbopack)
npm run dev
```

* **Salida Esperada al iniciar `npm run dev`:**
  ```text
  ▲ Next.js 16.3.5 (Turbopack)
  - Local:        http://localhost:3000
  - Environments: .env.local
  ✓ Ready in 1.4s
  ```
* **Tiempo estimado de configuración total:** Menos de 4 minutos en una conexión de banda ancha estándar.

---

## 5. Comandos de Operación y Ciclo de Vida

| Comando | Acción Ejecutada | Tiempo Aproximado |
| :--- | :--- | :--- |
| `npm run dev` | Inicia el servidor de desarrollo local con recarga rápida. | ~1.5 s |
| `npm run build` | Compila y optimiza la aplicación para producción (Turbopack). | ~25 s |
| `npm run start` | Arranca el servidor de producción local tras un build previo. | ~1.0 s |
| `npm run lint` | Ejecuta ESLint sobre todo el árbol de código en `src/`. | ~6 s |
| `npm run db:poblar` | Ejecuta la ingesta secuencial de datos SQL hacia Supabase. | ~15 s |
| `npx tsc --noEmit` | Verifica el tipado estricto de TypeScript sin generar archivos. | ~8 s |

---

## 6. Resolución de Problemas Frecuentes

| Síntoma / Mensaje de Error | Causa Probable | Solución Paso a Paso |
| :--- | :--- | :--- |
| `Error: No se encontró SUPABASE_ACCESS_TOKEN` | El script `db:poblar` no detecta la variable en el entorno. | Agregue `SUPABASE_ACCESS_TOKEN` en `.env.local` con un token generado en Supabase Dashboard (`Account -> Access Tokens`). |
| `Error: PostgREST 403 Forbidden on upload` | El bucket `portadas` no permite el tipo MIME del archivo enviado. | Asegúrese de utilizar el componente `ImageUploader` que convierte automáticamente la imagen a `image/webp`. |
| `Type error: Property 'musical_key' does not exist on type 'Tema'` | Código desactualizado intentando acceder a tonalidades de círculo de quintas. | Utilice exclusivamente `camelot_code` (`INV-004`). El campo `musical_key` fue eliminado en la migración `20261015000000`. |
| `Hydration failed because the server rendered HTML didn't match client` | Diferencia entre Server Component y Client Component en renderizado de fechas. | Asegúrese de formatear fechas en utilidades puras o aislar componentes dependientes del huso horario del cliente. |

---

## 7. Desinstalación y Reinicio a Cero

Para restablecer el entorno de desarrollo a un estado completamente limpio:

```bash
# 1. Eliminar artefactos de compilación y dependencias
rm -rf node_modules .next

# 2. Reinstalar dependencias de forma limpia
npm install

# 3. Restablecer datos de base de datos a estado base (opcional)
npm run db:poblar -- --reset
```

---

## 8. Actualizar Cuando

- Se actualicen versiones de Node.js, Next.js o dependencias de npm.
- Se agregue o renombre una variable de entorno en `.env.local`.
- Cambie el flujo o las opciones del script `scripts/poblar-db.mjs`.
