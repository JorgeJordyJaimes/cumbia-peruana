# 02 · Catálogo de Documentos: qué debe contener cada archivo

> **Propósito:** especificar, documento por documento, su finalidad, contenido mínimo, nivel de detalle, errores a evitar, criterios de calidad y cuándo actualizarlo.
> **Depende de:** `01-estandares-transversales.md` (cabecera, estados, IDs).
> **Cómo se usa:** el agente consulta aquí la ficha de cada documento que va a crear. Los perfiles (`03` a `07`) indican cuáles son obligatorios y qué añadir.

**Leyenda de obligatoriedad:** **O** = obligatorio en todo proyecto · **C** = condicional (se indica la condición) · **P** = lo define el perfil.

---

## Índice

| ID | Documento | Ruta | Oblig. |
| :--- | :--- | :--- | :---: |
| D00 | README raíz | `README.md` | O |
| D01 | Reglas para agentes | `AGENTS.md` | O |
| D10 | Índice y mapa de consulta | `docs/README.md` | O |
| D11 | Presentación del proyecto | `docs/01-proyecto/presentacion.md` | O |
| D12 | Glosario | `docs/01-proyecto/glosario.md` | O |
| D13 | Dominio e invariantes | `docs/01-proyecto/dominio.md` | C |
| D20 | Requisitos | `docs/02-requisitos/requisitos.md` | O |
| D21 | Flujos de usuario | `docs/02-requisitos/flujos-de-usuario.md` | C |
| D30 | Arquitectura | `docs/03-arquitectura/arquitectura.md` | O |
| D31 | Modelo de datos | `docs/03-arquitectura/modelo-de-datos.md` | O |
| D32 | Interfaces y contratos | `docs/03-arquitectura/interfaces.md` | C |
| D33 | Decisiones | `docs/03-arquitectura/decisiones.md` | O |
| D40 | Sistema visual | `docs/04-diseno/sistema-visual.md` | C |
| D41 | Pantallas | `docs/04-diseno/pantallas.md` | C |
| D50 | Instalación y entorno | `docs/05-entorno-y-operacion/instalacion-y-entorno.md` | O |
| D51 | Despliegue y operación | `docs/05-entorno-y-operacion/despliegue.md` | C |
| D60 | Pruebas y calidad | `docs/06-calidad/pruebas.md` | O |
| D61 | Rendimiento | `docs/06-calidad/rendimiento.md` | C |
| D62 | Seguridad y datos | `docs/06-calidad/seguridad-y-datos.md` | C |
| D70 | Git y versionado | `docs/07-gestion/git.md` | O |
| D71 | Roadmap | `docs/07-gestion/roadmap.md` | O |
| D72 | Changelog | `docs/07-gestion/changelog.md` | O |
| D73 | Problemas conocidos y pendientes | `docs/07-gestion/problemas-conocidos.md` | O |

**Condiciones de los condicionales:** D13 si el dominio tiene reglas que no pueden violarse · D21 si hay usuarios interactuando por pasos · D32 si hay API, IPC, eventos o dos aplicaciones que se hablan · D40/D41 si hay interfaz gráfica · D51 si se despliega o distribuye · D61 si el rendimiento es un requisito o riesgo · D62 si se manejan datos personales, dinero, credenciales o archivos irrecuperables.

---

## D00 · `README.md` (raíz)

- **Propósito:** puerta de entrada de 1 minuto.
- **Contenido mínimo:** nombre y frase de qué es; captura o diagrama (opcional); estado (en desarrollo / estable); arranque en 3-5 comandos con enlace a `instalacion-y-entorno.md` para el detalle; enlace a `docs/README.md`; licencia/derechos y autoría.
- **Detalle:** corto (< 80 líneas). No duplica contenido: enlaza.
- **Evitar:** copiar instalación completa, listas de funciones o decisiones.
- **Calidad:** una persona nueva sabe qué es y a dónde ir en 60 segundos.
- **Actualizar cuando:** cambian el nombre, el estado, el arranque o la estructura de `docs/`.

## D01 · `AGENTS.md` (raíz)

