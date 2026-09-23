"use client";

import { useEffect, useState, useMemo } from "react";
import { Search, X, Disc3, Music2, Users, BookOpen, ArrowRight } from "lucide-react";
import { musicosGenealogia, temasDJMock, historiasFondoMock } from "../data/cumbia-mock";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAction?: (sectionId: string) => void;
}

export function CommandPalette({ isOpen, onClose, onSelectAction }: CommandPaletteProps) {
  const [query, setQuery] = useState("");

  // Atajo de teclado global ⌘K o Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Si quisiéramos abrir desde afuera, el padre maneja el estado
        }
      } else if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Bloquear scroll al abrir
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const searchResults = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase();

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
        t.sello.toLowerCase().includes(q) ||
        t.bpm.toString().includes(q) ||
        t.camelot.toLowerCase().includes(q)
    );

    const cronicas = historiasFondoMock.filter(
      (h) => h.titulo.toLowerCase().includes(q) || h.categoria.toLowerCase().includes(q)
    );

    return { musicos, temas, cronicas };
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#16191E] shadow-2xl overflow-hidden transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input Bar */}
        <div className="flex items-center px-4 border-b border-white/10 bg-[#1E2229]">
          <Search className="h-5 w-5 text-[#E5A93C] shrink-0 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por guitarrista, grupo, tema, sello o BPM..."
            className="w-full py-4 bg-transparent font-sans text-base text-[#F3F4F6] placeholder-[#9CA3AF] focus:outline-none"
            autoFocus
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="text-[#9CA3AF] hover:text-white p-1"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block ml-2 rounded border border-white/15 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-[#9CA3AF]">
            ESC
          </kbd>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {!query.trim() ? (
            <div className="py-6 text-center space-y-3 font-mono text-xs text-[#9CA3AF]">
              <p className="text-white/80 font-semibold">Atajos directos del archivo:</p>
              <div className="flex flex-wrap justify-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onSelectAction?.("genealogia");
                    onClose();
                  }}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 hover:border-[#E5A93C]/40 hover:text-[#E5A93C] transition-colors"
                >
                  🧬 Explorador Genealógico
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onSelectAction?.("match-bpm");
                    onClose();
                  }}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 hover:border-[#E5A93C]/40 hover:text-[#E5A93C] transition-colors"
                >
                  🎛️ Consola Match BPM
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onSelectAction?.("radar");
                    onClose();
                  }}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 hover:border-[#E5A93C]/40 hover:text-[#E5A93C] transition-colors"
                >
                  📻 Radar Semanal
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onSelectAction?.("historias");
                    onClose();
                  }}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 hover:border-[#E5A93C]/40 hover:text-[#E5A93C] transition-colors"
                >
                  📖 Crónicas & Blog
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Resultados Músicos */}
              {searchResults && searchResults.musicos.length > 0 && (
                <div className="space-y-1">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#E5A93C] flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5" />
                    Guitarristas & Músicos
                  </span>
                  {searchResults.musicos.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => {
                        onSelectAction?.("genealogia");
                        onClose();
                      }}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 text-left transition-colors group"
                    >
                      <div>
                        <p className="font-serif font-bold text-white group-hover:text-[#E5A93C]">
                          {m.nombre}
                        </p>
                        <p className="font-mono text-xs text-[#9CA3AF]">
                          {m.apodo ? `"${m.apodo}" • ` : ""}
                          {m.rolPrincipal}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-[#9CA3AF] group-hover:text-[#E5A93C] transition-transform group-hover:translate-x-1" />
                    </button>
                  ))}
                </div>
              )}

              {/* Resultados Temas DJ */}
              {searchResults && searchResults.temas.length > 0 && (
                <div className="space-y-1">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#10B981] flex items-center gap-1.5">
                    <Music2 className="h-3.5 w-3.5" />
                    Pistas & Grabaciones (BPM / Camelot)
                  </span>
                  {searchResults.temas.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        onSelectAction?.("match-bpm");
                        onClose();
                      }}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 text-left transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <Disc3 className="h-5 w-5 text-[#E5A93C]" />
                        <div>
                          <p className="font-serif font-bold text-white group-hover:text-[#E5A93C]">
                            {t.titulo}
                          </p>
                          <p className="font-mono text-xs text-[#9CA3AF]">
                            {t.artista} • {t.ano} • {t.sello}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 font-mono text-xs">
                        <span className="px-2 py-0.5 rounded bg-white/5 text-white">
                          {t.bpm} BPM
                        </span>
                        <span className="px-2 py-0.5 rounded bg-[#10B981]/20 text-[#10B981] font-bold">
                          {t.camelot}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Resultados Crónicas */}
              {searchResults && searchResults.cronicas.length > 0 && (
                <div className="space-y-1">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#9CA3AF] flex items-center gap-1.5">
                    <BookOpen className="h-3.5 w-3.5" />
                    Crónicas Históricas
                  </span>
                  {searchResults.cronicas.map((h) => (
                    <a
                      key={h.id}
                      href={`/blog/${h.slug}`}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 text-left transition-colors group"
                    >
                      <div>
                        <p className="font-serif font-bold text-white group-hover:text-[#E5A93C]">
                          {h.titulo}
                        </p>
                        <p className="font-mono text-xs text-[#9CA3AF]">{h.categoria}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-[#9CA3AF] group-hover:text-[#E5A93C]" />
                    </a>
                  ))}
                </div>
              )}

              {/* Sin resultados */}
              {searchResults &&
                searchResults.musicos.length === 0 &&
                searchResults.temas.length === 0 &&
                searchResults.cronicas.length === 0 && (
                  <div className="py-8 text-center font-mono text-xs text-[#9CA3AF]">
                    No se encontraron coincidencias para &quot;{query}&quot;. Prueba buscando
                    &quot;Mirlos&quot;, &quot;Destellos&quot;, &quot;122 BPM&quot; o &quot;Infopesa&quot;.
                  </div>
                )}
            </>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 border-t border-white/10 bg-[#16191E] flex items-center justify-between font-mono text-[11px] text-[#9CA3AF]">
          <span>Navega con ⌘K o haz clic en cualquier resultado</span>
          <button
            type="button"
            onClick={onClose}
            className="hover:text-white transition-colors"
          >
            Cerrar ventana
          </button>
        </div>
      </div>
    </div>
  );
}
