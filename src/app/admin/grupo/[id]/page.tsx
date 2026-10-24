import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { AmbientGlow } from "@/components/ui/ambient-glow";
import { LogoutButton } from "@/features/auth";
import {
  AdminGroupDetail,
  type GroupDetailData,
  type GroupDetailAlbum,
  type GroupSummaryItem,
  type GroupDetailTrack,
} from "@/features/admin/components/admin-group-detail";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export const dynamic = "force-dynamic";

interface AdminGroupPageProps {
  params: Promise<{ id: string }>;
}

interface RawGroupQuery {
  id_grupo: number;
  nombre_grupo: string;
  region: string | null;
  url_foto: string | null;
  personas: { nombre: string } | null;
}

interface RawAlbumQuery {
  id_album: number;
  nombre_album: string | null;
  numero_catalogo: string | null;
  año_publicacion: number | null;
  url_portada: string | null;
  url_contraportada: string | null;
  url_etiqueta: string | null;
  id_tipo_album: number | null;
  tipos_album: { id_tipo_album: number; nombre_tipo: string } | null;
  sellos_discograficos: { nombre_sello: string } | null;
  albumes_temas: Array<{
    lado: string | null;
    numero_pista: number | null;
    temas: {
      id_tema: number;
      titulo_tema: string;
    } | null;
  }> | null;
}

export default async function AdminGroupPage({ params }: AdminGroupPageProps) {
  const { id } = await params;
  const groupId = parseInt(id, 10);

  if (isNaN(groupId)) {
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

  // 2. Consulta paralela: datos del grupo, sus álbumes y catálogo de grupos
  const [
    { data: rawGroup, error: groupError },
    { data: rawAlbums, error: albumsError },
    { data: rawAllGroups },
  ] = await Promise.all([
    supabase
      .from("grupos")
      .select(`
        id_grupo,
        nombre_grupo,
        region,
        url_foto,
        personas (nombre)
      `)
      .eq("id_grupo", groupId)
      .single(),

    supabase
      .from("albumes")
      .select(`
        id_album,
        nombre_album,
        numero_catalogo,
        año_publicacion,
        url_portada,
        url_contraportada,
        url_etiqueta,
        id_tipo_album,
        tipos_album (id_tipo_album, nombre_tipo),
        sellos_discograficos (nombre_sello),
        albumes_temas!albumes_temas_id_album_fkey (
          lado,
          numero_pista,
          temas (
            id_tema,
            titulo_tema
          )
        )
      `)
      .eq("id_grupo", groupId)
      .order("id_tipo_album", { ascending: true })
      .order("año_publicacion", { ascending: true, nullsFirst: false })
      .order("numero_catalogo", { ascending: true }),

    supabase
      .from("grupos")
      .select("id_grupo, nombre_grupo")
      .order("nombre_grupo", { ascending: true }),
  ]);

  if (groupError || !rawGroup) {
    notFound();
  }

  const typedGroup = rawGroup as unknown as RawGroupQuery;
  const typedAlbums = (rawAlbums as unknown as RawAlbumQuery[]) || [];
  const typedAllGroups = (rawAllGroups as unknown as Array<{ id_grupo: number; nombre_grupo: string }>) || [];

  // Mapear datos del grupo
  const groupData: GroupDetailData = {
    id: typedGroup.id_grupo,
    name: typedGroup.nombre_grupo,
    region: typedGroup.region,
    directorName: typedGroup.personas?.nombre || null,
    photoUrl: typedGroup.url_foto,
  };

  // Mapear álbumes
  const groupAlbums: GroupDetailAlbum[] = typedAlbums.map((a) => {
    const isSingle = a.tipos_album?.nombre_tipo === "45" || a.id_tipo_album === 1;
    const formatName = a.tipos_album?.nombre_tipo || (isSingle ? "45" : "LP");

    const tracks: GroupDetailTrack[] = (a.albumes_temas || [])
      .map((at) => ({
        side: at.lado,
        trackNumber: at.numero_pista,
        title: at.temas?.titulo_tema || "Sin título",
      }))
      .sort((x, y) => {
        if (x.side !== y.side) return (x.side || "").localeCompare(y.side || "");
        return (x.trackNumber || 0) - (y.trackNumber || 0);
      });

    let displayTitle = a.nombre_album;
    if (!displayTitle && isSingle && tracks.length > 0) {
      const sideATracks = tracks.filter((t) => (t.side || "").trim().toUpperCase() === "A").map((t) => t.title);
      const sideBTracks = tracks.filter((t) => (t.side || "").trim().toUpperCase() === "B").map((t) => t.title);
      if (sideATracks.length > 0 && sideBTracks.length > 0) {
        displayTitle = `${sideATracks.join(", ")} / ${sideBTracks.join(", ")}`;
      } else if (sideATracks.length > 0) {
        displayTitle = sideATracks.join(", ");
      } else if (sideBTracks.length > 0) {
        displayTitle = sideBTracks.join(", ");
      }
    }

    return {
      id: a.id_album,
      title: displayTitle || (isSingle ? `Single [Cat: ${a.numero_catalogo || a.id_album}]` : "Sin Título Registrado"),
      catalogNumber: a.numero_catalogo,
      year: a.año_publicacion,
      label: a.sellos_discograficos?.nombre_sello || null,
      idTipoAlbum: a.id_tipo_album,
      formatName,
      coverUrl: a.url_portada,
      backCoverUrl: a.url_contraportada,
      vinylLabelUrl: a.url_etiqueta,
      tracks,
    };
  });

  const allGroupsList: GroupSummaryItem[] = typedAllGroups.map((g) => ({
    id: g.id_grupo,
    name: g.nombre_grupo,
  }));

  return (
    <div className="relative min-h-screen bg-[#0a0a0c] text-white selection:bg-amber-500 selection:text-black">
      <AmbientGlow variant="warm-solar" className="top-0 right-0" />
      <AmbientGlow variant="chicha-psychedelic" className="bottom-0 left-0" />

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-neutral-950/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 max-w-7xl">
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="rounded-xl border border-white/10 bg-white/5 p-2 text-neutral-400 hover:text-white transition-colors"
              title="Volver al Panel Administrativo"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-white tracking-tight">
                  Gestión Visual: {groupData.name}
                </h1>
                <span className="inline-flex items-center gap-1 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-1.5 py-0.5 font-mono text-[10px] text-emerald-400">
                  <ShieldCheck className="h-3 w-3" /> Admin
                </span>
              </div>
              <p className="font-mono text-[11px] text-neutral-400">
                Archivo Fotográfico y Discográfico de la Agrupación
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/vinilos?grupo=${groupData.id}`}
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-neutral-300 hover:text-white transition-colors"
            >
              <span>Ver en Catálogo Público</span>
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
        <AdminGroupDetail
          group={groupData}
          initialAlbums={groupAlbums}
          allGroups={allGroupsList}
        />
      </main>
    </div>
  );
}
