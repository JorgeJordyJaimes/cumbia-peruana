import { cn } from "@/lib/utils";
import { CAMELOT_WHEEL } from "@/features/dj-tools/camelot-utils";
import type { CamelotCode } from "@/types/domain";

interface BadgeDJProps {
  bpm?: number | null;
  camelot?: string | null;
  musicalKey?: string | null;
  className?: string;
  showDot?: boolean;
}

export function BadgeDJ({
  bpm,
  camelot,
  musicalKey,
  className,
  showDot = true,
}: BadgeDJProps) {
  if (!bpm && !camelot && !musicalKey) return null;

  const validCamelot = (camelot && camelot in CAMELOT_WHEEL) ? (camelot as CamelotCode) : null;
  const keyInfo = validCamelot ? CAMELOT_WHEEL[validCamelot] : null;
  const displayKey = musicalKey || (keyInfo ? keyInfo.standardKey : null);

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 font-mono text-[11px] font-medium tracking-tight text-neutral-300 backdrop-blur-md transition-colors hover:border-white/20 hover:bg-white/[0.08]",
        className
      )}
    >
      {showDot && keyInfo && (
        <span
          className="h-1.5 w-1.5 rounded-full ring-2 ring-white/10"
          style={{ backgroundColor: keyInfo.color }}
          aria-hidden="true"
        />
      )}

      {bpm && (
        <span className="text-amber-400 font-semibold">
          {bpm} <span className="text-[10px] text-neutral-400 font-normal">BPM</span>
        </span>
      )}

      {bpm && (validCamelot || displayKey) && (
        <span className="text-neutral-600 select-none">|</span>
      )}

      {validCamelot && (
        <span className="text-white font-semibold">{validCamelot}</span>
      )}

      {displayKey && (
        <span className="text-neutral-400 text-[10px]">
          ({displayKey})
        </span>
      )}
    </div>
  );
}
