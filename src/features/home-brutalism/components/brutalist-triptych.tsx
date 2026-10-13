import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function BrutalistTriptych() {
  const servicios = [
    { num: "01.", nombre: "ÁRBOL DE GUITARRISTAS DE SESIÓN", url: "/genealogia" },
    { num: "02.", nombre: "SINCRONIZADOR CAMELOT PARA DJS", url: "/match-bpm" },
    { num: "03.", nombre: "PRENSAJES RAROS EN 45 RPM", url: "/radar" },
    { num: "04.", nombre: "CRÓNICAS & PERIODISMO MUSICAL", url: "/blog" },
    { num: "05.", nombre: "MANIFIESTO & EQUIPO GUARDIÁN", url: "/nosotros" },
    { num: "06.", nombre: "BÓVEDA DE 719+ PRENSAJES", url: "/vinilos" },
  ];

  const techSpecs = [
    { label: "FORMATOS PRENSADOS", valor: "33 ⅓ & 45 RPM", norma: "ISO 140" },
    { label: "CURVA DE EQUALIZACIÓN", valor: "RIAA STANDARD", norma: "RIAA-54" },
    { label: "AFINACIÓN DE SESIÓN", valor: "440 HZ CONCIERTO", norma: "ISO 16" },
    { label: "SISTEMA ARMÓNICO", valor: "RUEDA CAMELOT", norma: "HARMONIC" },
    { label: "SELLOS CATALOGADOS", valor: "258 SELLOS", norma: "REG. NAC." },
    { label: "MATRICES MAESTRAS", valor: "MONO & ESTÉREO", norma: "MASTER" },
    { label: "MOTOR DE DATOS", valor: "SUPABASE POSTGRES", norma: "CLOUD" },
  ];

  return (
    <section className="w-full border-b-2 border-[#1F1305] bg-[#EDE0D0] text-[#1F1305] select-none font-mono">
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-[#1F1305]">
        
        {/* COLUMNA 1: ÍNDICE DE HERRAMIENTAS EDITORIALES */}
        <div className="lg:col-span-4 p-6 sm:p-10 space-y-6">
          <div className="flex items-center justify-between border-b-2 border-[#1F1305] pb-2 text-xs">
            <span className="font-anton text-2xl tracking-wide uppercase text-[#1F1305]">
              HERRAMIENTAS —
            </span>
            <span className="text-[10px] text-[#746B5C] font-bold">ÍNDICE I</span>
          </div>

          <div className="divide-y divide-[#1F1305]/15 text-xs">
            {servicios.map((s) => (
              <Link
                key={s.num}
                href={s.url}
                className="py-3.5 flex items-center justify-between group hover:text-[#E80000] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="font-black text-[#E80000] text-sm group-hover:underline">
                    {s.num}
                  </span>
                  <span className="font-bold tracking-tight">{s.nombre}</span>
                </div>
                <span className="text-base font-black group-hover:translate-x-1 transition-transform">
                  ↗
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* COLUMNA 2: MANIFIESTO TIPOGRÁFICO EN NARANJA SÓLIDO */}
        <div className="lg:col-span-4 bg-[#F1730C] text-[#1F1305] p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-6 relative z-10">
            <div className="border-b-2 border-[#1F1305] pb-2 flex items-center justify-between font-anton text-2xl tracking-wide uppercase text-[#1F1305]">
              <span>MANIFIESTO EDITORIAL —</span>
              <span className="text-[#E80000] font-black">§</span>
            </div>

            <div className="space-y-4 text-xs sm:text-sm font-black leading-relaxed tracking-tight text-[#1F1305]">
              <p>
                EL BUEN ARCHIVO NO SOLO EXHIBE CARÁTULAS BONITAS. RECONOCE LA MATRIZ DE CINTA,
                AL GUITARRISTA DE SESIÓN QUE NUNCA COBRÓ REGALÍAS Y AL PRENSAJE EN VINILO ORIGINAL.
              </p>
              <p>
                INVESTIGAMOS CON RIGOR HISTÓRICO.
                <br />
                CATALOGAMOS CON PRECISIÓN MATEMÁTICA.
                <br />
                PRESERVAMOS CON IDENTIDAD POPULAR.
              </p>
              <p className="pt-2 text-white font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                <span>SIN MODAS EFÍMERAS • MEMORIA VIVA.</span>
                <span className="w-2 h-2 bg-[#E80000]" />
              </p>
            </div>
          </div>

          <div className="pt-8 relative z-10">
            <Link
              href="/nosotros"
              className="inline-flex items-center gap-2 border-2 border-[#1F1305] bg-[#1F1305] px-5 py-2.5 text-xs font-bold text-white shadow-[3px_3px_0px_#EDE0D0] hover:bg-[#E80000] hover:text-white transition-all"
            >
              <span>LEER EXPEDIENTE COMPLETO</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Corte angular geométrico en la esquina inferior */}
          <div
            className="absolute bottom-0 right-0 w-14 h-14 bg-[#1F1305] pointer-events-none select-none"
            style={{ clipPath: "polygon(100% 0, 0 100%, 100% 100%)" }}
          />
        </div>

        {/* COLUMNA 3: TABULACIÓN DE ESTÁNDARES FONOGRÁFICOS ISO */}
        <div className="lg:col-span-4 p-6 sm:p-10 space-y-6 bg-[#EDE0D0]">
          <div className="flex items-center justify-between border-b-2 border-[#1F1305] pb-2 text-xs">
            <span className="font-anton text-2xl tracking-wide uppercase text-[#1F1305]">
              NORMAS &amp; ESTÁNDARES —
            </span>
            <span className="text-[10px] text-[#E80000] font-bold">TABLA ISO</span>
          </div>

          <div className="divide-y divide-[#1F1305]/15 text-xs">
            {techSpecs.map((t) => (
              <div key={t.label} className="py-2.5 flex items-center justify-between">
                <span className="text-[#5A5245] font-bold text-[11px]">{t.label}</span>
                <div className="flex items-center gap-2">
                  <span className="font-black text-[#1F1305]">{t.valor}</span>
                  <span className="text-[9px] border border-[#1F1305] bg-white px-1.5 py-0.2 font-bold text-[#E80000]">
                    {t.norma}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
