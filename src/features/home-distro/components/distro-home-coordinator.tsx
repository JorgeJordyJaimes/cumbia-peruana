"use client";

import { useState } from "react";
import { DistroCategoriesBar } from "./distro-categories-bar";
import { DistroCatalogGrid } from "./distro-catalog-grid";
import { DistroTriptych } from "./distro-triptych";
import { CatalogExplorer, type AlbumItem } from "@/features/albumes";
import { AlbumDetailModal } from "@/features/albumes/components/album-detail-modal";
import type { TrackItem } from "@/features/temas";

interface DistroHomeCoordinatorProps {
  albums: AlbumItem[];
  tracksMap: Record<number, TrackItem[]>;
}

export function DistroHomeCoordinator({ albums, tracksMap }: DistroHomeCoordinatorProps) {
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumItem | null>(null);

  // Formatear álbumes para la cuadrícula distro (con BPM y Camelot)
  const distroGridAlbums = albums.slice(0, 6).map((a) => {
    const albumTracks = tracksMap[a.id] || [];
    const firstTrack = albumTracks[0];
    return {
      id: a.id,
      title: a.title,
      artist: a.artist,
      year: a.year,
      label: a.label,
      catalogNumber: a.catalogNumber,
      format: a.format,
      coverUrl: a.coverUrl,
      bpm: firstTrack?.bpm || null,
      camelot: firstTrack?.camelot || null,
      musicalKey: firstTrack?.musicalKey || null,
    };
  });

  return (
    <div className="space-y-12">
      {/* 1. Tira de Categorías y Formatos en Píldoras Circulares */}
      <DistroCategoriesBar />

      {/* 2. Cuadrícula Asimétrica 4 + 2 + 1 de Vinilos */}
      <DistroCatalogGrid
        albums={distroGridAlbums}
        onOpenDetails={(album) => setSelectedAlbum(album)}
      />

      {/* 3. Bloque Tripartito Inferior de Preservación de Vinilos */}
      <DistroTriptych />

      {/* 4. Explorador Completo del Catálogo General */}
      <section className="pt-8 space-y-6">
        <div className="border-b border-white/10 pb-4">
          <h3 className="font-serif text-2xl font-bold text-white">
            Explorador Completo del Archivo Físico
          </h3>
          <p className="font-mono text-xs text-neutral-400 mt-1">
            Filtra por formato, sello discográfico de época y década
          </p>
        </div>

        <CatalogExplorer initialAlbums={albums} tracksMap={tracksMap} />
      </section>

      {/* Modal de Ficha Técnica del Vinilo */}
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
