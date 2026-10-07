"use client";

import { useState, useEffect } from "react";
import { getArbolGenealogicoClient } from "../services/genealogia-service";
import type { ArbolGenealogicoResult } from "@/types/database";
import {
  Users,
  Guitar,
  Disc3,
  Building2,
  Calendar,
  Loader2,
  Music,
  GitFork,
} from "lucide-react";

interface MusicoPioneroOpt {
  id_persona: number;
  nombre: string;
  apodo?: string | null;
}

interface ArbolGenealogicoViewerProps {
  initialMusicos?: MusicoPioneroOpt[];
  initialMusicoId?: number;
  initialArbolData?: ArbolGenealogicoResult | null;
}

export function ArbolGenealogicoViewer({
  initialMusicos = [],
  initialMusicoId,
  initialArbolData = null,
}: ArbolGenealogicoViewerProps) {
  const [selectedId, setSelectedId] = useState<number>(
    initialMusicoId ?? (initialMusicos[0]?.id_persona || 1)
  );
  const [arbolData, setArbolData] = useState<ArbolGenealogicoResult | null>(initialArbolData);
  const [loading, setLoading] = useState<boolean>(!initialArbolData);
  const [error, setError] = useState<string | null>(null);

  const handleSelectMusico = (id: number) => {
    setSelectedId(id);
    setLoading(true);
    setError(null);
  };

  useEffect(() => {
    // Si ya tenemos datos iniciales para el id seleccionado, evitar re-fetch
    if (initialArbolData && initialMusicoId === selectedId) {
      return;
    }

    let isMounted = true;

    getArbolGenealogicoClient(selectedId)
      .then((res) => {
        if (!isMounted) return;
        if (!res || !res.persona) {
          setError("No se encontraron registros genealógicos para este músico.");
        } else {
          setArbolData(res);
        }
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err instanceof Error ? err.message : "Error al consultar el árbol genealógico.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [selectedId, initialArbolData, initialMusicoId]);

  const persona = arbolData?.persona;

  return (
    <div className="space-y-8">
      {/* Selector de Músicos Pioneros */}
      {initialMusicos.length > 0 && (
        <div className="space-y-2">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1F1305] flex items-center gap-2">
            <Users className="h-4 w-4 text-[#E80000]" />
            <span>Pioneros y Directores Indexados en Supabase:</span>
          </span>
          <div className="flex flex-wrap gap-2.5 font-mono text-xs">
            {initialMusicos.map((m) => {
              const isSelected = m.id_persona === selectedId;
              return (
                <button
                  key={m.id_persona}
                  type="button"
                  onClick={() => handleSelectMusico(m.id_persona)}
                  className={`flex items-center gap-2 border-2 border-[#1F1305] px-4 py-2 font-mono text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#1F1305] text-[#EDE0D0] shadow-[3px_3px_0px_#E80000]"
                      : "bg-white text-[#1F1305] shadow-[2px_2px_0px_#1F1305] hover:bg-[#EDE0D0] hover:translate-x-0.5"
                  }`}
                >
                  <Guitar className="h-3.5 w-3.5 text-[#F1730C]" />
                  <span>{m.nombre}</span>
                  {m.apodo && <span className="opacity-70 text-[10px]">({m.apodo})</span>}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Estado de Carga / Error */}
      {loading && (
        <div className="border-2 border-[#1F1305] bg-white p-12 text-center shadow-[4px_4px_0px_#1F1305] space-y-3">
          <Loader2 className="h-8 w-8 animate-spin text-[#E80000] mx-auto" />
          <p className="font-mono text-xs font-bold text-[#1F1305]">
            Resolviendo grafo genealógico en PostgreSQL (RPC)...
          </p>
        </div>
      )}

      {error && !loading && (
        <div className="border-2 border-[#E80000] bg-white p-6 font-mono text-xs text-[#E80000] shadow-[4px_4px_0px_#E80000]">
          {error}
        </div>
      )}

      {/* Ficha Genealógica del Músico */}
      {!loading && persona && arbolData && (
        <div className="border-2 border-[#1F1305] bg-white p-6 sm:p-10 shadow-[6px_6px_0px_#1F1305] space-y-8">
          {/* Encabezado del Músico */}
          <div className="flex flex-col lg:flex-row items-start justify-between gap-6 border-b-2 border-[#1F1305] pb-8">
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                {persona.apodo && (
                  <span className="border border-[#1F1305] bg-[#F1730C] px-3 py-0.5 font-bold text-white shadow-[2px_2px_0px_#1F1305]">
                    &ldquo;{persona.apodo}&rdquo;
                  </span>
                )}
                <span className="border border-[#1F1305] bg-white px-2 py-0.5 font-bold text-[#1F1305] shadow-[1px_1px_0px_#1F1305]">
                  ID #{persona.id_persona}
                </span>
                {persona.lugar_nacimiento && (
                  <span className="text-[#5A5245] font-bold">
                    📍 {persona.lugar_nacimiento}
                  </span>
                )}
              </div>

              <h2 className="font-cooper text-3xl sm:text-5xl font-black text-[#1F1305]">
                {persona.nombre}
              </h2>

              {persona.biografia && (
                <p className="font-sans text-sm sm:text-base text-[#5A5245] leading-relaxed">
                  {persona.biografia}
                </p>
              )}

              {/* Estadísticas de la Consulta RPC */}
              <div className="pt-2 flex flex-wrap gap-3 font-mono text-xs">
                <span className="border border-[#1F1305] bg-[#EDE0D0] px-2.5 py-1 font-bold text-[#1F1305] shadow-[1px_1px_0px_#1F1305]">
                  {arbolData.agrupaciones.length} Agrupaciones
                </span>
                <span className="border border-[#1F1305] bg-[#EDE0D0] px-2.5 py-1 font-bold text-[#1F1305] shadow-[1px_1px_0px_#1F1305]">
                  {arbolData.composiciones.length} Composiciones Registradas
                </span>
                <span className="border border-[#1F1305] bg-[#EDE0D0] px-2.5 py-1 font-bold text-[#1F1305] shadow-[1px_1px_0px_#1F1305]">
                  {arbolData.grabaciones_sesion.length} Grabaciones de Sesión
                </span>
              </div>
            </div>

            {/* Fotografía o Sello Gráfico */}
            <div className="relative aspect-square w-32 sm:w-44 border-2 border-[#1F1305] bg-[#EDE0D0] shrink-0 shadow-[4px_4px_0px_#1F1305] flex items-center justify-center overflow-hidden">
              {persona.url_foto ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={persona.url_foto}
                  alt={persona.nombre}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-4 text-center">
                  <Guitar className="h-10 w-10 text-[#F1730C] mb-2" />
                  <span className="font-mono text-[10px] font-black uppercase text-[#1F1305]">
                    PIONERO FONOGRÁFICO
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Sección 1: Agrupaciones y Direcciones Musicales */}
          <div className="space-y-4">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#1F1305] flex items-center gap-2 border-b-2 border-[#1F1305]/20 pb-2">
              <Building2 className="h-4 w-4 text-[#E80000]" />
              <span>Bandas, Orquestas y Direcciones Musicales</span>
            </h3>

            {arbolData.agrupaciones.length === 0 ? (
              <p className="font-sans text-xs text-[#5A5245] italic">
                No tiene agrupaciones directas registradas en la base de datos.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {arbolData.agrupaciones.map((agrup, idx) => (
                  <div
                    key={idx}
                    className="border-2 border-[#1F1305] bg-[#FFFDF9] p-4 shadow-[3px_3px_0px_#1F1305] space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`font-mono text-[10px] font-bold px-2 py-0.5 border border-[#1F1305] ${
                          agrup.rol === "Director Musical"
                            ? "bg-[#10B981] text-white"
                            : "bg-[#F8C800] text-[#1F1305]"
                        }`}
                      >
                        {agrup.rol}
                      </span>
                      {agrup.region && (
                        <span className="font-mono text-[10px] text-[#5A5245] font-bold">
                          {agrup.region}
                        </span>
                      )}
                    </div>

                    <h4 className="font-cooper text-lg font-bold text-[#1F1305]">
                      {agrup.nombre_grupo}
                    </h4>

                    {(agrup.desde || agrup.hasta) && (
                      <p className="font-mono text-[11px] text-[#5A5245] flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>
                          {agrup.desde || "?"} — {agrup.hasta || "Presente"}
                        </span>
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sección 2: Composiciones y Obras Propias */}
          <div className="space-y-4">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#1F1305] flex items-center gap-2 border-b-2 border-[#1F1305]/20 pb-2">
              <Music className="h-4 w-4 text-[#F1730C]" />
              <span>Obras Compuestas & Versiones</span>
            </h3>

            {arbolData.composiciones.length === 0 ? (
              <p className="font-sans text-xs text-[#5A5245] italic">
                No figuran obras registradas bajo su autoría.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
                {arbolData.composiciones.map((comp) => (
                  <div
                    key={comp.id_tema}
                    className="border-2 border-[#1F1305] bg-[#EDE0D0] p-3.5 shadow-[2px_2px_0px_#1F1305] space-y-1.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-[#1F1305] text-sm">
                        {comp.titulo_tema}
                      </span>
                      {comp.bpm && (
                        <span className="border border-[#1F1305] bg-white px-1.5 py-0.5 text-[10px] font-bold">
                          {comp.bpm} BPM {comp.camelot_code ? `• ${comp.camelot_code}` : ""}
                        </span>
                      )}
                    </div>

                    {comp.credito_como && (
                      <p className="text-[11px] text-[#E80000] font-bold">
                        Acreditado en vinilo como: &ldquo;{comp.credito_como}&rdquo;
                      </p>
                    )}

                    {comp.interpretes && comp.interpretes.length > 0 && (
                      <p className="text-[11px] text-[#5A5245]">
                        Intérprete original: {comp.interpretes.join(", ")}
                      </p>
                    )}

                    {comp.total_versiones > 0 && (
                      <div className="inline-flex items-center gap-1 text-[10px] font-bold text-[#10B981] bg-white border border-[#1F1305] px-2 py-0.5">
                        <GitFork className="h-3 w-3" />
                        <span>{comp.total_versiones} Versión(es) registradas en archivo</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sección 3: Grabaciones de Sesión (Guitarristas, Bajistas, etc.) */}
          {arbolData.grabaciones_sesion.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#1F1305] flex items-center gap-2 border-b-2 border-[#1F1305]/20 pb-2">
                <Disc3 className="h-4 w-4 text-[#10B981]" />
                <span>Músico de Sesión / Participaciones en Estudio</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
                {arbolData.grabaciones_sesion.map((ses, idx) => (
                  <div
                    key={idx}
                    className="border-2 border-[#1F1305] bg-white p-3.5 shadow-[2px_2px_0px_#1F1305] space-y-1"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-[#1F1305]">{ses.titulo_tema}</span>
                      <span className="border border-[#1F1305] bg-[#EDE0D0] px-1.5 py-0.5 text-[10px] font-bold">
                        {ses.instrumento || ses.rol}
                      </span>
                    </div>

                    {ses.credito_como && (
                      <p className="text-[11px] text-[#E80000] font-bold">
                        Crédito en galleta: &ldquo;{ses.credito_como}&rdquo;
                      </p>
                    )}

                    {ses.prensajes && ses.prensajes.length > 0 && (
                      <p className="text-[10px] text-[#5A5245]">
                        Álbum: {ses.prensajes[0].nombre_album} ({ses.prensajes[0].año_publicacion || "N/D"})
                        {ses.prensajes[0].sello ? ` — ${ses.prensajes[0].sello}` : ""}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
