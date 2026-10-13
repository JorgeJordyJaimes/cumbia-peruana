import Link from "next/link";
import { ArrowUpRight, Disc, Music2, FileText } from "lucide-react";

interface BrutalistHeroProps {
  totalAlbumes?: number | null;
  totalGrupos?: number | null;
  totalPersonas?: number | null;
  totalSellos?: number | null;
}

export function BrutalistHero({
  totalAlbumes = 719,
  totalGrupos = 581,
  totalPersonas = 360,
  totalSellos = 258,
}: BrutalistHeroProps) {
  return (
    <section className="relative w-full border-b-2 border-[#1F1305] bg-[#EDE0D0] text-[#1F1305] overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16 select-none font-mono">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        
        {/* LÍNEA SUPERIOR DE REGISTRO TIPOGRÁFICO ISO */}
        <div className="mb-6 pb-3 border-b-2 border-[#1F1305] flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-[#746B5C]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#E80000]" />
            <span className="text-[#1F1305] uppercase tracking-widest font-black">
              PLIEGO MONOGRÁFICO NO. 01 // ARCHIVO GENERAL
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <span>LIMA, PERÚ</span>
            <span>—</span>
            <span>1968–2005</span>
            <span className="text-[#E80000] font-black">• EDICIÓN LIMITADA</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* COLUMNA IZQUIERDA: MACRO-TIPOGRAFÍA Y ENSAYO EDITORIAL */}
          <div className="lg:col-span-7 space-y-6 z-10">
            {/* Meta etiqueta editorial */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold tracking-widest text-[#746B5C]">
              <span className="inline-block w-4 h-1.5 bg-[#E80000]" />
              <span>REGISTRO HISTÓRICO // ARTISTA CENTRAL</span>
              <span className="border border-[#E80000] bg-[#E80000]/10 px-2 py-0.2 text-[10px] text-[#E80000] font-black uppercase">
                CLAUDIO MORÁN
              </span>
            </div>

            {/* TITULAR PÓSTER SUIZO EN FUENTE ANTON GIGANTE */}
            <div className="space-y-0 leading-[0.84] tracking-tighter select-none font-anton uppercase text-[52px] sm:text-[76px] md:text-[96px] lg:text-[104px] xl:text-[120px]">
              <div className="text-[#1F1305]">
                EL REY DE LAS
              </div>
              <div className="text-[#1F1305]">
                CUMBIAS
              </div>
              <div className="text-[#F1730C] flex items-baseline">
                <span>PEGADITAS</span>
                <span className="inline-block w-3.5 h-3.5 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-[#E80000] ml-2 sm:ml-4 align-baseline" />
              </div>
            </div>

            {/* ENSAYO EDITORIAL BIOGRÁFICO CON LÍNEA ROJA DE GUÍA */}
            <div className="border-l-4 border-[#E80000] pl-4 py-1 space-y-3">
              <div className="text-xs font-black tracking-widest uppercase text-[#1F1305] flex items-center gap-2">
                <FileText className="h-3.5 w-3.5 text-[#E80000]" />
                <span>HOMENAJE A ALFONSO ALEJANDRO MORÁN SIRUMBAL</span>
              </div>

              <p className="text-xs sm:text-sm text-[#3E3228] leading-relaxed">
                Figura irrepetible de la fonografía peruana. Formado en la escuela dorada de <strong>Los Destellos</strong> junto al maestro Enrique Delgado, Claudio Morán inmortalizó melodías que definieron el sonido de Lima. Su posterior etapa continental con Alberto Maraví en <strong>Infopesa</strong> dio nacimiento al fenómeno más vendedor de la música tropical andina: <em>El Rey de las Cumbias Pegaditas</em>.
              </p>
            </div>

            {/* CREDENCIALES DEL ARCHIVO */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <div className="flex items-center gap-2 border-2 border-[#1F1305] bg-white px-3 py-1.5 shadow-[2px_2px_0px_#1F1305]">
                <Music2 className="h-3.5 w-3.5 text-[#E80000]" />
                <span className="font-bold text-[#1F1305]">LOS DESTELLOS • ODEÓN • 1970</span>
              </div>
              <div className="flex items-center gap-2 border-2 border-[#1F1305] bg-white px-3 py-1.5 shadow-[2px_2px_0px_#1F1305]">
                <Disc className="h-3.5 w-3.5 text-[#F1730C]" />
                <span className="font-bold text-[#1F1305]">CUARTETO CONTINENTAL • INFOPESA</span>
              </div>
            </div>

            {/* ACCIONES PRINCIPALES (CTAs) CON CORTE BRUTALISTA DE 90° */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-bold">
              <Link
                href="/genealogia"
                className="inline-flex items-center gap-2 border-2 border-[#1F1305] bg-[#1F1305] px-6 py-3.5 text-white shadow-[4px_4px_0px_#E80000] hover:bg-[#E80000] hover:text-white hover:border-[#1F1305] transition-all active:translate-x-0.5 active:translate-y-0.5"
              >
                <span>01. EXPLORAR ÁRBOL GENEALÓGICO</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>

              <Link
                href="/match-bpm"
                className="inline-flex items-center gap-2 border-2 border-[#1F1305] bg-[#F1730C] px-6 py-3.5 text-white shadow-[4px_4px_0px_#1F1305] hover:bg-[#E80000] hover:text-white hover:shadow-[4px_4px_0px_#1F1305] transition-all active:translate-x-0.5 active:translate-y-0.5"
              >
                <span>02. CONSOLA MATCH BPM DJ</span>
                <span className="text-white text-[10px]">●</span>
              </Link>

              <Link
                href="/vinilos"
                className="inline-flex items-center gap-2 border-2 border-[#1F1305] bg-white px-5 py-3.5 text-[#1F1305] shadow-[4px_4px_0px_#1F1305] hover:bg-[#1F1305] hover:text-white transition-all active:translate-x-0.5 active:translate-y-0.5"
              >
                <Disc className="h-4 w-4 text-[#F1730C]" />
                <span>06. DISCOGRAFÍA COMPLETA</span>
              </Link>
            </div>
          </div>

          {/* COLUMNA DERECHA: AFICHE LITOGRÁFICO DE CLAUDIO MORÁN */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[420px] sm:max-w-[460px]">
              
              {/* AFICHE TIPOGRÁFICO CENTRAL */}
              <div className="relative z-10 border-2 border-[#1F1305] bg-[#EDE0D0] shadow-[8px_8px_0px_#1F1305] overflow-hidden flex flex-col justify-end">
                
                {/* Cintillo rojo de afiche superior */}
                <div className="border-b-2 border-[#1F1305] bg-[#E80000] px-3 py-1.5 flex items-center justify-between text-[10px] font-bold text-white uppercase tracking-widest">
                  <span>EXPOSICIÓN PERMANENTE</span>
                  <span>REG. NO. 01</span>
                </div>

                {/* Recorte transparente de Claudio Morán */}
                <div className="relative w-full h-[390px] sm:h-[440px] md:h-[480px] flex items-end justify-center px-4 pt-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/claudio-moran.png"
                    alt="Claudio Morán con acordeón - El Rey de las Cumbias Pegaditas"
                    className="max-h-full max-w-full object-contain object-bottom filter contrast-110 drop-shadow-[0_12px_20px_rgba(31,19,5,0.3)] select-none"
                  />
                </div>

                {/* Placa tipográfica inferior */}
                <div className="border-t-2 border-[#1F1305] bg-[#1F1305] p-3.5 text-white flex items-center justify-between">
                  <div>
                    <h4 className="font-anton text-lg uppercase tracking-wide text-white leading-none">
                      CLAUDIO MORÁN
                    </h4>
                    <p className="text-[10px] text-[#F1730C] font-black uppercase mt-1">
                      LA VOZ DE LOS DESTELLOS &amp; CUARTETO CONTINENTAL
                    </p>
                  </div>
                  <div className="border border-white/30 px-2 py-1 text-[9px] font-bold text-[#EDE0D0]">
                    1968–2005
                  </div>
                </div>

              </div>

              {/* Sombra angular sólida */}
              <div className="absolute -bottom-3 -left-3 w-full h-full border-2 border-[#1F1305] bg-[#F1730C] -z-0" />
            </div>
          </div>

        </div>

        {/* TIRA DE LOS 4 NÚMEROS MONOLÍTICOS SUIZOS (ESTADÍSTICAS A GRAN ESCALA) */}
        <div className="mt-12 sm:mt-16 border-2 border-[#1F1305] bg-white divide-y-2 md:divide-y-0 md:divide-x-2 divide-[#1F1305] grid grid-cols-2 md:grid-cols-4 shadow-[6px_6px_0px_#1F1305]">
          
          <div className="p-5 sm:p-6 space-y-1 relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#1F1305]" />
            <span className="block text-4xl sm:text-5xl lg:text-6xl font-black font-anton text-[#1F1305] tracking-tight">
              {totalAlbumes}+
            </span>
            <span className="text-[11px] uppercase font-bold text-[#746B5C] block tracking-wider">
              01 / Prensajes en Vinilo
            </span>
          </div>

          <div className="p-5 sm:p-6 space-y-1 relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#F1730C]" />
            <span className="block text-4xl sm:text-5xl lg:text-6xl font-black font-anton text-[#F1730C] tracking-tight">
              {totalGrupos}
            </span>
            <span className="text-[11px] uppercase font-bold text-[#746B5C] block tracking-wider">
              02 / Agrupaciones Históricas
            </span>
          </div>

          <div className="p-5 sm:p-6 space-y-1 relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#1F1305]" />
            <span className="block text-4xl sm:text-5xl lg:text-6xl font-black font-anton text-[#1F1305] tracking-tight">
              {totalPersonas}
            </span>
            <span className="text-[11px] uppercase font-bold text-[#746B5C] block tracking-wider">
              03 / Músicos de Sesión
            </span>
          </div>

          <div className="p-5 sm:p-6 space-y-1 relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#E80000]" />
            <span className="block text-4xl sm:text-5xl lg:text-6xl font-black font-anton text-[#E80000] tracking-tight">
              {totalSellos}
            </span>
            <span className="text-[11px] uppercase font-bold text-[#746B5C] block tracking-wider">
              04 / Sellos Discográficos
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
