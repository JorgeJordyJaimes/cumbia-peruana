import type { Metadata } from "next";
import { BrutalistCoordinator, BrutalistFooter } from "@/features/home-brutalism";
import { GenealogyExplorer } from "@/features/home-retro";
import Link from "next/link";
import { ArrowLeft, GitFork, Sparkles, Building2, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Explorador Genealógico & Músicos de Sesión | Kumbia Sound",
  description:
    "Descubre los cruces de guitarristas, directores y músicos de sesión entre las agrupaciones y sellos históricos de la cumbia peruana.",
};

export default function GenealogiaPage() {
  return (
    <div className="relative min-h-screen bg-[#EDE0D0] text-[#1F1305] selection:bg-[#F1730C] selection:text-white">
      <BrutalistCoordinator>
        <main className="container mx-auto max-w-7xl px-4 sm:px-6 pt-6 pb-20 space-y-8">
          {/* Breadcrumb / Retorno al Home */}
          <div className="flex items-center justify-between border-b-2 border-[#1F1305] pb-4 font-mono text-xs">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-bold text-[#1F1305] hover:text-[#E80000] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>← Volver a la Portada Principal</span>
            </Link>

            <div className="flex items-center gap-2 border border-[#1F1305] bg-white px-2.5 py-1 text-[#E80000] font-bold shadow-[2px_2px_0px_#1F1305]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>01 / ARCHIVO GENEALÓGICO</span>
            </div>
          </div>

          {/* Banner Hero Brutalista */}
          <div className="border-2 border-[#1F1305] bg-[#1F1305] text-[#EDE0D0] p-8 sm:p-12 shadow-[6px_6px_0px_#E80000] relative overflow-hidden">
            <div className="max-w-3xl space-y-5 relative z-10">
              <div className="inline-flex items-center gap-2 border-2 border-[#EDE0D0] bg-[#F1730C] px-3.5 py-1 font-mono text-xs font-bold text-white shadow-[2px_2px_0px_#EDE0D0]">
                <GitFork className="h-3.5 w-3.5" />
                <span>ARCHIVO DE MÚSICOS DE SESIÓN • 1968–2005</span>
              </div>

              <h1 className="font-cooper text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                El Árbol Genealógico de la Cumbia Peruana
              </h1>

              <p className="font-sans text-sm sm:text-base text-[#EDE0D0]/80 leading-relaxed max-w-2xl">
                En el Perú de los años 70 y 80, los estudios de grabación de la Av. Abancay y el Rímac
                eran un hervidero creativo. Esta herramienta documenta qué guitarristas grabaron los
                punteos solistas, en qué sellos publicaron y cómo las agrupaciones se nutrieron entre
                sí.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 font-mono text-xs">
                <span className="flex items-center gap-2 border border-[#EDE0D0]/30 bg-white/10 px-3 py-1 font-bold text-[#F8C800]">
                  <Users className="h-4 w-4 text-[#F8C800]" /> 360+ Músicos Indexados
                </span>
                <span className="flex items-center gap-2 border border-[#EDE0D0]/30 bg-white/10 px-3 py-1 font-bold text-white">
                  <Building2 className="h-4 w-4 text-[#F1730C]" /> 258+ Sellos de Época
                </span>
              </div>
            </div>

            {/* Sello decorativo sutil en segundo plano */}
            <div className="absolute -bottom-8 -right-6 text-white/[0.04] font-anton text-[220px] font-black pointer-events-none select-none leading-none">
              GEN
            </div>
          </div>

          {/* Visualizador Genealógico Completo */}
          <GenealogyExplorer />
        </main>
      </BrutalistCoordinator>

      <BrutalistFooter />
    </div>
  );
}
