"use client";

import { useState } from "react";
import Link from "next/link";
import { Radio, Play, ExternalLink, Music, ArrowRight } from "lucide-react";
import { radarMock } from "../data/cumbia-mock";

interface RadarSonoroProps {
  isHighlight?: boolean;
}

export function RadarSonoro({ isHighlight = false }: RadarSonoroProps) {
  const [activeTab, setActiveTab] = useState<"semana" | "mes" | "playlist">("semana");
  const [activeEmbedId, setActiveEmbedId] = useState<string | null>(null);

  const filteredItems = radarMock.filter((item) => item.tipo === activeTab);

  return (
    <section id="radar-sonoro" className="scroll-mt-24 py-12 sm:py-16 border-t-2 border-[#1F1305]">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 space-y-8">
        {/* Cabecera de Sección */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-[#1F1305] pb-5">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[#F1730C]">
              <Radio className="h-4 w-4" />
              <span>{isHighlight ? "Destacado Curatorial" : "Curaduría Especializada & Archivo"}</span>
            </div>
            <h2 className="font-cooper text-3xl sm:text-5xl font-black tracking-tight text-[#1F1305]">
              El Radar Sonoro
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#5A5245] leading-relaxed">
              Selección periódica de rarezas en 45 RPM, álbumes seminales restaurados y listas
              curadas para audiófilos y exploradores de la psicodelia tropical.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
            {/* Pestañas (Tabs) Requeridas */}
            <div className="flex items-center border-2 border-[#1F1305] bg-white p-1 font-mono text-xs shadow-[2px_2px_0px_#1F1305]">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("semana");
                  setActiveEmbedId(null);
                }}
                className={`px-3 py-1.5 transition-all font-bold ${
                  activeTab === "semana"
                    ? "bg-[#1F1305] text-[#EDE0D0] shadow-[2px_2px_0px_#E80000]"
                    : "text-[#1F1305] hover:bg-[#EDE0D0]"
                }`}
              >
                Selección Semanal
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("mes");
                  setActiveEmbedId(null);
                }}
                className={`px-3 py-1.5 transition-all font-bold ${
                  activeTab === "mes"
                    ? "bg-[#1F1305] text-[#EDE0D0] shadow-[2px_2px_0px_#E80000]"
                    : "text-[#1F1305] hover:bg-[#EDE0D0]"
                }`}
              >
                Álbum del Mes
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("playlist");
                  setActiveEmbedId(null);
                }}
                className={`px-3 py-1.5 transition-all font-bold ${
                  activeTab === "playlist"
                    ? "bg-[#1F1305] text-[#EDE0D0] shadow-[2px_2px_0px_#E80000]"
                    : "text-[#1F1305] hover:bg-[#EDE0D0]"
                }`}
              >
                Playlists Oficiales
              </button>
            </div>

            <Link
              href="/radar"
              className="inline-flex items-center gap-1.5 border-2 border-[#1F1305] bg-white px-3.5 py-1.5 font-mono text-xs font-bold text-[#1F1305] shadow-[2px_2px_0px_#1F1305] hover:bg-[#1F1305] hover:text-[#EDE0D0] hover:shadow-[2px_2px_0px_#E80000] transition-colors"
            >
              <span>{isHighlight ? "Ver radar completo" : "Explorar archivo"}</span>
              <ArrowRight className="h-4 w-4 text-[#F1730C]" />
            </Link>
          </div>
        </div>

        {/* Cuadrícula de Contenido con Lite Embeds */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="border-2 border-[#1F1305] bg-white overflow-hidden shadow-[6px_6px_0px_#1F1305] flex flex-col justify-between hover:shadow-[6px_6px_0px_#F1730C] transition-all group"
            >
              {/* LITE EMBED: Portada interactiva que difiere el iframe */}
              <div className="relative aspect-[16/10] w-full bg-[#1F1305] overflow-hidden border-b-2 border-[#1F1305]">
                {activeEmbedId === item.id ? (
                  // Se monta el reproductor sólo cuando el usuario hace clic (Zero hit on Core Web Vitals)
                  item.mediaType === "youtube" ? (
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${item.mediaId}?autoplay=1`}
                      title={item.titulo}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#EDE0D0] space-y-3 font-mono text-xs">
                      <Music className="h-8 w-8 text-[#10B981] animate-bounce" />
                      <p className="text-[#1F1305] font-bold">Abriendo sesión en Spotify...</p>
                      <a
                        href={`https://open.spotify.com/${item.mediaId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 border-2 border-[#1F1305] bg-[#10B981] px-4 py-2 text-white font-bold shadow-[2px_2px_0px_#1F1305] hover:bg-[#059669] transition-colors"
                      >
                        <span>Escuchar en Spotify App</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  )
                ) : (
                  // Fachada Ligera (Lite Embed)
                  <div className="relative w-full h-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.portadaUrl}
                      alt={item.titulo}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                    {/* Botón Play Central Brutalista */}
                    <button
                      type="button"
                      onClick={() => setActiveEmbedId(item.id)}
                      className="absolute inset-0 m-auto flex h-14 w-14 items-center justify-center border-2 border-[#1F1305] bg-[#F1730C] text-white shadow-[4px_4px_0px_#1F1305] transition-transform hover:scale-110 active:scale-95 hover:bg-[#E80000]"
                      title="Cargar vista previa de audio (Lite Embed)"
                    >
                      <Play className="h-6 w-6 fill-white ml-1 text-white" />
                    </button>

                    {/* Insignia de Servicio */}
                    <div className="absolute top-3 right-3 border border-[#1F1305] bg-white px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#1F1305] shadow-[2px_2px_0px_#1F1305]">
                      {item.mediaType === "youtube" ? "🔴 YouTube Preview" : "🟢 Spotify"}
                    </div>

                    {item.duracionTexto && (
                      <div className="absolute bottom-3 left-3 border border-white/20 bg-black/80 px-2 py-0.5 font-mono text-[10px] text-white">
                        {item.duracionTexto}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Ficha Editorial */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between font-mono text-[11px] font-bold text-[#746B5C]">
                    <span>{item.artista}</span>
                    {item.sello && <span className="border border-[#1F1305] bg-[#EDE0D0] px-1.5 py-0.5 text-[#1F1305]">{item.sello}</span>}
                  </div>

                  <h3 className="font-cooper text-xl sm:text-2xl font-bold text-[#1F1305] group-hover:text-[#F1730C] transition-colors leading-tight">
                    {item.titulo}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-[#5A5245] leading-relaxed line-clamp-3">
                    {item.descripcion}
                  </p>
                </div>

                {/* Métricas DJ si existen */}
                {item.bpm && item.camelot && (
                  <div className="pt-3 border-t-2 border-[#1F1305]/10 flex items-center justify-between font-mono text-xs">
                    <span className="text-[#1F1305] font-bold">♫ {item.bpm} BPM</span>
                    <span className="border border-[#1F1305] bg-[#10B981] px-2 py-0.5 text-white font-bold shadow-[1px_1px_0px_#1F1305]">
                      Clave {item.camelot}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA al Apartado Completo si es Vista Destacada */}
        {isHighlight && (
          <div className="border-2 border-[#1F1305] bg-[#F1730C] text-white p-5 sm:p-6 shadow-[4px_4px_0px_#1F1305] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <p className="font-cooper text-base sm:text-lg font-bold text-white flex items-center justify-center sm:justify-start gap-2">
                <Radio className="h-4 w-4" />
                ¿Buscas álbumes completos del mes o playlists para coleccionistas?
              </p>
              <p className="font-mono text-xs text-white/90">
                Explora el archivo curatorial extendido con pistas raras de 45 RPM y selecciones oficiales de psicodelia.
              </p>
            </div>
            <Link
              href="/radar"
              className="inline-flex items-center gap-2 border-2 border-[#1F1305] bg-[#1F1305] text-[#EDE0D0] px-5 py-2.5 font-mono text-xs font-bold shadow-[3px_3px_0px_#EDE0D0] hover:bg-white hover:text-[#1F1305] transition-all shrink-0"
            >
              <span>Ver Radar Completo</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
