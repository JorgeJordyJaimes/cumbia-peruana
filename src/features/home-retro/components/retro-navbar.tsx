"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Disc3,
  Search,
  Menu,
  X,
  ChevronDown,
  Layers,
  Users,
  Music2,
  Radio,
  BookOpen,
  History,
  GitFork,
  ShieldCheck,
} from "lucide-react";

interface RetroNavbarProps {
  onOpenCommandPalette: () => void;
}

export function RetroNavbar({ onOpenCommandPalette }: RetroNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isArchiveDropdownOpen, setIsArchiveDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-[#0D0F12]/95 backdrop-blur-md border-b border-white/10 shadow-xl"
          : "bg-[#0D0F12]/80 backdrop-blur-sm border-b border-white/5"
      }`}
    >
      <div className="container mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* LOGO EDITORIAL RETRO */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#E5A93C] via-[#c28422] to-[#16191E] p-0.5 shadow-lg shadow-[#E5A93C]/10 transition-transform group-hover:scale-105">
            <div className="h-full w-full rounded-[10px] bg-[#0D0F12] flex items-center justify-center">
              <Disc3 className="h-6 w-6 text-[#E5A93C] transition-transform duration-700 group-hover:rotate-180" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg sm:text-xl font-black tracking-tight text-[#F3F4F6] group-hover:text-[#E5A93C] transition-colors">
                Kumbia Sound
              </span>
              <span className="rounded border border-[#10B981]/30 bg-[#10B981]/10 px-1.5 py-0.5 font-mono text-[9px] font-bold text-[#10B981]">
                ARCHIVO VIVO
              </span>
            </div>
            <p className="font-mono text-[10px] text-[#9CA3AF] tracking-wider hidden sm:block">
              Peruvian Cumbia & Chicha Historical Engine
            </p>
          </div>
        </Link>

        {/* NAVEGACIÓN DESKTOP */}
        <nav className="hidden md:flex items-center gap-6 font-mono text-xs">
          {/* Dropdown Archivo */}
          <div
            className="relative"
            onMouseEnter={() => setIsArchiveDropdownOpen(true)}
            onMouseLeave={() => setIsArchiveDropdownOpen(false)}
          >
            <button
              type="button"
              className="flex items-center gap-1.5 py-2 text-[#F3F4F6] hover:text-[#E5A93C] transition-colors"
            >
              <span>Archivo</span>
              <ChevronDown className="h-3.5 w-3.5 text-[#9CA3AF]" />
            </button>

            {isArchiveDropdownOpen && (
              <div className="absolute top-full left-0 w-64 rounded-2xl border border-white/10 bg-[#16191E] p-2 shadow-2xl backdrop-blur-xl animate-in fade-in duration-150">
                <Link
                  href="/genealogia"
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors group"
                >
                  <Users className="h-4 w-4 text-[#E5A93C] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-serif font-bold text-white group-hover:text-[#E5A93C]">
                      Biografías de Pioneros
                    </p>
                    <p className="text-[11px] text-[#9CA3AF]">
                      Cruces genealógicos y guitarristas legendarios
                    </p>
                  </div>
                </Link>

                <Link
                  href="/#catalogo-archivo"
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors group"
                >
                  <Layers className="h-4 w-4 text-[#10B981] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-serif font-bold text-white group-hover:text-[#E5A93C]">
                      Discografías & Prensajes
                    </p>
                    <p className="text-[11px] text-[#9CA3AF]">
                      719+ vinilos en 45 RPM, LPs y casetes
                    </p>
                  </div>
                </Link>

                <Link
                  href="/nosotros"
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors group"
                >
                  <ShieldCheck className="h-4 w-4 text-[#E5A93C] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-serif font-bold text-white group-hover:text-[#E5A93C]">
                      Manifiesto & Equipo
                    </p>
                    <p className="text-[11px] text-[#9CA3AF]">
                      Preservación ética y guardianes del archivo
                    </p>
                  </div>
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/genealogia"
            className="flex items-center gap-1.5 text-[#F3F4F6] hover:text-[#E5A93C] transition-colors"
          >
            <GitFork className="h-3.5 w-3.5 text-[#E5A93C]" />
            <span>Genealogía</span>
          </Link>

          <Link
            href="/match-bpm"
            className="flex items-center gap-1.5 text-[#F3F4F6] hover:text-[#E5A93C] transition-colors"
          >
            <Music2 className="h-3.5 w-3.5 text-[#E5A93C]" />
            <span>Match BPM</span>
          </Link>

          <Link
            href="/radar"
            className="flex items-center gap-1.5 text-[#F3F4F6] hover:text-[#E5A93C] transition-colors"
          >
            <Radio className="h-3.5 w-3.5 text-[#10B981]" />
            <span>Radar Sonoro</span>
          </Link>

          <Link
            href="/blog"
            className="flex items-center gap-1.5 text-[#F3F4F6] hover:text-[#E5A93C] transition-colors"
          >
            <BookOpen className="h-3.5 w-3.5 text-[#9CA3AF]" />
            <span>Crónicas</span>
          </Link>

          <Link
            href="/nosotros"
            className="flex items-center gap-1.5 text-[#F3F4F6] hover:text-[#E5A93C] transition-colors"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-[#10B981]" />
            <span>Nosotros</span>
          </Link>
        </nav>

        {/* ACCIONES DERECHA: Buscador ⌘K + Admin */}
        <div className="flex items-center gap-3 font-mono text-xs">
          {/* Botón Buscador Global ⌘K */}
          <button
            type="button"
            onClick={onOpenCommandPalette}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#16191E] px-3 sm:px-3.5 py-1.5 text-[#9CA3AF] hover:border-[#E5A93C]/40 hover:text-white transition-all shadow-inner"
            title="Abrir buscador global (⌘K)"
          >
            <Search className="h-3.5 w-3.5 text-[#E5A93C]" />
            <span className="hidden sm:inline">Buscar archivo...</span>
            <kbd className="hidden lg:inline-block rounded border border-white/15 bg-white/5 px-1.5 py-0.5 text-[10px] text-[#9CA3AF]">
              ⌘K
            </kbd>
          </button>

          {/* Botón Admin */}
          <Link
            href="/admin"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 text-neutral-300 hover:border-[#E5A93C]/40 hover:text-[#E5A93C] transition-all"
          >
            <History className="h-3.5 w-3.5 text-[#E5A93C]" />
            <span>Panel</span>
          </Link>

          {/* Botón Menú Móvil */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden rounded-xl border border-white/10 bg-[#16191E] p-2 text-[#F3F4F6] hover:text-[#E5A93C] transition-colors"
            aria-label="Abrir menú"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* MENÚ MÓVIL DESPLEGABLE */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#16191E] px-4 py-5 space-y-4 font-mono text-xs animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-[#9CA3AF] px-2">
              Apartados del Archivo
            </span>
            <Link
              href="/genealogia"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-white hover:bg-white/5 hover:text-[#E5A93C]"
            >
              🧬 Biografías & Genealogía
            </Link>
            <Link
              href="/match-bpm"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-[#E5A93C] hover:bg-white/5"
            >
              🎛️ Consola Match BPM
            </Link>
            <Link
              href="/radar"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-[#10B981] hover:bg-white/5"
            >
              📻 Radar Sonoro Semanal
            </Link>
            <Link
              href="/blog"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-white hover:bg-white/5 hover:text-[#E5A93C]"
            >
              📖 Crónicas & Blog
            </Link>
            <Link
              href="/nosotros"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-white hover:bg-white/5 hover:text-[#E5A93C]"
            >
              🛡️ Nosotros & Manifiesto
            </Link>
            <Link
              href="/#catalogo-archivo"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-white hover:bg-white/5 hover:text-[#E5A93C]"
            >
              💿 Catálogo de Vinilos
            </Link>
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <Link
              href="/admin"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2 text-white hover:bg-white/10"
            >
              <History className="h-4 w-4 text-[#E5A93C]" />
              <span>Acceso Administrador</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
