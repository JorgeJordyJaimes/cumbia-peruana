import Link from "next/link";
import { Music, Users, Building2, Disc3, Sparkles, SlidersHorizontal, ArrowDown } from "lucide-react";

interface HeroEditorialProps {
  totalAlbumes?: number | null;
  totalGrupos?: number | null;
  totalSellos?: number | null;
}

export function HeroEditorial({
  totalAlbumes = 719,
  totalGrupos = 581,
  totalSellos = 258,
}: HeroEditorialProps) {
  return (
    <section id="hero" className="relative pt-24 sm:pt-32 pb-16 md:pb-24 overflow-hidden">
      {/* Luces de Fondo Vibrantes (Magenta / Violeta / Cian / Ámbar) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 left-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-fuchsia-600/25 via-purple-700/20 to-transparent blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-20 right-[-10%] -z-10 h-[600px] w-[600px] rounded-full bg-gradient-to-bl from-rose-600/20 via-amber-500/15 to-transparent blur-[150px]"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Columna Izquierda: Editorial Content */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
          {/* Badge superior */}
          <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-3.5 py-1 text-xs font-mono text-fuchsia-300 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-fuchsia-400 animate-pulse" />
            <span>Preservación Musicológica & Archivo DJ</span>
          </div>

          {/* Título Principal de Alto Impacto */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08]">
            Sonido Inmortal{" "}
            <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-rose-400 via-fuchsia-400 to-amber-400 bg-clip-text text-transparent">
              Sin Fronteras
            </span>
          </h1>

          {/* Párrafo descriptivo */}
          <p className="max-w-xl text-base sm:text-lg text-neutral-300 font-normal leading-relaxed">
            Archivo discográfico digital de la época de oro de la cumbia peruana y la chicha (1968–2005). 
            Preservamos prensajes originales en 45 RPM, LPs y casetes con análisis armónico de BPM y Rueda Camelot para coleccionistas e investigadores.
          </p>

          {/* Estadísticas en línea con iconos */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-8 pt-2 font-mono text-xs text-neutral-300">
            <div className="flex items-center gap-2">
              <Music className="h-4 w-4 text-rose-400" />
              <div>
                <span className="font-bold text-white text-sm">{totalAlbumes}+</span>{" "}
                <span className="text-neutral-400">Vinilos & Singles</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-fuchsia-400" />
              <div>
                <span className="font-bold text-white text-sm">{totalGrupos}+</span>{" "}
                <span className="text-neutral-400">Agrupaciones</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-amber-400" />
              <div>
                <span className="font-bold text-white text-sm">{totalSellos}+</span>{" "}
                <span className="text-neutral-400">Sellos de Época</span>
              </div>
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link
              href="#catalogo"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-500 via-fuchsia-600 to-rose-600 px-7 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-xl shadow-rose-950/60 hover:brightness-110 hover:scale-105 transition-all"
            >
              <Disc3 className="h-4 w-4" />
              <span>Explorar Catálogo</span>
            </Link>

            <Link
              href="#dj-tools"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-neutral-200 backdrop-blur-xl hover:border-white/30 hover:bg-white/10 hover:text-white transition-all"
            >
              <SlidersHorizontal className="h-4 w-4 text-amber-400" />
              <span>Consola Camelot</span>
            </Link>
          </div>
        </div>

        {/* Columna Derecha: Tarjeta Visual de Alto Impacto con Aura Neón */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          {/* Resplandor Neón Detrás de la Tarjeta */}
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-fuchsia-600/30 via-rose-600/25 to-amber-500/20 blur-[80px] -z-10"
          />

          {/* Tarjeta Visual Estilizada */}
          <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl border border-white/15 bg-gradient-to-b from-white/10 via-neutral-900/80 to-black p-6 sm:p-8 backdrop-blur-2xl shadow-2xl shadow-black/90 flex flex-col justify-between overflow-hidden group">
            {/* Disco de Vinilo animado saliendo en la parte superior derecha */}
            <div
              aria-hidden="true"
              className="absolute -top-12 -right-12 h-56 w-56 rounded-full bg-[#111115] border border-white/10 shadow-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-700"
            >
              <div className="h-40 w-40 rounded-full border border-white/5 vinyl-grooves opacity-60" />
              <div className="h-20 w-20 rounded-full bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center border border-white/30 shadow-inner">
                <div className="h-4 w-4 rounded-full bg-black" />
              </div>
            </div>

            {/* Cabecera de la tarjeta */}
            <div className="relative z-10 space-y-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-fuchsia-400 bg-fuchsia-500/10 px-2.5 py-1 rounded-full border border-fuchsia-500/20 backdrop-blur">
                ARCHIVO DISCOGRÁFICO NACIONAL
              </span>
              <h3 className="text-2xl font-black text-white tracking-tight leading-tight mt-2">
                Guitarras Psicodélicas & Órganos de Selva
              </h3>
            </div>

            {/* Centro Artístico: Cita y Sellos Históricos */}
            <div className="relative z-10 space-y-4 my-auto py-6">
              <p className="text-xs text-neutral-300 font-sans italic leading-relaxed">
                &ldquo;En los años 70, la cumbia peruana unió el huayno andino, la cumbia colombiana y el rock psicodélico para dar nacimiento a un sonido único en el mundo.&rdquo;
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {["Infopesa", "Odeón Perú", "Sono Radio", "Horóscopo", "FTA"].map((sello) => (
                  <span
                    key={sello}
                    className="font-mono text-[10px] text-neutral-400 bg-black/40 px-2 py-0.5 rounded border border-white/5"
                  >
                    {sello}
                  </span>
                ))}
              </div>
            </div>

            {/* Pie de la tarjeta: Badges DJ & Calidad */}
            <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-neutral-400 text-[11px]">719 Registros Físicos</span>
              </div>
              <span className="text-amber-400 font-bold text-[11px] bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                1968 · 2005
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Flecha indicadora de scroll sutil */}
      <div className="mt-12 flex justify-center">
        <Link
          href="#joyas"
          className="flex flex-col items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-neutral-500 hover:text-white transition-colors"
        >
          <span>Descubrir Joyas</span>
          <ArrowDown className="h-3.5 w-3.5 text-neutral-500 animate-bounce" />
        </Link>
      </div>
    </section>
  );
}
