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
      <GlassCard
        variant="elevated"
        className={`h-full flex flex-col overflow-hidden transition-all duration-300 hover:border-amber-500/40 hover:-translate-y-1 ${
          featured ? "sm:col-span-2 lg:col-span-2" : ""
        }`}
      >
        {/* Contenedor de Portada */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-900 border-b border-white/10">
          {article.imagen_portada_url ? (
            <Image
              src={article.imagen_portada_url}
              alt={article.titulo}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-neutral-900 via-neutral-950 to-amber-950/20 text-neutral-600">
              <Disc3 className="h-12 w-12 text-amber-500/30 animate-spin [animation-duration:15s]" />
              <span className="font-mono text-xs text-neutral-500 mt-2">Crónica de Archivo</span>
            </div>
          )}

          {/* Insignia de Categoría Flotante */}
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-neutral-950/80 px-2.5 py-0.5 font-mono text-[11px] font-medium text-amber-400 backdrop-blur-md">
              <BookOpen className="h-3 w-3" />
              {article.categoria}
            </span>
          </div>
        </div>

        {/* Cuerpo del Artículo */}
        <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-2.5">
            {/* Metadatos: Fecha y Tiempo de Lectura */}
            <div className="flex items-center gap-4 font-mono text-xs text-neutral-400">
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-neutral-500" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-neutral-500" />
                {article.tiempo_lectura}
              </span>
            </div>

            {/* Título */}
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug group-hover:text-amber-300 transition-colors">
              {article.titulo}
            </h3>

            {/* Resumen */}
            {article.resumen && (
              <p className="font-sans text-xs sm:text-sm text-neutral-400 line-clamp-3 leading-relaxed">
                {article.resumen}
              </p>
            )}
          </div>

          {/* Enlace Leer Crónica */}
          <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs font-mono text-amber-400 group-hover:text-amber-300">
            <span>Leer Crónica Completa</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </GlassCard>
    </Link>
  );
}
