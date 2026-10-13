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
    <section className="relative w-full border-b border-[#1F1305] bg-[#EDE0D0] text-[#1F1305] overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16 select-none">
      {/* Guías de cota milimétrica de fondo */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06] bg-[radial-gradient(#1F1305_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
        
        {/* ENCABEZADO DE PLANO / BLUEPRINT BANNER */}
        <div className="border border-[#1F1305] bg-white/70 px-4 py-2 mb-8 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] tracking-widest text-[#5A5245] uppercase">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#E80000]">+ [COTA 00.0]</span>
            <span className="font-bold text-[#1F1305]">EXPEDIENTE TÉCNICO // FIGURA MATRIZ</span>
            <span className="border border-[#E80000] bg-[#E80000]/10 px-1.5 py-0.2 font-black text-[#E80000]">
              HOJA A-01
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-[#746B5C]">
            <span>CORTE DE MATRIZ: LACQUER DISK</span>
            <span>VELOCIDAD: 33⅓ & 45 RPM</span>
            <span>RESPUESTA: 20 HZ – 20 KHZ RIAA</span>
          </div>
          <div className="font-bold text-[#1F1305]">
            ESCALA DOCUMENTAL: 1:1
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* COLUMNA IZQUIERDA: Titular Monolítico & Especificación de Fábrica */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7">
            {/* Meta etiqueta de pieza acústica */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs font-bold tracking-widest text-[#746B5C]">
              <span className="text-[#E80000] font-black">+</span>
              <span className="text-[#1F1305] uppercase">MATRIZ MAESTRA // VOZ DE PLANTA</span>
              <span className="border border-[#1F1305] bg-[#1F1305] px-2 py-0.5 text-[9px] text-[#EDE0D0] font-black uppercase">
                ALFONSO ALEJANDRO MORÁN SIRUMBAL
              </span>
            </div>

            {/* TITULAR POSTER GIGANTE EN ANTON: EL REY DE LAS CUMBIAS PEGADITAS */}
            <div className="border-l-2 border-[#1F1305] pl-4 sm:pl-6 space-y-0 leading-[0.88] tracking-tighter font-anton uppercase text-[50px] sm:text-[72px] md:text-[90px] lg:text-[100px] xl:text-[112px]">
              <div className="text-[#1F1305]">
                EL REY DE LAS
              </div>
              <div className="text-[#1F1305]">
                CUMBIAS
              </div>
              <div className="text-[#F1730C] flex items-baseline">
                <span>PEGADITAS</span>
                <span className="inline-block w-3 h-3 sm:w-4 sm:h-4 bg-[#E80000] ml-3 align-baseline" />
              </div>
            </div>

            {/* FICHA TÉCNICA Y RESEÑA DOCUMENTAL */}
            <div className="border border-[#1F1305] bg-white/80 p-5 space-y-3 relative">
              {/* Marcas de cruceta de calibración en las 4 esquinas */}
              <span className="absolute -top-1.5 -left-1.5 font-mono text-xs text-[#E80000] font-bold leading-none">+</span>
              <span className="absolute -top-1.5 -right-1.5 font-mono text-xs text-[#E80000] font-bold leading-none">+</span>
              <span className="absolute -bottom-1.5 -left-1.5 font-mono text-xs text-[#E80000] font-bold leading-none">+</span>
              <span className="absolute -bottom-1.5 -right-1.5 font-mono text-xs text-[#E80000] font-bold leading-none">+</span>

              <div className="flex items-center justify-between border-b border-[#1F1305]/20 pb-2 font-mono text-[11px] font-bold uppercase text-[#1F1305]">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#E80000]" />
                  DOCUMENTACIÓN DE ORIGEN & PRENSADO
                </span>
                <span className="text-[#746B5C] text-[10px]">CÓDIGO: CLAUDIO-MORAN-01</span>
              </div>

              <p className="font-mono text-xs sm:text-[13px] text-[#3A3026] leading-relaxed">
                Trazabilidad fonográfica de <strong>Alfonso Alejandro Morán Sirumbal («Claudio Morán»)</strong>,
                voz angular del prensaje industrial que articuló la guitarra solista de Enrique Delgado en
                <strong> Los Destellos</strong> con la ingeniería de producción de Alberto Maraví en <strong>Infopesa</strong>.
                Un archivo de ingeniería acústica para reconstruir matrices originales, seudónimos contractuales
                y sincronía armónica de BPM.
              </p>

              {/* Parámetros de Sesión */}
              <div className="pt-2 flex flex-wrap items-center gap-2 font-mono text-[10px]">
                <span className="border border-[#1F1305] bg-[#EDE0D0] px-2 py-1 font-bold text-[#1F1305]">
                  SELLOS: ODEÓN • INFOPESA • VIRREY
                </span>
                <span className="border border-[#1F1305] bg-white px-2 py-1 font-bold text-[#E80000]">
                  GÉNEROS: CUMBIA COSTEÑA • PEGADITAS
                </span>
              </div>
            </div>

            {/* BOTONES DE ACCIÓN TÉCNICOS (SIN SOMBRAS, INTERRUPTORES DE PLANO) */}
            <div className="pt-2 flex flex-wrap items-center gap-3 font-mono text-xs font-bold">
              <Link
                href="/genealogia"
                className="inline-flex items-center gap-2 border border-[#1F1305] bg-[#1F1305] px-5 py-3 text-[#EDE0D0] hover:bg-[#E80000] hover:text-white transition-colors"
              >
                <span>[EXEC] ÁRBOL GENEALÓGICO</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>

              <Link
                href="/match-bpm"
                className="inline-flex items-center gap-2 border border-[#1F1305] bg-[#F1730C] px-5 py-3 text-white hover:bg-[#1F1305] transition-colors"
              >
                <span>[CALC] CONSOLA MATCH BPM</span>
                <span className="text-white text-[10px]">●</span>
              </Link>

              <Link
                href="/vinilos"
                className="inline-flex items-center gap-2 border border-[#1F1305] bg-white px-5 py-3 text-[#1F1305] hover:bg-[#1F1305] hover:text-white transition-colors"
              >
                <Disc className="h-4 w-4 text-[#E80000]" />
                <span>[CAT] BÓVEDA DE VINILOS</span>
              </Link>
            </div>
          </div>

          {/* COLUMNA DERECHA: Plano Esquemático de Claudio Morán */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[420px] sm:max-w-[460px]">
              
              {/* Cotas técnicas exteriores del disco de vinilo */}
              <div className="absolute -top-4 left-0 right-0 flex items-center justify-between font-mono text-[9px] text-[#746B5C] px-2">
                <span>|◄ 000 MM</span>
                <span className="tracking-widest">DIÁMETRO MATRIZ: 300 MM [12 PULGADAS]</span>
                <span>300 MM ►|</span>
              </div>

              {/* ENCUADRE DE PLANO TÉCNICO DE LA FOTOGRAFÍA */}
              <div className="relative z-10 border border-[#1F1305] bg-[#EDE0D0] overflow-hidden flex flex-col justify-end pt-6 px-4">
                
                {/* Marcas de registro cruzado */}
                <div className="absolute top-2 left-2 font-mono text-[9px] text-[#1F1305] font-bold">
                  + REG-TOP-LEFT
                </div>
                <div className="absolute top-2 right-2 font-mono text-[9px] text-[#E80000] font-bold">
                  PLANO: FOTO-01 +
                </div>

                {/* Recorte transparente de Claudio Morán con su acordeón */}
                <div className="relative w-full h-[380px] sm:h-[440px] md:h-[480px] flex items-end justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/claudio-moran.png"
                    alt="Claudio Morán con acordeón - Registro Técnico"
                    className="max-h-full max-w-full object-contain object-bottom filter contrast-110 drop-shadow-[0_8px_14px_rgba(31,19,5,0.2)] select-none"
                  />
                </div>

                {/* Ficha técnica inferior de la pieza */}
                <div className="border-t border-[#1F1305] bg-white p-3 font-mono text-[10px]">
                  <div className="flex items-center justify-between font-bold text-[#1F1305]">
                    <span>FIGURA N° 01 // RETRATO OFICIAL</span>
                    <span className="text-[#E80000]">ESCALA 1:1</span>
                  </div>
                  <div className="text-[#746B5C] text-[9px] uppercase tracking-wider mt-0.5">
                    INSTRUMENTO: ACORDEÓN HOHNER • VOZ TENOR LIGERO
                  </div>
                </div>
              </div>

              {/* Fondo de placa técnica descentrada */}
              <div className="absolute -bottom-2 -right-2 w-full h-full border border-[#1F1305] bg-[#F1730C]/10 -z-0 pointer-events-none" />
            </div>
          </div>

        </div>

        {/* TABLA DE TOLERANCIAS Y MÉTRICAS DE PRODUCCIÓN (PIE DEL HERO) */}
        <div className="mt-10 border border-[#1F1305] bg-white divide-y md:divide-y-0 md:divide-x divide-[#1F1305] grid grid-cols-2 md:grid-cols-4 font-mono text-xs">
          <div className="p-4 space-y-1">
            <span className="text-[10px] uppercase font-bold text-[#746B5C] block">
              [PARÁMETRO 01] MATRICES
            </span>
            <span className="block text-2xl sm:text-3xl font-black font-anton text-[#1F1305]">
              {totalAlbumes}+
            </span>
            <span className="text-[10px] text-[#5A5245] block">
              Discos catalogados a 33 & 45 RPM
            </span>
          </div>

          <div className="p-4 space-y-1">
            <span className="text-[10px] uppercase font-bold text-[#746B5C] block">
              [PARÁMETRO 02] AGRUPACIONES
            </span>
            <span className="block text-2xl sm:text-3xl font-black font-anton text-[#F1730C]">
              {totalGrupos}
            </span>
            <span className="text-[10px] text-[#5A5245] block">
              Orquestas, combos y conjuntos
            </span>
          </div>

          <div className="p-4 space-y-1">
            <span className="text-[10px] uppercase font-bold text-[#746B5C] block">
              [PARÁMETRO 03] MÚSICOS
            </span>
            <span className="block text-2xl sm:text-3xl font-black font-anton text-[#1F1305]">
              {totalPersonas}
            </span>
            <span className="text-[10px] text-[#5A5245] block">
              Sesionistas, compositores y directores
            </span>
          </div>

          <div className="p-4 space-y-1">
            <span className="text-[10px] uppercase font-bold text-[#746B5C] block">
              [PARÁMETRO 04] SELLOS
            </span>
            <span className="block text-2xl sm:text-3xl font-black font-anton text-[#E80000]">
              {totalSellos}
            </span>
            <span className="text-[10px] text-[#5A5245] block">
              Marcas discográficas registradas
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
