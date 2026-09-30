import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function BrutalistTriptych() {
  const servicios = [
    { num: "01", nombre: "BÓVEDA DE 719+ VINILOS", url: "/#catalogo-vinilos" },
    { num: "02", nombre: "ÁRBOL DE GUITARRISTAS DE SESIÓN", url: "/genealogia" },
    { num: "03", nombre: "SINCRONIZADOR CAMELOT PARA DJS", url: "/match-bpm" },
    { num: "04", nombre: "PRENSAJES RAROS EN 45 RPM", url: "/radar" },
    { num: "05", nombre: "CRÓNICAS & PERIODISMO MUSICAL", url: "/blog" },
    { num: "06", nombre: "MANIFIESTO & EQUIPO GUARDIÁN", url: "/nosotros" },
  ];

  const techSpecs = [
    { label: "FORMATOS FÍSICOS", valor: "33 & 45 RPM" },
    { label: "CALIBRACIÓN DJ", valor: "PITCH ±3% / ±5%" },
    { label: "AFINACIÓN DE SESIÓN", valor: "440 HZ STANDARD" },
    { label: "SISTEMA ARMÓNICO", valor: "RUEDA CAMELOT" },
    { label: "SELLOS CATALOGADOS", valor: "258 SELLOS" },
    { label: "MASTERIZACIÓN", valor: "MONO & ESTÉREO" },
    { label: "MOTOR DE DATOS", valor: "SUPABASE POSTGRES" },
  ];

  return (
    <section className="w-full border-b-2 border-black bg-[#EAE6DF] text-black">
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-black">
        
        {/* COLUMNA 1: SERVICIOS / HERRAMIENTAS DEL ARCHIVO */}
        <div className="lg:col-span-4 p-6 sm:p-10 space-y-6">
          <div className="flex items-center gap-2 font-anton text-2xl tracking-wide uppercase">
            <span>HERRAMIENTAS —</span>
          </div>

          <div className="divide-y divide-black/15 font-mono text-xs">
            {servicios.map((s) => (
              <Link
                key={s.num}
                href={s.url}
                className="py-3.5 flex items-center justify-between group hover:text-[#F04E23] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold text-neutral-500 group-hover:text-[#F04E23]">
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
        <div className="lg:col-span-4 bg-[#F04E23] text-black p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-6 relative z-10">
            <div className="font-anton text-2xl tracking-wide uppercase">
              MANIFIESTO —
            </div>

            <div className="space-y-4 font-mono text-xs sm:text-sm font-black leading-relaxed tracking-tight">
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
              <p className="pt-2 text-white font-bold text-xs uppercase tracking-widest">
                SIN MODAS EFÍMERAS.
                <br />
                SOLO HISTORIA SONORA.
              </p>
            </div>
          </div>

          <div className="pt-8 relative z-10">
            <Link
              href="/nosotros"
              className="inline-flex items-center gap-2 border-2 border-black bg-black px-5 py-2.5 font-mono text-xs font-bold text-white shadow-[3px_3px_0px_#fff] hover:bg-white hover:text-black hover:border-black transition-all"
            >
              <span>CONOCER AL EQUIPO</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          {/* CORTE DIAGONAL / TRIÁNGULO NEGRO EN LA ESQUINA INFERIOR DERECHA (como en el afiche) */}
          <div
            className="absolute bottom-0 right-0 w-16 h-16 bg-black pointer-events-none select-none"
            style={{ clipPath: "polygon(100% 0, 0 100%, 100% 100%)" }}
          />
        </div>

        {/* COLUMNA 3: ESPECIFICACIONES TÉCNICAS (TECH STACK) */}
        <div className="lg:col-span-4 p-6 sm:p-10 space-y-6 bg-[#EAE6DF]">
          <div className="flex items-center gap-2 font-anton text-2xl tracking-wide uppercase">
            <span>REGISTRO TÉCNICO —</span>
          </div>

          <div className="divide-y divide-black/15 font-mono text-xs">
            {techSpecs.map((t, idx) => (
              <div key={idx} className="py-3.5 flex items-center justify-between">
                <span className="font-bold tracking-wider text-neutral-800">{t.label}</span>
                <div className="flex items-center gap-2 text-right">
                  <span className="text-[10px] text-[#F04E23]">■</span>
                  <span className="text-neutral-600 font-semibold">{t.valor}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-black/20 text-[11px] font-mono text-neutral-600 flex items-center justify-between">
            <span>CATÁLOGO FÍSICO Y METADATOS</span>
            <span className="font-bold text-black">EDICIÓN 2026</span>
          </div>
        </div>

      </div>
    </section>
  );
}
