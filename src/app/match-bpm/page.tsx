import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { BrutalistCoordinator, BrutalistFooter } from "@/features/home-brutalism";
import { MatchBpmWidget } from "@/features/home-retro";
import { CamelotSelector, type TrackDJItem } from "@/features/dj-tools";
import Link from "next/link";
import { ArrowLeft, Sparkles, SlidersHorizontal, Disc3 } from "lucide-react";
import type { CamelotCode } from "@/types/domain";

export const metadata: Metadata = {
  title: "Consola Match BPM & Rueda Camelot | Kumbia Sound",
  description:
    "Herramienta técnica para DJs de vinilo y tornamesistas. Sincronización armónica y tempo match para cumbia costeña, amazónica, andina y chicha.",
};

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
      musical_key,
      albumes_temas (
        id_album,
        numero_pista,
        lado,
        albumes (nombre_album, año_publicacion)
      ),
      temas_grupos (
        grupos (nombre_grupo)
      )
    `)
    .not("bpm", "is", null);

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

  return (
    <div className="relative min-h-screen bg-[#EDE0D0] text-[#1F1305] selection:bg-[#F1730C] selection:text-white">
      <BrutalistCoordinator>
        <main className="container mx-auto max-w-7xl px-4 sm:px-6 pt-6 pb-20 space-y-12">
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
          <div className="border-2 border-[#1F1305] bg-[#1F1305] text-[#EDE0D0] p-8 sm:p-12 shadow-[6px_6px_0px_#E80000] relative overflow-hidden">
            <div className="max-w-3xl space-y-5 relative z-10">
              <div className="inline-flex items-center gap-2 border-2 border-[#EDE0D0] bg-[#E80000] px-3.5 py-1 font-mono text-xs font-bold text-white shadow-[2px_2px_0px_#EDE0D0]">
                <SlidersHorizontal className="h-3.5 w-3.5" />
                <span>HERRAMIENTA PARA TORNAMESISTAS & SESIONES EN VIVO</span>
              </div>

              <h1 className="font-cooper text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                Consola Match BPM & Armonía Camelot
              </h1>

              <p className="font-sans text-sm sm:text-base text-[#EDE0D0]/80 leading-relaxed max-w-2xl">
                Diseñada específicamente para resolver los saltos de afinación y tempo característicos
                de los vinilos peruanos de los años 70 y 80. Calcula al instante qué temas empatan sin
                desafinar en tono ni forzar el pitch de tu tornamesa más de un ±3%.
              </p>
            </div>

            {/* Sello decorativo de fondo */}
            <div className="absolute -bottom-8 -right-6 text-white/[0.04] font-anton text-[220px] font-black pointer-events-none select-none leading-none">
              BPM
            </div>
          </div>

          {/* WIDGET INTERACTIVO DE PITCH Y EMPAREJAMIENTO */}
          <MatchBpmWidget />

          {/* SELECTOR EXTENDIDO DE LA RUEDA CAMELOT CON BASE DE DATOS COMPLETA */}
          <section className="space-y-6 pt-6 border-t-2 border-[#1F1305]">
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
