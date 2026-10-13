"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { GitFork } from "lucide-react";
import { VersionesExplorerModal } from "@/features/genealogia";

export interface TrackItem {
  id: number;
  trackNumber?: number | null;
  side?: string | null;
  title: string;
  durationSeconds?: number | null;
  composer?: string | null;
  vocalist?: string | null;
  bpm?: number | null;
  camelot?: string | null;
  musicalKey?: string | null;
  genre?: string | null;
}

interface TracklistTableProps {
  tracks: TrackItem[];
  className?: string;
}

export function TracklistTable({ tracks, className }: TracklistTableProps) {
  const [selectedTemaId, setSelectedTemaId] = useState<number | null>(null);
  const [selectedTemaTitulo, setSelectedTemaTitulo] = useState<string>("");

  // Ordenación física estricta: Lado A (1..N) y luego Lado B (1..N)
  const sortedTracks = useMemo(() => {
    return [...(tracks || [])].sort((a, b) => {
      const sideA = (a.side || "").trim().toUpperCase();
      const sideB = (b.side || "").trim().toUpperCase();
      if (sideA !== sideB) {
        if (!sideA) return 1;
        if (!sideB) return -1;
        return sideA.localeCompare(sideB);
      }
      const numA = typeof a.trackNumber === "number" ? a.trackNumber : 999;
      const numB = typeof b.trackNumber === "number" ? b.trackNumber : 999;
      return numA - numB;
    });
  }, [tracks]);

  if (!sortedTracks || sortedTracks.length === 0) {
    return (
      <div className="py-8 text-center font-mono text-xs text-neutral-500">
        Información de pistas en proceso de catalogación en el archivo físico.
      </div>
    );
  }

  return (
    <>
      <div className={cn("overflow-hidden border-2 border-[#1F1305] bg-white shadow-[3px_3px_0px_#1F1305]", className)}>
        <div className="overflow-x-auto">
          <div className="min-w-[640px]">
            {/* Cabecera Estilo Ficha de Vinilo */}
            <div className="grid grid-cols-12 gap-3 border-b-2 border-[#1F1305] bg-[#EDE0D0] px-4 py-2.5 font-mono text-[11px] uppercase tracking-wider text-[#1F1305] font-bold">
              <div className="col-span-1 text-center">#</div>
              <div className="col-span-4">Título de la Obra</div>
              <div className="col-span-3">Voz</div>
              <div className="col-span-2">Compositor</div>
              <div className="col-span-2 text-right">BPM</div>
            </div>

            {/* Lista de Pistas */}
            <div className="divide-y divide-[#1F1305]/15">
              {sortedTracks.map((track, idx) => {
                const trackLabel = track.side
                  ? `${track.side}${track.trackNumber || idx + 1}`
                  : (track.trackNumber || idx + 1).toString().padStart(2, "0");

                return (
                  <div
                    key={track.id}
                    className="grid grid-cols-12 items-center gap-3 px-4 py-3 text-xs transition-colors hover:bg-[#EDE0D0]/50"
                  >
                    {/* Posición / Lado */}
                    <div className="col-span-1 text-center font-mono font-bold text-[#746B5C]">
                      {trackLabel}
                    </div>

                    {/* Título de la Obra */}
                    <div className="col-span-4 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#1F1305] truncate text-sm" title={track.title}>
                          {track.title}
                        </span>

                        {/* Botón Explorar Versiones (WITH RECURSIVE) */}
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedTemaId(track.id);
                            setSelectedTemaTitulo(track.title);
                          }}
                          title="Explorar árbol de versiones y covers"
                          className="inline-flex items-center gap-1 border border-[#1F1305] bg-[#EDE0D0] px-1.5 py-0.5 font-mono text-[10px] font-bold text-[#1F1305] hover:bg-[#E80000] hover:text-white transition-colors cursor-pointer shrink-0"
                        >
                          <GitFork className="h-3 w-3 text-[#E80000] group-hover:text-white" />
                          <span>Versiones</span>
                        </button>
                      </div>
                    </div>

                    {/* Voz / Vocalista */}
                    <div className="col-span-3 min-w-0">
                      {track.vocalist === "Instrumental" ? (
                        <span className="inline-block font-mono text-[10px] font-bold text-[#746B5C] bg-[#EDE0D0] px-2 py-0.5 border border-[#1F1305]/30">
                          Instrumental
                        </span>
                      ) : track.vocalist ? (
                        <span className="font-bold text-[#1F1305] truncate block text-xs" title={track.vocalist}>
                          {track.vocalist}
                        </span>
                      ) : (
                        <span className="text-[#746B5C] font-mono text-[11px]">
                          Pendiente
                        </span>
                      )}
                    </div>

                    {/* Compositor */}
                    <div className="col-span-2 truncate text-[#5A5245]">
                      {track.composer ? (
                        <span className="italic text-[#1F1305] truncate block" title={track.composer}>
                          {track.composer}
                        </span>
                      ) : (
                        <span className="text-[#746B5C] font-mono text-[11px]">
                          D.R.
                        </span>
                      )}
                    </div>

                    {/* Solo BPM en la vista ampliada del modal */}
                    <div className="col-span-2 flex items-center justify-end">
                      {track.bpm ? (
                        <span className="inline-flex items-center gap-1.5 border border-[#1F1305] bg-white px-2 py-0.5 font-mono text-[11px] font-bold text-[#1F1305] shadow-[1px_1px_0px_#1F1305]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#E80000]" />
                          {track.bpm} BPM
                        </span>
                      ) : (
                        <span className="font-mono text-[11px] text-[#746B5C]">
                          --
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Árbol Genealógico de Versiones */}
      <VersionesExplorerModal
        temaId={selectedTemaId}
        tituloTema={selectedTemaTitulo}
        onClose={() => setSelectedTemaId(null)}
      />
    </>
  );
}
