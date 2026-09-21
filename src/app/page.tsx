import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { AmbientGlow } from "@/components/ui/ambient-glow";
import { DistroHeader, DistroHero, DistroHomeCoordinator } from "@/features/home-distro";
import { CamelotSelector, type TrackDJItem } from "@/features/dj-tools";
import type { AlbumItem } from "@/features/albumes";
import type { TrackItem } from "@/features/temas";
import type { CamelotCode } from "@/types/domain";
import { Disc3, SlidersHorizontal } from "lucide-react";

export const revalidate = 60;

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

  // 1. Estadísticas en vivo
  const [
    { count: totalAlbumes },
    { count: totalGrupos },
  ] = await Promise.all([
    supabase.from("albumes").select("*", { count: "exact", head: true }),
    supabase.from("grupos").select("*", { count: "exact", head: true }),
  ]);

  // 2. Álbumes para el Catálogo
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

  // 3. Temas para la Consola DJ y Tracklists
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

  // Mapear Temas DJ
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

  // Mapear Tracklists por Álbum
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
    <div className="relative min-h-screen bg-[#0a0a0c] text-neutral-100 selection:bg-amber-500 selection:text-black">
      {/* Luces Ambientales Cálidas */}
      <AmbientGlow variant="warm-solar" className="top-0 left-0" />
      <AmbientGlow variant="velvet-night" className="top-[35%] right-0" />

      {/* 1. Header con Sello Ovalado Central */}
      <DistroHeader />

      {/* Contenedor Principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-24">
        {/* 2. Hero Dividido en Dos Bloques Asimétricos */}
        <DistroHero totalAlbumes={totalAlbumes} totalGrupos={totalGrupos} />

        {/* 3. Coordinador Distro: Tira de Formatos, Cuadrícula 4+2+1, Triptych y Catálogo */}
        <DistroHomeCoordinator albums={albums} tracksMap={tracksMap} />

        {/* 4. Consola Armónica DJ Camelot */}
        <section id="dj-tools" className="scroll-mt-24 space-y-6 pt-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-amber-400">
                <SlidersHorizontal className="h-4 w-4" />
                Mezcla Armónica DJ & Tempo Match
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mt-1">
                Consola Armónica Camelot
              </h2>
            </div>
            <p className="max-w-md font-mono text-xs text-neutral-400">
              Selecciona una clave de la Rueda Camelot para descubrir temas de cumbia peruana con compatibilidad tonal matemáticamente armónica (+1, -1 o cambio de modo).
            </p>
          </div>

          <CamelotSelector tracks={djTracks} />
        </section>
      </main>

      {/* Footer Distro Retro */}
      <footer className="border-t border-white/10 bg-neutral-950 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs text-neutral-400">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Disc3 className="h-5 w-5" />
            </div>
            <div>
              <p className="font-bold text-white uppercase tracking-wider">Kumbia Sound // Archivo del Vinilo</p>
              <p className="text-[11px] text-neutral-500">
                Preservación discográfica de la cumbia y chicha peruana (1968–2005)
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-[11px]">
            <Link href="#categorias" className="hover:text-amber-400 transition-colors">
              Formatos
            </Link>
            <Link href="#catalogo" className="hover:text-amber-400 transition-colors">
              Novedades
            </Link>
            <Link href="#preservacion" className="hover:text-amber-400 transition-colors">
              Preservación
            </Link>
            <Link href="#dj-tools" className="hover:text-amber-400 transition-colors">
              Consola Camelot
            </Link>
            <Link href="/admin" className="hover:text-amber-400 transition-colors">
              Panel Admin
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
