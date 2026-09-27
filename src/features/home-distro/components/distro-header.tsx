"use client";

import Link from "next/link";
import { Search, Disc3, ShieldCheck, SlidersHorizontal } from "lucide-react";

export function DistroHeader() {
  return (
    <header className="border-b border-white/10 bg-neutral-950/80 backdrop-blur-xl sticky top-0 z-40">
      {/* Top Banner de Preservación */}
      <div className="border-b border-white/5 bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-amber-500/10 py-1.5 px-4 text-center font-mono text-[10px] sm:text-xs text-neutral-300">
        <span className="text-amber-400 font-bold mr-2">● ARCHIVO FÍSICO</span>
        Preservación discográfica de la cumbia y chicha peruana (1968–2005) · Prensajes en 45 RPM, LPs y Casetes
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Enlaces Izquierda */}
        <nav className="hidden md:flex items-center gap-6 font-mono text-xs text-neutral-300">
          <Link href="#catalogo" className="hover:text-amber-400 transition-colors">
            Catálogo ▼
          </Link>
          <Link href="#categorias" className="hover:text-amber-400 transition-colors">
            Formatos
          </Link>
          <Link href="#sellos" className="hover:text-amber-400 transition-colors">
            Sellos
          </Link>
          <Link href="#preservacion" className="hover:text-amber-400 transition-colors">
            Preservación
          </Link>
        </nav>

        {/* Emblema / Sello Ovalado Central de Marca (Estilo "Коробка Винила") */}
        <Link href="/" className="flex items-center justify-center group py-2">
          <div className="rounded-full border-2 border-white/25 bg-black/60 px-5 sm:px-7 py-1.5 backdrop-blur-md transition-all duration-300 group-hover:border-amber-400 group-hover:scale-105 shadow-lg shadow-black/80 flex items-center gap-2">
            <Disc3 className="h-4 w-4 text-amber-400 group-hover:rotate-180 transition-transform duration-700" />
            <div className="text-center">
              <span className="block font-black text-xs sm:text-sm tracking-widest text-white uppercase font-serif">
                Kumbia Sound
              </span>
              <span className="block font-mono text-[8px] uppercase tracking-widest text-amber-400/90 -mt-0.5">
                Archivo del Vinilo
              </span>
            </div>
          </div>
        </Link>

        {/* Acciones Derecha */}
        <div className="flex items-center gap-3 font-mono text-xs">
          <Link
            href="#catalogo"
            className="p-2 rounded-xl border border-white/10 bg-white/5 text-neutral-300 hover:text-white hover:border-white/20 transition-colors"
            title="Buscar en el catálogo"
          >
            <Search className="h-4 w-4" />
          </Link>

          <Link
            href="#dj-tools"
            className="hidden sm:inline-flex items-center gap-1.5 p-2 rounded-xl border border-white/10 bg-white/5 text-neutral-300 hover:text-amber-400 hover:border-amber-500/30 transition-colors"
            title="Consola DJ Camelot"
          >
            <SlidersHorizontal className="h-4 w-4 text-amber-400" />
            <span className="hidden lg:inline text-[11px]">Consola DJ</span>
          </Link>

          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 px-3.5 py-2 font-mono text-xs font-bold text-black hover:bg-amber-400 transition-all shadow-md shadow-amber-500/20"
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Panel</span> Admin
          </Link>
        </div>
      </div>
    </header>
  );
}
