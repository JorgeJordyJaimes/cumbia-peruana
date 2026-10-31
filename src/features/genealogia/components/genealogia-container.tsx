"use client";

import { useState } from "react";
import { Building2, GitFork, Users } from "lucide-react";
import type { ArbolGenealogicoResult } from "@/types/database";
import { TabAgrupaciones, type GrupoItem } from "./tab-agrupaciones";
import { TabVersiones } from "./tab-versiones";
import { TabRedMusicos } from "./tab-red-musicos";

interface PioneroOpt {
  id_persona: number;
  nombre: string;
  apodo?: string | null;
}

interface GenealogiaContainerProps {
  grupos: GrupoItem[];
  pioneros: PioneroOpt[];
  initialMusicoId?: number;
  initialArbolData?: ArbolGenealogicoResult | null;
}

type TabId = "agrupaciones" | "versiones" | "red";

export function GenealogiaContainer({
  grupos,
  pioneros,
  initialMusicoId,
  initialArbolData,
}: GenealogiaContainerProps) {
  const [activeTab, setActiveTab] = useState<TabId>("agrupaciones");

  const tabs = [
    {
      id: "agrupaciones" as TabId,
      numero: "01",
      codigo: "AGR-000",
      label: "AGRUPACIONES",
      subtitulo: "Historia, Directores & Etapas",
      icon: Building2,
    },
    {
      id: "versiones" as TabId,
      numero: "02",
      codigo: "VER-000",
      label: "VERSIONES",
      subtitulo: "Árbol de Covers & Re-grabaciones",
      icon: GitFork,
    },
    {
      id: "red" as TabId,
      numero: "03",
      codigo: "SES-000",
      label: "RED DE MÚSICOS",
      subtitulo: "Sesionistas & Cruces entre Orquestas",
      icon: Users,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Pestañas de Carpetas Periciales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`border-2 border-[#1F1305] p-4 text-left transition-all cursor-pointer ${
                isActive
                  ? "bg-[#1F1305] text-[#EDE0D0] shadow-[4px_4px_0px_#E80000] -translate-y-1"
                  : "bg-white text-[#1F1305] shadow-[3px_3px_0px_#1F1305] hover:bg-[#EDE0D0]"
              }`}
            >
              <div className="flex items-center justify-between border-b border-current/20 pb-2 mb-2">
                <span
                  className={`border px-1.5 py-0.2 font-black ${
                    isActive ? "bg-[#E80000] text-white border-white" : "bg-[#EDE0D0] text-[#1F1305] border-[#1F1305]"
                  }`}
                >
                  CARPETA {tab.numero}
                </span>
                <span className="opacity-70 text-[10px]">{tab.codigo}</span>
              </div>

              <div className="flex items-center gap-2">
                <Icon className={`h-4 w-4 ${isActive ? "text-[#F8C800]" : "text-[#E80000]"}`} />
                <span className="font-cooper text-base font-black">{tab.label}</span>
              </div>

              <p className="mt-1 font-sans text-[11px] opacity-80">
                {tab.subtitulo}
              </p>
            </button>
          );
        })}
      </div>

      {/* Contenido de la Carpeta Activa */}
      {activeTab === "agrupaciones" && <TabAgrupaciones grupos={grupos} />}
      {activeTab === "versiones" && <TabVersiones />}
      {activeTab === "red" && (
        <TabRedMusicos
          pioneros={pioneros}
          initialMusicoId={initialMusicoId}
          initialArbolData={initialArbolData}
        />
      )}
    </div>
  );
}
