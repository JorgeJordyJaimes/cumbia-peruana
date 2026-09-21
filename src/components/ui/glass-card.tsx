import React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "hoverable" | "elevated" | "editorial";
}

export function GlassCard({
  children,
  className,
  variant = "default",
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-all duration-300",
        variant === "hoverable" &&
          "hover:bg-white/[0.06] hover:border-white/20 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/60",
        variant === "elevated" &&
          "bg-white/[0.05] border-white/15 shadow-xl shadow-black/40",
        variant === "editorial" &&
          "rounded-3xl border-white/[0.12] bg-gradient-to-b from-white/[0.06] to-white/[0.01] shadow-2xl shadow-black/70",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