- **Propósito:** instrucciones vinculantes para cualquier agente de IA que trabaje en el repositorio. **Fuente única**; `GEMINI.md`, `CLAUDE.md` u otros solo apuntan aquí.
- **Contenido mínimo:**
  1. **Orden de lectura obligatoria** antes de tocar nada (documentos y por qué).
  2. **Mapa de consulta**: "si vas a tocar X, lee Y".
  3. **Reglas de trabajo:** verificación antes de confirmar (comandos exactos), flujo Git (enlace a `git.md`), actualización documental en cada tarea (tabla de mantenimiento de `00-INSTRUCCION-MAESTRA.md` §8).
  4. **Prohibiciones:** secretos, cambios no solicitados, decisiones confirmadas que no se alteran, `--force` en ramas protegidas, tocar archivos de datos del usuario sin respaldo.
  5. **Tratamiento de incertidumbre:** distinguir hecho / requisito / propuesta / suposición; preguntar o marcar `PEND`; no inventar.
  6. **Resolución de contradicciones:** qué documento prevalece por tipo de afirmación (invariantes de dominio > decisiones confirmadas > requisitos > guías) y el deber de reportar la contradicción.
  7. **Formato del informe final** al propietario (guía de comprobación visual o equivalente).
  8. **Reglas del propietario:** idioma, tono, convenciones de nombres.
- **Evitar:** duplicar reglas de `git.md` o de diseño (se enlazan); instrucciones vagas ("escribe buen código"); archivos de herramienta con reglas distintas entre sí.
- **Calidad:** un agente sin contexto previo sabe qué leer, qué verificar, qué no tocar y cómo reportar.
- **Actualizar cuando:** cambia una norma de trabajo, se añade un documento obligatorio o cambia el formato de reporte.

## D10 · `docs/README.md` (índice y mapa de consulta)

- **Propósito:** responder "¿dónde está X?".
- **Contenido mínimo:**
  1. **Índice**: todos los documentos con una línea de descripción y su estado.
  2. **Mapa de consulta**: tabla *"Quiero… → abre… (y entrega a otra IA con…)"*. Ejemplos de filas: reproducir el entorno; entender qué hace el sistema; cambiar el estilo visual; mejorar rendimiento; añadir un campo; saber por qué se eligió X; ver qué falta por hacer.
  3. **Tabla de fuente principal**: cada tipo de dato (versiones, comandos, colores, campos, decisiones, métricas…) → documento que lo posee.
  4. **Convenciones** del sistema documental (enlace a `_sistema/01-estandares-transversales.md`, estados, IDs).
  5. **Combos para otra IA**: paquetes de archivos recomendados por tarea.
- **Evitar:** descripciones largas; documentos sin listar.
- **Calidad:** cada documento existente aparece una vez; cada pregunta habitual tiene respuesta.
- **Actualizar cuando:** se crea, mueve, fusiona, divide o elimina un documento.

## D11 · `presentacion.md` (presentación del proyecto)

- **Propósito:** explicar qué es el proyecto, para quién y por qué existe. Es el documento que se entrega a quien debe "entender el proyecto" antes que nada.
- **Contenido mínimo:**
  1. **Resumen** (1 párrafo) y **pitch** en una frase.
  2. **Contexto y motivación:** problema que resuelve, situación previa, por qué las alternativas no bastan (con ejemplos concretos).
  3. **Propuesta de valor** y principios rectores (los 3-6 valores que guían decisiones).
  4. **Usuarios:** quiénes son, qué necesitan, nivel técnico, entorno de uso. Si hay roles, tabla de roles.
  5. **Alcance:** qué hace (funciones principales en alto nivel con enlaces a requisitos) y **qué NO hace** (no-objetivos) con su razón.
  6. **Estado actual:** madurez, versión, qué está terminado, en curso y planeado (enlace a roadmap).
  7. **Stack en una tabla** (tecnología → rol), con enlace al documento de entorno para versiones.
  8. **Mapa de la documentación.**
  9. **Autoría, licencia y derechos** (de código, contenido, imágenes y datos).
- **Detalle:** lenguaje no técnico en 1-4; técnico solo en 7.
- **Evitar:** especificaciones detalladas (van en requisitos); promesas no cumplidas; "mejor del mercado".
- **Calidad:** alguien nuevo puede explicar el proyecto en dos frases tras leerlo; los no-objetivos evitan peticiones fuera de alcance.
- **Actualizar cuando:** cambia el alcance, los usuarios, el estado general o el stack principal.
- **Entregar a otra IA para:** onboarding, ideas de producto, redacción de textos públicos, auditorías de alcance.

## D12 · `glosario.md`

