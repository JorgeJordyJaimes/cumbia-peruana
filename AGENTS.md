# Directivas Operativas e Inviolables para Agentes de IA · Kumbia Sound

> **Ámbito de Aplicación:** Todos los agentes autónomos de Inteligencia Artificial (Antigravity, Cursor, Claude Code, Codex, GitHub Copilot y otros entornos LLM) que operen en este repositorio.
> **Estado:** VIGENTE · **Última revisión:** 2026-10-31 · **Describe la versión:** commit 04ef58c
> **Fuente de Verdad Documental:** [docs/README.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/README.md)

---

## 1. Misión y Límites Operativos del Asistente

El agente actúa como ingeniero de software y catalogador técnico del archivo histórico **Kumbia Sound** (preservación patrimonial de la cumbia peruana 1968–2005).

### Prohibiciones Absolutas del Proyecto
1. **Cero Distribución de Audio Ilegal (`INV-005`, `DEC-006`):** Queda terminantemente prohibido incorporar reproductores de archivos locales (`.mp3`, `.wav`, `.flac`), endpoints de descarga o almacenar binarios de audio en el servidor o en Supabase Storage.
2. **Restricción Estricta de Soportes a Lados A y B (`INV-001`, `DEC-001`):** Ninguna interfaz, consulta o esquema admitirá lados C o D para vinilos y casetes.
3. **No Placeholders ni Código Incompleto:** Queda prohibido el uso de comentarios elisivos (`// ... resto del código`), marcadores `TODO`, `TBD`, `lorem ipsum` o implementaciones simuladas.
4. **Respeto a las Directrices Globales de Usuario:** Siempre que se presenten cambios grandes o rediseños, se debe generar la "Guía de comprobación visual directa" estructurada con contraste "Antes vs Ahora".

---

## 2. Las 11 Reglas Mandatorias de Catalogación Fonográfica e Ingesta a SQL

Antes de generar o modificar sentencias en `supabase/data/` a partir de [`docs/datos-investigacion/Datos BD.ods`](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/datos-investigacion/Datos%20BD.ods):

1. **Consulta Previa Obligatoria:** Consultar las directivas de dominio en [`docs/01-proyecto/dominio.md`](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/01-proyecto/dominio.md).
2. **Duraciones a Segundos Enteros (`duracion_segundos`):** Convertir siempre el tiempo en formato `MM:SS` a segundos totales enteros:
   $$\text{duracion\_segundos} = (\text{minutos} \times 60) + \text{segundos}$$
   *Prohibido insertar strings de tiempo o decimales.*
3. **Notación Camelot Exclusiva (`camelot_code`):** Usar única y exclusivamente la notación de la Rueda Camelot (`1A` a `12B`). La notación clásica del círculo de quintas (`musical_key`) está formalmente eliminada de la base de datos (`INV-004`).
4. **Interpretación de Banderas Booleanas:** Toda celda vacía o en blanco en la hoja de cálculo se interpreta e inserta estrictamente como `FALSE`. Solo el valor explícito `SI` o `TRUE` se inserta como `TRUE`.
5. **Separación de Columnas de Temas:** Respetar la distinción funcional:
   - `LETRA DEL TEMA` $\rightarrow$ Columna `letra TEXT` en tabla `Temas`.
   - `NOTA PARA EL AGENTE` $\rightarrow$ Instrucciones internas (mosaicos, regrabaciones, covers); **no se inserta en BD**.
   - `COMENTARIOS / NOTAS` $\rightarrow$ Se inserta en la base de datos.
