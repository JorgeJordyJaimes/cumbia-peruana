"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { BadgeDJ } from "@/components/ui/badge-dj";
import { ChevronDown, ChevronUp, Layers, GitFork } from "lucide-react";

// Lazy-load dinámico del modal de versiones genealógicas
const VersionesExplorerModal = dynamic(
  () => import("@/features/genealogia").then((m) => m.VersionesExplorerModal),
  { ssr: false }
);

export interface MosaicoSubtema {
  id_mosaico_tema: number;
  orden_segmento: number;
  duracion_segmento_segundos: number | null;
  titulo_tema: string;
  compositor: string | null;
}

export interface AlbumTrackItem {
  id_album_tema: number;
  id_tema: number;
  numero_pista: number | null;
  lado: string | null;
  es_mosaico: boolean;
  titulo: string;
  duracion: number | null;
  bpm: number | null;
  camelot: string | null;
  compositor: string;
  autorReal: string;
  creditoGalleta: string | null;
  vocalista: string | null;
  generos: string | null;
  artista: string | null;
  mosaicoSegmentos?: MosaicoSubtema[];
}

interface AlbumTracklistTableProps {
  pistas: AlbumTrackItem[];
  artistName: string;
}

export function AlbumTracklistTable({ pistas, artistName }: AlbumTracklistTableProps) {
  const [expandedMosaicos, setExpandedMosaicos] = useState<Record<number, boolean>>({});
  const [selectedTemaId, setSelectedTemaId] = useState<number | null>(null);
  const [selectedTemaTitulo, setSelectedTemaTitulo] = useState<string>("");

  const toggleMosaico = (idAlbumTema: number) => {
    setExpandedMosaicos((prev) => ({
      ...prev,
      [idAlbumTema]: !prev[idAlbumTema],
    }));
  };

  if (!pistas || pistas.length === 0) {
    return (
      <p className="font-sans text-xs text-[#5A5245] italic py-4">
        No hay pistas registradas para este álbum en el catálogo.
      </p>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full border-2 border-[#1F1305] text-left font-mono text-xs">
          <thead className="bg-[#1F1305] text-white">
            <tr>
              <th className="p-2.5 whitespace-nowrap">Lado</th>
              <th className="p-2.5">Título / Géneros</th>
              <th className="p-2.5">Voz</th>
              <th className="p-2.5">Compositor</th>
              <th className="p-2.5 text-center">BPM / Camelot</th>
              <th className="p-2.5 text-right w-24">Duración</th>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-[#EDE0D0] bg-white">
            {pistas.map((pista) => {
              const isMosaico = pista.es_mosaico;
              const hasSegmentos = isMosaico && (pista.mosaicoSegmentos?.length ?? 0) > 0;
              const isExpanded = !!expandedMosaicos[pista.id_album_tema];

              return (
                <tr key={pista.id_album_tema} className="group">
                  <td colSpan={6} className="p-0">
                    <div className="w-full">
                      {/* Fila Principal de la Pista */}
                      <div className="grid grid-cols-12 items-center hover:bg-[#FAF5EE] transition-colors p-2.5">
                        {/* Lado / Pista */}
                        <div className="col-span-1 font-bold whitespace-nowrap">
                          <span className="inline-block border border-[#1F1305] bg-[#EDE0D0] px-2 py-0.5 text-[11px] font-mono shadow-[1px_1px_0px_#1F1305]">
                            {pista.lado
                              ? `Lado ${pista.lado}${pista.numero_pista ?? ""}`
                              : `Pista ${pista.numero_pista ?? "-"}`}
                          </span>
                        </div>

                        {/* Título de la Canción / Mosaico interactivo */}
                        <div className="col-span-4 pr-2">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {isMosaico ? (
                              <button
                                type="button"
                                onClick={() => toggleMosaico(pista.id_album_tema)}
                                className="font-bold text-[#1F1305] text-sm hover:text-[#E80000] transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                                title="Haz clic para ver u ocultar las canciones que componen este mosaico"
                              >
                                <span>{pista.titulo}</span>
                                {isExpanded ? (
                                  <ChevronUp className="h-4 w-4 text-[#E80000] shrink-0" />
                                ) : (
                                  <ChevronDown className="h-4 w-4 text-[#E80000] shrink-0" />
                                )}
                              </button>
                            ) : (
                              <span className="font-bold text-[#1F1305] text-sm">
                                {pista.titulo}
                              </span>
                            )}

                            {isMosaico && (
                              <button
                                type="button"
                                onClick={() => toggleMosaico(pista.id_album_tema)}
                                className="border border-[#1F1305] bg-[#F8C800] px-1.5 py-0.2 text-[11px] font-black text-[#1F1305] shadow-[1px_1px_0px_#1F1305] hover:bg-[#F1730C] hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1"
                                title="Desplegar cortes del popurrí"
                              >
                                <span>MOSAICO</span>
                                {hasSegmentos && (
                                  <span className="text-[11px] bg-[#1F1305] text-white px-1 rounded-sm">
                                    {pista.mosaicoSegmentos?.length}
                                  </span>
                                )}
                              </button>
                            )}

                            {/* Botón de Genealogía de Versiones */}
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedTemaId(pista.id_tema);
                                setSelectedTemaTitulo(pista.titulo);
                              }}
                              title="Explorar árbol genealógico de versiones y covers"
                              className="inline-flex items-center gap-0.5 border border-[#1F1305] bg-white px-1.5 py-0.5 text-[11px] font-mono font-bold text-[#746B5C] hover:text-[#E80000] hover:border-[#E80000] transition-colors cursor-pointer"
                            >
                              <GitFork className="h-2.5 w-2.5 text-[#E80000]" />
                              <span>Versiones</span>
                            </button>
                          </div>

                          {pista.artista && pista.artista !== artistName && (
                            <div className="text-[11px] text-[#E80000] font-bold mt-0.5">
                              {pista.artista}
                            </div>
                          )}

                          {pista.generos && (
                            <div className="text-[11px] text-[#746B5C] font-mono mt-0.5">
                              {pista.generos}
                            </div>
                          )}
                        </div>

                        {/* Vocalista */}
                        <div className="col-span-2">
                          {pista.vocalista === "Instrumental" ? (
                            <span className="inline-block font-mono text-[11px] font-bold text-[#746B5C] bg-[#EDE0D0] px-2 py-0.5 border border-[#1F1305]">
                              Instrumental
                            </span>
                          ) : pista.vocalista ? (
                            <span className="font-bold text-[#1F1305] text-xs">
                              {pista.vocalista}
                            </span>
                          ) : (
                            <span className="text-[#746B5C] font-mono text-[11px]">
                              Pendiente
                            </span>
                          )}
                        </div>

                        {/* Compositor y Crédito en Galleta */}
                        <div className="col-span-2">
                          <div className="font-bold text-[#1F1305] text-xs">
                            {pista.autorReal}
                          </div>
                          {pista.creditoGalleta && (
                            <div className="text-[11px] text-[#746B5C] font-mono italic mt-0.5">
                              En galleta: &ldquo;{pista.creditoGalleta}&rdquo;
                            </div>
                          )}
                        </div>

                        {/* BPM / Camelot */}
                        <div className="col-span-2 text-center">
                          {pista.bpm || pista.camelot ? (
                            <BadgeDJ bpm={pista.bpm} camelot={pista.camelot} />
                          ) : (
                            <span className="text-[#746B5C] font-mono text-[11px]">--</span>
                          )}
                        </div>

                        {/* Duración */}
                        <div className="col-span-1 text-right font-bold text-[#5A5245] pr-1">
                          {pista.duracion
                            ? `${Math.floor(pista.duracion / 60)}:${(pista.duracion % 60).toString().padStart(2, "0")}`
                            : "-"}
                        </div>
                      </div>

                      {/* Desglose Expandible de Mosaicos */}
                      {isMosaico && isExpanded && (
                        <div className="bg-[#FAF5EE] border-t-2 border-b-2 border-[#1F1305] p-3 sm:p-5 pl-6 sm:pl-12 transition-all animate-in fade-in duration-200">
                          <div className="border-2 border-[#1F1305] bg-white p-3.5 sm:p-4 shadow-[3px_3px_0px_#1F1305] space-y-3">
                            <div className="flex items-center justify-between border-b-2 border-[#1F1305] pb-2 font-mono">
                              <span className="flex items-center gap-2 font-bold text-xs text-[#1F1305]">
                                <Layers className="h-4 w-4 text-[#F1730C]" />
                                <span>CORTES &amp; TEMAS INTEGRADOS EN EL MOSAICO</span>
                                <span className="bg-[#F8C800] border border-[#1F1305] px-1.5 py-0.2 text-[11px]">
                                  {pista.mosaicoSegmentos?.length || 0} temas
                                </span>
                              </span>
                              <span className="text-[11px] text-[#746B5C] font-bold hidden sm:inline">
                                Desglose de interpretación continua
                              </span>
                            </div>

                            {hasSegmentos ? (
                              <div className="divide-y-2 divide-[#EDE0D0] font-mono">
                                {pista.mosaicoSegmentos!.map((seg) => (
                                  <div
                                    key={seg.id_mosaico_tema}
                                    className="py-2 flex items-center justify-between gap-4 text-xs hover:bg-[#FAF5EE] px-2 transition-colors"
                                  >
                                    <div className="flex items-center gap-3 min-w-0">
                                      <span className="font-mono text-[11px] font-black border border-[#1F1305] bg-[#EDE0D0] px-2 py-0.5 shadow-[1px_1px_0px_#1F1305] shrink-0">
                                        #{seg.orden_segmento}
                                      </span>
                                      <div className="min-w-0">
                                        <span className="font-bold text-[#1F1305] text-sm block truncate">
                                          {seg.titulo_tema}
                                        </span>
                                        {seg.compositor && (
                                          <span className="text-[11px] text-[#5A5245] italic block truncate">
                                            Autor: {seg.compositor}
                                          </span>
                                        )}
                                      </div>
                                    </div>

                                    <div className="text-right shrink-0">
                                      {seg.duracion_segmento_segundos ? (
                                        <span className="font-mono text-xs font-bold text-[#1F1305] border border-[#1F1305] bg-[#EDE0D0] px-2 py-0.5 shadow-[1px_1px_0px_#1F1305]">
                                          {Math.floor(seg.duracion_segmento_segundos / 60)}:
                                          {(seg.duracion_segmento_segundos % 60)
                                            .toString()
                                            .padStart(2, "0")}
                                        </span>
                                      ) : (
                                        <span className="font-mono text-[11px] text-[#746B5C] italic">
                                          Por cronometrar
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-xs text-[#746B5C] italic py-2">
                                Los cortes individuales de este popurrí están en proceso de catalogación en la investigación fonográfica.
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal Árbol Genealógico de Versiones */}
      {selectedTemaId ? (
        <VersionesExplorerModal
          temaId={selectedTemaId}
          tituloTema={selectedTemaTitulo}
          onClose={() => setSelectedTemaId(null)}
        />
      ) : null}
    </>
  );
}
