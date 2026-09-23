import fs from 'node:fs';
import path from 'node:path';

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
const projectRef = 'zinwvwulzdcmuhxrpnol';

if (!token) {
  console.error('\n❌ Error: No se encontró SUPABASE_ACCESS_TOKEN en el entorno ni en .env.local\n');
  process.exit(1);
}

const sqlPath = path.resolve(process.cwd(), 'supabase/migrations/20260923000000_create_blog_and_home_config.sql');
const sqlQuery = fs.readFileSync(sqlPath, 'utf8');

console.log('🚀 Aplicando migración para Blog y Configuración del Home...');

try {
  const response = await fetch(`https://api.supabase.com/v1/projects/${projectRef}/database/query`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: sqlQuery }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`❌ Error en la API de Supabase (${response.status}):`, errorText);
    process.exit(1);
  }

  const result = await response.json();
  console.log('✅ Migración aplicada exitosamente en Supabase:');
  console.log(result);
} catch (err) {
  console.error('❌ Error de conexión:', err);
  process.exit(1);
}
