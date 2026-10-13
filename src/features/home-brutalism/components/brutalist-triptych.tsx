import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function BrutalistTriptych() {
  const servicios = [
    { num: "01", nombre: "BÓVEDA DE 719+ VINILOS", url: "/vinilos", dot: "#F1730C" },
    { num: "02", nombre: "ÁRBOL DE GUITARRISTAS DE SESIÓN", url: "/genealogia", dot: "#E80000" },
    { num: "03", nombre: "SINCRONIZADOR CAMELOT PARA DJS", url: "/match-bpm", dot: "#E80000" },
    { num: "04", nombre: "PRENSAJES RAROS EN 45 RPM", url: "/radar", dot: "#F1730C" },
    { num: "05", nombre: "CRÓNICAS & PERIODISMO MUSICAL", url: "/blog", dot: "#1F1305" },
    { num: "06", nombre: "MANIFIESTO & EQUIPO GUARDIÁN", url: "/nosotros", dot: "#E80000" },
  ];

  const techSpecs = [
    { label: "FORMATOS FÍSICOS", valor: "33 & 45 RPM", dot: "#E80000" },
    { label: "CALIBRACIÓN DJ", valor: "PITCH ±3% / ±5%", dot: "#E80000" },
    { label: "AFINACIÓN DE SESIÓN", valor: "440 HZ STANDARD", dot: "#F1730C" },
    { label: "SISTEMA ARMÓNICO", valor: "RUEDA CAMELOT", dot: "#E80000" },
    { label: "SELLOS CATALOGADOS", valor: "258 SELLOS", dot: "#F1730C" },
    { label: "MASTERIZACIÓN", valor: "MONO & ESTÉREO", dot: "#E80000" },
    { label: "MOTOR DE DATOS", valor: "SUPABASE POSTGRES", dot: "#E80000" },
  ];

  return (
    <section className="w-full border-b border-[#1F1305] bg-[#EDE0D0] text-[#1F1305] select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#1F1305]">
        
        {/* COLUMNA 1: HERRAMIENTAS Y MÓDULOS DEL ARCHIVO */}
        <div className="lg:col-span-4 p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-[#1F1305]/20 pb-3">
            <span className="font-mono text-xs font-bold text-[#1F1305] tracking-widest uppercase flex items-center gap-2">
              <span className="text-[#E80000]">+</span>
              [SECCIÓN 01] HERRAMIENTAS
            </span>
            <span className="font-mono text-[9px] text-[#746B5C]">ESCALA 1:1</span>
          </div>

          <div className="divide-y divide-[#1F1305]/15 font-mono text-xs">
            {servicios.map((s) => (
              <Link
                key={s.num}
                href={s.url}
                className="py-3 flex items-center justify-between group hover:bg-[#1F1305] hover:text-[#EDE0D0] px-2 -mx-2 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <span className="font-bold text-[#E80000]">
                    [{s.num}]
                  </span>
                  <span className="font-bold tracking-wider">{s.nombre}</span>
                </div>
                <span className="text-xs font-mono font-bold group-hover:translate-x-0.5 transition-transform">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* COLUMNA 2: BLOQUE NARANJA SÓLIDO (MANIFIESTO) CON RETÍCULA TÉCNICA */}
        <div className="lg:col-span-4 bg-[#F1730C] text-[#1F1305] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-5 relative z-10">
            <div className="flex items-center justify-between border-b border-[#1F1305]/30 pb-3 font-mono text-xs font-black tracking-widest uppercase">
              <span className="flex items-center gap-1.5">
                <span>[SECCIÓN 02] MANIFIESTO</span>
              </span>
              <span className="bg-[#1F1305] text-[#EDE0D0] px-1.5 py-0.5 text-[9px]">DOC-OFICIAL</span>
            </div>

            <div className="space-y-3 font-mono text-xs sm:text-[13px] font-bold leading-relaxed tracking-tight text-[#1F1305]">
              <p>
                EL ARCHIVO FONOGRÁFICO DEBE CERTIFICAR LA MATRIZ DE CINTA,
                AL MÚSICO DE SESIÓN QUE GRABÓ DE INCÓGNITO Y AL PRENSAJE EN VINILO ORIGINAL.
              </p>
              <div className="border-l-2 border-[#1F1305] pl-3 py-1 space-y-1 text-[#1F1305]">
                <p>• INVESTIGACIÓN DOCUMENTAL FORENSE.</p>
                <p>• CATALOGACIÓN MECÁNICA EXACTA.</p>
                <p>• PRESERVACIÓN PATRIMONIAL SIN FILTROS.</p>
              </div>
            </div>
          </div>

          <div className="pt-6 relative z-10">
            <Link
              href="/nosotros"
              className="inline-flex items-center gap-2 border border-[#1F1305] bg-[#1F1305] px-4 py-2.5 font-mono text-xs font-bold text-[#EDE0D0] hover:bg-[#E80000] hover:text-white transition-colors"
            >
              <span>[EXPEDIENTE] EQUIPO GUARDIÁN</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* COTA EN ESQUINA INFERIOR DERECHA */}
          <div
            className="absolute bottom-0 right-0 w-12 h-12 bg-[#1F1305] pointer-events-none select-none opacity-20"
            style={{ clipPath: "polygon(100% 0, 0 100%, 100% 100%)" }}
          />
        </div>

        {/* COLUMNA 3: ESPECIFICACIONES TÉCNICAS (TECH STACK) ESTILO HOJA DE DATOS */}
        <div className="lg:col-span-4 p-6 sm:p-8 space-y-6 bg-[#EDE0D0]">
          <div className="flex items-center justify-between border-b border-[#1F1305]/20 pb-3 font-mono text-xs font-bold tracking-widest text-[#1F1305] uppercase">
            <span className="flex items-center gap-2">
              <span className="text-[#E80000]">+</span>
              [SECCIÓN 03] NORMAS TÉCNICAS
            </span>
            <span className="border border-[#1F1305] bg-white px-1.5 py-0.5 text-[9px] text-[#E80000]">
              NORMAS RIAA
            </span>
          </div>

          <div className="divide-y divide-[#1F1305]/15 font-mono text-xs">
            {techSpecs.map((t, idx) => (
              <div key={idx} className="py-2.5 flex items-center justify-between">
                <span className="font-bold tracking-wider text-[#4A4036]">{t.label}</span>
                <div className="flex items-center gap-2 text-right">
                  <span className="text-[10px]" style={{ color: t.dot }}>
                    +
                  </span>
                  <span className="text-[#1F1305] font-bold">{t.valor}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-[#1F1305]/20 text-[10px] font-mono text-[#746B5C] flex items-center justify-between">
            <span>NORMA METROLÓGICA FONOGRÁFICA</span>
            <span className="font-bold text-[#1F1305]">EDICIÓN PERUANA 1968–2005</span>
          </div>
        </div>

      </div>
    </section>
  );
}
