import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { BrutalistCoordinator, BrutalistFooter } from "@/features/home-brutalism";
import { ArticleCard } from "@/features/blog";
import { ArrowLeft, BookOpen, Sparkles } from "lucide-react";
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
    <div className="relative min-h-screen bg-[#EDE0D0] text-[#1F1305] selection:bg-[#F1730C] selection:text-white">
      <BrutalistCoordinator>
        <main className="container mx-auto max-w-7xl px-4 sm:px-6 pt-6 pb-20 space-y-10">
          {/* Breadcrumb / Retorno al Home */}
          <div className="flex items-center justify-between border-b-2 border-[#1F1305] pb-4 font-mono text-xs">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-bold text-[#1F1305] hover:text-[#E80000] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>← Volver a la Portada Principal</span>
            </Link>

            <div className="flex items-center gap-2 border border-[#1F1305] bg-white px-2.5 py-1 text-[#1F1305] font-bold shadow-[2px_2px_0px_#1F1305]">
              <BookOpen className="h-3.5 w-3.5 text-[#F1730C]" />
              <span>04 / CRÓNICAS & INVESTIGACIÓN</span>
            </div>
          </div>

          {/* Banner Hero Brutalista */}
          <div className="border-2 border-[#1F1305] bg-[#1F1305] text-[#EDE0D0] p-8 sm:p-12 shadow-[6px_6px_0px_#F1730C] relative overflow-hidden">
            <div className="max-w-3xl space-y-5 relative z-10">
              <div className="inline-flex items-center gap-2 border-2 border-[#EDE0D0] bg-[#F1730C] px-3.5 py-1 font-mono text-xs font-bold text-white shadow-[2px_2px_0px_#EDE0D0]">
                <BookOpen className="h-3.5 w-3.5" />
                <span>INVESTIGACIÓN HISTÓRICA & ENSAYOS DE ARCHIVO</span>
              </div>

              <h1 className="font-cooper text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                Crónicas, Ensayos & Reseñas
              </h1>

              <p className="font-sans text-sm sm:text-base text-[#EDE0D0]/80 leading-relaxed max-w-2xl">
                Investigación histórica, genealogía de agrupaciones y análisis del prensaje original en vinilo (1968–2005). El sonido que transformó la música latinoamericana desde los callejones de Lima hasta la selva amazónica.
              </p>
            </div>

            {/* Sello decorativo de fondo */}
            <div className="absolute -bottom-8 -right-6 text-white/[0.04] font-anton text-[220px] font-black pointer-events-none select-none leading-none">
              DOC
            </div>
          </div>

          {/* Listado de Artículos */}
          {articlesList.length > 0 ? (
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
              {articlesList.map((article, idx) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  featured={idx === 0 && articlesList.length >= 3}
                />
              ))}
            </section>
          ) : (
            <div className="border-2 border-[#1F1305] bg-white p-12 text-center space-y-4 max-w-lg mx-auto shadow-[6px_6px_0px_#1F1305]">
              <Sparkles className="h-10 w-10 text-[#F1730C] mx-auto" />
              <h3 className="font-cooper text-xl font-bold text-[#1F1305]">
                Próximamente Nuevas Crónicas
              </h3>
              <p className="font-mono text-xs text-[#5A5245]">
                Estamos preparando las próximas notas históricas sobre los prensajes originales de Sono Radio, Infopesa e IEMPSA.
              </p>
            </div>
          )}
        </main>
      </BrutalistCoordinator>

      <BrutalistFooter />
    </div>
  );
}
