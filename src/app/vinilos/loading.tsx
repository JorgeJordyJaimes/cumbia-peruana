import { BrutalSkeleton } from "@/components/ui/brutal-skeleton";
import { BrutalistCoordinator, BrutalistFooter } from "@/features/home-brutalism";

export default function Loading() {
  return (
    <div className="relative min-h-screen bg-[#EDE0D0] text-[#1F1305]">
      <BrutalistCoordinator>
        <main id="contenido" className="container mx-auto max-w-7xl px-4 sm:px-6 pt-6 pb-20 space-y-8 font-mono">
          <div className="border-2 border-[#1F1305] bg-white p-6 shadow-[6px_6px_0px_#1F1305] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 bg-[#E80000] animate-ping" />
              <span className="font-bold text-xs uppercase text-[#1F1305]">
                ACCEDIENDO AL ARCHIVO PATRIMONIAL DE MATRICES...
              </span>
            </div>
            <span className="text-xs text-[#665D4F] font-bold">1968–2005</span>
          </div>

          <BrutalSkeleton count={18} />
        </main>
      </BrutalistCoordinator>
      <BrutalistFooter />
    </div>
  );
}