6. **Prevalencia de `Datos BD.ods` y Reporte de Discrepancias:** Si un dato ya existe en los archivos `.sql` y difiere de lo registrado en `Datos BD.ods`, prevalece estrictamente `Datos BD.ods`. El agente debe actualizar el archivo `.sql` con el valor de la hoja y **señalar obligatoriamente al usuario cuál fue esa discrepancia** (valor previo en SQL vs nuevo valor en ODS).
7. **Preservación Visual de la Hoja:** No alterar colores de columnas, tamaños de fuente, anchos de columna ni altos de fila definidos por el usuario en `Datos BD.ods`.
8. **Columna VOZ (Cantante / Instrumental) y Aislamiento de Créditos:**
   - La columna `VOZ` registra el nombre del cantante (`Personas` / `Tema_Musicos` con instrumento `'Voz'` e `id_rol = 5`).
   - **`credito_como` en `Tema_Musicos` debe ser SIEMPRE `NULL`:** Esto garantiza que la web muestre el nombre del cantante (`personas.nombre`).
   - **PROHIBICIÓN ESTRICTA:** La columna `CRÉDITO EN GALLETA (SEUDÓNIMO)` pertenece exclusivamente al **compositor** (`Temas_Compositores.credito_como` y `Albumes_Temas.credito_galleta`). **BAJO NINGUNA CIRCUNSTANCIA** debe insertarse en `Tema_Musicos.credito_como`.
   - Si la celda `VOZ` indica **`Instrumental`**, la pista es 100% instrumental: **NO** se inserta ninguna fila en `Tema_Musicos`, y se debe asociar obligatoriamente el género `Instrumental` (`id_genero = 11`, `es_principal = FALSE`) en `Temas_Generos`.
   - Si la celda `VOZ` está **vacía o en blanco**, representa un tema vocal con cantante pendiente de identificar: **NO** se inserta fila en `Tema_Musicos` y **NO** se marca como Instrumental.
9. **Catálogo de Géneros (`generos.sql`):** Cada vez que en `Datos BD.ods` aparezca un nuevo género musical, agregarlo obligatoriamente a `supabase/data/base/generos.sql` con su correspondiente `id_genero` secuencial único y documentar su adición.
10. **Catálogo de Roles (`roles.sql`):** Mantener y enriquecer `supabase/data/base/roles.sql` con todos los roles que se van creando por asociación en la discografía y créditos reales (ej. Director Musical, Compositor, Voz Principal, Primera Guitarra, Bajo Eléctrico, Músico de Planta).
11. **Títulos Canónicos de Singles de 45 RPM (`nombre_album`):**
    - Los singles de 45 RPM (`id_tipo_album = 1`) no poseen título comercial propio; su título canónico es obligatoriamente el nombre de los temas del Lado A y Lado B separados estrictamente por `" / "` (ej. `Viento / Te perdí`).
    - La base de datos cuenta con la función `fn_sync_single_title` y triggers que mantienen `Albumes.nombre_album` sincronizado automáticamente.

---

## 3. Puerta de Verificación Previa a Confirmar Cambios (Gate)

Antes de realizar cualquier commit, el agente debe ejecutar localmente y verificar que no arrojen ningún error:

```bash
# 1. Verificación estricta de tipos TypeScript
npx tsc --noEmit

# 2. Análisis estático con ESLint
npm run lint

# 3. Compilación de producción Next.js (Turbopack)
npm run build
```

---

## 4. Ciclo de Git y Mensajes Convencionales en Español

Una vez verificada la puerta de calidad:
1. `git status` y `git diff` para auditoría selectiva.
2. `git add <archivos>` específicos (evitar `git add .` ciego).
3. Commit en español con Conventional Commits:
   `git commit -m "<tipo>(<alcance>): <descripción concisa>"`
   Tipos: `feat:`, `fix:`, `docs:`, `refactor:`, `style:`, `test:`, `chore:`.
4. Publicación remota inmediata: `git push origin main`.

---

## 5. Protocolo de Documentación Continua (Living Docs)

Si un cambio de código altera rutas, componentes, modelos o reglas de negocio, el agente **debe actualizar en el mismo turno el archivo Markdown correspondiente dentro de `docs/`**.
Consulte [docs/README.md](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/docs/README.md) para ubicar el documento responsable.
