"use client";

import { useState, useMemo } from "react";
import { Music2, SlidersHorizontal, Disc3, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { temasDJMock } from "../data/cumbia-mock";

export function MatchBpmWidget() {
  const [selectedTemaId, setSelectedTemaId] = useState<string>(temasDJMock[0].id);

  const currentTema =
    temasDJMock.find((t) => t.id === selectedTemaId) || temasDJMock[0];

  // Helper para verificar compatibilidad armónica en Rueda Camelot
  // Regla Camelot: Mismo número (ej 8A con 8A), adyacente ±1 (7A o 9A), o cambio de modo (8A con 8B)
  const isCamelotCompatible = (key1: string, key2: string) => {
    if (key1 === key2) return { compatible: true, type: "Mismo Tono (Perfect Match)" };
    const num1 = parseInt(key1.slice(0, -1), 10);
    const letter1 = key1.slice(-1);
    const num2 = parseInt(key2.slice(0, -1), 10);
    const letter2 = key2.slice(-1);

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
  };

  // Cálculo de canciones compatibles dentro de ±4% de BPM y Rueda Camelot
  const compatibleTracks = useMemo(() => {
    return temasDJMock
      .filter((t) => t.id !== currentTema.id)
      .map((t) => {
        const bpmDiff = ((t.bpm - currentTema.bpm) / currentTema.bpm) * 100;
        const harmonic = isCamelotCompatible(currentTema.camelot, t.camelot);
        return {
          ...t,
          bpmDiff: bpmDiff,
          absDiff: Math.abs(bpmDiff),
          harmonic,
        };
      })
      .filter((t) => t.absDiff <= 5 && t.harmonic.compatible)
      .sort((a, b) => a.absDiff - b.absDiff)
      .slice(0, 3);
  }, [currentTema]);

  return (
    <section id="match-bpm" className="scroll-mt-24 py-16 sm:py-20 border-t border-white/5 bg-[#0D0F12]">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 space-y-10">
        {/* Cabecera con Insignia Técnica */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-5">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#10B981]/30 bg-[#10B981]/10 px-3 py-1 font-mono text-xs font-semibold text-[#10B981]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Algoritmo calibrado para cumbia costeña, amazónica, andina y chicha</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-black tracking-tight text-[#F3F4F6]">
              Consola Match BPM & Compatibilidad Armónica
            </h2>

            <p className="font-sans text-sm sm:text-base text-[#9CA3AF] leading-relaxed">
              Herramienta técnica para DJs de vinilo y tornamesistas. Selecciona cualquier tema para
              calcular mezclas matemáticamente exactas con pitch de tempo ±3% y rueda Camelot.
            </p>
          </div>

          <a
            href="#dj-tools"
            className="inline-flex items-center gap-2 rounded-xl bg-[#E5A93C] px-5 py-3 font-mono text-xs font-bold text-black shadow-lg shadow-[#E5A93C]/20 hover:bg-[#d6992d] transition-all shrink-0"
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>Abrir consola Match BPM completa</span>
          </a>
        </div>

        {/* WIDGET COMPACTO DE DEMOSTRACIÓN */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Panel Izquierdo: Pista Maestra Activa */}
          <div className="lg:col-span-5 rounded-3xl border border-white/10 bg-[#16191E] p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-2xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="font-mono text-xs text-[#E5A93C] font-semibold flex items-center gap-1.5">
                  <Music2 className="h-4 w-4" /> Pista Maestra de Entrada
                </span>
                <span className="font-mono text-[11px] text-[#9CA3AF]">Tornamesa A</span>
              </div>

              {/* Selector de Pista */}
              <div className="space-y-1.5">
                <label className="block font-mono text-xs text-neutral-300">
                  Selecciona una grabación clásica:
                </label>
                <select
                  value={selectedTemaId}
                  onChange={(e) => setSelectedTemaId(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-[#1E2229] px-3.5 py-3 font-serif text-base text-white focus:border-[#E5A93C] focus:outline-none"
                >
                  {temasDJMock.map((t) => (
                    <option key={t.id} value={t.id} className="bg-[#16191E] font-sans">
                      {t.titulo} — {t.artista} ({t.bpm} BPM / {t.camelot})
                    </option>
                  ))}
                </select>
              </div>

              {/* Ficha Visual de la Pista Maestra */}
              <div className="rounded-2xl border border-white/10 bg-[#1E2229] p-5 space-y-4">
                <div className="flex items-center gap-3.5">
                  <div className="h-12 w-12 rounded-xl bg-[#0D0F12] border border-white/10 flex items-center justify-center text-[#E5A93C]">
                    <Disc3 className="h-6 w-6 animate-spin [animation-duration:10s]" />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl font-bold text-white leading-tight">
                      {currentTema.titulo}
                    </h4>
                    <p className="font-mono text-xs text-[#9CA3AF]">
                      {currentTema.artista} • {currentTema.ano}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5 font-mono text-xs text-center">
                  <div className="rounded-lg bg-black/40 p-2">
                    <span className="text-[10px] text-[#9CA3AF] block">TEMPO</span>
                    <span className="font-black text-white text-base">{currentTema.bpm}</span>
                    <span className="text-[9px] text-[#9CA3AF] block">BPM</span>
                  </div>

                  <div className="rounded-lg bg-black/40 p-2 border border-[#10B981]/30">
                    <span className="text-[10px] text-[#10B981] block font-bold">CAMELOT</span>
                    <span className="font-black text-[#10B981] text-base">{currentTema.camelot}</span>
                    <span className="text-[9px] text-[#9CA3AF] block">{currentTema.tonalidad}</span>
                  </div>

                  <div className="rounded-lg bg-black/40 p-2">
                    <span className="text-[10px] text-[#9CA3AF] block">ESTILO</span>
                    <span className="font-bold text-[#E5A93C] text-xs block pt-1 truncate">
                      {currentTema.subgenero}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#E5A93C]/10 border border-[#E5A93C]/20 font-mono text-[11px] text-[#E5A93C]">
              💡 Rango de tolerancia de tono en mezcla:{" "}
              <strong>{(currentTema.bpm * 0.97).toFixed(1)}</strong> a{" "}
              <strong>{(currentTema.bpm * 1.03).toFixed(1)} BPM</strong> (±3%).
            </div>
          </div>

          {/* Panel Derecho: Pistas Compatibles Recomendadas */}
          <div className="lg:col-span-7 rounded-3xl border border-white/10 bg-[#16191E] p-6 sm:p-8 space-y-5 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="font-mono text-xs text-[#10B981] font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4" /> Temas Compatibles para Tornamesa B (±3% Pitch)
                </span>
                <span className="font-mono text-[11px] text-[#9CA3AF]">
                  {compatibleTracks.length} resultados en vivo
                </span>
              </div>

              {/* Lista de Recomendaciones */}
              <div className="space-y-3 pt-4">
                {compatibleTracks.length > 0 ? (
                  compatibleTracks.map((match) => (
                    <div
                      key={match.id}
                      className="rounded-2xl border border-white/10 bg-[#1E2229] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#10B981]/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-[#0D0F12] border border-white/10 flex items-center justify-center text-[#E5A93C] shrink-0">
                          <Disc3 className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-serif font-bold text-base text-white">
                            {match.titulo}
                          </p>
                          <p className="font-mono text-xs text-[#9CA3AF]">
                            {match.artista} • {match.sello} ({match.ano})
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 font-mono text-xs shrink-0 self-end sm:self-center">
                        {/* Indicador de Ajuste Pitch */}
                        <div className="text-right">
                          <span className="text-[10px] text-[#9CA3AF] block">Ajuste Pitch:</span>
                          <span
                            className={`font-bold ${
                              match.bpmDiff === 0
                                ? "text-[#10B981]"
                                : match.bpmDiff > 0
                                ? "text-amber-400"
                                : "text-sky-400"
                            }`}
                          >
                            {match.bpmDiff > 0 ? `+${match.bpmDiff.toFixed(1)}%` : `${match.bpmDiff.toFixed(1)}%`}
                          </span>
                        </div>

                        {/* Insignia Camelot */}
                        <div className="rounded-xl border border-[#10B981]/40 bg-[#10B981]/10 px-3 py-1.5 text-center">
                          <span className="font-bold text-[#10B981] text-sm block">
                            {match.camelot}
                          </span>
                          <span className="text-[9px] text-[#9CA3AF] block leading-tight">
                            {match.harmonic.type}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-8 text-center font-mono text-xs text-[#9CA3AF]">
                    No se encontraron temas en el rango ±3% para este BPM en la muestra. Prueba
                    seleccionando otro tema.
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs text-[#9CA3AF]">
              <span>Cálculo armónico basado en afinaciones originales a 440 Hz</span>
              <a
                href="#dj-tools"
                className="text-[#E5A93C] hover:underline flex items-center gap-1 font-semibold"
              >
                <span>Ver consola extendida</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
