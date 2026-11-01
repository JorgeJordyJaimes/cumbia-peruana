import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "@/features/auth";
import {
  AdminTabsContainer,
  type AdminAlbumItem,
  type AdminGroupItem,
  type AdminPersonItem,
  type AdminLabelItem,
} from "@/features/admin";
import type { Articulo, ConfiguracionHome } from "@/types/blog";
import { ArrowLeft, ShieldCheck, Image as ImageIcon, Database } from "lucide-react";

export const dynamic = "force-dynamic";

interface RawAdminAlbum {
  id_album: number;
  nombre_album: string | null;
  numero_catalogo: string | null;
  año_publicacion: number | null;
  url_portada: string | null;
  url_contraportada: string | null;
  url_etiqueta: string | null;
  id_tipo_album: number | null;
  id_grupo: number | null;
  grupos: { nombre_grupo: string } | null;
  sellos_discograficos: { nombre_sello: string } | null;
  tipos_album: { nombre_tipo: string } | null;
}

interface RawAdminGroup {
  id_grupo: number;
  nombre_grupo: string;
  region: string | null;
  personas: { nombre: string } | null;
  url_foto: string | null;
}

interface RawAdminPerson {
  id_persona: number;
  nombre: string;
  apodo: string | null;
  url_foto: string | null;
}

interface RawAdminLabel {
  id_sello: number;
  nombre_sello: string;
  pais: string | null;
  url_logo: string | null;
}

