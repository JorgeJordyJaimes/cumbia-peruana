import os
import json
import urllib.request
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

print("=== ACTUALIZANDO CREDITO_GALLETA EN ALBUMES_TEMAS ===")

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

res_g = run_query("SELECT id_grupo, nombre_grupo FROM grupos;")
grupos_id = {r['nombre_grupo'].lower(): r['id_grupo'] for r in res_g}

res_s = run_query("SELECT id_sello, nombre_sello FROM sellos_discograficos;")
sellos_id = {r['nombre_sello'].lower(): r['id_sello'] for r in res_s}
sellos_id['sono radio'] = sellos_id['sonoradio']

updates = []

# Process sheets:
# Singles: cat=0, lado=3, pista=4, tit=5, grupo=6, alias=9
# Temas LP: cat=0, lado=1, pista=2, tit=3, alias=6, grupo=7
sheet_specs = [
    # (sheet_name, cat_col, lado_col, pista_col, tit_col, alias_col, grupo_col, sello_col)
    ('Singles', 0, 3, 4, 5, 9, 6, 1),
    ('Temas LP', 0, 1, 2, 3, 6, 7, None),
    ('Temas EP', 0, 1, 2, 3, 6, 7, None),
    ('Temas Cassete', 0, 1, 2, 3, 6, 7, None),
    ('Temas CD', 0, 1, 2, 3, 6, 7, None),
]

for sheet_name, cat_col, lado_col, pista_col, tit_col, alias_col, grupo_col, sello_col in sheet_specs:
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
        lado = c[lado_col].strip().upper() if len(c) > lado_col else ''
        pista = c[pista_col].strip() if len(c) > pista_col else '1'
        tit = c[tit_col].strip() if len(c) > tit_col else ''
        alias = c[alias_col].strip() if len(c) > alias_col else ''
        grupo = c[grupo_col].strip() if grupo_col is not None and len(c) > grupo_col else ''
        sello = c[sello_col].strip() if sello_col is not None and len(c) > sello_col else ''
        
        gid = grupos_id.get(grupo.lower()) if grupo else None
        sid = sellos_id.get(sello.lower()) if sello else None
        
        if not tit or not cat or not lado: continue
        
        if alias:
            updates.append({
                'cat': cat,
                'lado': lado,
                'pista': int(pista) if pista.isdigit() else 1,
                'alias': alias,
                'tit': tit,
                'sheet': sheet_name,
                'gid': gid,
                'sid': sid
            })

print(f"Total registros con crédito de galleta a sincronizar: {len(updates)}")

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
        gid = item['gid']
        sid = item['sid']
        
        grupo_cond = f"AND a.id_grupo = {gid}" if gid else ""
        sello_cond = f"AND a.id_sello = {sid}" if sid else ""
        
        stmt = f"""
        UPDATE albumes_temas at
        SET credito_galleta = '{alias_esc}'
        FROM albumes a
        WHERE at.id_album = a.id_album
          AND (a.numero_catalogo = '{cat_esc}' OR a.numero_catalogo = '45-{cat_esc}')
          {grupo_cond}
          {sello_cond}
          AND at.lado = '{lado_esc}'
          AND at.numero_pista = {pista_num};
        """
        statements.append(stmt)
    
    combined_sql = "\n".join(statements)
    run_query(combined_sql)
    total_updated += len(chunk)
    print(f"  Procesados {total_updated}/{len(updates)}...")

print("✅ Todos los créditos de galleta sincronizados exitosamente en Supabase!")
