import type { Metadata } from "next";
import { getArchiveStats } from "@/lib/services/archive-stats";
import { BrutalistCoordinator, BrutalistFooter } from "@/features/home-brutalism";
import { VinilosCatalogExplorer } from "@/features/albumes";
import { getCatalogData } from "@/features/albumes/services/catalog.server";
import { JsonLd, buildMusicAlbumJsonLd } from "@/components/seo/json-ld";
import Link from "next/link";
import { ArrowLeft, Disc, Radio, Layers, Building2 } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "EXP. 01: Bóveda de Vinilos & Prensajes Originales (1968–2005) | Kumbia Sound",
  description:
    "Catálogo fonográfico y buscador de discos en vinilo de la cumbia peruana. Filtra LPs de 33 RPM y singles de 45 RPM por sellos históricos, agrupaciones y décadas.",
};

export default async function VinilosPage() {
  const [stats, catalog] = await Promise.all([getArchiveStats(), getCatalogData()]);
  const { albums, tracksMap } = catalog;

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
    <div className="relative min-h-screen bg-[#EDE0D0] brutalist-dots-light text-[#1F1305] selection:bg-[#F1730C] selection:text-[#1F1305]">
      {/* Schema.org JSON-LD para motores de búsqueda */}
      {catalogJsonLd.length > 0 ? <JsonLd data={catalogJsonLd} /> : null}

      <BrutalistCoordinator totalAlbumes={stats.totalAlbumes} totalSellos={stats.totalSellos}>
        <main id="contenido" className="container mx-auto max-w-7xl px-4 sm:px-6 pt-6 pb-20 space-y-10">
          {/* Breadcrumb / Retorno a Portada */}
          <div className="flex items-center justify-between border-b-2 border-[#1F1305] pb-4 font-mono text-xs">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-bold text-[#1F1305] hover:text-[#E80000] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>← RETORNO A EXPEDIENTE GENERAL</span>
            </Link>

            <div className="flex items-center gap-2 border-2 border-[#1F1305] bg-white px-2.5 py-1 text-[#1F1305] font-bold shadow-[2px_2px_0px_#1F1305]">
              <span className="text-[#E80000] font-black">EXP. 01 //</span>
              <span>BÓVEDA DE CUSTODIA &amp; EVIDENCIAS EN VINILO</span>
            </div>
          </div>

          {/* Banner Hero Brutalista: Bóveda de Custodia */}
          <div className="border-2 border-[#1F1305] bg-[#1F1305] brutalist-dots-dark text-[#EDE0D0] p-6 sm:p-10 shadow-[6px_6px_0px_#E80000] relative overflow-hidden font-mono">
            {/* Registro de archivo superior */}
            <div className="flex items-center justify-between text-[10px] text-[#8E8478] border-b border-[#3E2C1B] pb-2 mb-4 font-bold">
              <span>EXPEDIENTE EXP-VIN-1968/2005</span>
              <span className="text-[#E80000] font-black">LEGAJO DESCLASIFICADO</span>
              <span>FONOTECA NACIONAL</span>
            </div>

            <div className="max-w-3xl space-y-4 relative z-10">
              <div className="inline-flex items-center gap-2 border border-[#EDE0D0] bg-[#F1730C] px-3 py-0.5 text-xs font-bold text-white shadow-[2px_2px_0px_#EDE0D0]">
                <Disc className="h-3.5 w-3.5" />
                <span>ARCHIVO FÍSICO ANALÓGICO // 33 &amp; 45 RPM</span>
              </div>

              <h1 className="font-cooper text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                La Bóveda de Vinilos
              </h1>

              <p className="text-xs sm:text-sm text-[#EDE0D0]/80 leading-relaxed max-w-2xl">
                Catálogo fonográfico y preservación documental de las grabaciones de la cumbia
                peruana en soporte físico: Long Plays (33 RPM), discos singles (45 RPM) y rarezas.
                Inspecciona carátulas restauradas, sellos matrices, fechas de prensaje y créditos de sesión.
              </p>

              {/* Chips de Métricas en Vivo */}
              <div className="pt-2 flex flex-wrap gap-2.5 text-xs">
                <span className="flex items-center gap-2 border border-white/20 bg-white/10 px-3 py-1 font-bold text-[#F8C800]">
                  <Disc className="h-4 w-4 text-[#F8C800]" /> {stats.totalAlbumes > 0 ? stats.totalAlbumes.toLocaleString("es-PE") : albums.length}+ Obras Catalogadas
                </span>
                <span className="flex items-center gap-2 border border-white/20 bg-white/10 px-3 py-1 font-bold text-white">
                  <Layers className="h-4 w-4 text-[#F1730C]" /> {stats.totalLps > 0 ? stats.totalLps.toLocaleString("es-PE") : "—"} LPs (33 RPM)
                </span>
                <span className="flex items-center gap-2 border border-white/20 bg-white/10 px-3 py-1 font-bold text-white">
                  <Radio className="h-4 w-4 text-[#E80000]" /> {stats.totalSingles > 0 ? stats.totalSingles.toLocaleString("es-PE") : "—"} Singles (45 RPM)
                </span>
                <span className="flex items-center gap-2 border border-white/20 bg-white/10 px-3 py-1 font-bold text-white">
                  <Building2 className="h-4 w-4 text-[#EDE0D0]" /> {stats.totalSellos > 0 ? stats.totalSellos.toLocaleString("es-PE") : "—"} Sellos Matrices
                </span>
              </div>
            </div>

            {/* Sello de fondo en marca de agua */}
            <div className="absolute -bottom-8 -right-6 text-white/[0.03] font-anton text-[220px] font-black pointer-events-none select-none leading-none">
              EVID
            </div>
          </div>

          {/* EXPLORADOR & FILTRADOR DE VINILOS */}
          <div className="border-2 border-[#1F1305] bg-white p-4 sm:p-8 shadow-[6px_6px_0px_#1F1305]">
            <VinilosCatalogExplorer initialAlbums={albums} tracksMap={tracksMap} />
          </div>
        </main>
      </BrutalistCoordinator>

      <BrutalistFooter />
    </div>
  );
}
