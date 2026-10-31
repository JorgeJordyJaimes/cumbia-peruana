"use client";

import {
  FileText,
  Users,
  Building2,
  Radio,
  BookOpen,
  Image as ImageIcon,
} from "lucide-react";
import type { AdminAlbumItem, AdminGroupItem, AdminPersonItem, AdminLabelItem } from "./admin-media-manager";
import type { Articulo } from "@/types/blog";

interface AdminDashboardResumenProps {
  albums: AdminAlbumItem[];
  groups: AdminGroupItem[];
  persons: AdminPersonItem[];
  labels: AdminLabelItem[];
  articles: Articulo[];
  onNavigateTab: (tab: "archivo" | "redaccion" | "portada") => void;
}

export function AdminDashboardResumen({
  albums,
  groups,
  persons,
  labels,
  articles,
  onNavigateTab,
}: AdminDashboardResumenProps) {
  // 1. Métricas Fotográficas
  const albumsWithCover = albums.filter((a) => a.coverUrl).length;
  const groupsWithPhoto = groups.filter((g) => g.photoUrl).length;
  const personsWithPhoto = persons.filter((p) => p.photoUrl).length;
  const labelsWithLogo = labels.filter((l) => l.logoUrl).length;

  // 2. Métricas de Redacción
  const publishedArticles = articles.filter((a) => a.publicado).length;
  const draftArticles = articles.length - publishedArticles;


  const groupsCount = groups.length;

  return (
    <div className="space-y-8 font-mono text-xs">
      {/* ============================================================ */}
      {/* 1. SECCIÓN DE BIENVENIDA & ACCESOS RÁPIDOS                   */}
      {/* ============================================================ */}
      <div className="border-2 border-[#1F1305] bg-[#EDE0D0] p-6 shadow-[6px_6px_0px_#1F1305] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="border border-[#1F1305] bg-[#E80000] text-white px-2 py-0.2 font-black uppercase text-[10px]">
              CONSOLA DE MANDO EDITORIAL
            </span>
            <span className="text-[#5A5245] font-bold">KUMBIA SOUND ADMIN</span>
          </div>
          <h2 className="font-cooper text-2xl sm:text-3xl font-black text-[#1F1305]">
            Resumen de Custodia &amp; Estado de Redacción
          </h2>
          <p className="font-sans text-xs text-[#5A5245] max-w-xl">
            Supervisa el avance de la digitalización fotográfica y los textos periciales de las 7 secciones canónicas.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onNavigateTab("redaccion")}
            className="flex items-center gap-2 border-2 border-[#1F1305] bg-[#1F1305] text-[#EDE0D0] px-4 py-2 font-black shadow-[3px_3px_0px_#E80000] hover:bg-[#E80000] hover:text-white transition-all active:translate-x-0.5 active:translate-y-0.5"
          >
            <FileText className="h-4 w-4" />
            <span>Mesa de Redacción →</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigateTab("archivo")}
            className="flex items-center gap-2 border-2 border-[#1F1305] bg-white text-[#1F1305] px-4 py-2 font-black shadow-[3px_3px_0px_#1F1305] hover:bg-[#EDE0D0] transition-all active:translate-x-0.5 active:translate-y-0.5"
          >
            <ImageIcon className="h-4 w-4" />
            <span>Catálogo de Archivo</span>
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. KPIS DE REDACCIÓN EDITORIAL                               */}
      {/* ============================================================ */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b-2 border-[#1F1305] pb-2">
          <span className="font-black text-[#E80000] uppercase flex items-center gap-1.5">
            <FileText className="h-4 w-4" /> ESTADO DE ESCRITURA &amp; CONTENIDOS PERICIALES
          </span>
          <span className="text-[#5A5245]">Avance de Redacción</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Informes de Músicos */}
          <div className="border-2 border-[#1F1305] bg-white p-4 shadow-[4px_4px_0px_#1F1305] space-y-2">
            <div className="flex items-center justify-between text-[#5A5245]">
              <span>Informes de Músicos</span>
              <Users className="h-4 w-4 text-[#E80000]" />
            </div>
            <div className="font-cooper text-2xl font-black text-[#1F1305]">
              {persons.length}{" "}
              <span className="font-mono text-xs font-normal text-[#5A5245]">catalogados</span>
            </div>
            <div className="text-[11px] text-[#5A5245] space-y-0.5 pt-1 border-t border-[#1F1305]/10">
              <div className="flex justify-between">
                <span>Con retrato listo:</span>
                <strong className="text-[#10B981]">{personsWithPhoto}</strong>
              </div>
              <div className="flex justify-between">
                <span>Pendientes de foto:</span>
                <strong className="text-[#E80000]">{persons.length - personsWithPhoto}</strong>
              </div>
            </div>
          </div>

          {/* Historia de Agrupaciones */}
          <div className="border-2 border-[#1F1305] bg-white p-4 shadow-[4px_4px_0px_#1F1305] space-y-2">
            <div className="flex items-center justify-between text-[#5A5245]">
              <span>Agrupaciones (Genealogía)</span>
              <Building2 className="h-4 w-4 text-[#F1730C]" />
            </div>
            <div className="font-cooper text-2xl font-black text-[#1F1305]">
              {groupsCount}{" "}
              <span className="font-mono text-xs font-normal text-[#5A5245]">orquestas</span>
            </div>
            <div className="text-[11px] text-[#5A5245] space-y-0.5 pt-1 border-t border-[#1F1305]/10">
              <div className="flex justify-between">
                <span>Con etapas documentadas:</span>
                <strong className="text-[#10B981]">{groupsWithPhoto}</strong>
              </div>
              <div className="flex justify-between">
                <span>Discos vinculados:</span>
                <strong className="text-[#1F1305]">{albums.length}</strong>
              </div>
            </div>
          </div>

          {/* Notas de Investigación */}
          <div className="border-2 border-[#1F1305] bg-white p-4 shadow-[4px_4px_0px_#1F1305] space-y-2">
            <div className="flex items-center justify-between text-[#5A5245]">
              <span>Notas de Investigación</span>
              <BookOpen className="h-4 w-4 text-[#10B981]" />
            </div>
            <div className="font-cooper text-2xl font-black text-[#1F1305]">
              {articles.length}{" "}
              <span className="font-mono text-xs font-normal text-[#5A5245]">artículos</span>
            </div>
            <div className="text-[11px] text-[#5A5245] space-y-0.5 pt-1 border-t border-[#1F1305]/10">
              <div className="flex justify-between">
                <span>Publicados en web:</span>
                <strong className="text-[#10B981]">{publishedArticles}</strong>
              </div>
              <div className="flex justify-between">
                <span>En borrador:</span>
                <strong className="text-[#F1730C]">{draftArticles}</strong>
              </div>
            </div>
          </div>

          {/* Radar Mensual */}
          <div className="border-2 border-[#1F1305] bg-white p-4 shadow-[4px_4px_0px_#1F1305] space-y-2">
            <div className="flex items-center justify-between text-[#5A5245]">
              <span>Radar del Mes Actual</span>
              <Radio className="h-4 w-4 text-[#F8C800]" />
            </div>
            <div className="font-cooper text-2xl font-black text-[#1F1305]">
              Octubre 2026
            </div>
            <div className="text-[11px] text-[#5A5245] pt-1 border-t border-[#1F1305]/10 flex items-center justify-between">
              <span>Estado del Hallazgo:</span>
              <span className="border border-[#10B981] bg-[#10B981]/10 px-1.5 py-0.2 font-bold text-[#10B981]">
                ● ACTIVO
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. KPIS DE CUSTODIA FOTOGRÁFICA (EXISTENTES)                 */}
      {/* ============================================================ */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b-2 border-[#1F1305] pb-2">
          <span className="font-black text-[#1F1305] uppercase flex items-center gap-1.5">
            <ImageIcon className="h-4 w-4 text-[#F1730C]" /> CUSTODIA FOTOGRÁFICA &amp; DIGITALIZACIÓN
          </span>
          <span className="text-[#5A5245]">Progreso de Carátulas WebP</span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="border-2 border-[#1F1305] bg-white p-4 shadow-[3px_3px_0px_#1F1305] space-y-2">
            <div className="flex items-center justify-between text-[#5A5245]">
              <span>Portadas Álbum</span>
              <span className="font-bold">{albumsWithCover} / {albums.length}</span>
            </div>
            <div className="h-2 w-full bg-[#EDE0D0] border border-[#1F1305] overflow-hidden">
              <div
                className="h-full bg-[#F8C800]"
                style={{ width: `${(albumsWithCover / (albums.length || 1)) * 100}%` }}
              />
            </div>
            <p className="text-[10px] text-[#5A5245] text-right">
              {Math.round((albumsWithCover / (albums.length || 1)) * 100)}% digitalizado
            </p>
          </div>

          <div className="border-2 border-[#1F1305] bg-white p-4 shadow-[3px_3px_0px_#1F1305] space-y-2">
            <div className="flex items-center justify-between text-[#5A5245]">
              <span>Fotos Grupos</span>
              <span className="font-bold">{groupsWithPhoto} / {groups.length}</span>
            </div>
            <div className="h-2 w-full bg-[#EDE0D0] border border-[#1F1305] overflow-hidden">
              <div
                className="h-full bg-[#E80000]"
                style={{ width: `${(groupsWithPhoto / (groups.length || 1)) * 100}%` }}
              />
            </div>
            <p className="text-[10px] text-[#5A5245] text-right">
              {Math.round((groupsWithPhoto / (groups.length || 1)) * 100)}% digitalizado
            </p>
          </div>

          <div className="border-2 border-[#1F1305] bg-white p-4 shadow-[3px_3px_0px_#1F1305] space-y-2">
            <div className="flex items-center justify-between text-[#5A5245]">
              <span>Fotos Personas</span>
              <span className="font-bold">{personsWithPhoto} / {persons.length}</span>
            </div>
            <div className="h-2 w-full bg-[#EDE0D0] border border-[#1F1305] overflow-hidden">
              <div
                className="h-full bg-[#10B981]"
                style={{ width: `${(personsWithPhoto / (persons.length || 1)) * 100}%` }}
              />
            </div>
            <p className="text-[10px] text-[#5A5245] text-right">
              {Math.round((personsWithPhoto / (persons.length || 1)) * 100)}% digitalizado
            </p>
          </div>

          <div className="border-2 border-[#1F1305] bg-white p-4 shadow-[3px_3px_0px_#1F1305] space-y-2">
            <div className="flex items-center justify-between text-[#5A5245]">
              <span>Logos Sellos</span>
              <span className="font-bold">{labelsWithLogo} / {labels.length}</span>
            </div>
            <div className="h-2 w-full bg-[#EDE0D0] border border-[#1F1305] overflow-hidden">
              <div
                className="h-full bg-[#F1730C]"
                style={{ width: `${(labelsWithLogo / (labels.length || 1)) * 100}%` }}
              />
            </div>
            <p className="text-[10px] text-[#5A5245] text-right">
              {Math.round((labelsWithLogo / (labels.length || 1)) * 100)}% digitalizado
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
