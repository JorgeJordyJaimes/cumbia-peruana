# ADR 001: Restricción Estricta de Soportes Físicos a Lados A y B (1968–2005)

* **Estado:** Aceptado e Implementado
* **Fecha:** 2026-10-07
* **Contexto:** Preservación fonográfica analógica y modelado físico

---

## Contexto

En el diseño de sistemas de catálogo musical modernos o plataformas de streaming (Spotify, Apple Music, Discogs genérico), suele abstraerse el soporte físico o permitirse un abanico ilimitado de "lados" o "discos" (Discos 1, 2, 3, Lados A, B, C, D) para albergar álbumes dobles, triples o box sets internacionales.

Sin embargo, en la historia de la industria fonográfica peruana durante la etapa dorada y evolutiva de la cumbia (1968–2005), las matrices industriales de los sellos (*Infopesa, Discos Horóscopo, Sono Radio, El Virrey, Odeón / IEMPSA, Difa, Discope, Prodic*) operaron bajo un estándar físico unificado:
1. **Sencillos de 45 RPM (7"):** Estrictamente un surco en el Lado A y un surco en el Lado B.
2. **Álbumes LP de 33 RPM (12"):** Estrictamente Lado A y Lado B (promedio de 5 a 6 pistas por cara).
3. **Casetes de cinta magnética:** Estrictamente Lado A y Lado B.

En el período delimitado (1968–2005), la producción discográfica de cumbia peruana **no produjo prensajes dobles con Lados C o D**. Cualquier edición conmemorativa o compilación de varios discos comercializada en la época se distribuía como volúmenes independientes (ej. *Volumen 1*, *Volumen 2*), cada uno con su propio número de catálogo matriz y sus respectivos Lados A y B.

---

## Decisión

Se decidió imponer una restricción estricta tanto a nivel de motor de base de datos como en la capa de tipos de TypeScript y componentes de usuario:
1. **Constricción en PostgreSQL:**
   ```sql
   ALTER TABLE Albumes_Temas
   ADD CONSTRAINT chk_albumes_temas_lados_ab
   CHECK (lado IS NULL OR lado IN ('A', 'B'));
   ```
2. **Constricción en Splits (`Albumes_Grupos_Lados`):**
   ```sql
   ALTER TABLE Albumes_Grupos_Lados
   ADD CONSTRAINT chk_albumes_grupos_lados_ab
   CHECK (lado IN ('A', 'B'));
   ```
3. **Regla de Desarrollo:** Queda formalmente prohibido ampliar la lógica de la aplicación para admitir lados C, D u otros caracteres alfanuméricos.

---

## Consecuencias

### Positivas
* **Máxima Fidelidad Histórica:** El sistema refleja la realidad material de los vinilos y casetes peruanos sin anacronismos.
* **Integridad de Datos:** Previene errores de digitación por parte de catalogadores (evita entradas como `'a'`, `'Lado 1'`, `'Cara B'`, etc.).
* **Simplificación de la UI/UX:** Las tablas de pistas ([TracklistTable](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/src/features/temas/components/tracklist-table.tsx)) y los modales pueden agrupar los temas de forma predecible en dos pestañas o columnas analógicas: **Lado A** y **Lado B**.

### Negativas / Límites
* Si en el futuro se decidiera catalogar reediciones contemporáneas en vinilo doble lanzadas en el extranjero (por ejemplo, compilaciones europeas post-2010 de sellos como *Vampisoul*), dichas ediciones deberán ser catalogadas como dos volúmenes físicos relacionados mediante `id_album_original` o claves reflexivas.

---

## Alternativas Descartadas

* **Campo `VARCHAR` libre sin validación:** Descartado porque propiciaba dispersión de formatos, dificultaba el agrupamiento en interfaz y arruinaba la consistencia analítica.
* **Soporte permisivo para Lados C y D "por si acaso":** Descartado taxativamente. Introducir lados C y D en un archivo que cubre de 1968 a 2005 constituye un error musicológico y una distorsión del patrimonio físico peruano.

---

## Documentación Relacionada
* [Arquitectura Técnica y Datos](../arquitectura-tecnica.md)
* [Criterios de Catalogación](../criterios-catalogacion.md)
* [Manifiesto de Arquitectura](../manifiesto-arquitectura.md)
