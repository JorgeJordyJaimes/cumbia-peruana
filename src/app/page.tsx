import { createClient } from "@/lib/supabase/server";
import { AmbientGlow } from "@/components/ui/ambient-glow";
import {
  RetroHomeCoordinator,
  RetroHero,
  GenealogyExplorer,
  MatchBpmWidget,
  RadarSonoro,
  HistoriasDeFondo,
  NosotrosManifiesto,
  RetroFooter,
} from "@/features/home-retro";
import { CatalogExplorer, type AlbumItem } from "@/features/albumes";
import { CamelotSelector, type TrackDJItem } from "@/features/dj-tools";
import type { TrackItem } from "@/features/temas";
import type { CamelotCode } from "@/types/domain";
import type { ConfiguracionHome } from "@/types/blog";
import { Disc3, SlidersHorizontal } from "lucide-react";

export const revalidate = 60; // Regenerar cada 60 segundos

interface RawAlbumRow {
  id_album: number;
  nombre_album: string | null;
  numero_catalogo: string | null;
  año_publicacion: number | null;
  url_portada: string | null;
  es_recopilatorio: boolean;
  grupos: { nombre_grupo: string } | null;
  sellos_discograficos: { nombre_sello: string } | null;
  tipos_album: { nombre_tipo: string } | null;
}

interface RawTemaRow {
  id_tema: number;
  titulo_tema: string;
  duracion_segundos: number | null;
  bpm: number | null;
  camelot_code: string | null;
  musical_key: string | null;
  albumes_temas: Array<{
    id_album: number;
    numero_pista: number | null;
    lado: string | null;
    albumes: { nombre_album: string | null; año_publicacion: number | null } | null;
  }> | null;
  temas_grupos: Array<{
    grupos: { nombre_grupo: string } | null;
  }> | null;
  temas_compositores: Array<{
    personas: { nombre: string; apodo: string | null } | null;
  }> | null;
}

