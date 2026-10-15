import os
import shutil
import zipfile
import xml.etree.ElementTree as ET
import unicodedata
from odf import opendocument, table, teletype

ODS_PATH = 'docs/datos-investigacion/Datos BD.ods'
BAK_PATH = 'docs/datos-investigacion/Datos BD.ods.bak'

print("=== REGENERANDO HOJA UNIFICADA 'Singles' EN DATOS BD.ODS ===")

def norm(s):
    if not s: return ''
    s = unicodedata.normalize('NFD', s)
    s = ''.join([c for c in s if unicodedata.category(c) != 'Mn'])
    return s.lower().replace('(', '').replace(')', '').replace('"', '').replace('.', '').replace(',', '').strip()

# Restore from backup first to start clean
if os.path.exists(BAK_PATH):
    shutil.copyfile(BAK_PATH, ODS_PATH)

doc = opendocument.load(ODS_PATH)

def get_row_cells(row):
    cells = row.getElementsByType(table.TableCell)
    res = []
    for c in cells:
        rep = c.getAttribute('numbercolumnsrepeated')
        txt = teletype.extractText(c).strip()
        cnt = int(rep) if rep else 1
        if not txt and cnt > 30:
            continue
        for _ in range(cnt):
            res.append(txt)
    while res and not res[-1]:
        res.pop()
    return res

singles_list = []
for t in doc.getElementsByType(table.Table):
    if t.getAttribute('name') == 'Ingreso Singles':
        for r in t.getElementsByType(table.TableRow)[2:]:
            cells = get_row_cells(r)
            if len(cells) > 3 and cells[3]:
                singles_list.append({
                    'grupo': cells[0] if len(cells) > 0 else '',
                    'temas': cells[1] if len(cells) > 1 else '',
                    'sello': cells[2] if len(cells) > 2 else '',
                    'cat': cells[3].strip(),
                    'ano': cells[4] if len(cells) > 4 else '',
                    'split': cells[5] if len(cells) > 5 else '',
                    'solo45': cells[6] if len(cells) > 6 else '',
                    'incluido_lp': cells[7] if len(cells) > 7 else '',
                    'lados_lp': cells[8] if len(cells) > 8 else '',
                    'extraido_lp': cells[9] if len(cells) > 9 else '',
                    'lp_rel': cells[10] if len(cells) > 10 else '',
                    'reedicion': cells[11] if len(cells) > 11 else '',
                    'notas': cells[12] if len(cells) > 12 else ''
                })

print(f"Cargados {len(singles_list)} singles de 'Ingreso Singles'")

columns_header = [
    'CATÁLOGO DEL SINGLE',
    'SELLO DISCOGRÁFICO',
    'AÑO DE PUBLICACIÓN',
    'LADO FÍSICO',
    'PISTA N°',
    'TÍTULO DE LA CANCIÓN',
    'GRUPO / ARTISTA',
    'VOZ',
    'COMPOSITOR REAL',
    'CRÉDITO EN GALLETA (SEUDÓNIMO)',
    'GÉNERO MUSICAL',
    'DURACIÓN (MM:SS)',
    'BPM (TEMPO)',
    'TONO / CAMELOT',
    '¿ES MOSAICO?',
    '¿ES DISCO SPLIT?',
    '¿SOLO EN 45?',
    '¿INCLUIDO EN LP?',
    '¿EXTRAÍDO DE LP?',
    'LP RELACIONADO (CATÁLOGO)',
    '¿ES REEDICIÓN?',
    'LETRA DEL TEMA',
    'NOTA PARA EL AGENTE',
    'COMENTARIOS / NOTAS'
]

