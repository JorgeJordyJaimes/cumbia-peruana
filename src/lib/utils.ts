export { cn } from "cn";

/**
 * Acepta solo URLs absolutas http(s) o rutas internas que empiezan por `/`.
 * Evita que un valor editorial contaminado se convierta en `javascript:` o
 * `data:` al renderizarse como enlace.
 */
export function isSafeHref(value?: string | null): value is string {
  if (!value) return false;
  return /^(https?:\/\/|\/)/i.test(value.trim());
}
