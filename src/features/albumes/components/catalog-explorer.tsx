"use client";

import { useState, useMemo, useEffect, useDeferredValue } from "react";
import dynamic from "next/dynamic";
import { Search, SlidersHorizontal, Disc, Filter, Sparkles, LayoutGrid, TableProperties } from "lucide-react";
import { AlbumCard, type AlbumItem } from "@/features/albumes/components/album-card";
import { MatrixLedgerView } from "@/features/albumes/components/matrix-ledger-view";
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
  const [viewMode, setViewMode] = useState<"ledger" | "grid">("ledger");
  const [selectedFormat, setSelectedFormat] = useState<string>("ALL");
  const [selectedLabel, setSelectedLabel] = useState<string>("ALL");
  const [selectedYear, setSelectedYear] = useState<string>("ALL");
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumItem | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(48);

  // Restablecer paginación visible cuando cambie cualquier filtro
  useEffect(() => {
    setVisibleCount(48);
  }, [deferredSearchTerm, selectedFormat, selectedLabel, selectedYear]);

  // Extraer sellos únicos
  const labels = useMemo(() => {
    const set = new Set<string>();
    initialAlbums.forEach((a) => {
      if (a.label) set.add(a.label);
    });
    return Array.from(set).sort();
  }, [initialAlbums]);

  // Álbumes filtrados para el Ledger (búsqueda y década generales, facetas controladas por el sidebar)
  const ledgerFilteredAlbums = useMemo(() => {
    const query = deferredSearchTerm.trim().toLowerCase();

    return initialAlbums.filter((album) => {
      // Filtro década
      if (selectedYear !== "ALL") {
        const start = parseInt(selectedYear, 10);
        if (!album.year || album.year < start || album.year > start + 9) {
          return false;
        }
      }

      // Búsqueda de texto
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
  }, [initialAlbums, deferredSearchTerm, selectedYear]);

  // Filtrar álbumes para la vista Grid (incluyendo formato y sello de la barra superior)
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

      // 4. Búsqueda de texto
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
    <div className="space-y-6">
      {/* Barra de Búsqueda y Selector de Modo Brutalista */}
      <div className="border-2 border-[#1F1305] bg-[#EDE0D0] p-4 sm:p-5 space-y-4 shadow-[4px_4px_0px_#1F1305]">
        {/* Cabecera con Selector de Modo de Exploración */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-[#1F1305]/20 pb-3">
          <div>
            <label
              htmlFor="search-evidencia"
              className="block font-mono text-[11px] font-black uppercase tracking-widest text-[#1F1305]"
            >
              CRITERIO DE BÚSQUEDA // FOLIO, AGRUPACIÓN O TÍTULO
            </label>
            <p className="font-mono text-[10px] text-[#5A5245]">
              Consulta el acervo fonográfico por matriz de prensaje o catálogo físico
            </p>
          </div>

          {/* Switcher de Vistas: Registro Matriz vs Mosaico */}
          <div className="flex items-center gap-1.5 self-start sm:self-auto bg-white border-2 border-[#1F1305] p-1 shadow-[2px_2px_0px_#1F1305]">
            <button
              type="button"
              onClick={() => setViewMode("ledger")}
              className={`flex items-center gap-1.5 px-3 py-1 font-mono text-xs font-bold transition-all cursor-pointer ${
                viewMode === "ledger"
                  ? "bg-[#1F1305] text-[#EDE0D0] shadow-[2px_2px_0px_#E80000]"
                  : "text-[#1F1305] hover:bg-[#EDE0D0]"
              }`}
            >
              <TableProperties className="h-3.5 w-3.5" />
              <span>[ ▤ REGISTRO MATRIZ ]</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-1.5 px-3 py-1 font-mono text-xs font-bold transition-all cursor-pointer ${
                viewMode === "grid"
                  ? "bg-[#1F1305] text-[#EDE0D0] shadow-[2px_2px_0px_#E80000]"
                  : "text-[#1F1305] hover:bg-[#EDE0D0]"
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span>[ ▦ MOSAICO ]</span>
            </button>
          </div>
        </div>

        {/* Input de Búsqueda Principal */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#E80000]" />
          <input
            id="search-evidencia"
            type="text"
            placeholder="Buscar por título de álbum, agrupación (ej. Los Destellos, Juaneco), catálogo o sello..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border-2 border-[#1F1305] bg-white py-3 pl-12 pr-20 text-xs font-bold text-[#1F1305] placeholder-[#746B5C] font-mono shadow-[3px_3px_0px_#1F1305] focus:outline-none focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[5px_5px_0px_#E80000] transition-all duration-100"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 border-2 border-[#1F1305] bg-[#EDE0D0] px-2 py-0.5 font-mono text-xs font-bold text-[#1F1305] shadow-[1px_1px_0px_#1F1305] hover:bg-white cursor-pointer active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            >
              Limpiar
            </button>
          )}
        </div>

        {/* Barra secundaria de filtros (en modo mosaico o selección de época) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          {viewMode === "grid" ? (
            /* Formato Pills en modo Grid */
            <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
              <span className="text-[#1F1305] font-bold mr-1 flex items-center gap-1">
                <Disc className="h-3.5 w-3.5 text-[#E80000]" /> Formato:
              </span>
              {[
                { id: "ALL", label: "Todos" },
                { id: "45", label: "45" },
                { id: "LP", label: "LP" },
                { id: "EP", label: "EP" },
                { id: "CASETE", label: "Cassete" },
                { id: "CD", label: "CD" },
              ].map((f) => (
                <button
                  key={f.id}
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
          ) : (
            /* Indicador en modo Ledger */
            <div className="font-mono text-xs text-[#5A5245] flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 bg-[#E80000]"></span>
              <span className="font-bold text-[#1F1305]">MODO MATRIZ:</span> Usa las facetas laterales para aislar por soporte físico, sello y fotos.
            </div>
          )}

          {/* Sello y Década Selects */}
          <div className="flex flex-wrap items-center gap-2">
            {viewMode === "grid" && (
              <div className="relative">
                <select
                  value={selectedLabel}
                  onChange={(e) => setSelectedLabel(e.target.value)}
                  aria-label="Filtrar por Sello Discográfico"
                  className="appearance-none border-2 border-[#1F1305] bg-white px-3 py-1.5 pr-8 font-mono text-xs font-bold text-[#1F1305] shadow-[2px_2px_0px_#1F1305] focus:outline-none focus:border-[#E80000]"
                >
                  <option value="ALL">Todos los Sellos ({labels.length})</option>
                  {labels.slice(0, 30).map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
                <Filter className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-[#1F1305]" />
              </div>
            )}

            {/* Selector Década */}
            <div className="relative">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                aria-label="Filtrar por Época o Década"
                className="appearance-none border-2 border-[#1F1305] bg-white px-3 py-1.5 pr-8 font-mono text-xs font-bold text-[#1F1305] shadow-[2px_2px_0px_#1F1305] focus:outline-none focus:border-[#E80000]"
              >
                {DECADES.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
              <SlidersHorizontal className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-[#1F1305]" />
            </div>
          </div>
        </div>
      </div>

      {/* Renderizado según la vista seleccionada */}
      {viewMode === "ledger" ? (
        <MatrixLedgerView
          albums={ledgerFilteredAlbums}
          tracksMap={tracksMap}
          onSelectAlbum={(a) => setSelectedAlbum(a)}
        />
      ) : (
        /* Vista Mosaico Tradicional */
        <div className="space-y-6">
          {/* Resumen de Resultados */}
          <div className="flex items-center justify-between font-mono text-xs text-[#5A5245] font-bold px-1">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#E80000]" />
              <span>
                Mostrando <strong className="text-[#1F1305]">{Math.min(visibleCount, filteredAlbums.length)}</strong> de{" "}
                <strong className="text-[#1F1305]">{filteredAlbums.length}</strong> producciones físicas
              </span>
            </div>
            <span className="hidden sm:inline">
              Pasa el cursor sobre la carátula para revelar los datos técnicos
            </span>
          </div>

          {filteredAlbums.length === 0 ? (
            <div className="border-2 border-[#1F1305] bg-white py-14 px-6 text-center shadow-[6px_6px_0px_#1F1305] max-w-2xl mx-auto relative overflow-hidden">
              <div className="inline-block border-2 border-[#E80000] bg-[#E80000] text-white px-3 py-1 font-mono text-xs font-black uppercase rotate-[-2deg] shadow-[2px_2px_0px_#1F1305] mb-4">
                EXPEDIENTE NO LOCALIZADO // 404 MATRIZ
              </div>
              <Disc className="mx-auto h-12 w-12 text-[#F1730C] mb-3" />
              <h3 className="font-cooper text-xl text-[#1F1305]">
                No se encontraron producciones discográficas
              </h3>
              <p className="font-mono text-xs text-[#5A5245] mt-2 max-w-md mx-auto leading-relaxed">
                No existen registros en el archivo histórico que coincidan con los criterios seleccionados.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedFormat("ALL");
                  setSelectedLabel("ALL");
                  setSelectedYear("ALL");
                }}
                className="mt-6 inline-flex items-center gap-2 border-2 border-[#1F1305] bg-[#E80000] px-5 py-2.5 font-mono text-xs font-bold text-white shadow-[3px_3px_0px_#1F1305] hover:bg-[#1F1305] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#E80000] transition-all cursor-pointer"
              >
                [ REINICIAR CRITERIOS ]
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {filteredAlbums.slice(0, visibleCount).map((album) => (
                  <AlbumCard
                    key={album.id}
                    album={album}
                    onSelect={(a) => setSelectedAlbum(a)}
                  />
                ))}
              </div>

              {filteredAlbums.length > visibleCount && (
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setVisibleCount((prev) => prev + 48)}
                    className="inline-flex items-center gap-2 border-2 border-[#1F1305] bg-[#E80000] px-6 py-3.5 font-mono text-xs font-bold text-white shadow-[4px_4px_0px_#1F1305] hover:bg-[#1F1305] hover:text-[#EDE0D0] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#1F1305] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
                  >
                    <Disc className="h-4 w-4" />
                    <span>CARGAR MÁS PRODUCCIONES (+48)</span>
                    <span className="border border-[#1F1305] bg-[#EDE0D0] text-[#1F1305] px-2 py-0.5 text-[11px] font-mono font-bold">
                      {Math.min(visibleCount, filteredAlbums.length)} / {filteredAlbums.length}
                    </span>
                  </button>
                </div>
              )}
            </div>
          )}
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
