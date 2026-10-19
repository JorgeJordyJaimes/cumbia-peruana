"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { GlassCard } from "@/components/ui/glass-card";
import { ImageUploader } from "@/features/storage/components/image-uploader";
import {
  Search,
  Disc3,
  Disc,
  Users,
  User,
  Building2,
  ExternalLink,
  Trash2,
  CheckCircle2,
  ArrowRight,
  X,
  Sparkles,
  Radio,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AlbumCoverSlider } from "@/features/albumes";

export interface AdminAlbumItem {
  id: number;
  title: string;
  artist: string;
  groupId?: number | null;
  catalogNumber?: string | null;
  year?: number | null;
  label?: string | null;
  coverUrl?: string | null;
  backCoverUrl?: string | null;
  vinylLabelUrl?: string | null;
  format?: string | null;
  idTipoAlbum?: number | null;
}

export interface AdminGroupItem {
  id: number;
  name: string;
  region?: string | null;
  directorName?: string | null;
  photoUrl?: string | null;
  totalAlbums?: number;
  lpsCount?: number;
  singlesCount?: number;
  casetesCount?: number;
  epsCount?: number;
  cdsCount?: number;
  albumsWithPhoto?: number;
}

export interface AdminPersonItem {
  id: number;
  name: string;
  nickname?: string | null;
  photoUrl?: string | null;
}

export interface AdminLabelItem {
  id: number;
  name: string;
  country?: string | null;
  logoUrl?: string | null;
}

interface AdminMediaManagerProps {
  initialAlbums: AdminAlbumItem[];
  initialGroups: AdminGroupItem[];
  initialPersons: AdminPersonItem[];
  initialLabels: AdminLabelItem[];
}

type TabType = "albumes" | "grupos" | "personas" | "sellos";
type FilterStatus = "all" | "with-image" | "without-image" | "both-sides" | "with-discography";

