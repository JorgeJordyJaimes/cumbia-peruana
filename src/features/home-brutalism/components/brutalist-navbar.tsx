"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X } from "lucide-react";

interface BrutalistNavbarProps {
  onOpenCommandPalette: () => void;
}

const NAV_EXPEDIENTES = [
  { exp: "EXP. 01", label: "VINILOS", sub: "Archivo Fonográfico", href: "/vinilos", accent: "#F1730C" },
  { exp: "EXP. 02", label: "GENEALOGÍA", sub: "Árbol & Versiones", href: "/genealogia", accent: "#E80000" },
  { exp: "EXP. 03", label: "INFORMES", sub: "Peritajes de Músicos", href: "/informes", accent: "#E80000" },
  { exp: "EXP. 04", label: "MATCH BPM", sub: "Consola Armónica", href: "/match-bpm", accent: "#F1730C" },
  { exp: "EXP. 05", label: "RADAR", sub: "Hallazgos del Mes", href: "/radar", accent: "#F1730C" },
  { exp: "EXP. 06", label: "NOTAS", sub: "Investigación", href: "/blog", accent: "#746B5C" },
  { exp: "LEGAJO", label: "LEGAJO", sub: "Manifiesto & Normas", href: "/legajo", accent: "#746B5C" },
];

export function BrutalistNavbar({ onOpenCommandPalette }: BrutalistNavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b-2 border-[#1F1305] bg-[#EDE0D0] text-[#1F1305] select-none font-mono">
      <div className="container mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-3 sm:px-6">
        
        {/* LOGO: Sello Oficial de Archivo Histórico */}
        <Link href="/" className="group flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="relative flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center border-2 border-[#1F1305] bg-[#1F1305] shadow-[3px_3px_0px_#E80000] transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:shadow-[5px_5px_0px_#E80000] p-1 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/branding/kumbia-sound-logo-cropped.png"
              alt="Kumbia Sound Logo Oficial"
              className="w-full h-full object-contain filter drop-shadow-[0_0_2px_#E80000] transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-cooper text-lg sm:text-2xl font-black tracking-tight text-[#1F1305]">
                Kumbia Sound
              </span>
              <span className="border border-[#1F1305] bg-[#E80000] text-white text-[10px] sm:text-[11px] font-black px-1.5 leading-tight">
                REG
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#665D4F] font-bold hidden sm:block">
              ARCHIVO CLASIFICADO DE LA CUMBIA // 1968–2005
            </p>
          </div>
        </Link>

        {/* NAVEGACIÓN DESKTOP: CARPETAS DE EXPEDIENTE EXP. 01 A 06 + LEGAJO */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-bold tracking-wider self-end mb-[-2px]">
          {NAV_EXPEDIENTES.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.label}
                href={item.href}
                className={
                  isActive
                    ? "group flex flex-col items-start px-2 xl:px-2.5 py-1.5 border-t-4 border-t-[#E80000] border-x-2 border-x-[#1F1305] border-b-2 border-b-white bg-white translate-y-[2px] transition-all"
                    : "group flex flex-col items-start px-2 xl:px-2.5 py-1.5 border-2 border-[#1F1305] bg-[#EDE0D0] hover:bg-white hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_#1F1305] transition-all"
                }
              >
                <div className="flex items-center gap-1">
                  <span className="font-mono text-[10px] xl:text-[11px] font-black" style={{ color: item.accent }}>
                    {item.exp}
                  </span>
                  <span className="font-bold text-[11px] xl:text-xs tracking-wider text-[#1F1305] group-hover:text-[#E80000] transition-colors">
                    {item.label}
                  </span>
                </div>
                <span className="font-mono text-[10px] xl:text-[11px] text-[#665D4F] font-medium leading-none mt-0.5 hidden xl:block">
                  {item.sub}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* ACCIONES: BOTÓN CONSULTAR EXPEDIENTE ⌘K + MENÚ MÓVIL */}
        <div className="flex items-center gap-2 sm:gap-3 text-xs shrink-0">
          <button
            type="button"
            onClick={onOpenCommandPalette}
            className="flex items-center gap-1.5 sm:gap-2 border-2 border-[#1F1305] bg-white px-2.5 sm:px-4 py-2 text-[#1F1305] shadow-[3px_3px_0px_#1F1305] hover:bg-[#1F1305] hover:text-white hover:border-[#1F1305] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#E80000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#1F1305] transition-all cursor-pointer"
            title="Abrir buscador de expedientes (⌘K)"
          >
            <Search className="h-4 w-4 text-[#E80000]" />
            <span className="hidden sm:inline font-black tracking-wider text-[11px]">CONSULTAR EXPEDIENTE</span>
            <kbd className="hidden md:inline-block border border-[#1F1305] bg-[#EDE0D0] px-1.5 py-0.5 text-[11px] text-[#1F1305] font-bold">
              ⌘K
            </kbd>
          </button>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden border-2 border-[#1F1305] bg-white p-2 text-[#1F1305] shadow-[2px_2px_0px_#1F1305] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#1F1305] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
            aria-label="Abrir menú"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* MENÚ MÓVIL: ÍNDICE DE EXPEDIENTES */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t-2 border-[#1F1305] bg-[#EDE0D0] p-4 text-xs font-bold space-y-2 animate-in slide-in-from-top-2 duration-150">
          <div className="text-[11px] text-[#665D4F] uppercase tracking-widest pb-1 border-b border-[#1F1305] flex items-center justify-between">
            <span>ÍNDICE DE LEGAJOS DESCLASIFICADOS</span>
            <span className="text-[#E80000] font-black">CONFIDENCIAL</span>
          </div>
          {NAV_EXPEDIENTES.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between border-2 border-[#1F1305] bg-white p-2.5 shadow-[2px_2px_0px_#1F1305] hover:bg-[#1F1305] hover:text-white hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#E80000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
            >
              <div>
                <span className="font-mono text-[11px] font-black mr-2" style={{ color: item.accent }}>
                  {item.exp}:
                </span>
                <span className="font-bold text-xs">{item.label}</span>
              </div>
              <span className="font-mono text-[11px] text-[#665D4F] group-hover:text-white">
                {item.sub}
              </span>
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
