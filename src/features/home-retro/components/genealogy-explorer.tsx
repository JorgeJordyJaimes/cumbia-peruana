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
    <section id="genealogia" className="scroll-mt-24 py-16 sm:py-20 border-t border-white/5">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 space-y-10">
        {/* Cabecera de Sección */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-5">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#E5A93C]">
              <GitFork className="h-4 w-4" />
              <span>{isHighlight ? "Destacado del Archivo" : "Valor Cultural Único"}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-black tracking-tight text-[#F3F4F6]">
              Explorador Genealógico & Músicos de Sesión
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#9CA3AF] leading-relaxed">
              En la era dorada, un mismo guitarrista virtuoso grababa el Lado A de un disco con una
              agrupación y el fin de semana acompañaba a otro conjunto bajo un sello rival. Descubre
              las redes invisibles que forjaron el sonido peruano.
            </p>
          </div>

          <Link
            href="/genealogia"
            className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[#E5A93C] hover:text-white hover:underline transition-colors shrink-0"
          >
            <span>{isHighlight ? "Abrir apartado completo de genealogía" : "Explorar biografías cruzadas"}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Selector de Pioneros */}
        <div className="flex flex-wrap gap-2 font-mono text-xs">
          {musicosGenealogia.map((musico) => {
            const isSelected = musico.id === selectedMusicoId;
            return (
              <button
                key={musico.id}
                type="button"
                onClick={() => setSelectedMusicoId(musico.id)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 transition-all ${
                  isSelected
                    ? "bg-[#E5A93C] text-black font-bold shadow-lg shadow-[#E5A93C]/20 scale-105"
                    : "border border-white/10 bg-[#16191E] text-[#9CA3AF] hover:text-white hover:bg-white/5"
                }`}
              >
                <Guitar className="h-3.5 w-3.5" />
                <span>{musico.nombre}</span>
              </button>
            );
          })}
        </div>

        {/* Tarjeta Visualizadora de Flujo Genealógico */}
        <div className="rounded-3xl border border-white/10 bg-[#16191E] p-6 sm:p-10 shadow-2xl space-y-8">
          {/* Ficha del Músico */}
          <div className="flex flex-col lg:flex-row items-start justify-between gap-6 border-b border-white/10 pb-8">
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                <span className="rounded-full bg-[#10B981]/20 border border-[#10B981]/30 px-3 py-0.5 text-[#10B981] font-semibold">
                  {currentMusico.periodoActivo}
                </span>
                {currentMusico.apodo && (
                  <span className="text-[#E5A93C] italic font-serif text-sm">
                    &ldquo;{currentMusico.apodo}&rdquo;
                  </span>
                )}
              </div>

              <h3 className="font-serif text-2xl sm:text-4xl font-extrabold text-[#F3F4F6]">
                {currentMusico.nombre}
              </h3>

              <p className="font-mono text-xs text-[#E5A93C] flex items-center gap-2">
                <Award className="h-4 w-4" />
                <span>{currentMusico.rolPrincipal}</span>
              </p>

              <p className="font-sans text-sm sm:text-base text-[#9CA3AF] leading-relaxed">
                {currentMusico.biografiaResumen}
              </p>
            </div>

            {/* Instrumentos / Equipamiento */}
            <div className="rounded-2xl border border-white/10 bg-[#1E2229] p-5 w-full lg:w-72 space-y-2.5 font-mono text-xs">
              <span className="text-[10px] uppercase tracking-wider text-[#9CA3AF]">
                Instrumentos & Sonoridad
              </span>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {currentMusico.instrumentos.map((inst, idx) => (
                  <span
                    key={idx}
                    className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-white text-[11px]"
                  >
                    🎸 {inst}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Trayectoria & Cruces (Nodos de Conexión) */}
          <div className="space-y-4">
            <span className="font-mono text-xs uppercase tracking-wider text-[#9CA3AF] flex items-center gap-2">
              <GitFork className="h-4 w-4 text-[#E5A93C]" />
              Conexiones de Grabación & Agrupaciones Históricas
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentMusico.trayectoria.map((step, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-[#1E2229] p-5 space-y-4 hover:border-[#E5A93C]/40 transition-colors relative overflow-hidden"
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="font-serif font-black text-lg text-white">
                      {step.grupo}
                    </span>
                    <span className="font-mono text-[11px] text-[#E5A93C] bg-[#E5A93C]/10 border border-[#E5A93C]/20 px-2 py-0.5 rounded-full">
                      {step.anos}
                    </span>
                  </div>

                  <div className="space-y-2 font-mono text-xs">
                    <div>
                      <span className="text-[10px] text-[#9CA3AF] block">Rol de Estudio:</span>
                      <span className="text-neutral-200">{step.rol}</span>
                    </div>

                    <div>
                      <span className="text-[10px] text-[#9CA3AF] block flex items-center gap-1">
                        <Building2 className="h-3 w-3 text-[#10B981]" /> Sellos Discográficos:
                      </span>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {step.sellos.map((s, sIdx) => (
                          <span
                            key={sIdx}
                            className="rounded bg-white/5 px-2 py-0.5 text-[11px] text-white"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/5">
                      <span className="text-[10px] text-[#9CA3AF] block flex items-center gap-1">
                        <Disc3 className="h-3 w-3 text-[#E5A93C]" /> Grabaciones Notables:
                      </span>
                      <p className="font-serif italic text-xs text-neutral-300 pt-1">
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
          <div className="rounded-2xl border border-[#E5A93C]/20 bg-gradient-to-r from-[#16191E] via-[#1E2229] to-[#16191E] p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <p className="font-serif text-base font-bold text-white flex items-center justify-center sm:justify-start gap-2">
                <GitFork className="h-4 w-4 text-[#E5A93C]" />
                ¿Quieres rastrear más guitarristas, agrupaciones y sellos?
              </p>
              <p className="font-mono text-xs text-[#9CA3AF]">
                Accede a más de 360 músicos de sesión, árboles de cruce y sellos discográficos en el apartado dedicado.
              </p>
            </div>
            <Link
              href="/genealogia"
              className="inline-flex items-center gap-2 rounded-xl bg-[#E5A93C] px-5 py-2.5 font-mono text-xs font-bold text-black hover:bg-[#d6992d] transition-all shrink-0"
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
