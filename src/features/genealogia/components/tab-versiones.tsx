"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { GitFork, Disc, Music, Loader2, Calendar, User, ArrowDown, Activity, Sparkles } from "lucide-react";
import { getGenealogiaVersionesClient } from "../services/genealogia-service";
import type { GenealogiaVersionesResult, NodoGenealogiaVersion } from "@/types/database";

interface TemaVersionPredefinido {
  id_tema: number;
  titulo: string;
  autor: string;
  añoOriginal: number;
  descripcion: string;
}

const TEMAS_VERSIONADOS_CANONICOS: TemaVersionPredefinido[] = [
  {
    id_tema: 1,
    titulo: "Elsa",
    autor: "Enrique Delgado Montes",
    añoOriginal: 1970,
    descripcion: "Himno fundacional de la cumbia peruana grabado originalmente por Los Destellos (Odeón) y re-versionado por decenas de agrupaciones en vinilo.",
  },
  {
    id_tema: 12,
    titulo: "La Danza de Los Mirlos",
    autor: "Jorge Rodríguez Grández",
    añoOriginal: 1973,
    descripcion: "Cumbia amazónica instrumental emblemática de Los Mirlos. Adoptada continentalmente como 'Cumbia de los Pajaritos' en Colombia y México.",
  },
  {
    id_tema: 24,
    titulo: "Cariñito",
    autor: "Ángel Aníbal Rosado",
    añoOriginal: 1979,
    descripcion: "Composición de Ángel Aníbal para Los Hijos del Sol. Clásico absoluto del cancionero popular con múltiples variantes de ritmo y tempo.",
  },
  {
    id_tema: 45,
    titulo: "Colegiala",
    autor: "Walter León Aguilar",
    añoOriginal: 1975,
    descripcion: "Grabada originalmente por Los Ilusionistas. Traspasó fronteras hasta convertirse en éxito continental con Rodolfo Aicardi.",
  },
];

