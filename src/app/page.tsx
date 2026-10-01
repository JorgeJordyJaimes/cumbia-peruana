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

export const revalidate = 60; // Regenerar cada 60 segundos

interface RawAlbumRow {
  id_album: number;
  nombre_album: string | null;
  numero_catalogo: string | null;
  año_publicacion: number | null;
  url_portada: string | null;
  es_recopilatorio: boolean;
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
    albumes: { nombre_album: string | null; año_publicacion: number | null } | null;
  }> | null;
  temas_grupos: Array<{
    grupos: { nombre_grupo: string } | null;
  }> | null;
  temas_compositores: Array<{
    personas: { nombre: string; apodo: string | null } | null;
  }> | null;
}

export default async function Home() {
  const supabase = await createClient();

  // 1. Estadísticas en vivo desde Supabase
  const [
    { count: totalAlbumes },
    { count: totalGrupos },
    { count: totalPersonas },
    { count: totalSellos },
  ] = await Promise.all([
    supabase.from("albumes").select("*", { count: "exact", head: true }),
    supabase.from("grupos").select("*", { count: "exact", head: true }),
    supabase.from("personas").select("*", { count: "exact", head: true }),
    supabase.from("sellos_discograficos").select("*", { count: "exact", head: true }),
  ]);

  // 2. Álbumes del catálogo físico
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
    .limit(140);

  // 3. Temas con especificaciones DJ
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
        lado,
        albumes (nombre_album, año_publicacion)
      ),
      temas_grupos (
        grupos (nombre_grupo)
      ),
      temas_compositores (
        personas (nombre, apodo)
      )
    `)
    .not("bpm", "is", null);

  // 4. Configuración del Home
  const { data: rawHomeConfig } = await supabase
    .from("configuracion_home")
    .select("*")
    .eq("id", 1)
    .single();

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
    year: a.año_publicacion,
    catalogNumber: a.numero_catalogo,
    label: a.sellos_discograficos?.nombre_sello || "Sello Particular",
    format: a.tipos_album?.nombre_tipo || "LP 33 RPM",
    coverUrl: a.url_portada,
    isCompilation: a.es_recopilatorio,
  }));

  // Mapa de pistas por álbum para contraportadas
  const rawTemasList = (rawTemas as unknown as RawTemaRow[]) || [];
  const tracksMap: Record<number, TrackItem[]> = {};
  rawTemasList.forEach((t) => {
    const composer = t.temas_compositores?.[0]?.personas?.nombre;
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
        bpm: t.bpm,
        camelot: t.camelot_code,
        musicalKey: t.musical_key,
      });
    });
  });

  return (
    <div className="relative min-h-screen bg-[#EDE0D0] text-[#1F1305] selection:bg-[#F1730C] selection:text-white">
      {/* Cintillo Superior Brutalista */}
      {homeConfig.cintillo_activo && homeConfig.cintillo_texto && (
        <div className="border-b-2 border-[#1F1305] bg-[#F1730C] px-4 py-1.5 text-center font-mono text-[11px] font-bold text-white tracking-widest uppercase">
          <span>{homeConfig.cintillo_texto}</span>
        </div>
      )}

      {/* Coordinador con TopBar, Navbar y Buscador Command-Palette (⌘K) */}
      <BrutalistCoordinator totalAlbumes={totalAlbumes} totalSellos={totalSellos}>
        <main>
          {/* HERO SECTION: Titular Gigante Anton + Foto Recortada con Forma Geométrica y Crosshair */}
          <BrutalistHero
            totalAlbumes={totalAlbumes}
            totalGrupos={totalGrupos}
            totalSellos={totalSellos}
            totalPersonas={totalPersonas}
          />

          {/* EL RADAR SONORO: JOYAS FUNDACIONALES EN VINILO (FORMATO 3 PRENSAJES) */}
          <BrutalistRadarSection albums={albums} />

          {/* BIBLIOTECA DE GÉNEROS & VERTIENTES (6 SUBGÉNEROS DE LA CUMBIA PERUANA) */}
          <BrutalistGenresSection />

          {/* APARTADOS DESTACADOS: Banda Horizontal Oscura con Tarjetas a Genealogía, Match BPM y Radar */}
          <BrutalistSelectedWork />

          {/* TRÍPTICO BRUTALISTA: Herramientas (1-6) + Bloque Naranja Manifiesto + Registro Técnico */}
          <BrutalistTriptych />

          {/* CRÓNICAS & INVESTIGACIÓN: Historias de Fondo con estética editorial */}
          {homeConfig.seccion_blog_activa && <BrutalistStories />}

          {/* BÓVEDA DISCOGRÁFICA COMPLETA DE SOPORTE FÍSICO */}
          <BrutalistCatalogSection albums={albums} tracksMap={tracksMap} />
        </main>
      </BrutalistCoordinator>

      {/* FOOTER BRUTALISTA CON BADGE VERTICAL Y CÓDIGO DE BARRAS */}
      <BrutalistFooter />
    </div>
  );
}
