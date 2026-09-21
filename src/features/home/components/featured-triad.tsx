"use client";

import { Disc3, Sparkles } from "lucide-react";
import { BadgeDJ } from "@/components/ui/badge-dj";
import type { AlbumItem } from "@/features/albumes";
import { cn } from "@/lib/utils";

interface FeaturedTriadProps {
  onSelectAlbum?: (album: AlbumItem) => void;
}

export function FeaturedTriad({ onSelectAlbum }: FeaturedTriadProps) {
  const items = [
    {
      id: 1,
      tag: "INICIO PSICODÉLICO",
      title: "Los Destellos",
      subtitle: "El Avispón · Guajira Sicodélica",
      artist: "Los Destellos",
      year: 1968,
      label: "Odeón",
      catalog: "ELD-1735",
      format: "LP 33 RPM",
      bpm: 112,
      camelot: "8A",
      musicalKey: "Am",
      gradient: "from-amber-600/30 via-neutral-900 to-black",
      accentBorder: "border-white/10 hover:border-amber-400/40",
      accentText: "text-amber-400",
      isElevated: false,
    },
    {
      id: 133,
      tag: "OBRA CUMBRE DE LA SELVA",
      title: "El Sonido Selvático",
      subtitle: "La Danza de los Mirlos · Sonido Amazónico",
      artist: "Los Mirlos",
      year: 1973,
      label: "Infopesa",
      catalog: "LPS-8043",
      format: "LP 33 RPM",
      bpm: 124,
      camelot: "8A",
      musicalKey: "Am",
      gradient: "from-fuchsia-600/40 via-purple-950/80 to-black",
      accentBorder: "border-fuchsia-500/60 ring-2 ring-fuchsia-500/20 shadow-2xl shadow-fuchsia-600/25",
      accentText: "text-fuchsia-400",
      isElevated: true,
    },
    {
      id: 114,
      tag: "HIMNO AMAZÓNICO",
      title: "El Gran Cacique",
      subtitle: "Mujer Hilandera · Ya Se Ha Muerto Mi Abuelo",
      artist: "Juaneco y su Combo",
      year: 1973,
      label: "Infopesa",
      catalog: "LPS-8063",
      format: "LP 33 RPM",
      bpm: 128,
      camelot: "8A",
      musicalKey: "Am",
      gradient: "from-rose-600/30 via-neutral-900 to-black",
      accentBorder: "border-white/10 hover:border-rose-400/40",
      accentText: "text-rose-400",
      isElevated: false,
    },
  ];

  return (
    <section id="joyas" className="py-16 sm:py-24 space-y-12">
      {/* Cabecera Centrada (Estilo "This Week's Fire Track") */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-fuchsia-400">
          <Sparkles className="h-3.5 w-3.5 text-fuchsia-400" />
          <span>Selección Histórica del Archivo</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
          Joyas Fundacionales{" "}
          <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-fuchsia-400 via-rose-400 to-amber-400 bg-clip-text text-transparent">
            : Prensajes Imprescindibles
          </span>
        </h2>

        <p className="text-sm sm:text-base text-neutral-400 font-normal leading-relaxed">
          Las tres producciones en vinilo que redefinieron el sonido de las guitarras eléctricas, los ecos de selva y el ritmo bailable del Perú en los años 70.
        </p>
      </div>

      {/* Tríada de Tarjetas Verticales con Tarjeta Central Elevada */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-center max-w-5xl mx-auto px-2">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() =>
              onSelectAlbum?.({
                id: item.id,
                title: item.title,
                artist: item.artist,
                year: item.year,
                label: item.label,
                catalogNumber: item.catalog,
                format: item.format,
              })
            }
            className={cn(
              "group relative flex flex-col rounded-3xl border bg-neutral-950/80 p-5 sm:p-6 backdrop-blur-2xl transition-all duration-500 cursor-pointer overflow-hidden",
              item.accentBorder,
              item.isElevated
                ? "md:-translate-y-4 md:scale-105 z-20 bg-gradient-to-b from-fuchsia-950/40 via-neutral-950 to-black"
                : "hover:-translate-y-2 z-10 hover:bg-neutral-900/90"
            )}
          >
            {/* Resplandor interno de color */}
            <div
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute inset-0 bg-gradient-to-b opacity-40 group-hover:opacity-70 transition-opacity duration-500",
                item.gradient
              )}
            />

            {/* Poster Art / Sleeve Placeholder */}
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border border-white/10 bg-black/60 shadow-xl flex flex-col justify-between p-4 z-10 group-hover:border-white/25 transition-all">
              {/* Surcos de fondo vinilo */}
              <div className="absolute inset-0 vinyl-grooves opacity-30 pointer-events-none" />

              {/* Tag superior del póster */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-widest text-white/90 bg-black/60 px-2 py-0.5 rounded-full border border-white/10 backdrop-blur">
                  {item.tag}
                </span>
                <span className="font-mono text-xs font-bold text-white bg-black/60 px-2 py-0.5 rounded-full border border-white/10">
                  {item.year}
                </span>
              </div>

              {/* Badge Circular de Disco de Vinilo (Reemplazo estético del play button de la referencia) */}
              <div className="relative z-10 my-auto flex items-center justify-center">
                <div
                  className={cn(
                    "flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full border shadow-2xl backdrop-blur-md transition-all duration-500 group-hover:scale-110",
                    item.isElevated
                      ? "border-fuchsia-400/80 bg-fuchsia-500/20 shadow-fuchsia-500/40 text-fuchsia-300"
                      : "border-white/30 bg-black/60 text-white group-hover:border-amber-400 group-hover:text-amber-300"
                  )}
                >
                  <Disc3 className="h-7 w-7 group-hover:rotate-180 transition-transform duration-700" />
                </div>
              </div>

              {/* Pie del póster: Sello y Catálogo */}
              <div className="relative z-10 font-mono text-[10px] text-neutral-400 flex items-center justify-between">
                <span>{item.label}</span>
                <span>{item.catalog}</span>
              </div>
            </div>

            {/* Metadata Editorial de la Tarjeta */}
            <div className="relative z-10 mt-5 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-extrabold text-lg sm:text-xl text-white tracking-tight line-clamp-1 group-hover:text-fuchsia-300 transition-colors">
                  {item.title}
                </h3>
              </div>

              <p className="text-xs text-neutral-300 font-medium line-clamp-1">
                {item.artist}
              </p>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                <BadgeDJ
                  bpm={item.bpm}
                  camelot={item.camelot}
                  musicalKey={item.musicalKey}
                />
                <span className="font-mono text-[10px] text-neutral-500 group-hover:text-neutral-300 transition-colors">
                  Ver Ficha →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
