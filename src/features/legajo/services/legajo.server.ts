import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import type { LegajoBloque } from "../types";

/**
 * Bloques institucionales editables del Legajo.
 * Si la migración editorial no está aplicada, la página pública conserva su
 * contenido estático y la mesa de redacción muestra un error explícito.
 */
export const getLegajoBloques = cache(async (): Promise<LegajoBloque[]> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("legajo_bloques")
    .select("clave, titulo, contenido_md, updated_at")
    .order("clave", { ascending: true });

  if (error) {
    if (error.code !== "PGRST205") {
      console.error("Error al consultar los bloques del legajo:", error.message);
    }
    return [];
  }

  return (data as LegajoBloque[]) || [];
});
