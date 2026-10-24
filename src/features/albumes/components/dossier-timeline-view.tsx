"use client";

import { useState, useMemo, useEffect, memo } from "react";
import { cn } from "@/lib/utils";
import { BadgeFormat } from "@/components/ui/badge-format";
import type { AlbumItem } from "@/features/albumes/components/album-card";
import type { TrackItem } from "@/features/temas/components/tracklist-table";
import {
  Calendar,
  Building2,
  Clock,
  Disc,
  Disc3,
  Search,
  Filter,
  Sparkles,
  ArrowRight,
  RotateCcw,
  LayoutGrid,
  FileText,
  Eye,
  CheckCircle2,
} from "lucide-react";

export interface DossierTimelineViewProps {
  albums: AlbumItem[];
  tracksMap?: Record<number, TrackItem[]>;
  onSelectAlbum?: (album: AlbumItem) => void;
  className?: string;
}

type GroupingMode = "year" | "label";
type DisplayLayout = "dossier" | "grid";

// Resumen histórico por época para el dossier
const EPOCH_DESCRIPTIONS: Record<string, string> = {
  "1960": "Inicios de la Cumbia Psicodélica en el Perú // Surgimiento de guitarras eléctricas costeñas y amazónicas.",
  "1970": "Época de Oro & Fiebre de la Chicha // Consolidación de Infopesa, Odeon y los prensajes maestros en vinilo.",
  "1980": "Auge Masivo & Cultura Popular // Descentralización sonora, prensaje masivo y transición a casetes.",
  "1990": "Era de la Tecnocumbia & Transición Digital // Ritmos sintetizados y masterización moderna.",
};

