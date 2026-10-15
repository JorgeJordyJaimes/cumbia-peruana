import os
import re
from odf import opendocument, table, teletype

print("=== GENERADOR COMPLETO DE INGRESO-TEMAS.SQL ===")

# 1. Parse ODS
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
    if val is None or val == 'NULL': return 'NULL'
    # if already quoted
    if isinstance(val, str) and val.startswith("'") and val.endswith("'"):
        return val
    return "'" + str(val).replace("'", "''") + "'"

genero_id_map = {
    'cumbia costeña': 1, 'cumbia amazónica': 2, 'cumbia andina / chicha': 3,
    'cumbia norteña': 4, 'cumbia sureña': 5, 'cumbia romántica / sanjuanera': 6,
    'cumbia chey': 7, 'cumbia pompo': 8, 'guaracha': 9, 'cumbión': 10,
    'instrumental': 11, 'cumbia fuzz': 12, 'cumbia rítmica': 13,
    'cumbia elegante': 14, 'chicha andina': 15, 'balada': 16, 'bolero': 17,
    'merengue': 18, 'rock': 19, 'mosaico': 20, 'cumbia andina': 21,
    'chicha': 22, 'beat soul': 23, 'cumbia carretera': 24,
    'cumbión amazónico': 25, 'cumbion amazonico': 25
}

def resolve_genres(gen_str):
    if not gen_str: return []
    res = []
    for g in gen_str.split(';'):
        g = g.strip()
        if not g: continue
        gid = genero_id_map.get(g.lower())
        if gid: res.append(gid)
        else: print(f"WARNING: Unknown genre: '{g}'")
    return res

def resolve_persona(pname):
    pname = pname.strip()
    if not pname or pname.lower() in ['d.r.', 'd.r', 'varios', 'varios autores', 'varioa autores', 'desconocido']:
        return None
    if pname.lower() == 'enrique delgado': return 'Enrique Delgado Montes'
    if pname.lower() in ['lito estupiñan', 'lito estupiñán']: return 'Lito Estupiñán'
    if pname.lower() == 'carlos marvin alvarado maguina': return 'Carlos Marvin Alvarado Maguiña'
    return pname

# 2. Parse existing ingreso-temas.sql to get Grupo Celeste Temas 1 to 109 and original sections
with open('supabase/data/canciones/ingreso-temas.sql', 'r', encoding='utf-8') as fp:
    orig_temas_sql = fp.read()

# Load existing Temas 1 to 109
temas_part = orig_temas_sql.split('INSERT INTO Albumes_Temas')[0]
raw_temas = re.findall(r"\((\d+),\s*'([^']*)',\s*([^,]+),\s*([^,]+),\s*([^,]+),\s*([^,]+),\s*([^)]*)\)", temas_part)
all_temas = []
for m in raw_temas:
    tid = int(m[0])
    tit = m[1]
    dur = int(m[2]) if m[2].strip() != 'NULL' else None
    gen = int(m[3]) if m[3].strip() != 'NULL' else None
    bpm = int(m[4]) if m[4].strip() != 'NULL' else None
    cam = m[5].strip().strip("'") if m[5].strip() != 'NULL' else None
    let = m[6].strip() if m[6].strip() != 'NULL' else None
    all_temas.append({
        'id_tema': tid, 'titulo': tit, 'dur': dur, 'id_genero': gen,
        'bpm': bpm, 'camelot': cam, 'letra': let
    })

# Update lyrics for Grupo Celeste tracks from Temas LP
tlp_rows = sheets.get('Temas LP', [])[2:]
for r in tlp_rows[:68]:
    tit = get_col(r, 3)
    let = get_col(r, 15)
    if let:
        for t in all_temas:
            if t['titulo'].lower() == tit.lower() and t['id_tema'] <= 106:
                if not t['letra'] or t['letra'] == 'NULL':
                    t['letra'] = esc(let)

# Extract original Grupo Celeste sections from orig_temas_sql:
# Section 2: Albumes_Temas
m_at = re.search(r"INSERT INTO Albumes_Temas\s*\([^)]+\)\s*VALUES\s*(.+?)\s*ON CONFLICT", orig_temas_sql, re.DOTALL)
orig_albumes_temas_sql = m_at.group(1).strip() if m_at else ""

# Section 3: Temas_Grupos
m_tg = re.search(r"INSERT INTO Temas_Grupos\s*\([^)]+\)\s*VALUES\s*(.+?)\s*ON CONFLICT", orig_temas_sql, re.DOTALL)
orig_temas_grupos_sql = m_tg.group(1).strip() if m_tg else ""

# Section 4: Temas_Compositores
m_tc = re.search(r"INSERT INTO Temas_Compositores\s*\([^)]+\)\s*VALUES\s*(.+?)\s*ON CONFLICT", orig_temas_sql, re.DOTALL)
orig_temas_compositores_sql = m_tc.group(1).strip() if m_tc else ""

