"use client";

import { useState, useMemo, memo } from "react";
import { cn } from "@/lib/utils";
import { BadgeFormat } from "@/components/ui/badge-format";
import type { AlbumItem } from "@/features/albumes/components/album-card";
import type { TrackItem } from "@/features/temas/components/tracklist-table";
import {
  Disc,
  Disc3,
  SlidersHorizontal,
  Sparkles,
  Search,
  LayoutGrid,
  FileText,
  Calendar,
  Building2,
  Tag,
  ArrowUpDown,
  ArrowRight,
  Eye,
  CheckCircle2,
  Layers,
  RotateCcw,
  Maximize2,
  Grid3X3,
  Grid2X2,
} from "lucide-react";

export interface VaultGridViewProps {
  albums: AlbumItem[];
  tracksMap?: Record<number, TrackItem[]>;
  onSelectAlbum?: (album: AlbumItem) => void;
  className?: string;
}

type VaultViewMode = "gallery" | "dossier";
type GridDensity = "compact" | "spacious";
type SortOption = "year-asc" | "year-desc" | "artist-asc" | "title-asc" | "id-asc";

const DECADE_FILTERS = [
  { id: "ALL", label: "Todas" },
  { id: "1960", label: "60s" },
  { id: "1970", label: "70s (Oro)" },
  { id: "1980", label: "80s" },
  { id: "1990", label: "90s+" },
] as const;

