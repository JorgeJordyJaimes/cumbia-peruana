import Link from "next/link";
import { Sparkles, ShieldCheck, HeartHandshake, ArrowRight, Users } from "lucide-react";
import { equipoKumbiaSound } from "../data/cumbia-mock";

export function NosotrosHighlight() {
  return (
    <section id="manifiesto" className="scroll-mt-24 py-16 sm:py-20 border-t border-white/5 bg-[#0D0F12]">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#16191E] via-[#1E2229] to-[#16191E] p-8 sm:p-12 lg:p-14 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#10B981]/30 bg-[#10B981]/10 px-3.5 py-1 font-mono text-xs text-[#10B981]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Manifiesto de Rescate Cultural</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-black text-[#F3F4F6] tracking-tight leading-tight">
              Quiénes rescatan la historia analógica
            </h2>

            <p className="font-sans text-sm sm:text-base text-[#9CA3AF] leading-relaxed">
              Durante décadas, la cumbia peruana fue consumida con fervor popular en barrios,
              provincias y rockolas, pero marginada por los registros académicos oficiales. Músicos
              de sesión extraordinarios y guitarristas con oído absoluto grabaron cientos de obras
              maestras sin recibir créditos en las galletas de los discos.
            </p>

            <p className="font-sans text-sm sm:text-base text-[#9CA3AF] leading-relaxed">
              <strong className="text-white">Kumbia Sound</strong> existe como un archivo vivo
              independiente para dignificar su memoria, reconstruir sus árboles genealógicos y
              preservar las matrices en vinilos de 45 RPM y LPs para las futuras generaciones.
            </p>

            {/* Badges de Compromiso Ético */}
            <div className="pt-2 flex flex-wrap gap-4 font-mono text-xs text-neutral-300">
              <span className="flex items-center gap-1.5 text-[#10B981]">
                <ShieldCheck className="h-4 w-4" /> Preservación Sin Ánimo de Lucro
              </span>
              <span className="flex items-center gap-1.5 text-[#E5A93C]">
                <HeartHandshake className="h-4 w-4" /> Respeto a Derechos Morales
              </span>
            </div>

            {/* Vista previa del Equipo & Botón al Apartado */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {equipoKumbiaSound.map((m) => (
                    <div
                      key={m.id}
                      className="h-10 w-10 rounded-full border-2 border-[#16191E] overflow-hidden bg-neutral-800"
                      title={`${m.nombre} - ${m.rol}`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={m.fotoUrl} alt={m.nombre} className="h-full w-full object-cover" />
                    </div>
                  ))}
                </div>
                <div className="font-mono text-xs">
                  <p className="text-white font-bold flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-[#E5A93C]" /> Guardianes del Archivo
                  </p>
                  <p className="text-[#9CA3AF] text-[11px]">Equipo de investigación & curaduría</p>
                </div>
              </div>

              <Link
                href="/nosotros"
                className="inline-flex items-center gap-2 rounded-xl bg-[#E5A93C] px-6 py-3 font-mono text-xs font-bold text-black shadow-lg shadow-[#E5A93C]/20 hover:bg-[#d6992d] hover:scale-105 transition-all shrink-0"
              >
                <span>Conocer Manifiesto y Equipo Completo</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Sello decorativo KS de fondo */}
          <div className="absolute -bottom-16 -right-16 text-white/[0.02] font-serif text-[280px] font-black pointer-events-none select-none">
            KS
          </div>
        </div>
      </div>
    </section>
  );
}
