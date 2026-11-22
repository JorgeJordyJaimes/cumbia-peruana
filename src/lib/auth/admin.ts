import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

/**
 * Correo autorizado para la administración editorial.
 *
 * Se recomienda definir `ADMIN_EMAIL` en el entorno. El fallback mantiene
 * compatibilidad con la instalación existente sin exponer el valor en el
 * cliente: esta constante solo se evalúa en el servidor.
 */
export function getAdminEmail(): string {
  return process.env.ADMIN_EMAIL?.trim() || "soundkumbia@gmail.com";
}

/**
 * Guardia única para las rutas `/admin`, `/admin/grupo/[id]` y
 * `/admin/persona/[id]`. Devuelve el cliente Supabase ya autenticado para
 * evitar crear dos instancias por petición.
 */
export async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.email !== getAdminEmail()) {
    redirect("/admin/login");
  }

  return { supabase, user };
}
