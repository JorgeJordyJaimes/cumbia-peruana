"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, X, Disc3, Music2, Users, BookOpen, ArrowRight } from "lucide-react";
import { musicosGenealogia, temasDJMock, historiasFondoMock } from "../data/cumbia-mock";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAction?: (sectionId: string) => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter();
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
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl border-2 border-[#1F1305] bg-[#EDE0D0] text-[#1F1305] shadow-[8px_8px_0px_#1F1305] overflow-hidden transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input Bar */}
        <div className="flex items-center px-4 border-b-2 border-[#1F1305] bg-white">
          <Search className="h-5 w-5 text-[#E80000] shrink-0 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por guitarrista, grupo, tema, sello o BPM..."
            className="w-full py-4 bg-transparent font-sans text-base text-[#1F1305] placeholder-[#746B5C] font-medium focus:outline-none"
            autoFocus
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="text-[#746B5C] hover:text-[#1F1305] p-1"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block ml-2 border border-[#1F1305] bg-[#EDE0D0] px-2 py-0.5 font-mono text-[10px] font-bold text-[#1F1305] shadow-[1px_1px_0px_#1F1305]">
            ESC
          </kbd>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4 bg-[#EDE0D0]">
          {!query.trim() ? (
            <div className="py-6 text-center space-y-3 font-mono text-xs text-[#5A5245]">
              <p className="text-[#1F1305] font-bold uppercase tracking-wider">Apartados directos del archivo:</p>
              <div className="flex flex-wrap justify-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    router.push("/genealogia");
                    onClose();
                  }}
                  className="border-2 border-[#1F1305] bg-white px-3 py-1.5 font-bold text-[#1F1305] shadow-[2px_2px_0px_#1F1305] hover:bg-[#1F1305] hover:text-[#EDE0D0] hover:shadow-[2px_2px_0px_#E80000] transition-colors"
                >
                  🧬 Explorador Genealógico
                </button>
                <button
                  type="button"
                  onClick={() => {
                    router.push("/match-bpm");
                    onClose();
                  }}
                  className="border-2 border-[#1F1305] bg-white px-3 py-1.5 font-bold text-[#1F1305] shadow-[2px_2px_0px_#1F1305] hover:bg-[#1F1305] hover:text-[#EDE0D0] hover:shadow-[2px_2px_0px_#E80000] transition-colors"
                >
                  🎛️ Consola Match BPM
                </button>
                <button
                  type="button"
                  onClick={() => {
                    router.push("/radar");
                    onClose();
                  }}
                  className="border-2 border-[#1F1305] bg-white px-3 py-1.5 font-bold text-[#1F1305] shadow-[2px_2px_0px_#1F1305] hover:bg-[#1F1305] hover:text-[#EDE0D0] hover:shadow-[2px_2px_0px_#E80000] transition-colors"
                >
                  📻 Radar Semanal
                </button>
                <button
                  type="button"
                  onClick={() => {
                    router.push("/blog");
                    onClose();
                  }}
                  className="border-2 border-[#1F1305] bg-white px-3 py-1.5 font-bold text-[#1F1305] shadow-[2px_2px_0px_#1F1305] hover:bg-[#1F1305] hover:text-[#EDE0D0] hover:shadow-[2px_2px_0px_#E80000] transition-colors"
                >
                  📖 Crónicas & Blog
                </button>
                <button
                  type="button"
                  onClick={() => {
                    router.push("/nosotros");
                    onClose();
                  }}
                  className="border-2 border-[#1F1305] bg-white px-3 py-1.5 font-bold text-[#1F1305] shadow-[2px_2px_0px_#1F1305] hover:bg-[#1F1305] hover:text-[#EDE0D0] hover:shadow-[2px_2px_0px_#E80000] transition-colors"
                >
                  🛡️ Nosotros & Manifiesto
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Resultados Músicos */}
              {searchResults && searchResults.musicos.length > 0 && (
                <div className="space-y-1.5">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#E80000] flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5" />
                    Guitarristas & Músicos
                  </span>
                  {searchResults.musicos.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => {
                        router.push("/genealogia");
                        onClose();
                      }}
                      className="w-full flex items-center justify-between p-3 border-2 border-[#1F1305] bg-white shadow-[2px_2px_0px_#1F1305] hover:shadow-[3px_3px_0px_#E80000] text-left transition-all group"
                    >
                      <div>
                        <p className="font-cooper font-bold text-[#1F1305] group-hover:text-[#E80000]">
                          {m.nombre}
                        </p>
                        <p className="font-mono text-xs text-[#5A5245]">
                          {m.apodo ? `"${m.apodo}" • ` : ""}
                          {m.rolPrincipal}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-[#E80000] group-hover:translate-x-1 transition-transform" />
                    </button>
                  ))}
                </div>
              )}

              {/* Resultados Temas DJ */}
              {searchResults && searchResults.temas.length > 0 && (
                <div className="space-y-1.5">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#10B981] flex items-center gap-1.5">
                    <Music2 className="h-3.5 w-3.5" />
                    Pistas & Grabaciones (BPM / Camelot)
                  </span>
                  {searchResults.temas.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        router.push("/match-bpm");
                        onClose();
                      }}
                      className="w-full flex items-center justify-between p-3 border-2 border-[#1F1305] bg-white shadow-[2px_2px_0px_#1F1305] hover:shadow-[3px_3px_0px_#E80000] text-left transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <Disc3 className="h-5 w-5 text-[#F1730C]" />
                        <div>
                          <p className="font-cooper font-bold text-[#1F1305] group-hover:text-[#E80000]">
                            {t.titulo}
                          </p>
                          <p className="font-mono text-xs text-[#5A5245]">
                            {t.artista} • {t.ano} • {t.sello}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 font-mono text-xs font-bold">
                        <span className="px-2 py-0.5 border border-[#1F1305] bg-[#EDE0D0] text-[#1F1305]">
                          {t.bpm} BPM
                        </span>
                        <span className="px-2 py-0.5 border border-[#1F1305] bg-[#10B981] text-white">
                          {t.camelot}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Resultados Crónicas */}
              {searchResults && searchResults.cronicas.length > 0 && (
                <div className="space-y-1.5">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#746B5C] flex items-center gap-1.5">
                    <BookOpen className="h-3.5 w-3.5 text-[#F1730C]" />
                    Crónicas Históricas
                  </span>
                  {searchResults.cronicas.map((h) => (
                    <button
                      key={h.id}
                      type="button"
                      onClick={() => {
                        router.push(`/blog/${h.slug}`);
                        onClose();
                      }}
                      className="w-full flex items-center justify-between p-3 border-2 border-[#1F1305] bg-white shadow-[2px_2px_0px_#1F1305] hover:shadow-[3px_3px_0px_#E80000] text-left transition-all group"
                    >
                      <div>
                        <p className="font-cooper font-bold text-[#1F1305] group-hover:text-[#E80000]">
                          {h.titulo}
                        </p>
                        <p className="font-mono text-xs text-[#5A5245]">{h.categoria}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-[#E80000] group-hover:translate-x-1 transition-transform" />
                    </button>
                  ))}
                </div>
              )}

              {/* Sin resultados */}
              {searchResults &&
                searchResults.musicos.length === 0 &&
                searchResults.temas.length === 0 &&
                searchResults.cronicas.length === 0 && (
                  <div className="py-8 text-center font-mono text-xs text-[#5A5245] border-2 border-[#1F1305] bg-white p-4">
                    No se encontraron coincidencias para &quot;{query}&quot;. Prueba buscando
                    &quot;Mirlos&quot;, &quot;Destellos&quot;, &quot;122 BPM&quot; o &quot;Infopesa&quot;.
                  </div>
                )}
            </>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 border-t-2 border-[#1F1305] bg-white flex items-center justify-between font-mono text-[11px] font-bold text-[#5A5245]">
          <span>Navega con ⌘K o haz clic en cualquier resultado</span>
          <button
            type="button"
            onClick={onClose}
            className="hover:text-[#E80000] transition-colors"
          >
            Cerrar [ESC]
          </button>
        </div>
      </div>
    </div>
  );
}
