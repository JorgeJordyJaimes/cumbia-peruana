"use client";

import { useState, memo } from "react";
import { cn } from "@/lib/utils";
import { BadgeFormat } from "@/components/ui/badge-format";
import { Disc3 } from "lucide-react";

export interface AlbumItem {
  id: number;
  title: string;
  artist: string;
  directorName?: string | null;
  year?: number | null;
  catalogNumber?: string | null;
  label?: string | null;
  format?: string | null;
  coverUrl?: string | null;
  backCoverUrl?: string | null;
  tracksCount?: number;
  isCompilation?: boolean;
}

interface AlbumCardProps {
  album: AlbumItem;
  className?: string;
  onSelect?: (album: AlbumItem) => void;
}

// Hoist de gradientes fuera del componente para evitar asignaciones por render (server-hoist-static-io)
const GRADIENTS = [
  "from-amber-900/60 via-stone-900 to-black",
  "from-red-950/60 via-zinc-900 to-black",
  "from-emerald-950/60 via-stone-900 to-black",
  "from-orange-950/60 via-neutral-900 to-black",
  "from-teal-950/60 via-zinc-900 to-black",
] as const;

function AlbumCardComponent({ album, className, onSelect }: AlbumCardProps) {
  const [imageError, setImageError] = useState(false);
  const gradient = GRADIENTS[album.id % GRADIENTS.length];

  return (
    <div
      onClick={() => onSelect?.(album)}
      className={cn(
        "group relative flex flex-col cursor-pointer transition-all duration-200 select-none font-mono",
        className
      )}
    >
      {/* Contenedor del Vinilo y Funda de Evidencia */}
      <div className="relative aspect-square w-full">
        {/* Disco de Vinilo Circular que asoma en hover */}
        <div
          aria-hidden="true"
          className="absolute inset-y-2 right-2 aspect-square rounded-full bg-[#111114] shadow-2xl transition-transform duration-500 ease-out group-hover:translate-x-7 sm:group-hover:translate-x-9 z-0 overflow-hidden flex items-center justify-center border border-white/10"
        >
          {/* Surcos concéntricos del vinilo */}
          <div className="absolute inset-2 rounded-full border border-white/5 vinyl-grooves opacity-60" />
          <div className="absolute inset-6 rounded-full border border-white/10" />
          <div className="absolute inset-10 rounded-full border border-white/5" />
          {/* Etiqueta central del vinilo con estética de expediente */}
          <div className="relative h-12 w-12 rounded-full bg-gradient-to-tr from-amber-600 to-orange-500 flex flex-col items-center justify-center shadow-inner border border-white/30 text-center">
            <span className="text-[6px] font-black text-[#1F1305] leading-none">
              {album.catalogNumber ? album.catalogNumber.slice(0, 6) : "33 RPM"}
            </span>
            <div className="h-2 w-2 rounded-full bg-black my-0.5" />
          </div>
        </div>

        {/* Funda Externa / Carpeta de Evidencia Translúcida Oscura con Borde 2px y Sombra Brutalista */}
        <div
          className={cn(
            "relative z-10 h-full w-full overflow-hidden border-2 border-[#1F1305] bg-neutral-900/90 shadow-[4px_4px_0px_#1F1305] transition-all duration-200 group-hover:shadow-[6px_6px_0px_#E80000] group-hover:-translate-y-1 flex flex-col justify-between p-3.5",
            gradient
          )}
        >
          {/* Sello de expediente superior */}
          <div className="absolute top-0 left-0 right-0 h-4 bg-[#EDE0D0] border-b border-[#1F1305] flex items-center justify-between px-2 text-[8px] text-[#1F1305] font-black z-20">
            <span>EVIDENCIA NO. {String(album.id).padStart(4, "0")}</span>
            <span className="text-[#E80000]">{album.year || "VERIFICADO"}</span>
          </div>

          {album.coverUrl && !imageError ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={album.coverUrl}
              alt={album.title}
              onError={() => setImageError(true)}
              className="absolute inset-0 h-full w-full object-cover pt-4 transition-transform duration-300 group-hover:scale-102"
            />
          ) : (
            // Funda Editorial Texturizada Retro
            <div className="absolute inset-0 pt-4 flex flex-col justify-between p-5 bg-gradient-to-b from-white/[0.04] to-transparent">
              <Disc3 className="absolute -right-6 -bottom-6 h-36 w-36 text-white/[0.03] rotate-12" />
            </div>
          )}

          {/* Overlay Oscuro Translúcido para Legibilidad */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20" />

          {/* Cabecera de la Funda: Formato y Año con Sello Rojo */}
          <div className="relative z-10 pt-3 flex items-start justify-between gap-1.5">
            <BadgeFormat formatName={album.format || "LP 33 RPM"} size="sm" />
            {album.year && (
              <span className="border border-[#1F1305] bg-[#1F1305] px-2 py-0.5 text-[11px] font-black text-white shadow-[2px_2px_0px_#E80000]">
                {album.year}
              </span>
            )}
          </div>

          {/* Pie de la Funda: Datos del Fonograma y Archivo */}
          <div className="relative z-10 space-y-1">
            <div className="flex items-center justify-between text-[9px] text-[#F8C800] uppercase font-bold tracking-wider">
              <span className="truncate max-w-[130px]">{album.label || "ARCHIVO GENERAL"}</span>
              {album.catalogNumber && (
                <span className="text-white bg-black/70 px-1.5 py-0.2 border border-white/20">
                  {album.catalogNumber}
                </span>
              )}
            </div>

            <h4 className="font-bold text-white tracking-tight text-sm sm:text-base leading-tight line-clamp-1 group-hover:text-[#F8C800] transition-colors">
              {album.title}
            </h4>

            <p className="text-xs text-[#EDE0D0] font-medium line-clamp-1">
              {album.artist}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export const AlbumCard = memo(AlbumCardComponent);
