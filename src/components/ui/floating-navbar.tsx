"use client";

import Link from "next/link";
import { Disc3, ShieldCheck } from "lucide-react";

export function FloatingNavbar() {
  return (
    <header className="fixed top-4 inset-x-0 z-50 px-4 pointer-events-none">
      <nav className="pointer-events-auto max-w-4xl mx-auto rounded-full border border-white/15 bg-neutral-950/80 backdrop-blur-2xl px-5 sm:px-7 py-2.5 flex items-center justify-between shadow-2xl shadow-black/90 transition-all hover:border-white/25">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-rose-500 via-purple-500 to-amber-400 p-0.5 shadow-md shadow-rose-950/40 group-hover:rotate-45 transition-transform duration-500">
            <div className="h-full w-full rounded-full bg-black flex items-center justify-center">
              <Disc3 className="h-4 w-4 text-rose-400" />
            </div>
          </div>
          <span className="font-extrabold text-sm sm:text-base tracking-tight text-white group-hover:text-rose-400 transition-colors">
            Kumbia<span className="text-rose-500">Sound</span>
          </span>
        </Link>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-6 font-mono text-xs text-neutral-300">
          <Link
            href="#hero"
            className="hover:text-white transition-colors text-white font-medium"
          >
            Inicio
          </Link>
          <Link
            href="#joyas"
            className="hover:text-white transition-colors"
          >
            Joyas
          </Link>
          <Link
            href="#generos"
            className="hover:text-white transition-colors"
          >
            Géneros
          </Link>
          <Link
            href="#catalogo"
            className="hover:text-white transition-colors"
          >
            Catálogo
          </Link>
          <Link
            href="#dj-tools"
            className="hover:text-white transition-colors"
          >
            Consola DJ
          </Link>
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-rose-500 via-fuchsia-600 to-amber-500 px-4 py-1.5 font-mono text-xs font-bold text-white shadow-lg shadow-rose-950/50 hover:brightness-110 hover:scale-105 transition-all"
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Panel</span> Admin
          </Link>
        </div>
      </nav>
    </header>
  );
}
