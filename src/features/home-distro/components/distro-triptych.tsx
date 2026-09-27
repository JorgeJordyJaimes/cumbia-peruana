import Link from "next/link";
import { Disc3, ShieldCheck, Library } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";

export function DistroTriptych() {
  return (
    <section id="preservacion" className="py-12 sm:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Columna 1: Tarjeta Vertical Izquierda (Tornamesa & Aguja) */}
        <GlassCard
          className="lg:col-span-3 p-0 overflow-hidden relative min-h-[340px] flex flex-col justify-between bg-gradient-to-b from-neutral-900 to-black border-white/10"
        >
          <div className="absolute inset-0 vinyl-grooves opacity-30 pointer-events-none" />
          
          <div className="relative z-10 p-5 border-b border-white/10 bg-black/40 backdrop-blur-md">
            <span className="font-mono text-[10px] text-amber-400 font-bold uppercase tracking-wider">
              01 // Digitalización Analógica
            </span>
          </div>

          <div className="relative z-10 my-auto p-6 flex flex-col items-center text-center space-y-3">
            <div className="h-20 w-20 rounded-full border-2 border-amber-500/30 bg-neutral-950 flex items-center justify-center shadow-lg">
              <Disc3 className="h-10 w-10 text-amber-400" />
            </div>
            <p className="font-serif text-sm font-bold text-white">
              Cápsulas Magnéticas & Agujas Elípticas
            </p>
            <p className="font-mono text-xs text-neutral-400">
              Lectura fidedigna de surcos en microgroove de 33 y 45 RPM.
            </p>
          </div>

          <div className="relative z-10 p-4 border-t border-white/10 bg-black/50 text-center font-mono text-[10px] text-neutral-500">
            Fidelidad RIAA Original
          </div>
        </GlassCard>

        {/* Columna 2: Panel Central Destacado (Mensaje y Botón CTA - Idéntico a la Referencia) */}
        <GlassCard
          variant="editorial"
          className="lg:col-span-6 p-8 sm:p-12 flex flex-col items-center justify-center text-center space-y-6 bg-gradient-to-br from-amber-500/10 via-neutral-950 to-black border-amber-500/25 relative overflow-hidden"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 font-mono text-xs text-amber-300">
            <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
            <span>Patrimonio Fonográfico Documentado</span>
          </div>

          <h3 className="font-serif text-3xl sm:text-5xl font-black text-white tracking-tight max-w-lg leading-tight">
            Llevamos la historia del vinilo peruano a cualquier rincón del mundo
          </h3>

          <p className="max-w-md font-mono text-xs sm:text-sm text-neutral-300 leading-relaxed">
            Metadatos rigurosos, prensajes originales de época y análisis armónico para la comunidad internacional de DJs, musicólogos y coleccionistas.
          </p>

          <div className="pt-2">
            <Link
              href="#catalogo"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-8 py-3.5 font-mono text-xs font-black uppercase tracking-wider text-black hover:from-amber-400 hover:to-orange-500 transition-all shadow-xl shadow-amber-500/20"
            >
              <Library className="h-4 w-4" />
              <span>Explorar el Catálogo Completo</span>
            </Link>
          </div>
        </GlassCard>

        {/* Columna 3: Tarjeta Vertical Derecha (Conservación y Fundas) */}
        <GlassCard
          className="lg:col-span-3 p-0 overflow-hidden relative min-h-[340px] flex flex-col justify-between bg-gradient-to-b from-neutral-900 to-black border-white/10"
        >
          <div className="absolute inset-0 vinyl-grooves opacity-30 pointer-events-none" />

          <div className="relative z-10 p-5 border-b border-white/10 bg-black/40 backdrop-blur-md">
            <span className="font-mono text-[10px] text-amber-400 font-bold uppercase tracking-wider">
              02 // Preservación Física
            </span>
          </div>

          <div className="relative z-10 my-auto p-6 flex flex-col items-center text-center space-y-3">
            <div className="h-20 w-20 rounded-full border-2 border-amber-500/30 bg-neutral-950 flex items-center justify-center shadow-lg">
              <ShieldCheck className="h-10 w-10 text-amber-400" />
            </div>
            <p className="font-serif text-sm font-bold text-white">
              Cuidado y Archivo Físico
            </p>
            <p className="font-mono text-xs text-neutral-400">
              Documentación de carpetas dobles, insertos, galletas y códigos de matriz.
            </p>
          </div>

          <div className="relative z-10 p-4 border-t border-white/10 bg-black/50 text-center font-mono text-[10px] text-neutral-500">
            Archivos Climatizados
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
