"use client";

import { useEffect } from "react";
import { X, Disc, Calendar, Building2, Layers } from "lucide-react";
import { BadgeFormat } from "@/components/ui/badge-format";
import { TracklistTable, type TrackItem } from "@/features/temas/components/tracklist-table";
import type { AlbumItem } from "@/features/albumes/components/album-card";

interface AlbumDetailModalProps {
  album: AlbumItem | null;
  tracks?: TrackItem[];
  onClose: () => void;
}

export function AlbumDetailModal({ album, tracks = [], onClose }: AlbumDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!album) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10"
    >
      {/* Backdrop con Blur Profundo */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container Brutalista */}
      <div className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto border-2 border-[#1F1305] bg-[#EDE0D0] text-[#1F1305] p-6 sm:p-8 shadow-[8px_8px_0px_#1F1305]">
        {/* Botón Cerrar */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 border-2 border-[#1F1305] bg-white p-2 text-[#1F1305] shadow-[2px_2px_0px_#1F1305] hover:bg-[#E80000] hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Cerrar ficha</span>
        </button>

        {/* Cabecera Editorial */}
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="relative aspect-square w-32 sm:w-44 border-2 border-[#1F1305] bg-white shrink-0 shadow-[4px_4px_0px_#1F1305] flex items-center justify-center overflow-hidden">
            {album.coverUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={album.coverUrl}
                alt={album.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex flex-col items-center justify-center bg-[#EDE0D0] p-3 text-center">
                <Disc className="h-12 w-12 text-[#E80000] mb-2" />
                <span className="font-mono text-[10px] text-[#1F1305] font-bold uppercase tracking-widest">
                  {album.label || "KUMBIA SOUND"}
                </span>
              </div>
            )}
          </div>

          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <BadgeFormat formatName={album.format || "LP 33 RPM"} />
              {album.catalogNumber && (
                <span className="font-mono text-xs font-bold text-[#1F1305] border border-[#1F1305] px-2 py-0.5 bg-white shadow-[1px_1px_0px_#1F1305]">
                  {album.catalogNumber}
                </span>
              )}
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-cooper font-black tracking-tight text-[#1F1305]">
                {album.title}
              </h2>
              <p className="text-base text-[#5A5245] font-bold">
                {album.artist}
              </p>
            </div>

            {/* Ficha Técnica Rápida */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t-2 border-[#1F1305]/20 font-mono text-xs font-bold text-[#5A5245]">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-[#F1730C]" />
                <span>Año: <strong className="text-[#1F1305]">{album.year || "N/D"}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5 text-[#E80000]" />
                <span className="truncate">Sello: <strong className="text-[#1F1305]">{album.label || "Desconocido"}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5 text-[#10B981]" />
                <span>Pistas: <strong className="text-[#1F1305]">{tracks.length || album.tracksCount || "--"}</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Sección Tracklist */}
        <div className="mt-8 space-y-3">
          <div className="flex items-center justify-between border-b-2 border-[#1F1305] pb-2">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#1F1305]">
              Contraportada del Vinilo // Tracklist & Armonía
            </h3>
            <span className="font-mono text-[11px] text-[#746B5C] font-bold">
              Archivo Discográfico Histórico
            </span>
          </div>

          <TracklistTable tracks={tracks} />
        </div>

        {/* Nota Histórica / Sin Audio */}
        <div className="mt-6 border-2 border-[#1F1305] bg-white p-3 text-center font-mono text-[11px] font-bold text-[#5A5245] shadow-[2px_2px_0px_#1F1305]">
          Esta plataforma preserva metadatos técnicos y musicológicos para investigadores y DJs.
          No contiene archivos ni reproducción de audio.
        </div>
      </div>
    </div>
  );
}
