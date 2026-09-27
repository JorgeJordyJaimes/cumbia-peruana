import { HeartHandshake, ShieldCheck, Sparkles, ExternalLink } from "lucide-react";
import { equipoKumbiaSound } from "../data/cumbia-mock";

export function NosotrosManifiesto() {
  return (
    <section id="manifiesto" className="scroll-mt-24 py-16 sm:py-24 border-t border-white/5">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 space-y-16">
        {/* BLOQUE EDITORIAL / MANIFIESTO */}
        <div className="rounded-3xl border border-white/10 bg-[#16191E] p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#E5A93C]">
              <Sparkles className="h-4 w-4" />
              <span>Manifiesto Kumbia Sound</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-black text-[#F3F4F6] tracking-tight leading-tight">
              Quiénes rescatan la historia
            </h2>

            <div className="space-y-4 font-sans text-sm sm:text-base text-[#9CA3AF] leading-relaxed">
              <p>
                Durante décadas, la cumbia peruana fue consumida con fervor popular en barrios,
                provincias y rockolas, pero marginada por los registros académicos oficiales. Músicos
                de sesión extraordinarios, guitarristas criollos con oído absoluto y virtuosos del
                timbal grabaron cientos de obras maestras en tomas directas a cinta de dos canales,
                muchas veces sin recibir créditos en las galletas de los discos.
              </p>
              <p>
                <strong className="text-white">Kumbia Sound</strong> existe para dignificar su
                legado. No somos un simple catálogo: somos un archivo vivo que rescata las
                identidades, los contratos de grabación, los prensajes matrices en 45 RPM y las
                técnicas armónicas que convirtieron al Perú en el epicentro psicodélico de América del
                Sur.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-4 font-mono text-xs text-[#E5A93C]">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-[#10B981]" /> Preservación Sin Ánimo de Lucro
              </span>
              <span className="flex items-center gap-1.5">
                <HeartHandshake className="h-4 w-4 text-[#E5A93C]" /> Respeto a Derechos Morales
              </span>
            </div>
          </div>

          {/* Sello decorativo de fondo */}
          <div className="absolute -bottom-16 -right-16 text-white/[0.02] font-serif text-[280px] font-black pointer-events-none select-none">
            KS
          </div>
        </div>

        {/* MINI-CARDS DEL EQUIPO */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-[#9CA3AF]">
              Equipo de Investigación & Curaduría
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Los Guardianes del Archivo
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {equipoKumbiaSound.map((member) => (
              <div
                key={member.id}
                className="rounded-2xl border border-white/10 bg-[#16191E] p-6 space-y-4 hover:border-[#E5A93C]/40 transition-colors flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="relative h-14 w-14 rounded-2xl overflow-hidden border border-white/10 bg-[#1E2229]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={member.fotoUrl}
                        alt={member.nombre}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-serif text-lg font-bold text-white">{member.nombre}</h4>
                      <p className="font-mono text-xs text-[#E5A93C]">{member.rol}</p>
                    </div>
                  </div>

                  <p className="font-sans text-xs text-[#9CA3AF] leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center gap-3 font-mono text-[11px] text-[#9CA3AF]">
                  {member.redes.map((r, rIdx) => (
                    <a
                      key={rIdx}
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white capitalize transition-colors flex items-center gap-1"
                    >
                      <span>{r.tipo}</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
