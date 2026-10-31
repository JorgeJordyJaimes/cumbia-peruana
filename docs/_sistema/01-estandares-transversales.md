# 01 · Estándares Transversales de Documentación

> Reglas que cumple **todo** documento de **todo** proyecto, sea cual sea su perfil.
> Dependencia: ninguna. Lo leen los demás archivos del sistema.

---

## 1. Principios

1. **Verdadero:** describe lo que existe; lo deseado va marcado como propuesta o en el roadmap.
2. **Único:** cada dato tiene una fuente principal; lo demás enlaza.
3. **Completo para su propósito:** contiene todo lo necesario para la tarea que declara, ni más ni menos.
4. **Verificable:** reglas medibles, comandos ejecutables, valores trazables a un archivo.
5. **Autocontenido:** se entiende solo (más las dependencias declaradas) y puede entregarse a otra IA.
6. **Trazable:** cada requisito, decisión y problema tiene ID y estado; es posible seguir el rastro requisito → implementación → prueba.
7. **Mantenible:** su sección "Actualizar cuando" dice qué cambios lo invalidan.

Extensión no es calidad: un documento tiene el nivel de detalle que exige su función.

---

## 2. Cabecera obligatoria de todo documento

Todo `.md` de `docs/` (salvo `README.md` raíz y `AGENTS.md`) comienza con:

```markdown
# <Título del documento>

> **Propósito:** una frase.
> **Responde a:** las preguntas que resuelve (2-5).
> **Fuente principal de:** los datos/reglas que SOLO viven aquí.
> **No contiene (ver):** temas cercanos y dónde están → [enlace].
> **Depende de:** documentos que deben leerse antes → [enlaces].
> **Entregar a otra IA para:** tareas posibles (p. ej. "optimizar rendimiento", "migrar de estilo", "reproducir el entorno") y con qué otros archivos.
> **Estado:** BORRADOR | VIGENTE | OBSOLETO · **Última revisión:** AAAA-MM-DD · **Describe la versión:** x.y.z / commit abc1234
```

Reglas de la cabecera:
- "Fuente principal de" y "No contiene" son la defensa contra duplicados y contradicciones. Si dos documentos reclaman la misma fuente principal, hay un error que resolver.
- "Describe la versión" permite saber si el documento está desfasado respecto al código.
- La fecha usa formato ISO (AAAA-MM-DD).

---

## 3. Estructura interna

