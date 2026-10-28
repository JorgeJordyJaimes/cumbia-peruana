import * as React from "react";
import { cn } from "@/lib/utils";

export interface BrutalButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "dark" | "orange" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const BrutalButton = React.forwardRef<HTMLButtonElement, BrutalButtonProps>(
  ({ className, variant = "primary", size = "md", disabled, children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 font-mono font-bold uppercase transition-all duration-150 cursor-pointer disabled:pointer-events-none disabled:opacity-50 select-none focus-visible:outline-none";

    const variantStyles = {
      primary:
        "border-2 border-[#1F1305] bg-[#E80000] text-white shadow-[4px_4px_0px_#1F1305] hover:bg-[#C40000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#1F1305] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#1F1305]",
      dark:
        "border-2 border-[#1F1305] bg-[#1F1305] text-white shadow-[4px_4px_0px_#E80000] hover:bg-[#2A1C0E] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#E80000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#1F1305]",
      orange:
        "border-2 border-[#1F1305] bg-[#F1730C] text-[#1F1305] shadow-[4px_4px_0px_#1F1305] hover:bg-[#E80000] hover:text-white hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#1F1305] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#1F1305]",
      secondary:
        "border-2 border-[#1F1305] bg-white text-[#1F1305] shadow-[3px_3px_0px_#1F1305] hover:bg-[#EDE0D0] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#1F1305] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#1F1305]",
      ghost:
        "bg-transparent text-[#1F1305] hover:text-[#E80000] p-0 shadow-none border-none underline underline-offset-4 decoration-2 decoration-[#1F1305]/30 hover:decoration-[#E80000]",
    };

    const sizeStyles = {
      sm: "min-h-[36px] px-3 py-1 text-xs",
      md: "min-h-[40px] px-5 py-2 text-xs",
      lg: "min-h-[48px] px-7 py-3 text-sm font-black",
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(baseStyles, variantStyles[variant], variant !== "ghost" && sizeStyles[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);
BrutalButton.displayName = "BrutalButton";