# Section 5: Tema_Musicos
m_tm = re.search(r"INSERT INTO Tema_Musicos\s*\([^)]+\)\s*VALUES\s*(.+?)\s*ON CONFLICT", orig_temas_sql, re.DOTALL)
orig_tema_musicos_sql = m_tm.group(1).strip() if m_tm else ""

# Section 6: Temas_Generos
m_tgen = re.search(r"INSERT INTO Temas_Generos\s*\([^)]+\)\s*VALUES\s*(.+?)\s*ON CONFLICT", orig_temas_sql, re.DOTALL)
orig_temas_generos_sql = m_tgen.group(1).strip() if m_tgen else ""

# Section 7: Mosaicos_Temas
m_mt = re.search(r"INSERT INTO Mosaicos_Temas\s*\([^)]+\)\s*VALUES\s*(.+?)\s*ON CONFLICT", orig_temas_sql, re.DOTALL)
orig_mosaicos_temas_sql = m_mt.group(1).strip() if m_mt else ""

next_tema_id = 110

new_albumes_temas = []
new_temas_grupos = []
new_temas_compositores = []
new_tema_musicos = []
new_temas_generos = []
new_mosaicos_temas = []

cg_single_tracks = {} # (cat, lado) -> id_tema
cg_master_tracks = {} # tit.lower() -> id_tema

# -------------------------------------------------------------
# 3. Process Singles (Support unified 'Singles' or legacy 'Temas Singles')
# -------------------------------------------------------------
is_unified_singles = 'Singles' in sheets and len(sheets['Singles']) > 2
if is_unified_singles:
    ts_rows = sheets['Singles'][2:]
else:
    ts_rows = sheets.get('Temas Singles', [])[2:]

for idx, r in enumerate(ts_rows[68:], start=69):
    if is_unified_singles:
        cat = get_col(r, 0)
        sello = get_col(r, 1)
        ano = get_col(r, 2)
        lado = get_col(r, 3)
        pista = int(get_col(r, 4)) if get_col(r, 4) else 1
        tit = get_col(r, 5)
        grp = get_col(r, 6) or 'Cielo Gris'
        voz = get_col(r, 7)
        comp = get_col(r, 8)
        alias = get_col(r, 9)
        gen_str = get_col(r, 10)
        dur = parse_duration(get_col(r, 11))
        bpm = parse_bpm(get_col(r, 12))
        cam = parse_camelot(get_col(r, 13))
        mos = parse_bool(get_col(r, 14))
        let = get_col(r, 21) or None
        nota = get_col(r, 22)
    else:
        cat = get_col(r, 0)
        lado = get_col(r, 1)
        pista = int(get_col(r, 2)) if get_col(r, 2) else 1
        tit = get_col(r, 3)
        voz = get_col(r, 4)
        comp = get_col(r, 5)
        alias = get_col(r, 6)
        grp = get_col(r, 7) or 'Cielo Gris'
        gen_str = get_col(r, 8)
        dur = parse_duration(get_col(r, 9))
        bpm = parse_bpm(get_col(r, 10))
        cam = parse_camelot(get_col(r, 11))
        mos = parse_bool(get_col(r, 12))
        let = get_col(r, 13) or None
        nota = get_col(r, 14)
    
    genres = resolve_genres(gen_str)
    primary_gen = genres[0] if genres else None
    
    orig_single_cat = None
    if cat == '003': orig_single_cat = '03'
    elif cat == '0013': orig_single_cat = '013'
    elif cat == '0018': orig_single_cat = '018'
    elif cat == '1002': orig_single_cat = '7802'
    elif cat == '1059': orig_single_cat = '4'
    elif cat == '13805': orig_single_cat = '1'
    
    if orig_single_cat and (orig_single_cat, lado) in cg_single_tracks:
        tid = cg_single_tracks[(orig_single_cat, lado)]
        cg_single_tracks[(cat, lado)] = tid
        new_albumes_temas.append((22, cat, tid, pista, lado, orig_single_cat, False, mos, f"Single {cat} Lado {lado} ({tit}) [Reedición de {orig_single_cat}]"))
    else:
        tid = next_tema_id
        next_tema_id += 1
        cg_single_tracks[(cat, lado)] = tid
        cg_master_tracks[tit.lower()] = tid
        
        all_temas.append({
            'id_tema': tid, 'titulo': tit, 'dur': dur, 'id_genero': primary_gen,
            'bpm': bpm, 'camelot': cam, 'letra': esc(let) if let else 'NULL'
        })
        
        new_albumes_temas.append((22, cat, tid, pista, lado, None, False, mos, f"Single {cat} Lado {lado} ({tit})"))
        new_temas_grupos.append((tid, 22, 'Principal'))
        
        if comp:
            for cpart in comp.split(';'):
                pname = resolve_persona(cpart)
                if pname:
                    new_temas_compositores.append((tid, pname, alias or pname))
        
        if voz and voz.lower() != 'instrumental':
            for vpart in voz.split(';'):
                pname = resolve_persona(vpart)
                if pname:
                    new_tema_musicos.append((tid, pname, 'Voz', 5, pname))
        
        for g_order, gid in enumerate(genres):
            new_temas_generos.append((tid, gid, g_order == 0))

