import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { BrutalistCoordinator, BrutalistFooter } from "@/features/home-brutalism";
import { MatchBpmWidget, type TemaDJ } from "@/features/home-retro";
import { CamelotSelector, CreaTuMix, type TrackDJItem } from "@/features/dj-tools";
import Link from "next/link";
import { ArrowLeft, Sparkles, SlidersHorizontal, Disc3, Layers } from "lucide-react";
import type { CamelotCode } from "@/types/domain";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Consola Match BPM & Crea Tu Mix a Dos Tornamesas | Kumbia Sound",
  description:
    "Herramienta técnica para DJs de vinilo y tornamesistas. Sincronización armónica, tempo match y secuenciador a dos tornamesas para cumbia peruana patrimonial.",
};

interface RawTemaRow {
  id_tema: number;
  titulo_tema: string;
  duracion_segundos: number | null;
  bpm: number | null;
  camelot_code: string | null;
  generos: { nombre_genero: string } | null;
  temas_generos: Array<{
    id_genero: number;
    es_principal: boolean | null;
    generos: {
      id_genero: number;
      nombre_genero: string;
    } | null;
  }> | null;
  albumes_temas: Array<{
    id_album: number;
    numero_pista: number | null;
    lado: string | null;
    albumes: {
      id_album: number;
      nombre_album: string | null;
      año_publicacion: number | null;
      url_portada: string | null;
      url_contraportada: string | null;
      id_tipo_album: number;
      tipos_album: { nombre_tipo: string } | null;
      sellos_discograficos: { nombre_sello: string } | null;
    } | null;
  }> | null;
  temas_grupos: Array<{
    grupos: { nombre_grupo: string } | null;
  }> | null;
}

