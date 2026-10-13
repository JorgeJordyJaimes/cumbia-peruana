import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { BrutalistCoordinator, BrutalistFooter } from "@/features/home-brutalism";
import { CatalogExplorer, type AlbumItem } from "@/features/albumes";
import type { TrackItem } from "@/features/temas";
import { JsonLd, buildMusicAlbumJsonLd } from "@/components/seo/json-ld";
import Link from "next/link";
import { ArrowLeft, Sparkles, Disc, Radio, Layers, Building2, Music } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Bóveda de Vinilos & Prensajes Originales (1968–2005) | Kumbia Sound",
  description:
    "Catálogo fonográfico y buscador de discos en vinilo de la cumbia peruana. Filtra LPs de 33 RPM y singles de 45 RPM por sellos históricos, agrupaciones y décadas.",
};

interface RawAlbumRow {
  id_album: number;
  nombre_album: string | null;
  numero_catalogo: string | null;
  año_publicacion: number | null;
  url_portada: string | null;
  es_recopilatorio: boolean | null;
  grupos: { nombre_grupo: string } | null;
  sellos_discograficos: { nombre_sello: string } | null;
  tipos_album: { nombre_tipo: string } | null;
}

interface RawTemaRow {
  id_tema: number;
  titulo_tema: string;
  duracion_segundos: number | null;
  bpm: number | null;
  camelot_code: string | null;
  musical_key: string | null;
  albumes_temas: Array<{
    id_album: number;
    numero_pista: number | null;
    lado: string | null;
  }> | null;
  temas_compositores: Array<{
    credito_como?: string | null;
    personas: { nombre: string; apodo: string | null } | null;
  }> | null;
  tema_musicos?: Array<{
    instrumento: string | null;
    credito_como: string | null;
    roles: { nombre_rol: string } | null;
    personas: { nombre: string; apodo: string | null } | null;
  }> | null;
  temas_generos?: Array<{
    generos: { id_genero: number; nombre_genero: string } | null;
  }> | null;
}

