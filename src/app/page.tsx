import { createClient } from "@/lib/supabase/server";
import { getArchiveStats } from "@/lib/services/archive-stats";
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
import { getCatalogData } from "@/features/albumes/services/catalog.server";
import { getPublishedArticles } from "@/features/blog/services/blog.server";
import type { ConfiguracionHome } from "@/types/blog";
import { JsonLd, buildMusicAlbumJsonLd } from "@/components/seo/json-ld";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const supabase = await createClient();

  // Carga paralela sin cascadas (elimina waterfalls) según vercel-react-best-practices
  const [stats, catalog, { data: rawHomeConfig }, articles] = await Promise.all([
    getArchiveStats(),
    getCatalogData(),
    supabase.from("configuracion_home").select("*").eq("id", 1).single(),
    getPublishedArticles(3),
  ]);

  const { albums, tracksMap, subgenreCounts } = catalog;

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
    <div className="relative min-h-screen bg-[#EDE0D0] text-[#1F1305] selection:bg-[#F1730C] selection:text-[#1F1305]">
      {/* Schema.org MusicAlbum JSON-LD para motores de búsqueda */}
      {catalogJsonLd.length > 0 ? <JsonLd data={catalogJsonLd} /> : null}

      {/* Cintillo Superior Brutalista */}
      {homeConfig.cintillo_activo && homeConfig.cintillo_texto ? (
        <div className="border-b-2 border-[#1F1305] bg-[#F1730C] px-4 py-1.5 text-center font-mono text-[11px] font-bold text-white tracking-widest uppercase">
          <span>{homeConfig.cintillo_texto}</span>
        </div>
      ) : null}

      {/* Coordinador con TopBar, Navbar y Buscador Command-Palette (⌘K) */}
      <BrutalistCoordinator totalAlbumes={stats.totalAlbumes} totalSellos={stats.totalSellos}>
        <main>
          {/* HERO: Expediente Biográfico de Claudio Morán & Evidencias Cuantitativas */}
          <BrutalistHero
            totalAlbumes={stats.totalAlbumes}
            totalGrupos={stats.totalGrupos}
            totalSellos={stats.totalSellos}
            totalPersonas={stats.totalPersonas}
          />

          {/* LEGAJOS CLASIFICADOS DE INVESTIGACIÓN (EXP. 01, EXP. 02, EXP. 03) */}
          <BrutalistSelectedWork />

          {/* BÓVEDA CENTRAL DE EVIDENCIA FONOGRÁFICA */}
          <BrutalistCatalogSection albums={albums} tracksMap={tracksMap} />

          {/* ZONAS TERRITORIALES & MAPA DE OPERACIONES SONORAS (6 Zonas) */}
          <BrutalistGenresSection genreCounts={subgenreCounts} />

          {/* EVIDENCIAS DE MÁXIMA CUSTODIA: MATRICES ODEÓN / IEMPSA (Radar) */}
          <BrutalistRadarSection albums={albums} />

          {/* ACTA PATRIMONIAL, PROTOCOLO DE CUSTODIA Y NORMAS TÉCNICAS */}
          <BrutalistTriptych />

          {/* INFORMES DE CAMPO & EXPEDIENTES DE INVESTIGACIÓN FONOGRÁFICA (Blog) */}
          {homeConfig.seccion_blog_activa ? <BrutalistStories articles={articles} /> : null}
        </main>
      </BrutalistCoordinator>

      {/* FOOTER BRUTALISTA CON BADGE VERTICAL Y CÓDIGO DE BARRAS */}
      <BrutalistFooter />
    </div>
  );
}
