"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Music2, SlidersHorizontal, Disc3, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { TrackCoverImage } from "@/features/dj-tools";
import { temasDJMock } from "../data/cumbia-mock";

import type { TemaDJ } from "../types";

interface MatchBpmWidgetProps {
  isHighlight?: boolean;
  tracks?: TemaDJ[];
}

// Helper hoisted para verificar compatibilidad armónica en Rueda Camelot (server-hoist-static-io / rerender-no-inline-components)
function isCamelotCompatible(key1: string, key2: string) {
  if (!key1 || !key2) return { compatible: false, type: "Desconocido" };
  const k1 = key1.trim().toUpperCase();
  const k2 = key2.trim().toUpperCase();
  if (k1 === k2) return { compatible: true, type: "Mismo Tono (Perfect Match)" };

  const num1 = parseInt(k1.slice(0, -1), 10);
  const letter1 = k1.slice(-1);
  const num2 = parseInt(k2.slice(0, -1), 10);
  const letter2 = k2.slice(-1);

  if (isNaN(num1) || isNaN(num2)) return { compatible: false, type: "Incompatible" };

  if (letter1 === letter2) {
    const diff = Math.abs(num1 - num2);
    if (diff === 1 || diff === 11) {
      return {
        compatible: true,
        type: num2 > num1 ? "Subida de Energía (+1)" : "Bajada de Tensión (-1)",
      };
    }
  } else if (num1 === num2) {
    return { compatible: true, type: "Cambio de Modo (Menor / Mayor)" };
  }

  return { compatible: false, type: "Incompatible" };
}

// Helper para calcular afinidad estilística de géneros (principal y secundario)
function getGenreAffinity(prev: TemaDJ, cand: TemaDJ) {
  const p1 = (prev.primaryGenre || prev.subgenero || "").toLowerCase().trim();
  const p2 = (prev.secondaryGenre || "").toLowerCase().trim();
  const c1 = (cand.primaryGenre || cand.subgenero || "").toLowerCase().trim();
  const c2 = (cand.secondaryGenre || "").toLowerCase().trim();

  // 1. Mismo género principal (+100)
  if (p1 && c1 && p1 === c1) {
    return {
      score: 100,
      badgeText: "🎯 Mismo Género",
      badgeColor: "bg-[#10B981] text-white",
      description: `Mismo estilo base (${cand.primaryGenre || cand.subgenero})`,
    };
  }

  // 2. Puente de Fusión (+75)
  if ((p1 && c2 && p1 === c2) || (p2 && c1 && p2 === c1)) {
    return {
      score: 75,
      badgeText: "⚡ Fusión Puente",
      badgeColor: "bg-[#F8C800] text-[#1F1305]",
      description: `Puente estilístico (${cand.primaryGenre || cand.subgenero})`,
    };
  }

  // 3. Fusión Compartida (+50)
  if (p2 && c2 && p2 === c2) {
    return {
      score: 50,
      badgeText: "✨ Fusión Compartida",
      badgeColor: "bg-[#F1730C] text-[#1F1305]",
      description: `Comparte vertiente (${cand.secondaryGenre})`,
    };
  }

  // 4. Compatible sin coincidencia directa de género
  return {
    score: 10,
    badgeText: "🔄 Cruce Libre",
    badgeColor: "bg-white text-[#5A5245]",
    description: `Cruce estilístico (${cand.primaryGenre || cand.subgenero})`,
  };
}

