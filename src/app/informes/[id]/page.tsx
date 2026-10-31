import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BrutalistCoordinator, BrutalistFooter } from "@/features/home-brutalism";
import { getArbolGenealogicoServer } from "@/features/genealogia/server";
import { InformeDetailView } from "@/features/informes";
import { JsonLd, buildPersonJsonLd } from "@/components/seo/json-ld";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface InformeDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: InformeDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const personaId = parseInt(id, 10);
  if (isNaN(personaId)) return { title: "Expediente No Encontrado | Kumbia Sound" };

  const arbol = await getArbolGenealogicoServer(personaId);
  if (!arbol?.persona) return { title: "Expediente No Encontrado | Kumbia Sound" };

  const codigo = `INF-${String(personaId).padStart(4, "0")}`;
  const apodoStr = arbol.persona.apodo ? ` «${arbol.persona.apodo}»` : "";

  return {
    title: `${codigo}: ${arbol.persona.nombre}${apodoStr} | Kumbia Sound`,
    description: `Ficha pericial y trayectoria fonográfica de ${arbol.persona.nombre}. Participaciones en bandas, grabaciones de sesión y composiciones en vinilo.`,
  };
}

export default async function InformeDetailPage({ params }: InformeDetailPageProps) {
  const { id } = await params;
  const personaId = parseInt(id, 10);

  if (isNaN(personaId)) {
    notFound();
  }

  const arbol = await getArbolGenealogicoServer(personaId);

  if (!arbol?.persona) {
    notFound();
  }

  const jsonLdPerson = buildPersonJsonLd({
    id: arbol.persona.id_persona,
    name: arbol.persona.nombre,
    pseudonym: arbol.persona.apodo,
    birthDate: arbol.persona.fecha_nacimiento,
    birthPlace: arbol.persona.lugar_nacimiento,
    biography: arbol.persona.biografia,
    imageUrl: arbol.persona.url_foto,
    roles: ["Músico de Sesión", "Compositor"],
    groups: arbol.agrupaciones.map((a) => a.nombre_grupo),
  });

  return (
    <div className="relative min-h-screen bg-[#EDE0D0] brutalist-dots-light text-[#1F1305] selection:bg-[#F1730C] selection:text-[#1F1305]">
      <JsonLd data={jsonLdPerson} />
      <BrutalistCoordinator>
        <main id="contenido" className="container mx-auto max-w-7xl px-4 sm:px-6 pt-6 pb-20">
          <InformeDetailView arbol={arbol} />
        </main>
      </BrutalistCoordinator>
      <BrutalistFooter />
    </div>
  );
}
