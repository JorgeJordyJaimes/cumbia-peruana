import Link from "next/link";
import { ArrowUpRight, Disc, Music2, ShieldAlert, Stamp } from "lucide-react";

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
    <section className="relative w-full border-b-2 border-[#1F1305] bg-[#EDE0D0] bg-[radial-gradient(#1F1305_1px,transparent_1px)] [background-size:16px_16px] text-[#1F1305] overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16 select-none font-mono">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        
        {/* CINTILLO SUPERIOR DE LEGAJO DESCLASIFICADO */}
        <div className="mb-6 pb-3 border-b-2 border-[#1F1305] flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-[#665D4F]">
          <div className="flex items-center gap-2">
            <span className="border-2 border-[#E80000] bg-[#E80000] text-white px-2 py-0.5 text-[11px] font-black uppercase rotate-[-2deg] shadow-[2px_2px_0px_#1F1305]">
              CONFIDENCIAL // LEGAJO OFICIAL
            </span>
            <span className="text-[#1F1305] font-black uppercase tracking-wider text-xs">
              EXP-CM-1970 // SUJETO DE INTERÉS MUSICAL
            </span>
          </div>
          <div className="flex items-center gap-2 text-[11px]">
            <span>FOLIO: 001/719</span>
            <span className="text-[#1F1305] font-black">████████</span>
            <span className="text-[#E80000] font-black">ACCESO LIBRE</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* COLUMNA IZQUIERDA: Titular Monolítico con Línea Lateral y Ficha Documental de Alta Legibilidad */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7 z-10">
            {/* Meta etiqueta de pieza acústica */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs font-bold tracking-widest text-[#665D4F]">
              <span className="text-[#E80000] font-black">+</span>
              <span className="text-[#1F1305] uppercase">MATRIZ MAESTRA // VOZ DE PLANTA</span>
              <span className="border border-[#1F1305] bg-[#1F1305] px-2 py-0.5 text-[11px] text-[#EDE0D0] font-black uppercase">
                ALFONSO ALEJANDRO MORÁN SIRUMBAL
              </span>
            </div>

            {/* TITULAR POSTER GIGANTE EN ANTON CON LÍNEA LATERAL */}
            <div className="border-l-4 border-[#1F1305] pl-4 sm:pl-6 space-y-0 leading-[0.88] tracking-tighter font-anton uppercase text-[48px] sm:text-[72px] md:text-[90px] lg:text-[100px] xl:text-[112px]">
              <div className="text-[#1F1305]">
                EL REY DE LAS
              </div>
              <div className="text-[#1F1305]">
                CUMBIAS
              </div>
              <div className="text-[#F1730C] drop-shadow-[3px_3px_0px_#1F1305] flex items-baseline">
                <span>PEGADITAS</span>
                <span className="inline-block w-3 h-3 sm:w-4 sm:h-4 bg-[#E80000] border border-[#1F1305] ml-3 align-baseline" />
              </div>
            </div>

            {/* FICHA TÉCNICA Y RESEÑA DOCUMENTAL CON CRUCES ROJAS EN LAS 4 ESQUINAS */}
            <div className="border border-[#1F1305] bg-white p-5 space-y-3 relative shadow-[3px_3px_0px_#1F1305]">
              {/* Marcas de cruceta roja de calibración en las 4 esquinas */}
              <span className="absolute -top-1.5 -left-1.5 font-mono text-xs text-[#E80000] font-bold leading-none">+</span>
              <span className="absolute -top-1.5 -right-1.5 font-mono text-xs text-[#E80000] font-bold leading-none">+</span>
              <span className="absolute -bottom-1.5 -left-1.5 font-mono text-xs text-[#E80000] font-bold leading-none">+</span>
              <span className="absolute -bottom-1.5 -right-1.5 font-mono text-xs text-[#E80000] font-bold leading-none">+</span>

              <div className="flex items-center justify-between border-b border-[#EDE0D0] pb-2 font-mono text-xs font-bold uppercase text-[#1F1305]">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#E80000]" />
                  DOCUMENTACIÓN DE ORIGEN & PRENSADO
                </span>
                <span className="text-[#665D4F] text-[11px]">CÓDIGO: CLAUDIO-MORAN-01</span>
              </div>

              <p className="font-mono text-xs sm:text-[13px] text-[#3A3026] leading-relaxed">
                Trazabilidad fonográfica de <strong>Alfonso Alejandro Morán Sirumbal («Claudio Morán»)</strong>,
                voz angular del prensaje industrial que articuló la guitarra solista de Enrique Delgado en
                <strong> Los Destellos</strong> con la ingeniería de producción de Alberto Maraví en <strong>Infopesa</strong>.
                Un archivo de ingeniería acústica para reconstruir matrices originales, seudónimos contractuales
                y sincronía armónica de BPM.
              </p>

              {/* Parámetros de Sesión */}
              <div className="pt-2 flex flex-wrap items-center gap-2 font-mono text-[11px]">
                <span className="border border-[#1F1305] bg-[#EDE0D0] px-2 py-1 font-bold text-[#1F1305]">
                  SELLOS: ODEÓN • INFOPESA • VIRREY
                </span>
                <span className="border border-[#1F1305] bg-white px-2 py-1 font-bold text-[#E80000]">
                  GÉNEROS: CUMBIA COSTEÑA • PEGADITAS
                </span>
              </div>
            </div>

            {/* ACCIONES DEL EXPEDIENTE (CTAs) */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-bold font-mono">
              <Link
                href="/genealogia"
                className="inline-flex items-center gap-2 border-2 border-[#1F1305] bg-[#1F1305] px-6 py-3.5 text-white shadow-[4px_4px_0px_#E80000] hover:bg-[#E80000] hover:text-white hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#1F1305] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#1F1305] transition-all"
              >
                <span>EXP. 01: CONSULTAR LINAJES ↗</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>

              <Link
                href="/match-bpm"
                className="inline-flex items-center gap-2 border-2 border-[#1F1305] bg-[#F1730C] px-6 py-3.5 text-white shadow-[4px_4px_0px_#1F1305] hover:bg-[#E80000] hover:text-white hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#1F1305] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#1F1305] transition-all"
              >
                <span>EXP. 02: CONSOLA MATCH BPM</span>
                <span className="text-white text-[11px]">●</span>
              </Link>

              <Link
                href="/vinilos"
                className="inline-flex items-center gap-2 border-2 border-[#1F1305] bg-white px-5 py-3.5 text-[#1F1305] shadow-[4px_4px_0px_#1F1305] hover:bg-[#EDE0D0] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#1F1305] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
              >
                <Disc className="h-4 w-4 text-[#F1730C]" />
                <span>EXP. 06: BÓVEDA DE EVIDENCIAS</span>
              </Link>
            </div>
          </div>

          {/* COLUMNA DERECHA: FOTOGRAFÍA DE LEGAJO / FICHA POLICIAL */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[420px] sm:max-w-[460px]">
              
              {/* FICHA PERICIAL DEL SUJETO */}
              <div className="relative z-10 border-2 border-[#1F1305] bg-[#EDE0D0] shadow-[8px_8px_0px_#1F1305] overflow-hidden flex flex-col justify-end">
                
                {/* Cabecera con número de registro y sello de caucho */}
                <div className="border-b-2 border-[#1F1305] bg-[#1F1305] px-3 py-1.5 flex items-center justify-between text-[11px] font-bold text-white uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                    <span className="text-[#E80000]">●</span>
                    <span>FICHA DE ARCHIVO NO. 01</span>
                  </div>
                  <span className="text-[#F1730C]">CUSTODIA PERMANENTE</span>
                </div>

                {/* Fotografía de Claudio Morán */}
                <div className="relative w-full h-[390px] sm:h-[440px] md:h-[480px] flex items-end justify-center px-4 pt-4">
                  {/* Sello estampado de tinta roja en la esquina de la foto */}
                  <div className="absolute top-4 left-4 z-20 border-2 border-[#E80000] bg-[#EDE0D0] text-[#E80000] p-1.5 text-[11px] font-black uppercase rotate-[-8deg] shadow-[1px_1px_0px_#1F1305]">
                    CULTURA POPULAR // VERIFICADO
                  </div>

                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/claudio-moran.png"
                    alt="Claudio Morán - Expediente de Seguridad Histórica"
                    className="max-h-full max-w-full object-contain object-bottom filter contrast-110 drop-shadow-[0_12px_20px_rgba(31,19,5,0.3)] select-none"
                  />
                </div>

                {/* Placa pericial inferior */}
                <div className="border-t-2 border-[#1F1305] bg-[#1F1305] p-3.5 text-white flex items-center justify-between">
                  <div>
                    <h4 className="font-anton text-lg uppercase tracking-wide text-white leading-none">
                      CLAUDIO MORÁN
                    </h4>
                    <p className="text-[11px] text-[#F1730C] font-black uppercase mt-1">
                      VOZ PRINCIPAL // MATRICES 1968–2005
                    </p>
                  </div>
                  <div className="border border-[#E80000] bg-[#EDE0D0] px-2 py-1 text-[11px] font-black text-[#E80000]">
                    REGISTRADO
                  </div>
                </div>

              </div>

              {/* Sombra angular sólida */}
              <div className="absolute -bottom-3 -left-3 w-full h-full border-2 border-[#1F1305] bg-[#F1730C] -z-0" />
            </div>
          </div>

        </div>

        {/* TIRA DE EVIDENCIAS CUANTITATIVAS (LOS 4 GRANDES CONTADORES) */}
        <div className="mt-12 sm:mt-16 border-2 border-[#1F1305] bg-white divide-y-2 md:divide-y-0 md:divide-x-2 divide-[#1F1305] grid grid-cols-2 md:grid-cols-4 shadow-[6px_6px_0px_#1F1305] relative">
          <span className="absolute -top-1.5 -left-1.5 font-mono text-xs text-[#E80000] font-bold leading-none z-20">+</span>
          <span className="absolute -top-1.5 -right-1.5 font-mono text-xs text-[#E80000] font-bold leading-none z-20">+</span>
          <span className="absolute -bottom-1.5 -left-1.5 font-mono text-xs text-[#E80000] font-bold leading-none z-20">+</span>
          <span className="absolute -bottom-1.5 -right-1.5 font-mono text-xs text-[#E80000] font-bold leading-none z-20">+</span>
          
          <div className="p-5 sm:p-6 space-y-1 relative">
            <div className="flex items-center justify-between text-[11px] text-[#665D4F] font-black pb-1 border-b border-[#EDE0D0]">
              <span>EXP-01 / PRENSAJES</span>
              <span className="text-[#E80000]">EN CUSTODIA</span>
            </div>
            <span className="block text-4xl sm:text-5xl lg:text-6xl font-black font-anton text-[#1F1305] tracking-tight pt-1">
              {totalAlbumes}+
            </span>
            <span className="text-[11px] uppercase font-bold text-[#665D4F] block tracking-wider">
              Piezas de Evidencia Física
            </span>
          </div>

          <div className="p-5 sm:p-6 space-y-1 relative">
            <div className="flex items-center justify-between text-[11px] text-[#665D4F] font-black pb-1 border-b border-[#EDE0D0]">
              <span>EXP-02 / COMBOS</span>
              <span className="text-[#F1730C]">FICHADOS</span>
            </div>
            <span className="block text-4xl sm:text-5xl lg:text-6xl font-black font-anton text-[#F1730C] tracking-tight pt-1">
              {totalGrupos}
            </span>
            <span className="text-[11px] uppercase font-bold text-[#665D4F] block tracking-wider">
              Agrupaciones Históricas
            </span>
          </div>

          <div className="p-5 sm:p-6 space-y-1 relative">
            <div className="flex items-center justify-between text-[11px] text-[#665D4F] font-black pb-1 border-b border-[#EDE0D0]">
              <span>EXP-03 / SESIÓN</span>
              <span className="text-[#1F1305]">IDENTIFICADOS</span>
            </div>
            <span className="block text-4xl sm:text-5xl lg:text-6xl font-black font-anton text-[#1F1305] tracking-tight pt-1">
              {totalPersonas}
            </span>
            <span className="text-[11px] uppercase font-bold text-[#665D4F] block tracking-wider">
              Músicos & Guitarristas
            </span>
          </div>

          <div className="p-5 sm:p-6 space-y-1 relative">
            <div className="flex items-center justify-between text-[11px] text-[#665D4F] font-black pb-1 border-b border-[#EDE0D0]">
              <span>EXP-04 / SELLOS</span>
              <span className="text-[#E80000]">MATRICULADOS</span>
            </div>
            <span className="block text-4xl sm:text-5xl lg:text-6xl font-black font-anton text-[#E80000] tracking-tight pt-1">
              {totalSellos}
            </span>
            <span className="text-[11px] uppercase font-bold text-[#665D4F] block tracking-wider">
              Sellos Discográficos
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
