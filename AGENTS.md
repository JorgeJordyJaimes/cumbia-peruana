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
