import { cn } from "@/lib/utils";

interface BrutalSkeletonProps {
  className?: string;
  count?: number;
}

export function BrutalSkeleton({ className, count = 12 }: BrutalSkeletonProps) {
  return (
    <div className={cn("grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5 font-mono", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="relative aspect-square w-full border-2 border-dashed border-[#1F1305] bg-[#EDE0D0]/60 flex flex-col justify-between p-3 select-none"
        >
          <div className="flex items-center justify-between text-[10px] text-[#665D4F] font-bold border-b border-[#1F1305]/30 pb-1">
            <span>EXPEDIENTE</span>
            <span>....</span>
          </div>

          <div className="text-center font-black text-xs text-[#1F1305] tracking-wider">
            [ CARGANDO FOLIO... ]
          </div>

          <div className="h-3 w-2/3 bg-[#1F1305]/10 border border-[#1F1305]/20" />
        </div>
      ))}
    </div>
  );
}
