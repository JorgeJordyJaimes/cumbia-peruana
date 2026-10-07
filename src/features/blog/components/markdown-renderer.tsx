import React from "react";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

/**
 * Renderizador ligero y nativo de Markdown editorial para crónicas musicales.
 * Convierte encabezados, citas históricas, párrafos, negritas y listas en elementos
 * semánticos con la estética tipográfica de Kumbia Sound sin dependencias externas pesadas.
 */
export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  if (!content) return null;

  // Dividir por bloques de párrafos (doble salto de línea)
  const blocks = content.split(/\n\s*\n/);

  return (
    <div className={`space-y-6 text-[#1F1305] font-sans text-base sm:text-lg leading-relaxed ${className}`}>
      {blocks.map((block, bIdx) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // Encabezado nivel 1 (# Titulo)
        if (trimmed.startsWith("# ")) {
          return (
            <h1
              key={bIdx}
              className="font-cooper text-3xl sm:text-4xl lg:text-5xl font-black text-[#1F1305] tracking-tight pt-4 pb-2 border-b-2 border-[#1F1305]"
            >
              {renderInline(trimmed.slice(2))}
            </h1>
          );
        }

        // Encabezado nivel 2 (## Subtitulo)
        if (trimmed.startsWith("## ")) {
          return (
            <h2
              key={bIdx}
              className="font-cooper text-2xl sm:text-3xl font-bold text-[#E80000] tracking-tight pt-4 pb-1 border-b border-[#1F1305]/20"
            >
              {renderInline(trimmed.slice(3))}
            </h2>
          );
        }

        // Encabezado nivel 3 (### Seccion)
        if (trimmed.startsWith("### ")) {
          return (
            <h3
              key={bIdx}
              className="font-cooper text-xl sm:text-2xl font-bold text-[#1F1305] tracking-tight pt-2"
            >
              {renderInline(trimmed.slice(4))}
            </h3>
          );
        }

        // Cita histórica en bloque (> Cita)
        if (trimmed.startsWith("> ")) {
          const quoteLines = trimmed
            .split("\n")
            .map((line) => line.replace(/^>\s?/, ""))
            .join(" ");

          return (
            <blockquote
              key={bIdx}
              className="my-6 border-2 border-l-8 border-[#1F1305] bg-[#EDE0D0] py-4 px-6 italic font-serif text-lg sm:text-xl text-[#1F1305] shadow-[4px_4px_0px_#1F1305]"
            >
              “{renderInline(quoteLines)}”
            </blockquote>
          );
        }

        // Lista con viñetas (- Item o * Item)
        if (trimmed.split("\n").every((l) => l.trim().startsWith("- ") || l.trim().startsWith("* "))) {
          const items = trimmed.split("\n").map((l) => l.trim().replace(/^[-*]\s+/, ""));
          return (
            <ul key={bIdx} className="space-y-2 my-4 pl-6 list-disc list-outside text-[#1F1305]">
              {items.map((item, iIdx) => (
                <li key={iIdx} className="pl-1 text-[#5A5245]">
                  {renderInline(item)}
                </li>
              ))}
            </ul>
          );
        }

        // Párrafo estándar con soporte para saltos de línea internos
        const lines = trimmed.split("\n");
        return (
          <p key={bIdx} className="text-[#5A5245] leading-relaxed">
            {lines.map((line, lIdx) => (
              <React.Fragment key={lIdx}>
                {renderInline(line)}
                {lIdx < lines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}

/**
 * Función para parsear negritas (**bold**), cursivas (*italic*), código (`code`) y enlaces ([text](url))
 */
function renderInline(text: string): React.ReactNode[] {
  // Regex para emparejar enlaces, negritas, cursivas y codigo
  const tokens = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`|\[.*?\]\(.*?\))/g);

  return tokens.map((part, index) => {
    if (!part) return null;

    // Negrita **texto**
    if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
      return (
        <strong key={index} className="font-bold text-[#1F1305]">
          {part.slice(2, -2)}
        </strong>
      );
    }

    // Cursiva *texto*
    if (part.startsWith("*") && part.endsWith("*") && part.length >= 2) {
      return (
        <em key={index} className="italic text-[#1F1305]">
          {part.slice(1, -1)}
        </em>
      );
    }

    // Código en línea `code`
    if (part.startsWith("`") && part.endsWith("`") && part.length >= 2) {
      return (
        <code
          key={index}
          className="border border-[#1F1305] bg-[#EDE0D0] px-1.5 py-0.5 font-mono text-xs font-bold text-[#E80000]"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    // Enlace [texto](url)
    const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
    if (linkMatch) {
      const [, linkText, linkUrl] = linkMatch;
      const isExternal = linkUrl.startsWith("http");
      return (
        <a
          key={index}
          href={linkUrl}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="text-[#E80000] font-bold underline decoration-[#E80000]/60 underline-offset-4 hover:text-[#F1730C] transition-colors"
        >
          {linkText}
        </a>
      );
    }

    return part;
  });
}
