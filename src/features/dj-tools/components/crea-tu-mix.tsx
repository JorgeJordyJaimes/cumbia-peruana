"use client";

import { useState, useMemo, useCallback } from "react";
import { cn } from "@/lib/utils";
import { BadgeDJ } from "@/components/ui/badge-dj";
import {
  CAMELOT_WHEEL,
  getHarmonicTransitions,
  isHarmonicallyCompatible,
} from "@/features/dj-tools/camelot-utils";
import type { CamelotCode } from "@/types/domain";
import { TrackCoverImage } from "./track-cover-image";
import type { TrackDJItem } from "./camelot-selector";
import {
  Disc3,
  SlidersHorizontal,
  Sparkles,
  Plus,
  Trash2,
  Copy,
  Check,
  RotateCcw,
  ArrowRight,
  Search,
  Play,
  Pause,
  X,
  Layers,
  Activity,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  MoveRight,
} from "lucide-react";

export interface MixStepItem {
  id: string; // unique ID for timeline
  track: TrackDJItem;
  deck: "A" | "B";
  stepNumber: number;
  pitchDiffWithPrev?: number;
  harmonicTransition?: {
    code: CamelotCode;
    label: string;
    type: string;
  };
}

interface CreaTuMixProps {
  tracks: TrackDJItem[];
  className?: string;
}

