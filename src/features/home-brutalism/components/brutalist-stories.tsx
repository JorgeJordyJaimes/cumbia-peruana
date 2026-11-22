import Link from "next/link";
import { Calendar, Clock, ArrowUpRight, FileText, BookOpen } from "lucide-react";
import type { Articulo } from "@/types/blog";

interface BrutalistStoriesProps {
  articles: Articulo[];
}

function formatArticleDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Sin fecha";
  return date.toLocaleDateString("es-PE", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function BrutalistStories({ articles }: BrutalistStoriesProps) {
  return (
    <section id="cronicas" className="w-full border-b-2 border-[#1F1305] bg-[#140D04] brutalist-dots-dark text-white py-12 sm:py-16 scroll-mt-20 select-none font-mono">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 space-y-8">

        {/* Cabecera Editorial */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-[#3E2C1B] pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-[#F1730C] uppercase">
              <FileText className="h-4 w-4" />
              <span>INFORMES DE CAMPO // EXPEDIENTES DE INVESTIGACIÓN FONOGRÁFICA</span>
            </div>
            <h2 className="font-cooper text-3xl sm:text-5xl font-black tracking-tight text-white">
              Expedientes &amp; Crónicas de Fondo
            </h2>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 border-2 border-[#3E2C1B] bg-white/10 px-4 py-2 text-xs font-bold text-white shadow-[3px_3px_0px_#1F1305] hover:bg-[#F1730C] hover:border-[#F1730C] hover:text-white transition-all shrink-0"
          >
            <span>CONSULTAR TODAS LAS CRÓNICAS (EXP. 06)</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {articles.length === 0 ? (
          <div className="border-2 border-[#3E2C1B] bg-[#1F1305] p-8 sm:p-12 text-center space-y-3 shadow-[5px_5px_0px_#1F1305]">
            <BookOpen className="h-10 w-10 text-[#F1730C] mx-auto" />
            <p className="font-cooper text-xl text-white">
              Todavía no hay crónicas publicadas.
            </p>
            <p className="font-sans text-sm text-[#B8AFA6] max-w-xl mx-auto">
              Las notas de investigación aparecerán aquí cuando se publiquen desde la mesa de
              redacción del archivo.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {articles.map((article, idx) => (
              <Link
                key={article.id}
                href={`/blog/${article.slug}`}
                className="group border-2 border-[#3E2C1B] bg-[#1F1305] p-4 sm:p-5 shadow-[5px_5px_0px_#1F1305] hover:border-[#F1730C] hover:shadow-[7px_7px_0px_#E80000] hover:-translate-y-1 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Cabecera de la carpeta de informe */}
                  <div className="flex items-center justify-between text-[11px] text-[#8E8478] pb-2 border-b border-[#3E2C1B]">
                    <span className="font-black text-[#E80000]">DOC-0{idx + 1} · DESCLASIFICADO</span>
                    <span className="text-white font-bold truncate max-w-[55%] text-right">{article.categoria}</span>
                  </div>

                  {/* Portada con borde 90° */}
                  <div className="relative aspect-[16/10] w-full border-2 border-[#3E2C1B] overflow-hidden bg-[#0A0704]">
                    {article.imagen_portada_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={article.imagen_portada_url}
                        alt={article.titulo}
                        className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-[#8E8478]">
                        <BookOpen className="h-8 w-8 text-[#F1730C]" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">
                          Crónica de archivo
                        </span>
                      </div>
                    )}
                    <div className="absolute top-2 left-2 border border-[#1F1305] bg-[#E80000] px-2 py-0.5 text-[11px] font-black text-white uppercase tracking-wider shadow-[2px_2px_0px_#1F1305]">
                      {article.categoria}
                    </div>
                    <div className="absolute bottom-2 right-2 border border-[#3E2C1B] bg-[#1F1305] px-2 py-0.5 text-[11px] text-[#EDE0D0] font-bold">
                      CASO #{idx + 1}
                    </div>
                  </div>

                  {/* Metadatos y titular */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-[11px] text-[#B8AFA6]">
                      <span className="flex items-center gap-1 font-semibold text-[#F1730C]">
                        <Clock className="h-3 w-3" />
                        {article.tiempo_lectura}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-[#665D4F]" />
                        {formatArticleDate(article.fecha_publicacion)}
                      </span>
                    </div>

                    <h3 className="font-cooper text-lg sm:text-xl font-black text-white group-hover:text-[#F1730C] transition-colors leading-snug">
                      {article.titulo}
                    </h3>

                    <p className="text-xs text-[#B8AFA6] line-clamp-3 leading-relaxed">
                      {article.resumen || "Consulta la crónica completa en el archivo editorial."}
                    </p>
                  </div>
                </div>

                {/* Pie de la tarjeta */}
                <div className="pt-4 mt-4 border-t border-[#3E2C1B] flex items-center justify-between text-xs text-[#F1730C] font-bold">
                  <span className="group-hover:underline">LEER EXPEDIENTE</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
