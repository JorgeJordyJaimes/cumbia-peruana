import { Disc3, Music2, Library, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-zinc-100 selection:bg-amber-500 selection:text-black">
      {/* Header / Navbar */}
      <header className="border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-orange-950/50">
              <Disc3 className="h-6 w-6 text-black" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-zinc-100">Kumbia Sound</span>
              <span className="hidden sm:inline-block ml-2 text-xs font-medium text-amber-400/90 border border-amber-500/30 rounded px-1.5 py-0.5">
                Archivo 1968–2005
              </span>
            </div>
          </div>

          <nav className="flex items-center gap-4 text-sm font-medium">
            <Link href="#catalogo" className="text-zinc-400 hover:text-zinc-100 transition-colors">
              Catálogo
            </Link>
            <Link href="#dj-tools" className="text-zinc-400 hover:text-zinc-100 transition-colors">
              Herramientas DJ
            </Link>
            <Link
              href="/admin"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-200"
              )}
            >
              Panel Admin
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative overflow-hidden py-24 px-6 md:py-32">
          {/* Subtle glow background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400 mb-6">
              <Music2 className="h-3.5 w-3.5" />
              Preservación Musicológica & Análisis Armónico
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-zinc-50 mb-6">
              Archivo Histórico de la{" "}
              <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 bg-clip-text text-transparent">
                Cumbia Peruana
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-lg text-zinc-400 leading-relaxed mb-10">
              Plataforma digital especializada en la preservación discográfica de vinilos (45 RPM y LPs),
              genealogía de agrupaciones peruanas y consultas técnicas de mezcla armónica (BPM y Rueda Camelot).
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/admin"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "bg-gradient-to-r from-amber-500 to-orange-600 text-black font-semibold hover:from-amber-400 hover:to-orange-500 shadow-lg shadow-orange-950/40"
                )}
              >
                Explorar Base de Datos
              </Link>
              <Link
                href="https://github.com/JorgeJordyJaimes/cumbia-peruana"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300"
                )}
              >
                Ver Repositorio GitHub
              </Link>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="border-t border-zinc-800/80 bg-zinc-900/30 py-16 px-6">
          <div className="container mx-auto max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur">
                <div className="h-10 w-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4 text-amber-400">
                  <Library className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-100 mb-2">Fidelidad Física</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Registro riguroso de prensajes originales en 45 RPM, LPs, casetes, splits compartidos por lado y sellos discográficos históricos.
                </p>
              </div>

              <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur">
                <div className="h-10 w-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-4 text-orange-400">
                  <SlidersHorizontal className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-100 mb-2">Herramientas DJ</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Consultas armónicas mediante valores de BPM exactos, tonalidad estándar y compatibilidad en la Rueda Camelot (1A–12B).
                </p>
              </div>

              <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur">
                <div className="h-10 w-10 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-4 text-rose-400">
                  <Disc3 className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-100 mb-2">Genealogía Musical</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Trazabilidad de compositores, adaptaciones (covers), créditos por instrumento y el árbol de vigencia de músicos en agrupaciones.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-8 px-6 text-center text-xs text-zinc-500">
        <p>Kumbia Sound © {new Date().getFullYear()} — Preservación de la Cumbia Peruana.</p>
      </footer>
    </div>
  );
}
