import React from "react";

export interface JsonLdProps {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
}

/**
 * Componente seguro para inyectar datos estructurados Schema.org (JSON-LD)
 * en Server Components de Next.js sin errores de hidratación.
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data, null, process.env.NODE_ENV === "development" ? 2 : 0),
      }}
    />
  );
}

/**
 * Convierte una duración en segundos al formato estándar ISO 8601 (ej. 195s -> "PT3M15S")
 */
export function formatDurationIso(seconds?: number | null): string | undefined {
  if (!seconds || seconds <= 0) return undefined;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `PT${mins}M${secs}S`;
}

export interface BuildAlbumJsonLdParams {
  id: number | string;
  name: string;
  artistName?: string | null;
  recordLabel?: string | null;
  catalogNumber?: string | null;
  releaseYear?: number | null;
  coverUrl?: string | null;
  description?: string | null;
  tracks?: Array<{
    id?: number | string;
    title: string;
    position?: number | null;
    durationSeconds?: number | null;
    composerName?: string | null;
    artistName?: string | null;
  }>;
}

/**
 * Genera el esquema Schema.org MusicAlbum con trackList y catálogo físico
 */
export function buildMusicAlbumJsonLd(params: BuildAlbumJsonLdParams) {
  const {
    id,
    name,
    artistName,
    recordLabel,
    catalogNumber,
    releaseYear,
    coverUrl,
    description,
    tracks = [],
  } = params;

  return {
    "@context": "https://schema.org",
    "@type": "MusicAlbum",
    "@id": `https://kumbiasound.pe/album/${id}`,
    name,
    description: description || `Álbum fonográfico histórico de la cumbia peruana: ${name} (${releaseYear || "1968-2005"}).`,
    datePublished: releaseYear ? releaseYear.toString() : undefined,
    image: coverUrl || undefined,
    catalogNumber: catalogNumber || undefined,
    ...(artistName
      ? {
          byArtist: {
            "@type": "MusicGroup",
            name: artistName,
          },
        }
      : {}),
    ...(recordLabel
      ? {
          recordLabel: {
            "@type": "Organization",
            name: recordLabel,
          },
        }
      : {}),
    ...(tracks.length > 0
      ? {
          track: {
            "@type": "ItemList",
            numberOfItems: tracks.length,
            itemListElement: tracks.map((track, idx) => ({
              "@type": "ListItem",
              position: track.position ?? idx + 1,
              item: {
                "@type": "MusicRecording",
                "@id": track.id ? `https://kumbiasound.pe/tema/${track.id}` : undefined,
                name: track.title,
                duration: formatDurationIso(track.durationSeconds),
                ...(track.artistName || artistName
                  ? {
                      byArtist: {
                        "@type": "MusicGroup",
                        name: track.artistName || artistName,
                      },
                    }
                  : {}),
                ...(track.composerName
                  ? {
                      composer: {
                        "@type": "Person",
                        name: track.composerName,
                      },
                    }
                  : {}),
              },
            })),
          },
        }
      : {}),
  };
}

export interface BuildRecordingJsonLdParams {
  id: number | string;
  title: string;
  artistName?: string | null;
  composerName?: string | null;
  durationSeconds?: number | null;
  albumName?: string | null;
  genreName?: string | null;
  bpm?: number | null;
}

/**
 * Genera el esquema Schema.org MusicRecording para temas y pistas fonográficas
 */
export function buildMusicRecordingJsonLd(params: BuildRecordingJsonLdParams) {
  const { id, title, artistName, composerName, durationSeconds, albumName, genreName } = params;

  return {
    "@context": "https://schema.org",
    "@type": "MusicRecording",
    "@id": `https://kumbiasound.pe/tema/${id}`,
    name: title,
    duration: formatDurationIso(durationSeconds),
    genre: genreName || "Cumbia Peruana",
    ...(artistName
      ? {
          byArtist: {
            "@type": "MusicGroup",
            name: artistName,
          },
        }
      : {}),
    ...(composerName
      ? {
          composer: {
            "@type": "Person",
            name: composerName,
          },
        }
      : {}),
    ...(albumName
      ? {
          inAlbum: {
            "@type": "MusicAlbum",
            name: albumName,
          },
        }
      : {}),
  };
}

export interface BuildMusicGroupJsonLdParams {
  id: number | string;
  name: string;
  foundingDate?: string | null;
  region?: string | null;
  imageUrl?: string | null;
  directorName?: string | null;
  members?: Array<{
    name: string;
    role?: string | null;
  }>;
}

/**
 * Genera el esquema Schema.org MusicGroup con directores y miembros
 */
export function buildMusicGroupJsonLd(params: BuildMusicGroupJsonLdParams) {
  const { id, name, foundingDate, region, imageUrl, directorName, members = [] } = params;

  return {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    "@id": `https://kumbiasound.pe/grupo/${id}`,
    name,
    genre: "Cumbia Peruana",
    startDate: foundingDate || undefined,
    image: imageUrl || undefined,
    ...(region
      ? {
          foundingLocation: {
            "@type": "Place",
            name: region,
          },
        }
      : {}),
    ...(directorName
      ? {
          founder: {
            "@type": "Person",
            name: directorName,
            jobTitle: "Director Musical",
          },
        }
      : {}),
    ...(members.length > 0
      ? {
          member: members.map((m) => ({
            "@type": "OrganizationRole",
            roleName: m.role || "Músico de Planta",
            member: {
              "@type": "Person",
              name: m.name,
            },
          })),
        }
      : {}),
  };
}

export interface BuildPersonJsonLdParams {
  id: number | string;
  name: string;
  pseudonym?: string | null;
  birthDate?: string | null;
  birthPlace?: string | null;
  imageUrl?: string | null;
  biography?: string | null;
  roles?: string[];
  groups?: string[];
}

/**
 * Genera el esquema Schema.org Person para músicos, guitarristas y compositores
 */
export function buildPersonJsonLd(params: BuildPersonJsonLdParams) {
  const { id, name, pseudonym, birthDate, birthPlace, imageUrl, biography, roles = [], groups = [] } = params;

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `https://kumbiasound.pe/persona/${id}`,
    name,
    alternateName: pseudonym || undefined,
    birthDate: birthDate || undefined,
    description: biography || undefined,
    image: imageUrl || undefined,
    jobTitle: roles.length > 0 ? roles.join(", ") : "Músico / Compositor de Cumbia Peruana",
    ...(birthPlace
      ? {
          birthPlace: {
            "@type": "Place",
            name: birthPlace,
          },
        }
      : {}),
    ...(groups.length > 0
      ? {
          memberOf: groups.map((grp) => ({
            "@type": "MusicGroup",
            name: grp,
          })),
        }
      : {}),
  };
}