- **Propósito:** definiciones únicas de términos del dominio y del proyecto.
- **Contenido mínimo:** tabla `Término | Definición | No confundir con | Nombre técnico (campo/código) | Sinónimos prohibidos | Fuente`. Incluir equivalencias entre el lenguaje del usuario y el del código (p. ej. etiqueta visible ↔ nombre de campo).
- **Evitar:** definir un término de dos formas en dos documentos; términos ambiguos sin "no confundir con".
- **Calidad:** cada término sensible del dominio tiene una única definición; el resto de documentos la cumple (comprobar por búsqueda).
- **Actualizar cuando:** aparece o cambia un término; se escribe siempre **antes** de propagar el cambio al resto.

## D13 · `dominio.md` (condicional)

- **Propósito:** reglas del dominio que **no pueden violarse** y conocimiento experto necesario para tomar decisiones correctas (la "razón de ser" más profunda).
- **Contenido mínimo:**
  1. **Invariantes** `INV-NNN`: regla, por qué existe, qué datos protege, cómo se comprueba, consecuencias de violarla.
  2. **Conceptos y relaciones del dominio** (con diagrama) y casos difíciles reales (homónimos, alias, excepciones) con ejemplos.
  3. **Fuentes de verdad del dominio** y su fiabilidad; bibliografía o referencias.
  4. **Convenciones de nomenclatura** y de normalización de datos del dominio.
- **Evitar:** mezclar con requisitos funcionales; afirmaciones históricas o normativas sin fuente.
- **Calidad:** una persona experta en el campo reconocería el modelo; una persona no experta entiende por qué cada invariante importa.
- **Actualizar cuando:** se descubre un caso nuevo, se corrige una regla o cambia la normativa/fuente.

## D20 · `requisitos.md`

- **Propósito:** definir **qué** debe hacer el sistema y **cómo se comprueba** que lo hace.
- **Contenido mínimo:**
  1. **Propósito y alcance** (enlace a presentación; aquí solo lo normativo).
  2. **Restricciones y supuestos** (plataforma, legales, económicas, de datos, de tecnología impuesta) con su origen.
  3. **Requisitos funcionales** `RF-NNN`: título, descripción, actor, precondiciones, comportamiento, **criterios de aceptación** (formato "Dado/Cuando/Entonces" o lista verificable), prioridad (Debe/Debería/Podría), estado de decisión e implementación, pantalla/módulo donde vive, prueba asociada.
  4. **Requisitos no funcionales** `RNF-NNN` con **valor medible** y método de medición: rendimiento, capacidad (escala real y objetivo), disponibilidad, seguridad, privacidad, accesibilidad, compatibilidad, mantenibilidad, usabilidad, portabilidad.
  5. **Reglas de negocio** `RN-NNN`: fórmulas, validaciones, límites, jerarquías. Con ejemplos numéricos.
  6. **Comportamiento ante errores y casos límite:** entradas inválidas, falta de datos, recursos no disponibles, fallos parciales, concurrencia.
  7. **Matriz de trazabilidad:** `RF/RNF → componente (arquitectura) → pantalla → prueba`.
  8. **Gestión de cambios:** cómo se añade, modifica o retira un requisito (nunca se borra: `OBSOLETA`).
- **Detalle:** cada RF debe poder implementarse y probarse sin interpretación subjetiva.
- **Evitar:** requisitos como adjetivos; mezclar requisitos con diseño visual o decisiones técnicas; describir la solución en lugar del problema; copiar descripciones de pantallas.
- **Calidad:** el 100 % de RF tiene criterio de aceptación; el 100 % de RNF tiene número y método; ningún RF `IMPLEMENTADO` sin prueba o comprobación manual documentada.
- **Actualizar cuando:** cambia el comportamiento o se añade/retira una función; se corrige una regla de negocio.
- **Entregar a otra IA para:** estimar esfuerzo, detectar huecos, generar casos de prueba, evaluar alternativas de diseño.

## D21 · `flujos-de-usuario.md` (condicional)

- **Propósito:** recorridos paso a paso de las tareas reales de cada actor.
- **Contenido mínimo:** por flujo `UC-NNN`: actor, objetivo, precondiciones, pasos numerados (acción del usuario → respuesta del sistema), variantes y errores, postcondiciones, atajos de teclado/gestos, RF relacionados, frecuencia (diario/ocasional).
- **Evitar:** describir estilos visuales; omitir los caminos de error.
- **Calidad:** cada RF de interacción aparece en al menos un flujo; los flujos son ejecutables como guion de prueba manual.
- **Actualizar cuando:** cambia un paso, atajo o resultado visible.

