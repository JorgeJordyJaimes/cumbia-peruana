"use client";

import { useState, useCallback } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { showToast } from "./toast-host";

interface CopyFieldProps {
  value: string;
  label?: string;
  className?: string;
  toastLabel?: string;
}

export function CopyField({ value, label, className, toastLabel }: CopyFieldProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();
      try {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        showToast(toastLabel ? `Copiado: ${toastLabel}` : `Copiado: ${value}`);
        setTimeout(() => setCopied(false), 1500);
      } catch {
        // Fallback
        showToast(`Copiado: ${value}`);
      }
    },
    [value, toastLabel]
  );

  return (
    <button
      type="button"
      onClick={handleCopy}
      title={`Copiar ${label || value}`}
      className={cn(
        "inline-flex items-center gap-1.5 border border-[#1F1305] bg-white px-2 py-0.5 font-mono text-xs font-bold text-[#1F1305] shadow-[1px_1px_0px_#1F1305] hover:bg-[#EDE0D0] transition-colors cursor-pointer select-text",
        className
      )}
    >
      <span>{label || value}</span>
      {copied ? (
        <Check className="h-3 w-3 text-[#10B981] shrink-0" />
      ) : (
        <Copy className="h-3 w-3 text-[#665D4F] shrink-0" />
      )}
      <span className="sr-only">Copiar</span>
    </button>
  );
}
