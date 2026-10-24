"use client";

import { useState, useMemo, useEffect, useDeferredValue } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Search, SlidersHorizontal, Disc, Filter, Sparkles, Layers, LayoutGrid, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { AlbumCard, type AlbumItem } from "@/features/albumes/components/album-card";
import { CrateDiggerView } from "@/features/albumes/components/crate-digger-view";
import type { TrackItem } from "@/features/temas/components/tracklist-table";

// Lazy-load del modal de detalle fonográfico (bundle-dynamic-imports)
const AlbumDetailModal = dynamic(
  () => import("@/features/albumes/components/album-detail-modal").then((m) => m.AlbumDetailModal),
  { ssr: false }
);

// Hoist de constantes estáticas fuera del componente (server-hoist-static-io)
const DECADES = [
  { label: "Todas las Décadas", value: "ALL" },
  { label: "1960s (Inicios Psicodélicos)", value: "1960" },
  { label: "1970s (Época de Oro / Chicha)", value: "1970" },
  { label: "1980s (Auge Masivo & Casetes)", value: "1980" },
  { label: "1990s - 2000s (Tecnocumbia)", value: "1990" },
] as const;

interface CatalogExplorerProps {
  initialAlbums: AlbumItem[];
  tracksMap?: Record<number, TrackItem[]>;
}

