import Link from "next/link";

interface BrutalistTopBarProps {
  totalAlbumes?: number | null;
  totalSellos?: number | null;
}

export function BrutalistTopBar({ totalAlbumes = 719, totalSellos = 258 }: BrutalistTopBarProps) {
  return (
    <div className="w-full border-b-2 border-[#1F1305] bg-[#EDE0D0] text-[#1F1305] font-mono text-[10px] sm:text-[11px] select-none">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-2 flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Izquierda: Notación de imprenta tipográfica y serie editorial */}
        <div className="flex items-center gap-2.5">
          <span className="border border-[#1F1305] bg-[#E80000] px-1.5 py-0.2 text-[9px] font-black text-white uppercase tracking-widest">
            VOL. I
          </span>
          <span className="font-bold uppercase tracking-wider text-[#1F1305]">
            ARCHIVO TIPOGRÁFICO // CUMBIA PERUANA (1968–2005)
          </span>
          <span className="hidden xl:inline-block text-[#746B5C]">
            — DEP. LEG. NO. 1978-B
          </span>
        </div>

        {/* Centro: Especificación de papel y tipografía */}
        <div className="hidden lg:flex items-center gap-2 text-[#746B5C] font-semibold text-[10px]">
          <span>TIPO: ANTON &amp; COOPER BLACK</span>
          <span>•</span>
          <span>FORMATO: 33 &amp; 45 RPM</span>
        </div>

        {/* Derecha: Conteo exacto y acceso a panel */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-bold text-[#1F1305]">
            <span className="text-[#E80000] font-black">§</span>
            <span>{totalAlbumes}+ MATRICES IMPRESAS</span>
            <span>•</span>
            <span>{totalSellos} SELLOS</span>
          </div>
          <span className="hidden sm:inline text-[#746B5C]/40">|</span>
          <Link
            href="/admin"
            className="border border-[#1F1305] bg-white px-2 py-0.5 hover:bg-[#1F1305] hover:text-white transition-colors font-bold text-[10px]"
          >
            PANEL [ADMIN] ↗
          </Link>
        </div>
      </div>
    </div>
  );
}