export default async function AdminPage() {
  const supabase = await createClient();

  // 1. Verificación de Autenticación
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.email !== "soundkumbia@gmail.com") {
    redirect("/admin/login");
  }

  // 2. Carga paralela de datos de las entidades, artículos y configuración
  const [
    { data: rawAlbumes },
    { data: rawGrupos },
    { data: rawPersonas },
    { data: rawSellos },
    { data: rawArticles },
    { data: rawHomeConfig },
  ] = await Promise.all([
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
        id_grupo,
        grupos (nombre_grupo),
        sellos_discograficos (nombre_sello),
        tipos_album (nombre_tipo)
      `)
      .order("id_album", { ascending: true }),

    supabase
      .from("grupos")
      .select(`
        id_grupo,
        nombre_grupo,
        region,
        url_foto,
        personas (nombre)
      `)
      .order("id_grupo", { ascending: true }),

    supabase
      .from("personas")
      .select(`
        id_persona,
        nombre,
        apodo,
        url_foto
      `)
      .order("id_persona", { ascending: true }),

    supabase
      .from("sellos_discograficos")
      .select(`
        id_sello,
        nombre_sello,
        pais,
        url_logo
      `)
      .order("id_sello", { ascending: true }),

    supabase
      .from("articulos")
      .select("*")
      .order("fecha_publicacion", { ascending: false }),

    supabase
      .from("configuracion_home")
      .select("*")
      .eq("id", 1)
      .single(),
  ]);

  const articles: Articulo[] = (rawArticles as unknown as Articulo[]) || [];
  const homeConfig: ConfiguracionHome = (rawHomeConfig as unknown as ConfiguracionHome) || {
    id: 1,
    cintillo_texto: "CATÁLOGO & ARCHIVO DISCOGRÁFICO HISTÓRICO // EDICIONES DE COLECCIÓN 1968–2005",
    cintillo_activo: true,
    hero_insignia: "Archivo & Curaduría de Vinilos",
    hero_titulo: "El Sonido Inmortal de la Cumbia Peruana",
    hero_subtitulo: "Explora 719+ vinilos originales, la genealogía de sus pioneros y el motor de compatibilidad armónica Camelot.",
    hero_boton_texto: "Explorar Archivo",
    hero_boton_url: "#catalogo",
    albumes_destacados_ids: [1, 2, 3],
    seccion_blog_activa: true,
    updated_at: new Date().toISOString(),
  };

  // Mapear Álbumes
  const typedAlbumes = (rawAlbumes as unknown as RawAdminAlbum[]) || [];
  const albums: AdminAlbumItem[] = typedAlbumes.map((a) => {
    const isSingle = a.tipos_album?.nombre_tipo === "45" || a.id_tipo_album === 1;
    return {
      id: a.id_album,
      title: a.nombre_album || (isSingle ? `Single [Cat: ${a.numero_catalogo || a.id_album}]` : "Sin Título Registrado"),
      artist: a.grupos?.nombre_grupo || "Varios Artistas",
    groupId: a.id_grupo,
    catalogNumber: a.numero_catalogo,
    year: a.año_publicacion,
    label: a.sellos_discograficos?.nombre_sello || null,
    coverUrl: a.url_portada,
    backCoverUrl: a.url_contraportada,
    vinylLabelUrl: a.url_etiqueta,
    format: a.tipos_album?.nombre_tipo || null,
    idTipoAlbum: a.id_tipo_album,
  };
});

  // Mapear estadísticas de discografía por grupo
  const groupStatsMap = new Map<
    number,
    { total: number; lps: number; singles: number; casetes: number; eps: number; cds: number; withPhoto: number }
  >();

  typedAlbumes.forEach((a) => {
    if (!a.id_grupo) return;
    const cur = groupStatsMap.get(a.id_grupo) || {
      total: 0,
      lps: 0,
      singles: 0,
      casetes: 0,
      eps: 0,
      cds: 0,
      withPhoto: 0,
    };
    cur.total++;
    const formatName = a.tipos_album?.nombre_tipo?.toLowerCase() || "";
    if (formatName === "lp" || a.id_tipo_album === 2) cur.lps++;
    else if (formatName === "45" || formatName.includes("single") || a.id_tipo_album === 1) cur.singles++;
    else if (formatName.includes("casete") || formatName.includes("cassete") || a.id_tipo_album === 4) cur.casetes++;
    else if (formatName === "ep" || a.id_tipo_album === 3) cur.eps++;
    else if (formatName === "cd" || a.id_tipo_album === 5) cur.cds++;

    if (a.url_portada || a.url_contraportada) cur.withPhoto++;
    groupStatsMap.set(a.id_grupo, cur);
  });

  // Mapear Grupos con estadísticas completas
  const typedGrupos = (rawGrupos as unknown as RawAdminGroup[]) || [];
  const groups: AdminGroupItem[] = typedGrupos.map((g) => {
    const stats = groupStatsMap.get(g.id_grupo) || {
      total: 0,
      lps: 0,
      singles: 0,
      casetes: 0,
      eps: 0,
      cds: 0,
      withPhoto: 0,
    };
    return {
      id: g.id_grupo,
      name: g.nombre_grupo,
      region: g.region,
      directorName: g.personas?.nombre || null,
      photoUrl: g.url_foto,
      totalAlbums: stats.total,
      lpsCount: stats.lps,
      singlesCount: stats.singles,
      casetesCount: stats.casetes,
      epsCount: stats.eps,
      cdsCount: stats.cds,
      albumsWithPhoto: stats.withPhoto,
    };
  });

  // Mapear Personas
  const typedPersonas = (rawPersonas as unknown as RawAdminPerson[]) || [];
  const persons: AdminPersonItem[] = typedPersonas.map((p) => ({
    id: p.id_persona,
    name: p.nombre,
    nickname: p.apodo,
    photoUrl: p.url_foto,
  }));

  // Mapear Sellos
  const typedSellos = (rawSellos as unknown as RawAdminLabel[]) || [];
  const labels: AdminLabelItem[] = typedSellos.map((s) => ({
    id: s.id_sello,
    name: s.nombre_sello,
    country: s.pais,
    logoUrl: s.url_logo,
  }));

  // Métricas de imágenes cargadas
  const albumsWithCover = albums.filter((a) => a.coverUrl).length;
  const groupsWithPhoto = groups.filter((g) => g.photoUrl).length;
  const personsWithPhoto = persons.filter((p) => p.photoUrl).length;
  const labelsWithLogo = labels.filter((l) => l.logoUrl).length;

  return (
    <div className="min-h-screen bg-[#EDE0D0] text-[#1F1305] selection:bg-[#E80000] selection:text-white font-mono">
      {/* Top Navbar Neo-Brutalista */}
      <header className="sticky top-0 z-40 border-b-2 border-[#1F1305] bg-[#FAF8F5] p-3 shadow-[0_2px_0px_#1F1305]">
        <div className="container mx-auto flex h-14 items-center justify-between px-4 max-w-7xl">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="border-2 border-[#1F1305] bg-white p-2 text-[#1F1305] hover:bg-[#EDE0D0] transition-colors shadow-[2px_2px_0px_#1F1305]"
              title="Volver al Catálogo Público"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-black text-[#1F1305] tracking-tight font-cooper">
                  Panel de Administración
                </h1>
                <span className="inline-flex items-center gap-1 border border-[#1F1305] bg-[#10B981] text-white px-2 py-0.5 font-mono text-[10px] font-black uppercase shadow-[1px_1px_0px_#1F1305]">
                  <ShieldCheck className="h-3 w-3" /> Autenticado
                </span>
              </div>
              <p className="font-mono text-[11px] text-[#5A5245] font-bold truncate">
                {user.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 border-2 border-[#1F1305] bg-white px-3 py-1.5 font-mono text-xs font-bold text-[#1F1305] shadow-[2px_2px_0px_#1F1305] hover:bg-[#EDE0D0] transition-colors"
            >
              <span>Ver Web en Vivo</span>
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Main Admin Content */}
      <main id="contenido" className="container mx-auto max-w-7xl p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Banner de Estado y Estadísticas Neo-Brutalista */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="border-2 border-[#1F1305] bg-white p-4 shadow-[4px_4px_0px_#1F1305] space-y-2">
            <div className="flex items-center justify-between text-[#5A5245] font-mono text-xs font-bold uppercase mb-1">
              <span>Portadas Álbum</span>
              <ImageIcon className="h-4 w-4 text-[#F1730C]" />
            </div>
            <div className="font-mono text-2xl font-black text-[#1F1305]">
              {albumsWithCover}{" "}
              <span className="text-xs text-[#5A5245] font-bold">
                / {albums.length}
              </span>
            </div>
            <div className="h-2 w-full bg-[#EDE0D0] border border-[#1F1305] overflow-hidden">
              <div
                className="h-full bg-[#F1730C]"
                style={{ width: `${(albumsWithCover / (albums.length || 1)) * 100}%` }}
              />
            </div>
          </div>

          <div className="border-2 border-[#1F1305] bg-white p-4 shadow-[4px_4px_0px_#1F1305] space-y-2">
            <div className="flex items-center justify-between text-[#5A5245] font-mono text-xs font-bold uppercase mb-1">
              <span>Fotos Grupos</span>
              <ImageIcon className="h-4 w-4 text-[#E80000]" />
            </div>
            <div className="font-mono text-2xl font-black text-[#1F1305]">
              {groupsWithPhoto}{" "}
              <span className="text-xs text-[#5A5245] font-bold">
                / {groups.length}
              </span>
            </div>
            <div className="h-2 w-full bg-[#EDE0D0] border border-[#1F1305] overflow-hidden">
              <div
                className="h-full bg-[#E80000]"
                style={{ width: `${(groupsWithPhoto / (groups.length || 1)) * 100}%` }}
              />
            </div>
          </div>

          <div className="border-2 border-[#1F1305] bg-white p-4 shadow-[4px_4px_0px_#1F1305] space-y-2">
            <div className="flex items-center justify-between text-[#5A5245] font-mono text-xs font-bold uppercase mb-1">
              <span>Fotos Personas</span>
              <ImageIcon className="h-4 w-4 text-[#10B981]" />
            </div>
            <div className="font-mono text-2xl font-black text-[#1F1305]">
              {personsWithPhoto}{" "}
              <span className="text-xs text-[#5A5245] font-bold">
                / {persons.length}
              </span>
            </div>
            <div className="h-2 w-full bg-[#EDE0D0] border border-[#1F1305] overflow-hidden">
              <div
                className="h-full bg-[#10B981]"
                style={{ width: `${(personsWithPhoto / (persons.length || 1)) * 100}%` }}
              />
            </div>
          </div>

          <div className="border-2 border-[#1F1305] bg-white p-4 shadow-[4px_4px_0px_#1F1305] space-y-2">
            <div className="flex items-center justify-between text-[#5A5245] font-mono text-xs font-bold uppercase mb-1">
              <span>Logos Sellos</span>
              <ImageIcon className="h-4 w-4 text-[#2563EB]" />
            </div>
            <div className="font-mono text-2xl font-black text-[#1F1305]">
              {labelsWithLogo}{" "}
              <span className="text-xs text-[#5A5245] font-bold">
                / {labels.length}
              </span>
            </div>
            <div className="h-2 w-full bg-[#EDE0D0] border border-[#1F1305] overflow-hidden">
              <div
                className="h-full bg-[#2563EB]"
                style={{ width: `${(labelsWithLogo / (labels.length || 1)) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Guía Rápida Neo-Brutalista */}
        <div className="border-2 border-[#1F1305] bg-[#FAF8F5] p-4 shadow-[3px_3px_0px_#1F1305] flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs text-[#1F1305]">
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4 text-[#E80000] shrink-0" />
            <span>
              Las imágenes subidas se alojan en el bucket <strong className="font-black">media</strong> de Supabase Storage y actualizan la base de datos física en tiempo real.
            </span>
          </div>
          <span className="border border-[#1F1305] bg-[#F8C800] px-2 py-0.5 text-[10px] font-black text-[#1F1305] shrink-0">
            Conversión automática a WebP en el navegador
          </span>
        </div>

        {/* Panel CMS con Pestañas: Catálogo, Blog y Personalizador Home */}
        <AdminTabsContainer
          initialAlbums={albums}
          initialGroups={groups}
          initialPersons={persons}
          initialLabels={labels}
          initialArticles={articles}
          initialHomeConfig={homeConfig}
        />
      </main>
    </div>
  );
}
