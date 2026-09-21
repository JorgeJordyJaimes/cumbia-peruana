import { MapPin, Calendar, Disc } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";

export interface GroupItem {
  id: number;
  name: string;
  region?: string | null;
  foundationYear?: string | null;
  directorName?: string | null;
  photoUrl?: string | null;
  albumsCount?: number;
}

interface GroupCardProps {
  group: GroupItem;
  className?: string;
  onClick?: () => void;
}

export function GroupCard({ group, className, onClick }: GroupCardProps) {
  return (
    <GlassCard
      variant="hoverable"
      onClick={onClick}
      className={`p-5 flex flex-col justify-between cursor-pointer transition-all ${className || ""}`}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="font-mono text-[10px] uppercase tracking-widest text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
            Agrupación
          </span>
          {group.foundationYear && (
            <span className="flex items-center gap-1 font-mono text-xs text-neutral-400">
              <Calendar className="h-3 w-3 text-amber-400/80" />
              {group.foundationYear}
            </span>
          )}
        </div>

        <h4 className="text-lg font-bold text-white tracking-tight leading-snug hover:text-amber-300 transition-colors">
          {group.name}
        </h4>

        {group.directorName && (
          <p className="mt-1 text-xs text-neutral-400">
            Dir: <span className="text-neutral-300 font-medium">{group.directorName}</span>
          </p>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-neutral-400">
        <span className="flex items-center gap-1">
          <MapPin className="h-3 w-3 text-amber-400" />
          {group.region || "Perú"}
        </span>

        {group.albumsCount !== undefined && (
          <span className="flex items-center gap-1 text-neutral-300">
            <Disc className="h-3 w-3 text-neutral-500" />
            {group.albumsCount} producciones
          </span>
        )}
      </div>
    </GlassCard>
  );
}
