import Link from "next/link";

interface BrutalistTopBarProps {
  totalAlbumes?: number | null;
  totalSellos?: number | null;
}

export function BrutalistTopBar({ totalAlbumes = 719, totalSellos = 258 }: BrutalistTopBarProps) {
  return (
    <div className="w-full border-b-2 border-[#1F1305] bg-[#EDE0D0] text-[#1F1305] font-mono text-[11px] select-none">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-2 flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Izquierda: Sello de desclasificación y legajo */}
        <div className="flex items-center gap-2.5">
          <span className="border-2 border-[#E80000] bg-[#E80000] px-2 py-0.2 text-[11px] font-black text-white uppercase tracking-widest rotate-[-1deg] shadow-[1px_1px_0px_#1F1305]">
            DESCLASIFICADO
          </span>
          <span className="font-bold uppercase tracking-wider text-[#1F1305]">
            EXPEDIENTE GENERAL // CUMBIA PERUANA (1968–2005)
          </span>
          <span className="hidden xl:inline-block text-[#665D4F] font-semibold">
            — LEGAJO NO. EXP-PE-1970
          </span>
        </div>

        {/* Centro: Barra de censura decorativa y nivel de acceso */}
        <div className="hidden lg:flex items-center gap-2 text-[#665D4F] font-bold text-[11px]">
          <span>CLASIF: PÚBLICA</span>
          <span className="text-[#1F1305] font-black">██████</span>
          <span>CUSTODIA: PATRIMONIAL</span>
        </div>

        {/* Derecha: Conteo de evidencias y panel */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-bold text-[#1F1305]">
            <span className="text-[#E80000] font-black">★</span>
            <span>{totalAlbumes}+ EVIDENCIAS EN CUSTODIA</span>
            <span>•</span>
            <span>{totalSellos} SELLOS</span>
          </div>
          <span className="hidden sm:inline text-[#665D4F]">|</span>
          <Link
            href="/admin"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-[#1F1305] bg-white px-2 py-0.5 hover:bg-[#E80000] hover:text-white hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_#1F1305] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all font-black text-[11px] shadow-[2px_2px_0px_#1F1305]"
          >
            PANEL [SYS] ↗
          </Link>
        </div>
      </div>
    </div>
  );
}
