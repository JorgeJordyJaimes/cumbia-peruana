import * as React from "react";
import { cn } from "@/lib/utils";

export interface BrutalCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "white" | "cream" | "dark";
  shadow?: "none" | "sm" | "md" | "lg";
}

export function BrutalCard({
  className,
  variant = "white",
  shadow = "md",
  children,
  ...props
}: BrutalCardProps) {
  const bgStyles = {
    white: "bg-white text-[#1F1305]",
    cream: "bg-[#EDE0D0] text-[#1F1305]",
    dark: "bg-[#140D04] text-[#EDE0D0]",
  };

  const shadowStyles = {
    none: "",
    sm: "shadow-[2px_2px_0px_#1F1305]",
    md: "shadow-[4px_4px_0px_#1F1305]",
    lg: "shadow-[8px_8px_0px_#1F1305]",
  };

  return (
    <div
      className={cn(
        "border-2 border-[#1F1305]",
        bgStyles[variant],
        shadowStyles[shadow],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
