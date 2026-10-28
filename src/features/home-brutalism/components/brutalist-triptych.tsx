import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function BrutalistTriptych() {
  const servicios = [
    { num: "EXP. 01", nombre: "ÁRBOL DE GUITARRISTAS DE SESIÓN", url: "/genealogia" },
    { num: "EXP. 02", nombre: "SINCRONIZADOR CAMELOT PARA DJS", url: "/match-bpm" },
    { num: "EXP. 03", nombre: "PRENSAJES RAROS EN 45 RPM", url: "/radar" },
    { num: "EXP. 04", nombre: "INFORMES DE CAMPO & CRÓNICAS", url: "/blog" },
    { num: "EXP. 05", nombre: "MANIFIESTO & EQUIPO DE CUSTODIA", url: "/nosotros" },
    { num: "EXP. 06", nombre: "BÓVEDA DE 719+ EVIDENCIAS", url: "/vinilos" },
  ];

  const techSpecs = [
    { label: "FORMATOS BAJO CUSTODIA", valor: "33 ⅓ & 45 RPM", sello: "VERIFICADO" },
    { label: "CURVA DE REPRODUCCIÓN", valor: "RIAA STANDARD", sello: "CALIBRADO" },
    { label: "AFINACIÓN DE SESIÓN", valor: "440 HZ EXACTO", sello: "CERTIFICADO" },
    { label: "SISTEMA ARMÓNICO", valor: "RUEDA CAMELOT", sello: "ANALIZADO" },
    { label: "SELLOS CATALOGADOS", valor: "258 SELLOS", sello: "REGISTRADO" },
    { label: "MATRICES MAESTRAS", valor: "MONO & ESTÉREO", sello: "PRESERVADO" },
    { label: "BASE DE DATOS", valor: "SUPABASE POSTGRES", sello: "ACTIVO" },
  ];

  return (
    <section className="w-full border-b-2 border-[#1F1305] bg-[#EDE0D0] brutalist-dots-light text-[#1F1305] select-none font-mono">
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-[#1F1305]">
        
        {/* COLUMNA 1: ÍNDICE DE EXPEDIENTES Y LEGAJOS */}
        <div className="lg:col-span-4 p-6 sm:p-10 space-y-6">
          <div className="flex items-center justify-between border-b-2 border-[#1F1305] pb-2 text-xs">
            <span className="font-anton text-2xl tracking-wide uppercase text-[#1F1305]">
              EXPEDIENTES —
            </span>
            <span className="text-[11px] text-[#665D4F] font-bold">ÍNDICE 01–06</span>
          </div>

          <div className="divide-y-2 divide-[#1F1305] text-xs">
            {servicios.map((s) => (
              <Link
                key={s.num}
                href={s.url}
                className="py-3.5 flex items-center justify-between group hover:text-[#E80000] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <span className="font-black text-[#E80000] text-xs border border-[#1F1305] bg-white px-1.5 py-0.2 shadow-[1px_1px_0px_#1F1305]">
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

        {/* COLUMNA 2: MANIFIESTO DE RESCATE EN NARANJA SÓLIDO */}
        <div className="lg:col-span-4 bg-[#F1730C] brutalist-dots-orange text-[#1F1305] p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-6 relative z-10">
            <div className="border-b-2 border-[#1F1305] pb-2 flex items-center justify-between font-anton text-2xl tracking-wide uppercase text-[#1F1305]">
              <span>ACTA PATRIMONIAL —</span>
              <span className="text-[#E80000] font-black">★</span>
            </div>

            <div className="space-y-4 text-xs sm:text-sm font-black leading-relaxed tracking-tight text-[#1F1305]">
              <p>
                EL ARCHIVO NO SOLO EXHIBE CARÁTULAS BONITAS. RECONOCE LA MATRIZ DE CINTA,
                AL GUITARRISTA DE SESIÓN QUE NUNCA COBRÓ REGALÍAS Y AL PRENSAJE EN VINILO ORIGINAL.
              </p>
              <p className="border-l-2 border-[#1F1305] pl-2.5 text-white">
                INVESTIGAMOS CON RIGOR POLICIAL Y ARCHIVÍSTICO.
                <br />
                CATALOGAMOS CON PRECISIÓN MATEMÁTICA.
                <br />
                DESCLASIFICAMOS PARA LA MEMORIA COLECTIVA.
              </p>
              <p className="pt-2 text-[#1F1305] font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                <span>MEMORIA INCLAUDICABLE.</span>
                <span className="w-2 h-2 bg-[#E80000]" />
              </p>
            </div>
          </div>

          <div className="pt-8 relative z-10">
            <Link
              href="/nosotros"
              className="inline-flex items-center gap-2 border-2 border-[#1F1305] bg-[#1F1305] px-5 py-2.5 text-xs font-bold text-white shadow-[3px_3px_0px_#EDE0D0] hover:bg-[#E80000] hover:text-white transition-all"
            >
              <span>LEER LEGAJO COMPLETO</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Corte angular en la esquina */}
          <div
            className="absolute bottom-0 right-0 w-14 h-14 bg-[#1F1305] pointer-events-none select-none"
            style={{ clipPath: "polygon(100% 0, 0 100%, 100% 100%)" }}
          />
        </div>

        {/* COLUMNA 3: REGISTRO DE NORMAS DE CONSERVACIÓN Y PARÁMETROS */}
        <div className="lg:col-span-4 p-6 sm:p-10 space-y-6 bg-[#EDE0D0]">
          <div className="flex items-center justify-between border-b-2 border-[#1F1305] pb-2 text-xs">
            <span className="font-anton text-2xl tracking-wide uppercase text-[#1F1305]">
              NORMAS DE CUSTODIA —
            </span>
            <span className="text-[11px] text-[#E80000] font-bold">PROTOCOLO</span>
          </div>

          <div className="divide-y-2 divide-[#1F1305] text-xs">
            {techSpecs.map((t) => (
              <div key={t.label} className="py-2.5 flex items-center justify-between">
                <span className="text-[#5A5245] font-bold text-[11px]">{t.label}</span>
                <div className="flex items-center gap-2">
                  <span className="font-black text-[#1F1305]">{t.valor}</span>
                  <span className="text-[11px] border border-[#1F1305] bg-white px-1.5 py-0.2 font-black text-[#E80000]">
                    {t.sello}
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
