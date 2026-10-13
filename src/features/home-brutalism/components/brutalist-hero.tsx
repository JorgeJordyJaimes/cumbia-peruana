import Link from "next/link";
import { ArrowUpRight, Disc, Sliders, Radio, Music2, Cpu } from "lucide-react";

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
    <section className="relative w-full border-b-2 border-[#1F1305] bg-[#EDE0D0] text-[#1F1305] overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16 select-none">
      <div className="container mx-auto max-w-7xl px-3 sm:px-6">
        
        {/* BARRA SUPERIOR DE TELEMETRÍA DE CABINA */}
        <div className="mb-6 border-2 border-[#1F1305] bg-[#1F1305] text-white px-3 sm:px-4 py-2 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] sm:text-xs shadow-[3px_3px_0px_#E80000]">
          <div className="flex items-center gap-2">
            <span className="text-[#E80000] font-black animate-pulse">● LIVE CONSOLE</span>
            <span className="text-[#8E8478]">|</span>
            <span className="text-[#EDE0D0] font-bold">ESTUDIOS IEMPSA & INFOPESA (LIMA)</span>
          </div>
          <div className="flex items-center gap-3 text-[#F1730C]">
            <span className="hidden sm:inline font-bold">TC [ 01:24:59:18 ]</span>
            <span className="text-[#8E8478] hidden sm:inline">|</span>
            <span className="text-white font-bold">CALIBRACIÓN 440 Hz</span>
            <span className="text-[#E80000] font-bold bg-[#E80000]/20 px-1 border border-[#E80000]">ARMED</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* COLUMNA IZQUIERDA: Mandos de la Consola Maestra */}
          <div className="lg:col-span-7 space-y-6 z-10">
            {/* Meta etiqueta: Módulo de Monitoreo */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs font-bold tracking-widest text-[#746B5C]">
              <span className="inline-block w-4 h-1 bg-[#E80000]" />
              <span>SISTEMA DE MONITOREO // CANAL VOCAL 01</span>
              <span className="inline-flex items-center gap-1 border border-[#E80000] bg-[#E80000]/10 px-2 py-0.5 text-[9px] text-[#E80000] font-black uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E80000] animate-pulse" />
                CLAUDIO MORÁN LIVE
              </span>
            </div>

            {/* TITULAR POSTER GIGANTE EN ANTON: ESTÉTICA DE TERMINAL DE CABINA */}
            <div className="space-y-0 leading-[0.88] tracking-tighter select-none font-anton uppercase text-[50px] sm:text-[72px] md:text-[90px] lg:text-[100px] xl:text-[114px]">
              <div className="text-[#1F1305]">
                MONITOREO MAESTRO
              </div>
              <div className="text-[#F1730C] flex items-baseline">
                <span>CUMBIA CON PODER</span>
                <span className="inline-block w-3.5 h-3.5 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-[#1F1305] ml-2 sm:ml-4 align-baseline relative">
                  <span className="absolute inset-1 bg-[#E80000]" />
                </span>
              </div>
            </div>

            {/* DESCRIPCIÓN EDITORIAL TÉCNICA */}
            <div className="max-w-xl space-y-3 font-mono text-xs sm:text-sm text-[#4A4036] leading-relaxed">
              <div className="border-l-2 border-[#E80000] pl-3 py-0.5 font-bold text-[#1F1305]">
                RESCATE DE MATRICES ANALÓGICAS & SESIONES EN CINTA ABIERTA (1968–2005)
              </div>
              <p>
                Documentamos la acústica y el virtuosismo de <strong>Alfonso Alejandro Morán Sirumbal («Claudio Morán»)</strong>,
                voz matriz de Los Destellos y figura continental de Infopesa. Conectamos músicos de sesión, calibración armónica
                en Rueda Camelot y análisis de surco en prensajes de 33 y 45 RPM.
              </p>
            </div>

            {/* CREDENCIALES DE GRABACIÓN */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <div className="flex items-center gap-2 border-2 border-[#1F1305] bg-white px-3 py-1.5 shadow-[2px_2px_0px_#1F1305]">
                <Music2 className="h-3.5 w-3.5 text-[#E80000]" />
                <span className="font-bold text-[#1F1305]">LOS DESTELLOS</span>
              </div>
              <div className="flex items-center gap-2 border-2 border-[#1F1305] bg-white px-3 py-1.5 shadow-[2px_2px_0px_#1F1305]">
                <Cpu className="h-3.5 w-3.5 text-[#F1730C]" />
                <span className="font-bold text-[#1F1305]">CUARTETO CONTINENTAL</span>
              </div>
              <div className="flex items-center gap-2 border-2 border-[#1F1305] bg-white px-3 py-1.5 shadow-[2px_2px_0px_#1F1305]">
                <Radio className="h-3.5 w-3.5 text-[#E80000]" />
                <span className="font-bold text-[#1F1305]">INFOPESA • ODEÓN • IEMPSA</span>
              </div>
            </div>

            {/* CONMUTADORES DE RUTEO DIRECTO A LOS BUSES (CTAs) */}
            <div className="pt-2 flex flex-wrap items-center gap-3 font-mono text-xs font-bold">
              <Link
                href="/genealogia"
                className="inline-flex items-center gap-2 border-2 border-[#1F1305] bg-[#1F1305] px-5 sm:px-6 py-3.5 text-white shadow-[4px_4px_0px_#E80000] hover:bg-[#E80000] hover:text-white hover:border-[#1F1305] transition-all active:translate-x-0.5 active:translate-y-0.5"
              >
                <span className="text-[#E80000] font-black group-hover:text-white">BUS 01:</span>
                <span>EXPLORADOR GENEALÓGICO</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>

              <Link
                href="/match-bpm"
                className="inline-flex items-center gap-2 border-2 border-[#1F1305] bg-[#F1730C] px-5 sm:px-6 py-3.5 text-white shadow-[4px_4px_0px_#1F1305] hover:bg-[#E80000] hover:text-white hover:shadow-[4px_4px_0px_#1F1305] transition-all active:translate-x-0.5 active:translate-y-0.5"
              >
                <span className="text-white font-black">BUS 02:</span>
                <span>CONSOLA MATCH BPM DJ</span>
                <Sliders className="h-3.5 w-3.5 text-white" />
              </Link>

              <Link
                href="/vinilos"
                className="inline-flex items-center gap-2 border-2 border-[#1F1305] bg-white px-5 py-3.5 text-[#1F1305] shadow-[4px_4px_0px_#1F1305] hover:bg-[#1F1305] hover:text-white transition-all active:translate-x-0.5 active:translate-y-0.5"
              >
                <Disc className="h-4 w-4 text-[#E80000]" />
                <span>BÓVEDA DE VINILOS (BUS 06)</span>
              </Link>
            </div>
          </div>

          {/* COLUMNA DERECHA: LA PECERA DEL ESTUDIO (STUDIO LIVE BOOTH WINDOW) */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[440px] sm:max-w-[480px]">
              
              {/* CHASSIS DE MONITOREO DE CABINA CON TORNILLOS EN LAS ESQUINAS */}
              <div className="relative z-10 border-2 border-[#1F1305] bg-[#1F1305] p-3 shadow-[8px_8px_0px_#1F1305]">
                
                {/* Cabecera del Chasis: Tornillos de Rack y Estado ON AIR */}
                <div className="flex items-center justify-between border-b border-[#3E2C1B] pb-2 mb-2 font-mono text-[9px] text-[#B8AFA6]">
                  <span className="font-black text-[#E80000]">(·) RACK-19&quot; CABINA</span>
                  <div className="flex items-center gap-1.5 bg-[#E80000] text-white px-2 py-0.5 font-bold shadow-[1px_1px_0px_#000]">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                    <span>ON AIR // LIVE BOOTH</span>
                  </div>
                  <span className="font-black text-[#E80000]">(·)</span>
                </div>

                {/* LA PECERA: DOBLE VIDRIO ACÚSTICO */}
                <div className="relative border-2 border-[#3E2C1B] bg-[#EDE0D0] overflow-hidden flex flex-col justify-end pt-4 px-3 scanline-overlay">
                  
                  {/* Escala de Decibeles en el Borde Izquierdo */}
                  <div className="absolute top-2 left-2 z-20 font-mono text-[8px] text-[#1F1305] space-y-2 pointer-events-none font-bold">
                    <div className="text-[#E80000]">+3 dB [PK]</div>
                    <div className="text-[#F1730C]">0 dB [REF]</div>
                    <div>-3 dB</div>
                    <div>-7 dB</div>
                    <div>-12 dB</div>
                    <div>-20 dB</div>
                  </div>

                  {/* Escala de Ganancia en el Borde Derecho */}
                  <div className="absolute top-2 right-2 z-20 font-mono text-[8px] text-right text-[#1F1305] space-y-2 pointer-events-none font-bold">
                    <div className="text-[#E80000]">MIC GAIN: +48dB</div>
                    <div className="text-[#746B5C]">NEUMANN U87</div>
                    <div className="text-[#746B5C]">TAPE 456</div>
                    <div className="text-[#E80000]">MONITOR ON</div>
                  </div>

                  {/* Recorte de Claudio Morán */}
                  <div className="relative w-full h-[380px] sm:h-[430px] md:h-[470px] flex items-end justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/claudio-moran.png"
                      alt="Claudio Morán en la pecera de grabación - Kumbia Sound"
                      className="max-h-full max-w-full object-contain object-bottom filter contrast-110 drop-shadow-[0_12px_20px_rgba(31,19,5,0.4)] select-none"
                    />
                  </div>

                  {/* Placa de Identificación del Vocalista en la parte inferior */}
                  <div className="absolute bottom-3 left-3 right-3 z-20 border-2 border-[#1F1305] bg-[#1F1305] p-2.5 text-white font-mono shadow-[2px_2px_0px_#E80000]">
                    <div className="flex items-center justify-between text-[11px] font-bold">
                      <span className="flex items-center gap-1.5 text-white">
                        <span className="text-[#E80000]">★</span> CLAUDIO MORÁN
                      </span>
                      <span className="text-[9px] text-[#F8C800] uppercase font-black">
                        VOZ PRINCIPAL
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[9px] text-[#B8AFA6] pt-1 border-t border-[#3E2C1B] mt-1">
                      <span>EL REY DE LAS CUMBIAS PEGADITAS</span>
                      <span className="text-[#E80000] font-bold">CANAL A1</span>
                    </div>
                  </div>
                </div>

                {/* Pie del Chasis con Tornillos Inferiores */}
                <div className="flex items-center justify-between pt-2 font-mono text-[9px] text-[#8E8478]">
                  <span>(·) AUDIO LATHE CUTTER IEMPSA</span>
                  <span className="text-[#F1730C]">STEREO MATRIX Ø 180°</span>
                  <span>(·)</span>
                </div>
              </div>

              {/* Sombra de chasis sólida de 2px */}
              <div className="absolute -bottom-3 -left-3 w-full h-full border-2 border-[#1F1305] bg-[#F1730C] -z-0" />
            </div>
          </div>

        </div>

        {/* HOJA DE SESIÓN DE ESTUDIO (STUDIO MASTER LOG SHEET) */}
        <div className="mt-10 sm:mt-14 border-2 border-[#1F1305] bg-white p-4 sm:p-6 shadow-[5px_5px_0px_#1F1305] space-y-3 font-mono">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-[#1F1305] pb-2 text-xs">
            <div className="flex items-center gap-2 font-bold uppercase text-[#E80000]">
              <span className="w-2 h-2 bg-[#E80000]" />
              <span>HOJA DE SESIÓN // MASTER TAPE ARCHIVE: ALFONSO ALEJANDRO MORÁN SIRUMBAL</span>
            </div>
            <div className="text-[10px] text-[#746B5C] font-black uppercase">
              DOCUMENTO FONOGRÁFICO HISTÓRICO
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#3E3228] leading-relaxed">
            Alfonso Alejandro Morán Sirumbal, consagrado continentalmente como <strong>«Claudio Morán»</strong>,
            representa la articulación entre el lirismo de la cumbia costeña y el impacto popular de la producción en masa.
            Su paso por <strong>Los Destellos</strong> de Enrique Delgado sentó cátedra de afinación y ritmo sincopado;
            su posterior alianza con Alberto Maraví en <strong>Infopesa</strong> dio nacimiento al Cuarteto Continental y
            al concepto de las <em>Cumbias Pegaditas</em>, exportando el sonido del Perú a toda América Latina.
          </p>
        </div>

        {/* 4 MÓDULOS DE RACK TELEMÉTRICOS CON MEDICIÓN ANALÓGICA */}
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 font-mono">
          {/* Instrumento 1: Álbumes / Prensajes */}
          <div className="border-2 border-[#1F1305] bg-white p-3 shadow-[3px_3px_0px_#1F1305] flex flex-col justify-between">
            <div className="flex items-center justify-between text-[10px] text-[#746B5C] border-b border-[#1F1305]/20 pb-1 font-bold">
              <span>(·) METER 01</span>
              <span className="text-[#E80000]">VINYL VAULT</span>
            </div>
            <div className="py-2">
              <span className="block text-3xl sm:text-4xl font-black font-anton text-[#1F1305] tracking-tight">
                {totalAlbumes}+
              </span>
              <span className="text-[10px] uppercase font-bold text-[#746B5C] block">
                Prensajes en Vinilo
              </span>
            </div>
            {/* VU Meter Micro Bar */}
            <div className="h-1.5 w-full bg-[#EDE0D0] border border-[#1F1305] overflow-hidden">
              <div className="h-full bg-[#1F1305] w-[88%]" />
            </div>
          </div>

          {/* Instrumento 2: Grupos */}
          <div className="border-2 border-[#1F1305] bg-white p-3 shadow-[3px_3px_0px_#1F1305] flex flex-col justify-between">
            <div className="flex items-center justify-between text-[10px] text-[#746B5C] border-b border-[#1F1305]/20 pb-1 font-bold">
              <span>(·) METER 02</span>
              <span className="text-[#F1730C]">COMBOS</span>
            </div>
            <div className="py-2">
              <span className="block text-3xl sm:text-4xl font-black font-anton text-[#F1730C] tracking-tight">
                {totalGrupos}
              </span>
              <span className="text-[10px] uppercase font-bold text-[#746B5C] block">
                Agrupaciones Históricas
              </span>
            </div>
            {/* VU Meter Micro Bar */}
            <div className="h-1.5 w-full bg-[#EDE0D0] border border-[#1F1305] overflow-hidden">
              <div className="h-full bg-[#F1730C] w-[75%]" />
            </div>
          </div>

          {/* Instrumento 3: Músicos */}
          <div className="border-2 border-[#1F1305] bg-white p-3 shadow-[3px_3px_0px_#1F1305] flex flex-col justify-between">
            <div className="flex items-center justify-between text-[10px] text-[#746B5C] border-b border-[#1F1305]/20 pb-1 font-bold">
              <span>(·) METER 03</span>
              <span className="text-[#1F1305]">CREDITS</span>
            </div>
            <div className="py-2">
              <span className="block text-3xl sm:text-4xl font-black font-anton text-[#1F1305] tracking-tight">
                {totalPersonas}
              </span>
              <span className="text-[10px] uppercase font-bold text-[#746B5C] block">
                Músicos de Sesión
              </span>
            </div>
            {/* VU Meter Micro Bar */}
            <div className="h-1.5 w-full bg-[#EDE0D0] border border-[#1F1305] overflow-hidden">
              <div className="h-full bg-[#1F1305] w-[62%]" />
            </div>
          </div>

          {/* Instrumento 4: Sellos */}
          <div className="border-2 border-[#1F1305] bg-white p-3 shadow-[3px_3px_0px_#1F1305] flex flex-col justify-between">
            <div className="flex items-center justify-between text-[10px] text-[#746B5C] border-b border-[#1F1305]/20 pb-1 font-bold">
              <span>(·) METER 04</span>
              <span className="text-[#E80000]">LABELS</span>
            </div>
            <div className="py-2">
              <span className="block text-3xl sm:text-4xl font-black font-anton text-[#E80000] tracking-tight">
                {totalSellos}
              </span>
              <span className="text-[10px] uppercase font-bold text-[#746B5C] block">
                Sellos Discográficos
              </span>
            </div>
            {/* VU Meter Micro Bar */}
            <div className="h-1.5 w-full bg-[#EDE0D0] border border-[#1F1305] overflow-hidden">
              <div className="h-full bg-[#E80000] w-[94%]" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
