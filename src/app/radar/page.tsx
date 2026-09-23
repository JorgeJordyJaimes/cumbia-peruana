import type { Metadata } from "next";
import { RetroHomeCoordinator, RadarSonoro, RetroFooter } from "@/features/home-retro";
import { AmbientGlow } from "@/components/ui/ambient-glow";
import Link from "next/link";
import { ArrowLeft, Radio, Sparkles, Disc3, Music } from "lucide-react";

export const metadata: Metadata = {
  title: "El Radar Sonoro // Curaduría de Vinilos | Kumbia Sound",
  description:
    "Curaduría semanal y mensual de grabaciones maestras en 45 RPM, álbumes esenciales de cumbia peruana y playlists oficiales.",
};

export default function RadarPage() {
  return (
    <div className="relative min-h-screen bg-[#0D0F12] text-[#F3F4F6] selection:bg-[#E5A93C] selection:text-black">
      {/* Resplandores Atmosféricos */}
      <AmbientGlow variant="warm-solar" className="top-0 left-1/3 opacity-15" />
      <AmbientGlow variant="velvet-night" className="top-1/2 left-0 opacity-15" />

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
              <span>Apartado de Curaduría & Playlists</span>
            </div>
          </div>

          {/* Banner de Cabecera */}
          <div className="rounded-3xl border border-[#E5A93C]/20 bg-gradient-to-r from-[#16191E] via-[#1E2229] to-[#16191E] p-8 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="max-w-3xl space-y-4 relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#10B981]/30 bg-[#10B981]/10 px-3.5 py-1 font-mono text-xs text-[#10B981]">
                <Radio className="h-3.5 w-3.5" />
                <span>Curaduría Especializada & Archivo Vivo</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
                El Radar Sonoro
              </h1>

              <p className="font-sans text-sm sm:text-base text-[#9CA3AF] leading-relaxed">
                Cada semana y mes seleccionamos los prensajes más codiciados por tornamesistas
                internacionales, discos de edición limitada y grabaciones que redefinieron la
                psicodelia tropical latinoamericana.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 font-mono text-xs text-neutral-300">
                <span className="flex items-center gap-1.5 text-[#E5A93C]">
                  <Disc3 className="h-4 w-4" /> Prensajes Originales en 45s y LPs
                </span>
                <span className="flex items-center gap-1.5 text-[#10B981]">
                  <Music className="h-4 w-4" /> Lite Embeds de Carga Instantánea
                </span>
              </div>
            </div>

            {/* Sello decorativo de fondo */}
            <div className="absolute -bottom-10 -right-10 text-white/[0.02] font-serif text-[240px] font-black pointer-events-none select-none">
              RAD
            </div>
          </div>

          {/* COMPONENTE RADAR CON PESTAÑAS Y REPRODUCTORES LIGEROS */}
          <RadarSonoro />
        </main>
      </RetroHomeCoordinator>

      <RetroFooter />
    </div>
  );
}
