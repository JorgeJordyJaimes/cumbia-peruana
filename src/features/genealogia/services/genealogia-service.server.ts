import { createClient as createServerClient } from "@/lib/supabase/server";
import type { ArbolGenealogicoResult, GenealogiaVersionesResult } from "@/types/database";

/**
 * Obtiene el árbol genealógico completo de un músico (Músico → Bandas → Temas → Prensajes)
 * desde el servidor usando la función RPC en PostgreSQL `get_arbol_genealogico`.
 */
export async function getArbolGenealogicoServer(
  personaId: number
): Promise<ArbolGenealogicoResult | null> {
  try {
    const supabase = await createServerClient();
    const { data, error } = await supabase.rpc("get_arbol_genealogico", {
      p_persona_id: personaId,
    });

    if (error) {
      console.error(`Error en RPC get_arbol_genealogico(${personaId}):`, error.message);
      return null;
    }

    return data as unknown as ArbolGenealogicoResult;
  } catch (err) {
    console.error("Excepción en getArbolGenealogicoServer:", err);
    return null;
  }
}

/**
 * Resuelve la jerarquía completa de versiones/covers de una canción con WITH RECURSIVE
 * desde el servidor usando la función RPC en PostgreSQL `get_genealogia_versiones`.
 */
export async function getGenealogiaVersionesServer(
  temaId: number
): Promise<GenealogiaVersionesResult | null> {
  try {
    const supabase = await createServerClient();
    const { data, error } = await supabase.rpc("get_genealogia_versiones", {
      p_tema_id: temaId,
    });

    if (error) {
      console.error(`Error en RPC get_genealogia_versiones(${temaId}):`, error.message);
      return null;
    }

    return data as unknown as GenealogiaVersionesResult;
  } catch (err) {
    console.error("Excepción en getGenealogiaVersionesServer:", err);
    return null;
  }
}
