import Link from "next/link";
import { Mail, ArrowUpRight } from "lucide-react";

export function BrutalistFooter() {
  return (
    <footer className="w-full bg-[#1F1305] text-white border-t-2 border-[#1F1305] select-none font-mono">
      <div className="flex flex-col lg:flex-row">
        
        {/* BANNER VERTICAL LATERAL DE AFICHE */}
        <div className="lg:w-16 bg-[#2A1C0E] border-b-2 lg:border-b-0 lg:border-r-2 border-[#3E2C1B] flex items-center justify-center py-4 lg:py-8 shrink-0">
          <div className="flex items-center gap-3 lg:rotate-180 lg:[writing-mode:vertical-rl] font-bold text-[#F1730C] tracking-widest text-xs uppercase select-none">
            <span className="inline-block w-2.5 h-2.5 bg-[#E80000]" />
            <span>COLOFÓN &amp; TALLER TIPOGRÁFICO</span>
          </div>
        </div>

        {/* CONTENIDO PRINCIPAL DEL FOOTER */}
        <div className="flex-1 p-6 sm:p-10 lg:p-12 space-y-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* COLUMNA 1: APORTE AL ARCHIVO */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#E80000] uppercase tracking-wider">
                <span className="w-2 h-2 bg-[#E80000]" />
                <span>DEPÓSITO DE MATRICES &amp; RESCATE HISTÓRICO</span>
              </div>

              <h3 className="font-anton text-3xl sm:text-5xl lg:text-6xl text-[#F1730C] tracking-tight uppercase leading-[0.95]">
                ¿TIENES DATOS INÉDITOS O UN VINILO RARO?
              </h3>

              <p className="text-xs sm:text-sm text-[#B8AFA6] max-w-lg leading-relaxed">
                Este archivo se nutre de la investigación independiente, coleccionistas y familiares
                de los músicos fundadores. Escríbenos para corregir autorías reales, incorporar prensajes
                en 45 RPM o compartir documentación fotográfica de época.
              </p>

              <div className="pt-2">
                <a
                  href="mailto:soundkumbia@gmail.com?subject=Aporte%20al%20Archivo%20Kumbia%20Sound"
                  className="inline-flex items-center gap-2 border-2 border-[#1F1305] bg-[#E80000] px-6 py-3 text-xs font-bold text-white shadow-[4px_4px_0px_#EDE0D0] hover:bg-white hover:text-[#1F1305] transition-all active:translate-x-0.5 active:translate-y-0.5"
                >
                  <Mail className="h-4 w-4" />
                  <span>CONTACTAR AL EQUIPO DE INVESTIGACIÓN</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* COLUMNA 2: CONTACTO Y PLATAFORMAS */}
            <div className="lg:col-span-3 space-y-4 text-xs">
              <div className="font-bold tracking-widest text-white uppercase border-b-2 border-[#3E2C1B] pb-2 flex items-center justify-between">
                <span>COMUNICACIÓN &amp; REDES —</span>
                <span className="text-[#E80000]">§</span>
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
                    <span>SPOTIFY // SELECCIÓN MASTER</span>
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
                    <span>YOUTUBE // ARCHIVO AUDIÓFILO</span>
                    <ArrowUpRight className="h-3 w-3 text-[#F1730C]" />
                  </a>
                </div>

                <div className="pt-2 text-[10px] text-[#746B5C] border-t border-[#3E2C1B]">
                  TIPOGRAFÍAS: ANTON &amp; COOPER BLACK<br />
                  SUSTRATO: PAPEL MARFIL SUIZO 120G
                </div>
              </div>
            </div>

            {/* COLUMNA 3: ÍNDICE DE SECCIONES */}
            <div className="lg:col-span-3 space-y-4 text-xs">
              <div className="font-bold tracking-widest text-white uppercase border-b-2 border-[#3E2C1B] pb-2 flex items-center justify-between">
                <span>ÍNDICE GENERAL —</span>
                <span className="text-[#F1730C]">VOL. I</span>
              </div>

              <div className="space-y-2">
                <Link
                  href="/genealogia"
                  className="block text-[#B8AFA6] hover:text-[#E80000] transition-colors"
                >
                  <span className="text-[#E80000] font-black mr-1.5">01.</span>
                  <span>Explorador Genealógico</span>
                </Link>

                <Link
                  href="/match-bpm"
                  className="block text-[#B8AFA6] hover:text-[#E80000] transition-colors"
                >
                  <span className="text-[#E80000] font-black mr-1.5">02.</span>
                  <span>Consola Match BPM DJ</span>
                </Link>

                <Link
                  href="/radar"
                  className="block text-[#B8AFA6] hover:text-[#F1730C] transition-colors"
                >
                  <span className="text-[#F1730C] font-black mr-1.5">03.</span>
                  <span>El Radar Sonoro 45 RPM</span>
                </Link>

                <Link
                  href="/blog"
                  className="block text-[#B8AFA6] hover:text-white transition-colors"
                >
                  <span className="text-[#746B5C] font-black mr-1.5">04.</span>
                  <span>Crónicas &amp; Periodismo</span>
                </Link>

                <Link
                  href="/nosotros"
                  className="block text-[#B8AFA6] hover:text-[#E80000] transition-colors"
                >
                  <span className="text-[#746B5C] font-black mr-1.5">05.</span>
                  <span>Nosotros &amp; Manifiesto</span>
                </Link>

                <Link
                  href="/vinilos"
                  className="block text-[#F1730C] hover:text-white transition-colors font-bold"
                >
                  <span className="text-white font-black mr-1.5">06.</span>
                  <span>Bóveda de Vinilos Completa</span>
                </Link>
              </div>
            </div>

          </div>

          {/* COLOFÓN EDITORIAL INFERIOR */}
          <div className="pt-8 border-t-2 border-[#3E2C1B] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#8E8478]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border border-white/20 bg-black flex items-center justify-center p-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/branding/kumbia-sound-logo-cropped.png"
                  alt="Kumbia Sound"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-bold text-white">KUMBIA SOUND ARCHIVE</span>
                <span className="text-[#746B5C] ml-2 text-[10px] hidden sm:inline">
                  — SERIE EDITORIAL MONOGRÁFICA 1968–2005
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-[11px]">
              <span className="text-[#F8C800] font-bold">
                POSTGRES SUPABASE ENGINE
              </span>
              <span>•</span>
              <span>LIMA, PERÚ</span>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
