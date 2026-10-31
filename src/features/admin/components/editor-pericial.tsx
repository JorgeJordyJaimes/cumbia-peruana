"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Bold,
  Italic,
  Strikethrough,
  Heading2,
  Heading3,
  Quote,
  List,
  ListOrdered,
  Link as LinkIcon,
  Table,
  Eye,
  Edit3,
  Save,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Trash2,
  ExternalLink,
  ShieldCheck,
  Clock,
  Sparkles,
} from "lucide-react";

export interface FuentePericialItem {
  id: string;
  tipo: "PRIMARIA" | "SECUNDARIA";
  referencia: string; // ej. "Galleta original LP-0012", "Entrevista El Comercio 1978"
  fecha?: string;
  url?: string;
}

export type SelloVerificacion = "PRIMARIA" | "SECUNDARIA" | "SIN_VERIFICAR";
export type EstadoEditorial = "borrador" | "publicado";

interface EditorPericialProps {
  idEntidad: string | number;
  tipoEntidad: "informe" | "grupo" | "nota" | "radar" | "legajo";
  tituloEntidad: string;
  codigoEntidad?: string; // ej. "INF-0007", "AGR-001"
  initialContent?: string;
  initialSello?: SelloVerificacion;
  initialFuentes?: FuentePericialItem[];
  initialEstado?: EstadoEditorial;
  onSave: (data: {
    contenidoMd: string;
    sello: SelloVerificacion;
    fuentes: FuentePericialItem[];
    estado: EstadoEditorial;
  }) => Promise<void> | void;
  renderCustomPreview?: (contentMd: string) => React.ReactNode;
}

