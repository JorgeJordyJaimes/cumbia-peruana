import { Sparkles, Compass } from "lucide-react";
import Link from "next/link";

export function NosotrosManifiesto() {
  return (
    <section id="manifiesto" className="scroll-mt-24 py-12 sm:py-20 border-t-2 border-[#1F1305]">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 space-y-12">
        {/* BLOQUE EDITORIAL / MANIFIESTO */}
        <div className="border-2 border-[#1F1305] bg-white text-[#1F1305] p-8 sm:p-12 lg:p-16 shadow-[8px_8px_0px_#1F1305] relative overflow-hidden">
          <div className="max-w-3xl space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 border border-[#1F1305] bg-[#F1730C] px-3 py-1 font-mono text-xs font-bold text-[#1F1305] shadow-[2px_2px_0px_#1F1305]">
              <Sparkles className="h-4 w-4" />
              <span>MANIFIESTO KUMBIA SOUND</span>
            </div>

            <h2 className="font-cooper text-3xl sm:text-5xl font-black text-[#1F1305] tracking-tight leading-tight [text-wrap:balance]">
              Quiénes somos &amp; Por qué existimos
            </h2>

            <div className="max-w-[65ch] space-y-4 font-sans text-base leading-[1.7] text-[#1F1305] [text-wrap:pretty]">
              <p>
                <strong>Kumbia Sound (KS)</strong> es un proyecto cultural nacido en <strong>Bucaramanga</strong>, una ciudad con una fascinación poco común en Colombia por la cumbia en todas sus formas: cumbia, tecnocumbia, y las voces de Colombia, Perú, Argentina, México, Chile y Ecuador.
              </p>
              <p>
                Quienes hacemos KS crecimos entre cientos de canciones de todos esos países y, con el tiempo, nuestro oído se quedó en dos lugares: la cumbia colombiana y, sobre todo, la <strong>cumbia peruana</strong>. Allí está nuestro centro.
              </p>
              <p>
                Creemos que la cumbia peruana es un universo inmenso que se escucha de forma muy pequeña. En los bailes suenan siempre los mismos temas; cambia el orden, pero no el repertorio. Se baila y se disfruta, pero casi nadie se pregunta quién canta, quién toca la guitarra, a qué subgénero pertenece la canción o qué sello la editó. Sin esa curiosidad, la música nueva no entra, y un género vivo se vuelve repetición.
              </p>
              <p className="font-cooper text-lg font-bold text-[#E80000]">
                KS existe para romper esa monotonía y demostrar que hay joyas escondidas que merecen ser escuchadas.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-4 font-mono text-xs font-bold text-[#1F1305]">
              <Link
                href="/legajo"
                className="inline-flex items-center gap-1.5 border-2 border-[#1F1305] bg-[#E80000] text-white px-4 py-2 shadow-[2px_2px_0px_#1F1305] hover:bg-[#1F1305] transition-colors"
              >
                <Compass className="h-4 w-4" />
                <span>LEER LEGAJO COMPLETO (MISIÓN &amp; PRINCIPIOS) →</span>
              </Link>
            </div>
          </div>

          {/* Sello decorativo de fondo */}
          <div className="absolute -bottom-12 -right-8 text-black/[0.03] font-anton text-[260px] font-black pointer-events-none select-none leading-none">
            KS
          </div>
        </div>
      </div>
    </section>
  );
}
