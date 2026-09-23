import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { AmbientGlow } from "@/components/ui/ambient-glow";
import { GlassCard } from "@/components/ui/glass-card";
import { ArticleCard } from "@/features/blog";
import { ArrowLeft, BookOpen, Disc3, Sparkles } from "lucide-react";
import type { Articulo } from "@/types/blog";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Crónicas & Archivo Sonoro | Kumbia Sound",
  description:
    "Ensayos, biografías de pioneros e investigación histórica sobre los vinilos y la era dorada de la cumbia peruana (1968–2005).",
};

export default async function BlogIndexPage() {
  const supabase = await createClient();

  const { data: articulos } = await supabase
    .from("articulos")
    .select("*")
    .eq("publicado", true)
    .order("fecha_publicacion", { ascending: false });

  const articlesList: Articulo[] = articulos || [];

  return (
    <div className="relative min-h-screen bg-[#0a0a0c] text-white selection:bg-amber-500 selection:text-black">
      {/* Resplandores Ambientales */}
      <AmbientGlow variant="warm-solar" className="opacity-25" />
      <AmbientGlow variant="velvet-night" className="top-1/2 opacity-20" />

      {/* Navegación Superior */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-neutral-950/80 backdrop-blur-xl">
        <div className="container mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 font-mono text-xs text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4 text-amber-400" />
            <span>Volver al Catálogo Principal</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 group"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-400 group-hover:scale-105 transition-transform">
                <Disc3 className="h-4 w-4" />
              </div>
              <span className="font-serif text-sm font-bold tracking-wider text-neutral-200">
                Kumbia Sound
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <Link
              href="/#catalogo"
              className="hidden sm:inline-block text-neutral-400 hover:text-amber-400 transition-colors"
            >
              Vinilos
            </Link>
            <Link
              href="/#dj-tools"
              className="hidden sm:inline-block text-neutral-400 hover:text-amber-400 transition-colors"
            >
              Consola DJ
            </Link>
            <Link
              href="/admin"
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-neutral-300 hover:border-amber-500/40 hover:text-amber-400 transition-all"
            >
              Panel Admin
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-7xl px-4 sm:px-6 py-12 space-y-12">
        {/* Cabecera Editorial */}
        <section className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 font-mono text-xs text-amber-400">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Crónicas & Archivo Sonoro</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Ensayos, Historia & Reseñas de Archivo
          </h1>

          <p className="font-sans text-base sm:text-lg text-neutral-400 leading-relaxed">
            Investigación histórica, genealogía de agrupaciones y análisis del prensaje original en vinilo (1968–2005). El sonido que transformó la música latinoamericana desde las costas de Lima hasta la selva amazónica.
          </p>
        </section>

        {/* Listado de Artículos */}
        {articlesList.length > 0 ? (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articlesList.map((article, idx) => (
              <ArticleCard
                key={article.id}
                article={article}
                featured={idx === 0 && articlesList.length >= 3}
              />
            ))}
          </section>
        ) : (
          <GlassCard className="p-12 text-center space-y-4 max-w-lg mx-auto">
            <Sparkles className="h-10 w-10 text-amber-400 mx-auto" />
            <h3 className="font-serif text-xl font-bold text-white">
              Próximamente Nuevas Crónicas
            </h3>
            <p className="font-mono text-xs text-neutral-400">
              Estamos preparando las próximas notas históricas sobre los prensajes originales de Sono Radio e Infopesa.
            </p>
          </GlassCard>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-white/10 bg-neutral-950 py-10 px-6">
        <div className="container mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-neutral-500">
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
