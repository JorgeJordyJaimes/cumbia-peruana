-- ============================================================
-- MIGRACIÓN: SISTEMA DE BLOG Y CONFIGURACIÓN EDITABLE DEL HOME
-- ============================================================

-- 1. TABLA DE ARTÍCULOS / BLOG
CREATE TABLE IF NOT EXISTS articulos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  resumen TEXT,
  contenido TEXT NOT NULL,
  imagen_portada_url TEXT,
  autor_nombre TEXT NOT NULL DEFAULT 'Kumbia Sound // Archivo Histórico',
  categoria TEXT NOT NULL DEFAULT 'Historia & Vinilos',
  tiempo_lectura TEXT NOT NULL DEFAULT '5 min de lectura',
  publicado BOOLEAN NOT NULL DEFAULT false,
  fecha_publicacion TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Habilitar RLS en articulos
ALTER TABLE articulos ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para articulos
-- Lectura: Anónimos solo ven artículos publicados; administradores autenticados ven todos (incluyendo borradores)
DROP POLICY IF EXISTS "Lectura articulos" ON articulos;
CREATE POLICY "Lectura articulos" ON articulos
  FOR SELECT
  USING (publicado = true OR auth.role() = 'authenticated');

-- Escritura: Solo usuarios autenticados pueden insertar, actualizar o eliminar
DROP POLICY IF EXISTS "Escritura articulos autenticados" ON articulos;
CREATE POLICY "Escritura articulos autenticados" ON articulos
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 2. TABLA DE CONFIGURACIÓN DEL HOME
CREATE TABLE IF NOT EXISTS configuracion_home (
  id INT PRIMARY KEY CHECK (id = 1),
  cintillo_texto TEXT NOT NULL DEFAULT 'CATÁLOGO & ARCHIVO DISCOGRÁFICO HISTÓRICO // EDICIONES DE COLECCIÓN 1968–2005',
  cintillo_activo BOOLEAN NOT NULL DEFAULT true,
  hero_insignia TEXT NOT NULL DEFAULT 'Archivo & Curaduría de Vinilos',
  hero_titulo TEXT NOT NULL DEFAULT 'El Sonido Inmortal de la Cumbia Peruana',
  hero_subtitulo TEXT NOT NULL DEFAULT 'Explora 719+ vinilos originales, la genealogía de sus pioneros y el motor de compatibilidad armónica Camelot.',
  hero_boton_texto TEXT NOT NULL DEFAULT 'Explorar Archivo',
  hero_boton_url TEXT NOT NULL DEFAULT '#catalogo',
  albumes_destacados_ids INT[] DEFAULT '{}',
  seccion_blog_activa BOOLEAN NOT NULL DEFAULT true,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Habilitar RLS en configuracion_home
ALTER TABLE configuracion_home ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para configuracion_home
DROP POLICY IF EXISTS "Lectura publica configuracion_home" ON configuracion_home;
CREATE POLICY "Lectura publica configuracion_home" ON configuracion_home
  FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Escritura configuracion_home autenticados" ON configuracion_home;
CREATE POLICY "Escritura configuracion_home autenticados" ON configuracion_home
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 3. INSERTAR FILA INICIAL POR DEFECTO EN configuracion_home (SI NO EXISTE)
INSERT INTO configuracion_home (
  id,
  cintillo_texto,
  cintillo_activo,
  hero_insignia,
  hero_titulo,
  hero_subtitulo,
  hero_boton_texto,
  hero_boton_url,
  albumes_destacados_ids,
  seccion_blog_activa
) VALUES (
  1,
  'CATÁLOGO & ARCHIVO DISCOGRÁFICO HISTÓRICO // EDICIONES DE COLECCIÓN 1968–2005',
  true,
  'Archivo & Curaduría de Vinilos',
  'El Sonido Inmortal de la Cumbia Peruana',
  'Explora 719+ vinilos originales, la genealogía de sus pioneros y el motor de compatibilidad armónica Camelot.',
  'Explorar Archivo',
  '#catalogo',
  ARRAY[1, 2, 3]::INT[],
  true
) ON CONFLICT (id) DO NOTHING;

-- 4. INSERTAR UN ARTÍCULO HISTÓRICO DE EJEMPLO PARA INAUGURAR EL BLOG
INSERT INTO articulos (
  titulo,
  slug,
  resumen,
  contenido,
  autor_nombre,
  categoria,
  tiempo_lectura,
  publicado
) VALUES (
  'El Nacimiento de la Cumbia Peruana: De las Costas de Lima a la Selva Amazónica',
  'nacimiento-de-la-cumbia-peruana',
  'Una crónica exhaustiva sobre cómo Enrique Delgado y Los Destellos fusionaron los ritmos tropicales colombianos con la guitarra eléctrica criolla y el rock psicodélico en 1968.',
  '## El Génesis de un Género Inmortal

A finales de la década de 1960, el panorama musical de Lima vivía una efervescencia irrepetible. En los estudios de grabación de sellos legendarios como **Discos Odeón** e **Iempsa**, un grupo de músicos virtuosos comenzó a experimentar con un instrumento que cambiaría para siempre la música popular del continente: **la guitarra eléctrica Fender Stratocaster**.

### Enrique Delgado y Los Destellos (1968)

Tradicionalmente, la cumbia que llegaba de Colombia se interpretaba con acordeón y vientos. Sin embargo, **Enrique Delgado Montes**, un maestro de la guitarra criolla con formación clásica, decidió sustituir el acordeón por requintos y punteos eléctricos cargados de reverberación.

Con temas fundamentales como *"El Avispón"* y *"Caminito Serrano"*, Los Destellos crearon lo que hoy conocemos como **Cumbia Peruana**: un híbrido fascinante entre el ritmo afrocaribeño, el sentimiento del huayno andino y la psicodelia del surf rock.

> "La cumbia en el Perú no imitó a nadie; tomó la guitarra eléctrica y la hizo cantar con el lamento del ande y la sabrosura criolla."

### La Fiebre Amazónica: Los Mirlos y Juaneco

Mientras Lima bailaba al compás de la guitarra costeña, en Moyobamba y Pucallpa surgía una vertiente aún más mística y envolvente: la **Cumbia Amazónica**.

Grupos como **Los Mirlos** y **Juaneco y su Combo** introdujeron el sonido del órgano Farfisa y sintetizadores análogos, evocando los misterios de la selva y las ceremonias ancestrales. Sus discos prensados en vinilo de 33 y 45 RPM hoy son piezas de culto mundial en tornamesas desde Tokio hasta Berlín.

### Preservación en Kumbia Sound

Este archivo digital nace para salvaguardar cada prensaje original, cada número de catálogo y cada variación armónica de una era dorada que sigue viva en cada surco.',
  'Kumbia Sound // Archivo Histórico',
  'Historia & Orígenes',
  '4 min de lectura',
  true
) ON CONFLICT (slug) DO NOTHING;
