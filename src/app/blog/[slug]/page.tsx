import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { BrutalistCoordinator, BrutalistFooter } from "@/features/home-brutalism";
import { MarkdownRenderer } from "@/features/blog";
import { ArrowLeft, BookOpen, Calendar, Clock, Disc3, Share2 } from "lucide-react";
import type { Articulo } from "@/types/blog";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: articulo } = await supabase
    .from("articulos")
    .select("titulo, resumen")
    .eq("slug", slug)
    .single();

  if (!articulo) {
    return {
      title: "Artículo no encontrado | Kumbia Sound",
    };
  }

  return {
    title: `${articulo.titulo} | Kumbia Sound`,
    description: articulo.resumen || "Crónicas históricas de la cumbia peruana en vinilo.",
  };
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: rawArticle } = await supabase
    .from("articulos")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!rawArticle) {
    notFound();
  }

  const article: Articulo = rawArticle;

  const formattedDate = new Date(article.fecha_publicacion).toLocaleDateString("es-PE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="relative min-h-screen bg-[#EDE0D0] text-[#1F1305] selection:bg-[#F1730C] selection:text-white">
      <BrutalistCoordinator>
        <main className="container mx-auto max-w-4xl px-4 sm:px-6 pt-6 pb-20 space-y-8">
          {/* Breadcrumb / Retorno a Crónicas */}
          <div className="flex items-center justify-between border-b-2 border-[#1F1305] pb-4 font-mono text-xs">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-bold text-[#1F1305] hover:text-[#E80000] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>← Volver a Crónicas & Archivo</span>
            </Link>

            <span className="font-mono text-xs font-bold text-[#E80000] uppercase">
              Archivo Histórico KS
            </span>
          </div>

          {/* Cabecera del Artículo */}
          <div className="border-2 border-[#1F1305] bg-white p-6 sm:p-10 shadow-[6px_6px_0px_#1F1305] space-y-6">
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[#746B5C] font-bold">
              <span className="inline-flex items-center gap-1.5 border border-[#1F1305] bg-[#F1730C] px-3 py-1 text-white shadow-[2px_2px_0px_#1F1305]">
                <BookOpen className="h-3.5 w-3.5" />
                {article.categoria}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-[#F1730C]" />
                {formattedDate}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-[#E80000]" />
                {article.tiempo_lectura}
              </span>
            </div>

            <h1 className="font-cooper text-3xl sm:text-5xl lg:text-6xl font-black text-[#1F1305] tracking-tight leading-tight">
              {article.titulo}
            </h1>

            <div className="flex items-center justify-between border-y-2 border-[#1F1305]/15 py-4 font-mono text-xs text-[#746B5C]">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 border-2 border-[#1F1305] bg-[#1F1305] flex items-center justify-center text-[#EDE0D0] font-cooper font-bold text-xs shadow-[2px_2px_0px_#E80000]">
                  KS
                </div>
                <div>
                  <p className="text-[#1F1305] font-bold text-sm">{article.autor_nombre}</p>
                  <p className="text-[11px] text-[#746B5C]">Investigación & Preservación</p>
                </div>
              </div>

              <div className="flex items-center gap-2 font-bold text-[#1F1305]">
                <Share2 className="h-4 w-4 text-[#E80000]" />
                <span>Archivo Histórico</span>
              </div>
            </div>
          </div>

          {/* Portada WebP destacada */}
          {article.imagen_portada_url && (
            <div className="relative aspect-[16/9] w-full border-2 border-[#1F1305] bg-[#1F1305] shadow-[6px_6px_0px_#1F1305] overflow-hidden">
              <Image
                src={article.imagen_portada_url}
                alt={article.titulo}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Resumen / Bajada Editorial */}
          {article.resumen && (
            <div className="border-2 border-[#1F1305] bg-[#EDE0D0] p-6 font-serif italic text-lg sm:text-xl text-[#1F1305] leading-relaxed shadow-[3px_3px_0px_#1F1305]">
              {article.resumen}
            </div>
          )}

          {/* Cuerpo del Artículo en Markdown dentro de caja blanca brutalista */}
          <article className="border-2 border-[#1F1305] bg-white p-6 sm:p-10 shadow-[6px_6px_0px_#1F1305]">
            <MarkdownRenderer content={article.contenido} />
          </article>

          {/* Pie de Artículo & Llamado al Catálogo */}
          <section className="pt-4">
            <div className="border-2 border-[#1F1305] bg-[#1F1305] text-[#EDE0D0] p-8 sm:p-10 text-center space-y-6 shadow-[6px_6px_0px_#E80000]">
              <Disc3 className="h-10 w-10 text-[#F8C800] mx-auto animate-spin [animation-duration:12s]" />
              <div className="space-y-2 max-w-xl mx-auto">
                <h3 className="font-cooper text-2xl font-bold text-white">
                  Explora el Catálogo Físico Completo
                </h3>
                <p className="font-sans text-sm text-[#EDE0D0]/80">
                  Consulta los prensajes originales en vinilo de 33 y 45 RPM, fichas discográficas y la consola de compatibilidad armónica para DJs.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <Link
                  href="/#catalogo-vinilos"
                  className="border-2 border-[#EDE0D0] bg-[#E80000] px-6 py-2.5 font-mono text-xs font-bold text-white shadow-[3px_3px_0px_#EDE0D0] hover:bg-white hover:text-[#1F1305] transition-all"
                >
                  Ver Catálogo de Vinilos
                </Link>
                <Link
                  href="/blog"
                  className="border-2 border-[#EDE0D0] bg-white/10 px-6 py-2.5 font-mono text-xs font-bold text-white hover:bg-white/20 transition-all"
                >
                  Más Crónicas
                </Link>
              </div>
            </div>
          </section>
        </main>
      </BrutalistCoordinator>

      <BrutalistFooter />
    </div>
  );
}
