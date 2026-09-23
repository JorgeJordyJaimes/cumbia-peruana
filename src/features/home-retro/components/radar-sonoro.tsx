"use client";

import { useState } from "react";
import { Radio, Play, ExternalLink, Music } from "lucide-react";
import { radarMock } from "../data/cumbia-mock";

export function RadarSonoro() {
  const [activeTab, setActiveTab] = useState<"semana" | "mes" | "playlist">("semana");
  const [activeEmbedId, setActiveEmbedId] = useState<string | null>(null);

  const filteredItems = radarMock.filter((item) => item.tipo === activeTab);

  return (
    <section id="radar-sonoro" className="scroll-mt-24 py-16 sm:py-20 border-t border-white/5">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 space-y-10">
        {/* Cabecera de Sección */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-5">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#10B981]">
              <Radio className="h-4 w-4" />
              <span>Curaduría Especializada</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-black tracking-tight text-[#F3F4F6]">
              El Radar Sonoro
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#9CA3AF] leading-relaxed">
              Selección periódica de rarezas en 45 RPM, álbumes seminales restaurados y listas
              curadas para audiófilos y exploradores de la psicodelia tropical.
            </p>
          </div>

          {/* Pestañas (Tabs) Requeridas */}
          <div className="flex items-center rounded-2xl border border-white/10 bg-[#16191E] p-1.5 font-mono text-xs shrink-0">
            <button
              type="button"
              onClick={() => {
                setActiveTab("semana");
                setActiveEmbedId(null);
              }}
              className={`rounded-xl px-3.5 py-2 transition-all ${
                activeTab === "semana"
                  ? "bg-[#E5A93C] text-black font-bold shadow-md shadow-[#E5A93C]/20"
                  : "text-[#9CA3AF] hover:text-white"
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
              className={`rounded-xl px-3.5 py-2 transition-all ${
                activeTab === "mes"
                  ? "bg-[#E5A93C] text-black font-bold shadow-md shadow-[#E5A93C]/20"
                  : "text-[#9CA3AF] hover:text-white"
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
              className={`rounded-xl px-3.5 py-2 transition-all ${
                activeTab === "playlist"
                  ? "bg-[#E5A93C] text-black font-bold shadow-md shadow-[#E5A93C]/20"
                  : "text-[#9CA3AF] hover:text-white"
              }`}
            >
              Playlists Oficiales
            </button>
          </div>
        </div>

        {/* Cuadrícula de Contenido con Lite Embeds */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl border border-white/10 bg-[#16191E] overflow-hidden shadow-2xl flex flex-col justify-between hover:border-[#E5A93C]/40 transition-colors group"
            >
              {/* LITE EMBED: Portada interactiva que difiere el iframe */}
              <div className="relative aspect-[16/10] w-full bg-[#0D0F12] overflow-hidden border-b border-white/10">
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
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#1E2229] space-y-3 font-mono text-xs">
                      <Music className="h-8 w-8 text-[#10B981] animate-bounce" />
                      <p className="text-white font-bold">Abriendo sesión en Spotify...</p>
                      <a
                        href={`https://open.spotify.com/${item.mediaId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-xl bg-[#10B981] px-4 py-2 text-black font-bold hover:bg-[#059669] transition-colors"
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
                    <div className="absolute inset-0 bg-gradient-to-t from-[#16191E] via-black/40 to-transparent" />

                    {/* Botón Play Central de Alta Fidelidad */}
                    <button
                      type="button"
                      onClick={() => setActiveEmbedId(item.id)}
                      className="absolute inset-0 m-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E5A93C] text-black shadow-2xl transition-transform hover:scale-110 active:scale-95 group-hover:shadow-[#E5A93C]/40"
                      title="Cargar vista previa de audio (Lite Embed)"
                    >
                      <Play className="h-6 w-6 fill-black ml-1" />
                    </button>

                    {/* Insignia de Servicio */}
                    <div className="absolute top-3 right-3 rounded-full bg-black/70 border border-white/10 px-2.5 py-0.5 font-mono text-[10px] text-white backdrop-blur-md">
                      {item.mediaType === "youtube" ? "🔴 YouTube Preview" : "🟢 Spotify"}
                    </div>

                    {item.duracionTexto && (
                      <div className="absolute bottom-3 left-3 rounded-md bg-black/80 px-2 py-0.5 font-mono text-[10px] text-[#9CA3AF]">
                        {item.duracionTexto}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Ficha Editorial */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between font-mono text-[11px] text-[#9CA3AF]">
                    <span>{item.artista}</span>
                    {item.sello && <span>{item.sello}</span>}
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white group-hover:text-[#E5A93C] transition-colors leading-tight">
                    {item.titulo}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-[#9CA3AF] leading-relaxed line-clamp-3">
                    {item.descripcion}
                  </p>
                </div>

                {/* Métricas DJ si existen */}
                {item.bpm && item.camelot && (
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between font-mono text-xs">
                    <span className="text-white/80">♫ {item.bpm} BPM</span>
                    <span className="rounded bg-[#10B981]/20 px-2 py-0.5 text-[#10B981] font-bold">
                      Clave {item.camelot}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
