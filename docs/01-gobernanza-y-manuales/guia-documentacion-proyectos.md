# 📋 Guía Maestra para Documentar Proyectos bajo el Estándar Docs-as-Code (Catálogos y E-commerce)

> **Guía Metodológica Transferible para Agentes de IA y Desarrolladores Senior**  
> *Instrucciones paso a paso para auditar, estructurar y redactar la documentación técnica de sistemas de comercio electrónico y catálogos web.*

---

## 1. 🎯 Propósito de esta Guía

Este documento sirve como directriz transferible para aplicar la misma rigurosidad técnica y organización modular desarrollada en Kumbia Sound a proyectos externos (por ejemplo, catálogos web comerciales, tiendas online y plataformas de e-commerce).

---

## 2. 🏛️ Estructura de la Suite de Documentación Recomendada

```text
├── README.md                                  # Único archivo Markdown en raíz
└── docs/
    ├── 01-gobernanza-y-manuales/
    │   ├── manual-operativo-proyecto.md       # Visión del producto, stack, variables de entorno
    │   ├── lineamientos-desarrollo-codigo.md  # TypeScript, componentes, estado y caching
    │   ├── flujo-git-y-convenciones.md        # Ciclo Git y Conventional Commits
    │   └── reglas-agentes-ia.md               # Directivas para asistentes de IA
    ├── 02-arquitectura-y-backend/
    │   └── arquitectura-sistema-y-datos.md    # Diagramas C4/Mermaid, APIs, checkout y BD
    ├── 03-diseno-uiux/
    │   └── sistema-diseno-catalogo.md         # Tokens de diseño, tipografía, paleta y PDPs
    ├── 04-especificaciones-y-requisitos/
    │   └── manual-catalogo-e-inventario.md    # SKUs, variantes, atributos, precios y stock
    ├── 05-soporte-y-resolucion/
    │   └── guia-resolucion-problemas.md       # Troubleshooting, pasarelas de pago y webhooks
    └── 06-bitacora-y-decisiones/
        └── adr/                               # Architecture Decision Records
```

---

## 3. 🔍 Proceso de Ejecución en 4 Fases

### Fase 1: Auditoría y Extracción de la Realidad del Código
1. **Inspección de Dependencias y Stack:**
   - Leer `package.json` para identificar frameworks (Next.js, Remix, Astro), librerías de interfaz (Tailwind, Radix UI, Shadcn) y SDKs de terceros (Stripe, Mercado Pago, Algolia, Cloudinary).
2. **Esquema de Datos y Modelado:**
   - Analizar esquemas relacionales (`prisma/schema.prisma`, DDL SQL, esquemas de Supabase).
   - Identificar entidades críticas: `Product`, `Category`, `Variant`, `Order`, `Cart`, `User`, `Inventory`.
3. **Mapeo de Rutas y Flujos:**
   - Rutas de catálogo: Home, Categorías, Detalle de Producto (PDP), Búsqueda y Filtros.
   - Flujos transaccionales: Carrito, Checkout, Generación de orden por WhatsApp o pasarela de pagos.

---

### Fase 2: Redacción de los Documentos Principales

#### 1. Manual Operativo del Proyecto
- Resumen ejecutivo del negocio (B2B o B2C).
- Mapa funcional de características.
- Stack tecnológico y justificación.
- Estructura de directorios anotada.
- Variables de entorno requeridas (públicas vs secretas).

#### 2. Arquitectura Técnica y Backend
- Diagrama global en Mermaid (`flowchart TD`).
- Flujo de datos del carrito y persistencia (LocalStorage, cookies de sesión, BD).
- Estrategia de renderizado (RSC, ISR para páginas de producto de alto tráfico).
- Seguridad: validación de entradas con Zod y verificación de firmas de webhooks de pago.

#### 3. Lineamientos de Desarrollo
- Prohibición de `any` y tipado estricto.
- Componentes de Servidor vs Componentes de Cliente.
- Convención de Conventional Commits en español.

#### 4. Manual de Catálogo e Inventario
- Modelo de datos del producto: SKUs, atributos dinámicos (talla, color), precios regulares vs ofertas.
- Taxonomía jerárquica de categorías y colecciones.
- Requisitos de imágenes (proporción, resolución y optimización WebP).
- Flujo de ingesta masiva (CSV/Excel, ERP o seeders).

#### 5. Bitácora de Decisiones (ADRs)
- Crear al menos `0001-stack-base.md` justificando la selección de framework, pasarela de pago y base de datos.

---

## 4. 📐 Criterios de Calidad

1. **Anti-Superficialidad:** Cero texto genérico o placeholders (`TODO`).
2. **Diagramas Funcionales:** Usar sintaxis Mermaid estricta (`flowchart TD`, `sequenceDiagram`).
3. **Perspectiva Dual:** Útil para el onboarding de un programador junior y preciso para guiar a una IA.
