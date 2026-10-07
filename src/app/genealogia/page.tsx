import type { Metadata } from "next";
import { BrutalistCoordinator, BrutalistFooter } from "@/features/home-brutalism";
import { GenealogyExplorer } from "@/features/home-retro";
import { ArbolGenealogicoViewer } from "@/features/genealogia";
import { getArbolGenealogicoServer } from "@/features/genealogia/server";
import { createClient } from "@/lib/supabase/server";
import { JsonLd, buildPersonJsonLd, buildMusicGroupJsonLd } from "@/components/seo/json-ld";
import Link from "next/link";
import { ArrowLeft, GitFork, Sparkles, Building2, Users } from "lucide-react";

export const revalidate = 120; // Regenerar cada 2 minutos

export const metadata: Metadata = {
  title: "Explorador Genealógico & Músicos de Sesión | Kumbia Sound",
  description:
    "Descubre los cruces de guitarristas, directores y músicos de sesión entre las agrupaciones y sellos históricos de la cumbia peruana (1968–2005).",
};

export default async function GenealogiaPage() {
  const supabase = await createClient();

  // Consultar músicos pioneros indexados en la base de datos
  const { data: pioneros } = await supabase
    .from("personas")
    .select("id_persona, nombre, apodo")
    .order("id_persona", { ascending: true })
    .limit(30);

  const initialMusicoId = pioneros?.[0]?.id_persona ?? 1;

  // Pre-cargar mediante función RPC en PostgreSQL el árbol genealógico del pionero inicial
  const initialArbol = await getArbolGenealogicoServer(initialMusicoId);

  // Generar datos estructurados Schema.org (JSON-LD) para SEO patrimonial
  const structuredDataList: Array<Record<string, unknown>> = [];

  if (initialArbol?.persona) {
    structuredDataList.push(
      buildPersonJsonLd({
        id: initialArbol.persona.id_persona,
        name: initialArbol.persona.nombre,
        pseudonym: initialArbol.persona.apodo,
        birthDate: initialArbol.persona.fecha_nacimiento,
        birthPlace: initialArbol.persona.lugar_nacimiento,
        biography: initialArbol.persona.biografia,
        imageUrl: initialArbol.persona.url_foto,
        roles: ["Director Musical", "Guitarrista", "Compositor"],
        groups: initialArbol.agrupaciones.map((a) => a.nombre_grupo),
      })
    );

    // Schema.org para agrupaciones asociadas
    initialArbol.agrupaciones.forEach((agrup) => {
      structuredDataList.push(
        buildMusicGroupJsonLd({
          id: agrup.id_grupo,
          name: agrup.nombre_grupo,
          region: agrup.region,
          imageUrl: agrup.url_foto,
          directorName: agrup.rol === "Director Musical" ? initialArbol.persona?.nombre : undefined,
        })
      );
    });
  }

  return (
    <div className="relative min-h-screen bg-[#EDE0D0] text-[#1F1305] selection:bg-[#F1730C] selection:text-white">
      {/* Schema.org JSON-LD para motores de búsqueda */}
      {structuredDataList.length > 0 && <JsonLd data={structuredDataList} />}

      <BrutalistCoordinator>
        <main className="container mx-auto max-w-7xl px-4 sm:px-6 pt-6 pb-20 space-y-12">
          {/* Breadcrumb / Retorno al Home */}
          <div className="flex items-center justify-between border-b-2 border-[#1F1305] pb-4 font-mono text-xs">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-bold text-[#1F1305] hover:text-[#E80000] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>← Volver a la Portada Principal</span>
            </Link>

            <div className="flex items-center gap-2 border border-[#1F1305] bg-white px-2.5 py-1 text-[#E80000] font-bold shadow-[2px_2px_0px_#1F1305]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>01 / ARCHIVO GENEALÓGICO</span>
            </div>
          </div>

          {/* Banner Hero Brutalista */}
          <div className="border-2 border-[#1F1305] bg-[#1F1305] text-[#EDE0D0] p-8 sm:p-12 shadow-[6px_6px_0px_#E80000] relative overflow-hidden">
            <div className="max-w-3xl space-y-5 relative z-10">
              <div className="inline-flex items-center gap-2 border-2 border-[#EDE0D0] bg-[#F1730C] px-3.5 py-1 font-mono text-xs font-bold text-white shadow-[2px_2px_0px_#EDE0D0]">
                <GitFork className="h-3.5 w-3.5" />
                <span>ARCHIVO DE MÚSICOS DE SESIÓN • 1968–2005</span>
              </div>

              <h1 className="font-cooper text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                El Árbol Genealógico de la Cumbia Peruana
              </h1>

              <p className="font-sans text-sm sm:text-base text-[#EDE0D0]/80 leading-relaxed max-w-2xl">
                En el Perú de los años 70 y 80, los estudios de grabación de la Av. Abancay y el Rímac
                eran un hervidero creativo. Esta herramienta documenta qué guitarristas grabaron los
                punteos solistas, en qué sellos publicaron y cómo las agrupaciones se nutrieron entre
                sí mediante consultas directas de base de datos en PostgreSQL.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 font-mono text-xs">
                <span className="flex items-center gap-2 border border-[#EDE0D0]/30 bg-white/10 px-3 py-1 font-bold text-[#F8C800]">
                  <Users className="h-4 w-4 text-[#F8C800]" /> {pioneros?.length || 0}+ Músicos Indexados
                </span>
                <span className="flex items-center gap-2 border border-[#EDE0D0]/30 bg-white/10 px-3 py-1 font-bold text-white">
                  <Building2 className="h-4 w-4 text-[#F1730C]" /> Conexiones Relacionales Postgres RPC
                </span>
              </div>
            </div>

            {/* Sello decorativo sutil en segundo plano */}
            <div className="absolute -bottom-8 -right-6 text-white/[0.04] font-anton text-[220px] font-black pointer-events-none select-none leading-none">
              GEN
            </div>
          </div>

          {/* Visualizador Dinámico de Grafo (PostgreSQL RPC get_arbol_genealogico) */}
          <div className="space-y-4">
            <div className="border-b-2 border-[#1F1305] pb-3">
              <span className="font-mono text-xs font-black uppercase tracking-wider text-[#E80000]">
                MÓDULO 01 • CONSULTA EN VIVO DEL GRAFO DE SESIÓN
              </span>
              <h2 className="font-cooper text-2xl sm:text-3xl font-black text-[#1F1305]">
                Expediente Fonográfico de Músicos & Linajes
              </h2>
            </div>

            <ArbolGenealogicoViewer
              initialMusicos={pioneros || []}
              initialMusicoId={initialMusicoId}
              initialArbolData={initialArbol}
            />
          </div>

          {/* Sección de Biografías Cruzadas y Hitos */}
          <div className="border-t-2 border-[#1F1305] pt-12">
            <GenealogyExplorer />
          </div>
        </main>
      </BrutalistCoordinator>

      <BrutalistFooter />
    </div>
  );
}
