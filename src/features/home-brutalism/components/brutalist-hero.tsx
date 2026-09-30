import Link from "next/link";
import { ArrowUpRight, Disc, Crosshair } from "lucide-react";

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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* COLUMNA IZQUIERDA: Titular Monolítico & Manifiesto */}
          <div className="lg:col-span-7 space-y-8 z-10">
            {/* Meta etiqueta superior con guión y micro-acento Rojo */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs font-bold tracking-widest text-[#746B5C]">
              <span className="inline-block w-4 h-1 bg-[#E80000]" />
              <span>SISTEMA DE ARCHIVO HISTÓRICO • VOL. 01</span>
              <span className="inline-flex items-center gap-1 border border-[#E80000] bg-[#E80000]/10 px-2 py-0.5 text-[9px] text-[#E80000] font-black uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E80000] animate-pulse" />
                HI-FI PERÚ
              </span>
            </div>

            {/* TITULAR POSTER GIGANTE EN ANTON */}
            <div className="space-y-0 leading-[0.85] tracking-tighter select-none font-anton uppercase text-[72px] sm:text-[110px] md:text-[136px] lg:text-[150px] xl:text-[168px]">
              <div className="text-[#1F1305] drop-shadow-sm">
                CUMBIA
              </div>
              <div className="text-[#1F1305] drop-shadow-sm">
                CON
              </div>
              <div className="text-[#F1730C] flex items-baseline">
                <span>PODER</span>
                <span className="inline-block w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-[#1F1305] ml-2 sm:ml-4 align-baseline relative">
                  <span className="absolute inset-1 bg-[#E80000]" />
                </span>
              </div>
            </div>

            {/* BLOQUE "ABOUT ME —" ADAPTADO A KUMBIA SOUND */}
            <div className="pt-2 max-w-xl space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs font-black tracking-widest uppercase text-[#1F1305]">
                <span>SOBRE EL ARCHIVO —</span>
              </div>

              <p className="font-mono text-xs sm:text-sm text-[#4A4036] leading-relaxed">
                Documentamos la era dorada de la cumbia peruana (1968–2005). Conectamos a los
                guitarristas de sesión ocultos, los prensajes matrices en 45 RPM, los sellos
                independientes y las herramientas de mezcla armónica para DJs e investigadores.
              </p>

              <div className="font-mono text-[11px] sm:text-xs text-[#746B5C] space-y-1">
                <p>— Sin ruido comercial. Máximo rigor musicológico.</p>
                <p>— Acceso abierto y preservación analógica sin fines de lucro.</p>
              </div>

              {/* VU-METER LED & BADGE DE DISPONIBILIDAD */}
              <div className="pt-3 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2.5 border-2 border-[#1F1305] bg-white px-3.5 py-2 font-mono text-xs shadow-[3px_3px_0px_#1F1305]">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#E80000] shadow-[0_0_4px_#E80000]" title="Canal L (REC)" />
                    <span className="w-2 h-2 rounded-full bg-[#F1730C] shadow-[0_0_4px_#F1730C]" title="Canal R (AUDIO)" />
                  </div>
                  <span className="font-bold text-[#1F1305]">
                    CONSULTA ABIERTA • {totalAlbumes}+ PRENSAJES • {totalPersonas}+ MÚSICOS
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
                <span>VER VINILOS</span>
              </Link>
            </div>
          </div>

          {/* COLUMNA DERECHA: Fotografía Icónica con Bloque Naranja y Crosshair Láser */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[420px] sm:max-w-[480px]">
              
              {/* Símbolo Crosshair / Diana con punto láser rojo central */}
              <div className="absolute top-2 right-4 z-20 pointer-events-none opacity-90">
                <div className="relative flex items-center justify-center h-12 w-12 text-[#1F1305]">
                  <Crosshair className="h-10 w-10 text-[#1F1305] stroke-1 animate-spin duration-1000" style={{ animationDuration: "25s" }} />
                  <div className="absolute h-6 w-6 rounded-full border border-[#1F1305]" />
                  <div className="absolute h-2 w-2 rounded-full bg-[#E80000] shadow-[0_0_6px_#E80000]" />
                </div>
              </div>

              {/* FOTOGRAFÍA EXACTA DEL AFICHE */}
              <div className="relative z-10 border-2 border-[#1F1305] bg-[#EDE0D0] shadow-[8px_8px_0px_#1F1305] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/hero-brutalist.png"
                  alt="Kumbia Sound - Estética Editorial Brutalista"
                  className="w-full h-auto object-cover block filter contrast-105 brightness-95"
                />

                {/* ETIQUETA INFORMATIVA CON ESTRELLA ROJA */}
                <div className="absolute bottom-4 right-4 z-20 border-2 border-[#1F1305] bg-[#1F1305] p-3 text-right font-mono text-[10px] sm:text-xs shadow-[3px_3px_0px_#E80000]">
                  <p className="font-bold text-white tracking-widest uppercase flex items-center justify-end gap-1.5">
                    <span className="text-[#E80000] font-black">★</span>
                    <span>KUMBIA SOUND</span>
                  </p>
                  <p className="text-[#E80000] font-black tracking-wider text-[9px] uppercase">
                    ARCHIVO VIVO 1968–2005
                  </p>
                </div>

                {/* Sello de coordenadas con indicador Rojo */}
                <div className="absolute top-4 left-3 z-20 font-mono text-[9px] uppercase tracking-widest text-[#1F1305] bg-white/90 px-2 py-0.5 border border-[#1F1305] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E80000]" />
                  REF • 45 RPM • LP
                </div>
              </div>

              {/* Sombra de bloque brutalista decorativa inferior */}
              <div className="absolute -bottom-4 -left-4 w-full h-full border-2 border-[#1F1305] bg-[#F1730C] -z-0" />
            </div>
          </div>

        </div>

        {/* TIRA DE DATOS TÉCNICOS BRUTALISTA AL PIE DEL HERO */}
        <div className="mt-12 sm:mt-16 pt-6 border-t-2 border-[#1F1305] grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
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
