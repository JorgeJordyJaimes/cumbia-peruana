"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
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
    <div className="space-y-8 font-mono text-xs">
      {/* Notificación de Feedback */}
      {feedback && (
        <div
          className={`flex items-center gap-2 border-2 border-[#1F1305] p-4 font-mono text-xs font-black shadow-[4px_4px_0px_#1F1305] ${
            feedback.type === "success"
              ? "bg-[#10B981] text-white"
              : "bg-[#FEE2E2] text-[#991B1B]"
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
      <div className="border-2 border-[#1F1305] bg-[#EDE0D0] p-6 shadow-[6px_6px_0px_#1F1305] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="font-cooper text-2xl sm:text-3xl font-black text-[#1F1305] flex items-center gap-2">
            <Sliders className="h-6 w-6 text-[#E80000]" />
            Personalizador de la Portada / Home
          </h3>
          <p className="font-mono text-xs text-[#5A5245] font-bold">
            Modifica los textos principales, el cintillo de novedades y selecciona qué vinilos destacar.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex items-center gap-2 border-2 border-[#1F1305] bg-[#F8C800] px-6 py-2.5 font-mono text-xs font-black text-[#1F1305] transition-all hover:bg-[#1F1305] hover:text-[#EDE0D0] shadow-[3px_3px_0px_#1F1305] active:translate-x-0.5 active:translate-y-0.5 disabled:opacity-50 cursor-pointer"
        >
          <Sparkles className="h-4 w-4" />
          <span>{isSaving ? "Guardando..." : "Guardar Cambios"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* BLOQUE 1: Textos del Hero Principal */}
        <div className="border-2 border-[#1F1305] bg-white p-6 space-y-5 shadow-[4px_4px_0px_#1F1305]">
          <div className="flex items-center gap-2 border-b-2 border-[#1F1305] pb-3">
            <LayoutTemplate className="h-4 w-4 text-[#E80000]" />
            <h4 className="font-cooper text-xl font-black text-[#1F1305]">Hero Principal</h4>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="block font-mono text-xs font-bold text-[#5A5245]">
                Insignia / Etiqueta Superior
              </label>
              <input
                type="text"
                value={config.hero_insignia}
                onChange={(e) => setConfig({ ...config, hero_insignia: e.target.value })}
                placeholder="Ej: Archivo & Curaduría de Vinilos"
                className="w-full border-2 border-[#1F1305] bg-[#FAF8F5] px-3.5 py-2 font-mono text-xs font-bold text-[#F1730C] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E80000]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block font-mono text-xs font-bold text-[#5A5245]">
                Título Principal de la Web
              </label>
              <input
                type="text"
                value={config.hero_titulo}
                onChange={(e) => setConfig({ ...config, hero_titulo: e.target.value })}
                placeholder="Ej: El Sonido Inmortal de la Cumbia Peruana"
                className="w-full border-2 border-[#1F1305] bg-[#FAF8F5] px-3.5 py-2 font-cooper text-base font-black text-[#1F1305] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E80000]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block font-mono text-xs font-bold text-[#5A5245]">
                Subtítulo / Manifiesto Editorial
              </label>
              <textarea
                rows={3}
                value={config.hero_subtitulo}
                onChange={(e) => setConfig({ ...config, hero_subtitulo: e.target.value })}
                placeholder="Descripción del archivo discográfico..."
                className="w-full border-2 border-[#1F1305] bg-[#FAF8F5] p-3 font-mono text-xs text-[#1F1305] leading-relaxed focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E80000]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="block font-mono text-xs font-bold text-[#5A5245]">
                  Texto del Botón CTA
                </label>
                <input
                  type="text"
                  value={config.hero_boton_texto}
                  onChange={(e) => setConfig({ ...config, hero_boton_texto: e.target.value })}
                  className="w-full border-2 border-[#1F1305] bg-[#FAF8F5] px-3 py-2 font-mono text-xs font-bold text-[#1F1305] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E80000]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-mono text-xs font-bold text-[#5A5245]">
                  Enlace del Botón
                </label>
                <input
                  type="text"
                  value={config.hero_boton_url}
                  onChange={(e) => setConfig({ ...config, hero_boton_url: e.target.value })}
                  placeholder="#catalogo o /blog"
                  className="w-full border-2 border-[#1F1305] bg-[#FAF8F5] px-3 py-2 font-mono text-xs font-bold text-[#1F1305] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E80000]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* BLOQUE 2: Cintillo Superior & Módulos */}
        <div className="space-y-6">
          {/* Cintillo Superior */}
          <div className="border-2 border-[#1F1305] bg-white p-6 space-y-4 shadow-[4px_4px_0px_#1F1305]">
            <div className="flex items-center justify-between border-b-2 border-[#1F1305] pb-3">
              <div className="flex items-center gap-2">
                <Megaphone className="h-4 w-4 text-[#F1730C]" />
                <h4 className="font-cooper text-xl font-black text-[#1F1305]">Cintillo Superior de Avisos</h4>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.cintillo_activo}
                  onChange={(e) => setConfig({ ...config, cintillo_activo: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#EDE0D0] border-2 border-[#1F1305] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-[#1F1305] after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:border-2 after:border-[#1F1305] after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#10B981]"></div>
                <span className="ml-2 font-mono text-xs font-bold text-[#1F1305]">
                  {config.cintillo_activo ? "Visible" : "Oculto"}
                </span>
              </label>
            </div>

            <div className="space-y-1.5">
              <label className="block font-mono text-xs font-bold text-[#5A5245]">
                Texto del Mensaje Rotativo
              </label>
              <textarea
                rows={2}
                value={config.cintillo_texto}
                onChange={(e) => setConfig({ ...config, cintillo_texto: e.target.value })}
                placeholder="Ej: CATÁLOGO HISTÓRICO // EDICIONES DE COLECCIÓN..."
                className="w-full border-2 border-[#1F1305] bg-[#FAF8F5] p-3 font-mono text-xs font-bold text-[#1F1305] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E80000]"
              />
            </div>
          </div>

          {/* Módulo de Blog en Home */}
          <div className="border-2 border-[#1F1305] bg-white p-6 space-y-4 shadow-[4px_4px_0px_#1F1305]">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-cooper text-xl font-black text-[#1F1305]">
                  Sección de Crónicas en el Home
                </h4>
                <p className="font-mono text-xs text-[#5A5245] font-bold">
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
                <div className="w-11 h-6 bg-[#EDE0D0] border-2 border-[#1F1305] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-[#1F1305] after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:border-2 after:border-[#1F1305] after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#10B981]"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* BLOQUE 3: Curaduría de Vinilos Destacados (Vitrina) */}
      <div className="border-2 border-[#1F1305] bg-white p-6 sm:p-8 space-y-6 shadow-[4px_4px_0px_#1F1305]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-[#1F1305] pb-4">
          <div>
            <h4 className="font-cooper text-2xl font-black text-[#1F1305] flex items-center gap-2">
              <Disc3 className="h-5 w-5 text-[#E80000]" />
              Vitrina de Vinilos Destacados
            </h4>
            <p className="font-mono text-xs text-[#5A5245] font-bold">
              Selecciona hasta 6 vinilos de tu colección para que aparezcan en los primeros lugares destacados del Home.
            </p>
          </div>

          <span className="font-mono text-xs font-black px-3 py-1 border border-[#1F1305] bg-[#F8C800] text-[#1F1305] shadow-[2px_2px_0px_#1F1305]">
            {selectedAlbums.length} / 6 seleccionados
          </span>
        </div>

        {/* Buscador de Vinilos para Destacar */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1F1305]/60" />
            <input
              type="text"
              value={albumSearch}
              onChange={(e) => setAlbumSearch(e.target.value)}
              placeholder="Buscar por título, grupo o sello para agregar a la vitrina..."
              className="w-full border-2 border-[#1F1305] bg-[#FAF8F5] pl-10 pr-4 py-2.5 font-mono text-xs text-[#1F1305] placeholder-[#5A5245]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E80000]"
            />
          </div>

          {/* Resultados de Búsqueda Flotantes */}
          {filteredAlbums.length > 0 && (
            <div className="border-2 border-[#1F1305] bg-[#FAF8F5] p-2 space-y-1 max-h-60 overflow-y-auto shadow-[4px_4px_0px_#1F1305]">
              {filteredAlbums.map((item) => {
                const isAlreadySelected = config.albumes_destacados_ids.includes(item.id);
                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-2 hover:bg-[#EDE0D0] transition-colors font-mono text-xs border-b border-[#1F1305]/10"
                  >
                    <div className="flex items-center gap-3 truncate">
                      <div className="h-9 w-9 border border-[#1F1305] bg-white shrink-0 overflow-hidden flex items-center justify-center">
                        {item.coverUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={item.coverUrl} alt="" className="h-full w-full object-cover" />
                        ) : (
                          <Disc3 className="h-4 w-4 text-[#5A5245]" />
                        )}
                      </div>
                      <div className="truncate">
                        <p className="text-[#1F1305] font-bold truncate">{item.title}</p>
                        <p className="text-[11px] text-[#5A5245]">{item.artist} {item.year ? `(${item.year})` : ""}</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAddFeaturedAlbum(item.id)}
                      disabled={isAlreadySelected}
                      className={`inline-flex items-center gap-1 border border-[#1F1305] px-2.5 py-1 text-[11px] font-bold font-mono transition-colors shadow-[1px_1px_0px_#1F1305] cursor-pointer ${
                        isAlreadySelected
                          ? "bg-[#EDE0D0] text-[#5A5245] cursor-not-allowed shadow-none"
                          : "bg-[#10B981] text-white hover:bg-[#1F1305]"
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
              className="flex items-center justify-between p-3 border-2 border-[#1F1305] bg-[#FAF8F5] font-mono text-xs shadow-[2px_2px_0px_#1F1305]"
            >
              <div className="flex items-center gap-3 truncate">
                <div className="h-10 w-10 border border-[#1F1305] bg-white shrink-0 overflow-hidden flex items-center justify-center">
                  {album.coverUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={album.coverUrl} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <Disc3 className="h-5 w-5 text-[#E80000]" />
                  )}
                </div>
                <div className="truncate">
                  <p className="font-bold text-[#1F1305] truncate">{album.title}</p>
                  <p className="text-[11px] text-[#5A5245] truncate">{album.artist}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleRemoveFeaturedAlbum(album.id)}
                className="border border-[#1F1305] bg-[#FEE2E2] p-1.5 text-[#991B1B] hover:bg-[#E80000] hover:text-white transition-colors shrink-0 ml-2 cursor-pointer shadow-[1px_1px_0px_#1F1305]"
                title="Quitar de destacados"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