## D30 · `arquitectura.md`

- **Propósito:** explicar cómo está construido el sistema, por qué así y qué restricciones impone a los cambios.
- **Contenido mínimo:**
  1. **Visión global:** diagrama de capas/componentes y de despliegue (Mermaid + texto).
  2. **Stack y justificación** (enlace a decisiones; versiones en `instalacion-y-entorno.md`).
  3. **Componentes y responsabilidades:** tabla `Componente | Responsabilidad | Depende de | Prohibido que dependa de | Ruta en el código`.
  4. **Flujos de datos y secuencias críticas** (diagramas de secuencia de las 3-5 operaciones clave): sincronía, hilos/procesos, colas, eventos.
  5. **Estructura de directorios** comentada, **real** (se genera del repositorio).
  6. **Estado y persistencia:** dónde vive cada dato (memoria, caché, archivos, BD, índices), formato, versión de esquema, estrategia de migración, respaldo.
  7. **Concurrencia y recursos:** modelo de hilos/procesos, límites, políticas de reintento y cancelación.
  8. **Manejo de errores y registro (logging).**
  9. **Restricciones arquitectónicas** (reglas que todo cambio debe respetar) **con forma de verificarlas** (herramienta, lint, prueba o revisión).
  10. **Puntos de extensión** y cómo añadir un módulo/formato/pantalla sin romper consistencia.
  11. **Límites conocidos y trampas** (qué suele romperse).
- **Evitar:** describir el código línea a línea; decir "Clean Architecture" sin mostrar capas y dependencias reales; tecnologías no usadas; reglas "exclusivas" que el código incumple (verifícalo).
- **Calidad:** un desarrollador nuevo ubica dónde implementar un cambio; otra IA puede proponer refactors respetando las restricciones.
- **Actualizar cuando:** cambia un componente, dependencia clave, flujo, esquema o restricción.
- **Entregar a otra IA para:** revisión de arquitectura, refactor, optimización (junto a `rendimiento.md`), migración tecnológica.

## D31 · `modelo-de-datos.md`

- **Propósito:** contrato de datos único: qué se guarda, con qué forma y reglas.
- **Contenido mínimo:**
  1. **Entidades y relaciones** (diagrama E-R o equivalente).
  2. **Diccionario de campos** por entidad: `Campo | Tipo | Obligatorio | Valores/rango/formato | Regla de validación | Significado (enlace al glosario) | Origen/destino (columna, etiqueta de archivo, API)`.
  3. **Mapeos externos:** formatos de archivo, etiquetas, columnas de BD, APIs de terceros, equivalencias.
  4. **Identificadores y claves:** cómo se identifica cada entidad; unicidad; normalización.
  5. **Reglas de integridad, de normalización y de calidad de datos.**
  6. **Estados y ciclo de vida** de entidades relevantes.
  7. **Versionado y migraciones** del esquema y de los archivos de datos.
  8. **Datos derivados vs. almacenados** y su recálculo.
  9. **Volumen y escala** (real y objetivo) por entidad.
  10. **Campos ausentes conocidos** (conceptos del dominio que aún no tienen campo) → `PEND`.
- **Evitar:** definiciones distintas del mismo campo en otros documentos; tipos sin rango; campos con significado ambiguo.
- **Calidad:** cada campo del código aparece aquí y viceversa (comprobar por búsqueda); cada concepto del dominio tiene dónde guardarse o un `PEND`.
- **Actualizar cuando:** cambia cualquier campo, tabla, formato o mapeo.
- **Entregar a otra IA para:** diseñar migraciones, consultas, importaciones, validaciones, informes.

## D32 · `interfaces.md` (condicional)

- **Propósito:** contratos entre componentes o sistemas (API HTTP, comandos IPC, eventos, colas, archivos de intercambio, integración entre dos aplicaciones).
- **Contenido mínimo:** por interfaz: nombre, propósito, quién llama a quién, entrada (campos, tipos, validación), salida, errores (códigos y mensajes), efectos secundarios, idempotencia, autenticación/autorización, límites (tamaño, frecuencia), ejemplos de petición/respuesta reales, versión y política de compatibilidad.
- **Evitar:** ejemplos inventados que no funcionan; omitir los errores.
- **Calidad:** el 100 % de interfaces del código está listado; cada una tiene ejemplo verificado.
- **Actualizar cuando:** cambia una firma, un error o una regla de acceso.

## D33 · `decisiones.md`