export function TabVersiones() {
  const [selectedTemaId, setSelectedTemaId] = useState<number>(TEMAS_VERSIONADOS_CANONICOS[0].id_tema);
  const [data, setData] = useState<GenealogiaVersionesResult | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    getGenealogiaVersionesClient(selectedTemaId)
      .then((res) => {
        if (!isMounted) return;
        if (!res) {
          setError("No se hallaron ramificaciones registradas en la tabla de versiones para este tema.");
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
  }, [selectedTemaId]);

  const temaSeleccionado = TEMAS_VERSIONADOS_CANONICOS.find((t) => t.id_tema === selectedTemaId) || TEMAS_VERSIONADOS_CANONICOS[0];

  return (
    <div className="space-y-8">
      {/* Selector de Temas con Árbol de Versiones */}
      <div className="border-2 border-[#1F1305] bg-white p-5 shadow-[4px_4px_0px_#1F1305] space-y-3">
        <div className="flex items-center justify-between font-mono text-xs border-b border-[#1F1305]/20 pb-2">
          <span className="font-black text-[#E80000] flex items-center gap-1.5 uppercase">
            <GitFork className="h-4 w-4" /> Temas con Árbol Recursivo de Versiones (WITH RECURSIVE):
          </span>
          <span className="text-[#5A5245]">Consultas SQL relacionales</span>
        </div>

        <div className="flex flex-wrap gap-2.5 font-mono text-xs">
          {TEMAS_VERSIONADOS_CANONICOS.map((t) => {
            const isSelected = t.id_tema === selectedTemaId;
            return (
              <button
                key={t.id_tema}
                type="button"
                onClick={() => setSelectedTemaId(t.id_tema)}
                className={`border-2 border-[#1F1305] px-4 py-2 font-bold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#1F1305] text-[#EDE0D0] shadow-[2px_2px_0px_#E80000]"
                    : "bg-white text-[#1F1305] hover:bg-[#EDE0D0]"
                }`}
              >
                🎵 {t.titulo} ({t.añoOriginal}) · {t.autor}
              </button>
            );
          })}
        </div>
      </div>

      {/* Panel del Árbol de Versiones */}
      <div className="border-2 border-[#1F1305] bg-white p-6 sm:p-10 shadow-[6px_6px_0px_#1F1305] space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 border-b-2 border-[#1F1305] pb-6">
          <div className="space-y-2 max-w-2xl">
            <span className="font-mono text-xs font-black uppercase text-[#E80000]">
              ÁRBOL DE COVERS, REGISTRACIONES & MUTACIONES ORQUESTALES
            </span>
            <h2 className="font-cooper text-3xl sm:text-4xl font-black text-[#1F1305]">
              {temaSeleccionado.titulo}
            </h2>
            <p className="font-sans text-sm text-[#5A5245] leading-relaxed">
              {temaSeleccionado.descripcion}
            </p>
          </div>

          <div className="shrink-0 font-mono text-xs border-2 border-[#1F1305] bg-[#EDE0D0] p-3 shadow-[2px_2px_0px_#1F1305] space-y-1">
            <div className="font-black text-[#1F1305]">Autor: {temaSeleccionado.autor}</div>
            <div className="text-[#5A5245]">Registro Original: {temaSeleccionado.añoOriginal}</div>
          </div>
        </div>

        {/* Estado de Carga */}
        {loading && (
          <div className="border-2 border-[#1F1305] bg-[#EDE0D0]/30 p-12 text-center space-y-3">
            <Loader2 className="h-8 w-8 animate-spin text-[#E80000] mx-auto" />
            <p className="font-mono text-xs font-bold text-[#1F1305]">
              Resolviendo árbol de versiones con CTE recursivo en PostgreSQL...
            </p>
          </div>
        )}

        {/* Visualización de Nodos */}
        {!loading && data && data.nodos && data.nodos.length > 0 ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between font-mono text-xs border-b border-[#1F1305]/20 pb-2">
              <span className="font-bold text-[#1F1305]">
                TOTAL DE NODOS: {data.total_nodos} · VERSIONES REGISTRADAS: {data.total_versiones}
              </span>
              <span className="text-[#5A5245]">Jerarquía cronológica de grabaciones</span>
            </div>

            <div className="space-y-4">
              {data.nodos.map((nodo: NodoGenealogiaVersion, idx: number) => {
                const esRaiz = nodo.es_original_raiz;
                return (
                  <div
                    key={nodo.id_tema}
                    className={`border-2 border-[#1F1305] p-5 shadow-[3px_3px_0px_#1F1305] transition-all ${
                      esRaiz
                        ? "bg-[#1F1305] text-[#EDE0D0]"
                        : "bg-white text-[#1F1305] ml-4 sm:ml-8"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-current/20 pb-3 font-mono text-xs">
                      <div className="flex items-center gap-2">
                        <span
                          className={`border px-2 py-0.5 font-black ${
                            esRaiz
                              ? "bg-[#E80000] text-white border-white"
                              : "bg-[#EDE0D0] text-[#1F1305] border-[#1F1305]"
                          }`}
                        >
                          {esRaiz ? "GRABACIÓN ORIGINAL (MATRIZ)" : `VERSIÓN #${idx}`}
                        </span>
                        {nodo.camelot_code && (
                          <span
                            className={`border px-1.5 py-0.5 font-bold ${
                              esRaiz
                                ? "bg-white/10 text-[#F8C800] border-white/30"
                                : "bg-[#1F1305] text-[#F8C800] border-[#1F1305]"
                            }`}
                          >
                            {nodo.camelot_code}
                          </span>
                        )}
                        {nodo.bpm && (
                          <span className="font-bold">⚡ {nodo.bpm} BPM</span>
                        )}
                      </div>

                      {nodo.duracion_segundos && (
                        <span>
                          ⏱ {Math.floor(nodo.duracion_segundos / 60)}:
                          {String(nodo.duracion_segundos % 60).padStart(2, "0")}
                        </span>
                      )}
                    </div>

                    <div className="pt-3 space-y-2">
                      <h3 className="font-cooper text-xl font-black">
                        {nodo.titulo_tema}
                      </h3>

                      <div className="flex flex-wrap gap-4 font-mono text-xs">
                        <div>
                          <span className="opacity-70">Intérprete(s): </span>
                          <strong>
                            {nodo.grupos.map((g) => g.nombre_grupo).join(", ") || "—"}
                          </strong>
                        </div>
                        <div>
                          <span className="opacity-70">Compositor: </span>
                          <strong>
                            {nodo.compositores.map((c) => c.nombre).join(", ") || "—"}
                          </strong>
                        </div>
                      </div>

                      {nodo.prensajes.length > 0 && (
                        <div className="pt-2 border-t border-current/10 font-mono text-xs">
                          <span className="opacity-70">Prensaje en Vinilo: </span>
                          {nodo.prensajes.map((pr) => (
                            <Link
                              key={pr.id_album}
                              href={`/album/${pr.id_album}`}
                              className="font-bold underline hover:opacity-80 inline-flex items-center gap-1 ml-1"
                            >
                              <Disc className="h-3 w-3" />
                              <span>
                                {pr.nombre_album || "Álbum"} ({pr.año_publicacion || "S/A"}) · {pr.sello} [{pr.lado}-{pr.pista}]
                              </span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : !loading ? (
          <div className="border border-[#1F1305] bg-[#EDE0D0]/20 p-8 text-center font-mono text-xs text-[#5A5245] space-y-2">
            <p>
              El tema <strong>«{temaSeleccionado.titulo}»</strong> está catalogado como matriz sonora.
            </p>
            <p className="text-[11px]">
              Las relaciones de versiones secundarias están en proceso de verificación fonográfica conforme se completan los ingresos de discografías.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
