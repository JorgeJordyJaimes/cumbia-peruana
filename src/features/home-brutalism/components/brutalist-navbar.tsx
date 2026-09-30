"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Menu, X, Disc3 } from "lucide-react";

interface BrutalistNavbarProps {
  onOpenCommandPalette: () => void;
}

export function BrutalistNavbar({ onOpenCommandPalette }: BrutalistNavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b-2 border-black bg-[#EAE6DF] text-black">
      <div className="container mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* LOGO: Cooper Black con punto naranja y tipografía brutalista */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center border-2 border-black bg-black text-[#EAE6DF] shadow-[3px_3px_0px_#F04E23] transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:shadow-[1px_1px_0px_#F04E23]">
            <Disc3 className="h-6 w-6 text-[#F04E23] transition-transform duration-700 group-hover:rotate-180" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-cooper text-xl sm:text-2xl font-black tracking-tight text-black">
                Kumbia Sound
              </span>
              <span className="inline-block w-2.5 h-2.5 bg-[#F04E23]" />
            </div>
            <p className="font-mono text-[9px] uppercase tracking-widest text-neutral-600 hidden sm:block">
              Historical Sound Archive • 1968–2005
            </p>
          </div>
        </Link>

        {/* NAVEGACIÓN DESKTOP: Numeración brutalista 01/, 02/, 03/ */}
        <nav className="hidden lg:flex items-center gap-6 font-mono text-xs font-bold tracking-wider">
          <Link
            href="/genealogia"
            className="hover:text-[#F04E23] transition-colors py-1 border-b-2 border-transparent hover:border-[#F04E23]"
          >
            <span className="text-[#F04E23] mr-1">01/</span>GENEALOGÍA
          </Link>

          <Link
            href="/match-bpm"
            className="hover:text-[#F04E23] transition-colors py-1 border-b-2 border-transparent hover:border-[#F04E23]"
          >
            <span className="text-[#F04E23] mr-1">02/</span>MATCH BPM
          </Link>

          <Link
            href="/radar"
            className="hover:text-[#F04E23] transition-colors py-1 border-b-2 border-transparent hover:border-[#F04E23]"
          >
            <span className="text-[#F04E23] mr-1">03/</span>RADAR 45s
          </Link>

          <Link
            href="/blog"
            className="hover:text-[#F04E23] transition-colors py-1 border-b-2 border-transparent hover:border-[#F04E23]"
          >
            <span className="text-[#F04E23] mr-1">04/</span>CRÓNICAS
          </Link>

          <Link
            href="/nosotros"
            className="hover:text-[#F04E23] transition-colors py-1 border-b-2 border-transparent hover:border-[#F04E23]"
          >
            <span className="text-[#F04E23] mr-1">05/</span>NOSOTROS
          </Link>

          <Link
            href="/#catalogo-vinilos"
            className="hover:text-[#F04E23] transition-colors py-1 border-b-2 border-transparent hover:border-[#F04E23]"
          >
            <span className="text-[#F04E23] mr-1">06/</span>VINILOS
          </Link>
        </nav>

        {/* ACCIONES DERECHA: Buscador ⌘K + Menú Móvil */}
        <div className="flex items-center gap-3 font-mono text-xs">
          <button
            type="button"
            onClick={onOpenCommandPalette}
            className="flex items-center gap-2 border-2 border-black bg-white px-3 sm:px-4 py-2 text-black shadow-[3px_3px_0px_#000] hover:bg-[#F04E23] hover:text-white hover:border-black transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000]"
            title="Abrir buscador universal (⌘K)"
          >
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline font-bold">BUSCAR</span>
            <kbd className="hidden md:inline-block border border-black bg-[#EAE6DF] px-1.5 py-0.5 text-[10px] text-black">
              ⌘K
            </kbd>
          </button>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden border-2 border-black bg-white p-2 text-black shadow-[2px_2px_0px_#000]"
            aria-label="Abrir menú"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* MENÚ MÓVIL BRUTALISTA */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t-2 border-black bg-[#EAE6DF] p-4 font-mono text-xs font-bold space-y-2 animate-in slide-in-from-top-2 duration-150">
          <div className="text-[10px] text-neutral-500 uppercase tracking-widest pb-1 border-b border-black/20">
            APARTADOS DEL ARCHIVO
          </div>
          <Link
            href="/genealogia"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block border border-black bg-white p-2.5 hover:bg-[#F04E23] hover:text-white transition-colors"
          >
            <span className="text-[#F04E23]">01/</span> EXPLORADOR GENEALÓGICO
          </Link>
          <Link
            href="/match-bpm"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block border border-black bg-white p-2.5 hover:bg-[#F04E23] hover:text-white transition-colors"
          >
            <span className="text-[#F04E23]">02/</span> CONSOLA MATCH BPM
          </Link>
          <Link
            href="/radar"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block border border-black bg-white p-2.5 hover:bg-[#F04E23] hover:text-white transition-colors"
          >
            <span className="text-[#F04E23]">03/</span> EL RADAR SONORO 45 RPM
          </Link>
          <Link
            href="/blog"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block border border-black bg-white p-2.5 hover:bg-[#F04E23] hover:text-white transition-colors"
          >
            <span className="text-[#F04E23]">04/</span> CRÓNICAS & INVESTIGACIÓN
          </Link>
          <Link
            href="/nosotros"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block border border-black bg-white p-2.5 hover:bg-[#F04E23] hover:text-white transition-colors"
          >
            <span className="text-[#F04E23]">05/</span> NOSOTROS & MANIFIESTO
          </Link>
          <Link
            href="/#catalogo-vinilos"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block border border-black bg-white p-2.5 hover:bg-[#F04E23] hover:text-white transition-colors"
          >
            <span className="text-[#F04E23]">06/</span> CATÁLOGO DE VINILOS
          </Link>
        </div>
      )}
    </header>
  );
}