export default async function MatchBpmPage() {
  const supabase = await createClient();

  const { data: rawTemas } = await supabase
    .from("temas")
    .select(`
      id_tema,
      titulo_tema,
      duracion_segundos,
      bpm,
      camelot_code,
      generos:generos!temas_id_genero_fkey (nombre_genero),
      temas_generos (
        id_genero,
        es_principal,
        generos (
          id_genero,
          nombre_genero
        )
      ),
      albumes_temas (
        id_album,
        numero_pista,
        lado,
        albumes:albumes!albumes_temas_id_album_fkey (
          id_album,
          nombre_album,
          año_publicacion,
          url_portada,
          url_contraportada,
          id_tipo_album,
          tipos_album:tipos_album!albumes_id_tipo_album_fkey (
            nombre_tipo
          ),
          sellos_discograficos (nombre_sello)
        )
      ),
      temas_grupos (
        grupos (nombre_grupo)
      )
    `)
    .not("bpm", "is", null)
    .order("id_tema", { ascending: true });

  const rawTemasList = (rawTemas as unknown as RawTemaRow[]) || [];

  // Mapeo unificado con regla fonográfica estricta de imágenes según soporte y cara
  const djTracks: TrackDJItem[] = [];
  const temasDJ: TemaDJ[] = [];

  for (const t of rawTemasList) {
    const primaryAlbumTema = t.albumes_temas?.[0];
    const primaryAlbum = primaryAlbumTema?.albumes;
    const primaryGroup = t.temas_grupos?.[0]?.grupos;
    const artist = primaryGroup?.nombre_grupo || "Agrupación Histórica";
    const bpm = t.bpm || 115;
    const camelot = (t.camelot_code as CamelotCode) || "8A";

    // Extracción jerárquica de géneros (Principal y Secundario / Fusión)
    const tgList = t.temas_generos || [];
    const principalTg = tgList.find((g) => g.es_principal === true);
    const secondaryTg = tgList.find(
      (g) => g.es_principal === false || (principalTg && g.id_genero !== principalTg.id_genero)
    );

    const primaryGenre =
      principalTg?.generos?.nombre_genero ||
      tgList[0]?.generos?.nombre_genero ||
      t.generos?.nombre_genero ||
      "Cumbia Peruana";

    const secondaryGenre =
      secondaryTg?.generos?.nombre_genero ||
      (tgList.length > 1 && tgList[1]?.generos?.nombre_genero !== primaryGenre
        ? tgList[1]?.generos?.nombre_genero
        : null);

    const genresList: string[] = [];
    if (primaryGenre) genresList.push(primaryGenre);
    if (secondaryGenre && !genresList.includes(secondaryGenre)) genresList.push(secondaryGenre);

    const formatName =
      primaryAlbum?.tipos_album?.nombre_tipo ||
      (primaryAlbum?.id_tipo_album === 1
        ? "45"
        : primaryAlbum?.id_tipo_album === 2
        ? "LP"
        : primaryAlbum?.id_tipo_album === 3
        ? "EP"
        : primaryAlbum?.id_tipo_album === 4
        ? "Casete"
        : primaryAlbum?.id_tipo_album === 5
        ? "CD"
        : "LP");

    const lado = primaryAlbumTema?.lado ? primaryAlbumTema.lado.trim().toUpperCase() : null;

    // REGLA ESTRICTA DE IMÁGENES SEGÚN SOPORTE FÍSICO:
    // 1. LP: Portada del álbum (url_portada)
    // 2. Single (45 RPM) o EP: Foto de la cara en la que está (Lado A = url_portada, Lado B = url_contraportada)
    // 3. Casete o CD: Portada (url_portada)
    const isSingleOrEp =
      formatName === "45" ||
      formatName.toLowerCase().includes("single") ||
      formatName === "EP" ||
      primaryAlbum?.id_tipo_album === 1 ||
      primaryAlbum?.id_tipo_album === 3;

    let effectiveCoverUrl: string | null = null;
    if (isSingleOrEp) {
      if (lado === "B" && primaryAlbum?.url_contraportada) {
        effectiveCoverUrl = primaryAlbum.url_contraportada;
      } else if (primaryAlbum?.url_portada) {
        effectiveCoverUrl = primaryAlbum.url_portada;
      } else if (primaryAlbum?.url_contraportada) {
        effectiveCoverUrl = primaryAlbum.url_contraportada;
      }
    } else {
      effectiveCoverUrl = primaryAlbum?.url_portada || primaryAlbum?.url_contraportada || null;
    }

    const durationSec = t.duracion_segundos;
    const durationStr = durationSec
      ? `${Math.floor(durationSec / 60)}:${(durationSec % 60).toString().padStart(2, "0")}`
      : "S/D";

    djTracks.push({
      id: t.id_tema,
      title: t.titulo_tema,
      artist,
      album: primaryAlbum?.nombre_album || undefined,
      year: primaryAlbum?.año_publicacion || undefined,
      bpm,
      camelot,
      format: formatName,
      side: lado,
      coverUrl: effectiveCoverUrl,
      label: primaryAlbum?.sellos_discograficos?.nombre_sello || undefined,
      durationSeconds: durationSec,
      durationFormatted: durationStr,
      primaryGenre,
      secondaryGenre,
      genres: genresList,
    });

    temasDJ.push({
      id: `tema-${t.id_tema}`,
      titulo: t.titulo_tema,
      artista: artist,
      ano: primaryAlbum?.año_publicacion || 1974,
      sello: primaryAlbum?.sellos_discograficos?.nombre_sello || "Sello Particular",
      subgenero: primaryGenre,
      primaryGenre,
      secondaryGenre,
      genres: genresList,
      bpm,
      camelot: t.camelot_code || "8A",
      tonalidad: camelot,
      duracion: durationStr,
      portadaUrl: effectiveCoverUrl || "",
      format: formatName,
      side: lado,
    });
  }

  return (
    <div className="relative min-h-screen bg-[#EDE0D0] brutalist-dots-light text-[#1F1305] selection:bg-[#F1730C] selection:text-[#1F1305]">
      <BrutalistCoordinator>
        <main id="contenido" className="container mx-auto max-w-7xl px-4 sm:px-6 pt-6 pb-20 space-y-12">
          {/* Breadcrumb / Retorno al Home */}
          <div className="flex items-center justify-between border-b-2 border-[#1F1305] pb-4 font-mono text-xs">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-bold text-[#1F1305] hover:text-[#E80000] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>← Volver a la Portada Principal</span>
            </Link>

            <div className="flex items-center gap-2 border border-[#1F1305] bg-white px-2.5 py-1 text-[#E80000] font-bold shadow-[2px_2px_0px_#1F1305]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>02 / CONSOLA TÉCNICA DJ</span>
            </div>
          </div>

          {/* Banner Hero Brutalista */}
          <div className="border-2 border-[#1F1305] bg-[#1F1305] brutalist-dots-dark text-[#EDE0D0] p-8 sm:p-12 shadow-[6px_6px_0px_#E80000] relative overflow-hidden">
            <div className="max-w-3xl space-y-5 relative z-10">
              <div className="inline-flex items-center gap-2 border-2 border-[#EDE0D0] bg-[#E80000] px-3.5 py-1 font-mono text-xs font-bold text-white shadow-[2px_2px_0px_#EDE0D0]">
                <SlidersHorizontal className="h-3.5 w-3.5" />
                <span>CABINA TÉCNICA PARA TORNAMESISTAS & SESIONES EN VIVO</span>
              </div>

              <h1 className="font-cooper text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                Consola Match BPM &amp; Crea Tu Mix
              </h1>

              <p className="font-sans text-sm sm:text-base text-[#EDE0D0]/80 leading-relaxed max-w-2xl">
                Diseñada específicamente para resolver los saltos de afinación y tempo característicos
                de los vinilos peruanos de los años 70 y 80. Conecta dos tornamesas virtuales, crea secuencias
                de mezcla pista a pista y calcula al instante qué temas empatan sin desafinar.
              </p>

              {/* Botones de navegación interna */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <a
                  href="#crea-tu-mix"
                  className="border-2 border-white bg-[#F8C800] hover:bg-white text-[#1F1305] font-mono text-xs font-black px-3.5 py-1.5 shadow-[2px_2px_0px_#EDE0D0] transition-colors"
                >
                  🎛️ 01 / Crea Tu Mix (2 Tornamesas)
                </a>
                <a
                  href="#match-bpm"
                  className="border-2 border-white bg-transparent hover:bg-white/10 text-white font-mono text-xs font-bold px-3.5 py-1.5 shadow-[2px_2px_0px_#EDE0D0] transition-colors"
                >
                  ⚡ 02 / Emparejador Rápido Match BPM
                </a>
                <a
                  href="#rueda-camelot"
                  className="border-2 border-white bg-transparent hover:bg-white/10 text-white font-mono text-xs font-bold px-3.5 py-1.5 shadow-[2px_2px_0px_#EDE0D0] transition-colors"
                >
                  ⭕ 03 / Explorador Rueda Camelot
                </a>
              </div>
            </div>

            {/* Sello decorativo de fondo */}
            <div className="absolute -bottom-8 -right-6 text-white/[0.04] font-anton text-[220px] font-black pointer-events-none select-none leading-none">
              MIX
            </div>
          </div>

          {/* ============================================================ */}
          {/* SECCIÓN 1: CREA TU MIX A DOS TORNAMESAS (NUEVA HERRAMIENTA) */}
          {/* ============================================================ */}
          <section id="crea-tu-mix" className="scroll-mt-20">
            <CreaTuMix tracks={djTracks} />
          </section>

          {/* ============================================================ */}
          {/* SECCIÓN 2: EMPAREJADOR RÁPIDO MATCH BPM */}
          {/* ============================================================ */}
          <section id="match-bpm" className="scroll-mt-20">
            <MatchBpmWidget tracks={temasDJ} />
          </section>

          {/* ============================================================ */}
          {/* SECCIÓN 3: EXPLORADOR EXTENDIDO DE LA RUEDA CAMELOT */}
          {/* ============================================================ */}
          <section id="rueda-camelot" className="space-y-6 pt-6 border-t-2 border-[#1F1305] scroll-mt-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-[#1F1305] pb-5">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[#F1730C]">
                  <Disc3 className="h-4 w-4" />
                  Base de Datos Completa
                </div>
                <h2 className="font-cooper text-2xl sm:text-4xl font-bold tracking-tight text-[#1F1305] mt-1">
                  Explorador de Claves Camelot
                </h2>
              </div>
              <p className="max-w-md font-mono text-xs text-[#5A5245]">
                Haz clic en cualquier celda de la Rueda Camelot para filtrar todas las pistas grabadas
                en esa tonalidad armónica.
              </p>
            </div>

            <CamelotSelector tracks={djTracks} />
          </section>
        </main>
      </BrutalistCoordinator>

      <BrutalistFooter />
    </div>
  );
}