# -------------------------------------------------------------
# 4. Process Temas LP (Cielo Gris: rows 69 to 114)
# -------------------------------------------------------------
for idx, r in enumerate(tlp_rows[68:], start=69):
    raw_cat = get_col(r, 0)
    lado = get_col(r, 1)
    pista = int(get_col(r, 2)) if get_col(r, 2) else 1
    tit = get_col(r, 3)
    voz = get_col(r, 4)
    comp = get_col(r, 5)
    alias = get_col(r, 6)
    grp = get_col(r, 7) or 'Cielo Gris'
    gen_str = get_col(r, 8)
    dur = parse_duration(get_col(r, 9))
    bpm = parse_bpm(get_col(r, 10))
    cam = parse_camelot(get_col(r, 11))
    mos = parse_bool(get_col(r, 12))
    ined = parse_bool(get_col(r, 13))
    orig = get_col(r, 14)
    let = get_col(r, 15) or None
    nota = get_col(r, 16)
    
    if idx <= 80: lp_cat = 'LPG-216028'
    elif idx <= 92: lp_cat = 'LPG-216042'
    elif idx <= 102: lp_cat = 'SE-9823'
    else: lp_cat = 'LPM-216064'
    
    genres = resolve_genres(gen_str)
    primary_gen = genres[0] if genres else None
    
    orig_single_cat = None
    if orig:
        m = re.search(r'(\d+)', orig)
        if m: orig_single_cat = m.group(1)
    
    matched_tid = None
    if not ined and orig_single_cat:
        for (scat, slado), stid in cg_single_tracks.items():
            if scat == orig_single_cat and all_temas[stid-1]['titulo'].lower() == tit.lower():
                matched_tid = stid
                break
        if not matched_tid and tit.lower() in cg_master_tracks:
            matched_tid = cg_master_tracks[tit.lower()]
    
    if matched_tid and not ined:
        t = all_temas[matched_tid-1]
        if dur and not t['dur']: t['dur'] = dur
        if bpm and not t['bpm']: t['bpm'] = bpm
        if cam and not t['camelot']: t['camelot'] = cam
        if let and (not t['letra'] or t['letra'] == 'NULL'): t['letra'] = esc(let)
        new_albumes_temas.append((22, lp_cat, matched_tid, pista, lado, orig_single_cat, False, mos, f"LP {lp_cat} Lado {lado} Pista {pista} ({tit}) [Proveniente de 45 RPM]"))
    else:
        tid = next_tema_id
        next_tema_id += 1
        all_temas.append({
            'id_tema': tid, 'titulo': tit, 'dur': dur, 'id_genero': primary_gen,
            'bpm': bpm, 'camelot': cam, 'letra': esc(let) if let else 'NULL'
        })
        new_albumes_temas.append((22, lp_cat, tid, pista, lado, None, True, mos, f"LP {lp_cat} Lado {lado} Pista {pista} ({tit})"))
        new_temas_grupos.append((tid, 22, 'Principal'))
        if comp:
            for cpart in comp.split(';'):
                pname = resolve_persona(cpart)
                if pname: new_temas_compositores.append((tid, pname, alias or pname))
        if voz and voz.lower() != 'instrumental':
            for vpart in voz.split(';'):
                pname = resolve_persona(vpart)
                if pname: new_tema_musicos.append((tid, pname, 'Voz', 5, pname))
        for g_order, gid in enumerate(genres):
            new_temas_generos.append((tid, gid, g_order == 0))

