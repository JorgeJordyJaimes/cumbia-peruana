import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import type { CategoriaHallazgo, HallazgoRadarItem, RadarDraft } from "../types";

interface RadarRow {
  mes: string;
  año: number;
  nombre_mes: string;
  categoria: string;
  titulo: string;
  subtitulo: string | null;
  artista: string;
  año_grabacion: number | null;
  sello: string | null;
  por_que_importa_md: string;
  portada_url: string | null;
  url_youtube: string | null;
  url_spotify: string | null;
  destino_tipo: string | null;
  destino_url: string | null;
}

export interface RadarData {
  actual: HallazgoRadarItem | null;
  historial: HallazgoRadarItem[];
}

function mapRadarRow(row: RadarRow): HallazgoRadarItem {
  const destinoTipo =
    row.destino_tipo === "informe" || row.destino_tipo === "genealogia"
      ? row.destino_tipo
      : "vinilo";

  return {
    id: `radar-${row.mes}`,
    mes: row.nombre_mes,
    año: row.año,
    categoria: row.categoria as CategoriaHallazgo,
    titulo: row.titulo,
    subtitulo: row.subtitulo || "",
    artista: row.artista,
    añoGrabacion: row.año_grabacion ?? undefined,
    sello: row.sello ?? undefined,
    porQueImporta: row.por_que_importa_md,
    portadaUrl: row.portada_url,
    youtubeUrl: row.url_youtube ?? undefined,
    spotifyUrl: row.url_spotify ?? undefined,
    enlaceExpediente: {
      tipo: destinoTipo,
      url: row.destino_url || "/vinilos",
      label:
        destinoTipo === "informe"
          ? "Consultar informe pericial →"
          : destinoTipo === "genealogia"
          ? "Explorar genealogía →"
          : "Inspeccionar expediente en vinilos →",
    },
  };
}

/**
 * Radar público alimentado exclusivamente por `radar_hallazgos`.
 * Si la migración editorial aún no está aplicada, devuelve un estado vacío
 * explícito en vez de contenido simulado.
 */
export const getRadarData = cache(async (limit = 12): Promise<RadarData> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("radar_hallazgos")
    .select(`
      mes,
      año,
      nombre_mes,
      categoria,
      titulo,
      subtitulo,
      artista,
      año_grabacion,
      sello,
      por_que_importa_md,
      portada_url,
      url_youtube,
      url_spotify,
      destino_tipo,
      destino_url
    `)
    .eq("estado", "publicado")
    .order("mes", { ascending: false })
    .limit(limit);

  if (error) {
    // PGRST205: la tabla no existe en el esquema remoto.
    if (error.code !== "PGRST205") {
      console.error("Error al consultar el radar:", error.message);
    }
    return { actual: null, historial: [] };
  }

  const rows = (data as unknown as RadarRow[]) || [];
  const [actual, ...historial] = rows.map(mapRadarRow);
  return { actual: actual ?? null, historial };
});

/**
 * Borrador editorial para la mesa de redacción. Incluye el periodo `YYYY-MM`
 * que es la clave primaria de `radar_hallazgos`.
 */
export const getRadarDraftForAdmin = cache(async (): Promise<RadarDraft | null> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("radar_hallazgos")
    .select(`
      mes,
      año,
      nombre_mes,
      categoria,
      titulo,
      subtitulo,
      artista,
      año_grabacion,
      sello,
      por_que_importa_md,
      portada_url,
      url_youtube,
      url_spotify,
      destino_tipo,
      destino_url
    `)
    .order("mes", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error || !data) {
    if (error && error.code !== "PGRST205") {
      console.error("Error al consultar el borrador del radar:", error.message);
    }
    return null;
  }

  const row = data as unknown as RadarRow;
  return { ...mapRadarRow(row), periodo: row.mes };
});
