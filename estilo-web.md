# 🪗 KUMBIA SOUND // MANUAL DE IDENTIDAD VISUAL & SISTEMA DE DISEÑO BRUTALISTA EDITORIAL

> **CLASIFICACIÓN DEL DOCUMENTO:** `CONFIDENCIAL // GUÍA DE ESTILO OFICIAL // FOLIO 000-SYS`  
> **ESTADO:** `CANÓNICO Y VIGENTE // OPTIMIZACIÓN UI/UX CONSOLIDADA`  
> **ORIGEN DEL ARCHIVO:** `BUCARAMANGA, COLOMBIA // ARCHIVO HISTÓRICO DE LA CUMBIA PERUANA (1968–2005)`

---

## 1. 🏛️ FILOSOFÍA Y CONCEPTO NARRATIVO

### 1.1. La Identidad: «Archivo Nacional Desclasificado meets Neo-Brutalismo Suizo & Vintage Vinyl Editorial»
La web de **Kumbia Sound** no es un SaaS genérico, ni una aplicación musical moderna con degradados morados o fondos de cristal oscuro difuminado (*glassmorphism estándar*). 

El universo visual simula **un archivo pericial gubernamental y fonográfico de las décadas de 1970 y 1980**. Cada pieza discográfica es tratada como una **evidencia bajo custodia**, cada subpágina es un **expediente clasificado desclasificado al público**, y cada interacción técnica (como el *Match BPM*, la *Consola DJ* o la *Rueda Camelot*) se concibe como **maquinaria de peritaje y hardware analógico de alta precisión**.

### 1.2. Principios Rectores Inquebrantables
1. **Tangibilidad Analógica e Impresa:** Emulación de papel manila envejecido, cartón de carpeta de archivo, tinta negra de imprenta tipográfica y sellos de caucho o lacre.
2. **Cero Bordes Redondeados Genéricos:** Se destierran los `rounded-xl`, `rounded-2xl` y `rounded-full` en contenedores estructurales principales. Las tarjetas, marcos y botones son cajas rectilíneas con bordes sólidos de `2px` (`rounded-none`).
3. **Física Mecánica Coherente de Luz y Sombras:** La luz proviene siempre de la esquina superior-izquierda (`top-left`). Las sombras se proyectan rígidamente hacia abajo y la derecha (`+X, +Y`). Al interactuar, los botones se elevan hacia la luz al hacer hover y se hunden mecánicamente contra el papel al hacer clic (`active`).
4. **Suelo Tipográfico Mínimo de 11px:** Prohibición absoluta de textos microscópicos (`text-[8px]`, `text-[9px]`, `text-[10px]`). Todo metadato pericial tiene como suelo legible `text-[11px]` en `font-mono`.
5. **Colores Sólidos y Puros (Cero Opacidades Fantasma):** Prohibido el uso de transparencias arbitrarias con canal alfa (`/20`, `/15`, `/10`). Todos los colores de fondo, bordes y texto son sólidos y opacos, garantizando contraste pericial.
6. **Desambiguación Semántica del Rojo:** El color rojo (`#E80000`, `#C91D1D`) está reservado con rigor forense para sellos confidenciales, pitch frenado y alertas de sistema. El BPM se presenta en tinta negra neutra (`#1F1305`).
7. **Arquitectura de Carpeta Archivadora Fusión:** La navegación no son enlaces flotantes; son pestañas de cartón físico que se fusionan de forma continua con el fondo de la página activa.
8. **Lenguaje Narrativo Institucional:** Ningún elemento utiliza vocabulario estándar web (e.g., no se dice "Ver canciones" sino "AUDITAR REGISTROS DEL PRENSAJE").

---

## 2. 🎨 PALETA CROMÁTICA CANÓNICA Y TOKENS CSS

La paleta está calibrada para ofrecer el máximo contraste analógico sobre fondo cálido, recordando la papelería de juzgado, las fundas de vinilo de sellos peruanos (*Infopesa, Discos Horóscopo, Sono Radio, Virrey*) y la señalética industrial de estudio de grabación.

### 2.1. Tabla de Colores Primarios y Semánticos

