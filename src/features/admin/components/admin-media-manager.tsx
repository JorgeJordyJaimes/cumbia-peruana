"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { ImageUploader } from "@/features/storage/components/image-uploader";
import {
  Search,
  Disc3,
  Users,
  User,
  Building2,
  ExternalLink,
  Trash2,
  CheckCircle2,
  ArrowRight,
  X,
  Sparkles,
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
type FilterImageStatus = "all" | "with-image" | "without-image" | "both-sides" | "with-discography";

export function AdminMediaManager({
  initialAlbums,
  initialGroups,
  initialPersons,
  initialLabels,
}: AdminMediaManagerProps) {
  const [activeTab, setActiveTab] = useState<TabType>("albumes");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterImageStatus, setFilterImageStatus] = useState<FilterImageStatus>("all");
  const [notification, setNotification] = useState<string | null>(null);

  const [albums, setAlbums] = useState<AdminAlbumItem[]>(initialAlbums);
  const [groups, setGroups] = useState<AdminGroupItem[]>(initialGroups);
  const [persons, setPersons] = useState<AdminPersonItem[]>(initialPersons);
  const [labels, setLabels] = useState<AdminLabelItem[]>(initialLabels);

  const supabase = createClient();

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Handlers para Álbumes
  const handleUpdateAlbumCover = async (albumId: number, url: string, field: "url_portada" | "url_contraportada") => {
    const updatePayload = field === "url_portada" ? { url_portada: url } : { url_contraportada: url };
    const { error } = await supabase
      .from("albumes")
      .update(updatePayload)
      .eq("id_album", albumId);

    if (error) {
      alert(`Error al actualizar carátula: ${error.message}`);
      return;
    }

    setAlbums((prev) =>
      prev.map((a) =>
        a.id === albumId
          ? {
              ...a,
              ...(field === "url_portada" ? { coverUrl: url } : { backCoverUrl: url }),
            }
          : a
      )
    );
    showNotification(`Carátula guardada correctamente para el álbum #${albumId}`);
  };

  const handleClearAlbumImage = async (albumId: number, field: "url_portada" | "url_contraportada", label: string) => {
    if (!confirm(`¿Estás seguro de desvincular la ${label} del álbum #${albumId}? La imagen física permanecerá en el bucket hasta que se sobrescriba.`)) {
      return;
    }

    const clearPayload = field === "url_portada" ? { url_portada: null } : { url_contraportada: null };
    const { error } = await supabase
      .from("albumes")
      .update(clearPayload)
      .eq("id_album", albumId);

    if (error) {
      alert(`Error al eliminar carátula: ${error.message}`);
      return;
    }

    setAlbums((prev) =>
      prev.map((a) =>
        a.id === albumId
          ? {
              ...a,
              ...(field === "url_portada" ? { coverUrl: null } : { backCoverUrl: null }),
            }
          : a
      )
    );
    showNotification(`${label} desvinculada exitosamente.`);
  };

  // Handlers para Grupos
  const handleUpdateGroupPhoto = async (groupId: number, url: string) => {
    const { error } = await supabase
      .from("grupos")
      .update({ url_foto: url })
      .eq("id_grupo", groupId);

    if (error) {
      alert(`Error al actualizar foto: ${error.message}`);
      return;
    }

    setGroups((prev) =>
      prev.map((g) => (g.id === groupId ? { ...g, photoUrl: url } : g))
    );
    showNotification(`Foto oficial guardada para la agrupación #${groupId}`);
  };

  const handleClearGroupPhoto = async (groupId: number) => {
    if (!confirm(`¿Estás seguro de desvincular la foto del grupo #${groupId}?`)) return;

    const { error } = await supabase
      .from("grupos")
      .update({ url_foto: null })
      .eq("id_grupo", groupId);

    if (error) {
      alert(`Error al eliminar foto: ${error.message}`);
      return;
    }

    setGroups((prev) =>
      prev.map((g) => (g.id === groupId ? { ...g, photoUrl: null } : g))
    );
    showNotification("Foto de agrupación desvinculada.");
  };

  // Handlers para Personas
  const handleUpdatePersonPhoto = async (personId: number, url: string) => {
    const { error } = await supabase
      .from("personas")
      .update({ url_foto: url })
      .eq("id_persona", personId);

    if (error) {
      alert(`Error al actualizar foto: ${error.message}`);
      return;
    }

    setPersons((prev) =>
      prev.map((p) => (p.id === personId ? { ...p, photoUrl: url } : p))
    );
    showNotification(`Foto guardada para persona #${personId}`);
  };

  const handleClearPersonPhoto = async (personId: number) => {
    if (!confirm(`¿Estás seguro de desvincular la foto de la persona #${personId}?`)) return;

    const { error } = await supabase
      .from("personas")
      .update({ url_foto: null })
      .eq("id_persona", personId);

    if (error) {
      alert(`Error al eliminar foto: ${error.message}`);
      return;
    }

    setPersons((prev) =>
      prev.map((p) => (p.id === personId ? { ...p, photoUrl: null } : p))
    );
    showNotification("Foto de persona desvinculada.");
  };

  // Handlers para Sellos
  const handleUpdateLabelLogo = async (labelId: number, url: string) => {
    const { error } = await supabase
      .from("sellos_discograficos")
      .update({ url_logo: url })
      .eq("id_sello", labelId);

    if (error) {
      alert(`Error al actualizar logo: ${error.message}`);
      return;
    }

    setLabels((prev) =>
      prev.map((l) => (l.id === labelId ? { ...l, logoUrl: url } : l))
    );
    showNotification(`Logo guardado para el sello #${labelId}`);
  };

  const handleClearLabelLogo = async (labelId: number) => {
    if (!confirm(`¿Estás seguro de desvincular el logotipo del sello #${labelId}?`)) return;

    const { error } = await supabase
      .from("sellos_discograficos")
      .update({ url_logo: null })
      .eq("id_sello", labelId);

    if (error) {
      alert(`Error al eliminar logo: ${error.message}`);
      return;
    }

    setLabels((prev) =>
      prev.map((l) => (l.id === labelId ? { ...l, logoUrl: null } : l))
    );
    showNotification("Logotipo de sello desvinculado.");
  };

  // Filtros de búsqueda
  const filteredAlbums = useMemo(() => {
    return albums.filter((a) => {
      const hasBoth = Boolean(a.coverUrl && a.backCoverUrl);
      const hasAny = Boolean(a.coverUrl || a.backCoverUrl);

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
    <div className="space-y-6 font-mono text-xs">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 border-2 border-[#1F1305] bg-[#10B981] text-white px-4 py-3 font-mono text-xs font-black shadow-[4px_4px_0px_#1F1305] flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* Tabs Navigation Neo-Brutalista */}
      <div className="flex flex-wrap items-center gap-2 border-b-2 border-[#1F1305] pb-4">
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
                "flex items-center gap-2 border-2 border-[#1F1305] px-4 py-2 font-mono text-xs font-black transition-all cursor-pointer shadow-[2px_2px_0px_#1F1305]",
                isActive
                  ? "bg-[#1F1305] text-[#EDE0D0] shadow-[2px_2px_0px_#E80000]"
                  : "bg-white text-[#1F1305] hover:bg-[#EDE0D0]"
              )}
            >
              <Icon className={cn("h-4 w-4", isActive ? "text-[#F8C800]" : "text-[#E80000]")} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Barra de Búsqueda y Filtros de Estado */}
      <div className="border-2 border-[#1F1305] bg-white p-4 shadow-[4px_4px_0px_#1F1305] flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 min-w-[260px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1F1305]/60" />
          <input
            type="text"
            placeholder={
              activeTab === "grupos"
                ? "Buscar agrupación (nombre, región, director, ID)..."
                : `Buscar en ${activeTab}...`
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border-2 border-[#1F1305] bg-[#FAF8F5] py-2.5 pl-10 pr-9 font-mono text-xs text-[#1F1305] placeholder-[#5A5245]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E80000]"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5A5245] hover:text-[#E80000] cursor-pointer"
              title="Limpiar búsqueda"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
          <span className="text-[#5A5245] font-bold text-[11px] hidden sm:inline">Filtrar:</span>
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
                "border border-[#1F1305] px-2.5 py-1 text-xs font-bold font-mono transition-colors cursor-pointer",
                filterImageStatus === f.id
                  ? "bg-[#1F1305] text-[#EDE0D0] shadow-[1px_1px_0px_#1F1305]"
                  : "bg-[#EDE0D0] text-[#1F1305] hover:bg-white"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de Álbumes */}
      {activeTab === "albumes" && (
        <div className="space-y-4">
          <div className="font-mono text-xs font-bold text-[#5A5245]">
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
                <div key={album.id} className="border-2 border-[#1F1305] bg-white p-5 flex flex-col justify-between gap-4 shadow-[4px_4px_0px_#1F1305]">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
                        <span className="border border-[#1F1305] bg-[#F8C800] text-[#1F1305] px-1.5 py-0.2 font-black">#{album.id}</span>
                        <span className="text-[#5A5245]">•</span>
                        <span className="text-[#1F1305] font-bold">{album.label || "Sin Sello"}</span>
                        {album.catalogNumber && (
                          <span className="text-[#5A5245] font-bold">({album.catalogNumber})</span>
                        )}
                        <span className="border border-[#1F1305] bg-[#EDE0D0] px-2 py-0.2 text-[10px] text-[#1F1305] font-black font-mono">
                          {album.format || (isSingle ? "Single 45 RPM" : "LP 33 RPM")}
                        </span>
                      </div>
                      <h4 className="text-xl font-bold font-cooper text-[#1F1305] tracking-tight mt-1">
                        {album.title}
                      </h4>
                      <p className="text-xs text-[#5A5245] font-bold font-mono">
                        {album.artist} {album.year ? `(${album.year})` : ""}
                      </p>
                    </div>

                    {/* Badge de estado de fotos */}
                    <div className="shrink-0 text-right">
                      {hasBoth ? (
                        <span className="inline-flex items-center gap-1 font-mono text-[10px] font-black text-white border border-[#1F1305] bg-[#10B981] px-2 py-0.5 shadow-[1px_1px_0px_#1F1305]">
                          <CheckCircle2 className="h-3 w-3" /> 2/2 Caras
                        </span>
                      ) : hasAny ? (
                        <span className="inline-flex items-center gap-1 font-mono text-[10px] font-black text-[#1F1305] border border-[#1F1305] bg-[#F8C800] px-2 py-0.5 shadow-[1px_1px_0px_#1F1305]">
                          1/2 Caras
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 font-mono text-[10px] font-black text-[#5A5245] border border-[#1F1305] bg-[#EDE0D0] px-2 py-0.5 shadow-[1px_1px_0px_#1F1305]">
                          Sin fotos
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Zonas de Carga Dual (Cara A / Portada + Cara B / Contraportada) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-3 border-t-2 border-[#1F1305]/15">
                    {/* Cara A / Portada */}
                    <div className="space-y-2 p-3 border border-[#1F1305] bg-[#FAF8F5]">
                      <div className="flex items-center justify-between text-xs font-mono font-bold">
                        <span className="text-[#1F1305] flex items-center gap-1.5 font-black">
                          <span className="w-2.5 h-2.5 border border-[#1F1305] bg-[#E80000]" />
                          {frontLabel}
                        </span>
                        {album.coverUrl && (
                          <div className="flex items-center gap-1.5">
                            <a
                              href={album.coverUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="border border-[#1F1305] bg-[#EDE0D0] p-1 text-[#1F1305] hover:bg-white transition-colors"
                              title={`Abrir ${frontLabel}`}
                            >
                              <ExternalLink className="h-3 w-3" />
                            </a>
                            <button
                              type="button"
                              onClick={() => handleClearAlbumImage(album.id, "url_portada", frontLabel)}
                              className="border border-[#1F1305] bg-[#FEE2E2] p-1 text-[#991B1B] hover:bg-[#E80000] hover:text-white transition-colors cursor-pointer"
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
                    <div className="space-y-2 p-3 border border-[#1F1305] bg-[#FAF8F5]">
                      <div className="flex items-center justify-between text-xs font-mono font-bold">
                        <span className="text-[#1F1305] flex items-center gap-1.5 font-black">
                          <span className="w-2.5 h-2.5 border border-[#1F1305] bg-[#F1730C]" />
                          {backLabel}
                        </span>
                        {album.backCoverUrl && (
                          <div className="flex items-center gap-1.5">
                            <a
                              href={album.backCoverUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="border border-[#1F1305] bg-[#EDE0D0] p-1 text-[#1F1305] hover:bg-white transition-colors"
                              title={`Abrir ${backLabel}`}
                            >
                              <ExternalLink className="h-3 w-3" />
                            </a>
                            <button
                              type="button"
                              onClick={() => handleClearAlbumImage(album.id, "url_contraportada", backLabel)}
                              className="border border-[#1F1305] bg-[#FEE2E2] p-1 text-[#991B1B] hover:bg-[#E80000] hover:text-white transition-colors cursor-pointer"
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
                    <div className="pt-2 border-t-2 border-[#1F1305]/15">
                      <details className="group/preview">
                        <summary className="font-mono text-[11px] font-black text-[#E80000] hover:text-[#1F1305] cursor-pointer list-none flex items-center justify-between py-1">
                          <span>🔍 Probar Visor Deslizable ({frontLabel} ↔ {backLabel})</span>
                          <span className="text-[#5A5245] group-open/preview:rotate-180 transition-transform">▼</span>
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
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Lista de Grupos */}
      {activeTab === "grupos" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between font-mono text-xs font-bold text-[#5A5245]">
            <span>Mostrando {filteredGroups.length} agrupaciones</span>
            <span className="text-[11px]">Haz clic en &quot;Entrar a fotos&quot; para ver la discografía completa</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredGroups.slice(0, 40).map((group) => {
              const hasDiscography = Boolean(group.totalAlbums && group.totalAlbums > 0);

              return (
                <div
                  key={group.id}
                  className="border-2 border-[#1F1305] bg-white p-5 flex flex-col justify-between gap-4 shadow-[4px_4px_0px_#1F1305] transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="border border-[#1F1305] bg-[#F8C800] text-[#1F1305] px-1.5 py-0.2 font-mono text-[11px] font-black">#{group.id}</span>
                        {group.region && (
                          <span className="font-mono text-[11px] text-[#5A5245] font-bold">
                            • {group.region}
                          </span>
                        )}
                        {group.directorName && (
                          <span className="font-mono text-[11px] text-[#5A5245] font-bold">
                            • Dir: {group.directorName}
                          </span>
                        )}
                      </div>
                      <h4 className="text-xl font-bold font-cooper text-[#1F1305] tracking-tight mt-1 truncate">
                        {group.name}
                      </h4>

                      {/* Resumen de Discografía */}
                      <div className="pt-1 flex flex-wrap items-center gap-1.5 font-mono text-xs">
                        {hasDiscography ? (
                          <>
                            <span className="inline-flex items-center gap-1 border border-[#1F1305] bg-[#EDE0D0] px-2 py-0.5 text-[11px] font-black text-[#1F1305]">
                              <Disc3 className="h-3 w-3 text-[#E80000]" />
                              {group.totalAlbums} {group.totalAlbums === 1 ? "lanzamiento" : "lanzamientos"}
                            </span>
                            {Boolean(group.lpsCount) && (
                              <span className="border border-[#1F1305] bg-white px-1.5 py-0.5 text-[10px] font-bold text-[#1F1305]">
                                {group.lpsCount} LPs
                              </span>
                            )}
                            {Boolean(group.singlesCount) && (
                              <span className="border border-[#1F1305] bg-[#FAF8F5] px-1.5 py-0.5 text-[10px] font-bold text-[#1F1305]">
                                {group.singlesCount} Singles 45s
                              </span>
                            )}
                            {Boolean(group.casetesCount) && (
                              <span className="border border-[#1F1305] bg-[#FAF8F5] px-1.5 py-0.5 text-[10px] font-bold text-[#1F1305]">
                                {group.casetesCount} Casetes
                              </span>
                            )}
                            {Boolean(group.epsCount) && (
                              <span className="border border-[#1F1305] bg-[#FAF8F5] px-1.5 py-0.5 text-[10px] font-bold text-[#1F1305]">
                                {group.epsCount} EPs
                              </span>
                            )}
                            {Boolean(group.cdsCount) && (
                              <span className="border border-[#1F1305] bg-[#FAF8F5] px-1.5 py-0.5 text-[10px] font-bold text-[#1F1305]">
                                {group.cdsCount} CDs
                              </span>
                            )}
                          </>
                        ) : (
                          <span className="text-[11px] text-[#5A5245] font-bold">
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
                          className="border border-[#1F1305] bg-[#EDE0D0] p-1.5 text-[#1F1305] hover:bg-white transition-colors"
                          title="Abrir foto oficial"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                        <button
                          onClick={() => handleClearGroupPhoto(group.id)}
                          className="border border-[#1F1305] bg-[#FEE2E2] p-1.5 text-[#991B1B] hover:bg-[#E80000] hover:text-white transition-colors cursor-pointer"
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
                    className="w-full inline-flex items-center justify-between gap-2 border-2 border-[#1F1305] bg-[#F8C800] px-4 py-2.5 font-mono text-xs font-black text-[#1F1305] hover:bg-[#1F1305] hover:text-[#EDE0D0] transition-all shadow-[2px_2px_0px_#1F1305] active:translate-x-0.5 active:translate-y-0.5 group/btn"
                  >
                    <span className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-[#E80000] group-hover/btn:text-[#F8C800] transition-colors" />
                      <span>Entrar a gestionar fotos de discografía ({group.totalAlbums || 0})</span>
                    </span>
                    <ArrowRight className="h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform" />
                  </Link>

                  {/* Uploader Rápido de Foto del Grupo */}
                  <div className="pt-2 border-t-2 border-[#1F1305]/15">
                    <ImageUploader
                      folderPath="grupos"
                      fileId={group.id}
                      suffix="foto"
                      currentUrl={group.photoUrl}
                      label="Fotografía Oficial de la Agrupación (WebP)"
                      onUploaded={(url) => handleUpdateGroupPhoto(group.id, url)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Lista de Personas */}
      {activeTab === "personas" && (
        <div className="space-y-4">
          <div className="font-mono text-xs font-bold text-[#5A5245]">
            Mostrando {filteredPersons.length} personas
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredPersons.slice(0, 40).map((person) => (
              <div key={person.id} className="border-2 border-[#1F1305] bg-white p-5 flex flex-col justify-between gap-4 shadow-[4px_4px_0px_#1F1305]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="border border-[#1F1305] bg-[#EDE0D0] px-1.5 py-0.2 font-mono text-[11px] font-black text-[#1F1305]">#{person.id}</span>
                    <h4 className="text-xl font-bold font-cooper text-[#1F1305] tracking-tight mt-1">
                      {person.name}
                    </h4>
                    {person.nickname && (
                      <p className="text-xs text-[#E80000] font-bold font-mono">
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
                        className="border border-[#1F1305] bg-[#EDE0D0] p-1.5 text-[#1F1305] hover:bg-white transition-colors"
                        title="Abrir foto"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                      <button
                        onClick={() => handleClearPersonPhoto(person.id)}
                        className="border border-[#1F1305] bg-[#FEE2E2] p-1.5 text-[#991B1B] hover:bg-[#E80000] hover:text-white transition-colors cursor-pointer"
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

                <div className="pt-2 border-t-2 border-[#1F1305]/15 flex items-center justify-between gap-2">
                  <Link
                    href={`/admin/persona/${person.id}`}
                    className="flex-1 flex items-center justify-center gap-1.5 border-2 border-[#1F1305] bg-[#EDE0D0] py-2 font-mono text-xs font-black text-[#1F1305] hover:bg-[#1F1305] hover:text-white transition-all shadow-[2px_2px_0px_#1F1305]"
                  >
                    <span>Ficha Pericial &amp; Redacción</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lista de Sellos */}
      {activeTab === "sellos" && (
        <div className="space-y-4">
          <div className="font-mono text-xs font-bold text-[#5A5245]">
            Mostrando {filteredLabels.length} sellos discográficos
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredLabels.slice(0, 40).map((label) => (
              <div key={label.id} className="border-2 border-[#1F1305] bg-white p-5 flex flex-col justify-between gap-4 shadow-[4px_4px_0px_#1F1305]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="border border-[#1F1305] bg-[#EDE0D0] px-1.5 py-0.2 font-mono text-[11px] font-black text-[#1F1305]">#{label.id}</span>
                    <h4 className="text-xl font-bold font-cooper text-[#1F1305] tracking-tight mt-1">
                      {label.name}
                    </h4>
                    <p className="text-xs text-[#5A5245] font-bold font-mono">
                      País: {label.country || "Perú"}
                    </p>
                  </div>

                  {label.logoUrl && (
                    <div className="flex items-center gap-2">
                      <a
                        href={label.logoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-[#1F1305] bg-[#EDE0D0] p-1.5 text-[#1F1305] hover:bg-white transition-colors"
                        title="Abrir logo"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                      <button
                        onClick={() => handleClearLabelLogo(label.id)}
                        className="border border-[#1F1305] bg-[#FEE2E2] p-1.5 text-[#991B1B] hover:bg-[#E80000] hover:text-white transition-colors cursor-pointer"
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
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
