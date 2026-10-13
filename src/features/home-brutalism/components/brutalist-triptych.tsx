import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function BrutalistTriptych() {
  const servicios = [
    { bus: "BUS 06", nombre: "BÓVEDA DE 719+ PRENSAJES", url: "/vinilos" },
    { bus: "BUS 01", nombre: "ÁRBOL DE GUITARRISTAS DE SESIÓN", url: "/genealogia" },
    { bus: "BUS 02", nombre: "SINCRONIZADOR CAMELOT PARA DJS", url: "/match-bpm" },
    { bus: "BUS 03", nombre: "PRENSAJES RAROS EN 45 RPM", url: "/radar" },
    { bus: "BUS 04", nombre: "CRÓNICAS & PERIODISMO MUSICAL", url: "/blog" },
    { bus: "BUS 05", nombre: "MANIFIESTO & EQUIPO GUARDIÁN", url: "/nosotros" },
  ];

  const techSpecs = [
    { label: "VELOCIDADES DE PRENSADO", valor: "33 ⅓ & 45 RPM", status: "NOMINAL" },
    { label: "CALIBRACIÓN DJ", valor: "PITCH ±3% / ±5%", status: "ACTIVE" },
    { label: "AFINACIÓN DE SESIÓN", valor: "440 HZ STANDARD", status: "LOCKED" },
    { label: "SISTEMA ARMÓNICO", valor: "RUEDA CAMELOT", status: "OK" },
    { label: "CURVA DE CORTE", valor: "RIAA EQUALIZATION", status: "LOCKED" },
    { label: "MATRICES ANALÓGICAS", valor: "MONO & ESTÉREO", status: "MASTER" },
    { label: "MOTOR DE DATOS", valor: "SUPABASE POSTGRES", status: "ONLINE" },
  ];

  return (
    <section className="w-full border-b-2 border-[#1F1305] bg-[#EDE0D0] text-[#1F1305] select-none font-mono">
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-[#1F1305]">
        
        {/* COLUMNA 1: PATCHBAY DE RUTEO DE SEÑAL */}
        <div className="lg:col-span-4 p-5 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b-2 border-[#1F1305] pb-2 text-xs">
            <span className="font-anton text-xl tracking-wide uppercase text-[#1F1305]">
              PATCHBAY DE RUTEO —
            </span>
            <span className="text-[10px] text-[#746B5C] font-bold">(·) 600Ω BAL</span>
          </div>

          <div className="divide-y divide-[#1F1305]/15 text-xs">
            {servicios.map((s) => (
              <Link
                key={s.bus}
                href={s.url}
                className="py-3 flex items-center justify-between group hover:text-[#E80000] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <span className="font-black text-[#E80000] text-[10px] border border-[#1F1305] bg-white px-1.5 py-0.2 shadow-[1px_1px_0px_#1F1305]">
                    {s.bus}
                  </span>
                  <span className="font-bold tracking-tight">{s.nombre}</span>
                </div>
                <span className="font-bold text-[#1F1305] group-hover:text-[#E80000] group-hover:translate-x-1 transition-transform">
                  ➔
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* COLUMNA 2: BLOQUE NARANJA SÓLIDO (MANIFIESTO DE INGENIERÍA) */}
        <div className="lg:col-span-4 bg-[#F1730C] text-[#1F1305] p-5 sm:p-8 flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-4 relative z-10">
            <div className="border-b-2 border-[#1F1305] pb-2 flex items-center justify-between">
              <span className="font-anton text-xl tracking-wide uppercase text-[#1F1305]">
                MANIFIESTO // CABINA —
              </span>
              <span className="w-2 h-2 rounded-full bg-[#E80000] animate-pulse" />
            </div>

            <div className="space-y-3 text-xs sm:text-[13px] font-black leading-relaxed tracking-tight text-[#1F1305]">
              <p>
                EL ARCHIVO NO SOLO RECOPILA PORTADAS.
                RESTAURA LA CADENA ELECTROACÚSTICA: DESDE EL CABEZAL DE CINTA STUDER HASTA EL
                SURCO DE CORTE RIAA EN IEMPSA Y ODEÓN.
              </p>
              <p className="border-l-2 border-[#1F1305] pl-2 text-white">
                RECONOCEMOS AL MÚSICO DE SESIÓN ANONIMIZADO, A LAS GUITARRAS QUE NO COBRARON REGALÍAS
                Y A LAS MATRICES RESCATADAS DEL POLVO.
              </p>
            </div>
          </div>

          <div className="pt-6 relative z-10">
            <Link
              href="/nosotros"
              className="inline-flex items-center gap-2 border-2 border-[#1F1305] bg-[#1F1305] px-4 py-2.5 text-xs font-bold text-white shadow-[3px_3px_0px_#EDE0D0] hover:bg-[#E80000] hover:text-white transition-all"
            >
              <span>INSPECCIONAR EXPEDIENTE</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Corte diagonal de chasis en la esquina */}
          <div
            className="absolute bottom-0 right-0 w-12 h-12 bg-[#1F1305] pointer-events-none select-none"
            style={{ clipPath: "polygon(100% 0, 0 100%, 100% 100%)" }}
          />
        </div>

        {/* COLUMNA 3: ESPECIFICACIONES TÉCNICAS DE CALIBRACIÓN */}
        <div className="lg:col-span-4 p-5 sm:p-8 space-y-6 bg-[#EDE0D0]">
          <div className="flex items-center justify-between border-b-2 border-[#1F1305] pb-2 text-xs">
            <span className="font-anton text-xl tracking-wide uppercase text-[#1F1305]">
              PARÁMETROS TÉCNICOS —
            </span>
            <span className="text-[10px] text-[#E80000] font-bold">RIAA / NAB</span>
          </div>

          <div className="divide-y divide-[#1F1305]/15 text-xs">
            {techSpecs.map((t) => (
              <div key={t.label} className="py-2 flex items-center justify-between">
                <span className="text-[#5A5245] font-bold text-[11px]">{t.label}</span>
                <div className="flex items-center gap-2">
                  <span className="font-black text-[#1F1305]">{t.valor}</span>
                  <span className="text-[8px] border border-[#1F1305] bg-white px-1 font-bold text-[#E80000]">
                    {t.status}
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