export function CatalogExplorer({ initialAlbums, tracksMap = {} }: CatalogExplorerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const deferredSearchTerm = useDeferredValue(searchTerm);
  const [selectedFormat, setSelectedFormat] = useState<string>("ALL");
  const [selectedLabel, setSelectedLabel] = useState<string>("ALL");
  const [selectedYear, setSelectedYear] = useState<string>("ALL");
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumItem | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(24);
  const [viewMode, setViewMode] = useState<"crate" | "grid">("crate");

  // Conteo de formatos dinámico
  const formatCounts = useMemo(() => {
    let lp = 0;
    let fortyFive = 0;
    let ep = 0;
    let casete = 0;
    let cd = 0;

    initialAlbums.forEach((a) => {
      const f = (a.format || "").toLowerCase();
      if (f.includes("lp")) lp++;
      if (f.includes("45") || f.includes("single")) fortyFive++;
      if (f.includes("ep")) ep++;
      if (f.includes("caset") || f.includes("cassette")) casete++;
      if (f.includes("cd")) cd++;
    });

    return {
      ALL: initialAlbums.length,
      LP: lp,
      "45": fortyFive,
      EP: ep,
      CASETE: casete,
      CD: cd,
    };
  }, [initialAlbums]);

  // Restablecer paginación visible cuando cambie cualquier filtro
  useEffect(() => {
    setVisibleCount(24);
  }, [deferredSearchTerm, selectedFormat, selectedLabel, selectedYear]);

  // Extraer sellos únicos
  const labels = useMemo(() => {
    const set = new Set<string>();
    initialAlbums.forEach((a) => {
      if (a.label) set.add(a.label);
    });
    return Array.from(set).sort();
  }, [initialAlbums]);

  // Filtrar álbumes
  const filteredAlbums = useMemo(() => {
    const query = deferredSearchTerm.trim().toLowerCase();

    return initialAlbums.filter((album) => {
      // 1. Filtro rápido de formato
      if (selectedFormat !== "ALL") {
        if (selectedFormat === "LP" && !album.format?.toLowerCase().includes("lp")) return false;
        if (
          selectedFormat === "45" &&
          !album.format?.toLowerCase().includes("45") &&
          !album.format?.toLowerCase().includes("single")
        )
          return false;
        if (selectedFormat === "EP" && !album.format?.toLowerCase().includes("ep")) return false;
        if (
          selectedFormat === "CASETE" &&
          !album.format?.toLowerCase().includes("caset") &&
          !album.format?.toLowerCase().includes("cassette")
        )
          return false;
        if (selectedFormat === "CD" && !album.format?.toLowerCase().includes("cd")) return false;
      }

      // 2. Filtro rápido de sello
      if (selectedLabel !== "ALL" && album.label !== selectedLabel) {
        return false;
      }

      // 3. Filtro rápido de década
      if (selectedYear !== "ALL") {
        const start = parseInt(selectedYear, 10);
        if (!album.year || album.year < start || album.year > start + 9) {
          return false;
        }
      }

      // 4. Búsqueda de texto (solo evaluada si pasa los filtros previos)
      if (query) {
        const matchTitle = album.title.toLowerCase().includes(query);
        const matchArtist = album.artist.toLowerCase().includes(query);
        const matchCat = album.catalogNumber?.toLowerCase().includes(query);
        const matchLabel = album.label?.toLowerCase().includes(query);
        if (!matchTitle && !matchArtist && !matchCat && !matchLabel) {
          return false;
        }
      }

      return true;
    });
  }, [initialAlbums, deferredSearchTerm, selectedFormat, selectedLabel, selectedYear]);

  return (
    <div className="space-y-8">
      {/* Barra de Búsqueda y Filtros Brutalista */}
      <div className="border-2 border-[#1F1305] bg-[#EDE0D0] p-4 sm:p-6 space-y-4 shadow-[4px_4px_0px_#1F1305]">
        {/* Input de Búsqueda Principal */}
        <div className="relative">
          <label htmlFor="search-evidencia" className="block font-mono text-[11px] font-black uppercase tracking-widest text-[#1F1305] mb-1">
            CRITERIO DE BÚSQUEDA // FOLIO, AGRUPACIÓN O TÍTULO
          </label>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#E80000]" />
            <input
              id="search-evidencia"
              type="text"
              placeholder="Buscar por título de álbum, agrupación o folio (ej: Cumbia del Desierto, Mirlos, Infopesa)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border-2 border-[#1F1305] bg-white py-3.5 pl-12 pr-4 text-xs font-bold text-[#1F1305] placeholder-[#746B5C] font-mono shadow-[3px_3px_0px_#1F1305] focus:outline-none focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[5px_5px_0px_#E80000] transition-all duration-100"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 border-2 border-[#1F1305] bg-[#EDE0D0] px-2 py-0.5 font-mono text-xs font-bold text-[#1F1305] shadow-[1px_1px_0px_#1F1305] hover:bg-white cursor-pointer active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              >
                Limpiar
              </button>
            )}
          </div>
        </div>

        {/* Filtros Rápidos (Formatos, Sellos, Década) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          {/* Formato Pills con conteo */}
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
            <span className="text-[#1F1305] font-bold mr-1 flex items-center gap-1">
              <Disc className="h-3.5 w-3.5 text-[#E80000]" /> Formato:
            </span>
            {[
              { id: "ALL", label: `TODOS (${formatCounts.ALL})` },
              { id: "LP", label: `LP (${formatCounts.LP})` },
              { id: "45", label: `45 (${formatCounts["45"]})` },
              { id: "EP", label: `EP (${formatCounts.EP})` },
              { id: "CASETE", label: `CASSETE (${formatCounts.CASETE})` },
              { id: "CD", label: `CD (${formatCounts.CD})` },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setSelectedFormat(f.id)}
                className={`border-2 border-[#1F1305] px-3 py-1 font-bold transition-all cursor-pointer ${
                  selectedFormat === f.id
                    ? "bg-[#1F1305] text-[#EDE0D0] shadow-[2px_2px_0px_#E80000]"
                    : "bg-white text-[#1F1305] shadow-[2px_2px_0px_#1F1305] hover:bg-[#EDE0D0]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Sello y Década Selects */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Selector Sello */}
            <div className="relative">
              <select
                value={selectedLabel}
                onChange={(e) => setSelectedLabel(e.target.value)}
                aria-label="Filtrar por Sello Discográfico"
                className="appearance-none border-2 border-[#1F1305] bg-white px-3 py-1.5 pr-8 font-mono text-xs font-bold text-[#1F1305] shadow-[2px_2px_0px_#1F1305] focus:outline-none focus:border-[#E80000] cursor-pointer"
              >
                <option value="ALL">TODOS LOS SELLOS ({labels.length})</option>
                {labels.slice(0, 40).map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
              <Filter className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-[#1F1305]" />
            </div>

            {/* Selector Década */}
            <div className="relative">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                aria-label="Filtrar por Época o Década"
                className="appearance-none border-2 border-[#1F1305] bg-white px-3 py-1.5 pr-8 font-mono text-xs font-bold text-[#1F1305] shadow-[2px_2px_0px_#1F1305] focus:outline-none focus:border-[#E80000] cursor-pointer"
              >
                {DECADES.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label.toUpperCase()}
                  </option>
                ))}
              </select>
              <SlidersHorizontal className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-[#1F1305]" />
            </div>
          </div>
        </div>
      </div>

      {/* Resumen de Resultados y Conmutador de Vistas */}
      <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-[#5A5245] font-bold px-1">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[#E80000]" />
          <span>
            ENCONTRADAS EN GAVETA: <strong className="text-[#1F1305]">{filteredAlbums.length}</strong> PRODUCCIONES
          </span>
        </div>

        {/* Selector de Modo: Gaveta Crate vs Mosaico */}
        <div className="flex items-center gap-1.5 border-2 border-[#1F1305] bg-white p-0.5 shadow-[2px_2px_0px_#1F1305]">
          <button
            type="button"
            onClick={() => setViewMode("crate")}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1 font-mono text-xs font-bold transition-all cursor-pointer",
              viewMode === "crate"
                ? "bg-[#1F1305] text-[#EDE0D0] shadow-[1px_1px_0px_#E80000]"
                : "text-[#1F1305] hover:bg-[#EDE0D0]"
            )}
            title="Vista física de gaveta de vinilos (Crate Digging 3D)"
          >
            <Layers className="h-3.5 w-3.5 text-[#E80000]" />
            <span>GAVETA CRATE</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode("grid")}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1 font-mono text-xs font-bold transition-all cursor-pointer",
              viewMode === "grid"
                ? "bg-[#1F1305] text-[#EDE0D0] shadow-[1px_1px_0px_#E80000]"
                : "text-[#1F1305] hover:bg-[#EDE0D0]"
            )}
            title="Vista tradicional de cuadrícula completa"
          >
            <LayoutGrid className="h-3.5 w-3.5 text-[#E80000]" />
            <span>MOSAICO</span>
          </button>
        </div>
      </div>

      {/* Contenido según Resultados */}
      {filteredAlbums.length === 0 ? (
        <div className="border-2 border-[#1F1305] bg-white py-14 px-6 text-center shadow-[6px_6px_0px_#1F1305] max-w-2xl mx-auto relative overflow-hidden font-mono">
          <div className="inline-block border-2 border-[#E80000] bg-[#E80000] text-white px-3 py-1 text-xs font-black uppercase rotate-[-2deg] shadow-[2px_2px_0px_#1F1305] mb-4">
            EXPEDIENTE NO LOCALIZADO // 404 MATRIZ
          </div>
          <Disc className="mx-auto h-12 w-12 text-[#F1730C] mb-3" />
          <h3 className="font-cooper text-xl text-[#1F1305]">
            {selectedFormat === "EP"
              ? "No hay producciones en formato EP catalogadas aún"
              : selectedFormat === "CASETE"
              ? "No hay producciones en formato Cassete catalogadas aún"
              : selectedFormat === "CD"
              ? "No hay producciones en formato CD catalogadas aún"
              : "No se encontraron producciones discográficas"}
          </h3>
          <p className="text-xs text-[#5A5245] mt-2 max-w-md mx-auto leading-relaxed">
            {selectedFormat === "EP" || selectedFormat === "CASETE" || selectedFormat === "CD"
              ? "Este formato se encuentra en etapa de investigación e ingreso patrimonial desde los archivos físicos oficiales. Solo se despliega información real y verificada."
              : "No existen registros en el archivo histórico que coincidan exactamente con los criterios de búsqueda o filtros aplicados."}
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchTerm("");
              setSelectedFormat("ALL");
              setSelectedLabel("ALL");
              setSelectedYear("ALL");
            }}
            className="mt-6 inline-flex items-center gap-2 border-2 border-[#1F1305] bg-[#E80000] px-5 py-2.5 text-xs font-bold text-white shadow-[3px_3px_0px_#1F1305] hover:bg-[#1F1305] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#E80000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#1F1305] transition-all cursor-pointer"
          >
            [ REINICIAR CRITERIOS DE PERITAJE ]
          </button>
        </div>
      ) : viewMode === "crate" ? (
        /* VISTA 1: CRATE DIGGER (GAVETA DE VINILOS TÁCTIL 3D) */
        <CrateDiggerView
          albums={filteredAlbums}
          tracksMap={tracksMap}
          onSelectAlbum={(a) => setSelectedAlbum(a)}
        />
      ) : (
        /* VISTA 2: CUADRÍCULA / MOSAICO COMPACTO CON PAGINACIÓN */
        <div className="space-y-8 font-mono">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {filteredAlbums.slice(0, visibleCount).map((album) => (
              <AlbumCard
                key={album.id}
                album={album}
                onSelect={(a) => setSelectedAlbum(a)}
              />
            ))}
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            {filteredAlbums.length > visibleCount && (
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + 24)}
                className="inline-flex items-center gap-2 border-2 border-[#1F1305] bg-[#EDE0D0] px-5 py-3 font-mono text-xs font-bold text-[#1F1305] shadow-[3px_3px_0px_#1F1305] hover:bg-white hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#1F1305] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
              >
                <Disc className="h-4 w-4 text-[#E80000]" />
                <span>CARGAR MÁS PRODUCCIONES (+24)</span>
                <span className="border border-[#1F1305] bg-white text-[#1F1305] px-2 py-0.5 text-[11px] font-mono font-bold">
                  {Math.min(visibleCount, filteredAlbums.length)} / {filteredAlbums.length}
                </span>
              </button>
            )}

            <Link
              href="/vinilos"
              className="inline-flex items-center gap-2 border-2 border-[#1F1305] bg-[#E80000] px-6 py-3 font-mono text-xs font-bold text-white shadow-[4px_4px_0px_#1F1305] hover:bg-[#1F1305] hover:text-[#EDE0D0] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#1F1305] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
            >
              <span>ABRIR CATÁLOGO COMPLETO Y LÍNEA DE TIEMPO (EXP. 06)</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}

      {/* Modal con Ficha Técnica y Tracklist (renderizado condicional explícito) */}
      {selectedAlbum ? (
        <AlbumDetailModal
          album={selectedAlbum}
          tracks={tracksMap[selectedAlbum.id] || []}
          onClose={() => setSelectedAlbum(null)}
        />
      ) : null}
    </div>
  );
}
