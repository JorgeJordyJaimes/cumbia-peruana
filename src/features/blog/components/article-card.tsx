import Link from "next/link";
import Image from "next/image";
import { GlassCard } from "@/components/ui/glass-card";
import { BookOpen, Calendar, Clock, ArrowRight, Disc3 } from "lucide-react";
import type { Articulo } from "@/types/blog";

interface ArticleCardProps {
  article: Articulo;
  featured?: boolean;
}

export function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const formattedDate = new Date(article.fecha_publicacion).toLocaleDateString("es-PE", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link href={`/blog/${article.slug}`} className="group block h-full">
      <div
        className={`h-full flex flex-col border-2 border-[#1F1305] bg-white text-[#1F1305] shadow-[4px_4px_0px_#1F1305] hover:shadow-[4px_4px_0px_#E80000] hover:translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200 overflow-hidden ${
          featured ? "sm:col-span-2 lg:col-span-2" : ""
        }`}
      >
        {/* Contenedor de Portada */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#1F1305] border-b-2 border-[#1F1305]">
          {article.imagen_portada_url ? (
            <Image
              src={article.imagen_portada_url}
              alt={article.titulo}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#EDE0D0] text-[#1F1305]">
              <Disc3 className="h-12 w-12 text-[#E80000] animate-spin [animation-duration:15s]" />
              <span className="font-mono text-xs text-[#1F1305] font-bold mt-2">Crónica de Archivo</span>
            </div>
          )}

          {/* Insignia de Categoría Flotante */}
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1.5 border border-[#1F1305] bg-[#F1730C] px-2.5 py-0.5 font-mono text-[11px] font-bold text-white shadow-[2px_2px_0px_#1F1305]">
              <BookOpen className="h-3 w-3" />
              {article.categoria}
            </span>
          </div>
        </div>

        {/* Cuerpo del Artículo */}
        <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-2.5">
            {/* Metadatos: Fecha y Tiempo de Lectura */}
            <div className="flex items-center gap-4 font-mono text-xs text-[#746B5C] font-bold">
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-[#F1730C]" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-[#E80000]" />
                {article.tiempo_lectura}
              </span>
            </div>

            {/* Título */}
            <h3 className="font-cooper text-xl sm:text-2xl font-bold text-[#1F1305] tracking-tight leading-snug group-hover:text-[#E80000] transition-colors">
              {article.titulo}
            </h3>

            {/* Resumen */}
            {article.resumen && (
              <p className="font-sans text-xs sm:text-sm text-[#5A5245] line-clamp-3 leading-relaxed">
                {article.resumen}
              </p>
            )}
          </div>

          {/* Enlace Leer Crónica */}
          <div className="pt-3 border-t-2 border-[#1F1305]/10 flex items-center justify-between text-xs font-mono font-bold text-[#E80000] group-hover:text-[#F1730C]">
            <span>Leer Crónica Completa</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}
