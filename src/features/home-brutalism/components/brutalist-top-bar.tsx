interface BrutalistTopBarProps {
  totalAlbumes?: number | null;
  totalSellos?: number | null;
}

export function BrutalistTopBar({ totalAlbumes, totalSellos }: BrutalistTopBarProps) {
  const formattedAlbumes = totalAlbumes && totalAlbumes > 0 ? `${totalAlbumes.toLocaleString("es-PE")}+` : "721+";
  const formattedSellos = totalSellos && totalSellos > 0 ? totalSellos.toLocaleString("es-PE") : "258";

  return (
    <div className="w-full border-b-2 border-[#1F1305] bg-[#EDE0D0] text-[#1F1305] font-mono text-[10px] sm:text-[11px] select-none">
      <div className="container mx-auto max-w-7xl px-3 sm:px-6 py-1.5 flex flex-wrap items-center justify-between gap-y-1.5 gap-x-3">
        {/* Izquierda: Sello de desclasificación y legajo */}
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="border-2 border-[#E80000] bg-[#E80000] px-1.5 py-0.2 text-[10px] font-black text-white uppercase tracking-widest rotate-[-1deg] shadow-[1px_1px_0px_#1F1305]">
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
        <div className="hidden lg:flex items-center gap-2 text-[#665D4F] font-bold text-[10px] sm:text-[11px] whitespace-nowrap">
          <span>CLASIF: PÚBLICA</span>
          <span className="text-[#1F1305] font-black tracking-tighter">██████</span>
          <span>CUSTODIA: PATRIMONIAL</span>
        </div>

        {/* Derecha: Conteo de evidencias */}
        <div className="flex items-center gap-2.5 whitespace-nowrap ml-auto sm:ml-0">
          <div className="flex items-center gap-1.5 font-bold text-[#1F1305]">
            <span className="text-[#E80000] font-black">★</span>
            <span>{formattedAlbumes} EVIDENCIAS EN CUSTODIA</span>
            <span>•</span>
            <span>{formattedSellos} SELLOS</span>
          </div>
          <span className="hidden sm:inline border border-[#1F1305] bg-white px-1.5 py-0.2 font-black text-[#10B981] text-[10px] shadow-[1px_1px_0px_#1F1305]">
            ● ACTIVO
          </span>
        </div>
      </div>
    </div>
  );
}
