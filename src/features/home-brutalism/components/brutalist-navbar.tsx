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
    <header className="sticky top-0 z-40 w-full border-b-2 border-[#1F1305] bg-[#EDE0D0] text-[#1F1305]">
      <div className="container mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* LOGO: Integración del isotipo oficial y tipografía Cooper Black */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center border-2 border-[#1F1305] bg-[#1F1305] shadow-[3px_3px_0px_#E80000] transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:shadow-[1px_1px_0px_#E80000] overflow-hidden p-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/kumbia-sound-logo-cropped.png"
              alt="Kumbia Sound Logo Oficial"
              className="w-full h-full object-contain filter drop-shadow-[0_0_2px_#E80000] transition-transform duration-500 group-hover:rotate-12"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-cooper text-xl sm:text-2xl font-black tracking-tight text-[#1F1305]">
                Kumbia Sound
              </span>
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#E80000] shadow-[0_0_5px_#E80000]" />
            </div>
            <p className="font-mono text-[9px] uppercase tracking-widest text-[#746B5C] hidden sm:block font-semibold">
              Historical Sound Archive • 1968–2005
            </p>
          </div>
        </Link>

        {/* NAVEGACIÓN DESKTOP: Numeración brutalista 01/, 02/, 03/ */}
        <nav className="hidden lg:flex items-center gap-6 font-mono text-xs font-bold tracking-wider">
          <Link
            href="/genealogia"
            className="hover:text-[#E80000] transition-colors py-1 border-b-2 border-transparent hover:border-[#E80000]"
          >
            <span className="text-[#E80000] mr-1">01/</span>GENEALOGÍA
          </Link>

          <Link
            href="/match-bpm"
            className="hover:text-[#E80000] transition-colors py-1 border-b-2 border-transparent hover:border-[#E80000]"
          >
            <span className="text-[#E80000] mr-1">02/</span>MATCH BPM
          </Link>

          <Link
            href="/radar"
            className="hover:text-[#F1730C] transition-colors py-1 border-b-2 border-transparent hover:border-[#F1730C]"
          >
            <span className="text-[#F1730C] mr-1">03/</span>RADAR 45s
          </Link>

          <Link
            href="/blog"
            className="hover:text-[#1F1305] transition-colors py-1 border-b-2 border-transparent hover:border-[#1F1305]"
          >
            <span className="text-[#746B5C] mr-1">04/</span>CRÓNICAS
          </Link>

          <Link
            href="/nosotros"
            className="hover:text-[#E80000] transition-colors py-1 border-b-2 border-transparent hover:border-[#E80000]"
          >
            <span className="text-[#746B5C] mr-1">05/</span>NOSOTROS
          </Link>

          <Link
            href="/#catalogo-vinilos"
            className="hover:text-[#F1730C] transition-colors py-1 border-b-2 border-transparent hover:border-[#F1730C]"
          >
            <span className="text-[#F1730C] mr-1">06/</span>VINILOS
          </Link>
        </nav>

        {/* ACCIONES DERECHA: Buscador ⌘K + Menú Móvil */}
        <div className="flex items-center gap-3 font-mono text-xs">
          <button
            type="button"
            onClick={onOpenCommandPalette}
            className="flex items-center gap-2 border-2 border-[#1F1305] bg-white px-3 sm:px-4 py-2 text-[#1F1305] shadow-[3px_3px_0px_#1F1305] hover:bg-[#1F1305] hover:text-[#E80000] hover:border-[#1F1305] hover:shadow-[3px_3px_0px_#E80000] transition-all active:translate-x-0.5 active:translate-y-0.5"
            title="Abrir buscador universal (⌘K)"
          >
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline font-bold">BUSCAR</span>
            <kbd className="hidden md:inline-block border border-[#1F1305] bg-[#EDE0D0] px-1.5 py-0.5 text-[10px] text-[#1F1305]">
              ⌘K
            </kbd>
          </button>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden border-2 border-[#1F1305] bg-white p-2 text-[#1F1305] shadow-[2px_2px_0px_#1F1305]"
            aria-label="Abrir menú"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* MENÚ MÓVIL BRUTALISTA */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t-2 border-[#1F1305] bg-[#EDE0D0] p-4 font-mono text-xs font-bold space-y-2 animate-in slide-in-from-top-2 duration-150">
          <div className="text-[10px] text-[#746B5C] uppercase tracking-widest pb-1 border-b border-[#1F1305]/20 flex items-center justify-between">
            <span>APARTADOS DEL ARCHIVO</span>
            <span className="text-[#E80000]">● ON AIR</span>
          </div>
          <Link
            href="/genealogia"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block border border-[#1F1305] bg-white p-2.5 hover:bg-[#E80000] hover:text-white transition-colors"
          >
            <span className="text-[#E80000]">01/</span> EXPLORADOR GENEALÓGICO
          </Link>
          <Link
            href="/match-bpm"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block border border-[#1F1305] bg-white p-2.5 hover:bg-[#E80000] hover:text-white transition-colors"
          >
            <span className="text-[#E80000]">02/</span> CONSOLA MATCH BPM
          </Link>
          <Link
            href="/radar"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block border border-[#1F1305] bg-white p-2.5 hover:bg-[#F1730C] hover:text-white transition-colors"
          >
            <span className="text-[#F1730C]">03/</span> EL RADAR SONORO 45 RPM
          </Link>
          <Link
            href="/blog"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block border border-[#1F1305] bg-white p-2.5 hover:bg-[#1F1305] hover:text-white transition-colors"
          >
            <span className="text-[#746B5C]">04/</span> CRÓNICAS & INVESTIGACIÓN
          </Link>
          <Link
            href="/nosotros"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block border border-[#1F1305] bg-white p-2.5 hover:bg-[#E80000] hover:text-white transition-colors"
          >
            <span className="text-[#E80000]">05/</span> NOSOTROS & MANIFIESTO
          </Link>
          <Link
            href="/#catalogo-vinilos"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block border border-[#1F1305] bg-white p-2.5 hover:bg-[#F1730C] hover:text-white transition-colors"
          >
            <span className="text-[#F1730C]">06/</span> CATÁLOGO DE VINILOS
          </Link>
        </div>
      )}
    </header>
  );
}
