"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { GlassCard } from "@/components/ui/glass-card";
import { ImageUploader } from "@/features/storage/components/image-uploader";
import { AlbumCoverSlider } from "@/features/albumes";
import {
  EditorPericial,
  type FuentePericialItem,
  type EstadoEditorial,
} from "./editor-pericial";
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
  BookOpen,
  GitFork,
  Plus,
  Save,
  User,
  Music,
  Clock,
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

export interface PersonOptionItem {
  id: number;
  name: string;
  nickname?: string | null;
}

export interface GrupoHistoriaRow {
  id_grupo: number;
  contenido_md: string;
  fuentes?: FuentePericialItem[];
  estado: EstadoEditorial;
}

export interface GrupoEtapaItem {
  id_etapa?: number;
  id_grupo: number;
  orden: number;
  fecha_inicio: string | null;
  fecha_fin: string | null;
  titulo: string;
  id_director: number | null;
  id_vocalista: number | null;
  estilo: string | null;
  texto_md: string;
}

interface AdminGroupDetailProps {
  group: GroupDetailData;
  initialAlbums: GroupDetailAlbum[];
  allGroups: GroupSummaryItem[];
  initialHistoria?: GrupoHistoriaRow | null;
  initialEtapas?: GrupoEtapaItem[];
  allPersons?: PersonOptionItem[];
}

type GroupTabType = "discografia" | "historia" | "etapas";
type FormatFilter = "all" | "lp" | "45" | "casete" | "ep" | "cd";
type PhotoFilter = "all" | "missing" | "complete";

