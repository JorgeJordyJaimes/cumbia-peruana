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
    <div className={cn("overflow-hidden rounded-xl border border-white/10 bg-black/40 backdrop-blur-md", className)}>
      {/* Cabecera Estilo Ficha de Vinilo */}
      <div className="grid grid-cols-12 gap-3 border-b border-white/10 px-4 py-2.5 font-mono text-[11px] uppercase tracking-wider text-neutral-400">
        <div className="col-span-1 text-center">#</div>
        <div className="col-span-5">Título de la Obra</div>
        <div className="col-span-3">Compositor / Autor</div>
        <div className="col-span-3 text-right">Especificaciones DJ</div>
      </div>

      {/* Lista de Pistas */}
      <div className="divide-y divide-white/5">
        {tracks.map((track, idx) => {
          const trackLabel = track.side
            ? `${track.side}${track.trackNumber || idx + 1}`
            : (track.trackNumber || idx + 1).toString().padStart(2, "0");

          return (
            <div
              key={track.id}
              className="grid grid-cols-12 items-center gap-3 px-4 py-3 text-xs transition-colors hover:bg-white/[0.04]"
            >
              {/* Posición / Lado */}
              <div className="col-span-1 text-center font-mono font-bold text-neutral-400">
                {trackLabel}
              </div>

              {/* Título & Duración */}
              <div className="col-span-5 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white truncate text-sm">
                    {track.title}
                  </span>
                  {track.durationSeconds && (
                    <span className="font-mono text-[11px] text-neutral-500">
                      {formatDuration(track.durationSeconds)}
                    </span>
                  )}
                </div>
                {track.genre && (
                  <span className="text-[10px] text-neutral-400 font-mono">
                    {track.genre}
                  </span>
                )}
              </div>

              {/* Compositor */}
              <div className="col-span-3 truncate text-neutral-300">
                {track.composer ? (
                  <span className="italic text-neutral-300">
                    {track.composer}
                  </span>
                ) : (
                  <span className="text-neutral-500 font-mono text-[11px]">
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
                  <span className="font-mono text-[11px] text-neutral-600">
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
