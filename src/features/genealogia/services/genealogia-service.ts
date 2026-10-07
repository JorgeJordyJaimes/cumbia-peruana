import { createClient as createBrowserClient } from "@/lib/supabase/client";
import type { ArbolGenealogicoResult, GenealogiaVersionesResult } from "@/types/database";

/**
 * Obtiene el árbol genealógico completo de un músico desde el cliente del navegador
 * usando la función RPC en PostgreSQL `get_arbol_genealogico`.
 */
export async function getArbolGenealogicoClient(
  personaId: number
): Promise<ArbolGenealogicoResult | null> {
  try {
    const supabase = createBrowserClient();
    const { data, error } = await supabase.rpc("get_arbol_genealogico", {
      p_persona_id: personaId,
    });

    if (error) {
      console.error(`Error en RPC client get_arbol_genealogico(${personaId}):`, error.message);
      return null;
    }

    return data as unknown as ArbolGenealogicoResult;
  } catch (err) {
    console.error("Excepción en getArbolGenealogicoClient:", err);
    return null;
  }
}

/**
 * Resuelve la jerarquía completa de versiones/covers desde el cliente del navegador
 * usando la función RPC en PostgreSQL `get_genealogia_versiones` con WITH RECURSIVE.
 */
export async function getGenealogiaVersionesClient(
  temaId: number
): Promise<GenealogiaVersionesResult | null> {
  try {
    const supabase = createBrowserClient();
    const { data, error } = await supabase.rpc("get_genealogia_versiones", {
      p_tema_id: temaId,
    });

    if (error) {
      console.error(`Error en RPC client get_genealogia_versiones(${temaId}):`, error.message);
      return null;
    }

    return data as unknown as GenealogiaVersionesResult;
  } catch (err) {
    console.error("Excepción en getGenealogiaVersionesClient:", err);
    return null;
  }
}
