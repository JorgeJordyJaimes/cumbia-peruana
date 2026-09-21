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
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-white/15 bg-neutral-950/95 p-6 shadow-2xl shadow-black sm:p-8 backdrop-blur-2xl">
        {/* Botón Cerrar */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full border border-white/10 bg-white/5 p-2 text-neutral-400 hover:bg-white/10 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Cerrar ficha</span>
        </button>

        {/* Cabecera Editorial */}
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="relative aspect-square w-32 sm:w-44 rounded-2xl overflow-hidden border border-white/10 bg-neutral-900 shrink-0 shadow-lg flex items-center justify-center">
            {album.coverUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={album.coverUrl}
                alt={album.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex flex-col items-center justify-center bg-gradient-to-br from-amber-950/50 to-neutral-900 p-3 text-center">
                <Disc className="h-12 w-12 text-amber-500/40 mb-2" />
                <span className="font-mono text-[10px] text-amber-400 font-bold uppercase tracking-widest">
                  {album.label || "KUMBIA SOUND"}
                </span>
              </div>
            )}
          </div>

          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <BadgeFormat formatName={album.format || "LP 33 RPM"} />
              {album.catalogNumber && (
                <span className="font-mono text-xs text-amber-400/90 border border-amber-500/30 rounded px-2 py-0.5 bg-amber-500/10">
                  {album.catalogNumber}
                </span>
              )}
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                {album.title}
              </h2>
              <p className="text-base text-neutral-300 font-medium">
                {album.artist}
              </p>
            </div>

            {/* Ficha Técnica Rápida */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t border-white/10 font-mono text-xs">
              <div className="flex items-center gap-1.5 text-neutral-400">
                <Calendar className="h-3.5 w-3.5 text-amber-400" />
                <span>Año: <strong className="text-white">{album.year || "N/D"}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 text-neutral-400">
                <Building2 className="h-3.5 w-3.5 text-amber-400" />
                <span className="truncate">Sello: <strong className="text-white">{album.label || "Desconocido"}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 text-neutral-400">
                <Layers className="h-3.5 w-3.5 text-amber-400" />
                <span>Pistas: <strong className="text-white">{tracks.length || album.tracksCount || "--"}</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Sección Tracklist */}
        <div className="mt-8 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-300">
              Contraportada del Vinilo // Tracklist & Armonía
            </h3>
            <span className="font-mono text-[11px] text-neutral-500">
              Archivo Discográfico Histórico
            </span>
          </div>

          <TracklistTable tracks={tracks} />
        </div>

        {/* Nota Histórica / Sin Audio */}
        <div className="mt-6 rounded-xl border border-white/5 bg-white/[0.02] p-3 text-center font-mono text-[11px] text-neutral-400">
          Esta plataforma preserva metadatos técnicos y musicológicos para investigadores y DJs.
          No contiene archivos ni reproducción de audio.
        </div>
      </div>
    </div>
  );
}