columns_sub = [
    '(Catálogo con ceros si aplica: ej. 009, 0009. Formato TEXTO protegido)',
    '(Disquera de prensaje. Ej: Difa, Horóscopo, Sono Radio)',
    '(Año de salida: 1968 a 2005. Ej: 1973)',
    "(ESTRICTO: Solo 'A' o 'B' según la cara física del vinilo)",
    '(En 45 RPM siempre es 1 por cada lado)',
    '(Nombre del tema o título del mosaico. Ej: En el campo, Parranda Sanjuanera)',
    '(Nombre del grupo o titular ejecutante. Ej: Grupo Celeste)',
    '(Nombre del cantante; si está en blanco o dice Instrumental no hay cantante vocal)',
    "(Nombre legal del autor. Si es mosaico puede ser 'Varios')",
    '(Nombre o alias acreditado en el vinilo si difiere del real)',
    '(Vertiente: Cumbia Costeña, Chicha, Cumbia Andina, etc.)',
    '(Duración en minutos y segundos ej. 02:50. Convertida a segundos enteros en SQL)',
    '(Tempo en pulsos por minuto. Ej: 125)',
    '(Notación exclusiva Camelot Key: 1A-12B. Ej: 8A, 11B. Círculo de quintas no aplica)',
    '(SI / Vacío = NO - Marcar SI cuando la cara del 45 sea un popurrí o enganchado)',
    '(SI / Vacío = NO - Lado A de un grupo y Lado B de otro grupo)',
    '(SI / Vacío = NO - Temas exclusivos que NUNCA salieron en LP)',
    '(SI / Vacío = NO - Salió primero en 45 y luego pasó a un LP)',
    '(SI / Vacío = NO - Single cortado para promocionar un LP ya existente)',
    '(Catálogo del LP matriz con el que se relaciona si aplica)',
    '(SI / Vacío = NO - Segundo prensaje o reedición)',
    '(Letra lírica transcrita completa o fragmento lírico del tema para la base de datos)',
    '(Desglose de temas de Mosaicos [ej: 1. Tema A (01:15) / 2. Tema B (00:55)], o instrucciones de ingesta)',
    '(Notas musicológicas, rarezas del vinilo, color, dedicatorias o comentarios de la obra)'
]

column_styles = [
    'co89',  # CATÁLOGO DEL SINGLE (3.757cm)
    'co21',  # SELLO DISCOGRÁFICO (3.837cm)
    'co23',  # AÑO DE PUBLICACIÓN (3.334cm)
    'co90',  # LADO FÍSICO (2.381cm)
    'co91',  # PISTA N° (2.911cm)
    'co92',  # TÍTULO DE LA CANCIÓN (7.753cm)
    'co19',  # GRUPO / ARTISTA (4.445cm)
    'co93',  # VOZ (11.51cm)
    'co94',  # COMPOSITOR REAL (10.95cm)
    'co95',  # CRÉDITO EN GALLETA (6.403cm)
    'co96',  # GÉNERO MUSICAL (5.239cm)
    'co97',  # DURACIÓN (5.795cm)
    'co98',  # BPM (3.651cm)
    'co99',  # TONO / CAMELOT (3.122cm)
    'co100', # ¿ES MOSAICO? (3.757cm)
    'co24',  # ¿ES DISCO SPLIT? (3.731cm)
    'co25',  # ¿SOLO EN 45? (2.805cm)
    'co26',  # ¿INCLUIDO EN LP? (3.493cm)
    'co28',  # ¿EXTRAÍDO DE LP? (3.784cm)
    'co29',  # LP RELACIONADO (4.287cm)
    'co30',  # ¿ES REEDICIÓN? (2.99cm)
    'co102', # LETRA DEL TEMA (6.086cm)
    'co103', # NOTA PARA EL AGENTE (11.35cm)
    'co104', # COMENTARIOS / NOTAS (19.63cm)
]

processed_singles = set()
unified_data_rows = []

