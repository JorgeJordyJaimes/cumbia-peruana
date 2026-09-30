import { CatalogExplorer, type AlbumItem } from "@/features/albumes";
import type { TrackItem } from "@/features/temas";
import { Disc3 } from "lucide-react";

interface BrutalistCatalogSectionProps {
  albums: AlbumItem[];
  tracksMap: Record<number, TrackItem[]>;
}

export function BrutalistCatalogSection({
  albums,
  tracksMap,
}: BrutalistCatalogSectionProps) {
  return (
    <section id="catalogo-vinilos" className="w-full border-b-2 border-[#1F1305] bg-[#EDE0D0] text-[#1F1305] py-12 sm:py-16 scroll-mt-20">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 space-y-8">
        
        {/* CABECERA EDITORIAL BRUTALISTA CON COOPER BLACK */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-[#1F1305] pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-[#F1730C] uppercase">
              <Disc3 className="h-4 w-4" />
              <span>CATÁLOGO FÍSICO • 1968–2005</span>
            </div>

            <h2 className="font-cooper text-3xl sm:text-5xl font-black tracking-tight text-[#1F1305]">
              Bóveda de Prensajes Originales
            </h2>
          </div>

          <p className="max-w-md font-mono text-xs text-[#5A5245] leading-relaxed">
            Inspecciona 719+ carátulas restauradas, sellos matrices en vinilo de 33 y 45 RPM,
            y contraportadas interactivas con tracklists y créditos de sesión.
          </p>
        </div>

        {/* EXPLORADOR DE CATÁLOGO */}
        <div className="border-2 border-[#1F1305] bg-white p-4 sm:p-6 shadow-[6px_6px_0px_#1F1305]">
          <CatalogExplorer initialAlbums={albums} tracksMap={tracksMap} />
        </div>

      </div>
    </section>
  );
}
