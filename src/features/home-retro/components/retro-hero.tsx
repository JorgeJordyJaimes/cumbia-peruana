"use client";

import { useState, useMemo } from "react";
import { Search, Sparkles, Music2, Users, Disc3, X } from "lucide-react";
import { musicosGenealogia, temasDJMock } from "../data/cumbia-mock";

interface RetroHeroProps {
  totalAlbumes?: number | null;
  totalGrupos?: number | null;
  totalSellos?: number | null;
  totalPersonas?: number | null;
  onSelectEntity?: (type: string, id: string) => void;
}

export function RetroHero({
  totalAlbumes = 719,
  totalGrupos = 581,
  totalSellos = 258,
  totalPersonas = 360,
  onSelectEntity,
}: RetroHeroProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<"todos" | "musicos" | "grupos" | "temas">("todos");

  // Resultados del autocompletado en tiempo real
  const suggestions = useMemo(() => {
    if (!searchTerm.trim() || searchTerm.length < 2) return null;
    const q = searchTerm.toLowerCase();

    const musicos = musicosGenealogia.filter(
      (m) =>
        m.nombre.toLowerCase().includes(q) ||
        (m.apodo && m.apodo.toLowerCase().includes(q)) ||
        m.instrumentos.some((i) => i.toLowerCase().includes(q))
    );

    const temas = temasDJMock.filter(
      (t) =>
        t.titulo.toLowerCase().includes(q) ||
        t.artista.toLowerCase().includes(q) ||
        t.sello.toLowerCase().includes(q)
    );

    return { musicos, temas };
  }, [searchTerm]);

  const hasSuggestions =
    suggestions && (suggestions.musicos.length > 0 || suggestions.temas.length > 0);

  return (
    <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 text-center">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 space-y-8 relative z-10">
        {/* Badge Superior */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#E5A93C]/30 bg-[#E5A93C]/10 px-4 py-1.5 font-mono text-xs font-semibold text-[#E5A93C] shadow-inner">
          <Sparkles className="h-3.5 w-3.5 text-[#E5A93C] animate-pulse" />
          <span>Archivo Histórico & Herramientas DJ</span>
        </div>

        {/* Titular Principal H1 Requerido */}
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#F3F4F6] leading-[1.1] max-w-4xl mx-auto">
          El árbol genealógico y archivo sonoro de la{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E5A93C] via-[#f5c76d] to-[#10B981]">
            cumbia peruana
          </span>
        </h1>

        {/* Párrafo de Apoyo Requerido */}
        <p className="mx-auto max-w-2xl font-sans text-base sm:text-lg text-[#9CA3AF] leading-relaxed">
          Conectamos músicos de sesión, guitarras legendarias, sellos históricos y discografías
          completas. Explora el archivo o sincroniza tu set con Match BPM.
        </p>

        {/* COMPONENTE CENTRAL: Barra de Búsqueda Prominente con Autocompletado */}
        <div className="max-w-2xl mx-auto relative pt-2">
          <div className="relative rounded-2xl border border-white/15 bg-[#16191E] shadow-2xl p-2 focus-within:border-[#E5A93C]/60 transition-all">
            <div className="flex items-center px-3 py-1">
              <Search className="h-5 w-5 text-[#E5A93C] shrink-0 mr-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Busca un guitarrista (ej. Manzanita), tema o sello..."
                className="w-full bg-transparent font-sans text-base text-[#F3F4F6] placeholder-[#9CA3AF] focus:outline-none"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="text-[#9CA3AF] hover:text-white p-1"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Chips de filtro rápido */}
            <div className="flex items-center gap-1.5 pt-2 px-2 border-t border-white/5 font-mono text-[11px] text-[#9CA3AF]">
              <span className="text-white/40 mr-1 hidden sm:inline">Filtrar:</span>
              <button
                type="button"
                onClick={() => setActiveFilter("todos")}
                className={`rounded-md px-2 py-0.5 transition-colors ${
                  activeFilter === "todos"
                    ? "bg-[#E5A93C] text-black font-bold"
                    : "hover:bg-white/5 hover:text-white"
                }`}
              >
                Todos
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter("musicos")}
                className={`rounded-md px-2 py-0.5 transition-colors ${
                  activeFilter === "musicos"
                    ? "bg-[#E5A93C] text-black font-bold"
                    : "hover:bg-white/5 hover:text-white"
                }`}
              >
                Guitarristas
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter("temas")}
                className={`rounded-md px-2 py-0.5 transition-colors ${
                  activeFilter === "temas"
                    ? "bg-[#E5A93C] text-black font-bold"
                    : "hover:bg-white/5 hover:text-white"
                }`}
              >
                Temas & BPM
              </button>
            </div>
          </div>

          {/* Menú Desplegable de Sugerencias en Tiempo Real */}
          {hasSuggestions && (
            <div className="absolute top-full left-0 right-0 mt-2 rounded-2xl border border-white/10 bg-[#16191E] p-3 shadow-2xl z-30 text-left max-h-80 overflow-y-auto space-y-3 animate-in fade-in duration-150">
              {/* Sugerencias de Músicos */}
              {(activeFilter === "todos" || activeFilter === "musicos") &&
                suggestions.musicos.length > 0 && (
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#E5A93C] px-2 flex items-center gap-1">
                      <Users className="h-3 w-3" /> Músicos & Guitarristas de Sesión
                    </span>
                    {suggestions.musicos.map((m) => (
                      <a
                        key={m.id}
                        href="#genealogia"
                        onClick={() => {
                          setSearchTerm("");
                          onSelectEntity?.("musico", m.id);
                        }}
                        className="flex items-center justify-between p-2 rounded-xl hover:bg-white/5 transition-colors group"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="h-7 w-7 rounded-lg bg-[#0D0F12] border border-white/10 flex items-center justify-center text-xs text-[#E5A93C] font-serif font-bold">
                            {m.nombre.charAt(0)}
                          </div>
                          <div>
                            <p className="font-serif text-sm font-bold text-white group-hover:text-[#E5A93C]">
                              {m.nombre}
                            </p>
                            <p className="font-mono text-[11px] text-[#9CA3AF]">
                              {m.apodo ? `"${m.apodo}" • ` : ""}
                              {m.instrumentos[0]}
                            </p>
                          </div>
                        </div>
                        <span className="font-mono text-[10px] text-[#9CA3AF] group-hover:text-white">
                          Ver árbol →
                        </span>
                      </a>
                    ))}
                  </div>
                )}

              {/* Sugerencias de Temas */}
              {(activeFilter === "todos" || activeFilter === "temas") &&
                suggestions.temas.length > 0 && (
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#10B981] px-2 flex items-center gap-1">
                      <Music2 className="h-3 w-3" /> Temas con BPM & Tonalidad
                    </span>
                    {suggestions.temas.map((t) => (
                      <a
                        key={t.id}
                        href="#match-bpm"
                        onClick={() => {
                          setSearchTerm("");
                          onSelectEntity?.("tema", t.id);
                        }}
                        className="flex items-center justify-between p-2 rounded-xl hover:bg-white/5 transition-colors group"
                      >
                        <div className="flex items-center gap-2.5">
                          <Disc3 className="h-4 w-4 text-[#E5A93C]" />
                          <div>
                            <p className="font-serif text-sm font-bold text-white group-hover:text-[#E5A93C]">
                              {t.titulo}
                            </p>
                            <p className="font-mono text-[11px] text-[#9CA3AF]">
                              {t.artista} • {t.ano}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 font-mono text-[11px]">
                          <span className="text-white/80">{t.bpm} BPM</span>
                          <span className="rounded bg-[#10B981]/20 px-1.5 py-0.5 text-[#10B981] font-bold">
                            {t.camelot}
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                )}
            </div>
          )}
        </div>

        {/* Acciones Secundarias y CTAs Requeridos */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2 font-mono text-xs">
          <a
            href="#genealogia"
            className="rounded-xl bg-[#E5A93C] px-6 py-3 font-bold text-black shadow-lg shadow-[#E5A93C]/20 hover:bg-[#d6992d] hover:scale-[1.02] transition-all flex items-center gap-2"
          >
            <Users className="h-4 w-4" />
            <span>Explorar Árbol Genealógico</span>
          </a>

          {/* CTA secundario en botón outline requerido */}
          <a
            href="#match-bpm"
            className="rounded-xl border border-white/20 bg-white/5 px-6 py-3 font-bold text-[#F3F4F6] hover:bg-white/10 hover:border-[#E5A93C]/50 hover:text-[#E5A93C] transition-all flex items-center gap-2"
          >
            <Music2 className="h-4 w-4 text-[#E5A93C]" />
            <span>Abrir herramienta Match BPM</span>
          </a>
        </div>

        {/* Tira de Datos en Vivo */}
        <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto font-mono text-xs">
          <div className="rounded-xl border border-white/10 bg-[#16191E]/90 p-3 text-center">
            <span className="block text-xl sm:text-2xl font-black text-[#E5A93C]">
              {totalAlbumes}
            </span>
            <span className="text-[11px] text-[#9CA3AF]">Vinilos & Prensajes</span>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#16191E]/90 p-3 text-center">
            <span className="block text-xl sm:text-2xl font-black text-[#10B981]">
              {totalGrupos}
            </span>
            <span className="text-[11px] text-[#9CA3AF]">Agrupaciones</span>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#16191E]/90 p-3 text-center">
            <span className="block text-xl sm:text-2xl font-black text-[#F3F4F6]">
              {totalPersonas}
            </span>
            <span className="text-[11px] text-[#9CA3AF]">Músicos & Sesionistas</span>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#16191E]/90 p-3 text-center">
            <span className="block text-xl sm:text-2xl font-black text-[#E5A93C]">
              {totalSellos}
            </span>
            <span className="text-[11px] text-[#9CA3AF]">Sellos Históricos</span>
          </div>
        </div>
      </div>
    </section>
  );
}
