import Link from "next/link";
import { BookOpen, Calendar, Clock, ArrowUpRight } from "lucide-react";
import { historiasFondoMock } from "@/features/home-retro/data/cumbia-mock";

export function BrutalistStories() {
  return (
    <section id="cronicas" className="w-full border-b border-[#1F1305] bg-[#140D04] text-white py-10 sm:py-14 scroll-mt-20 select-none">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 space-y-7">
        
        {/* Cabecera Técnica */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#3E2C1B] pb-5">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 font-mono text-[11px] font-bold tracking-widest text-[#F1730C] uppercase">
              <span className="text-[#E80000]">+</span>
              <span>[HOJA D-01] EXPEDIENTES HISTÓRICOS & INVESTIGACIÓN • VOL. 01</span>
            </div>
            <h2 className="font-cooper text-3xl sm:text-4xl font-black tracking-tight text-white">
              Historias de Fondo
            </h2>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 border border-[#3E2C1B] bg-white/10 px-4 py-2 font-mono text-xs font-bold text-white hover:bg-[#F1730C] hover:border-[#F1730C] transition-colors shrink-0"
          >
            <span>[EXP] TODAS LAS CRÓNICAS</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Cuadrícula de 3 Columnas Técnicas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-6">
          {historiasFondoMock.map((story, idx) => (
            <Link
              key={story.id}
              href={`/blog/${story.slug}`}
              className="group border border-[#3E2C1B] bg-[#1F1305] p-4 sm:p-5 hover:border-[#F1730C] transition-all flex flex-col justify-between relative"
            >
              <div className="absolute top-1 right-1 font-mono text-[9px] text-[#746B5C]">+</div>
              <div className="space-y-4">
                {/* Portada con borde técnico y badge */}
                <div className="relative aspect-[16/10] w-full border border-[#3E2C1B] overflow-hidden bg-[#0A0704]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={story.portadaUrl}
                    alt={story.titulo}
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-300"
                  />
                  <div className="absolute top-2 left-2 border border-[#1F1305] bg-[#E80000] px-2 py-0.5 font-mono text-[9px] font-bold text-white uppercase tracking-wider">
                    {story.categoria}
                  </div>
                  <div className="absolute bottom-2 right-2 border border-[#3E2C1B] bg-black/80 px-2 py-0.5 font-mono text-[9px] text-[#EDE0D0]">
                    [0{idx + 1}]
                  </div>
                </div>

                {/* Metadatos y titular */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3 font-mono text-[11px] text-[#B8AFA6]">
                    <span className="flex items-center gap-1 font-semibold text-[#F1730C]">
                      <Clock className="h-3 w-3" />
                      {story.tiempoLectura}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(story.fecha).toLocaleDateString("es-PE", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <h3 className="font-cooper text-lg sm:text-xl font-black text-white group-hover:text-[#F1730C] transition-colors leading-snug">
                    {story.titulo}
                  </h3>

                  <p className="font-mono text-xs text-[#B8AFA6] leading-relaxed line-clamp-3">
                    {story.resumen}
                  </p>
                </div>
              </div>

              {/* Botón inferior */}
              <div className="pt-3 mt-4 border-t border-[#3E2C1B] flex items-center justify-between font-mono text-xs font-bold text-[#F1730C] group-hover:text-white">
                <span className="text-[11px]">[LEER CRÓNICA COMPLETA]</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          ))}
        </div>

        {/* Faja Inferior Técnica */}
        <div className="border border-[#3E2C1B] bg-[#0E0803] text-white p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <p className="font-mono text-xs font-bold uppercase tracking-wide flex items-center justify-center sm:justify-start gap-2 text-white">
              <span className="inline-block w-2 h-2 bg-[#E80000]" />
              EXPEDIENTES HISTÓRICOS & ANÁLISIS DE GUITARRAS
            </p>
            <p className="font-mono text-[11px] text-[#B8AFA6]">
              Ensayos musicológicos con matrices catalogadas y testimonios de época.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 border border-[#3E2C1B] bg-[#F1730C] px-4 py-2 font-mono text-xs font-bold text-white hover:bg-white hover:text-[#1F1305] transition-colors shrink-0"
          >
            <span>[CONSULTAR ARCHIVO]</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
}