# -------------------------------------------------------------
# 5. Process Temas EP (Los Mirlos: EP-015)
# -------------------------------------------------------------
tep_rows = sheets.get('Temas EP', [])[2:]
for r in tep_rows:
    cat = get_col(r, 0)
    lado = get_col(r, 1)
    pista = int(get_col(r, 2)) if get_col(r, 2) else 1
    tit = get_col(r, 3)
    voz = get_col(r, 4)
    comp = get_col(r, 5)
    alias = get_col(r, 6)
    gen_str = get_col(r, 8)
    dur = parse_duration(get_col(r, 9))
    bpm = parse_bpm(get_col(r, 10))
    cam = parse_camelot(get_col(r, 11))
    mos = parse_bool(get_col(r, 12))
    let = get_col(r, 13) or None
    
    genres = resolve_genres(gen_str)
    primary_gen = genres[0] if genres else None
    
    tid = next_tema_id
    next_tema_id += 1
    all_temas.append({
        'id_tema': tid, 'titulo': tit, 'dur': dur, 'id_genero': primary_gen,
        'bpm': bpm, 'camelot': cam, 'letra': esc(let) if let else 'NULL'
    })
    new_albumes_temas.append((3, cat, tid, pista, lado, None, True, mos, f"EP {cat} Lado {lado} Pista {pista} ({tit})"))
    new_temas_grupos.append((tid, 3, 'Principal'))
    if comp:
        for cpart in comp.split(';'):
            pname = resolve_persona(cpart)
            if pname: new_temas_compositores.append((tid, pname, alias or pname))
    if voz and voz.lower() != 'instrumental':
        for vpart in voz.split(';'):
            pname = resolve_persona(vpart)
            if pname: new_tema_musicos.append((tid, pname, 'Voz', 5, pname))
    for g_order, gid in enumerate(genres):
        new_temas_generos.append((tid, gid, g_order == 0))

# -------------------------------------------------------------
# 6. Process Temas Cassete (Los Destellos: HK-1077)
# -------------------------------------------------------------
tcas_rows = sheets.get('Temas Cassete', [])[2:]
for r in tcas_rows:
    cat = get_col(r, 0)
    lado = get_col(r, 1)
    pista = int(get_col(r, 2)) if get_col(r, 2) else 1
    tit = get_col(r, 3)
    voz = get_col(r, 4)
    comp = get_col(r, 5)
    alias = get_col(r, 6)
    gen_str = get_col(r, 8)
    dur = parse_duration(get_col(r, 9))
    bpm = parse_bpm(get_col(r, 10))
    cam = parse_camelot(get_col(r, 11))
    mos = parse_bool(get_col(r, 12))
    let = get_col(r, 13) or None
    
    genres = resolve_genres(gen_str)
    primary_gen = genres[0] if genres else None
    
    tid = next_tema_id
    next_tema_id += 1
    all_temas.append({
        'id_tema': tid, 'titulo': tit, 'dur': dur, 'id_genero': primary_gen,
        'bpm': bpm, 'camelot': cam, 'letra': esc(let) if let else 'NULL'
    })
    new_albumes_temas.append((1, cat, tid, pista, lado, None, True, mos, f"Casete {cat} Lado {lado} Pista {pista} ({tit})"))
    new_temas_grupos.append((tid, 1, 'Principal'))
    if comp:
        for cpart in comp.split(';'):
            pname = resolve_persona(cpart)
            if pname: new_temas_compositores.append((tid, pname, alias or pname))
    if voz and voz.lower() != 'instrumental':
        for vpart in voz.split(';'):
            pname = resolve_persona(vpart)
            if pname: new_tema_musicos.append((tid, pname, 'Voz', 5, pname))
    for g_order, gid in enumerate(genres):
        new_temas_generos.append((tid, gid, g_order == 0))

# -------------------------------------------------------------
# 7. Process Temas CD (Armonía 10: CD-9012)
# -------------------------------------------------------------
tcd_rows = sheets.get('Temas CD', [])[2:]
for r in tcd_rows:
    cat = get_col(r, 0)
    pista = int(get_col(r, 1)) if get_col(r, 1) else 1
    tit = get_col(r, 2)
    voz = get_col(r, 3)
    comp = get_col(r, 4)
    alias = get_col(r, 5)
    gen_str = get_col(r, 7)
    dur = parse_duration(get_col(r, 8))
    bpm = parse_bpm(get_col(r, 9))
    cam = parse_camelot(get_col(r, 10))
    mos = parse_bool(get_col(r, 11))
    let = get_col(r, 12) or None
    
    genres = resolve_genres(gen_str)
    primary_gen = genres[0] if genres else None
    
    tid = next_tema_id
    next_tema_id += 1
    all_temas.append({
        'id_tema': tid, 'titulo': tit, 'dur': dur, 'id_genero': primary_gen,
        'bpm': bpm, 'camelot': cam, 'letra': esc(let) if let else 'NULL'
    })
    new_albumes_temas.append((35, cat, tid, pista, None, None, True, mos, f"CD {cat} Pista {pista} ({tit})"))
    new_temas_grupos.append((tid, 35, 'Principal'))
    if comp:
        for cpart in comp.split(';'):
            pname = resolve_persona(cpart)
            if pname: new_temas_compositores.append((tid, pname, alias or pname))
    if voz and voz.lower() != 'instrumental':
        for vpart in voz.split(';'):
            pname = resolve_persona(vpart)
            if pname: new_tema_musicos.append((tid, pname, 'Voz', 5, pname))
    for g_order, gid in enumerate(genres):
        new_temas_generos.append((tid, gid, g_order == 0))

