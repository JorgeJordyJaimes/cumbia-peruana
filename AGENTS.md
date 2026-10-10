<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Flujo de Trabajo Git

- Cada vez que se realicen modificaciones en archivos del proyecto (especialmente en archivos `.sql` de la base de datos o código fuente):
  1. Realizar el `git add` de los archivos correspondientes.
  2. Crear el commit correspondiente con un mensaje claro y descriptivo en **español** (siguiendo convenciones de commits convencionales: `feat:`, `fix:`, `docs:`, etc.).
  3. Ejecutar inmediatamente el `git push` a la rama remota correspondiente.

## Ingesta de Datos y Poblado SQL desde `Datos BD.ods`

- Antes de generar o modificar sentencias en `supabase/data/` a partir de `docs/datos-investigacion/Datos BD.ods`:
  1. Consultar obligatoriamente [`docs/manual-catalogacion-e-ingesta.md`](docs/manual-catalogacion-e-ingesta.md).
  2. **Duraciones:** Convertir siempre el tiempo en formato `MM:SS` a segundos totales enteros (`duracion_segundos`).
  3. **Camelot:** Usar única y exclusivamente la notación Camelot (`camelot_code`). La notación clásica del círculo de quintas (`musical_key`) está descartada del proyecto.
  4. **Banderas booleanas:** Toda celda vacía o en blanco se interpreta e inserta estrictamente como `FALSE`. Solo `SI` es `TRUE`.
  5. **Columnas de Temas:** Respetar la separación entre `LETRA DEL TEMA` (va a `letra TEXT`), `NOTA PARA EL AGENTE` (instrucciones internas: mosaicos, covers; no va a la BD) y `COMENTARIOS / NOTAS` (va a la BD).