export function AdminGroupDetail({
  group: initialGroup,
  initialAlbums,
  allGroups,
  initialHistoria,
  initialEtapas = [],
  allPersons = [],
}: AdminGroupDetailProps) {
  const router = useRouter();
  const supabase = createClient();

  // Estados locales principales
  const [activeGroupTab, setActiveGroupTab] = useState<GroupTabType>("discografia");
  const [group, setGroup] = useState<GroupDetailData>(initialGroup);
  const [albums, setAlbums] = useState<GroupDetailAlbum[]>(initialAlbums);
  const [searchTerm, setSearchTerm] = useState("");
  const [formatFilter, setFormatFilter] = useState<FormatFilter>("all");
  const [photoFilter, setPhotoFilter] = useState<PhotoFilter>("all");
  const [notification, setNotification] = useState<string | null>(null);

  // Estados locales de Historia
  const [historiaContent, setHistoriaContent] = useState(
    initialHistoria?.contenido_md ||
      `# Historia y Crónica: ${initialGroup.name}\n\nFundada en **${initialGroup.region || "Perú"}**, fue una de las agrupaciones más influyentes del sonido tropical peruano.\n\n## Período Fundacional\nBajo la dirección de **${initialGroup.directorName || "su fundador"}**, consolidó un estilo distintivo en los estudios de grabación.\n\n> "El sonido de las cuerdas y la percusión definió una época irrepetible en el catálogo fonográfico."`
  );
  const [historiaFuentes, setHistoriaFuentes] = useState<FuentePericialItem[]>(
    initialHistoria?.fuentes && initialHistoria.fuentes.length > 0
      ? initialHistoria.fuentes
      : [
          {
            id: "f-grp-1",
            tipo: "PRIMARIA",
            referencia: "Cotejo de créditos y matrices en vinilos de 33 y 45 RPM",
          },
        ]
  );
  const [historiaEstado, setHistoriaEstado] = useState<EstadoEditorial>(
    initialHistoria?.estado || "borrador"
  );

  // Estados locales de Etapas
  const [etapas, setEtapas] = useState<GrupoEtapaItem[]>(initialEtapas);
  const [editingEtapa, setEditingEtapa] = useState<Partial<GrupoEtapaItem> | null>(null);
  const [isSavingEtapa, setIsSavingEtapa] = useState(false);

  const showSuccess = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  // 1. Manejar foto oficial del grupo
  const handleUpdateGroupPhoto = async (url: string) => {
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

  // 3. Guardar Historia General de la Agrupación
  const handleSaveHistoria = async (data: {
    contenidoMd: string;
    fuentes: FuentePericialItem[];
    estado: EstadoEditorial;
  }) => {
    setHistoriaContent(data.contenidoMd);
    setHistoriaFuentes(data.fuentes);
    setHistoriaEstado(data.estado);

    const { error } = await supabase
      .from("grupo_historias")
      .upsert(
        {
          id_grupo: group.id,
          contenido_md: data.contenidoMd,
          fuentes: data.fuentes as unknown as import("@/types/database").Json,
          estado: data.estado,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id_grupo" }
      );

    if (error) {
      console.warn("Aviso al guardar grupo_historias:", error.message);
    }

    showSuccess(`Historia de ${group.name} guardada como [${data.estado.toUpperCase()}].`);
  };

  // 4. Guardar / Editar Etapa Cronológica
  const handleSaveEtapa = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEtapa || !editingEtapa.titulo?.trim()) return;

    setIsSavingEtapa(true);
    try {
      const payload = {
        id_grupo: group.id,
        orden: Number(editingEtapa.orden) || etapas.length + 1,
        fecha_inicio: editingEtapa.fecha_inicio?.trim() || null,
        fecha_fin: editingEtapa.fecha_fin?.trim() || null,
        titulo: editingEtapa.titulo.trim(),
        id_director: editingEtapa.id_director ? Number(editingEtapa.id_director) : null,
        id_vocalista: editingEtapa.id_vocalista ? Number(editingEtapa.id_vocalista) : null,
        estilo: editingEtapa.estilo?.trim() || null,
        texto_md: editingEtapa.texto_md?.trim() || "",
      };

      if (editingEtapa.id_etapa) {
        // Actualizar
        const { error } = await supabase
          .from("grupo_etapas")
          .update(payload)
          .eq("id_etapa", editingEtapa.id_etapa);

        if (error) throw error;

        setEtapas((prev) =>
          prev
            .map((item) =>
              item.id_etapa === editingEtapa.id_etapa ? ({ ...item, ...payload } as GrupoEtapaItem) : item
            )
            .sort((a, b) => a.orden - b.orden)
        );
        showSuccess("Etapa cronológica actualizada con éxito.");
      } else {
        // Insertar
        const { data, error } = await supabase
          .from("grupo_etapas")
          .insert(payload)
          .select()
          .single();

        if (error) throw error;

        if (data) {
          setEtapas((prev) => [...prev, data as unknown as GrupoEtapaItem].sort((a, b) => a.orden - b.orden));
        }
        showSuccess("Nueva etapa cronológica agregada a la línea de tiempo.");
      }

      setEditingEtapa(null);
    } catch (err: unknown) {
      alert("Error al guardar etapa: " + (err instanceof Error ? err.message : "Desconocido"));
    } finally {
      setIsSavingEtapa(false);
    }
  };

  // 5. Eliminar Etapa Cronológica
  const handleDeleteEtapa = async (idEtapa: number, titulo: string) => {
    if (!confirm(`¿Deseas eliminar la etapa "${titulo}" de la línea de tiempo?`)) return;

    try {
      const { error } = await supabase.from("grupo_etapas").delete().eq("id_etapa", idEtapa);
      if (error) throw error;

      setEtapas((prev) => prev.filter((item) => item.id_etapa !== idEtapa));
      showSuccess(`Etapa "${titulo}" eliminada.`);
    } catch (err: unknown) {
      alert("Error al eliminar etapa: " + (err instanceof Error ? err.message : "Desconocido"));
    }
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
    const totalRequiredSides = albums.length * 2;
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
      const fn = a.formatName.toLowerCase();
      if (formatFilter === "lp" && !(fn === "lp" || a.idTipoAlbum === 2)) return false;
      if (formatFilter === "45" && !(fn === "45" || fn.includes("single") || a.idTipoAlbum === 1)) return false;
      if (formatFilter === "casete" && !(fn.includes("casete") || fn.includes("cassete") || a.idTipoAlbum === 4)) return false;
      if (formatFilter === "ep" && !(fn === "ep" || a.idTipoAlbum === 3)) return false;
      if (formatFilter === "cd" && !(fn === "cd" || a.idTipoAlbum === 5)) return false;

      const hasBoth = Boolean(a.coverUrl && a.backCoverUrl);
      if (photoFilter === "complete" && !hasBoth) return false;
      if (photoFilter === "missing" && hasBoth) return false;

      if (!searchTerm.trim()) return true;
      const q = searchTerm.toLowerCase();

      if (a.title.toLowerCase().includes(q)) return true;
      if (a.catalogNumber?.toLowerCase().includes(q)) return true;
      if (a.label?.toLowerCase().includes(q)) return true;
      if (a.year && String(a.year).includes(q)) return true;
      if (a.tracks.some((t) => t.title.toLowerCase().includes(q))) return true;

      return false;
    });
  }, [albums, formatFilter, photoFilter, searchTerm]);

  return (
    <div className="space-y-8 font-mono">
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
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
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
                <span>•</span>
                <span className="text-amber-400">
                  {etapas.length} etapas cronológicas
                </span>
              </p>
            </div>
          </div>

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

        {/* Barra de Progreso */}
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

      {/* ============================================================ */}
      {/* SELECTOR DE PESTAÑAS DE LA AGRUPACIÓN (3 PESTAÑAS)            */}
      {/* ============================================================ */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-3">
        {[
          { id: "discografia" as GroupTabType, label: "01 · Discografía y Fotos", icon: Disc3, count: albums.length },
          { id: "historia" as GroupTabType, label: "02 · Historia y Relato", icon: BookOpen, badge: historiaEstado },
          { id: "etapas" as GroupTabType, label: "03 · Etapas y Línea de Tiempo", icon: GitFork, count: etapas.length },
        ].map((tab) => {
          const isActive = activeGroupTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveGroupTab(tab.id)}
              className={cn(
                "flex items-center gap-2 rounded-xl px-4 py-2.5 font-mono text-xs font-bold transition-all cursor-pointer",
                isActive
                  ? "bg-amber-500 text-neutral-950 shadow-lg shadow-amber-500/20"
                  : "border border-white/10 bg-white/5 text-neutral-300 hover:border-white/20 hover:bg-white/10"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={cn(
                    "px-1.5 py-0.2 rounded text-[10px] font-mono",
                    isActive ? "bg-black text-amber-300" : "bg-white/10 text-neutral-400"
                  )}
                >
                  {tab.count}
                </span>
              )}
              {tab.badge && (
                <span
                  className={cn(
                    "px-1.5 py-0.2 rounded text-[10px] font-mono uppercase font-black",
                    tab.badge === "publicado" ? "bg-emerald-500 text-black" : "bg-amber-600 text-white"
                  )}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ============================================================ */}
      {/* PESTAÑA 1: DISCOGRAFÍA Y FOTOS                               */}
      {/* ============================================================ */}
      {activeGroupTab === "discografia" && (
        <div className="space-y-6">
          {/* Filtros por Formato Físico */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: "all" as const, label: `Todos (${formatCounts.all})`, icon: Layers },
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

            {/* Buscador y Filtro de Fotos */}
            <GlassCard className="p-3.5 flex flex-wrap items-center justify-between gap-3">
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
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

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
                Pipeline WebP automático activo
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

                  return (
                    <GlassCard key={album.id} className="p-5 flex flex-col justify-between gap-5 border border-white/10">
                      <div>
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span
                                className={cn(
                                  "font-mono text-[10px] font-bold px-2 py-0.5 rounded uppercase",
                                  isSingle
                                    ? "bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"
                                    : "bg-amber-500/10 text-amber-300 border border-amber-500/20"
                                )}
                              >
                                {album.formatName}
                              </span>
                              {album.catalogNumber && (
                                <span className="font-mono text-[11px] text-neutral-400">
                                  Cat: <strong>{album.catalogNumber}</strong>
                                </span>
                              )}
                              {album.year && (
                                <span className="font-mono text-[11px] text-neutral-400">
                                  • {album.year}
                                </span>
                              )}
                            </div>

                            <h3 className="text-base font-bold text-white tracking-tight line-clamp-2">
                              {album.title}
                            </h3>

                            {album.label && (
                              <p className="font-mono text-xs text-neutral-400">
                                Sello: {album.label}
                              </p>
                            )}
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <span
                              className={cn(
                                "h-2 w-2 rounded-full",
                                hasBoth
                                  ? "bg-emerald-400 shadow-sm shadow-emerald-400"
                                  : hasAny
                                  ? "bg-amber-400 shadow-sm shadow-amber-400"
                                  : "bg-neutral-600"
                              )}
                            />
                            <Link
                              href={`/album/${album.id}`}
                              target="_blank"
                              className="p-1.5 rounded-lg border border-white/10 bg-white/5 text-neutral-400 hover:text-white transition-colors"
                              title="Ver en vista pública"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                            </Link>
                          </div>
                        </div>
                      </div>

                      {/* Uploaders de Cara A y Cara B */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-white/10">
                        {/* Cara A */}
                        <div className="space-y-2 p-3 rounded-xl border border-white/10 bg-black/40">
                          <div className="flex items-center justify-between font-mono text-[11px]">
                            <span className="font-bold text-amber-400">{frontLabel}</span>
                            {album.coverUrl && (
                              <div className="flex items-center gap-1.5">
                                <a
                                  href={album.coverUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="rounded border border-white/10 bg-white/5 p-1 text-neutral-400 hover:text-amber-400 transition-colors"
                                >
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                                <button
                                  type="button"
                                  onClick={() => handleClearAlbumImage(album.id, "url_portada", frontLabel)}
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
                            suffix="portada"
                            currentUrl={album.coverUrl}
                            label={`Subir ${frontLabel}`}
                            onUploaded={(url) => handleUpdateAlbumImage(album.id, url, "url_portada")}
                          />
                        </div>

                        {/* Cara B */}
                        <div className="space-y-2 p-3 rounded-xl border border-white/10 bg-black/40">
                          <div className="flex items-center justify-between font-mono text-[11px]">
                            <span className="font-bold text-cyan-400">{backLabel}</span>
                            {album.backCoverUrl && (
                              <div className="flex items-center gap-1.5">
                                <a
                                  href={album.backCoverUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="rounded border border-white/10 bg-white/5 p-1 text-neutral-400 hover:text-cyan-400 transition-colors"
                                >
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                                <button
                                  type="button"
                                  onClick={() => handleClearAlbumImage(album.id, "url_contraportada", backLabel)}
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
                            suffix="contraportada"
                            currentUrl={album.backCoverUrl}
                            label={`Subir ${backLabel}`}
                            onUploaded={(url) => handleUpdateAlbumImage(album.id, url, "url_contraportada")}
                          />
                        </div>
                      </div>

                      {/* Slider Preview */}
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
      )}

      {/* ============================================================ */}
      {/* PESTAÑA 2: HISTORIA GENERAL Y RELATO (EDITOR PERICIAL)       */}
      {/* ============================================================ */}
      {activeGroupTab === "historia" && (
        <div className="space-y-4">
          <div className="border border-white/10 bg-white/[0.02] p-4 rounded-xl flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">
                Historia y Crónica General: {group.name}
              </h3>
              <p className="font-mono text-xs text-neutral-400 mt-0.5">
                Relato histórico estructurado, fuentes de investigación y estado de publicación en Genealogía.
              </p>
            </div>
            <Link
              href={`/genealogia?grupo=${group.id}`}
              target="_blank"
              className="border border-white/15 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg text-xs font-mono text-neutral-300 flex items-center gap-1.5"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>Ver en Genealogía Pública</span>
            </Link>
          </div>

          <EditorPericial
            idEntidad={group.id}
            tipoEntidad="grupo"
            codigoEntidad={`AGR-${String(group.id).padStart(3, "0")}`}
            tituloEntidad={group.name}
            initialContent={historiaContent}
            initialFuentes={historiaFuentes}
            initialEstado={historiaEstado}
            onSave={handleSaveHistoria}
          />
        </div>
      )}

      {/* ============================================================ */}
      {/* PESTAÑA 3: ETAPAS Y LÍNEA DE TIEMPO ESTRUCTURADA              */}
      {/* ============================================================ */}
      {activeGroupTab === "etapas" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-white/10 bg-white/[0.02] p-4 rounded-xl">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <GitFork className="h-4 w-4 text-amber-400" />
                Línea de Tiempo y Etapas Cronológicas ({etapas.length})
              </h3>
              <p className="font-mono text-xs text-neutral-400 mt-0.5">
                Estructura canónica de la agrupación: directores, vocalistas y estilo por período histórico.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setEditingEtapa({
                  orden: etapas.length + 1,
                  fecha_inicio: "",
                  fecha_fin: "",
                  titulo: "",
                  id_director: null,
                  id_vocalista: null,
                  estilo: "",
                  texto_md: "",
                })
              }
              className="flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/20 px-3.5 py-2 font-mono text-xs font-bold text-amber-300 hover:bg-amber-500/30 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>+ Añadir Nueva Etapa</span>
            </button>
          </div>

          {/* Formulario Modal / En Línea para Crear o Editar Etapa */}
          {editingEtapa && (
            <GlassCard className="p-6 border border-amber-500/30 bg-neutral-950/90 space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {editingEtapa.id_etapa ? "Editar Etapa Cronológica" : "Nueva Etapa Cronológica"}
                </h4>
                <button
                  type="button"
                  onClick={() => setEditingEtapa(null)}
                  className="text-neutral-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleSaveEtapa} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="font-mono text-[11px] text-neutral-300 font-bold">
                      Orden Cronológico:
                    </label>
                    <input
                      type="number"
                      value={editingEtapa.orden || 1}
                      onChange={(e) => setEditingEtapa({ ...editingEtapa, orden: Number(e.target.value) })}
                      min={1}
                      required
                      className="w-full rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[11px] text-neutral-300 font-bold">
                      Año / Fecha Inicio:
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. 1968"
                      value={editingEtapa.fecha_inicio || ""}
                      onChange={(e) => setEditingEtapa({ ...editingEtapa, fecha_inicio: e.target.value })}
                      className="w-full rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[11px] text-neutral-300 font-bold">
                      Año / Fecha Fin:
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. 1974 o Presente"
                      value={editingEtapa.fecha_fin || ""}
                      onChange={(e) => setEditingEtapa({ ...editingEtapa, fecha_fin: e.target.value })}
                      className="w-full rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-mono text-[11px] text-neutral-300 font-bold">
                      Título Canónico de la Etapa:
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. Etapa Psicodélica Instrumental"
                      value={editingEtapa.titulo || ""}
                      onChange={(e) => setEditingEtapa({ ...editingEtapa, titulo: e.target.value })}
                      required
                      className="w-full rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none font-bold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[11px] text-neutral-300 font-bold">
                      Estilo / Subgénero Característico:
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. Cumbia Costeña / Psicodélica"
                      value={editingEtapa.estilo || ""}
                      onChange={(e) => setEditingEtapa({ ...editingEtapa, estilo: e.target.value })}
                      className="w-full rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Selector de Director (referencia a personas) */}
                  <div className="space-y-1">
                    <label className="font-mono text-[11px] text-neutral-300 font-bold flex items-center gap-1.5">
                      <User className="h-3 w-3 text-amber-400" /> Director Musical (Registrado en BD):
                    </label>
                    <select
                      value={editingEtapa.id_director || ""}
                      onChange={(e) =>
                        setEditingEtapa({
                          ...editingEtapa,
                          id_director: e.target.value ? Number(e.target.value) : null,
                        })
                      }
                      className="w-full rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                    >
                      <option value="">(Sin director registrado)</option>
                      {allPersons.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} {p.nickname ? `«${p.nickname}»` : ""} (#{p.id})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Selector de Vocalista (referencia a personas) */}
                  <div className="space-y-1">
                    <label className="font-mono text-[11px] text-neutral-300 font-bold flex items-center gap-1.5">
                      <Music className="h-3 w-3 text-cyan-400" /> Vocalista Principal (Registrado en BD):
                    </label>
                    <select
                      value={editingEtapa.id_vocalista || ""}
                      onChange={(e) =>
                        setEditingEtapa({
                          ...editingEtapa,
                          id_vocalista: e.target.value ? Number(e.target.value) : null,
                        })
                      }
                      className="w-full rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                    >
                      <option value="">(Instrumental o sin vocalista registrado)</option>
                      {allPersons.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} {p.nickname ? `«${p.nickname}»` : ""} (#{p.id})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[11px] text-neutral-300 font-bold">
                    Reseña Narrativa de la Etapa:
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Descripción pericial de los acontecimientos, grabaciones cumbre y cambios de sonido..."
                    value={editingEtapa.texto_md || ""}
                    onChange={(e) => setEditingEtapa({ ...editingEtapa, texto_md: e.target.value })}
                    className="w-full rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none font-mono"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setEditingEtapa(null)}
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 font-mono text-xs text-neutral-300 hover:text-white"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isSavingEtapa}
                    className="flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2 font-mono text-xs font-bold text-neutral-950 hover:bg-amber-400 disabled:opacity-50 transition-colors"
                  >
                    <Save className="h-4 w-4" />
                    <span>{isSavingEtapa ? "Guardando..." : "Guardar Etapa"}</span>
                  </button>
                </div>
              </form>
            </GlassCard>
          )}

          {/* Listado Visual de Etapas */}
          {etapas.length === 0 ? (
            <GlassCard className="p-8 text-center space-y-2 border border-white/10">
              <Clock className="h-8 w-8 text-neutral-600 mx-auto" />
              <p className="text-white font-bold text-sm">Sin etapas cronológicas catalogadas aún</p>
              <p className="text-neutral-400 font-mono text-xs">
                Registra la primera etapa para estructurar la línea de tiempo de {group.name}.
              </p>
            </GlassCard>
          ) : (
            <div className="space-y-4">
              {etapas.map((etapa) => {
                const director = allPersons.find((p) => p.id === etapa.id_director);
                const vocalista = allPersons.find((p) => p.id === etapa.id_vocalista);

                return (
                  <GlassCard key={etapa.id_etapa || etapa.orden} className="p-5 border border-white/10 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="h-7 w-7 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center font-mono text-xs font-bold text-amber-400">
                          #{etapa.orden}
                        </span>
                        <div>
                          <h4 className="text-base font-bold text-white tracking-tight">
                            {etapa.titulo}
                          </h4>
                          <span className="font-mono text-xs text-neutral-400">
                            {etapa.fecha_inicio || "¿?"} – {etapa.fecha_fin || "Presente"}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingEtapa(etapa)}
                          className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-xs text-neutral-300 hover:text-white hover:bg-white/10"
                        >
                          Editar
                        </button>
                        {etapa.id_etapa && (
                          <button
                            type="button"
                            onClick={() => handleDeleteEtapa(etapa.id_etapa!, etapa.titulo)}
                            className="rounded-lg border border-red-500/20 bg-red-500/10 p-1 text-red-400 hover:bg-red-500/20"
                            title="Eliminar etapa"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                      <div className="p-2.5 rounded-lg border border-white/5 bg-white/[0.02]">
                        <span className="text-neutral-500 text-[10px] block uppercase">Estilo</span>
                        <span className="font-bold text-neutral-200">{etapa.estilo || "—"}</span>
                      </div>
                      <div className="p-2.5 rounded-lg border border-white/5 bg-white/[0.02]">
                        <span className="text-neutral-500 text-[10px] block uppercase">Director</span>
                        <span className="font-bold text-amber-300">
                          {director ? `${director.name}${director.nickname ? ` «${director.nickname}»` : ""}` : "—"}
                        </span>
                      </div>
                      <div className="p-2.5 rounded-lg border border-white/5 bg-white/[0.02]">
                        <span className="text-neutral-500 text-[10px] block uppercase">Vocalista</span>
                        <span className="font-bold text-cyan-300">
                          {vocalista ? `${vocalista.name}${vocalista.nickname ? ` «${vocalista.nickname}»` : ""}` : "Instrumental"}
                        </span>
                      </div>
                    </div>

                    {etapa.texto_md && (
                      <p className="font-mono text-xs text-neutral-300 pt-2 border-t border-white/5 leading-relaxed">
                        {etapa.texto_md}
                      </p>
                    )}
                  </GlassCard>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
