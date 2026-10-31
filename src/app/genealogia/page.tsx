import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles, GitFork, Building2, Users } from "lucide-react";
import { BrutalistCoordinator, BrutalistFooter } from "@/features/home-brutalism";
import { GenealogiaContainer, type GrupoItem } from "@/features/genealogia";
import { getArbolGenealogicoServer } from "@/features/genealogia/server";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "EXP. 02: Genealogía, Agrupaciones & Red de Sesión | Kumbia Sound",
  description:
    "Inspecciona la genealogía fonográfica: evolución de agrupaciones y directores, árbol jerárquico de versiones de canciones y red relacional de músicos de sesión.",
};

interface GrupoDbRow {
  id_grupo: number;
  nombre_grupo: string;
  region: string | null;
  fecha_formacion: string | null;
  url_foto: string | null;
  director: {
    id_persona: number;
    nombre: string;
    apodo: string | null;
  } | null;
}

export default async function GenealogiaPage() {
  const supabase = await createClient();

  // 1. Consultar agrupaciones históricas con sus directores
  const { data: gruposData } = await supabase
    .from("grupos")
    .select(`
      id_grupo,
      nombre_grupo,
      region,
      fecha_formacion,
      url_foto,
      director:personas!grupos_id_director_fkey(id_persona, nombre, apodo)
    `)
    .order("id_grupo", { ascending: true })
    .limit(40);

  // 2. Consultar músicos pioneros indexados en la base de datos
  const { data: pioneros } = await supabase
    .from("personas")
    .select("id_persona, nombre, apodo")
    .order("id_persona", { ascending: true })
    .limit(30);

  const initialMusicoId = pioneros?.[0]?.id_persona ?? 1;

  // 3. Pre-cargar el árbol inicial del primer músico
  const initialArbol = await getArbolGenealogicoServer(initialMusicoId);

  // Mapeo seguro de grupos tipados
  const typedGruposData = (gruposData || []) as unknown as GrupoDbRow[];
  const grupos: GrupoItem[] = typedGruposData.map((g) => ({
    id_grupo: g.id_grupo,
    nombre_grupo: g.nombre_grupo,
    region: g.region,
    fecha_formacion: g.fecha_formacion,
    url_foto: g.url_foto,
    director: g.director ? {
      id_persona: g.director.id_persona,
      nombre: g.director.nombre,
      apodo: g.director.apodo,
    } : null,
  }));

  return (
    <div className="relative min-h-screen bg-[#EDE0D0] brutalist-dots-light text-[#1F1305] selection:bg-[#F1730C] selection:text-[#1F1305]">
      <BrutalistCoordinator>
        <main id="contenido" className="container mx-auto max-w-7xl px-4 sm:px-6 pt-6 pb-20 space-y-10">
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
              <span>EXP. 02 / GENEALOGÍA & RELACIONES</span>
            </div>
          </div>

          {/* Banner Hero Brutalista */}
          <div className="border-2 border-[#1F1305] bg-[#1F1305] brutalist-dots-dark text-[#EDE0D0] p-8 sm:p-12 shadow-[6px_6px_0px_#E80000] relative overflow-hidden">
            <div className="max-w-3xl space-y-5 relative z-10">
              <div className="inline-flex items-center gap-2 border-2 border-[#EDE0D0] bg-[#F1730C] px-3.5 py-1 font-mono text-xs font-bold text-white shadow-[2px_2px_0px_#EDE0D0]">
                <GitFork className="h-3.5 w-3.5" />
                <span>EXPEDIENTE 02 · RELACIONES, ETAPAS & CRUCES DE SESIÓN</span>
              </div>

              <h1 className="font-cooper text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                El Árbol Genealógico de la Cumbia Peruana
              </h1>

              <p className="font-sans text-sm sm:text-base text-[#EDE0D0]/80 leading-relaxed max-w-2xl">
                Genealogía no es un archivo de fichas biográficas aisladas, sino el mapa de
                relaciones del patrimonio sonoro: la evolución y etapas de las orquestas, el árbol
                recursivo de versiones y covers de un tema, y la red de sesionistas compartidos.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 font-mono text-xs">
                <span className="flex items-center gap-2 border border-[#EDE0D0]/30 bg-white/10 px-3 py-1 font-bold text-[#F8C800]">
                  <Building2 className="h-4 w-4 text-[#F8C800]" /> {grupos.length} Agrupaciones Documentadas
                </span>
                <span className="flex items-center gap-2 border border-[#EDE0D0]/30 bg-white/10 px-3 py-1 font-bold text-white">
                  <Users className="h-4 w-4 text-[#F1730C]" /> Conexiones Relacionales Postgres RPC
                </span>
              </div>
            </div>

            {/* Sello de fondo */}
            <div className="absolute -bottom-8 -right-6 text-white/[0.04] font-anton text-[220px] font-black pointer-events-none select-none leading-none">
              GEN
            </div>
          </div>

          {/* Coordinador de 3 Carpetas (Agrupaciones, Versiones, Red de Músicos) */}
          <GenealogiaContainer
            grupos={grupos}
            pioneros={pioneros || []}
            initialMusicoId={initialMusicoId}
            initialArbolData={initialArbol}
          />
        </main>
      </BrutalistCoordinator>

      <BrutalistFooter />
    </div>
  );
}