export function CreaTuMix({ tracks = [], className }: CreaTuMixProps) {
  // Estado del listado de la mezcla secuencial
  const [mixSteps, setMixSteps] = useState<MixStepItem[]>([]);

  // Índice del paso enfocado para visualización en las 2 tornamesas (0 = transición entre pista 1 y 2, etc.)
  const [focusedTransitionIdx, setFocusedTransitionIdx] = useState<number>(0);

  // Estados interactivos de reproducción / giro visual de las tornamesas
  const [isSpinningA, setIsSpinningA] = useState<boolean>(true);
  const [isSpinningB, setIsSpinningB] = useState<boolean>(true);
  const [crossfaderPosition, setCrossfaderPosition] = useState<"A" | "center" | "B">("center");

  // Estado del modal de selección de pistas
  const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false);
  const [pickerSearchQuery, setPickerSearchQuery] = useState<string>("");
  const [pickerTab, setPickerTab] = useState<"compatible" | "all">("compatible");

  // Notificación de copia al portapapeles
  const [copiedToast, setCopiedToast] = useState<boolean>(false);

  // Determinar cuál es la siguiente tornamesa a cargar según la cantidad de temas:
  // Paso 1 (índice 0) -> Tornamesa A
  // Paso 2 (índice 1) -> Tornamesa B
  // Paso 3 (índice 2) -> Tornamesa A
  // Paso 4 (índice 3) -> Tornamesa B...
  const nextStepNumber = mixSteps.length + 1;
  const nextDeck: "A" | "B" = mixSteps.length % 2 === 0 ? "A" : "B";
  const lastTrackInMix = mixSteps.length > 0 ? mixSteps[mixSteps.length - 1].track : null;

  // Determinar qué pistas están cargadas actualmente en Tornamesa A y Tornamesa B:
  // Si la mezcla tiene al menos 1 tema:
  const currentPair = useMemo(() => {
    if (mixSteps.length === 0) {
      return { trackA: null, trackB: null, activeStepA: null, activeStepB: null };
    }
    if (mixSteps.length === 1) {
      return {
        trackA: mixSteps[0].track,
        trackB: null,
        activeStepA: mixSteps[0].stepNumber,
        activeStepB: null,
      };
    }

    // Si hay 2 o más temas, tomamos el par de la transición enfocada o el último par cargado
    const validFocus = Math.min(focusedTransitionIdx, mixSteps.length - 2);
    const step1 = mixSteps[validFocus];
    const step2 = mixSteps[validFocus + 1];

    if (step1.deck === "A") {
      return {
        trackA: step1.track,
        trackB: step2.track,
        activeStepA: step1.stepNumber,
        activeStepB: step2.stepNumber,
      };
    } else {
      return {
        trackA: step2.track,
        trackB: step1.track,
        activeStepA: step2.stepNumber,
        activeStepB: step1.stepNumber,
      };
    }
  }, [mixSteps, focusedTransitionIdx]);

  // Cálculo de compatibilidad armónica y pitch para el modal selector
  const candidateRecommendations = useMemo(() => {
    if (!lastTrackInMix) return [];

    const transitions = getHarmonicTransitions(lastTrackInMix.camelot);
    const compatibleCodes = new Set(transitions.map((t) => t.code));

    const results = [];
    for (const t of tracks) {
      // Evitar sugerir el mismo tema consecutivo
      if (t.id === lastTrackInMix.id) continue;

      const bpmDiff = ((t.bpm - lastTrackInMix.bpm) / lastTrackInMix.bpm) * 100;
      const absDiff = Math.abs(bpmDiff);
      const isHarmonic = compatibleCodes.has(t.camelot);

      // Si estamos en la pestaña compatible, filtrar por ±5% de BPM y compatibilidad Camelot
      if (absDiff <= 5.5 && isHarmonic) {
        const transInfo = transitions.find((tr) => tr.code === t.camelot);
        results.push({
          track: t,
          bpmDiff,
          absDiff,
          transInfo,
        });
      }
    }

    return results.sort((a, b) => a.absDiff - b.absDiff);
  }, [lastTrackInMix, tracks]);

  // Lista para la búsqueda general en el modal
  const searchResults = useMemo(() => {
    if (!pickerSearchQuery.trim()) return tracks.slice(0, 30);
    const q = pickerSearchQuery.toLowerCase().trim();
    return tracks
      .filter((t) => {
        return (
          t.title.toLowerCase().includes(q) ||
          t.artist.toLowerCase().includes(q) ||
          (t.album && t.album.toLowerCase().includes(q)) ||
          t.camelot.toLowerCase().includes(q)
        );
      })
      .slice(0, 40);
  }, [tracks, pickerSearchQuery]);

  // Acción: Agregar una pista a la mezcla
  const addTrackToMix = useCallback(
    (track: TrackDJItem) => {
      let pitchDiffWithPrev: number | undefined;
      let harmonicTransition: { code: CamelotCode; label: string; type: string } | undefined;

      if (lastTrackInMix) {
        pitchDiffWithPrev = ((track.bpm - lastTrackInMix.bpm) / lastTrackInMix.bpm) * 100;
        const transitions = getHarmonicTransitions(lastTrackInMix.camelot);
        const found = transitions.find((tr) => tr.code === track.camelot);
        if (found) {
          harmonicTransition = {
            code: track.camelot,
            label: found.label,
            type: found.type,
          };
        } else {
          harmonicTransition = {
            code: track.camelot,
            label: `Tono ${track.camelot} (Salto Libre)`,
            type: "custom",
          };
        }
      }

      const newStep: MixStepItem = {
        id: `step-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        track,
        deck: nextDeck,
        stepNumber: nextStepNumber,
        pitchDiffWithPrev,
        harmonicTransition,
      };

      setMixSteps((prev) => {
        const updated = [...prev, newStep];
        // Enfocar la nueva transición
        if (updated.length >= 2) {
          setFocusedTransitionIdx(updated.length - 2);
        }
        return updated;
      });

      // Mover crossfader hacia el nuevo deck
      setCrossfaderPosition(nextDeck === "A" ? "A" : "B");
      setIsPickerOpen(false);
      setPickerSearchQuery("");
    },
    [lastTrackInMix, nextDeck, nextStepNumber]
  );

  // Acción: Eliminar una pista de la mezcla
  const removeStep = useCallback((stepIndex: number) => {
    setMixSteps((prev) => {
      const filtered = prev.filter((_, idx) => idx !== stepIndex);
      // Recalcular numeración secuencial y asignación de decks A y B
      return filtered.map((item, idx) => {
        const deck: "A" | "B" = idx % 2 === 0 ? "A" : "B";
        const prevTrack = idx > 0 ? filtered[idx - 1].track : null;

        let pitchDiffWithPrev: number | undefined;
        let harmonicTransition: { code: CamelotCode; label: string; type: string } | undefined;

        if (prevTrack) {
          pitchDiffWithPrev = ((item.track.bpm - prevTrack.bpm) / prevTrack.bpm) * 100;
          const transitions = getHarmonicTransitions(prevTrack.camelot);
          const found = transitions.find((tr) => tr.code === item.track.camelot);
          if (found) {
            harmonicTransition = {
              code: item.track.camelot,
              label: found.label,
              type: found.type,
            };
          }
        }

        return {
          ...item,
          deck,
          stepNumber: idx + 1,
          pitchDiffWithPrev,
          harmonicTransition,
        };
      });
    });
  }, []);

  // Acción: Reiniciar la mezcla completa
  const resetMix = useCallback(() => {
    if (mixSteps.length > 0 && !window.confirm("¿Deseas reiniciar la secuencia de mezcla y vaciar ambas tornamesas?")) {
      return;
    }
    setMixSteps([]);
    setFocusedTransitionIdx(0);
    setCrossfaderPosition("center");
  }, [mixSteps.length]);

  // Duración total estimada del mix (mezcla al ~50% de duración de cada corte de vinilo)
  const totalDurationSeconds = useMemo(() => {
    return mixSteps.reduce((acc, step) => {
      const fullSecs = step.track.durationSeconds || 180;
      return acc + Math.round(fullSecs / 2);
    }, 0);
  }, [mixSteps]);

  const formattedTotalDuration = useMemo(() => {
    if (totalDurationSeconds === 0) return "0:00 min (est.)";
    const mins = Math.floor(totalDurationSeconds / 60);
    const secs = totalDurationSeconds % 60;
    return `~${mins}:${secs.toString().padStart(2, "0")} min`;
  }, [totalDurationSeconds]);

  // Acción: Copiar el Setlist estructurado para DJ
  const copySetlistToClipboard = useCallback(() => {
    if (mixSteps.length === 0) return;

    let text = "========================================================\n";
    text += "🪗 KUMBIA SOUND // SETLIST DE MEZCLA SECUENCIAL EN VINILO\n";
    text += "========================================================\n";
    text += `Duración Estimada del Mix (~50% por pista): ${formattedTotalDuration}\n`;
    text += `Total de Pistas en Secuencia: ${mixSteps.length}\n\n`;

    mixSteps.forEach((step, idx) => {
      const t = step.track;
      const formatStr = t.format ? `[${t.format}${t.side ? ` • Lado ${t.side}` : ""}]` : "[Vinilo]";
      const halfSecs = Math.round((t.durationSeconds || 180) / 2);
      const estMixTime = `~${Math.floor(halfSecs / 60)}:${(halfSecs % 60).toString().padStart(2, "0")} min`;
      text += `#${step.stepNumber} [TORNAMESA ${step.deck}] ${t.title} — ${t.artist}\n`;
      text += `   Formato: ${formatStr} | Tempo: ${t.bpm} BPM | Camelot: ${t.camelot} | Duración en Mix (~50%): ${estMixTime}\n`;

      if (idx < mixSteps.length - 1) {
        const next = mixSteps[idx + 1];
        const pitchText = next.pitchDiffWithPrev !== undefined
          ? next.pitchDiffWithPrev > 0
            ? `+${next.pitchDiffWithPrev.toFixed(1)}%`
            : `${next.pitchDiffWithPrev.toFixed(1)}%`
          : "0.0%";
        const transLabel = next.harmonicTransition?.label || "Paso libre";
        text += `   ↳ Transición a Tornamesa ${next.deck}: Ajuste Pitch: ${pitchText} | Armonía: ${transLabel}\n`;
      }
      text += "\n";
    });

    navigator.clipboard.writeText(text);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 3000);
  }, [mixSteps, formattedTotalDuration]);

  // Cálculo de ajuste de pitch entre el par de tornamesas visualizadas
  const currentTransitionStats = useMemo(() => {
    if (!currentPair.trackA || !currentPair.trackB) return null;
    const bpmA = currentPair.trackA.bpm;
    const bpmB = currentPair.trackB.bpm;
    const pitchAtoB = ((bpmB - bpmA) / bpmA) * 100;
    const isHarmonic = isHarmonicallyCompatible(currentPair.trackA.camelot, currentPair.trackB.camelot);
    const transitions = getHarmonicTransitions(currentPair.trackA.camelot);
    const transInfo = transitions.find((tr) => tr.code === currentPair.trackB.camelot);

    return {
      bpmA,
      bpmB,
      pitchAtoB,
      isHarmonic,
      harmonicLabel: transInfo?.label || (isHarmonic ? "Armonía Compatible" : "Contraste Tonal Libre"),
      harmonicDesc: transInfo?.description || "Mezcla con modulación armónica.",
    };
  }, [currentPair.trackA, currentPair.trackB]);

  return (
    <div className={cn("space-y-8", className)}>
      {/* CABECERA DE LA HERRAMIENTA */}
      <div className="border-2 border-[#1F1305] bg-white p-6 sm:p-8 shadow-[6px_6px_0px_#1F1305] space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-[#1F1305] pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 border border-[#1F1305] bg-[#F8C800] px-3 py-0.5 font-mono text-xs font-black text-[#1F1305] shadow-[1px_1px_0px_#1F1305]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>NUEVA HERRAMIENTA DJ EN VIVO</span>
            </div>
            <h2 className="font-cooper text-3xl sm:text-4xl font-black text-[#1F1305] tracking-tight">
              Crea Tu Mix // Secuenciador a Dos Tornamesas
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#5A5245] max-w-2xl leading-relaxed">
              Diseña tu set en vivo pista a pista alternando entre <strong>Tornamesa A</strong> y <strong>Tornamesa B</strong>.
              El sistema analiza la Rueda Camelot y calcula automáticamente el pitch óptimo para cada corte.
            </p>
          </div>

          {/* Resumen Superior del Set */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 flex-wrap">
            <div className="border-2 border-[#1F1305] bg-[#EDE0D0] px-3.5 py-1.5 font-mono text-xs shadow-[2px_2px_0px_#1F1305] text-center">
              <span className="text-[10px] text-[#746B5C] font-bold block uppercase">Temas en Mix</span>
              <strong className="text-base text-[#1F1305] font-black">{mixSteps.length}</strong>
            </div>

            <div
              className="border-2 border-[#1F1305] bg-[#EDE0D0] px-3.5 py-1.5 font-mono text-xs shadow-[2px_2px_0px_#1F1305] text-center"
              title="Estimación calculada al ~50% de duración de cada corte para mezcla continua en vivo"
            >
              <span className="text-[10px] text-[#746B5C] font-bold block uppercase">Duración Mix Est. (~50%)</span>
              <strong className="text-base text-[#1F1305] font-black">{formattedTotalDuration}</strong>
            </div>

            {mixSteps.length > 0 && (
              <>
                <button
                  type="button"
                  onClick={copySetlistToClipboard}
                  className="inline-flex items-center gap-1.5 border-2 border-[#1F1305] bg-white hover:bg-[#10B981] hover:text-white px-3 py-2 font-mono text-xs font-bold text-[#1F1305] shadow-[2px_2px_0px_#1F1305] transition-all cursor-pointer"
                  title="Copiar setlist estructurado al portapapeles"
                >
                  {copiedToast ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  <span>{copiedToast ? "¡Copiado!" : "Copiar Setlist"}</span>
                </button>

                <button
                  type="button"
                  onClick={resetMix}
                  className="inline-flex items-center gap-1.5 border-2 border-[#1F1305] bg-white hover:bg-[#E80000] hover:text-white px-3 py-2 font-mono text-xs font-bold text-[#1F1305] shadow-[2px_2px_0px_#1F1305] transition-all cursor-pointer"
                  title="Reiniciar y vaciar mezcla"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Reiniciar</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* INDICADOR DEL SIGUIENTE TURNO */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#FAF5EE] border-2 border-[#1F1305] p-3 sm:p-4 shadow-[2px_2px_0px_#1F1305]">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold text-[#746B5C] uppercase">Siguiente Acción:</span>
            <span
              className={cn(
                "inline-flex items-center gap-1.5 border border-[#1F1305] px-2.5 py-0.5 font-mono text-xs font-black shadow-[1px_1px_0px_#1F1305]",
                nextDeck === "A" ? "bg-[#E80000] text-white" : "bg-[#F1730C] text-white"
              )}
            >
              <Disc3 className="h-3.5 w-3.5 animate-spin [animation-duration:3s]" />
              <span>Cargar Pista #{nextStepNumber} en TORNAMESA {nextDeck}</span>
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              setPickerTab(lastTrackInMix ? "compatible" : "all");
              setIsPickerOpen(true);
            }}
            className="inline-flex items-center justify-center gap-2 border-2 border-[#1F1305] bg-[#F8C800] hover:bg-[#1F1305] hover:text-white px-4 py-2 font-mono text-xs font-black text-[#1F1305] shadow-[3px_3px_0px_#1F1305] hover:shadow-[3px_3px_0px_#E80000] transition-all active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>{mixSteps.length === 0 ? "Elegir Tema Inicial (Tornamesa A)" : `Elegir Pista #${nextStepNumber} (Tornamesa ${nextDeck})`}</span>
          </button>
        </div>
      </div>

      {/* CABINA DE DJ: DOS TORNAMESAS + MESA DE MEZCLAS CENTRAL */}
      <div className="border-4 border-[#1F1305] bg-white p-4 sm:p-6 shadow-[8px_8px_0px_#1F1305] relative overflow-hidden">
        {/* Decoración de cabecera de cabina */}
        <div className="flex items-center justify-between border-b-2 border-[#1F1305] pb-2 mb-4 font-mono text-[10px] text-[#746B5C] uppercase tracking-widest">
          <span className="font-black text-[#1F1305]">CABINA DE MEZCLA EN VIVO // SISTEMA PROFESIONAL KS-TURBO 1200</span>
          <span className="hidden sm:inline">DUAL DIRECT-DRIVE TURNTABLES • PALETA KUMBIA SOUND</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch pt-2">
          {/* ============================================================ */}
          {/* TORNAMESA A (CANAL 1 - PISTAS IMPARES: #1, #3, #5...) */}
          {/* ============================================================ */}
          <div className="lg:col-span-5 border-2 border-[#1F1305] bg-[#FAF5EE] text-[#1F1305] p-4 sm:p-5 shadow-[4px_4px_0px_#1F1305] flex flex-col justify-between space-y-4 relative">
            {/* Header Tornamesa A */}
            <div className="flex items-center justify-between border-b-2 border-[#1F1305] pb-3">
              <div className="flex items-center gap-2">
                <span className="border border-[#1F1305] bg-[#E80000] text-white font-mono font-black text-xs px-2.5 py-0.5 shadow-[1px_1px_0px_#1F1305] uppercase tracking-wider flex items-center gap-1.5">
                  <Disc3 className="h-3.5 w-3.5" />
                  <span>TORNAMESA A</span>
                </span>
                <span className="font-mono text-[10px] text-[#746B5C] hidden sm:inline font-bold">CH-1 (Impares)</span>
              </div>

              {/* Indicador LED On-Air */}
              <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold">
                {currentPair.trackA ? (
                  <span className="inline-flex items-center gap-1 border border-[#1F1305] bg-[#10B981] text-white px-2 py-0.5 shadow-[1px_1px_0px_#1F1305]">
                    <span className="h-2 w-2 rounded-full bg-white animate-ping" />
                    <span>CARGADO {currentPair.activeStepA ? `(#${currentPair.activeStepA})` : ""}</span>
                  </span>
                ) : (
                  <span className="text-[#746B5C] bg-[#EDE0D0] border border-[#1F1305] px-2 py-0.5">VACÍO</span>
                )}
              </div>
            </div>

            {/* PLATO DE VINILO GIRATORIO TORNAMESA A */}
            <div className="flex items-center justify-center py-2 sm:py-4">
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full border-4 border-[#1F1305] bg-[#EDE0D0] p-2 flex items-center justify-center shadow-[inset_0_0_12px_rgba(31,19,5,0.2)]">
                {/* Patrón de estrías y surcos de vinilo */}
                <div
                  className={cn(
                    "relative w-full h-full rounded-full border border-[#1F1305] bg-[#1F1305] flex items-center justify-center overflow-hidden transition-transform",
                    isSpinningA && currentPair.trackA && "animate-spin [animation-duration:3.6s] linear infinite"
                  )}
                  style={{
                    backgroundImage:
                      "repeating-radial-gradient(circle, #2C1E10 0px, #160D04 2px, #2C1E10 4px)",
                  }}
                >
                  {/* GALLETA CENTRAL: FOTO DEL ÁLBUM / LADO O LOGO POR DEFECTO */}
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-[#1F1305] overflow-hidden flex items-center justify-center shadow-md bg-white">
                    {currentPair.trackA ? (
                      <TrackCoverImage
                        src={currentPair.trackA.coverUrl || "/branding/logo-circular.png"}
                        defaultSrc="/branding/logo-circular.png"
                        title={currentPair.trackA.title}
                        artist={currentPair.trackA.artist}
                        format={currentPair.trackA.format}
                        side={currentPair.trackA.side}
                        size="full"
                        shape="circle"
                      />
                    ) : (
                      <div className="relative w-full h-full flex flex-col items-center justify-center p-1 text-center bg-white">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/branding/logo-circular.png"
                          alt="Kumbia Sound Logo"
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                    )}

                    {/* Agujero del eje central de la tornamesa (Spindle) */}
                    <div className="absolute inset-0 m-auto w-3.5 h-3.5 rounded-full bg-[#EDE0D0] border-2 border-[#1F1305] z-20 shadow-inner" />
                  </div>
                </div>

                {/* Brazo de tornamesa estilizado (Tonearm) */}
                <div className="absolute top-2 right-2 w-14 h-32 pointer-events-none z-30">
                  <svg viewBox="0 0 60 140" className="w-full h-full drop-shadow-[2px_2px_2px_rgba(31,19,5,0.4)]">
                    {/* Base del pivote */}
                    <circle cx="45" cy="15" r="12" fill="#FAF5EE" stroke="#1F1305" strokeWidth="2" />
                    <circle cx="45" cy="15" r="6" fill="#F8C800" stroke="#1F1305" strokeWidth="1" />
                    {/* Brazo metálico en S */}
                    <path
                      d={currentPair.trackA ? "M 45 15 Q 40 60, 20 80 T 15 125" : "M 45 15 Q 50 60, 52 80 T 54 125"}
                      fill="none"
                      stroke="#1F1305"
                      strokeWidth="3.5"
                    />
                    {/* Cápsula y portacápsulas con aguja */}
                    <rect
                      x={currentPair.trackA ? "8" : "48"}
                      y="120"
                      width="12"
                      height="16"
                      rx="2"
                      fill="#E80000"
                      stroke="#1F1305"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* CONTROLES Y FICHA DE TORNAMESA A */}
            <div className="space-y-3 pt-2 border-t-2 border-[#1F1305] font-mono text-xs">
              {currentPair.trackA ? (
                <div className="bg-white border-2 border-[#1F1305] p-3 space-y-2 shadow-[2px_2px_0px_#1F1305]">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <span className="text-[10px] text-[#E80000] font-black uppercase block">
                        Pista Activa {currentPair.activeStepA ? `(#${currentPair.activeStepA})` : ""}
                      </span>
                      <h4 className="font-cooper text-base sm:text-lg font-bold text-[#1F1305] truncate" title={currentPair.trackA.title}>
                        {currentPair.trackA.title}
                      </h4>
                      <p className="text-xs text-[#5A5245] truncate font-sans">
                        {currentPair.trackA.artist} {currentPair.trackA.year ? `• ${currentPair.trackA.year}` : ""}
                      </p>
                    </div>

                    <BadgeDJ bpm={currentPair.trackA.bpm} camelot={currentPair.trackA.camelot} />
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-1 border-t border-[#1F1305]/15 text-[#5A5245]">
                    <span className="bg-[#EDE0D0] border border-[#1F1305] px-2 py-0.5 text-[10px] font-bold text-[#1F1305]">
                      {currentPair.trackA.format || "LP"} {currentPair.trackA.side ? `• Lado ${currentPair.trackA.side}` : ""}
                    </span>
                    <span className="font-bold">
                      {currentPair.trackA.durationFormatted || "--:--"}
                      {currentPair.trackA.durationSeconds && (
                        <span className="text-[9px] text-[#746B5C] ml-1">
                          (~{Math.floor(Math.round(currentPair.trackA.durationSeconds / 2) / 60)}:{(Math.round(currentPair.trackA.durationSeconds / 2) % 60).toString().padStart(2, "0")} en mix)
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed border-[#1F1305] bg-white p-4 text-center">
                  <p className="text-xs text-[#746B5C] font-bold">Tornamesa A esperando primera pista o turno impar.</p>
                </div>
              )}

              {/* Botón de control de giro */}
              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={() => setIsSpinningA((v) => !v)}
                  className="inline-flex items-center gap-1.5 border-2 border-[#1F1305] bg-white hover:bg-[#F8C800] text-[#1F1305] px-2.5 py-1 text-[10px] font-black shadow-[2px_2px_0px_#1F1305] cursor-pointer transition-colors"
                >
                  {isSpinningA ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                  <span>{isSpinningA ? "DETENER PLATO" : "GIRAR VINILO"}</span>
                </button>

                <div className="flex items-center gap-1 font-mono text-[10px]">
                  <span className={cn("px-1.5 py-0.5 border-2 font-bold", currentPair.trackA?.format?.includes("45") ? "border-[#E80000] bg-[#E80000] text-white" : "border-[#1F1305] text-[#746B5C]")}>45 RPM</span>
                  <span className={cn("px-1.5 py-0.5 border-2 font-bold", !currentPair.trackA?.format?.includes("45") ? "border-[#E80000] bg-[#E80000] text-white" : "border-[#1F1305] text-[#746B5C]")}>33 RPM</span>
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* MESA DE MEZCLAS CENTRAL (DJ MIXER KM-2000) */}
          {/* ============================================================ */}
          <div className="lg:col-span-2 border-2 border-[#1F1305] bg-[#FAF5EE] text-[#1F1305] p-4 shadow-[4px_4px_0px_#1F1305] flex flex-col justify-between space-y-4">
            <div className="border-b-2 border-[#1F1305] pb-2 text-center font-mono">
              <span className="text-[9px] text-[#746B5C] block uppercase tracking-widest font-bold">AUDIO MATRIX</span>
              <span className="text-xs font-black text-[#1F1305]">KM-2000 MIXER</span>
            </div>

            {/* Medidores de Señal VU Stereo */}
            <div className="space-y-2 py-2">
              <div className="flex items-center justify-between font-mono text-[9px] text-[#746B5C] px-1 font-bold">
                <span>CH-1 (A)</span>
                <span>CH-2 (B)</span>
              </div>
              <div className="flex justify-center gap-3 h-24 bg-white border-2 border-[#1F1305] p-2 shadow-inner">
                {/* VU Meter A */}
                <div className="w-3.5 h-full flex flex-col-reverse justify-between gap-0.5">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={`vu-a-${i}`}
                      className={cn(
                        "w-full h-2 rounded-[1px] transition-all border border-[#1F1305]/20",
                        currentPair.trackA
                          ? i > 6
                            ? "bg-[#E80000]"
                            : i > 4
                            ? "bg-[#F8C800]"
                            : "bg-[#10B981]"
                          : "bg-[#EDE0D0]"
                      )}
                    />
                  ))}
                </div>

                {/* VU Meter B */}
                <div className="w-3.5 h-full flex flex-col-reverse justify-between gap-0.5">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={`vu-b-${i}`}
                      className={cn(
                        "w-full h-2 rounded-[1px] transition-all border border-[#1F1305]/20",
                        currentPair.trackB
                          ? i > 6
                            ? "bg-[#E80000]"
                            : i > 4
                            ? "bg-[#F8C800]"
                            : "bg-[#10B981]"
                          : "bg-[#EDE0D0]"
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* DATOS DE LA TRANSICIÓN ENTRE TORNAMESA A Y B */}
            {currentTransitionStats ? (
              <div className="bg-white border-2 border-[#1F1305] p-2.5 font-mono text-[10px] space-y-1.5 shadow-[2px_2px_0px_#1F1305]">
                <span className="text-[8px] text-[#E80000] uppercase font-black block">ANÁLISIS DE CORTE:</span>
                <div className="flex items-center justify-between font-bold">
                  <span>Ajuste Pitch:</span>
                  <span
                    className={cn(
                      Math.abs(currentTransitionStats.pitchAtoB) <= 3
                        ? "text-[#10B981]"
                        : "text-[#F1730C]"
                    )}
                  >
                    {currentTransitionStats.pitchAtoB > 0
                      ? `+${currentTransitionStats.pitchAtoB.toFixed(1)}%`
                      : `${currentTransitionStats.pitchAtoB.toFixed(1)}%`}
                  </span>
                </div>
                <div className="text-[9px] text-[#5A5245] leading-tight border-t border-[#1F1305]/15 pt-1 font-bold">
                  {currentTransitionStats.harmonicLabel}
                </div>
              </div>
            ) : (
              <div className="p-2 border-2 border-dashed border-[#1F1305] bg-white text-center font-mono text-[9px] text-[#746B5C]">
                Carga ambos canales para calcular pitch y armonía.
              </div>
            )}

            {/* MASTER CROSSFADER */}
            <div className="space-y-1.5 pt-2 border-t-2 border-[#1F1305]">
              <span className="font-mono text-[9px] text-center block text-[#746B5C] font-black uppercase">
                CROSSFADER
              </span>
              <div className="flex items-center justify-between text-[8px] font-mono font-bold text-[#746B5C] px-1">
                <span>CH-A</span>
                <span>CENTRO</span>
                <span>CH-B</span>
              </div>
              <div className="grid grid-cols-3 gap-1 bg-white p-1 border-2 border-[#1F1305]">
                <button
                  type="button"
                  onClick={() => setCrossfaderPosition("A")}
                  className={cn(
                    "py-1 text-[9px] font-mono font-black transition-colors cursor-pointer border border-[#1F1305]",
                    crossfaderPosition === "A" ? "bg-[#E80000] text-white" : "bg-[#EDE0D0] text-[#1F1305] hover:bg-[#F8C800]"
                  )}
                >
                  A
                </button>
                <button
                  type="button"
                  onClick={() => setCrossfaderPosition("center")}
                  className={cn(
                    "py-1 text-[9px] font-mono font-black transition-colors cursor-pointer border border-[#1F1305]",
                    crossfaderPosition === "center" ? "bg-[#F8C800] text-[#1F1305]" : "bg-[#EDE0D0] text-[#1F1305] hover:bg-[#F8C800]"
                  )}
                >
                  MID
                </button>
                <button
                  type="button"
                  onClick={() => setCrossfaderPosition("B")}
                  className={cn(
                    "py-1 text-[9px] font-mono font-black transition-colors cursor-pointer border border-[#1F1305]",
                    crossfaderPosition === "B" ? "bg-[#F1730C] text-white" : "bg-[#EDE0D0] text-[#1F1305] hover:bg-[#F8C800]"
                  )}
                >
                  B
                </button>
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* TORNAMESA B (CANAL 2 - PISTAS PARES: #2, #4, #6...) */}
          {/* ============================================================ */}
          <div className="lg:col-span-5 border-2 border-[#1F1305] bg-[#FAF5EE] text-[#1F1305] p-4 sm:p-5 shadow-[4px_4px_0px_#1F1305] flex flex-col justify-between space-y-4 relative">
            {/* Header Tornamesa B */}
            <div className="flex items-center justify-between border-b-2 border-[#1F1305] pb-3">
              <div className="flex items-center gap-2">
                <span className="border border-[#1F1305] bg-[#F1730C] text-white font-mono font-black text-xs px-2.5 py-0.5 shadow-[1px_1px_0px_#1F1305] uppercase tracking-wider flex items-center gap-1.5">
                  <Disc3 className="h-3.5 w-3.5" />
                  <span>TORNAMESA B</span>
                </span>
                <span className="font-mono text-[10px] text-[#746B5C] hidden sm:inline font-bold">CH-2 (Pares)</span>
              </div>

              {/* Indicador LED On-Air */}
              <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold">
                {currentPair.trackB ? (
                  <span className="inline-flex items-center gap-1 border border-[#1F1305] bg-[#F1730C] text-white px-2 py-0.5 shadow-[1px_1px_0px_#1F1305]">
                    <span className="h-2 w-2 rounded-full bg-white animate-ping" />
                    <span>CARGADO {currentPair.activeStepB ? `(#${currentPair.activeStepB})` : ""}</span>
                  </span>
                ) : (
                  <span className="text-[#746B5C] bg-[#EDE0D0] border border-[#1F1305] px-2 py-0.5">VACÍO</span>
                )}
              </div>
            </div>

            {/* PLATO DE VINILO GIRATORIO TORNAMESA B */}
            <div className="flex items-center justify-center py-2 sm:py-4">
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full border-4 border-[#1F1305] bg-[#EDE0D0] p-2 flex items-center justify-center shadow-[inset_0_0_12px_rgba(31,19,5,0.2)]">
                {/* Patrón de estrías y surcos de vinilo */}
                <div
                  className={cn(
                    "relative w-full h-full rounded-full border border-[#1F1305] bg-[#1F1305] flex items-center justify-center overflow-hidden transition-transform",
                    isSpinningB && currentPair.trackB && "animate-spin [animation-duration:3.6s] linear infinite"
                  )}
                  style={{
                    backgroundImage:
                      "repeating-radial-gradient(circle, #2C1E10 0px, #160D04 2px, #2C1E10 4px)",
                  }}
                >
                  {/* GALLETA CENTRAL: FOTO DEL ÁLBUM / LADO O LOGO POR DEFECTO */}
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-[#1F1305] overflow-hidden flex items-center justify-center shadow-md bg-white">
                    {currentPair.trackB ? (
                      <TrackCoverImage
                        src={currentPair.trackB.coverUrl || "/branding/logo-circular.png"}
                        defaultSrc="/branding/logo-circular.png"
                        title={currentPair.trackB.title}
                        artist={currentPair.trackB.artist}
                        format={currentPair.trackB.format}
                        side={currentPair.trackB.side}
                        size="full"
                        shape="circle"
                      />
                    ) : (
                      <div className="relative w-full h-full flex flex-col items-center justify-center p-1 text-center bg-white">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/branding/logo-circular.png"
                          alt="Kumbia Sound Logo"
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                    )}

                    {/* Agujero del eje central de la tornamesa (Spindle) */}
                    <div className="absolute inset-0 m-auto w-3.5 h-3.5 rounded-full bg-[#EDE0D0] border-2 border-[#1F1305] z-20 shadow-inner" />
                  </div>
                </div>

                {/* Brazo de tornamesa estilizado (Tonearm) */}
                <div className="absolute top-2 right-2 w-14 h-32 pointer-events-none z-30">
                  <svg viewBox="0 0 60 140" className="w-full h-full drop-shadow-[2px_2px_2px_rgba(31,19,5,0.4)]">
                    {/* Base del pivote */}
                    <circle cx="45" cy="15" r="12" fill="#FAF5EE" stroke="#1F1305" strokeWidth="2" />
                    <circle cx="45" cy="15" r="6" fill="#F8C800" stroke="#1F1305" strokeWidth="1" />
                    {/* Brazo metálico en S */}
                    <path
                      d={currentPair.trackB ? "M 45 15 Q 40 60, 20 80 T 15 125" : "M 45 15 Q 50 60, 52 80 T 54 125"}
                      fill="none"
                      stroke="#1F1305"
                      strokeWidth="3.5"
                    />
                    {/* Cápsula y portacápsulas con aguja */}
                    <rect
                      x={currentPair.trackB ? "8" : "48"}
                      y="120"
                      width="12"
                      height="16"
                      rx="2"
                      fill="#F1730C"
                      stroke="#1F1305"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* CONTROLES Y FICHA DE TORNAMESA B */}
            <div className="space-y-3 pt-2 border-t-2 border-[#1F1305] font-mono text-xs">
              {currentPair.trackB ? (
                <div className="bg-white border-2 border-[#1F1305] p-3 space-y-2 shadow-[2px_2px_0px_#1F1305]">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <span className="text-[10px] text-[#F1730C] font-black uppercase block">
                        Pista Activa {currentPair.activeStepB ? `(#${currentPair.activeStepB})` : ""}
                      </span>
                      <h4 className="font-cooper text-base sm:text-lg font-bold text-[#1F1305] truncate" title={currentPair.trackB.title}>
                        {currentPair.trackB.title}
                      </h4>
                      <p className="text-xs text-[#5A5245] truncate font-sans">
                        {currentPair.trackB.artist} {currentPair.trackB.year ? `• ${currentPair.trackB.year}` : ""}
                      </p>
                    </div>

                    <BadgeDJ bpm={currentPair.trackB.bpm} camelot={currentPair.trackB.camelot} />
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-1 border-t border-[#1F1305]/15 text-[#5A5245]">
                    <span className="bg-[#EDE0D0] border border-[#1F1305] px-2 py-0.5 text-[10px] font-bold text-[#1F1305]">
                      {currentPair.trackB.format || "LP"} {currentPair.trackB.side ? `• Lado ${currentPair.trackB.side}` : ""}
                    </span>
                    <span className="font-bold">
                      {currentPair.trackB.durationFormatted || "--:--"}
                      {currentPair.trackB.durationSeconds && (
                        <span className="text-[9px] text-[#746B5C] ml-1">
                          (~{Math.floor(Math.round(currentPair.trackB.durationSeconds / 2) / 60)}:{(Math.round(currentPair.trackB.durationSeconds / 2) % 60).toString().padStart(2, "0")} en mix)
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed border-[#1F1305] bg-white p-4 text-center">
                  <p className="text-xs text-[#746B5C] font-bold">Tornamesa B esperando pista #2 o turno par.</p>
                </div>
              )}

              {/* Botón de control de giro */}
              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={() => setIsSpinningB((v) => !v)}
                  className="inline-flex items-center gap-1.5 border-2 border-[#1F1305] bg-white hover:bg-[#F8C800] text-[#1F1305] px-2.5 py-1 text-[10px] font-black shadow-[2px_2px_0px_#1F1305] cursor-pointer transition-colors"
                >
                  {isSpinningB ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                  <span>{isSpinningB ? "DETENER PLATO" : "GIRAR VINILO"}</span>
                </button>

                <div className="flex items-center gap-1 font-mono text-[10px]">
                  <span className={cn("px-1.5 py-0.5 border-2 font-bold", currentPair.trackB?.format?.includes("45") ? "border-[#F1730C] bg-[#F1730C] text-white" : "border-[#1F1305] text-[#746B5C]")}>45 RPM</span>
                  <span className={cn("px-1.5 py-0.5 border-2 font-bold", !currentPair.trackB?.format?.includes("45") ? "border-[#F1730C] bg-[#F1730C] text-white" : "border-[#1F1305] text-[#746B5C]")}>33 RPM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* LÍNEA DE TIEMPO / LISTADO DE TEMAS SECUENCIALES */}
      {/* ============================================================ */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b-2 border-[#1F1305] pb-2 font-mono">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-[#E80000]" />
            <h3 className="font-bold text-xs uppercase tracking-wider text-[#1F1305]">
              Secuencia de Mezcla DJ // Playlist Alternada ({mixSteps.length} pistas)
            </h3>
          </div>
          <span className="text-[11px] text-[#746B5C] font-bold hidden sm:inline">
            Alternancia estricta: Tornamesa A ➔ Tornamesa B ➔ Tornamesa A...
          </span>
        </div>

        {mixSteps.length === 0 ? (
          <div className="border-2 border-[#1F1305] bg-white p-8 sm:p-12 text-center shadow-[4px_4px_0px_#1F1305] space-y-4">
            <Disc3 className="h-12 w-12 text-[#E80000] mx-auto animate-pulse" />
            <div className="max-w-md mx-auto space-y-1">
              <h4 className="font-cooper text-xl font-bold text-[#1F1305]">
                Tu set de mezcla está vacío
              </h4>
              <p className="font-sans text-xs text-[#5A5245]">
                Haz clic en el botón inferior para elegir la primera pista con la que empezará tu sesión en la <strong>Tornamesa A</strong>.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setPickerTab("all");
                setIsPickerOpen(true);
              }}
              className="inline-flex items-center gap-2 border-2 border-[#1F1305] bg-[#F8C800] hover:bg-[#E80000] hover:text-white px-5 py-2.5 font-mono text-xs font-black text-[#1F1305] shadow-[3px_3px_0px_#1F1305] transition-all cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Elegir Pista #1 para Tornamesa A</span>
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {mixSteps.map((step, idx) => {
              const isDeckA = step.deck === "A";
              const isLast = idx === mixSteps.length - 1;

              return (
                <div key={step.id} className="space-y-3">
                  {/* Tarjeta de la pista */}
                  <div
                    className={cn(
                      "border-2 border-[#1F1305] bg-white p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[3px_3px_0px_#1F1305] transition-all hover:bg-[#FAF5EE]",
                      isDeckA ? "border-l-8 border-l-[#E80000]" : "border-l-8 border-l-[#F1730C]"
                    )}
                  >
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                      {/* Badge de Posición y Deck */}
                      <div className="flex flex-col items-center justify-center shrink-0 w-12 font-mono">
                        <span className="text-base font-black text-[#1F1305]">#{step.stepNumber}</span>
                        <span
                          className={cn(
                            "text-[9px] font-black uppercase px-1.5 py-0.2 border border-[#1F1305]",
                            isDeckA ? "bg-[#E80000] text-white" : "bg-[#F1730C] text-white"
                          )}
                        >
                          DECK {step.deck}
                        </span>
                      </div>

                      {/* Imagen de Portada / Cara de la pista */}
                      <TrackCoverImage
                        src={step.track.coverUrl}
                        title={step.track.title}
                        artist={step.track.artist}
                        format={step.track.format}
                        side={step.track.side}
                        size="md"
                        showSideBadge={true}
                      />

                      {/* Datos del tema */}
                      <div className="min-w-0 flex-1">
                        <h4 className="font-cooper font-bold text-[#1F1305] text-base truncate" title={step.track.title}>
                          {step.track.title}
                        </h4>
                        <p className="font-mono text-xs text-[#5A5245] truncate">
                          {step.track.artist}
                          {step.track.year ? ` (${step.track.year})` : ""}
                          {step.track.label ? ` • ${step.track.label}` : ""}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="font-mono text-[10px] font-bold text-[#746B5C] bg-[#EDE0D0] border border-[#1F1305]/30 px-1.5 py-0.2">
                            {step.track.format || "LP"} {step.track.side ? `• Lado ${step.track.side}` : ""}
                          </span>
                          {step.track.durationFormatted && (
                            <span className="font-mono text-[10px] text-[#5A5245]">
                              {step.track.durationFormatted}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Métrica DJ y Acciones */}
                    <div className="flex items-center gap-3 shrink-0 self-end sm:self-center font-mono text-xs">
                      <BadgeDJ bpm={step.track.bpm} camelot={step.track.camelot} />

                      {/* Botón para enfocar en tornamesas */}
                      <button
                        type="button"
                        onClick={() => {
                          const pairIdx = Math.max(0, Math.min(idx, mixSteps.length - 2));
                          setFocusedTransitionIdx(pairIdx);
                          window.scrollTo({ top: 300, behavior: "smooth" });
                        }}
                        className="border border-[#1F1305] bg-white hover:bg-[#1F1305] hover:text-white px-2 py-1 text-[10px] font-bold shadow-[1px_1px_0px_#1F1305] transition-colors cursor-pointer"
                        title="Ver en las tornamesas"
                      >
                        Ver en Decks
                      </button>

                      {/* Botón Eliminar */}
                      <button
                        type="button"
                        onClick={() => removeStep(idx)}
                        className="text-[#E80000] hover:bg-[#E80000] hover:text-white border border-[#E80000]/40 p-1 transition-colors cursor-pointer"
                        title="Quitar pista de la secuencia"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Indicador de Transición hacia la siguiente pista */}
                  {!isLast && mixSteps[idx + 1] && (
                    <div className="flex items-center gap-3 pl-8 sm:pl-16 font-mono text-xs text-[#5A5245]">
                      <MoveRight className="h-4 w-4 text-[#E80000] shrink-0" />
                      <div className="flex flex-wrap items-center gap-2 bg-[#EDE0D0]/80 border border-[#1F1305]/30 px-3 py-1 shadow-[1px_1px_0px_#1F1305]">
                        <span className="font-bold text-[#1F1305] text-[11px]">
                          Crossfade Tornamesa {step.deck} ➔ Tornamesa {mixSteps[idx + 1].deck}
                        </span>
                        {mixSteps[idx + 1].pitchDiffWithPrev !== undefined && (
                          <span
                            className={cn(
                              "font-bold text-[10px] px-1.5 py-0.2 border border-[#1F1305]/20",
                              Math.abs(mixSteps[idx + 1].pitchDiffWithPrev!) <= 3
                                ? "bg-[#10B981]/20 text-[#065F46]"
                                : "bg-[#F1730C]/20 text-[#C2410C]"
                            )}
                          >
                            Pitch: {mixSteps[idx + 1].pitchDiffWithPrev! > 0 ? `+${mixSteps[idx + 1].pitchDiffWithPrev!.toFixed(1)}%` : `${mixSteps[idx + 1].pitchDiffWithPrev!.toFixed(1)}%`}
                          </span>
                        )}
                        {mixSteps[idx + 1].harmonicTransition && (
                          <span className="text-[10px] text-[#1F1305] font-bold">
                            {mixSteps[idx + 1].harmonicTransition!.label}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Botón al final para agregar siguiente tema */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setPickerTab(lastTrackInMix ? "compatible" : "all");
                  setIsPickerOpen(true);
                }}
                className="w-full border-2 border-dashed border-[#1F1305] bg-[#FAF5EE] hover:bg-[#F8C800] p-4 text-center font-mono text-xs font-black text-[#1F1305] shadow-[2px_2px_0px_#1F1305] transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Plus className="h-4 w-4 text-[#E80000]" />
                <span>+ Agregar Pista #{nextStepNumber} en Tornamesa {nextDeck}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/* MODAL INTELIGENTE DE SELECCIÓN DE PISTAS PARA EL MIX */}
      {/* ============================================================ */}
      {isPickerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-2xl border-4 border-[#1F1305] bg-white shadow-[8px_8px_0px_#1F1305] max-h-[90vh] flex flex-col overflow-hidden">
            {/* Cabecera del Modal */}
            <div className="border-b-2 border-[#1F1305] bg-[#EDE0D0] p-4 flex items-center justify-between">
              <div>
                <span
                  className={cn(
                    "font-mono text-[10px] font-black uppercase px-2 py-0.5 border border-[#1F1305] text-white",
                    nextDeck === "A" ? "bg-[#E80000]" : "bg-[#F1730C]"
                  )}
                >
                  CARGANDO EN TORNAMESA {nextDeck}
                </span>
                <h3 className="font-cooper text-xl font-bold text-[#1F1305] mt-1">
                  Elegir Pista #{nextStepNumber} para el Mix
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setIsPickerOpen(false)}
                className="border-2 border-[#1F1305] bg-white hover:bg-[#E80000] hover:text-white p-1 text-[#1F1305] shadow-[2px_2px_0px_#1F1305] transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Referencia de mezcla si ya hay una pista anterior */}
            {lastTrackInMix && (
              <div className="bg-[#1F1305] text-[#EDE0D0] p-3 px-4 flex items-center justify-between gap-2 font-mono text-xs">
                <div className="truncate">
                  <span className="text-[10px] text-[#F8C800] block uppercase">MEZCLANDO DESDE LA PISTA ANTERIOR:</span>
                  <span className="font-bold text-white truncate block">
                    {lastTrackInMix.title} — {lastTrackInMix.artist}
                  </span>
                </div>
                <div className="shrink-0 flex items-center gap-2">
                  <BadgeDJ bpm={lastTrackInMix.bpm} camelot={lastTrackInMix.camelot} />
                </div>
              </div>
            )}

            {/* Pestañas de Selección */}
            {lastTrackInMix && (
              <div className="grid grid-cols-2 border-b-2 border-[#1F1305] bg-neutral-100 font-mono text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setPickerTab("compatible")}
                  className={cn(
                    "py-2.5 px-4 text-center border-r-2 border-[#1F1305] transition-colors cursor-pointer",
                    pickerTab === "compatible"
                      ? "bg-white text-[#1F1305] shadow-[inset_0_-2px_0_#E80000]"
                      : "text-neutral-600 hover:bg-neutral-200"
                  )}
                >
                  ✓ Compatibles Camelot &amp; Pitch ({candidateRecommendations.length})
                </button>
                <button
                  type="button"
                  onClick={() => setPickerTab("all")}
                  className={cn(
                    "py-2.5 px-4 text-center transition-colors cursor-pointer",
                    pickerTab === "all"
                      ? "bg-white text-[#1F1305] shadow-[inset_0_-2px_0_#E80000]"
                      : "text-neutral-600 hover:bg-neutral-200"
                  )}
                >
                  🔍 Buscar en Todo el Catálogo
                </button>
              </div>
            )}

            {/* Barra de búsqueda para catálogo general */}
            {(pickerTab === "all" || !lastTrackInMix) && (
              <div className="p-3 border-b-2 border-[#1F1305] bg-white">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#746B5C]" />
                  <input
                    type="text"
                    value={pickerSearchQuery}
                    onChange={(e) => setPickerSearchQuery(e.target.value)}
                    placeholder="Buscar por título, artista o tonalidad Camelot (ej. 8A)..."
                    className="w-full border-2 border-[#1F1305] bg-[#EDE0D0]/50 pl-9 pr-3 py-2 font-mono text-xs text-[#1F1305] focus:outline-none focus:bg-white focus:border-[#E80000]"
                    autoFocus
                  />
                </div>
              </div>
            )}

            {/* Lista de Pistas en el Modal */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2.5 divide-y divide-[#1F1305]/10">
              {pickerTab === "compatible" && lastTrackInMix ? (
                candidateRecommendations.length > 0 ? (
                  candidateRecommendations.map(({ track, bpmDiff, transInfo }) => (
                    <div
                      key={track.id}
                      className="pt-2.5 first:pt-0 flex items-center justify-between gap-3 hover:bg-[#EDE0D0]/40 p-2 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <TrackCoverImage
                          src={track.coverUrl}
                          title={track.title}
                          artist={track.artist}
                          format={track.format}
                          side={track.side}
                          size="md"
                          showSideBadge={true}
                        />
                        <div className="min-w-0">
                          <h4 className="font-cooper font-bold text-sm text-[#1F1305] truncate">
                            {track.title}
                          </h4>
                          <p className="font-mono text-xs text-[#5A5245] truncate">
                            {track.artist}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5 font-mono text-[10px]">
                            <span className="text-[#10B981] font-bold">
                              Pitch: {bpmDiff > 0 ? `+${bpmDiff.toFixed(1)}%` : `${bpmDiff.toFixed(1)}%`}
                            </span>
                            <span className="text-neutral-400">•</span>
                            <span className="text-[#E80000] font-bold truncate">
                              {transInfo?.label || track.camelot}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <BadgeDJ bpm={track.bpm} camelot={track.camelot} />
                        <button
                          type="button"
                          onClick={() => addTrackToMix(track)}
                          className={cn(
                            "border border-[#1F1305] px-3 py-1.5 font-mono text-xs font-black text-white shadow-[2px_2px_0px_#1F1305] hover:opacity-90 transition-opacity cursor-pointer",
                            nextDeck === "A" ? "bg-[#E80000]" : "bg-[#F1730C]"
                          )}
                        >
                          Cargar
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center font-mono text-xs text-[#746B5C] space-y-2">
                    <p>No se encontraron temas en el rango ±5% de BPM con compatibilidad armónica.</p>
                    <button
                      type="button"
                      onClick={() => setPickerTab("all")}
                      className="text-[#E80000] font-bold underline cursor-pointer"
                    >
                      Ver todo el catálogo general
                    </button>
                  </div>
                )
              ) : (
                /* Lista de búsqueda general */
                searchResults.map((track) => {
                  let diff = 0;
                  if (lastTrackInMix) {
                    diff = ((track.bpm - lastTrackInMix.bpm) / lastTrackInMix.bpm) * 100;
                  }

                  return (
                    <div
                      key={track.id}
                      className="pt-2.5 first:pt-0 flex items-center justify-between gap-3 hover:bg-[#EDE0D0]/40 p-2 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <TrackCoverImage
                          src={track.coverUrl}
                          title={track.title}
                          artist={track.artist}
                          format={track.format}
                          side={track.side}
                          size="md"
                          showSideBadge={true}
                        />
                        <div className="min-w-0">
                          <h4 className="font-cooper font-bold text-sm text-[#1F1305] truncate">
                            {track.title}
                          </h4>
                          <p className="font-mono text-xs text-[#5A5245] truncate">
                            {track.artist}
                          </p>
                          {lastTrackInMix && (
                            <span className="font-mono text-[10px] text-[#746B5C] block">
                              Pitch: {diff > 0 ? `+${diff.toFixed(1)}%` : `${diff.toFixed(1)}%`}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <BadgeDJ bpm={track.bpm} camelot={track.camelot} />
                        <button
                          type="button"
                          onClick={() => addTrackToMix(track)}
                          className={cn(
                            "border border-[#1F1305] px-3 py-1.5 font-mono text-xs font-black text-white shadow-[2px_2px_0px_#1F1305] hover:opacity-90 transition-opacity cursor-pointer",
                            nextDeck === "A" ? "bg-[#E80000]" : "bg-[#F1730C]"
                          )}
                        >
                          Cargar
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Pie del modal */}
            <div className="border-t-2 border-[#1F1305] bg-[#EDE0D0] p-3 text-right">
              <button
                type="button"
                onClick={() => setIsPickerOpen(false)}
                className="border-2 border-[#1F1305] bg-white hover:bg-[#1F1305] hover:text-white px-4 py-1.5 font-mono text-xs font-bold text-[#1F1305] shadow-[2px_2px_0px_#1F1305] transition-colors cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
