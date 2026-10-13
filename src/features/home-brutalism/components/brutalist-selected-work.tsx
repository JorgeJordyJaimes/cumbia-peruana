import Link from "next/link";
import { ArrowUpRight, GitFork, Music2, Radio } from "lucide-react";

export function BrutalistSelectedWork() {
  return (
    <section className="relative w-full border-b-2 border-[#1F1305] bg-[#1F1305] brutalist-dots-dark text-white select-none font-mono">
      <div className="flex flex-col lg:flex-row">
        
        {/* BANNER VERTICAL LATERAL DE LEGAJOS */}
        <div className="lg:w-16 bg-[#F1730C] border-b-2 lg:border-b-0 lg:border-r-2 border-[#1F1305] flex items-center justify-center py-4 lg:py-8 shrink-0">
          <div className="flex items-center gap-3 lg:rotate-180 lg:[writing-mode:vertical-rl] font-anton text-[#1F1305] tracking-widest text-lg sm:text-xl uppercase select-none">
            <span className="inline-block w-3 h-3 bg-[#E80000]" />
            <span>LEGAJOS DE INVESTIGACIÓN</span>
          </div>
        </div>

        {/* 3 CARPETAS DE EXPEDIENTE */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 divide-y-2 md:divide-y-0 md:divide-x-2 divide-[#3E2C1B]">
          
          {/* CARPETA 01: EXPLORADOR GENEALÓGICO */}
          <Link
            href="/genealogia"
            className="group relative p-6 sm:p-8 flex flex-col justify-between hover:bg-[#2A1C0E] transition-colors overflow-hidden"
          >
            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-[#E80000] font-black text-sm">EXP. 01</span>
                  <span className="border border-[#E80000] bg-[#E80000]/15 text-[#E80000] px-1.5 py-0.2 text-[9px] font-black uppercase rotate-[-2deg]">
                    CASO ABIERTO
                  </span>
                </div>
                <span className="text-[#8E8478] uppercase tracking-widest text-[10px] font-bold">
                  LINAJES DE SESIÓN
                </span>
              </div>

              {/* Preview Gráfica */}
              <div className="aspect-[16/9] w-full border-2 border-[#3E2C1B] bg-[#140D04] p-4 flex flex-col justify-between relative overflow-hidden group-hover:border-[#E80000] transition-colors">
                <div className="flex items-center justify-between">
                  <GitFork className="h-6 w-6 text-[#E80000]" />
                  <span className="text-[10px] text-[#EDE0D0] bg-[#1F1305] px-2 py-0.5 border border-[#3E2C1B] font-bold">
                    360+ GUITARRAS IDENTIFICADAS
                  </span>
                </div>
                <div>
                  <h4 className="font-anton text-2xl tracking-wide uppercase text-white group-hover:text-[#E80000] transition-colors">
                    ÁRBOL & CRUCES
                  </h4>
                  <p className="text-[10px] text-[#B8AFA6]">
                    LOS DESTELLOS • MANZANITA • INFOPESA
                  </p>
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#E80000] flex items-center justify-center">
                  <ArrowUpRight className="h-4 w-4 text-white" />
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="font-sans text-base font-black text-white group-hover:text-[#E80000] transition-colors tracking-tight">
                  Explorador Genealógico
                </h3>
                <p className="text-xs text-[#B8AFA6] line-clamp-2 leading-relaxed">
                  Rastrea qué guitarristas grabaron los solos y cómo los sellos rivales compartieron sesionistas.
                </p>
              </div>
            </div>

            <div className="pt-6 flex items-center justify-between text-xs text-[#E80000] font-bold relative z-10">
              <span className="group-hover:underline">ABRIR LEGAJO EXP. 01 ↗</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </Link>

          {/* CARPETA 02: CONSOLA MATCH BPM DJ */}
          <Link
            href="/match-bpm"
            className="group relative p-6 sm:p-8 flex flex-col justify-between hover:bg-[#2A1C0E] transition-colors overflow-hidden"
          >
            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-[#E80000] font-black text-sm">EXP. 02</span>
                  <span className="border border-[#F1730C] bg-[#F1730C]/15 text-[#F1730C] px-1.5 py-0.2 text-[9px] font-black uppercase rotate-[2deg]">
                    CALIBRADO
                  </span>
                </div>
                <span className="text-[#8E8478] uppercase tracking-widest text-[10px] font-bold">
                  SINCRONIZACIÓN DJ
                </span>
              </div>

              {/* Preview Gráfica */}
              <div className="aspect-[16/9] w-full border-2 border-[#3E2C1B] bg-[#140D04] p-4 flex flex-col justify-between relative overflow-hidden group-hover:border-[#E80000] transition-colors">
                <div className="flex items-center justify-between">
                  <Music2 className="h-6 w-6 text-[#E80000]" />
                  <span className="text-[10px] text-[#F8C800] bg-[#1F1305] px-2 py-0.5 border border-[#3E2C1B] font-bold">
                    RUEDA CAMELOT
                  </span>
                </div>
                <div>
                  <h4 className="font-anton text-2xl tracking-wide uppercase text-white group-hover:text-[#E80000] transition-colors">
                    CONSOLA DJ
                  </h4>
                  <p className="text-[10px] text-[#B8AFA6]">
                    PITCH ±3% / ±5% • 440 HZ STANDARD
                  </p>
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#E80000] flex items-center justify-center">
                  <ArrowUpRight className="h-4 w-4 text-white" />
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="font-sans text-base font-black text-white group-hover:text-[#E80000] transition-colors tracking-tight">
                  Consola Match BPM DJ
                </h3>
                <p className="text-xs text-[#B8AFA6] line-clamp-2 leading-relaxed">
                  Mezcla armónica y sincronización tonal de pistas para sets en vinilo o digital sin disonancias.
                </p>
              </div>
            </div>

            <div className="pt-6 flex items-center justify-between text-xs text-[#E80000] font-bold relative z-10">
              <span className="group-hover:underline">ABRIR LEGAJO EXP. 02 ↗</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </Link>

          {/* CARPETA 03: EL RADAR SONORO 45 RPM */}
          <Link
            href="/radar"
            className="group relative p-6 sm:p-8 flex flex-col justify-between hover:bg-[#2A1C0E] transition-colors overflow-hidden"
          >
            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-[#F1730C] font-black text-sm">EXP. 03</span>
                  <span className="border border-[#F1730C] bg-[#F1730C]/15 text-[#F1730C] px-1.5 py-0.2 text-[9px] font-black uppercase rotate-[-1deg]">
                    RAREZA 45s
                  </span>
                </div>
                <span className="text-[#8E8478] uppercase tracking-widest text-[10px] font-bold">
                  MICROGROOVE 45 RPM
                </span>
              </div>

              {/* Preview Gráfica */}
              <div className="aspect-[16/9] w-full border-2 border-[#3E2C1B] bg-[#140D04] p-4 flex flex-col justify-between relative overflow-hidden group-hover:border-[#F1730C] transition-colors">
                <div className="flex items-center justify-between">
                  <Radio className="h-6 w-6 text-[#F1730C]" />
                  <span className="text-[10px] text-[#F1730C] bg-[#1F1305] px-2 py-0.5 border border-[#3E2C1B] font-bold">
                    SONDA ANALÓGICA
                  </span>
                </div>
                <div>
                  <h4 className="font-anton text-2xl tracking-wide uppercase text-white group-hover:text-[#F1730C] transition-colors">
                    EL RADAR SONORO
                  </h4>
                  <p className="text-[10px] text-[#B8AFA6]">
                    TIRAJES LIMITADOS • MATRICES ORIGINALES
                  </p>
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#F1730C] flex items-center justify-center">
                  <ArrowUpRight className="h-4 w-4 text-[#1F1305]" />
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="font-sans text-base font-black text-white group-hover:text-[#F1730C] transition-colors tracking-tight">
                  El Radar Sonoro
                </h3>
                <p className="text-xs text-[#B8AFA6] line-clamp-2 leading-relaxed">
                  Discos de 45 RPM prensados en tirajes ultralimitados por sellos independientes y sellos matrices.
                </p>
              </div>
            </div>

            <div className="pt-6 flex items-center justify-between text-xs text-[#F1730C] font-bold relative z-10">
              <span className="group-hover:underline">ABRIR LEGAJO EXP. 03 ↗</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </Link>

        </div>
      </div>
    </section>
  );
}
