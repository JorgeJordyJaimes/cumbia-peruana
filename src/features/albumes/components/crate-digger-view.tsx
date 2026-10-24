"use client";

import { useState, useEffect, useRef, useCallback, memo } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { BadgeFormat } from "@/components/ui/badge-format";
import type { AlbumItem } from "@/features/albumes/components/album-card";
import type { TrackItem } from "@/features/temas/components/tracklist-table";
import {
  Disc,
  Disc3,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  RotateCw,
  ExternalLink,
  Layers,
  Music2,
  Clock,
  Sparkles,
  Sliders,
} from "lucide-react";

interface CrateDiggerViewProps {
  albums: AlbumItem[];
  tracksMap?: Record<number, TrackItem[]>;
  onSelectAlbum?: (album: AlbumItem) => void;
  className?: string;
}

function formatDuration(seconds?: number | null): string {
  if (!seconds || seconds <= 0) return "--:--";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function CrateDiggerViewComponent({
  albums,
  tracksMap = {},
  onSelectAlbum,
  className,
}: CrateDiggerViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showBackSide, setShowBackSide] = useState(false);
  const scrubberRef = useRef<HTMLDivElement>(null);

  // Asegurar índice válido si la lista filtrada cambia
  useEffect(() => {
    if (currentIndex >= albums.length) {
      setCurrentIndex(Math.max(0, albums.length - 1));
    }
  }, [albums.length, currentIndex]);

  // Resetear a Cara A al cambiar de disco
  useEffect(() => {
    setShowBackSide(false);
  }, [currentIndex]);

  const activeAlbum = albums[currentIndex] as AlbumItem | undefined;
  const activeTracks = activeAlbum ? tracksMap[activeAlbum.id] || [] : [];

  // Navegación
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < albums.length - 1 ? prev + 1 : prev));
  }, [albums.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const goToRandom = useCallback(() => {
    if (albums.length <= 1) return;
    let nextIdx = Math.floor(Math.random() * albums.length);
    if (nextIdx === currentIndex) {
      nextIdx = (nextIdx + 1) % albums.length;
    }
    setCurrentIndex(nextIdx);
  }, [albums.length, currentIndex]);

  // Atajos de teclado (ArrowLeft, ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Evitar captura si el usuario está escribiendo en un input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goToNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrev]);

  // Auto-scroll del scrubber hacia el disco activo
  useEffect(() => {
    if (!scrubberRef.current) return;
    const activeThumb = scrubberRef.current.children[currentIndex] as HTMLElement | undefined;
    if (activeThumb) {
      activeThumb.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [currentIndex]);

  if (!activeAlbum || albums.length === 0) {
    return null;
  }

  // Agrupar pistas por Lado A y Lado B
  const sideATracks = activeTracks.filter((t) => (t.side || "").trim().toUpperCase() === "A");
  const sideBTracks = activeTracks.filter((t) => (t.side || "").trim().toUpperCase() === "B");
  const otherTracks = activeTracks.filter((t) => {
    const s = (t.side || "").trim().toUpperCase();
    return s !== "A" && s !== "B";
  });

  const hasBackCover = Boolean(activeAlbum.backCoverUrl);
  const currentCoverUrl = showBackSide && hasBackCover ? activeAlbum.backCoverUrl : activeAlbum.coverUrl;

  return (
    <div className={cn("space-y-6 font-mono", className)}>
      {/* Marco de Control del Crate Digger */}
      <div className="border-2 border-[#1F1305] bg-[#EDE0D0] p-3 sm:p-4 shadow-[4px_4px_0px_#1F1305] flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="inline-block h-3 w-3 bg-[#E80000] border border-[#1F1305] shadow-[1px_1px_0px_#1F1305]" />
          <span className="font-bold text-[#1F1305] tracking-wider uppercase">
            MODO CRATE DIGGER // GAVETA DE VINILOS
          </span>
          <span className="border border-[#1F1305] bg-white px-2 py-0.5 text-[11px] font-black text-[#E80000] shadow-[1px_1px_0px_#1F1305]">
            PIEZA {currentIndex + 1} DE {albums.length}
          </span>
        </div>

        {/* Botones de acción rápida de la gaveta */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goToRandom}
            title="Tirar un disco al azar en la gaveta"
            className="inline-flex items-center gap-1.5 border-2 border-[#1F1305] bg-white px-3 py-1 font-bold text-[#1F1305] shadow-[2px_2px_0px_#1F1305] hover:bg-[#F4EFEA] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_#1F1305] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
          >
            <Shuffle className="h-3.5 w-3.5 text-[#F1730C]" />
            <span className="hidden sm:inline">Tirada Aleatoria</span>
          </button>

          {hasBackCover && (
            <button
              type="button"
              onClick={() => setShowBackSide((prev) => !prev)}
              className="inline-flex items-center gap-1.5 border-2 border-[#1F1305] bg-white px-3 py-1 font-bold text-[#1F1305] shadow-[2px_2px_0px_#1F1305] hover:bg-[#F4EFEA] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_#1F1305] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
            >
              <RotateCw className="h-3.5 w-3.5 text-[#E80000]" />
              <span>{showBackSide ? "Ver Frente (A)" : "Ver Reverso (B)"}</span>
            </button>
          )}

          <div className="hidden md:flex items-center gap-1 text-[11px] text-[#5A5245] ml-2">
            <span>Usa las teclas</span>
            <kbd className="border border-[#1F1305] bg-white px-1.5 py-0.5 font-bold shadow-[1px_1px_0px_#1F1305]">←</kbd>
            <kbd className="border border-[#1F1305] bg-white px-1.5 py-0.5 font-bold shadow-[1px_1px_0px_#1F1305]">→</kbd>
          </div>
        </div>
      </div>

      {/* Escenario Principal: Gaveta 3D (Izquierda) + Ficha de Expediente (Derecha) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ============================================================== */}
        {/* COLUMNA 1: DECK CENTRAL DE CRATE DIGGING (7 de 12 columnas) */}
        {/* ============================================================== */}
        <div className="lg:col-span-7 flex flex-col items-center">
          {/* Gaveta en Perspectiva 3D */}
          <div className="relative w-full max-w-[480px] aspect-square flex items-center justify-center select-none py-4">
            {/* Disco -2 (Extremo Izquierdo) */}
            {currentIndex >= 2 && (
              <div
                onClick={() => setCurrentIndex(currentIndex - 2)}
                className="absolute left-2 w-48 aspect-square rounded-sm border-2 border-[#1F1305] bg-[#140D04] opacity-25 scale-75 -rotate-12 translate-y-6 shadow-xl cursor-pointer hover:opacity-50 transition-all duration-300 z-0 hidden sm:block overflow-hidden"
              >
                {albums[currentIndex - 2]?.coverUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={albums[currentIndex - 2].coverUrl!}
                    alt="Disco previo"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            )}

            {/* Disco -1 (Izquierda Inclinado) */}
            {currentIndex >= 1 && (
              <div
                onClick={() => setCurrentIndex(currentIndex - 1)}
                className="absolute left-6 sm:left-10 w-64 sm:w-72 aspect-square rounded-sm border-2 border-[#1F1305] bg-[#140D04] opacity-60 scale-85 -rotate-6 translate-y-3 shadow-2xl cursor-pointer hover:opacity-90 hover:-translate-x-2 transition-all duration-300 z-10 overflow-hidden"
              >
                {albums[currentIndex - 1]?.coverUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={albums[currentIndex - 1].coverUrl!}
                    alt="Disco anterior"
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute top-0 inset-x-0 h-4 bg-[#EDE0D0] border-b border-[#1F1305] flex items-center px-1.5 text-[9px] font-black">
                  EXP. {String(albums[currentIndex - 1].id).padStart(4, "0")}
                </div>
              </div>
            )}

            {/* Disco +2 (Extremo Derecho) */}
            {currentIndex <= albums.length - 3 && (
              <div
                onClick={() => setCurrentIndex(currentIndex + 2)}
                className="absolute right-2 w-48 aspect-square rounded-sm border-2 border-[#1F1305] bg-[#140D04] opacity-25 scale-75 rotate-12 translate-y-6 shadow-xl cursor-pointer hover:opacity-50 transition-all duration-300 z-0 hidden sm:block overflow-hidden"
              >
                {albums[currentIndex + 2]?.coverUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={albums[currentIndex + 2].coverUrl!}
                    alt="Disco siguiente"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            )}

            {/* Disco +1 (Derecha Inclinado) */}
            {currentIndex <= albums.length - 2 && (
              <div
                onClick={() => setCurrentIndex(currentIndex + 1)}
                className="absolute right-6 sm:right-10 w-64 sm:w-72 aspect-square rounded-sm border-2 border-[#1F1305] bg-[#140D04] opacity-60 scale-85 rotate-6 translate-y-3 shadow-2xl cursor-pointer hover:opacity-90 hover:translate-x-2 transition-all duration-300 z-10 overflow-hidden"
              >
                {albums[currentIndex + 1]?.coverUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={albums[currentIndex + 1].coverUrl!}
                    alt="Disco siguiente"
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute top-0 inset-x-0 h-4 bg-[#EDE0D0] border-b border-[#1F1305] flex items-center px-1.5 text-[9px] font-black">
                  EXP. {String(albums[currentIndex + 1].id).padStart(4, "0")}
                </div>
              </div>
            )}

            {/* DISCO CENTRAL EN FOCO (Activo 100%) */}
            <div className="relative z-20 w-72 sm:w-88 aspect-square">
              {/* Vinilo Circular Asomando por detrás */}
              <div
                aria-hidden="true"
                className="absolute inset-y-3 right-0 aspect-square rounded-full bg-[#111114] shadow-2xl transition-transform duration-500 ease-out translate-x-12 sm:translate-x-16 z-0 overflow-hidden flex items-center justify-center border-2 border-white/20 animate-spin-slow"
                style={{ animationDuration: "20s" }}
              >
                <div className="absolute inset-3 rounded-full border border-white/5 vinyl-grooves opacity-60" />
                <div className="absolute inset-8 rounded-full border border-white/10" />
                <div className="absolute inset-14 rounded-full border border-white/5" />
                {/* Galleta central */}
                <div className="relative h-16 w-16 rounded-full bg-gradient-to-tr from-amber-600 via-orange-500 to-amber-700 flex flex-col items-center justify-center shadow-inner border-2 border-white/40 text-center">
                  <span className="text-[7px] font-black text-[#1F1305] leading-none uppercase">
                    {activeAlbum.format || "45 RPM"}
                  </span>
                  <div className="h-2.5 w-2.5 rounded-full bg-black my-1" />
                  <span className="text-[6px] font-bold text-white leading-none">
                    {activeAlbum.catalogNumber || "PERÚ"}
                  </span>
                </div>
              </div>

              {/* Funda Física Exterior */}
              <div
                onClick={() => onSelectAlbum?.(activeAlbum)}
                className="relative z-10 h-full w-full overflow-hidden border-2 border-[#1F1305] bg-[#140D04] shadow-[8px_8px_0px_#1F1305] hover:shadow-[10px_10px_0px_#E80000] hover:-translate-y-1 transition-all duration-200 cursor-pointer group"
              >
                {/* Sello de expediente superior */}
                <div className="absolute top-0 inset-x-0 h-6 bg-[#EDE0D0] border-b-2 border-[#1F1305] flex items-center justify-between px-2.5 text-xs text-[#1F1305] font-black z-20">
                  <span className="flex items-center gap-1.5">
                    <Disc className="h-3.5 w-3.5 text-[#E80000]" />
                    EVIDENCIA NO. {String(activeAlbum.id).padStart(4, "0")}
                  </span>
                  <span className="text-[#E80000]">{activeAlbum.year || "S/D"}</span>
                </div>

                {/* Fotografía 100% limpia sin superposiciones */}
                {currentCoverUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={currentCoverUrl}
                    alt={activeAlbum.title}
                    className="absolute inset-0 h-full w-full object-cover pt-6 transition-transform duration-300 group-hover:scale-102"
                  />
                ) : (
                  <div className="absolute inset-0 pt-6 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-stone-900 to-black text-[#EDE0D0]">
                    <Disc3 className="h-24 w-24 text-white/10 mb-2" />
                    <span className="text-xs font-bold text-center">CARÁTULA EN INVESTIGACIÓN</span>
                  </div>
                )}

                {/* Indicador de Cara A / Cara B si aplica */}
                {hasBackCover && (
                  <div className="absolute bottom-2 right-2 z-20 border border-[#1F1305] bg-[#EDE0D0] px-2 py-0.5 text-[10px] font-black text-[#1F1305] shadow-[1px_1px_0px_#1F1305]">
                    {showBackSide ? "CARA B (REVERSO)" : "CARA A (FRONTAL)"}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Botonera de Control de Navegación del Crate */}
          <div className="w-full max-w-[480px] flex items-center justify-between gap-3 mt-4">
            <button
              type="button"
              onClick={goToPrev}
              disabled={currentIndex === 0}
              className={cn(
                "flex-1 inline-flex items-center justify-center gap-2 border-2 border-[#1F1305] py-2.5 px-4 font-bold text-xs shadow-[3px_3px_0px_#1F1305] transition-all",
                currentIndex === 0
                  ? "bg-[#D8CABE] text-[#8C7E72] cursor-not-allowed opacity-60 shadow-none"
                  : "bg-white text-[#1F1305] hover:bg-[#EDE0D0] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#E80000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
              )}
            >
              <ChevronLeft className="h-4 w-4 text-[#E80000]" />
              <span>DISCO ANTERIOR</span>
            </button>

            <button
              type="button"
              onClick={goToNext}
              disabled={currentIndex === albums.length - 1}
              className={cn(
                "flex-1 inline-flex items-center justify-center gap-2 border-2 border-[#1F1305] py-2.5 px-4 font-bold text-xs shadow-[3px_3px_0px_#1F1305] transition-all",
                currentIndex === albums.length - 1
                  ? "bg-[#D8CABE] text-[#8C7E72] cursor-not-allowed opacity-60 shadow-none"
                  : "bg-white text-[#1F1305] hover:bg-[#EDE0D0] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#E80000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
              )}
            >
              <span>DISCO SIGUIENTE</span>
              <ChevronRight className="h-4 w-4 text-[#E80000]" />
            </button>
          </div>

          {/* Scrubber / Tira de Miniaturas Deslizables (Thumbnails) */}
          <div className="w-full max-w-[540px] mt-6">
            <div className="text-[11px] font-black text-[#5A5245] uppercase tracking-wider mb-1.5 flex items-center justify-between">
              <span>EXPLORADOR DE GAVETA // SALTO RÁPIDO</span>
              <span>{currentIndex + 1} / {albums.length}</span>
            </div>

            <div
              ref={scrubberRef}
              className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 px-1 scrollbar-thin scrollbar-thumb-[#1F1305] scrollbar-track-[#EDE0D0]"
            >
              {albums.map((album, idx) => {
                const isSelected = idx === currentIndex;
                return (
                  <button
                    key={album.id}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={cn(
                      "shrink-0 w-14 aspect-square rounded-sm border-2 transition-all relative overflow-hidden cursor-pointer",
                      isSelected
                        ? "border-[#E80000] scale-105 shadow-[3px_3px_0px_#1F1305] z-10 ring-2 ring-[#E80000]/40"
                        : "border-[#1F1305] bg-white opacity-60 hover:opacity-100 hover:scale-100 shadow-[1px_1px_0px_#1F1305]"
                    )}
                    title={`${album.title} - ${album.artist} (${album.year || ""})`}
                  >
                    {album.coverUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={album.coverUrl}
                        alt={album.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#1F1305] text-[#EDE0D0] flex items-center justify-center text-[8px] font-bold">
                        #{album.id}
                      </div>
                    )}
                    {isSelected && (
                      <div className="absolute bottom-0 inset-x-0 bg-[#E80000] text-white text-[7px] font-black text-center leading-tight">
                        ACTIVO
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* COLUMNA 2: DOSSIER TÉCNICO // FICHA DE EXPEDIENTE (5 de 12 col) */}
        {/* ============================================================== */}
        <div className="lg:col-span-5">
          <div className="border-2 border-[#1F1305] bg-white p-5 sm:p-6 shadow-[6px_6px_0px_#1F1305] space-y-5 relative">
            {/* Sello de Agua / Badge de Expediente */}
            <div className="flex items-start justify-between gap-2 border-b-2 border-[#1F1305] pb-3.5">
              <div>
                <div className="text-[10px] text-[#5A5245] font-black uppercase tracking-widest">
                  DOCUMENTO FONOGRÁFICO OFICIAL
                </div>
                <div className="text-base sm:text-lg font-black text-[#1F1305] tracking-tight">
                  EVIDENCIA NO. {String(activeAlbum.id).padStart(4, "0")}
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <BadgeFormat formatName={activeAlbum.format || "LP"} size="sm" />
                {activeAlbum.year && (
                  <span className="border-2 border-[#1F1305] bg-[#E80000] text-white px-2 py-0.5 text-xs font-black shadow-[1px_1px_0px_#1F1305]">
                    {activeAlbum.year}
                  </span>
                )}
              </div>
            </div>

            {/* Título y Artista */}
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-black text-[#1F1305] leading-snug tracking-tight">
                {activeAlbum.title}
              </h2>
              <p className="text-sm text-[#E80000] font-bold">
                {activeAlbum.artist}
                {activeAlbum.directorName && (
                  <span className="text-xs text-[#5A5245] block font-medium">
                    Dirección Musical: {activeAlbum.directorName}
                  </span>
                )}
              </p>
            </div>

            {/* Sellos, Catálogo y Metadatos de Edición */}
            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              <div className="border border-[#1F1305] bg-[#F4EFEA] p-2 space-y-0.5">
                <span className="text-[10px] font-black text-[#5A5245] uppercase block">
                  SELLO DISCOGRÁFICO
                </span>
                <span className="font-bold text-[#1F1305] block truncate">
                  {activeAlbum.label || "Particular / Independiente"}
                </span>
              </div>

              <div className="border border-[#1F1305] bg-[#F4EFEA] p-2 space-y-0.5">
                <span className="text-[10px] font-black text-[#5A5245] uppercase block">
                  NO. CATÁLOGO / MATRIZ
                </span>
                <span className="font-bold text-[#1F1305] block truncate">
                  {activeAlbum.catalogNumber || "Sin código impreso"}
                </span>
              </div>
            </div>

            {/* Desglose de Pistas / Contenido de las Caras */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs font-black text-[#1F1305] border-b border-[#1F1305] pb-1">
                <span className="flex items-center gap-1.5">
                  <Music2 className="h-3.5 w-3.5 text-[#E80000]" />
                  CONTENIDO MUSICAL ({activeTracks.length} PISTAS)
                </span>
                <span className="text-[11px] text-[#5A5245]">LADO A & B</span>
              </div>

              {activeTracks.length === 0 ? (
                <p className="text-xs text-[#5A5245] italic py-3 text-center border border-dashed border-[#1F1305] bg-[#F4EFEA]">
                  Pistas en proceso de catalogación acústica oficial.
                </p>
              ) : (
                <div className="space-y-3 max-h-64 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-[#1F1305]">
                  {/* LADO A */}
                  {sideATracks.length > 0 && (
                    <div className="space-y-1.5">
                      <div className="text-[10px] font-black text-[#E80000] uppercase tracking-wider flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E80000]" />
                        CARA A (LADO A)
                      </div>
                      {sideATracks.map((track, i) => (
                        <div
                          key={track.id}
                          className="border border-[#1F1305] bg-[#F4EFEA] p-2 flex items-start justify-between gap-2 text-xs"
                        >
                          <div className="space-y-0.5">
                            <div className="font-bold text-[#1F1305] leading-tight">
                              {i + 1}. {track.title}
                            </div>
                            <div className="text-[11px] text-[#5A5245]">
                              {track.composer ? `Autor: ${track.composer}` : "D.R."}
                              {track.vocalist ? ` • Voz: ${track.vocalist}` : ""}
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="font-mono text-[11px] font-bold text-[#1F1305]">
                              {formatDuration(track.durationSeconds)}
                            </span>
                            {track.genre && (
                              <span className="block text-[9px] text-[#E80000] uppercase font-bold">
                                {track.genre.split("/")[0]}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* LADO B */}
                  {sideBTracks.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      <div className="text-[10px] font-black text-[#E80000] uppercase tracking-wider flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E80000]" />
                        CARA B (LADO B)
                      </div>
                      {sideBTracks.map((track, i) => (
                        <div
                          key={track.id}
                          className="border border-[#1F1305] bg-[#F4EFEA] p-2 flex items-start justify-between gap-2 text-xs"
                        >
                          <div className="space-y-0.5">
                            <div className="font-bold text-[#1F1305] leading-tight">
                              {i + 1}. {track.title}
                            </div>
                            <div className="text-[11px] text-[#5A5245]">
                              {track.composer ? `Autor: ${track.composer}` : "D.R."}
                              {track.vocalist ? ` • Voz: ${track.vocalist}` : ""}
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="font-mono text-[11px] font-bold text-[#1F1305]">
                              {formatDuration(track.durationSeconds)}
                            </span>
                            {track.genre && (
                              <span className="block text-[9px] text-[#E80000] uppercase font-bold">
                                {track.genre.split("/")[0]}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Pistas sin lado especificado */}
                  {otherTracks.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      {otherTracks.map((track, i) => (
                        <div
                          key={track.id}
                          className="border border-[#1F1305] bg-[#F4EFEA] p-2 flex items-start justify-between gap-2 text-xs"
                        >
                          <div className="font-bold text-[#1F1305]">
                            {i + 1}. {track.title}
                          </div>
                          <span className="font-mono text-[11px] font-bold text-[#1F1305]">
                            {formatDuration(track.durationSeconds)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Botones de Acción del Expediente */}
            <div className="pt-3 border-t-2 border-[#1F1305] flex flex-col sm:flex-row items-center gap-2.5">
              <button
                type="button"
                onClick={() => onSelectAlbum?.(activeAlbum)}
                className="w-full inline-flex items-center justify-center gap-2 border-2 border-[#1F1305] bg-[#E80000] px-4 py-3 font-bold text-xs text-white shadow-[3px_3px_0px_#1F1305] hover:bg-[#1F1305] hover:text-[#EDE0D0] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#1F1305] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
              >
                <Layers className="h-4 w-4" />
                <span>INSPECCIONAR EXPEDIENTE COMPLETO</span>
              </button>

              <Link
                href={`/album/${activeAlbum.id}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 border-2 border-[#1F1305] bg-white px-4 py-3 font-bold text-xs text-[#1F1305] shadow-[3px_3px_0px_#1F1305] hover:bg-[#EDE0D0] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#E80000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
              >
                <span>FICHA URL</span>
                <ExternalLink className="h-3.5 w-3.5 text-[#E80000]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const CrateDiggerView = memo(CrateDiggerViewComponent);
