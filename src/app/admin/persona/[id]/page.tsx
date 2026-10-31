import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getArbolGenealogicoServer } from "@/features/genealogia/server";
import { LogoutButton } from "@/features/auth";
import {
  AdminPersonDetail,
  type InformePersonaRow,
} from "@/features/admin/components/admin-person-detail";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export const dynamic = "force-dynamic";

interface AdminPersonPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminPersonPage({ params }: AdminPersonPageProps) {
  const { id } = await params;
  const personaId = parseInt(id, 10);

  if (isNaN(personaId)) {
    notFound();
  }

  const supabase = await createClient();

  // 1. Verificación de Autenticación
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.email !== "soundkumbia@gmail.com") {
    redirect("/admin/login");
  }

  // 2. Consulta paralela: árbol genealógico completo y fila de informe editorial
  const [arbol, informeResult] = await Promise.all([
    getArbolGenealogicoServer(personaId),
    supabase
      .from("informes_personas")
      .select("*")
      .eq("id_persona", personaId)
      .maybeSingle(),
  ]);

  if (!arbol || !arbol.persona) {
    notFound();
  }

  const initialInforme = informeResult?.data as unknown as InformePersonaRow | null;

  return (
    <div className="min-h-screen bg-[#EDE0D0] text-[#1F1305] selection:bg-[#E80000] selection:text-white font-mono">
      {/* Top Navbar Neo-Brutalista */}
      <header className="sticky top-0 z-40 border-b-2 border-[#1F1305] bg-[#FAF8F5] p-3 shadow-[0_2px_0px_#1F1305]">
        <div className="container mx-auto flex h-14 items-center justify-between px-4 max-w-7xl">
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="border-2 border-[#1F1305] bg-white p-2 text-[#1F1305] hover:bg-[#EDE0D0] transition-colors shadow-[2px_2px_0px_#1F1305]"
              title="Volver al Panel Administrativo"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-black text-[#1F1305] tracking-tight font-cooper">
                  Ficha Pericial: {arbol.persona.nombre}
                </h1>
                <span className="inline-flex items-center gap-1 border border-[#1F1305] bg-[#10B981] text-white px-1.5 py-0.5 text-[10px] font-black uppercase">
                  <ShieldCheck className="h-3 w-3" /> Peritaje
                </span>
              </div>
              <p className="text-[11px] text-[#5A5245]">
                Dictamen Biográfico, Retrato Oficial y Participaciones Catalogadas
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/informes/${personaId}`}
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 border-2 border-[#1F1305] bg-white px-3 py-1.5 text-xs text-[#1F1305] font-bold hover:bg-[#EDE0D0] shadow-[2px_2px_0px_#1F1305] transition-all"
            >
              <span>Ver en Web Pública</span>
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="container mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
        <AdminPersonDetail arbol={arbol} initialInforme={initialInforme} />
      </main>
    </div>
  );
}
