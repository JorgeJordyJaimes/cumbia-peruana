"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
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
      <div className="border-2 border-[#1F1305] bg-white text-[#1F1305] p-6 md:p-8 shadow-[6px_6px_0px_#1F1305]">
        {/* Cabecera de la Consola */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-[#1F1305] pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-3 w-3 items-center justify-center">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E80000] opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#E80000]" />
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-mono text-xs uppercase tracking-widest text-[#746B5C] font-bold">
                  Consola de Mezcla Armónica // Camelot Engine v2.4
                </h3>
              </div>
              <p className="font-cooper text-base font-bold text-[#1F1305]">
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
              className="inline-flex items-center gap-1.5 border-2 border-[#1F1305] bg-white px-3 py-1 font-mono text-xs font-bold text-[#1F1305] shadow-[2px_2px_0px_#1F1305] hover:bg-[#EDE0D0] transition-colors"
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
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1F1305]">
                Escala Menor (A) · Tonalidades Melancólicas / Psicodélicas
              </span>
              <span className="font-mono text-[11px] font-bold text-[#746B5C]">
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
                      "group relative flex flex-col items-center justify-center p-2 transition-all duration-150 border-2 font-mono",
                      isSelected
                        ? "border-[#1F1305] bg-[#1F1305] text-[#EDE0D0] shadow-[3px_3px_0px_#E80000]"
                        : isCompatible
                        ? "border-[#1F1305] bg-white text-[#1F1305] shadow-[2px_2px_0px_#1F1305] hover:bg-[#EDE0D0]"
                        : "border-[#1F1305]/30 bg-[#EDE0D0]/50 text-[#746B5C] hover:border-[#1F1305] hover:bg-white"
                    )}
                  >
                    <span className="text-sm font-black tracking-tight">
                      {code}
                    </span>
                    <span className="text-[10px] font-bold">
                      {info.standardKey}
                    </span>
                    {isSelected && (
                      <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-[#E80000] ring-1 ring-black" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1F1305]">
                Escala Mayor (B) · Tonalidades Festivas / Costeras
              </span>
              <span className="font-mono text-[11px] font-bold text-[#746B5C]">
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
                      "group relative flex flex-col items-center justify-center p-2 transition-all duration-150 border-2 font-mono",
                      isSelected
                        ? "border-[#1F1305] bg-[#1F1305] text-[#EDE0D0] shadow-[3px_3px_0px_#E80000]"
                        : isCompatible
                        ? "border-[#1F1305] bg-white text-[#1F1305] shadow-[2px_2px_0px_#1F1305] hover:bg-[#EDE0D0]"
                        : "border-[#1F1305]/30 bg-[#EDE0D0]/50 text-[#746B5C] hover:border-[#1F1305] hover:bg-white"
                    )}
                  >
                    <span className="text-sm font-black tracking-tight">
                      {code}
                    </span>
                    <span className="text-[10px] font-bold">
                      {info.standardKey}
                    </span>
                    {isSelected && (
                      <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-[#E80000] ring-1 ring-black" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Guía de Transiciones Armónicas Compatibles para la Clave Seleccionada */}
        <div className="mt-8 border-2 border-[#1F1305] bg-[#EDE0D0]/60 p-4 shadow-[3px_3px_0px_#1F1305]">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#E80000]" />
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#1F1305] font-bold">
                Compatibilidad Armónica para Clave Activa:{" "}
                <span className="text-[#E80000] font-black">{selectedKey} ({selectedInfo.standardKey} {selectedInfo.mode})</span>
              </h4>
            </div>
            <span className="text-xs font-mono text-[#5A5245] hidden sm:inline font-bold">
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
                    "cursor-pointer border-2 p-3 transition-all",
                    isCurrent
                      ? "border-[#1F1305] bg-[#1F1305] text-[#EDE0D0] shadow-[3px_3px_0px_#E80000]"
                      : "border-[#1F1305] bg-white text-[#1F1305] shadow-[2px_2px_0px_#1F1305] hover:bg-[#EDE0D0] hover:translate-x-0.5"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-base font-black">
                      {t.code}
                    </span>
                    <span className={cn("font-mono text-xs font-bold", isCurrent ? "text-[#F8C800]" : "text-[#746B5C]")}>
                      {info.standardKey} ({info.mode})
                    </span>
                  </div>
                  <div className={cn("mt-1 text-xs font-bold", isCurrent ? "text-white" : "text-[#E80000]")}>
                    {t.label}
                  </div>
                  <p className={cn("mt-0.5 text-[11px] leading-tight font-sans", isCurrent ? "text-[#EDE0D0]/80" : "text-[#5A5245]")}>
                    {t.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Controles de BPM y Rango */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t-2 border-[#1F1305] pt-5">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Sliders className="h-4 w-4 text-[#E80000]" />
              <span className="font-mono text-xs uppercase font-bold text-[#1F1305]">
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
                className="w-16 border-2 border-[#1F1305] bg-[#EDE0D0] px-2 py-1 text-center font-mono text-xs font-bold text-[#1F1305] shadow-[1px_1px_0px_#1F1305] focus:outline-none focus:border-[#E80000]"
              />
              <span className="text-xs text-[#746B5C] font-mono font-bold">hasta</span>
              <input
                type="number"
                min={70}
                max={160}
                value={maxBpm}
                onChange={(e) => setMaxBpm(Number(e.target.value))}
                className="w-16 border-2 border-[#1F1305] bg-[#EDE0D0] px-2 py-1 text-center font-mono text-xs font-bold text-[#1F1305] shadow-[1px_1px_0px_#1F1305] focus:outline-none focus:border-[#E80000]"
              />
              <span className="font-mono text-xs font-bold text-[#1F1305]">BPM</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-[#746B5C]">Criterio:</span>
            <div className="inline-flex border-2 border-[#1F1305] bg-white p-0.5 text-xs font-mono shadow-[2px_2px_0px_#1F1305]">
              <button
                type="button"
                onClick={() => setFilterMode("compatible")}
                className={cn(
                  "px-2.5 py-1 font-bold transition-colors",
                  filterMode === "compatible"
                    ? "bg-[#1F1305] text-[#EDE0D0]"
                    : "text-[#1F1305] hover:bg-[#EDE0D0]"
                )}
              >
                Compatibles ({compatibleCodes.length})
              </button>
              <button
                type="button"
                onClick={() => setFilterMode("exact")}
                className={cn(
                  "px-2.5 py-1 font-bold transition-colors",
                  filterMode === "exact"
                    ? "bg-[#1F1305] text-[#EDE0D0]"
                    : "text-[#1F1305] hover:bg-[#EDE0D0]"
                )}
              >
                Solo {selectedKey}
              </button>
              <button
                type="button"
                onClick={() => setFilterMode("all")}
                className={cn(
                  "px-2.5 py-1 font-bold transition-colors",
                  filterMode === "all"
                    ? "bg-[#1F1305] text-[#EDE0D0]"
                    : "text-[#1F1305] hover:bg-[#EDE0D0]"
                )}
              >
                Todos
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Resultados de Canciones Compatibles para el DJ */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b-2 border-[#1F1305] pb-2">
          <div className="flex items-center gap-2">
            <Disc className="h-4 w-4 text-[#F1730C]" />
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#1F1305]">
              Pistas Compatibles en Archivo ({filteredTracks.length} encontradas)
            </h4>
          </div>
          <span className="font-mono text-xs font-bold text-[#10B981]">
            ✓ Mezcla armónica garantizada
          </span>
        </div>

        {filteredTracks.length === 0 ? (
          <div className="border-2 border-[#1F1305] bg-white p-8 text-center shadow-[4px_4px_0px_#1F1305]">
            <p className="font-mono text-sm text-[#1F1305] font-bold">
              No hay pistas registradas para el rango {minBpm}–{maxBpm} BPM con tonalidad compatible a {selectedKey}.
            </p>
            <p className="mt-1 text-xs text-[#746B5C]">
              Prueba ampliando el rango de BPM o seleccionando otra tonalidad Camelot.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTracks.map((track) => {
              const isExact = track.camelot === selectedKey;
              return (
                <div
                  key={track.id}
                  className={cn(
                    "border-2 border-[#1F1305] bg-white p-4 transition-all flex items-center justify-between gap-4 shadow-[3px_3px_0px_#1F1305] hover:shadow-[3px_3px_0px_#E80000]",
                    isExact && "bg-[#EDE0D0]/40 border-[#E80000]"
                  )}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h5 className="font-cooper font-bold text-[#1F1305] truncate text-base">
                        {track.title}
                      </h5>
                      {track.year && (
                        <span className="text-[11px] font-mono text-[#746B5C] font-bold">
                          ({track.year})
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-sans text-[#5A5245] truncate font-medium">
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
                      <span className="text-[10px] font-mono text-[#E80000] font-black uppercase">
                        ★ Match Exacto
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-[#5A5245] font-bold">
                        Compatible ({track.camelot})
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
