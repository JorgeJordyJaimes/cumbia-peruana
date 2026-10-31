"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Users, Guitar, Building2, Disc, ArrowRight, FileText, Loader2, GitFork } from "lucide-react";
import { getArbolGenealogicoClient } from "../services/genealogia-service";
import type { ArbolGenealogicoResult } from "@/types/database";

interface PioneroOpt {
  id_persona: number;
  nombre: string;
  apodo?: string | null;
}

interface TabRedMusicosProps {
  pioneros: PioneroOpt[];
  initialMusicoId?: number;
  initialArbolData?: ArbolGenealogicoResult | null;
}

export function TabRedMusicos({
  pioneros,
  initialMusicoId = 1,
  initialArbolData = null,
}: TabRedMusicosProps) {
  const [selectedId, setSelectedId] = useState<number>(initialMusicoId);
  const [arbolData, setArbolData] = useState<ArbolGenealogicoResult | null>(initialArbolData);
  const [loading, setLoading] = useState<boolean>(!initialArbolData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialArbolData && initialMusicoId === selectedId) {
      return;
    }

    let isMounted = true;
    setLoading(true);
    setError(null);

    getArbolGenealogicoClient(selectedId)
      .then((res) => {
        if (!isMounted) return;
        if (!res || !res.persona) {
          setError("No se encontraron registros de red para este músico.");
        } else {
          setArbolData(res);
        }
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err instanceof Error ? err.message : "Error al consultar la red relacional.");
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
      {/* Selector de Sesionistas */}
      <div className="border-2 border-[#1F1305] bg-white p-5 shadow-[4px_4px_0px_#1F1305] space-y-3">
        <div className="flex items-center justify-between font-mono text-xs border-b border-[#1F1305]/20 pb-2">
          <span className="font-black text-[#E80000] flex items-center gap-1.5 uppercase">
            <GitFork className="h-4 w-4" /> Inspeccionar Cruces & Red de Sesión:
          </span>
          <span className="text-[#5A5245]">{pioneros.length} músicos de sesión</span>
        </div>

        <div className="flex flex-wrap gap-2 font-mono text-xs">
          {pioneros.map((m) => {
            const isSelected = m.id_persona === selectedId;
            return (
              <button
                key={m.id_persona}
                type="button"
                onClick={() => setSelectedId(m.id_persona)}
                className={`border-2 border-[#1F1305] px-3.5 py-1.5 font-bold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#1F1305] text-[#EDE0D0] shadow-[2px_2px_0px_#E80000]"
                    : "bg-white text-[#1F1305] hover:bg-[#EDE0D0]"
                }`}
              >
                <Guitar className="h-3 w-3 inline mr-1 text-[#F1730C]" />
                {m.nombre} {m.apodo ? `«${m.apodo}»` : ""}
              </button>
            );
          })}
        </div>
      </div>

      {/* Estado de Carga */}
      {loading && (
        <div className="border-2 border-[#1F1305] bg-white p-12 text-center space-y-3 shadow-[4px_4px_0px_#1F1305]">
          <Loader2 className="h-8 w-8 animate-spin text-[#E80000] mx-auto" />
          <p className="font-mono text-xs font-bold text-[#1F1305]">
            Mapeando conexiones relacionales en PostgreSQL (RPC get_arbol_genealogico)...
          </p>
        </div>
      )}

      {/* Visualización de la Red del Músico */}
      {!loading && persona && arbolData && (
        <div className="border-2 border-[#1F1305] bg-white p-6 sm:p-10 shadow-[6px_6px_0px_#1F1305] space-y-8">
          {/* Nodo Central: El Músico */}
          <div className="border-2 border-[#1F1305] bg-[#EDE0D0]/50 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="border border-[#1F1305] bg-[#1F1305] text-[#EDE0D0] px-2 py-0.5 font-black">
                  NODO CENTRAL · MÚSICO
                </span>
                <span className="font-bold text-[#5A5245]">ID #{persona.id_persona}</span>
              </div>
              <h2 className="font-cooper text-2xl sm:text-4xl font-black text-[#1F1305]">
                {persona.nombre} {persona.apodo ? `«${persona.apodo}»` : ""}
              </h2>
              <p className="font-mono text-xs text-[#5A5245]">
                Conectado con {arbolData.agrupaciones.length} agrupaciones y {arbolData.grabaciones_sesion.length} fonogramas de sesión.
              </p>
            </div>

            {/* BOTÓN OBLIGATORIO: Enlace a su INFORME personal */}
            <Link
              href={`/informes/${persona.id_persona}`}
              className="border-2 border-[#1F1305] bg-[#E80000] text-white px-4 py-2 font-mono text-xs font-black shadow-[3px_3px_0px_#1F1305] hover:bg-[#1F1305] transition-colors shrink-0 flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              <span>Abrir Informe Completo (INF-{String(persona.id_persona).padStart(4, "0")}) →</span>
            </Link>
          </div>

          {/* Grilla de Agrupaciones y Conexiones */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#1F1305]/20 pb-2 font-mono text-xs">
              <span className="font-black text-[#1F1305] uppercase flex items-center gap-1.5">
                <Building2 className="h-4 w-4 text-[#E80000]" /> Agrupaciones Donde Tocó o Dirigió:
              </span>
              <span className="text-[#5A5245]">{arbolData.agrupaciones.length} vínculos relacionales</span>
            </div>

            {arbolData.agrupaciones.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {arbolData.agrupaciones.map((agrup) => (
                  <div
                    key={agrup.id_grupo}
                    className="border-2 border-[#1F1305] bg-white p-4 shadow-[3px_3px_0px_#1F1305] space-y-2"
                  >
                    <div className="flex items-center justify-between font-mono text-[11px]">
                      <span className="border border-[#1F1305] bg-[#EDE0D0] px-2 py-0.5 font-bold">
                        AGR-{String(agrup.id_grupo).padStart(3, "0")}
                      </span>
                      <span className="font-bold text-[#E80000]">{agrup.rol}</span>
                    </div>

                    <h3 className="font-cooper text-lg font-black text-[#1F1305]">
                      {agrup.nombre_grupo}
                    </h3>

                    {agrup.region && (
                      <p className="font-mono text-xs text-[#5A5245]">
                        📍 {agrup.region}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="border border-[#1F1305] bg-white p-6 font-mono text-xs text-[#5A5245]">
                No tiene agrupaciones como integrante fijo en la base de datos (participaciones principalmente como sesionista en estudios).
              </div>
            )}
          </div>

          {/* Fonogramas de Sesión Cruzados */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#1F1305]/20 pb-2 font-mono text-xs">
              <span className="font-black text-[#1F1305] uppercase flex items-center gap-1.5">
                <Disc className="h-4 w-4 text-[#E80000]" /> Fonogramas de Sesión (Estudio de Grabación):
              </span>
              <span className="text-[#5A5245]">{arbolData.grabaciones_sesion.length} pistas grabadas</span>
            </div>

            {arbolData.grabaciones_sesion.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {arbolData.grabaciones_sesion.slice(0, 9).map((sesion) => (
                  <div
                    key={sesion.id_tema}
                    className="border-2 border-[#1F1305] bg-white p-3 shadow-[2px_2px_0px_#1F1305] space-y-1.5"
                  >
                    <div className="flex items-center justify-between font-mono text-[10px]">
                      <span className="border border-[#1F1305] bg-[#EDE0D0] px-1.5 py-0.5 font-bold">
                        {sesion.instrumento || sesion.rol}
                      </span>
                      <span className="text-[#5A5245] font-bold">
                        {sesion.grupos.join(", ") || "Sesión"}
                      </span>
                    </div>

                    <h4 className="font-cooper text-base font-black text-[#1F1305]">
                      {sesion.titulo_tema}
                    </h4>

                    {sesion.prensajes.length > 0 && (
                      <Link
                        href={`/album/${sesion.prensajes[0].id_album}`}
                        className="font-mono text-[11px] text-[#E80000] hover:underline flex items-center gap-1"
                      >
                        <Disc className="h-3 w-3" />
                        <span>Vinilo: {sesion.prensajes[0].nombre_album} ({sesion.prensajes[0].año_publicacion})</span>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
