import type { Metadata } from "next";
import { RetroHomeCoordinator, GenealogyExplorer, RetroFooter } from "@/features/home-retro";
import { AmbientGlow } from "@/components/ui/ambient-glow";
import Link from "next/link";
import { ArrowLeft, GitFork, Sparkles, Building2, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Explorador Genealógico & Músicos de Sesión | Kumbia Sound",
  description:
    "Descubre los cruces de guitarristas, directores y músicos de sesión entre las agrupaciones y sellos históricos de la cumbia peruana.",
};

export default function GenealogiaPage() {
  return (
    <div className="relative min-h-screen bg-[#0D0F12] text-[#F3F4F6] selection:bg-[#E5A93C] selection:text-black">
      {/* Resplandores Atmosféricos */}
      <AmbientGlow variant="warm-solar" className="top-0 left-1/4 opacity-15" />
      <AmbientGlow variant="velvet-night" className="top-1/3 right-0 opacity-15" />

      <RetroHomeCoordinator>
        <main className="container mx-auto max-w-7xl px-4 sm:px-6 pt-6 pb-20 space-y-8">
          {/* Breadcrumb / Retorno al Home */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono text-xs">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[#9CA3AF] hover:text-[#E5A93C] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Volver a la Portada Principal</span>
            </Link>

            <div className="flex items-center gap-2 text-[#10B981]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Apartado Especializado de Genealogía</span>
            </div>
          </div>

          {/* Banner de Contexto Histórico */}
          <div className="rounded-3xl border border-[#E5A93C]/20 bg-gradient-to-r from-[#16191E] via-[#1E2229] to-[#16191E] p-8 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="max-w-3xl space-y-4 relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#E5A93C]/30 bg-[#E5A93C]/10 px-3.5 py-1 font-mono text-xs text-[#E5A93C]">
                <GitFork className="h-3.5 w-3.5" />
                <span>Archivo de Músicos de Sesión</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
                El Árbol Genealógico de la Cumbia Peruana
              </h1>

              <p className="font-sans text-sm sm:text-base text-[#9CA3AF] leading-relaxed">
                En el Perú de los años 70 y 80, los estudios de grabación de la Av. Abancay y el Rímac
                eran un hervidero creativo. Esta herramienta documenta qué guitarristas grabaron los
                punteos solistas, en qué sellos publicaron y cómo las agrupaciones se nutrieron entre
                sí.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 font-mono text-xs text-neutral-300">
                <span className="flex items-center gap-1.5 text-[#E5A93C]">
                  <Users className="h-4 w-4" /> 360+ Músicos Indexados
                </span>
                <span className="flex items-center gap-1.5 text-[#10B981]">
                  <Building2 className="h-4 w-4" /> 258+ Sellos de Época
                </span>
              </div>
            </div>

            {/* Sello decorativo sutil */}
            <div className="absolute -bottom-10 -right-10 text-white/[0.02] font-serif text-[240px] font-black pointer-events-none select-none">
              GEN
            </div>
          </div>

          {/* Visualizador Genealógico Completo */}
          <GenealogyExplorer />
        </main>
      </RetroHomeCoordinator>

      <RetroFooter />
    </div>
  );
}
