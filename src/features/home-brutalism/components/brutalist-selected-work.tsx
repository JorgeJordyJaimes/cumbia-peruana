import Link from "next/link";
import { ArrowUpRight, GitFork, Music2, Radio } from "lucide-react";

export function BrutalistSelectedWork() {
  return (
    <section className="relative w-full border-b-2 border-[#1F1305] bg-[#1F1305] text-white">
      <div className="flex flex-col lg:flex-row">
        
        {/* BANNER VERTICAL LATERAL (como SELECTED WORK en la imagen) */}
        <div className="lg:w-16 bg-[#F1730C] border-b-2 lg:border-b-0 lg:border-r-2 border-[#1F1305] flex items-center justify-center py-4 lg:py-8 shrink-0">
          <div className="flex items-center gap-3 lg:rotate-180 lg:[writing-mode:vertical-rl] font-anton text-[#1F1305] tracking-widest text-lg sm:text-xl uppercase select-none">
            <span className="inline-block w-3 h-3 bg-[#E80000]" />
            <span>APARTADOS DESTACADOS</span>
          </div>
        </div>

        {/* CONTENEDOR DE LAS 3 TARJETAS CON CODIFICACIÓN CROMÁTICA FUNCIONAL */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 divide-y-2 md:divide-y-0 md:divide-x-2 divide-[#3E2C1B]">
          
          {/* TARJETA 01: EXPLORADOR GENEALÓGICO (Acento Rojo de Maestros & Cápsula) */}
          <Link
            href="/genealogia"
            className="group relative p-6 sm:p-8 flex flex-col justify-between hover:bg-[#2A1C0E] transition-colors"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-[#E80000] font-bold text-sm sm:text-base">01/</span>
                <span className="text-[#8E8478] uppercase tracking-widest text-[10px]">
                  VALOR CULTURAL
                </span>
              </div>

              {/* Preview Gráfica */}
              <div className="aspect-[16/9] w-full border border-[#3E2C1B] bg-[#180E04] p-4 flex flex-col justify-between relative overflow-hidden group-hover:border-[#E80000] transition-colors">
                <div className="flex items-center justify-between">
                  <GitFork className="h-6 w-6 text-[#E80000]" />
                  <span className="font-mono text-[9px] text-[#EDE0D0] bg-[#1F1305]/80 px-2 py-0.5 border border-[#3E2C1B] flex items-center gap-1">
                    <span className="text-[#E80000]">★</span> 360+ SESIONISTAS
                  </span>
                </div>
                <div>
                  <h4 className="font-anton text-2xl tracking-wide uppercase text-white group-hover:text-[#E80000] transition-colors">
                    ÁRBOL & CRUCES
                  </h4>
                  <p className="font-mono text-[10px] text-[#B8AFA6]">
                    LOS DESTELLOS • MANZANITA • INFOPESA
                  </p>
                </div>
                {/* Cuadrito rojo decorativo en la esquina inferior */}
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#E80000] flex items-center justify-center">
                  <ArrowUpRight className="h-3.5 w-3.5 text-white" />
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#E80000] transition-colors">
                  Explorador Genealógico
                </h3>
                <p className="font-mono text-xs text-[#B8AFA6] line-clamp-2">
                  Rastrea qué guitarristas grabaron los solos y cómo los sellos rivales compartieron sesionistas.
                </p>
              </div>
            </div>

            <div className="pt-6 flex items-center justify-between font-mono text-xs text-[#E80000]">
              <span className="group-hover:underline">ABRIR APARTADO</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </Link>

          {/* TARJETA 02: CONSOLA MATCH BPM (Acento Rojo de Cabina DJ) */}
          <Link
            href="/match-bpm"
            className="group relative p-6 sm:p-8 flex flex-col justify-between hover:bg-[#2A1C0E] transition-colors"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-[#E80000] font-bold text-sm sm:text-base">02/</span>
                <span className="text-[#8E8478] uppercase tracking-widest text-[10px]">
                  UTILIDAD DJ
                </span>
              </div>

              {/* Preview Gráfica */}
              <div className="aspect-[16/9] w-full border border-[#3E2C1B] bg-[#180E04] p-4 flex flex-col justify-between relative overflow-hidden group-hover:border-[#E80000] transition-colors">
                <div className="flex items-center justify-between">
                  <Music2 className="h-6 w-6 text-[#E80000]" />
                  <span className="font-mono text-[9px] text-[#E80000] bg-[#1F1305]/80 px-2 py-0.5 border border-[#E80000]/40">
                    RUEDA CAMELOT
                  </span>
                </div>
                <div>
                  <h4 className="font-anton text-2xl tracking-wide uppercase text-white group-hover:text-[#E80000] transition-colors">
                    MATCH BPM CONSOLE
                  </h4>
                  <p className="font-mono text-[10px] text-[#B8AFA6]">
                    PITCH ±3% / ±5% • 440 HZ EXACTO
                  </p>
                </div>
                {/* Cuadrito rojo decorativo en la esquina inferior */}
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#E80000] flex items-center justify-center">
                  <ArrowUpRight className="h-3.5 w-3.5 text-white" />
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#E80000] transition-colors">
                  Consola de Mezcla Armónica
                </h3>
                <p className="font-mono text-xs text-[#B8AFA6] line-clamp-2">
                  Calcula mezclas matemáticamente exactas para cumbia costeña, amazónica, andina y chicha.
                </p>
              </div>
            </div>

            <div className="pt-6 flex items-center justify-between font-mono text-xs text-[#E80000]">
              <span className="group-hover:underline">ABRIR CONSOLA DJ</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </Link>

          {/* TARJETA 03: EL RADAR SONORO (Acento Ámbar de Prensajes 45 RPM) */}
          <Link
            href="/radar"
            className="group relative p-6 sm:p-8 flex flex-col justify-between hover:bg-[#2A1C0E] transition-colors"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-[#F1730C] font-bold text-sm sm:text-base">03/</span>
                <span className="text-[#8E8478] uppercase tracking-widest text-[10px]">
                  CURADURÍA 45 RPM
                </span>
              </div>

              {/* Preview Gráfica */}
              <div className="aspect-[16/9] w-full border border-[#3E2C1B] bg-[#180E04] p-4 flex flex-col justify-between relative overflow-hidden group-hover:border-[#F1730C] transition-colors">
                <div className="flex items-center justify-between">
                  <Radio className="h-6 w-6 text-[#F1730C]" />
                  <span className="font-mono text-[9px] text-[#EDE0D0] bg-[#1F1305]/80 px-2 py-0.5 border border-[#3E2C1B]">
                    SELECCIÓN SEMANAL
                  </span>
                </div>
                <div>
                  <h4 className="font-anton text-2xl tracking-wide uppercase text-white group-hover:text-[#F1730C] transition-colors">
                    EL RADAR SONORO
                  </h4>
                  <p className="font-mono text-[10px] text-[#B8AFA6]">
                    SINGLES 45s • ÁLBUM DEL MES • PLAYLISTS
                  </p>
                </div>
                {/* Cuadrito naranja decorativo en la esquina inferior */}
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#F1730C] flex items-center justify-center">
                  <ArrowUpRight className="h-3.5 w-3.5 text-[#1F1305]" />
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#F1730C] transition-colors">
                  Curaduría de Vinilos & Rarezas
                </h3>
                <p className="font-mono text-xs text-[#B8AFA6] line-clamp-2">
                  Grabaciones maestras de época restauradas y playlists oficiales para audiófilos y coleccionistas.
                </p>
              </div>
            </div>

            <div className="pt-6 flex items-center justify-between font-mono text-xs text-[#F1730C]">
              <span className="group-hover:underline">EXPLORAR RADAR</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </Link>

        </div>

      </div>
    </section>
  );
}
