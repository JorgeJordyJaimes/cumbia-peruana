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
      {/* Barra de Búsqueda y Filtros con Glassmorphism */}
      <GlassCard variant="editorial" className="p-4 sm:p-6 space-y-4">
        {/* Input de Búsqueda Principal */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
          <input
            type="text"
            placeholder="Buscar por título de álbum, agrupación (ej. Los Destellos, Juaneco), catálogo o sello..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/50 py-3.5 pl-12 pr-4 text-sm text-white placeholder-neutral-500 backdrop-blur-md transition-all focus:border-amber-400/80 focus:bg-black/80 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-md bg-white/10 px-2 py-0.5 font-mono text-xs text-neutral-400 hover:text-white"
            >
              Limpiar
            </button>
          )}
        </div>

        {/* Filtros Rápidos (Formatos, Sellos, Década) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          {/* Formato Pills */}
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
            <span className="text-neutral-500 mr-1 flex items-center gap-1">
              <Disc className="h-3.5 w-3.5 text-amber-400" /> Formato:
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
                className={`rounded-lg px-3 py-1 transition-all ${
                  selectedFormat === f.id
                    ? "bg-amber-500 text-black font-semibold shadow-md shadow-amber-500/20"
                    : "border border-white/10 bg-white/5 text-neutral-300 hover:border-white/20 hover:bg-white/10"
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
                className="appearance-none rounded-lg border border-white/10 bg-black/60 px-3 py-1.5 pr-8 font-mono text-xs text-neutral-300 backdrop-blur-md focus:border-amber-400 focus:outline-none"
              >
                <option value="ALL">Todos los Sellos ({labels.length})</option>
                {labels.slice(0, 30).map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
              <Filter className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-neutral-500" />
            </div>

            {/* Selector Década */}
            <div className="relative">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                aria-label="Filtrar por Época o Década"
                className="appearance-none rounded-lg border border-white/10 bg-black/60 px-3 py-1.5 pr-8 font-mono text-xs text-neutral-300 backdrop-blur-md focus:border-amber-400 focus:outline-none"
              >
                {decades.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
              <SlidersHorizontal className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-neutral-500" />
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Resumen de Resultados */}
      <div className="flex items-center justify-between font-mono text-xs text-neutral-400 px-1">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-amber-400" />
          <span>
            Mostrando <strong className="text-white">{filteredAlbums.length}</strong> de{" "}
            <strong className="text-white">{initialAlbums.length}</strong> producciones físicas
          </span>
        </div>
        <span className="text-neutral-500 hidden sm:inline">
          Pasa el cursor sobre la portada para ver el disco
        </span>
      </div>

      {/* Grid de Álbumes */}
      {filteredAlbums.length === 0 ? (
        <GlassCard className="py-16 text-center">
          <Disc className="mx-auto h-12 w-12 text-neutral-600 mb-3" />
          <p className="font-mono text-base text-neutral-300">
            No se encontraron producciones discográficas con esos criterios.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedFormat("ALL");
              setSelectedLabel("ALL");
              setSelectedYear("ALL");
            }}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 font-mono text-xs font-bold text-black hover:bg-amber-400 transition-colors"
          >
            Restablecer todos los filtros
          </button>
        </GlassCard>
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
