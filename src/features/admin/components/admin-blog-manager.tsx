"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { GlassCard } from "@/components/ui/glass-card";
import { ImageUploader } from "@/features/storage/components/image-uploader";
import { MarkdownRenderer } from "@/features/blog";
import {
  BookOpen,
  Plus,
  Edit3,
  Trash2,
  Eye,
  CheckCircle2,
  AlertCircle,
  Clock,
  Calendar,
  Sparkles,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";
import type { Articulo } from "@/types/blog";

interface AdminBlogManagerProps {
  initialArticles: Articulo[];
}

export function AdminBlogManager({ initialArticles }: AdminBlogManagerProps) {
  const [articles, setArticles] = useState<Articulo[]>(initialArticles);
  const [isEditing, setIsEditing] = useState(false);
  const [activeArticle, setActiveArticle] = useState<Partial<Articulo> | null>(null);
  const [editorMode, setEditorMode] = useState<"write" | "preview">("write");
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const supabase = createClient();

  // Helper para generar slug a partir del título
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remueve tildes
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  const handleStartCreate = () => {
    setActiveArticle({
      titulo: "",
      slug: "",
      resumen: "",
      contenido: "",
      categoria: "Historia & Orígenes",
      tiempo_lectura: "5 min de lectura",
      autor_nombre: "Kumbia Sound // Archivo Histórico",
      publicado: true,
      imagen_portada_url: null,
    });
    setEditorMode("write");
    setIsEditing(true);
    setFeedback(null);
  };

  const handleStartEdit = (article: Articulo) => {
    setActiveArticle({ ...article });
    setEditorMode("write");
    setIsEditing(true);
    setFeedback(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setActiveArticle(null);
    setFeedback(null);
  };

  const handleTitleChange = (newTitle: string) => {
    if (!activeArticle) return;
    // Si es nuevo o el slug estaba autogenerado, actualizar el slug
    const shouldUpdateSlug = !activeArticle.id || activeArticle.slug === generateSlug(activeArticle.titulo || "");
    setActiveArticle({
      ...activeArticle,
      titulo: newTitle,
      slug: shouldUpdateSlug ? generateSlug(newTitle) : activeArticle.slug,
    });
  };

  const handleInsertFormatting = (prefix: string, suffix = "") => {
    const textarea = document.getElementById("blog-content-textarea") as HTMLTextAreaElement | null;
    if (!textarea || !activeArticle) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const current = activeArticle.contenido || "";
    const selected = current.substring(start, end);
    const replacement = `${prefix}${selected || "texto"}${suffix}`;

    const updated = current.substring(0, start) + replacement + current.substring(end);
    setActiveArticle({ ...activeArticle, contenido: updated });

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + (selected ? selected.length : 5));
    }, 50);
  };

  const handleSave = async () => {
    if (!activeArticle) return;

    if (!activeArticle.titulo?.trim()) {
      setFeedback({ type: "error", text: "El título es obligatorio." });
      return;
    }

    if (!activeArticle.slug?.trim()) {
      setFeedback({ type: "error", text: "El slug de la URL es obligatorio." });
      return;
    }

    if (!activeArticle.contenido?.trim()) {
      setFeedback({ type: "error", text: "El contenido del artículo no puede estar vacío." });
      return;
    }

    setIsSaving(true);
    setFeedback(null);

    try {
      if (activeArticle.id) {
        // Actualizar artículo existente
        const { error } = await supabase
          .from("articulos")
          .update({
            titulo: activeArticle.titulo,
            slug: activeArticle.slug,
            resumen: activeArticle.resumen || null,
            contenido: activeArticle.contenido,
            categoria: activeArticle.categoria || "Historia & Vinilos",
            tiempo_lectura: activeArticle.tiempo_lectura || "5 min de lectura",
            autor_nombre: activeArticle.autor_nombre || "Kumbia Sound // Archivo Histórico",
            publicado: activeArticle.publicado ?? true,
            imagen_portada_url: activeArticle.imagen_portada_url || null,
            updated_at: new Date().toISOString(),
          })
          .eq("id", activeArticle.id);

        if (error) throw error;

        setArticles((prev) =>
          prev.map((a) => (a.id === activeArticle.id ? ({ ...a, ...activeArticle } as Articulo) : a))
        );
        setFeedback({ type: "success", text: "Artículo actualizado con éxito." });
      } else {
        // Crear nuevo artículo
        const { data, error } = await supabase
          .from("articulos")
          .insert({
            titulo: activeArticle.titulo,
            slug: activeArticle.slug,
            resumen: activeArticle.resumen || null,
            contenido: activeArticle.contenido,
            categoria: activeArticle.categoria || "Historia & Vinilos",
            tiempo_lectura: activeArticle.tiempo_lectura || "5 min de lectura",
            autor_nombre: activeArticle.autor_nombre || "Kumbia Sound // Archivo Histórico",
            publicado: activeArticle.publicado ?? true,
            imagen_portada_url: activeArticle.imagen_portada_url || null,
          })
          .select()
          .single();

        if (error) throw error;

        if (data) {
          setArticles((prev) => [data as unknown as Articulo, ...prev]);
        }
        setFeedback({ type: "success", text: "Nuevo artículo publicado con éxito." });
      }

      setTimeout(() => {
        setIsEditing(false);
        setActiveArticle(null);
        setFeedback(null);
      }, 1200);
    } catch (err: unknown) {
      console.error(err);
      setFeedback({
        type: "error",
        text: err instanceof Error ? err.message : "Error al guardar el artículo en Supabase.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`¿Estás seguro de que deseas eliminar permanentemente el artículo "${title}"?`)) {
      return;
    }

    try {
      const { error } = await supabase.from("articulos").delete().eq("id", id);
      if (error) throw error;

      setArticles((prev) => prev.filter((a) => a.id !== id));
      if (activeArticle?.id === id) {
        setIsEditing(false);
        setActiveArticle(null);
      }
    } catch (err: unknown) {
      alert("Error al eliminar: " + (err instanceof Error ? err.message : "desconocido"));
    }
  };

  return (
    <div className="space-y-6">
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

      {/* MODO EDICIÓN O CREACIÓN */}
      {isEditing && activeArticle ? (
        <GlassCard variant="elevated" className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleCancel}
                className="rounded-lg border border-white/10 bg-white/5 p-2 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Volver al listado"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  {activeArticle.id ? "Editar Crónica / Artículo" : "Nueva Crónica / Artículo"}
                </h3>
                <p className="font-mono text-xs text-neutral-400">
                  {activeArticle.id ? `ID: ${activeArticle.id}` : "Redacta un nuevo ensayo para el blog"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleCancel}
                className="rounded-xl border border-white/10 px-4 py-2 font-mono text-xs text-neutral-300 hover:bg-white/5 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                className="rounded-xl bg-amber-500 px-5 py-2 font-mono text-xs font-bold text-neutral-950 hover:bg-amber-400 transition-all disabled:opacity-50"
              >
                {isSaving ? "Guardando..." : activeArticle.id ? "Guardar Cambios" : "Publicar Ahora"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Columna Principal: Título, Metadatos y Contenido */}
            <div className="lg:col-span-8 space-y-5">
              {/* Título */}
              <div className="space-y-1.5">
                <label className="block font-mono text-xs text-neutral-300">
                  Título del Artículo <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  value={activeArticle.titulo || ""}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Ej: La Revolución de la Guitarra Eléctrica en la Selva"
                  className="w-full rounded-xl border border-white/10 bg-neutral-900/90 px-4 py-2.5 font-serif text-lg text-white placeholder-neutral-600 focus:border-amber-500/60 focus:outline-none"
                />
              </div>

              {/* Slug URL */}
              <div className="space-y-1.5">
                <label className="block font-mono text-xs text-neutral-400">
                  Ruta URL amigable (/blog/[slug])
                </label>
                <div className="flex items-center rounded-xl border border-white/10 bg-neutral-950 px-3 py-2 font-mono text-xs text-neutral-400">
                  <span className="text-neutral-500">https://kumbiasound.pe/blog/</span>
                  <input
                    type="text"
                    value={activeArticle.slug || ""}
                    onChange={(e) => setActiveArticle({ ...activeArticle, slug: e.target.value })}
                    className="flex-1 bg-transparent text-amber-300 focus:outline-none ml-1"
                  />
                </div>
              </div>

              {/* Resumen / Bajada */}
              <div className="space-y-1.5">
                <label className="block font-mono text-xs text-neutral-300">
                  Resumen o Bajada Editorial (aparece en la tarjeta del blog y vista previa)
                </label>
                <textarea
                  rows={2}
                  value={activeArticle.resumen || ""}
                  onChange={(e) => setActiveArticle({ ...activeArticle, resumen: e.target.value })}
                  placeholder="Breve sinopsis del artículo en 1 o 2 oraciones..."
                  className="w-full rounded-xl border border-white/10 bg-neutral-900/90 px-4 py-2 font-sans text-sm text-neutral-200 placeholder-neutral-600 focus:border-amber-500/60 focus:outline-none"
                />
              </div>

              {/* Barra de Herramientas de Formato y Selector de Modo */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2">
                  {/* Selector Escribir / Vista Previa */}
                  <div className="flex items-center rounded-lg border border-white/10 bg-neutral-950 p-1">
                    <button
                      type="button"
                      onClick={() => setEditorMode("write")}
                      className={`flex items-center gap-1.5 rounded-md px-3 py-1 font-mono text-xs transition-colors ${
                        editorMode === "write"
                          ? "bg-amber-500 text-neutral-950 font-bold"
                          : "text-neutral-400 hover:text-white"
                      }`}
                    >
                      <Edit3 className="h-3.5 w-3.5" />
                      <span>Escribir</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditorMode("preview")}
                      className={`flex items-center gap-1.5 rounded-md px-3 py-1 font-mono text-xs transition-colors ${
                        editorMode === "preview"
                          ? "bg-amber-500 text-neutral-950 font-bold"
                          : "text-neutral-400 hover:text-white"
                      }`}
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>Vista Previa</span>
                    </button>
                  </div>

                  {/* Botones de Formato Rápido */}
                  {editorMode === "write" && (
                    <div className="flex flex-wrap items-center gap-1 text-xs font-mono text-neutral-400">
                      <button
                        type="button"
                        onClick={() => handleInsertFormatting("## ")}
                        className="rounded px-2 py-1 hover:bg-white/10 hover:text-amber-400 transition-colors"
                        title="Subtítulo"
                      >
                        H2
                      </button>
                      <button
                        type="button"
                        onClick={() => handleInsertFormatting("### ")}
                        className="rounded px-2 py-1 hover:bg-white/10 hover:text-amber-400 transition-colors"
                        title="Sección"
                      >
                        H3
                      </button>
                      <button
                        type="button"
                        onClick={() => handleInsertFormatting("**", "**")}
                        className="rounded px-2 py-1 font-bold hover:bg-white/10 hover:text-amber-400 transition-colors"
                        title="Negrita"
                      >
                        B
                      </button>
                      <button
                        type="button"
                        onClick={() => handleInsertFormatting("*", "*")}
                        className="rounded px-2 py-1 italic hover:bg-white/10 hover:text-amber-400 transition-colors"
                        title="Cursiva"
                      >
                        I
                      </button>
                      <button
                        type="button"
                        onClick={() => handleInsertFormatting("> ")}
                        className="rounded px-2 py-1 hover:bg-white/10 hover:text-amber-400 transition-colors"
                        title="Cita en bloque"
                      >
                        “Cita”
                      </button>
                      <button
                        type="button"
                        onClick={() => handleInsertFormatting("- ")}
                        className="rounded px-2 py-1 hover:bg-white/10 hover:text-amber-400 transition-colors"
                        title="Lista"
                      >
                        • Lista
                      </button>
                    </div>
                  )}
                </div>

                {/* Área de Texto o Vista Previa */}
                {editorMode === "write" ? (
                  <textarea
                    id="blog-content-textarea"
                    rows={16}
                    value={activeArticle.contenido || ""}
                    onChange={(e) => setActiveArticle({ ...activeArticle, contenido: e.target.value })}
                    placeholder="Escribe aquí el contenido de la crónica... Puedes usar formato Markdown (## subtítulos, **negritas**, > citas históricas, etc.)."
                    className="w-full rounded-xl border border-white/10 bg-neutral-900/90 p-4 font-mono text-sm text-neutral-200 placeholder-neutral-600 focus:border-amber-500/60 focus:outline-none leading-relaxed"
                  />
                ) : (
                  <div className="rounded-xl border border-white/10 bg-neutral-950/80 p-6 min-h-[380px]">
                    <MarkdownRenderer content={activeArticle.contenido || "*No hay contenido escrito aún.*"} />
                  </div>
                )}
              </div>
            </div>

            {/* Columna Lateral: Estado, Categoría y Portada WebP */}
            <div className="lg:col-span-4 space-y-6">
              {/* Estado de Publicación */}
              <GlassCard className="p-4 space-y-3">
                <label className="block font-mono text-xs text-neutral-300 font-semibold">
                  Estado de Publicación
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveArticle({ ...activeArticle, publicado: false })}
                    className={`rounded-xl border p-2.5 text-center font-mono text-xs transition-all ${
                      !activeArticle.publicado
                        ? "border-amber-500 bg-amber-500/20 text-amber-300 font-bold"
                        : "border-white/10 bg-neutral-900 text-neutral-400 hover:text-white"
                    }`}
                  >
                    Borrador
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveArticle({ ...activeArticle, publicado: true })}
                    className={`rounded-xl border p-2.5 text-center font-mono text-xs transition-all ${
                      activeArticle.publicado
                        ? "border-emerald-500 bg-emerald-500/20 text-emerald-300 font-bold"
                        : "border-white/10 bg-neutral-900 text-neutral-400 hover:text-white"
                    }`}
                  >
                    Público
                  </button>
                </div>
                <p className="font-mono text-[11px] text-neutral-400">
                  {activeArticle.publicado
                    ? "Visible para todos los visitantes en /blog."
                    : "Solo visible para ti dentro del panel de administración."}
                </p>
              </GlassCard>

              {/* Categoría y Tiempo de Lectura */}
              <GlassCard className="p-4 space-y-4">
                <div className="space-y-1.5">
                  <label className="block font-mono text-xs text-neutral-300">Categoría</label>
                  <select
                    value={activeArticle.categoria || "Historia & Orígenes"}
                    onChange={(e) => setActiveArticle({ ...activeArticle, categoria: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-neutral-900 px-3 py-2 font-mono text-xs text-neutral-200 focus:outline-none"
                  >
                    <option value="Historia & Orígenes">Historia & Orígenes</option>
                    <option value="Pioneros de la Cumbia">Pioneros de la Cumbia</option>
                    <option value="Tornamesismo & Vinilos">Tornamesismo & Vinilos</option>
                    <option value="Reseña Discográfica">Reseña Discográfica</option>
                    <option value="Análisis Musical DJ">Análisis Musical DJ</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block font-mono text-xs text-neutral-300">Tiempo de Lectura</label>
                  <input
                    type="text"
                    value={activeArticle.tiempo_lectura || ""}
                    onChange={(e) => setActiveArticle({ ...activeArticle, tiempo_lectura: e.target.value })}
                    placeholder="Ej: 5 min de lectura"
                    className="w-full rounded-xl border border-white/10 bg-neutral-900 px-3 py-2 font-mono text-xs text-neutral-200 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block font-mono text-xs text-neutral-300">Firma del Autor</label>
                  <input
                    type="text"
                    value={activeArticle.autor_nombre || ""}
                    onChange={(e) => setActiveArticle({ ...activeArticle, autor_nombre: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-neutral-900 px-3 py-2 font-mono text-xs text-neutral-200 focus:outline-none"
                  />
                </div>
              </GlassCard>

              {/* Portada WebP */}
              <GlassCard className="p-4 space-y-3">
                <label className="block font-mono text-xs text-neutral-300 font-semibold">
                  Foto de Portada (Solo .webp)
                </label>

                {activeArticle.imagen_portada_url && (
                  <div className="space-y-2">
                    <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden border border-white/10 bg-neutral-900">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={activeArticle.imagen_portada_url}
                        alt="Portada"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveArticle({ ...activeArticle, imagen_portada_url: null })}
                      className="text-[11px] font-mono text-red-400 hover:underline"
                    >
                      Remover portada
                    </button>
                  </div>
                )}

                <ImageUploader
                  folderPath="blog"
                  fileId={activeArticle.slug || "nuevo-articulo"}
                  suffix="portada"
                  currentUrl={activeArticle.imagen_portada_url}
                  onUploaded={(url: string) => {
                    setActiveArticle({ ...activeArticle, imagen_portada_url: url });
                  }}
                />
              </GlassCard>
            </div>
          </div>
        </GlassCard>
      ) : (
        /* MODO LISTADO DE ARTÍCULOS */
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-serif text-2xl font-bold text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-amber-400" />
                Gestor de Crónicas & Ensayos
              </h3>
              <p className="font-mono text-xs text-neutral-400">
                Redacta, publica y edita los artículos que aparecen en la sección pública de blog.
              </p>
            </div>

            <button
              type="button"
              onClick={handleStartCreate}
              className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 font-mono text-xs font-bold text-neutral-950 transition-all hover:bg-amber-400 shadow-lg shadow-amber-500/10"
            >
              <Plus className="h-4 w-4" />
              <span>Nueva Crónica</span>
            </button>
          </div>

          {/* Listado en Cuadrícula */}
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {articles.map((item) => (
                <GlassCard
                  key={item.id}
                  className="p-5 flex flex-col justify-between space-y-4 hover:border-amber-500/30 transition-colors"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[11px] text-amber-400 font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                        {item.categoria}
                      </span>
                      <span
                        className={`font-mono text-[10px] px-2 py-0.5 rounded-full border ${
                          item.publicado
                            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                            : "bg-amber-500/10 border-amber-500/30 text-amber-400"
                        }`}
                      >
                        {item.publicado ? "Publicado" : "Borrador"}
                      </span>
                    </div>

                    <h4 className="font-serif text-lg font-bold text-white line-clamp-2">
                      {item.titulo}
                    </h4>

                    {item.resumen && (
                      <p className="font-sans text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                        {item.resumen}
                      </p>
                    )}

                    <div className="flex items-center gap-3 font-mono text-[11px] text-neutral-500 pt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {item.tiempo_lectura}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(item.fecha_publicacion).toLocaleDateString("es-PE")}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <a
                      href={`/blog/${item.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-xs text-neutral-400 hover:text-amber-400 transition-colors"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      <span>Ver en la web</span>
                    </a>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleStartEdit(item)}
                        className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-neutral-200 hover:border-amber-500/40 hover:text-amber-400 transition-colors"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                        <span>Editar</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id, item.titulo)}
                        className="rounded-lg border border-red-500/20 bg-red-500/10 p-1.5 text-red-400 hover:bg-red-500/20 transition-colors"
                        title="Eliminar artículo"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          ) : (
            <GlassCard className="p-12 text-center space-y-3">
              <Sparkles className="h-8 w-8 text-amber-400 mx-auto" />
              <h4 className="font-serif text-lg font-bold text-white">No tienes crónicas redactadas</h4>
              <p className="font-mono text-xs text-neutral-400 max-w-sm mx-auto">
                Haz clic en &quot;Nueva Crónica&quot; para escribir tu primer artículo histórico sobre la cumbia peruana.
              </p>
            </GlassCard>
          )}
        </div>
      )}
    </div>
  );
}
