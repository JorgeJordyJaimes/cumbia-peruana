/**
 * URL canónica del sitio.
 *
 * Se configura con NEXT_PUBLIC_SITE_URL. El fallback corresponde al dominio
 * actual de producción; cuando se compre el dominio definitivo, basta con
 * cambiar la variable de entorno y la lista de redirects de Supabase.
 */
export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  return (configured || "https://kumbiasound.vercel.app").replace(/\/+$/, "");
}

export const SITE_URL = getSiteUrl();