- **Propósito:** memoria de las decisiones y de sus razones.
- **Contenido mínimo:** por decisión `DEC-NNN`: fecha, título, **contexto**, **opciones consideradas** con pros/contras, **decisión**, **justificación**, consecuencias, estado de decisión e implementación, quién decidió (propietario / propuesta del agente aprobada), documentos afectados, y reemplazada por → (si `OBSOLETA`). Incluir **decisiones de no hacer algo** (p. ej. "no se implementa carrito de compra") con su razón.
- **Evitar:** decisiones sin alternativas ni razón; borrar decisiones antiguas; registrar propuestas como decididas.
- **Calidad:** ante "¿por qué se eligió X?" hay respuesta con fecha.
- **Actualizar cuando:** se toma, cambia o descarta una decisión.

## D40 · `sistema-visual.md` (condicional: interfaz)

- **Propósito:** contener **toda** la información necesaria para reproducir la identidad visual o migrarla a otra. Es el documento que se entrega a otra IA para "cambiar de estilo A a estilo B".
- **Contenido mínimo:**
  1. **Identidad y principios:** concepto, tono, 5-10 principios **verificables**, lo que el diseño rechaza.
  2. **Tokens de diseño** (valores **exactos copiados del código**, con archivo de origen):
     - **Color:** tabla `Token | Nombre | Hex/valor | Rol semántico | Uso permitido | Uso prohibido | Valor en tema claro | Valor en tema oscuro | Contraste mínimo`. Incluir fondo, superficies (niveles), bordes, texto (niveles), acentos, estados (éxito, aviso, error, info), selección, foco, deshabilitado, overlays, sombras de color.
     - **Tipografía:** familias (con fuente de carga y alternativas), tabla de escala (tamaño, peso, interlineado, tracking, uso), reglas (mono para datos, mayúsculas…).
     - **Espaciado:** unidad base y escala; paddings estándar por componente.
     - **Radios, bordes** (grosor, estilo, color por estado), **sombras y elevación** (valores completos), **opacidades, desenfoques y degradados** (dónde sí/no).
     - **Iconografía:** librería, tamaños, trazo, reglas.
     - **Movimiento:** duraciones, curvas, qué se anima y qué no, reducción de movimiento.
     - **Capas (z-index)** y **breakpoints** / tamaños de ventana soportados, densidad.
  3. **Semántica del color:** regla "un acento, un significado" en tabla; combinaciones prohibidas.
  4. **Catálogo de componentes:** por componente: anatomía, variantes, tamaños, **matriz de estados** (reposo, hover, foco, activo, deshabilitado, cargando, error, seleccionado, vacío…), tokens que usa, código/clases de receta, comportamiento y accesibilidad.
  5. **Patrones de composición:** cabeceras, tablas, formularios, modales, menús, estados vacíos/carga/error, notificaciones.
  6. **Temas:** cómo se define cada tema, reglas para añadir un color nuevo con su par, zonas conocidas que no soportan un tema.
  7. **Accesibilidad:** contrastes medidos, foco, teclado, tamaños mínimos, no depender solo del color.
  8. **Microcopy:** voz, mayúsculas, nomenclatura de campos (alineada con el glosario), formato de mensajes de error y vacío.
  9. **Mapa de implementación:** dónde se definen los tokens en el código (archivos y variables), cómo cambiarlos, qué partes están fuera del sistema de tokens (valores fijos) y cuántas veces.
  10. **Guía de migración a otro estilo:** qué es **identidad** (no se toca sin decisión) y qué es **token** (se puede reemplazar); orden recomendado de migración; tabla `Token actual → Token nuevo` en blanco para completar; riesgos (contraste, rendimiento, componentes con valores fijos).
  11. **Reglas de evolución** y **checklist para pantallas nuevas.**
  12. **Estado real vs. decidido:** tabla de divergencias entre el diseño aprobado y el código.
- **Detalle:** nadie debería tener que "adivinar" un valor; si un valor existe en el código y no en este documento, el documento está incompleto.
- **Evitar:** descripciones subjetivas ("elegante"); valores redondeados; mezclar especificación por pantalla (va en `pantallas.md`); numeración heredada rota; mantenerlo como archivo no versionado.
- **Calidad:** una IA puede reconstruir la paleta, la tipografía y los componentes principales solo con este archivo; el color de cualquier estado se encuentra en una tabla.
- **Actualizar cuando:** cambia cualquier token, componente base, regla de tema o decisión visual.
- **Entregar a otra IA para:** migrar de estilo, crear pantallas nuevas coherentes, auditar accesibilidad/contraste, generar el tema alternativo.

