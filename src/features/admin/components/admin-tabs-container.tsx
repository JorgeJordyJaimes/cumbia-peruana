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
import { AdminBlogManager } from "./admin-blog-manager";
import { AdminHomeConfig } from "./admin-home-config";
import {
  Images,
  BookOpen,
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

type MainTab = "catalogo" | "blog" | "home";

export function AdminTabsContainer({
  initialAlbums,
  initialGroups,
  initialPersons,
  initialLabels,
  initialArticles,
  initialHomeConfig,
}: AdminTabsContainerProps) {
  const [activeTab, setActiveTab] = useState<MainTab>("catalogo");

  return (
    <div className="space-y-8">
      {/* Barra de Navegación por Pestañas Principales */}
      <GlassCard className="p-2 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("catalogo")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 font-mono text-xs font-semibold transition-all ${
              activeTab === "catalogo"
                ? "bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20"
                : "text-neutral-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Images className="h-4 w-4" />
            <span>Catálogo & Fotos</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("blog")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 font-mono text-xs font-semibold transition-all ${
              activeTab === "blog"
                ? "bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20"
                : "text-neutral-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span>Blog & Crónicas</span>
            {initialArticles.length > 0 && (
              <span
                className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                  activeTab === "blog"
                    ? "bg-neutral-950/30 text-neutral-950"
                    : "bg-white/10 text-neutral-300"
                }`}
              >
                {initialArticles.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("home")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 font-mono text-xs font-semibold transition-all ${
              activeTab === "home"
                ? "bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20"
                : "text-neutral-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Sliders className="h-4 w-4" />
            <span>Personalizar Inicio</span>
          </button>
        </div>

        <div className="px-3 py-1 font-mono text-[11px] text-neutral-500 hidden sm:block">
          Modo CMS Activo
        </div>
      </GlassCard>

      {/* Renderizado de la pestaña activa */}
      {activeTab === "catalogo" && (
        <AdminMediaManager
          initialAlbums={initialAlbums}
          initialGroups={initialGroups}
          initialPersons={initialPersons}
          initialLabels={initialLabels}
        />
      )}

      {activeTab === "blog" && (
        <AdminBlogManager initialArticles={initialArticles} />
      )}

      {activeTab === "home" && (
        <AdminHomeConfig
          initialConfig={initialHomeConfig}
          allAlbums={initialAlbums}
        />
      )}
    </div>
  );
}
