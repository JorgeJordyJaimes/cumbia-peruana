import type { Metadata } from "next";
import { BrutalistCoordinator, BrutalistFooter } from "@/features/home-brutalism";
import { NosotrosManifiesto } from "@/features/home-retro";
import Link from "next/link";
import { ArrowLeft, Sparkles, ShieldCheck, HeartHandshake, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Nosotros & Manifiesto de Preservación | Kumbia Sound",
  description:
    "Conoce al equipo de investigación, nuestra misión de rescate cultural de los músicos de sesión y el manifiesto ético de preservación de la cumbia peruana.",
};

export default function NosotrosPage() {
  return (
    <div className="relative min-h-screen bg-[#EDE0D0] text-[#1F1305] selection:bg-[#F1730C] selection:text-white">
      <BrutalistCoordinator>
        <main className="container mx-auto max-w-7xl px-4 sm:px-6 pt-6 pb-20 space-y-10">
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
              <span>05 / ARCHIVO & MANIFIESTO</span>
            </div>
          </div>

          {/* Banner Hero Brutalista */}
          <div className="border-2 border-[#1F1305] bg-[#1F1305] text-[#EDE0D0] p-8 sm:p-12 shadow-[6px_6px_0px_#E80000] relative overflow-hidden">
            <div className="max-w-3xl space-y-5 relative z-10">
              <div className="inline-flex items-center gap-2 border-2 border-[#EDE0D0] bg-[#E80000] px-3.5 py-1 font-mono text-xs font-bold text-white shadow-[2px_2px_0px_#EDE0D0]">
                <Users className="h-3.5 w-3.5" />
                <span>GUARDIANES DEL PATRIMONIO SONORO NACIONAL</span>
              </div>

              <h1 className="font-cooper text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                Quiénes Somos & Manifiesto
              </h1>

              <p className="font-sans text-sm sm:text-base text-[#EDE0D0]/80 leading-relaxed max-w-2xl">
                Kumbia Sound nace como una iniciativa independiente dedicada a catalogar, verificar
                y rendir homenaje a los compositores, guitarristas, percusionistas y técnicos de grabación
                que forjaron la identidad musical del Perú en discos de vinilo de 33 y 45 RPM.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 font-mono text-xs">
                <span className="flex items-center gap-2 border border-[#EDE0D0]/30 bg-white/10 px-3 py-1 font-bold text-[#10B981]">
                  <ShieldCheck className="h-4 w-4 text-[#10B981]" /> Archivo Abierto y No Comercial
                </span>
                <span className="flex items-center gap-2 border border-[#EDE0D0]/30 bg-white/10 px-3 py-1 font-bold text-[#F8C800]">
                  <HeartHandshake className="h-4 w-4 text-[#F8C800]" /> Reconocimiento a Músicos de Sesión
                </span>
              </div>
            </div>

            {/* Sello decorativo KS en segundo plano */}
            <div className="absolute -bottom-8 -right-6 text-white/[0.04] font-anton text-[220px] font-black pointer-events-none select-none leading-none">
              KS
            </div>
          </div>

          {/* Sección de Manifiesto y Equipo */}
          <NosotrosManifiesto />
        </main>
      </BrutalistCoordinator>

      <BrutalistFooter />
    </div>
  );
}
