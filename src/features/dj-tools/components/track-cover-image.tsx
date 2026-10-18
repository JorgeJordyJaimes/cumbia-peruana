"use client";

import { useState } from "react";
import { Disc3, CassetteTape, Disc, Music } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TrackCoverImageProps {
  src?: string | null;
  defaultSrc?: string | null;
  title: string;
  artist?: string | null;
  format?: string | null;
  side?: string | null;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
  shape?: "square" | "circle";
  showSideBadge?: boolean;
  className?: string;
}

const sizeClasses = {
  xs: "h-8 w-8 text-[9px]",
  sm: "h-10 w-10 text-[10px]",
  md: "h-12 w-12 text-xs",
  lg: "h-16 w-16 text-sm",
  xl: "h-24 w-24 text-base",
  full: "h-full w-full",
};

export function TrackCoverImage({
  src,
  defaultSrc,
  title,
  artist,
  format,
  side,
  size = "md",
  shape = "square",
  showSideBadge = false,
  className,
}: TrackCoverImageProps) {
  const [imageError, setImageError] = useState(false);
  const [defaultImageError, setDefaultImageError] = useState(false);

  // En discos circulares (tornamesas) o cuando se solicite expresamente, usar el logo circular oficial como imagen por defecto
  const fallbackLogo = defaultSrc !== undefined ? defaultSrc : shape === "circle" ? "/branding/logo-circular.png" : null;

  const cleanFormat = (format || "LP").toUpperCase();
  const cleanSide = side ? side.trim().toUpperCase() : null;
  const isSingle = cleanFormat.includes("45") || cleanFormat.includes("SINGLE");
  const isEp = cleanFormat.includes("EP");
  const isCasete = cleanFormat.includes("CASETE") || cleanFormat.includes("CASSETTE");
  const isCd = cleanFormat.includes("CD");

  const sideLabel = cleanSide ? `Lado ${cleanSide}` : isSingle ? "Lado A" : null;
  const badgeText = isSingle || isEp ? (sideLabel ? `${cleanFormat} • ${sideLabel}` : cleanFormat) : cleanFormat;

  const activeSrc = src && !imageError ? src : fallbackLogo && !defaultImageError ? fallbackLogo : null;

  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden select-none",
        sizeClasses[size],
        shape === "circle"
          ? "rounded-full border-2 border-[#1F1305]"
          : "border-2 border-[#1F1305] shadow-[2px_2px_0px_#1F1305]",
        className
      )}
      title={`${title}${artist ? ` - ${artist}` : ""}${sideLabel ? ` (${sideLabel})` : ""}`}
    >
      {activeSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={activeSrc}
          alt={`${title} - ${badgeText}`}
          onError={() => {
            if (src && !imageError) {
              setImageError(true);
            } else {
              setDefaultImageError(true);
            }
          }}
          className={cn(
            "h-full w-full object-cover transition-opacity duration-200",
            shape === "circle" && "rounded-full"
          )}
          loading="lazy"
        />
      ) : (
        /* Fallback Gráfico Brutalista */
        <div
          className={cn(
            "flex h-full w-full flex-col items-center justify-center p-1 text-center font-mono",
            shape === "circle"
              ? "bg-[#150F08] text-[#F8C800]"
              : isCasete
              ? "bg-[#451A03] text-[#EDE0D0]"
              : isCd
              ? "bg-[#1E293B] text-[#38BDF8]"
              : "bg-[#1F1305] text-[#EDE0D0]"
          )}
        >
          {isCasete ? (
            <CassetteTape className="h-1/2 w-1/2 text-[#F1730C]" />
          ) : isCd ? (
            <Disc className="h-1/2 w-1/2 text-[#38BDF8]" />
          ) : (
            <Disc3 className="h-1/2 w-1/2 text-[#F8C800] animate-pulse [animation-duration:4s]" />
          )}

          {size !== "xs" && size !== "sm" && (
            <span className="mt-1 line-clamp-1 max-w-[90%] text-[8px] font-black uppercase tracking-wider text-neutral-300">
              {cleanSide ? `Lado ${cleanSide}` : cleanFormat}
            </span>
          )}
        </div>
      )}

      {/* Insignia de Formato y Lado Físico */}
      {showSideBadge && badgeText && shape !== "circle" && (
        <span
          className={cn(
            "absolute bottom-0 inset-x-0 bg-[#1F1305]/90 text-center font-mono text-[8px] font-black uppercase tracking-wider text-white backdrop-blur-[1px] py-0.5 px-1 truncate",
            cleanSide === "A" && "text-[#F8C800]",
            cleanSide === "B" && "text-[#F1730C]"
          )}
        >
          {badgeText}
        </span>
      )}
    </div>
  );
}
