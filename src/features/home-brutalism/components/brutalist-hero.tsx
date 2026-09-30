import Link from "next/link";
import { ArrowUpRight, Disc, Crosshair, Music2 } from "lucide-react";

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
    <section className="relative w-full border-b-2 border-[#1F1305] bg-[#EDE0D0] text-[#1F1305] overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-20">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* COLUMNA IZQUIERDA: Titular Monolítico & Manifiesto */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 z-10">
            {/* Meta etiqueta superior: Homenaje a Claudio Morán */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs font-bold tracking-widest text-[#746B5C]">
              <span className="inline-block w-4 h-1 bg-[#E80000]" />
              <span>FIGURA HISTÓRICA // VOZ INSIGNIA</span>
              <span className="inline-flex items-center gap-1 border border-[#E80000] bg-[#E80000]/10 px-2 py-0.5 text-[9px] text-[#E80000] font-black uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E80000] animate-pulse" />
                CLAUDIO MORÁN
              </span>
            </div>

            {/* TITULAR POSTER GIGANTE EN ANTON: EL REY DE LAS CUMBIAS PEGADITAS */}
            <div className="space-y-0 leading-[0.88] tracking-tighter select-none font-anton uppercase text-[50px] sm:text-[72px] md:text-[92px] lg:text-[102px] xl:text-[118px]">
              <div className="text-[#1F1305] drop-shadow-sm">
                EL REY DE LAS
              </div>
              <div className="text-[#1F1305] drop-shadow-sm">
                CUMBIAS
              </div>
              <div className="text-[#F1730C] flex items-baseline">
                <span>PEGADITAS</span>
                <span className="inline-block w-3.5 h-3.5 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-[#1F1305] ml-2 sm:ml-4 align-baseline relative">
                  <span className="absolute inset-1 bg-[#E80000]" />
                </span>
              </div>
            </div>

            {/* BLOQUE EDITORIAL SOBRE CLAUDIO MORÁN */}
            <div className="pt-1 max-w-xl space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs font-black tracking-widest uppercase text-[#1F1305]">
                <span>HOMENAJE AL ARTISTA —</span>
              </div>

              <p className="font-mono text-xs sm:text-sm text-[#4A4036] leading-relaxed">
                Documentamos la trayectoria de <strong>Alfonso Alejandro Morán Sirumbal («Claudio Morán»)</strong>,
                icono irrepetible que unió la guitarra de Enrique Delgado en Los Destellos con la visión
                productora de Alberto Maraví en Infopesa. Un archivo vivo dedicado a preservar sus grabaciones
                matrices, biografías cruzadas y sincronización armónica para coleccionistas y DJs.
              </p>

              {/* CHIP DE CREDENCIALES MUSICALES */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2.5 border-2 border-[#1F1305] bg-white px-3.5 py-2 font-mono text-xs shadow-[3px_3px_0px_#1F1305]">
                  <Music2 className="h-4 w-4 text-[#E80000]" />
                  <span className="font-bold text-[#1F1305]">
                    LOS DESTELLOS • CUARTETO CONTINENTAL • INFOPESA
                  </span>
                </div>
              </div>
            </div>

            {/* BOTONES DE LLAMADA A LA ACCIÓN (CTAs) */}
            <div className="pt-4 flex flex-wrap items-center gap-3 font-mono text-xs font-bold">
              <Link
                href="/genealogia"
                className="inline-flex items-center gap-2 border-2 border-[#1F1305] bg-[#1F1305] px-6 py-3.5 text-white shadow-[4px_4px_0px_#E80000] hover:bg-[#E80000] hover:text-white hover:border-[#1F1305] transition-all active:translate-x-0.5 active:translate-y-0.5"
              >
                <span>EXPLORAR ÁRBOL GENEALÓGICO</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>

              <Link
                href="/match-bpm"
                className="inline-flex items-center gap-2 border-2 border-[#1F1305] bg-[#F1730C] px-6 py-3.5 text-white shadow-[4px_4px_0px_#1F1305] hover:bg-[#E80000] hover:text-white hover:shadow-[4px_4px_0px_#1F1305] transition-all active:translate-x-0.5 active:translate-y-0.5"
              >
                <span>CONSOLA MATCH BPM DJ</span>
                <span className="text-white text-[10px]">●</span>
              </Link>

              <Link
                href="/#catalogo-vinilos"
                className="inline-flex items-center gap-2 border-2 border-[#1F1305] bg-white px-5 py-3.5 text-[#1F1305] shadow-[4px_4px_0px_#1F1305] hover:bg-[#1F1305] hover:text-white transition-all active:translate-x-0.5 active:translate-y-0.5"
              >
                <Disc className="h-4 w-4 text-[#F1730C]" />
                <span>VER DISCOGRAFÍA</span>
              </Link>
            </div>
          </div>

          {/* COLUMNA DERECHA: Fotografía Icónica de Claudio Morán con Acordeón */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[420px] sm:max-w-[480px]">
              
              {/* Símbolo Crosshair / Diana con punto láser rojo central */}
              <div className="absolute -top-3 -right-3 z-30 pointer-events-none opacity-90">
                <div className="relative flex items-center justify-center h-12 w-12 text-[#1F1305]">
                  <Crosshair className="h-10 w-10 text-[#1F1305] stroke-1 animate-spin duration-1000" style={{ animationDuration: "25s" }} />
                  <div className="absolute h-6 w-6 rounded-full border border-[#1F1305]" />
                  <div className="absolute h-2 w-2 rounded-full bg-[#E80000] shadow-[0_0_6px_#E80000]" />
                </div>
              </div>

              {/* MARCO POSTER EDITORIAL CON CLAUDIO MORÁN */}
              <div className="relative z-10 border-2 border-[#1F1305] bg-[#EDE0D0] shadow-[8px_8px_0px_#1F1305] overflow-hidden flex flex-col justify-end pt-6 px-4">
                
                {/* Sello de coordenadas superior izquierdo */}
                <div className="absolute top-4 left-4 z-20 font-mono text-[9px] uppercase tracking-widest text-[#1F1305] bg-white/95 px-2 py-0.5 border border-[#1F1305] flex items-center gap-1.5 shadow-[2px_2px_0px_#1F1305]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E80000]" />
                  VOZ OFICIAL • LOS DESTELLOS • INFOPESA
                </div>

                {/* Recorte transparente de Claudio Morán con su acordeón */}
                <div className="relative w-full h-[400px] sm:h-[460px] md:h-[500px] flex items-end justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/claudio-moran.png"
                    alt="Claudio Morán con acordeón - El Rey de las Cumbias Pegaditas"
                    className="max-h-full max-w-full object-contain object-bottom filter contrast-105 drop-shadow-[0_12px_18px_rgba(31,19,5,0.25)] select-none"
                  />
                </div>

                {/* ETIQUETA INFORMATIVA INFERIOR DERECHA */}
                <div className="absolute bottom-4 right-4 z-20 border-2 border-[#1F1305] bg-[#1F1305] p-3 text-right font-mono text-[10px] sm:text-xs shadow-[3px_3px_0px_#E80000]">
                  <p className="font-bold text-white tracking-widest uppercase flex items-center justify-end gap-1.5">
                    <span className="text-[#E80000] font-black">★</span>
                    <span>CLAUDIO MORÁN</span>
                  </p>
                  <p className="text-[#F1730C] font-black tracking-wider text-[9px] uppercase">
                    EL REY DE LAS CUMBIAS PEGADITAS
                  </p>
                </div>
              </div>

              {/* Sombra de bloque brutalista decorativa inferior */}
              <div className="absolute -bottom-4 -left-4 w-full h-full border-2 border-[#1F1305] bg-[#F1730C] -z-0" />
            </div>
          </div>

        </div>

        {/* PIE DE PÁGINA DEL HERO: CRÓNICA HISTÓRICA REESCRITA CON MÁXIMO RIGOR EDITORIAL */}
        <div className="mt-12 sm:mt-16 border-2 border-[#1F1305] bg-white p-5 sm:p-7 shadow-[5px_5px_0px_#1F1305] space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1F1305]/15 pb-2.5">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#E80000]">
              <span>★</span>
              <span>REGISTRO HISTÓRICO // ALFONSO ALEJANDRO MORÁN SIRUMBAL («CLAUDIO MORÁN»)</span>
            </div>
            <div className="font-mono text-[10px] text-[#746B5C] uppercase tracking-widest font-semibold">
              ARCHIVO BIOGRÁFICO • MATRICES ORIGINALES
            </div>
          </div>

          <p className="font-mono text-xs sm:text-sm text-[#3E3228] leading-relaxed">
            Alfonso Alejandro Morán Sirumbal, conocido artísticamente como <strong>«Claudio Morán»</strong>,
            es una de las voces insignia e imprescindibles de la cumbia peruana. Forjado en las filas fundacionales
            de <strong>Los Destellos</strong> junto al maestro Enrique Delgado, grabó decenas de obras maestras que
            marcaron época. Su consagración continental se selló definitivamente cuando el legendario productor
            Alberto Maraví lo convocó en <strong>Infopesa</strong> para registrar sesiones de versiones populares,
            gestando sin sospecharlo el fenómeno continental más vendedor de nuestra historia: <em>El Rey de las Cumbias Pegaditas</em>.
          </p>
        </div>

        {/* TIRA DE DATOS TÉCNICOS BRUTALISTA AL PIE DEL HERO */}
        <div className="mt-6 pt-6 border-t-2 border-[#1F1305] grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
          <div className="border border-[#1F1305] bg-white p-3 shadow-[2px_2px_0px_#1F1305]">
            <span className="block text-2xl sm:text-3xl font-black font-anton text-[#1F1305]">
              {totalAlbumes}+
            </span>
            <span className="text-[10px] uppercase font-bold text-[#746B5C]">
              Prensajes en Vinilo
            </span>
          </div>

          <div className="border border-[#1F1305] bg-white p-3 shadow-[2px_2px_0px_#1F1305]">
            <span className="block text-2xl sm:text-3xl font-black font-anton text-[#F1730C]">
              {totalGrupos}
            </span>
            <span className="text-[10px] uppercase font-bold text-[#746B5C]">
              Agrupaciones Históricas
            </span>
          </div>

          <div className="border border-[#1F1305] bg-white p-3 shadow-[2px_2px_0px_#1F1305]">
            <span className="block text-2xl sm:text-3xl font-black font-anton text-[#1F1305]">
              {totalPersonas}
            </span>
            <span className="text-[10px] uppercase font-bold text-[#746B5C]">
              Músicos de Sesión
            </span>
          </div>

          <div className="border border-[#1F1305] bg-white p-3 shadow-[2px_2px_0px_#1F1305]">
            <span className="block text-2xl sm:text-3xl font-black font-anton text-[#E80000]">
              {totalSellos}
            </span>
            <span className="text-[10px] uppercase font-bold text-[#746B5C]">
              Sellos Discográficos
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
