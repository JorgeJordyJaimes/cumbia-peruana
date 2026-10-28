"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { type AlbumItem } from "@/features/albumes/components/album-card";
import { DossierTimelineView } from "@/features/albumes/components/dossier-timeline-view";
import type { TrackItem } from "@/features/temas/components/tracklist-table";

// Lazy-load del modal de detalle fonográfico (bundle-dynamic-imports)
const AlbumDetailModal = dynamic(
  () => import("@/features/albumes/components/album-detail-modal").then((m) => m.AlbumDetailModal),
  { ssr: false }
);

interface VinilosCatalogExplorerProps {
  initialAlbums: AlbumItem[];
  tracksMap?: Record<number, TrackItem[]>;
}

function VinilosCatalogExplorerInner({ initialAlbums, tracksMap = {} }: VinilosCatalogExplorerProps) {
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumItem | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Sincronizar álbum abierto con ?album=ID de la URL
  useEffect(() => {
    const albumIdParam = searchParams.get("album");
    if (albumIdParam) {
      const idNum = parseInt(albumIdParam, 10);
      const found = initialAlbums.find((a) => a.id === idNum);
      if (found) {
        setSelectedAlbum(found);
      }
    } else {
      setSelectedAlbum(null);
    }
  }, [searchParams, initialAlbums]);

  const handleSelectAlbum = useCallback(
    (album: AlbumItem) => {
      setSelectedAlbum(album);
      const params = new URLSearchParams(searchParams.toString());
      params.set("album", String(album.id));
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const handleCloseModal = useCallback(() => {
    setSelectedAlbum(null);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("album");
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [pathname, router, searchParams]);

  return (
    <div className="space-y-6">
      {/* Sistema Completo de Dossier Cronológico & Línea de Tiempo de Custodia para la Subpágina */}
      <DossierTimelineView
        albums={initialAlbums}
        tracksMap={tracksMap}
        onSelectAlbum={handleSelectAlbum}
      />

      {/* Modal con Ficha Técnica y Tracklist */}
      {selectedAlbum ? (
        <AlbumDetailModal
          album={selectedAlbum}
          tracks={tracksMap[selectedAlbum.id] || []}
          onClose={handleCloseModal}
        />
      ) : null}
    </div>
  );
}

export function VinilosCatalogExplorer(props: VinilosCatalogExplorerProps) {
  return (
    <Suspense fallback={null}>
      <VinilosCatalogExplorerInner {...props} />
    </Suspense>
  );
}
