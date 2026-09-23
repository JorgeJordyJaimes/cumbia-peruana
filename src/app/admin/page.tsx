import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { AmbientGlow } from "@/components/ui/ambient-glow";
import { GlassCard } from "@/components/ui/glass-card";
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
  grupos: { nombre_grupo: string } | null;
  sellos_discograficos: { nombre_sello: string } | null;
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
        grupos (nombre_grupo),
        sellos_discograficos (nombre_sello)
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
  const albums: AdminAlbumItem[] = typedAlbumes.map((a) => ({
    id: a.id_album,
    title: a.nombre_album || "Sin Título Registrado",
    artist: a.grupos?.nombre_grupo || "Varios Artistas",
    catalogNumber: a.numero_catalogo,
    year: a.año_publicacion,
    label: a.sellos_discograficos?.nombre_sello || null,
    coverUrl: a.url_portada,
    backCoverUrl: a.url_contraportada,
    vinylLabelUrl: a.url_etiqueta,
  }));

  // Mapear Grupos
  const typedGrupos = (rawGrupos as unknown as RawAdminGroup[]) || [];
  const groups: AdminGroupItem[] = typedGrupos.map((g) => ({
    id: g.id_grupo,
    name: g.nombre_grupo,
    region: g.region,
    directorName: g.personas?.nombre || null,
    photoUrl: g.url_foto,
  }));

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
    <div className="relative min-h-screen bg-[#0a0a0c] text-white selection:bg-amber-500 selection:text-black">
      <AmbientGlow variant="warm-solar" className="top-0 right-0" />
      <AmbientGlow variant="chicha-psychedelic" className="bottom-0 left-0" />

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-neutral-950/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 max-w-7xl">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="rounded-xl border border-white/10 bg-white/5 p-2 text-neutral-400 hover:text-white transition-colors"
              title="Volver al Catálogo Público"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-white tracking-tight">
                  Panel de Administración
                </h1>
                <span className="inline-flex items-center gap-1 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-1.5 py-0.5 font-mono text-[10px] text-emerald-400">
                  <ShieldCheck className="h-3 w-3" /> Autenticado
                </span>
              </div>
              <p className="font-mono text-[11px] text-neutral-400 truncate">
                {user.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-neutral-300 hover:text-white transition-colors"
            >
              <span>Ver Web en Vivo</span>
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Main Admin Content */}
      <main className="container mx-auto max-w-7xl p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Banner de Estado y Estadísticas */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <GlassCard className="p-4">
            <div className="flex items-center justify-between text-neutral-400 font-mono text-xs mb-1">
              <span>Portadas Álbum</span>
              <ImageIcon className="h-3.5 w-3.5 text-amber-400" />
            </div>
            <div className="font-mono text-xl sm:text-2xl font-bold text-white">
              {albumsWithCover}{" "}
              <span className="text-xs text-neutral-500 font-normal">
                / {albums.length}
              </span>
            </div>
            <div className="mt-2 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-amber-400 rounded-full"
                style={{ width: `${(albumsWithCover / (albums.length || 1)) * 100}%` }}
              />
            </div>
          </GlassCard>

          <GlassCard className="p-4">
            <div className="flex items-center justify-between text-neutral-400 font-mono text-xs mb-1">
              <span>Fotos Grupos</span>
              <ImageIcon className="h-3.5 w-3.5 text-rose-400" />
            </div>
            <div className="font-mono text-xl sm:text-2xl font-bold text-white">
              {groupsWithPhoto}{" "}
              <span className="text-xs text-neutral-500 font-normal">
                / {groups.length}
              </span>
            </div>
            <div className="mt-2 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-rose-400 rounded-full"
                style={{ width: `${(groupsWithPhoto / (groups.length || 1)) * 100}%` }}
              />
            </div>
          </GlassCard>

          <GlassCard className="p-4">
            <div className="flex items-center justify-between text-neutral-400 font-mono text-xs mb-1">
              <span>Fotos Personas</span>
              <ImageIcon className="h-3.5 w-3.5 text-cyan-400" />
            </div>
            <div className="font-mono text-xl sm:text-2xl font-bold text-white">
              {personsWithPhoto}{" "}
              <span className="text-xs text-neutral-500 font-normal">
                / {persons.length}
              </span>
            </div>
            <div className="mt-2 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-cyan-400 rounded-full"
                style={{ width: `${(personsWithPhoto / (persons.length || 1)) * 100}%` }}
              />
            </div>
          </GlassCard>

          <GlassCard className="p-4">
            <div className="flex items-center justify-between text-neutral-400 font-mono text-xs mb-1">
              <span>Logos Sellos</span>
              <ImageIcon className="h-3.5 w-3.5 text-emerald-400" />
            </div>
            <div className="font-mono text-xl sm:text-2xl font-bold text-white">
              {labelsWithLogo}{" "}
              <span className="text-xs text-neutral-500 font-normal">
                / {labels.length}
              </span>
            </div>
            <div className="mt-2 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-emerald-400 rounded-full"
                style={{ width: `${(labelsWithLogo / (labels.length || 1)) * 100}%` }}
              />
            </div>
          </GlassCard>
        </div>

        {/* Guía Rápida */}
        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs text-amber-200/90">
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4 text-amber-400 shrink-0" />
            <span>
              Las imágenes subidas se alojan en el bucket <strong>media</strong> de Supabase Storage y actualizan la base de datos física en tiempo real.
            </span>
          </div>
          <span className="text-[11px] text-amber-400/70">
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
