import Link from "next/link";

interface BrutalistTopBarProps {
  totalAlbumes?: number | null;
  totalSellos?: number | null;
}

export function BrutalistTopBar({ totalAlbumes = 719, totalSellos = 258 }: BrutalistTopBarProps) {
  return (
    <div className="w-full border-b border-[#1F1305] bg-[#EDE0D0] text-[#1F1305] font-mono text-[10px] sm:text-[11px] select-none">
      {/* Regla métrica superior tipo cota técnica */}
      <div className="hidden lg:flex items-center justify-between px-4 py-0.5 border-b border-[#1F1305]/20 text-[9px] text-[#746B5C] tracking-widest uppercase">
        <span>000.0 MM [MARGEN IZQ]</span>
        <span className="tracking-[0.4em]">|···|···|···|···| PLANTA DE PRENSADO MATRIZ · ESCALA 1:1 |···|···|···|···|</span>
        <span>300.0 MM [DIÁMETRO VINILO]</span>
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-2 flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Columna Izquierda: Identificador de plano y código de especificación */}
        <div className="flex items-center gap-2.5">
          <span className="font-mono font-bold text-[#E80000]">[SPEC-01]</span>
          <span className="font-bold tracking-wider uppercase text-[#1F1305]">
            PLANO MAESTRO DE PRENSADO // ARCHIVO HISTÓRICO
          </span>
          <span className="hidden xl:inline-block border border-[#1F1305] bg-[#1F1305] px-1.5 py-0.2 text-[9px] font-mono font-bold text-[#EDE0D0] uppercase">
            REV. 1968–2005
          </span>
        </div>

        {/* Columna Centro: Tolerancia mecánica y velocidad */}
        <div className="hidden md:flex items-center gap-3 text-[#5A5245] font-mono text-[10px]">
          <span className="border-l border-r border-[#1F1305]/30 px-2">
            VELOCIDADES: <strong className="text-[#1F1305]">33⅓ / 45 RPM</strong>
          </span>
          <span>TOLERANCIA DE SURCO: <strong className="text-[#1F1305]">±0.02 MM</strong></span>
        </div>

        {/* Columna Derecha: Estado de inspección técnica */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 border border-[#1F1305] bg-white px-2 py-0.5">
            <span className="inline-block w-1.5 h-1.5 bg-[#E80000]" />
            <span className="text-[10px] font-bold text-[#1F1305] uppercase">
              CONTROL DE CALIDAD: APROBADO
            </span>
          </div>
          <span className="font-bold text-[#1F1305]">
            {totalAlbumes}+ MATRICES • {totalSellos} SELLOS
          </span>
          <span className="hidden lg:inline text-[#1F1305]/40">+</span>
          <Link
            href="/admin"
            className="hidden lg:inline-block hover:bg-[#1F1305] hover:text-[#EDE0D0] text-[#1F1305] border border-[#1F1305] px-1.5 py-0.5 transition-colors font-bold text-[10px]"
          >
            PANEL
          </Link>
        </div>
      </div>
    </div>
  );
}

