import os
import re
from odf import opendocument, table, teletype

print("=== SCRIPT GENERADOR DE INGESTA FONOGRÁFICA ===")

# -------------------------------------------------------------
# 1. Parsear Datos BD.ods
# -------------------------------------------------------------
doc = opendocument.load('docs/datos-investigacion/Datos BD.ods')
sheets = {}
for sheet in doc.spreadsheet.getElementsByType(table.Table):
    sname = sheet.getAttribute('name')
    rows = []
    for row in sheet.getElementsByType(table.TableRow):
        rc = []
        for cell in row.getElementsByType(table.TableCell):
            rep = cell.getAttribute('numbercolumnsrepeated')
            txt = teletype.extractText(cell).strip()
            c = int(rep) if rep else 1
            if not txt and c > 30: continue
            for _ in range(c): rc.append(txt)
        while rc and not rc[-1]: rc.pop()
        if any(rc): rows.append(rc)
    sheets[sname] = rows

def get_col(r, idx):
    return r[idx].strip() if len(r) > idx else ''

def parse_duration(val):
    if not val: return None
    val = val.strip()
    if not val: return None
    if ':' in val:
        parts = val.split(':')
        if len(parts) == 2: return int(parts[0]) * 60 + int(parts[1])
        if len(parts) == 3: return int(parts[0]) * 3600 + int(parts[1]) * 60 + int(parts[2])
    try:
        f = float(val)
        return round(f * 1440) if f < 1.0 else round(f)
    except:
        return None

def parse_camelot(val):
    if not val: return None
    m = re.search(r'0?([1-9]|1[0-2])([ABab])', val)
    return f"{m.group(1)}{m.group(2).upper()}" if m else None

def parse_bpm(val):
    if not val: return None
    try:
        return round(float(val))
    except:
        return None

def parse_bool(val):
    return val.strip().upper() in ['SI', 'SÍ']

def esc(val):
    if val is None: return 'NULL'
    return "'" + str(val).replace("'", "''") + "'"

# -------------------------------------------------------------
# 2. Catálogos y Mapeos
# -------------------------------------------------------------
sello_id_map = {
    'infopesa': 1, 'horóscopo': 2, 'discos horóscopo': 2, 'sonoradio': 3, 'sono radio': 3,
    'odeón': 4, 'midas': 5, 'fta': 6, 'music shop': 7, 'prodisar': 8, 'caravana record': 9,
    'volcán': 10, 'difa': 11, 'universal': 12, 'caracol': 13, 'disgonza': 14, 'dinsa': 15,
    'do re mi': 16, 'colibrí': 17, 'producciones markahuasi': 18, 'bambú': 19, 'prod music': 20,
    'discope': 25, 'rosa record': 33, 'iempsa': 36, 'prodic': 49, 'emucel': 62, 'prodita': 84,
    'avispa': 93, 'kozmoz': 105
}

grupo_id_map = {
    'los destellos': 1,
    'los diablos rojos': 2,
    'los mirlos': 3,
    'los ecos': 4,
    'los yungas': 5,
    'juaneco y su combo': 6,
    'la nueva crema': 7,
    'chacalón y la nueva crema': 7,
    'grupo celeste': 12,
    'los invasores de progreso': 15,
    'los dexter\'s de uchiza': 16,
    'cielo gris': 22,
    'los ovnis': 27,
    'sonido 2000 de tarapoto': 29,
    'armonia 10': 35,
    'armonía 10': 35,
    'los sanders de ñaña': 25,
    'los sanders': 25,
    'los shapis': 9,
    'grupo guinda': 8,
    'grupo alegría': 19,
    'el super grupo': 23,
    'grupo melodía': 44,
    'los titanes': 36,
    'los beta 5': 18,
    'los orientales de paramonga': 45,
    'la constelación': 27, # alter ego or group
    'los blue kings de ñana': 25
}

