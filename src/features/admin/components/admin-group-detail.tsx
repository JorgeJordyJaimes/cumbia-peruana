"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { GlassCard } from "@/components/ui/glass-card";
import { ImageUploader } from "@/features/storage/components/image-uploader";
import { AlbumCoverSlider } from "@/features/albumes";
import {
  ArrowLeft,
  Search,
  Disc3,
  Disc,
  Radio,
  ExternalLink,
  Trash2,
  CheckCircle2,
  Image as ImageIcon,
  Sparkles,
  X,
  ChevronDown,
  Layers,
  Building2,
  Calendar,
  Tag,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface GroupDetailTrack {
  side: string | null;
  trackNumber: number | null;
  title: string;
}

export interface GroupDetailAlbum {
  id: number;
  title: string;
  catalogNumber: string | null;
  year: number | null;
  label: string | null;
  idTipoAlbum: number | null;
  formatName: string; // 'LP' | '45' | 'Casete' | 'EP' | 'CD'
  coverUrl: string | null;
  backCoverUrl: string | null;
  vinylLabelUrl: string | null;
  tracks: GroupDetailTrack[];
}

export interface GroupDetailData {
  id: number;
  name: string;
  region: string | null;
  directorName: string | null;
  photoUrl: string | null;
}

export interface GroupSummaryItem {
  id: number;
  name: string;
}

interface AdminGroupDetailProps {
  group: GroupDetailData;
  initialAlbums: GroupDetailAlbum[];
  allGroups: GroupSummaryItem[];
}

type FormatFilter = "all" | "lp" | "45" | "casete" | "ep" | "cd";
type PhotoFilter = "all" | "missing" | "complete";

export function AdminGroupDetail({
  group: initialGroup,
  initialAlbums,
  allGroups,
}: AdminGroupDetailProps) {
  const router = useRouter();

  // Estados locales
  const [group, setGroup] = useState<GroupDetailData>(initialGroup);
  const [albums, setAlbums] = useState<GroupDetailAlbum[]>(initialAlbums);
  const [searchTerm, setSearchTerm] = useState("");
  const [formatFilter, setFormatFilter] = useState<FormatFilter>("all");
  const [photoFilter, setPhotoFilter] = useState<PhotoFilter>("all");
  const [notification, setNotification] = useState<string | null>(null);

  const showSuccess = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  // 1. Manejar foto oficial del grupo
  const handleUpdateGroupPhoto = async (url: string) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("grupos")
      .update({ url_foto: url })
      .eq("id_grupo", group.id);

    if (error) {
      throw new Error(`Error al actualizar foto: ${error.message}`);
    }

    setGroup((prev) => ({ ...prev, photoUrl: url }));
    showSuccess(`Foto oficial de "${group.name}" actualizada con éxito en WebP.`);
  };

  const handleClearGroupPhoto = async () => {
    if (!confirm(`¿Deseas desvincular la foto oficial de ${group.name}?`)) return;
    const supabase = createClient();
    const { error } = await supabase
      .from("grupos")
      .update({ url_foto: null })
      .eq("id_grupo", group.id);

    if (error) {
      alert(`Error al desvincular foto: ${error.message}`);
      return;
    }

    setGroup((prev) => ({ ...prev, photoUrl: null }));
    showSuccess(`Foto oficial de "${group.name}" desvinculada.`);
  };

  // 2. Manejar imágenes de lanzamientos (Portada, Contraportada, Galleta)
  const handleUpdateAlbumImage = async (
    albumId: number,
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
      .eq("id_album", albumId);

    if (error) {
      throw new Error(`Error al actualizar imagen: ${error.message}`);
    }

    setAlbums((prev) =>
      prev.map((a) =>
        a.id === albumId
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
        ? "Portada Frontal / Cara A"
        : field === "url_contraportada"
        ? "Contraportada / Cara B"
        : "Galleta Central";

    showSuccess(`${sideName} del álbum #${albumId} actualizada con éxito en WebP.`);
  };

  const handleClearAlbumImage = async (
    albumId: number,
    field: "url_portada" | "url_contraportada" | "url_etiqueta",
    sideLabel: string
  ) => {
    if (!confirm(`¿Deseas desvincular ${sideLabel} de este disco?`)) return;
    const supabase = createClient();
    const updatePayload =
      field === "url_portada"
        ? { url_portada: null }
        : field === "url_contraportada"
        ? { url_contraportada: null }
        : { url_etiqueta: null };

    const { error } = await supabase
      .from("albumes")
      .update(updatePayload)
      .eq("id_album", albumId);

    if (error) {
      alert(`Error al desvincular: ${error.message}`);
      return;
    }

    setAlbums((prev) =>
      prev.map((a) =>
        a.id === albumId
          ? {
              ...a,
              coverUrl: field === "url_portada" ? null : a.coverUrl,
              backCoverUrl: field === "url_contraportada" ? null : a.backCoverUrl,
              vinylLabelUrl: field === "url_etiqueta" ? null : a.vinylLabelUrl,
            }
          : a
      )
    );

    showSuccess(`${sideLabel} del disco #${albumId} desvinculada.`);
  };

  // Conteo de formatos físicos
  const formatCounts = useMemo(() => {
    const counts = {
      all: albums.length,
      lp: 0,
      45: 0,
      casete: 0,
      ep: 0,
      cd: 0,
    };

    albums.forEach((a) => {
      const fn = a.formatName.toLowerCase();
      if (fn === "lp" || a.idTipoAlbum === 2) counts.lp++;
      else if (fn === "45" || fn.includes("single") || a.idTipoAlbum === 1) counts["45"]++;
      else if (fn.includes("casete") || fn.includes("cassete") || a.idTipoAlbum === 4) counts.casete++;
      else if (fn === "ep" || a.idTipoAlbum === 3) counts.ep++;
      else if (fn === "cd" || a.idTipoAlbum === 5) counts.cd++;
    });

    return counts;
  }, [albums]);

  // Conteo de fotos en la discografía
  const photosProgress = useMemo(() => {
    let uploadedSides = 0;
    const totalRequiredSides = albums.length * 2; // Portada y Contraportada
    albums.forEach((a) => {
      if (a.coverUrl) uploadedSides++;
      if (a.backCoverUrl) uploadedSides++;
    });
    const percentage = totalRequiredSides > 0 ? Math.round((uploadedSides / totalRequiredSides) * 100) : 0;
    return { uploadedSides, totalRequiredSides, percentage };
  }, [albums]);

  // Filtrado de lanzamientos
  const filteredAlbums = useMemo(() => {
    return albums.filter((a) => {
      // Filtro de formato
      const fn = a.formatName.toLowerCase();
      if (formatFilter === "lp" && !(fn === "lp" || a.idTipoAlbum === 2)) return false;
      if (formatFilter === "45" && !(fn === "45" || fn.includes("single") || a.idTipoAlbum === 1)) return false;
      if (formatFilter === "casete" && !(fn.includes("casete") || fn.includes("cassete") || a.idTipoAlbum === 4)) return false;
      if (formatFilter === "ep" && !(fn === "ep" || a.idTipoAlbum === 3)) return false;
      if (formatFilter === "cd" && !(fn === "cd" || a.idTipoAlbum === 5)) return false;

      // Filtro de estado de foto
      const hasBoth = Boolean(a.coverUrl && a.backCoverUrl);
      if (photoFilter === "complete" && !hasBoth) return false;
      if (photoFilter === "missing" && hasBoth) return false;

      // Filtro de texto de búsqueda
      if (!searchTerm.trim()) return true;
      const q = searchTerm.toLowerCase();

      // Buscar en título, catálogo, sello, año o títulos de canciones
      if (a.title.toLowerCase().includes(q)) return true;
      if (a.catalogNumber?.toLowerCase().includes(q)) return true;
      if (a.label?.toLowerCase().includes(q)) return true;
      if (a.year && String(a.year).includes(q)) return true;
      if (a.tracks.some((t) => t.title.toLowerCase().includes(q))) return true;

      return false;
    });
  }, [albums, formatFilter, photoFilter, searchTerm]);

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 rounded-2xl border border-emerald-500/40 bg-neutral-900/95 px-4 py-3 font-mono text-xs text-emerald-300 shadow-2xl backdrop-blur flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Barra de Navegación Superior y Selector Rápido */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 font-mono text-xs text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Volver a Agrupaciones</span>
          </Link>
          <span className="text-neutral-600">/</span>
          <span className="font-mono text-xs text-amber-400 font-bold truncate max-w-[200px] sm:max-w-xs">
            {group.name}
          </span>
        </div>

        {/* Quick Group Switcher Dropdown */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-neutral-400 hidden md:inline">Cambiar a otro grupo:</span>
          <div className="relative">
            <select
              value={group.id}
              onChange={(e) => {
                const newId = e.target.value;
                if (newId) router.push(`/admin/grupo/${newId}`);
              }}
              className="appearance-none rounded-xl border border-white/15 bg-black/70 py-1.5 pl-3 pr-8 font-mono text-xs text-white hover:border-amber-400 focus:border-amber-400 focus:outline-none cursor-pointer"
            >
              {allGroups.map((g) => (
                <option key={g.id} value={g.id} className="bg-neutral-900 text-white">
                  {g.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Tarjeta Principal de la Agrupación */}
      <GlassCard className="p-6 relative overflow-hidden border border-white/10 bg-gradient-to-br from-neutral-950 via-black to-neutral-950">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Info del Grupo y Foto */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Foto de la agrupación */}
            <div className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-2xl border-2 border-amber-500/30 bg-black/60 overflow-hidden flex items-center justify-center shrink-0 shadow-xl group/photo">
              {group.photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={group.photoUrl}
                  alt={group.name}
                  className="h-full w-full object-cover group-hover/photo:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-neutral-600 gap-1">
                  <ImageIcon className="h-8 w-8" />
                  <span className="font-mono text-[9px] uppercase">Sin Foto</span>
                </div>
              )}
              {group.photoUrl && (
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/photo:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <a
                    href={group.photoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-white/20 text-white hover:text-amber-400 transition-colors"
                    title="Ver en tamaño completo"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <button
                    onClick={handleClearGroupPhoto}
                    className="p-1.5 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/40 transition-colors cursor-pointer"
                    title="Eliminar foto del grupo"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Datos del Grupo */}
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-md">
                  Grupo #{group.id}
                </span>
                {group.region && (
                  <span className="font-mono text-xs text-neutral-400">
                    • Región: <strong className="text-neutral-200">{group.region}</strong>
                  </span>
                )}
                {group.directorName && (
                  <span className="font-mono text-xs text-neutral-400">
                    • Director: <strong className="text-neutral-200">{group.directorName}</strong>
                  </span>
                )}
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {group.name}
              </h2>

              <p className="font-mono text-xs text-neutral-400 flex items-center gap-2">
                <span>{albums.length} lanzamientos catalogados</span>
                <span>•</span>
                <span className="text-emerald-400">
                  {photosProgress.uploadedSides} / {photosProgress.totalRequiredSides} caras con foto
                </span>
              </p>
            </div>
          </div>

          {/* Uploader Rápido de Foto de la Agrupación */}
          <div className="w-full lg:w-80 shrink-0 p-4 rounded-xl border border-white/10 bg-white/[0.02]">
            <ImageUploader
              folderPath="grupos"
              fileId={group.id}
              suffix="foto"
              currentUrl={group.photoUrl}
              label="Actualizar Foto Oficial del Grupo"
              onUploaded={handleUpdateGroupPhoto}
            />
          </div>
        </div>

        {/* Barra de Progreso de Fotos de la Discografía */}
        <div className="mt-6 pt-5 border-t border-white/10 space-y-2">
          <div className="flex items-center justify-between font-mono text-xs">
            <span className="text-neutral-400 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              Progreso visual del archivo de {group.name}
            </span>
            <span className="text-amber-300 font-bold">
              {photosProgress.uploadedSides} de {photosProgress.totalRequiredSides} imágenes ({photosProgress.percentage}%)
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-rose-500 to-emerald-400 rounded-full transition-all duration-500"
              style={{ width: `${photosProgress.percentage}%` }}
            />
          </div>
        </div>
      </GlassCard>

      {/* Barra de Filtros por Formato Físico */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: "all" as const, label: `Todos los formatos (${formatCounts.all})`, icon: Layers },
            { id: "lp" as const, label: `LPs (${formatCounts.lp})`, icon: Disc3, activeColor: "bg-amber-500 text-neutral-950" },
            { id: "45" as const, label: `Singles 45s (${formatCounts["45"]})`, icon: Disc, activeColor: "bg-cyan-500 text-neutral-950" },
            { id: "casete" as const, label: `Casetes (${formatCounts.casete})`, icon: Radio, activeColor: "bg-emerald-500 text-neutral-950" },
            { id: "ep" as const, label: `EPs (${formatCounts.ep})`, icon: Disc, activeColor: "bg-purple-500 text-neutral-950" },
            { id: "cd" as const, label: `CDs (${formatCounts.cd})`, icon: Disc, activeColor: "bg-rose-500 text-neutral-950" },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = formatFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setFormatFilter(tab.id)}
                className={cn(
                  "flex items-center gap-2 rounded-xl px-3.5 py-2 font-mono text-xs font-semibold transition-all cursor-pointer",
                  isActive
                    ? tab.activeColor || "bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20"
                    : "border border-white/10 bg-white/5 text-neutral-300 hover:border-white/20 hover:bg-white/10"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Buscador y Filtro de Estado de Fotos */}
        <GlassCard className="p-3.5 flex flex-wrap items-center justify-between gap-3">
          {/* Buscador Cómodo */}
          <div className="relative flex-1 min-w-[260px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
            <input
              type="text"
              placeholder={`Buscar en discografía de ${group.name} (canción, catálogo, título, sello, año)...`}
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

          {/* Filtro de Fotos */}
          <div className="flex items-center gap-1.5 font-mono text-xs">
            <span className="text-neutral-400 text-[11px] hidden sm:inline">Fotos:</span>
            {[
              { id: "all" as const, label: "Todos" },
              { id: "missing" as const, label: "Faltan Fotos" },
              { id: "complete" as const, label: "Completos (2 Caras)" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setPhotoFilter(f.id)}
                className={cn(
                  "rounded-lg px-2.5 py-1 text-xs transition-colors cursor-pointer",
                  photoFilter === f.id
                    ? "bg-white/20 text-white font-semibold"
                    : "text-neutral-400 hover:text-white"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Listado de Lanzamientos del Grupo */}
      <div className="space-y-4">
        <div className="flex items-center justify-between font-mono text-xs text-neutral-400 px-1">
          <span>
            Mostrando {filteredAlbums.length} de {albums.length} lanzamientos
          </span>
          <span className="text-[11px] text-neutral-500">
            Conversión automática a WebP activa
          </span>
        </div>

        {filteredAlbums.length === 0 ? (
          <GlassCard className="p-12 text-center space-y-3">
            <Disc3 className="h-10 w-10 text-neutral-600 mx-auto" />
            <p className="text-base font-bold text-white">No se encontraron lanzamientos</p>
            <p className="font-mono text-xs text-neutral-400">
              Prueba cambiando el filtro de formato o limpiando la barra de búsqueda.
            </p>
          </GlassCard>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {filteredAlbums.map((album) => {
              const isSingle = Boolean(
                album.idTipoAlbum === 1 ||
                album.formatName.toLowerCase().includes("single") ||
                album.formatName.toLowerCase().includes("45")
              );

              const frontLabel = isSingle ? "Cara A (Lado A)" : "Portada Frontal";
              const backLabel = isSingle ? "Cara B (Lado B)" : "Contraportada / Reverso";
              const hasBoth = Boolean(album.coverUrl && album.backCoverUrl);
              const hasAny = Boolean(album.coverUrl || album.backCoverUrl);

              // Formato visual de títulos para singles
              const sideATracks = album.tracks.filter((t) => t.side?.toUpperCase() === "A");
              const sideBTracks = album.tracks.filter((t) => t.side?.toUpperCase() === "B");
              const sideAText = sideATracks.map((t) => t.title).join(", ");
              const sideBText = sideBTracks.map((t) => t.title).join(", ");

              return (
                <GlassCard
                  key={album.id}
                  className="p-5 flex flex-col justify-between gap-4 border border-white/10 bg-black/40 hover:border-white/20 transition-all"
                >
                  {/* Encabezado del Disco */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1.5 flex-1 min-w-0">
                      {/* Meta pills */}
                      <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
                        <span className="text-amber-400 font-bold">#{album.id}</span>
                        <span className="text-neutral-500">•</span>
                        <span className={cn(
                          "px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase tracking-wider",
                          isSingle
                            ? "bg-cyan-500/10 text-cyan-300 border border-cyan-500/30"
                            : album.idTipoAlbum === 2
                            ? "bg-amber-500/10 text-amber-300 border border-amber-500/30"
                            : album.idTipoAlbum === 4
                            ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/30"
                            : "bg-purple-500/10 text-purple-300 border border-purple-500/30"
                        )}>
                          {isSingle ? "Single 45 RPM" : album.formatName}
                        </span>

                        {album.catalogNumber && (
                          <span className="inline-flex items-center gap-1 font-mono text-[11px] text-neutral-300 border border-white/10 bg-white/5 px-1.5 py-0.5 rounded">
                            <Tag className="h-3 w-3 text-neutral-400" />
                            {album.catalogNumber}
                          </span>
                        )}

                        {album.year && (
                          <span className="inline-flex items-center gap-1 font-mono text-[11px] text-neutral-400">
                            <Calendar className="h-3 w-3" />
                            {album.year}
                          </span>
                        )}
                      </div>

                      {/* Título */}
                      <h4 className="text-base font-bold text-white tracking-tight truncate">
                        {album.title || (isSingle ? `Single [Cat: ${album.catalogNumber || album.id}]` : "Sin Título Registrado")}
                      </h4>

                      {/* Desglose de pistas para Singles o Sello para LPs */}
                      {isSingle && (sideAText || sideBText) ? (
                        <div className="space-y-0.5 font-mono text-xs">
                          {sideAText && (
                            <p className="text-neutral-300 truncate">
                              <strong className="text-amber-400">A:</strong> {sideAText}
                            </p>
                          )}
                          {sideBText && (
                            <p className="text-neutral-400 truncate">
                              <strong className="text-orange-400">B:</strong> {sideBText}
                            </p>
                          )}
                        </div>
                      ) : (
                        <p className="text-xs text-neutral-400 flex items-center gap-1">
                          <Building2 className="h-3 w-3 text-neutral-500" />
                          <span>{album.label || "Sello Particular"}</span>
                          {album.tracks.length > 0 && (
                            <span className="text-neutral-500">
                              • {album.tracks.length} temas catalogados
                            </span>
                          )}
                        </p>
                      )}
                    </div>

                    {/* Badge de Estado de Imágenes */}
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
                        onUploaded={(url) => handleUpdateAlbumImage(album.id, url, "url_portada")}
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
                        onUploaded={(url) => handleUpdateAlbumImage(album.id, url, "url_contraportada")}
                      />
                    </div>
                  </div>

                  {/* Sección Opcional: Galleta Central / Etiqueta */}
                  <details className="group/etiqueta pt-2 border-t border-white/5">
                    <summary className="font-mono text-[11px] text-neutral-400 hover:text-amber-400 cursor-pointer list-none flex items-center justify-between py-1">
                      <span className="flex items-center gap-1.5">
                        <Disc className="h-3.5 w-3.5 text-neutral-500" />
                        <span>Foto de Galleta Central / Etiqueta del Vinilo {album.vinylLabelUrl ? "✅" : "(Opcional)"}</span>
                      </span>
                      <span className="text-neutral-500 group-open/etiqueta:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="pt-2">
                      <div className="p-3 rounded-xl border border-white/5 bg-white/[0.02] space-y-2">
                        <div className="flex items-center justify-between text-xs font-mono font-bold">
                          <span className="text-neutral-300">Galleta Central</span>
                          {album.vinylLabelUrl && (
                            <div className="flex items-center gap-1.5">
                              <a
                                href={album.vinylLabelUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded border border-white/10 bg-white/5 p-1 text-neutral-400 hover:text-amber-400 transition-colors"
                              >
                                <ExternalLink className="h-3 w-3" />
                              </a>
                              <button
                                type="button"
                                onClick={() => handleClearAlbumImage(album.id, "url_etiqueta", "Galleta Central")}
                                className="rounded border border-red-500/20 bg-red-500/10 p-1 text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>
                          )}
                        </div>
                        <ImageUploader
                          folderPath="albumes"
                          fileId={album.id}
                          suffix="etiqueta"
                          currentUrl={album.vinylLabelUrl}
                          label="Subir Galleta / Etiqueta del Vinilo"
                          onUploaded={(url) => handleUpdateAlbumImage(album.id, url, "url_etiqueta")}
                        />
                      </div>
                    </div>
                  </details>

                  {/* Visor Interactivo Deslizable cuando ambas caras están listas */}
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
                            artist={group.name}
                            format={album.formatName}
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
        )}
      </div>
    </div>
  );
}