for t in doc.getElementsByType(table.Table):
    if t.getAttribute('name') == 'Temas Singles':
        for r in t.getElementsByType(table.TableRow)[2:]:
            c = get_row_cells(r)
            if not c or not any(c):
                continue
            cat = c[0].strip()
            tit = c[3].strip() if len(c) > 3 else ''
            
            parts = cat.split('-')
            rev_cat = f"{parts[1]}-{parts[0]}" if len(parts) == 2 else cat
            
            candidates = [s for s in singles_list if s['cat'] in (cat, rev_cat)]
            ing = None
            if len(candidates) == 1:
                ing = candidates[0]
            elif len(candidates) > 1:
                norm_tit = norm(tit)
                exact_sub = []
                for s in candidates:
                    temas_parts = [norm(tp) for tp in s['temas'].split('-')]
                    if any(tp == norm_tit or norm_tit.startswith(tp[:8]) or tp.startswith(norm_tit[:8]) for tp in temas_parts):
                        exact_sub.append(s)
                if len(exact_sub) == 1:
                    ing = exact_sub[0]
                else:
                    ing = candidates[0]
            
            if not ing:
                print(f"ADVERTENCIA: Sin coincidencia en Ingreso Singles para: {cat} - {tit}")
                continue
            
            processed_singles.add(id(ing))
            
            lado = c[1].strip() if len(c) > 1 else 'A'
            pista = c[2].strip() if len(c) > 2 else '1'
            voz = c[4].strip() if len(c) > 4 else ''
            comp = c[5].strip() if len(c) > 5 else ''
            alias = c[6].strip() if len(c) > 6 else ''
            grp = c[7].strip() if len(c) > 7 else (ing['grupo'] or 'Grupo Celeste')
            gen = c[8].strip() if len(c) > 8 else ''
            dur = c[9].strip() if len(c) > 9 else ''
            bpm = c[10].strip() if len(c) > 10 else ''
            cam = c[11].strip() if len(c) > 11 else ''
            mos = c[12].strip() if len(c) > 12 else ''
            let = c[13].strip() if len(c) > 13 else ''
            nota = c[14].strip() if len(c) > 14 else ''
            coment = c[15].strip() if len(c) > 15 else ''
            
            lados_lp = ing['lados_lp']
            inc_lp = ''
            if lados_lp == 'Ambos': inc_lp = 'SI'
            elif lados_lp == f"Lado {lado}": inc_lp = 'SI'
            elif ing['incluido_lp'] == 'SI' and not lados_lp: inc_lp = 'SI'
            
            final_notas = coment
            ing_nota = ing['notas']
            if ing_nota and ing_nota not in final_notas:
                final_notas = (final_notas + ' | ' + ing_nota).strip(' |') if final_notas else ing_nota
            
            row = [
                ing['cat'], ing['sello'], ing['ano'], lado, pista, tit, grp, voz, comp, alias,
                gen, dur, bpm, cam, mos, ing['split'], ing['solo45'], inc_lp,
                ing['extraido_lp'], ing['lp_rel'], ing['reedicion'], let, nota, final_notas
            ]
            unified_data_rows.append(row)

# Add any remaining singles from singles_list (reissues or uncataloged sides)
for s in singles_list:
    if id(s) not in processed_singles:
        # e.g. 141, 142, 144
        temas_split = [t.strip() for t in s['temas'].split('-')]
        t_a = temas_split[0] if len(temas_split) > 0 else 'Lado A'
        t_b = temas_split[1] if len(temas_split) > 1 else 'Lado B'
        
        # Row A
        unified_data_rows.append([
            s['cat'], s['sello'], s['ano'], 'A', '1', t_a, s['grupo'], '', '', '',
            '', '', '', '', '', s['split'], s['solo45'], 'SI' if s['lados_lp'] in ['Ambos', 'Lado A'] else '',
            s['extraido_lp'], s['lp_rel'], s['reedicion'], '', '', s['notas']
        ])
        # Row B
        unified_data_rows.append([
            s['cat'], s['sello'], s['ano'], 'B', '1', t_b, s['grupo'], '', '', '',
            '', '', '', '', '', s['split'], s['solo45'], 'SI' if s['lados_lp'] in ['Ambos', 'Lado B'] else '',
            s['extraido_lp'], s['lp_rel'], s['reedicion'], '', '', s['notas']
        ])

print(f"Total filas de datos generadas para 'Singles': {len(unified_data_rows)}")

# Construct Table XML Element
TABLE_NS = "urn:oasis:names:tc:opendocument:xmlns:table:1.0"
OFFICE_NS = "urn:oasis:names:tc:opendocument:xmlns:office:1.0"
CALCEXT_NS = "urn:org:documentfoundation:names:experimental:calc:xmlns:calcext:1.0"
TEXT_NS = "urn:oasis:names:tc:opendocument:xmlns:text:1.0"

table_elem = ET.Element(f"{{{TABLE_NS}}}table")
table_elem.attrib[f"{{{TABLE_NS}}}name"] = "Singles"
table_elem.attrib[f"{{{TABLE_NS}}}style-name"] = "ta2"

# Columns
for c_style in column_styles:
    col_elem = ET.SubElement(table_elem, f"{{{TABLE_NS}}}table-column")
    col_elem.attrib[f"{{{TABLE_NS}}}style-name"] = c_style
    col_elem.attrib[f"{{{TABLE_NS}}}default-cell-style-name"] = "Default"

col_repeat = ET.SubElement(table_elem, f"{{{TABLE_NS}}}table-column")
col_repeat.attrib[f"{{{TABLE_NS}}}number-columns-repeated"] = str(16384 - len(column_styles) - 1)
col_repeat.attrib[f"{{{TABLE_NS}}}style-name"] = "co105"
col_repeat.attrib[f"{{{TABLE_NS}}}default-cell-style-name"] = "Default"

