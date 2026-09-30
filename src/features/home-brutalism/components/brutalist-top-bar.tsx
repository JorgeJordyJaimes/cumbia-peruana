import Link from "next/link";

interface BrutalistTopBarProps {
  totalAlbumes?: number | null;
  totalSellos?: number | null;
}

export function BrutalistTopBar({ totalAlbumes = 719, totalSellos = 258 }: BrutalistTopBarProps) {
  return (
    <div className="w-full border-b-2 border-black bg-[#EAE6DF] text-black font-mono text-[11px] sm:text-xs">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2 tracking-wider">
        {/* Columna Izquierda: Identificador de archivo */}
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-1 bg-[#F04E23]" />
          <span className="font-bold uppercase tracking-widest">
            ARCHIVO VIVO // CUMBIA PERUANA
          </span>
        </div>

        {/* Columna Centro: Coordenadas geográficas e históricas */}
        <div className="hidden md:flex items-center gap-2 text-neutral-700">
          <span>LIMA • EL RÍMAC • CHOSICA • LA SELVA</span>
          <span>—</span>
          <span>1968–2005</span>
        </div>

        {/* Columna Derecha: Estado de disponibilidad técnica */}
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#F04E23] animate-pulse" />
          <span className="font-semibold text-neutral-800">
            {totalAlbumes}+ PRENSAJES • {totalSellos} SELLOS
          </span>
          <span className="hidden lg:inline text-neutral-500">|</span>
          <Link
            href="/admin"
            className="hidden lg:inline-block hover:text-[#F04E23] underline underline-offset-2 transition-colors"
          >
            PANEL
          </Link>
        </div>
      </div>
    </div>
  );
}
