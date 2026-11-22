import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import type { Articulo } from "@/types/blog";

/**
 * Lecturas editoriales públicas del blog.
 *
 * Toda la aplicación consume los artículos desde este módulo para evitar
 * consultas divergentes entre la portada, el índice y el detalle.
 */
export const getPublishedArticles = cache(async (limit = 100): Promise<Articulo[]> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articulos")
    .select("*")
    .eq("publicado", true)
    .order("fecha_publicacion", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error al consultar artículos publicados:", error.message);
    return [];
  }

  return (data as Articulo[]) || [];
});

export const getArticleBySlug = cache(async (slug: string): Promise<Articulo | null> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articulos")
    .select("*")
    .eq("slug", slug)
    .eq("publicado", true)
    .maybeSingle();

  if (error) {
    console.error("Error al consultar el artículo:", error.message);
    return null;
  }

  return (data as Articulo | null) ?? null;
});
