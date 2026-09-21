"use client";

import { useState, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import { GlassCard } from "@/components/ui/glass-card";
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
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface AdminAlbumItem {
  id: number;
  title: string;
  artist: string;
  catalogNumber?: string | null;
  year?: number | null;
  label?: string | null;
  coverUrl?: string | null;
  backCoverUrl?: string | null;
  vinylLabelUrl?: string | null;
}

export interface AdminGroupItem {
  id: number;
  name: string;
  region?: string | null;
  directorName?: string | null;
  photoUrl?: string | null;
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

export function AdminMediaManager({
  initialAlbums,
  initialGroups,
  initialPersons,
  initialLabels,
}: AdminMediaManagerProps) {
  const [activeTab, setActiveTab] = useState<TabType>("albumes");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterImageStatus, setFilterImageStatus] = useState<"all" | "with-image" | "without-image">("all");

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

  // 1. Actualizar Álbum
  const handleUpdateAlbumCover = async (id: number, url: string, field: "url_portada" | "url_contraportada" | "url_etiqueta") => {
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
      prev.map((a) => (a.id === id ? { ...a, coverUrl: field === "url_portada" ? url : a.coverUrl } : a))
    );
    showSuccess(`Imagen de álbum #${id} actualizada exitosamente.`);
  };

  const handleClearAlbumCover = async (id: number) => {
    if (!confirm("¿Deseas desvincular la portada de este álbum?")) return;
    const supabase = createClient();
    await supabase.from("albumes").update({ url_portada: null }).eq("id_album", id);
    setAlbums((prev) => prev.map((a) => (a.id === id ? { ...a, coverUrl: null } : a)));
    showSuccess(`Portada de álbum #${id} eliminada.`);
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
      if (filterImageStatus === "with-image" && !a.coverUrl) return false;
      if (filterImageStatus === "without-image" && a.coverUrl) return false;
      if (!searchTerm.trim()) return true;
      const q = searchTerm.toLowerCase();
      return (
        a.title.toLowerCase().includes(q) ||
        a.artist.toLowerCase().includes(q) ||
        a.catalogNumber?.toLowerCase().includes(q) ||
        a.label?.toLowerCase().includes(q)
      );
    });
  }, [albums, searchTerm, filterImageStatus]);

  const filteredGroups = useMemo(() => {
    return groups.filter((g) => {
      if (filterImageStatus === "with-image" && !g.photoUrl) return false;
      if (filterImageStatus === "without-image" && g.photoUrl) return false;
      if (!searchTerm.trim()) return true;
      const q = searchTerm.toLowerCase();
      return g.name.toLowerCase().includes(q) || g.region?.toLowerCase().includes(q);
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
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
          <input
            type="text"
            placeholder={`Buscar en ${activeTab}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/50 py-2.5 pl-10 pr-4 font-mono text-xs text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="text-neutral-400 hidden sm:inline">Filtrar:</span>
          {[
            { id: "all" as const, label: "Todos" },
            { id: "with-image" as const, label: "Con Imagen" },
            { id: "without-image" as const, label: "Sin Imagen" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilterImageStatus(f.id)}
              className={cn(
                "rounded-lg px-2.5 py-1 transition-colors cursor-pointer",
                filterImageStatus === f.id
                  ? "bg-white/20 text-white font-semibold"
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
            {filteredAlbums.slice(0, 40).map((album) => (
              <GlassCard key={album.id} className="p-5 flex flex-col justify-between gap-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 font-mono text-[11px] text-amber-400">
                      <span>#{album.id}</span>
                      <span>•</span>
                      <span>{album.label || "Sin Sello"}</span>
                      {album.catalogNumber && <span>({album.catalogNumber})</span>}
                    </div>
                    <h4 className="text-base font-bold text-white tracking-tight mt-0.5">
                      {album.title}
                    </h4>
                    <p className="text-xs text-neutral-300 font-medium">
                      {album.artist} {album.year ? `(${album.year})` : ""}
                    </p>
                  </div>

                  {album.coverUrl && (
                    <div className="flex items-center gap-2">
                      <a
                        href={album.coverUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border border-white/10 bg-white/5 p-1.5 text-neutral-400 hover:text-amber-400 transition-colors"
                        title="Abrir imagen original"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                      <button
                        onClick={() => handleClearAlbumCover(album.id)}
                        className="rounded-lg border border-red-500/20 bg-red-500/10 p-1.5 text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer"
                        title="Desvincular portada"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>

                <ImageUploader
                  folderPath="albumes"
                  fileId={album.id}
                  suffix="portada"
                  currentUrl={album.coverUrl}
                  label="Portada Frontal del Álbum / Single"
                  onUploaded={(url) => handleUpdateAlbumCover(album.id, url, "url_portada")}
                />
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {/* Lista de Grupos */}
      {activeTab === "grupos" && (
        <div className="space-y-4">
          <div className="font-mono text-xs text-neutral-400">
            Mostrando {filteredGroups.length} agrupaciones
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredGroups.slice(0, 40).map((group) => (
              <GlassCard key={group.id} className="p-5 flex flex-col justify-between gap-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="font-mono text-[11px] text-amber-400">#{group.id}</span>
                    <h4 className="text-base font-bold text-white tracking-tight mt-0.5">
                      {group.name}
                    </h4>
                    <p className="text-xs text-neutral-400">
                      Región: {group.region || "Perú"}
                    </p>
                  </div>

                  {group.photoUrl && (
                    <div className="flex items-center gap-2">
                      <a
                        href={group.photoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border border-white/10 bg-white/5 p-1.5 text-neutral-400 hover:text-amber-400 transition-colors"
                        title="Abrir foto"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                      <button
                        onClick={() => handleClearGroupPhoto(group.id)}
                        className="rounded-lg border border-red-500/20 bg-red-500/10 p-1.5 text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer"
                        title="Desvincular foto"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>

                <ImageUploader
                  folderPath="grupos"
                  fileId={group.id}
                  suffix="foto"
                  currentUrl={group.photoUrl}
                  label="Fotografía Oficial de la Agrupación"
                  onUploaded={(url) => handleUpdateGroupPhoto(group.id, url)}
                />
              </GlassCard>
            ))}
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
