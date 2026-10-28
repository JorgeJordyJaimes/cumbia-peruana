# ADR 004: Conversión e Interceptación de Imágenes a WebP en el Cliente mediante Canvas API

* **Estado:** Aceptado e Implementado
* **Fecha:** 2026-10-07
* **Contexto:** Optimización multimedia patrimonial y políticas de Supabase Storage

---

## Contexto

El almacenamiento multimedia en **Kumbia Sound** está configurado en Supabase Storage bajo una política estricta de seguridad y rendimiento:
* El bucket fonográfico únicamente acepta archivos con el tipo MIME `image/webp`.
* Las imágenes de carátulas de LPs, galletas de 45 RPM y fotografías de músicos provienen habitualmente de escáneres de alta resolución o fotografías de coleccionistas en formatos sin comprimir como **PNG** o **JPEG** (pesos habituales de 3 MB a 12 MB).

### El Problema Operativo
Si un catalogador o investigador intentaba subir directamente un archivo `.jpg` o `.png` en el panel de administración (`/admin`), el bucket rechazaba la solicitud, exigiendo al usuario convertir manualmente sus archivos mediante software externo (Photoshop, conversores web) antes de poder catalogar.

---

## Decisión

Implementar un **pipeline de intercepción y compresión automática en el navegador** utilizando la **HTML5 Canvas API** dentro del componente de carga ([`ImageUploader`](file:///c:/Users/CACTU/Downloads/Proyectos/cumbia-peruana/src/features/storage/components/image-uploader.tsx)):

1. **Intercepción en Tiempo de Selección:**
   Al seleccionar o arrastrar un archivo de imagen (`.jpg`, `.jpeg`, `.png`, `.webp`), el componente detiene el envío y toma el control del `File` en memoria.
2. **Normalización Dimensional:**
   Si las dimensiones de la imagen original superan los **1600 px** en su eje mayor, se escala proporcionalmente para preservar la nitidez del arte editorial sin desperdiciar resolución innecesaria.
3. **Conversión a WebP en Memoria:**
   Se dibuja la imagen en un contexto `CanvasRenderingContext2D` y se genera un `Blob` en formato `image/webp` con factor de calidad **0.90**:
   ```typescript
   canvas.toBlob((blob) => resolve(blob), "image/webp", 0.90);
   ```
4. **Feedback de Rendimiento:**
   La interfaz calcula y muestra en tiempo real al usuario:
   * Formato de origen y peso original.
   * Peso final comprimido en WebP.
   * Porcentaje de reducción de ancho de banda (ahorros habituales del 60% al 85%).
5. **Carga Segura a Supabase:**
   El `Blob` resultante se envía a Supabase Storage con extensión `.webp` garantizando que nunca se produzca un rechazo por tipo de contenido.

---

## Consecuencias

### Positivas
* **Cero Sobrecarga de Servidor:** No consume memoria ni tiempo de cómputo en las funciones serverless de Vercel.
* **Ahorro Radical de Ancho de Banda:** Los archivos pesados de escáner se reducen en la máquina del cliente antes de viajar por la red hacia Supabase Storage.
* **Superación del Límite de Carga de Vercel:** Las funciones serverless de Vercel imponen un límite de payload de 4.5 MB; la compresión en el cliente asegura que las imágenes queden muy por debajo de dicho umbral.
* **Experiencia de Usuario Fluida:** El catalogador sube cualquier formato sin preocuparse por pasos intermedios.

### Negativas / Límites
* Requiere soporte de Canvas API en el navegador (soportado universalmente por todos los navegadores modernos en escritorio y móvil).

---

## Alternativas Descartadas

* **Ruta de API en el Servidor con `sharp` en Next.js:** Descartado porque exige subir la imagen gigante inicial a Vercel, sobrepasando los límites de payload serverless (4.5 MB) y consumiendo cuota de ejecución en la nube.
* **Servicios Externos de Transformación (Cloudinary, Uploadthing):** Descartado para mantener la infraestructura contenida exclusivamente en Supabase y evitar costos recurrentes de terceros.

---

## Documentación Relacionada
* [Arquitectura Técnica y Datos](../arquitectura-tecnica.md)
* [Manual de Catalogación e Ingesta a SQL](../manual-catalogacion-e-ingesta.md)
* [Lineamientos de Desarrollo](../lineamientos-desarrollo.md)
