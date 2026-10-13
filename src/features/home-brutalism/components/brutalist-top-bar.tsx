import Link from "next/link";

interface BrutalistTopBarProps {
  totalAlbumes?: number | null;
  totalSellos?: number | null;
}

export function BrutalistTopBar({ totalAlbumes = 719, totalSellos = 258 }: BrutalistTopBarProps) {
  return (
    <div className="w-full border-b-2 border-[#1F1305] bg-[#EDE0D0] text-[#1F1305] font-mono text-[10px] sm:text-[11px] select-none">
      <div className="container mx-auto max-w-7xl px-3 sm:px-6 py-1.5 flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Lado Izquierdo: Rack Screws & Estado de Transporte de Cinta */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-[9px] text-[#746B5C] font-black tracking-widest hidden sm:inline">
            (·) RACK-00
          </span>
          <div className="flex items-center gap-1.5 border border-[#1F1305] bg-[#1F1305] px-2 py-0.5 text-white shadow-[1px_1px_0px_#E80000]">
            <span className="inline-block w-2 h-2 rounded-full bg-[#E80000] animate-pulse shadow-[0_0_6px_#E80000]" />
            <span className="text-[9px] font-black tracking-widest text-[#E80000]">REC 15 IPS</span>
          </div>
          <span className="font-black uppercase tracking-wider text-[#1F1305]">
            CONSOLA MASTER 24-TRACK
          </span>
          <span className="hidden xl:inline text-[#746B5C]">
            // 320 nWb/m NAB CALIBRATED
          </span>
        </div>

        {/* Centro: Estéreo VU Meter Analógico Simulado en Vivo */}
        <div className="hidden lg:flex items-center gap-3 border border-[#1F1305] bg-white px-3 py-1 shadow-[2px_2px_0px_#1F1305]">
          <span className="text-[9px] font-bold text-[#746B5C] tracking-tighter">VU STEREO</span>
          {/* Canal L */}
          <div className="flex items-center gap-1">
            <span className="text-[9px] font-bold text-[#1F1305]">L</span>
            <div className="w-20 h-2.5 bg-[#EDE0D0] border border-[#1F1305] overflow-hidden flex">
              <div className="animate-vu-l bg-gradient-to-r from-[#F8C800] via-[#F1730C] to-[#E80000] h-full" />
            </div>
          </div>
          {/* Canal R */}
          <div className="flex items-center gap-1">
            <span className="text-[9px] font-bold text-[#1F1305]">R</span>
            <div className="w-20 h-2.5 bg-[#EDE0D0] border border-[#1F1305] overflow-hidden flex">
              <div className="animate-vu-r bg-gradient-to-r from-[#F8C800] via-[#F1730C] to-[#E80000] h-full" />
            </div>
          </div>
          <span className="text-[8px] font-bold text-[#E80000]">+3dB PEAK</span>
        </div>

        {/* Lado Derecho: Telemetría de Archivo y Panel */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 text-[#5A5245] font-semibold">
            <span className="text-[#E80000] font-black">●</span>
            <span>{totalAlbumes}+ MATRICES</span>
            <span>•</span>
            <span>{totalSellos} SELLOS</span>
          </div>
          <span className="hidden sm:inline text-[#746B5C]/50">|</span>
          <Link
            href="/admin"
            className="border border-[#1F1305] bg-white px-2 py-0.5 hover:bg-[#E80000] hover:text-white transition-colors font-bold text-[10px]"
          >
            PANEL [SYS]
          </Link>
          <span className="font-mono text-[9px] text-[#746B5C] font-black tracking-widest hidden sm:inline">
            (·)
          </span>
        </div>
      </div>
    </div>
  );
}
