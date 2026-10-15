import os
import json
import urllib.request
import unicodedata
from odf import opendocument, table, teletype

token = None
with open('.env.local', 'r', encoding='utf-8') as f:
    for line in f:
        line = line.strip()
        if line.startswith('SUPABASE_ACCESS_TOKEN='):
            token = line.split('=', 1)[1].strip().strip('"').strip("'")
            break

if not token:
    raise ValueError("No SUPABASE_ACCESS_TOKEN found in .env.local")

project_ref = 'zinwvwulzdcmuhxrpnol'

def run_query(sql):
    url = f"https://api.supabase.com/v1/projects/{project_ref}/database/query"
    data = json.dumps({"query": sql}).encode('utf-8')
    req = urllib.request.Request(url, data=data, headers={
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    })
    try:
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read().decode('utf-8'))
    except urllib.error.HTTPError as e:
        print("SQL Error:", e.read().decode('utf-8'))
        raise

print("=== ACTUALIZANDO CREDITO_GALLETA EN ALBUMES_TEMAS POR TITULO Y CATALOGO ===")

doc = opendocument.load('docs/datos-investigacion/Datos BD.ods')

def get_row_cells(row):
    cells = row.getElementsByType(table.TableCell)
    res = []
    for c in cells:
        rep = c.getAttribute('numbercolumnsrepeated')
        txt = teletype.extractText(c).strip()
        cnt = int(rep) if rep else 1
        if not txt and cnt > 30: continue
        for _ in range(cnt): res.append(txt)
    while res and not res[-1]: res.pop()
    return res

updates = []

# Process sheets
sheet_specs = [
    # (sheet_name, cat_col, lado_col, pista_col, alias_col, tit_col)
    ('Singles', 0, 3, 4, 9, 5),
    ('Temas LP', 0, 1, 2, 6, 3),
    ('Temas EP', 0, 1, 2, 6, 3),
    ('Temas Cassete', 0, 1, 2, 6, 3),
    ('Temas CD', 0, 1, 2, 6, 3),
]

for sheet_name, cat_col, lado_col, pista_col, alias_col, tit_col in sheet_specs:
    sheet = None
    for s in doc.spreadsheet.getElementsByType(table.Table):
        if s.getAttribute('name') == sheet_name:
            sheet = s
            break
    if not sheet: continue
    
    rows = sheet.getElementsByType(table.TableRow)[2:]
    for idx, r in enumerate(rows, start=2):
        c = get_row_cells(r)
        if not c or not any(c): continue
        cat = c[cat_col].strip() if len(c) > cat_col else ''
        lado = c[lado_col].strip() if len(c) > lado_col else ''
        pista = c[pista_col].strip() if len(c) > pista_col else '1'
        alias = c[alias_col].strip() if len(c) > alias_col else ''
        tit = c[tit_col].strip() if len(c) > tit_col else ''
        
        # In Temas LP rows 71-82 are LPG-216028, 83-94 are LPG-216042, etc.
        if sheet_name == 'Temas LP':
            # Row index in sheet: idx is 2-indexed
            # Let's map by idx or by cat pattern
            if idx <= 69:
                pass # Celeste LPs
            elif idx <= 82:
                cat = 'LPG-216028'
            elif idx <= 94:
                cat = 'LPG-216042'
            elif idx <= 104:
                cat = 'SE-9823'
            else:
                cat = 'LPM-216064'
        
        if not tit: continue
        
        if alias:
            updates.append({
                'cat': cat,
                'lado': lado,
                'pista': int(pista) if pista.isdigit() else 1,
                'alias': alias,
                'tit': tit,
                'sheet': sheet_name
            })

print(f"Total registros a sincronizar: {len(updates)}")

batch_size = 50
total_updated = 0

for i in range(0, len(updates), batch_size):
    chunk = updates[i:i+batch_size]
    statements = []
    for item in chunk:
        cat_esc = item['cat'].replace("'", "''")
        lado_esc = item['lado'].replace("'", "''")
        alias_esc = item['alias'].replace("'", "''")
        tit_esc = item['tit'].replace("'", "''")
        pista_num = item['pista']
        
        # Update by album and title
        stmt = f"""
        UPDATE albumes_temas at
        SET credito_galleta = '{alias_esc}'
        FROM albumes a, temas t
        WHERE at.id_album = a.id_album
          AND at.id_tema = t.id_tema
          AND (a.numero_catalogo = '{cat_esc}' OR a.numero_catalogo = '45-{cat_esc}')
          AND (LOWER(t.titulo_tema) = LOWER('{tit_esc}') OR (at.lado = '{lado_esc}' AND at.numero_pista = {pista_num}));
        """
        statements.append(stmt)
    
    combined_sql = "\n".join(statements)
    run_query(combined_sql)
    total_updated += len(chunk)
    print(f"  Procesados {total_updated}/{len(updates)}...")

print("✅ Todos los créditos de galleta sincronizados exitosamente en Supabase!")
