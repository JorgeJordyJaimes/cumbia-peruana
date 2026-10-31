# Glosario Canónico de Términos

> **Propósito:** Definir de manera unívoca los conceptos musicológicos, fonográficos y técnicos empleados en la plataforma Kumbia Sound y su base de datos.
> **Responde a:** ¿Qué significa exactamente cada término en el proyecto? ¿Qué campo técnico representa cada concepto? ¿Qué confusiones y sinónimos están expresamente prohibidos?
> **Fuente principal de:** Definiciones ontológicas y terminológicas del dominio de cumbia peruana y metadatos DJ del proyecto.
> **No contiene (ver):** Invariantes y reglas de negocio del dominio → [dominio.md](dominio.md); modelo físico relacional → [../03-arquitectura/modelo-de-datos.md](../03-arquitectura/modelo-de-datos.md).
> **Depende de:** Ninguno (documento base de terminología).
> **Entregar a otra IA para:** Estandarización de lenguaje, redacción de interfaces, validación de consultas y mapeo de datos.
> **Estado:** VIGENTE · **Última revisión:** 2026-10-31 · **Describe la versión:** 0.1.0 / commit 04ef58c

---

## 1. Términos Fonográficos y del Soporte Físico

| Término | Definición Canónica | No confundir con | Nombre Técnico (Código / BD) | Sinónimos Prohibidos | Fuente de Verdad |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Sencillo (45 RPM)** | Disco de vinilo de 7 pulgadas que gira a 45 revoluciones por minuto, compuesto por exactamente dos surcos físicos: un tema en el Lado A y un tema en el Lado B. | EP (Extended Play) o Maxi-Single de 12''. | `id_tipo_album = 1` en `Tipos_Album` / `Albumes` | Single de 4 pistas, disco pequeño | Prensajes físicos de sellos peruanos (1968–2005) |
| **Álbum LP (33 RPM)** | *Long Play* de vinilo de 12 pulgadas reproducido a 33⅓ RPM, que agrupa entre 10 y 14 surcos distribuidos en dos caras (Lado A y Lado B). | Recopilatorio de varios artistas o casete. | `id_tipo_album = 2` en `Tipos_Album` / `Albumes` | Disco grande, vinilo genérico | Catálogos oficiales de sellos discográficos |
| **Lado Físico (A / B)** | Cara material del disco de vinilo o cinta de casete. En la fonografía peruana de 1968–2005 solo existen Lado A y Lado B. | Pista, surco o canal estéreo. | `lado VARCHAR(10)` en `Albumes_Temas` (`CHECK (lado IN ('A', 'B'))`) | Lado C, Lado D, Cara 1/2 | Industria fonográfica analógica peruana |
| **Surco Físico** | Hendidura en espiral prensada mecánicamente sobre el vinilo que contiene la señal de audio de una pista continua. | Canción u obra musical abstracta. | `id_album_tema` en `Albumes_Temas` | Canción, archivo de audio | Soporte de vinilo físico |
| **Prensa / Prensaje** | Tiraje o edición física manufacturada por una planta discográfica bajo un número de catálogo determinado. | Masterización o grabación en estudio. | `Albumes` (`numero_catalogo`) | Lanzamiento digital, re-subida | Registro de fábrica fonográfica |
| **Galleta (*Center Label*)** | Etiqueta circular de papel prensada en el centro del vinilo que contiene los créditos impresos de fábrica, títulos y autores. | Carátula o funda externa de cartón. | `foto_galleta_a`, `foto_galleta_b` en `Albumes`; `credito_galleta` en `Albumes_Temas` | Carátula, sticker, portada | Disco físico bajo custodia |
| **Matriz (*Dead Wax*)** | Código alfanumérico grabado o estampado a mano en el surco muerto del vinilo que identifica el corte de laca original. | Número de catálogo comercial. | `codigo_matriz` en `Albumes` | Código de barras, serial web | Surco muerto del vinilo |
| **Mosaico / Enganchado** | Pista física continua en vinilo o casete que encadena múltiples canciones interpretadas sin interrupción de surco. | Pistas separadas o popurrí en estudio con silencios. | `es_mosaico = TRUE` en `Albumes_Temas` y desglose en `Mosaicos_Temas` | Medley digital, remix, enganche falso | Tradición tropical de bailables |

---

## 2. Términos Musicológicos y de Autoría

