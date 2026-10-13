"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Menu, X, FolderOpen } from "lucide-react";

interface BrutalistNavbarProps {
  onOpenCommandPalette: () => void;
}

export function BrutalistNavbar({ onOpenCommandPalette }: BrutalistNavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b-2 border-[#1F1305] bg-[#EDE0D0] text-[#1F1305] select-none font-mono">
      <div className="container mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
        
        {/* LOGO: Sello Oficial de Archivo Histórico */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center border-2 border-[#1F1305] bg-[#1F1305] shadow-[3px_3px_0px_#E80000] transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:shadow-[1px_1px_0px_#E80000] p-1 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/branding/kumbia-sound-logo-cropped.png"
              alt="Kumbia Sound Logo Oficial"
              className="w-full h-full object-contain filter drop-shadow-[0_0_2px_#E80000] transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-cooper text-xl sm:text-2xl font-black tracking-tight text-[#1F1305]">
                Kumbia Sound
              </span>
              <span className="border border-[#1F1305] bg-[#E80000] text-white text-[8px] font-black px-1 leading-tight">
                REG
              </span>
            </div>
            <p className="text-[9px] uppercase tracking-widest text-[#746B5C] font-bold">
              ARCHIVO CLASIFICADO DE LA CUMBIA // 1968–2005
            </p>
          </div>
        </Link>

        {/* NAVEGACIÓN DESKTOP: CARPETAS DE EXPEDIENTE EXP. 01 A 06 */}
        <nav className="hidden lg:flex items-center gap-4 text-xs font-bold tracking-wider">
          <Link
            href="/genealogia"
            className="group flex items-baseline gap-1 py-1 hover:text-[#E80000] transition-colors border-b-2 border-transparent hover:border-[#E80000]"
          >
            <span className="text-[10px] text-[#E80000] font-black">EXP. 01</span>
            <span>GENEALOGÍA</span>
          </Link>

          <Link
            href="/match-bpm"
            className="group flex items-baseline gap-1 py-1 hover:text-[#E80000] transition-colors border-b-2 border-transparent hover:border-[#E80000]"
          >
            <span className="text-[10px] text-[#E80000] font-black">EXP. 02</span>
            <span>MATCH BPM</span>
          </Link>

          <Link
            href="/radar"
            className="group flex items-baseline gap-1 py-1 hover:text-[#F1730C] transition-colors border-b-2 border-transparent hover:border-[#F1730C]"
          >
            <span className="text-[10px] text-[#F1730C] font-black">EXP. 03</span>
            <span>RADAR 45s</span>
          </Link>

          <Link
            href="/blog"
            className="group flex items-baseline gap-1 py-1 hover:text-[#1F1305] transition-colors border-b-2 border-transparent hover:border-[#1F1305]"
          >
            <span className="text-[10px] text-[#746B5C] font-black">EXP. 04</span>
            <span>INFORMES</span>
          </Link>

          <Link
            href="/nosotros"
            className="group flex items-baseline gap-1 py-1 hover:text-[#E80000] transition-colors border-b-2 border-transparent hover:border-[#E80000]"
          >
            <span className="text-[10px] text-[#746B5C] font-black">EXP. 05</span>
            <span>LEGAJO</span>
          </Link>

          <Link
            href="/vinilos"
            className="flex items-center gap-1.5 border-2 border-[#1F1305] bg-[#F1730C] text-white px-3 py-1 shadow-[2px_2px_0px_#1F1305] hover:bg-[#E80000] hover:border-[#1F1305] transition-all"
          >
            <FolderOpen className="h-3.5 w-3.5 text-white" />
            <span className="text-[10px] font-black bg-white text-[#1F1305] px-1">EXP. 06</span>
            <span>EVIDENCIAS</span>
          </Link>
        </nav>

        {/* ACCIONES: BOTÓN CONSULTAR EXPEDIENTE ⌘K + MENÚ MÓVIL */}
        <div className="flex items-center gap-3 text-xs">
          <button
            type="button"
            onClick={onOpenCommandPalette}
            className="flex items-center gap-2 border-2 border-[#1F1305] bg-white px-3 sm:px-4 py-2 text-[#1F1305] shadow-[3px_3px_0px_#1F1305] hover:bg-[#1F1305] hover:text-white hover:border-[#1F1305] hover:shadow-[3px_3px_0px_#E80000] transition-all active:translate-x-0.5 active:translate-y-0.5"
            title="Abrir buscador de expedientes (⌘K)"
          >
            <Search className="h-4 w-4 text-[#E80000]" />
            <span className="hidden sm:inline font-black tracking-wider text-[11px]">CONSULTAR EXPEDIENTE</span>
            <kbd className="hidden md:inline-block border border-[#1F1305] bg-[#EDE0D0] px-1.5 py-0.5 text-[10px] text-[#1F1305] font-bold">
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

      {/* MENÚ MÓVIL: ÍNDICE DE EXPEDIENTES */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t-2 border-[#1F1305] bg-[#EDE0D0] p-4 text-xs font-bold space-y-2 animate-in slide-in-from-top-2 duration-150">
          <div className="text-[10px] text-[#746B5C] uppercase tracking-widest pb-1 border-b border-[#1F1305]/20 flex items-center justify-between">
            <span>ÍNDICE DE LEGAJOS DESCLASIFICADOS</span>
            <span className="text-[#E80000] font-black">CONFIDENCIAL</span>
          </div>
          <Link
            href="/genealogia"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block border-2 border-[#1F1305] bg-white p-2.5 shadow-[2px_2px_0px_#1F1305] hover:bg-[#1F1305] hover:text-white transition-colors"
          >
            <span className="text-[#E80000]">EXP. 01:</span> EXPLORADOR GENEALÓGICO DE LINAJES
          </Link>
          <Link
            href="/match-bpm"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block border-2 border-[#1F1305] bg-white p-2.5 shadow-[2px_2px_0px_#1F1305] hover:bg-[#1F1305] hover:text-white transition-colors"
          >
            <span className="text-[#E80000]">EXP. 02:</span> CONSOLA MATCH BPM DJ
          </Link>
          <Link
            href="/radar"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block border-2 border-[#1F1305] bg-white p-2.5 shadow-[2px_2px_0px_#1F1305] hover:bg-[#1F1305] hover:text-white transition-colors"
          >
            <span className="text-[#F1730C]">EXP. 03:</span> EL RADAR SONORO 45 RPM
          </Link>
          <Link
            href="/blog"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block border-2 border-[#1F1305] bg-white p-2.5 shadow-[2px_2px_0px_#1F1305] hover:bg-[#1F1305] hover:text-white transition-colors"
          >
            <span className="text-[#746B5C]">EXP. 04:</span> INFORMES DE CAMPO & CRÓNICAS
          </Link>
          <Link
            href="/nosotros"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block border-2 border-[#1F1305] bg-white p-2.5 shadow-[2px_2px_0px_#1F1305] hover:bg-[#1F1305] hover:text-white transition-colors"
          >
            <span className="text-[#746B5C]">EXP. 05:</span> LEGAJO DEL EQUIPO & MANIFIESTO
          </Link>
          <Link
            href="/vinilos"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block border-2 border-[#1F1305] bg-[#F1730C] text-white p-2.5 shadow-[2px_2px_0px_#1F1305] hover:bg-[#E80000] transition-colors"
          >
            <span className="text-[#1F1305] bg-white px-1 py-0.2 mr-1">EXP. 06:</span> BÓVEDA DE EVIDENCIAS EN VINILO
          </Link>
        </div>
      )}
    </header>
  );
}
