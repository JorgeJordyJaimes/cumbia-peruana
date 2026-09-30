import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function BrutalistTriptych() {
  const servicios = [
    { num: "01", nombre: "BÓVEDA DE 719+ VINILOS", url: "/#catalogo-vinilos", dot: "#F1730C" },
    { num: "02", nombre: "ÁRBOL DE GUITARRISTAS DE SESIÓN", url: "/genealogia", dot: "#E80000" },
    { num: "03", nombre: "SINCRONIZADOR CAMELOT PARA DJS", url: "/match-bpm", dot: "#2EF0E8" },
    { num: "04", nombre: "PRENSAJES RAROS EN 45 RPM", url: "/radar", dot: "#F1730C" },
    { num: "05", nombre: "CRÓNICAS & PERIODISMO MUSICAL", url: "/blog", dot: "#1F1305" },
    { num: "06", nombre: "MANIFIESTO & EQUIPO GUARDIÁN", url: "/nosotros", dot: "#E80000" },
  ];

  const techSpecs = [
    { label: "FORMATOS FÍSICOS", valor: "33 & 45 RPM", dot: "#E80000" },
    { label: "CALIBRACIÓN DJ", valor: "PITCH ±3% / ±5%", dot: "#2EF0E8" },
    { label: "AFINACIÓN DE SESIÓN", valor: "440 HZ STANDARD", dot: "#2EF0E8" },
    { label: "SISTEMA ARMÓNICO", valor: "RUEDA CAMELOT", dot: "#2EF0E8" },
    { label: "SELLOS CATALOGADOS", valor: "258 SELLOS", dot: "#E80000" },
    { label: "MASTERIZACIÓN", valor: "MONO & ESTÉREO", dot: "#F1730C" },
    { label: "MOTOR DE DATOS", valor: "SUPABASE POSTGRES", dot: "#2EF0E8" },
  ];

  return (
    <section className="w-full border-b-2 border-[#1F1305] bg-[#EDE0D0] text-[#1F1305]">
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-[#1F1305]">
        
        {/* COLUMNA 1: SERVICIOS / HERRAMIENTAS DEL ARCHIVO */}
        <div className="lg:col-span-4 p-6 sm:p-10 space-y-6">
          <div className="flex items-center gap-2 font-anton text-2xl tracking-wide uppercase text-[#1F1305]">
            <span>HERRAMIENTAS —</span>
          </div>

          <div className="divide-y divide-[#1F1305]/15 font-mono text-xs">
            {servicios.map((s) => (
              <Link
                key={s.num}
                href={s.url}
                className="py-3.5 flex items-center justify-between group hover:text-[#E80000] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold text-[#8E8478] group-hover:text-[#E80000]">
                    {s.num}
                  </span>
                  <span className="font-bold tracking-wider">{s.nombre}</span>
                </div>
                <span className="text-lg font-bold group-hover:translate-x-1 transition-transform">
                  +
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* COLUMNA 2: BLOQUE NARANJA SÓLIDO (MANIFIESTO) CON CORTE DIAGONAL */}
        <div className="lg:col-span-4 bg-[#F1730C] text-[#1F1305] p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-6 relative z-10">
            <div className="font-anton text-2xl tracking-wide uppercase text-[#1F1305] flex items-center gap-2">
              <span>MANIFIESTO —</span>
              <span className="text-[#E80000] font-black">★</span>
            </div>

            <div className="space-y-4 font-mono text-xs sm:text-sm font-black leading-relaxed tracking-tight text-[#1F1305]">
              <p>
                EL BUEN ARCHIVO NO SOLO EXHIBE CARÁTULAS BONITAS. RECONOCE LA MATRIZ DE CINTA,
                AL GUITARRISTA DE SESIÓN QUE NUNCA COBRÓ REGALÍAS Y AL PRENSAJE EN VINILO ORIGINAL.
              </p>
              <p>
                INVESTIGAMOS CON RIGOR.
                <br />
                CATALOGAMOS CON PRECISIÓN.
                <br />
                PRESERVAMOS CON ORGULLO.
              </p>
              <p className="pt-2 text-white font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                <span>SIN MODAS EFÍMERAS.</span>
                <span className="w-2 h-2 rounded-full bg-[#2EF0E8]" />
              </p>
            </div>
          </div>

          <div className="pt-8 relative z-10">
            <Link
              href="/nosotros"
              className="inline-flex items-center gap-2 border-2 border-[#1F1305] bg-[#1F1305] px-5 py-2.5 font-mono text-xs font-bold text-white shadow-[3px_3px_0px_#EDE0D0] hover:bg-[#E80000] hover:text-white hover:border-[#1F1305] transition-all"
            >
              <span>CONOCER AL EQUIPO</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          {/* CORTE DIAGONAL / TRIÁNGULO EN LA ESQUINA INFERIOR DERECHA */}
          <div
            className="absolute bottom-0 right-0 w-16 h-16 bg-[#1F1305] pointer-events-none select-none"
            style={{ clipPath: "polygon(100% 0, 0 100%, 100% 100%)" }}
          />
        </div>

        {/* COLUMNA 3: ESPECIFICACIONES TÉCNICAS (TECH STACK) CON LEDS ROJO / CYAN */}
        <div className="lg:col-span-4 p-6 sm:p-10 space-y-6 bg-[#EDE0D0]">
          <div className="flex items-center justify-between font-anton text-2xl tracking-wide uppercase text-[#1F1305]">
            <span>REGISTRO TÉCNICO —</span>
            <span className="font-mono text-[10px] tracking-normal font-normal text-[#2EF0E8] bg-[#1F1305] px-2 py-0.5 border border-[#1F1305]">
              VU • L/R
            </span>
          </div>

          <div className="divide-y divide-[#1F1305]/15 font-mono text-xs">
            {techSpecs.map((t, idx) => (
              <div key={idx} className="py-3.5 flex items-center justify-between">
                <span className="font-bold tracking-wider text-[#4A4036]">{t.label}</span>
                <div className="flex items-center gap-2 text-right">
                  <span className="text-[11px]" style={{ color: t.dot }}>
                    ■
                  </span>
                  <span className="text-[#746B5C] font-semibold">{t.valor}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[#1F1305]/20 text-[11px] font-mono text-[#746B5C] flex items-center justify-between">
            <span>CATÁLOGO FÍSICO Y METADATOS</span>
            <span className="font-bold text-[#1F1305]">EDICIÓN 2026</span>
          </div>
        </div>

      </div>
    </section>
  );
}