export function VaultGridViewComponent({
  albums,
  tracksMap = {},
  onSelectAlbum,
  className,
}: VaultGridViewProps) {
  // Estados de control de la Bóveda
  const [viewMode, setViewMode] = useState<VaultViewMode>("gallery");
  const [density, setDensity] = useState<GridDensity>("spacious");
  const [sortOption, setSortOption] = useState<SortOption>("year-asc");
  const [selectedFormat, setSelectedFormat] = useState<string>("ALL");
  const [selectedDecade, setSelectedDecade] = useState<string>("ALL");
  const [photoOnly, setPhotoOnly] = useState<boolean>(false);
  const [quickSearch, setQuickSearch] = useState<string>("");
  const [visibleCount, setVisibleCount] = useState<number>(48);

  // Conteo de formatos para los badges
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

  // Filtrar álbumes según los criterios de la consola
  const filteredAlbums = useMemo(() => {
    const q = quickSearch.trim().toLowerCase();

    return albums.filter((album) => {
      // 1. Filtro de formato
      if (selectedFormat !== "ALL") {
        const f = (album.format || "").toLowerCase();
        if (selectedFormat === "45" && !(f.includes("45") || f.includes("single"))) return false;
        if (selectedFormat === "LP" && !f.includes("lp")) return false;
        if (selectedFormat === "EP" && !f.includes("ep")) return false;
        if (selectedFormat === "CASETE" && !(f.includes("caset") || f.includes("cassette"))) return false;
        if (selectedFormat === "CD" && !f.includes("cd")) return false;
      }

      // 2. Filtro de década
      if (selectedDecade !== "ALL") {
        const start = parseInt(selectedDecade, 10);
        if (!album.year || album.year < start || album.year > start + 9) return false;
      }

      // 3. Filtro solo con fotografía
      if (photoOnly && !album.coverUrl) {
        return false;
      }

      // 4. Búsqueda rápida
      if (q) {
        const matchTitle = album.title.toLowerCase().includes(q);
        const matchArtist = album.artist.toLowerCase().includes(q);
        const matchCat = album.catalogNumber?.toLowerCase().includes(q);
        const matchLabel = album.label?.toLowerCase().includes(q);
        if (!matchTitle && !matchArtist && !matchCat && !matchLabel) return false;
      }

      return true;
    });
  }, [albums, selectedFormat, selectedDecade, photoOnly, quickSearch]);

  // Ordenar álbumes según la opción seleccionada
  const sortedAlbums = useMemo(() => {
    return [...filteredAlbums].sort((a, b) => {
      switch (sortOption) {
        case "year-asc":
          return (a.year || 9999) - (b.year || 9999);
        case "year-desc":
          return (b.year || 0) - (a.year || 0);
        case "artist-asc":
          return a.artist.localeCompare(b.artist);
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "id-asc":
          return a.id - b.id;
        default:
          return 0;
      }
    });
  }, [filteredAlbums, sortOption]);

  const resetFilters = () => {
    setSelectedFormat("ALL");
    setSelectedDecade("ALL");
    setPhotoOnly(false);
    setQuickSearch("");
    setSortOption("year-asc");
  };

  const hasActiveFilters =
    selectedFormat !== "ALL" ||
    selectedDecade !== "ALL" ||
    photoOnly ||
    quickSearch.trim() !== "";

  // Clases responsivas de cuadrícula según la densidad elegida
  const gridClasses = useMemo(() => {
    if (viewMode === "gallery") {
      return density === "spacious"
        ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5"
        : "grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 sm:gap-4";
    } else {
      // Modo Ficha Técnica / Dossier
      return density === "spacious"
        ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
        : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4";
    }
  }, [viewMode, density]);

  return (
    <div className={cn("space-y-6 font-mono select-none", className)}>
      {/* ============================================================== */}
      {/* CONSOLA DE MANDO DE BÓVEDA (Brutalist Command Console) */}
      {/* ============================================================== */}
      <div className="border-2 border-[#1F1305] bg-[#EDE0D0] p-4 sm:p-5 shadow-[4px_4px_0px_#1F1305] space-y-4">
        {/* FILA 1: Búsqueda rápida, Selector Dual de Vista y Selector de Densidad */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Cajón de búsqueda ágil */}
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#E80000]" />
            <input
              type="text"
              value={quickSearch}
              onChange={(e) => {
                setQuickSearch(e.target.value);
                setVisibleCount(48);
              }}
              placeholder="Filtrar por título, agrupación, catálogo o sello..."
              className="w-full border-2 border-[#1F1305] bg-white py-2 pl-10 pr-20 text-xs font-bold text-[#1F1305] placeholder-[#746B5C] shadow-[2px_2px_0px_#1F1305] focus:outline-none focus:border-[#E80000]"
            />
            {quickSearch && (
              <button
                type="button"
                onClick={() => setQuickSearch("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 border border-[#1F1305] bg-[#EDE0D0] px-1.5 py-0.5 text-[10px] font-bold text-[#1F1305] hover:bg-white cursor-pointer"
              >
                Limpiar
              </button>
            )}
          </div>

          {/* Grupo de Controles: Modo Dual + Densidad */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Conmutador Modo Dual: Galería Pura vs Ficha Técnica */}
            <div className="flex items-center border-2 border-[#1F1305] bg-white p-0.5 shadow-[2px_2px_0px_#1F1305]">
              <button
                type="button"
                onClick={() => setViewMode("gallery")}
                title="Modo Galería Pura: Portadas limpias y vinilo interactivo al cursor"
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold transition-all cursor-pointer",
                  viewMode === "gallery"
                    ? "bg-[#1F1305] text-[#EDE0D0] shadow-[1px_1px_0px_#E80000]"
                    : "text-[#1F1305] hover:bg-[#EDE0D0]"
                )}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">[ GALERÍA PURA ]</span>
                <span className="sm:hidden">GALERÍA</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("dossier")}
                title="Modo Ficha Técnica: Desglose archivístico completo de cada prensaje"
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold transition-all cursor-pointer",
                  viewMode === "dossier"
                    ? "bg-[#1F1305] text-[#EDE0D0] shadow-[1px_1px_0px_#E80000]"
                    : "text-[#1F1305] hover:bg-[#EDE0D0]"
                )}
              >
                <FileText className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">[ FICHA TÉCNICA ]</span>
                <span className="sm:hidden">PERITAJE</span>
              </button>
            </div>

            {/* Conmutador de Densidad */}
            <div className="flex items-center border-2 border-[#1F1305] bg-white p-0.5 shadow-[2px_2px_0px_#1F1305]">
              <button
                type="button"
                onClick={() => setDensity("spacious")}
                title="Cuadrícula espaciosa"
                className={cn(
                  "p-1.5 transition-all cursor-pointer",
                  density === "spacious"
                    ? "bg-[#1F1305] text-[#EDE0D0]"
                    : "text-[#1F1305] hover:bg-[#EDE0D0]"
                )}
              >
                <Grid2X2 className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setDensity("compact")}
                title="Cuadrícula compacta"
                className={cn(
                  "p-1.5 transition-all cursor-pointer",
                  density === "compact"
                    ? "bg-[#1F1305] text-[#EDE0D0]"
                    : "text-[#1F1305] hover:bg-[#EDE0D0]"
                )}
              >
                <Grid3X3 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* FILA 2: Segmentadores rápidos por formato, décadas, foto-check y ordenación */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#1F1305]/20">
          {/* Pills de Soporte Físico */}
          <div className="flex flex-wrap items-center gap-1 text-xs">
            <span className="font-bold text-[#1F1305] mr-1 flex items-center gap-1 text-[11px]">
              <Disc className="h-3 w-3 text-[#E80000]" /> SOPORTE:
            </span>
            {[
              { id: "ALL", label: `Todos (${formatCounts.total})` },
              { id: "45", label: `45 (${formatCounts["45"]})` },
              { id: "LP", label: `LP (${formatCounts.lp})` },
              { id: "EP", label: `EP (${formatCounts.ep})` },
              { id: "CASETE", label: `Casete (${formatCounts.casete})` },
              { id: "CD", label: `CD (${formatCounts.cd})` },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => {
                  setSelectedFormat(f.id);
                  setVisibleCount(48);
                }}
                className={cn(
                  "border border-[#1F1305] px-2.5 py-0.5 font-bold transition-all cursor-pointer text-[11px]",
                  selectedFormat === f.id
                    ? "bg-[#1F1305] text-[#EDE0D0] shadow-[1px_1px_0px_#E80000]"
                    : "bg-white text-[#1F1305] hover:bg-[#EDE0D0]"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Segmentadores de Época, Switch Foto y Ordenación */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Décadas */}
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-bold text-[#5A5245] uppercase">ÉPOCA:</span>
              <div className="flex items-center border border-[#1F1305] bg-white">
                {DECADE_FILTERS.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => {
                      setSelectedDecade(d.id);
                      setVisibleCount(48);
                    }}
                    className={cn(
                      "px-2 py-0.5 text-[10px] font-bold transition-all cursor-pointer",
                      selectedDecade === d.id
                        ? "bg-[#1F1305] text-white"
                        : "text-[#1F1305] hover:bg-[#EDE0D0]"
                    )}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Switch carátula fotografiada */}
            <button
              type="button"
              onClick={() => {
                setPhotoOnly(!photoOnly);
                setVisibleCount(48);
              }}
              className={cn(
                "border border-[#1F1305] px-2 py-0.5 text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer",
                photoOnly
                  ? "bg-[#E80000] text-white shadow-[1px_1px_0px_#1F1305]"
                  : "bg-white text-[#1F1305] hover:bg-[#EDE0D0]"
              )}
            >
              <Eye className="h-3 w-3" />
              <span>Con Foto</span>
            </button>

            {/* Selector de ordenación */}
            <div className="relative">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                aria-label="Criterio de ordenación"
                className="appearance-none border border-[#1F1305] bg-white px-2.5 py-1 pr-6 font-mono text-[11px] font-bold text-[#1F1305] focus:outline-none focus:border-[#E80000]"
              >
                <option value="year-asc">Año (Antiguo → Reciente)</option>
                <option value="year-desc">Año (Reciente → Antiguo)</option>
                <option value="artist-asc">Agrupación (A → Z)</option>
                <option value="title-asc">Título Obra (A → Z)</option>
                <option value="id-asc">Folio de Archivo (ID)</option>
              </select>
              <ArrowUpDown className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 h-3 w-3 text-[#1F1305]" />
            </div>

            {/* Botón de limpiar filtros si están activos */}
            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-[10px] text-[#E80000] font-black underline hover:text-[#1F1305] flex items-center gap-0.5 cursor-pointer ml-1"
              >
                <RotateCcw className="h-2.5 w-2.5" />
                <span>Restablecer</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* BARRA DE METRICAS Y STATUS DE BÓVEDA */}
      {/* ============================================================== */}
      <div className="flex items-center justify-between text-xs font-bold text-[#5A5245] px-1">
        <div className="flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-[#E80000]" />
          <span>
            Mostrando <strong className="text-[#1F1305]">{Math.min(visibleCount, sortedAlbums.length)}</strong> de{" "}
            <strong className="text-[#1F1305]">{sortedAlbums.length}</strong> expedientes
            {hasActiveFilters && (
              <span className="text-[#E80000] font-bold ml-1.5">[ FILTROS APLICADOS ]</span>
            )}
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-[11px]">
          <span className="text-[#1F1305]">
            Modo activo:{" "}
            <strong className="text-[#E80000] uppercase">
              {viewMode === "gallery" ? "Galería Pura (Funda Limpia)" : "Ficha Técnica (Peritaje)"}
            </strong>
          </span>
          <span>•</span>
          <span>
            {viewMode === "gallery"
              ? "Pasa el cursor sobre la funda para revelar metadatos"
              : "Expediente detallado con matriz y pistas"}
          </span>
        </div>
      </div>

      {/* ============================================================== */}
      {/* RENDERIZADO DE RESULTADOS: DUAL STATE GRID */}
      {/* ============================================================== */}
      {sortedAlbums.length === 0 ? (
        <div className="border-2 border-[#1F1305] bg-white py-14 px-6 text-center shadow-[6px_6px_0px_#1F1305] max-w-2xl mx-auto relative overflow-hidden">
          <div className="inline-block border-2 border-[#E80000] bg-[#E80000] text-white px-3 py-1 text-xs font-black uppercase rotate-[-2deg] shadow-[2px_2px_0px_#1F1305] mb-4">
            EXPEDIENTE NO LOCALIZADO // 404 BÓVEDA
          </div>
          <Disc className="mx-auto h-12 w-12 text-[#F1730C] mb-3" />
          <h3 className="font-cooper text-xl text-[#1F1305]">
            No se hallaron registros bajo estos criterios
          </h3>
          <p className="text-xs text-[#5A5245] mt-2 max-w-md mx-auto leading-relaxed">
            Verifica la ortografía o limpia los filtros activos para regresar al archivo completo.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-6 inline-flex items-center gap-2 border-2 border-[#1F1305] bg-[#E80000] px-5 py-2.5 text-xs font-bold text-white shadow-[3px_3px_0px_#1F1305] hover:bg-[#1F1305] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#E80000] transition-all cursor-pointer"
          >
            [ REINICIAR CRITERIOS DE BÓVEDA ]
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          <div className={gridClasses}>
            {sortedAlbums.slice(0, visibleCount).map((album) =>
              viewMode === "gallery" ? (
                /* -------------------------------------------------------- */
                /* TARJETA 1: MODO GALERÍA PURA (Clean Sleeve + Vinilo Hover) */
                /* -------------------------------------------------------- */
                <div
                  key={album.id}
                  onClick={() => onSelectAlbum?.(album)}
                  className="group relative flex flex-col cursor-pointer transition-all duration-200"
                >
                  <div className="relative aspect-square w-full">
                    {/* Vinilo negro que asoma lateralmente al pasar el cursor */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-y-2 right-2 aspect-square rounded-full bg-[#111114] shadow-2xl transition-transform duration-500 ease-out group-hover:translate-x-7 sm:group-hover:translate-x-9 z-0 overflow-hidden flex items-center justify-center border border-white/10"
                    >
                      <div className="absolute inset-2 rounded-full border border-white/5 vinyl-grooves opacity-60" />
                      <div className="absolute inset-6 rounded-full border border-white/10" />
                      <div className="absolute inset-10 rounded-full border border-white/5" />
                      {/* Galleta central del vinilo */}
                      <div className="relative h-11 w-11 rounded-full bg-gradient-to-tr from-amber-600 to-orange-500 flex flex-col items-center justify-center shadow-inner border border-white/30 text-center">
                        <span className="text-[6px] font-black text-[#1F1305] leading-none">
                          {album.format?.toLowerCase().includes("45") ? "45 RPM" : "33 RPM"}
                        </span>
                        <div className="h-2 w-2 rounded-full bg-black my-0.5" />
                      </div>
                    </div>

                    {/* Funda del álbum (Totalmente limpia por defecto) */}
                    <div className="relative z-10 h-full w-full overflow-hidden border-2 border-[#1F1305] bg-[#140D04] shadow-[4px_4px_0px_#1F1305] transition-all duration-200 group-hover:shadow-[6px_6px_0px_#E80000] group-hover:-translate-y-1 flex flex-col justify-between">
                      {/* Cabecera de evidencia: ÚNICO LUGAR DONDE APARECE EL AÑO */}
                      <div className="absolute top-0 left-0 right-0 h-5 bg-[#EDE0D0] border-b border-[#1F1305] flex items-center justify-between px-2 text-[10px] text-[#1F1305] font-black z-20">
                        <span>FOLIO NO. {String(album.id).padStart(4, "0")}</span>
                        <span className="text-[#E80000]">{album.year || "S/D"}</span>
                      </div>

                      {/* Fotografía de la Carátula Limpia */}
                      {album.coverUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={album.coverUrl}
                          alt={album.title}
                          className="absolute inset-0 h-full w-full object-cover pt-5 transition-transform duration-300 group-hover:scale-102"
                        />
                      ) : (
                        <div className="absolute inset-0 pt-5 flex flex-col justify-between p-4 bg-[#1F1305] text-[#EDE0D0]">
                          <Disc3 className="h-16 w-16 text-white/10 self-center my-auto" />
                          <div className="text-center">
                            <span className="text-[9px] uppercase tracking-widest text-[#F8C800]">
                              FONOGRAMA MATRIZ
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Overlay oscuro translúcido: Solo emerge al pasar el cursor */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Formato badge: Revelado en hover */}
                      <div className="relative z-10 pt-7 px-3 flex items-start justify-start opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        <BadgeFormat formatName={album.format || "LP"} size="sm" />
                      </div>

                      {/* Metadatos inferiores: Revelados en hover */}
                      <div className="relative z-10 p-3 space-y-1 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        <div className="flex items-center justify-between text-[10px] text-[#F8C800] uppercase font-bold tracking-wider">
                          <span className="truncate max-w-[120px]">{album.label || "ARCHIVO"}</span>
                          {album.catalogNumber && (
                            <span className="text-white bg-[#1F1305] px-1 py-0.2 border border-white/20">
                              {album.catalogNumber}
                            </span>
                          )}
                        </div>
                        <h4 className="font-bold text-white text-xs sm:text-sm leading-tight line-clamp-2 group-hover:text-[#F8C800] transition-colors">
                          {album.title}
                        </h4>
                        <p className="text-[11px] text-[#EDE0D0] font-medium truncate">
                          {album.artist}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* -------------------------------------------------------- */
                /* TARJETA 2: MODO FICHA TÉCNICA / PERITAJE ARCHIVÍSTICO   */
                /* -------------------------------------------------------- */
                <div
                  key={album.id}
                  onClick={() => onSelectAlbum?.(album)}
                  className="group border-2 border-[#1F1305] bg-[#F4EFEA] shadow-[4px_4px_0px_#1F1305] hover:shadow-[6px_6px_0px_#E80000] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex flex-col justify-between"
                >
                  {/* Encabezado de expediente pericial */}
                  <div className="bg-[#1F1305] text-[#EDE0D0] px-3 py-1.5 flex items-center justify-between text-[11px] font-black border-b-2 border-[#1F1305]">
                    <div className="flex items-center gap-1.5">
                      <Tag className="h-3 w-3 text-[#E80000]" />
                      <span>FOLIO #{String(album.id).padStart(4, "0")}</span>
                    </div>
                    {/* Único lugar donde aparece el año al lado de la evidencia */}
                    <span className="text-[#F8C800] font-mono">
                      {album.year ? `AÑO ${album.year}` : "S/D"}
                    </span>
                  </div>

                  {/* Cuerpo de la Ficha: Imagen y Cuadrícula de Datos */}
                  <div className="p-3.5 space-y-3">
                    {/* Vista previa de carátula con formato */}
                    <div className="relative aspect-video w-full border-2 border-[#1F1305] bg-[#140D04] overflow-hidden">
                      {album.coverUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={album.coverUrl}
                          alt={album.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/20">
                          <Disc3 className="h-10 w-10" />
                        </div>
                      )}
                      <div className="absolute bottom-1.5 left-1.5">
                        <BadgeFormat formatName={album.format || "LP"} size="sm" />
                      </div>
                      {album.catalogNumber && (
                        <div className="absolute top-1.5 right-1.5 bg-[#1F1305]/90 border border-white/30 text-white text-[10px] font-mono font-bold px-1.5 py-0.5">
                          {album.catalogNumber}
                        </div>
                      )}
                    </div>

                    {/* Títulos principales */}
                    <div className="space-y-0.5">
                      <h4 className="font-black text-[#1F1305] text-sm leading-snug line-clamp-2 group-hover:text-[#E80000] transition-colors">
                        {album.title}
                      </h4>
                      <p className="text-[#E80000] font-bold text-xs truncate">
                        {album.artist}
                      </p>
                    </div>

                    {/* Tabla de metadatos técnicos estructurados */}
                    <div className="border border-[#1F1305]/30 bg-white p-2.5 text-[11px] space-y-1.5">
                      <div className="flex items-center justify-between border-b border-[#1F1305]/10 pb-1">
                        <span className="text-[#746B5C] font-bold flex items-center gap-1">
                          <Building2 className="h-3 w-3 text-[#1F1305]" /> SELLO:
                        </span>
                        <span className="font-bold text-[#1F1305] truncate max-w-[140px]">
                          {album.label || "Particular / No especificado"}
                        </span>
                      </div>

                      <div className="flex items-center justify-between border-b border-[#1F1305]/10 pb-1">
                        <span className="text-[#746B5C] font-bold flex items-center gap-1">
                          <Layers className="h-3 w-3 text-[#1F1305]" /> PISTAS:
                        </span>
                        <span className="font-bold text-[#1F1305]">
                          {tracksMap[album.id]?.length
                            ? `${tracksMap[album.id].length} cortes registrados`
                            : album.tracksCount
                            ? `${album.tracksCount} cortes`
                            : "En investigación"}
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-0.5">
                        <span className="text-[#746B5C] font-bold flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3 text-[#E80000]" /> CUSTODIA:
                        </span>
                        <span className="text-[10px] text-[#1F1305] font-black uppercase bg-[#EDE0D0] px-1 border border-[#1F1305]/40">
                          {album.coverUrl ? "Fisico Verificado" : "Ficha Registral"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Pie de la Ficha Técnica: Botón de acción */}
                  <div className="border-t-2 border-[#1F1305] bg-[#EDE0D0] px-3.5 py-2 flex items-center justify-between text-xs font-bold text-[#1F1305] group-hover:bg-[#E80000] group-hover:text-white transition-colors">
                    <span className="text-[11px] uppercase tracking-wider">
                      [ EXAMINAR MATRIZ ]
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              )
            )}
          </div>

          {/* Botón de paginación para cargar más */}
          {sortedAlbums.length > visibleCount && (
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + 48)}
                className="inline-flex items-center gap-2 border-2 border-[#1F1305] bg-[#E80000] px-6 py-3 font-mono text-xs font-bold text-white shadow-[4px_4px_0px_#1F1305] hover:bg-[#1F1305] hover:text-[#EDE0D0] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#1F1305] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
              >
                <Disc className="h-4 w-4" />
                <span>DESPLEGAR MÁS EXPEDIENTES (+48)</span>
                <span className="border border-[#1F1305] bg-[#EDE0D0] text-[#1F1305] px-2 py-0.5 text-[11px] font-mono font-bold">
                  {Math.min(visibleCount, sortedAlbums.length)} / {sortedAlbums.length}
                </span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export const VaultGridView = memo(VaultGridViewComponent);