col_last = ET.SubElement(table_elem, f"{{{TABLE_NS}}}table-column")
col_last.attrib[f"{{{TABLE_NS}}}style-name"] = "co88"
col_last.attrib[f"{{{TABLE_NS}}}default-cell-style-name"] = "Default"

# Row 0: Headers
r0 = ET.SubElement(table_elem, f"{{{TABLE_NS}}}table-row")
r0.attrib[f"{{{TABLE_NS}}}style-name"] = "ro659"
for h in columns_header:
    c = ET.SubElement(r0, f"{{{TABLE_NS}}}table-cell")
    c.attrib[f"{{{TABLE_NS}}}style-name"] = "ce114"
    c.attrib[f"{{{OFFICE_NS}}}value-type"] = "string"
    c.attrib[f"{{{CALCEXT_NS}}}value-type"] = "string"
    p = ET.SubElement(c, f"{{{TEXT_NS}}}p")
    span = ET.SubElement(p, f"{{{TEXT_NS}}}span")
    span.attrib[f"{{{TEXT_NS}}}style-name"] = "T3634"
    span.text = h

# Row 1: Subheaders
r1 = ET.SubElement(table_elem, f"{{{TABLE_NS}}}table-row")
r1.attrib[f"{{{TABLE_NS}}}style-name"] = "ro660"
for s in columns_sub:
    c = ET.SubElement(r1, f"{{{TABLE_NS}}}table-cell")
    c.attrib[f"{{{TABLE_NS}}}style-name"] = "ce115"
    c.attrib[f"{{{OFFICE_NS}}}value-type"] = "string"
    c.attrib[f"{{{CALCEXT_NS}}}value-type"] = "string"
    p = ET.SubElement(c, f"{{{TEXT_NS}}}p")
    span = ET.SubElement(p, f"{{{TEXT_NS}}}span")
    span.attrib[f"{{{TEXT_NS}}}style-name"] = "T3650"
    span.text = s

# Rows 2+: Data Rows
for row_vals in unified_data_rows:
    row_elem = ET.SubElement(table_elem, f"{{{TABLE_NS}}}table-row")
    row_elem.attrib[f"{{{TABLE_NS}}}style-name"] = "ro661"
    for col_idx, val in enumerate(row_vals):
        c = ET.SubElement(row_elem, f"{{{TABLE_NS}}}table-cell")
        val_str = str(val).strip() if val is not None else ""
        
        # Col 11: Duration
        if col_idx == 11:
            c.attrib[f"{{{TABLE_NS}}}style-name"] = "ce118"
            if val_str:
                try:
                    fval = float(val_str)
                    c.attrib[f"{{{OFFICE_NS}}}value-type"] = "float"
                    c.attrib[f"{{{CALCEXT_NS}}}value-type"] = "float"
                    c.attrib[f"{{{OFFICE_NS}}}value"] = val_str
                    p = ET.SubElement(c, f"{{{TEXT_NS}}}p")
                    p.text = val_str
                except ValueError:
                    c.attrib[f"{{{OFFICE_NS}}}value-type"] = "string"
                    c.attrib[f"{{{CALCEXT_NS}}}value-type"] = "string"
                    p = ET.SubElement(c, f"{{{TEXT_NS}}}p")
                    p.text = val_str
        # Col 12: BPM
        elif col_idx == 12:
            c.attrib[f"{{{TABLE_NS}}}style-name"] = "ce119"
            if val_str:
                try:
                    fval = float(val_str)
                    c.attrib[f"{{{OFFICE_NS}}}value-type"] = "float"
                    c.attrib[f"{{{CALCEXT_NS}}}value-type"] = "float"
                    c.attrib[f"{{{OFFICE_NS}}}value"] = val_str
                    p = ET.SubElement(c, f"{{{TEXT_NS}}}p")
                    p.text = val_str
                except ValueError:
                    c.attrib[f"{{{OFFICE_NS}}}value-type"] = "string"
                    c.attrib[f"{{{CALCEXT_NS}}}value-type"] = "string"
                    p = ET.SubElement(c, f"{{{TEXT_NS}}}p")
                    p.text = val_str
        # Col 13: Camelot
        elif col_idx == 13:
            c.attrib[f"{{{TABLE_NS}}}style-name"] = "ce110"
            if val_str:
                c.attrib[f"{{{OFFICE_NS}}}value-type"] = "string"
                c.attrib[f"{{{CALCEXT_NS}}}value-type"] = "string"
                p = ET.SubElement(c, f"{{{TEXT_NS}}}p")
                span = ET.SubElement(p, f"{{{TEXT_NS}}}span")
                span.attrib[f"{{{TEXT_NS}}}style-name"] = "T3666"
                span.text = val_str
        # Other text columns
        else:
            c.attrib[f"{{{TABLE_NS}}}style-name"] = "ce109"
            if val_str:
                c.attrib[f"{{{OFFICE_NS}}}value-type"] = "string"
                c.attrib[f"{{{CALCEXT_NS}}}value-type"] = "string"
                p = ET.SubElement(c, f"{{{TEXT_NS}}}p")
                span = ET.SubElement(p, f"{{{TEXT_NS}}}span")
                span.attrib[f"{{{TEXT_NS}}}style-name"] = "T3666"
                span.text = val_str

