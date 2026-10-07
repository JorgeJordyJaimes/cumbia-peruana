"use client";

import { useEffect, useState } from "react";
import { X, GitFork, Disc, Music, Loader2, Calendar, User, ArrowDown } from "lucide-react";
import { getGenealogiaVersionesClient } from "../services/genealogia-service";
import type { GenealogiaVersionesResult, NodoGenealogiaVersion } from "@/types/database";

interface VersionesExplorerModalProps {
  temaId: number | null;
  tituloTema?: string;
  onClose: () => void;
}

export function VersionesExplorerModal({
  temaId,
  tituloTema,
  onClose,
}: VersionesExplorerModalProps) {
  const [data, setData] = useState<GenealogiaVersionesResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (!temaId) return;

    let isMounted = true;

    getGenealogiaVersionesClient(temaId)
      .then((res) => {
        if (!isMounted) return;
        if (!res) {
          setError("No se pudo resolver el árbol de versiones para este tema.");
        } else {
          setData(res);
        }
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err instanceof Error ? err.message : "Error al consultar árbol de versiones.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [temaId]);

  if (!temaId) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto border-2 border-[#1F1305] bg-[#EDE0D0] text-[#1F1305] p-6 sm:p-8 shadow-[8px_8px_0px_#1F1305]">
        {/* Botón Cerrar */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 border-2 border-[#1F1305] bg-white p-2 text-[#1F1305] shadow-[2px_2px_0px_#1F1305] hover:bg-[#E80000] hover:text-white transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Cerrar</span>
        </button>

        {/* Cabecera */}
        <div className="space-y-2 border-b-2 border-[#1F1305] pb-5 pr-10">
          <div className="inline-flex items-center gap-2 border border-[#1F1305] bg-[#F1730C] px-2.5 py-0.5 font-mono text-[11px] font-bold text-white shadow-[2px_2px_0px_#1F1305]">
            <GitFork className="h-3.5 w-3.5" />
            <span>GENEALOGÍA DE VERSIONES (WITH RECURSIVE)</span>
          </div>

          <h2 className="font-cooper text-2xl sm:text-3xl font-black text-[#1F1305]">
            {tituloTema ? `Linaje de: "${tituloTema}"` : "Árbol Fonográfico de Versiones"}
          </h2>

          <p className="font-sans text-xs sm:text-sm text-[#5A5245]">
            Resolución en un solo paso del motor relacional de PostgreSQL mostrando la composición raíz original y todas sus derivaciones en el tiempo.
          </p>
        </div>

        {/* Contenido Principal */}
        <div className="pt-6">
          {loading && (
            <div className="flex flex-col items-center justify-center py-16 space-y-3">
              <Loader2 className="h-8 w-8 animate-spin text-[#E80000]" />
              <span className="font-mono text-xs font-bold text-[#1F1305]">
                Resolviendo grafo recursivo de versiones...
              </span>
            </div>
          )}

          {error && (
            <div className="border-2 border-[#E80000] bg-white p-4 font-mono text-xs text-[#E80000] shadow-[3px_3px_0px_#E80000]">
              {error}
            </div>
          )}

          {!loading && data && (
            <div className="space-y-6">
              {/* Resumen Métrico */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
                <div className="border-2 border-[#1F1305] bg-white p-3 shadow-[2px_2px_0px_#1F1305]">
                  <span className="text-[#5A5245] block text-[10px] uppercase font-bold">Nodos en Red</span>
                  <span className="text-lg font-black text-[#1F1305]">{data.total_nodos}</span>
                </div>
                <div className="border-2 border-[#1F1305] bg-white p-3 shadow-[2px_2px_0px_#1F1305]">
                  <span className="text-[#5A5245] block text-[10px] uppercase font-bold">Total Covers / Derivaciones</span>
                  <span className="text-lg font-black text-[#E80000]">{data.total_versiones}</span>
                </div>
                <div className="col-span-2 sm:col-span-1 border-2 border-[#1F1305] bg-white p-3 shadow-[2px_2px_0px_#1F1305]">
                  <span className="text-[#5A5245] block text-[10px] uppercase font-bold">ID Raíz Original</span>
                  <span className="text-lg font-black text-[#10B981]">#{data.tema_raiz_id}</span>
                </div>
              </div>

              {/* Lista Jerárquica de Nodos */}
              <div className="space-y-4">
                {data.nodos.map((nodo: NodoGenealogiaVersion, index: number) => {
                  const isRoot = nodo.es_original_raiz;
                  const isCurrent = nodo.es_tema_consultado;

                  return (
                    <div key={nodo.id_tema} className="relative">
                      {index > 0 && (
                        <div className="flex justify-center my-2">
                          <ArrowDown className="h-4 w-4 text-[#E80000]" />
                        </div>
                      )}

                      <div
                        className={`border-2 border-[#1F1305] p-4 sm:p-5 transition-all shadow-[4px_4px_0px_#1F1305] ${
                          isRoot
                            ? "bg-[#FFFDF9] border-[#10B981] border-2"
                            : isCurrent
                            ? "bg-white border-[#E80000] border-2"
                            : "bg-white"
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1F1305]/20 pb-2 mb-3 font-mono text-xs">
                          <div className="flex items-center gap-2">
                            {isRoot ? (
                              <span className="border border-[#1F1305] bg-[#10B981] px-2 py-0.5 font-bold text-white shadow-[1px_1px_0px_#1F1305]">
                                ★ RAÍZ ORIGINAL (NIVEL 0)
                              </span>
                            ) : (
                              <span className="border border-[#1F1305] bg-[#F8C800] px-2 py-0.5 font-bold text-[#1F1305] shadow-[1px_1px_0px_#1F1305]">
                                ↳ GENERACIÓN {nodo.nivel}
                              </span>
                            )}

                            {isCurrent && (
                              <span className="border border-[#1F1305] bg-[#E80000] px-2 py-0.5 font-bold text-white shadow-[1px_1px_0px_#1F1305]">
                                TEMA SELECCIONADO
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2 font-bold text-[#5A5245]">
                            {nodo.bpm && <span>{nodo.bpm} BPM</span>}
                            {nodo.musical_key && <span>• {nodo.musical_key}</span>}
                            {nodo.camelot_code && <span>({nodo.camelot_code})</span>}
                          </div>
                        </div>

                        {/* Título e Intérpretes */}
                        <div className="space-y-2">
                          <div className="flex items-baseline gap-2">
                            <Music className="h-4 w-4 text-[#F1730C] shrink-0" />
                            <h3 className="font-cooper text-xl sm:text-2xl font-bold text-[#1F1305]">
                              {nodo.titulo_tema}
                            </h3>
                          </div>

                          {/* Grupos Intérpretes */}
                          {nodo.grupos && nodo.grupos.length > 0 && (
                            <p className="font-mono text-xs font-bold text-[#1F1305]">
                              Interpretado por:{" "}
                              <span className="text-[#E80000]">
                                {nodo.grupos.map((g) => g.nombre_grupo).join(", ")}
                              </span>
                            </p>
                          )}

                          {/* Compositores */}
                          {nodo.compositores && nodo.compositores.length > 0 && (
                            <p className="font-sans text-xs text-[#5A5245] flex items-center gap-1.5">
                              <User className="h-3.5 w-3.5 text-[#5A5245]" />
                              <span>
                                Composición:{" "}
                                <strong>
                                  {nodo.compositores
                                    .map((c) =>
                                      c.credito_como
                                        ? `${c.nombre} (acreditado como "${c.credito_como}")`
                                        : c.nombre
                                    )
                                    .join(", ")}
                                </strong>
                              </span>
                            </p>
                          )}

                          {/* Prensajes en Catálogo */}
                          {nodo.prensajes && nodo.prensajes.length > 0 && (
                            <div className="pt-2 flex flex-wrap gap-2 font-mono text-[11px]">
                              {nodo.prensajes.map((pr, pidx) => (
                                <span
                                  key={pidx}
                                  className="border border-[#1F1305] bg-[#EDE0D0] px-2 py-1 flex items-center gap-1.5 text-[#1F1305] font-bold shadow-[1px_1px_0px_#1F1305]"
                                >
                                  <Disc className="h-3 w-3 text-[#E80000]" />
                                  <span>{pr.nombre_album || "Álbum sin título"}</span>
                                  {pr.año_publicacion && (
                                    <span className="text-[#5A5245] flex items-center gap-0.5">
                                      <Calendar className="h-2.5 w-2.5" />
                                      {pr.año_publicacion}
                                    </span>
                                  )}
                                  {pr.sello && <span className="text-[#E80000]">[{pr.sello}]</span>}
                                  {pr.lado && <span>Lado {pr.lado}</span>}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