function formatDuration(seconds?: number | null): string {
  if (!seconds || seconds <= 0) return "--:--";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function DossierTimelineViewComponent({
  albums,
  tracksMap = {},
  onSelectAlbum,
  className,
}: DossierTimelineViewProps) {
  // Estados de control del Dossier
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFormat, setSelectedFormat] = useState<string>("ALL");
  const [selectedLabel, setSelectedLabel] = useState<string>("ALL");
  const [selectedDecade, setSelectedDecade] = useState<string>("ALL");
  const [selectedYear, setSelectedYear] = useState<number | "ALL">("ALL");
  const [groupingMode, setGroupingMode] = useState<GroupingMode>("year");
  const [displayLayout, setDisplayLayout] = useState<DisplayLayout>("dossier");
  const [photoOnly, setPhotoOnly] = useState<boolean>(false);

  // 1. Base filtrada por la búsqueda de texto (artista, título, catálogo o sello)
  const searchFilteredAlbums = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return albums;

    return albums.filter((album) => {
      const matchTitle = album.title.toLowerCase().includes(q);
      const matchArtist = album.artist.toLowerCase().includes(q);
      const matchCat = album.catalogNumber?.toLowerCase().includes(q);
      const matchLabel = album.label?.toLowerCase().includes(q);
      return matchTitle || matchArtist || matchCat || matchLabel;
    });
  }, [albums, searchTerm]);

  // 2. Base para la línea de tiempo (se ajusta a la búsqueda activa y formatos/sellos seleccionados)
  const albumsForTimeline = useMemo(() => {
    let list = searchFilteredAlbums;

    if (selectedFormat !== "ALL") {
      list = list.filter((album) => {
        const f = (album.format || "").toLowerCase();
        if (selectedFormat === "45" && !(f.includes("45") || f.includes("single"))) return false;
        if (selectedFormat === "LP" && !f.includes("lp")) return false;
        if (selectedFormat === "EP" && !f.includes("ep")) return false;
        if (selectedFormat === "CASETE" && !(f.includes("caset") || f.includes("cassette"))) return false;
        if (selectedFormat === "CD" && !f.includes("cd")) return false;
        return true;
      });
    }

    if (selectedLabel !== "ALL") {
      list = list.filter((album) => album.label === selectedLabel);
    }

    return list;
  }, [searchFilteredAlbums, selectedFormat, selectedLabel]);

  // 3. Conteo dinámico de años ajustado a la búsqueda
  const yearCounts = useMemo(() => {
    const map = new Map<number, number>();
    albumsForTimeline.forEach((a) => {
      if (a.year && a.year > 1950 && a.year < 2030) {
        if (selectedDecade !== "ALL") {
          const start = parseInt(selectedDecade, 10);
          if (a.year < start || a.year > start + 9) return;
        }
        map.set(a.year, (map.get(a.year) || 0) + 1);
      }
    });

    return Array.from(map.entries())
      .map(([year, count]) => ({ year, count }))
      .sort((a, b) => a.year - b.year);
  }, [albumsForTimeline, selectedDecade]);

  // Total de obras en la línea de tiempo ajustado a la búsqueda
  const timelineTotal = useMemo(() => {
    if (selectedDecade !== "ALL") {
      const start = parseInt(selectedDecade, 10);
      return albumsForTimeline.filter((a) => a.year && a.year >= start && a.year <= start + 9).length;
    }
    return albumsForTimeline.length;
  }, [albumsForTimeline, selectedDecade]);

  // Si el año seleccionado ya no existe en los resultados de la nueva búsqueda, resetearlo a "ALL"
  useEffect(() => {
    if (selectedYear !== "ALL") {
      const exists = yearCounts.some((y) => y.year === selectedYear);
      if (!exists) {
        setSelectedYear("ALL");
      }
    }
  }, [yearCounts, selectedYear]);

  // 4. Conteo de formatos ajustado a la búsqueda actual
  const formatCounts = useMemo(() => {
    const counts = { total: searchFilteredAlbums.length, "45": 0, lp: 0, ep: 0, casete: 0, cd: 0 };
    searchFilteredAlbums.forEach((a) => {
      const f = (a.format || "").toLowerCase();
      if (f.includes("45") || f.includes("single")) counts["45"]++;
      else if (f.includes("lp")) counts.lp++;
      else if (f.includes("ep")) counts.ep++;
      else if (f.includes("caset") || f.includes("cassette")) counts.casete++;
      else if (f.includes("cd")) counts.cd++;
    });
    return counts;
  }, [searchFilteredAlbums]);

  // Extraer sellos únicos presentes en la búsqueda
  const uniqueLabels = useMemo(() => {
    const set = new Set<string>();
    albums.forEach((a) => {
      if (a.label) set.add(a.label);
    });
    return Array.from(set).sort();
  }, [albums]);

  // 5. Filtrar álbumes finales respetando todos los criterios
  const filteredAlbums = useMemo(() => {
    return albumsForTimeline.filter((album) => {
      // Filtro década
      if (selectedDecade !== "ALL") {
        const start = parseInt(selectedDecade, 10);
        if (!album.year || album.year < start || album.year > start + 9) return false;
      }

      // Filtro año exacto del timeline scrubber
      if (selectedYear !== "ALL" && album.year !== selectedYear) {
        return false;
      }

      // Filtro foto
      if (photoOnly && !album.coverUrl) {
        return false;
      }

      return true;
    });
  }, [albumsForTimeline, selectedDecade, selectedYear, photoOnly]);

  // 6. Agrupar álbumes para el Dossier (por Año o por Sello)
  const groupedSections = useMemo(() => {
    if (groupingMode === "year") {
      const groups = new Map<string, AlbumItem[]>();
      filteredAlbums.forEach((album) => {
        const key = album.year ? String(album.year) : "S/D (Sin Datação)";
        const list = groups.get(key) || [];
        list.push(album);
        groups.set(key, list);
      });

      return Array.from(groups.entries()).sort(([a], [b]) => {
        if (a === "S/D (Sin Datação)") return 1;
        if (b === "S/D (Sin Datação)") return -1;
        return parseInt(a, 10) - parseInt(b, 10);
      });
    } else {
      const groups = new Map<string, AlbumItem[]>();
      filteredAlbums.forEach((album) => {
        const key = album.label ? album.label : "Sello Particular / No especificado";
        const list = groups.get(key) || [];
        list.push(album);
        groups.set(key, list);
      });

      return Array.from(groups.entries()).sort(([, a], [, b]) => b.length - a.length);
    }
  }, [filteredAlbums, groupingMode]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedFormat("ALL");
    setSelectedLabel("ALL");
    setSelectedDecade("ALL");
    setSelectedYear("ALL");
    setPhotoOnly(false);
  };

  const hasActiveFilters =
    searchTerm !== "" ||
    selectedFormat !== "ALL" ||
    selectedLabel !== "ALL" ||
    selectedDecade !== "ALL" ||
    selectedYear !== "ALL" ||
    photoOnly;

  return (
    <div className={cn("space-y-6 font-mono select-none", className)}>
      {/* ============================================================== */}
      {/* RIEL CRONOLÓGICO / TIMELINE SCRUBBER (Ruler Interactivo de Años) */}
      {/* ============================================================== */}
      <div className="border-2 border-[#1F1305] bg-[#1F1305] text-[#EDE0D0] p-3 sm:p-4 shadow-[4px_4px_0px_#1F1305] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/20 pb-2">
          <div className="flex items-center gap-2 text-xs font-black">
            <Clock className="h-4 w-4 text-[#E80000]" />
            <span className="tracking-wider uppercase">LÍNEA TEMPORAL DE PRENSAJE FONOGRÁFICO</span>
          </div>
          {/* Saltos Rápidos por Década */}
          <div className="flex items-center gap-1 text-[11px] overflow-x-auto">
            <span className="text-[#A29786] text-[10px] mr-1 hidden md:inline">ÉPOCAS:</span>
            {[
              { id: "ALL", label: "Todas" },
              { id: "1960", label: "60s Psicodelia" },
              { id: "1970", label: "70s Oro" },
              { id: "1980", label: "80s Chicha" },
              { id: "1990", label: "90s+" },
            ].map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => {
                  setSelectedDecade(d.id);
                  setSelectedYear("ALL");
                }}
                className={cn(
                  "px-2 py-0.5 font-bold transition-all whitespace-nowrap cursor-pointer border",
                  selectedDecade === d.id
                    ? "bg-[#E80000] text-white border-[#E80000] shadow-[1px_1px_0px_white]"
                    : "bg-[#2A1D0E] text-[#EDE0D0] border-white/20 hover:bg-[#3E2C1B]"
                )}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cinta Scrubber Horizontal de Años Dinámica según la búsqueda */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin scrollbar-thumb-[#E80000] scrollbar-track-[#140D04]">
          <button
            type="button"
            onClick={() => setSelectedYear("ALL")}
            className={cn(
              "px-2.5 py-1 text-xs font-black transition-all flex-shrink-0 border cursor-pointer",
              selectedYear === "ALL"
                ? "bg-[#E80000] text-white border-[#E80000]"
                : "bg-white/10 text-white/70 border-white/10 hover:bg-white/20 hover:text-white"
            )}
          >
            AÑOS: TODOS ({timelineTotal})
          </button>
          {yearCounts.length === 0 ? (
            <span className="text-white/40 text-[11px] italic px-2">
              No hay años registrados para este criterio
            </span>
          ) : (
            yearCounts.map((item) => {
              const isSelected = selectedYear === item.year;
              return (
                <button
                  key={item.year}
                  type="button"
                  onClick={() => setSelectedYear(item.year)}
                  className={cn(
                    "px-2 py-1 text-xs font-bold transition-all flex-shrink-0 flex items-center gap-1 border cursor-pointer",
                    isSelected
                      ? "bg-[#F8C800] text-[#1F1305] border-[#F8C800] font-black shadow-[2px_2px_0px_#E80000]"
                      : "bg-[#2A1D0E] text-[#EDE0D0] border-white/10 hover:border-white/40 hover:bg-[#3E2C1B]"
                  )}
                >
                  <span>{item.year}</span>
                  <span className="text-[10px] opacity-75 font-mono">({item.count})</span>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* ============================================================== */}
      {/* CONSOLA DE FILTROS & CONMUTADOR DE AGRUPACIÓN / DISEÑO */}
      {/* ============================================================== */}
      <div className="border-2 border-[#1F1305] bg-[#EDE0D0] p-4 sm:p-5 shadow-[4px_4px_0px_#1F1305] space-y-4">
        {/* FILA 1: Búsqueda, Modo de Agrupación y Formato de Presentación */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Input de Búsqueda */}
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#E80000]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por agrupación (ej. Super Grupo), título, catálogo o sello..."
              className="w-full border-2 border-[#1F1305] bg-white py-2 pl-10 pr-20 text-xs font-bold text-[#1F1305] placeholder-[#746B5C] shadow-[2px_2px_0px_#1F1305] focus:outline-none focus:border-[#E80000]"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 border border-[#1F1305] bg-[#EDE0D0] px-1.5 py-0.5 text-[10px] font-bold text-[#1F1305] hover:bg-white cursor-pointer"
              >
                Limpiar
              </button>
            )}
          </div>

          {/* Conmutadores: Agrupación (Año vs Sello) + Diseño (Dossier vs Mosaico) */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Conmutador de Agrupación sin emojis duplicados */}
            <div className="flex items-center border-2 border-[#1F1305] bg-white p-0.5 shadow-[2px_2px_0px_#1F1305]">
              <button
                type="button"
                onClick={() => setGroupingMode("year")}
                title="Agrupar por Año / Cronología histórica"
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold transition-all cursor-pointer",
                  groupingMode === "year"
                    ? "bg-[#1F1305] text-[#EDE0D0] shadow-[1px_1px_0px_#E80000]"
                    : "text-[#1F1305] hover:bg-[#EDE0D0]"
                )}
              >
                <Clock className="h-3.5 w-3.5 text-[#E80000]" />
                <span>[ CRONOLOGÍA ]</span>
              </button>
              <button
                type="button"
                onClick={() => setGroupingMode("label")}
                title="Agrupar por Sello Fonográfico"
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold transition-all cursor-pointer",
                  groupingMode === "label"
                    ? "bg-[#1F1305] text-[#EDE0D0] shadow-[1px_1px_0px_#E80000]"
                    : "text-[#1F1305] hover:bg-[#EDE0D0]"
                )}
              >
                <Building2 className="h-3.5 w-3.5 text-[#E80000]" />
                <span>[ POR SELLO ]</span>
              </button>
            </div>

            {/* Conmutador de Layout */}
            <div className="flex items-center border-2 border-[#1F1305] bg-white p-0.5 shadow-[2px_2px_0px_#1F1305]">
              <button
                type="button"
                onClick={() => setDisplayLayout("dossier")}
                title="Diseño Dossier Horizontal con Tracklist"
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold transition-all cursor-pointer",
                  displayLayout === "dossier"
                    ? "bg-[#1F1305] text-[#EDE0D0] shadow-[1px_1px_0px_#E80000]"
                    : "text-[#1F1305] hover:bg-[#EDE0D0]"
                )}
              >
                <FileText className="h-3.5 w-3.5 text-[#E80000]" />
                <span>[ DOSSIER ]</span>
              </button>
              <button
                type="button"
                onClick={() => setDisplayLayout("grid")}
                title="Diseño Mosaico Compacto con Vinilo al Cursor"
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold transition-all cursor-pointer",
                  displayLayout === "grid"
                    ? "bg-[#1F1305] text-[#EDE0D0] shadow-[1px_1px_0px_#E80000]"
                    : "text-[#1F1305] hover:bg-[#EDE0D0]"
                )}
              >
                <LayoutGrid className="h-3.5 w-3.5 text-[#E80000]" />
                <span>[ MOSAICO ]</span>
              </button>
            </div>
          </div>
        </div>

        {/* FILA 2: Soportes físicos ajustados a la búsqueda, selector de sello y filtros secundarios */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#1F1305]/20">
          {/* Pills de Formato dinámicos */}
          <div className="flex flex-wrap items-center gap-1 text-xs">
            <span className="font-bold text-[#1F1305] mr-1 flex items-center gap-1 text-[11px]">
              <Disc className="h-3 w-3 text-[#E80000]" /> FORMATO:
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
                onClick={() => setSelectedFormat(f.id)}
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

          {/* Selector de Sello, Filtro Foto y Restablecer */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Dropdown de Sellos */}
            <div className="relative">
              <select
                value={selectedLabel}
                onChange={(e) => setSelectedLabel(e.target.value)}
                aria-label="Filtrar por Sello"
                className="appearance-none border border-[#1F1305] bg-white px-2.5 py-1 pr-6 font-mono text-[11px] font-bold text-[#1F1305] focus:outline-none focus:border-[#E80000]"
              >
                <option value="ALL">Todos los Sellos ({uniqueLabels.length})</option>
                {uniqueLabels.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
              <Filter className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 h-3 w-3 text-[#1F1305]" />
            </div>

            {/* Con Foto Check */}
            <button
              type="button"
              onClick={() => setPhotoOnly(!photoOnly)}
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
      {/* SECCIÓN DEL RESUMEN EDITORIAL */}
      {/* ============================================================== */}
      <div className="flex items-center justify-between text-xs font-bold text-[#5A5245] px-1">
        <div className="flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-[#E80000]" />
          <span>
            Mostrando <strong className="text-[#1F1305]">{filteredAlbums.length}</strong> expedientes en{" "}
            <strong className="text-[#1F1305]">{groupedSections.length}</strong> capítulos{" "}
            {groupingMode === "year" ? "cronológicos" : "por sello fonográfico"}
          </span>
        </div>
        <div className="hidden sm:inline text-[11px] text-[#1F1305]">
          Haz clic en cualquier expediente para abrir la ficha pericial completa
        </div>
      </div>

      {/* ============================================================== */}
      {/* RENDERIZADO DE CAPÍTULOS CRONOLÓGICOS / POR SELLO */}
      {/* ============================================================== */}
      {groupedSections.length === 0 ? (
        <div className="border-2 border-[#1F1305] bg-white py-14 px-6 text-center shadow-[6px_6px_0px_#1F1305] max-w-2xl mx-auto relative overflow-hidden">
          <div className="inline-block border-2 border-[#E80000] bg-[#E80000] text-white px-3 py-1 text-xs font-black uppercase rotate-[-2deg] shadow-[2px_2px_0px_#1F1305] mb-4">
            REGISTRO CRONOLÓGICO VACÍO
          </div>
          <Disc className="mx-auto h-12 w-12 text-[#F1730C] mb-3" />
          <h3 className="font-cooper text-xl text-[#1F1305]">
            No se hallaron expedientes para este criterio
          </h3>
          <p className="text-xs text-[#5A5245] mt-2 max-w-md mx-auto leading-relaxed">
            Verifica el término de búsqueda o limpia los filtros temporales para volver a ver todo el acervo.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-6 inline-flex items-center gap-2 border-2 border-[#1F1305] bg-[#E80000] px-5 py-2.5 text-xs font-bold text-white shadow-[3px_3px_0px_#1F1305] hover:bg-[#1F1305] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            [ REINICIAR CRITERIOS ]
          </button>
        </div>
      ) : (
        <div className="space-y-10">
          {groupedSections.map(([groupKey, sectionAlbums]) => {
            const decadeKey =
              groupingMode === "year" && groupKey !== "S/D (Sin Datação)"
                ? `${groupKey.slice(0, 3)}0`
                : null;
            const epochText = decadeKey ? EPOCH_DESCRIPTIONS[decadeKey] : null;

            return (
              <section key={groupKey} className="space-y-4">
                {/* Cabecera de Capítulo Archival */}
                <div className="border-2 border-[#1F1305] bg-[#EDE0D0] p-3 shadow-[3px_3px_0px_#1F1305] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="bg-[#1F1305] text-[#EDE0D0] px-3 py-1 font-mono font-black text-sm flex items-center gap-1.5 border border-[#1F1305]">
                      {groupingMode === "year" ? (
                        <>
                          <Calendar className="h-4 w-4 text-[#E80000]" />
                          <span>AÑO {groupKey}</span>
                        </>
                      ) : (
                        <>
                          <Building2 className="h-4 w-4 text-[#E80000]" />
                          <span>{groupKey}</span>
                        </>
                      )}
                    </div>
                    <span className="text-xs font-bold text-[#5A5245]">
                      {sectionAlbums.length} {sectionAlbums.length === 1 ? "producción" : "producciones"} en custodia
                    </span>
                  </div>

                  {epochText && (
                    <div className="text-[11px] text-[#5A5245] italic hidden md:block max-w-lg truncate">
                      {epochText}
                    </div>
                  )}
                </div>

                {/* Renderizado de los álbumes según el layout (Dossier vs Mosaico) */}
                {displayLayout === "dossier" ? (
                  /* ======================================================== */
                  /* DISEÑO 1: DOSSIER EDITORIAL HORIZONTAL (SIN VINILO HOVER) */
                  /* ======================================================== */
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {sectionAlbums.map((album) => {
                      const albumTracks = tracksMap[album.id] || [];
                      const sideATracks = albumTracks.filter(
                        (t) => (t.side || "").toUpperCase() === "A"
                      );
                      const sideBTracks = albumTracks.filter(
                        (t) => (t.side || "").toUpperCase() === "B"
                      );

                      return (
                        <div
                          key={album.id}
                          onClick={() => onSelectAlbum?.(album)}
                          className="group border-2 border-[#1F1305] bg-[#F4EFEA] shadow-[4px_4px_0px_#1F1305] hover:shadow-[6px_6px_0px_#E80000] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex flex-col sm:flex-row overflow-hidden"
                        >
                          {/* Columna Izquierda: Funda Limpia y Nítida (Sin vinilo asomándose) */}
                          <div className="relative w-full sm:w-44 sm:min-w-[176px] aspect-square bg-[#140D04] border-b-2 sm:border-b-0 sm:border-r-2 border-[#1F1305] flex-shrink-0 overflow-hidden">
                            {/* Cabecera de evidencia: ÚNICO lugar donde aparece el año */}
                            <div className="absolute top-0 left-0 right-0 h-5 bg-[#EDE0D0] border-b border-[#1F1305] flex items-center justify-between px-2 text-[10px] text-[#1F1305] font-black z-20">
                              <span>FOLIO #{String(album.id).padStart(4, "0")}</span>
                              <span className="text-[#E80000]">{album.year || "S/D"}</span>
                            </div>

                            {album.coverUrl ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={album.coverUrl}
                                alt={album.title}
                                className="w-full h-full object-cover pt-5 transition-transform duration-300 group-hover:scale-105"
                              />
                            ) : (
                              <div className="w-full h-full pt-5 flex items-center justify-center text-white/20">
                                <Disc3 className="h-12 w-12" />
                              </div>
                            )}
                          </div>

                          {/* Columna Derecha: Ficha Técnica & Cortes */}
                          <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3">
                            <div className="space-y-1.5">
                              {/* Barra superior de insignias */}
                              <div className="flex items-center justify-between gap-2 flex-wrap">
                                <div className="flex items-center gap-1.5">
                                  <BadgeFormat formatName={album.format || "LP"} size="sm" />
                                  <span className="text-[10px] font-bold text-[#1F1305] bg-white px-1.5 py-0.5 border border-[#1F1305] truncate max-w-[120px]">
                                    {album.label || "Particular"}
                                  </span>
                                </div>
                                {album.catalogNumber && (
                                  <span className="font-mono text-[10px] font-bold bg-[#1F1305] text-white px-1.5 py-0.5 border border-white/20">
                                    {album.catalogNumber}
                                  </span>
                                )}
                              </div>

                              {/* Título de la obra y agrupación */}
                              <div>
                                <h4 className="font-black text-[#1F1305] text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-[#E80000] transition-colors">
                                  {album.title}
                                </h4>
                                <p className="text-[#E80000] font-bold text-xs truncate">
                                  {album.artist}
                                </p>
                              </div>

                              {/* Desglose de Pistas Lado A / Lado B */}
                              <div className="border border-[#1F1305]/20 bg-white p-2 text-[11px] space-y-1">
                                {sideATracks.length > 0 ? (
                                  <div className="flex items-center justify-between text-[#1F1305]">
                                    <span className="font-bold text-[#E80000] flex items-center gap-1">
                                      <Disc className="h-3 w-3" /> A:
                                    </span>
                                    <span className="truncate max-w-[180px] font-medium">
                                      {sideATracks[0].title}
                                    </span>
                                    <span className="font-mono text-[10px] text-[#746B5C]">
                                      {formatDuration(sideATracks[0].durationSeconds)}
                                    </span>
                                  </div>
                                ) : null}

                                {sideBTracks.length > 0 ? (
                                  <div className="flex items-center justify-between text-[#1F1305]">
                                    <span className="font-bold text-[#1F1305] flex items-center gap-1">
                                      <Disc className="h-3 w-3" /> B:
                                    </span>
                                    <span className="truncate max-w-[180px] font-medium">
                                      {sideBTracks[0].title}
                                    </span>
                                    <span className="font-mono text-[10px] text-[#746B5C]">
                                      {formatDuration(sideBTracks[0].durationSeconds)}
                                    </span>
                                  </div>
                                ) : null}

                                {albumTracks.length === 0 && (
                                  <div className="text-[10px] text-[#746B5C] italic flex items-center justify-between">
                                    <span>Pistas en proceso de catalogación</span>
                                    <span>{album.tracksCount ? `${album.tracksCount} cortes` : "Custodia"}</span>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Pie del Dossier: Botón de acción pericial */}
                            <div className="pt-2 border-t border-[#1F1305]/10 flex items-center justify-between text-xs font-bold text-[#1F1305] group-hover:text-[#E80000] transition-colors">
                              <span className="text-[10px] uppercase tracking-wider flex items-center gap-1">
                                <CheckCircle2 className="h-3 w-3 text-[#E80000]" />
                                EXPEDIENTE PERICIAL
                              </span>
                              <div className="flex items-center gap-1 text-[11px]">
                                <span>ABRIR MATRIZ</span>
                                <ArrowRight className="h-3 w-3 transform group-hover:translate-x-1 transition-transform" />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  /* ======================================================== */
                  /* DISEÑO 2: MOSAICO CRONOLÓGICO CON VINILO ASOMÁNDOSE     */
                  /* ======================================================== */
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5">
                    {sectionAlbums.map((album) => (
                      <div
                        key={album.id}
                        onClick={() => onSelectAlbum?.(album)}
                        className="group relative flex flex-col cursor-pointer transition-all duration-200 select-none"
                      >
                        <div className="relative aspect-square w-full">
                          {/* Disco de Vinilo Circular que asoma lateralmente al pasar el cursor */}
                          <div
                            aria-hidden="true"
                            className="absolute inset-y-2 right-2 aspect-square rounded-full bg-[#111114] shadow-2xl transition-transform duration-500 ease-out group-hover:translate-x-7 sm:group-hover:translate-x-9 z-0 overflow-hidden flex items-center justify-center border border-white/10 pointer-events-none"
                          >
                            <div className="absolute inset-2 rounded-full border border-white/5 vinyl-grooves opacity-60" />
                            <div className="absolute inset-6 rounded-full border border-white/10" />
                            <div className="absolute inset-10 rounded-full border border-white/5" />
                            <div className="relative h-11 w-11 rounded-full bg-gradient-to-tr from-amber-600 to-orange-500 flex flex-col items-center justify-center shadow-inner border border-white/30 text-center">
                              <span className="text-[6px] font-black text-[#1F1305] leading-none">
                                {album.format?.toLowerCase().includes("45") ? "45 RPM" : "33 RPM"}
                              </span>
                              <div className="h-1.5 w-1.5 rounded-full bg-black my-0.5" />
                            </div>
                          </div>

                          {/* Funda Limpia (z-10) */}
                          <div className="relative z-10 h-full w-full overflow-hidden border-2 border-[#1F1305] bg-[#140D04] shadow-[4px_4px_0px_#1F1305] transition-all duration-200 group-hover:shadow-[6px_6px_0px_#E80000] group-hover:-translate-y-1 flex flex-col justify-between">
                            {/* Cabecera con año: ÚNICO lugar donde aparece el año */}
                            <div className="absolute top-0 left-0 right-0 h-5 bg-[#EDE0D0] border-b border-[#1F1305] flex items-center justify-between px-2 text-[10px] text-[#1F1305] font-black z-20">
                              <span>FOLIO #{String(album.id).padStart(4, "0")}</span>
                              <span className="text-[#E80000]">{album.year || "S/D"}</span>
                            </div>

                            {album.coverUrl ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={album.coverUrl}
                                alt={album.title}
                                className="absolute inset-0 h-full w-full object-cover pt-5 transition-transform duration-300 group-hover:scale-102"
                              />
                            ) : (
                              <div className="absolute inset-0 pt-5 flex items-center justify-center text-white/20">
                                <Disc3 className="h-12 w-12" />
                              </div>
                            )}

                            {/* Overlay de hover translúcido */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            <div className="relative z-10 pt-7 px-2.5 flex items-start justify-start opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                              <BadgeFormat formatName={album.format || "LP"} size="sm" />
                            </div>

                            <div className="relative z-10 p-2.5 space-y-0.5 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                              <h4 className="font-bold text-white text-xs leading-tight line-clamp-2">
                                {album.title}
                              </h4>
                              <p className="text-[10px] text-[#E80000] font-bold truncate">
                                {album.artist}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}

export const DossierTimelineView = memo(DossierTimelineViewComponent);
