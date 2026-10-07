import { BadgeDJ } from "@/components/ui/badge-dj";
import { cn } from "@/lib/utils";

export interface TrackItem {
  id: number;
  trackNumber?: number | null;
  side?: string | null;
  title: string;
  durationSeconds?: number | null;
  composer?: string | null;
  bpm?: number | null;
  camelot?: string | null;
  musicalKey?: string | null;
  genre?: string | null;
}

interface TracklistTableProps {
  tracks: TrackItem[];
  className?: string;
}

function formatDuration(seconds?: number | null): string {
  if (!seconds) return "--:--";
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function TracklistTable({ tracks, className }: TracklistTableProps) {
  if (!tracks || tracks.length === 0) {
    return (
      <div className="py-8 text-center font-mono text-xs text-neutral-500">
        Información de pistas en proceso de catalogación en el archivo físico.
      </div>
    );
  }

  return (
    <div className={cn("overflow-hidden border-2 border-[#1F1305] bg-white shadow-[3px_3px_0px_#1F1305]", className)}>
      {/* Cabecera Estilo Ficha de Vinilo */}
      <div className="grid grid-cols-12 gap-3 border-b-2 border-[#1F1305] bg-[#EDE0D0] px-4 py-2.5 font-mono text-[11px] uppercase tracking-wider text-[#1F1305] font-bold">
        <div className="col-span-1 text-center">#</div>
        <div className="col-span-5">Título de la Obra</div>
        <div className="col-span-3">Compositor / Autor</div>
        <div className="col-span-3 text-right">Especificaciones DJ</div>
      </div>

      {/* Lista de Pistas */}
      <div className="divide-y divide-[#1F1305]/15">
        {tracks.map((track, idx) => {
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

              {/* Título & Duración */}
              <div className="col-span-5 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#1F1305] truncate text-sm">
                    {track.title}
                  </span>
                  {track.durationSeconds && (
                    <span className="font-mono text-[11px] text-[#746B5C]">
                      {formatDuration(track.durationSeconds)}
                    </span>
                  )}
                </div>
                {track.genre && (
                  <span className="text-[10px] text-[#746B5C] font-mono">
                    {track.genre}
                  </span>
                )}
              </div>

              {/* Compositor */}
              <div className="col-span-3 truncate text-[#5A5245]">
                {track.composer ? (
                  <span className="italic text-[#1F1305]">
                    {track.composer}
                  </span>
                ) : (
                  <span className="text-[#746B5C] font-mono text-[11px]">
                    D.R. (Derechos Reservados)
                  </span>
                )}
              </div>

              {/* Badges DJ (BPM / Camelot) */}
              <div className="col-span-3 flex items-center justify-end gap-2">
                {track.bpm || track.camelot ? (
                  <BadgeDJ
                    bpm={track.bpm}
                    camelot={track.camelot}
                    musicalKey={track.musicalKey}
                  />
                ) : (
                  <span className="font-mono text-[11px] text-[#746B5C]">
                    Pendiente BPM
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
