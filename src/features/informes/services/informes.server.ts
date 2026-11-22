import { cache } from "react";
import { createClient } from "@/lib/supabase/server";

export interface InformeFuente {
  id?: string;
  tipo?: "PRIMARIA" | "SECUNDARIA";
  referencia?: string;
  fecha?: string;
  url?: string;
}

export interface InformeEditorial {
  contenido_md: string;
  sello_verificacion: "PRIMARIA" | "SECUNDARIA" | "SIN_VERIFICAR";
  fuentes: InformeFuente[];
  publish_at: string | null;
  updated_at: string | null;
}

/**
 * Informe editorial publicado de un músico. La ficha pública combina este
 * contenido con el grafo genealógico de `get_arbol_genealogico`.
 */
export const getInformeEditorial = cache(
  async (personaId: number): Promise<InformeEditorial | null> => {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("informes_personas")
      .select("contenido_md, sello_verificacion, fuentes, publish_at, updated_at")
      .eq("id_persona", personaId)
      .eq("estado", "publicado")
      .maybeSingle();

    if (error) {
      if (error.code !== "PGRST205") {
        console.error("Error al consultar el informe editorial:", error.message);
      }
      return null;
    }

    if (!data) return null;

    return {
      contenido_md: data.contenido_md || "",
      sello_verificacion:
        data.sello_verificacion === "PRIMARIA" || data.sello_verificacion === "SECUNDARIA"
          ? data.sello_verificacion
          : "SIN_VERIFICAR",
      fuentes: Array.isArray(data.fuentes) ? (data.fuentes as InformeFuente[]) : [],
      publish_at: data.publish_at ?? null,
      updated_at: data.updated_at ?? null,
    };
  }
);
