# ADR 002: Modelado Relacional de Mosaicos, Popurrís y Enganchados (`Mosaicos_Temas`)

* **Estado:** Aceptado e Implementado
* **Fecha:** 2026-10-07
* **Contexto:** Catalogación de surcos físicos analógicos compuestos y autoría intelectual granular

---

## Contexto

En la discografía de la cumbia peruana (especialmente durante las décadas de 1980 y 1990 con agrupaciones como *El Cuarteto Continental, Armonía 10, Agua Marina, Grupo 5* y *Los Destellos*), fue una práctica industrial sumamente extendida grabar **enganchados, mosaicos o popurrís**.

En el soporte analógico (LP o Casete), un mosaico constituye **un único surco físico continuo** en el disco de vinilo (por ejemplo, *Lado A, Pista 4: "Mosaico Costeño"*), pero en su interior agrupa de dos a cuatro composiciones distintas, cada una con su propia autoría intelectual, compositores independientes, tonalidades y tempos.

### El Dilema del Modelado
1. Si registramos cada fragmento como una pista independiente en `Albumes_Temas`, inventamos pistas físicas que no existen en el vinilo, rompiendo la numeración impresa en la galleta y carátula física.
2. Si registramos el mosaico como una sola canción plana (ej. *"Mosaico N° 1"*), invisibilizamos a los compositores reales de cada segmento, impedimos vincular los temas a sus grabaciones originales y bloqueamos el árbol genealógico de versiones.

---

## Decisión

Se diseñó una solución desacoplada que separa la realidad física del surco en el vinilo del desglose autoral de sus componentes:

1. **Bandera en la Pista Física (`Albumes_Temas`):**
   Se agregó una columna booleana que identifica si el surco físico es un popurrí:
   ```sql
   ALTER TABLE Albumes_Temas 
   ADD COLUMN es_mosaico BOOLEAN DEFAULT FALSE;
   ```
2. **Tabla Relacional de Desglose Segmentado (`Mosaicos_Temas`):**
   Se creó una tabla intermedia que desglosa cada canción contenida en el mosaico con su orden de ejecución y duración estimada:
   ```sql
   CREATE TABLE Mosaicos_Temas (
       id_mosaico_tema SERIAL PRIMARY KEY,
       id_album_tema INT NOT NULL REFERENCES Albumes_Temas(id_album_tema) ON DELETE CASCADE,
       id_tema INT NOT NULL REFERENCES Temas(id_tema) ON DELETE CASCADE,
       orden_segmento SMALLINT NOT NULL,
       duracion_segmento_segundos INT DEFAULT NULL,
       UNIQUE (id_album_tema, orden_segmento),
       CONSTRAINT chk_orden_segmento_pos CHECK (orden_segmento > 0)
   );
   ```
3. **Métricas Armónicas y DJ:**
   * La pista contenedora en `Albumes_Temas` mantiene las métricas globales del surco (duración total del bloque, BPM dominante y tono inicial).
   * Cada segmento enlazado en `Mosaicos_Temas` referencia a su propio registro en `Temas`, preservando sus compositores en `Temas_Compositores` y su relación de versiones en `Versiones`.

---

## Consecuencias

### Positivas
* **Respeto a la Matriz Física:** El tracklist principal del disco refleja exactamente las pistas y los surcos prensados en el vinilo.
* **Precisión Autoral y Derechos:** Cada compositor recibe crédito formal en la base de datos por su obra dentro del mosaico.
* **Integración al Grafo Genealógico:** Si un enganchado versiona un tema clásico de 1971, la función de árbol de versiones ([`get_genealogia_versiones`](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/supabase/migrations/20261007000000_historical_schema_and_genealogy_rpc.sql#L76)) puede rastrear el segmento sin distorsionar el álbum de origen.

### Negativas / Costes
* Las interfaces que despliegan el detalle de un álbum ([AlbumDetailModal](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/src/features/albumes/components/album-detail-modal.tsx) y [TracklistTable](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/src/features/temas/components/tracklist-table.tsx)) deben ejecutar una subconsulta relacional o desplegar un acordeón expandible para mostrar los sub-segmentos cuando `es_mosaico = TRUE`.

---

## Alternativas Descartadas

* **Crear pistas artificiales con números decimales (ej. Pista 3.1, 3.2):** Descartado porque rompe las convenciones de catalogación estándar, complica las restricciones únicas `UNIQUE (id_album, numero_pista)` y altera la fidelidad al diseño de la etiqueta del vinilo.
* **Concatenar cadenas de texto en `titulo_tema` ("Tema A / Tema B / Tema C"):** Descartado terminantemente. Destruye la normalización de la base de datos, impide búsquedas exactas e invisibiliza las relaciones de clave foránea.

---

## Documentación Relacionada
* [ADR 001: Restricción Estricta de Soportes Físicos a Lados A y B](001-soporte-estricto-lados-a-b.md)
* [Arquitectura Técnica y Datos](../arquitectura-tecnica.md)
* [Manual de Catalogación e Ingesta a SQL](../manual-catalogacion-e-ingesta.md)
