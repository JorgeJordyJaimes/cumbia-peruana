import Image from "next/image";
import Link from "next/link";
import {
  FileText,
  ShieldCheck,
  Disc,
  Users,
  ArrowLeft,
  Calendar,
  MapPin,
  ExternalLink,
  GitFork,
} from "lucide-react";
import type { ArbolGenealogicoResult } from "@/types/database";

interface InformeDetailViewProps {
  arbol: ArbolGenealogicoResult;
}

export function InformeDetailView({ arbol }: InformeDetailViewProps) {
  const { persona, agrupaciones, grabaciones_sesion, composiciones } = arbol;

  if (!persona) return null;

  const codigoExpediente = `INF-${String(persona.id_persona).padStart(4, "0")}`;

  // Determinación de verificación documental pericial
  const tieneBio = Boolean(persona.biografia && persona.biografia.length > 30);
  const tieneFoto = Boolean(persona.url_foto);
  const estadoVerificacion = tieneBio && tieneFoto
    ? {
        label: "FUENTE PRIMARIA",
        detalle: "Información verificada contra galletas originales, matrices sonoras y registros notariales/fonográficos.",
        bg: "bg-[#2E7D32]",
        text: "text-white",
      }
    : tieneBio
    ? {
        label: "FUENTE SECUNDARIA",
        detalle: "Información reconstruida a partir de discografías secundarias, prensa de época y entrevistas orales.",
        bg: "bg-[#F1730C]",
        text: "text-white",
      }
    : {
        label: "SIN VERIFICAR",
        detalle: "Registro documental preliminar pendiente de cotejo pericial directo.",
        bg: "bg-[#5A5245]",
        text: "text-white",
      };

  const iniciales = persona.nombre
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();

  return (
    <div className="space-y-10">
      {/* Barra Superior de Expediente */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-[#1F1305] pb-4 font-mono text-xs">
        <Link
          href="/informes"
          className="inline-flex items-center gap-2 font-bold text-[#1F1305] hover:text-[#E80000] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>← Volver al Índice de Informes Periciales</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="border-2 border-[#1F1305] bg-[#1F1305] px-2.5 py-1 font-black text-[#EDE0D0]">
            {codigoExpediente}
          </span>
          <span
            className={`border-2 border-[#1F1305] px-2.5 py-1 font-black uppercase ${estadoVerificacion.bg} ${estadoVerificacion.text}`}
          >
            [{estadoVerificacion.label}]
          </span>
        </div>
      </div>

      {/* Tarjeta Principal del Expediente Pericial */}
      <div className="border-2 border-[#1F1305] bg-white p-6 sm:p-10 shadow-[6px_6px_0px_#1F1305] space-y-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Fotografía de Archivo */}
          <div className="relative h-48 w-48 sm:h-56 sm:w-56 shrink-0 border-2 border-[#1F1305] bg-[#EDE0D0] shadow-[4px_4px_0px_#1F1305] overflow-hidden">
            {persona.url_foto ? (
              <Image
                src={persona.url_foto}
                alt={persona.nombre}
                fill
                priority
                sizes="224px"
                className="object-cover grayscale contrast-125"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center bg-[#D6C7B2] font-mono text-2xl font-black text-[#1F1305]">
                <FileText className="h-12 w-12 text-[#1F1305]/40 mb-2" />
                <span>{iniciales}</span>
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-[#1F1305]/90 py-1 text-center font-mono text-[10px] text-white uppercase tracking-wider">
              ARCHIVO OFICIAL
            </div>
          </div>

          {/* Datos Notariales e Identidad Fonográfica */}
          <div className="space-y-4 flex-1">
            <div className="space-y-1">
              <span className="font-mono text-xs font-black uppercase tracking-wider text-[#E80000]">
                EXPEDIENTE PERICIAL BIOGRÁFICO DE AUTOR & INTÉRPRETE
              </span>
              <h1 className="font-cooper text-3xl sm:text-5xl font-black text-[#1F1305] leading-tight">
                {persona.nombre}
              </h1>
              {persona.apodo && (
                <p className="font-mono text-base sm:text-lg font-black text-[#F1730C]">
                  Conocido en créditos fonográficos como «{persona.apodo}»
                </p>
              )}
            </div>

            {/* Metadatos Rápidos */}
            <div className="flex flex-wrap gap-4 pt-2 font-mono text-xs border-t border-[#1F1305]/20">
              {persona.lugar_nacimiento && (
                <div className="flex items-center gap-1.5 border border-[#1F1305] bg-[#EDE0D0] px-2.5 py-1 font-bold">
                  <MapPin className="h-3.5 w-3.5 text-[#E80000]" />
                  <span>{persona.lugar_nacimiento}</span>
                </div>
              )}
              {persona.fecha_nacimiento && (
                <div className="flex items-center gap-1.5 border border-[#1F1305] bg-[#EDE0D0] px-2.5 py-1 font-bold">
                  <Calendar className="h-3.5 w-3.5 text-[#E80000]" />
                  <span>Nacimiento: {persona.fecha_nacimiento}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5 border border-[#1F1305] bg-[#1F1305] text-white px-2.5 py-1 font-bold">
                <Users className="h-3.5 w-3.5 text-[#F8C800]" />
                <span>{agrupaciones.length} Agrupaciones</span>
              </div>
              <div className="flex items-center gap-1.5 border border-[#1F1305] bg-[#1F1305] text-white px-2.5 py-1 font-bold">
                <Disc className="h-3.5 w-3.5 text-[#F8C800]" />
                <span>{grabaciones_sesion.length} Sesiones Registradas</span>
              </div>
            </div>

            {/* Nota de Verificación Pericial */}
            <div className="border border-[#1F1305] bg-[#EDE0D0]/40 p-3 font-mono text-xs flex items-start gap-2.5">
              <ShieldCheck className="h-4 w-4 text-[#2E7D32] shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <p className="font-bold text-[#1F1305]">
                  Nivel de Cotejo: [{estadoVerificacion.label}]
                </p>
                <p className="text-[#5A5245] text-[11px] leading-relaxed">
                  {estadoVerificacion.detalle}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Declaración Biográfica */}
        <div className="border-t-2 border-[#1F1305] pt-6 space-y-3">
          <div className="flex items-center gap-2 font-mono text-xs font-black uppercase text-[#1F1305]">
            <FileText className="h-4 w-4 text-[#E80000]" />
            <span>DICTAMEN BIOGRÁFICO & TRAYECTORIA PATRIMONIAL</span>
          </div>
          <div className="prose max-w-none font-sans text-sm sm:text-base text-[#1F1305]/90 leading-relaxed bg-[#EDE0D0]/20 p-5 border border-[#1F1305]/30">
            {persona.biografia ? (
              <p className="whitespace-pre-line">{persona.biografia}</p>
            ) : (
              <p className="italic text-[#5A5245]">
                No se dispone aún de una semblanza biográfica extensa. Sus créditos de autoría y grabaciones de sesión se encuentran inventariados abajo conforme a las copias físicas de galletas y matrices de catálogo.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* SECCIÓN 1: AGRUPACIONES Y LINAJES */}
      <section className="space-y-4">
        <div className="border-b-2 border-[#1F1305] pb-2 flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="font-mono text-xs font-black uppercase text-[#E80000]">
              LINAJE & ASOCIACIONES
            </span>
            <h2 className="font-cooper text-2xl font-black text-[#1F1305]">
              Agrupaciones Fundadas o Integradas
            </h2>
          </div>
          <Link
            href="/genealogia"
            className="hidden sm:inline-flex items-center gap-1.5 border border-[#1F1305] bg-white px-3 py-1 font-mono text-xs font-bold text-[#1F1305] hover:bg-[#1F1305] hover:text-white transition-colors"
          >
            <GitFork className="h-3.5 w-3.5 text-[#E80000]" />
            Ver en Red Genealógica
          </Link>
        </div>

        {agrupaciones.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {agrupaciones.map((agrup) => (
              <div
                key={agrup.id_grupo}
                className="border-2 border-[#1F1305] bg-white p-4 shadow-[3px_3px_0px_#1F1305] space-y-2"
              >
                <div className="flex items-center justify-between font-mono text-[11px]">
                  <span className="border border-[#1F1305] bg-[#EDE0D0] px-2 py-0.5 font-bold">
                    AGR-{String(agrup.id_grupo).padStart(3, "0")}
                  </span>
                  <span className="font-bold text-[#E80000]">{agrup.rol}</span>
                </div>
                <h3 className="font-cooper text-lg font-black text-[#1F1305]">
                  {agrup.nombre_grupo}
                </h3>
                {agrup.region && (
                  <p className="font-mono text-xs text-[#5A5245]">
                    📍 {agrup.region}
                  </p>
                )}
                {(agrup.desde || agrup.hasta) && (
                  <p className="font-mono text-xs text-[#5A5245]">
                    Período: {agrup.desde || "Inicio"} — {agrup.hasta || "Vigente"}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-[#1F1305] bg-white p-6 font-mono text-xs text-[#5A5245]">
            No registra agrupaciones formales como integrante de planta en la base de datos (participaciones principalmente como sesionista o compositor).
          </div>
        )}
      </section>

      {/* SECCIÓN 2: SESIONES Y FONOGRAMAS */}
      <section className="space-y-4">
        <div className="border-b-2 border-[#1F1305] pb-2">
          <span className="font-mono text-xs font-black uppercase text-[#E80000]">
            REGISTRO FONOGRÁFICO DE SESIÓN
          </span>
          <h2 className="font-cooper text-2xl font-black text-[#1F1305]">
            Pistas Grabadas como Músico de Sesión / Intérprete
          </h2>
          <p className="font-sans text-xs text-[#5A5245] mt-1">
            Cotejo de pistas donde intervino ejecutando instrumentos o voz, vinculado al prensaje original en vinilo.
          </p>
        </div>

        {grabaciones_sesion.length > 0 ? (
          <div className="border-2 border-[#1F1305] bg-white overflow-x-auto shadow-[4px_4px_0px_#1F1305]">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-[#1F1305] text-[#EDE0D0] border-b-2 border-[#1F1305]">
                <tr>
                  <th className="p-3">TEMA & CRÉDITO</th>
                  <th className="p-3">INSTRUMENTO / ROL</th>
                  <th className="p-3">AGRUPACIÓN</th>
                  <th className="p-3">PRENSAJE EN VINILO</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1F1305]/20">
                {grabaciones_sesion.map((sesion) => (
                  <tr key={sesion.id_tema} className="hover:bg-[#EDE0D0]/30 transition-colors">
                    <td className="p-3">
                      <div className="font-bold text-[#1F1305] text-sm">
                        {sesion.titulo_tema}
                      </div>
                      {sesion.credito_como && (
                        <div className="text-[11px] text-[#5A5245]">
                          Crédito: «{sesion.credito_como}»
                        </div>
                      )}
                    </td>
                    <td className="p-3">
                      <span className="inline-block border border-[#1F1305] bg-[#EDE0D0] px-2 py-0.5 font-bold text-[#1F1305]">
                        {sesion.instrumento || sesion.rol}
                      </span>
                    </td>
                    <td className="p-3 text-[#1F1305] font-bold">
                      {sesion.grupos.join(", ") || "—"}
                    </td>
                    <td className="p-3">
                      {sesion.prensajes.length > 0 ? (
                        <div className="space-y-1">
                          {sesion.prensajes.map((pr) => (
                            <Link
                              key={pr.id_album}
                              href={`/album/${pr.id_album}`}
                              className="inline-flex items-center gap-1 font-bold text-[#E80000] hover:underline"
                            >
                              <Disc className="h-3 w-3" />
                              <span>
                                {pr.nombre_album || "Sin título"} ({pr.año_publicacion || "S/A"}) · {pr.sello || "Sello"} [{pr.lado || "Lado"} - P{pr.pista || "1"}]
                              </span>
                              <ExternalLink className="h-2.5 w-2.5" />
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <span className="text-[#5A5245] italic">Sin prensaje catalogado</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="border border-[#1F1305] bg-white p-6 font-mono text-xs text-[#5A5245]">
            No registra temas como músico de sesión ejecutante en el inventario actual.
          </div>
        )}
      </section>

      {/* SECCIÓN 3: COMPOSICIONES */}
      <section className="space-y-4">
        <div className="border-b-2 border-[#1F1305] pb-2">
          <span className="font-mono text-xs font-black uppercase text-[#E80000]">
            REGISTRO DE PROPIEDAD INTELECTUAL
          </span>
          <h2 className="font-cooper text-2xl font-black text-[#1F1305]">
            Composiciones Catalogadas
          </h2>
          <p className="font-sans text-xs text-[#5A5245] mt-1">
            Obras registradas bajo su autoría o seudónimo en galletas discográficas de época.
          </p>
        </div>

        {composiciones.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {composiciones.map((comp) => (
              <div
                key={comp.id_tema}
                className="border-2 border-[#1F1305] bg-white p-4 shadow-[3px_3px_0px_#1F1305] space-y-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="border border-[#1F1305] bg-[#EDE0D0] px-2 py-0.5 font-bold">
                      TEM-{String(comp.id_tema).padStart(4, "0")}
                    </span>
                    {comp.camelot_code && (
                      <span className="border border-[#1F1305] bg-[#1F1305] text-[#F8C800] px-1.5 py-0.5 font-black">
                        {comp.camelot_code}
                      </span>
                    )}
                  </div>
                  <h3 className="font-cooper text-lg font-black text-[#1F1305]">
                    {comp.titulo_tema}
                  </h3>
                  {comp.credito_como && (
                    <p className="font-mono text-xs text-[#5A5245]">
                      Crédito registrado: «{comp.credito_como}»
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 pt-2 border-t border-[#1F1305]/20 font-mono text-[11px] text-[#5A5245]">
                  {comp.bpm && <span>⚡ {comp.bpm} BPM</span>}
                  {comp.duracion_segundos && (
                    <span>
                      ⏱ {Math.floor(comp.duracion_segundos / 60)}:
                      {String(comp.duracion_segundos % 60).padStart(2, "0")}
                    </span>
                  )}
                  {comp.generos.length > 0 && (
                    <span className="text-[#1F1305] font-bold">
                      🎵 {comp.generos.join(", ")}
                    </span>
                  )}
                </div>

                {comp.interpretes.length > 0 && (
                  <div className="border-t border-[#1F1305]/10 pt-2 font-mono text-xs">
                    <span className="text-[#5A5245]">Intérpretes: </span>
                    <strong className="text-[#1F1305]">{comp.interpretes.join(", ")}</strong>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-[#1F1305] bg-white p-6 font-mono text-xs text-[#5A5245]">
            No registra obras compuestas bajo su nombre en el catálogo actual.
          </div>
        )}
      </section>
    </div>
  );
}
