import Link from "next/link";
import { Disc3, Mail, Heart, ArrowUpRight } from "lucide-react";

export function RetroFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#0B0D10] text-[#9CA3AF] font-mono text-xs">
      {/* BLOQUE DE COLABORACIÓN COMUNITARIA REQUERIDO */}
      <div className="border-b border-white/10 bg-[#16191E]/60 py-10 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <span className="text-[#E5A93C] font-bold uppercase tracking-wider text-[11px] block">
              Colaboración & Aporte Comunitario
            </span>
            <h4 className="font-serif text-xl sm:text-2xl font-bold text-white">
              ¿Tienes datos inéditos de un LP o una corrección discográfica?
            </h4>
            <p className="font-sans text-xs text-[#9CA3AF] max-w-xl">
              Este archivo se nutre del aporte de coleccionistas, familiares de músicos y amantes del
              vinilo. Ayúdanos a completar fichas de prensaje y créditos de sesión.
            </p>
          </div>

          <a
            href="mailto:soundkumbia@gmail.com?subject=Aporte%20Discografico%20Kumbia%20Sound"
            className="rounded-xl bg-[#E5A93C] px-6 py-3 font-bold text-black shadow-lg shadow-[#E5A93C]/20 hover:bg-[#d6992d] transition-all flex items-center gap-2 shrink-0"
          >
            <Mail className="h-4 w-4" />
            <span>Escríbenos y colaboremos</span>
          </a>
        </div>
      </div>

      {/* SITEMAP & ENLACES */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Columna Marca */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-[#E5A93C]/20 border border-[#E5A93C]/30 flex items-center justify-center text-[#E5A93C]">
                <Disc3 className="h-5 w-5" />
              </div>
              <span className="font-serif text-base font-bold text-white">Kumbia Sound</span>
            </div>
            <p className="font-sans text-xs text-[#9CA3AF] leading-relaxed">
              Plataforma dedicada a la preservación musicológica, memoria discográfica y genealogía
              de la cumbia peruana en sus formatos físicos originales (1968–2005).
            </p>
          </div>

          {/* Columna Archivo */}
          <div className="space-y-3">
            <span className="text-white font-bold text-[11px] uppercase tracking-wider block">
              Archivo Discográfico
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#catalogo-archivo" className="hover:text-[#E5A93C] transition-colors">
                  Catálogo de 719+ Vinilos
                </a>
              </li>
              <li>
                <a href="#genealogia" className="hover:text-[#E5A93C] transition-colors">
                  Explorador Genealógico
                </a>
              </li>
              <li>
                <a href="#genealogia" className="hover:text-[#E5A93C] transition-colors">
                  Pioneros & Músicos de Sesión
                </a>
              </li>
              <li>
                <a href="#radar-sonoro" className="hover:text-[#E5A93C] transition-colors">
                  Radar Sonoro Curado
                </a>
              </li>
            </ul>
          </div>

          {/* Columna Herramientas & Blog */}
          <div className="space-y-3">
            <span className="text-white font-bold text-[11px] uppercase tracking-wider block">
              Herramientas & Lectura
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#match-bpm" className="hover:text-[#E5A93C] transition-colors">
                  Consola Match BPM DJ
                </a>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#E5A93C] transition-colors">
                  Historias de Fondo & Blog
                </Link>
              </li>
              <li>
                <a href="#manifiesto" className="hover:text-[#E5A93C] transition-colors">
                  Manifiesto de Preservación
                </a>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#E5A93C] transition-colors">
                  Panel Administrativo
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna Redes Sociales Requeridas */}
          <div className="space-y-3">
            <span className="text-white font-bold text-[11px] uppercase tracking-wider block">
              Comunidad & Redes
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <span>YouTube</span>
                  <ArrowUpRight className="h-3 w-3 text-[#9CA3AF]" />
                </a>
              </li>
              <li>
                <a
                  href="https://spotify.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <span>Spotify</span>
                  <ArrowUpRight className="h-3 w-3 text-[#9CA3AF]" />
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <span>Instagram</span>
                  <ArrowUpRight className="h-3 w-3 text-[#9CA3AF]" />
                </a>
              </li>
              <li>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <span>TikTok</span>
                  <ArrowUpRight className="h-3 w-3 text-[#9CA3AF]" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Créditos y Copyright */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <p>© 2026 Kumbia Sound. Hecho con devoción por la música analógica peruana.</p>
          <p className="flex items-center gap-1 text-[#9CA3AF]">
            Preservando el patrimonio sonoro con <Heart className="h-3 w-3 text-red-500 fill-red-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}