- Un solo `#` (título). Secciones `##` numeradas (`## 1. ...`) y subsecciones `### 1.1`. Numeración **continua y sin saltos**; si se reordenan secciones, se renumeran y se corrigen las referencias cruzadas en el mismo cambio.
- Las referencias a secciones se hacen con enlace ancla o `§N` con el nombre del documento; nunca "ver sección 3.4" sin decir de qué documento.
- Tablas para datos comparables o enumerables (campos, colores, comandos, variables). Listas para pasos y criterios. Prosa para justificar y explicar.
- Diagramas en Mermaid (texto versionable) cuando aclaran flujo, arquitectura o relaciones; siempre acompañados de explicación en texto.
- Bloques de código con lenguaje (` ```bash `, ` ```json `, ` ```sql `).
- Emojis solo en títulos y de forma opcional; **nunca** como único portador de significado.
- Documentos largos: índice al inicio si superan ~300 líneas.
- Cierra cada documento con la sección **"Actualizar cuando"** (qué eventos lo invalidan) y, si aplica, **"Pendientes"** (los `PEND` que afectan a este documento).

---

## 4. Estados y vocabulario

Se usan **dos ejes independientes**.

**Estado de decisión** (de requisitos, decisiones, reglas):

| Estado | Significado |
| :--- | :--- |
| `CONFIRMADA` | El propietario la aprobó o es hecho verificado. |
| `PROPUESTA` | Sugerida por el agente u otra fuente, sin aprobar. |
| `PENDIENTE` | Hay que decidirla; no hay propuesta cerrada. |
| `OBSOLETA` | Sustituida o descartada. Se conserva con enlace a quien la reemplaza. |

**Estado de implementación:**

| Estado | Significado |
| :--- | :--- |
| `IMPLEMENTADO` | Existe en el código y funciona; verificado. |
| `PARCIAL` | Existe incompleto; la nota dice qué falta. |
| `NO IMPLEMENTADO` | Aún no existe. |

Notación recomendada para una línea: `RF-014 · CONFIRMADA · IMPLEMENTADO`.

Nunca se escribe en presente de indicativo algo `PROPUESTA` o `NO IMPLEMENTADO` como si existiera.

---

## 5. Identificadores

| Prefijo | Qué identifica | Dónde vive |
| :--- | :--- | :--- |
| `RF-NNN` | Requisito funcional | `requisitos.md` |
| `RNF-NNN` | Requisito no funcional | `requisitos.md` |
| `RN-NNN` | Regla de negocio / de dominio | `requisitos.md` o `dominio.md` |
| `INV-NNN` | Invariante inviolable del dominio | `dominio.md` |
| `UC-NNN` | Caso de uso / flujo | `flujos-de-usuario.md` |
| `DEC-NNN` | Decisión | `decisiones.md` |
| `PEND-NNN` | Pendiente que requiere al propietario | `problemas-conocidos.md` (sección Pendientes) |
| `TD-NNN` | Deuda técnica / problema conocido | `problemas-conocidos.md` |
| `RIE-NNN` | Riesgo | `problemas-conocidos.md` |
| `ESC-NN` | Escenario de medición | `rendimiento.md` |
| `TOK-` | Token de diseño (prefijo opcional) | `sistema-visual.md` |

Reglas: IDs numerados correlativos y **nunca reutilizados**; un ID eliminado se marca `OBSOLETA`, no se borra. Los IDs se citan desde otros documentos y desde commits (`feat: ... (RF-014)`).

---

## 6. Nombres, ubicación y enlaces

- Archivos y carpetas: ASCII, minúsculas, guiones (`modelo-de-datos.md`). Sin tildes, ñ, espacios ni mayúsculas (salvo `README.md`, `AGENTS.md`, `CHANGELOG`-style si el equipo lo prefiere).
- Ningún `.md` fuera de `docs/` excepto `README.md`, `AGENTS.md` y los apuntadores de herramientas (`GEMINI.md`, `CLAUDE.md`, etc., que solo contienen: "Las reglas están en `AGENTS.md`" + las excepciones específicas de esa herramienta).
- Enlaces relativos al archivo que los contiene (`../03-arquitectura/arquitectura.md`). Prohibido: rutas absolutas, `file:///`, carpetas fuera del repo, enlaces a documentos inexistentes.
- Los documentos referenciados deben existir. Si una referencia es a algo futuro, se escribe como `PEND` o se enlaza al roadmap.
- Los nombres de documentos no cambian sin dejar nota en el `changelog` de documentación y actualizar todos los enlaces.

---

## 7. Datos que deben extraerse del código, no de la memoria

Siempre se copian de la fuente real y se indica el archivo de origen:

- Versiones de lenguajes, frameworks y herramientas (lockfiles, archivos de versión).
- Comandos de ejecución, compilación y prueba (scripts del manifiesto).
- Variables de entorno (de `.env.example` y del código que las lee).
- Campos y tipos (esquemas, tipos compartidos, migraciones).
- Colores, fuentes, espaciados, radios (configuración del tema, CSS, tokens).
- Comandos/endpoints/eventos (definiciones en el código).
- Métricas (archivos de medición exportados, no cifras de memoria).

Si el valor del documento y el del código difieren, el código es la evidencia: se corrige el documento o se registra la divergencia como `TD`/`PEND` si el código es el que está mal.

---

## 8. Calidad: criterios generales de revisión

Un documento está bien elaborado si cumple **todos** los puntos aplicables:

| Criterio | Prueba |
| :--- | :--- |
| Claro | Una persona técnica ajena al proyecto lo entiende sin preguntar. |
| Preciso | No contiene adjetivos sin criterio ("rápido", "moderno"), ni cifras sin unidad ni contexto. |
| Completo | Contiene todo lo exigido por su especificación en `02-catalogo-de-documentos.md` y su perfil. |
| Coherente | No contradice a ningún otro documento (revisar términos clave y números). |
| Verificable | Cada regla indica cómo comprobarla; cada comando se ejecutó. |
| Actual | "Describe la versión" coincide con el código actual, o está marcado desfasado. |
| Trazable | IDs, estados y enlaces correctos. |
| Autocontenido | Cumple la prueba de "entregar a otra IA". |

**Prueba de la IA ciega:** simula entregar el documento (más sus dependencias) a una IA sin acceso al repositorio con la tarea declarada en "Entregar a otra IA para". Si le faltan datos para hacerla, el documento está incompleto.

---

## 9. Errores comunes que deben evitarse

| Error | Corrección |
| :--- | :--- |
| Mezclar gobernanza, funcionalidades y decisiones en un solo archivo | Un archivo por responsabilidad y ritmo de cambio |
| Repetir la misma regla en varios documentos | Fuente principal + enlaces |
| Documentar lo planeado como si existiera | Estados + roadmap |
| Numeración y referencias heredadas de fusiones | Renumerar y revisar enlaces tras cada fusión |
| Documento "local, no versionar" | Versionar; excluir solo secretos |
| Valores aproximados ("unos 12 px") | Valores exactos copiados de la fuente |
| Reglas sin verificación ("código limpio") | Regla + herramienta/criterio que la comprueba |
| Nombres engañosos (un archivo "requisitos" que es de instalación) | El nombre dice lo que contiene |
| Registros de medición reescritos | Se conservan inmutables; el estado actual va en `rendimiento.md` |
| Acrónimos y términos sin definir | Glosario |

---

## 10. Documentación de la propia documentación

Los cambios estructurales de documentación (crear, fusionar, dividir, mover, renombrar, eliminar) se registran en `docs/07-gestion/changelog.md` bajo el encabezado `Documentación` con: fecha, acción, archivos implicados y motivo. Los commits de documentación usan el prefijo `docs:` y son atómicos (un cambio coherente por commit).