export default async function VinilosPage() {
  const supabase = await createClient();

  // 1. Estadísticas de soporte físico en tiempo real
  const [
    { count: totalAlbumes },
    { count: totalSellos },
    { count: totalLPs },
    { count: totalSingles },
  ] = await Promise.all([
    supabase.from("albumes").select("*", { count: "exact", head: true }),
    supabase.from("sellos_discograficos").select("*", { count: "exact", head: true }),
    supabase.from("albumes").select("*", { count: "exact", head: true }).eq("id_tipo_album", 2),
    supabase.from("albumes").select("*", { count: "exact", head: true }).eq("id_tipo_album", 1),
  ]);

  // 2. Consulta exhaustiva de álbumes y singles
  const { data: rawAlbumes } = await supabase
    .from("albumes")
    .select(`
      id_album,
      nombre_album,
      numero_catalogo,
      año_publicacion,
      url_portada,
      es_recopilatorio,
      grupos (nombre_grupo),
      sellos_discograficos (nombre_sello),
      tipos_album (nombre_tipo)
    `)
    .order("año_publicacion", { ascending: true })
    .limit(1000);

  // 3. Temas y metadatos para contraportadas / tracklists interactivos
  const { data: rawTemas } = await supabase
    .from("temas")
    .select(`
      id_tema,
      titulo_tema,
      duracion_segundos,
      bpm,
      camelot_code,
      musical_key,
      albumes_temas (
        id_album,
        numero_pista,
        lado
      ),
      temas_compositores (
        credito_como,
        personas (nombre, apodo)
      ),
      tema_musicos (
        instrumento,
        credito_como,
        roles (nombre_rol),
        personas (nombre, apodo)
      ),
      temas_generos (
        generos (id_genero, nombre_genero)
      )
    `)
    .limit(2000);

  // Mapear Álbumes
  const rawAlbumsList = (rawAlbumes as unknown as RawAlbumRow[]) || [];
  const albums: AlbumItem[] = rawAlbumsList.map((a) => {
    const isSingle = a.tipos_album?.nombre_tipo === "45";
    return {
      id: a.id_album,
      title:
        a.nombre_album ||
        (isSingle
          ? `Single 45 RPM [Cat: ${a.numero_catalogo || a.id_album}]`
          : "Sin Título Registrado"),
      artist: a.grupos?.nombre_grupo || "Varios Artistas",
      year: a.año_publicacion,
      catalogNumber: a.numero_catalogo,
      label: a.sellos_discograficos?.nombre_sello || "Sello Particular",
      format: isSingle ? "45 RPM Single" : a.tipos_album?.nombre_tipo || "LP 33 RPM",
      coverUrl: a.url_portada,
      isCompilation: a.es_recopilatorio ?? false,
    };
  });

  // Mapa de pistas por álbum para las fichas técnicas
  const rawTemasList = (rawTemas as unknown as RawTemaRow[]) || [];
  const tracksMap: Record<number, TrackItem[]> = {};
  rawTemasList.forEach((t) => {
    const composer = t.temas_compositores?.[0]?.credito_como || t.temas_compositores?.[0]?.personas?.nombre || null;

    // Extraer vocalistas de tema_musicos
    const vocalists = (t.tema_musicos || []).filter((tm) => {
      const rol = tm.roles?.nombre_rol?.toLowerCase() || "";
      const inst = tm.instrumento?.toLowerCase() || "";
      return rol.includes("voz") || inst.includes("voz");
    });
    let vocalist = vocalists.map((v) => v.credito_como || v.personas?.nombre).filter(Boolean).join(", ");
    const isInstrumental = (t.temas_generos || []).some(
      (tg) => tg.generos?.nombre_genero?.toLowerCase() === "instrumental"
    );
    if (!vocalist && isInstrumental) {
      vocalist = "Instrumental";
    }

    // Géneros musicales asociados
    const genresList = (t.temas_generos || [])
      .map((tg) => tg.generos?.nombre_genero)
      .filter((g): g is string => Boolean(g));
    const genre = genresList.length > 0 ? Array.from(new Set(genresList)).join(" / ") : null;

    (t.albumes_temas || []).forEach((at) => {
      if (!tracksMap[at.id_album]) {
        tracksMap[at.id_album] = [];
      }
      tracksMap[at.id_album].push({
        id: t.id_tema,
        trackNumber: at.numero_pista,
        side: at.lado,
        title: t.titulo_tema,
        durationSeconds: t.duracion_segundos,
        composer,
        vocalist: vocalist || null,
        bpm: t.bpm,
        camelot: t.camelot_code,
        musicalKey: t.musical_key,
        genre,
      });
    });
  });

  // Ordenación estricta de pistas por álbum: Lado A (1..N) y luego Lado B (1..N)
  Object.keys(tracksMap).forEach((albumIdKey) => {
    const albumId = Number(albumIdKey);
    tracksMap[albumId].sort((a, b) => {
      const sideA = (a.side || "").trim().toUpperCase();
      const sideB = (b.side || "").trim().toUpperCase();
      if (sideA !== sideB) {
        if (!sideA) return 1;
        if (!sideB) return -1;
        return sideA.localeCompare(sideB);
      }
      const numA = typeof a.trackNumber === "number" ? a.trackNumber : 999;
      const numB = typeof b.trackNumber === "number" ? b.trackNumber : 999;
      return numA - numB;
    });
  });

  // Datos estructurados Schema.org MusicAlbum
  const catalogJsonLd = albums.slice(0, 25).map((a) =>
    buildMusicAlbumJsonLd({
      id: a.id,
      name: a.title,
      artistName: a.artist,
      recordLabel: a.label,
      catalogNumber: a.catalogNumber,
      releaseYear: a.year,
      coverUrl: a.coverUrl,
      tracks: (tracksMap[a.id] || []).map((tr) => ({
        id: tr.id,
        title: tr.title,
        position: tr.trackNumber,
        durationSeconds: tr.durationSeconds,
        composerName: tr.composer,
        artistName: a.artist,
      })),
    })
  );

  return (
    <div className="relative min-h-screen bg-[#EDE0D0] text-[#1F1305] selection:bg-[#F1730C] selection:text-white">
      {/* Schema.org JSON-LD para motores de búsqueda */}
      {catalogJsonLd.length > 0 && <JsonLd data={catalogJsonLd} />}

      <BrutalistCoordinator totalAlbumes={totalAlbumes} totalSellos={totalSellos}>
        <main className="container mx-auto max-w-7xl px-4 sm:px-6 pt-6 pb-20 space-y-10">
          {/* Breadcrumb / Retorno a Portada */}
          <div className="flex items-center justify-between border-b-2 border-[#1F1305] pb-4 font-mono text-xs">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-bold text-[#1F1305] hover:text-[#E80000] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>← Volver a la Portada Principal</span>
            </Link>

            <div className="flex items-center gap-2 border border-[#1F1305] bg-white px-2.5 py-1 text-[#F1730C] font-bold shadow-[2px_2px_0px_#1F1305]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>06 / BÓVEDA FONOGRÁFICA DE VINILOS</span>
            </div>
          </div>

          {/* Banner Hero Brutalista */}
          <div className="border-2 border-[#1F1305] bg-[#1F1305] text-[#EDE0D0] p-8 sm:p-12 shadow-[6px_6px_0px_#F1730C] relative overflow-hidden">
            <div className="max-w-3xl space-y-5 relative z-10">
              <div className="inline-flex items-center gap-2 border-2 border-[#EDE0D0] bg-[#F1730C] px-3.5 py-1 font-mono text-xs font-bold text-white shadow-[2px_2px_0px_#EDE0D0]">
                <Disc className="h-3.5 w-3.5" />
                <span>ARCHIVO FÍSICO ANALÓGICO • 1968–2005</span>
              </div>

              <h1 className="font-cooper text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                La Bóveda de Vinilos
              </h1>

              <p className="font-sans text-sm sm:text-base text-[#EDE0D0]/80 leading-relaxed max-w-2xl">
                Catálogo fonográfico y preservación documental de las grabaciones de la cumbia
                peruana en soporte físico: Long Plays (33 RPM), discos singles (45 RPM) y rarezas.
                Inspecciona carátulas restauradas, sellos matrices, fechas de prensaje y créditos de sesión.
              </p>

              {/* Chips de Métricas en Vivo */}
              <div className="pt-2 flex flex-wrap gap-3 font-mono text-xs">
                <span className="flex items-center gap-2 border border-[#EDE0D0]/30 bg-white/10 px-3 py-1 font-bold text-[#F8C800]">
                  <Disc className="h-4 w-4 text-[#F8C800]" /> {totalAlbumes ?? albums.length}+ Obras Catalogadas
                </span>
                <span className="flex items-center gap-2 border border-[#EDE0D0]/30 bg-white/10 px-3 py-1 font-bold text-white">
                  <Layers className="h-4 w-4 text-[#10B981]" /> {totalLPs ?? "300+"} LPs (33 RPM)
                </span>
                <span className="flex items-center gap-2 border border-[#EDE0D0]/30 bg-white/10 px-3 py-1 font-bold text-white">
                  <Radio className="h-4 w-4 text-[#F1730C]" /> {totalSingles ?? "370+"} Singles (45 RPM)
                </span>
                <span className="flex items-center gap-2 border border-[#EDE0D0]/30 bg-white/10 px-3 py-1 font-bold text-white">
                  <Building2 className="h-4 w-4 text-[#E80000]" /> {totalSellos ?? "25+"} Sellos Matrices
                </span>
              </div>
            </div>

            {/* Sello de fondo en marca de agua */}
            <div className="absolute -bottom-8 -right-6 text-white/[0.04] font-anton text-[220px] font-black pointer-events-none select-none leading-none">
              VIN
            </div>
          </div>

          {/* EXPLORADOR & FILTRADOR DE VINILOS */}
          <div className="border-2 border-[#1F1305] bg-white p-4 sm:p-8 shadow-[6px_6px_0px_#1F1305]">
            <CatalogExplorer initialAlbums={albums} tracksMap={tracksMap} />
          </div>
        </main>
      </BrutalistCoordinator>

      <BrutalistFooter />
    </div>
  );
}
