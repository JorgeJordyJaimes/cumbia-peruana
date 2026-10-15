"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Disc, ChevronLeft, ChevronRight, ExternalLink, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AlbumCoverSliderProps {
  coverUrl?: string | null;
  backCoverUrl?: string | null;
  title: string;
  artist?: string | null;
  format?: string | null;
  label?: string | null;
  className?: string;
  aspectRatio?: "square" | "cover";
  showSideLabels?: boolean;
  onSideChange?: (side: "front" | "back") => void;
}

export function AlbumCoverSlider({
  coverUrl,
  backCoverUrl,
  title,
  artist,
  format,
  label,
  className,
  aspectRatio = "square",
  showSideLabels = true,
  onSideChange,
}: AlbumCoverSliderProps) {
  const isSingle = Boolean(
    format &&
      (format.toLowerCase().includes("single") ||
        format.toLowerCase().includes("45") ||
        format === "45 RPM Single")
  );

  const frontLabel = isSingle ? "Cara A" : "Portada";
  const backLabel = isSingle ? "Cara B" : "Contraportada";

  const hasFront = Boolean(coverUrl);
  const hasBack = Boolean(backCoverUrl);
  const hasBoth = hasFront && hasBack;

  // Si solo hay contraportada disponible, iniciar en back, sino en front
  const [activeSide, setActiveSide] = useState<"front" | "back">(hasFront ? "front" : hasBack ? "back" : "front");

  const touchStartX = useRef<number | null>(null);

  const switchSide = useCallback(
    (side: "front" | "back") => {
      setActiveSide(side);
      if (onSideChange) onSideChange(side);
    },
    [onSideChange]
  );

  const toggleSide = useCallback(() => {
    switchSide(activeSide === "front" ? "back" : "front");
  }, [activeSide, switchSide]);

  // Sincronizar si cambian las URLs externas
  useEffect(() => {
    if (!hasFront && hasBack) {
      setActiveSide("back");
    } else if (hasFront) {
      setActiveSide("front");
    }
  }, [hasFront, hasBack]);

  // Manejo de gestos táctiles (Swipe)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || !hasBoth) return;
    const diffX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diffX) > 40) {
      if (diffX > 0) {
        // Deslizar derecha
        switchSide("front");
      } else {
        // Deslizar izquierda
        switchSide("back");
      }
    }
    touchStartX.current = null;
  };

  const currentImageUrl = activeSide === "front" ? coverUrl : backCoverUrl;
  const currentSideLabel = activeSide === "front" ? frontLabel : backLabel;

  // Estado vacío: Sin ninguna imagen registrada
  if (!hasFront && !hasBack) {
    return (
      <div
        className={cn(
          "relative w-full aspect-square border-2 border-[#1F1305] bg-[#EDE0D0] flex flex-col items-center justify-center p-6 text-center shadow-[4px_4px_0px_#1F1305] select-none",
          className
        )}
      >
        <Disc className="h-14 w-14 text-[#E80000] mb-2 animate-pulse" />
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1F1305]">
          {label || "KUMBIA SOUND"}
        </span>
        <span className="font-mono text-[10px] text-[#746B5C] mt-1">
          {format || "Vinilo 1968–2005"}
        </span>
      </div>
    );
  }

  return (
    <div className={cn("relative flex flex-col gap-2 select-none", className)}>
      {/* Selector de Pestañas Brutalista (Solo si existen ambas fotos o si se solicita mostrar labels) */}
      {showSideLabels && hasBoth && (
        <div className="flex items-center justify-between gap-1 border-2 border-[#1F1305] bg-white p-1 font-mono text-[11px] font-bold shadow-[2px_2px_0px_#1F1305]">
          <button
            type="button"
            onClick={() => switchSide("front")}
            className={cn(
              "flex-1 py-1 px-2.5 text-center transition-all cursor-pointer flex items-center justify-center gap-1.5",
              activeSide === "front"
                ? "bg-[#1F1305] text-[#EDE0D0] shadow-[1px_1px_0px_#E80000]"
                : "text-[#5A5245] hover:text-[#1F1305] hover:bg-[#EDE0D0]/50"
            )}
          >
            <span className={cn("w-1.5 h-1.5 rounded-full", activeSide === "front" ? "bg-[#E80000]" : "bg-neutral-400")} />
            <span>{frontLabel.toUpperCase()}</span>
          </button>

          <button
            type="button"
            onClick={() => switchSide("back")}
            className={cn(
              "flex-1 py-1 px-2.5 text-center transition-all cursor-pointer flex items-center justify-center gap-1.5",
              activeSide === "back"
                ? "bg-[#1F1305] text-[#EDE0D0] shadow-[1px_1px_0px_#E80000]"
                : "text-[#5A5245] hover:text-[#1F1305] hover:bg-[#EDE0D0]/50"
            )}
          >
            <span className={cn("w-1.5 h-1.5 rounded-full", activeSide === "back" ? "bg-[#F1730C]" : "bg-neutral-400")} />
            <span>{backLabel.toUpperCase()}</span>
          </button>
        </div>
      )}

      {/* Contenedor Visual de la Imagen */}
      <div
        className={cn(
          "group relative w-full aspect-square border-2 border-[#1F1305] bg-black overflow-hidden shadow-[4px_4px_0px_#1F1305] flex items-center justify-center",
          aspectRatio === "cover" && "aspect-4/3"
        )}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {currentImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={currentImageUrl}
            src={currentImageUrl}
            alt={`${title} - ${currentSideLabel}`}
            className="h-full w-full object-cover transition-opacity duration-300 animate-fadeIn"
          />
        ) : (
          <div className="flex flex-col items-center justify-center p-6 text-center text-[#EDE0D0]/60">
            <ImageIcon className="h-10 w-10 mb-2 opacity-50" />
            <span className="font-mono text-xs">Sin {currentSideLabel.toLowerCase()} registrada</span>
          </div>
        )}

        {/* Badge Flotante del Lado Actual */}
        <div className="absolute top-2 left-2 z-10 border border-[#1F1305] bg-[#1F1305]/85 backdrop-blur-xs px-2 py-0.5 font-mono text-[9px] font-black uppercase tracking-wider text-white shadow-[1px_1px_0px_#EDE0D0]">
          <span>{currentSideLabel}</span>
          {hasBoth && <span className="ml-1 text-[#F8C800]">({activeSide === "front" ? "1/2" : "2/2"})</span>}
        </div>

        {/* Botón para Abrir Imagen en Alta Resolución */}
        {currentImageUrl && (
          <a
            href={currentImageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-2 right-2 z-10 border border-[#1F1305] bg-white/90 hover:bg-[#E80000] hover:text-white p-1 text-[#1F1305] shadow-[1px_1px_0px_#1F1305] transition-colors"
            title={`Abrir ${currentSideLabel} original`}
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}

        {/* Flechas Laterales de Deslizamiento (Solo si existen ambas fotos) */}
        {hasBoth && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleSide();
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 border-2 border-[#1F1305] bg-white/90 hover:bg-[#E80000] hover:text-white p-1.5 text-[#1F1305] shadow-[2px_2px_0px_#1F1305] transition-all opacity-85 hover:opacity-100 hover:scale-105 active:scale-95 cursor-pointer"
              title={`Ver ${activeSide === "front" ? backLabel : frontLabel}`}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Anterior</span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleSide();
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 border-2 border-[#1F1305] bg-white/90 hover:bg-[#E80000] hover:text-white p-1.5 text-[#1F1305] shadow-[2px_2px_0px_#1F1305] transition-all opacity-85 hover:opacity-100 hover:scale-105 active:scale-95 cursor-pointer"
              title={`Ver ${activeSide === "front" ? backLabel : frontLabel}`}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Siguiente</span>
            </button>

            {/* Puntos Indicadores Inferiores */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 border border-[#1F1305] bg-[#1F1305]/80 px-2 py-1 backdrop-blur-xs">
              <button
                type="button"
                onClick={() => switchSide("front")}
                className={cn(
                  "h-2 w-2 rounded-full transition-all cursor-pointer",
                  activeSide === "front" ? "bg-[#E80000] w-4" : "bg-white/50 hover:bg-white"
                )}
                title={frontLabel}
              />
              <button
                type="button"
                onClick={() => switchSide("back")}
                className={cn(
                  "h-2 w-2 rounded-full transition-all cursor-pointer",
                  activeSide === "back" ? "bg-[#F1730C] w-4" : "bg-white/50 hover:bg-white"
                )}
                title={backLabel}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
