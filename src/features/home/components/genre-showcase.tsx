"use client";

import { Disc3, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

interface GenreCardItem {
  id: number;
  name: string;
  region: string;
  description: string;
  exponents: string;
  gradient: string;
  accentColor: string;
  count: number;
}

interface GenreShowcaseProps {
  onSelectGenre?: (genreName: string) => void;
}

export function GenreShowcase({ onSelectGenre }: GenreShowcaseProps) {
  const genres: GenreCardItem[] = [
    {
      id: 1,
      name: "Cumbia Costeña",
      region: "Lima & Costa Central",
      description: "Guitarras punteadas con técnica criolla, cencerro y elegancia rítmica.",
      exponents: "Los Destellos, Los Ecos, Manzanita",
      gradient: "from-amber-600/50 via-orange-950/60 to-black",
      accentColor: "text-amber-400",
      count: 240,
    },
    {
      id: 2,
      name: "Cumbia Amazónica",
      region: "Iquitos, Pucallpa & Moyobamba",
      description: "Ecos selváticos psicodélicos, trinos de guitarra y el místico órgano Farfisa.",
      exponents: "Los Mirlos, Juaneco y su Combo, Los Wembler's",
      gradient: "from-emerald-600/50 via-teal-950/60 to-black",
      accentColor: "text-emerald-400",
      count: 185,
    },
    {
      id: 3,
      name: "Cumbia Andina / Chicha",
      region: "Carretera Central & Lima Este",
      description: "Sentimiento provinciano, arpegios pentatónicos del huayno y pedal wah-wah.",
      exponents: "Chacalón, Los Shapis, Grupo Celeste",
      gradient: "from-rose-600/50 via-fuchsia-950/60 to-black",
      accentColor: "text-rose-400",
      count: 160,
    },
    {
      id: 4,
      name: "Cumbia Norteña",
      region: "Piura, Lambayeque & La Libertad",
      description: "Metales festivos, vientos brillantes, timbales y baile popular masivo.",
      exponents: "Armonía 10, Agua Marina, Grupo 5",
      gradient: "from-cyan-600/50 via-blue-950/60 to-black",
      accentColor: "text-cyan-400",
      count: 85,
    },
    {
      id: 5,
      name: "Cumbia Sureña",
      region: "Puno, Juliaca & Arequipa",
      description: "Sintetizadores espaciales envolventes y percusión electrónica de los 90.",
      exponents: "Los Ronisch, Coralí, Alaska",
      gradient: "from-purple-600/50 via-indigo-950/60 to-black",
      accentColor: "text-purple-400",
      count: 32,
    },
    {
      id: 6,
      name: "Cumbia Sanjuanera",
      region: "Sierra Norte & Selva Alta",
      description: "Fusión rítmica con arpa andina y cadencia festiva rápida de fiesta patronal.",
      exponents: "Corazón Serrano, Sensual Karicia",
      gradient: "from-orange-600/50 via-red-950/60 to-black",
      accentColor: "text-orange-400",
      count: 17,
    },
  ];

  return (
    <section id="generos" className="py-16 sm:py-24 space-y-10">
      {/* Cabecera Estilo "Your Infinite Music Library" */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-fuchsia-400">
            <Layers className="h-3.5 w-3.5 text-fuchsia-400" />
            <span>Biblioteca de Géneros & Vertientes</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Nuestra Biblioteca{" "}
            <span className="bg-gradient-to-r from-fuchsia-400 to-rose-400 bg-clip-text text-transparent">
              Musical Infinita
            </span>
          </h2>
        </div>

        <p className="max-w-md font-mono text-xs text-neutral-400 leading-relaxed">
          Explora los 6 géneros catalogados que emergieron del encuentro de la guitarra eléctrica, las migraciones provincianas y los ritmos de la Amazonía.
        </p>
      </div>

      {/* Fila de Tarjetas de Género con Efecto Atmosférico */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {genres.map((genre) => (
          <div
            key={genre.id}
            onClick={() => onSelectGenre?.(genre.name)}
            className={cn(
              "group relative flex flex-col justify-between aspect-[3/4] rounded-2xl border border-white/10 p-4 transition-all duration-300 cursor-pointer overflow-hidden hover:-translate-y-1.5 hover:border-white/30 hover:shadow-2xl shadow-black/80",
              "bg-gradient-to-b from-white/[0.06] to-black"
            )}
          >
            {/* Fondo degradado cromático por género */}
            <div
              aria-hidden="true"
              className={cn(
                "absolute inset-0 bg-gradient-to-b opacity-40 group-hover:opacity-80 transition-opacity duration-500",
                genre.gradient
              )}
            />

            {/* Cabecera de la tarjeta */}
            <div className="relative z-10">
              <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400 line-clamp-1">
                {genre.region}
              </span>
            </div>

            {/* Centro: Badge de disco de vinilo estilizado */}
            <div className="relative z-10 my-auto flex items-center justify-center">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/60 backdrop-blur-md text-white group-hover:scale-110 group-hover:border-white/50 transition-all duration-300 shadow-lg">
                <Disc3 className="h-5 w-5 group-hover:rotate-90 transition-transform duration-500 text-white" />
              </div>
            </div>

            {/* Pie de la tarjeta */}
            <div className="relative z-10 space-y-1 text-center">
              <h4 className="font-bold text-white text-xs sm:text-sm tracking-tight line-clamp-1 group-hover:text-amber-300 transition-colors">
                {genre.name}
              </h4>
              <p className="font-mono text-[10px] text-neutral-400">
                ♫ {genre.count}+ títulos
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
