"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Users,
  Building2,
  BookOpen,
  Radio,
  Scale,
  Search,
  Edit3,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { EditorPericial, type EstadoEditorial } from "./editor-pericial";
import { AdminBlogManager } from "./admin-blog-manager";
import type { AdminGroupItem, AdminPersonItem } from "./admin-media-manager";
import type { Articulo } from "@/types/blog";
import { HALLAZGO_DEL_MES_ACTUAL } from "@/features/radar";

interface AdminMesaRedaccionProps {
  groups: AdminGroupItem[];
  persons: AdminPersonItem[];
  articles: Articulo[];
}

type SubSeccionRedaccion = "mesa" | "informes" | "agrupaciones" | "notas" | "radar" | "legajo";

export function AdminMesaRedaccion({
  groups,
  persons,
  articles,
}: AdminMesaRedaccionProps) {
  const [subSeccion, setSubSeccion] = useState<SubSeccionRedaccion>("mesa");
  const [filterTipo, setFilterTipo] = useState<string>("TODOS");
  const [filterEstado, setFilterEstado] = useState<string>("TODOS");
  const [searchQuery, setSearchQuery] = useState("");

  // Estado para editor activo de Informe de Músico
  const [editingPersonId, setEditingPersonId] = useState<number | null>(null);

  // Estado para editor activo de Historia de Agrupación
  const [editingGroupId, setEditingGroupId] = useState<number | null>(null);

  // Estado para Radar del Mes
  const [radarData, setRadarData] = useState(HALLAZGO_DEL_MES_ACTUAL);
  const [radarSaved, setRadarSaved] = useState(false);

  // Estado para Bloques de Legajo
  const [bloquesLegajo, setBloquesLegajo] = useState<{ [key: string]: string }>({
    acta_fundacional: "El colectivo Kumbia Sound nace como iniciativa de coleccionistas e investigadores fonográficos con anterioridad a la creación de este archivo digital...",
    equipo_peritaje: "Peritos fonográficos, transcriptores y digitalizadores de matrices en vinilo de 33 y 45 RPM.",
    normas_catalogacion: "1. Lados A/B estrictos. 2. Aislamiento de la columna VOZ. 3. Notación Camelot exclusiva. 4. Duraciones a segundos enteros.",
    solicitud_rectificacion: "Procedimiento pericial formal aportando fotografías de galletas matrices o registros notariales de época.",
    contacto_canales: "Fonoteca oficial en YouTube y Spotify Master.",
  });
  const [editingLegajoClave, setEditingLegajoClave] = useState<string | null>(null);

  // Persona seleccionada para editar informe
  const selectedPerson = persons.find((p) => p.id === editingPersonId);
  const selectedGroup = groups.find((g) => g.id === editingGroupId);

  // Lista consolidada de ítems editoriales
  const todosItems = [
    // Artículos
    ...articles.map((a) => ({
      id: `nota-${a.id}`,
      rawId: a.id,
      tipo: "nota" as const,
      tipoLabel: "Nota de Investigación",
      titulo: a.titulo,
      codigo: "EXP. 06",
      estado: (a.publicado ? "publicado" : "borrador") as EstadoEditorial,
      updatedAt: a.updated_at || a.fecha_publicacion,
      autor: a.autor_nombre,
    })),
    // Informes de Personas
    ...persons.slice(0, 15).map((p) => ({
      id: `persona-${p.id}`,
      rawId: p.id,
      tipo: "informe" as const,
      tipoLabel: "Informe de Músico",
      titulo: `${p.name}${p.nickname ? ` «${p.nickname}»` : ""}`,
      codigo: `INF-${String(p.id).padStart(4, "0")}`,
      estado: (p.photoUrl ? "publicado" : "borrador") as EstadoEditorial,
      updatedAt: new Date().toISOString(),
      autor: "Peritaje Fonográfico",
    })),
    // Agrupaciones
    ...groups.slice(0, 10).map((g) => ({
      id: `grupo-${g.id}`,
      rawId: g.id,
      tipo: "agrupacion" as const,
      tipoLabel: "Historia de Agrupación",
      titulo: g.name,
      codigo: `AGR-${String(g.id).padStart(3, "0")}`,
      estado: (g.photoUrl ? "publicado" : "borrador") as EstadoEditorial,
      updatedAt: new Date().toISOString(),
      autor: "Comisión Histórica",
    })),
  ];

  const itemsFiltrados = todosItems.filter((item) => {
    const matchSearch =
      searchQuery === "" ||
      item.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.codigo.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchSearch) return false;

    if (filterTipo !== "TODOS" && item.tipo !== filterTipo) return false;
    if (filterEstado !== "TODOS" && item.estado !== filterEstado) return false;

    return true;
  });

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* ============================================================ */}
      {/* 1. NAVEGACIÓN SECUNDARIA DE REDACCIÓN                        */}
      {/* ============================================================ */}
      <div className="border-2 border-[#1F1305] bg-white p-3 shadow-[4px_4px_0px_#1F1305] flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: "mesa" as SubSeccionRedaccion, label: "Mesa de Redacción", icon: FileText },
            { id: "informes" as SubSeccionRedaccion, label: "Informes Músicos", icon: Users },
            { id: "agrupaciones" as SubSeccionRedaccion, label: "Historias Agrupaciones", icon: Building2 },
            { id: "notas" as SubSeccionRedaccion, label: "Notas (Blog)", icon: BookOpen },
            { id: "radar" as SubSeccionRedaccion, label: "Radar Mensual", icon: Radio },
            { id: "legajo" as SubSeccionRedaccion, label: "Legajo Institucional", icon: Scale },
          ].map((tab) => {
            const isActive = subSeccion === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setSubSeccion(tab.id);
                  setEditingPersonId(null);
                  setEditingGroupId(null);
                  setEditingLegajoClave(null);
                }}
                className={`flex items-center gap-1.5 border-2 border-[#1F1305] px-3 py-1.5 font-bold transition-all ${
                  isActive
                    ? "bg-[#1F1305] text-[#EDE0D0] shadow-[2px_2px_0px_#E80000]"
                    : "bg-[#EDE0D0] text-[#1F1305] hover:bg-white"
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? "text-[#F8C800]" : "text-[#E80000]"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <span className="text-[11px] text-[#5A5245] font-bold">
          Centro Editorial Kumbia Sound
        </span>
      </div>

      {/* ============================================================ */}
      {/* 2. SUB-VISTA: MESA DE REDACCIÓN CONSOLIDADA                  */}
      {/* ============================================================ */}
      {subSeccion === "mesa" && (
        <div className="space-y-4">
          {/* Barra de Filtros y Búsqueda */}
          <div className="border-2 border-[#1F1305] bg-white p-4 shadow-[4px_4px_0px_#1F1305] space-y-3">
            <div className="flex flex-col md:flex-row gap-3 justify-between items-stretch md:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#1F1305]/60" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar texto por título, orquesta o código (ej. 'Casahuamán', 'INF-0005')..."
                  className="w-full border-2 border-[#1F1305] bg-[#EDE0D0]/30 pl-9 pr-3 py-1.5 text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#E80000]"
                />
              </div>

              {/* Filtro por Tipo */}
              <div className="flex items-center gap-2">
                <span className="text-[#5A5245] font-bold">Tipo:</span>
                <select
                  value={filterTipo}
                  onChange={(e) => setFilterTipo(e.target.value)}
                  className="border-2 border-[#1F1305] bg-[#EDE0D0] px-2 py-1 font-bold text-xs focus:outline-none"
                >
                  <option value="TODOS">Todos los tipos</option>
                  <option value="informe">Informes (Músicos)</option>
                  <option value="agrupacion">Historias (Grupos)</option>
                  <option value="nota">Notas de Investigación</option>
                </select>
              </div>

              {/* Filtro por Estado */}
              <div className="flex items-center gap-2">
                <span className="text-[#5A5245] font-bold">Estado:</span>
                <select
                  value={filterEstado}
                  onChange={(e) => setFilterEstado(e.target.value)}
                  className="border-2 border-[#1F1305] bg-[#EDE0D0] px-2 py-1 font-bold text-xs focus:outline-none"
                >
                  <option value="TODOS">Todos los estados</option>
                  <option value="publicado">Publicados</option>
                  <option value="borrador">Borradores</option>
                </select>
              </div>
            </div>
          </div>

          {/* Tabla Unificada de Textos */}
          <div className="border-2 border-[#1F1305] bg-white shadow-[4px_4px_0px_#1F1305] overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#1F1305] text-[#EDE0D0] border-b-2 border-[#1F1305] text-[11px]">
                <tr>
                  <th className="p-3">CÓDIGO</th>
                  <th className="p-3">TIPO</th>
                  <th className="p-3">TÍTULO DEL TEXTO</th>
                  <th className="p-3">ESTADO</th>
                  <th className="p-3">AUTORÍA</th>
                  <th className="p-3 text-right">ACCIONES</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1F1305]/20">
                {itemsFiltrados.map((item) => (
                  <tr key={item.id} className="hover:bg-[#EDE0D0]/30 transition-colors">
                    <td className="p-3">
                      <span className="border border-[#1F1305] bg-[#EDE0D0] px-2 py-0.5 font-black text-[#1F1305]">
                        {item.codigo}
                      </span>
                    </td>
                    <td className="p-3 font-bold text-[#5A5245]">
                      {item.tipoLabel}
                    </td>
                    <td className="p-3">
                      <div className="font-bold text-[#1F1305] text-sm">
                        {item.titulo}
                      </div>
                    </td>
                    <td className="p-3">
                      <span
                        className={`border px-2 py-0.5 font-black uppercase text-[10px] ${
                          item.estado === "publicado"
                            ? "bg-[#10B981] text-white border-[#1F1305]"
                            : "bg-[#F1730C] text-white border-[#1F1305]"
                        }`}
                      >
                        {item.estado}
                      </span>
                    </td>
                    <td className="p-3 text-[#5A5245]">
                      {item.autor}
                    </td>
                    <td className="p-3 text-right">
                      {item.tipo === "informe" && (
                        <Link
                          href={`/admin/persona/${item.rawId}`}
                          className="border border-[#1F1305] bg-[#1F1305] text-white px-2.5 py-1 font-bold hover:bg-[#E80000] transition-colors inline-block"
                        >
                          <Edit3 className="h-3 w-3 inline mr-1" /> Editar
                        </Link>
                      )}
                      {item.tipo === "agrupacion" && (
                        <Link
                          href={`/admin/grupo/${item.rawId}`}
                          className="border border-[#1F1305] bg-[#1F1305] text-white px-2.5 py-1 font-bold hover:bg-[#E80000] transition-colors inline-block"
                        >
                          <Edit3 className="h-3 w-3 inline mr-1" /> Editar
                        </Link>
                      )}
                      {item.tipo === "nota" && (
                        <button
                          type="button"
                          onClick={() => setSubSeccion("notas")}
                          className="border border-[#1F1305] bg-[#1F1305] text-white px-2.5 py-1 font-bold hover:bg-[#E80000] transition-colors"
                        >
                          <Edit3 className="h-3 w-3 inline mr-1" /> Editar
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 3. SUB-VISTA: INFORMES DE MÚSICOS                            */}
      {/* ============================================================ */}
      {subSeccion === "informes" && (
        <div className="space-y-6">
          {!editingPersonId ? (
            <div className="space-y-4">
              <div className="border-b-2 border-[#1F1305] pb-2 flex items-center justify-between">
                <div>
                  <h3 className="font-cooper text-xl font-black text-[#1F1305]">
                    Directorio de Informes Periciales de Músicos
                  </h3>
                  <p className="text-[#5A5245]">
                    Selecciona un músico pionero o sesionista para redactar o actualizar su expediente pericial.
                  </p>
                </div>
                <span className="font-bold">{persons.length} personas</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {persons.slice(0, 30).map((p) => (
                  <div
                    key={p.id}
                    className="border-2 border-[#1F1305] bg-white p-4 shadow-[3px_3px_0px_#1F1305] flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="border border-[#1F1305] bg-[#EDE0D0] px-1.5 py-0.2 font-black">
                          INF-{String(p.id).padStart(4, "0")}
                        </span>
                        <span
                          className={`font-bold ${
                            p.photoUrl ? "text-[#10B981]" : "text-[#E80000]"
                          }`}
                        >
                          {p.photoUrl ? "● Con Retrato" : "○ Sin Retrato"}
                        </span>
                      </div>
                      <h4 className="font-cooper text-base font-black text-[#1F1305]">
                        {p.name}
                      </h4>
                      {p.nickname && (
                        <p className="text-[#E80000] font-bold">«{p.nickname}»</p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-[#1F1305]/20">
                      <Link
                        href={`/admin/persona/${p.id}`}
                        className="flex-1 flex items-center justify-center gap-1 border border-[#1F1305] bg-[#1F1305] text-white py-1.5 font-bold hover:bg-[#E80000] transition-colors"
                      >
                        <Edit3 className="h-3 w-3" /> Ficha Pericial
                      </Link>
                      <Link
                        href={`/informes/${p.id}`}
                        target="_blank"
                        className="border border-[#1F1305] bg-white p-1.5 hover:bg-[#EDE0D0] transition-colors"
                        title="Ver en web pública"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : selectedPerson ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b-2 border-[#1F1305] pb-2">
                <button
                  type="button"
                  onClick={() => setEditingPersonId(null)}
                  className="font-bold text-[#E80000] hover:underline"
                >
                  ← Volver al Listado de Músicos
                </button>
                <span className="font-bold text-[#5A5245]">
                  Editando Informe INF-{String(selectedPerson.id).padStart(4, "0")}
                </span>
              </div>

              <EditorPericial
                idEntidad={selectedPerson.id}
                tipoEntidad="informe"
                codigoEntidad={`INF-${String(selectedPerson.id).padStart(4, "0")}`}
                tituloEntidad={selectedPerson.name}
                initialContent={`# Dictamen Biográfico: ${selectedPerson.name}\n\nConocido en los créditos fonográficos como **«${selectedPerson.nickname || "S/A"}»**.\n\n## Trayectoria de Sesión\nPionero y músico de sesión fundamental en la época de oro de la cumbia peruana, registrando grabaciones en estudios de Lima.\n\n> "Grabamos con guitarras eléctricas importadas y pastillas modificadas para conseguir ese sonido punzante y brillante."`}
                initialSello={selectedPerson.photoUrl ? "PRIMARIA" : "SIN_VERIFICAR"}
                initialFuentes={[
                  {
                    id: "f-1",
                    tipo: "PRIMARIA",
                    referencia: "Cotejo de matriz y galleta en disco de 45 RPM original",
                  },
                ]}
                onSave={async (data) => {
                  console.log("Guardando informe de persona:", selectedPerson.id, data);
                  alert(`Informe de ${selectedPerson.name} guardado con éxito como ${data.estado.toUpperCase()}`);
                }}
              />
            </div>
          ) : null}
        </div>
      )}

      {/* ============================================================ */}
      {/* 4. SUB-VISTA: HISTORIAS & ETAPAS DE AGRUPACIONES            */}
      {/* ============================================================ */}
      {subSeccion === "agrupaciones" && (
        <div className="space-y-6">
          {!editingGroupId ? (
            <div className="space-y-4">
              <div className="border-b-2 border-[#1F1305] pb-2 flex items-center justify-between">
                <div>
                  <h3 className="font-cooper text-xl font-black text-[#1F1305]">
                    Relatos Históricos &amp; Etapas de Agrupaciones
                  </h3>
                  <p className="text-[#5A5245]">
                    Documenta la narrativa pericial y las etapas cronológicas (directores y voces) para Genealogía.
                  </p>
                </div>
                <span className="font-bold">{groups.length} agrupaciones</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {groups.map((g) => (
                  <div
                    key={g.id}
                    className="border-2 border-[#1F1305] bg-white p-4 shadow-[3px_3px_0px_#1F1305] flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="border border-[#1F1305] bg-[#EDE0D0] px-1.5 py-0.2 font-black">
                          AGR-{String(g.id).padStart(3, "0")}
                        </span>
                        <span className="text-[#5A5245]">{g.totalAlbums} vinilos</span>
                      </div>
                      <h4 className="font-cooper text-base font-black text-[#1F1305]">
                        {g.name}
                      </h4>
                      {g.directorName && (
                        <p className="text-[11px] text-[#5A5245]">Dir: {g.directorName}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-[#1F1305]/20">
                      <Link
                        href={`/admin/grupo/${g.id}`}
                        className="flex-1 flex items-center justify-center gap-1 border border-[#1F1305] bg-[#1F1305] text-white py-1.5 font-bold hover:bg-[#E80000] transition-colors"
                      >
                        <Edit3 className="h-3 w-3" /> Historia &amp; Etapas
                      </Link>
                      <Link
                        href={`/admin/grupo/${g.id}`}
                        className="border border-[#1F1305] bg-white p-1.5 hover:bg-[#EDE0D0] transition-colors"
                        title="Ver gestor de vinilos"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : selectedGroup ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b-2 border-[#1F1305] pb-2">
                <button
                  type="button"
                  onClick={() => setEditingGroupId(null)}
                  className="font-bold text-[#E80000] hover:underline"
                >
                  ← Volver al Listado de Agrupaciones
                </button>
                <span className="font-bold text-[#5A5245]">
                  Editando Historia de {selectedGroup.name} (AGR-{String(selectedGroup.id).padStart(3, "0")})
                </span>
              </div>

              <EditorPericial
                idEntidad={selectedGroup.id}
                tipoEntidad="grupo"
                codigoEntidad={`AGR-${String(selectedGroup.id).padStart(3, "0")}`}
                tituloEntidad={`Historia & Etapas: ${selectedGroup.name}`}
                initialContent={`# Historia Pericial: ${selectedGroup.name}\n\nFundada bajo la dirección de **${selectedGroup.directorName || "Dirección Colegiada"}**.\n\n## Etapa Fundacional (1974–1976)\nDefinición del timbre identitario en prensajes de vinilo de 33 y 45 RPM.\n\n## Etapa de Tránsito & Re-grabaciones\nEvolución de vocalistas y primeras guitarras con arreglos orquestales contemporáneos.`}
                onSave={async (data) => {
                  console.log("Guardando historia de grupo:", selectedGroup.id, data);
                  alert(`Historia de ${selectedGroup.name} guardada con éxito.`);
                }}
              />
            </div>
          ) : null}
        </div>
      )}

      {/* ============================================================ */}
      {/* 5. SUB-VISTA: NOTAS DE INVESTIGACIÓN (BLOG CMS)              */}
      {/* ============================================================ */}
      {subSeccion === "notas" && (
        <div className="space-y-4">
          <AdminBlogManager initialArticles={articles} />
        </div>
      )}

      {/* ============================================================ */}
      {/* 6. SUB-VISTA: RADAR MENSUAL                                  */}
      {/* ============================================================ */}
      {subSeccion === "radar" && (
        <div className="border-2 border-[#1F1305] bg-white p-6 shadow-[6px_6px_0px_#1F1305] space-y-6">
          <div className="border-b-2 border-[#1F1305] pb-3 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="border border-[#1F1305] bg-[#E80000] text-white px-2 py-0.2 font-black uppercase text-[10px]">
                  EXP. 05
                </span>
                <h3 className="font-cooper text-2xl font-black text-[#1F1305]">
                  Gestor del Hallazgo Mensual (Radar Sonoro)
                </h3>
              </div>
              <p className="text-[#5A5245] mt-0.5">
                Configura los 4 puntos canónicos del hallazgo mensual que alimentan la vitrina de descubrimiento y la comunidad.
              </p>
            </div>

            {radarSaved && (
              <span className="border border-[#10B981] bg-[#10B981]/10 px-3 py-1 font-bold text-[#10B981] flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4" /> Hallazgo Guardado
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Punto 1: Qué es */}
            <div className="space-y-3">
              <span className="font-black text-[#E80000] uppercase">1. QUÉ ES · IDENTIDAD &amp; CATEGORÍA</span>
              <div className="space-y-2">
                <div>
                  <label className="block text-[11px] font-bold text-[#5A5245] mb-1">Categoría Canónica:</label>
                  <select
                    value={radarData.categoria}
                    onChange={(e) => setRadarData({ ...radarData, categoria: e.target.value as typeof radarData.categoria })}
                    className="w-full border-2 border-[#1F1305] bg-[#EDE0D0] p-2 font-bold focus:outline-none"
                  >
                    <option value="Álbum del Mes">Álbum del Mes</option>
                    <option value="Voz Rescatada">Voz Rescatada</option>
                    <option value="Agrupación Olvidada">Agrupación Olvidada</option>
                    <option value="Subgénero a Descubrir">Subgénero a Descubrir</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#5A5245] mb-1">Título del Hallazgo:</label>
                  <input
                    type="text"
                    value={radarData.titulo}
                    onChange={(e) => setRadarData({ ...radarData, titulo: e.target.value })}
                    className="w-full border-2 border-[#1F1305] p-2 focus:outline-none focus:ring-2 focus:ring-[#E80000]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#5A5245] mb-1">Subtítulo / Bajada:</label>
                  <input
                    type="text"
                    value={radarData.subtitulo}
                    onChange={(e) => setRadarData({ ...radarData, subtitulo: e.target.value })}
                    className="w-full border-2 border-[#1F1305] p-2 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#5A5245] mb-1">Artista / Orquesta:</label>
                  <input
                    type="text"
                    value={radarData.artista}
                    onChange={(e) => setRadarData({ ...radarData, artista: e.target.value })}
                    className="w-full border-2 border-[#1F1305] p-2 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Punto 3: Escúchalo & Punto 4: Explóralo */}
            <div className="space-y-3">
              <span className="font-black text-[#E80000] uppercase">3. ESCÚCHALO &amp; 4. EXPLÓRALO</span>
              <div className="space-y-2">
                <div>
                  <label className="block text-[11px] font-bold text-[#5A5245] mb-1">URL de YouTube (Fonoteca Externa):</label>
                  <input
                    type="text"
                    value={radarData.youtubeUrl || ""}
                    onChange={(e) => setRadarData({ ...radarData, youtubeUrl: e.target.value })}
                    className="w-full border-2 border-[#1F1305] p-2 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#5A5245] mb-1">URL de Spotify (Sesión Externa):</label>
                  <input
                    type="text"
                    value={radarData.spotifyUrl || ""}
                    onChange={(e) => setRadarData({ ...radarData, spotifyUrl: e.target.value })}
                    className="w-full border-2 border-[#1F1305] p-2 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#5A5245] mb-1">Enlace a Expediente en Kumbia Sound:</label>
                  <input
                    type="text"
                    value={radarData.enlaceExpediente.url}
                    onChange={(e) =>
                      setRadarData({
                        ...radarData,
                        enlaceExpediente: { ...radarData.enlaceExpediente, url: e.target.value },
                      })
                    }
                    className="w-full border-2 border-[#1F1305] p-2 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Punto 2: Por qué importa */}
          <div className="space-y-2 pt-2 border-t-2 border-[#1F1305]">
            <span className="font-black text-[#E80000] uppercase">2. POR QUÉ IMPORTA · VALOR HISTÓRICO PATRIMONIAL</span>
            <textarea
              rows={4}
              value={radarData.porQueImporta}
              onChange={(e) => setRadarData({ ...radarData, porQueImporta: e.target.value })}
              className="w-full border-2 border-[#1F1305] p-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#E80000]"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={() => {
                setRadarSaved(true);
                setTimeout(() => setRadarSaved(false), 3000);
              }}
              className="border-2 border-[#1F1305] bg-[#E80000] text-white px-6 py-2.5 font-black shadow-[3px_3px_0px_#1F1305] hover:bg-[#1F1305] transition-all"
            >
              Guardar Hallazgo del Mes
            </button>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 7. SUB-VISTA: LEGAJO INSTITUCIONAL                           */}
      {/* ============================================================ */}
      {subSeccion === "legajo" && (
        <div className="border-2 border-[#1F1305] bg-white p-6 shadow-[6px_6px_0px_#1F1305] space-y-6">
          <div className="border-b-2 border-[#1F1305] pb-3">
            <h3 className="font-cooper text-2xl font-black text-[#1F1305]">
              Gestión de Bloques del Legajo Institucional
            </h3>
            <p className="text-[#5A5245]">
              Edita los textos normativos y manifiestos de Kumbia Sound.
            </p>
          </div>

          <div className="space-y-4">
            {Object.entries(bloquesLegajo).map(([clave, valor]) => (
              <div key={clave} className="border-2 border-[#1F1305] p-4 bg-[#EDE0D0]/30 space-y-2">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="font-black uppercase text-[#E80000]">{clave.replace("_", " ")}</span>
                  <button
                    type="button"
                    onClick={() => setEditingLegajoClave(editingLegajoClave === clave ? null : clave)}
                    className="border border-[#1F1305] bg-white px-2 py-0.5 font-bold hover:bg-[#1F1305] hover:text-white"
                  >
                    {editingLegajoClave === clave ? "Cerrar Editor" : "Editar Bloque"}
                  </button>
                </div>

                {editingLegajoClave === clave ? (
                  <div className="pt-2 space-y-2">
                    <textarea
                      rows={5}
                      value={valor}
                      onChange={(e) => setBloquesLegajo({ ...bloquesLegajo, [clave]: e.target.value })}
                      className="w-full border-2 border-[#1F1305] p-2 bg-white text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setEditingLegajoClave(null);
                        alert("Bloque de Legajo guardado exitosamente.");
                      }}
                      className="border border-[#1F1305] bg-[#10B981] text-white px-3 py-1 font-bold"
                    >
                      Guardar Cambios
                    </button>
                  </div>
                ) : (
                  <p className="font-sans text-xs text-[#5A5245] line-clamp-2">{valor}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
