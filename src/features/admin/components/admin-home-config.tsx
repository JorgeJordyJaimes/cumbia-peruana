"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { GlassCard } from "@/components/ui/glass-card";
import {
  Sliders,
  CheckCircle2,
  AlertCircle,
  Disc3,
  Search,
  Plus,
  Trash2,
  Sparkles,
  LayoutTemplate,
  Megaphone,
} from "lucide-react";
import type { ConfiguracionHome } from "@/types/blog";
import type { AdminAlbumItem } from "./admin-media-manager";

interface AdminHomeConfigProps {
  initialConfig: ConfiguracionHome;
  allAlbums: AdminAlbumItem[];
}

export function AdminHomeConfig({ initialConfig, allAlbums }: AdminHomeConfigProps) {
  const [config, setConfig] = useState<ConfiguracionHome>(initialConfig);
  const [albumSearch, setAlbumSearch] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const supabase = createClient();

  // Filtrar álbumes para el buscador de destacados
  const filteredAlbums = allAlbums
    .filter((album) => {
      if (!albumSearch.trim()) return false;
      const q = albumSearch.toLowerCase();
      return (
        album.title.toLowerCase().includes(q) ||
        album.artist.toLowerCase().includes(q) ||
        (album.label && album.label.toLowerCase().includes(q))
      );
    })
    .slice(0, 8);

  // Lista de álbumes actualmente seleccionados como destacados
  const selectedAlbums = config.albumes_destacados_ids
    .map((id) => allAlbums.find((a) => a.id === id))
    .filter((a): a is AdminAlbumItem => a !== undefined);

  const handleAddFeaturedAlbum = (albumId: number) => {
    if (config.albumes_destacados_ids.includes(albumId)) return;
    if (config.albumes_destacados_ids.length >= 6) {
      alert("Puedes seleccionar un máximo de 6 vinilos destacados para la vitrina principal.");
      return;
    }
    setConfig({
      ...config,
      albumes_destacados_ids: [...config.albumes_destacados_ids, albumId],
    });
    setAlbumSearch("");
  };

  const handleRemoveFeaturedAlbum = (albumId: number) => {
    setConfig({
      ...config,
      albumes_destacados_ids: config.albumes_destacados_ids.filter((id) => id !== albumId),
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    setFeedback(null);

    try {
      const { error } = await supabase
        .from("configuracion_home")
        .update({
          cintillo_texto: config.cintillo_texto,
          cintillo_activo: config.cintillo_activo,
          hero_insignia: config.hero_insignia,
          hero_titulo: config.hero_titulo,
          hero_subtitulo: config.hero_subtitulo,
          hero_boton_texto: config.hero_boton_texto,
          hero_boton_url: config.hero_boton_url,
          albumes_destacados_ids: config.albumes_destacados_ids,
          seccion_blog_activa: config.seccion_blog_activa,
          updated_at: new Date().toISOString(),
        })
        .eq("id", 1);

      if (error) throw error;

      setFeedback({
        type: "success",
        text: "¡Configuración de la Portada actualizada con éxito! Los cambios ya están visibles en la web.",
      });

      setTimeout(() => {
        setFeedback(null);
      }, 4000);
    } catch (err: unknown) {
      console.error(err);
      setFeedback({
        type: "error",
        text: err instanceof Error ? err.message : "Error al guardar la configuración en Supabase.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Notificación de Feedback */}
      {feedback && (
        <div
          className={`flex items-center gap-2 rounded-xl p-4 font-mono text-xs ${
            feedback.type === "success"
              ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-300"
              : "bg-red-500/10 border border-red-500/30 text-red-300"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="h-4 w-4 shrink-0" />
          ) : (
            <AlertCircle className="h-4 w-4 shrink-0" />
          )}
          <span>{feedback.text}</span>
        </div>
      )}

      {/* Cabecera del Personalizador */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h3 className="font-serif text-2xl font-bold text-white flex items-center gap-2">
            <Sliders className="h-5 w-5 text-amber-400" />
            Personalizador de la Portada / Home
          </h3>
          <p className="font-mono text-xs text-neutral-400">
            Modifica los textos principales, el cintillo de novedades y selecciona qué vinilos destacar.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-2.5 font-mono text-xs font-bold text-neutral-950 transition-all hover:bg-amber-400 shadow-lg shadow-amber-500/20 disabled:opacity-50"
        >
          <Sparkles className="h-4 w-4" />
          <span>{isSaving ? "Guardando..." : "Guardar Cambios"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* BLOQUE 1: Textos del Hero Principal */}
        <GlassCard variant="elevated" className="p-6 space-y-5">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <LayoutTemplate className="h-4 w-4 text-amber-400" />
            <h4 className="font-serif text-lg font-bold text-white">Hero Principal</h4>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="block font-mono text-xs text-neutral-300">
                Insignia / Etiqueta Superior
              </label>
              <input
                type="text"
                value={config.hero_insignia}
                onChange={(e) => setConfig({ ...config, hero_insignia: e.target.value })}
                placeholder="Ej: Archivo & Curaduría de Vinilos"
                className="w-full rounded-xl border border-white/10 bg-neutral-900/90 px-3.5 py-2 font-mono text-xs text-amber-300 focus:border-amber-500/60 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block font-mono text-xs text-neutral-300">
                Título Principal de la Web
              </label>
              <input
                type="text"
                value={config.hero_titulo}
                onChange={(e) => setConfig({ ...config, hero_titulo: e.target.value })}
                placeholder="Ej: El Sonido Inmortal de la Cumbia Peruana"
                className="w-full rounded-xl border border-white/10 bg-neutral-900/90 px-3.5 py-2 font-serif text-base font-bold text-white focus:border-amber-500/60 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block font-mono text-xs text-neutral-300">
                Subtítulo / Manifiesto Editorial
              </label>
              <textarea
                rows={3}
                value={config.hero_subtitulo}
                onChange={(e) => setConfig({ ...config, hero_subtitulo: e.target.value })}
                placeholder="Descripción del archivo discográfico..."
                className="w-full rounded-xl border border-white/10 bg-neutral-900/90 p-3 font-sans text-xs text-neutral-300 leading-relaxed focus:border-amber-500/60 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="block font-mono text-xs text-neutral-300">
                  Texto del Botón CTA
                </label>
                <input
                  type="text"
                  value={config.hero_boton_texto}
                  onChange={(e) => setConfig({ ...config, hero_boton_texto: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-neutral-900/90 px-3 py-2 font-mono text-xs text-neutral-200 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-mono text-xs text-neutral-300">
                  Enlace del Botón
                </label>
                <input
                  type="text"
                  value={config.hero_boton_url}
                  onChange={(e) => setConfig({ ...config, hero_boton_url: e.target.value })}
                  placeholder="#catalogo o /blog"
                  className="w-full rounded-xl border border-white/10 bg-neutral-900/90 px-3 py-2 font-mono text-xs text-neutral-200 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </GlassCard>

        {/* BLOQUE 2: Cintillo Superior & Módulos */}
        <div className="space-y-6">
          {/* Cintillo Superior */}
          <GlassCard variant="elevated" className="p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Megaphone className="h-4 w-4 text-amber-400" />
                <h4 className="font-serif text-lg font-bold text-white">Cintillo Superior de Avisos</h4>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.cintillo_activo}
                  onChange={(e) => setConfig({ ...config, cintillo_activo: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
                <span className="ml-2 font-mono text-xs text-neutral-400">
                  {config.cintillo_activo ? "Visible" : "Oculto"}
                </span>
              </label>
            </div>

            <div className="space-y-1.5">
              <label className="block font-mono text-xs text-neutral-300">
                Texto del Mensaje Rotativo
              </label>
              <textarea
                rows={2}
                value={config.cintillo_texto}
                onChange={(e) => setConfig({ ...config, cintillo_texto: e.target.value })}
                placeholder="Ej: CATÁLOGO HISTÓRICO // EDICIONES DE COLECCIÓN..."
                className="w-full rounded-xl border border-white/10 bg-neutral-900/90 p-3 font-mono text-xs text-neutral-200 focus:border-amber-500/60 focus:outline-none"
              />
            </div>
          </GlassCard>

          {/* Módulo de Blog en Home */}
          <GlassCard variant="elevated" className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-serif text-lg font-bold text-white">
                  Sección de Crónicas en el Home
                </h4>
                <p className="font-mono text-xs text-neutral-400">
                  Muestra las últimas notas históricas publicadas del blog directamente en la portada.
                </p>
              </div>

              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={config.seccion_blog_activa}
                  onChange={(e) => setConfig({ ...config, seccion_blog_activa: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
              </label>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* BLOQUE 3: Curaduría de Vinilos Destacados (Vitrina) */}
      <GlassCard variant="elevated" className="p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h4 className="font-serif text-xl font-bold text-white flex items-center gap-2">
              <Disc3 className="h-5 w-5 text-amber-400" />
              Vitrina de Vinilos Destacados
            </h4>
            <p className="font-mono text-xs text-neutral-400">
              Selecciona hasta 6 vinilos de tu colección para que aparezcan en los primeros lugares destacados del Home.
            </p>
          </div>

          <span className="font-mono text-xs text-amber-400 font-semibold px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30">
            {selectedAlbums.length} / 6 seleccionados
          </span>
        </div>

        {/* Buscador de Vinilos para Destacar */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
            <input
              type="text"
              value={albumSearch}
              onChange={(e) => setAlbumSearch(e.target.value)}
              placeholder="Buscar por título, grupo o sello para agregar a la vitrina..."
              className="w-full rounded-xl border border-white/10 bg-neutral-900/90 pl-10 pr-4 py-2.5 font-mono text-xs text-white placeholder-neutral-500 focus:border-amber-500/60 focus:outline-none"
            />
          </div>

          {/* Resultados de Búsqueda Flotantes */}
          {filteredAlbums.length > 0 && (
            <div className="rounded-xl border border-white/10 bg-neutral-950 p-2 space-y-1 max-h-60 overflow-y-auto shadow-2xl">
              {filteredAlbums.map((item) => {
                const isAlreadySelected = config.albumes_destacados_ids.includes(item.id);
                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors font-mono text-xs"
                  >
                    <div className="flex items-center gap-3 truncate">
                      <div className="h-8 w-8 rounded bg-neutral-900 border border-white/10 shrink-0 overflow-hidden flex items-center justify-center">
                        {item.coverUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={item.coverUrl} alt="" className="h-full w-full object-cover" />
                        ) : (
                          <Disc3 className="h-4 w-4 text-neutral-600" />
                        )}
                      </div>
                      <div className="truncate">
                        <p className="text-white font-serif truncate">{item.title}</p>
                        <p className="text-[11px] text-neutral-400">{item.artist} {item.year ? `(${item.year})` : ""}</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAddFeaturedAlbum(item.id)}
                      disabled={isAlreadySelected}
                      className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] transition-colors ${
                        isAlreadySelected
                          ? "bg-white/5 text-neutral-500 cursor-not-allowed"
                          : "bg-amber-500 text-neutral-950 font-bold hover:bg-amber-400"
                      }`}
                    >
                      <Plus className="h-3 w-3" />
                      <span>{isAlreadySelected ? "Agregado" : "Destacar"}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Álbumes Actualmente Destacados */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
          {selectedAlbums.map((album) => (
            <div
              key={album.id}
              className="flex items-center justify-between p-3 rounded-xl border border-amber-500/20 bg-amber-500/5 font-mono text-xs"
            >
              <div className="flex items-center gap-3 truncate">
                <div className="h-10 w-10 rounded-lg bg-neutral-900 border border-white/10 shrink-0 overflow-hidden flex items-center justify-center">
                  {album.coverUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={album.coverUrl} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <Disc3 className="h-5 w-5 text-amber-500/40" />
                  )}
                </div>
                <div className="truncate">
                  <p className="font-serif font-bold text-white truncate">{album.title}</p>
                  <p className="text-[11px] text-neutral-400 truncate">{album.artist}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleRemoveFeaturedAlbum(album.id)}
                className="rounded-lg p-1.5 text-neutral-400 hover:text-red-400 hover:bg-red-500/10 transition-colors shrink-0 ml-2"
                title="Quitar de destacados"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
