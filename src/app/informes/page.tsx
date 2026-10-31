import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles, FileText, ShieldCheck, Users } from "lucide-react";
import { BrutalistCoordinator, BrutalistFooter } from "@/features/home-brutalism";
import { createClient } from "@/lib/supabase/server";
import { InformesGrid } from "@/features/informes";
import type { PersonaResumen } from "@/features/informes";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "EXP. 03: Informes Periciales de Músicos & Autores | Kumbia Sound",
  description:
    "Fichas periciales individuales de los pioneros, guitarristas, directores y compositores de la cumbia peruana con sello de verificación y registro fonográfico.",
};

export default async function InformesPage() {
  const supabase = await createClient();

  // Consultar todas las personas catalogadas en la base de datos
  const { data: personasData, error } = await supabase
    .from("personas")
    .select("id_persona, nombre, apodo, fecha_nacimiento, lugar_nacimiento, biografia, url_foto")
    .order("id_persona", { ascending: true });

  if (error) {
    console.error("Error al consultar personas en Supabase:", error.message);
  }

  const personas: PersonaResumen[] = (personasData || []) as PersonaResumen[];

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
              <span>EXP. 03 / PERITAJES BIOGRÁFICOS</span>
            </div>
          </div>

          {/* Banner Hero Brutalista */}
          <div className="border-2 border-[#1F1305] bg-[#1F1305] brutalist-dots-dark text-[#EDE0D0] p-8 sm:p-12 shadow-[6px_6px_0px_#E80000] relative overflow-hidden">
            <div className="max-w-3xl space-y-5 relative z-10">
              <div className="inline-flex items-center gap-2 border-2 border-[#EDE0D0] bg-[#E80000] px-3.5 py-1 font-mono text-xs font-bold text-white shadow-[2px_2px_0px_#EDE0D0]">
                <FileText className="h-3.5 w-3.5" />
                <span>EXPEDIENTE 03 · INFORMES PERICIALES INDIVIDUALES</span>
              </div>

              <h1 className="font-cooper text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                Fichas Periciales de Músicos & Compositores
              </h1>

              <p className="font-sans text-sm sm:text-base text-[#EDE0D0]/80 leading-relaxed max-w-2xl">
                Cada músico posee un expediente canónico individual (código INF-0001, INF-0002...).
                Aquí se documenta su identidad civil, seudónimos en galleta, biografía contrastada
                con fuentes primarias y secundarias, y el inventario automático de sus participaciones
                como integrante, músico de sesión y autor.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 font-mono text-xs">
                <span className="flex items-center gap-2 border border-[#EDE0D0]/30 bg-white/10 px-3 py-1 font-bold text-[#F8C800]">
                  <Users className="h-4 w-4 text-[#F8C800]" /> {personas.length} Expedientes en Catálogo
                </span>
                <span className="flex items-center gap-2 border border-[#EDE0D0]/30 bg-white/10 px-3 py-1 font-bold text-white">
                  <ShieldCheck className="h-4 w-4 text-[#2E7D32]" /> Cotejo Fonográfico Automatizado
                </span>
              </div>
            </div>

            {/* Sello de fondo */}
            <div className="absolute -bottom-8 -right-6 text-white/[0.04] font-anton text-[220px] font-black pointer-events-none select-none leading-none">
              INF
            </div>
          </div>

          {/* Grid Interactivo de Informes con Filtros */}
          <InformesGrid personas={personas} />
        </main>
      </BrutalistCoordinator>

      <BrutalistFooter />
    </div>
  );
}
