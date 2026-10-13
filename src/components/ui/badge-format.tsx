import { cn } from "@/lib/utils";
import { Disc, CassetteTape, Disc3, Layers } from "lucide-react";

interface BadgeFormatProps {
  formatName?: string | null;
  className?: string;
  size?: "sm" | "md";
  showIcon?: boolean;
}

export function BadgeFormat({
  formatName,
  className,
  size = "md",
  showIcon = true,
}: BadgeFormatProps) {
  if (!formatName) return null;

  const normalized = formatName.toLowerCase();

  let Icon = Disc3;
  let label = formatName;

  if (normalized.includes("45") || normalized.includes("single")) {
    Icon = Disc;
    label = "45 RPM Single";
  } else if (normalized.includes("lp") || normalized.includes("vinilo") || normalized.includes("album")) {
    Icon = Disc3;
    label = "LP 33 RPM";
  } else if (normalized.includes("casete") || normalized.includes("cassette")) {
    Icon = CassetteTape;
    label = "Casete";
  } else if (normalized.includes("split")) {
    Icon = Layers;
    label = "Split Lado A/B";
  } else if (normalized.includes("cd") || normalized.includes("compact")) {
    Icon = Disc3;
    label = "CD";
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border border-[#1F1305] bg-white font-mono font-bold uppercase tracking-wider text-[#E80000] shadow-[1px_1px_0px_#1F1305]",
        size === "sm" ? "px-1.5 py-0.5 text-[10px]" : "px-2 py-0.5 text-xs",
        className
      )}
    >
      {showIcon ? <Icon className={cn(size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5", "text-[#E80000]")} /> : null}
      <span>{label}</span>
    </span>
  );
}