genero_id_map = {
    'cumbia costeña': 1,
    'cumbia amazónica': 2,
    'cumbia andina / chicha': 3,
    'cumbia norteña': 4,
    'cumbia sureña': 5,
    'cumbia romántica / sanjuanera': 6,
    'cumbia chey': 7,
    'cumbia pompo': 8,
    'guaracha': 9,
    'cumbión': 10,
    'instrumental': 11,
    'cumbia fuzz': 12,
    'cumbia rítmica': 13,
    'cumbia elegante': 14,
    'chicha andina': 15,
    'balada': 16,
    'bolero': 17,
    'merengue': 18,
    'rock': 19,
    'mosaico': 20,
    'cumbia andina': 21,
    'chicha': 22,
    'beat soul': 23,
    'cumbia carretera': 24,
    'cumbión amazónico': 25,
    'cumbion amazonico': 25
}

new_personas = [
    'Abel Rubio Campos',
    'Alberto Hinostroza',
    'Carlos Marvin Alvarado Maguiña',
    'Gilberto Reátegui',
    'Grimaldo Soto',
    'Herling Narciso Tolentino Álvarez',
    'Hernán Neira',
    'Isidoro Sósimo Sacramento Nolasco',
    'Javier Valenzuela',
    'Julio Cáceres',
    'Lito Estupiñán',
    'Roberto Belester',
    'Roberto Luti Corrieri',
    'Rómulo Rubén Meza Povis',
    'Tomás Pacheco Claros',
    'W. Flores'
]

# Normalizar nombre de persona
def resolve_persona(pname):
    pname = pname.strip()
    if not pname or pname.lower() in ['d.r.', 'd.r', 'varios', 'varios autores', 'varioa autores', 'desconocido']:
        return None
    if pname.lower() == 'enrique delgado':
        return 'Enrique Delgado Montes'
    if pname.lower() in ['lito estupiñan', 'lito estupiñán']:
        return 'Lito Estupiñán'
    if pname.lower() == 'carlos marvin alvarado maguina':
        return 'Carlos Marvin Alvarado Maguiña'
    return pname

# -------------------------------------------------------------
# 3. Actualizar personas.sql
# -------------------------------------------------------------
personas_file = 'supabase/data/base/personas.sql'
with open(personas_file, 'r', encoding='utf-8') as fp:
    p_content = fp.read()

p_missing_to_add = [p for p in new_personas if f"'{p}'" not in p_content]
if p_missing_to_add:
    print(f"Agregando {len(p_missing_to_add)} personas a {personas_file}...")
    # Replace last semicolon with commas and append new personas
    idx_semi = p_content.rfind(');')
    if idx_semi != -1:
        prefix = p_content[:idx_semi]
        # format additions
        additions = ",\n" + ",\n".join([f"('{p}', '')" for p in p_missing_to_add]) + ");\n"
        new_p_content = prefix + additions
        with open(personas_file, 'w', encoding='utf-8') as fp:
            fp.write(new_p_content)
        print("  ✓ personas.sql actualizado exitosamente.")
else:
    print("  ✓ personas.sql ya contiene todas las personas requeridas.")

# -------------------------------------------------------------
# 4. Actualizar generos.sql
# -------------------------------------------------------------
generos_file = 'supabase/data/base/generos.sql'
with open(generos_file, 'r', encoding='utf-8') as fp:
    g_content = fp.read()

new_generos_to_add = [
    (23, 'Beat Soul'),
    (24, 'Cumbia Carretera'),
    (25, 'Cumbión Amazónico')
]
g_to_add = [g for g in new_generos_to_add if f"'{g[1]}'" not in g_content]
if g_to_add:
    print(f"Agregando {len(g_to_add)} géneros a {generos_file}...")
    # Find ON CONFLICT
    on_conflict_idx = g_content.find('ON CONFLICT')
    # Find last tuple before ON CONFLICT
    last_tuple_idx = g_content.rfind(')', 0, on_conflict_idx)
    prefix = g_content[:last_tuple_idx+1]
    suffix = g_content[last_tuple_idx+1:]
    additions = ",\n" + ",\n".join([f"({gid}, '{gname}')" for gid, gname in g_to_add])
    new_g_content = prefix + additions + suffix
    with open(generos_file, 'w', encoding='utf-8') as fp:
        fp.write(new_g_content)
    print("  ✓ generos.sql actualizado exitosamente.")
else:
    print("  ✓ generos.sql ya contiene todos los géneros requeridos.")

# -------------------------------------------------------------
# 5. Actualizar ingreso-singles.sql
# -------------------------------------------------------------
singles_file = 'supabase/data/vinilos/ingreso-singles.sql'
with open(singles_file, 'r', encoding='utf-8') as fp:
    s_content = fp.read()

