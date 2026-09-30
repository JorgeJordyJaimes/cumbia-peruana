import Link from "next/link";
import { BookOpen, Calendar, Clock, ArrowUpRight } from "lucide-react";
import { historiasFondoMock } from "@/features/home-retro/data/cumbia-mock";

export function BrutalistStories() {
  return (
    <section id="cronicas" className="w-full border-b-2 border-black bg-[#EAE6DF] text-black py-12 sm:py-16 scroll-mt-20">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 space-y-8">
        
        {/* Cabecera Editorial */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-black pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-[#F04E23] uppercase">
              <BookOpen className="h-4 w-4" />
              <span>INVESTIGACIÓN & CRÓNICAS • VOL. 01</span>
            </div>
            <h2 className="font-cooper text-3xl sm:text-5xl font-black tracking-tight text-black">
              Historias de Fondo
            </h2>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 border-2 border-black bg-white px-4 py-2 font-mono text-xs font-bold text-black shadow-[3px_3px_0px_#000] hover:bg-[#F04E23] hover:text-white transition-all shrink-0"
          >
            <span>VER TODAS LAS CRÓNICAS</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Cuadrícula de 3 Columnas Brutalistas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {historiasFondoMock.map((story, idx) => (
            <Link
              key={story.id}
              href={`/blog/${story.slug}`}
              className="group border-2 border-black bg-white p-4 sm:p-5 shadow-[5px_5px_0px_#111111] hover:shadow-[7px_7px_0px_#F04E23] hover:-translate-y-1 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Portada con borde brutalista y badge */}
                <div className="relative aspect-[16/10] w-full border-2 border-black overflow-hidden bg-neutral-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={story.portadaUrl}
                    alt={story.titulo}
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-300"
                  />
                  <div className="absolute top-2 left-2 border border-black bg-[#F04E23] px-2 py-0.5 font-mono text-[10px] font-bold text-white uppercase tracking-wider shadow-[2px_2px_0px_#000]">
                    {story.categoria}
                  </div>
                  <div className="absolute bottom-2 right-2 border border-black bg-black px-2 py-0.5 font-mono text-[9px] text-white">
                    0{idx + 1}/
                  </div>
                </div>

                {/* Metadatos y titular */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3 font-mono text-[11px] text-neutral-600">
                    <span className="flex items-center gap-1 font-semibold">
                      <Clock className="h-3 w-3 text-[#F04E23]" />
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

                  <h3 className="font-serif text-lg sm:text-xl font-black text-black group-hover:text-[#F04E23] transition-colors leading-snug">
                    {story.titulo}
                  </h3>

                  <p className="font-mono text-xs text-neutral-700 leading-relaxed line-clamp-3">
                    {story.resumen}
                  </p>
                </div>
              </div>

              {/* Botón inferior */}
              <div className="pt-4 mt-4 border-t-2 border-black/10 flex items-center justify-between font-mono text-xs font-bold text-black group-hover:text-[#F04E23]">
                <span>LEER CRÓNICA</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          ))}
        </div>

        {/* Faja Inferior Brutalista */}
        <div className="border-2 border-black bg-black text-white p-5 sm:p-6 shadow-[4px_4px_0px_#F04E23] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <p className="font-anton text-lg uppercase tracking-wide flex items-center justify-center sm:justify-start gap-2">
              <span className="inline-block w-2.5 h-2.5 bg-[#F04E23]" />
              ¿DESEAS INVESTIGAR SELLOS, BIOGRAFÍAS Y ANÉCDOTAS DE ESTUDIO?
            </p>
            <p className="font-mono text-xs text-neutral-400">
              Explora ensayos extensos con discografías catalogadas, análisis de guitarras y testimonios orales.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 border-2 border-white bg-[#F04E23] px-5 py-2.5 font-mono text-xs font-bold text-white hover:bg-white hover:text-black hover:border-black transition-all shrink-0"
          >
            <span>ARCHIVO DE ARTÍCULOS</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
