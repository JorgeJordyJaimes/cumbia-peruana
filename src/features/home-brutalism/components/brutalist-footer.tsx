import Link from "next/link";
import { Mail, ArrowUpRight } from "lucide-react";

export function BrutalistFooter() {
  return (
    <footer className="w-full bg-[#1F1305] text-white border-t border-[#1F1305] select-none">
      <div className="flex flex-col lg:flex-row">
        
        {/* BANNER VERTICAL LATERAL: ESPECIFICACIÓN DE PLANTA */}
        <div className="lg:w-16 bg-[#2A1C0E] border-b lg:border-b-0 lg:border-r border-[#3E2C1B] flex items-center justify-center py-4 lg:py-8 shrink-0">
          <div className="flex items-center gap-3 lg:rotate-180 lg:[writing-mode:vertical-rl] font-mono font-bold text-[#F1730C] tracking-widest text-xs uppercase select-none">
            <span className="inline-block w-2 h-2 bg-[#E80000]" />
            <span>[HOJA DE CONTROL // PRESERVACIÓN]</span>
          </div>
        </div>

        {/* CONTENIDO PRINCIPAL DEL FOOTER */}
        <div className="flex-1 p-6 sm:p-10 lg:p-12 space-y-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* COLUMNA 1: TITULAR DE COLABORACIÓN Y CONTROL */}
            <div className="lg:col-span-6 space-y-3.5">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#E80000] uppercase tracking-wider">
                <span className="w-1.5 h-1.5 bg-[#E80000]" />
                <span>[DEPTO. DE CALIDAD] REGISTRO COLECTIVO DE VINILOS</span>
              </div>

              <h3 className="font-anton text-2xl sm:text-4xl lg:text-5xl text-[#F1730C] tracking-tight uppercase leading-[0.95]">
                ¿TIENES DATOS DE MATRICES O VINILOS INÉDITOS?
              </h3>

              <p className="font-mono text-xs sm:text-[13px] text-[#B8AFA6] max-w-lg leading-relaxed">
                El archivo fonográfico de Kumbia Sound se audita con aportes de coleccionistas,
                ingenieros de masterización y familiares de músicos. Escríbenos para certificar números
                de catálogo, prensajes en 45 RPM o fotografías de galleta.
              </p>

              <div className="pt-2">
                <a
                  href="mailto:soundkumbia@gmail.com?subject=Aporte%20al%20Archivo%20Kumbia%20Sound"
                  className="inline-flex items-center gap-2 border border-[#3E2C1B] bg-[#E80000] px-5 py-3 font-mono text-xs font-bold text-white hover:bg-white hover:text-[#1F1305] transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span>[COMUNICAR MATRIZ AL ARCHIVO]</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* COLUMNA 2: ENLACES & REDES SOCIALES */}
            <div className="lg:col-span-3 space-y-3 font-mono text-xs">
              <div className="font-bold tracking-widest text-white uppercase border-b border-[#3E2C1B] pb-2 flex items-center justify-between">
                <span>[REGISTRO] CONTACTO & REDES</span>
                <span className="text-[#E80000]">+</span>
              </div>

              <div className="space-y-2 text-[#B8AFA6]">
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
                    <span>[ACCESO] PANEL DE CONTROL</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>

            {/* COLUMNA 3: SELLO ESQUEMÁTICO & CÓDIGO DE BARRAS */}
            <div className="lg:col-span-3 flex flex-col items-center lg:items-end justify-between space-y-6">
              
              {/* SELLO TÉCNICO ROTATORIO */}
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
                      • KUMBIA SOUND + ESPECIFICACIÓN MATRIZ + 1968-2005
                    </textPath>
                  </text>
                </svg>

                {/* LOGO KS CON ISOTIPO */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-13 h-13 rounded-none border border-[#EDE0D0] bg-[#1F1305] flex items-center justify-center p-1.5 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/branding/kumbia-sound-logo-cropped.png"
                      alt="Logo Kumbia Sound"
                      className="w-full h-full object-contain filter drop-shadow-[0_0_2px_#E80000]"
                    />
                  </div>
                </div>
              </div>

              {/* CÓDIGO DE BARRAS DE TRAZABILIDAD */}
              <div className="space-y-1 text-center lg:text-right font-mono text-[9px] text-[#8E8478]">
                <div className="font-mono text-xl sm:text-2xl tracking-tighter text-[#EDE0D0] font-bold select-none leading-none">
                  ||| | ||||| | ||| |||||| | || ||| |||| | |||
                </div>
                <div>DOC-BLUEPRINT-MATRIZ-1968-2005</div>
              </div>

            </div>

          </div>

          {/* CRÉDITOS INFERIORES */}
          <div className="pt-5 border-t border-[#3E2C1B] flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[10px] text-[#8E8478]">
            <p>© 2026 Kumbia Sound. Archivo Fonográfico Documental de la Cumbia Peruana.</p>
            <div className="flex items-center gap-3">
              <Link href="/nosotros" className="hover:text-[#EDE0D0] transition-colors">
                [MANIFIESTO]
              </Link>
              <span>+</span>
              <Link href="/blog" className="hover:text-[#EDE0D0] transition-colors">
                [CRÓNICAS]
              </Link>
              <span>+</span>
              <Link href="/vinilos" className="hover:text-[#EDE0D0] transition-colors">
                [VINILOS]
              </Link>
              <span>+</span>
              <Link href="/match-bpm" className="hover:text-[#EDE0D0] transition-colors">
                [MATCH BPM]
              </Link>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}
