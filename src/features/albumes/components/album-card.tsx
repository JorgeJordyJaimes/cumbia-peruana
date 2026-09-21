"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { BadgeFormat } from "@/components/ui/badge-format";
import { Disc3 } from "lucide-react";

export interface AlbumItem {
  id: number;
  title: string;
  artist: string;
  year?: number | null;
  catalogNumber?: string | null;
  label?: string | null;
  format?: string | null;
  coverUrl?: string | null;
  tracksCount?: number;
  isCompilation?: boolean;
}

interface AlbumCardProps {
  album: AlbumItem;
  className?: string;
  onSelect?: (album: AlbumItem) => void;
}

export function AlbumCard({ album, className, onSelect }: AlbumCardProps) {
  const [imageError, setImageError] = useState(false);

  // Generar gradiente editorial temático basado en el ID
  const gradients = [
    "from-amber-900/60 via-stone-900 to-black",
    "from-red-950/60 via-zinc-900 to-black",
    "from-emerald-950/60 via-stone-900 to-black",
    "from-orange-950/60 via-neutral-900 to-black",
    "from-teal-950/60 via-zinc-900 to-black",
  ];
  const gradient = gradients[album.id % gradients.length];

  return (
    <div
      onClick={() => onSelect?.(album)}
      className={cn(
        "group relative flex flex-col cursor-pointer transition-all duration-300",
        className
      )}
    >
      {/* Contenedor del Vinilo y Funda (Vinyl Sleeve Effect) */}
      <div className="relative aspect-square w-full select-none">
        {/* Disco de Vinilo que asoma en hover */}
        <div
          aria-hidden="true"
          className="absolute inset-y-2 right-2 aspect-square rounded-full bg-[#111114] shadow-2xl transition-transform duration-500 ease-out group-hover:translate-x-7 sm:group-hover:translate-x-9 z-0 overflow-hidden flex items-center justify-center border border-white/10"
        >
          {/* Surcos concéntricos del vinilo */}
          <div className="absolute inset-2 rounded-full border border-white/5 vinyl-grooves opacity-60" />
          <div className="absolute inset-6 rounded-full border border-white/10" />
          <div className="absolute inset-10 rounded-full border border-white/5" />
          {/* Etiqueta central del vinilo */}
          <div className="relative h-12 w-12 rounded-full bg-gradient-to-tr from-amber-600 to-orange-500 flex items-center justify-center shadow-inner border border-white/30">
            <div className="h-2.5 w-2.5 rounded-full bg-black" />
          </div>
        </div>

        {/* Funda Externa del Disco (Sleeve) */}
        <div
          className={cn(
            "relative z-10 h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/90 shadow-xl backdrop-blur-md transition-all duration-300 group-hover:border-white/25 group-hover:shadow-2xl group-hover:shadow-black/80 flex flex-col justify-between p-4",
            gradient
          )}
        >
          {album.coverUrl && !imageError ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={album.coverUrl}
              alt={album.title}
              onError={() => setImageError(true)}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            // Funda Editorial Texturizada Retro
            <div className="absolute inset-0 flex flex-col justify-between p-5 bg-gradient-to-b from-white/[0.04] to-transparent">
              {/* Marca de agua vinilo */}
              <Disc3 className="absolute -right-6 -bottom-6 h-36 w-36 text-white/[0.03] rotate-12" />
            </div>
          )}

          {/* Overlay Oscuro para Legibilidad */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20" />

          {/* Cabecera de la Funda: Formato y Año */}
          <div className="relative z-10 flex items-start justify-between gap-2">
            <BadgeFormat formatName={album.format || "LP 33 RPM"} size="sm" />
            {album.year && (
              <span className="font-mono text-xs font-bold text-white/90 bg-black/50 px-2 py-0.5 rounded-md border border-white/10 backdrop-blur">
                {album.year}
              </span>
            )}
          </div>

          {/* Pie de la Funda: Tipografía Editorial y Metadata */}
          <div className="relative z-10 space-y-1">
            <div className="flex items-center gap-1.5 font-mono text-[10px] tracking-wider text-amber-400 uppercase">
              <span>{album.label || "ARCHIVO NACIONAL"}</span>
              {album.catalogNumber && (
                <>
                  <span className="text-neutral-600">•</span>
                  <span>{album.catalogNumber}</span>
                </>
              )}
            </div>

            <h4 className="font-bold text-white tracking-tight text-base leading-snug line-clamp-1 group-hover:text-amber-300 transition-colors">
              {album.title}
            </h4>

            <p className="text-xs text-neutral-300 font-medium line-clamp-1">
              {album.artist}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
