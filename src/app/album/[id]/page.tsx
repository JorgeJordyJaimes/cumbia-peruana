import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { BrutalistCoordinator, BrutalistFooter } from "@/features/home-brutalism";
import { BadgeFormat } from "@/components/ui/badge-format";
import { BadgeDJ } from "@/components/ui/badge-dj";
import { AlbumCoverSlider } from "@/features/albumes";
import { AlbumTracklistTable } from "@/features/temas";
import { JsonLd, buildMusicAlbumJsonLd } from "@/components/seo/json-ld";
import { ArrowLeft, Disc, Calendar, Building2, Layers, Music, Clock, Activity, UserCheck } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface AlbumPageProps {
  params: Promise<{ id: string }>;
}

interface AlbumMetadataRow {
  nombre_album: string | null;
  año_publicacion: number | null;
  numero_catalogo: string | null;
  grupos: { nombre_grupo: string } | null;
  sellos_discograficos: { nombre_sello: string } | null;
}

interface AlbumDetailRow {
  id_album: number;
  nombre_album: string | null;
  numero_catalogo: string | null;
  año_publicacion: number | null;
  url_portada: string | null;
  url_contraportada: string | null;
  url_etiqueta: string | null;
  es_recopilatorio: boolean;
  es_varios_artistas: boolean;
  es_disco_split: boolean;
  comentario: string | null;
  grupos: {
    id_grupo: number;
    nombre_grupo: string;
    personas: { nombre: string; apodo: string | null } | null;
  } | null;
  sellos_discograficos: { nombre_sello: string; pais: string | null } | null;
  tipos_album: { nombre_tipo: string } | null;
}

interface MosaicoTemaSubRow {
  id_mosaico_tema: number;
  orden_segmento: number;
  duracion_segmento_segundos: number | null;
  temas: {
    id_tema: number;
    titulo_tema: string;
    temas_compositores: Array<{
      personas: { nombre: string } | null;
    }> | null;
  } | null;
}

interface AlbumTemaDetailRow {
  id_album_tema: number;
  numero_pista: number | null;
  lado: string | null;
  es_mosaico: boolean;
  credito_galleta: string | null;
  temas: {
    id_tema: number;
    titulo_tema: string;
    duracion_segundos: number | null;
    bpm: number | null;
    camelot_code: string | null;
    temas_compositores: Array<{
      credito_como: string | null;
      personas: { nombre: string; apodo: string | null } | null;
    }> | null;
    temas_grupos: Array<{
      grupos: { nombre_grupo: string } | null;
    }> | null;
    tema_musicos: Array<{
      instrumento: string | null;
      credito_como: string | null;
      roles: { nombre_rol: string } | null;
      personas: { nombre: string; apodo: string | null } | null;
    }> | null;
    temas_generos: Array<{
      generos: { id_genero: number; nombre_genero: string } | null;
    }> | null;
  } | null;
  mosaicos_temas: MosaicoTemaSubRow[] | null;
}

// Carga con cache() de React para deduplicar petición entre generateMetadata y AlbumPage (server-cache-react)
const getAlbumDetail = cache(async (albumId: number) => {
  const supabase = await createClient();
  return supabase
    .from("albumes")
    .select(`
      id_album,
      nombre_album,
      numero_catalogo,
      año_publicacion,
      url_portada,
      url_contraportada,
      url_etiqueta,
      es_recopilatorio,
      es_varios_artistas,
      es_disco_split,
      comentario,
      grupos (
        id_grupo,
        nombre_grupo,
        personas (nombre, apodo)
      ),
      sellos_discograficos (nombre_sello, pais),
      tipos_album (nombre_tipo)
    `)
    .eq("id_album", albumId)
    .single();
});