export function AdminMediaManager({
  initialAlbums,
  initialGroups,
  initialPersons,
  initialLabels,
}: AdminMediaManagerProps) {
  const [activeTab, setActiveTab] = useState<TabType>("albumes");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterImageStatus, setFilterImageStatus] = useState<FilterStatus>("all");

  // Estados locales para reflejar cambios en tiempo real
  const [albums, setAlbums] = useState<AdminAlbumItem[]>(initialAlbums);
  const [groups, setGroups] = useState<AdminGroupItem[]>(initialGroups);
  const [persons, setPersons] = useState<AdminPersonItem[]>(initialPersons);
  const [labels, setLabels] = useState<AdminLabelItem[]>(initialLabels);

  const [notification, setNotification] = useState<string | null>(null);

  const showSuccess = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  // 1. Actualizar Álbum (Portada o Contraportada)
  const handleUpdateAlbumCover = async (
    id: number,
    url: string,
    field: "url_portada" | "url_contraportada" | "url_etiqueta"
  ) => {
    const supabase = createClient();
    const payload =
      field === "url_portada"
        ? { url_portada: url }
        : field === "url_contraportada"
        ? { url_contraportada: url }
        : { url_etiqueta: url };

    const { error } = await supabase
      .from("albumes")
      .update(payload)
      .eq("id_album", id);

    if (error) {
      throw new Error(`Error al actualizar álbum: ${error.message}`);
    }

    setAlbums((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              coverUrl: field === "url_portada" ? url : a.coverUrl,
              backCoverUrl: field === "url_contraportada" ? url : a.backCoverUrl,
              vinylLabelUrl: field === "url_etiqueta" ? url : a.vinylLabelUrl,
            }
          : a
      )
    );
    const sideName =
      field === "url_portada"
        ? "Portada / Cara A"
        : field === "url_contraportada"
        ? "Contraportada / Cara B"
        : "Galleta Central";
    showSuccess(`${sideName} del álbum #${id} actualizada exitosamente.`);
  };

  const handleClearAlbumImage = async (
    id: number,
    field: "url_portada" | "url_contraportada",
    sideLabel: string
  ) => {
    if (!confirm(`¿Deseas desvincular ${sideLabel} de este álbum?`)) return;
    const supabase = createClient();
    const updatePayload =
      field === "url_portada" ? { url_portada: null } : { url_contraportada: null };
    const { error } = await supabase.from("albumes").update(updatePayload).eq("id_album", id);
    if (error) {
      alert(`Error al desvincular: ${error.message}`);
      return;
    }
    setAlbums((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              coverUrl: field === "url_portada" ? null : a.coverUrl,
              backCoverUrl: field === "url_contraportada" ? null : a.backCoverUrl,
            }
          : a
      )
    );
    showSuccess(`${sideLabel} de álbum #${id} eliminada.`);
  };

  // 2. Actualizar Grupo
  const handleUpdateGroupPhoto = async (id: number, url: string) => {
    const supabase = createClient();
    const { error } = await supabase.from("grupos").update({ url_foto: url }).eq("id_grupo", id);
    if (error) throw new Error(error.message);
    setGroups((prev) => prev.map((g) => (g.id === id ? { ...g, photoUrl: url } : g)));
    showSuccess(`Fotografía de grupo #${id} actualizada.`);
  };

  const handleClearGroupPhoto = async (id: number) => {
    if (!confirm("¿Deseas desvincular la foto del grupo?")) return;
    const supabase = createClient();
    await supabase.from("grupos").update({ url_foto: null }).eq("id_grupo", id);
    setGroups((prev) => prev.map((g) => (g.id === id ? { ...g, photoUrl: null } : g)));
    showSuccess(`Foto de grupo #${id} eliminada.`);
  };

  // 3. Actualizar Persona
  const handleUpdatePersonPhoto = async (id: number, url: string) => {
    const supabase = createClient();
    const { error } = await supabase.from("personas").update({ url_foto: url }).eq("id_persona", id);
    if (error) throw new Error(error.message);
    setPersons((prev) => prev.map((p) => (p.id === id ? { ...p, photoUrl: url } : p)));
    showSuccess(`Fotografía de compositor/artista #${id} actualizada.`);
  };

  const handleClearPersonPhoto = async (id: number) => {
    if (!confirm("¿Deseas desvincular la foto de la persona?")) return;
    const supabase = createClient();
    await supabase.from("personas").update({ url_foto: null }).eq("id_persona", id);
    setPersons((prev) => prev.map((p) => (p.id === id ? { ...p, photoUrl: null } : p)));
    showSuccess(`Foto de persona #${id} eliminada.`);
  };

  // 4. Actualizar Sello
  const handleUpdateLabelLogo = async (id: number, url: string) => {
    const supabase = createClient();
    const { error } = await supabase.from("sellos_discograficos").update({ url_logo: url }).eq("id_sello", id);
    if (error) throw new Error(error.message);
    setLabels((prev) => prev.map((l) => (l.id === id ? { ...l, logoUrl: url } : l)));
    showSuccess(`Logotipo de sello #${id} actualizado.`);
  };

  const handleClearLabelLogo = async (id: number) => {
    if (!confirm("¿Deseas desvincular el logotipo del sello?")) return;
    const supabase = createClient();
    await supabase.from("sellos_discograficos").update({ url_logo: null }).eq("id_sello", id);
    setLabels((prev) => prev.map((l) => (l.id === id ? { ...l, logoUrl: null } : l)));
    showSuccess(`Logotipo de sello #${id} eliminado.`);
  };

  // Filtrado de elementos
  const filteredAlbums = useMemo(() => {
    return albums.filter((a) => {
      const hasAny = Boolean(a.coverUrl || a.backCoverUrl);
      const hasBoth = Boolean(a.coverUrl && a.backCoverUrl);
      if (filterImageStatus === "with-image" && !hasAny) return false;
      if (filterImageStatus === "without-image" && hasAny) return false;
      if (filterImageStatus === "both-sides" && !hasBoth) return false;
      if (!searchTerm.trim()) return true;
      const q = searchTerm.toLowerCase();
      return (
        a.title.toLowerCase().includes(q) ||
        a.artist.toLowerCase().includes(q) ||
        a.catalogNumber?.toLowerCase().includes(q) ||
        a.label?.toLowerCase().includes(q) ||
        (a.format && a.format.toLowerCase().includes(q))
      );
    });
  }, [albums, searchTerm, filterImageStatus]);

  const filteredGroups = useMemo(() => {
    return groups.filter((g) => {
      if (filterImageStatus === "with-image" && !g.photoUrl) return false;
      if (filterImageStatus === "without-image" && g.photoUrl) return false;
      if (filterImageStatus === "with-discography" && (!g.totalAlbums || g.totalAlbums === 0)) return false;
      if (!searchTerm.trim()) return true;
      const q = searchTerm.toLowerCase();
      return (
        g.name.toLowerCase().includes(q) ||
        g.region?.toLowerCase().includes(q) ||
        g.directorName?.toLowerCase().includes(q) ||
        String(g.id) === q
      );
    });
  }, [groups, searchTerm, filterImageStatus]);

  const filteredPersons = useMemo(() => {
    return persons.filter((p) => {
      if (filterImageStatus === "with-image" && !p.photoUrl) return false;
      if (filterImageStatus === "without-image" && p.photoUrl) return false;
      if (!searchTerm.trim()) return true;
      const q = searchTerm.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.nickname?.toLowerCase().includes(q);
    });
  }, [persons, searchTerm, filterImageStatus]);

  const filteredLabels = useMemo(() => {
    return labels.filter((l) => {
      if (filterImageStatus === "with-image" && !l.logoUrl) return false;
      if (filterImageStatus === "without-image" && l.logoUrl) return false;
      if (!searchTerm.trim()) return true;
      const q = searchTerm.toLowerCase();
      return l.name.toLowerCase().includes(q) || l.country?.toLowerCase().includes(q);
    });
  }, [labels, searchTerm, filterImageStatus]);

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 rounded-2xl border border-emerald-500/40 bg-neutral-900/95 px-4 py-3 font-mono text-xs text-emerald-300 shadow-2xl backdrop-blur flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
        {[
          { id: "albumes", label: `Álbumes (${albums.length})`, icon: Disc3 },
          { id: "grupos", label: `Agrupaciones (${groups.length})`, icon: Users },
          { id: "personas", label: `Personas & Músicos (${persons.length})`, icon: User },
          { id: "sellos", label: `Sellos Discográficos (${labels.length})`, icon: Building2 },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as TabType);
                setSearchTerm("");
              }}
              className={cn(
                "flex items-center gap-2 rounded-xl px-4 py-2.5 font-mono text-xs font-semibold transition-all cursor-pointer",
                isActive
                  ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20"
                  : "border border-white/10 bg-white/5 text-neutral-300 hover:border-white/20 hover:bg-white/10"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Barra de Búsqueda y Filtros de Estado */}
      <GlassCard className="p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 min-w-[260px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
          <input
            type="text"
            placeholder={
              activeTab === "grupos"
                ? "Buscar agrupación (nombre, región, director, ID)..."
                : `Buscar en ${activeTab}...`
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/50 py-2.5 pl-10 pr-9 font-mono text-xs text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white cursor-pointer"
              title="Limpiar búsqueda"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
          <span className="text-neutral-400 text-[11px] hidden sm:inline">Filtrar:</span>
          {(activeTab === "grupos"
            ? [
                { id: "all" as const, label: "Todos" },
                { id: "with-discography" as const, label: "Con Discografía" },
                { id: "with-image" as const, label: "Con Foto" },
                { id: "without-image" as const, label: "Sin Foto" },
              ]
            : activeTab === "albumes"
            ? [
                { id: "all" as const, label: "Todos" },
                { id: "with-image" as const, label: "Con Imagen" },
                { id: "both-sides" as const, label: "Ambas Caras" },
                { id: "without-image" as const, label: "Sin Imagen" },
              ]
            : [
                { id: "all" as const, label: "Todos" },
                { id: "with-image" as const, label: "Con Imagen" },
                { id: "without-image" as const, label: "Sin Imagen" },
              ]
          ).map((f) => (
            <button
              key={f.id}
              onClick={() => setFilterImageStatus(f.id)}
              className={cn(
                "rounded-lg px-2.5 py-1 text-xs transition-colors cursor-pointer",
                filterImageStatus === f.id
                  ? "bg-white/20 text-white font-semibold shadow-xs"
                  : "text-neutral-400 hover:text-white"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </GlassCard>

      {/* Lista de Álbumes */}
      {activeTab === "albumes" && (
        <div className="space-y-4">
          <div className="font-mono text-xs text-neutral-400">
            Mostrando {filteredAlbums.length} álbumes
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredAlbums.slice(0, 40).map((album) => {
              const isSingle = Boolean(
                album.idTipoAlbum === 1 ||
                album.format?.toLowerCase().includes("single") ||
                album.format?.toLowerCase().includes("45")
              );
              const frontLabel = isSingle ? "Cara A (Lado A)" : "Portada Frontal";
              const backLabel = isSingle ? "Cara B (Lado B)" : "Contraportada / Reverso";
              const hasBoth = Boolean(album.coverUrl && album.backCoverUrl);
              const hasAny = Boolean(album.coverUrl || album.backCoverUrl);

              return (
                <GlassCard key={album.id} className="p-5 flex flex-col justify-between gap-4 border border-white/10 bg-black/40">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
                        <span className="text-amber-400 font-bold">#{album.id}</span>
                        <span className="text-neutral-500">•</span>
                        <span className="text-neutral-300 font-semibold">{album.label || "Sin Sello"}</span>
                        {album.catalogNumber && (
                          <span className="text-neutral-400">({album.catalogNumber})</span>
                        )}
                        <span className="border border-white/15 bg-white/5 px-2 py-0.2 rounded text-[10px] text-amber-300 font-mono">
                          {album.format || (isSingle ? "Single 45 RPM" : "LP 33 RPM")}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-white tracking-tight">
                        {album.title}
                      </h4>
                      <p className="text-xs text-neutral-300 font-medium">
                        {album.artist} {album.year ? `(${album.year})` : ""}
                      </p>
                    </div>

                    {/* Badge de estado de fotos */}
                    <div className="shrink-0 text-right">
                      {hasBoth ? (
                        <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="h-3 w-3" /> 2/2 Caras
                        </span>
                      ) : hasAny ? (
                        <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-amber-400 border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 rounded-full">
                          1/2 Caras
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-neutral-400 border border-white/10 bg-white/5 px-2 py-0.5 rounded-full">
                          Sin fotos
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Zonas de Carga Dual (Cara A / Portada + Cara B / Contraportada) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-3 border-t border-white/10">
                    {/* Cara A / Portada */}
                    <div className="space-y-2 p-3 rounded-xl border border-white/5 bg-white/[0.02]">
                      <div className="flex items-center justify-between text-xs font-mono font-bold">
                        <span className="text-white flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#E80000]" />
                          {frontLabel}
                        </span>
                        {album.coverUrl && (
                          <div className="flex items-center gap-1.5">
                            <a
                              href={album.coverUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded border border-white/10 bg-white/5 p-1 text-neutral-400 hover:text-amber-400 transition-colors"
                              title={`Abrir ${frontLabel}`}
                            >
                              <ExternalLink className="h-3 w-3" />
                            </a>
                            <button
                              type="button"
                              onClick={() => handleClearAlbumImage(album.id, "url_portada", frontLabel)}
                              className="rounded border border-red-500/20 bg-red-500/10 p-1 text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer"
                              title={`Eliminar ${frontLabel}`}
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
                        )}
                      </div>

                      <ImageUploader
                        folderPath="albumes"
                        fileId={album.id}
                        suffix="portada"
                        currentUrl={album.coverUrl}
                        label={`Subir ${frontLabel}`}
                        onUploaded={(url) => handleUpdateAlbumCover(album.id, url, "url_portada")}
                      />
                    </div>

                    {/* Cara B / Contraportada */}
                    <div className="space-y-2 p-3 rounded-xl border border-white/5 bg-white/[0.02]">
                      <div className="flex items-center justify-between text-xs font-mono font-bold">
                        <span className="text-white flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#F1730C]" />
                          {backLabel}
                        </span>
                        {album.backCoverUrl && (
                          <div className="flex items-center gap-1.5">
                            <a
                              href={album.backCoverUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded border border-white/10 bg-white/5 p-1 text-neutral-400 hover:text-amber-400 transition-colors"
                              title={`Abrir ${backLabel}`}
                            >
                              <ExternalLink className="h-3 w-3" />
                            </a>
                            <button
                              type="button"
                              onClick={() => handleClearAlbumImage(album.id, "url_contraportada", backLabel)}
                              className="rounded border border-red-500/20 bg-red-500/10 p-1 text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer"
                              title={`Eliminar ${backLabel}`}
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
                        )}
                      </div>

                      <ImageUploader
                        folderPath="albumes"
                        fileId={album.id}
                        suffix="contraportada"
                        currentUrl={album.backCoverUrl}
                        label={`Subir ${backLabel}`}
                        onUploaded={(url) => handleUpdateAlbumCover(album.id, url, "url_contraportada")}
                      />
                    </div>
                  </div>

                  {/* Vista Previa Interactiva Deslizable si hay fotos */}
                  {hasBoth && (
                    <div className="pt-2 border-t border-white/10">
                      <details className="group/preview">
                        <summary className="font-mono text-[11px] text-amber-400 hover:text-amber-300 cursor-pointer list-none flex items-center justify-between py-1">
                          <span>🔍 Probar Visor Deslizable ({frontLabel} ↔ {backLabel})</span>
                          <span className="text-neutral-500 group-open/preview:rotate-180 transition-transform">▼</span>
                        </summary>
                        <div className="pt-3 max-w-xs mx-auto">
                          <AlbumCoverSlider
                            coverUrl={album.coverUrl}
                            backCoverUrl={album.backCoverUrl}
                            title={album.title}
                            artist={album.artist}
                            format={album.format}
                            label={album.label}
                            showSideLabels={true}
                          />
                        </div>
                      </details>
                    </div>
                  )}
                </GlassCard>
              );
            })}
          </div>
        </div>
      )}

      {/* Lista de Grupos */}
      {activeTab === "grupos" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between font-mono text-xs text-neutral-400">
            <span>Mostrando {filteredGroups.length} agrupaciones</span>
            <span className="text-[11px] text-neutral-500">Haz clic en &quot;Entrar a fotos&quot; para ver la discografía completa</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredGroups.slice(0, 40).map((group) => {
              const hasDiscography = Boolean(group.totalAlbums && group.totalAlbums > 0);

              return (
                <GlassCard
                  key={group.id}
                  className="p-5 flex flex-col justify-between gap-4 border border-white/10 bg-black/40 hover:border-white/20 transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] text-amber-400 font-bold">#{group.id}</span>
                        {group.region && (
                          <span className="font-mono text-[11px] text-neutral-400">
                            • {group.region}
                          </span>
                        )}
                        {group.directorName && (
                          <span className="font-mono text-[11px] text-neutral-400">
                            • Dir: {group.directorName}
                          </span>
                        )}
                      </div>
                      <h4 className="text-lg font-bold text-white tracking-tight truncate">
                        {group.name}
                      </h4>

                      {/* Resumen de Discografía */}
                      <div className="pt-1 flex flex-wrap items-center gap-1.5 font-mono text-xs">
                        {hasDiscography ? (
                          <>
                            <span className="inline-flex items-center gap-1 rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[11px] font-bold text-amber-300">
                              <Disc3 className="h-3 w-3" />
                              {group.totalAlbums} {group.totalAlbums === 1 ? "lanzamiento" : "lanzamientos"}
                            </span>
                            {Boolean(group.lpsCount) && (
                              <span className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] text-neutral-300">
                                {group.lpsCount} LPs
                              </span>
                            )}
                            {Boolean(group.singlesCount) && (
                              <span className="rounded border border-cyan-500/20 bg-cyan-500/10 px-1.5 py-0.5 text-[10px] text-cyan-300">
                                {group.singlesCount} Singles 45s
                              </span>
                            )}
                            {Boolean(group.casetesCount) && (
                              <span className="rounded border border-emerald-500/20 bg-emerald-500/10 px-1.5 py-0.5 text-[10px] text-emerald-300">
                                {group.casetesCount} Casetes
                              </span>
                            )}
                            {Boolean(group.epsCount) && (
                              <span className="rounded border border-purple-500/20 bg-purple-500/10 px-1.5 py-0.5 text-[10px] text-purple-300">
                                {group.epsCount} EPs
                              </span>
                            )}
                            {Boolean(group.cdsCount) && (
                              <span className="rounded border border-rose-500/20 bg-rose-500/10 px-1.5 py-0.5 text-[10px] text-rose-300">
                                {group.cdsCount} CDs
                              </span>
                            )}
                          </>
                        ) : (
                          <span className="text-[11px] text-neutral-500">
                            Sin lanzamientos catalogados
                          </span>
                        )}
                      </div>
                    </div>

                    {group.photoUrl && (
                      <div className="flex items-center gap-2 shrink-0">
                        <a
                          href={group.photoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg border border-white/10 bg-white/5 p-1.5 text-neutral-400 hover:text-amber-400 transition-colors"
                          title="Abrir foto oficial"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                        <button
                          onClick={() => handleClearGroupPhoto(group.id)}
                          className="rounded-lg border border-red-500/20 bg-red-500/10 p-1.5 text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer"
                          title="Desvincular foto oficial"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Botón de Entrada a la Subpágina del Grupo */}
                  <Link
                    href={`/admin/grupo/${group.id}`}
                    className="w-full inline-flex items-center justify-between gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2.5 font-mono text-xs font-bold text-amber-300 hover:bg-amber-500 hover:text-neutral-950 transition-all shadow-md group/btn"
                  >
                    <span className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-amber-400 group-hover/btn:text-neutral-950 transition-colors" />
                      <span>Entrar a gestionar fotos de discografía ({group.totalAlbums || 0})</span>
                    </span>
                    <ArrowRight className="h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform" />
                  </Link>

                  {/* Uploader Rápido de Foto del Grupo */}
                  <div className="pt-2 border-t border-white/5">
                    <ImageUploader
                      folderPath="grupos"
                      fileId={group.id}
                      suffix="foto"
                      currentUrl={group.photoUrl}
                      label="Fotografía Oficial de la Agrupación (WebP)"
                      onUploaded={(url) => handleUpdateGroupPhoto(group.id, url)}
                    />
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      )}

      {/* Lista de Personas */}
      {activeTab === "personas" && (
        <div className="space-y-4">
          <div className="font-mono text-xs text-neutral-400">
            Mostrando {filteredPersons.length} personas
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredPersons.slice(0, 40).map((person) => (
              <GlassCard key={person.id} className="p-5 flex flex-col justify-between gap-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="font-mono text-[11px] text-amber-400">#{person.id}</span>
                    <h4 className="text-base font-bold text-white tracking-tight mt-0.5">
                      {person.name}
                    </h4>
                    {person.nickname && (
                      <p className="text-xs text-amber-400/90 italic">
                        &quot;{person.nickname}&quot;
                      </p>
                    )}
                  </div>

                  {person.photoUrl && (
                    <div className="flex items-center gap-2">
                      <a
                        href={person.photoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border border-white/10 bg-white/5 p-1.5 text-neutral-400 hover:text-amber-400 transition-colors"
                        title="Abrir foto"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                      <button
                        onClick={() => handleClearPersonPhoto(person.id)}
                        className="rounded-lg border border-red-500/20 bg-red-500/10 p-1.5 text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer"
                        title="Desvincular foto"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>

                <ImageUploader
                  folderPath="personas"
                  fileId={person.id}
                  suffix="foto"
                  currentUrl={person.photoUrl}
                  label="Fotografía del Músico / Compositor"
                  onUploaded={(url) => handleUpdatePersonPhoto(person.id, url)}
                />
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {/* Lista de Sellos */}
      {activeTab === "sellos" && (
        <div className="space-y-4">
          <div className="font-mono text-xs text-neutral-400">
            Mostrando {filteredLabels.length} sellos discográficos
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredLabels.slice(0, 40).map((label) => (
              <GlassCard key={label.id} className="p-5 flex flex-col justify-between gap-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="font-mono text-[11px] text-amber-400">#{label.id}</span>
                    <h4 className="text-base font-bold text-white tracking-tight mt-0.5">
                      {label.name}
                    </h4>
                    <p className="text-xs text-neutral-400">
                      País: {label.country || "Perú"}
                    </p>
                  </div>

                  {label.logoUrl && (
                    <div className="flex items-center gap-2">
                      <a
                        href={label.logoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border border-white/10 bg-white/5 p-1.5 text-neutral-400 hover:text-amber-400 transition-colors"
                        title="Abrir logo"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                      <button
                        onClick={() => handleClearLabelLogo(label.id)}
                        className="rounded-lg border border-red-500/20 bg-red-500/10 p-1.5 text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer"
                        title="Desvincular logotipo"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>

                <ImageUploader
                  folderPath="sellos"
                  fileId={label.id}
                  suffix="logo"
                  currentUrl={label.logoUrl}
                  label="Logotipo del Sello Discográfico"
                  onUploaded={(url) => handleUpdateLabelLogo(label.id, url)}
                />
              </GlassCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