| Muestra | Nombre Conceptual | Código Hex | Variable / Token | Rol Semántico & Uso Estricto |
| :---: | :--- | :--- | :--- | :--- |
| ![#EDE0D0](https://via.placeholder.com/20/EDE0D0/000000?text=+) | **Papel Manila / Cartón Archivo** | `#EDE0D0` | `--color-brutalist-cream` | **Fondo global de la web** y contenedores primarios. Nunca blanco puro de fondo ni gris frío. |
| ![#1F1305](https://via.placeholder.com/20/1F1305/FFFFFF?text=+) | **Tinta Espresso / Negro Carbón** | `#1F1305` | `--color-brutalist-black` | **Tinta principal, trazos y bordes de 2px**. Trazo estructural de toda la aplicación y color canónico de BPM. |
| ![#E80000](https://via.placeholder.com/20/E80000/FFFFFF?text=+) | **Rojo Sello Oficial / Lacre** | `#E80000` | `--color-logo-red` | **Acento primario**. Sellos "CONFIDENCIAL", alertas periciales, botón principal, estrellas `★` y sombras activas de hover. |
| ![#C91D1D](https://via.placeholder.com/20/C91D1D/FFFFFF?text=+) | **Rojo Desaceleración / Pitch Frenado**| `#C91D1D` | `--color-pitch-red` | **Pitch frenado (-%)** en consolas DJ, alertas críticas de disco dañado o desarmonía. |
| ![#F1730C](https://via.placeholder.com/20/F1730C/FFFFFF?text=+) | **Naranja Radiactivo / Marcador** | `#F1730C` | `--color-brutalist-orange`| **Acento secundario**. Títulos resaltados, EXP. 03 (Radar), EXP. 06 (Evidencias), badges de rarezas. |
| ![#F8C800](https://via.placeholder.com/20/F8C800/000000?text=+) | **Amarillo Mostaza Técnico** | `#F8C800` | `--color-logo-gold` | **Cintas de advertencia**, especificaciones de motor de base de datos, sellos dorados de prensaje. |
| ![#FFFFFF](https://via.placeholder.com/20/FFFFFF/000000?text=+) | **Blanco Ficha / Prensaje Limpio** | `#FFFFFF` | `--color-brutalist-white` | **Superficie de tarjetas interiores**, pestaña de carpeta activa, campos de búsqueda y fondo de contraste. |
| ![#FAF5EE](https://via.placeholder.com/20/FAF5EE/000000?text=+) | **Crema Claro / Papel Peritaje** | `#FAF5EE` | `bg-[#FAF5EE]` | Superficies secundarias de lectura, filas alternas de tablas y fondos de campos inactivos. |
| ![#746B5C](https://via.placeholder.com/20/746B5C/FFFFFF?text=+) | **Tinta Gastada / Pardo Documental** | `#746B5C` | `--color-ink-faded` | **Metadatos secundarios**, códigos de folio, leyendas de pie, etiquetas de soporte físico. |
| ![#5A5245](https://via.placeholder.com/20/5A5245/FFFFFF?text=+) | **Gris Café / Subtítulo Editorial** | `#5A5245` | `--color-ink-editorial` | Subtítulos de obras, nombres de intérpretes, separadores de columna y tonalidad Camelot secundaria. |
| ![#10B981](https://via.placeholder.com/20/10B981/FFFFFF?text=+) | **Verde Registro / Pitch Positivo** | `#10B981` | `--color-chicha-green` | **Estados de verificación aprobada**, indicador de tempo DJ, compatibilidad armónica y pitch acelerado (+%). |
| ![#3E2C1B](https://via.placeholder.com/20/3E2C1B/FFFFFF?text=+) | **Marrón Cuero / Borde Tostado** | `#3E2C1B` | `--color-border-leather` | Divisores sutiles en secciones oscuras y bordes de acento de cuero. |

---

## 3. ✍️ SISTEMA TIPOGRÁFICO Y SUELO MÍNIMO DE 11px

El sistema descansa en **cuatro tipografías con funciones claramente delimitadas**:

```text
1. COOPER BLACK (font-cooper)  → Identidad, Títulos de Álbumes, Artistas, Tradición Chicha/70s.
2. ANTON / IMPACT (font-anton) → Cartelería Monumental Suiza, Afiche Gigante, Números de Folio.
3. GEIST MONO (font-mono)      → Datos Técnicos, Especificaciones DJ, BPM, Frecuencia, Relojes, Tablas.
4. GEIST SANS (font-sans)      → Textos de lectura corrida y párrafos de crónicas editoriales.
```

### 3.1. Regla Inquebrantable: Suelo Tipográfico Mínimo 11px
- **Quedan terminantemente prohibidas las clases:** `text-[8px]`, `text-[9px]` y `text-[10px]`.
- El tamaño más pequeño permitido en toda la aplicación es `text-[11px] font-mono font-bold` (empleado en créditos de galleta, sellos y códigos de matriz).
- Los datos principales de catálogo y tablas utilizan `text-xs` (12px) y `text-sm` (14px).

### 3.2. Clases y Variables CSS
- **Cooper Black:** `font-cooper` (variable `--font-cooper`, con fallback `Shrikhand, serif`).
- **Anton:** `font-anton` (variable `--font-anton`, con fallback `Impact, 'Arial Black', sans-serif`).
- **Monoespaciada:** `font-mono` (variable `--font-geist-mono`).
- **Sans:** `font-sans` (variable `--font-geist-sans`).

### 3.3. Escala y Reglas de Formateo de Títulos

#### Titular Monolítico Poster (Estilo Afiche Suizo):
```tsx
<div className="border-l-4 border-[#1F1305] pl-4 sm:pl-6 leading-[0.88] tracking-tighter font-anton uppercase text-[50px] sm:text-[72px] md:text-[90px] lg:text-[112px]">
  <div className="text-[#1F1305]">EL REY DE LAS</div>
  <div className="text-[#1F1305]">CUMBIAS</div>
  <div className="text-[#F1730C] flex items-baseline">
    <span>PEGADITAS</span>
    <span className="inline-block w-3 h-3 sm:w-4 sm:h-4 bg-[#E80000] ml-3 align-baseline" />
  </div>
</div>
```
* **Regla de Puntuación Brutalista:** Nunca usar punto final convencional (`.`); se utiliza un bloque cuadrado sólido en rojo (`bg-[#E80000]`) alineado a la base del texto.
* **Interlineado de Impacto:** `leading-[0.88]` o `leading-none` con `tracking-tighter`. Las líneas casi deben tocarse entre sí.

---

## 4. 🕹️ FÍSICA MECÁNICA DE BOTONES, SOMBRAS E INPUTS

### 4.1. Coherencia Vectorial de la Fuente de Luz
Toda la interfaz responde a un vector de luz cenital izquierda (`top-left`), proyectando sombras duras en sentido positivo (`+X, +Y`).

### 4.2. Estados del Botón Mecánico
1. **Estado en Reposo:**
   - Borde: `border-2 border-[#1F1305]`
   - Sombra: `shadow-[3px_3px_0px_#1F1305]` o `shadow-[4px_4px_0px_#1F1305]`
2. **Estado Hover (Elevación):**
   - El botón se eleva físicamente hacia la luz: `hover:-translate-x-0.5 hover:-translate-y-0.5`
   - La sombra se expande y adquiere tinte de acento: `hover:shadow-[5px_5px_0px_#E80000]` o `hover:shadow-[6px_6px_0px_#1F1305]`
3. **Estado Active (Hundimiento Táctil):**
   - El botón se presiona físicamente contra la superficie: `active:translate-x-0.5 active:translate-y-0.5`
   - La sombra colapsa por compresión: `active:shadow-none`

### 4.3. Inputs con Foco Brutalista
Los campos de búsqueda y formularios no tienen halos de luz difusos ni anillos tenues:
```tsx
<input
  type="text"
  placeholder="AUDITAR POR TÍTULO, SELLO O ARTISTA..."
  className="w-full border-2 border-[#1F1305] bg-white px-4 py-3 font-mono text-xs font-bold uppercase tracking-wider text-[#1F1305] shadow-[3px_3px_0px_#1F1305] placeholder:text-[#746B5C] transition-all focus:-translate-x-0.5 focus:-translate-y-0.5 focus:border-[#1F1305] focus:outline-none focus:shadow-[5px_5px_0px_#E80000]"
/>
```

### 4.4. Estado Vacío Pericial (Empty State)
Cuando una búsqueda o filtro no produce resultados, se presenta un sello de archivo pericial inclinado:
```tsx
<div className="border-2 border-[#1F1305] bg-white p-8 text-center shadow-[6px_6px_0px_#1F1305]">
  <div className="inline-block -rotate-2 border-2 border-dashed border-[#E80000] bg-[#EDE0D0] px-4 py-2 font-mono text-sm font-black uppercase text-[#E80000] shadow-[3px_3px_0px_#1F1305]">
    EXPEDIENTE NO LOCALIZADO // 404 MATRIZ
  </div>
  <p className="mt-3 font-mono text-xs font-bold text-[#5A5245]">
    No se localizaron registros bajo los criterios de peritaje actuales.
  </p>
  <button
    type="button"
    onClick={resetFiltros}
    className="mt-5 inline-flex items-center gap-2 border-2 border-[#1F1305] bg-[#E80000] px-5 py-2.5 font-mono text-xs font-black uppercase text-white shadow-[3px_3px_0px_#1F1305] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#1F1305] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
  >
    [ REINICIAR CRITERIOS DE PERITAJE ]
  </button>
</div>
```

---

## 5. 📑 ARQUITECTURA DE PESTAÑAS DE CARPETA (NAVBAR FOLDER TABS)

La barra de navegación principal simula la cejilla física de una carpeta de legajos periciales:

### 5.1. Fusión con el Canvas de la Página
- **Pestaña Inactiva:** Fondo crema `#EDE0D0`, borde completo `#1F1305`, texto atenuado en `#5A5245`.
- **Pestaña Activa:**
  - Se proyecta 2px hacia abajo: `translate-y-[2px]`.
  - Fondo blanco puro idéntico al folio principal: `bg-white`.
  - Pestaña de acento superior roja de 4px: `border-t-4 border-t-[#E80000]`.
  - **Fusión inferior:** `border-b-white` (elimina la línea horizontal, fusionando la pestaña directamente con el contenido).

### 5.2. Metadatos de Dos Niveles en Pestañas
Cada pestaña incorpora su número de expediente institucional y su descriptor:
```tsx
<Link
  href="/genealogia"
  className={cn(
    "relative flex flex-col justify-center px-4 py-2.5 font-mono text-left transition-all border-2 border-[#1F1305]",
    isActive
      ? "bg-white border-t-4 border-t-[#E80000] border-b-white translate-y-[2px] z-10 shadow-[0_-2px_0_#1F1305]"
      : "bg-[#EDE0D0] hover:bg-[#FAF5EE] text-[#5A5245]"
  )}
>
  <span className="text-[11px] font-bold text-[#746B5C] uppercase tracking-wider">
    EXP. 01: GENEALOGÍA
  </span>
  <span className="text-xs font-black uppercase text-[#1F1305]">
    Árbol de Músicos
  </span>
</Link>
```

---

## 6. 🎛️ CONSOLA DJ, PITCH SEMÁNTICO Y RESPONSIVE MOBILE

Las herramientas fonográficas (`/match-bpm`, `CreaTuMix`) responden a especificaciones de tornamesa de dos platos:

### 6.1. Badges de Pitch Sólidos y Semánticos
- **Aceleración (Pitch Positivo):** Sólido Verde `#10B981` con texto negro carbón `#1F1305`:
  ```tsx
  <span className="border border-[#1F1305] bg-[#10B981] text-[#1F1305] px-2 py-0.5 font-mono text-[11px] font-black uppercase shadow-[1px_1px_0px_#1F1305]">
    ▲ +2.4% ACELERADO
  </span>
  ```
- **Desaceleración (Pitch Negativo):** Sólido Rojo Vino `#C91D1D` con texto blanco puro `#FFFFFF`:
  ```tsx
  <span className="border border-[#1F1305] bg-[#C91D1D] text-white px-2 py-0.5 font-mono text-[11px] font-black uppercase shadow-[1px_1px_0px_#1F1305]">
    ▼ -1.8% FRENADO
  </span>
  ```
- **Calibrado Cuarzo (0.0% Pitch):** Sólido Crema `#EDE0D0` con texto `#1F1305`:
  ```tsx
  <span className="border border-[#1F1305] bg-[#EDE0D0] text-[#1F1305] px-2 py-0.5 font-mono text-[11px] font-black uppercase shadow-[1px_1px_0px_#1F1305]">
    ● 0.0% CALIBRADO
  </span>
  ```

### 6.2. Conmutador Móvil de Platos (`< lg`)
En pantallas estrechas, la consola de DJ no desborda la pantalla ni fuerza scroll horizontal. Proporciona una botonera táctil superior para seleccionar qué plato o mixer se visualiza:
```tsx
<div className="grid grid-cols-3 gap-2 border-2 border-[#1F1305] bg-white p-1.5 shadow-[4px_4px_0px_#1F1305] lg:hidden">
  <button
    type="button"
    onClick={() => setMobileDeckView("deckA")}
    className={cn(
      "border-2 border-[#1F1305] py-2 font-mono text-xs font-black uppercase tracking-wider transition-all",
      mobileDeckView === "deckA"
        ? "bg-[#1F1305] text-[#EDE0D0] shadow-[2px_2px_0px_#E80000]"
        : "bg-white text-[#1F1305] hover:bg-[#EDE0D0]"
    )}
  >
    ● PLATO A
  </button>
  <button
    type="button"
    onClick={() => setMobileDeckView("mixer")}
    className={cn(
      "border-2 border-[#1F1305] py-2 font-mono text-xs font-black uppercase tracking-wider transition-all",
      mobileDeckView === "mixer"
        ? "bg-[#1F1305] text-[#EDE0D0] shadow-[2px_2px_0px_#E80000]"
        : "bg-white text-[#1F1305] hover:bg-[#EDE0D0]"
    )}
  >
    MIXER
  </button>
  <button
    type="button"
    onClick={() => setMobileDeckView("deckB")}
    className={cn(
      "border-2 border-[#1F1305] py-2 font-mono text-xs font-black uppercase tracking-wider transition-all",
      mobileDeckView === "deckB"
        ? "bg-[#1F1305] text-[#EDE0D0] shadow-[2px_2px_0px_#E80000]"
        : "bg-white text-[#1F1305] hover:bg-[#EDE0D0]"
    )}
  >
    ○ PLATO B
  </button>
</div>
```

---

## 7. 🗂️ GLOSARIO Y LENGUAJE DEL UNIVERSO NARRATIVO

Queda estrictamente prohibido usar jerga web común o corporativa. Se debe aplicar siempre el **lexicón de archivo fonográfico judicial**:

| Término Convencional Prohibido | Término Oficial del Universo Kumbia Sound | Ejemplo de Aplicación en UI |
| :--- | :--- | :--- |
| Álbum / Disco / Vinilo | **Evidencia / Prensaje Físico / Soporte Matriz** | *"719+ EVIDENCIAS EN CUSTODIA"* |
| Canción / Track | **Registro Sonoro / Pista / Corte / Obra** | *"AUDITORÍA DE REGISTROS DEL LADO A"* |
| Secciones de la Web | **Expedientes (EXP. 01 a EXP. 06)** | *"EXP. 02 // CONSOLA MATCH BPM"* |
| Base de datos / Catálogo | **Bóveda de Evidencias / Archivo Fonográfico** | *"BÓVEDA DE PRENSAJES HISTÓRICOS"* |
| Disqueras / Sellos | **Sellos Matrices / Casas Editoras** | *"MATRIZ BAJO EL SELLO INFOPESA"* |
| Artista / Músico | **Sujeto de Interés / Músico de Sesión / Custodio**| *"SUJETO DE INTERÉS: ENRIQUE DELGADO"* |
| Panel de Administración | **Panel [SYS] ↗ // Nivel de Acceso Desclasificado** | *"PANEL [SYS] ↗ // ACCESO A MATRICES"* |
| Filtros / Categorías | **Criterios de Peritaje / Ficha de Clasificación** | *"FILTRAR POR PRENSAJE Y MATRIZ"* |
| Duración total del álbum | **Cómputo Cronológico de Pistas** | *"DURACIÓN MATRIZ: 38:42 MIN"* |
| Crédito de Autor en Disco | **Crédito en Galleta (Seudónimo Contractual)** | *"CRÉDITO EN GALLETA: D.R. / SEUDÓNIMO"* |
| Carátula / Portada | **Soporte Físico (Cara A / Cara B / Portada)** | *"VISOR DE EVIDENCIA: LADO A / LADO B"* |

---

## 8. 🛠️ CATÁLOGO DE SNIPPETS CANÓNICOS REUTILIZABLES

### 8.1. Badge DJ Oficial (Desambiguación de Rojo y Suelo 11px)
```tsx
<div className="inline-flex items-center gap-1.5 border border-[#1F1305] bg-[#EDE0D0] px-2 py-0.5 font-mono text-[11px] font-bold text-[#1F1305] shadow-[1px_1px_0px_#1F1305]">
  {/* Indicador ortogonal verde de tempo */}
  <span className="h-1.5 w-1.5 shrink-0 bg-[#10B981] border border-[#1F1305]" />
  
  {/* BPM en tinta negra pura */}
  <span className="font-black text-[#1F1305]">
    102 <span className="text-[11px] text-[#746B5C] font-normal">BPM</span>
  </span>

  <span className="text-[#746B5C] select-none">|</span>

  {/* Código Camelot en caja negra con texto crema */}
  <span className="bg-[#1F1305] text-[#EDE0D0] px-1 py-0.2 font-black">
    8A
  </span>
  <span className="hidden sm:inline text-xs font-bold text-[#5A5245]">
    (Am)
  </span>
</div>
```

### 8.2. Botón de Acción Principal con Física Mecánica
```tsx
<button
  type="button"
  className="border-2 border-[#1F1305] bg-[#E80000] text-white px-5 py-2.5 font-mono text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_#1F1305] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#1F1305] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-2 cursor-pointer"
>
  <span>AUDITAR PRENSAJE</span>
  <span>→</span>
</button>
```

### 8.3. Botón Secundario (Blanco Ficha)
```tsx
<button
  type="button"
  className="border-2 border-[#1F1305] bg-white text-[#1F1305] px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider shadow-[2px_2px_0px_#1F1305] hover:bg-[#EDE0D0] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#1F1305] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
>
  VER LADO B
</button>
```

### 8.4. Tarjeta Móvil Adaptativa para Tracklist (`< sm`)
```tsx
<div className="border-2 border-[#1F1305] bg-white p-3 shadow-[2px_2px_0px_#1F1305] space-y-2">
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <span className="font-mono text-xs font-black bg-[#1F1305] text-[#EDE0D0] px-1.5 py-0.5">
        A1
      </span>
      <span className="font-mono text-[11px] font-bold text-[#746B5C]">
        03:24 MIN
      </span>
    </div>
    {/* Badge DJ */}
  </div>

  <div className="font-cooper text-base font-bold text-[#1F1305]">
    EL AGUAJAL
  </div>

  <div className="space-y-1 font-mono text-[11px] pt-1 border-t border-[#EDE0D0]">
    <div className="flex items-center justify-between text-[#5A5245]">
      <span className="font-bold text-[#746B5C]">VOZ:</span>
      <span className="font-bold text-[#1F1305]">JULIO SIMEÓN</span>
    </div>
    <div className="flex items-center justify-between text-[#5A5245]">
      <span className="font-bold text-[#746B5C]">AUTOR:</span>
      <span className="font-medium text-[#1F1305]">LOS SHAPIS</span>
    </div>
  </div>
</div>
```

---

## 9. 🚫 ANTI-PATRONES DEFINITIVOS: LO QUE NUNCA SE DEBE HACER

1. ❌ **Prohibido textos sub-11px:** Nunca utilizar `text-[8px]`, `text-[9px]` o `text-[10px]`. El suelo mínimo de lectura institucional es `text-[11px]`.
2. ❌ **Prohibido BPM en color rojo:** El BPM es un dato técnico neutral; debe ser negro carbón `#1F1305` font-black. El rojo queda confinado al pitch frenado y alertas de sistema.
3. ❌ **Prohibido opacidades arbitrarias y colores lavados:** No usar `/20`, `/15` ni `/10` sobre fondos crema. Los colores deben ser sólidos (`#FAF5EE`, `#EDE0D0`, `#746B5C`, `#5A5245`, `#3E2C1B`).
4. ❌ **Prohibido esquinas redondeadas modernas:** No uses `rounded-2xl`, `rounded-3xl` ni `rounded-full` en cajas de contenido, tarjetas de catálogo o modales. Todo es ortogonal (`rounded-none`).
5. ❌ **Prohibido sombras difuminadas con desenfoque:** `shadow-lg`, `shadow-xl` o `shadow-2xl` de Tailwind estándar están vetadas en favor de `shadow-[Xpx_Xpx_0px_#1F1305]`.
6. ❌ **Prohibido fondos oscuros genéricos de IA:** Nada de `bg-[#0a0a0c]` o `bg-zinc-900` para páginas públicas. Toda la experiencia de usuario debe nacer del fondo crema `#EDE0D0` con textura de puntos.
7. ❌ **Prohibido enlazar el panel de administración en la misma pestaña:** Todo enlace hacia `/admin` debe llevar indefectiblemente `target="_blank" rel="noopener noreferrer"`.
8. ❌ **Prohibido utilizar términos de software SaaS:** "Dashboard", "Pricing", "Features", "Soluciones", "Registrarse gratis". El léxico es documental, arqueológico, musical y pericial.
