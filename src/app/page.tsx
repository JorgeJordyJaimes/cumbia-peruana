import { createClient } from "@/lib/supabase/server";
import {
  BrutalistCoordinator,
  BrutalistHero,
  BrutalistRadarSection,
  BrutalistGenresSection,
  BrutalistSelectedWork,
  BrutalistTriptych,
  BrutalistCatalogSection,
  BrutalistStories,
  BrutalistFooter,
} from "@/features/home-brutalism";
import type { AlbumItem } from "@/features/albumes";
import type { TrackItem } from "@/features/temas";
import type { ConfiguracionHome } from "@/types/blog";
import { JsonLd, buildMusicAlbumJsonLd } from "@/components/seo/json-ld";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface RawAlbumRow {
  id_album: number;
  nombre_album: string | null;
  numero_catalogo: string | null;
  año_publicacion: number | null;
  url_portada: string | null;
  url_contraportada: string | null;
  es_recopilatorio: boolean;
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
  musical_key: string | null;
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

export default async function Home() {
  const supabase = await createClient();

  // Carga paralela sin cascadas (elimina waterfalls) según vercel-react-best-practices
  const [
    [
      { count: totalAlbumes },
      { count: totalGrupos },
      { count: totalPersonas },
      { count: totalSellos },
    ],
    { data: rawAlbumes },
    { data: rawTemas },
    { data: rawHomeConfig },
  ] = await Promise.all([
    Promise.all([
      supabase.from("albumes").select("*", { count: "exact", head: true }),
      supabase.from("grupos").select("*", { count: "exact", head: true }),
      supabase.from("personas").select("*", { count: "exact", head: true }),
      supabase.from("sellos_discograficos").select("*", { count: "exact", head: true }),
    ]),
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
        musical_key,
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
    supabase
      .from("configuracion_home")
      .select("*")
      .eq("id", 1)
      .single(),
  ]);

  const homeConfig: ConfiguracionHome = (rawHomeConfig as unknown as ConfiguracionHome) || {
    id: 1,
    cintillo_texto: "CATÁLOGO & ARCHIVO DISCOGRÁFICO HISTÓRICO // EDICIONES DE COLECCIÓN 1968–2005",
    cintillo_activo: true,
    hero_insignia: "Archivo & Curaduría de Vinilos",
    hero_titulo: "Cumbia con Poder",
    hero_subtitulo:
      "Conectamos músicos de sesión, guitarras legendarias, sellos históricos y discografías completas. Explora el archivo o sincroniza tu set con Match BPM.",
    hero_boton_texto: "Explorar Archivo",
    hero_boton_url: "/genealogia",
    albumes_destacados_ids: [1, 2, 3],
    seccion_blog_activa: true,
    updated_at: new Date().toISOString(),
  };

  // Mapear Álbumes
  const rawAlbumsList = (rawAlbumes as unknown as RawAlbumRow[]) || [];
  const albums: AlbumItem[] = rawAlbumsList.map((a) => ({
    id: a.id_album,
    title: a.nombre_album || "Sin Título Registrado",
    artist: a.grupos?.nombre_grupo || "Varios Artistas",
    directorName: a.grupos?.personas?.nombre || null,
    year: a.año_publicacion,
    catalogNumber: a.numero_catalogo,
    label: a.sellos_discograficos?.nombre_sello || "Sello Particular",
    format: a.tipos_album?.nombre_tipo || "LP 33 RPM",
    coverUrl: a.url_portada,
    backCoverUrl: a.url_contraportada,
    isCompilation: a.es_recopilatorio,
  }));

  // Mapa de pistas por álbum para contraportadas
  const rawTemasList = (rawTemas as unknown as RawTemaRow[]) || [];
  const tracksMap: Record<number, TrackItem[]> = {};
  rawTemasList.forEach((t) => {
    // Autor real verificado
    const realComposers = (t.temas_compositores || [])
      .map((tc) => tc.personas?.nombre)
      .filter(Boolean);
    const composer = realComposers.length > 0 ? realComposers.join(", ") : null;

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

  // Generar datos estructurados Schema.org MusicAlbum para el catálogo fonográfico
  const catalogJsonLd = albums.slice(0, 15).map((a) =>
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
      {/* Schema.org MusicAlbum JSON-LD para motores de búsqueda */}
      {catalogJsonLd.length > 0 ? <JsonLd data={catalogJsonLd} /> : null}

      {/* Cintillo Superior Brutalista */}
      {homeConfig.cintillo_activo && homeConfig.cintillo_texto ? (
        <div className="border-b-2 border-[#1F1305] bg-[#F1730C] px-4 py-1.5 text-center font-mono text-[11px] font-bold text-white tracking-widest uppercase">
          <span>{homeConfig.cintillo_texto}</span>
        </div>
      ) : null}

      {/* Coordinador con TopBar, Navbar y Buscador Command-Palette (⌘K) */}
      <BrutalistCoordinator totalAlbumes={totalAlbumes} totalSellos={totalSellos}>
        <main>
          {/* HERO: Expediente Biográfico de Claudio Morán & Evidencias Cuantitativas */}
          <BrutalistHero
            totalAlbumes={totalAlbumes}
            totalGrupos={totalGrupos}
            totalSellos={totalSellos}
            totalPersonas={totalPersonas}
          />

          {/* LEGAJOS CLASIFICADOS DE INVESTIGACIÓN (EXP. 01, EXP. 02, EXP. 03) */}
          <BrutalistSelectedWork />

          {/* BÓVEDA CENTRAL DE EVIDENCIA FONOGRÁFICA (719+ Piezas en Custodia) */}
          <BrutalistCatalogSection albums={albums} tracksMap={tracksMap} />

          {/* ZONAS TERRITORIALES & MAPA DE OPERACIONES SONORAS (6 Zonas) */}
          <BrutalistGenresSection />

          {/* EVIDENCIAS DE MÁXIMA CUSTODIA: MATRICES ODEÓN / IEMPSA (Radar) */}
          <BrutalistRadarSection albums={albums} />

          {/* ACTA PATRIMONIAL, PROTOCOLO DE CUSTODIA Y NORMAS TÉCNICAS */}
          <BrutalistTriptych />

          {/* INFORMES DE CAMPO & EXPEDIENTES DE INVESTIGACIÓN FONOGRÁFICA (Blog) */}
          {homeConfig.seccion_blog_activa ? <BrutalistStories /> : null}
        </main>
      </BrutalistCoordinator>

      {/* FOOTER BRUTALISTA CON BADGE VERTICAL Y CÓDIGO DE BARRAS */}
      <BrutalistFooter />
    </div>
  );
}
