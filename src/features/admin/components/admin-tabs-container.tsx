"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import {
  AdminMediaManager,
  type AdminAlbumItem,
  type AdminGroupItem,
  type AdminPersonItem,
  type AdminLabelItem,
} from "./admin-media-manager";
import { AdminDashboardResumen } from "./admin-dashboard-resumen";
import { AdminMesaRedaccion } from "./admin-mesa-redaccion";
import { AdminHomeConfig } from "./admin-home-config";
import {
  BarChart3,
  Archive,
  FileText,
  Sliders,
} from "lucide-react";
import type { Articulo, ConfiguracionHome } from "@/types/blog";

interface AdminTabsContainerProps {
  initialAlbums: AdminAlbumItem[];
  initialGroups: AdminGroupItem[];
  initialPersons: AdminPersonItem[];
  initialLabels: AdminLabelItem[];
  initialArticles: Articulo[];
  initialHomeConfig: ConfiguracionHome;
}

export type MainTab = "resumen" | "archivo" | "redaccion" | "portada";

export function AdminTabsContainer({
  initialAlbums,
  initialGroups,
  initialPersons,
  initialLabels,
  initialArticles,
  initialHomeConfig,
}: AdminTabsContainerProps) {
  const [activeTab, setActiveTab] = useState<MainTab>("resumen");

  return (
    <div className="space-y-8 font-mono">
      {/* ============================================================ */}
      {/* BARRA DE NAVEGACIÓN EN 4 PESTAÑAS CANÓNICAS                  */}
      {/* ============================================================ */}
      <div className="border-2 border-[#1F1305] bg-[#EDE0D0] p-2 flex flex-wrap items-center justify-between gap-2 shadow-[4px_4px_0px_#1F1305]">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {/* Pestaña 1: RESUMEN */}
          <button
            type="button"
            onClick={() => setActiveTab("resumen")}
            className={`flex items-center gap-2 border-2 border-[#1F1305] px-3.5 sm:px-4 py-2 font-mono text-xs font-black transition-all ${
              activeTab === "resumen"
                ? "bg-[#1F1305] text-[#EDE0D0] shadow-[3px_3px_0px_#E80000] -translate-y-0.5"
                : "bg-white text-[#1F1305] hover:bg-[#EDE0D0]"
            }`}
          >
            <BarChart3 className="h-4 w-4 text-[#F8C800]" />
            <span>01 · RESUMEN</span>
          </button>

          {/* Pestaña 2: ARCHIVO */}
          <button
            type="button"
            onClick={() => setActiveTab("archivo")}
            className={`flex items-center gap-2 border-2 border-[#1F1305] px-3.5 sm:px-4 py-2 font-mono text-xs font-black transition-all ${
              activeTab === "archivo"
                ? "bg-[#1F1305] text-[#EDE0D0] shadow-[3px_3px_0px_#E80000] -translate-y-0.5"
                : "bg-white text-[#1F1305] hover:bg-[#EDE0D0]"
            }`}
          >
            <Archive className="h-4 w-4 text-[#F1730C]" />
            <span>02 · ARCHIVO</span>
          </button>

          {/* Pestaña 3: REDACCIÓN */}
          <button
            type="button"
            onClick={() => setActiveTab("redaccion")}
            className={`flex items-center gap-2 border-2 border-[#1F1305] px-3.5 sm:px-4 py-2 font-mono text-xs font-black transition-all ${
              activeTab === "redaccion"
                ? "bg-[#1F1305] text-[#EDE0D0] shadow-[3px_3px_0px_#E80000] -translate-y-0.5"
                : "bg-white text-[#1F1305] hover:bg-[#EDE0D0]"
            }`}
          >
            <FileText className="h-4 w-4 text-[#E80000]" />
            <span>03 · REDACCIÓN</span>
            {initialArticles.length > 0 && (
              <span className="border border-current px-1.5 py-0.2 text-[10px] bg-[#E80000] text-white">
                {initialArticles.length}
              </span>
            )}
          </button>

          {/* Pestaña 4: PORTADA */}
          <button
            type="button"
            onClick={() => setActiveTab("portada")}
            className={`flex items-center gap-2 border-2 border-[#1F1305] px-3.5 sm:px-4 py-2 font-mono text-xs font-black transition-all ${
              activeTab === "portada"
                ? "bg-[#1F1305] text-[#EDE0D0] shadow-[3px_3px_0px_#E80000] -translate-y-0.5"
                : "bg-white text-[#1F1305] hover:bg-[#EDE0D0]"
            }`}
          >
            <Sliders className="h-4 w-4 text-[#10B981]" />
            <span>04 · PORTADA</span>
          </button>
        </div>

        <div className="px-3 py-1 font-mono text-[11px] text-[#5A5245] font-bold hidden md:block">
          MODO CMS ACTIVO // 4 MÓDULOS
        </div>
      </div>

      {/* ============================================================ */}
      {/* RENDERIZADO DEL MÓDULO ACTIVO                                */}
      {/* ============================================================ */}
      {activeTab === "resumen" && (
        <AdminDashboardResumen
          albums={initialAlbums}
          groups={initialGroups}
          persons={initialPersons}
          labels={initialLabels}
          articles={initialArticles}
          onNavigateTab={(tab) => setActiveTab(tab)}
        />
      )}

      {activeTab === "archivo" && (
        <AdminMediaManager
          initialAlbums={initialAlbums}
          initialGroups={initialGroups}
          initialPersons={initialPersons}
          initialLabels={initialLabels}
        />
      )}

      {activeTab === "redaccion" && (
        <AdminMesaRedaccion
          groups={initialGroups}
          persons={initialPersons}
          articles={initialArticles}
        />
      )}

      {activeTab === "portada" && (
        <AdminHomeConfig
          initialConfig={initialHomeConfig}
          allAlbums={initialAlbums}
        />
      )}
    </div>
  );
}
