"use client";

import { useState } from "react";
import Link from "next/link";
import { Building2, Disc3, ArrowRight, GitFork, Guitar, Award } from "lucide-react";
import { musicosGenealogia } from "../data/cumbia-mock";

interface GenealogyExplorerProps {
  isHighlight?: boolean;
}

export function GenealogyExplorer({ isHighlight = false }: GenealogyExplorerProps) {
  const [selectedMusicoId, setSelectedMusicoId] = useState(musicosGenealogia[0].id);

  const currentMusico =
    musicosGenealogia.find((m) => m.id === selectedMusicoId) || musicosGenealogia[0];

  return (
    <section id="genealogia" className="scroll-mt-24 py-12 sm:py-16 border-t-2 border-[#1F1305]">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 space-y-8">
        {/* Cabecera de Sección */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-[#1F1305] pb-5">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[#E80000]">
              <GitFork className="h-4 w-4" />
              <span>{isHighlight ? "Destacado del Archivo" : "Redes de Sesión & Linajes"}</span>
            </div>
            <h2 className="font-cooper text-3xl sm:text-5xl font-black tracking-tight text-[#1F1305]">
              Explorador Genealógico & Músicos de Sesión
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#5A5245] leading-relaxed">
              En la era dorada, un mismo guitarrista virtuoso grababa el Lado A de un disco con una
              agrupación y el fin de semana acompañaba a otro conjunto bajo un sello rival. Descubre
              las redes invisibles que forjaron el sonido peruano.
            </p>
          </div>

          <Link
            href="/genealogia"
            className="inline-flex items-center gap-2 border-2 border-[#1F1305] bg-white px-4 py-2 font-mono text-xs font-bold text-[#1F1305] shadow-[3px_3px_0px_#1F1305] hover:bg-[#1F1305] hover:text-[#EDE0D0] hover:shadow-[3px_3px_0px_#E80000] transition-all active:translate-x-0.5 active:translate-y-0.5 shrink-0"
          >
            <span>{isHighlight ? "Abrir apartado completo" : "Explorar biografías cruzadas"}</span>
            <ArrowRight className="h-4 w-4 text-[#E80000]" />
          </Link>
        </div>

        {/* Selector de Pioneros */}
        <div className="flex flex-wrap gap-2.5 font-mono text-xs">
          {musicosGenealogia.map((musico) => {
            const isSelected = musico.id === selectedMusicoId;
            return (
              <button
                key={musico.id}
                type="button"
                onClick={() => setSelectedMusicoId(musico.id)}
                className={`flex items-center gap-2 border-2 border-[#1F1305] px-4 py-2 font-mono text-xs font-bold transition-all ${
                  isSelected
                    ? "bg-[#1F1305] text-[#EDE0D0] shadow-[3px_3px_0px_#E80000]"
                    : "bg-white text-[#1F1305] shadow-[2px_2px_0px_#1F1305] hover:bg-[#EDE0D0] hover:translate-x-0.5"
                }`}
              >
                <Guitar className="h-3.5 w-3.5 text-[#F1730C]" />
                <span>{musico.nombre}</span>
              </button>
            );
          })}
        </div>

        {/* Tarjeta Visualizadora de Flujo Genealógico */}
        <div className="border-2 border-[#1F1305] bg-white p-6 sm:p-10 shadow-[6px_6px_0px_#1F1305] space-y-8">
          {/* Ficha del Músico */}
          <div className="flex flex-col lg:flex-row items-start justify-between gap-6 border-b-2 border-[#1F1305] pb-8">
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                <span className="border border-[#1F1305] bg-[#10B981] px-3 py-0.5 font-bold text-white shadow-[2px_2px_0px_#1F1305]">
                  {currentMusico.periodoActivo}
                </span>
                {currentMusico.apodo && (
                  <span className="text-[#F1730C] font-bold font-cooper text-base">
                    &ldquo;{currentMusico.apodo}&rdquo;
                  </span>
                )}
              </div>

              <h3 className="font-cooper text-2xl sm:text-4xl font-extrabold text-[#1F1305]">
                {currentMusico.nombre}
              </h3>

              <p className="font-mono text-xs font-bold text-[#E80000] flex items-center gap-2 uppercase tracking-wide">
                <Award className="h-4 w-4" />
                <span>{currentMusico.rolPrincipal}</span>
              </p>

              <p className="font-sans text-sm sm:text-base text-[#5A5245] leading-relaxed">
                {currentMusico.biografiaResumen}
              </p>
            </div>

            {/* Instrumentos / Equipamiento */}
            <div className="border-2 border-[#1F1305] bg-[#EDE0D0] p-5 w-full lg:w-72 space-y-2.5 font-mono text-xs shadow-[3px_3px_0px_#1F1305]">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#1F1305] block border-b border-[#1F1305]/20 pb-1">
                Instrumentos & Sonoridad
              </span>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {currentMusico.instrumentos.map((inst, idx) => (
                  <span
                    key={idx}
                    className="border border-[#1F1305] bg-white px-2.5 py-1 text-[#1F1305] font-bold text-[11px] shadow-[1px_1px_0px_#1F1305]"
                  >
                    🎸 {inst}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Trayectoria & Cruces (Nodos de Conexión) */}
          <div className="space-y-4">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1F1305] flex items-center gap-2">
              <GitFork className="h-4 w-4 text-[#E80000]" />
              Conexiones de Grabación & Agrupaciones Históricas
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentMusico.trayectoria.map((step, idx) => (
                <div
                  key={idx}
                  className="border-2 border-[#1F1305] bg-[#EDE0D0]/40 p-5 space-y-4 shadow-[3px_3px_0px_#1F1305] hover:shadow-[3px_3px_0px_#E80000] hover:bg-white transition-all relative overflow-hidden"
                >
                  <div className="flex items-center justify-between border-b-2 border-[#1F1305] pb-3">
                    <span className="font-cooper font-black text-lg text-[#1F1305]">
                      {step.grupo}
                    </span>
                    <span className="font-mono text-[11px] font-bold text-white bg-[#F1730C] border border-[#1F1305] px-2 py-0.5 shadow-[1px_1px_0px_#1F1305]">
                      {step.anos}
                    </span>
                  </div>

                  <div className="space-y-2 font-mono text-xs">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-[#746B5C] block">Rol de Estudio:</span>
                      <span className="text-[#1F1305] font-medium">{step.rol}</span>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold uppercase text-[#746B5C] block flex items-center gap-1">
                        <Building2 className="h-3 w-3 text-[#10B981]" /> Sellos Discográficos:
                      </span>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {step.sellos.map((s, sIdx) => (
                          <span
                            key={sIdx}
                            className="border border-[#1F1305] bg-white px-2 py-0.5 text-[11px] font-bold text-[#1F1305]"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#1F1305]/20">
                      <span className="text-[10px] font-bold uppercase text-[#746B5C] block flex items-center gap-1">
                        <Disc3 className="h-3 w-3 text-[#F1730C]" /> Grabaciones Notables:
                      </span>
                      <p className="font-serif italic text-xs text-[#1F1305] pt-1">
                        {step.temasClave.join(" • ")}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA al Apartado Completo si es Vista Destacada */}
        {isHighlight && (
          <div className="border-2 border-[#1F1305] bg-[#F1730C] text-white p-5 sm:p-6 shadow-[4px_4px_0px_#1F1305] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <p className="font-cooper text-base sm:text-lg font-bold text-white flex items-center justify-center sm:justify-start gap-2">
                <GitFork className="h-4 w-4" />
                ¿Quieres rastrear más guitarristas, agrupaciones y sellos?
              </p>
              <p className="font-mono text-xs text-white/90">
                Accede a más de 360 músicos de sesión, árboles de cruce y sellos discográficos en el archivo.
              </p>
            </div>
            <Link
              href="/genealogia"
              className="inline-flex items-center gap-2 border-2 border-[#1F1305] bg-[#1F1305] text-[#EDE0D0] px-5 py-2.5 font-mono text-xs font-bold shadow-[3px_3px_0px_#EDE0D0] hover:bg-white hover:text-[#1F1305] transition-all shrink-0"
            >
              <span>Abrir Genealogía Completa</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
