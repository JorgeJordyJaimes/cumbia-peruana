"use client";

import { useState } from "react";
import Link from "next/link";
import { Building2, Calendar, MapPin, Users, Disc, UserCheck, ArrowRight, GitBranch } from "lucide-react";

export interface GrupoItem {
  id_grupo: number;
  nombre_grupo: string;
  region: string | null;
  fecha_formacion: string | null;
  url_foto: string | null;
  director?: {
    id_persona: number;
    nombre: string;
    apodo: string | null;
  } | null;
  etapas?: Array<{
    periodo: string;
    nombre: string;
    descripcion: string;
    director?: string;
    voces?: string;
  }>;
}

interface TabAgrupacionesProps {
  grupos: GrupoItem[];
}

// Datos de contexto pericial histórico para etapas de orquestas paradigmáticas
const ETAPAS_HISTORICAS: Record<string, Array<{ periodo: string; nombre: string; descripcion: string; director: string; voces: string }>> = {
  "Grupo Celeste": [
    {
      periodo: "1974 – 1976",
      nombre: "Etapa Casahuamán / Chacalón (Fundacional)",
      descripcion: "Víctor Casahuamán funda la agrupación en el Rímac. Fichan a Lorenzo Palacios 'Chacalón' para grabar los sencillos que definen la cumbia con temática testimonial y lírica provinciana.",
      director: "Víctor Casahuamán",
      voces: "Lorenzo Palacios 'Chacalón'",
    },
    {
      periodo: "1977 – 1980",
      nombre: "Etapa de Consolidación & Tránsito",
      descripcion: "Tras la salida de Chacalón para formar La Nueva Crema, el Grupo Celeste incorpora a Claudio Morán y Manuel Mantilla en las voces, manteniendo la primera guitarra y arreglos de Casahuamán.",
      director: "Víctor Casahuamán",
      voces: "Claudio Morán, Manuel Mantilla",
    },
    {
      periodo: "1981 en adelante",
      nombre: "Etapa Tardía / Re-grabaciones",
      descripcion: "Lanzamiento de álbumes antológicos y re-grabaciones en sello Infopesa y Horóscopo con arreglos contemporáneos y nuevos timbres orquestales.",
      director: "Víctor Casahuamán",
      voces: "Voces rotativas de sesión",
    },
  ],
  "Los Destellos": [
    {
      periodo: "1968 – 1974",
      nombre: "Etapa Dorada / Guitarra Eléctrica Solista",
      descripcion: "Enrique Delgado Montes revoluciona la música peruana fusionando el punteo criollo con rock psicodélico e instrumentación tropical bajo el sello Odeón / Iempsa.",
      director: "Enrique Delgado Montes",
      voces: "Instrumental / Claudio Morán / Félix Martínez",
    },
    {
      periodo: "1975 – 1985",
      nombre: "Etapa de Consagración Nacional",
      descripcion: "Giras continentales y producción constante de álbumes de 33 RPM que consolidan la cumbia instrumental y bailable en todo el Perú.",
      director: "Enrique Delgado Montes",
      voces: "Néstor Quintero, Claudio Morán",
    },
  ],
  "Juaneco y su Combo": [
    {
      periodo: "1966 – 1977",
      nombre: "Etapa Clásica Selvática (Wong / Rodríguez)",
      descripcion: "Juan Wong en el acordeón y sintetizador con Noé Fachín en la primera guitarra eléctrica componen las melodías amazónicas inmortales grabadas en Infopesa.",
      director: "Juan Wong Paredes",
      voces: "Wilindro Peña",
    },
    {
      periodo: "1977 en adelante",
      nombre: "Resurgimiento y Legado Amazónico",
      descripcion: "Tras la tragedia aérea de 1977, Juan Wong lidera la refundación del conjunto preservando el repertorio e identidad selvática.",
      director: "Juan Wong Paredes",
      voces: "Wilindro Peña",
    },
  ],
};