## D41 · `pantallas.md` (condicional: interfaz)

- **Propósito:** especificación visual y de interacción **por pantalla/vista**.
- **Contenido mínimo:** por pantalla: propósito, ruta/acceso, **wireframe en texto o diagrama** con dimensiones, regiones y su jerarquía, **componentes usados** (enlace a `sistema-visual.md`), datos mostrados y su campo (enlace a `modelo-de-datos.md`), estados (vacío, carga, error, éxito, sin permisos), interacciones y atajos, comportamiento con distintos tamaños, requisitos relacionados `RF-NNN`, divergencias conocidas.
- **Evitar:** redefinir tokens (enlazarlos); describir la lógica interna del código.
- **Calidad:** cada pantalla del código aparece; cada elemento interactivo tiene comportamiento definido.
- **Actualizar cuando:** cambia el diseño o el comportamiento de una pantalla.
- **Entregar a otra IA para:** rediseñar navegación y flujos, probar usabilidad, producir mockups.

## D50 · `instalacion-y-entorno.md`

- **Propósito:** reproducir el entorno de desarrollo y ejecutar el proyecto en **otra máquina limpia** sin ayuda.
- **Contenido mínimo:**
  1. **Matriz de compatibilidad:** SO y versiones soportadas / no soportadas.
  2. **Requisitos previos** con **versión exacta o rango y cómo verificarla**: lenguajes, runtimes, compiladores, SDKs, gestores de paquetes, base de datos, navegadores, herramientas del sistema. Comando de instalación por SO cuando exista.
  3. **Archivos de versión fijada** del repositorio (lockfiles, `.nvmrc`, `rust-toolchain.toml`, `.python-version`, `Dockerfile`…) y política de actualización.
  4. **Pasos de instalación** numerados: clonar → dependencias → configuración → datos iniciales → ejecutar → compilar → probar. Cada comando con su **salida esperada** y tiempo aproximado.
  5. **Variables de entorno y configuración:** tabla `Nombre | Para qué | Obligatoria | Ejemplo (sin secretos) | Dónde se obtiene | Dónde se lee en el código`. Referencia a `.env.example`.
  6. **Servicios externos y cuentas** necesarios (cómo obtenerlos, qué permisos).
  7. **Base de datos / datos iniciales:** creación, migraciones, datos de ejemplo (semillas), cómo reiniciar.
  8. **Modos de ejecución** (desarrollo, previsualización, producción, medición) y comandos de compilación/empaquetado, con ubicación de los artefactos.
  9. **Cómo ejecutar las pruebas** (comando y qué cubren).
  10. **Resolución de problemas:** tabla `Síntoma/mensaje exacto | Causa | Solución`.
  11. **Verificación en máquina limpia:** fecha, SO, resultado, tiempo total.
  12. **Desinstalar / reiniciar a cero** y dónde guarda datos/configuración el proyecto en cada SO.
- **Evitar:** "instala Node" sin versión; comandos no ejecutados; pasos faltantes que "todo el mundo sabe"; mezclar reglas de agentes o de Git.
- **Calidad:** alguien sin contexto lo sigue sin preguntar; cada versión coincide con el lockfile; fecha de la última verificación reciente.
- **Actualizar cuando:** cambia una dependencia, versión, variable, comando o paso; mínimo al cerrar cada hito se re-verifica.
- **Entregar a otra IA para:** automatizar la instalación (scripts, contenedores, CI), diagnosticar un fallo de entorno, migrar a otra plataforma.

## D51 · `despliegue.md` (condicional)

- **Propósito:** poner el sistema en funcionamiento fuera del equipo de desarrollo y mantenerlo.
- **Contenido mínimo:** entornos (desarrollo/pruebas/producción) y sus diferencias; hosting/infraestructura, dominios, DNS, certificados; proceso de publicación paso a paso y reversión (rollback); configuración por entorno; migraciones en producción; copias de seguridad (qué, con qué frecuencia, dónde, cómo restaurar, **restauración probada**); monitoreo y registros; costos recurrentes; tareas periódicas; procedimiento ante caída; para software de escritorio: empaquetado, firma, instaladores, actualizaciones y migración de datos locales.
- **Evitar:** credenciales; pasos que dependen de memoria del propietario.
- **Calidad:** una persona capaz puede publicar y restaurar sin ayuda.
- **Actualizar cuando:** cambia el proveedor, el proceso, la periodicidad de respaldos o los costos.

