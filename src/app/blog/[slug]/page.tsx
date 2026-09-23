import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { AmbientGlow } from "@/components/ui/ambient-glow";
import { GlassCard } from "@/components/ui/glass-card";
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
    <div className="relative min-h-screen bg-[#0a0a0c] text-white selection:bg-amber-500 selection:text-black">
      {/* Resplandores Ambientales */}
      <AmbientGlow variant="warm-solar" className="opacity-25" />
      <AmbientGlow variant="velvet-night" className="top-1/3 opacity-20" />

      {/* Barra de Navegación Superior */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-neutral-950/80 backdrop-blur-xl">
        <div className="container mx-auto flex max-w-5xl items-center justify-between px-4 sm:px-6 py-4">
          <Link
            href="/blog"
            className="flex items-center gap-2 font-mono text-xs text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4 text-amber-400" />
            <span>Volver a Crónicas</span>
          </Link>

          <Link href="/" className="flex items-center gap-2">
            <Disc3 className="h-5 w-5 text-amber-400 animate-spin [animation-duration:12s]" />
            <span className="font-serif text-sm font-bold tracking-wider text-neutral-200">
              Kumbia Sound
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/#catalogo"
              className="font-mono text-xs text-neutral-400 hover:text-amber-400 transition-colors"
            >
              Catálogo
            </Link>
          </div>
        </div>
      </header>

      {/* Contenido Principal de Lectura */}
      <main className="container mx-auto max-w-4xl px-4 sm:px-6 py-10 sm:py-16 space-y-10">
        {/* Cabecera del Artículo */}
        <section className="space-y-6">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-neutral-400">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 font-medium text-amber-400">
              <BookOpen className="h-3.5 w-3.5" />
              {article.categoria}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-neutral-500" />
              {formattedDate}
            </span>
            <span className="text-white/20">•</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-neutral-500" />
              {article.tiempo_lectura}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            {article.titulo}
          </h1>

          <div className="flex items-center justify-between border-y border-white/10 py-4 font-mono text-xs text-neutral-400">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-serif font-bold text-xs">
                KS
              </div>
              <div>
                <p className="text-white font-medium">{article.autor_nombre}</p>
                <p className="text-[11px] text-neutral-400">Investigación & Preservación</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-neutral-400">
              <Share2 className="h-4 w-4" />
              <span>Archivo Histórico</span>
            </div>
          </div>
        </section>

        {/* Portada WebP destacada */}
        {article.imagen_portada_url && (
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-white/10 bg-neutral-900 shadow-2xl">
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
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 font-serif italic text-lg sm:text-xl text-neutral-200 leading-relaxed">
            {article.resumen}
          </div>
        )}

        {/* Cuerpo del Artículo en Markdown */}
        <article className="py-4">
          <MarkdownRenderer content={article.contenido} />
        </article>

        {/* Pie de Artículo & Llamado al Catálogo */}
        <section className="pt-10 border-t border-white/10">
          <GlassCard variant="editorial" className="p-8 sm:p-10 text-center space-y-6">
            <Disc3 className="h-10 w-10 text-amber-400 mx-auto" />
            <div className="space-y-2 max-w-xl mx-auto">
              <h3 className="font-serif text-2xl font-bold text-white">
                Explora el Catálogo Físico Completo
              </h3>
              <p className="font-sans text-sm text-neutral-400">
                Consulta los prensajes originales en vinilo de 33 y 45 RPM, fichas discográficas y la consola de compatibilidad armónica para DJs.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                href="/#catalogo"
                className="rounded-xl bg-amber-500 px-6 py-2.5 font-mono text-xs font-bold text-neutral-950 transition-all hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-500/25"
              >
                Ver Catálogo de Vinilos
              </Link>
              <Link
                href="/blog"
                className="rounded-xl border border-white/15 bg-white/5 px-6 py-2.5 font-mono text-xs text-white transition-all hover:bg-white/10"
              >
                Más Crónicas
              </Link>
            </div>
          </GlassCard>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-white/10 bg-neutral-950 py-10 px-6">
        <div className="container mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-neutral-500">
          <p>© Kumbia Sound // Archivo Histórico de la Cumbia Peruana</p>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-amber-400">Inicio</Link>
            <Link href="/blog" className="hover:text-amber-400">Crónicas</Link>
            <Link href="/admin" className="hover:text-amber-400">Admin</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