export function MatchBpmWidget({ isHighlight = false, tracks }: MatchBpmWidgetProps) {
  const dataset = useMemo(() => {
    return tracks && tracks.length > 0 ? tracks : temasDJMock;
  }, [tracks]);

  const [selectedTemaId, setSelectedTemaId] = useState<string>("");

  const currentTema = useMemo(() => {
    const found = dataset.find((t) => t.id === selectedTemaId);
    return found || dataset[0] || temasDJMock[0];
  }, [dataset, selectedTemaId]);

  // Cálculo optimizado en un solo paso de canciones compatibles dentro de ±5% BPM ordenadas por afinidad de género y pitch
  const compatibleTracks = useMemo(() => {
    if (!currentTema) return [];
    const results = [];
    for (const t of dataset) {
      if (t.id === currentTema.id) continue;
      const bpmDiff = ((t.bpm - currentTema.bpm) / currentTema.bpm) * 100;
      const absDiff = Math.abs(bpmDiff);
      if (absDiff > 5) continue;
      const harmonic = isCamelotCompatible(currentTema.camelot, t.camelot);
      if (!harmonic.compatible) continue;

      const genreAffinity = getGenreAffinity(currentTema, t);

      results.push({
        ...t,
        bpmDiff,
        absDiff,
        harmonic,
        genreAffinity,
      });
    }

    // Priorizar afinidad estilística (género principal y secundario) sin descartar temas compatibles
    return results
      .sort((a, b) => {
        if (b.genreAffinity.score !== a.genreAffinity.score) {
          return b.genreAffinity.score - a.genreAffinity.score;
        }
        return a.absDiff - b.absDiff;
      })
      .slice(0, 5);
  }, [dataset, currentTema]);

  return (
    <section id="match-bpm" className="scroll-mt-24 py-12 sm:py-16 border-t-2 border-[#1F1305]">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 space-y-8">
        {/* Cabecera con Insignia Técnica */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-[#1F1305] pb-5">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 border border-[#1F1305] bg-white px-3 py-1 font-mono text-xs font-bold text-[#E80000] shadow-[2px_2px_0px_#1F1305]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{isHighlight ? "Destacado para DJs de Vinilo" : "Calibrado para cumbia costeña, amazónica, andina y chicha"}</span>
            </div>

            <h2 className="font-cooper text-3xl sm:text-5xl font-black tracking-tight text-[#1F1305]">
              Consola Match BPM & Compatibilidad Armónica
            </h2>

            <p className="font-sans text-sm sm:text-base text-[#5A5245] leading-relaxed">
              Herramienta técnica para DJs de vinilo y tornamesistas. Selecciona cualquier tema para
              calcular mezclas matemáticamente exactas con pitch de tempo ±3%, rueda Camelot y afinidad de género.
            </p>
          </div>

          <Link
            href="/match-bpm"
            className="inline-flex items-center gap-2 border-2 border-[#1F1305] bg-white px-5 py-2.5 font-mono text-xs font-bold text-[#1F1305] shadow-[3px_3px_0px_#1F1305] hover:bg-[#1F1305] hover:text-[#EDE0D0] hover:shadow-[3px_3px_0px_#E80000] transition-all active:translate-x-0.5 active:translate-y-0.5 shrink-0"
          >
            <SlidersHorizontal className="h-4 w-4 text-[#E80000]" />
            <span>{isHighlight ? "Abrir consola completa" : "Ir a consola completa"}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* WIDGET COMPACTO DE DEMOSTRACIÓN */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Panel Izquierdo: Pista Maestra Activa */}
          <div className="lg:col-span-5 border-2 border-[#1F1305] bg-white p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-[6px_6px_0px_#1F1305]">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b-2 border-[#1F1305] pb-3">
                <span className="font-mono text-xs text-[#E80000] font-bold flex items-center gap-1.5 uppercase">
                  <Music2 className="h-4 w-4" /> Pista Maestra de Entrada
                </span>
                <span className="font-mono text-[11px] font-bold text-[#1F1305] border border-[#1F1305] bg-[#EDE0D0] px-2 py-0.5 shadow-[1px_1px_0px_#1F1305]">Tornamesa A</span>
              </div>

              {/* Selector de Pista */}
              <div className="space-y-1.5">
                <label className="block font-mono text-xs font-bold text-[#1F1305]">
                  Selecciona una grabación clásica:
                </label>
                <select
                  value={currentTema.id}
                  onChange={(e) => setSelectedTemaId(e.target.value)}
                  className="w-full border-2 border-[#1F1305] bg-[#EDE0D0] px-3.5 py-2.5 font-serif text-sm text-[#1F1305] shadow-[2px_2px_0px_#1F1305] focus:border-[#E80000] focus:outline-none"
                >
                  {dataset.map((t) => (
                    <option key={t.id} value={t.id} className="bg-white text-[#1F1305] font-sans">
                      {t.titulo} — {t.artista} ({t.bpm} BPM / {t.camelot} / {t.primaryGenre || t.subgenero})
                    </option>
                  ))}
                </select>
              </div>

              {/* Ficha Visual de la Pista Maestra */}
              <div className="border-2 border-[#1F1305] bg-[#EDE0D0]/50 p-5 space-y-4 shadow-[3px_3px_0px_#1F1305]">
                <div className="flex items-center gap-3.5">
                  <TrackCoverImage
                    src={currentTema.portadaUrl}
                    title={currentTema.titulo}
                    artist={currentTema.artista}
                    format={currentTema.format}
                    side={currentTema.side}
                    size="lg"
                    showSideBadge={true}
                  />
                  <div>
                    <h4 className="font-cooper text-xl font-bold text-[#1F1305] leading-tight">
                      {currentTema.titulo}
                    </h4>
                    <p className="font-mono text-xs text-[#5A5245]">
                      {currentTema.artista} • {currentTema.ano}
                    </p>
                    {currentTema.format && (
                      <span className="inline-block mt-1 font-mono text-[10px] font-bold text-[#E80000] border border-[#1F1305] bg-white px-1.5 py-0.2 shadow-[1px_1px_0px_#1F1305]">
                        {currentTema.format} {currentTema.side ? `• Lado ${currentTema.side}` : ""}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#1F1305]/20 font-mono text-xs text-center">
                  <div className="border border-[#1F1305] bg-white p-2 shadow-[1px_1px_0px_#1F1305]">
                    <span className="text-[10px] text-[#665D4F] font-bold block">TEMPO</span>
                    <span className="font-black text-[#1F1305] text-base">{currentTema.bpm}</span>
                    <span className="text-[9px] text-[#665D4F] block">BPM</span>
                  </div>

                  <div className="border-2 border-[#1F1305] bg-[#1F1305] text-[#EDE0D0] p-2 shadow-[2px_2px_0px_#E80000]">
                    <span className="text-[10px] text-[#F8C800] block font-bold">CAMELOT</span>
                    <span className="font-black text-white text-base">{currentTema.camelot}</span>
                    <span className="text-[9px] text-[#EDE0D0]/80 block">{currentTema.tonalidad}</span>
                  </div>

                  <div className="border border-[#1F1305] bg-white p-2 shadow-[1px_1px_0px_#1F1305] flex flex-col justify-center">
                    <span className="text-[10px] text-[#665D4F] font-bold block">GÉNERO BASE</span>
                    <span className="font-bold text-[#F1730C] text-[11px] block truncate" title={currentTema.primaryGenre || currentTema.subgenero}>
                      {currentTema.primaryGenre || currentTema.subgenero}
                    </span>
                    {currentTema.secondaryGenre && (
                      <span className="text-[9px] text-[#5A5245] block truncate mt-0.5" title={`Fusión: ${currentTema.secondaryGenre}`}>
                        + {currentTema.secondaryGenre}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 border-2 border-[#1F1305] bg-[#EDE0D0] font-mono text-[11px] text-[#1F1305] shadow-[2px_2px_0px_#1F1305]">
              💡 Rango de tolerancia de tono en mezcla:{" "}
              <strong>{(currentTema.bpm * 0.97).toFixed(1)}</strong> a{" "}
              <strong>{(currentTema.bpm * 1.03).toFixed(1)} BPM</strong> (±3%).
            </div>
          </div>

          {/* Panel Derecho: Pistas Compatibles Recomendadas */}
          <div className="lg:col-span-7 border-2 border-[#1F1305] bg-white p-6 sm:p-8 space-y-5 shadow-[6px_6px_0px_#1F1305] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b-2 border-[#1F1305] pb-3">
                <span className="font-mono text-xs text-[#1F1305] font-bold flex items-center gap-1.5 uppercase">
                  <CheckCircle2 className="h-4 w-4 text-[#10B981]" /> Temas Compatibles para Tornamesa B (Priorizados por Género)
                </span>
                <span className="font-mono text-[11px] font-bold text-white bg-[#10B981] border border-[#1F1305] px-2 py-0.5 shadow-[1px_1px_0px_#1F1305]">
                  {compatibleTracks.length} resultados
                </span>
              </div>

              {/* Lista de Recomendaciones */}
              <div className="space-y-3 pt-4">
                {compatibleTracks.length > 0 ? (
                  compatibleTracks.map((match) => (
                    <div
                      key={match.id}
                      className="border-2 border-[#1F1305] bg-[#EDE0D0]/40 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white hover:shadow-[3px_3px_0px_#E80000] transition-all"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <TrackCoverImage
                          src={match.portadaUrl}
                          title={match.titulo}
                          artist={match.artista}
                          format={match.format}
                          side={match.side}
                          size="md"
                          showSideBadge={true}
                        />
                        <div className="min-w-0">
                          <p className="font-cooper text-base text-[#1F1305] truncate">
                            {match.titulo}
                          </p>
                          <p className="font-mono text-xs text-[#5A5245] truncate">
                            {match.artista} • {match.sello} ({match.ano})
                          </p>
                          {/* Badges de Géneros y Afinidad DJ */}
                          <div className="flex flex-wrap items-center gap-1.5 mt-1.5 font-mono text-[10px]">
                            <span
                              className={`font-bold px-1.5 py-0.2 border border-[#1F1305] ${match.genreAffinity.badgeColor}`}
                            >
                              {match.genreAffinity.badgeText}
                            </span>
                            <span className="border border-[#1F1305]/30 bg-white/80 px-1.5 py-0.2 text-[#1F1305]">
                              {match.primaryGenre || match.subgenero}
                            </span>
                            {match.secondaryGenre && (
                              <span className="border border-[#1F1305]/20 bg-[#EDE0D0] px-1.5 py-0.2 text-[#5A5245]">
                                + {match.secondaryGenre}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 font-mono text-xs shrink-0 self-end sm:self-center">
                        {/* Indicador de Ajuste Pitch */}
                        <div className="text-right">
                          <span className="text-[10px] font-bold uppercase text-[#665D4F] block">Ajuste Pitch:</span>
                          <span
                            className={cn(
                              "font-black text-xs px-2 py-0.5 border shadow-[1px_1px_0px_#1F1305] inline-block",
                              Number(match.bpmDiff.toFixed(1)) > 0
                                ? "bg-[#10B981]/20 text-[#065F46] border-[#10B981]"
                                : Number(match.bpmDiff.toFixed(1)) < 0
                                ? "bg-[#E80000]/20 text-[#991B1B] border-[#E80000]"
                                : "bg-white text-[#5A5245] border-[#1F1305]/30"
                            )}
                          >
                            {Number(match.bpmDiff.toFixed(1)) > 0
                              ? `+${match.bpmDiff.toFixed(1)}%`
                              : Number(match.bpmDiff.toFixed(1)) < 0
                              ? `${match.bpmDiff.toFixed(1)}%`
                              : "0.0%"}
                          </span>
                        </div>

                        {/* Insignia Camelot */}
                        <div className="border border-[#1F1305] bg-white px-3 py-1.5 text-center shadow-[1px_1px_0px_#1F1305]">
                          <span className="font-black text-[#1F1305] text-sm block">
                            {match.camelot}
                          </span>
                          <span className="text-[9px] text-[#665D4F] block leading-tight font-medium">
                            {match.harmonic.type}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-8 text-center font-mono text-xs text-[#665D4F]">
                    No se encontraron temas en el rango ±3% de BPM con compatibilidad armónica en el catálogo cargado. Prueba
                    seleccionando otro tema.
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 border-t-2 border-[#1F1305] flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-xs text-[#5A5245]">
              <span>Cálculo armónico basado en afinaciones originales a 440 Hz</span>
              <Link
                href="/match-bpm"
                className="text-[#E80000] hover:underline flex items-center gap-1 font-bold"
              >
                <span>Ver consola extendida & Rueda Camelot</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* CTA al Apartado Completo si es Vista Destacada */}
        {isHighlight && (
          <div className="border-2 border-[#1F1305] bg-[#F1730C] text-[#1F1305] p-5 sm:p-6 shadow-[4px_4px_0px_#1F1305] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <p className="font-cooper text-base sm:text-lg font-bold text-white flex items-center justify-center sm:justify-start gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                ¿Necesitas mezclar en vivo con todo el repertorio del archivo?
              </p>
              <p className="font-mono text-xs text-white/90">
                Accede a la Rueda Camelot interactiva completa con cientos de temas catalogados con BPM y clave musical real.
              </p>
            </div>
            <Link
              href="/match-bpm"
              className="inline-flex items-center gap-2 border-2 border-[#1F1305] bg-[#1F1305] text-[#EDE0D0] px-5 py-2.5 font-mono text-xs font-bold shadow-[3px_3px_0px_#EDE0D0] hover:bg-white hover:text-[#1F1305] transition-all shrink-0"
            >
              <span>Abrir Consola DJ Completa</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
