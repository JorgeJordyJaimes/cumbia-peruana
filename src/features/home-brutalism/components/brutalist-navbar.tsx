"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Menu, X } from "lucide-react";

interface BrutalistNavbarProps {
  onOpenCommandPalette: () => void;
}

export function BrutalistNavbar({ onOpenCommandPalette }: BrutalistNavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#1F1305] bg-[#EDE0D0] text-[#1F1305] select-none">
      <div className="container mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* LOGO: Integración del isotipo oficial con encuadre de plano técnico */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center border border-[#1F1305] bg-[#1F1305] overflow-hidden p-1 transition-colors group-hover:border-[#E80000]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/branding/kumbia-sound-logo-cropped.png"
              alt="Kumbia Sound Logo Oficial"
              className="w-full h-full object-contain filter drop-shadow-[0_0_1px_#E80000] transition-transform duration-300 group-hover:scale-105"
            />
            {/* Marca de esquina técnica */}
            <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-[#E80000]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-cooper text-xl sm:text-2xl font-black tracking-tight text-[#1F1305]">
                Kumbia Sound
              </span>
              <span className="inline-block w-2 h-2 bg-[#E80000]" />
            </div>
            <p className="font-mono text-[9px] uppercase tracking-widest text-[#746B5C] hidden sm:block font-bold">
              ARCHIVO FONOGRÁFICO NACIONAL • 1968–2005
            </p>
          </div>
        </Link>

        {/* NAVEGACIÓN DESKTOP: Módulos de plano con divisores de 1px */}
        <nav className="hidden lg:flex items-center border border-[#1F1305] bg-white/60 divide-x divide-[#1F1305] font-mono text-xs font-bold tracking-wider">
          <Link
            href="/genealogia"
            className="px-3 py-2 hover:bg-[#1F1305] hover:text-[#EDE0D0] transition-colors"
          >
            <span className="text-[#E80000] mr-1">[01]</span>GENEALOGÍA
          </Link>

          <Link
            href="/match-bpm"
            className="px-3 py-2 hover:bg-[#1F1305] hover:text-[#EDE0D0] transition-colors"
          >
            <span className="text-[#E80000] mr-1">[02]</span>MATCH BPM
          </Link>

          <Link
            href="/radar"
            className="px-3 py-2 hover:bg-[#1F1305] hover:text-[#EDE0D0] transition-colors"
          >
            <span className="text-[#F1730C] mr-1">[03]</span>RADAR 45s
          </Link>

          <Link
            href="/blog"
            className="px-3 py-2 hover:bg-[#1F1305] hover:text-[#EDE0D0] transition-colors"
          >
            <span className="text-[#746B5C] mr-1">[04]</span>CRÓNICAS
          </Link>

          <Link
            href="/nosotros"
            className="px-3 py-2 hover:bg-[#1F1305] hover:text-[#EDE0D0] transition-colors"
          >
            <span className="text-[#746B5C] mr-1">[05]</span>NOSOTROS
          </Link>

          <Link
            href="/vinilos"
            className="px-3 py-2 bg-[#F1730C]/10 text-[#1F1305] hover:bg-[#F1730C] hover:text-white transition-colors"
          >
            <span className="text-[#F1730C] mr-1">[06]</span>VINILOS
          </Link>
        </nav>

        {/* ACCIONES DERECHA: Buscador técnico + Menú Móvil */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <button
            type="button"
            onClick={onOpenCommandPalette}
            className="flex items-center gap-2 border border-[#1F1305] bg-white px-3 sm:px-4 py-2 text-[#1F1305] hover:bg-[#1F1305] hover:text-[#EDE0D0] transition-colors font-mono"
            title="Abrir índice técnico (⌘K)"
          >
            <Search className="h-3.5 w-3.5 text-[#E80000]" />
            <span className="hidden sm:inline font-bold text-[11px]">ÍNDICE // BUSCAR</span>
            <kbd className="hidden md:inline-block border border-[#1F1305] bg-[#EDE0D0] px-1 py-0.2 text-[9px] text-[#1F1305]">
              ⌘K
            </kbd>
          </button>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden border border-[#1F1305] bg-white p-2 text-[#1F1305]"
            aria-label="Abrir menú"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* MENÚ MÓVIL BRUTALISTA TÉCNICO */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[#1F1305] bg-[#EDE0D0] p-4 font-mono text-xs font-bold space-y-1.5 animate-in slide-in-from-top-1 duration-150">
          <div className="text-[9px] text-[#746B5C] uppercase tracking-widest pb-1 border-b border-[#1F1305]/20 flex items-center justify-between">
            <span>SECTORES DEL PLANO // NAVEGACIÓN</span>
            <span className="text-[#E80000]">● MATRIZ ACTIVA</span>
          </div>
          <Link
            href="/genealogia"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block border border-[#1F1305] bg-white p-2.5 hover:bg-[#1F1305] hover:text-white transition-colors"
          >
            <span className="text-[#E80000]">[01]</span> EXPLORADOR GENEALÓGICO
          </Link>
          <Link
            href="/match-bpm"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block border border-[#1F1305] bg-white p-2.5 hover:bg-[#1F1305] hover:text-white transition-colors"
          >
            <span className="text-[#E80000]">[02]</span> CONSOLA MATCH BPM
          </Link>
          <Link
            href="/radar"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block border border-[#1F1305] bg-white p-2.5 hover:bg-[#1F1305] hover:text-white transition-colors"
          >
            <span className="text-[#F1730C]">[03]</span> EL RADAR SONORO 45 RPM
          </Link>
          <Link
            href="/blog"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block border border-[#1F1305] bg-white p-2.5 hover:bg-[#1F1305] hover:text-white transition-colors"
          >
            <span className="text-[#746B5C]">[04]</span> CRÓNICAS HISTÓRICAS
          </Link>
          <Link
            href="/nosotros"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block border border-[#1F1305] bg-white p-2.5 hover:bg-[#1F1305] hover:text-white transition-colors"
          >
            <span className="text-[#746B5C]">[05]</span> MANIFIESTO & EQUIPO
          </Link>
          <Link
            href="/vinilos"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block border border-[#1F1305] bg-[#F1730C] text-white p-2.5 hover:bg-[#1F1305] transition-colors"
          >
            <span className="text-white font-black">[06]</span> BÓVEDA DE VINILOS
          </Link>
        </div>
      )}
    </header>
  );
}
