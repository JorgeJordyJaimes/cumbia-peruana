import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ArrowRight, Archive } from "lucide-react";
import type { HallazgoRadarItem } from "../types";

interface HistorialHallazgosProps {
  items: HallazgoRadarItem[];
}

export function HistorialHallazgos({ items }: HistorialHallazgosProps) {
  return (
    <section className="space-y-6 pt-6 border-t-2 border-[#1F1305]">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b-2 border-[#1F1305] pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-mono text-xs font-black uppercase text-[#E80000]">
            <Archive className="h-4 w-4" />
            <span>ARCHIVO CRONOLÓGICO</span>
          </div>
          <h2 className="font-cooper text-2xl sm:text-3xl font-black text-[#1F1305]">
            Historial de Hallazgos Mensuales
          </h2>
        </div>
        <span className="font-mono text-xs text-[#5A5245]">
          Colección de fichas patrimoniales anteriores
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <article
            key={item.id}
            className="border-2 border-[#1F1305] bg-white p-5 shadow-[4px_4px_0px_#1F1305] flex flex-col justify-between hover:-translate-y-1 hover:shadow-[6px_6px_0px_#F1730C] transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between font-mono text-[11px] border-b border-[#1F1305]/20 pb-2">
                <span className="border border-[#1F1305] bg-[#1F1305] text-[#EDE0D0] px-2 py-0.5 font-black uppercase">
                  {item.mes} {item.año}
                </span>
                <span className="border border-[#1F1305] bg-[#EDE0D0] text-[#1F1305] px-1.5 py-0.5 font-bold text-[10px]">
                  {item.categoria}
                </span>
              </div>

              <div className="relative aspect-[16/10] w-full border border-[#1F1305] bg-[#EDE0D0] overflow-hidden">
                <Image
                  src={item.portadaUrl}
                  alt={item.titulo}
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="object-cover grayscale contrast-125 hover:grayscale-0 transition-all"
                />
              </div>

              <div className="space-y-1">
                <h3 className="font-cooper text-lg font-black text-[#1F1305] leading-snug">
                  {item.titulo}
                </h3>
                <p className="font-mono text-[11px] font-bold text-[#E80000]">
                  {item.artista}
                </p>
                <p className="font-sans text-xs text-[#5A5245] line-clamp-3 leading-relaxed">
                  {item.porQueImporta}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#1F1305]/20 space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between text-[11px]">
                {item.youtubeUrl && (
                  <a
                    href={item.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#E80000] hover:underline inline-flex items-center gap-1"
                  >
                    <span>Oír en YouTube</span>
                    <ExternalLink className="h-2.5 w-2.5" />
                  </a>
                )}
                {item.spotifyUrl && (
                  <a
                    href={item.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#10B981] hover:underline inline-flex items-center gap-1"
                  >
                    <span>Spotify</span>
                    <ExternalLink className="h-2.5 w-2.5" />
                  </a>
                )}
              </div>

              <Link
                href={item.enlaceExpediente.url}
                className="w-full flex items-center justify-between border border-[#1F1305] bg-[#EDE0D0] px-3 py-1.5 font-black text-[#1F1305] hover:bg-[#1F1305] hover:text-white transition-colors"
              >
                <span>{item.enlaceExpediente.label}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
