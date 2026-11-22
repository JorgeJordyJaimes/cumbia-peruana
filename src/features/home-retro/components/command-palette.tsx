"use client";

import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X, Disc3, Music2, User, BookOpen, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

type SearchResultType = "album" | "tema" | "persona" | "articulo";

interface SearchResult {
  id: string;
  type: SearchResultType;
  title: string;
  subtitle: string;
  href: string;
  badge?: string;
}

const TYPE_LABEL: Record<SearchResultType, string> = {
  album: "Vinilo",
  tema: "Tema",
  persona: "Músico",
  articulo: "Crónica",
};

const TYPE_ICON: Record<SearchResultType, typeof Disc3> = {
  album: Disc3,
  tema: Music2,
  persona: User,
  articulo: BookOpen,
};

function normalizeSearchTerm(value: string): string {
  // Se eliminan caracteres que PostgREST interpreta como separadores de filtros.
  return value.replace(/[%,()]/g, " ").replace(/\s+/g, " ").trim();
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const lastActiveElementRef = useRef<HTMLElement | null>(null);

  const trimmedQuery = deferredQuery.trim();
  const isSearching = trimmedQuery.length >= 2;
  const isStale = query.trim() !== trimmedQuery;

  // Búsqueda real contra el catálogo público. No se usa dataset mock.
  useEffect(() => {
    if (!isOpen || trimmedQuery.length < 2) return;

    let cancelled = false;
    const term = normalizeSearchTerm(trimmedQuery);
    if (!term) return;

    const timer = setTimeout(async () => {
      const supabase = createClient();
      const pattern = `%${term}%`;

      const [albumsResult, temasResult, personasResult, articlesResult] = await Promise.all([
        supabase
          .from("albumes")
          .select(`
            id_album,
            nombre_album,
            numero_catalogo,
            grupos (nombre_grupo),
            tipos_album (nombre_tipo)
          `)
          .or(`nombre_album.ilike.${pattern},numero_catalogo.ilike.${pattern}`)
          .limit(5),
        supabase
          .from("temas")
          .select(`
            id_tema,
            titulo_tema,
            albumes_temas (
              id_album,
              lado,
              albumes (nombre_album)
            ),
            temas_grupos (grupos (nombre_grupo))
          `)
          .ilike("titulo_tema", pattern)
          .limit(5),
        supabase
          .from("personas")
          .select("id_persona, nombre, apodo")
          .or(`nombre.ilike.${pattern},apodo.ilike.${pattern}`)
          .limit(5),
        supabase
          .from("articulos")
          .select("slug, titulo, categoria, resumen")
          .eq("publicado", true)
          .or(`titulo.ilike.${pattern},resumen.ilike.${pattern}`)
          .limit(5),
      ]);

      if (cancelled) return;

      const nextResults: SearchResult[] = [];

      for (const album of (albumsResult.data || []) as Array<{
        id_album: number;
        nombre_album: string | null;
        numero_catalogo: string | null;
        grupos: { nombre_grupo: string } | null;
        tipos_album: { nombre_tipo: string } | null;
      }>) {
        nextResults.push({
          id: `album-${album.id_album}`,
          type: "album",
          title: album.nombre_album || `Single [Cat: ${album.numero_catalogo || album.id_album}]`,
          subtitle: [
            album.grupos?.nombre_grupo || "Varios Artistas",
            album.tipos_album?.nombre_tipo,
          ]
            .filter(Boolean)
            .join(" • "),
          href: `/album/${album.id_album}`,
          badge: album.numero_catalogo || undefined,
        });
      }

      for (const tema of (temasResult.data || []) as Array<{
        id_tema: number;
        titulo_tema: string;
        albumes_temas: Array<{
          id_album: number;
          lado: string | null;
          albumes: { nombre_album: string | null } | null;
        }> | null;
        temas_grupos: Array<{ grupos: { nombre_grupo: string } | null }> | null;
      }>) {
        const albumTema = tema.albumes_temas?.[0];
        const grupo = tema.temas_grupos?.[0]?.grupos?.nombre_grupo;
        nextResults.push({
          id: `tema-${tema.id_tema}`,
          type: "tema",
          title: tema.titulo_tema,
          subtitle: [
            grupo || "Agrupación histórica",
            albumTema?.albumes?.nombre_album,
            albumTema?.lado ? `Lado ${albumTema.lado}` : null,
          ]
            .filter(Boolean)
            .join(" • "),
          href: albumTema ? `/album/${albumTema.id_album}` : "/vinilos",
        });
      }

      for (const persona of (personasResult.data || []) as Array<{
        id_persona: number;
        nombre: string;
        apodo: string | null;
      }>) {
        nextResults.push({
          id: `persona-${persona.id_persona}`,
          type: "persona",
          title: persona.nombre,
          subtitle: persona.apodo ? `«${persona.apodo}»` : "Expediente biográfico",
          href: `/informes/${persona.id_persona}`,
        });
      }

      for (const article of (articlesResult.data || []) as Array<{
        slug: string;
        titulo: string;
        categoria: string;
        resumen: string | null;
      }>) {
        nextResults.push({
          id: `articulo-${article.slug}`,
          type: "articulo",
          title: article.titulo,
          subtitle: article.categoria || article.resumen || "Crónica de archivo",
          href: `/blog/${article.slug}`,
        });
      }

      setResults(nextResults);
      setSelectedIndex(0);
    }, 180);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [isOpen, trimmedQuery]);

  // Foco y bloqueo de scroll. Sin setState síncrono dentro del efecto.
  useEffect(() => {
    if (!isOpen) return;
    lastActiveElementRef.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
      if (lastActiveElementRef.current && document.body.contains(lastActiveElementRef.current)) {
        lastActiveElementRef.current.focus();
      }
    };
  }, [isOpen]);

  const visibleResults = useMemo(
    () => (isSearching ? results : []),
    [isSearching, results]
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
        return;
      }

      if (!isOpen || visibleResults.length === 0) return;

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % visibleResults.length);
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + visibleResults.length) % visibleResults.length);
      } else if (event.key === "Enter") {
        event.preventDefault();
        const target = visibleResults[Math.min(selectedIndex, visibleResults.length - 1)];
        if (target) {
          router.push(target.href);
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, router, selectedIndex, visibleResults]);

  if (!isOpen) return null;

  const activeIndex = visibleResults.length > 0
    ? Math.min(selectedIndex, visibleResults.length - 1)
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl border-2 border-[#1F1305] bg-[#EDE0D0] text-[#1F1305] shadow-[8px_8px_0px_#1F1305] overflow-hidden transition-all"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center px-4 border-b-2 border-[#1F1305] bg-white">
          <Search className="h-5 w-5 text-[#E80000] shrink-0 mr-3" />
          <input
            type="text"
            role="combobox"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-controls="command-palette-results"
            aria-autocomplete="list"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Buscar álbum, tema, músico, sello o crónica..."
            className="w-full py-4 bg-transparent font-sans text-base text-[#1F1305] placeholder-[#746B5C] font-medium focus:outline-none"
            autoFocus
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="text-[#665D4F] hover:text-[#1F1305] p-1"
              aria-label="Limpiar búsqueda"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block ml-2 border border-[#1F1305] bg-[#EDE0D0] px-2 py-0.5 font-mono text-[10px] font-bold text-[#1F1305] shadow-[1px_1px_0px_#1F1305]">
            ESC
          </kbd>
        </div>

        <div id="command-palette-results" role="listbox" className="max-h-[60vh] overflow-y-auto p-4 space-y-4 bg-[#EDE0D0] overscroll-contain">
          {!query.trim() ? (
            <div className="py-6 text-center space-y-3 font-mono text-xs text-[#5A5245]">
              <p className="text-[#1F1305] font-bold uppercase tracking-wider">Apartados directos del archivo:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  { label: "🧬 Explorador Genealógico", href: "/genealogia" },
                  { label: "🎛️ Consola Match BPM", href: "/match-bpm" },
                  { label: "📻 Radar Mensual", href: "/radar" },
                  { label: "📖 Crónicas & Blog", href: "/blog" },
                  { label: "🛡️ Legajo Institucional", href: "/legajo" },
                ].map((item) => (
                  <button
                    key={item.href}
                    type="button"
                    onClick={() => {
                      router.push(item.href);
                      onClose();
                    }}
                    className="border-2 border-[#1F1305] bg-white px-3 py-1.5 font-bold text-[#1F1305] shadow-[2px_2px_0px_#1F1305] hover:bg-[#1F1305] hover:text-[#EDE0D0] hover:shadow-[2px_2px_0px_#E80000] transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          ) : visibleResults.length > 0 ? (
            <div className="space-y-1.5">
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#665D4F]">
                Resultados del catálogo
              </span>
              {visibleResults.map((result, index) => {
                const Icon = TYPE_ICON[result.type];
                return (
                  <button
                    key={result.id}
                    type="button"
                    role="option"
                    aria-selected={index === activeIndex}
                    onMouseEnter={() => setSelectedIndex(index)}
                    onClick={() => {
                      router.push(result.href);
                      onClose();
                    }}
                    className={`w-full flex items-center justify-between gap-3 p-3 border-2 border-[#1F1305] text-left transition-all group ${
                      index === activeIndex
                        ? "bg-[#1F1305] text-[#EDE0D0] shadow-[3px_3px_0px_#E80000]"
                        : "bg-white text-[#1F1305] shadow-[2px_2px_0px_#1F1305] hover:shadow-[3px_3px_0px_#E80000]"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon className={`h-5 w-5 shrink-0 ${index === activeIndex ? "text-[#F8C800]" : "text-[#F1730C]"}`} />
                      <div className="min-w-0">
                        <p className="font-cooper text-base font-bold truncate">{result.title}</p>
                        <p className={`font-mono text-[11px] truncate ${index === activeIndex ? "text-[#EDE0D0]/70" : "text-[#5A5245]"}`}>
                          {TYPE_LABEL[result.type]} • {result.subtitle}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {result.badge && (
                        <span className={`font-mono text-[10px] font-bold px-2 py-0.5 border ${
                          index === activeIndex
                            ? "border-[#EDE0D0]/30 text-[#EDE0D0]"
                            : "border-[#1F1305] bg-[#EDE0D0] text-[#1F1305]"
                        }`}>
                          {result.badge}
                        </span>
                      )}
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="py-8 text-center font-mono text-xs text-[#5A5245] border-2 border-[#1F1305] bg-white p-4">
              {isStale || (isSearching && results.length === 0)
                ? `No se encontraron coincidencias para "${query}".`
                : "Escribe al menos dos caracteres para buscar en el catálogo."}
            </div>
          )}
        </div>

        <div className="px-4 py-2.5 border-t-2 border-[#1F1305] bg-white flex items-center justify-between font-mono text-[11px] font-bold text-[#5A5245]">
          <span>Busca en el catálogo real del archivo</span>
          <button type="button" onClick={onClose} className="hover:text-[#E80000] transition-colors">
            Cerrar [ESC]
          </button>
        </div>
      </div>
    </div>
  );
}
