import { cn } from "@/lib/utils";

interface AmbientGlowProps {
  className?: string;
  variant?: "warm-solar" | "velvet-night" | "chicha-psychedelic" | "minimal";
}

export function AmbientGlow({ className, variant = "warm-solar" }: AmbientGlowProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute -z-10 overflow-hidden select-none",
        className
      )}
    >
      {variant === "warm-solar" && (
        <>
          <div className="absolute top-[-10%] left-[15%] h-[500px] w-[500px] rounded-full bg-gradient-to-br from-amber-500/25 to-orange-600/20 blur-[130px]" />
          <div className="absolute top-[20%] right-[10%] h-[420px] w-[420px] rounded-full bg-gradient-to-bl from-red-600/20 to-amber-600/15 blur-[140px]" />
        </>
      )}

      {variant === "velvet-night" && (
        <>
          <div className="absolute top-[-5%] left-[25%] h-[480px] w-[480px] rounded-full bg-gradient-to-b from-rose-900/25 to-red-600/20 blur-[140px]" />
          <div className="absolute top-[30%] left-[5%] h-[380px] w-[380px] rounded-full bg-gradient-to-r from-amber-700/20 to-transparent blur-[120px]" />
        </>
      )}

      {variant === "chicha-psychedelic" && (
        <>
          <div className="absolute top-[-10%] left-[10%] h-[520px] w-[520px] rounded-full bg-gradient-to-br from-cyan-500/20 via-emerald-500/15 to-amber-500/20 blur-[150px]" />
          <div className="absolute top-[25%] right-[15%] h-[460px] w-[460px] rounded-full bg-gradient-to-tr from-rose-600/20 to-yellow-500/20 blur-[130px]" />
        </>
      )}

      {variant === "minimal" && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[350px] w-[700px] rounded-full bg-amber-500/15 blur-[120px]" />
      )}
    </div>
  );
}