# 5.1 Corregir Emucel Grupo Celeste (líneas 114 a 126 aprox)
emucel_sql_old = """(12, 62, '80-001', 1980, 1, FALSE, FALSE, FALSE, TRUE, NULL, NULL, FALSE, NULL, ''),
(12, 62, '81-001', 1981, 1, FALSE, FALSE, FALSE, TRUE, NULL, NULL, FALSE, NULL, ''),
(12, 62, '81-003', 1981, 1, FALSE, FALSE, FALSE, TRUE, NULL, NULL, FALSE, NULL, ''),
(12, 62, '83-001', 1983, 1, FALSE, FALSE, FALSE, TRUE, NULL, NULL, FALSE, NULL, ''),
(12, 62, '83-002', 1983, 1, FALSE, FALSE, FALSE, TRUE, NULL, NULL, FALSE, NULL, ''),
(12, 62, '84-004', 1984, 1, FALSE, TRUE, FALSE, FALSE, 'Ambos', NULL, FALSE, NULL, 'Incluido en el LP Palomita (HLP-1044)');"""

emucel_sql_new = """(12, 62, '001-80', 1980, 1, FALSE, FALSE, FALSE, TRUE, NULL, NULL, FALSE, NULL, ''),
(12, 62, '001-81', 1981, 1, FALSE, TRUE, FALSE, FALSE, 'Lado B', (SELECT id_album FROM Albumes WHERE id_grupo = 12 AND numero_catalogo = 'INF-208304'), FALSE, NULL, ''),
(12, 62, '003-81', 1981, 1, FALSE, FALSE, FALSE, TRUE, NULL, NULL, FALSE, NULL, ''),
(12, 62, '001-83', 1983, 1, FALSE, FALSE, FALSE, TRUE, NULL, NULL, FALSE, NULL, ''),
(12, 62, '002-83', 1983, 1, FALSE, FALSE, FALSE, TRUE, NULL, NULL, FALSE, NULL, ''),
(12, 62, '004-84', 1984, 1, FALSE, TRUE, FALSE, FALSE, 'Ambos', (SELECT id_album FROM Albumes WHERE id_grupo = 12 AND numero_catalogo = 'HLP-1044'), FALSE, NULL, 'Incluido en el LP Palomita (HLP-1044)');"""

if emucel_sql_old in s_content:
    s_content = s_content.replace(emucel_sql_old, emucel_sql_new)
    print("  ✓ Emucel Grupo Celeste corregido en ingreso-singles.sql.")

# 5.2 Reemplazar Cielo Gris en ingreso-singles.sql
cg_section_start = s_content.find("---------------------------------------------------------------------------------------------------------------------- CIELO GRIS")
cg_section_end = s_content.find("---------------------------------------------------------------------------------------- LOS DESTELLOS", cg_section_start)

