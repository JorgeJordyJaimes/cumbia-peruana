# 06 · Estrategia de Pruebas, Puerta de Verificación y Control de Calidad

> **Propósito:** Definir los criterios de calidad, la puerta de verificación previa a confirmar cambios de código, los guiones de pruebas manuales y el estado de la cobertura de pruebas.
> **Responde a:**
> - ¿Qué comandos deben ejecutarse de manera obligatoria antes de realizar cualquier commit o pull request?
> - ¿Cómo se validan manualmente los flujos críticos de la aplicación (`UC-001` a `UC-004`)?
> - ¿Cuáles son los criterios de aceptación para declarar una tarea o corrección como "terminada"?
> - ¿Cuál es la deuda técnica actual respecto a pruebas unitarias y de integración automatizadas?
> **Fuente principal de:** Puerta de verificación técnica previa a commit, guiones de prueba manual paso a paso y criterios de completitud de código.
> **No contiene (ver):**
> - Requisitos funcionales y criterios de aceptación formales → [requisitos.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/02-requisitos/requisitos.md)
> - Flujos de usuario de negocio → [flujos-de-usuario.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/02-requisitos/flujos-de-usuario.md)
> - Métricas y auditorías de velocidad y renderizado → [rendimiento.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/06-calidad/rendimiento.md)
> **Depende de:**
> - [requisitos.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/02-requisitos/requisitos.md)
> - [flujos-de-usuario.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/02-requisitos/flujos-de-usuario.md)
> **Entregar a otra IA para:** Escribir suites de pruebas automatizadas (Playwright / Vitest), auditar la cobertura de requisitos o ejecutar revisiones de regresión.
> **Estado:** VIGENTE · **Última revisión:** 2026-10-31 · **Describe la versión:** commit 04ef58c

---

## 1. Puerta de Verificación Previa a Confirmar Cambios (Gate Mandatorio)

Todo agente o desarrollador que modifique archivos de código en el proyecto debe ejecutar de forma secuencial la siguiente lista exacta de comandos en su terminal local. Si alguno de los tres comandos falla, el cambio **no puede ser confirmado en Git**:

```bash
# Paso 1: Verificación estricta de tipos de TypeScript (sin emitir archivos)
npx tsc --noEmit

# Paso 2: Análisis estático de código y reglas de Next.js
npm run lint

# Paso 3: Compilación completa de producción (Turbopack)
npm run build
```

### 1.1 Criterios de Aceptación del Gate
1. `npx tsc --noEmit` debe finalizar con código de salida `0` y cero errores de tipos.
2. `npm run lint` no debe arrojar advertencias ni errores de directivas de React 19 o hooks desalineados.
3. `npm run build` debe generar todas las páginas estáticas y dinámicas en `.next/` exitosamente.

---

## 2. Mapa de Cobertura de Requisitos y Estado de Pruebas

| Requisito | Tipo de Prueba Actual | Herramienta / Método | Estado de Cobertura | Deuda Técnica Asociada |
| :--- | :--- | :--- | :--- | :--- |
| `RF-001` (Catálogo Vinilos) | Manual | Guion `UC-001` en navegador | `PARCIAL` | Requiere suite E2E Playwright. |
| `RF-002` (Lados A/B) | Integración DDL + Manual | Constraint PostgreSQL + Guion `UC-001` | `IMPLEMENTADO` | Probado en nivel DDL y UI. |
| `RF-003` (Mosaicos) | Integración DDL + Manual | Constraint PostgreSQL + Guion `UC-001` | `IMPLEMENTADO` | Probado con popurrís de prueba. |
| `RF-004` (Camelot Match) | Manual | Guion `UC-002` en `/match-bpm` | `PARCIAL` | Falta test unitario de Rueda Camelot (`TD-001`). |
| `RF-006` (WebP Uploader) | Manual | Guion `UC-004` en `/admin` | `IMPLEMENTADO` | Comprobado con JPGs reales > 5 MB. |
| `RF-007` (Schema.org SEO)| Manual / Inspección | Google Rich Results Test | `IMPLEMENTADO` | Validador JSON-LD verificado. |

---

## 3. Guion de Pruebas Manuales por Flujo de Usuario

Para cambios que afecten la interfaz gráfica o la lógica de negocio, se deben ejecutar los siguientes guiones:

### 3.1 Guion de Prueba `UC-001`: Consulta de Prensaje y Surcos Físicos
1. Navegar a `http://localhost:3000/vinilos`.
2. Escribir *"Celeste"* en la barra de búsqueda y filtrar por formato *"LP"*.
3. Hacer clic en el álbum *"El Hijo de Nadie"*.
4. Verificar que se abra la ficha en `/album/[id]` con la portada WebP nítida.
5. Comprobar que existen dos pestañas físicas: **Lado A** y **Lado B**.
6. Hacer clic en **Lado B** y verificar que la pestaña se fusiona con la tabla sin línea divisoria y que los números de pista comiencen en `B1`.
7. Verificar que cada canción muestre su duración en formato `MM:SS`, su BPM y su clave Camelot (ej. `8A`).

### 3.2 Guion de Prueba `UC-002`: Consola DJ y Mezcla Armónica
1. Navegar a `http://localhost:3000/match-bpm`.
2. Hacer clic en la clave `8A` en la Rueda Camelot interactiva SVG.
3. Desplazar el slider de tolerancia de BPM a `±4%`.
4. Verificar que la tabla inferior se actualice inmediatamente mostrando únicamente canciones en claves compatibles (`8A`, `7A`, `9A`, `8B`).
5. Verificar que el indicador de pitch muestre los porcentajes en verde si acelera o en rojo si frena.

### 3.3 Guion de Prueba `UC-004`: Pipeline de Conversión WebP en `/admin`
1. Iniciar sesión administrativa en `/admin/login`.
2. Acceder a un álbum y hacer clic en el componente `ImageUploader`.
3. Seleccionar una imagen de prueba en formato `.jpg` o `.png` de más de 3 MB.
4. Verificar que el componente intercepte la imagen, muestre la etiqueta *"Comprimiendo a WebP..."* y reporte el peso reducido (ej. `180 KB - reducción del 92%`).
5. Confirmar que la previsualización se renderice al instante y que la imagen cargue correctamente desde Supabase Storage.

---

## 4. Deuda Técnica Conocida de Calidad (`TD-001`)

- **`TD-001` (Ausencia de Tests Unitarios Automatizados):** Actualmente el proyecto confía en el tipado estricto de TypeScript (`tsc --noEmit`), el linter de Next.js y los constraints a nivel de base de datos PostgreSQL, complementados por guiones de prueba manuales. Se encuentra en el backlog implementar una suite de pruebas unitarias para el motor de compatibilidad Camelot (`src/features/camelot`) y pruebas de integración E2E con Playwright.

---

## 5. Actualizar Cuando

- Se incorpore una librería de pruebas automatizadas (Vitest, Jest, Playwright).
- Se agregue un nuevo paso obligatorio a la puerta de verificación previa a commit.
- Se introduzca una nueva pantalla crítica con su correspondiente guion de prueba manual.
