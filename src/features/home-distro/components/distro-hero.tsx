import Link from "next/link";
import { Disc3, Library, Sparkles } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";

interface DistroHeroProps {
  totalAlbumes?: number | null;
  totalGrupos?: number | null;
}

export function DistroHero({ totalAlbumes = 719, totalGrupos = 581 }: DistroHeroProps) {
  return (
    <section className="pt-8 pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Bloque Izquierdo: Editorial & Highlights (Estilo Panel de Información de la Referencia) */}
        <GlassCard
          variant="editorial"
          className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-8 bg-neutral-950/85"
        >
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 font-mono text-xs text-amber-400">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Colección & Archivo Discográfico</span>
            </div>

            {/* Título en Tipografía Serif Contundente */}
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white font-serif leading-[1.05]">
              Archivo de Vinilos{" "}
              <span className="block text-2xl sm:text-3xl font-mono font-normal text-amber-400 mt-2">
                Cumbia & Chicha Peruana
              </span>
            </h1>

            {/* Lista de Características / Puntos Clave */}
            <ul className="space-y-2.5 font-mono text-xs sm:text-sm text-neutral-300">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                <span>Prensajes originales en 45 RPM y LPs de época (1968–2005)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                <span>Sellos fundamentales: Infopesa, Odeón, Sono Radio, Horóscopo y FTA</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                <span>Análisis de tempo exacto (BPM) y Rueda Camelot para DJs</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                <span>Genealogía de músicos, directores de orquesta y compositores</span>
              </li>
            </ul>
          </div>

          {/* Caja Destacada con Botón CTA (Estilo Caja Naranja de la Imagen) */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 backdrop-blur-md space-y-4">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                <Library className="h-5 w-5" />
              </div>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Con rigor musicológico preservamos el patrimonio sonoro de la costa, sierra y selva del Perú.
                Más de <strong className="text-white">{totalAlbumes} producciones físicas</strong> y{" "}
                <strong className="text-white">{totalGrupos} agrupaciones</strong> documentadas.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="#catalogo"
                className="inline-flex items-center justify-center w-full sm:w-auto rounded-xl bg-amber-500 px-8 py-3.5 font-mono text-xs font-black uppercase tracking-wider text-black hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20"
              >
                Explorar Catálogo Completo
              </Link>
            </div>
          </div>
        </GlassCard>

        {/* Bloque Derecho: Tarjeta Visual de Archivo / Coleccionista (Estilo Fotografía de Tienda de Vinilos) */}
        <GlassCard
          variant="elevated"
          className="lg:col-span-5 p-0 overflow-hidden relative flex flex-col justify-between min-h-[420px] bg-gradient-to-b from-neutral-900 to-black border-white/15"
        >
          {/* Fondo Texturizado con Surcos de Vinilo */}
          <div className="absolute inset-0 vinyl-grooves opacity-40 pointer-events-none" />

          {/* Iluminación Atmosférica Cálida de Sala de Escucha */}
          <div
            aria-hidden="true"
            className="absolute top-1/4 right-1/4 h-64 w-64 rounded-full bg-gradient-to-br from-amber-500/20 via-orange-600/15 to-transparent blur-[80px]"
          />

          {/* Cabecera del Panel Visual */}
          <div className="relative z-10 p-6 flex items-center justify-between border-b border-white/10 bg-black/40 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="font-mono text-xs text-neutral-300">Sala de Escucha & Preservación</span>
            </div>
            <span className="font-mono text-xs text-amber-400 font-bold">1968–2005</span>
          </div>

          {/* Centro: Artefacto del Vinilo y Tornamesa */}
          <div className="relative z-10 my-auto p-8 flex flex-col items-center text-center space-y-4">
            <div className="relative h-44 w-44 rounded-full bg-[#111115] border-4 border-neutral-800 shadow-2xl flex items-center justify-center group">
              <div className="absolute inset-2 rounded-full border border-white/5 vinyl-grooves" />
              <div className="absolute inset-8 rounded-full border border-white/10" />
              <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-amber-600 to-orange-500 flex items-center justify-center shadow-inner border border-white/30">
                <Disc3 className="h-8 w-8 text-black" />
              </div>
            </div>

            <div className="space-y-1">
              <p className="font-serif italic text-base text-white">
                &ldquo;El vinilo guarda la calidez analógica del Perú tropical.&rdquo;
              </p>
              <p className="font-mono text-xs text-neutral-400">
                Prensajes de Fábrica • Acetatos • Cintas Maestras
              </p>
            </div>
          </div>

          {/* Emblema Ovalado Estampado en la Esquina Inferior Derecha (Idéntico a la Referencia) */}
          <div className="relative z-10 p-6 pt-4 border-t border-white/10 bg-black/50 backdrop-blur-md flex items-center justify-between">
            <div className="font-mono text-[11px] text-neutral-400">
              Preservación Certificada
            </div>

            <div className="rounded-full border border-amber-500/40 bg-black/70 px-4 py-1 font-serif text-[11px] font-bold text-amber-300 shadow-lg">
              Kumbia Sound • Archivo
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
