import { createClient as createBrowserClient } from "@/lib/supabase/client";
import type { ArbolGenealogicoResult, GenealogiaVersionesResult } from "@/types/database";

export interface TemaVersionOption {
  id_tema: number;
  titulo_tema: string;
}

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
 * Temas que tienen al menos una versión registrada en la tabla `Versiones`.
 * Evita listas estáticas y mantiene el selector sincronizado con la base.
 */
export async function getTemasConVersionesClient(): Promise<TemaVersionOption[]> {
  try {
    const supabase = createBrowserClient();
    const { data, error } = await supabase
      .from("versiones")
      .select("id_tema, temas!versiones_id_tema_fkey (id_tema, titulo_tema)");

    if (error) {
      console.error("Error al consultar temas con versiones:", error.message);
      return [];
    }

    const rows = (data as unknown as Array<{
      id_tema: number;
      temas: { id_tema: number; titulo_tema: string } | null;
    }>) || [];

    const seen = new Map<number, TemaVersionOption>();
    for (const row of rows) {
      if (row.temas && !seen.has(row.temas.id_tema)) {
        seen.set(row.temas.id_tema, {
          id_tema: row.temas.id_tema,
          titulo_tema: row.temas.titulo_tema,
        });
      }
    }

    return Array.from(seen.values()).sort((a, b) => a.titulo_tema.localeCompare(b.titulo_tema));
  } catch (err) {
    console.error("Excepción en getTemasConVersionesClient:", err);
    return [];
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
