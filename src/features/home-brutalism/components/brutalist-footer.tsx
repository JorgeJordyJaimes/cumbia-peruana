import Link from "next/link";
import { Mail, ArrowUpRight } from "lucide-react";

export function BrutalistFooter() {
  return (
    <footer className="w-full bg-[#1F1305] text-white border-t-2 border-[#1F1305]">
      <div className="flex flex-col lg:flex-row">
        
        {/* BANNER VERTICAL LATERAL (como en el afiche: LET'S BUILD SOMETHING BOLD) */}
        <div className="lg:w-16 bg-[#2A1C0E] border-b-2 lg:border-b-0 lg:border-r-2 border-[#3E2C1B] flex items-center justify-center py-4 lg:py-8 shrink-0">
          <div className="flex items-center gap-3 lg:rotate-180 lg:[writing-mode:vertical-rl] font-mono font-bold text-[#F1730C] tracking-widest text-xs uppercase select-none">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#E80000] shadow-[0_0_6px_#E80000]" />
            <span>PRESERVACIÓN COLECTIVA</span>
          </div>
        </div>

        {/* CONTENIDO PRINCIPAL DEL FOOTER */}
        <div className="flex-1 p-6 sm:p-10 lg:p-14 space-y-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* COLUMNA 1: TITULAR DE COLABORACIÓN */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#E80000] uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E80000] animate-pulse" />
                <span>COMUNIDAD & RESCATE DE VINILOS</span>
              </div>

              <h3 className="font-anton text-3xl sm:text-5xl lg:text-6xl text-[#F1730C] tracking-tight uppercase leading-[0.95]">
                ¿TIENES DATOS INÉDITOS O UN VINILO RARO?
              </h3>

              <p className="font-mono text-xs sm:text-sm text-[#B8AFA6] max-w-lg leading-relaxed">
                Este archivo se nutre del aporte de coleccionistas, familiares de músicos y amantes
                del vinilo analógico. Escríbenos para corregir fichas técnicas, sumar prensajes
                en 45 RPM o compartir fotografías históricas de época.
              </p>

              <div className="pt-2">
                <a
                  href="mailto:soundkumbia@gmail.com?subject=Aporte%20al%20Archivo%20Kumbia%20Sound"
                  className="inline-flex items-center gap-2 border-2 border-[#1F1305] bg-[#E80000] px-6 py-3 font-mono text-xs font-bold text-white shadow-[4px_4px_0px_#EDE0D0] hover:bg-white hover:text-[#1F1305] hover:border-[#1F1305] hover:shadow-[4px_4px_0px_#E80000] transition-all active:translate-x-0.5 active:translate-y-0.5"
                >
                  <Mail className="h-4 w-4" />
                  <span>ESCRIBIR AL ARCHIVO</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* COLUMNA 2: ENLACES & REDES SOCIALES */}
            <div className="lg:col-span-3 space-y-4 font-mono text-xs">
              <div className="font-bold tracking-widest text-white uppercase border-b border-[#3E2C1B] pb-2 flex items-center justify-between">
                <span>CONTACTO & REDES —</span>
                <span className="text-[#E80000]">★</span>
              </div>

              <div className="space-y-2.5 text-[#B8AFA6]">
                <div>
                  <a
                    href="mailto:soundkumbia@gmail.com"
                    className="hover:text-[#E80000] transition-colors flex items-center gap-2"
                  >
                    <span>✉ soundkumbia@gmail.com</span>
                  </a>
                </div>

                <div>
                  <a
                    href="https://spotify.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors flex items-center justify-between"
                  >
                    <span>SPOTIFY // PLAYLISTS</span>
                    <ArrowUpRight className="h-3 w-3 text-[#E80000]" />
                  </a>
                </div>

                <div>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors flex items-center justify-between"
                  >
                    <span>YOUTUBE // ARCHIVO</span>
                    <ArrowUpRight className="h-3 w-3 text-[#E80000]" />
                  </a>
                </div>

                <div>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors flex items-center justify-between"
                  >
                    <span>INSTAGRAM // DISCOS</span>
                    <ArrowUpRight className="h-3 w-3 text-[#F1730C]" />
                  </a>
                </div>

                <div className="pt-2 border-t border-[#3E2C1B]">
                  <Link
                    href="/admin"
                    className="text-[#E80000] font-bold hover:underline flex items-center gap-1.5"
                  >
                    <span>PANEL DE ADMINISTRACIÓN</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>

            {/* COLUMNA 3: SELLO CIRCULAR CON ISOTIPO KUMBIA SOUND */}
            <div className="lg:col-span-3 flex flex-col items-center lg:items-end justify-between space-y-6">
              
              {/* SELLO CIRCULAR ESTILO POSTER */}
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
                <svg
                  className="w-full h-full animate-spin"
                  style={{ animationDuration: "35s" }}
                  viewBox="0 0 100 100"
                >
                  <path
                    id="circlePath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="none"
                  />
                  <text className="font-mono text-[8.5px] uppercase font-bold tracking-[2px] fill-[#8E8478]">
                    <textPath href="#circlePath">
                      • KUMBIA SOUND ★ ARCHIVO VIVO ★ PERÚ • 1968-2005
                    </textPath>
                  </text>
                </svg>

                {/* LOGO KS CON EL ISOTIPO OFICIAL TRANSPARENTE */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full border-2 border-[#1F1305] bg-[#1F1305] flex items-center justify-center shadow-[2px_2px_0px_#E80000] p-1.5 overflow-hidden group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/kumbia-sound-logo-cropped.png"
                      alt="Logo Kumbia Sound"
                      className="w-full h-full object-contain filter drop-shadow-[0_0_3px_#E80000]"
                    />
                  </div>
                </div>
              </div>

              {/* CÓDIGO DE BARRAS GRÁFICO (como en el afiche de referencia) */}
              <div className="space-y-1 text-center lg:text-right font-mono text-[9px] text-[#8E8478]">
                <div className="font-mono text-xl sm:text-2xl tracking-tighter text-[#EDE0D0] font-bold select-none leading-none">
                  ||| | ||||| | ||| |||||| | || ||| |||| | |||
                </div>
                <div>KS-CAT-PE-1968-2005-BRUTALISM</div>
              </div>

            </div>

          </div>

          {/* CRÉDITOS INFERIORES */}
          <div className="pt-6 border-t border-[#3E2C1B] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-[#8E8478]">
            <p>© 2026 Kumbia Sound. Hecho con pasión por el vinilo analógico y la cumbia peruana.</p>
            <div className="flex items-center gap-4">
              <Link href="/nosotros" className="hover:text-[#E80000] transition-colors">
                Manifiesto
              </Link>
              <span>•</span>
              <Link href="/blog" className="hover:text-[#E80000] transition-colors">
                Crónicas
              </Link>
              <span>•</span>
              <Link href="/match-bpm" className="hover:text-[#F1730C] transition-colors">
                Match BPM
              </Link>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}
