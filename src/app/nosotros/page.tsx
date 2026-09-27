import type { Metadata } from "next";
import { RetroHomeCoordinator, NosotrosManifiesto, RetroFooter } from "@/features/home-retro";
import { AmbientGlow } from "@/components/ui/ambient-glow";
import Link from "next/link";
import { ArrowLeft, Sparkles, ShieldCheck, HeartHandshake, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Nosotros & Manifiesto de Preservación | Kumbia Sound",
  description:
    "Conoce al equipo de investigación, nuestra misión de rescate cultural de los músicos de sesión y el manifiesto ético de preservación de la cumbia peruana.",
};

export default function NosotrosPage() {
  return (
    <div className="relative min-h-screen bg-[#0D0F12] text-[#F3F4F6] selection:bg-[#E5A93C] selection:text-black">
      {/* Resplandores Atmosféricos */}
      <AmbientGlow variant="warm-solar" className="top-0 left-1/3 opacity-15" />
      <AmbientGlow variant="velvet-night" className="top-1/2 right-0 opacity-15" />

      <RetroHomeCoordinator>
        <main className="container mx-auto max-w-7xl px-4 sm:px-6 pt-6 pb-20 space-y-10">
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
              <span>Apartado Institucional & Equipo</span>
            </div>
          </div>

          {/* Banner de Cabecera */}
          <div className="rounded-3xl border border-[#E5A93C]/20 bg-gradient-to-r from-[#16191E] via-[#1E2229] to-[#16191E] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="max-w-3xl space-y-4 relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#E5A93C]/30 bg-[#E5A93C]/10 px-3.5 py-1 font-mono text-xs text-[#E5A93C]">
                <Users className="h-3.5 w-3.5" />
                <span>Guardianes del Patrimonio Sonoro</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
                Quiénes Somos & Manifiesto
              </h1>

              <p className="font-sans text-sm sm:text-base text-[#9CA3AF] leading-relaxed">
                Kumbia Sound nace como una iniciativa independiente dedicada a catalogar, verificar
                y rendir homenaje a los compositores, guitarristas, percusionistas y técnicos de grabación
                que forjaron la identidad musical del Perú en discos de vinilo de 33 y 45 RPM.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 font-mono text-xs text-neutral-300">
                <span className="flex items-center gap-1.5 text-[#10B981]">
                  <ShieldCheck className="h-4 w-4" /> Archivo Abierto y No Comercial
                </span>
                <span className="flex items-center gap-1.5 text-[#E5A93C]">
                  <HeartHandshake className="h-4 w-4" /> Reconocimiento a Músicos de Sesión
                </span>
              </div>
            </div>

            {/* Sello decorativo KS en segundo plano */}
            <div className="absolute -bottom-12 -right-8 text-white/[0.03] font-serif text-[240px] font-black pointer-events-none select-none">
              KS
            </div>
          </div>

          {/* Sección de Manifiesto y Equipo */}
          <NosotrosManifiesto />
        </main>
      </RetroHomeCoordinator>

      <RetroFooter />
    </div>
  );
}
