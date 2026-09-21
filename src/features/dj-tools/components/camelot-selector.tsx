"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/ui/glass-card";
import { BadgeDJ } from "@/components/ui/badge-dj";
import {
  CAMELOT_WHEEL,
  getHarmonicTransitions,
} from "@/features/dj-tools/camelot-utils";
import type { CamelotCode } from "@/types/domain";
import { Sliders, Sparkles, Disc, RefreshCw } from "lucide-react";

const MINOR_KEYS: CamelotCode[] = [
  "1A", "2A", "3A", "4A", "5A", "6A", "7A", "8A", "9A", "10A", "11A", "12A"
];
const MAJOR_KEYS: CamelotCode[] = [
  "1B", "2B", "3B", "4B", "5B", "6B", "7B", "8B", "9B", "10B", "11B", "12B"
];

export interface TrackDJItem {
  id: number;
  title: string;
  artist: string;
  album?: string;
  year?: number;
  bpm: number;
  camelot: CamelotCode;
  musicalKey: string;
  format?: string;
}

interface CamelotSelectorProps {
  tracks?: TrackDJItem[];
  className?: string;
}

export function CamelotSelector({ tracks = [], className }: CamelotSelectorProps) {
  const [selectedKey, setSelectedKey] = useState<CamelotCode>("8A"); // Default Am
  const [minBpm, setMinBpm] = useState<number>(90);
  const [maxBpm, setMaxBpm] = useState<number>(125);
  const [filterMode, setFilterMode] = useState<"compatible" | "exact" | "all">("compatible");

  const transitions = getHarmonicTransitions(selectedKey);
  const compatibleCodes = transitions.map((t) => t.code);
  const selectedInfo = CAMELOT_WHEEL[selectedKey];

  // Filtrar tracks
  const filteredTracks = tracks.filter((t) => {
    // BPM filter
    if (t.bpm < minBpm || t.bpm > maxBpm) return false;

    // Harmonic filter
    if (filterMode === "exact") {
      return t.camelot === selectedKey;
    }
    if (filterMode === "compatible") {
      return compatibleCodes.includes(t.camelot);
    }
    return true;
  });

  return (
    <div className={cn("space-y-6", className)}>
      {/* Consola DJ Hardware Style */}
      <GlassCard variant="editorial" className="p-6 md:p-8">
        {/* Cabecera de la Consola */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-3 w-3 items-center justify-center">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-500" />
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                  Consola de Mezcla Armónica // Camelot Engine v2.4
                </h3>
              </div>
              <p className="text-sm font-semibold text-white">
                Rueda Armónica de la Cumbia & Chicha Peruana
              </p>
            </div>
          </div>

          {/* Quick presets */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setSelectedKey("8A");
                setMinBpm(95);
                setMaxBpm(120);
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-mono text-neutral-300 hover:bg-white/10 transition-colors"
            >
              <RefreshCw className="h-3 w-3" />
              Resetear Consola
            </button>
          </div>
        </div>

        {/* Sección del Selector Camelot (Fila Menor / Fila Mayor) */}
        <div className="mt-6 space-y-4">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-wider text-neutral-400">
                Escala Menor (A) · Tonalidades Melancólicas / Psicodélicas
              </span>
              <span className="font-mono text-[11px] text-neutral-500">
                1A a 12A
              </span>
            </div>
            <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-6 lg:grid-cols-12">
              {MINOR_KEYS.map((code) => {
                const isSelected = selectedKey === code;
                const isCompatible = compatibleCodes.includes(code);
                const info = CAMELOT_WHEEL[code];

                return (
                  <button
                    key={code}
                    type="button"
                    onClick={() => setSelectedKey(code)}
                    className={cn(
                      "group relative flex flex-col items-center justify-center rounded-xl border p-2 transition-all duration-200",
                      isSelected
                        ? "border-amber-400 bg-amber-500/20 text-white shadow-lg shadow-amber-500/20 ring-1 ring-amber-400"
                        : isCompatible
                        ? "border-white/20 bg-white/[0.08] text-white hover:border-white/40 hover:bg-white/[0.12]"
                        : "border-white/5 bg-black/30 text-neutral-400 hover:border-white/15 hover:bg-white/[0.04]"
                    )}
                  >
                    <span className="font-mono text-sm font-bold tracking-tight">
                      {code}
                    </span>
                    <span className="text-[10px] text-neutral-400 group-hover:text-neutral-300">
                      {info.standardKey}
                    </span>
                    {isSelected && (
                      <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-amber-400 ring-2 ring-black" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-wider text-neutral-400">
                Escala Mayor (B) · Tonalidades Festivas / Costeras
              </span>
              <span className="font-mono text-[11px] text-neutral-500">
                1B a 12B
              </span>
            </div>
            <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-6 lg:grid-cols-12">
              {MAJOR_KEYS.map((code) => {
                const isSelected = selectedKey === code;
                const isCompatible = compatibleCodes.includes(code);
                const info = CAMELOT_WHEEL[code];

                return (
                  <button
                    key={code}
                    type="button"
                    onClick={() => setSelectedKey(code)}
                    className={cn(
                      "group relative flex flex-col items-center justify-center rounded-xl border p-2 transition-all duration-200",
                      isSelected
                        ? "border-amber-400 bg-amber-500/20 text-white shadow-lg shadow-amber-500/20 ring-1 ring-amber-400"
                        : isCompatible
                        ? "border-white/20 bg-white/[0.08] text-white hover:border-white/40 hover:bg-white/[0.12]"
                        : "border-white/5 bg-black/30 text-neutral-400 hover:border-white/15 hover:bg-white/[0.04]"
                    )}
                  >
                    <span className="font-mono text-sm font-bold tracking-tight">
                      {code}
                    </span>
                    <span className="text-[10px] text-neutral-400 group-hover:text-neutral-300">
                      {info.standardKey}
                    </span>
                    {isSelected && (
                      <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-amber-400 ring-2 ring-black" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Guía de Transiciones Armónicas Compatibles para la Clave Seleccionada */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-black/40 p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-400" />
              <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-300">
                Compatibilidad Armónica para Clave Activa:{" "}
                <span className="text-amber-400 font-bold">{selectedKey} ({selectedInfo.standardKey} {selectedInfo.mode})</span>
              </h4>
            </div>
            <span className="text-xs font-mono text-neutral-500 hidden sm:inline">
              Regla DJ: ±1 hora o cambio A ↔ B
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {transitions.map((t) => {
              const info = CAMELOT_WHEEL[t.code];
              const isCurrent = t.type === "identical";

              return (
                <div
                  key={t.code}
                  onClick={() => setSelectedKey(t.code)}
                  className={cn(
                    "cursor-pointer rounded-xl border p-3 transition-all hover:scale-[1.02]",
                    isCurrent
                      ? "border-amber-500/40 bg-amber-500/10"
                      : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-base font-bold text-white">
                      {t.code}
                    </span>
                    <span className="font-mono text-xs text-neutral-400">
                      {info.standardKey} ({info.mode})
                    </span>
                  </div>
                  <div className="mt-1 text-xs font-medium text-amber-300/90">
                    {t.label}
                  </div>
                  <p className="mt-0.5 text-[11px] text-neutral-400 leading-tight">
                    {t.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Controles de BPM y Rango */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Sliders className="h-4 w-4 text-amber-400" />
              <span className="font-mono text-xs uppercase text-neutral-300">
                Filtro de Tempo (BPM):
              </span>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                min={70}
                max={160}
                value={minBpm}
                onChange={(e) => setMinBpm(Number(e.target.value))}
                className="w-16 rounded-lg border border-white/10 bg-black/40 px-2 py-1 text-center font-mono text-xs text-white focus:border-amber-400 focus:outline-none"
              />
              <span className="text-xs text-neutral-500 font-mono">hasta</span>
              <input
                type="number"
                min={70}
                max={160}
                value={maxBpm}
                onChange={(e) => setMaxBpm(Number(e.target.value))}
                className="w-16 rounded-lg border border-white/10 bg-black/40 px-2 py-1 text-center font-mono text-xs text-white focus:border-amber-400 focus:outline-none"
              />
              <span className="font-mono text-xs text-neutral-400">BPM</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-neutral-400">Criterio:</span>
            <div className="inline-flex rounded-lg border border-white/10 bg-black/40 p-0.5 text-xs font-mono">
              <button
                type="button"
                onClick={() => setFilterMode("compatible")}
                className={cn(
                  "rounded-md px-2.5 py-1 transition-colors",
                  filterMode === "compatible"
                    ? "bg-amber-500 text-black font-semibold"
                    : "text-neutral-400 hover:text-white"
                )}
              >
                Compatibles ({compatibleCodes.length})
              </button>
              <button
                type="button"
                onClick={() => setFilterMode("exact")}
                className={cn(
                  "rounded-md px-2.5 py-1 transition-colors",
                  filterMode === "exact"
                    ? "bg-amber-500 text-black font-semibold"
                    : "text-neutral-400 hover:text-white"
                )}
              >
                Solo {selectedKey}
              </button>
              <button
                type="button"
                onClick={() => setFilterMode("all")}
                className={cn(
                  "rounded-md px-2.5 py-1 transition-colors",
                  filterMode === "all"
                    ? "bg-amber-500 text-black font-semibold"
                    : "text-neutral-400 hover:text-white"
                )}
              >
                Todos
              </button>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Resultados de Canciones Compatibles para el DJ */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Disc className="h-4 w-4 text-amber-400" />
            <h4 className="font-mono text-xs uppercase tracking-wider text-neutral-300">
              Pistas Compatibles en Archivo ({filteredTracks.length} encontradas)
            </h4>
          </div>
          <span className="font-mono text-xs text-neutral-500">
            Mezcla armónica garantizada
          </span>
        </div>

        {filteredTracks.length === 0 ? (
          <GlassCard className="p-8 text-center">
            <p className="font-mono text-sm text-neutral-400">
              No hay pistas registradas para el rango {minBpm}–{maxBpm} BPM con tonalidad compatible a {selectedKey}.
            </p>
            <p className="mt-1 text-xs text-neutral-500">
              Prueba ampliando el rango de BPM o seleccionando otra tonalidad Camelot.
            </p>
          </GlassCard>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredTracks.map((track) => {
              const isExact = track.camelot === selectedKey;
              return (
                <GlassCard
                  key={track.id}
                  variant="hoverable"
                  className={cn(
                    "p-4 transition-all flex items-center justify-between gap-4",
                    isExact && "border-amber-500/30 bg-amber-500/[0.04]"
                  )}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h5 className="font-semibold text-white truncate text-sm">
                        {track.title}
                      </h5>
                      {track.year && (
                        <span className="text-[11px] font-mono text-neutral-500">
                          ({track.year})
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-400 truncate">
                      {track.artist}
                      {track.album && ` • ${track.album}`}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <BadgeDJ
                      bpm={track.bpm}
                      camelot={track.camelot}
                      musicalKey={track.musicalKey}
                    />
                    {isExact ? (
                      <span className="text-[10px] font-mono text-amber-400 font-semibold">
                        Match Exacto
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-neutral-400">
                        Compatible ({track.camelot})
                      </span>
                    )}
                  </div>
                </GlassCard>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
