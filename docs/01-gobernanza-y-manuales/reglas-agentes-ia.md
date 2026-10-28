# 🤖 Reglas Operativas e Inviolables para Asistentes de IA (AGENTS Governance)

> **Directivas Mandatorias de Seguridad, Integridad Fonográfica y Flujo Git para Agentes Autónomos**  
> *Antigravity, Cursor, Claude Code, Codex, GitHub Copilot y otros entornos de IA que operen en este repositorio.*

---

## 1. 🔄 Flujo de Trabajo Git Mandatorio

Cada vez que se realicen modificaciones en archivos del proyecto (especialmente en archivos `.sql` de la base de datos, código fuente o documentación):
1. **Realizar el `git add` selectivo** de los archivos correspondientes.
2. **Crear el commit correspondiente** con un mensaje claro y descriptivo en **español** siguiendo la convención de Conventional Commits (`feat:`, `fix:`, `docs:`, `refactor:`, etc.).
3. **Ejecutar inmediatamente el `git push`** a la rama remota correspondiente.

---

## 2. 📜 Ingesta de Datos y Poblado SQL desde `Datos BD.ods`

Antes de generar o modificar sentencias en `supabase/data/` a partir de [`docs/04-especificaciones-y-requisitos/datos-investigacion/Datos BD.ods`](../04-especificaciones-y-requisitos/datos-investigacion/Datos%20BD.ods):

1. **Consulta Previa Obligatoria:** Consultar [`docs/04-especificaciones-y-requisitos/manual-catalogacion-e-ingesta.md`](../04-especificaciones-y-requisitos/manual-catalogacion-e-ingesta.md).
2. **Duraciones:** Convertir siempre el tiempo en formato `MM:SS` a segundos totales enteros (`duracion_segundos`). Prohibido insertar strings con formato de tiempo.
3. **Camelot:** Usar única y exclusivamente la notación Camelot (`camelot_code`, ej. `1A`, `8A`, `11B`). La notación clásica del círculo de quintas (`musical_key`) está formalmente descartada del proyecto.
4. **Banderas Booleanas:** Toda celda vacía o en blanco se interpreta e inserta estrictamente como `FALSE`. Solo el valor `SI` es `TRUE`.
5. **Columnas de Temas:** Respetar la separación entre `LETRA DEL TEMA` (va a `letra TEXT`), `NOTA PARA EL AGENTE` (instrucciones internas: mosaicos, covers; **no** va a la BD) y `COMENTARIOS / NOTAS` (va a la BD).
6. **Prevalencia de `Datos BD.ods` y Discrepancias:** Si un dato ya existe en los archivos `.sql` y difiere de lo registrado en `Datos BD.ods`, prevalece estrictamente `Datos BD.ods`. El agente debe actualizar el archivo `.sql` con el valor de la hoja `.ods` y **señalar obligatoriamente al usuario cuál fue esa discrepancia** (valor previo en SQL vs nuevo valor en ODS).
7. **Preservación Visual de la Hoja:** No alterar colores de columnas, tamaños de fuente, anchos de columna ni altos de fila definidos por el usuario en `Datos BD.ods`.
8. **Columna VOZ (Cantante / Instrumental) y Aislamiento Estricto de Créditos:**
   - La columna `VOZ` registra el nombre del cantante (`Personas` / `Tema_Musicos` con instrumento `'Voz'` e `id_rol = 5`).
   - **`credito_como` en `Tema_Musicos` debe ser SIEMPRE `NULL`:** Esto garantiza que la web muestre el nombre del cantante (`personas.nombre`).
   - **PROHIBICIÓN ESTRICTA:** La columna `CRÉDITO EN GALLETA (SEUDÓNIMO)` pertenece exclusivamente al **compositor** (`Temas_Compositores.credito_como` y `Albumes_Temas.credito_galleta`). **BAJO NINGUNA CIRCUNSTANCIA** debe insertarse en `Tema_Musicos.credito_como`.
   - Si la celda `VOZ` indica **`Instrumental`**, la pista es 100% instrumental: **NO** se inserta ninguna fila en `Tema_Musicos`, y se debe asociar obligatoriamente el género `Instrumental` (`id_genero = 11`, `es_principal = FALSE`) en `Temas_Generos`.
   - Si la celda `VOZ` está **vacía o en blanco**, representa un tema vocal con cantante pendiente de identificar: **NO** se inserta fila en `Tema_Musicos` y **NO** se marca como Instrumental.
9. **Catálogo de Géneros (`generos.sql`):** Cada vez que en `Datos BD.ods` aparezca un nuevo género musical, agregarlo obligatoriamente a `supabase/data/base/generos.sql` con su correspondiente `id_genero` secuencial único y documentar su adición.
10. **Catálogo de Roles (`roles.sql`):** Mantener y enriquecer `supabase/data/base/roles.sql` con todos los roles que se van creando por asociación en la discografía y créditos reales (ej. Director Musical, Compositor, Voz Principal, Primera Guitarra, Bajo Eléctrico, Músico de Planta).
11. **Títulos Canónicos de Singles de 45 RPM (`nombre_album`):**
    - Los singles de 45 RPM (`id_tipo_album = 1`) no poseen título de álbum propio comercial; su título canónico es obligatoriamente el nombre de los temas del Lado A y Lado B separados estrictamente por `" / "` (ej. `Viento / Te perdí`).
    - La base de datos cuenta con la función `fn_sync_single_title` y triggers (`trg_sync_single_title_albumes_temas`, `trg_sync_single_title_temas`) que mantienen `Albumes.nombre_album` sincronizado automáticamente.

---

## 3. 🌐 Protocolo de Documentación Continua (Living Docs)

Cada vez que el agente agregue una nueva tabla, procedimiento almacenado, componente visual o regla de negocio, **debe actualizar en el mismo turno el archivo Markdown correspondiente dentro de `docs/`**. No se permite dejar documentación desfasada con respecto al código.
