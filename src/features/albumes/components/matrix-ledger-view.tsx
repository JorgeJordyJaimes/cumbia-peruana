"use client";

import { useState, useMemo, memo } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { BadgeFormat } from "@/components/ui/badge-format";
import type { AlbumItem } from "@/features/albumes/components/album-card";
import type { TrackItem } from "@/features/temas/components/tracklist-table";
import {
  Disc,
  Disc3,
  Filter,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  Layers,
  Sparkles,
  ExternalLink,
  Search,
  Eye,
  SlidersHorizontal,
  X,
} from "lucide-react";

interface MatrixLedgerViewProps {
  albums: AlbumItem[];
  tracksMap?: Record<number, TrackItem[]>;
  onSelectAlbum?: (album: AlbumItem) => void;
  className?: string;
}

type SortField = "id" | "year" | "title" | "artist" | "label" | "catalogNumber";
type SortOrder = "asc" | "desc";

export function MatrixLedgerViewComponent({
  albums,
  tracksMap = {},
  onSelectAlbum,
  className,
}: MatrixLedgerViewProps) {
  // Estado de ordenación de la tabla
  const [sortField, setSortField] = useState<SortField>("id");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  // Estado de popover flotante en hover
  const [hoveredAlbum, setHoveredAlbum] = useState<{
    album: AlbumItem;
    x: number;
    y: number;
  } | null>(null);

  // Filtros internos del Ledger Sidebar
  const [sidebarFormat, setSidebarFormat] = useState<string>("ALL");
  const [sidebarLabel, setSidebarLabel] = useState<string>("ALL");
  const [sidebarPhotoOnly, setSidebarPhotoOnly] = useState<boolean>(false);
  const [labelSearch, setLabelSearch] = useState<string>("");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Conteo dinámico de sellos fonográficos para el sidebar
  const labelCounts = useMemo(() => {
    const map = new Map<string, number>();
    albums.forEach((a) => {
      if (a.label) {
        map.set(a.label, (map.get(a.label) || 0) + 1);
      }
    });
    return Array.from(map.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [albums]);

  // Sellos filtrados en el cajetín de búsqueda del sidebar
  const filteredLabels = useMemo(() => {
    if (!labelSearch.trim()) return labelCounts.slice(0, 15);
    const q = labelSearch.toLowerCase();
    return labelCounts.filter((l) => l.name.toLowerCase().includes(q)).slice(0, 20);
  }, [labelCounts, labelSearch]);

  // Conteo de formatos
  const formatCounts = useMemo(() => {
    const counts = { total: albums.length, "45": 0, lp: 0, ep: 0, casete: 0, cd: 0 };
    albums.forEach((a) => {
      const f = (a.format || "").toLowerCase();
      if (f.includes("45") || f.includes("single")) counts["45"]++;
      else if (f.includes("lp")) counts.lp++;
      else if (f.includes("ep")) counts.ep++;
      else if (f.includes("caset") || f.includes("cassette")) counts.casete++;
      else if (f.includes("cd")) counts.cd++;
    });
    return counts;
  }, [albums]);

  // Aplicar filtros facetados del Sidebar
  const filteredLedgerAlbums = useMemo(() => {
    return albums.filter((album) => {
      // Filtro formato
      if (sidebarFormat !== "ALL") {
        const f = (album.format || "").toLowerCase();
        if (sidebarFormat === "45" && !(f.includes("45") || f.includes("single"))) return false;
        if (sidebarFormat === "LP" && !f.includes("lp")) return false;
        if (sidebarFormat === "EP" && !f.includes("ep")) return false;
        if (sidebarFormat === "CASETE" && !(f.includes("caset") || f.includes("cassette"))) return false;
        if (sidebarFormat === "CD" && !f.includes("cd")) return false;
      }

      // Filtro sello
      if (sidebarLabel !== "ALL" && album.label !== sidebarLabel) {
        return false;
      }

      // Filtro con foto
      if (sidebarPhotoOnly && !album.coverUrl) {
        return false;
      }

      return true;
    });
  }, [albums, sidebarFormat, sidebarLabel, sidebarPhotoOnly]);

  // Ordenación de la tabla
  const sortedAlbums = useMemo(() => {
    return [...filteredLedgerAlbums].sort((a, b) => {
      let comparison = 0;
      if (sortField === "id") {
        comparison = a.id - b.id;
      } else if (sortField === "year") {
        comparison = (a.year || 0) - (b.year || 0);
      } else if (sortField === "title") {
        comparison = a.title.localeCompare(b.title);
      } else if (sortField === "artist") {
        comparison = a.artist.localeCompare(b.artist);
      } else if (sortField === "label") {
        comparison = (a.label || "").localeCompare(b.label || "");
      } else if (sortField === "catalogNumber") {
        comparison = (a.catalogNumber || "").localeCompare(b.catalogNumber || "");
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });
  }, [filteredLedgerAlbums, sortField, sortOrder]);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const renderSortIndicator = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="h-3 w-3 opacity-30 group-hover:opacity-100" />;
    }
    return sortOrder === "asc" ? (
      <ArrowUp className="h-3 w-3 text-[#E80000]" />
    ) : (
      <ArrowDown className="h-3 w-3 text-[#E80000]" />
    );
  };

  const resetSidebarFilters = () => {
    setSidebarFormat("ALL");
    setSidebarLabel("ALL");
    setSidebarPhotoOnly(false);
    setLabelSearch("");
  };

  const hasActiveSidebarFilters =
    sidebarFormat !== "ALL" || sidebarLabel !== "ALL" || sidebarPhotoOnly;

  return (
    <div className={cn("space-y-4 font-mono select-none", className)}>
      {/* Botón flotante para abrir filtros en móvil */}
      <div className="lg:hidden flex justify-between items-center bg-[#EDE0D0] p-2.5 border-2 border-[#1F1305] shadow-[3px_3px_0px_#1F1305]">
        <span className="text-xs font-black text-[#1F1305] flex items-center gap-1.5">
          <Filter className="h-4 w-4 text-[#E80000]" />
          FACETAS DEL REGISTRO
        </span>
        <button
          type="button"
          onClick={() => setIsMobileSidebarOpen(true)}
          className="border-2 border-[#1F1305] bg-white px-3 py-1 text-xs font-bold text-[#1F1305] shadow-[2px_2px_0px_#1F1305] active:translate-x-0.5 active:translate-y-0.5"
        >
          Filtrar Catálogo ({sortedAlbums.length})
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ============================================================== */}
        {/* SIDEBAR FACETADO PERSISTENTE (3 de 12 col en desktop) */}
        {/* ============================================================== */}
        <div
          className={cn(
            "lg:col-span-3 border-2 border-[#1F1305] bg-[#EDE0D0] p-4 shadow-[4px_4px_0px_#1F1305] space-y-5",
            "lg:block",
            isMobileSidebarOpen
              ? "fixed inset-x-4 top-20 z-50 max-h-[80vh] overflow-y-auto bg-[#EDE0D0] shadow-2xl block"
              : "hidden"
          )}
        >
          {/* Cabecera del Sidebar */}
          <div className="flex items-center justify-between border-b-2 border-[#1F1305] pb-2">
            <div className="flex items-center gap-1.5 text-xs font-black text-[#1F1305]">
              <SlidersHorizontal className="h-4 w-4 text-[#E80000]" />
              <span>FACETAS DE CUSTODIA</span>
            </div>
            <div className="flex items-center gap-2">
              {hasActiveSidebarFilters && (
                <button
                  type="button"
                  onClick={resetSidebarFilters}
                  title="Restablecer facetas"
                  className="text-[10px] text-[#E80000] font-black underline hover:text-[#1F1305] cursor-pointer"
                >
                  Limpiar
                </button>
              )}
              {isMobileSidebarOpen && (
                <button
                  type="button"
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="lg:hidden text-[#1F1305]"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* FACETA 1: FORMATO FÍSICO */}
          <div className="space-y-2 text-xs">
            <span className="text-[10px] font-black uppercase text-[#5A5245] tracking-widest block">
              SOPORTE FÍSICO
            </span>
            <div className="space-y-1">
              {[
                { id: "ALL", label: `Todos los Soportes (${formatCounts.total})` },
                { id: "45", label: `Singles 45 RPM (${formatCounts["45"]})` },
                { id: "LP", label: `LPs 33 RPM (${formatCounts.lp})` },
                { id: "EP", label: `EPs (${formatCounts.ep})` },
                { id: "CASETE", label: `Casetes (${formatCounts.casete})` },
                { id: "CD", label: `Compact Discs (${formatCounts.cd})` },
              ].map((f) => {
                const isSelected = sidebarFormat === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setSidebarFormat(f.id)}
                    className={cn(
                      "w-full text-left px-2 py-1 border transition-all flex items-center justify-between cursor-pointer",
                      isSelected
                        ? "border-[#1F1305] bg-[#1F1305] text-[#EDE0D0] font-bold shadow-[2px_2px_0px_#E80000]"
                        : "border-transparent bg-white/50 text-[#1F1305] hover:bg-white hover:border-[#1F1305]"
                    )}
                  >
                    <span className="truncate">{f.label}</span>
                    {isSelected && <span className="text-[#E80000] font-black text-xs">●</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* FACETA 2: SELLOS DISCOGRÁFICOS */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase text-[#5A5245] tracking-widest">
                SELLO FONOGRÁFICO
              </span>
              <span className="text-[10px] text-[#5A5245] font-bold">
                {labelCounts.length} sellos
              </span>
            </div>

            {/* Micro buscador de sellos */}
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-[#5A5245]" />
              <input
                type="text"
                placeholder="Filtrar sello..."
                value={labelSearch}
                onChange={(e) => setLabelSearch(e.target.value)}
                className="w-full border border-[#1F1305] bg-white py-1 pl-7 pr-2 text-[11px] font-mono font-bold text-[#1F1305] placeholder-[#8C7E72] focus:outline-none focus:border-[#E80000]"
              />
            </div>

            {/* Lista de sellos con checkboxes */}
            <div className="max-h-48 overflow-y-auto space-y-1 pr-1 border border-[#1F1305] bg-white/40 p-1.5 scrollbar-thin scrollbar-thumb-[#1F1305]">
              <button
                type="button"
                onClick={() => setSidebarLabel("ALL")}
                className={cn(
                  "w-full text-left px-2 py-1 text-[11px] flex items-center justify-between cursor-pointer border",
                  sidebarLabel === "ALL"
                    ? "border-[#1F1305] bg-[#1F1305] text-white font-bold"
                    : "border-transparent text-[#1F1305] hover:bg-white"
                )}
              >
                <span>[ TODOS LOS SELLOS ]</span>
              </button>

              {filteredLabels.map((l) => {
                const isSelected = sidebarLabel === l.name;
                return (
                  <button
                    key={l.name}
                    type="button"
                    onClick={() => setSidebarLabel(isSelected ? "ALL" : l.name)}
                    className={cn(
                      "w-full text-left px-2 py-0.5 text-[11px] flex items-center justify-between cursor-pointer border transition-colors",
                      isSelected
                        ? "border-[#1F1305] bg-[#E80000] text-white font-bold shadow-[1px_1px_0px_#1F1305]"
                        : "border-transparent text-[#1F1305] hover:bg-white hover:border-[#1F1305]"
                    )}
                  >
                    <span className="truncate max-w-[170px]">{l.name}</span>
                    <span className="text-[10px] opacity-80 shrink-0 font-mono">({l.count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* FACETA 3: ESTADO GRÁFICO */}
          <div className="space-y-2 text-xs pt-1 border-t border-[#1F1305]">
            <span className="text-[10px] font-black uppercase text-[#5A5245] tracking-widest block">
              EVIDENCIA GRÁFICA
            </span>
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#1F1305] bg-white p-2 border border-[#1F1305] shadow-[1px_1px_0px_#1F1305]">
              <input
                type="checkbox"
                checked={sidebarPhotoOnly}
                onChange={(e) => setSidebarPhotoOnly(e.target.checked)}
                className="accent-[#E80000] h-4 w-4 rounded-none cursor-pointer"
              />
              <span>Solo con fotografía verificada</span>
            </label>
          </div>
        </div>

        {/* ============================================================== */}
        {/* TABLA PRINCIPAL DE REGISTRO // THE MASTER LEDGER (9 de 12 col) */}
        {/* ============================================================== */}
        <div className="lg:col-span-9 space-y-3">
          {/* Barra superior de conteo y estado */}
          <div className="flex items-center justify-between text-xs text-[#5A5245] font-bold border-b-2 border-[#1F1305] pb-2">
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-[#E80000]" />
              Mostrando <strong className="text-[#1F1305]">{sortedAlbums.length}</strong> partidas
              en el Libro Mayor de Matrices
            </span>
            <span className="text-[11px] text-[#5A5245] hidden sm:inline">
              Pasa el cursor sobre la foto para ver el popover de alta definición
            </span>
          </div>

          {/* Contenedor de la Tabla con scroll horizontal responsivo */}
          <div className="border-2 border-[#1F1305] bg-white shadow-[6px_6px_0px_#1F1305] overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-mono">
              <thead>
                <tr className="border-b-2 border-[#1F1305] bg-[#EDE0D0] text-[#1F1305] font-black text-[11px] uppercase tracking-wider">
                  {/* Folio */}
                  <th
                    scope="col"
                    onClick={() => toggleSort("id")}
                    className="py-3 px-3 w-20 cursor-pointer hover:bg-[#E2D4C3] transition-colors group"
                  >
                    <div className="flex items-center gap-1">
                      <span>FOLIO</span>
                      {renderSortIndicator("id")}
                    </div>
                  </th>

                  {/* Foto */}
                  <th scope="col" className="py-3 px-2 w-14 text-center">
                    FOTO
                  </th>

                  {/* Catálogo */}
                  <th
                    scope="col"
                    onClick={() => toggleSort("catalogNumber")}
                    className="py-3 px-3 w-28 cursor-pointer hover:bg-[#E2D4C3] transition-colors group"
                  >
                    <div className="flex items-center gap-1">
                      <span>CATÁLOGO</span>
                      {renderSortIndicator("catalogNumber")}
                    </div>
                  </th>

                  {/* Título / Obras */}
                  <th
                    scope="col"
                    onClick={() => toggleSort("title")}
                    className="py-3 px-3 cursor-pointer hover:bg-[#E2D4C3] transition-colors group min-w-[220px]"
                  >
                    <div className="flex items-center gap-1">
                      <span>OBRA / LADOS A &amp; B</span>
                      {renderSortIndicator("title")}
                    </div>
                  </th>

                  {/* Agrupación */}
                  <th
                    scope="col"
                    onClick={() => toggleSort("artist")}
                    className="py-3 px-3 w-40 cursor-pointer hover:bg-[#E2D4C3] transition-colors group"
                  >
                    <div className="flex items-center gap-1">
                      <span>AGRUPACIÓN</span>
                      {renderSortIndicator("artist")}
                    </div>
                  </th>

                  {/* Sello */}
                  <th
                    scope="col"
                    onClick={() => toggleSort("label")}
                    className="py-3 px-3 w-32 cursor-pointer hover:bg-[#E2D4C3] transition-colors group"
                  >
                    <div className="flex items-center gap-1">
                      <span>SELLO</span>
                      {renderSortIndicator("label")}
                    </div>
                  </th>

                  {/* Año */}
                  <th
                    scope="col"
                    onClick={() => toggleSort("year")}
                    className="py-3 px-2.5 w-16 text-center cursor-pointer hover:bg-[#E2D4C3] transition-colors group"
                  >
                    <div className="flex items-center justify-center gap-1">
                      <span>AÑO</span>
                      {renderSortIndicator("year")}
                    </div>
                  </th>

                  {/* Acciones */}
                  <th scope="col" className="py-3 px-3 w-24 text-right">
                    PERITAJE
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#1F1305]/20">
                {sortedAlbums.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 px-4 text-center text-[#5A5245] italic">
                      No hay registros que coincidan con los filtros seleccionados en el Libro
                      Mayor.
                    </td>
                  </tr>
                ) : (
                  sortedAlbums.map((album, index) => {
                    const isEven = index % 2 === 0;
                    const tracks = tracksMap[album.id] || [];
                    const isSingle =
                      album.format?.toLowerCase().includes("45") ||
                      album.format?.toLowerCase().includes("single");

                    return (
                      <tr
                        key={album.id}
                        className={cn(
                          "transition-colors hover:bg-[#FFF6EB] group",
                          isEven ? "bg-white" : "bg-[#FDFBF7]"
                        )}
                      >
                        {/* 1. Folio */}
                        <td className="py-2.5 px-3 font-mono font-bold text-[#1F1305] whitespace-nowrap">
                          <span className="border border-[#1F1305] bg-[#F4EFEA] px-1.5 py-0.5 text-[11px] shadow-[1px_1px_0px_#1F1305]">
                            #{String(album.id).padStart(4, "0")}
                          </span>
                        </td>

                        {/* 2. Miniatura con Hover Popover */}
                        <td className="py-2 px-2 text-center">
                          <div
                            onMouseEnter={(e) => {
                              const rect = e.currentTarget.getBoundingClientRect();
                              setHoveredAlbum({
                                album,
                                x: rect.right + 10,
                                y: rect.top - 40,
                              });
                            }}
                            onMouseLeave={() => setHoveredAlbum(null)}
                            className="relative inline-block w-10 h-10 border border-[#1F1305] bg-[#140D04] shadow-[2px_2px_0px_#1F1305] overflow-hidden cursor-zoom-in"
                          >
                            {album.coverUrl ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={album.coverUrl}
                                alt={album.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-white/40">
                                <Disc3 className="h-5 w-5" />
                              </div>
                            )}
                          </div>
                        </td>

                        {/* 3. Catálogo */}
                        <td className="py-2.5 px-3 whitespace-nowrap">
                          {album.catalogNumber ? (
                            <span className="font-mono text-[11px] font-bold text-[#1F1305] bg-amber-50 px-1.5 py-0.5 border border-amber-300">
                              {album.catalogNumber}
                            </span>
                          ) : (
                            <span className="text-[#8C7E72] italic text-[11px]">S/C</span>
                          )}
                        </td>

                        {/* 4. Obra / Lados A y B */}
                        <td className="py-2.5 px-3">
                          <div className="font-black text-[#1F1305] text-xs leading-tight group-hover:text-[#E80000] transition-colors">
                            {album.title}
                          </div>
                          {/* Micro indicador de pistas si es single */}
                          {tracks.length > 0 && (
                            <div className="text-[10px] text-[#5A5245] truncate max-w-md mt-0.5">
                              {tracks.slice(0, 2).map((t, i) => (
                                <span key={t.id} className="mr-2">
                                  <strong className="text-[#E80000]">{t.side || (i === 0 ? "A" : "B")}:</strong>{" "}
                                  {t.title}
                                </span>
                              ))}
                              {tracks.length > 2 && (
                                <span className="text-[9px] text-[#8C7E72]">
                                  (+{tracks.length - 2} cortes)
                                </span>
                              )}
                            </div>
                          )}
                        </td>

                        {/* 5. Agrupación */}
                        <td className="py-2.5 px-3 font-bold text-[#1F1305] whitespace-nowrap">
                          {album.artist}
                        </td>

                        {/* 6. Sello */}
                        <td className="py-2.5 px-3 whitespace-nowrap">
                          <span className="font-mono text-[11px] font-bold text-[#5A5245] uppercase">
                            {album.label || "Particular"}
                          </span>
                        </td>

                        {/* 7. Año */}
                        <td className="py-2.5 px-2.5 text-center whitespace-nowrap">
                          {album.year ? (
                            <span className="border border-[#1F1305] bg-[#E80000] text-white px-1.5 py-0.5 text-[11px] font-black">
                              {album.year}
                            </span>
                          ) : (
                            <span className="text-[#8C7E72] text-[11px]">--</span>
                          )}
                        </td>

                        {/* 8. Acciones / Peritaje */}
                        <td className="py-2.5 px-3 text-right whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => onSelectAlbum?.(album)}
                            className="inline-flex items-center gap-1 border border-[#1F1305] bg-white px-2 py-1 text-[11px] font-bold text-[#1F1305] shadow-[2px_2px_0px_#1F1305] hover:bg-[#EDE0D0] hover:text-[#E80000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
                          >
                            <Eye className="h-3 w-3 text-[#E80000]" />
                            <span>Ficha</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* HOVER POPOVER FLOTANTE (Inspección rápida de galleta en 320px) */}
      {/* ============================================================== */}
      {hoveredAlbum && (
        <div
          className="fixed z-50 pointer-events-none hidden md:block w-72 border-2 border-[#1F1305] bg-[#EDE0D0] p-3 shadow-[8px_8px_0px_#1F1305] animate-in fade-in zoom-in-95 duration-150"
          style={{
            left: `${Math.min(hoveredAlbum.x, window.innerWidth - 320)}px`,
            top: `${Math.max(10, Math.min(hoveredAlbum.y, window.innerHeight - 380))}px`,
          }}
        >
          {/* Cabecera del popover */}
          <div className="flex items-center justify-between border-b border-[#1F1305] pb-1.5 mb-2 text-[10px] font-black text-[#1F1305]">
            <span>FOLIO #{String(hoveredAlbum.album.id).padStart(4, "0")}</span>
            <span className="text-[#E80000]">{hoveredAlbum.album.year || "S/D"}</span>
          </div>

          {/* Fotografía de alta resolución */}
          <div className="relative aspect-square w-full border-2 border-[#1F1305] bg-[#140D04] overflow-hidden mb-2">
            {hoveredAlbum.album.coverUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={hoveredAlbum.album.coverUrl}
                alt={hoveredAlbum.album.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-white/30 text-xs">
                <Disc3 className="h-16 w-16 mb-1" />
                <span>Sin fotografía</span>
              </div>
            )}
          </div>

          {/* Metadatos en el popover */}
          <div className="space-y-0.5 text-xs">
            <h4 className="font-black text-[#1F1305] leading-snug line-clamp-2">
              {hoveredAlbum.album.title}
            </h4>
            <p className="text-[#E80000] font-bold text-[11px] truncate">
              {hoveredAlbum.album.artist}
            </p>
            <div className="flex items-center justify-between text-[10px] text-[#5A5245] pt-1 border-t border-[#1F1305]/30">
              <span className="truncate max-w-[130px] font-bold">
                {hoveredAlbum.album.label || "Particular"}
              </span>
              <span className="font-mono bg-white px-1 border border-[#1F1305]">
                {hoveredAlbum.album.catalogNumber || "S/C"}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export const MatrixLedgerView = memo(MatrixLedgerViewComponent);
