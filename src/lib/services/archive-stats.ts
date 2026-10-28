import { cache } from "react";
import { createClient } from "@/lib/supabase/server";

export interface ArchiveStats {
  totalAlbumes: number;
  totalSellos: number;
  totalGrupos: number;
  totalPersonas: number;
  totalSingles: number;
  totalLps: number;
}

export const getArchiveStats = cache(async (): Promise<ArchiveStats> => {
  const supabase = await createClient();

  const [
    { count: totalAlbumes },
    { count: totalSellos },
    { count: totalGrupos },
    { count: totalPersonas },
    { count: totalSingles },
    { count: totalLps },
  ] = await Promise.all([
    supabase.from("albumes").select("*", { count: "exact", head: true }),
    supabase.from("sellos_discograficos").select("*", { count: "exact", head: true }),
    supabase.from("grupos").select("*", { count: "exact", head: true }),
    supabase.from("personas").select("*", { count: "exact", head: true }),
    supabase.from("albumes").select("*", { count: "exact", head: true }).eq("id_tipo_album", 1),
    supabase.from("albumes").select("*", { count: "exact", head: true }).eq("id_tipo_album", 2),
  ]);

  return {
    totalAlbumes: totalAlbumes ?? 0,
    totalSellos: totalSellos ?? 0,
    totalGrupos: totalGrupos ?? 0,
    totalPersonas: totalPersonas ?? 0,
    totalSingles: totalSingles ?? 0,
    totalLps: totalLps ?? 0,
  };
});
