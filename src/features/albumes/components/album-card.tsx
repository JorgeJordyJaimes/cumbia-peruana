"use client";

import { useState, memo } from "react";
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

function AlbumCardComponent({ album, className, onSelect }: AlbumCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      onClick={() => onSelect?.(album)}
      className={cn(
        "group relative flex flex-col cursor-pointer transition-all duration-200 select-none",
        className
      )}
    >
      {/* Contenedor del Disco y Funda Editorial Suiza (90° Rígido) */}
      <div className="relative aspect-square w-full">
        {/* Disco de Vinilo que asoma en hover */}
        <div
          aria-hidden="true"
          className="absolute inset-y-2 right-2 aspect-square bg-[#111114] border-2 border-[#1F1305] shadow-[4px_4px_0px_#1F1305] transition-transform duration-500 ease-out group-hover:translate-x-7 sm:group-hover:translate-x-9 z-0 overflow-hidden flex items-center justify-center"
        >
          {/* Surcos circulares concéntricos */}
          <div className="absolute inset-2 border border-white/10" />
          <div className="absolute inset-6 border border-white/5" />
          <div className="absolute inset-10 border border-white/10" />
          <div className="absolute inset-14 border border-white/5" />

          {/* Galleta Central con tipografía suiza */}
          <div className="relative h-14 w-14 bg-[#F1730C] border-2 border-[#1F1305] flex flex-col items-center justify-center text-center p-0.5">
            <span className="text-[7px] font-mono font-black text-[#1F1305] leading-none">
              {album.catalogNumber ? album.catalogNumber.slice(0, 8) : "KS-LP"}
            </span>
            <div className="h-1.5 w-1.5 bg-[#1F1305] my-0.5" />
            <span className="text-[6px] font-mono font-bold text-white uppercase leading-none">
              33 ⅓ RPM
            </span>
          </div>
        </div>

        {/* Funda Externa / Pliego Editorial */}
        <div className="relative z-10 h-full w-full overflow-hidden border-2 border-[#1F1305] bg-[#1F1305] shadow-[4px_4px_0px_#1F1305] transition-all duration-200 group-hover:shadow-[6px_6px_0px_#E80000] group-hover:-translate-y-1 flex flex-col justify-between p-3.5">
          
          {/* Imagen de Portada de Supabase */}
          {album.coverUrl && !imageError ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={album.coverUrl}
              alt={album.title}
              onError={() => setImageError(true)}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col justify-between p-4 bg-[#EDE0D0]">
              <div className="font-mono text-[9px] text-[#746B5C] font-bold uppercase">
                CATÁLOGO RAZONADO
              </div>
              <Disc3 className="h-16 w-16 text-[#1F1305]/15 self-center" />
              <div className="font-mono text-[8px] text-[#1F1305] font-bold">
                {album.label || "PRENSAJE PARTICULAR"}
              </div>
            </div>
          )}

          {/* Degradado para Garantizar Alto Contraste de Texto */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/20" />

          {/* Cabecera de la Funda: Formato y Año */}
          <div className="relative z-10 flex items-start justify-between gap-1.5 font-mono">
            <BadgeFormat formatName={album.format || "LP 33 RPM"} size="sm" />
            {album.year && (
              <span className="border border-[#1F1305] bg-[#1F1305] px-2 py-0.5 text-[11px] font-black text-white shadow-[2px_2px_0px_#E80000]">
                {album.year}
              </span>
            )}
          </div>

          {/* Pie de la Funda: Tipografía Suiza de Alta Jerarquía */}
          <div className="relative z-10 space-y-1 font-mono">
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
