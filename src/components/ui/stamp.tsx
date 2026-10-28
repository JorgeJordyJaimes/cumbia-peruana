import * as React from "react";
import { cn } from "@/lib/utils";

export interface StampProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "red" | "orange" | "gold" | "espresso";
  rotation?: "-8deg" | "-2deg" | "2deg" | "4deg" | "none";
}

export function Stamp({
  className,
  variant = "red",
  rotation = "-2deg",
  children,
  ...props
}: StampProps) {
  const colorStyles = {
    red: "border-[#E80000] bg-[#E80000] text-white",
    orange: "border-[#F1730C] bg-[#F1730C] text-[#1F1305]",
    gold: "border-[#F8C800] bg-[#F8C800] text-[#1F1305]",
    espresso: "border-[#1F1305] bg-[#1F1305] text-[#EDE0D0]",
  };

  const rotationStyles = {
    "-8deg": "rotate-[-8deg]",
    "-2deg": "rotate-[-2deg]",
    "2deg": "rotate-[2deg]",
    "4deg": "rotate-[4deg]",
    "none": "rotate-0",
  };

  return (
    <span
      className={cn(
        "inline-block border-2 px-2.5 py-0.5 font-mono text-[11px] font-black uppercase shadow-[2px_2px_0px_#1F1305] select-none",
        colorStyles[variant],
        rotationStyles[rotation],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
