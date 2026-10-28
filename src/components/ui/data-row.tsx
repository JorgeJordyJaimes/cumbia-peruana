import * as React from "react";
import { cn } from "@/lib/utils";

export interface DataRowProps {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export function DataRow({ label, value, icon, className }: DataRowProps) {
  return (
    <div
      className={cn(
        "border border-[#1F1305] bg-[#EDE0D0] p-2.5 shadow-[2px_2px_0px_#1F1305] font-mono text-xs",
        className
      )}
    >
      <span className="text-[#665D4F] block text-[11px] font-bold uppercase">{label}</span>
      <span className="text-sm font-bold text-[#1F1305] flex items-center gap-1.5 mt-0.5 truncate">
        {icon}
        <span>{value}</span>
      </span>
    </div>
  );
}
