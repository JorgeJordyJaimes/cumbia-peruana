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
    <section id="catalogo-vinilos" className="w-full border-b border-[#1F1305] bg-[#EDE0D0] text-[#1F1305] py-10 sm:py-14 scroll-mt-20 select-none">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 space-y-6">
        
        {/* CABECERA DE HOJA DE PLANO TÉCNICO */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1F1305] pb-5">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 font-mono text-[11px] font-bold tracking-widest text-[#F1730C] uppercase">
              <span className="text-[#E80000]">+</span>
              <span>[HOJA C-01] CATÁLOGO FÍSICO DE PRENSADOS • 1968–2005</span>
            </div>

            <h2 className="font-cooper text-3xl sm:text-4xl font-black tracking-tight text-[#1F1305]">
              Bóveda de Matrices Originales
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="max-w-md font-mono text-[11px] text-[#5A5245] leading-relaxed">
              Expediente fotomecánico de 719+ carátulas restauradas, sellos de galleta en vinilo de 33 y 45 RPM,
              y especificaciones de surco con tracklists y créditos reales de sesión.
            </p>
            <Link
              href="/vinilos"
              className="inline-flex items-center gap-2 border border-[#1F1305] bg-[#E80000] px-4 py-2.5 font-mono text-xs font-bold text-white hover:bg-[#1F1305] hover:text-[#EDE0D0] transition-colors shrink-0"
            >
              <span>[EXP] SUBPÁGINA DEDICADA</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* CONTENEDOR TÉCNICO DEL EXPLORADOR (SIN SOMBRAS, BORDES PRECISOS) */}
        <div className="border border-[#1F1305] bg-white p-3 sm:p-5 relative">
          <span className="absolute -top-1.5 -left-1.5 font-mono text-[11px] text-[#E80000] font-bold leading-none">+</span>
          <span className="absolute -top-1.5 -right-1.5 font-mono text-[11px] text-[#E80000] font-bold leading-none">+</span>
          <span className="absolute -bottom-1.5 -left-1.5 font-mono text-[11px] text-[#E80000] font-bold leading-none">+</span>
          <span className="absolute -bottom-1.5 -right-1.5 font-mono text-[11px] text-[#E80000] font-bold leading-none">+</span>
          <CatalogExplorer initialAlbums={albums} tracksMap={tracksMap} />
        </div>

      </div>
    </section>
  );
}
