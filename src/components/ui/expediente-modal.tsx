"use client";

import { useEffect, useRef, useCallback } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ExpedienteModalProps {
  open: boolean;
  onClose: () => void;
  variant?: "clara" | "oscura";
  size?: "sm" | "md" | "lg" | "xl";
  labelledBy?: string;
  children: React.ReactNode;
  className?: string;
  showCloseButton?: boolean;
}

export function ExpedienteModal({
  open,
  onClose,
  variant = "clara",
  size = "lg",
  labelledBy,
  children,
  className,
  showCloseButton = true,
}: ExpedienteModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lastActiveElementRef = useRef<HTMLElement | null>(null);

  // Sincronizar showModal() / close() nativo y preservar foco accesible
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      lastActiveElementRef.current = document.activeElement as HTMLElement | null;
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
      if (lastActiveElementRef.current && document.body.contains(lastActiveElementRef.current)) {
        lastActiveElementRef.current.focus();
      }
    }
  }, [open]);

  // Manejar clic en backdrop para cerrar
  const handleDialogClick = useCallback(
    (e: React.MouseEvent<HTMLDialogElement>) => {
      const dialog = dialogRef.current;
      if (!dialog) return;
      const rect = dialog.getBoundingClientRect();
      const isClickInside =
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width;

      if (!isClickInside) {
        onClose();
      }
    },
    [onClose]
  );

  // Manejar evento cancel nativo (Escape key)
  const handleCancel = useCallback(
    (e: React.SyntheticEvent<HTMLDialogElement, Event>) => {
      e.preventDefault();
      onClose();
    },
    [onClose]
  );

  if (!open) return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-xl",
    lg: "max-w-3xl",
    xl: "max-w-5xl",
  }[size];

  const isOscura = variant === "oscura";

  return (
    <dialog
      ref={dialogRef}
      onCancel={handleCancel}
      onClick={handleDialogClick}
      aria-labelledby={labelledBy}
      className={cn(
        "fixed inset-0 m-auto p-4 sm:p-6 border-none bg-transparent open:flex open:flex-col items-center justify-center z-50",
        isOscura ? "variant-oscura" : "variant-clara"
      )}
    >
      <div
        className={cn(
          "relative w-full max-h-[92vh] flex flex-col border-2 border-[#1F1305] overscroll-contain overflow-hidden font-mono",
          sizeClasses,
          isOscura
            ? "bg-[#140D04] text-[#EDE0D0] shadow-[8px_8px_0px_#E80000]"
            : "bg-[#EDE0D0] text-[#1F1305] shadow-[8px_8px_0px_#1F1305]",
          className
        )}
      >
        {showCloseButton && (
          <button
            type="button"
            onClick={onClose}
            className={cn(
              "absolute top-3 right-3 z-30 inline-flex items-center justify-center h-8 w-8 border-2 border-[#1F1305] transition-all cursor-pointer",
              isOscura
                ? "bg-[#1F1305] text-[#EDE0D0] shadow-[2px_2px_0px_#E80000] hover:bg-[#E80000] hover:text-white"
                : "bg-white text-[#1F1305] shadow-[2px_2px_0px_#1F1305] hover:bg-[#E80000] hover:text-white"
            )}
            aria-label="Cerrar expediente"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Cerrar</span>
          </button>
        )}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          {children}
        </div>
      </div>
    </dialog>
  );
}