| Término | Definición Canónica | No confundir con | Nombre Técnico (Código / BD) | Sinónimos Prohibidos | Fuente de Verdad |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Tema (Obra Musical)** | Creación intelectual y composición musical abstracta, independiente de los múltiples prensajes o versiones en los que se haya grabado. | Pista física de un vinilo específico. | `Temas` (`id_tema`, `titulo_tema`) | Pista, archivo MP3, corte | APDAYC / Partitura y autoría |
| **Compositor Real** | Persona natural con identidad legal y biográfica verificada que creó la letra o música de la obra. | Intérprete o titular de galleta. | `Personas.nombre` mediante `Temas_Compositores.id_compositor` | Autor ficticio, cantante | Partituras, registros legales y `Datos BD.ods` |
| **Crédito de Galleta (Seudónimo)** | Texto literal de autoría impreso físicamente en la etiqueta del vinilo, frecuentemente un alias para sortear contratos de exclusividad disquera ("piratería blanca"). | Nombre legal del compositor. | `credito_como` en `Temas_Compositores` y `credito_galleta` en `Albumes_Temas` | Nombre artístico general | Galleta física de vinilo |
| **Voz Principal** | Cantante solista principal que interpreta la lírica de una grabación en estudio. | Corista, animador o director musical. | `Tema_Musicos` (`id_rol = 5`, `instrumento = 'Voz'`) | Músico de sesión, coros | Fichas de audición y `Datos BD.ods` |
| **Pista Instrumental** | Grabación musical ejecutada exclusivamente por instrumentos musicales, sin participación lírica de cantantes solistas ni coros. | Pista con cantante desconocido. | `Temas_Generos` con `id_genero = 11` (`Instrumental`) y ausencia de fila en `Tema_Musicos` | Tema mudo, karaoke | Galleta de vinilo y audición |
| **Cumbia Chey** | Ritmo y patrón bailable distintivo creado por Víctor Casahuamán para el Grupo Celeste, caracterizado por síncopa de guitarra y golpe seco de timbal. | Cumbia costeña genérica. | `id_genero = 7` en `Generos` | Chicha común | Discografía de Grupo Celeste |
| **Cumbia Pompo** | Estilo rítmico de cumbia peruana con compás marcado y bajo prominente en los arreglos de estudio. | Cumbia comercial norteña. | `id_genero = 8` en `Generos` | Cumbión estándar | Grabaciones históricas (1974–1982) |
| **Cumbia Fuzz** | Vertiente psicodélica y andina de cumbia caracterizada por el uso intencional de pedales de distorsión (*fuzzbox*) en la primera guitarra eléctrica. | Rock psicodélico puro. | `id_genero = 12` en `Generos` | Cumbia distorsionada | Fonografía de Enrique Delgado, Casahuamán y Manzanita |

---

## 3. Términos Técnicos DJ y Acústicos

| Término | Definición Canónica | No confundir con | Nombre Técnico (Código / BD) | Sinónimos Prohibidos | Fuente de Verdad |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Tempo (BPM)** | Pulsos por minuto (*Beats Per Minute*) que marcan la velocidad rítmica de ejecución de una grabación musical. | Compás o compás de compasillo. | `bpm INT` en `Temas` | Velocidad aproximada, pitch | Análisis de software DJ y metrónomo digital |
| **Código Camelot** | Sistema de notación alfanumérica (1A–12B) basado en la Rueda Camelot para facilitar mezclas armónicas entre canciones en el mismo tono o tonos vecinos. | Notación musical clásica (Am, C#m, Sol Mayor). | `camelot_code VARCHAR(10)` en `Temas` | Tonalidad tradicional, círculo de quintas clásico | Mixed In Key / Rueda Camelot estándar |
| **Mezcla Armónica** | Técnica DJ que combina dos temas musicales sin colisión de tonalidades mediante compatibilidad en la Rueda Camelot (mismo número, +/- 1 o salto A/B). | Transición por simple corte o volumen. | Motor interactivo de compatibilidad en `/match-bpm` | Empalme de temas | Teoría de mezcla para DJs |
| **Duración en Segundos** | Tiempo total de reproducción del tema expresado estrictamente como un número entero de segundos. | Cadena de texto con minutos y segundos (`MM:SS`). | `duracion_segundos INT` en `Temas` | Tiempo textual, minutaje | Cronómetro de reproducción digital |

---

## 4. Actualizar cuando
- Se incorpore un nuevo término de la industria fonográfica o del ámbito DJ.
- Se identifique una confusión recurrente entre dos conceptos en el código o en la documentación.
- Se añada una nueva vertiente o subgénero con denominación técnica especializada.

## 5. Pendientes
- Ninguno activo.
