import Link from "next/link";
import { BookOpen, Calendar, Clock, ArrowRight } from "lucide-react";
import { historiasFondoMock } from "../data/cumbia-mock";

export function HistoriasDeFondo() {
  return (
    <section id="historias" className="scroll-mt-24 py-16 sm:py-20 border-t border-white/5 bg-[#0D0F12]">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 space-y-10">
        {/* Cabecera */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-5">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#E5A93C]">
              <BookOpen className="h-4 w-4" />
              <span>Investigación & Periodismo Musical</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-black tracking-tight text-[#F3F4F6]">
              Historias de Fondo & Crónicas
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#9CA3AF] leading-relaxed">
              Ensayos históricos sobre la alquimia sonora de los estudios peruanos, la gráfica
              chicha de los 80s y las anécdotas no contadas de los maestros del vinilo.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[#E5A93C] hover:text-white hover:underline transition-colors shrink-0"
          >
            <span>Ver todas las crónicas</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Cuadrícula de 3 Columnas Requerida */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {historiasFondoMock.map((story) => (
            <Link
              key={story.id}
              href={`/blog/${story.slug}`}
              className="rounded-3xl border border-white/10 bg-[#16191E] overflow-hidden shadow-2xl flex flex-col justify-between hover:border-[#E5A93C]/50 hover:-translate-y-1 transition-all group"
            >
              {/* Imagen con Aspect Ratio */}
              <div className="relative aspect-[16/10] w-full bg-[#0D0F12] overflow-hidden border-b border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={story.portadaUrl}
                  alt={story.titulo}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 rounded-full bg-black/80 border border-[#E5A93C]/30 px-3 py-0.5 font-mono text-[10px] font-semibold text-[#E5A93C] backdrop-blur-md">
                  {story.categoria}
                </div>
              </div>

              {/* Contenido Editorial */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  {/* Metadatos: Tiempo de Lectura y Fecha */}
                  <div className="flex items-center gap-3 font-mono text-[11px] text-[#9CA3AF]">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {story.tiempoLectura}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(story.fecha).toLocaleDateString("es-PE", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white group-hover:text-[#E5A93C] transition-colors leading-snug">
                    {story.titulo}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-[#9CA3AF] leading-relaxed line-clamp-3">
                    {story.resumen}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between font-mono text-xs text-[#E5A93C] group-hover:text-[#f5c76d]">
                  <span>Leer crónica completa</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
