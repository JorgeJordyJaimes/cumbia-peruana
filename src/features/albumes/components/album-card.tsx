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
      {/* Contenedor del Chasis de Rack y Funda */}
      <div className="relative aspect-square w-full">
        {/* Disco de Vinilo que asoma en hover (Bisel Recto y Matriz Central) */}
        <div
          aria-hidden="true"
          className="absolute inset-y-2 right-2 aspect-square bg-[#111114] border-2 border-[#1F1305] shadow-[4px_4px_0px_#1F1305] transition-transform duration-500 ease-out group-hover:translate-x-7 sm:group-hover:translate-x-9 z-0 overflow-hidden flex items-center justify-center"
        >
          {/* Surcos mecánicos concéntricos */}
          <div className="absolute inset-2 border border-white/10" />
          <div className="absolute inset-5 border border-white/5" />
          <div className="absolute inset-9 border border-white/10" />
          <div className="absolute inset-14 border border-white/5" />

          {/* Galleta Central del Vinilo con código de matriz */}
          <div className="relative h-14 w-14 bg-[#F1730C] border-2 border-[#1F1305] flex flex-col items-center justify-center text-center p-0.5">
            <span className="text-[7px] font-mono font-black text-[#1F1305] leading-none">
              {album.catalogNumber ? album.catalogNumber.slice(0, 7) : "KS-33"}
            </span>
            <div className="h-2 w-2 bg-[#1F1305] my-0.5" />
            <span className="text-[6px] font-mono font-bold text-white uppercase leading-none">
              33 RPM
            </span>
          </div>
        </div>

        {/* Funda Externa / Unidad de Rack (90° Rígido, 2px border) */}
        <div className="relative z-10 h-full w-full overflow-hidden border-2 border-[#1F1305] bg-[#1F1305] shadow-[4px_4px_0px_#1F1305] transition-all duration-200 group-hover:shadow-[6px_6px_0px_#E80000] group-hover:-translate-y-0.5 flex flex-col justify-between p-3">
          
          {/* Barra Superior del Chasis con Tornillos de Montaje (·) */}
          <div className="absolute top-0 left-0 right-0 h-4 bg-[#EDE0D0] border-b border-[#1F1305] flex items-center justify-between px-2 font-mono text-[8px] text-[#1F1305] font-bold z-20">
            <span>(·) MOD-{String(album.id).padStart(3, "0")}</span>
            <span className="text-[#E80000]">{album.year || "MASTER"}</span>
            <span>(·)</span>
          </div>

          {/* Imagen de Portada con Filtro de Alto Contraste */}
          {album.coverUrl && !imageError ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={album.coverUrl}
              alt={album.title}
              onError={() => setImageError(true)}
              className="absolute inset-0 h-full w-full object-cover pt-4 transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            // Funda Alternativa de Almacén Técnico
            <div className="absolute inset-0 pt-4 flex flex-col justify-between p-4 bg-[#EDE0D0]">
              <div className="font-mono text-[9px] text-[#746B5C] font-bold">
                MATRIZ ANALÓGICA
              </div>
              <Disc3 className="h-20 w-20 text-[#1F1305]/10 self-center" />
              <div className="font-mono text-[8px] text-[#1F1305]">
                {album.label || "ARCHIVO PARTICULAR"}
              </div>
            </div>
          )}

          {/* Degradado para Garantizar Legibilidad de Telemetría */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

          {/* Metadata Flotante Superior: Formato y Año */}
          <div className="relative z-10 pt-3 flex items-start justify-between gap-1.5 font-mono">
            <BadgeFormat formatName={album.format || "LP 33 RPM"} size="sm" />
            {album.year && (
              <span className="border border-[#1F1305] bg-[#1F1305] px-1.5 py-0.5 text-[10px] font-bold text-white shadow-[1px_1px_0px_#E80000]">
                {album.year}
              </span>
            )}
          </div>

          {/* Pie del Chasis: Placa de Datos y Medición */}
          <div className="relative z-10 space-y-1 font-mono">
            <div className="flex items-center justify-between text-[9px] text-[#F8C800] uppercase font-bold tracking-wider">
              <span className="truncate max-w-[120px]">{album.label || "IEMPSA / ODEON"}</span>
              {album.catalogNumber && (
                <span className="text-white bg-black/60 px-1 border border-white/20">
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

            {/* Micro VU-Meter Decorativo de Nivel de Grabación */}
            <div className="pt-1 flex items-center gap-1">
              <span className="text-[7px] text-[#746B5C] font-mono leading-none">VU</span>
              <div className="h-1 flex-1 bg-[#1F1305] border border-white/10 flex overflow-hidden">
                <div className="bg-[#F8C800] w-[65%]" />
                <div className="bg-[#F1730C] w-[20%]" />
                <div className="bg-[#E80000] w-[15%]" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export const AlbumCard = memo(AlbumCardComponent);
