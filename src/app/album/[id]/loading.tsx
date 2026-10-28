import { BrutalSkeleton } from "@/components/ui/brutal-skeleton";
import { BrutalistCoordinator, BrutalistFooter } from "@/features/home-brutalism";

export default function AlbumLoading() {
  return (
    <div className="relative min-h-screen bg-[#EDE0D0] text-[#1F1305]">
      <BrutalistCoordinator>
        <main id="contenido" className="container mx-auto max-w-7xl px-4 sm:px-6 pt-6 pb-20 space-y-10 font-mono">
          <div className="border-2 border-[#1F1305] bg-white p-6 shadow-[6px_6px_0px_#1F1305] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 bg-[#E80000] animate-ping" />
              <span className="font-bold text-xs uppercase text-[#1F1305]">
                CARGANDO EXPEDIENTE FONOGRÁFICO INDIVIDUAL...
              </span>
            </div>
            <span className="text-xs text-[#665D4F] font-bold">REGISTRO MAESTRO</span>
          </div>

          <div className="border-2 border-[#1F1305] bg-white p-8 shadow-[8px_8px_0px_#1F1305] flex flex-col md:flex-row gap-8">
            <div className="w-full sm:w-64 md:w-72 lg:w-80 aspect-square border-2 border-dashed border-[#1F1305] bg-[#EDE0D0]/50 flex items-center justify-center">
              <span className="text-xs font-black text-[#1F1305]">[ CARGANDO CARÁTULA... ]</span>
            </div>
            <div className="flex-1 space-y-4">
              <div className="h-6 w-1/3 bg-[#1F1305]/10 border border-[#1F1305]/20" />
              <div className="h-10 w-3/4 bg-[#1F1305]/15 border border-[#1F1305]/30" />
              <div className="h-4 w-1/2 bg-[#1F1305]/10 border border-[#1F1305]/20" />
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-16 border border-[#1F1305] bg-[#EDE0D0]/40 p-2" />
                ))}
              </div>
            </div>
          </div>
        </main>
      </BrutalistCoordinator>
      <BrutalistFooter />
    </div>
  );
}