# -------------------------------------------------------------
# 8. Mosaico Sub-tracks & Segments (Mosaicos_Temas)
# -------------------------------------------------------------
# Cielo Gris mosaicos:
# 1. 'Poutpourri' (Single 110091 Lado B / LP LPG-216028 Lado B Pista 6)
#    Segs: 'Una miradita', 'Noche de invierno', 'Quiero emborracharme', 'Regresa', 'El juramento', 'No sé por qué'
poutpourri_segs = [
    ('Una miradita', 'Los Yungas', 5),
    ('Noche de invierno', 'Los Titanes', 36),
    ('Quiero emborracharme', 'Los Sanders de Ñaña', 25),
    ('Regresa', 'El Super Grupo', 23),
    ('El juramento', 'Grupo Melodía', 44)
]
pout_tids = []
for stit, sgrp, sgid in poutpourri_segs:
    tid = next_tema_id
    next_tema_id += 1
    pout_tids.append(tid)
    all_temas.append({
        'id_tema': tid, 'titulo': stit, 'dur': None, 'id_genero': 13,
        'bpm': 105, 'camelot': '8A', 'letra': 'NULL'
    })
    new_temas_grupos.append((tid, sgid, 'Principal'))
    new_temas_generos.append((tid, 13, True))

# Add 'No sé por qué' (Cielo Gris, id_tema from earlier)
noseporque_tid = cg_master_tracks.get('no sé por qué') or 111
pout_tids.append(noseporque_tid)

# 2. 'Recordando mis éxitos' (Single 110195 Lado A / LP LPM-216064 Lado B Pista 3)
#    Segs: 'Te quiero mi amor', 'Larga espera', 'Si ya te vas', 'Mujer de mi vida'
rec_segs = [
    'Te quiero mi amor', 'Larga espera', 'Si ya te vas', 'Mujer de mi vida'
]
rec_tids = []
for stit in rec_segs:
    tid = next_tema_id
    next_tema_id += 1
    rec_tids.append(tid)
    all_temas.append({
        'id_tema': tid, 'titulo': stit, 'dur': None, 'id_genero': 24,
        'bpm': 105, 'camelot': '9A', 'letra': 'NULL'
    })
    new_temas_grupos.append((tid, 25, 'Principal'))
    new_temas_generos.append((tid, 24, True))

# 3. 'Parrandita de cumbias' (Single 1 / 13805)
#    Segs: 'La novia', 'Ojitos mentirosos', 'Corazoncito', 'A trabajar'
parr1_segs = [
    ('La novia', 9),
    ('Ojitos mentirosos', 27),
    ('Corazoncito', 8),
    ('A trabajar', 7)
]
parr1_tids = []
for stit, sgid in parr1_segs:
    tid = next_tema_id
    next_tema_id += 1
    parr1_tids.append(tid)
    all_temas.append({
        'id_tema': tid, 'titulo': stit, 'dur': None, 'id_genero': 22,
        'bpm': 110, 'camelot': '9A', 'letra': 'NULL'
    })
    new_temas_grupos.append((tid, sgid, 'Principal'))
    new_temas_generos.append((tid, 22, True))

# 4. 'Parrandita de cumbias' (Single 13812 Lado B)
#    Segs: 'Ay María', 'El rey loco', 'Viento' (Tema 7), 'La carcocha', 'Recuerdos' (Tema 5)
parr2_segs = [
    ('Ay María', 18),
    ('El rey loco', 25),
    ('Viento', 12),     # Tema 7
    ('La carcocha', 45),
    ('Recuerdos', 12)   # Tema 5
]
parr2_tids = []
for stit, sgid in parr2_segs:
    if stit == 'Viento':
        parr2_tids.append(7)
    elif stit == 'Recuerdos':
        parr2_tids.append(5)
    else:
        tid = next_tema_id
        next_tema_id += 1
        parr2_tids.append(tid)
        all_temas.append({
            'id_tema': tid, 'titulo': stit, 'dur': None, 'id_genero': 22,
            'bpm': 110, 'camelot': '9A', 'letra': 'NULL'
        })
        new_temas_grupos.append((tid, sgid, 'Principal'))
        new_temas_generos.append((tid, 22, True))

# 5. 'Parranda chichera' (LP LPM-216064 Lado A Pista 5)
#    Segs: 'Pastorcita', 'Ya se marchó', 'El abandonado', 'El fastidioso'
parr_chichera_segs = [
    ('Pastorcita', 8),
    ('Ya se marchó', 8),
    ('El abandonado', 8),
    ('El fastidioso', 19)
]
parr_chichera_tids = []
for stit, sgid in parr_chichera_segs:
    tid = next_tema_id
    next_tema_id += 1
    parr_chichera_tids.append(tid)
    all_temas.append({
        'id_tema': tid, 'titulo': stit, 'dur': None, 'id_genero': 22,
        'bpm': 112, 'camelot': '9A', 'letra': 'NULL'
    })
    new_temas_grupos.append((tid, sgid, 'Principal'))
    new_temas_generos.append((tid, 22, True))