print("Estructura XML de la tabla 'Singles' construida exitosamente.")

with zipfile.ZipFile(ODS_PATH, 'r') as z:
    all_files = {info.filename: z.read(info.filename) for info in z.infolist()}

content_xml = all_files['content.xml']

ET.register_namespace('table', TABLE_NS)
ET.register_namespace('office', OFFICE_NS)
ET.register_namespace('calcext', CALCEXT_NS)
ET.register_namespace('text', TEXT_NS)
ET.register_namespace('style', "urn:oasis:names:tc:opendocument:xmlns:style:1.0")
ET.register_namespace('fo', "urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0")

root = ET.fromstring(content_xml)
spreadsheet = root.find(f".//{{{OFFICE_NS}}}spreadsheet")

# Insert right after '45s' (index 1) or before 'Ingreso Singles'
insert_idx = 1
for idx, child in enumerate(list(spreadsheet)):
    if child.tag == f"{{{TABLE_NS}}}table" and child.attrib.get(f"{{{TABLE_NS}}}name") == "Ingreso Singles":
        insert_idx = idx
        break

spreadsheet.insert(insert_idx, table_elem)
print(f"Tabla insertada en índice {insert_idx} dentro de <office:spreadsheet>")

new_content_xml = ET.tostring(root, encoding='utf-8', xml_declaration=True)
all_files['content.xml'] = new_content_xml

CONFIG_NS = "urn:oasis:names:tc:opendocument:xmlns:config:1.0"
ET.register_namespace('config', CONFIG_NS)
settings_xml = all_files['settings.xml']
sroot = ET.fromstring(settings_xml)

tables_map = sroot.find(f".//{{{CONFIG_NS}}}config-item-map-named[@{{{CONFIG_NS}}}name='Tables']")
if tables_map is not None:
    # check if entry already exists
    existing = False
    for child in list(tables_map):
        if child.attrib.get(f"{{{CONFIG_NS}}}name") == "Singles":
            existing = True
            break
    if not existing:
        entry = ET.SubElement(tables_map, f"{{{CONFIG_NS}}}config-item-map-entry")
        entry.attrib[f"{{{CONFIG_NS}}}name"] = "Singles"
        ci1 = ET.SubElement(entry, f"{{{CONFIG_NS}}}config-item")
        ci1.attrib[f"{{{CONFIG_NS}}}name"] = "ShowGrid"
        ci1.attrib[f"{{{CONFIG_NS}}}type"] = "boolean"
        ci1.text = "true"
        ci2 = ET.SubElement(entry, f"{{{CONFIG_NS}}}config-item")
        ci2.attrib[f"{{{CONFIG_NS}}}name"] = "ZoomType"
        ci2.attrib[f"{{{CONFIG_NS}}}type"] = "short"
        ci2.text = "0"
        ci3 = ET.SubElement(entry, f"{{{CONFIG_NS}}}config-item")
        ci3.attrib[f"{{{CONFIG_NS}}}name"] = "ZoomValue"
        ci3.attrib[f"{{{CONFIG_NS}}}type"] = "int"
        ci3.text = "100"
        new_settings_xml = ET.tostring(sroot, encoding='utf-8', xml_declaration=True)
        all_files['settings.xml'] = new_settings_xml
        print("Entrada para 'Singles' agregada en settings.xml")

with zipfile.ZipFile(ODS_PATH, 'w') as zout:
    zout.writestr('mimetype', all_files['mimetype'], compress_type=zipfile.ZIP_STORED)
    for fname, data in all_files.items():
        if fname != 'mimetype':
            zout.writestr(fname, data, compress_type=zipfile.ZIP_DEFLATED)

print(f"Archivo guardado exitosamente en: {ODS_PATH}")
