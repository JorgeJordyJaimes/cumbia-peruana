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
        "inline-flex items-center gap-1.5 border border-[#1F1305] bg-[#EDE0D0] px-2 py-0.5 font-mono text-[11px] font-medium tracking-tight text-[#1F1305] shadow-[1px_1px_0px_#1F1305]",
        className
      )}
    >
      {showDot && keyInfo && (
        <span
          className="h-2 w-2 rounded-full border border-[#1F1305]"
          style={{ backgroundColor: keyInfo.color }}
          aria-hidden="true"
        />
      )}

      {bpm && (
        <span className="text-[#E80000] font-black">
          {bpm} <span className="text-[10px] text-[#746B5C] font-normal">BPM</span>
        </span>
      )}

      {bpm && (validCamelot || displayKey) && (
        <span className="text-[#746B5C]/60 select-none">|</span>
      )}

      {validCamelot && (
        <span className="text-[#1F1305] font-black">{validCamelot}</span>
      )}

      {displayKey && (
        <span className="text-[#5A5245] text-[10px]">
          ({displayKey})
        </span>
      )}
    </div>
  );
}