export async function generateMetadata({ params }: AlbumPageProps): Promise<Metadata> {
  const { id } = await params;
  const albumId = parseInt(id, 10);
  if (isNaN(albumId)) return { title: "Álbum no encontrado | Kumbia Sound" };

  const { data: rawAlbum } = await getAlbumDetail(albumId);
  const album = rawAlbum as unknown as AlbumDetailRow | null;

  if (!album) {
    return { title: "Álbum no encontrado | Kumbia Sound" };
  }

  const groupName = album.grupos?.nombre_grupo || "Varios Artistas";
  const isSingle = album.tipos_album?.nombre_tipo === "45";
  const albumTitle = album.nombre_album || (isSingle ? `Single [Cat: ${album.numero_catalogo || album.id_album}]` : "Sin título");
  const label = album.sellos_discograficos?.nombre_sello;
  const year = album.año_publicacion;

  return {
    title: `${albumTitle} - ${groupName} (${year || "1968-2005"}) | Kumbia Sound`,
    description: `Ficha fonográfica histórica del LP/Sencillo "${albumTitle}" grabado por ${groupName}${label ? ` para el sello ${label}` : ""}. Archivo patrimonial de la cumbia peruana.`,
  };
}

export default async function AlbumPage({ params }: AlbumPageProps) {
  const { id } = await params;
  const albumId = parseInt(id, 10);
  if (isNaN(albumId)) notFound();

  const supabase = await createClient();

  // Consulta paralela de datos de álbum y pistas físicas (elimina waterfalls)
  const [
    { data: rawAlbum, error: albumError },
    { data: rawPistas },
  ] = await Promise.all([
    getAlbumDetail(albumId),
    supabase
      .from("albumes_temas")
      .select(`
        id_album_tema,
        numero_pista,
        lado,
        es_mosaico,
        credito_galleta,
        temas (
          id_tema,
          titulo_tema,
          duracion_segundos,
          bpm,
          camelot_code,
          temas_compositores (
            credito_como,
            personas (nombre, apodo)
          ),
          temas_grupos (
            grupos (nombre_grupo)
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
        ),
        mosaicos_temas (
          id_mosaico_tema,
          orden_segmento,
          duracion_segmento_segundos,
          temas (
            id_tema,
            titulo_tema,
            temas_compositores (
              personas (nombre)
            )
          )
        )
      `)
      .eq("id_album", albumId)
      .order("lado", { ascending: true })
      .order("numero_pista", { ascending: true }),
  ]);

  const album = rawAlbum as unknown as AlbumDetailRow | null;

  if (albumError || !album) {
    notFound();
  }

  const pistasList = (rawPistas as unknown as AlbumTemaDetailRow[]) || [];

  const pistas = pistasList.map((p) => {
    const t = p.temas;
    // Autor real verificado y crédito impreso en galleta/etiqueta
    const autoresReales = t?.temas_compositores?.map((tc) => tc.personas?.nombre).filter(Boolean) || [];
    const autorReal = autoresReales.length > 0 ? autoresReales.join(", ") : "D.R.";

    // Crédito en galleta: prevalece estrictamente el de Albumes_Temas (específico para este soporte/formato físico)
    let creditoGalleta: string | null = p.credito_galleta?.trim() || null;
    if (!creditoGalleta) {
      const rawCreditos = (t?.temas_compositores || [])
        .map((tc) => tc.credito_como?.trim())
        .filter((c): c is string => Boolean(c));
      const deduped = Array.from(new Set(rawCreditos.flatMap((c) => c.split(";").map((s) => s.trim()).filter(Boolean))));
      if (deduped.length > 0) {
        creditoGalleta = deduped.join("; ");
      }
    } else {
      const deduped = Array.from(new Set(creditoGalleta.split(";").map((s) => s.trim()).filter(Boolean)));
      creditoGalleta = deduped.join("; ");
    }

    // Desglose de piezas de mosaico si aplica
    const mosaicoSegmentos = (p.mosaicos_temas || [])
      .map((mt) => {
        const autores = mt.temas?.temas_compositores?.map((c) => c.personas?.nombre).filter(Boolean) || [];
        return {
          id_mosaico_tema: mt.id_mosaico_tema,
          orden_segmento: mt.orden_segmento,
          duracion_segmento_segundos: mt.duracion_segmento_segundos,
          titulo_tema: mt.temas?.titulo_tema || "Sin título",
          compositor: autores.length > 0 ? autores.join(", ") : null,
        };
      })
      .sort((a, b) => a.orden_segmento - b.orden_segmento);

    const interpretes = t?.temas_grupos?.map((tg) => tg.grupos?.nombre_grupo).join(", ") || null;

    // Extraer vocalistas de tema_musicos
    const vocalistas = (t?.tema_musicos || []).filter((tm) => {
      const rol = tm.roles?.nombre_rol?.toLowerCase() || "";
      const inst = tm.instrumento?.toLowerCase() || "";
      return rol.includes("voz") || inst.includes("voz");
    });
    let vocalista = vocalistas.map((v) => v.credito_como || v.personas?.nombre).filter(Boolean).join(", ");
    const hasInstrumental = (t?.temas_generos || []).some(
      (tg) => tg.generos?.nombre_genero?.toLowerCase() === "instrumental"
    );
    if (!vocalista && hasInstrumental) {
      vocalista = "Instrumental";
    }

    // Extraer géneros musicales
    const generosList = (t?.temas_generos || [])
      .map((tg) => tg.generos?.nombre_genero)
      .filter((g): g is string => Boolean(g));
    const generos = generosList.length > 0 ? Array.from(new Set(generosList)).join(" / ") : null;

    return {
      id_album_tema: p.id_album_tema,
      id_tema: t?.id_tema ?? 0,
      numero_pista: p.numero_pista,
      lado: p.lado,
      es_mosaico: p.es_mosaico,
      titulo: t?.titulo_tema ?? "Sin título",
      duracion: t?.duracion_segundos ?? null,
      bpm: t?.bpm ?? null,
      camelot: t?.camelot_code ?? null,
      compositor: autorReal,
      autorReal,
      creditoGalleta,
      vocalista: vocalista || null,
      generos,
      artista: interpretes,
      mosaicoSegmentos,
    };
  });

  // Ordenación estricta de pistas: Lado A (1..N) y luego Lado B (1..N)
  pistas.sort((a, b) => {
    const sideA = (a.lado || "").trim().toUpperCase();
    const sideB = (b.lado || "").trim().toUpperCase();
    if (sideA !== sideB) {
      if (!sideA) return 1;
      if (!sideB) return -1;
      return sideA.localeCompare(sideB);
    }
    const numA = typeof a.numero_pista === "number" ? a.numero_pista : 999;
    const numB = typeof b.numero_pista === "number" ? b.numero_pista : 999;
    return numA - numB;
  });

  // Métricas técnicas del álbum
  const totalDurationSeconds = pistas.reduce((acc, p) => acc + (p.duracion || 0), 0);
  const formattedTotalDuration = totalDurationSeconds > 0
    ? `${Math.floor(totalDurationSeconds / 60)}:${(totalDurationSeconds % 60).toString().padStart(2, "0")}`
    : "--:--";

  const pistasWithBpm = pistas.filter((p) => typeof p.bpm === "number" && p.bpm > 0);
  const avgBpm = pistasWithBpm.length > 0
    ? Math.round(pistasWithBpm.reduce((acc, p) => acc + (p.bpm || 0), 0) / pistasWithBpm.length)
    : null;

  // Género más común / predominante entre las pistas
  const genreCounts = new Map<string, number>();
  let fallbackGenre: string | null = null;
  pistas.forEach((p) => {
    if (!p.generos) return;
    const parts = p.generos.split(/[/,]/).map((g) => g.trim()).filter(Boolean);
    parts.forEach((g) => {
      if (g.toLowerCase() === "instrumental") {
        fallbackGenre = "Instrumental";
      } else {
        genreCounts.set(g, (genreCounts.get(g) || 0) + 1);
      }
    });
  });
  let mostCommonGenre: string | null = null;
  let maxCount = 0;
  genreCounts.forEach((count, g) => {
    if (count > maxCount) {
      maxCount = count;
      mostCommonGenre = g;
    }
  });
  const albumTopGenre = mostCommonGenre || fallbackGenre || "Cumbia Peruana";

  const artistName = album.grupos?.nombre_grupo || (album.es_varios_artistas ? "Varios Artistas" : "Desconocido");
  const directorName = album.grupos?.personas?.nombre || null;
  const isSingle = album.tipos_album?.nombre_tipo === "45";
  let albumTitle = album.nombre_album;
  if (!albumTitle) {
    if (isSingle && pistas.length > 0) {
      const sideATracks = pistas.filter((p) => (p.lado || "").trim().toUpperCase() === "A").map((p) => p.titulo);
      const sideBTracks = pistas.filter((p) => (p.lado || "").trim().toUpperCase() === "B").map((p) => p.titulo);
      if (sideATracks.length > 0 && sideBTracks.length > 0) {
        albumTitle = `${sideATracks.join(", ")} / ${sideBTracks.join(", ")}`;
      } else if (sideATracks.length > 0) {
        albumTitle = sideATracks.join(", ");
      } else if (sideBTracks.length > 0) {
        albumTitle = sideBTracks.join(", ");
      } else {
        albumTitle = `Single [Cat: ${album.numero_catalogo || album.id_album}]`;
      }
    } else {
      albumTitle = isSingle ? `Single [Cat: ${album.numero_catalogo || album.id_album}]` : "Sin título";
    }
  }

  // 3. Generar objeto Schema.org MusicAlbum con trackList
  const jsonLdData = buildMusicAlbumJsonLd({
    id: album.id_album,
    name: albumTitle,
    artistName,
    recordLabel: album.sellos_discograficos?.nombre_sello,
    catalogNumber: album.numero_catalogo,
    releaseYear: album.año_publicacion,
    coverUrl: album.url_portada,
    description: album.comentario,
    tracks: pistas.map((p) => ({
      id: p.id_tema,
      title: p.titulo,
      position: p.numero_pista,
      durationSeconds: p.duracion,
      composerName: p.compositor,
      artistName: p.artista || artistName,
    })),
  });

  return (
    <div className="relative min-h-screen bg-[#EDE0D0] text-[#1F1305] selection:bg-[#F1730C] selection:text-[#1F1305]">
      {/* Schema.org MusicAlbum JSON-LD para motores de búsqueda */}
      <JsonLd data={jsonLdData} />

      <BrutalistCoordinator>
        <main id="contenido" className="container mx-auto max-w-7xl px-4 sm:px-6 pt-6 pb-20 space-y-10">
          {/* Breadcrumb de Retorno */}
          <div className="flex items-center justify-between border-b-2 border-[#1F1305] pb-4 font-mono text-xs">
            <Link
              href="/vinilos"
              className="inline-flex items-center gap-2 font-bold text-[#1F1305] hover:text-[#E80000] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>← Volver al Catálogo</span>
            </Link>

            <span className="font-bold border border-[#1F1305] bg-white px-2.5 py-1 shadow-[2px_2px_0px_#1F1305]">
              EXPEDIENTE FONOGRÁFICO #{album.id_album}
            </span>
          </div>

          {/* Ficha Principal Brutalista */}
          <div className="border-2 border-[#1F1305] bg-white p-6 sm:p-10 shadow-[8px_8px_0px_#1F1305] space-y-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Visor Deslizable de Portada y Contraportada / Cara A y B */}
              <div className="w-full sm:w-64 md:w-72 lg:w-80 shrink-0">
                <AlbumCoverSlider
                  coverUrl={album.url_portada}
                  backCoverUrl={album.url_contraportada}
                  title={albumTitle}
                  artist={artistName}
                  format={album.tipos_album?.nombre_tipo}
                  label={album.sellos_discograficos?.nombre_sello}
                  showSideLabels={true}
                />
              </div>

              {/* Datos Editoriales */}
              <div className="flex-1 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <BadgeFormat formatName={album.tipos_album?.nombre_tipo || "LP"} />
                  {album.numero_catalogo && (
                    <span className="font-mono text-xs font-bold text-[#1F1305] border border-[#1F1305] px-2.5 py-0.5 bg-white shadow-[1px_1px_0px_#1F1305]">
                      CAT: {album.numero_catalogo}
                    </span>
                  )}
                  {album.es_recopilatorio && (
                    <span className="font-mono text-[11px] font-bold bg-[#F8C800] text-[#1F1305] border border-[#1F1305] px-2 py-0.5">
                      Recopilatorio
                    </span>
                  )}
                  {album.es_disco_split && (
                    <span className="font-mono text-[11px] font-bold bg-[#F1730C] text-[#1F1305] border border-[#1F1305] px-2 py-0.5">
                      Disco Split
                    </span>
                  )}
                </div>

                <div>
                  <h1 className="text-3xl sm:text-5xl font-cooper font-black tracking-tight text-[#1F1305]">
                    {albumTitle}
                  </h1>
                  <p className="text-xl sm:text-2xl text-[#E80000] font-cooper font-bold mt-1">
                    {artistName}
                  </p>
                  {directorName && (
                    <p className="font-mono text-sm sm:text-base font-bold text-[#5A5245] mt-2 flex items-center gap-2">
                      <UserCheck className="h-4 w-4 text-[#E80000] shrink-0" />
                      <span>Director del Grupo: <strong className="text-[#1F1305]">{directorName}</strong></span>
                    </p>
                  )}
                </div>

                {album.comentario && (
                  <p className="font-sans text-sm text-[#5A5245] leading-relaxed border-t border-[#EDE0D0] pt-3">
                    {album.comentario}
                  </p>
                )}

                {/* Métricas Técnicas */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4 border-t-2 border-[#1F1305] font-mono text-xs">
                  <div className="border border-[#1F1305] bg-[#EDE0D0] p-2.5 shadow-[2px_2px_0px_#1F1305]">
                    <span className="text-[#5A5245] block text-[11px] font-bold uppercase">Año de Publicación</span>
                    <span className="text-sm font-bold text-[#1F1305] flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-[#F1730C]" /> {album.año_publicacion || "N/D"}
                    </span>
                  </div>

                  <div className="border border-[#1F1305] bg-[#EDE0D0] p-2.5 shadow-[2px_2px_0px_#1F1305]">
                    <span className="text-[#5A5245] block text-[11px] font-bold uppercase">Sello Discográfico</span>
                    <span className="text-sm font-bold text-[#1F1305] flex items-center gap-1 truncate">
                      <Building2 className="h-3.5 w-3.5 text-[#E80000]" /> {album.sellos_discograficos?.nombre_sello || "N/D"}
                    </span>
                  </div>

                  <div className="border border-[#1F1305] bg-[#EDE0D0] p-2.5 shadow-[2px_2px_0px_#1F1305]">
                    <span className="text-[#5A5245] block text-[11px] font-bold uppercase">Total Pistas</span>
                    <span className="text-sm font-bold text-[#1F1305] flex items-center gap-1">
                      <Layers className="h-3.5 w-3.5 text-[#10B981]" /> {pistas.length} Pistas
                    </span>
                  </div>

                  <div className="border border-[#1F1305] bg-[#EDE0D0] p-2.5 shadow-[2px_2px_0px_#1F1305]">
                    <span className="text-[#5A5245] block text-[11px] font-bold uppercase">Duración Total</span>
                    <span className="text-sm font-bold text-[#1F1305] flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-[#2563EB]" /> {formattedTotalDuration}
                    </span>
                  </div>

                  <div className="border border-[#1F1305] bg-[#EDE0D0] p-2.5 shadow-[2px_2px_0px_#1F1305]">
                    <span className="text-[#5A5245] block text-[11px] font-bold uppercase">BPM Promedio</span>
                    <span className="text-sm font-bold text-[#1F1305] flex items-center gap-1">
                      <Activity className="h-3.5 w-3.5 text-[#D97706]" /> {avgBpm ? `${avgBpm} BPM` : "--"}
                    </span>
                  </div>

                  <div className="border border-[#1F1305] bg-[#EDE0D0] p-2.5 shadow-[2px_2px_0px_#1F1305]">
                    <span className="text-[#5A5245] block text-[11px] font-bold uppercase">Género Principal</span>
                    <span className="text-sm font-bold text-[#1F1305] flex items-center gap-1 truncate" title={albumTopGenre}>
                      <Music className="h-3.5 w-3.5 text-[#7C3AED]" /> {albumTopGenre}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pistas Físicas (Tracklist con soporte estricto Lado A y Lado B) */}
            <div className="space-y-4 pt-4 border-t-2 border-[#1F1305]">
              <div className="flex items-center justify-between border-b-2 border-[#1F1305] pb-2">
                <h2 className="font-cooper text-xl sm:text-2xl font-black text-[#1F1305] flex items-center gap-2">
                  <Music className="h-5 w-5 text-[#F1730C]" />
                  <span>Listado de Temas & Surcos de Vinilo</span>
                </h2>
                <span className="font-mono text-xs font-bold text-[#5A5245]">
                  Soporte físico: Lado A / Lado B
                </span>
              </div>

              <AlbumTracklistTable pistas={pistas} artistName={artistName} />
            </div>
          </div>
        </main>
      </BrutalistCoordinator>

      <BrutalistFooter />
    </div>
  );
}