# Link segments to Mosaicos_Temas
# For Parranda chichera (LP LPM-216064 Lado A Pista 5, tema 181)
parr_chichera_tema_id = 181
for ord_idx, seg_tid in enumerate(parr_chichera_tids, 1):
    new_mosaicos_temas.append((
        f"(SELECT id_album_tema FROM Albumes_Temas WHERE id_album = (SELECT id_album FROM Albumes WHERE id_grupo = 22 AND numero_catalogo = 'LPM-216064' LIMIT 1) AND id_tema = {parr_chichera_tema_id} LIMIT 1)",
        seg_tid, ord_idx, 'NULL', f"Parranda chichera LP LPM-216064 - Seg {ord_idx}"
    ))

# For Poutpourri (Single 110091 Lado B)
pout_tema_id = cg_single_tracks.get(('110091', 'B'))
if pout_tema_id:
    for ord_idx, seg_tid in enumerate(pout_tids, 1):
        new_mosaicos_temas.append((
            f"(SELECT id_album_tema FROM Albumes_Temas WHERE id_album = (SELECT id_album FROM Albumes WHERE id_grupo = 22 AND numero_catalogo = '110091' LIMIT 1) AND id_tema = {pout_tema_id} LIMIT 1)",
            seg_tid, ord_idx, 'NULL', f"Poutpourri Single 110091 - Seg {ord_idx}"
        ))

# For Poutpourri (LP LPG-216028 Lado B Pista 6)
if pout_tema_id:
    for ord_idx, seg_tid in enumerate(pout_tids, 1):
        new_mosaicos_temas.append((
            f"(SELECT id_album_tema FROM Albumes_Temas WHERE id_album = (SELECT id_album FROM Albumes WHERE id_grupo = 22 AND numero_catalogo = 'LPG-216028' LIMIT 1) AND id_tema = {pout_tema_id} LIMIT 1)",
            seg_tid, ord_idx, 'NULL', f"Poutpourri LP LPG-216028 - Seg {ord_idx}"
        ))

# For Recordando mis éxitos (Single 110195 Lado A)
rec_tema_id = cg_single_tracks.get(('110195', 'A'))
if rec_tema_id:
    for ord_idx, seg_tid in enumerate(rec_tids, 1):
        new_mosaicos_temas.append((
            f"(SELECT id_album_tema FROM Albumes_Temas WHERE id_album = (SELECT id_album FROM Albumes WHERE id_grupo = 22 AND numero_catalogo = '110195' LIMIT 1) AND id_tema = {rec_tema_id} LIMIT 1)",
            seg_tid, ord_idx, 'NULL', f"Recordando mis éxitos Single 110195 - Seg {ord_idx}"
        ))

# For Recordando mis éxitos (LP LPM-216064 Lado B Pista 3)
if rec_tema_id:
    for ord_idx, seg_tid in enumerate(rec_tids, 1):
        new_mosaicos_temas.append((
            f"(SELECT id_album_tema FROM Albumes_Temas WHERE id_album = (SELECT id_album FROM Albumes WHERE id_grupo = 22 AND numero_catalogo = 'LPM-216064' LIMIT 1) AND id_tema = {rec_tema_id} LIMIT 1)",
            seg_tid, ord_idx, 'NULL', f"Recordando mis éxitos LP LPM-216064 - Seg {ord_idx}"
        ))

# For Parrandita de cumbias (Single 1 Lado B)
parr1_tema_id = cg_single_tracks.get(('1', 'B'))
if parr1_tema_id:
    for ord_idx, seg_tid in enumerate(parr1_tids, 1):
        new_mosaicos_temas.append((
            f"(SELECT id_album_tema FROM Albumes_Temas WHERE id_album = (SELECT id_album FROM Albumes WHERE id_grupo = 22 AND numero_catalogo = '1' LIMIT 1) AND id_tema = {parr1_tema_id} LIMIT 1)",
            seg_tid, ord_idx, 'NULL', f"Parrandita de cumbias Single 1 - Seg {ord_idx}"
        ))
    for ord_idx, seg_tid in enumerate(parr1_tids, 1):
        new_mosaicos_temas.append((
            f"(SELECT id_album_tema FROM Albumes_Temas WHERE id_album = (SELECT id_album FROM Albumes WHERE id_grupo = 22 AND numero_catalogo = '13805' LIMIT 1) AND id_tema = {parr1_tema_id} LIMIT 1)",
            seg_tid, ord_idx, 'NULL', f"Parrandita de cumbias Single 13805 - Seg {ord_idx}"
        ))

