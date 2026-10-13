import Link from "next/link";
import { CatalogExplorer, type AlbumItem } from "@/features/albumes";
import type { TrackItem } from "@/features/temas";
import { Disc3, ArrowUpRight } from "lucide-react";

interface BrutalistCatalogSectionProps {
  albums: AlbumItem[];
  tracksMap: Record<number, TrackItem[]>;
}

export function BrutalistCatalogSection({
  albums,
  tracksMap,
}: BrutalistCatalogSectionProps) {
  return (
    <section id="catalogo-vinilos" className="w-full border-b-2 border-[#1F1305] bg-[#EDE0D0] text-[#1F1305] py-12 sm:py-16 scroll-mt-20 select-none">
      <div className="container mx-auto max-w-7xl px-3 sm:px-6 space-y-8 font-mono">
        
        {/* CABECERA: BÓVEDA DE MATRICES Y RACK DE PRENSAJES */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-[#1F1305] pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-[#E80000] uppercase">
              <Disc3 className="h-4 w-4" />
              <span>(·) BANCO DE MATRICES ANALÓGICAS & PRENSAJES ORIGINALES // BUS 06</span>
            </div>

            <h2 className="font-cooper text-3xl sm:text-5xl font-black tracking-tight text-[#1F1305]">
              Bóveda de Prensajes & Catálogo Maestro
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="max-w-md text-xs text-[#5A5245] leading-relaxed">
              Inspecciona 719+ carátulas restauradas, números de catálogo de prensado,
              y contraportadas interactivas con tracklists y créditos reales de autoría.
            </p>
            <Link
              href="/vinilos"
              className="inline-flex items-center gap-2 border-2 border-[#1F1305] bg-[#E80000] px-4 py-2.5 text-xs font-bold text-white shadow-[3px_3px_0px_#1F1305] hover:bg-[#1F1305] hover:text-[#EDE0D0] transition-all shrink-0"
            >
              <span>ENGAGE BUS 06 (SUBPÁGINA)</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* EXPLORADOR DE CATÁLOGO ENMARCADO EN CHASSIS DE RACK */}
        <div className="border-2 border-[#1F1305] bg-white p-3 sm:p-6 shadow-[6px_6px_0px_#1F1305]">
          {/* Barra superior de rack para el explorador */}
          <div className="flex items-center justify-between text-[9px] text-[#746B5C] font-bold border-b-2 border-[#1F1305] pb-2 mb-4">
            <span>(·) 19&quot; RACKMOUNT ARCHIVE CONSOLE</span>
            <span className="text-[#E80000] font-black">719+ UNITS MOUNTED</span>
            <span>(·)</span>
          </div>

          <CatalogExplorer initialAlbums={albums} tracksMap={tracksMap} />
        </div>

      </div>
    </section>
  );
}
