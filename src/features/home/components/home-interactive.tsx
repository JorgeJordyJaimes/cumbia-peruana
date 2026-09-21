"use client";

import { useState } from "react";
import { FeaturedTriad } from "./featured-triad";
import { GenreShowcase } from "./genre-showcase";
import { CatalogExplorer, type AlbumItem } from "@/features/albumes";
import { AlbumDetailModal } from "@/features/albumes/components/album-detail-modal";
import type { TrackItem } from "@/features/temas";

interface HomeInteractiveProps {
  albums: AlbumItem[];
  tracksMap: Record<number, TrackItem[]>;
}

export function HomeInteractive({ albums, tracksMap }: HomeInteractiveProps) {
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumItem | null>(null);

  return (
    <>
      {/* 1. Tríada de Joyas Históricas (Estilo Fire Track / Choice) */}
      <FeaturedTriad onSelectAlbum={(a) => setSelectedAlbum(a)} />

      {/* 2. Biblioteca de Géneros Musicales (Estilo Infinite Music Library) */}
      <GenreShowcase />

      {/* 3. Catálogo Físico Completo con Búsqueda y Filtros */}
      <section id="catalogo" className="scroll-mt-24 space-y-6 pt-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-fuchsia-400">
              Catálogo General & Archivo Físico
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mt-1">
              Explorador de{" "}
              <span className="bg-gradient-to-r from-rose-400 via-fuchsia-400 to-amber-400 bg-clip-text text-transparent">
                Vinilos & Casetes
              </span>
            </h2>
          </div>
          <p className="max-w-md font-mono text-xs text-neutral-400">
            Filtra por formato original (45 RPM, LP, Casete), sellos discográficos históricos y décadas doradas.
          </p>
        </div>

        <CatalogExplorer initialAlbums={albums} tracksMap={tracksMap} />
      </section>

      {/* Modal de Ficha Técnica y Tracklist */}
      {selectedAlbum && (
        <AlbumDetailModal
          album={selectedAlbum}
          tracks={tracksMap[selectedAlbum.id] || []}
          onClose={() => setSelectedAlbum(null)}
        />
      )}
    </>
  );
}
