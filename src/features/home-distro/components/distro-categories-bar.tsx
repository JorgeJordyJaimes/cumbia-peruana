"use client";

import { Disc3, Disc, CassetteTape, Layers, ArrowLeft, ArrowRight, Building2, Flame } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";

interface DistroCategoriesBarProps {
  onSelectCategory?: (category: string) => void;
}

export function DistroCategoriesBar({ onSelectCategory }: DistroCategoriesBarProps) {
  const categories = [
    { id: "lp", name: "Vinilos LP", desc: "33 RPM", icon: Disc3, color: "text-amber-400", border: "border-amber-500/30" },
    { id: "singles", name: "Singles 45s", desc: "7 pulgadas", icon: Disc, color: "text-rose-400", border: "border-rose-500/30" },
    { id: "casetes", name: "Casetes", desc: "Cintas K7", icon: CassetteTape, color: "text-emerald-400", border: "border-emerald-500/30" },
    { id: "splits", name: "Discos Split", desc: "Lado A / B", icon: Layers, color: "text-cyan-400", border: "border-cyan-500/30" },
    { id: "odeone", name: "Sello Odeón", desc: "Catálogo ELD", icon: Building2, color: "text-amber-300", border: "border-white/20" },
    { id: "infopesa", name: "Infopesa", desc: "El Disco es Cultura", icon: Building2, color: "text-orange-400", border: "border-white/20" },
    { id: "sonoradio", name: "Sono Radio", desc: "Nacional", icon: Building2, color: "text-fuchsia-400", border: "border-white/20" },
    { id: "horoscopo", name: "Horóscopo", desc: "Cumbia Chicha", icon: Flame, color: "text-red-400", border: "border-red-500/30" },
  ];

  return (
    <section id="categorias" className="py-8">
      <GlassCard className="p-6 sm:p-8 bg-neutral-950/70 space-y-6">
        {/* Cabecera de la Tira con Flechas (Idéntico a la Referencia) */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-black text-white tracking-tight">
              Formatos & Secciones Populares
            </h3>
            <p className="font-mono text-xs text-neutral-400 mt-0.5">
              Navegación por tipo de soporte físico y sellos fonográficos
            </p>
          </div>

          {/* Flechas de Navegación */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="h-9 w-9 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-neutral-300 hover:text-white hover:border-white/30 transition-colors"
              title="Anterior"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="h-9 w-9 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-neutral-300 hover:text-white hover:border-white/30 transition-colors"
              title="Siguiente"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Fila de Avatares Circulares (Idéntico a la distribución de la imagen) */}
        <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-6 text-center">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory?.(cat.id)}
                className="group flex flex-col items-center gap-2.5 cursor-pointer"
              >
                {/* Avatar Circular con Borde y Sombra */}
                <div
                  className={`h-16 w-16 sm:h-20 sm:w-20 rounded-full border-2 bg-neutral-900/90 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:border-amber-400 group-hover:bg-neutral-800 ${cat.border}`}
                >
                  <Icon className={`h-7 w-7 sm:h-8 sm:w-8 ${cat.color} group-hover:rotate-12 transition-transform duration-300`} />
                </div>

                {/* Etiquetas */}
                <div className="space-y-0.5">
                  <span className="block font-bold text-xs text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                    {cat.name}
                  </span>
                  <span className="block font-mono text-[10px] text-neutral-400">
                    {cat.desc}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </GlassCard>
    </section>
  );
}