cielo_gris_singles_sql = """---------------------------------------------------------------------------------------------------------------------- CIELO GRIS ----------------------------------------------------------------------------------------------------------------------

-- CARACOL
INSERT INTO Albumes (
    id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, 
    es_disco_split, incluido_en_lp, extraido_de_lp, solo_en_45, lados_en_lp, 
    id_lp_relacionado, es_reedicion, id_album_original, comentario)

VALUES

(22, 13, '03', 1975, 1, FALSE, FALSE, FALSE, TRUE, NULL, NULL, FALSE, NULL, ''),
(22, 13, '003', 1978, 1, FALSE, FALSE, FALSE, TRUE, NULL, NULL, TRUE, (SELECT id_album FROM Albumes WHERE id_grupo = 22 AND id_sello = 13 AND numero_catalogo = '03'), 'Reedición de Caracol 03, se sabe que es una reedición porque el número de catálogo empieza esta vez con doble cero.'),
(22, 13, '013', 1975, 1, FALSE, FALSE, FALSE, TRUE, NULL, NULL, FALSE, NULL, ''),
(22, 13, '0013', 1978, 1, FALSE, FALSE, FALSE, FALSE, NULL, NULL, TRUE, (SELECT id_album FROM Albumes WHERE id_grupo = 22 AND id_sello = 13 AND numero_catalogo = '013'), 'Reedición de Caracol 013, se sabe que es una reedición porque el número de catálogo empieza esta vez con doble cero.'),
(22, 13, '018', 1976, 1, FALSE, FALSE, FALSE, TRUE, NULL, NULL, FALSE, NULL, ''),
(22, 13, '0018', 1978, 1, FALSE, FALSE, FALSE, FALSE, NULL, NULL, TRUE, (SELECT id_album FROM Albumes WHERE id_grupo = 22 AND id_sello = 13 AND numero_catalogo = '018'), 'Reedición de Caracol 018, se sabe que es una reedición porque el número de catálogo empieza esta vez con doble cero.');

-- PRODITA
INSERT INTO Albumes (
    id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, 
    es_disco_split, incluido_en_lp, extraido_de_lp, solo_en_45, lados_en_lp, 
    id_lp_relacionado, es_reedicion, id_album_original, comentario)

VALUES

(22, 84, '7802', 1978, 1, FALSE, FALSE, FALSE, TRUE, NULL, NULL, FALSE, NULL, ''),
(22, 84, '7903', 1979, 1, FALSE, FALSE, FALSE, TRUE, NULL, NULL, FALSE, NULL, ''),
(22, 84, '4', 1980, 1, FALSE, FALSE, FALSE, TRUE, NULL, NULL, FALSE, NULL, '');

-- AVISPA
INSERT INTO Albumes (
    id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, 
    es_disco_split, incluido_en_lp, extraido_de_lp, solo_en_45, lados_en_lp, 
    id_lp_relacionado, es_reedicion, id_album_original, comentario)

VALUES

(22, 93, '1002', 1978, 1, FALSE, FALSE, FALSE, FALSE, NULL, NULL, TRUE, (SELECT id_album FROM Albumes WHERE id_grupo = 22 AND id_sello = 84 AND numero_catalogo = '7802'), 'Reedición de Prodita 78 - 02');

-- HORÓSCOPO
INSERT INTO Albumes (
    id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, 
    es_disco_split, incluido_en_lp, extraido_de_lp, solo_en_45, lados_en_lp, 
    id_lp_relacionado, es_reedicion, id_album_original, comentario)

VALUES

(22, 2, '1036', 1980, 1, FALSE, FALSE, FALSE, TRUE, NULL, NULL, FALSE, NULL, ''),
(22, 2, '1047', 1980, 1, FALSE, FALSE, FALSE, TRUE, NULL, NULL, FALSE, NULL, ''),
(22, 2, '1059', 1981, 1, FALSE, FALSE, FALSE, TRUE, NULL, NULL, TRUE, (SELECT id_album FROM Albumes WHERE id_grupo = 22 AND id_sello = 84 AND numero_catalogo = '4'), 'Reedición de Prodita 4, se cambió el nombre del tema de Toma mi amor a Muñequita, pero es el mismo tema con los mismos arreglos y letra, solo cambió el nombre a uno más comercial'),
(22, 2, '1069', 1981, 1, FALSE, FALSE, FALSE, TRUE, NULL, NULL, FALSE, NULL, ''),
(22, 2, '1211', 1985, 1, FALSE, FALSE, FALSE, TRUE, NULL, NULL, FALSE, NULL, '');

-- MIDAS
INSERT INTO Albumes (
    id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, 
    es_disco_split, incluido_en_lp, extraido_de_lp, solo_en_45, lados_en_lp, 
    id_lp_relacionado, es_reedicion, id_album_original, comentario)

VALUES

(22, 5, '110063', 1982, 1, FALSE, FALSE, TRUE, FALSE, NULL, (SELECT id_album FROM Albumes WHERE id_grupo = 22 AND numero_catalogo = 'LPG-216028'), FALSE, NULL, ''),
(22, 5, '110071', 1982, 1, FALSE, FALSE, TRUE, FALSE, NULL, (SELECT id_album FROM Albumes WHERE id_grupo = 22 AND numero_catalogo = 'LPG-216028'), FALSE, NULL, ''),
(22, 5, '110091', 1982, 1, FALSE, FALSE, TRUE, FALSE, NULL, (SELECT id_album FROM Albumes WHERE id_grupo = 22 AND numero_catalogo = 'LPG-216028'), FALSE, NULL, ''),
(22, 5, '110100', 1983, 1, FALSE, FALSE, TRUE, FALSE, NULL, (SELECT id_album FROM Albumes WHERE id_grupo = 22 AND numero_catalogo = 'LPG-216042'), FALSE, NULL, ''),
(22, 5, '110189', 1986, 1, FALSE, TRUE, FALSE, FALSE, 'Lado A', (SELECT id_album FROM Albumes WHERE id_grupo = 22 AND numero_catalogo = 'LPM-216064'), FALSE, NULL, 'Aunque parece reedición del 45 grabado en Horóscopo 1211, son re grabaciones nuevas para el sello MIDAS, no cambio letra ni nada, pero sí un poco el estilo'),
(22, 5, '110190', 1986, 1, FALSE, TRUE, FALSE, FALSE, 'Lado A', (SELECT id_album FROM Albumes WHERE id_grupo = 22 AND numero_catalogo = 'LPM-216064'), FALSE, NULL, ''),
(22, 5, '110195', 1987, 1, FALSE, FALSE, TRUE, FALSE, 'Lado A', (SELECT id_album FROM Albumes WHERE id_grupo = 22 AND numero_catalogo = 'LPM-216064'), FALSE, NULL, 'Aunque el Lado A se extrajo del LP, el tema del Lado B se extrajo de la versión de cassete que traía más temas, y el lado B pertenece a la versión de cassete, aunque curiosamente salió en single de 45');

-- KOZMOZ
INSERT INTO Albumes (
    id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, 
    es_disco_split, incluido_en_lp, extraido_de_lp, solo_en_45, lados_en_lp, 
    id_lp_relacionado, es_reedicion, id_album_original, comentario)

VALUES

(22, 105, '1', 1983, 1, FALSE, FALSE, FALSE, TRUE, NULL, NULL, FALSE, NULL, '');

-- ROSA RECORD
INSERT INTO Albumes (
    id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, 
    es_disco_split, incluido_en_lp, extraido_de_lp, solo_en_45, lados_en_lp, 
    id_lp_relacionado, es_reedicion, id_album_original, comentario)

VALUES

(22, 33, '11', 1984, 1, FALSE, FALSE, FALSE, TRUE, NULL, NULL, FALSE, NULL, '');

-- SONORADIO
INSERT INTO Albumes (
    id_grupo, id_sello, numero_catalogo, año_publicacion, id_tipo_album, 
    es_disco_split, incluido_en_lp, extraido_de_lp, solo_en_45, lados_en_lp, 
    id_lp_relacionado, es_reedicion, id_album_original, comentario)

VALUES

(22, 3, '13805', 1983, 1, FALSE, FALSE, FALSE, FALSE, NULL, NULL, TRUE, (SELECT id_album FROM Albumes WHERE id_grupo = 22 AND id_sello = 105 AND numero_catalogo = '1'), 'Reedición del single de Kozmoz 1'),
(22, 3, '13812', 1984, 1, FALSE, FALSE, FALSE, TRUE, NULL, NULL, FALSE, NULL, '');

"""