## D60 · `pruebas.md`

- **Propósito:** definir cómo se sabe que el sistema funciona y que un cambio no rompió nada.
- **Contenido mínimo:** estrategia (qué se prueba automática y manualmente y por qué); herramientas y comandos; **puerta de verificación previa a confirmar cambios** (lista exacta de comandos: compilación, lint, tipos, pruebas); mapa de cobertura por requisito (enlace a la matriz de trazabilidad); datos de prueba (cómo se generan o dónde están, sin datos personales reales); pruebas de regresión y casos límite obligatorios; **guion de pruebas manuales** para lo que no se automatiza (por flujo `UC-NNN`); **criterios de "terminado"** para una modificación; reglas del proyecto y la herramienta que las verifica (tipado estricto, manejo de errores, formato); problemas conocidos de calidad.
- **Evitar:** reglas sin herramienta ("código limpio"); afirmar cobertura que no existe; omitir que no hay pruebas (si no las hay, decirlo y registrar `TD`).
- **Calidad:** cada RF crítico tiene prueba o guion manual; la puerta de verificación se ejecuta tal cual.
- **Actualizar cuando:** cambian herramientas, comandos o criterios; se añade una regla verificable.

## D61 · `rendimiento.md` (condicional)

- **Propósito:** contener todo lo necesario para que otra IA **recomiende optimizaciones con evidencia**, sin acceso al código.
- **Contenido mínimo:**
  1. **Objetivos y presupuestos** (RNF de rendimiento enlazados) con su método de medición.
  2. **Escala real vs. objetivo** (volumen de datos, usuarios) y **conjuntos de prueba** (descripción, tamaño, composición, cómo reproducirlos).
  3. **Perfiles de hardware/entorno** probados (ficha completa: CPU, GPU, RAM, disco y tipo de bus, pantalla y escala, SO, versión del motor web, plan de energía, alimentación).
  4. **Metodología de medición:** reglas (medir antes de cambiar, compilación de producción, repeticiones y estadístico, entorno controlado), **catálogo de escenarios** `ESC-NN` (pasos exactos y métricas), herramientas, instrumentación disponible y cómo activarla, experimentos de aislamiento (A/B) y cómo leerlos, tabla de interpretación síntoma → causa → acción.
  5. **Estado actual:** tabla de resultados vigentes por escenario y perfil (con fecha, commit y enlace al registro de origen).
  6. **Cuellos de botella identificados** y su evidencia; **optimizaciones aplicadas** (qué, dónde, efecto esperado **vs. medido**, riesgo, cómo revertir).
  7. **Restricciones que limitan las soluciones** (decisiones o invariantes que no se pueden tocar; enlace).
  8. **Pendientes de optimización** priorizados y **qué no optimizar** (con razón).
  9. **Cómo repetir las mediciones** de extremo a extremo (comandos, build requerido, salida esperada, dónde guardar).
- **Registro de mediciones** (`registro-mediciones/AAAA-MM-DD-<equipo>-<commit>.md`): evidencia **inmutable** con ficha de hardware, commit, build, conjunto de datos, resultados por escenario, observaciones. Nunca se edita; se corrige con una nota posterior.
- **Evitar:** comparar mediciones con código distinto sin decirlo; cifras sin escenario ni conjunto de datos; confundir la escala sintética con la real; build de depuración presentado como de producción.
- **Calidad:** cada cifra enlaza a su registro; las mediciones comparadas tienen mismo commit o la diferencia está declarada.
- **Actualizar cuando:** hay una nueva medición, optimización o cambio de objetivos o de perfil de hardware.
- **Entregar a otra IA para:** recomendaciones de optimización (junto a `arquitectura.md` y, si es interfaz, `sistema-visual.md`).

## D62 · `seguridad-y-datos.md` (condicional)

- **Propósito:** proteger datos y operaciones sensibles.
- **Contenido mínimo:** inventario de datos sensibles (personales, financieros, credenciales, archivos irrecuperables) y su ubicación; modelo de amenazas breve; autenticación, roles y permisos (tabla rol → acción); gestión de secretos; **política de integridad y respaldo** (antes de modificar datos del usuario, escritura atómica, deshacer, copias, restauración probada); cifrado y transporte; registros de auditoría; retención y eliminación de datos; cumplimiento de normas aplicables (según país del negocio; marcar `PEND` si no se ha confirmado); qué datos nunca salen del sistema (p. ej. costos no se publican); procedimiento ante incidentes.
- **Evitar:** secretos reales; afirmar cifrado o permisos que el código no implementa.
- **Calidad:** cada dato sensible tiene dueño, ubicación, protección y política de retención.
- **Actualizar cuando:** se añade un dato sensible, un rol, un servicio externo o se detecta un incidente.

