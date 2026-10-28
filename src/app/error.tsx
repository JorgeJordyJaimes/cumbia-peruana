"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, ArrowLeft } from "lucide-react";
import { BrutalistCoordinator, BrutalistFooter } from "@/features/home-brutalism";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error en plataforma fonográfica:", error);
  }, [error]);

  return (
    <div className="relative min-h-screen bg-[#EDE0D0] brutalist-dots-light text-[#1F1305] flex flex-col justify-between selection:bg-[#F1730C] selection:text-[#1F1305]">
      <BrutalistCoordinator>
        <main id="contenido" className="container mx-auto max-w-4xl px-4 py-16 sm:py-24 flex items-center justify-center">
          <div className="w-full border-2 border-[#1F1305] bg-white py-14 px-6 sm:px-12 text-center shadow-[8px_8px_0px_#1F1305] relative overflow-hidden font-mono">
            {/* Sello de caucho pericial */}
            <div className="inline-block border-2 border-[#E80000] bg-[#E80000] text-white px-4 py-1.5 text-xs sm:text-sm font-black uppercase rotate-[-2deg] shadow-[3px_3px_0px_#1F1305] mb-6">
              ARCHIVO DAÑADO // ERROR DE LECTURA
            </div>

            <AlertTriangle className="mx-auto h-16 w-16 text-[#E80000] mb-4" />

            <h1 className="font-cooper text-3xl sm:text-4xl text-[#1F1305] tracking-tight">
              Interrupción en la Lectura del Archivo
            </h1>

            <p className="font-mono text-xs sm:text-sm text-[#665D4F] mt-3 max-w-md mx-auto leading-relaxed">
              Ocurrió un error inesperado al decodificar la matriz de datos. El incidente ha sido registrado para inspección pericial.
            </p>

            {error?.digest && (
              <p className="font-mono text-[11px] text-[#665D4F] mt-2 bg-[#EDE0D0] inline-block px-2 py-1 border border-[#1F1305]">
                DIGEST: {error.digest}
              </p>
            )}

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => reset()}
                className="inline-flex items-center gap-2 border-2 border-[#1F1305] bg-[#E80000] px-6 py-3 font-mono text-xs font-black uppercase text-white shadow-[4px_4px_0px_#1F1305] hover:bg-[#C40000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#1F1305] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
              >
                <RotateCcw className="h-4 w-4" />
                <span>REINTENTAR LECTURA</span>
              </button>

              <Link
                href="/"
                className="inline-flex items-center gap-2 border-2 border-[#1F1305] bg-white px-5 py-3 font-mono text-xs font-bold uppercase text-[#1F1305] shadow-[3px_3px_0px_#1F1305] hover:bg-[#EDE0D0] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#1F1305] active:translate-x-0.5 active:translate-y-0.5 transition-all"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>PORTADA PRINCIPAL</span>
              </Link>
            </div>
          </div>
        </main>
      </BrutalistCoordinator>
      <BrutalistFooter />
    </div>
  );
}
