import Link from "next/link";
import { CatalogExplorer, type AlbumItem } from "@/features/albumes";
import type { TrackItem } from "@/features/temas";
import { Disc3, ArrowUpRight, ShieldCheck } from "lucide-react";

interface BrutalistCatalogSectionProps {
  albums: AlbumItem[];
  tracksMap: Record<number, TrackItem[]>;
}

export function BrutalistCatalogSection({
  albums,
  tracksMap,
}: BrutalistCatalogSectionProps) {
  return (
    <section id="catalogo-vinilos" className="w-full border-b-2 border-[#1F1305] bg-[#EDE0D0] brutalist-dots-light text-[#1F1305] py-12 sm:py-16 scroll-mt-20 select-none font-mono">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 space-y-8">
        
        {/* CABECERA DE BÓVEDA DE CUSTODIA FONOGRÁFICA */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-[#1F1305] pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-[#E80000] uppercase">
              <ShieldCheck className="h-4 w-4" />
              <span>BÓVEDA CENTRAL DE CUSTODIA // EVIDENCIA FÍSICA EN VINILO 1968–2005</span>
            </div>

            <h2 className="font-cooper text-3xl sm:text-5xl font-black tracking-tight text-[#1F1305]">
              Bóveda de Evidencia Fonográfica
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="max-w-md text-xs text-[#5A5245] leading-relaxed">
              Expediente completo de 719+ piezas de evidencia física con carátulas restauradas,
              números de matriz en vinilo de 33 y 45 RPM, fichas periciales y créditos autorales.
            </p>
            <Link
              href="/vinilos"
              className="inline-flex items-center gap-2 border-2 border-[#1F1305] bg-[#E80000] px-4 py-2.5 text-xs font-bold text-white shadow-[3px_3px_0px_#1F1305] hover:bg-[#1F1305] hover:text-[#EDE0D0] transition-all shrink-0"
            >
              <span>ABRIR EXP. 06 (SUBPÁGINA)</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* EXPLORADOR DE CATÁLOGO ENMARCADO EN BORDE DE 2PX */}
        <div className="border-2 border-[#1F1305] bg-white p-4 sm:p-6 shadow-[6px_6px_0px_#1F1305] relative">
          <span className="absolute -top-1.5 -left-1.5 font-mono text-xs text-[#E80000] font-bold leading-none z-20">+</span>
          <span className="absolute -top-1.5 -right-1.5 font-mono text-xs text-[#E80000] font-bold leading-none z-20">+</span>
          <span className="absolute -bottom-1.5 -left-1.5 font-mono text-xs text-[#E80000] font-bold leading-none z-20">+</span>
          <span className="absolute -bottom-1.5 -right-1.5 font-mono text-xs text-[#E80000] font-bold leading-none z-20">+</span>
          <div className="flex items-center justify-between text-[9px] text-[#746B5C] font-black border-b-2 border-[#1F1305] pb-2 mb-4">
            <span>REGISTRO DE INVENTARIO GENERAL // ARCHIVO NACIONAL</span>
            <span className="text-[#E80000]">719+ PIEZAS IDENTIFICADAS</span>
          </div>

          <CatalogExplorer initialAlbums={albums} tracksMap={tracksMap} />
        </div>

      </div>
    </section>
  );
}
