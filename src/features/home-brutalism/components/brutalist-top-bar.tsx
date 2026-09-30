import Link from "next/link";

interface BrutalistTopBarProps {
  totalAlbumes?: number | null;
  totalSellos?: number | null;
}

export function BrutalistTopBar({ totalAlbumes = 719, totalSellos = 258 }: BrutalistTopBarProps) {
  return (
    <div className="w-full border-b-2 border-[#1F1305] bg-[#EDE0D0] text-[#1F1305] font-mono text-[11px] sm:text-xs">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-2 flex flex-col sm:flex-row items-center justify-between gap-2 tracking-wider">
        {/* Columna Izquierda: Identificador de archivo con micro-acento Cyan */}
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#2EF0E8] shadow-[0_0_6px_#2EF0E8]" />
          <span className="font-bold uppercase tracking-widest text-[#1F1305]">
            ARCHIVO VIVO // CUMBIA PERUANA
          </span>
          <span className="hidden xl:inline-block border border-[#2EF0E8] bg-[#2EF0E8]/20 px-1.5 py-0.2 text-[9px] font-black text-[#136B66] uppercase">
            CHICHA & PSICODELIA
          </span>
        </div>

        {/* Columna Centro: Coordenadas geográficas e históricas */}
        <div className="hidden md:flex items-center gap-2 text-[#746B5C]">
          <span>LIMA • EL RÍMAC • CHOSICA • LA SELVA</span>
          <span>—</span>
          <span>1968–2005</span>
        </div>

        {/* Columna Derecha: Indicador REC Rojo de Estudio & Conteo */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 border border-[#1F1305] bg-white px-2 py-0.5 shadow-[1px_1px_0px_#1F1305]">
            <span className="inline-block w-2 h-2 rounded-full bg-[#E80000] animate-pulse shadow-[0_0_6px_#E80000]" />
            <span className="text-[10px] font-bold text-[#E80000]">REC 45 RPM</span>
          </div>
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
