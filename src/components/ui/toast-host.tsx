"use client";

import { useState, useEffect, useCallback } from "react";
import { X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToastItem {
  id: string;
  message: string;
}

let toastListeners: Array<(toast: ToastItem) => void> = [];

export function showToast(message: string) {
  const item: ToastItem = {
    id: Math.random().toString(36).substring(2, 9),
    message,
  };
  toastListeners.forEach((listener) => listener(item));
}

export function ToastHost() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    const handleNewToast = (toast: ToastItem) => {
      setToasts((prev) => [...prev, toast]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id));
      }, 4000);
    };

    toastListeners.push(handleNewToast);
    return () => {
      toastListeners = toastListeners.filter((l) => l !== handleNewToast);
    };
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:right-4 z-[9999] flex flex-col gap-2 pointer-events-none"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cn(
            "pointer-events-auto border-2 border-[#1F1305] bg-white p-3 text-[#1F1305] shadow-[3px_3px_0px_#1F1305]",
            "font-mono text-xs font-bold flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-2 duration-150"
          )}
        >
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-4 h-4 bg-[#1F1305] text-[#EDE0D0] text-[10px]">
              <Check className="h-3 w-3 text-[#10B981]" />
            </span>
            <span>{t.message}</span>
          </div>

          <button
            type="button"
            onClick={() => removeToast(t.id)}
            className="p-0.5 text-[#665D4F] hover:text-[#1F1305] hover:bg-[#EDE0D0] transition-colors cursor-pointer"
            aria-label="Cerrar notificación"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