if cg_section_start != -1 and cg_section_end != -1:
    s_content = s_content[:cg_section_start] + cielo_gris_singles_sql + s_content[cg_section_end:]
    with open(singles_file, 'w', encoding='utf-8') as fp:
        fp.write(s_content)
    print("  ✓ Cielo Gris actualizado completamente en ingreso-singles.sql.")
else:
    print("  ❌ No se pudo localizar la sección de Cielo Gris en ingreso-singles.sql.")

# -------------------------------------------------------------
# 6. Actualizar ingreso-lp-sonoradio.sql (Agregar Cielo Gris)
# -------------------------------------------------------------
lp_sonoradio_file = 'supabase/data/vinilos/ingreso-lp-sonoradio.sql'
with open(lp_sonoradio_file, 'r', encoding='utf-8') as fp:
    sr_content = fp.read()

if 'CIELO GRIS' not in sr_content:
    print("Agregando CIELO GRIS a ingreso-lp-sonoradio.sql...")
    cg_lp_sql = """

--------------------------------------------------------------------------------------- CIELO GRIS ---------------------------------------------------------------------------------------

-- MIDAS
INSERT INTO Albumes (
    id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, 
    id_tipo_album, es_recopilatorio, es_varios_artistas, es_disco_split, es_reedicion, 
    id_album_original, comentario)

VALUES
(22, 5, 'Sensación Tropical', 'LPG-216028', 1982, 2, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(22, 5, 'A Mis Amigos', 'LPG-216042', 1983, 2, FALSE, FALSE, FALSE, FALSE, NULL, ''),
(22, 5, 'Dos Corazones', 'LPM-216064', 1987, 2, FALSE, FALSE, FALSE, FALSE, NULL, '');

-- SONO RADIO
INSERT INTO Albumes (
    id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, 
    id_tipo_album, es_recopilatorio, es_varios_artistas, es_disco_split, es_reedicion, 
    id_album_original, comentario)

VALUES
(22, 3, 'Con Mucho Amor', 'SE-9823', 1984, 2, FALSE, FALSE, FALSE, FALSE, NULL, '');
"""
    sr_content += cg_lp_sql
    with open(lp_sonoradio_file, 'w', encoding='utf-8') as fp:
        fp.write(sr_content)
    print("  ✓ CIELO GRIS agregado a ingreso-lp-sonoradio.sql.")
