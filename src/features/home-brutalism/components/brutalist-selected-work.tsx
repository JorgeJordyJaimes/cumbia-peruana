import Link from "next/link";
import { ArrowUpRight, GitFork, Music2, Radio } from "lucide-react";

export function BrutalistSelectedWork() {
  return (
    <section className="relative w-full border-b border-[#1F1305] bg-[#1F1305] text-white select-none">
      <div className="flex flex-col lg:flex-row">
        
        {/* BANNER VERTICAL LATERAL: BANCO DE PRUEBAS */}
        <div className="lg:w-16 bg-[#F1730C] border-b lg:border-b-0 lg:border-r border-[#1F1305] flex items-center justify-center py-4 lg:py-8 shrink-0">
          <div className="flex items-center gap-3 lg:rotate-180 lg:[writing-mode:vertical-rl] font-mono font-black text-[#1F1305] tracking-widest text-xs uppercase select-none">
            <span className="inline-block w-2.5 h-2.5 bg-[#E80000]" />
            <span>[BANCO DE CALIBRACIÓN // MATRICES]</span>
          </div>
        </div>

        {/* CONTENEDOR DE LAS 3 CELDAS DE INSPECCIÓN */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#3E2C1B]">
          
          {/* CELDA 01: EXPLORADOR GENEALÓGICO */}
          <Link
            href="/genealogia"
            className="group relative p-6 sm:p-7 flex flex-col justify-between hover:bg-[#2A1C0E] transition-colors"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between font-mono text-xs border-b border-[#3E2C1B] pb-2">
                <span className="text-[#E80000] font-bold">[CELDA-01]</span>
                <span className="text-[#8E8478] uppercase tracking-widest text-[10px]">
                  MATRIZ BIOGRÁFICA
                </span>
              </div>

              {/* Preview Gráfica */}
              <div className="aspect-[16/9] w-full border border-[#3E2C1B] bg-[#140D04] p-4 flex flex-col justify-between relative overflow-hidden group-hover:border-[#E80000] transition-colors">
                <div className="flex items-center justify-between">
                  <GitFork className="h-5 w-5 text-[#E80000]" />
                  <span className="font-mono text-[9px] text-[#EDE0D0] bg-[#1F1305] px-2 py-0.5 border border-[#3E2C1B]">
                    360+ SESIONISTAS
                  </span>
                </div>
                <div>
                  <h4 className="font-anton text-xl tracking-wide uppercase text-white group-hover:text-[#E80000] transition-colors">
                    ÁRBOL & CRUCES
                  </h4>
                  <p className="font-mono text-[10px] text-[#B8AFA6]">
                    LOS DESTELLOS • MANZANITA • INFOPESA
                  </p>
                </div>
                <div className="absolute top-1 right-1 font-mono text-[9px] text-[#E80000]">+</div>
              </div>

              <div className="space-y-1">
                <h3 className="font-mono text-sm font-bold text-white group-hover:text-[#E80000] transition-colors uppercase">
                  Explorador Genealógico
                </h3>
                <p className="font-mono text-xs text-[#B8AFA6] line-clamp-2">
                  Trazabilidad de guitarristas y sesionistas que cruzaron sellos bajo seudónimos contractuales.
                </p>
              </div>
            </div>

            <div className="pt-5 flex items-center justify-between font-mono text-xs text-[#E80000] border-t border-[#3E2C1B]">
              <span className="group-hover:underline text-[11px]">[INSPECCIONAR RED]</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </Link>

          {/* CELDA 02: CONSOLA MATCH BPM */}
          <Link
            href="/match-bpm"
            className="group relative p-6 sm:p-7 flex flex-col justify-between hover:bg-[#2A1C0E] transition-colors"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between font-mono text-xs border-b border-[#3E2C1B] pb-2">
                <span className="text-[#E80000] font-bold">[CELDA-02]</span>
                <span className="text-[#8E8478] uppercase tracking-widest text-[10px]">
                  ANÁLISIS ARMÓNICO
                </span>
              </div>

              {/* Preview Gráfica */}
              <div className="aspect-[16/9] w-full border border-[#3E2C1B] bg-[#140D04] p-4 flex flex-col justify-between relative overflow-hidden group-hover:border-[#E80000] transition-colors">
                <div className="flex items-center justify-between">
                  <Music2 className="h-5 w-5 text-[#E80000]" />
                  <span className="font-mono text-[9px] text-[#E80000] bg-[#1F1305] px-2 py-0.5 border border-[#E80000]/40">
                    RUEDA CAMELOT
                  </span>
                </div>
                <div>
                  <h4 className="font-anton text-xl tracking-wide uppercase text-white group-hover:text-[#E80000] transition-colors">
                    MATCH BPM CONSOLE
                  </h4>
                  <p className="font-mono text-[10px] text-[#B8AFA6]">
                    PITCH ±3% / ±5% • 440 HZ EXACTO
                  </p>
                </div>
                <div className="absolute top-1 right-1 font-mono text-[9px] text-[#E80000]">+</div>
              </div>

              <div className="space-y-1">
                <h3 className="font-mono text-sm font-bold text-white group-hover:text-[#E80000] transition-colors uppercase">
                  Consola de Mezcla Armónica
                </h3>
                <p className="font-mono text-xs text-[#B8AFA6] line-clamp-2">
                  Cálculo métrico de compatibilidad tonal y saltos de pitch para mezclas en vivo.
                </p>
              </div>
            </div>

            <div className="pt-5 flex items-center justify-between font-mono text-xs text-[#E80000] border-t border-[#3E2C1B]">
              <span className="group-hover:underline text-[11px]">[CALCULAR CAMELOT]</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </Link>

          {/* CELDA 03: EL RADAR SONORO */}
          <Link
            href="/radar"
            className="group relative p-6 sm:p-7 flex flex-col justify-between hover:bg-[#2A1C0E] transition-colors"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between font-mono text-xs border-b border-[#3E2C1B] pb-2">
                <span className="text-[#F1730C] font-bold">[CELDA-03]</span>
                <span className="text-[#8E8478] uppercase tracking-widest text-[10px]">
                  MONITOREO 45 RPM
                </span>
              </div>

              {/* Preview Gráfica */}
              <div className="aspect-[16/9] w-full border border-[#3E2C1B] bg-[#140D04] p-4 flex flex-col justify-between relative overflow-hidden group-hover:border-[#F1730C] transition-colors">
                <div className="flex items-center justify-between">
                  <Radio className="h-5 w-5 text-[#F1730C]" />
                  <span className="font-mono text-[9px] text-[#EDE0D0] bg-[#1F1305] px-2 py-0.5 border border-[#3E2C1B]">
                    PRENSAJES RAROS
                  </span>
                </div>
                <div>
                  <h4 className="font-anton text-xl tracking-wide uppercase text-white group-hover:text-[#F1730C] transition-colors">
                    EL RADAR SONORO
                  </h4>
                  <p className="font-mono text-[10px] text-[#B8AFA6]">
                    SINGLES 45s • JOYAS DE CATÁLOGO
                  </p>
                </div>
                <div className="absolute top-1 right-1 font-mono text-[9px] text-[#F1730C]">+</div>
              </div>

              <div className="space-y-1">
                <h3 className="font-mono text-sm font-bold text-white group-hover:text-[#F1730C] transition-colors uppercase">
                  Curaduría de Vinilos
                </h3>
                <p className="font-mono text-xs text-[#B8AFA6] line-clamp-2">
                  Prensajes únicos en formato 45 RPM que jamás fueron recopilados en álbumes de larga duración.
                </p>
              </div>
            </div>

            <div className="pt-5 flex items-center justify-between font-mono text-xs text-[#F1730C] border-t border-[#3E2C1B]">
              <span className="group-hover:underline text-[11px]">[ACCEDER AL RADAR]</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </Link>

        </div>

      </div>
    </section>
  );
}
