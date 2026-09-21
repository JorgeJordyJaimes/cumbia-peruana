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
  let colorStyle = "border-amber-500/20 bg-amber-500/10 text-amber-300";
  let label = formatName;

  if (normalized.includes("45") || normalized.includes("single")) {
    Icon = Disc;
    colorStyle = "border-red-500/25 bg-red-500/10 text-red-300";
    label = "45 RPM";
  } else if (normalized.includes("lp") || normalized.includes("vinilo") || normalized.includes("album")) {
    Icon = Disc3;
    colorStyle = "border-amber-500/25 bg-amber-500/10 text-amber-300";
    label = "LP 33 RPM";
  } else if (normalized.includes("casete") || normalized.includes("cassette")) {
    Icon = CassetteTape;
    colorStyle = "border-emerald-500/25 bg-emerald-500/10 text-emerald-300";
    label = "Casete";
  } else if (normalized.includes("split")) {
    Icon = Layers;
    colorStyle = "border-cyan-500/25 bg-cyan-500/10 text-cyan-300";
    label = "Split Lado A/B";
  } else if (normalized.includes("cd") || normalized.includes("compact")) {
    Icon = Disc3;
    colorStyle = "border-purple-500/25 bg-purple-500/10 text-purple-300";
    label = "CD";
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md border font-mono uppercase tracking-wider backdrop-blur-md transition-colors",
        size === "sm" ? "px-1.5 py-0.5 text-[10px]" : "px-2 py-0.5 text-[11px]",
        colorStyle,
        className
      )}
    >
      {showIcon && <Icon className={size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5"} />}
      <span>{label}</span>
    </span>
  );
}