# For Parrandita de cumbias (Single 13812 Lado B)
parr2_tema_id = cg_single_tracks.get(('13812', 'B'))
if parr2_tema_id:
    for ord_idx, seg_tid in enumerate(parr2_tids, 1):
        new_mosaicos_temas.append((
            f"(SELECT id_album_tema FROM Albumes_Temas WHERE id_album = (SELECT id_album FROM Albumes WHERE id_grupo = 22 AND numero_catalogo = '13812' LIMIT 1) AND id_tema = {parr2_tema_id} LIMIT 1)",
            seg_tid, ord_idx, 'NULL', f"Parrandita de cumbias Single 13812 - Seg {ord_idx}"
        ))

print(f"Final next_tema_id: {next_tema_id}")
print(f"Total Temas to write: {len(all_temas)}")
print(f"Total new Albumes_Temas: {len(new_albumes_temas)}")
print(f"Total new Temas_Grupos: {len(new_temas_grupos)}")
print(f"Total new Temas_Compositores: {len(new_temas_compositores)}")
print(f"Total new Tema_Musicos: {len(new_tema_musicos)}")
print(f"Total new Temas_Generos: {len(new_temas_generos)}")
print(f"Total new Mosaicos_Temas: {len(new_mosaicos_temas)}")
# -------------------------------------------------------------
# 9. Format and Generate Full ingreso-temas.sql
# -------------------------------------------------------------
output_file = 'supabase/data/canciones/ingreso-temas.sql'

out = []
out.append("""-- ======================================================================================================================
-- INGRESO DE TEMAS HISTÓRICOS Y ESPECIFICACIONES DJ: DISCOGRAFÍA HISTÓRICA PERUANA (1968-2005)
-- Base de Datos: Kumbia Sound - Cumbia Peruana (1968-2005)
-- Datos reales catalogados desde docs/datos-investigacion/Datos BD.ods
-- (Temas Singles, Temas LP, Temas EP, Temas Cassete, Temas CD)
-- ======================================================================================================================

-- ======================================================================================================================
-- 1. OBRAS MUSICALES Y METADATOS DJ (TABLA: Temas)
-- ======================================================================================================================""")

out.append("INSERT INTO Temas (id_tema, titulo_tema, duracion_segundos, id_genero, bpm, camelot_code, letra) VALUES")
tema_value_lines = []
for t in all_temas:
    tid = t['id_tema']
    tit = esc(t['titulo'])
    dur = t['dur'] if t['dur'] is not None else 'NULL'
    gen = t['id_genero'] if t['id_genero'] is not None else 'NULL'
    bpm = t['bpm'] if t['bpm'] is not None else 'NULL'
    cam = esc(t['camelot']) if t['camelot'] is not None else 'NULL'
    let = t['letra'] if t['letra'] and t['letra'] != 'NULL' else 'NULL'
    tema_value_lines.append(f"({tid}, {tit}, {dur}, {gen}, {bpm}, {cam}, {let})")

out.append(",\n".join(tema_value_lines))
out.append("""ON CONFLICT (id_tema) DO UPDATE SET
  titulo_tema = EXCLUDED.titulo_tema,
  duracion_segundos = EXCLUDED.duracion_segundos,
  id_genero = EXCLUDED.id_genero,
  bpm = EXCLUDED.bpm,
  camelot_code = EXCLUDED.camelot_code,
  letra = EXCLUDED.letra;

-- ======================================================================================================================
-- 2. ASOCIACIÓN CON SOPORTES FÍSICOS (TABLA: Albumes_Temas)
-- ======================================================================================================================""")

out.append("INSERT INTO Albumes_Temas (id_album, id_tema, numero_pista, lado, id_album_origen, es_grabacion_inedita, es_mosaico) VALUES")

# Format original Grupo Celeste albumes_temas
# Notice: In orig_albumes_temas_sql, fix catalog 84-004 if needed
fixed_orig_at = orig_albumes_temas_sql.strip().rstrip(';')
at_lines = [fixed_orig_at]

# Add new Albumes_Temas
for at in new_albumes_temas:
    grp, cat, tid, pista, lado, orig_cat, ined, mos, comment = at
    album_subq = f"(SELECT id_album FROM Albumes WHERE id_grupo = {grp} AND (numero_catalogo = '{cat}' OR numero_catalogo = '{cat}'))"
    if orig_cat:
        orig_subq = f"(SELECT id_album FROM Albumes WHERE id_grupo = {grp} AND (numero_catalogo = '{orig_cat}' OR numero_catalogo = '{orig_cat}'))"
    else:
        orig_subq = "NULL"
    lado_val = f"'{lado}'" if lado else "NULL"
    ined_val = "TRUE" if ined else "FALSE"
    mos_val = "TRUE" if mos else "FALSE"
    at_lines.append(f"({album_subq}, {tid}, {pista}, {lado_val}, {orig_subq}, {ined_val}, {mos_val}) /* {comment} */")

