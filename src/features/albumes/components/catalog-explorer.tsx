"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { type AlbumItem } from "@/features/albumes/components/album-card";
import { DossierTimelineView } from "@/features/albumes/components/dossier-timeline-view";
import type { TrackItem } from "@/features/temas/components/tracklist-table";

// Lazy-load del modal de detalle fonográfico (bundle-dynamic-imports)
const AlbumDetailModal = dynamic(
  () => import("@/features/albumes/components/album-detail-modal").then((m) => m.AlbumDetailModal),
  { ssr: false }
);

interface CatalogExplorerProps {
  initialAlbums: AlbumItem[];
  tracksMap?: Record<number, TrackItem[]>;
}

export function CatalogExplorer({ initialAlbums, tracksMap = {} }: CatalogExplorerProps) {
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumItem | null>(null);

  return (
    <div className="space-y-6">
      {/* Sistema de Dossier Cronológico & Línea de Tiempo de Custodia */}
      <DossierTimelineView
        albums={initialAlbums}
        tracksMap={tracksMap}
        onSelectAlbum={(album) => setSelectedAlbum(album)}
      />

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
