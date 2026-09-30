import Link from "next/link";

interface BrutalistTopBarProps {
  totalAlbumes?: number | null;
  totalSellos?: number | null;
}

export function BrutalistTopBar({ totalAlbumes = 719, totalSellos = 258 }: BrutalistTopBarProps) {
  return (
    <div className="w-full border-b-2 border-[#1F1305] bg-[#EDE0D0] text-[#1F1305] font-mono text-[11px] sm:text-xs">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2 tracking-wider">
        {/* Columna Izquierda: Identificador de archivo */}
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-1 bg-[#F1730C]" />
          <span className="font-bold uppercase tracking-widest text-[#1F1305]">
            ARCHIVO VIVO // CUMBIA PERUANA
          </span>
        </div>

        {/* Columna Centro: Coordenadas geográficas e históricas */}
        <div className="hidden md:flex items-center gap-2 text-[#746B5C]">
          <span>LIMA • EL RÍMAC • CHOSICA • LA SELVA</span>
          <span>—</span>
          <span>1968–2005</span>
        </div>

        {/* Columna Derecha: Estado de disponibilidad técnica */}
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#F1730C] animate-pulse" />
          <span className="font-semibold text-[#5A5245]">
            {totalAlbumes}+ PRENSAJES • {totalSellos} SELLOS
          </span>
          <span className="hidden lg:inline text-[#746B5C]/60">|</span>
          <Link
            href="/admin"
            className="hidden lg:inline-block hover:text-[#F1730C] text-[#1F1305] underline underline-offset-2 transition-colors font-semibold"
          >
            PANEL
          </Link>
        </div>
      </div>
    </div>
  );
}