export default async function Home() {
  const supabase = await createClient();

  // 1. Estadísticas en vivo desde Supabase
  const [
    { count: totalAlbumes },
    { count: totalGrupos },
    { count: totalPersonas },
    { count: totalSellos },
  ] = await Promise.all([
    supabase.from("albumes").select("*", { count: "exact", head: true }),
    supabase.from("grupos").select("*", { count: "exact", head: true }),
    supabase.from("personas").select("*", { count: "exact", head: true }),
    supabase.from("sellos_discograficos").select("*", { count: "exact", head: true }),
  ]);

  // 2. Álbumes del catálogo físico
  const { data: rawAlbumes } = await supabase
    .from("albumes")
    .select(`
      id_album,
      nombre_album,
      numero_catalogo,
      año_publicacion,
      url_portada,
      es_recopilatorio,
      grupos (nombre_grupo),
      sellos_discograficos (nombre_sello),
      tipos_album (nombre_tipo)
    `)
    .order("año_publicacion", { ascending: true })
    .limit(140);

  // 3. Temas con especificaciones DJ
  const { data: rawTemas } = await supabase
    .from("temas")
    .select(`
      id_tema,
      titulo_tema,
      duracion_segundos,
      bpm,
      camelot_code,
      musical_key,
      albumes_temas (
        id_album,
        numero_pista,
        lado,
        albumes (nombre_album, año_publicacion)
      ),
      temas_grupos (
        grupos (nombre_grupo)
      ),
      temas_compositores (
        personas (nombre, apodo)
      )
    `)
    .not("bpm", "is", null);

  // 4. Configuración del Home
  const { data: rawHomeConfig } = await supabase
    .from("configuracion_home")
    .select("*")
    .eq("id", 1)
    .single();

  const homeConfig: ConfiguracionHome = (rawHomeConfig as unknown as ConfiguracionHome) || {
    id: 1,
    cintillo_texto: "CATÁLOGO & ARCHIVO DISCOGRÁFICO HISTÓRICO // EDICIONES DE COLECCIÓN 1968–2005",
    cintillo_activo: true,
    hero_insignia: "Archivo & Curaduría de Vinilos",
    hero_titulo: "El árbol genealógico y archivo sonoro de la cumbia peruana",
    hero_subtitulo:
      "Conectamos músicos de sesión, guitarras legendarias, sellos históricos y discografías completas. Explora el archivo o sincroniza tu set con Match BPM.",
    hero_boton_texto: "Explorar Archivo",
    hero_boton_url: "#genealogia",
    albumes_destacados_ids: [1, 2, 3],
    seccion_blog_activa: true,
    updated_at: new Date().toISOString(),
  };

  // Mapear Álbumes
  const rawAlbumsList = (rawAlbumes as unknown as RawAlbumRow[]) || [];
  const albums: AlbumItem[] = rawAlbumsList.map((a) => ({
    id: a.id_album,
    title: a.nombre_album || "Sin Título Registrado",
    artist: a.grupos?.nombre_grupo || "Varios Artistas",
    year: a.año_publicacion,
    catalogNumber: a.numero_catalogo,
    label: a.sellos_discograficos?.nombre_sello || "Sello Particular",
    format: a.tipos_album?.nombre_tipo || "LP 33 RPM",
    coverUrl: a.url_portada,
    isCompilation: a.es_recopilatorio,
  }));

  // Mapear Pistas para DJ Tools
  const rawTemasList = (rawTemas as unknown as RawTemaRow[]) || [];
  const djTracks: TrackDJItem[] = rawTemasList.map((t) => {
    const primaryAlbumTema = t.albumes_temas?.[0];
    const primaryAlbum = primaryAlbumTema?.albumes;
    const primaryGroup = t.temas_grupos?.[0]?.grupos;

    return {
      id: t.id_tema,
      title: t.titulo_tema,
      artist: primaryGroup?.nombre_grupo || "Agrupación Histórica",
      album: primaryAlbum?.nombre_album || undefined,
      year: primaryAlbum?.año_publicacion || undefined,
      bpm: t.bpm || 115,
      camelot: (t.camelot_code as CamelotCode) || "8A",
      musicalKey: t.musical_key || "Am",
      format: "Vinilo",
    };
  });

  // Mapa de pistas por álbum para contraportadas
  const tracksMap: Record<number, TrackItem[]> = {};
  rawTemasList.forEach((t) => {
    const composer = t.temas_compositores?.[0]?.personas?.nombre;
    (t.albumes_temas || []).forEach((at) => {
      if (!tracksMap[at.id_album]) {
        tracksMap[at.id_album] = [];
      }
      tracksMap[at.id_album].push({
        id: t.id_tema,
        trackNumber: at.numero_pista,
        side: at.lado,
        title: t.titulo_tema,
        durationSeconds: t.duracion_segundos,
        composer,
        bpm: t.bpm,
        camelot: t.camelot_code,
        musicalKey: t.musical_key,
      });
    });
  });

  return (
    <div className="relative min-h-screen bg-[#0D0F12] text-[#F3F4F6] selection:bg-[#E5A93C] selection:text-black">
      {/* Resplandores Atmosféricos de Fondo */}
      <AmbientGlow variant="warm-solar" className="top-0 left-1/4 opacity-15" />
      <AmbientGlow variant="velvet-night" className="top-1/3 right-0 opacity-15" />
      <AmbientGlow variant="chicha-psychedelic" className="bottom-1/4 left-0 opacity-15" />

      {/* Cintillo Superior de Anuncios */}
      {homeConfig.cintillo_activo && homeConfig.cintillo_texto && (
        <div className="border-b border-[#E5A93C]/20 bg-[#E5A93C]/10 px-4 py-2 text-center font-mono text-[11px] text-[#E5A93C] tracking-wider">
          <span>{homeConfig.cintillo_texto}</span>
        </div>
      )}

      {/* COORDINADOR CON NAVBAR Y BUSCADOR COMMAND-PALETTE (⌘K) */}
      <RetroHomeCoordinator>
        <main className="space-y-4">
          {/* SECCIÓN 2: HERO SECTION (ABOVE THE FOLD) */}
          <RetroHero
            totalAlbumes={totalAlbumes}
            totalGrupos={totalGrupos}
            totalSellos={totalSellos}
            totalPersonas={totalPersonas}
          />

          {/* SECCIÓN 3: EXPLORADOR GENEALÓGICO (VALOR CULTURAL ÚNICO) */}
          <GenealogyExplorer />

          {/* SECCIÓN 4: MATCH BPM (PREVIEW INTERACTIVO DJ) */}
          <MatchBpmWidget />

          {/* SECCIÓN 5: EL RADAR SONORO (CURADURÍA SEMANAL & LITE EMBEDS) */}
          <RadarSonoro />

          {/* SECCIÓN 6: HISTORIAS DE FONDO (CRÓNICAS & BLOG) */}
          <HistoriasDeFondo />

          {/* SECCIÓN DISCOGRÁFICA COMPLETA DE SOPORTE FÍSICO */}
          <section id="catalogo-archivo" className="scroll-mt-24 py-16 border-t border-white/5 bg-[#0D0F12]">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 space-y-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#E5A93C]">
                    <Disc3 className="h-4 w-4" />
                    Bóveda de Prensajes Originales
                  </div>
                  <h2 className="font-serif text-3xl sm:text-5xl font-black tracking-tight text-white mt-1">
                    Catálogo de 719+ Vinilos & Casetes
                  </h2>
                </div>
                <p className="max-w-md font-mono text-xs text-[#9CA3AF]">
                  Inspecciona carátulas restauradas, sellos de época y contraportadas con tracklist
                  completo.
                </p>
              </div>

              <CatalogExplorer initialAlbums={albums} tracksMap={tracksMap} />
            </div>
          </section>

          {/* CONSOLA EXTENDIDA DE ARMONÍA CAMELOT */}
          <section id="dj-tools" className="scroll-mt-24 py-16 border-t border-white/5 bg-[#16191E]/40">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 space-y-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#10B981]">
                    <SlidersHorizontal className="h-4 w-4" />
                    Consola Armónica Integral
                  </div>
                  <h2 className="font-serif text-3xl sm:text-5xl font-black tracking-tight text-white mt-1">
                    Rueda Camelot para Sesiones en Vivo
                  </h2>
                </div>
                <p className="max-w-md font-mono text-xs text-[#9CA3AF]">
                  Explora todas las pistas del catálogo catalogadas con BPM verificado y tonalidad
                  armónica.
                </p>
              </div>

              <CamelotSelector tracks={djTracks} />
            </div>
          </section>

          {/* SECCIÓN 7: NOSOTROS / MANIFIESTO */}
          <NosotrosManifiesto />
        </main>
      </RetroHomeCoordinator>

      {/* SECCIÓN 8: FOOTER */}
      <RetroFooter />
    </div>
  );
}
