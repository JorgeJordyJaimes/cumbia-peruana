import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Radio, Sparkles, Disc3, Music } from "lucide-react";
import { BrutalistCoordinator, BrutalistFooter } from "@/features/home-brutalism";
import { RadarSonoro } from "@/features/home-retro";
import {
  HallazgoDelMes,
  HistorialHallazgos,
  HALLAZGO_DEL_MES_ACTUAL,
  ARCHIVO_HISTORICO_HALLAZGOS,
} from "@/features/radar";

export const metadata: Metadata = {
  title: "EXP. 05: Radar Sonoro // Hallazgo del Mes & Curaduría | Kumbia Sound",
  description:
    "El hallazgo mensual y curaduría patrimonial de la cumbia peruana: álbum del mes, voces rescatadas, agrupaciones olvidadas y subgéneros con enlaces a fonotecas oficiales.",
};

export default function RadarPage() {
  return (
    <div className="relative min-h-screen bg-[#EDE0D0] brutalist-dots-light text-[#1F1305] selection:bg-[#F1730C] selection:text-[#1F1305]">
      <BrutalistCoordinator>
        <main id="contenido" className="container mx-auto max-w-7xl px-4 sm:px-6 pt-6 pb-20 space-y-12">
          {/* Breadcrumb / Retorno al Home */}
          <div className="flex items-center justify-between border-b-2 border-[#1F1305] pb-4 font-mono text-xs">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-bold text-[#1F1305] hover:text-[#E80000] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>← Volver a la Portada Principal</span>
            </Link>

            <div className="flex items-center gap-2 border border-[#1F1305] bg-white px-2.5 py-1 text-[#F1730C] font-bold shadow-[2px_2px_0px_#1F1305]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>EXP. 05 / CURADURÍA & RADAR SONORO</span>
            </div>
          </div>

          {/* Banner Hero Brutalista */}
          <div className="border-2 border-[#1F1305] bg-[#1F1305] brutalist-dots-dark text-[#EDE0D0] p-8 sm:p-12 shadow-[6px_6px_0px_#F1730C] relative overflow-hidden">
            <div className="max-w-3xl space-y-5 relative z-10">
              <div className="inline-flex items-center gap-2 border-2 border-[#EDE0D0] bg-[#F1730C] px-3.5 py-1 font-mono text-xs font-bold text-white shadow-[2px_2px_0px_#EDE0D0]">
                <Radio className="h-3.5 w-3.5" />
                <span>EXPEDIENTE 05 · HALLAZGO MENSUAL & VITRINA CURATORIAL</span>
              </div>

              <h1 className="font-cooper text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                El Radar Sonoro
              </h1>

              <p className="font-sans text-sm sm:text-base text-[#EDE0D0]/80 leading-relaxed max-w-2xl">
                La vitrina de descubrimiento que alimenta a coleccionistas, melómanos y DJs.
                Cada mes seleccionamos un hallazgo fonográfico categorizado con su relevancia histórica,
                enlaces legales de escucha externa y vínculos directos a las matrices de nuestro archivo.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 font-mono text-xs">
                <span className="flex items-center gap-2 border border-[#EDE0D0]/30 bg-white/10 px-3 py-1 font-bold text-[#F8C800]">
                  <Disc3 className="h-4 w-4 text-[#F8C800]" /> Formato Pericial Fijo de 4 Puntos
                </span>
                <span className="flex items-center gap-2 border border-[#EDE0D0]/30 bg-white/10 px-3 py-1 font-bold text-white">
                  <Music className="h-4 w-4 text-[#10B981]" /> Cero Archivos Locales · Enlaces Oficiales
                </span>
              </div>
            </div>

            {/* Sello decorativo de fondo */}
            <div className="absolute -bottom-8 -right-6 text-white/[0.04] font-anton text-[220px] font-black pointer-events-none select-none leading-none">
              RAD
            </div>
          </div>

          {/* 1. HALLAZGO DEL MES (ESTRUCTURA FIJA DE 4 PASOS) */}
          <section className="space-y-3">
            <HallazgoDelMes item={HALLAZGO_DEL_MES_ACTUAL} />
          </section>

          {/* 2. HISTORIAL DE MESES ANTERIORES */}
          <HistorialHallazgos items={ARCHIVO_HISTORICO_HALLAZGOS} />

          {/* 3. CURADURÍA COMPLEMENTARIA & REPRODUCTORES LIGEROS */}
          <section className="pt-6">
            <RadarSonoro />
          </section>
        </main>
      </BrutalistCoordinator>

      <BrutalistFooter />
    </div>
  );
}
