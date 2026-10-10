import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { BrutalistCoordinator, BrutalistFooter } from "@/features/home-brutalism";
import { BadgeFormat } from "@/components/ui/badge-format";
import { JsonLd, buildMusicAlbumJsonLd } from "@/components/seo/json-ld";
import { ArrowLeft, Disc, Calendar, Building2, Layers, Music } from "lucide-react";

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
  grupos: { id_grupo: number; nombre_grupo: string } | null;
  sellos_discograficos: { nombre_sello: string; pais: string | null } | null;
  tipos_album: { nombre_tipo: string } | null;
}

interface AlbumTemaDetailRow {
  id_album_tema: number;
  numero_pista: number | null;
  lado: string | null;
  es_mosaico: boolean;
  temas: {
    id_tema: number;
    titulo_tema: string;
    duracion_segundos: number | null;
    bpm: number | null;
    camelot_code: string | null;
    musical_key: string | null;
    temas_compositores: Array<{
      credito_como: string | null;
      personas: { nombre: string } | null;
    }> | null;
    temas_grupos: Array<{
      grupos: { nombre_grupo: string } | null;
    }> | null;
  } | null;
}

export async function generateMetadata({ params }: AlbumPageProps): Promise<Metadata> {
  const { id } = await params;
  const albumId = parseInt(id, 10);
  if (isNaN(albumId)) return { title: "Álbum no encontrado | Kumbia Sound" };

  const supabase = await createClient();
  const { data: rawAlbum } = await supabase
    .from("albumes")
    .select(`
      nombre_album,
      año_publicacion,
      numero_catalogo,
      grupos (nombre_grupo),
      sellos_discograficos (nombre_sello)
    `)
    .eq("id_album", albumId)
    .single();

  const album = rawAlbum as unknown as AlbumMetadataRow | null;

  if (!album) {
    return { title: "Álbum no encontrado | Kumbia Sound" };
  }

  const groupName = album.grupos?.nombre_grupo || "Varios Artistas";
  const albumTitle = album.nombre_album || "Sin título";
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

  // 1. Consultar álbum maestro con relaciones
  const { data: rawAlbum, error: albumError } = await supabase
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
      grupos (id_grupo, nombre_grupo),
      sellos_discograficos (nombre_sello, pais),
      tipos_album (nombre_tipo)
    `)
    .eq("id_album", albumId)
    .single();

  const album = rawAlbum as unknown as AlbumDetailRow | null;

  if (albumError || !album) {
    notFound();
  }

  // 2. Consultar pistas físicas (Lado A / Lado B) vinculadas a este álbum
  const { data: rawPistas } = await supabase
    .from("albumes_temas")
    .select(`
      id_album_tema,
      numero_pista,
      lado,
      es_mosaico,
      temas (
        id_tema,
        titulo_tema,
        duracion_segundos,
        bpm,
        camelot_code,
        musical_key,
        temas_compositores (
          credito_como,
          personas (nombre)
        ),
        temas_grupos (
          grupos (nombre_grupo)
        )
      )
    `)
    .eq("id_album", albumId)
    .order("lado", { ascending: true })
    .order("numero_pista", { ascending: true });

  const pistasList = (rawPistas as unknown as AlbumTemaDetailRow[]) || [];

  const pistas = pistasList.map((p) => {
    const t = p.temas;
    const compositores = t?.temas_compositores?.map(
      (tc) => tc.credito_como || tc.personas?.nombre || "D.R."
    ).join(", ") || null;
    const interpretes = t?.temas_grupos?.map((tg) => tg.grupos?.nombre_grupo).join(", ") || null;

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
      musical_key: t?.musical_key ?? null,
      compositor: compositores,
      artista: interpretes,
    };
  });

  const artistName = album.grupos?.nombre_grupo || (album.es_varios_artistas ? "Varios Artistas" : "Desconocido");
  const albumTitle = album.nombre_album || "Sin título";

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
    <div className="relative min-h-screen bg-[#EDE0D0] text-[#1F1305] selection:bg-[#F1730C] selection:text-white">
      {/* Schema.org MusicAlbum JSON-LD para motores de búsqueda */}
      <JsonLd data={jsonLdData} />

      <BrutalistCoordinator>
        <main className="container mx-auto max-w-5xl px-4 sm:px-6 pt-6 pb-20 space-y-10">
          {/* Breadcrumb de Retorno */}
          <div className="flex items-center justify-between border-b-2 border-[#1F1305] pb-4 font-mono text-xs">
            <Link
              href="/"
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
              {/* Portada Física */}
              <div className="relative aspect-square w-full sm:w-64 md:w-72 border-2 border-[#1F1305] bg-[#EDE0D0] shrink-0 shadow-[4px_4px_0px_#1F1305] flex items-center justify-center overflow-hidden">
                {album.url_portada ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={album.url_portada}
                    alt={albumTitle}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-6 text-center">
                    <Disc className="h-16 w-16 text-[#E80000] mb-2" />
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#1F1305]">
                      {album.sellos_discograficos?.nombre_sello || "KUMBIA SOUND"}
                    </span>
                  </div>
                )}
              </div>

              {/* Datos Editoriales */}
              <div className="flex-1 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <BadgeFormat formatName={album.tipos_album?.nombre_tipo || "LP 33 RPM"} />
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
                    <span className="font-mono text-[11px] font-bold bg-[#F1730C] text-white border border-[#1F1305] px-2 py-0.5">
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
                </div>

                {album.comentario && (
                  <p className="font-sans text-sm text-[#5A5245] leading-relaxed border-t border-[#1F1305]/20 pt-3">
                    {album.comentario}
                  </p>
                )}

                {/* Métricas Técnicas */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t-2 border-[#1F1305] font-mono text-xs">
                  <div className="border border-[#1F1305] bg-[#EDE0D0] p-2.5 shadow-[2px_2px_0px_#1F1305]">
                    <span className="text-[#5A5245] block text-[10px] font-bold uppercase">Año de Publicación</span>
                    <span className="text-sm font-bold text-[#1F1305] flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-[#F1730C]" /> {album.año_publicacion || "N/D"}
                    </span>
                  </div>

                  <div className="border border-[#1F1305] bg-[#EDE0D0] p-2.5 shadow-[2px_2px_0px_#1F1305]">
                    <span className="text-[#5A5245] block text-[10px] font-bold uppercase">Sello Discográfico</span>
                    <span className="text-sm font-bold text-[#1F1305] flex items-center gap-1 truncate">
                      <Building2 className="h-3.5 w-3.5 text-[#E80000]" /> {album.sellos_discograficos?.nombre_sello || "N/D"}
                    </span>
                  </div>

                  <div className="col-span-2 sm:col-span-1 border border-[#1F1305] bg-[#EDE0D0] p-2.5 shadow-[2px_2px_0px_#1F1305]">
                    <span className="text-[#5A5245] block text-[10px] font-bold uppercase">Total Pistas</span>
                    <span className="text-sm font-bold text-[#1F1305] flex items-center gap-1">
                      <Layers className="h-3.5 w-3.5 text-[#10B981]" /> {pistas.length} Pistas
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

              {pistas.length === 0 ? (
                <p className="font-sans text-xs text-[#5A5245] italic py-4">
                  No hay pistas registradas para este álbum en el catálogo.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-2 border-[#1F1305] text-left font-mono text-xs">
                    <thead className="bg-[#1F1305] text-white">
                      <tr>
                        <th className="p-2.5 w-16">Lado</th>
                        <th className="p-2.5 w-12 text-center">#</th>
                        <th className="p-2.5">Título / Intérprete</th>
                        <th className="p-2.5">Compositor</th>
                        <th className="p-2.5 text-center">BPM / Clave</th>
                        <th className="p-2.5 text-right w-20">Duración</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1F1305]/20 bg-white">
                      {pistas.map((pista) => (
                        <tr key={pista.id_album_tema} className="hover:bg-[#EDE0D0]/50 transition-colors">
                          <td className="p-2.5 font-bold">
                            {pista.lado ? (
                              <span className="border border-[#1F1305] bg-[#EDE0D0] px-2 py-0.5 text-[11px] shadow-[1px_1px_0px_#1F1305]">
                                Lado {pista.lado}
                              </span>
                            ) : (
                              "-"
                            )}
                          </td>
                          <td className="p-2.5 text-center font-bold text-[#5A5245]">
                            {pista.numero_pista ?? "-"}
                          </td>
                          <td className="p-2.5">
                            <div className="font-bold text-[#1F1305] text-sm flex items-center gap-1.5">
                              <span>{pista.titulo}</span>
                              {pista.es_mosaico && (
                                <span className="border border-[#1F1305] bg-[#F8C800] px-1.5 py-0.2 text-[9px] font-bold text-[#1F1305]">
                                  MOSAICO
                                </span>
                              )}
                            </div>
                            {pista.artista && pista.artista !== artistName && (
                              <div className="text-[11px] text-[#E80000]">{pista.artista}</div>
                            )}
                          </td>
                          <td className="p-2.5 text-[#5A5245]">
                            {pista.compositor || "D.R."}
                          </td>
                          <td className="p-2.5 text-center">
                            {pista.bpm ? (
                              <span className="inline-flex items-center gap-1 font-bold text-[11px]">
                                {pista.bpm} BPM
                                {pista.musical_key && <span className="text-[#5A5245]">({pista.musical_key})</span>}
                              </span>
                            ) : (
                              "-"
                            )}
                          </td>
                          <td className="p-2.5 text-right font-bold text-[#5A5245]">
                            {pista.duracion
                              ? `${Math.floor(pista.duracion / 60)}:${(pista.duracion % 60).toString().padStart(2, "0")}`
                              : "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </main>
      </BrutalistCoordinator>

      <BrutalistFooter />
    </div>
  );
}
