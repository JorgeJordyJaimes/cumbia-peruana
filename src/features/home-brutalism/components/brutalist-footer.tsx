import Link from "next/link";
import { Mail, ArrowUpRight, ShieldCheck } from "lucide-react";

export function BrutalistFooter() {
  return (
    <footer className="w-full bg-[#1F1305] brutalist-dots-dark text-white border-t-2 border-[#1F1305] select-none font-mono">
      <div className="flex flex-col lg:flex-row">
        
        {/* BANNER VERTICAL LATERAL DE CLAUSURA */}
        <div className="lg:w-16 bg-[#2A1C0E] border-b-2 lg:border-b-0 lg:border-r-2 border-[#3E2C1B] flex items-center justify-center py-4 lg:py-8 shrink-0">
          <div className="flex items-center gap-3 lg:rotate-180 lg:[writing-mode:vertical-rl] font-bold text-[#F1730C] tracking-widest text-xs uppercase select-none">
            <span className="inline-block w-2.5 h-2.5 bg-[#E80000]" />
            <span>ACTA DE CLAUSURA &amp; CUSTODIA</span>
          </div>
        </div>

        {/* CONTENIDO PRINCIPAL DEL FOOTER */}
        <div className="flex-1 p-6 sm:p-10 lg:p-12 space-y-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* COLUMNA 1: APORTE Y ENTREGA DE EVIDENCIAS */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#E80000] uppercase tracking-wider">
                <ShieldCheck className="h-4 w-4 text-[#E80000]" />
                <span>CANAL OFICIAL DE DEPÓSITO &amp; RESCATE HISTÓRICO</span>
              </div>

              <h3 className="font-anton text-3xl sm:text-5xl lg:text-6xl text-[#F1730C] tracking-tight uppercase leading-[0.95]">
                ¿POSEES EVIDENCIAS FONOGRÁFICAS O MATRICES RARAS?
              </h3>

              <p className="text-xs sm:text-sm text-[#B8AFA6] max-w-lg leading-relaxed">
                Este archivo se nutre de la investigación pericial, aportes de coleccionistas,
                familiares y guardianes del sonido. Contáctanos para rectificar créditos autorales,
                entregar prensajes en 45 RPM para digitalización o sumar testimonios de época.
              </p>

              <div className="pt-2">
                <a
                  href="mailto:soundkumbia@gmail.com?subject=Aporte%20de%20Evidencia%20al%20Archivo%20Kumbia%20Sound"
                  className="inline-flex items-center gap-2 border-2 border-[#1F1305] bg-[#E80000] px-6 py-3 text-xs font-bold text-white shadow-[4px_4px_0px_#EDE0D0] hover:bg-white hover:text-[#1F1305] transition-all active:translate-x-0.5 active:translate-y-0.5"
                >
                  <Mail className="h-4 w-4" />
                  <span>ENTREGAR EVIDENCIA AL ARCHIVO</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* COLUMNA 2: CANALES Y COMUNICACIÓN */}
            <div className="lg:col-span-3 space-y-4 text-xs">
              <div className="font-bold tracking-widest text-white uppercase border-b-2 border-[#3E2C1B] pb-2 flex items-center justify-between">
                <span>COMUNICACIÓN OFICIAL —</span>
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
                    <span>SPOTIFY // REGISTRO MASTER</span>
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
                    <span>YOUTUBE // FONOTECA PÚBLICA</span>
                    <ArrowUpRight className="h-3 w-3 text-[#F1730C]" />
                  </a>
                </div>

                <div className="pt-3 border-t border-[#3E2C1B]">
                  <Link
                    href="/admin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border-2 border-[#E80000] bg-transparent hover:bg-[#E80000] text-[#E80000] hover:text-white px-3 py-1.5 font-mono text-xs font-bold transition-all shadow-[2px_2px_0px_#1F1305]"
                  >
                    <span>PANEL DE ADMINISTRACIÓN</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                <div className="pt-2 text-[11px] text-[#665D4F]">
                  NIVEL: ACCESO GENERAL DESCLASIFICADO<br />
                  ORIGEN &amp; ARCHIVO: BUCARAMANGA, COLOMBIA
                </div>
              </div>
            </div>

            {/* COLUMNA 3: ÍNDICE DE EXPEDIENTES */}
            <div className="lg:col-span-3 space-y-4 text-xs">
              <div className="font-bold tracking-widest text-white uppercase border-b-2 border-[#3E2C1B] pb-2 flex items-center justify-between">
                <span>ÍNDICE DE EXPEDIENTES —</span>
                <span className="text-[#F1730C]">LEGAJOS</span>
              </div>

              <div className="space-y-2">
                <Link
                  href="/genealogia"
                  className="block text-[#B8AFA6] hover:text-[#E80000] transition-colors"
                >
                  <span className="text-[#E80000] font-black mr-1.5">EXP. 01:</span>
                  <span>Explorador Genealógico</span>
                </Link>

                <Link
                  href="/match-bpm"
                  className="block text-[#B8AFA6] hover:text-[#E80000] transition-colors"
                >
                  <span className="text-[#E80000] font-black mr-1.5">EXP. 02:</span>
                  <span>Consola Match BPM DJ</span>
                </Link>

                <Link
                  href="/radar"
                  className="block text-[#B8AFA6] hover:text-[#F1730C] transition-colors"
                >
                  <span className="text-[#F1730C] font-black mr-1.5">EXP. 03:</span>
                  <span>El Radar Sonoro 45 RPM</span>
                </Link>

                <Link
                  href="/blog"
                  className="block text-[#B8AFA6] hover:text-white transition-colors"
                >
                  <span className="text-[#665D4F] font-black mr-1.5">EXP. 04:</span>
                  <span>Informes &amp; Crónicas</span>
                </Link>

                <Link
                  href="/nosotros"
                  className="block text-[#B8AFA6] hover:text-[#E80000] transition-colors"
                >
                  <span className="text-[#665D4F] font-black mr-1.5">EXP. 05:</span>
                  <span>Legajo &amp; Manifiesto</span>
                </Link>

                <Link
                  href="/vinilos"
                  className="block text-[#F1730C] hover:text-white transition-colors font-bold"
                >
                  <span className="text-white font-black mr-1.5">EXP. 06:</span>
                  <span>Bóveda de Evidencias en Vinilo</span>
                </Link>
              </div>
            </div>

          </div>

          {/* ACTA DE CLAUSURA INFERIOR */}
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
                <span className="text-[#665D4F] ml-2 text-[11px] hidden sm:inline">
                  — ARCHIVO NACIONAL DESCLASIFICADO 1968–2005
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-[11px]">
              <Link
                href="/admin"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E80000] hover:text-white font-bold transition-colors flex items-center gap-1 hover:underline"
              >
                <span>[PANEL ADMIN]</span>
                <ArrowUpRight className="h-3 w-3" />
              </Link>
              <span>•</span>
              <span className="text-[#F8C800] font-bold">
                POSTGRES SUPABASE REGISTRY
              </span>
              <span>•</span>
              <span>BUCARAMANGA, COLOMBIA</span>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
