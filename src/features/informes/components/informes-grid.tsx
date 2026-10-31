"use client";

import { useState, useMemo } from "react";
import { Search, Filter, FileText, ArrowUpDown } from "lucide-react";
import type { PersonaResumen } from "../types";
import { InformeCard } from "./informe-card";

interface InformesGridProps {
  personas: PersonaResumen[];
}

export function InformesGrid({ personas }: InformesGridProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroVerificacion, setFiltroVerificacion] = useState<string>("TODOS");
  const [orden, setOrden] = useState<"id" | "nombre">("id");

  const personasFiltradas = useMemo(() => {
    return personas.filter((p) => {
      // Búsqueda por texto
      const matchText =
        searchTerm === "" ||
        p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.apodo && p.apodo.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (p.lugar_nacimiento && p.lugar_nacimiento.toLowerCase().includes(searchTerm.toLowerCase()));

      if (!matchText) return false;

      // Filtro de verificación
      if (filtroVerificacion === "TODOS") return true;

      const tieneBio = Boolean(p.biografia && p.biografia.length > 30);
      const tieneFoto = Boolean(p.url_foto);

      if (filtroVerificacion === "PRIMARIA") {
        return tieneBio && tieneFoto;
      }
      if (filtroVerificacion === "SECUNDARIA") {
        return tieneBio && !tieneFoto;
      }
      if (filtroVerificacion === "SIN_VERIFICAR") {
        return !tieneBio;
      }

      return true;
    }).sort((a, b) => {
      if (orden === "nombre") {
        return a.nombre.localeCompare(b.nombre);
      }
      return a.id_persona - b.id_persona;
    });
  }, [personas, searchTerm, filtroVerificacion, orden]);

  return (
    <div className="space-y-8">
      {/* Barra de Filtros y Búsqueda Brutalista */}
      <div className="border-2 border-[#1F1305] bg-white p-4 sm:p-6 shadow-[4px_4px_0px_#1F1305] space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
          {/* Input de Búsqueda */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1F1305]/60" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nombre, seudónimo o lugar de origen (ej. 'Casahuamán', 'Chacalón')..."
              className="w-full border-2 border-[#1F1305] bg-[#EDE0D0]/30 pl-10 pr-4 py-2 font-mono text-xs text-[#1F1305] placeholder-[#1F1305]/50 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#E80000]"
            />
          </div>

          {/* Ordenador */}
          <div className="flex items-center gap-2 font-mono text-xs shrink-0">
            <span className="font-bold text-[#1F1305]/70 flex items-center gap-1">
              <ArrowUpDown className="h-3.5 w-3.5" /> Orden:
            </span>
            <button
              type="button"
              onClick={() => setOrden(orden === "id" ? "nombre" : "id")}
              className="border-2 border-[#1F1305] bg-[#EDE0D0] px-3 py-2 font-black text-[#1F1305] hover:bg-[#1F1305] hover:text-white transition-colors"
            >
              {orden === "id" ? "Código (INF-0001)" : "Alfabético (A-Z)"}
            </button>
          </div>
        </div>

        {/* Pestañas de Filtro de Verificación */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#1F1305]/20 font-mono text-xs">
          <span className="font-bold text-[#1F1305]/70 mr-1 flex items-center gap-1">
            <Filter className="h-3.5 w-3.5" /> Nivel de Verificación:
          </span>

          {[
            { id: "TODOS", label: "TODOS LOS EXPEDIENTES" },
            { id: "PRIMARIA", label: "[FUENTE PRIMARIA]" },
            { id: "SECUNDARIA", label: "[FUENTE SECUNDARIA]" },
            { id: "SIN_VERIFICAR", label: "[SIN VERIFICAR]" },
          ].map((tab) => {
            const activo = filtroVerificacion === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFiltroVerificacion(tab.id)}
                className={`border-2 border-[#1F1305] px-3 py-1 font-black transition-all ${
                  activo
                    ? "bg-[#1F1305] text-[#EDE0D0] shadow-[2px_2px_0px_#E80000]"
                    : "bg-white text-[#1F1305] hover:bg-[#EDE0D0]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Contador de Expedientes */}
      <div className="flex items-center justify-between border-b-2 border-[#1F1305] pb-2 font-mono text-xs">
        <span className="font-bold text-[#1F1305]">
          EXPEDIENTES ACTIVOS: <strong className="text-[#E80000]">{personasFiltradas.length}</strong> de {personas.length}
        </span>
        <span className="text-[#5A5245]">
          ARCHIVO GENERAL DE PERITAJES FONOGRÁFICOS · KUMBIA SOUND
        </span>
      </div>

      {/* Grid de Expedientes */}
      {personasFiltradas.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {personasFiltradas.map((persona) => (
            <InformeCard key={persona.id_persona} persona={persona} />
          ))}
        </div>
      ) : (
        <div className="border-2 border-dashed border-[#1F1305] bg-white p-12 text-center space-y-4">
          <FileText className="h-10 w-10 text-[#E80000] mx-auto" />
          <h3 className="font-cooper text-xl font-black text-[#1F1305]">
            Sin expedientes coincidentes
          </h3>
          <p className="font-sans text-xs text-[#5A5245] max-w-md mx-auto">
            No se hallaron registros periciales que coincidan con los filtros aplicados.
            Verifica el término de búsqueda o selecciona otro nivel de verificación.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchTerm("");
              setFiltroVerificacion("TODOS");
            }}
            className="border-2 border-[#1F1305] bg-[#1F1305] px-4 py-2 font-mono text-xs font-bold text-white shadow-[2px_2px_0px_#E80000]"
          >
            Restablecer Filtros
          </button>
        </div>
      )}
    </div>
  );
}