## D70 · `git.md`

- **Propósito:** reglas de control de versiones del proyecto.
- **Contenido mínimo:** estrategia de ramas (principal protegida, nombres de ramas de trabajo, ramas de experimentación y cuándo se fusionan); flujo de trabajo por cambio (verificar → revisar → confirmar selectivamente → publicar); **convención de mensajes** (tipos permitidos, alcance, idioma, longitud, tiempo verbal, cuerpo, referencias a IDs) con ejemplos; **un cambio coherente por commit**; reglas de documentación en el mismo commit o en un `docs:` inmediato; protección de secretos y `.gitignore` base del stack; prohibiciones (`--force` en ramas protegidas, commits de credenciales); cómo deshacer errores; etiquetas de versión y versionado semántico; plantilla de revisión previa al merge.
- **Distinción:** los principios generales viven en el manual general; aquí solo las **elecciones del proyecto**.
- **Evitar:** duplicar reglas en `AGENTS.md` (enlazar).
- **Calidad:** cualquier colaborador produce commits consistentes siguiendo solo este archivo.
- **Actualizar cuando:** cambia la estrategia de ramas, la convención o el flujo.

## D71 · `roadmap.md`

- **Propósito:** lo que falta, lo que se decidió hacer y su estado.
- **Contenido mínimo:** tabla `ID | Ítem | Descripción | Origen (decisión/pendiente) | Prioridad | Estado de decisión | Estado de implementación | Impacto esperado | Impacto medido (cuando exista) | Requisitos/decisiones relacionados`. Secciones: en curso, próximo, backlog, descartado (con razón). Separar claramente **lo confirmado** de **ideas**.
- **Evitar:** mezclar con changelog (pasado) o con problemas conocidos; ítems confirmados sin estado.
- **Calidad:** todo ítem con estado; los implementados se mueven al changelog.
- **Actualizar cuando:** cambian prioridades, estados o aparecen ideas.

## D72 · `changelog.md`

- **Propósito:** historia de cambios por versión.
- **Contenido mínimo:** por versión/fecha: añadido, cambiado, corregido, retirado, rendimiento, documentación; con enlaces a `RF`, `DEC`, `TD`. Formato consistente (p. ej. "Keep a Changelog").
- **Evitar:** reescribir entradas pasadas.
- **Actualizar cuando:** cada entrega o cambio relevante.

## D73 · `problemas-conocidos.md`

- **Propósito:** defectos, deuda técnica, riesgos y pendientes de decisión, todo en un solo lugar.
- **Contenido mínimo:** tres secciones. **Problemas y deuda técnica** `TD-NNN` (descripción, impacto, causa, solución propuesta, prioridad, estado). **Riesgos** `RIE-NNN` (probabilidad, impacto, mitigación). **Pendientes de decisión** `PEND-NNN` (qué se necesita del propietario, opciones, documentos afectados, fecha de apertura). Contradicciones detectadas entre documentos con su documento de resolución.
- **Evitar:** quejas sin impacto ni propuesta; pendientes sin dueño.
- **Calidad:** ningún `PEND` abierto sin pregunta clara; los resueltos migran a `decisiones.md`.
- **Actualizar cuando:** se detecta, resuelve o reclasifica algo.

---

## Criterios para fusionar, dividir, crear o eliminar documentos

| Acción | Condición |
| :--- | :--- |
| **Fusionar** | Dos documentos responden la misma pregunta o repiten reglas; se integra la información complementaria y se deja un solo documento maestro. |
| **Dividir** | Más de ~800 líneas o secciones que cambian por motivos distintos (p. ej. identidad visual vs. especificación por pantalla). |
| **Crear** | Existe información importante sin un lugar propio o una pregunta frecuente sin respuesta localizable. |
| **Eliminar / retirar** | Solo si es totalmente obsoleto y sin valor histórico; si hay valor, se marca `OBSOLETO` o se archiva con referencia. |
| **Mover / renombrar** | Cuando el nombre no dice lo que contiene; siempre con actualización de enlaces y nota en el changelog. |
