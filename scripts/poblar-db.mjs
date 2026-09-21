import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { createClient } from '@supabase/supabase-js';

// Cargar variables de .env.local
const envLocalPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envLocalPath)) {
  const envContent = fs.readFileSync(envLocalPath, 'utf8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const [key, ...values] = trimmed.split('=');
    const val = values.join('=').trim().replace(/^["']|["']$/g, '');
    if (key && !process.env[key.trim()]) {
      process.env[key.trim()] = val;
    }
  }
}

const token = process.env.SUPABASE_ACCESS_TOKEN;
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!token) {
  console.error('\n❌ Error: No se encontró SUPABASE_ACCESS_TOKEN en el entorno ni en .env.local\n');
  process.exit(1);
}

// Lista ordenada de archivos SQL maestros
const DEFAULT_FILES = [
  'Base de Datos/datos/base/personas.sql',
  'Base de Datos/datos/base/grupos.sql',
  'Base de Datos/datos/base/sellos.sql',
  'Base de Datos/datos/vinilos/ingreso-lp-horoscopo.sql',
  'Base de Datos/datos/vinilos/ingreso-lp-infopesa.sql',
  'Base de Datos/datos/vinilos/ingreso-lp-sonoradio.sql',
  'Base de Datos/datos/vinilos/ingreso-singles.sql',
  'Base de Datos/datos/cassete/ingreso-casetes.sql',
  'Base de Datos/datos/canciones/ingreso-temas.sql',
];

const args = process.argv.slice(2);
const isReset = args.includes('--clean') || args.includes('--reset');
const targetFile = args.find((a) => !a.startsWith('--'));

async function main() {
  console.log('\n======================================================');
  console.log('🪗 KUMBIA SOUND - Sincronizador de Archivos SQL');
  console.log('======================================================\n');

  // Si se solicita --reset, reiniciar tablas para carga limpia desde 1
  if (isReset) {
    console.log('🧹 Vaciando tablas y reiniciando secuencias de ID...');
    try {
      const truncateSql = 'TRUNCATE Albumes, Grupos, Personas, Sellos_Discograficos RESTART IDENTITY CASCADE;';
      execSync(`npx supabase db query --linked "${truncateSql}"`, {
        stdio: 'pipe',
        env: { ...process.env, SUPABASE_ACCESS_TOKEN: token },
      });
      console.log('   ✓ Tablas maestras reiniciadas con éxito.\n');
    } catch (err) {
      console.error('   ❌ Error al reiniciar tablas:', err.message);
      process.exit(1);
    }
  }

  const filesToExecute = targetFile ? [targetFile] : DEFAULT_FILES;

  for (const relPath of filesToExecute) {
    const fullPath = path.resolve(process.cwd(), relPath);
    if (!fs.existsSync(fullPath)) {
      console.warn(`   ⚠️  Archivo no encontrado: ${relPath}`);
      continue;
    }

    const stat = fs.statSync(fullPath);
    if (stat.size === 0) {
      console.log(`   ⏭️  Omitiendo archivo vacío: ${relPath}`);
      continue;
    }

    process.stdout.write(`   ⏳ Ejecutando: ${relPath} ... `);
    try {
      execSync(`npx supabase db query --linked -f "${relPath}"`, {
        stdio: 'pipe',
        env: { ...process.env, SUPABASE_ACCESS_TOKEN: token },
      });
      console.log('✓ OK');
    } catch (err) {
      console.log('❌ ERROR');
      console.error('\nDetalles del error:');
      console.error(err.stderr ? err.stderr.toString() : err.message);
      process.exit(1);
    }
  }

  // Comprobar recuento en vivo con Supabase Client
  if (url && anonKey) {
    console.log('\n------------------------------------------------------');
    console.log('📊 Recuento actual en Supabase:');
    console.log('------------------------------------------------------');
    const supabase = createClient(url, anonKey);
    const tables = [
      { name: 'Personas', table: 'personas' },
      { name: 'Grupos Musicales', table: 'grupos' },
      { name: 'Sellos Discográficos', table: 'sellos_discograficos' },
      { name: 'Álbumes / Singles / Casetes', table: 'albumes' },
      { name: 'Temas / Obras Musicales', table: 'temas' },
      { name: 'Tipos de Álbum (Formatos)', table: 'tipos_album' },
      { name: 'Géneros Musicales', table: 'generos' },
      { name: 'Roles de Músicos', table: 'roles' },
    ];

    for (const t of tables) {
      const { count } = await supabase.from(t.table).select('*', { count: 'exact', head: true });
      console.log(`   • ${t.name}: ${count ?? 0} registros`);
    }
    console.log('------------------------------------------------------');
  }

  console.log('\n✨ ¡Sincronización completada con éxito!\n');
}

main().catch((e) => {
  console.error('\n❌ Fallo general:', e);
  process.exit(1);
});