else:
    print("  ✓ CIELO GRIS ya existe en ingreso-lp-sonoradio.sql.")

# -------------------------------------------------------------
# 7. Poblar ingreso-EP.sql
# -------------------------------------------------------------
ep_file = 'supabase/data/vinilos/ingreso-EP.sql'
ep_sql = """-- ======================================================================================================================
-- GUÍA DE COLUMNAS PARA EL REGISTRO DE EXTENDED PLAYS / EPs (TABLA: Albumes)
-- Base de Datos: Kumbia Sound - Cumbia Peruana (1968-2005)
-- Datos reales catalogados desde docs/datos-investigacion/Datos BD.ods (Ingreso EP)
-- ======================================================================================================================

--------------------------------------------------------------------------------------- LOS MIRLOS ---------------------------------------------------------------------------------------

-- INFOPESA
INSERT INTO Albumes (
    id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, 
    id_tipo_album, es_recopilatorio, es_varios_artistas, es_disco_split, es_reedicion, 
    id_album_original, comentario)

VALUES
(3, 1, 'El Milagro Verde', 'EP-015', 1974, 3, FALSE, FALSE, FALSE, FALSE, NULL, 'Extended Play de 4 temas en vinilo de 7 pulgadas a 33 RPM');
"""
with open(ep_file, 'w', encoding='utf-8') as fp:
    fp.write(ep_sql)
print("  ✓ ingreso-EP.sql generado exitosamente.")

# -------------------------------------------------------------
# 8. Actualizar ingreso-casetes.sql
# -------------------------------------------------------------
casetes_file = 'supabase/data/cassete/ingreso-casetes.sql'
with open(casetes_file, 'r', encoding='utf-8') as fp:
    c_content = fp.read()

if 'HK-1050' not in c_content:
    print("Agregando HK-1050 a ingreso-casetes.sql...")
    # Find CHACALÓN section
    chac_idx = c_content.find("--------------------------------------------------------------------------------- CHACALÓN Y LA NUEVA CREMA")
    if chac_idx != -1:
        # Find next group header or end
        next_hdr = c_content.find("--------------------------------------------------------------------------------------- GRUPO HALLEY", chac_idx)
        chac_addition = """
-- HORÓSCOPO
INSERT INTO Albumes (
    id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, 
    id_tipo_album, es_recopilatorio, es_varios_artistas, es_disco_split, es_reedicion, 
    id_album_original, comentario)

VALUES 
(7, 2, 'Éxitos de Oro en Casete', 'HK-1050', 1986, 4, TRUE, FALSE, FALSE, FALSE, NULL, 'Recopilación oficial exclusiva de catálogo en cinta');
"""
        if next_hdr != -1:
            c_content = c_content[:next_hdr] + chac_addition + "\n" + c_content[next_hdr:]
        else:
            c_content += chac_addition
        with open(casetes_file, 'w', encoding='utf-8') as fp:
            fp.write(c_content)
        print("  ✓ HK-1050 agregado a ingreso-casetes.sql.")
else:
    print("  ✓ HK-1050 ya existe en ingreso-casetes.sql.")

