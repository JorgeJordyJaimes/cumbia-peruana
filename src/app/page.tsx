import Link from "next/link";
import { Disc3, Music2, Library, SlidersHorizontal, Layers, Sparkles, Compass, History } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { AmbientGlow } from "@/components/ui/ambient-glow";
import { GlassCard } from "@/components/ui/glass-card";
import { CamelotSelector, type TrackDJItem } from "@/features/dj-tools";
import { CatalogExplorer, type AlbumItem } from "@/features/albumes";
import { GroupCard, type GroupItem } from "@/features/grupos";
import type { TrackItem } from "@/features/temas";
import type { CamelotCode } from "@/types/domain";

export const revalidate = 60; // Regenerar cada 60 segundos o bajo demanda

export default async function Home() {
  const supabase = await createClient();

  // 1. Estadísticas en vivo
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

  // 2. Álbumes del catálogo histórico
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

  // 3. Temas con especificaciones para DJ Tools
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

  // 4. Grupos representativos
  const { data: rawGrupos } = await supabase
    .from("grupos")
    .select(`
      id_grupo,
      nombre_grupo,
      region,
      fecha_formacion,
      personas (nombre)
    `)
    .in("id_grupo", [1, 3, 4, 6, 12, 26]);

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

interface RawGrupoRow {
  id_grupo: number;
  nombre_grupo: string;
  region: string | null;
  fecha_formacion: string | null;
  personas: { nombre: string } | null;
}

  // Mapear álbumes a modelo de UI
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

  // Mapear temas para la consola DJ
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

  // Mapear mapa de pistas por álbum para las contraportadas
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

  // Mapear grupos
  const rawGruposList = (rawGrupos as unknown as RawGrupoRow[]) || [];
  const groups: GroupItem[] = rawGruposList.map((g) => ({
    id: g.id_grupo,
    name: g.nombre_grupo,
    region: g.region || (g.nombre_grupo.includes("Mirlos") || g.nombre_grupo.includes("Juaneco") ? "Amazonía Peruana" : "Lima / Costa Central"),
    foundationYear: g.fecha_formacion ? String(g.fecha_formacion) : undefined,
    directorName: g.personas?.nombre || undefined,
  }));

  return (
    <div className="relative flex min-h-screen flex-col bg-[#0a0a0c] text-neutral-100 selection:bg-amber-500 selection:text-black">
      {/* Luces de Fondo Ambientales (Atmospheric Mesh Glow) */}
      <AmbientGlow variant="chicha-psychedelic" className="top-0 left-0" />
      <AmbientGlow variant="warm-solar" className="top-[40%] right-0" />
      <AmbientGlow variant="velvet-night" className="bottom-0 left-0" />

      {/* Header Editorial con Glassmorphism */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-neutral-950/70 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-orange-950/40 transition-transform group-hover:scale-105">
              <Disc3 className="h-6 w-6 text-black" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-amber-400 transition-colors">
                  Kumbia Sound
                </span>
                <span className="hidden sm:inline-block rounded-md border border-amber-500/30 bg-amber-500/10 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-amber-400">
                  ARCHIVO 1968–2005
                </span>
              </div>
              <p className="font-mono text-[10px] text-neutral-400 hidden sm:block">
                Preservación Musicológica & Herramientas DJ
              </p>
            </div>
          </Link>

          <nav className="flex items-center gap-2 sm:gap-5 text-xs sm:text-sm font-medium">
            <Link
              href="#catalogo"
              className="text-neutral-300 hover:text-white transition-colors px-2 py-1 rounded-lg hover:bg-white/5"
            >
              Catálogo
            </Link>
            <Link
              href="#dj-tools"
              className="text-neutral-300 hover:text-white transition-colors px-2 py-1 rounded-lg hover:bg-white/5"
            >
              Consola DJ
            </Link>
            <Link
              href="#grupos"
              className="hidden md:inline-block text-neutral-300 hover:text-white transition-colors px-2 py-1 rounded-lg hover:bg-white/5"
            >
              Agrupaciones
            </Link>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/10 px-3 py-1.5 font-mono text-xs text-white backdrop-blur hover:bg-white/20 transition-all shadow-sm"
            >
              <History className="h-3.5 w-3.5 text-amber-400" />
              <span>Base Datos</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 space-y-24 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Hero Section: Editorial & Atmospheric */}
        <section className="relative text-center pt-8 pb-12">
          <div className="mx-auto max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 font-mono text-xs font-semibold text-amber-300 shadow-inner">
              <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
              Archivo Histórico & Motor de Armonía Camelot
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
              Preservación del Vinilo y la{" "}
              <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 bg-clip-text text-transparent">
                Cumbia Peruana
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-base sm:text-lg text-neutral-300 font-normal leading-relaxed">
              Catálogo histórico de prensajes originales en 45 RPM, LPs y casetes
              (Infopesa, Odeón, Horóscopo, Sono Radio) con herramientas técnicas
              de compatibilidad armónica y BPM para DJs y coleccionistas.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="#catalogo"
                className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-black shadow-lg shadow-amber-500/20 hover:bg-amber-400 hover:scale-[1.02] transition-all"
              >
                <Library className="h-4 w-4" />
                Explorar Catálogo ({totalAlbumes ?? 719})
              </Link>
              <Link
                href="#dj-tools"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-white backdrop-blur hover:bg-white/10 hover:border-white/30 transition-all"
              >
                <SlidersHorizontal className="h-4 w-4 text-amber-400" />
                Consola DJ Camelot
              </Link>
            </div>
          </div>

          {/* Panel de Estadísticas Físicas (Live Data Strip) */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
            <GlassCard variant="elevated" className="p-4 text-center">
              <div className="font-mono text-2xl sm:text-3xl font-black text-amber-400">
                {totalAlbumes ?? 719}
              </div>
              <p className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 mt-1">
                LPs & Singles 45 RPM
              </p>
            </GlassCard>

            <GlassCard variant="elevated" className="p-4 text-center">
              <div className="font-mono text-2xl sm:text-3xl font-black text-rose-400">
                {totalGrupos ?? 581}
              </div>
              <p className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 mt-1">
                Agrupaciones Históricas
              </p>
            </GlassCard>

            <GlassCard variant="elevated" className="p-4 text-center">
              <div className="font-mono text-2xl sm:text-3xl font-black text-cyan-400">
                {totalPersonas ?? 360}
              </div>
              <p className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 mt-1">
                Músicos & Compositores
              </p>
            </GlassCard>

            <GlassCard variant="elevated" className="p-4 text-center">
              <div className="font-mono text-2xl sm:text-3xl font-black text-emerald-400">
                {totalSellos ?? 258}
              </div>
              <p className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 mt-1">
                Sellos Discográficos
              </p>
            </GlassCard>
          </div>
        </section>

        {/* Section 1: DJ Tools & Camelot Harmonic Engine */}
        <section id="dj-tools" className="scroll-mt-20 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-amber-400">
                <Music2 className="h-4 w-4" />
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

        {/* Section 2: Physical Vinyl Catalog Explorer */}
        <section id="catalogo" className="scroll-mt-20 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-amber-400">
                <Disc3 className="h-4 w-4" />
                Archivo Discográfico Físico
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mt-1">
                Catálogo de Vinilos & Casetes
              </h2>
            </div>
            <p className="max-w-md font-mono text-xs text-neutral-400">
              Explora las carátulas, sellos discográficos de época y contraportadas con el tracklist completo y especificaciones técnicas.
            </p>
          </div>

          <CatalogExplorer initialAlbums={albums} tracksMap={tracksMap} />
        </section>

        {/* Section 3: Iconic Groups & Musical Genealogy */}
        <section id="grupos" className="scroll-mt-20 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-amber-400">
                <Compass className="h-4 w-4" />
                Genealogía & Sonido Tradicional
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mt-1">
                Pioneros de la Cumbia Peruana
              </h2>
            </div>
            <p className="max-w-md font-mono text-xs text-neutral-400">
              Los conjuntos fundamentales que definieron las guitarras eléctricas peruanas, órganos Farfisa y percusión tropical entre 1968 y 2005.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {groups.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
          </div>
        </section>

        {/* Section 4: Metodología Histórica y Trazabilidad */}
        <section className="space-y-6">
          <GlassCard variant="editorial" className="p-6 sm:p-10 space-y-6">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-amber-400">
              <Layers className="h-4 w-4" />
              Metodología Discográfica Físico-Digital
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Trazabilidad Única del Prensaje Peruano
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-neutral-300 font-sans text-sm leading-relaxed">
              <div className="space-y-2">
                <h4 className="font-semibold text-white flex items-center gap-2">
                  <span className="font-mono text-amber-400 text-xs">01.</span>
                  Singles 45 RPM vs. LPs
                </h4>
                <p className="text-neutral-400 text-xs">
                  En el Perú de los años 70, la mayoría de temas se grababan y publicaban primero en discos sencillos de 7 pulgadas (45 RPM) para las rockolas de barrio. Solo los más exitosos se compilaban posteriormente en discos de larga duración (LP 33 RPM).
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-white flex items-center gap-2">
                  <span className="font-mono text-amber-400 text-xs">02.</span>
                  Discos Split Lado A / Lado B
                </h4>
                <p className="text-neutral-400 text-xs">
                  Era práctica común que un sello discográfico prensara un grupo en el Lado A (ej. Los Destellos) y otra agrupación emergente en el Lado B. Nuestro modelo preserva esta relación con absoluta precisión genealógica.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-white flex items-center gap-2">
                  <span className="font-mono text-amber-400 text-xs">03.</span>
                  Consulta DJ sin Reproductor
                </h4>
                <p className="text-neutral-400 text-xs">
                  Este sistema está concebido estrictamente como una herramienta musicológica y de preparación de sesiones para DJs de vinilo y tornamesistas. No almacena ni reproduce archivos de audio por razones de preservación y derechos.
                </p>
              </div>
            </div>
          </GlassCard>
        </section>
      </main>

      {/* Footer Editorial Retro */}
      <footer className="mt-20 border-t border-white/10 bg-neutral-950 py-12 px-6">
        <div className="container mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs text-neutral-400">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Disc3 className="h-5 w-5" />
            </div>
            <div>
              <p className="font-bold text-neutral-300">Kumbia Sound // Archivo Histórico</p>
              <p className="text-[11px] text-neutral-400">Preservación discográfica de la cumbia y chicha peruana (1968–2005)</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-[11px]">
            <Link href="#catalogo" className="hover:text-amber-400 transition-colors">
              Catálogo Físico
            </Link>
            <Link href="#dj-tools" className="hover:text-amber-400 transition-colors">
              Consola Camelot
            </Link>
            <Link href="/admin" className="hover:text-amber-400 transition-colors">
              Panel Administrativo
            </Link>
            <a
              href="https://github.com/JorgeJordyJaimes/cumbia-peruana"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:underline"
            >
              GitHub Repo
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
