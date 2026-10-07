import { HeartHandshake, ShieldCheck, Sparkles, ExternalLink } from "lucide-react";
import { equipoKumbiaSound } from "../data/cumbia-mock";

export function NosotrosManifiesto() {
  return (
    <section id="manifiesto" className="scroll-mt-24 py-12 sm:py-20 border-t-2 border-[#1F1305]">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 space-y-16">
        {/* BLOQUE EDITORIAL / MANIFIESTO */}
        <div className="border-2 border-[#1F1305] bg-white text-[#1F1305] p-8 sm:p-12 lg:p-16 shadow-[8px_8px_0px_#1F1305] relative overflow-hidden">
          <div className="max-w-3xl space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 border border-[#1F1305] bg-[#F1730C] px-3 py-1 font-mono text-xs font-bold text-white shadow-[2px_2px_0px_#1F1305]">
              <Sparkles className="h-4 w-4" />
              <span>MANIFIESTO KUMBIA SOUND</span>
            </div>

            <h2 className="font-cooper text-3xl sm:text-5xl font-black text-[#1F1305] tracking-tight leading-tight">
              Quiénes rescatan la historia
            </h2>

            <div className="space-y-4 font-sans text-sm sm:text-base text-[#5A5245] leading-relaxed">
              <p>
                Durante décadas, la cumbia peruana fue consumida con fervor popular en barrios,
                provincias y rockolas, pero marginada por los registros académicos oficiales. Músicos
                de sesión extraordinarios, guitarristas criollos con oído absoluto y virtuosos del
                timbal grabaron cientos de obras maestras en tomas directas a cinta de dos canales,
                muchas veces sin recibir créditos en las galletas de los discos.
              </p>
              <p>
                <strong className="text-[#1F1305] font-bold">Kumbia Sound</strong> existe para dignificar su
                legado. No somos un simple catálogo: somos un archivo vivo que rescata las
                identidades, los contratos de grabación, los prensajes matrices en 45 RPM y las
                técnicas armónicas que convirtieron al Perú en el epicentro psicodélico de América del
                Sur.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-4 font-mono text-xs font-bold text-[#1F1305]">
              <span className="flex items-center gap-1.5 border border-[#1F1305] bg-[#EDE0D0] px-3 py-1 shadow-[2px_2px_0px_#1F1305]">
                <ShieldCheck className="h-4 w-4 text-[#10B981]" /> Preservación Sin Ánimo de Lucro
              </span>
              <span className="flex items-center gap-1.5 border border-[#1F1305] bg-[#EDE0D0] px-3 py-1 shadow-[2px_2px_0px_#1F1305]">
                <HeartHandshake className="h-4 w-4 text-[#E80000]" /> Respeto a Derechos Morales
              </span>
            </div>
          </div>

          {/* Sello decorativo de fondo */}
          <div className="absolute -bottom-12 -right-8 text-black/[0.03] font-anton text-[260px] font-black pointer-events-none select-none leading-none">
            KS
          </div>
        </div>

        {/* MINI-CARDS DEL EQUIPO */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-[#746B5C] font-bold">
              Equipo de Investigación & Curaduría
            </span>
            <h3 className="font-cooper text-2xl sm:text-4xl font-bold text-[#1F1305]">
              Los Guardianes del Archivo
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {equipoKumbiaSound.map((member) => (
              <div
                key={member.id}
                className="border-2 border-[#1F1305] bg-white p-6 space-y-4 shadow-[4px_4px_0px_#1F1305] hover:shadow-[4px_4px_0px_#E80000] transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="relative h-14 w-14 border-2 border-[#1F1305] bg-[#EDE0D0] shadow-[2px_2px_0px_#1F1305] overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={member.fotoUrl}
                        alt={member.nombre}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-cooper text-lg font-bold text-[#1F1305]">{member.nombre}</h4>
                      <p className="font-mono text-xs font-bold text-[#E80000]">{member.rol}</p>
                    </div>
                  </div>

                  <p className="font-sans text-xs text-[#5A5245] leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-3 border-t-2 border-[#1F1305]/10 flex items-center gap-3 font-mono text-[11px] text-[#746B5C]">
                  {member.redes.map((r, rIdx) => (
                    <a
                      key={rIdx}
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#E80000] font-bold capitalize transition-colors flex items-center gap-1"
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