out.append(",\n".join(at_lines))
out.append("""ON CONFLICT (id_album, id_tema) DO UPDATE SET
  numero_pista = EXCLUDED.numero_pista,
  lado = EXCLUDED.lado,
  id_album_origen = EXCLUDED.id_album_origen,
  es_grabacion_inedita = EXCLUDED.es_grabacion_inedita,
  es_mosaico = EXCLUDED.es_mosaico;

-- ======================================================================================================================
-- 3. AGRUPACIÓN EJECUTANTE (TABLA: Temas_Grupos)
-- ======================================================================================================================""")

out.append("INSERT INTO Temas_Grupos (id_tema, id_grupo, rol_participacion) VALUES")
tg_lines = [orig_temas_grupos_sql.strip().rstrip(';')]
for tid, gid, rol in new_temas_grupos:
    tg_lines.append(f"({tid}, {gid}, '{rol}')")

out.append(",\n".join(tg_lines))
out.append("""ON CONFLICT (id_tema, id_grupo) DO UPDATE SET
  rol_participacion = EXCLUDED.rol_participacion;

-- ======================================================================================================================
-- 4. CRÉDITOS DE COMPOSITORES Y GALLETA (TABLA: Temas_Compositores)
-- ======================================================================================================================""")

out.append("INSERT INTO Temas_Compositores (id_tema, id_compositor, credito_como) VALUES")
tc_lines = [orig_temas_compositores_sql.strip().rstrip(';')]
for tid, pname, alias in new_temas_compositores:
    comp_subq = f"(SELECT id_persona FROM Personas WHERE nombre = '{pname}')"
    alias_esc = alias.replace("'", "''")
    tc_lines.append(f"({tid}, {comp_subq}, '{alias_esc}')")

out.append(",\n".join(tc_lines))
out.append("""ON CONFLICT (id_tema, id_compositor) DO UPDATE SET
  credito_como = EXCLUDED.credito_como;

-- ======================================================================================================================
-- 5. VOCALISTAS E INTÉRPRETES PRINCIPALES (TABLA: Tema_Musicos)
-- ======================================================================================================================""")

out.append("INSERT INTO Tema_Musicos (id_tema, id_musico, instrumento, id_rol, credito_como) VALUES")
tm_lines = [orig_tema_musicos_sql.strip().rstrip(';')]
for tid, pname, inst, rol_id, alias in new_tema_musicos:
    mus_subq = f"(SELECT id_persona FROM Personas WHERE nombre = '{pname}')"
    alias_esc = alias.replace("'", "''")
    tm_lines.append(f"({tid}, {mus_subq}, '{inst}', {rol_id}, '{alias_esc}')")

out.append(",\n".join(tm_lines))
out.append("""ON CONFLICT (id_tema, id_musico) DO UPDATE SET
  instrumento = EXCLUDED.instrumento,
  id_rol = EXCLUDED.id_rol,
  credito_como = EXCLUDED.credito_como;

-- ======================================================================================================================
-- 6. CLASIFICACIÓN DE GÉNEROS Y RITMOS (TABLA: Temas_Generos)
-- ======================================================================================================================""")

out.append("INSERT INTO Temas_Generos (id_tema, id_genero, es_principal) VALUES")
tgen_lines = [orig_temas_generos_sql.strip().rstrip(';')]
for tid, gid, es_pr in new_temas_generos:
    es_pr_val = "TRUE" if es_pr else "FALSE"
    tgen_lines.append(f"({tid}, {gid}, {es_pr_val})")

out.append(",\n".join(tgen_lines))
out.append("""ON CONFLICT (id_tema, id_genero) DO UPDATE SET
  es_principal = EXCLUDED.es_principal;

-- ======================================================================================================================
-- 7. DESGLOSE RELACIONAL DE MOSAICOS Y POPURRÍS (TABLA: Mosaicos_Temas)
-- ======================================================================================================================""")

out.append("INSERT INTO Mosaicos_Temas (id_album_tema, id_tema, orden_segmento, duracion_segmento_segundos) VALUES")
mt_lines = [orig_mosaicos_temas_sql.strip().rstrip(';')]
for at_subq, seg_tid, ord_idx, dur_val, comment in new_mosaicos_temas:
    mt_lines.append(f"({at_subq}, {seg_tid}, {ord_idx}, {dur_val}) /* {comment} */")

out.append(",\n".join(mt_lines))
out.append("""ON CONFLICT (id_album_tema, orden_segmento) DO UPDATE SET
  id_tema = EXCLUDED.id_tema,
  duracion_segmento_segundos = EXCLUDED.duracion_segmento_segundos;
""")

full_output_sql = "\n".join(out)
with open(output_file, 'w', encoding='utf-8') as fp:
    fp.write(full_output_sql)

print(f"\n✨ Archivo {output_file} generado exitosamente! ({len(full_output_sql)} bytes, {len(full_output_sql.splitlines())} líneas)")
