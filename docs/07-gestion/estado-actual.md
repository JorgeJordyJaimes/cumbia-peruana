# 07 · Estado Actual Verificado del Archivo

> **Propósito:** Concentrar en un único lugar las métricas reales del catálogo, el estado de las migraciones y el resultado de la puerta de calidad, para evitar que los conteos se dupliquen o queden desactualizados en distintos documentos.
> **Responde a:**
> - ¿Cuántos álbumes, temas, surcos y créditos existen realmente hoy?
> - ¿Qué cobertura tiene el catálogo (portadas, tracklists, BPM, Camelot, versiones)?
> - ¿Qué migraciones están aplicadas y cuáles están pendientes en la instancia remota?
> - ¿Cuál es el estado actual de la puerta de calidad?
> **Fuente principal de:** Instantánea operativa del catálogo y del esquema remoto.
> **No contiene (ver):**
> - Reglas del dominio → [../01-proyecto/dominio.md](../01-proyecto/dominio.md)
> - Diccionario de tablas → [../03-arquitectura/modelo-de-datos.md](../03-arquitectura/modelo-de-datos.md)
> - Deuda técnica y riesgos → [problemas-conocidos.md](problemas-conocidos.md)
> **Estado:** VIGENTE · **Última revisión:** 2026-11-22
> **Método:** Consultas de lectura a la instancia configurada en `.env.local` y ejecución local de la puerta de calidad.

---

## 1. Volumen real del catálogo

| Entidad | Registros verificados |
| :--- | ---: |
| Álbumes / soportes | **717** |
| Singles de 45 RPM | **377** |
| LPs de 33 RPM | **340** |
| EPs, casetes y CDs | **0** |
| Temas / obras musicales | **278** |
| Surcos físicos (`Albumes_Temas`) | **320** |
| Créditos de sesión (`Tema_Musicos`) | **236** |
| Segmentos de mosaico (`Mosaicos_Temas`) | **54** |
| Grupos | **581** |
| Personas | **416** |
| Sellos discográficos | **258** |
| Artículos publicados | **1** |
| Versiones registradas (`Versiones`) | **0** |
| Álbumes split (`Albumes_Grupos_Lados`) | **0** |

---

## 2. Cobertura del catálogo

| Indicador | Valor |
| :--- | ---: |
| Álbumes con al menos una pista | **100** |
| Álbumes solo con metadata (sin tracklist) | **617** |
| Temas con BPM registrado | **274 / 278** |
| Temas con Camelot registrado | **274 / 278** |
| Temas con letra transcrita | **9 / 278** |
| Temas sin duración | **24 / 278** |
| Temas sin compositor registrado | **45 / 278** |
| Álbumes con portada frontal | **33 / 717** |
| Álbumes con contraportada | **32 / 717** |
| Álbumes con foto de galleta | **0 / 717** |
| Personas con fotografía | **0 / 416** |

### Grupos con tracklist completo o parcial

| Grupo | Álbumes con pistas |
| :--- | ---: |
| Grupo Celeste | 43 |
| Cielo Gris | 30 |
| El Super Grupo | 27 |

El resto de agrupaciones tiene apariciones puntuales en temas o singles, pero no una discografía con tracklist completo.

---

## 3. Estado del esquema remoto

La instancia configurada responde a las consultas del catálogo, pero **no expone las tablas editoriales** de la migración `20261031120000_modulo_redaccion_editorial.sql`:

- `informes_personas`: `PGRST205` (no encontrada en el schema cache).
- `radar_hallazgos`: `PGRST205`.
- `legajo_bloques`: `PGRST205`.
- `grupo_historias`: `PGRST205`.
- `grupo_etapas`: `PGRST205`.

Consecuencia: el código del panel administrativo y las páginas públicas ya tienen el contrato de lectura/escritura, pero la funcionalidad editorial queda inactiva hasta aplicar la migración o recargar el schema cache de PostgREST.

La migración de endurecimiento `20261122000000_admin_rls_hardening.sql` y la de restricciones `20261122000001_domain_constraints_and_voice_normalization.sql` también están pendientes de aplicar en la instancia remota.

---

## 4. Estado de seguridad

- El registro público de Supabase Auth está **habilitado** (`disable_signup: false`).
- Las políticas RLS anteriores concedían mutaciones a **cualquier usuario autenticado**.
- La nueva migración `20261122000000_admin_rls_hardening.sql` introduce `public.is_admin()` y restringe las mutaciones al administrador.
- Mientras la migración no se aplique, la brecha persiste en la instancia remota.

**Acción obligatoria del propietario:** aplicar la migración y deshabilitar el registro público en Supabase Auth.

---

## 5. Puerta de calidad local

| Comando | Resultado |
| :--- | :--- |
| `npm run typecheck` | ✅ Sin errores |
| `npm run lint` | ✅ Sin errores ni advertencias de ESLint |
| `npm run build` | ✅ Compila correctamente |

---

## 6. Actualizar cuando

- Se complete una nueva ingesta masiva de discografías.
- Se apliquen las migraciones editoriales o de seguridad en Supabase.
- Cambie la cobertura de portadas, tracklists, versiones o fotografías.
- Se modifique la puerta de calidad del repositorio.
