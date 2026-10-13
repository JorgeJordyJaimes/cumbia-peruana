"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Menu, X, Activity } from "lucide-react";

interface BrutalistNavbarProps {
  onOpenCommandPalette: () => void;
}

export function BrutalistNavbar({ onOpenCommandPalette }: BrutalistNavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b-2 border-[#1F1305] bg-[#EDE0D0] text-[#1F1305] select-none">
      <div className="container mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-3 sm:px-6">
        {/* LOGO: Placa Maestra de Consola con Tornillos (·) */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative flex h-11 w-11 sm:h-13 sm:w-13 items-center justify-center border-2 border-[#1F1305] bg-[#1F1305] shadow-[3px_3px_0px_#E80000] transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:shadow-[1px_1px_0px_#E80000] p-1">
            {/* Tornillos de montaje en rack en miniatura */}
            <span className="absolute top-0.5 left-0.5 text-[7px] text-[#746B5C] font-mono leading-none">·</span>
            <span className="absolute top-0.5 right-0.5 text-[7px] text-[#746B5C] font-mono leading-none">·</span>
            <span className="absolute bottom-0.5 left-0.5 text-[7px] text-[#746B5C] font-mono leading-none">·</span>
            <span className="absolute bottom-0.5 right-0.5 text-[7px] text-[#746B5C] font-mono leading-none">·</span>

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
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#E80000] shadow-[0_0_6px_#E80000] animate-pulse" />
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-[#746B5C] font-bold">
              <span>CANAL MASTER // 1968–2005</span>
              <span className="hidden md:inline text-[#E80000]">• 600Ω BALANCED</span>
            </div>
          </div>
        </Link>

        {/* MATRIZ DE RUTEO DE BUSES (BUS ROUTING MATRIX) */}
        <nav className="hidden lg:flex items-center gap-2 font-mono text-xs font-bold tracking-wider">
          <Link
            href="/genealogia"
            className="group flex items-center gap-1.5 border border-[#1F1305] bg-white px-2.5 py-1.5 shadow-[2px_2px_0px_#1F1305] hover:bg-[#1F1305] hover:text-white hover:border-[#1F1305] hover:shadow-[2px_2px_0px_#E80000] transition-all"
          >
            <span className="text-[10px] text-[#E80000] font-black group-hover:text-[#E80000]">BUS 01</span>
            <span>GENEALOGÍA</span>
          </Link>

          <Link
            href="/match-bpm"
            className="group flex items-center gap-1.5 border border-[#1F1305] bg-white px-2.5 py-1.5 shadow-[2px_2px_0px_#1F1305] hover:bg-[#1F1305] hover:text-white hover:border-[#1F1305] hover:shadow-[2px_2px_0px_#E80000] transition-all"
          >
            <span className="text-[10px] text-[#E80000] font-black group-hover:text-[#E80000]">BUS 02</span>
            <span>MATCH BPM</span>
          </Link>

          <Link
            href="/radar"
            className="group flex items-center gap-1.5 border border-[#1F1305] bg-white px-2.5 py-1.5 shadow-[2px_2px_0px_#1F1305] hover:bg-[#1F1305] hover:text-white hover:border-[#1F1305] hover:shadow-[2px_2px_0px_#F1730C] transition-all"
          >
            <span className="text-[10px] text-[#F1730C] font-black group-hover:text-[#F1730C]">BUS 03</span>
            <span>RADAR 45s</span>
          </Link>

          <Link
            href="/blog"
            className="group flex items-center gap-1.5 border border-[#1F1305] bg-white px-2.5 py-1.5 shadow-[2px_2px_0px_#1F1305] hover:bg-[#1F1305] hover:text-white hover:border-[#1F1305] hover:shadow-[2px_2px_0px_#1F1305] transition-all"
          >
            <span className="text-[10px] text-[#746B5C] font-black group-hover:text-[#EDE0D0]">BUS 04</span>
            <span>CRÓNICAS</span>
          </Link>

          <Link
            href="/nosotros"
            className="group flex items-center gap-1.5 border border-[#1F1305] bg-white px-2.5 py-1.5 shadow-[2px_2px_0px_#1F1305] hover:bg-[#1F1305] hover:text-white hover:border-[#1F1305] hover:shadow-[2px_2px_0px_#E80000] transition-all"
          >
            <span className="text-[10px] text-[#746B5C] font-black group-hover:text-[#EDE0D0]">BUS 05</span>
            <span>NOSOTROS</span>
          </Link>

          <Link
            href="/vinilos"
            className="group flex items-center gap-1.5 border-2 border-[#1F1305] bg-[#F1730C] text-white px-3 py-1.5 shadow-[2px_2px_0px_#1F1305] hover:bg-[#E80000] hover:border-[#1F1305] transition-all"
          >
            <span className="text-[10px] text-[#1F1305] font-black bg-white px-1 py-0.2">BUS 06</span>
            <span>VINILOS</span>
          </Link>
        </nav>

        {/* ACCIONES DERECHA: Botón de Telemetría ⌘K + Menú Móvil */}
        <div className="flex items-center gap-2 sm:gap-3 font-mono text-xs">
          <button
            type="button"
            onClick={onOpenCommandPalette}
            className="flex items-center gap-2 border-2 border-[#1F1305] bg-white px-3 sm:px-4 py-2 text-[#1F1305] shadow-[3px_3px_0px_#1F1305] hover:bg-[#1F1305] hover:text-[#E80000] hover:border-[#1F1305] hover:shadow-[3px_3px_0px_#E80000] transition-all active:translate-x-0.5 active:translate-y-0.5"
            title="Abrir buscador universal de telemetría (⌘K)"
          >
            <Search className="h-4 w-4 text-[#E80000]" />
            <span className="hidden sm:inline font-black tracking-wider text-[11px]">QUERY CONSOLE</span>
            <kbd className="hidden md:inline-block border border-[#1F1305] bg-[#EDE0D0] px-1.5 py-0.5 text-[10px] text-[#1F1305] font-bold">
              ⌘K
            </kbd>
          </button>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden border-2 border-[#1F1305] bg-white p-2 text-[#1F1305] shadow-[2px_2px_0px_#1F1305]"
            aria-label="Abrir panel de ruteo"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* MENÚ MÓVIL: PATCHBAY DE RUTEO */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t-2 border-[#1F1305] bg-[#EDE0D0] p-4 font-mono text-xs font-bold space-y-2 animate-in slide-in-from-top-2 duration-150">
          <div className="text-[10px] text-[#746B5C] uppercase tracking-widest pb-1 border-b border-[#1F1305]/20 flex items-center justify-between">
            <span>PATCHBAY // BUS MATRIX SELECTOR</span>
            <span className="text-[#E80000] flex items-center gap-1 font-bold">
              <Activity className="h-3 w-3 animate-pulse" /> LIVE
            </span>
          </div>
          <Link
            href="/genealogia"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-between border-2 border-[#1F1305] bg-white p-2.5 shadow-[2px_2px_0px_#1F1305] hover:bg-[#1F1305] hover:text-white transition-colors"
          >
            <span><span className="text-[#E80000]">BUS 01:</span> EXPLORADOR GENEALÓGICO</span>
            <span className="text-[#746B5C] text-[10px]">(·)</span>
          </Link>
          <Link
            href="/match-bpm"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-between border-2 border-[#1F1305] bg-white p-2.5 shadow-[2px_2px_0px_#1F1305] hover:bg-[#1F1305] hover:text-white transition-colors"
          >
            <span><span className="text-[#E80000]">BUS 02:</span> CONSOLA MATCH BPM DJ</span>
            <span className="text-[#746B5C] text-[10px]">(·)</span>
          </Link>
          <Link
            href="/radar"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-between border-2 border-[#1F1305] bg-white p-2.5 shadow-[2px_2px_0px_#1F1305] hover:bg-[#1F1305] hover:text-white transition-colors"
          >
            <span><span className="text-[#F1730C]">BUS 03:</span> EL RADAR SONORO 45 RPM</span>
            <span className="text-[#746B5C] text-[10px]">(·)</span>
          </Link>
          <Link
            href="/blog"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-between border-2 border-[#1F1305] bg-white p-2.5 shadow-[2px_2px_0px_#1F1305] hover:bg-[#1F1305] hover:text-white transition-colors"
          >
            <span><span className="text-[#746B5C]">BUS 04:</span> CRÓNICAS DE GRABACIÓN</span>
            <span className="text-[#746B5C] text-[10px]">(·)</span>
          </Link>
          <Link
            href="/nosotros"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-between border-2 border-[#1F1305] bg-white p-2.5 shadow-[2px_2px_0px_#1F1305] hover:bg-[#1F1305] hover:text-white transition-colors"
          >
            <span><span className="text-[#746B5C]">BUS 05:</span> NOSOTROS & MANIFIESTO</span>
            <span className="text-[#746B5C] text-[10px]">(·)</span>
          </Link>
          <Link
            href="/vinilos"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-between border-2 border-[#1F1305] bg-[#F1730C] text-white p-2.5 shadow-[2px_2px_0px_#1F1305] hover:bg-[#E80000] transition-colors"
          >
            <span><span className="text-[#1F1305] bg-white px-1 py-0.2 mr-1">BUS 06:</span> BÓVEDA DE VINILOS</span>
            <span className="text-white text-[10px]">(·)</span>
          </Link>
        </div>
      )}
    </header>
  );
}