export function EditorPericial({
  idEntidad,
  tipoEntidad,
  tituloEntidad,
  codigoEntidad,
  initialContent = "",
  initialSello = "SIN_VERIFICAR",
  initialFuentes = [],
  initialEstado = "borrador",
  onSave,
  renderCustomPreview,
}: EditorPericialProps) {
  const storageKey = `kumbia_draft_${tipoEntidad}_${idEntidad}`;

  const [content, setContent] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(storageKey);
      if (saved) return saved;
    }
    return initialContent;
  });

  const [sello, setSello] = useState<SelloVerificacion>(initialSello);
  const [fuentes, setFuentes] = useState<FuentePericialItem[]>(initialFuentes);
  const [estado, setEstado] = useState<EstadoEditorial>(initialEstado);
  const [activeMobileTab, setActiveMobileTab] = useState<"editor" | "preview">("editor");
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);

  // Autoguardado local
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(storageKey, content);
    }
  }, [content, storageKey]);

  // Cálculo de tiempo de lectura y métricas de texto
  const { wordCount, readTimeMinutes } = useMemo(() => {
    const text = content.trim();
    if (!text) return { wordCount: 0, readTimeMinutes: 1 };
    const words = text.split(/\s+/).filter(Boolean).length;
    return {
      wordCount: words,
      readTimeMinutes: Math.max(1, Math.ceil(words / 200)),
    };
  }, [content]);

  // Validación de sello
  const tieneFuentePrimaria = useMemo(() => {
    return fuentes.some((f) => f.tipo === "PRIMARIA" && f.referencia.trim().length > 3);
  }, [fuentes]);

  const advertenciaSello = sello === "PRIMARIA" && !tieneFuentePrimaria;

  // Acciones de formato Markdown
  const insertFormatting = (prefix: string, suffix: string = "") => {
    const textarea = document.getElementById("pericial-textarea") as HTMLTextAreaElement | null;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const replacement = `${prefix}${selectedText || "texto"}${suffix}`;

    const newContent = content.substring(0, start) + replacement + content.substring(end);
    setContent(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + replacement.length - suffix.length);
    }, 10);
  };

  const handleAddFuente = () => {
    const nueva: FuentePericialItem = {
      id: `fuente-${Date.now()}`,
      tipo: "PRIMARIA",
      referencia: "",
    };
    setFuentes([...fuentes, nueva]);
  };

  const handleRemoveFuente = (id: string) => {
    setFuentes(fuentes.filter((f) => f.id !== id));
  };

  const handleUpdateFuente = (id: string, field: keyof FuentePericialItem, value: any) => {
    setFuentes(
      fuentes.map((f) => {
        if (f.id === id) {
          return { ...f, [field]: value };
        }
        return f;
      })
    );
  };

  const handleSave = async (nuevoEstado?: EstadoEditorial) => {
    const estadoFinal = nuevoEstado || estado;
    setIsSaving(true);
    try {
      await onSave({
        contenidoMd: content,
        sello,
        fuentes,
        estado: estadoFinal,
      });
      setEstado(estadoFinal);
      setLastSavedTime(
        new Date().toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
      );
    } catch (err) {
      console.error("Error al guardar texto pericial:", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="border-2 border-[#1F1305] bg-white shadow-[6px_6px_0px_#1F1305] font-mono text-xs">
      {/* ============================================================ */}
      {/* 1. BARRA SUPERIOR DE ESTADO Y AUTOGUARDADO                  */}
      {/* ============================================================ */}
      <div className="border-b-2 border-[#1F1305] bg-[#EDE0D0] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {codigoEntidad && (
            <span className="border border-[#1F1305] bg-[#1F1305] text-[#EDE0D0] px-2 py-0.5 font-black">
              {codigoEntidad}
            </span>
          )}
          <span className="font-bold text-[#1F1305] truncate max-w-xs sm:max-w-md">
            {tituloEntidad}
          </span>
          <span
            className={`border px-2 py-0.5 font-black uppercase text-[10px] ${
              estado === "publicado"
                ? "bg-[#10B981] text-white border-[#1F1305]"
                : "bg-[#F1730C] text-white border-[#1F1305]"
            }`}
          >
            [{estado === "publicado" ? "PUBLICADO" : "BORRADOR"}]
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {lastSavedTime && (
            <span className="text-[11px] text-[#5A5245] flex items-center gap-1 mr-2 hidden md:inline-flex">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981]" /> Guardado {lastSavedTime}
            </span>
          )}

          <button
            type="button"
            onClick={() => handleSave("borrador")}
            disabled={isSaving}
            className="border-2 border-[#1F1305] bg-white px-3 py-1.5 font-bold text-[#1F1305] shadow-[2px_2px_0px_#1F1305] hover:bg-[#EDE0D0] active:translate-x-0.5 active:translate-y-0.5 transition-all"
          >
            Guardar Borrador
          </button>

          <button
            type="button"
            onClick={() => handleSave("publicado")}
            disabled={isSaving}
            className="border-2 border-[#1F1305] bg-[#E80000] text-white px-3.5 py-1.5 font-black shadow-[2px_2px_0px_#1F1305] hover:bg-[#1F1305] active:translate-x-0.5 active:translate-y-0.5 transition-all"
          >
            {estado === "publicado" ? "Actualizar Publicación" : "Publicar Ahora"}
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. SELECTOR DE SELLO Y ADVERTENCIA PERICIAL                  */}
      {/* ============================================================ */}
      <div className="border-b border-[#1F1305]/20 p-3 bg-neutral-50 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-bold text-[#1F1305]/70 flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5 text-[#E80000]" /> Sello de Verificación:
          </span>
          {(["PRIMARIA", "SECUNDARIA", "SIN_VERIFICAR"] as SelloVerificacion[]).map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setSello(opt)}
              className={`border px-2.5 py-1 font-bold transition-all ${
                sello === opt
                  ? opt === "PRIMARIA"
                    ? "bg-[#2E7D32] text-white border-[#1F1305] shadow-[2px_2px_0px_#1F1305]"
                    : opt === "SECUNDARIA"
                    ? "bg-[#F1730C] text-white border-[#1F1305] shadow-[2px_2px_0px_#1F1305]"
                    : "bg-[#1F1305] text-[#EDE0D0] border-[#1F1305] shadow-[2px_2px_0px_#1F1305]"
                  : "bg-white text-[#1F1305] border-[#1F1305]/30 hover:bg-[#EDE0D0]"
              }`}
            >
              [{opt.replace("_", " ")}]
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 text-[11px] text-[#5A5245]">
          <span>{wordCount} palabras</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" /> {readTimeMinutes} min lectura
          </span>
        </div>
      </div>

      {/* Advertencia si el sello es PRIMARIA sin fuentes primarias registradas */}
      {advertenciaSello && (
        <div className="bg-[#FEF3C7] border-b-2 border-[#1F1305] p-3 text-amber-900 flex items-start gap-2">
          <AlertTriangle className="h-4 w-4 text-[#E80000] shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed">
            <strong>ADVERTENCIA PERICIAL:</strong> Has marcado el dictamen como <code>[FUENTE PRIMARIA]</code>, pero no has añadido ninguna referencia física de galleta, matriz sonora o registro notarial en el panel inferior de fuentes.
          </p>
        </div>
      )}

      {/* ============================================================ */}
      {/* 3. BARRA DE HERRAMIENTAS MARKDOWN                           */}
      {/* ============================================================ */}
      <div className="border-b border-[#1F1305]/20 bg-white p-2 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1">
          <button
            type="button"
            onClick={() => insertFormatting("## ", "")}
            className="border border-[#1F1305] bg-[#EDE0D0] p-1.5 hover:bg-[#1F1305] hover:text-white transition-colors"
            title="Encabezado Principal (H2)"
          >
            <Heading2 className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("### ", "")}
            className="border border-[#1F1305] bg-[#EDE0D0] p-1.5 hover:bg-[#1F1305] hover:text-white transition-colors"
            title="Sub-encabezado (H3)"
          >
            <Heading3 className="h-3.5 w-3.5" />
          </button>
          <span className="text-[#1F1305]/30 mx-1">|</span>
          <button
            type="button"
            onClick={() => insertFormatting("**", "**")}
            className="border border-[#1F1305] bg-[#EDE0D0] p-1.5 hover:bg-[#1F1305] hover:text-white transition-colors"
            title="Negrita"
          >
            <Bold className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("*", "*")}
            className="border border-[#1F1305] bg-[#EDE0D0] p-1.5 hover:bg-[#1F1305] hover:text-white transition-colors"
            title="Cursiva"
          >
            <Italic className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("~~", "~~")}
            className="border border-[#1F1305] bg-[#EDE0D0] p-1.5 hover:bg-[#1F1305] hover:text-white transition-colors"
            title="Tachado"
          >
            <Strikethrough className="h-3.5 w-3.5" />
          </button>
          <span className="text-[#1F1305]/30 mx-1">|</span>
          <button
            type="button"
            onClick={() => insertFormatting("> ", "")}
            className="border border-[#1F1305] bg-[#EDE0D0] p-1.5 hover:bg-[#1F1305] hover:text-white transition-colors"
            title="Cita Pericial / Testimonio"
          >
            <Quote className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("- ", "")}
            className="border border-[#1F1305] bg-[#EDE0D0] p-1.5 hover:bg-[#1F1305] hover:text-white transition-colors"
            title="Lista con viñetas"
          >
            <List className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("1. ", "")}
            className="border border-[#1F1305] bg-[#EDE0D0] p-1.5 hover:bg-[#1F1305] hover:text-white transition-colors"
            title="Lista numerada"
          >
            <ListOrdered className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("[texto del enlace](", ")")}
            className="border border-[#1F1305] bg-[#EDE0D0] p-1.5 hover:bg-[#1F1305] hover:text-white transition-colors"
            title="Insertar Enlace"
          >
            <LinkIcon className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() =>
              insertFormatting(
                "\n| Pista | Año | Intérprete |\n| :--- | :--- | :--- |\n| Tema 01 | 1975 | Grupo Celeste |\n"
              )
            }
            className="border border-[#1F1305] bg-[#EDE0D0] p-1.5 hover:bg-[#1F1305] hover:text-white transition-colors"
            title="Insertar Tabla Ortogonal"
          >
            <Table className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Conmutador Móvil */}
        <div className="flex md:hidden border border-[#1F1305]">
          <button
            type="button"
            onClick={() => setActiveMobileTab("editor")}
            className={`px-3 py-1 ${activeMobileTab === "editor" ? "bg-[#1F1305] text-white" : "bg-white"}`}
          >
            <Edit3 className="h-3.5 w-3.5 inline mr-1" /> Editor
          </button>
          <button
            type="button"
            onClick={() => setActiveMobileTab("preview")}
            className={`px-3 py-1 ${activeMobileTab === "preview" ? "bg-[#1F1305] text-white" : "bg-white"}`}
          >
            <Eye className="h-3.5 w-3.5 inline mr-1" /> Vista
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 4. ÁREA DIVIDIDA: ESCRITURA + VISTA PREVIA FIEL              */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[380px] divide-y-2 md:divide-y-0 md:divide-x-2 divide-[#1F1305]">
        {/* Editor de Texto (Markdown) */}
        <div className={`${activeMobileTab === "preview" ? "hidden md:block" : "block"} p-4 flex flex-col`}>
          <textarea
            id="pericial-textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Escribe la declaración pericial o crónica en Markdown... Puedes usar encabezados, citas testimoniales, listas y enlaces fonográficos."
            className="w-full flex-1 min-h-[360px] p-3 font-mono text-xs bg-neutral-50/50 border border-[#1F1305]/30 focus:outline-none focus:ring-2 focus:ring-[#E80000] focus:bg-white resize-y leading-relaxed text-[#1F1305]"
          />
        </div>

        {/* Vista Previa Fiel */}
        <div
          className={`${
            activeMobileTab === "editor" ? "hidden md:block" : "block"
          } p-6 bg-[#EDE0D0]/20 overflow-y-auto max-h-[500px]`}
        >
          <div className="flex items-center justify-between border-b border-[#1F1305]/20 pb-2 mb-4 font-mono text-[11px] text-[#5A5245]">
            <span className="font-bold flex items-center gap-1 text-[#1F1305]">
              <Eye className="h-3.5 w-3.5 text-[#E80000]" /> Vista Previa Fiel (Estilo Público)
            </span>
            <span>Tipografía Real</span>
          </div>

          {renderCustomPreview ? (
            renderCustomPreview(content)
          ) : (
            <div className="space-y-4 font-sans text-sm text-[#1F1305] leading-relaxed">
              {content ? (
                <div className="prose max-w-none space-y-3">
                  {content.split("\n\n").map((parrafo, i) => {
                    if (parrafo.startsWith("## ")) {
                      return (
                        <h2 key={i} className="font-cooper text-xl font-black text-[#1F1305] pt-2">
                          {parrafo.replace("## ", "")}
                        </h2>
                      );
                    }
                    if (parrafo.startsWith("### ")) {
                      return (
                        <h3 key={i} className="font-cooper text-base font-black text-[#1F1305] pt-1">
                          {parrafo.replace("### ", "")}
                        </h3>
                      );
                    }
                    if (parrafo.startsWith("> ")) {
                      return (
                        <blockquote
                          key={i}
                          className="border-l-4 border-[#1F1305] bg-white p-3 font-mono text-xs italic text-[#1F1305]/90 shadow-[2px_2px_0px_#1F1305]"
                        >
                          {parrafo.replace("> ", "")}
                        </blockquote>
                      );
                    }
                    return (
                      <p key={i} className="whitespace-pre-line">
                        {parrafo}
                      </p>
                    );
                  })}
                </div>
              ) : (
                <p className="italic text-[#5A5245] text-xs">
                  El texto redactado se mostrará aquí con la tipografía y contrastes exactos de la web pública.
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ============================================================ */}
      {/* 5. PANEL DE FUENTES ESTRUCTURADAS                            */}
      {/* ============================================================ */}
      <div className="border-t-2 border-[#1F1305] bg-neutral-50 p-4 sm:p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-[#1F1305]/20 pb-2">
          <div>
            <span className="font-mono text-xs font-black uppercase text-[#1F1305] flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-[#E80000]" /> Fuentes Periciales & Registro Documental
            </span>
            <p className="text-[11px] text-[#5A5245] mt-0.5">
              Coteja copias físicas de galletas, matrices, testimonios orales o referencias de prensa.
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddFuente}
            className="flex items-center gap-1 border border-[#1F1305] bg-white px-2.5 py-1 text-[#1F1305] font-bold shadow-[2px_2px_0px_#1F1305] hover:bg-[#1F1305] hover:text-white transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Añadir Fuente</span>
          </button>
        </div>

        {fuentes.length > 0 ? (
          <div className="space-y-2">
            {fuentes.map((f, idx) => (
              <div
                key={f.id}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 border border-[#1F1305]/30 bg-white p-2.5 shadow-[2px_2px_0px_#1F1305]"
              >
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] font-bold text-[#5A5245] w-4">{idx + 1}.</span>
                  <select
                    value={f.tipo}
                    onChange={(e) => handleUpdateFuente(f.id, "tipo", e.target.value)}
                    className="border border-[#1F1305] bg-[#EDE0D0] px-2 py-1 text-[11px] font-bold focus:outline-none"
                  >
                    <option value="PRIMARIA">Primaria (Galleta / Matriz / Partida)</option>
                    <option value="SECUNDARIA">Secundaria (Prensa / Entrevista / Web)</option>
                  </select>
                </div>

                <input
                  type="text"
                  value={f.referencia}
                  onChange={(e) => handleUpdateFuente(f.id, "referencia", e.target.value)}
                  placeholder="Referencia: ej. 'Galleta LP Infopesa 8012 - Pista A1' o 'Entrevista a Casahuamán (1981)'"
                  className="flex-1 border border-[#1F1305]/30 px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-[#E80000]"
                />

                <input
                  type="text"
                  value={f.fecha || ""}
                  onChange={(e) => handleUpdateFuente(f.id, "fecha", e.target.value)}
                  placeholder="Año / Fecha"
                  className="w-24 border border-[#1F1305]/30 px-2 py-1 text-xs focus:outline-none"
                />

                <button
                  type="button"
                  onClick={() => handleRemoveFuente(f.id)}
                  className="text-[#E80000] hover:bg-[#E80000] hover:text-white p-1 border border-transparent hover:border-[#1F1305] transition-colors"
                  title="Eliminar fuente"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="italic text-[#5A5245] text-[11px]">
            No hay fuentes anexadas a este expediente. Haz clic en &ldquo;Añadir Fuente&rdquo; para registrar galletas o referencias documentales.
          </p>
        )}
      </div>
    </div>
  );
}
