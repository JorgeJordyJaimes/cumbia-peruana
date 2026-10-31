import Image from "next/image";
import Link from "next/link";
import { Sparkles, ExternalLink, Disc, ArrowRight, Play } from "lucide-react";
import type { HallazgoRadarItem } from "../types";

interface HallazgoDelMesProps {
  item: HallazgoRadarItem;
}

export function HallazgoDelMes({ item }: HallazgoDelMesProps) {
  return (
    <div className="border-2 border-[#1F1305] bg-white p-6 sm:p-10 shadow-[6px_6px_0px_#1F1305] space-y-8">
      {/* Encabezado del Hallazgo */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-[#1F1305] pb-4 font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="border-2 border-[#1F1305] bg-[#E80000] text-white px-2.5 py-1 font-black uppercase">
            ★ [HALLAZGO DEL MES · {item.mes.toUpperCase()} {item.año}]
          </span>
          <span className="border border-[#1F1305] bg-[#EDE0D0] text-[#1F1305] px-2 py-1 font-bold uppercase">
            {item.categoria}
          </span>
        </div>

        <span className="text-[#5A5245] font-bold">
          VITRINA DE DESCUBRIMIENTO & RESCATE PATRIMONIAL
        </span>
      </div>

      {/* Contenido Principal en 2 Columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Columna Izquierda: Imagen y Enlaces de Escucha Externa */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative aspect-square w-full border-2 border-[#1F1305] bg-[#EDE0D0] shadow-[4px_4px_0px_#1F1305] overflow-hidden">
            <Image
              src={item.portadaUrl}
              alt={item.titulo}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
            />
            <div className="absolute top-3 left-3 border border-[#1F1305] bg-[#1F1305] text-[#EDE0D0] px-2 py-0.5 font-mono text-[10px] font-bold">
              PRENSAJE MATRIZ
            </div>
          </div>

          {/* Bloque 3: ESCÚCHALO (Canales Externos Oficiales) */}
          <div className="border-2 border-[#1F1305] bg-[#EDE0D0]/40 p-4 space-y-2.5 font-mono text-xs">
            <span className="font-black text-[#1F1305] flex items-center gap-1.5 uppercase">
              <Play className="h-3.5 w-3.5 text-[#E80000]" /> 3. Escúchalo en Canales Oficiales:
            </span>
            <p className="text-[11px] text-[#5A5245]">
              Consulta legal en las fonotecas asociadas (cero archivos locales en servidor):
            </p>
            <div className="flex flex-col sm:flex-row gap-2 pt-1">
              {item.youtubeUrl && (
                <a
                  href={item.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 border border-[#1F1305] bg-[#E80000] text-white px-3 py-2 font-bold hover:bg-[#1F1305] transition-colors"
                >
                  <span>Ver en YouTube</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
              {item.spotifyUrl && (
                <a
                  href={item.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 border border-[#1F1305] bg-[#10B981] text-white px-3 py-2 font-bold hover:bg-[#059669] transition-colors"
                >
                  <span>Oír en Spotify</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Columna Derecha: Estructura Pericial Fija */}
        <div className="lg:col-span-7 space-y-6">
          {/* Bloque 1: QUÉ ES */}
          <div className="space-y-2">
            <div className="font-mono text-xs font-black uppercase text-[#E80000]">
              1. QUÉ ES · IDENTIDAD DEL HALLAZGO
            </div>
            <h2 className="font-cooper text-3xl sm:text-4xl font-black text-[#1F1305] leading-tight">
              {item.titulo}
            </h2>
            <p className="font-mono text-xs sm:text-sm font-bold text-[#F1730C]">
              {item.subtitulo}
            </p>
            <div className="flex flex-wrap gap-3 pt-2 font-mono text-xs text-[#5A5245]">
              <span><strong>Artista:</strong> {item.artista}</span>
              {item.añoGrabacion && <span>• <strong>Año:</strong> {item.añoGrabacion}</span>}
              {item.sello && <span>• <strong>Sello:</strong> {item.sello}</span>}
            </div>
          </div>

          {/* Bloque 2: POR QUÉ IMPORTA */}
          <div className="space-y-2 border-t-2 border-[#1F1305] pt-4">
            <div className="font-mono text-xs font-black uppercase text-[#1F1305] flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-[#F8C800]" />
              <span>2. POR QUÉ IMPORTA · VALOR HISTÓRICO PATRIMONIAL</span>
            </div>
            <div className="prose max-w-none font-sans text-sm sm:text-base text-[#1F1305]/90 leading-relaxed bg-[#EDE0D0]/20 p-4 border border-[#1F1305]/30">
              <p>{item.porQueImporta}</p>
            </div>
          </div>

          {/* Bloque 4: EXPLÓRALO EN EL ARCHIVO */}
          <div className="border-t-2 border-[#1F1305] pt-4 space-y-2">
            <div className="font-mono text-xs font-black uppercase text-[#E80000]">
              4. EXPLÓRALO EN KUMBIA SOUND
            </div>
            <p className="font-sans text-xs text-[#5A5245]">
              Consulta la ficha técnica del prensaje o el informe pericial del músico en nuestra base de datos relacional:
            </p>
            <Link
              href={item.enlaceExpediente.url}
              className="inline-flex items-center gap-2 border-2 border-[#1F1305] bg-[#1F1305] text-[#EDE0D0] px-5 py-2.5 font-mono text-xs font-black shadow-[3px_3px_0px_#E80000] hover:bg-[#E80000] transition-colors"
            >
              <Disc className="h-4 w-4" />
              <span>{item.enlaceExpediente.label}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