# -------------------------------------------------------------
# 9. Poblar ingreso-cd.sql
# -------------------------------------------------------------
cd_file = 'supabase/data/cd/ingreso-cd.sql'
cd_sql = """-- ======================================================================================================================
-- GUÍA DE COLUMNAS PARA EL REGISTRO DE DISCOS COMPACTOS / CDs (TABLA: Albumes)
-- Base de Datos: Kumbia Sound - Cumbia Peruana (1968-2005)
-- Datos reales catalogados desde docs/datos-investigacion/Datos BD.ods (Ingreso CD)
-- ======================================================================================================================

---------------------------------------------------------------------------------------- ARMONÍA 10 ---------------------------------------------------------------------------------------

-- INFOPESA
INSERT INTO Albumes (
    id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, 
    id_tipo_album, es_recopilatorio, es_varios_artistas, es_disco_split, es_reedicion, 
    id_album_original, comentario)

VALUES
(35, 1, 'A Todo Ritmo', 'CD-9012', 1995, 5, FALSE, FALSE, FALSE, FALSE, NULL, 'Edición en caja acrílica jewel case');

-------------------------------------------------------------------------------------- LOS DESTELLOS --------------------------------------------------------------------------------------

-- IEMPSA
INSERT INTO Albumes (
    id_grupo, id_sello, nombre_album, numero_catalogo, año_publicacion, 
    id_tipo_album, es_recopilatorio, es_varios_artistas, es_disco_split, es_reedicion, 
    id_album_original, comentario)

VALUES
(1, 36, '30 Años de Éxitos', 'CD-0105', 1998, 5, TRUE, FALSE, FALSE, TRUE, NULL, 'Remasterización digital de cintas maestras de 1971');
"""
with open(cd_file, 'w', encoding='utf-8') as fp:
    fp.write(cd_sql)
print("  ✓ ingreso-cd.sql generado exitosamente.")

# -------------------------------------------------------------
# 10. Actualizar scripts/poblar-db.mjs
# -------------------------------------------------------------
poblar_file = 'scripts/poblar-db.mjs'
with open(poblar_file, 'r', encoding='utf-8') as fp:
    pob_content = fp.read()

if 'ingreso-EP.sql' not in pob_content or 'ingreso-cd.sql' not in pob_content:
    print("Actualizando DEFAULT_FILES en poblar-db.mjs...")
    old_default = """const DEFAULT_FILES = [
  'supabase/data/base/personas.sql',
  'supabase/data/base/grupos.sql',
  'supabase/data/base/sellos.sql',
  'supabase/data/base/tipo_album.sql',
  'supabase/data/base/roles.sql',
  'supabase/data/base/generos.sql',
  'supabase/data/vinilos/ingreso-lp-horoscopo.sql',
  'supabase/data/vinilos/ingreso-lp-infopesa.sql',
  'supabase/data/vinilos/ingreso-lp-sonoradio.sql',
  'supabase/data/vinilos/ingreso-singles.sql',
  'supabase/data/cassete/ingreso-casetes.sql',
  'supabase/data/canciones/ingreso-temas.sql',
];"""

    new_default = """const DEFAULT_FILES = [
  'supabase/data/base/personas.sql',
  'supabase/data/base/grupos.sql',
  'supabase/data/base/sellos.sql',
  'supabase/data/base/tipo_album.sql',
  'supabase/data/base/roles.sql',
  'supabase/data/base/generos.sql',
  'supabase/data/vinilos/ingreso-lp-horoscopo.sql',
  'supabase/data/vinilos/ingreso-lp-infopesa.sql',
  'supabase/data/vinilos/ingreso-lp-sonoradio.sql',
  'supabase/data/vinilos/ingreso-singles.sql',
  'supabase/data/vinilos/ingreso-EP.sql',
  'supabase/data/cassete/ingreso-casetes.sql',
  'supabase/data/cd/ingreso-cd.sql',
  'supabase/data/canciones/ingreso-temas.sql',
];"""

    pob_content = pob_content.replace(old_default, new_default)
    with open(poblar_file, 'w', encoding='utf-8') as fp:
        fp.write(pob_content)
    print("  ✓ poblar-db.mjs actualizado exitosamente.")
else:
    print("  ✓ poblar-db.mjs ya incluye todos los archivos requeridos.")

print("\nFase 1 completada con éxito.")
