"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, Disc, Filter, Sparkles } from "lucide-react";
import { AlbumCard, type AlbumItem } from "@/features/albumes/components/album-card";
import { AlbumDetailModal } from "@/features/albumes/components/album-detail-modal";
import type { TrackItem } from "@/features/temas/components/tracklist-table";
import { GlassCard } from "@/components/ui/glass-card";

interface CatalogExplorerProps {
  initialAlbums: AlbumItem[];
  tracksMap?: Record<number, TrackItem[]>;
}

export function CatalogExplorer({ initialAlbums, tracksMap = {} }: CatalogExplorerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFormat, setSelectedFormat] = useState<string>("ALL");
  const [selectedLabel, setSelectedLabel] = useState<string>("ALL");
  const [selectedYear, setSelectedYear] = useState<string>("ALL");
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumItem | null>(null);

  // Extraer sellos únicos
  const labels = useMemo(() => {
    const set = new Set<string>();
    initialAlbums.forEach((a) => {
      if (a.label) set.add(a.label);
    });
    return Array.from(set).sort();
  }, [initialAlbums]);

  // Extraer décadas
  const decades = [
    { label: "Todas las Décadas", value: "ALL" },
    { label: "1960s (Inicios Psicodélicos)", value: "1960" },
    { label: "1970s (Época de Oro / Chicha)", value: "1970" },
    { label: "1980s (Auge Masivo & Casetes)", value: "1980" },
    { label: "1990s - 2000s (Tecnocumbia)", value: "1990" },
  ];

  // Filtrar álbumes
  const filteredAlbums = useMemo(() => {
    return initialAlbums.filter((album) => {
      // Texto de búsqueda
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchTitle = album.title.toLowerCase().includes(query);
        const matchArtist = album.artist.toLowerCase().includes(query);
        const matchCat = album.catalogNumber?.toLowerCase().includes(query);
        const matchLabel = album.label?.toLowerCase().includes(query);
        if (!matchTitle && !matchArtist && !matchCat && !matchLabel) {
          return false;
        }
      }

      // Formato
      if (selectedFormat !== "ALL") {
        if (selectedFormat === "LP" && !album.format?.toLowerCase().includes("lp")) return false;
        if (selectedFormat === "45" && !album.format?.toLowerCase().includes("45")) return false;
        if (selectedFormat === "CASETE" && !album.format?.toLowerCase().includes("caset")) return false;
      }

      // Sello
      if (selectedLabel !== "ALL" && album.label !== selectedLabel) {
        return false;
      }

      // Década
      if (selectedYear !== "ALL") {
        const start = parseInt(selectedYear, 10);
        if (!album.year || album.year < start || album.year > start + 9) {
          return false;
        }
      }

      return true;
    });
  }, [initialAlbums, searchTerm, selectedFormat, selectedLabel, selectedYear]);

  return (
    <div className="space-y-8">
      {/* Barra de Búsqueda y Filtros Brutalista */}
      <div className="border-2 border-[#1F1305] bg-[#EDE0D0] p-4 sm:p-6 space-y-4 shadow-[4px_4px_0px_#1F1305]">
        {/* Input de Búsqueda Principal */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#E80000]" />
          <input
            type="text"
            placeholder="Buscar por título de álbum, agrupación (ej. Los Destellos, Juaneco), catálogo o sello..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border-2 border-[#1F1305] bg-white py-3.5 pl-12 pr-4 text-sm text-[#1F1305] placeholder-[#746B5C] font-mono font-medium shadow-[2px_2px_0px_#1F1305] focus:border-[#E80000] focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 border border-[#1F1305] bg-[#EDE0D0] px-2 py-0.5 font-mono text-xs font-bold text-[#1F1305] hover:bg-white"
            >
              Limpiar
            </button>
          )}
        </div>

        {/* Filtros Rápidos (Formatos, Sellos, Década) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          {/* Formato Pills */}
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
            <span className="text-[#1F1305] font-bold mr-1 flex items-center gap-1">
              <Disc className="h-3.5 w-3.5 text-[#E80000]" /> Formato:
            </span>
            {[
              { id: "ALL", label: "Todos" },
              { id: "LP", label: "LP 33 RPM" },
              { id: "45", label: "45 RPM Single" },
              { id: "CASETE", label: "Casete" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFormat(f.id)}
                className={`border-2 border-[#1F1305] px-3 py-1 font-bold transition-all ${
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

            {/* Selector Década */}
            <div className="relative">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                aria-label="Filtrar por Época o Década"
                className="appearance-none border-2 border-[#1F1305] bg-white px-3 py-1.5 pr-8 font-mono text-xs font-bold text-[#1F1305] shadow-[2px_2px_0px_#1F1305] focus:outline-none focus:border-[#E80000]"
              >
                {decades.map((d) => (
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

      {/* Resumen de Resultados */}
      <div className="flex items-center justify-between font-mono text-xs text-[#5A5245] font-bold px-1">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[#E80000]" />
          <span>
            Mostrando <strong className="text-[#1F1305]">{filteredAlbums.length}</strong> de{" "}
            <strong className="text-[#1F1305]">{initialAlbums.length}</strong> producciones físicas
          </span>
        </div>
        <span className="hidden sm:inline">
          Pasa el cursor sobre la funda para ver asomar el vinilo
        </span>
      </div>

      {/* Grid de Álbumes */}
      {filteredAlbums.length === 0 ? (
        <div className="border-2 border-[#1F1305] bg-white py-16 text-center shadow-[6px_6px_0px_#1F1305] p-6">
          <Disc className="mx-auto h-12 w-12 text-[#F1730C] mb-3" />
          <p className="font-cooper text-lg text-[#1F1305]">
            No se encontraron producciones discográficas con esos criterios.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedFormat("ALL");
              setSelectedLabel("ALL");
              setSelectedYear("ALL");
            }}
            className="mt-4 inline-flex items-center gap-2 border-2 border-[#1F1305] bg-[#E80000] px-4 py-2 font-mono text-xs font-bold text-white shadow-[3px_3px_0px_#1F1305] hover:bg-[#1F1305] transition-colors"
          >
            Restablecer todos los filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {filteredAlbums.slice(0, 48).map((album) => (
            <AlbumCard
              key={album.id}
              album={album}
              onSelect={(a) => setSelectedAlbum(a)}
            />
          ))}
        </div>
      )}

      {/* Modal con Ficha Técnica y Tracklist */}
      {selectedAlbum && (
        <AlbumDetailModal
          album={selectedAlbum}
          tracks={tracksMap[selectedAlbum.id] || []}
          onClose={() => setSelectedAlbum(null)}
        />
      )}
    </div>
  );
}
