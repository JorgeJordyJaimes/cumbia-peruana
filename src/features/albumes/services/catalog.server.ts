import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import type { AlbumItem } from "../components/album-card";
import type { TrackItem } from "@/features/temas";

interface RawAlbumRow {
  id_album: number;
  nombre_album: string | null;
  numero_catalogo: string | null;
  año_publicacion: number | null;
  url_portada: string | null;
  url_contraportada: string | null;
  es_recopilatorio: boolean | null;
  es_varios_artistas: boolean | null;
  es_disco_split: boolean | null;
  es_reedicion: boolean | null;
  incluido_en_lp: boolean | null;
  extraido_de_lp: boolean | null;
  solo_en_45: boolean | null;
  lados_en_lp: string | null;
  grupos: {
    nombre_grupo: string;
    personas: { nombre: string; apodo: string | null } | null;
  } | null;
  sellos_discograficos: { nombre_sello: string } | null;
  tipos_album: { nombre_tipo: string } | null;
}

interface RawTemaRow {
  id_tema: number;
  titulo_tema: string;
  duracion_segundos: number | null;
  bpm: number | null;
  camelot_code: string | null;
  albumes_temas: Array<{
    id_album: number;
    numero_pista: number | null;
    lado: string | null;
    albumes: { nombre_album: string | null; año_publicacion: number | null } | null;
  }> | null;
  temas_grupos: Array<{
    grupos: { nombre_grupo: string } | null;
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

export interface CatalogData {
  albums: AlbumItem[];
  tracksMap: Record<number, TrackItem[]>;
  subgenreCounts: Record<string, number>;
}

function sortTracks(tracks: TrackItem[]): TrackItem[] {
  return [...tracks].sort((a, b) => {
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
}

/**
 * Fuente única de verdad para el catálogo público.
 *
 * Centraliza las consultas y el mapeo que antes estaban duplicados en `/` y
 * `/vinilos`. React.cache() deduplica la lectura dentro del mismo ciclo de
 * render para que `generateMetadata` y la página no repitan la petición.
 */
export const getCatalogData = cache(async (): Promise<CatalogData> => {
  const supabase = await createClient();

  const [{ data: rawAlbumes }, { data: rawTemas }] = await Promise.all([
    supabase
      .from("albumes")
      .select(`
        id_album,
        nombre_album,
        numero_catalogo,
        año_publicacion,
        url_portada,
        url_contraportada,
        es_recopilatorio,
        es_varios_artistas,
        es_disco_split,
        es_reedicion,
        incluido_en_lp,
        extraido_de_lp,
        solo_en_45,
        lados_en_lp,
        grupos (
          nombre_grupo,
          personas (nombre, apodo)
        ),
        sellos_discograficos (nombre_sello),
        tipos_album (nombre_tipo)
      `)
      .order("año_publicacion", { ascending: true })
      .limit(1000),
    supabase
      .from("temas")
      .select(`
        id_tema,
        titulo_tema,
        duracion_segundos,
        bpm,
        camelot_code,
        albumes_temas (
          id_album,
          numero_pista,
          lado,
          albumes:albumes!albumes_temas_id_album_fkey (nombre_album, año_publicacion)
        ),
        temas_grupos (
          grupos (nombre_grupo)
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
      .limit(2500),
  ]);

  const rawTemasList = (rawTemas as unknown as RawTemaRow[]) || [];
  const tracksMap: Record<number, TrackItem[]> = {};
  const subgenreCounts: Record<string, number> = {};

  for (const t of rawTemasList) {
    const realComposers = (t.temas_compositores || [])
      .map((tc) => tc.personas?.nombre)
      .filter((name): name is string => Boolean(name));
    const composer = realComposers.length > 0 ? realComposers.join(", ") : null;

    // INV-008: la voz se renderiza siempre con el nombre verificado de Personas.
    // El alias de galleta pertenece al compositor y nunca al intérprete.
    const vocalists = (t.tema_musicos || []).filter((tm) => {
      const rol = tm.roles?.nombre_rol?.toLowerCase() || "";
      const inst = tm.instrumento?.toLowerCase() || "";
      return rol.includes("voz") || inst.includes("voz");
    });
    let vocalist = vocalists
      .map((v) => v.personas?.nombre)
      .filter((name): name is string => Boolean(name))
      .join(", ");

    const isInstrumental = (t.temas_generos || []).some(
      (tg) => tg.generos?.nombre_genero?.toLowerCase() === "instrumental"
    );
    if (!vocalist && isInstrumental) {
      vocalist = "Instrumental";
    }

    const genresList = (t.temas_generos || [])
      .map((tg) => tg.generos?.nombre_genero)
      .filter((genre): genre is string => Boolean(genre));
    const genre = genresList.length > 0 ? Array.from(new Set(genresList)).join(" / ") : null;

    for (const tg of t.temas_generos || []) {
      const genreName = tg.generos?.nombre_genero;
      if (genreName) {
        subgenreCounts[genreName] = (subgenreCounts[genreName] || 0) + 1;
      }
    }

    for (const at of t.albumes_temas || []) {
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
        genre,
      });
    }
  }

  for (const albumId of Object.keys(tracksMap)) {
    tracksMap[Number(albumId)] = sortTracks(tracksMap[Number(albumId)]);
  }

  const albums: AlbumItem[] = ((rawAlbumes as unknown as RawAlbumRow[]) || []).map((a) => {
    const isSingle = a.tipos_album?.nombre_tipo === "45";
    let displayTitle = a.nombre_album;

    // Fallback de presentación: si el trigger de título canónico aún no ha
    // escrito el nombre del single, se compone a partir de sus surcos A/B.
    if (!displayTitle && isSingle) {
      const albumTracks = tracksMap[a.id_album] || [];
      const sideA = albumTracks
        .filter((t) => (t.side || "").trim().toUpperCase() === "A")
        .map((t) => t.title);
      const sideB = albumTracks
        .filter((t) => (t.side || "").trim().toUpperCase() === "B")
        .map((t) => t.title);

      if (sideA.length > 0 && sideB.length > 0) {
        displayTitle = `${sideA.join(", ")} / ${sideB.join(", ")}`;
      } else if (sideA.length > 0) {
        displayTitle = sideA.join(", ");
      } else if (sideB.length > 0) {
        displayTitle = sideB.join(", ");
      }
    }

    return {
      id: a.id_album,
      title:
        displayTitle ||
        (isSingle
          ? `Single [Cat: ${a.numero_catalogo || a.id_album}]`
          : "Sin Título Registrado"),
      artist: a.grupos?.nombre_grupo || "Varios Artistas",
      directorName: a.grupos?.personas?.nombre || null,
      year: a.año_publicacion,
      catalogNumber: a.numero_catalogo,
      label: a.sellos_discograficos?.nombre_sello || "Sello Particular",
      format: isSingle ? "45" : a.tipos_album?.nombre_tipo || "LP",
      coverUrl: a.url_portada,
      backCoverUrl: a.url_contraportada,
      isCompilation: a.es_recopilatorio ?? false,
      isVariousArtists: a.es_varios_artistas ?? false,
      isSplit: a.es_disco_split ?? false,
      isReissue: a.es_reedicion ?? false,
      includedInLp: a.incluido_en_lp ?? false,
      extractedFromLp: a.extraido_de_lp ?? false,
      onlyOn45: a.solo_en_45 ?? false,
      sidesInLp: a.lados_en_lp ?? null,
    };
  });

  return { albums, tracksMap, subgenreCounts };
});
