# 📑 Registros de Decisiones de Arquitectura (ADRs)

Este directorio documenta las **Decisiones de Arquitectura de Software (Architecture Decision Records)** adoptadas en el proyecto **Kumbia Sound / Archivo Histórico de la Cumbia Peruana**.

Cada registro detalla el contexto histórico-tecnológico, la decisión adoptada, las consecuencias asociadas y las alternativas descartadas.

---

## Índice de Decisiones

| Identificador | Título del Registro | Estado | Fecha | Área de Dominio |
| :--- | :--- | :--- | :--- | :--- |
| [**ADR 001**](001-soporte-estricto-lados-a-b.md) | Restricción Estricta de Soportes Físicos a Lados A y B (1968–2005) | Aceptado | 2026-10-07 | Fonografía / Modelo Relacional |
| [**ADR 002**](002-modelado-mosaicos-y-enganchados.md) | Modelado Relacional de Mosaicos, Popurrís y Enganchados (`Mosaicos_Temas`) | Aceptado | 2026-10-07 | Catalogación / Pistas de Vinilo |
| [**ADR 003**](003-resolucion-grafo-genealogico-rpc.md) | Resolución de Consultas Genealógicas Complejas mediante Procedimientos en PostgreSQL (RPC) y Recursión | Aceptado | 2026-10-07 | Base de Datos / Rendimiento |
| [**ADR 004**](004-conversion-cliente-webp.md) | Conversión e Interceptación de Imágenes a WebP en el Cliente mediante Canvas API | Aceptado | 2026-10-07 | Frontend / Supabase Storage |

---

## Estructura Estándar de los Registros

Todo nuevo ADR en este repositorio debe redactarse siguiendo el formato:
1. **Identificador y Título:** Numeración secuencial de tres dígitos en kebab-case (`00X-mi-decision.md`).
2. **Estado y Fecha:** `Propuesto`, `Aceptado`, `Reemplazado` o `Descartado`.
3. **Contexto:** El problema técnico o histórico que motivó la decisión.
4. **Decisión:** La solución arquitectónica implementada.
5. **Consecuencias:** Impactos positivos, compensaciones (*trade-offs*) y limitaciones.
6. **Alternativas Descartadas:** Soluciones evaluadas y motivos técnicos por los que fueron rechazadas.

---

## Documentación Relacionada
* [Arquitectura Técnica y Datos](../arquitectura-tecnica.md)
* [Lineamientos de Desarrollo](../lineamientos-desarrollo.md)
* [Criterios de Catalogación](../criterios-catalogacion.md)
* [Manifiesto de Arquitectura](../manifiesto-arquitectura.md)
