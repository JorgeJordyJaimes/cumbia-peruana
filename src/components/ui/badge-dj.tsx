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
  if (!bpm && !camelot) return null;

  const validCamelot = (camelot && camelot in CAMELOT_WHEEL) ? (camelot as CamelotCode) : null;
  const keyInfo = validCamelot ? CAMELOT_WHEEL[validCamelot] : null;
  const displayKey = musicalKey || (keyInfo ? keyInfo.standardKey : null);

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 border-2 border-[#1F1305] bg-[#EDE0D0] px-2.5 py-1 font-mono text-xs font-medium tracking-tight text-[#1F1305] shadow-[2px_2px_0px_#1F1305]",
        className
      )}
    >
      {showDot && keyInfo && (
        <span
          className="h-2.5 w-2.5 border border-[#1F1305]"
          style={{ backgroundColor: keyInfo.color }}
          title={`Clave: ${validCamelot}${displayKey ? ` (${displayKey})` : ""}`}
          aria-hidden="true"
        />
      )}

      {bpm && (
        <span className="text-[#1F1305] font-black">
          {bpm} <span className="text-[11px] text-[#5A5245] font-bold">BPM</span>
        </span>
      )}

      {bpm && validCamelot && (
        <span className="text-[#746B5C] font-bold select-none">/</span>
      )}

      {validCamelot && (
        <span className="bg-[#1F1305] text-[#EDE0D0] px-1.5 py-0.5 font-black text-[11px] leading-none">
          {validCamelot}
        </span>
      )}

      {displayKey && (
        <span className="hidden sm:inline text-[#5A5245] text-[11px] font-bold">
          ({displayKey})
        </span>
      )}
    </div>
  );
}
