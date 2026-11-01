"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
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
      categoria: "Crónica de Época",
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
    <div className="space-y-6 font-mono text-xs">
      {/* Notificación de Feedback */}
      {feedback && (
        <div
          className={`flex items-center gap-2 border-2 border-[#1F1305] p-4 font-mono text-xs font-bold shadow-[4px_4px_0px_#1F1305] ${
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

      {/* MODO EDICIÓN O CREACIÓN */}
      {isEditing && activeArticle ? (
        <div className="border-2 border-[#1F1305] bg-white p-6 sm:p-8 space-y-6 shadow-[6px_6px_0px_#1F1305]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-[#1F1305] pb-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleCancel}
                className="border-2 border-[#1F1305] bg-white p-2 text-[#1F1305] hover:bg-[#EDE0D0] transition-colors shadow-[2px_2px_0px_#1F1305]"
                title="Volver al listado"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <div>
                <h3 className="font-cooper text-xl sm:text-2xl font-black text-[#1F1305]">
                  {activeArticle.id ? "Editar Crónica / Artículo" : "Nueva Crónica / Artículo"}
                </h3>
                <p className="font-mono text-xs text-[#5A5245] font-bold">
                  {activeArticle.id ? `ID: ${activeArticle.id}` : "Redacta un nuevo ensayo para el blog"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleCancel}
                className="border-2 border-[#1F1305] bg-white px-4 py-2 font-mono text-xs font-bold text-[#1F1305] hover:bg-[#EDE0D0] transition-colors shadow-[2px_2px_0px_#1F1305]"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                className="border-2 border-[#1F1305] bg-[#E80000] px-5 py-2 font-mono text-xs font-black text-white hover:bg-[#1F1305] transition-all shadow-[3px_3px_0px_#1F1305] disabled:opacity-50 cursor-pointer"
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
                <label className="block font-mono text-xs text-[#5A5245] font-bold uppercase">
                  Título del Artículo <span className="text-[#E80000]">*</span>
                </label>
                <input
                  type="text"
                  value={activeArticle.titulo || ""}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Ej: La Revolución de la Guitarra Eléctrica en la Selva"
                  className="w-full border-2 border-[#1F1305] bg-[#FAF8F5] px-4 py-2.5 font-cooper text-lg font-bold text-[#1F1305] placeholder-[#5A5245] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#E80000]"
                />
              </div>

              {/* Slug URL */}
              <div className="space-y-1.5">
                <label className="block font-mono text-xs text-[#5A5245] font-bold uppercase">
                  Ruta URL amigable (/blog/[slug])
                </label>
                <div className="flex items-center border-2 border-[#1F1305] bg-[#FAF8F5] px-3 py-2 font-mono text-xs text-[#1F1305]">
                  <span className="text-[#5A5245]">https://kumbiasound.pe/blog/</span>
                  <input
                    type="text"
                    value={activeArticle.slug || ""}
                    onChange={(e) => setActiveArticle({ ...activeArticle, slug: e.target.value })}
                    className="flex-1 bg-transparent text-[#E80000] font-bold focus:outline-none ml-1"
                  />
                </div>
              </div>

              {/* Resumen / Bajada */}
              <div className="space-y-1.5">
                <label className="block font-mono text-xs text-[#5A5245] font-bold uppercase">
                  Resumen o Bajada Editorial (aparece en la tarjeta del blog y vista previa)
                </label>
                <textarea
                  rows={2}
                  value={activeArticle.resumen || ""}
                  onChange={(e) => setActiveArticle({ ...activeArticle, resumen: e.target.value })}
                  placeholder="Breve sinopsis del artículo en 1 o 2 oraciones..."
                  className="w-full border-2 border-[#1F1305] bg-[#FAF8F5] px-4 py-2 font-sans text-xs text-[#1F1305] placeholder-[#5A5245] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#E80000]"
                />
              </div>

              {/* Barra de Herramientas de Formato y Selector de Modo */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-[#1F1305] pb-2">
                  {/* Selector Escribir / Vista Previa */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setEditorMode("write")}
                      className={`flex items-center gap-1.5 border-2 border-[#1F1305] px-3 py-1 font-mono text-xs font-bold transition-colors cursor-pointer ${
                        editorMode === "write"
                          ? "bg-[#1F1305] text-[#EDE0D0] shadow-[1px_1px_0px_#E80000]"
                          : "bg-white text-[#1F1305] hover:bg-[#EDE0D0]"
                      }`}
                    >
                      <Edit3 className="h-3.5 w-3.5" />
                      <span>Escribir</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditorMode("preview")}
                      className={`flex items-center gap-1.5 border-2 border-[#1F1305] px-3 py-1 font-mono text-xs font-bold transition-colors cursor-pointer ${
                        editorMode === "preview"
                          ? "bg-[#1F1305] text-[#EDE0D0] shadow-[1px_1px_0px_#E80000]"
                          : "bg-white text-[#1F1305] hover:bg-[#EDE0D0]"
                      }`}
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>Vista Previa</span>
                    </button>
                  </div>

                  {/* Botones de Formato Rápido */}
                  {editorMode === "write" && (
                    <div className="flex flex-wrap items-center gap-1 text-xs font-mono">
                      <button
                        type="button"
                        onClick={() => handleInsertFormatting("## ")}
                        className="border border-[#1F1305] bg-[#EDE0D0] px-2 py-0.5 text-[#1F1305] font-bold hover:bg-white"
                        title="Subtítulo H2"
                      >
                        H2
                      </button>
                      <button
                        type="button"
                        onClick={() => handleInsertFormatting("### ")}
                        className="border border-[#1F1305] bg-[#EDE0D0] px-2 py-0.5 text-[#1F1305] font-bold hover:bg-white"
                        title="Subtítulo H3"
                      >
                        H3
                      </button>
                      <button
                        type="button"
                        onClick={() => handleInsertFormatting("**", "**")}
                        className="border border-[#1F1305] bg-[#EDE0D0] px-2 py-0.5 text-[#1F1305] font-bold hover:bg-white"
                        title="Negrita"
                      >
                        B
                      </button>
                      <button
                        type="button"
                        onClick={() => handleInsertFormatting("*", "*")}
                        className="border border-[#1F1305] bg-[#EDE0D0] px-2 py-0.5 text-[#1F1305] font-bold hover:bg-white"
                        title="Cursiva"
                      >
                        I
                      </button>
                      <button
                        type="button"
                        onClick={() => handleInsertFormatting("> ")}
                        className="border border-[#1F1305] bg-[#EDE0D0] px-2 py-0.5 text-[#1F1305] font-bold hover:bg-white"
                        title="Cita"
                      >
                        &ldquo; Cita
                      </button>
                      <button
                        type="button"
                        onClick={() => handleInsertFormatting("- ")}
                        className="border border-[#1F1305] bg-[#EDE0D0] px-2 py-0.5 text-[#1F1305] font-bold hover:bg-white"
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
                    onChange={(e) => {
                      const newContent = e.target.value;
                      const words = newContent.trim().split(/\s+/).filter(Boolean).length;
                      const autoRead = `${Math.max(1, Math.ceil(words / 200))} min de lectura`;
                      setActiveArticle({
                        ...activeArticle,
                        contenido: newContent,
                        tiempo_lectura: autoRead,
                      });
                    }}
                    placeholder="Escribe aquí el contenido de la crónica... Puedes usar formato Markdown (## subtítulos, **negritas**, > citas históricas, etc.)."
                    className="w-full border-2 border-[#1F1305] bg-[#FAF8F5] p-4 font-mono text-xs text-[#1F1305] placeholder-[#5A5245] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#E80000] leading-relaxed"
                  />
                ) : (
                  <div className="border-2 border-[#1F1305] bg-white p-6 min-h-[380px] text-[#1F1305]">
                    <MarkdownRenderer content={activeArticle.contenido || "*No hay contenido escrito aún.*"} />
                  </div>
                )}
              </div>
            </div>

            {/* Columna Lateral: Estado, Categoría y Portada WebP */}
            <div className="lg:col-span-4 space-y-6">
              {/* Estado de Publicación */}
              <div className="border-2 border-[#1F1305] bg-[#FAF8F5] p-4 space-y-3 shadow-[3px_3px_0px_#1F1305]">
                <label className="block font-mono text-xs text-[#1F1305] font-black uppercase">
                  Estado de Publicación
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveArticle({ ...activeArticle, publicado: false })}
                    className={`border-2 border-[#1F1305] p-2.5 text-center font-mono text-xs font-black transition-all cursor-pointer ${
                      !activeArticle.publicado
                        ? "bg-[#F1730C] text-white shadow-[2px_2px_0px_#1F1305]"
                        : "bg-white text-[#5A5245] hover:bg-[#EDE0D0]"
                    }`}
                  >
                    Borrador
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveArticle({ ...activeArticle, publicado: true })}
                    className={`border-2 border-[#1F1305] p-2.5 text-center font-mono text-xs font-black transition-all cursor-pointer ${
                      activeArticle.publicado
                        ? "bg-[#10B981] text-white shadow-[2px_2px_0px_#1F1305]"
                        : "bg-white text-[#5A5245] hover:bg-[#EDE0D0]"
                    }`}
                  >
                    Público
                  </button>
                </div>
                <p className="font-mono text-[11px] text-[#5A5245]">
                  {activeArticle.publicado
                    ? "Visible para todos los visitantes en /blog."
                    : "Solo visible para ti dentro del panel de administración."}
                </p>
              </div>

              {/* Categoría y Tiempo de Lectura */}
              <div className="border-2 border-[#1F1305] bg-[#FAF8F5] p-4 space-y-4 shadow-[3px_3px_0px_#1F1305]">
                <div className="space-y-1.5">
                  <label className="block font-mono text-xs text-[#5A5245] font-bold uppercase">Categoría</label>
                  <select
                    value={activeArticle.categoria || "Historia & Orígenes"}
                    onChange={(e) => setActiveArticle({ ...activeArticle, categoria: e.target.value })}
                    className="w-full border-2 border-[#1F1305] bg-white px-3 py-2 font-mono text-xs font-bold text-[#1F1305] focus:outline-none"
                  >
                    <option value="Crónica de Época">Crónica de Época</option>
                    <option value="Pioneros de la Cumbia">Pioneros de la Cumbia</option>
                    <option value="Sellos Discográficos">Sellos Discográficos</option>
                    <option value="Prensajes y Matrices">Prensajes y Matrices</option>
                    <option value="Metodología Pericial">Metodología Pericial</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block font-mono text-xs text-[#5A5245] font-bold uppercase">Tiempo de Lectura</label>
                  <input
                    type="text"
                    value={activeArticle.tiempo_lectura || ""}
                    onChange={(e) => setActiveArticle({ ...activeArticle, tiempo_lectura: e.target.value })}
                    placeholder="Ej: 5 min de lectura"
                    className="w-full border-2 border-[#1F1305] bg-white px-3 py-2 font-mono text-xs font-bold text-[#1F1305] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block font-mono text-xs text-[#5A5245] font-bold uppercase">Firma del Autor</label>
                  <input
                    type="text"
                    value={activeArticle.autor_nombre || ""}
                    onChange={(e) => setActiveArticle({ ...activeArticle, autor_nombre: e.target.value })}
                    className="w-full border-2 border-[#1F1305] bg-white px-3 py-2 font-mono text-xs font-bold text-[#1F1305] focus:outline-none"
                  />
                </div>
              </div>

              {/* Portada WebP */}
              <div className="border-2 border-[#1F1305] bg-[#FAF8F5] p-4 space-y-3 shadow-[3px_3px_0px_#1F1305]">
                <label className="block font-mono text-xs text-[#1F1305] font-black uppercase">
                  Foto de Portada (Solo .webp)
                </label>

                {activeArticle.imagen_portada_url && (
                  <div className="space-y-2">
                    <div className="relative aspect-[16/9] w-full border-2 border-[#1F1305] bg-white overflow-hidden shadow-[2px_2px_0px_#1F1305]">
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
                      className="text-[11px] font-mono text-[#E80000] font-bold hover:underline cursor-pointer"
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
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* MODO LISTADO DE ARTÍCULOS */
        <div className="space-y-6">
          <div className="border-2 border-[#1F1305] bg-[#EDE0D0] p-6 shadow-[6px_6px_0px_#1F1305] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="font-cooper text-2xl font-black text-[#1F1305] flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-[#E80000]" />
                Gestor de Crónicas &amp; Ensayos
              </h3>
              <p className="font-sans text-xs text-[#5A5245]">
                Redacta, publica y edita los artículos que aparecen en la sección pública del blog.
              </p>
            </div>

            <button
              type="button"
              onClick={handleStartCreate}
              className="inline-flex items-center gap-2 border-2 border-[#1F1305] bg-[#E80000] text-white px-5 py-2.5 font-mono text-xs font-black shadow-[3px_3px_0px_#1F1305] hover:bg-[#1F1305] transition-all cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
            >
              <Plus className="h-4 w-4" />
              <span>Nueva Crónica</span>
            </button>
          </div>

          {/* Listado en Cuadrícula */}
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {articles.map((item) => (
                <div
                  key={item.id}
                  className="border-2 border-[#1F1305] bg-white p-5 flex flex-col justify-between space-y-4 shadow-[4px_4px_0px_#1F1305]"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="border border-[#1F1305] bg-[#EDE0D0] font-mono text-[11px] text-[#1F1305] font-black px-2 py-0.5">
                        {item.categoria}
                      </span>
                      <span
                        className={`font-mono text-[10px] px-2 py-0.5 border border-[#1F1305] font-black uppercase ${
                          item.publicado
                            ? "bg-[#10B981] text-white"
                            : "bg-[#F1730C] text-white"
                        }`}
                      >
                        {item.publicado ? "Publicado" : "Borrador"}
                      </span>
                    </div>

                    <h4 className="font-cooper text-lg font-bold text-[#1F1305] line-clamp-2">
                      {item.titulo}
                    </h4>

                    {item.resumen && (
                      <p className="font-sans text-xs text-[#5A5245] line-clamp-2 leading-relaxed">
                        {item.resumen}
                      </p>
                    )}

                    <div className="flex items-center gap-3 font-mono text-[11px] text-[#5A5245] font-bold pt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-[#2563EB]" />
                        {item.tiempo_lectura}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-[#F1730C]" />
                        {new Date(item.fecha_publicacion).toLocaleDateString("es-PE")}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t-2 border-[#1F1305]/15 flex items-center justify-between">
                    <a
                      href={`/blog/${item.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-xs font-bold text-[#5A5245] hover:text-[#E80000] transition-colors"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      <span>Ver en la web</span>
                    </a>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleStartEdit(item)}
                        className="inline-flex items-center gap-1 border-2 border-[#1F1305] bg-[#EDE0D0] px-3 py-1 font-mono text-xs font-black text-[#1F1305] hover:bg-[#1F1305] hover:text-white transition-colors cursor-pointer shadow-[1px_1px_0px_#1F1305]"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                        <span>Editar</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id, item.titulo)}
                        className="border-2 border-[#1F1305] bg-[#FEE2E2] p-1 text-[#991B1B] hover:bg-[#E80000] hover:text-white transition-colors cursor-pointer shadow-[1px_1px_0px_#1F1305]"
                        title="Eliminar artículo"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border-2 border-[#1F1305] bg-white p-12 text-center space-y-3 shadow-[4px_4px_0px_#1F1305]">
              <Sparkles className="h-8 w-8 text-[#E80000] mx-auto" />
              <h4 className="font-cooper text-xl font-bold text-[#1F1305]">No tienes crónicas redactadas</h4>
              <p className="font-sans text-xs text-[#5A5245] max-w-sm mx-auto">
                Haz clic en &quot;Nueva Crónica&quot; para escribir tu primer artículo histórico sobre la cumbia peruana.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
