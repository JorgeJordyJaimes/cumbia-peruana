import Link from "next/link";
import { ArrowUpRight, Globe, Disc, Crosshair } from "lucide-react";

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
    <section className="relative w-full border-b-2 border-black bg-[#EAE6DF] text-black overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-20">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* COLUMNA IZQUIERDA: Titular Monolítico & Manifiesto */}
          <div className="lg:col-span-7 space-y-8 z-10">
            {/* Meta etiqueta superior con guión */}
            <div className="flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-neutral-600">
              <span className="inline-block w-4 h-1 bg-[#F04E23]" />
              <span>SISTEMA DE ARCHIVO HISTÓRICO • VOL. 01</span>
            </div>

            {/* TITULAR POSTER GIGANTE EN ANTON */}
            <div className="space-y-0 leading-[0.85] tracking-tighter select-none font-anton uppercase text-[72px] sm:text-[110px] md:text-[136px] lg:text-[150px] xl:text-[168px]">
              <div className="text-[#1A1A1A] drop-shadow-sm">
                CUMBIA
              </div>
              <div className="text-[#1A1A1A] drop-shadow-sm">
                CON
              </div>
              <div className="text-[#F04E23] flex items-baseline">
                <span>PODER</span>
                <span className="inline-block w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-black ml-2 sm:ml-4 align-baseline" />
              </div>
            </div>

            {/* BLOQUE "ABOUT ME —" ADAPTADO A KUMBIA SOUND */}
            <div className="pt-2 max-w-xl space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs font-black tracking-widest uppercase">
                <span>SOBRE EL ARCHIVO —</span>
              </div>

              <p className="font-mono text-xs sm:text-sm text-neutral-800 leading-relaxed">
                Documentamos la era dorada de la cumbia peruana (1968–2005). Conectamos a los
                guitarristas de sesión ocultos, los prensajes matrices en 45 RPM, los sellos
                independientes y las herramientas de mezcla armónica para DJs e investigadores.
              </p>

              <div className="font-mono text-[11px] sm:text-xs text-neutral-600 space-y-1">
                <p>— Sin ruido comercial. Máximo rigor musicológico.</p>
                <p>— Acceso abierto y preservación analógica sin fines de lucro.</p>
              </div>

              {/* GLOBO & BADGE DE DISPONIBILIDAD GLOBAL */}
              <div className="pt-3 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2.5 border-2 border-black bg-white px-3.5 py-2 font-mono text-xs shadow-[3px_3px_0px_#000]">
                  <Globe className="h-4 w-4 text-[#F04E23]" />
                  <span className="font-bold">
                    CONSULTA ABIERTA • {totalAlbumes}+ PRENSAJES • {totalPersonas}+ MÚSICOS
                  </span>
                </div>
              </div>
            </div>

            {/* BOTONES DE LLAMADA A LA ACCIÓN (CTAs) */}
            <div className="pt-4 flex flex-wrap items-center gap-3 font-mono text-xs font-bold">
              <Link
                href="/genealogia"
                className="inline-flex items-center gap-2 border-2 border-black bg-black px-6 py-3.5 text-white shadow-[4px_4px_0px_#F04E23] hover:bg-[#F04E23] hover:text-white hover:border-black transition-all active:translate-x-0.5 active:translate-y-0.5"
              >
                <span>EXPLORAR ÁRBOL GENEALÓGICO</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>

              <Link
                href="/match-bpm"
                className="inline-flex items-center gap-2 border-2 border-black bg-[#F04E23] px-6 py-3.5 text-white shadow-[4px_4px_0px_#000] hover:bg-white hover:text-black transition-all active:translate-x-0.5 active:translate-y-0.5"
              >
                <span>CONSOLA MATCH BPM DJ</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>

              <Link
                href="/#catalogo-vinilos"
                className="inline-flex items-center gap-2 border-2 border-black bg-white px-5 py-3.5 text-black shadow-[4px_4px_0px_#000] hover:bg-black hover:text-white transition-all active:translate-x-0.5 active:translate-y-0.5"
              >
                <Disc className="h-4 w-4 text-[#F04E23]" />
                <span>VER VINILOS</span>
              </Link>
            </div>
          </div>

          {/* COLUMNA DERECHA: Fotografía Icónica con Bloque Naranja y Crosshair */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[420px] sm:max-w-[480px]">
              
              {/* Símbolo Crosshair / Diana decorativa en la esquina superior */}
              <div className="absolute top-2 right-4 z-20 pointer-events-none opacity-80">
                <div className="relative flex items-center justify-center h-12 w-12 text-black">
                  <Crosshair className="h-10 w-10 text-black stroke-1 animate-spin duration-1000" style={{ animationDuration: "25s" }} />
                  <div className="absolute h-6 w-6 rounded-full border border-black" />
                </div>
              </div>

              {/* FOTOGRAFÍA EXACTA DEL AFICHE */}
              <div className="relative z-10 border-2 border-black bg-[#EAE6DF] shadow-[8px_8px_0px_#111111] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/hero-brutalist.png"
                  alt="Kumbia Sound - Estética Editorial Brutalista"
                  className="w-full h-auto object-cover block filter contrast-105 brightness-95"
                />

                {/* ETIQUETA INFORMATIVA SUPERPUESTA AL ESTILO DE LA IMAGEN */}
                <div className="absolute bottom-4 right-4 z-20 border-2 border-black bg-[#161616] p-3 text-right font-mono text-[10px] sm:text-xs shadow-[3px_3px_0px_#F04E23]">
                  <p className="font-bold text-white tracking-widest uppercase">
                    KUMBIA SOUND
                  </p>
                  <p className="text-[#F04E23] font-black tracking-wider text-[9px] uppercase">
                    ARCHIVO VIVO 1968–2005
                  </p>
                </div>

                {/* Sello de coordenadas en el borde izquierdo */}
                <div className="absolute top-4 left-3 z-20 font-mono text-[9px] uppercase tracking-widest text-black bg-white/80 px-2 py-0.5 border border-black">
                  REF • 45 RPM • LP
                </div>
              </div>

              {/* Sombra de bloque brutalista decorativa inferior */}
              <div className="absolute -bottom-4 -left-4 w-full h-full border-2 border-black bg-[#F04E23] -z-0" />
            </div>
          </div>

        </div>

        {/* TIRA DE DATOS TÉCNICOS BRUTALISTA AL PIE DEL HERO */}
        <div className="mt-12 sm:mt-16 pt-6 border-t-2 border-black grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
          <div className="border border-black bg-white p-3 shadow-[2px_2px_0px_#000]">
            <span className="block text-2xl sm:text-3xl font-black font-anton text-black">
              {totalAlbumes}+
            </span>
            <span className="text-[10px] uppercase font-bold text-neutral-600">
              Prensajes en Vinilo
            </span>
          </div>

          <div className="border border-black bg-white p-3 shadow-[2px_2px_0px_#000]">
            <span className="block text-2xl sm:text-3xl font-black font-anton text-[#F04E23]">
              {totalGrupos}
            </span>
            <span className="text-[10px] uppercase font-bold text-neutral-600">
              Agrupaciones Históricas
            </span>
          </div>

          <div className="border border-black bg-white p-3 shadow-[2px_2px_0px_#000]">
            <span className="block text-2xl sm:text-3xl font-black font-anton text-black">
              {totalPersonas}
            </span>
            <span className="text-[10px] uppercase font-bold text-neutral-600">
              Músicos de Sesión
            </span>
          </div>

          <div className="border border-black bg-white p-3 shadow-[2px_2px_0px_#000]">
            <span className="block text-2xl sm:text-3xl font-black font-anton text-[#F04E23]">
              {totalSellos}
            </span>
            <span className="text-[10px] uppercase font-bold text-neutral-600">
              Sellos Discográficos
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
