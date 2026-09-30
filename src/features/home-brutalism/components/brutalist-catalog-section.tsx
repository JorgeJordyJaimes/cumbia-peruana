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
    <section id="catalogo-vinilos" className="w-full border-b-2 border-black bg-[#EAE6DF] text-black py-12 sm:py-16 scroll-mt-20">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 space-y-8">
        
        {/* CABECERA EDITORIAL BRUTALISTA CON COOPER BLACK */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-black pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-[#F04E23] uppercase">
              <Disc3 className="h-4 w-4" />
              <span>CATÁLOGO FÍSICO • 1968–2005</span>
            </div>

            <h2 className="font-cooper text-3xl sm:text-5xl font-black tracking-tight text-black">
              Bóveda de Prensajes Originales
            </h2>
          </div>

          <p className="max-w-md font-mono text-xs text-neutral-700 leading-relaxed">
            Inspecciona 719+ carátulas restauradas, sellos matrices en vinilo de 33 y 45 RPM,
            y contraportadas interactivas con tracklists y créditos de sesión.
          </p>
        </div>

        {/* EXPLORADOR DE CATÁLOGO */}
        <div className="border-2 border-black bg-white p-4 sm:p-6 shadow-[6px_6px_0px_#111111]">
          <CatalogExplorer initialAlbums={albums} tracksMap={tracksMap} />
        </div>

      </div>
    </section>
  );
}