export function TabAgrupaciones({ grupos }: TabAgrupacionesProps) {
  const [selectedGrupoId, setSelectedGrupoId] = useState<number>(grupos[0]?.id_grupo || 1);

  const grupoActual = grupos.find((g) => g.id_grupo === selectedGrupoId) || grupos[0];

  if (!grupoActual) {
    return (
      <div className="border-2 border-[#1F1305] bg-white p-8 text-center font-mono text-xs">
        No hay agrupaciones indexadas disponibles.
      </div>
    );
  }

  const codigoExpediente = `AGR-${String(grupoActual.id_grupo).padStart(3, "0")}`;
  const etapas = ETAPAS_HISTORICAS[grupoActual.nombre_grupo] || [
    {
      periodo: "Época Documentada",
      nombre: "Período Fonográfico Registrado",
      descripcion: `Formación orquestal documentada en archivos fonográficos con grabaciones en discos de 33 y 45 RPM bajo dirección de ${grupoActual.director?.nombre || "Dirección Colegiada"}.`,
      director: grupoActual.director?.nombre || "No especificado",
      voces: "Voces de planta y músicos de sesión",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Selector de Agrupaciones (Chips Brutalistas) */}
      <div className="border-2 border-[#1F1305] bg-white p-5 shadow-[4px_4px_0px_#1F1305] space-y-3">
        <div className="flex items-center justify-between font-mono text-xs border-b border-[#1F1305]/20 pb-2">
          <span className="font-black text-[#E80000] flex items-center gap-1.5 uppercase">
            <Building2 className="h-4 w-4" /> Selección de Agrupación Fonográfica:
          </span>
          <span className="text-[#5A5245]">{grupos.length} agrupaciones catalogadas</span>
        </div>

        <div className="flex flex-wrap gap-2 font-mono text-xs">
          {grupos.map((g) => {
            const isSelected = g.id_grupo === selectedGrupoId;
            return (
              <button
                key={g.id_grupo}
                type="button"
                onClick={() => setSelectedGrupoId(g.id_grupo)}
                className={`border-2 border-[#1F1305] px-3 py-1.5 font-bold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#1F1305] text-[#EDE0D0] shadow-[2px_2px_0px_#E80000]"
                    : "bg-white text-[#1F1305] hover:bg-[#EDE0D0]"
                }`}
              >
                AGR-{String(g.id_grupo).padStart(3, "0")} · {g.nombre_grupo}
              </button>
            );
          })}
        </div>
      </div>

      {/* Ficha Principal de la Agrupación */}
      <div className="border-2 border-[#1F1305] bg-white p-6 sm:p-10 shadow-[6px_6px_0px_#1F1305] space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 border-b-2 border-[#1F1305] pb-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="border-2 border-[#1F1305] bg-[#1F1305] text-[#EDE0D0] px-2 py-0.5 font-black">
                {codigoExpediente}
              </span>
              <span className="border border-[#1F1305] bg-[#EDE0D0] text-[#1F1305] px-2 py-0.5 font-bold">
                EXPEDIENTE DE AGRUPACIÓN
              </span>
              {grupoActual.region && (
                <span className="flex items-center gap-1 text-[#5A5245] font-bold">
                  <MapPin className="h-3 w-3 text-[#E80000]" /> {grupoActual.region}
                </span>
              )}
            </div>

            <h2 className="font-cooper text-3xl sm:text-5xl font-black text-[#1F1305]">
              {grupoActual.nombre_grupo}
            </h2>

            {grupoActual.director && (
              <div className="pt-1">
                <span className="font-mono text-xs text-[#5A5245]">Director Titular / Fundador: </span>
                <Link
                  href={`/informes/${grupoActual.director.id_persona}`}
                  className="font-mono text-xs font-black text-[#E80000] hover:underline inline-flex items-center gap-1"
                >
                  <span>
                    {grupoActual.director.nombre}
                    {grupoActual.director.apodo ? ` «${grupoActual.director.apodo}»` : ""}
                  </span>
                  <span className="text-[10px] border border-[#E80000] px-1 py-0.2 bg-[#EDE0D0]">
                    [Ver Informe INF-{String(grupoActual.director.id_persona).padStart(4, "0")}]
                  </span>
                </Link>
              </div>
            )}
          </div>

          {/* Acciones */}
          <div className="shrink-0 space-y-2 font-mono text-xs">
            <Link
              href={`/vinilos`}
              className="flex items-center justify-center gap-2 border-2 border-[#1F1305] bg-[#1F1305] text-[#EDE0D0] px-4 py-2 font-black shadow-[3px_3px_0px_#E80000] hover:bg-[#E80000] transition-colors"
            >
              <Disc className="h-4 w-4" />
              <span>Ver Discografía en Vinilos →</span>
            </Link>
          </div>
        </div>

        {/* Cronología de Etapas y Cambios de Dirección / Voces */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs font-black uppercase text-[#1F1305] border-b border-[#1F1305]/20 pb-2">
            <GitBranch className="h-4 w-4 text-[#E80000]" />
            <span>CRONOLOGÍA PERICIAL DE ETAPAS, DIRECTORES & VOCES</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {etapas.map((etapa, idx) => (
              <div
                key={idx}
                className="border-2 border-[#1F1305] bg-[#EDE0D0]/30 p-5 shadow-[3px_3px_0px_#1F1305] space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between font-mono text-[11px] border-b border-[#1F1305]/20 pb-1.5">
                    <span className="border border-[#1F1305] bg-[#1F1305] text-white px-2 py-0.5 font-black">
                      ETAPA {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="font-bold text-[#E80000]">{etapa.periodo}</span>
                  </div>

                  <h3 className="font-cooper text-base font-black text-[#1F1305] leading-snug">
                    {etapa.nombre}
                  </h3>

                  <p className="font-sans text-xs text-[#5A5245] leading-relaxed">
                    {etapa.descripcion}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#1F1305]/20 font-mono text-[11px] space-y-1">
                  <div>
                    <span className="text-[#5A5245]">Dirección: </span>
                    <strong className="text-[#1F1305]">{etapa.director}</strong>
                  </div>
                  <div>
                    <span className="text-[#5A5245]">Voces: </span>
                    <strong className="text-[#E80000]">{etapa.voces}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
