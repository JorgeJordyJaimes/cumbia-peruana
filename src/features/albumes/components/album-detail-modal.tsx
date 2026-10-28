"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { Disc, Calendar, Building2, Layers, ExternalLink, Activity, Clock, Music, UserCheck } from "lucide-react";
import { BadgeFormat } from "@/components/ui/badge-format";
import { ExpedienteModal } from "@/components/ui/expediente-modal";
import { TracklistTable, type TrackItem } from "@/features/temas/components/tracklist-table";
import type { AlbumItem } from "@/features/albumes/components/album-card";
import { AlbumCoverSlider } from "./album-cover-slider";

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

  // Métricas técnicas del disco
  const totalDurationSeconds = useMemo(() => {
    return tracks.reduce((acc, t) => acc + (t.durationSeconds || 0), 0);
  }, [tracks]);

  const formattedTotalDuration = useMemo(() => {
    if (!totalDurationSeconds || totalDurationSeconds <= 0) return "--:--";
    const mins = Math.floor(totalDurationSeconds / 60);
    const secs = totalDurationSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")} min`;
  }, [totalDurationSeconds]);

  const avgBpm = useMemo(() => {
    const tracksWithBpm = tracks.filter((t) => typeof t.bpm === "number" && t.bpm > 0);
    return tracksWithBpm.length > 0
      ? Math.round(tracksWithBpm.reduce((acc, t) => acc + (t.bpm || 0), 0) / tracksWithBpm.length)
      : null;
  }, [tracks]);

  // Género más común / repetido entre las pistas
  const mostCommonGenre = useMemo(() => {
    const genreCounts = new Map<string, number>();
    let fallbackGenre: string | null = null;

    tracks.forEach((t) => {
      if (!t.genre) return;
      const parts = t.genre
        .split(/[/,]/)
        .map((g) => g.trim())
        .filter(Boolean);
      parts.forEach((g) => {
        if (g.toLowerCase() === "instrumental") {
          fallbackGenre = "Instrumental";
        } else {
          genreCounts.set(g, (genreCounts.get(g) || 0) + 1);
        }
      });
    });

    let topGenre: string | null = null;
    let maxCount = 0;
    genreCounts.forEach((count, g) => {
      if (count > maxCount) {
        maxCount = count;
        topGenre = g;
      }
    });

    return topGenre || fallbackGenre || "Cumbia Peruana";
  }, [tracks]);

  if (!album) return null;

  return (
    <ExpedienteModal
      open={Boolean(album)}
      onClose={onClose}
      variant="clara"
      size="xl"
      labelledBy="modal-album-title"
      showCloseButton={true}
      className="p-6 sm:p-8 md:p-10"
    >

        {/* Cabecera Editorial */}
        <div className="flex flex-col sm:flex-row gap-6 md:gap-8 items-start">
          <div className="w-full max-w-[280px] sm:max-w-none sm:w-64 md:w-72 lg:w-80 shrink-0 mx-auto sm:mx-0">
            <AlbumCoverSlider
              coverUrl={album.coverUrl}
              backCoverUrl={album.backCoverUrl}
              title={album.title}
              artist={album.artist}
              format={album.format}
              label={album.label}
              showSideLabels={true}
            />
          </div>

          <div className="flex-1 space-y-3.5 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <BadgeFormat formatName={album.format || "LP"} />
              {album.catalogNumber && (
                <span className="font-mono text-xs font-bold text-[#1F1305] border border-[#1F1305] px-2 py-0.5 bg-white shadow-[1px_1px_0px_#1F1305]">
                  {album.catalogNumber}
                </span>
              )}
            </div>

            <div>
              <h2 id="modal-album-title" className="text-2xl sm:text-3xl lg:text-4xl font-cooper tracking-tight text-[#1F1305] leading-tight">
                {album.title}
              </h2>
              <p className="text-base sm:text-lg text-[#5A5245] font-bold mt-0.5">
                {album.artist}
              </p>
              {album.directorName && (
                <p className="font-mono text-xs sm:text-sm font-bold text-[#665D4F] mt-1.5 flex items-center gap-1.5">
                  <UserCheck className="h-3.5 w-3.5 text-[#E80000] shrink-0" />
                  <span>Director del Grupo: <strong className="text-[#1F1305]">{album.directorName}</strong></span>
                </p>
              )}
            </div>

            {/* Ficha Técnica Rápida: 2 filas de 3 ítems */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3 pt-3.5 border-t-2 border-[#1F1305]/20 font-mono text-xs font-bold text-[#5A5245]">
              {/* Fila 1 */}
              <div className="flex items-center gap-1.5 whitespace-nowrap">
                <Calendar className="h-3.5 w-3.5 text-[#F1730C] shrink-0" />
                <span>Año: <strong className="text-[#1F1305]">{album.year || "N/D"}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 min-w-0">
                <Building2 className="h-3.5 w-3.5 text-[#E80000] shrink-0" />
                <span className="truncate">Sello: <strong className="text-[#1F1305]">{album.label || "Desconocido"}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 whitespace-nowrap">
                <Layers className="h-3.5 w-3.5 text-[#10B981] shrink-0" />
                <span>Pistas: <strong className="text-[#1F1305]">{tracks.length || album.tracksCount || "--"}</strong></span>
              </div>

              {/* Fila 2 */}
              <div className="flex items-center gap-1.5 whitespace-nowrap">
                <Clock className="h-3.5 w-3.5 text-[#2563EB] shrink-0" />
                <span>Duración: <strong className="text-[#1F1305]">{formattedTotalDuration}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 whitespace-nowrap">
                <Activity className="h-3.5 w-3.5 text-[#D97706] shrink-0" />
                <span>BPM Promedio: <strong className="text-[#1F1305]">{avgBpm ? `${avgBpm} BPM` : "--"}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 min-w-0">
                <Music className="h-3.5 w-3.5 text-[#7C3AED] shrink-0" />
                <span className="truncate" title={mostCommonGenre}>
                  Género: <strong className="text-[#1F1305]">{mostCommonGenre}</strong>
                </span>
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
            <span className="font-mono text-[11px] text-[#665D4F] font-bold">
              Archivo Discográfico Histórico
            </span>
          </div>

          <TracklistTable tracks={tracks} />
        </div>

        {/* Enlace Permanente a Ficha Completa */}
        <div className="mt-4 flex justify-end">
          <Link
            href={`/album/${album.id}`}
            className="inline-flex items-center gap-1.5 border border-[#1F1305] bg-white px-3 py-1.5 font-mono text-xs font-bold text-[#1F1305] shadow-[2px_2px_0px_#1F1305] hover:bg-[#1F1305] hover:text-white transition-colors"
          >
            <span>Ver Ficha Completa</span>
            <ExternalLink className="h-3.5 w-3.5 text-[#E80000]" />
          </Link>
        </div>

        {/* Nota Histórica / Sin Audio */}
        <div className="mt-4 border-2 border-[#1F1305] bg-white p-3 text-center font-mono text-[11px] font-bold text-[#5A5245] shadow-[2px_2px_0px_#1F1305]">
          Esta plataforma preserva metadatos técnicos y musicológicos para investigadores y DJs.
          No contiene archivos ni reproducción de audio.
        </div>
    </ExpedienteModal>
  );
}
