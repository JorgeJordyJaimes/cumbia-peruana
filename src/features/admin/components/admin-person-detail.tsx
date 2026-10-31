"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ImageUploader } from "@/features/storage/components/image-uploader";
import { InformeDetailView } from "@/features/informes/components/informe-detail-view";
import {
  EditorPericial,
  type SelloVerificacion,
  type FuentePericialItem,
  type EstadoEditorial,
} from "./editor-pericial";
import type { ArbolGenealogicoResult } from "@/types/database";
import {
  ArrowLeft,
  User,
  Camera,
  FileText,
  GitFork,
  Eye,
  Save,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Calendar,
  MapPin,
  Tag,
  Disc,
  Users,
} from "lucide-react";

export interface InformePersonaRow {
  id_persona: number;
  contenido_md: string;
  sello_verificacion: SelloVerificacion;
  fuentes: FuentePericialItem[];
  estado: EstadoEditorial;
  publish_at?: string | null;
  updated_at?: string | null;
}

interface AdminPersonDetailProps {
  arbol: ArbolGenealogicoResult;
  initialInforme: InformePersonaRow | null;
}

type PersonTab = "datos" | "retrato" | "informe" | "participacion" | "vista-previa";

export function AdminPersonDetail({ arbol, initialInforme }: AdminPersonDetailProps) {
  const router = useRouter();
  const supabase = createClient();

  const person = arbol.persona!;

  const [activeTab, setActiveTab] = useState<PersonTab>("informe");
  const [notification, setNotification] = useState<string | null>(null);

  // Estados locales para Datos Básicos
  const [nombre, setNombre] = useState(person.nombre || "");
  const [apodo, setApodo] = useState(person.apodo || "");
  const [fechaNacimiento, setFechaNacimiento] = useState(person.fecha_nacimiento || "");
  const [lugarNacimiento, setLugarNacimiento] = useState(person.lugar_nacimiento || "");
  const [fotoUrl, setFotoUrl] = useState<string | null>(person.url_foto || null);
  const [isSavingDatos, setIsSavingDatos] = useState(false);

  // Estados para el Informe Editorial
  const [informeContenido, setInformeContenido] = useState(
    initialInforme?.contenido_md ||
      (person.biografia && person.biografia.length > 0
        ? person.biografia
        : `# Declaración Pericial: ${person.nombre}\n\nConocido en los créditos fonográficos como **«${person.apodo || "S/A"}»**.\n\n## Peritaje de Trayectoria\nParticipó activamente en grabaciones matrices de vinilo, desempeñando roles clave en el desarrollo sonoro del género.\n\n> "Cotejo pericial verificado en galletas de prensaje original y registros de época."`)
  );

  const [sello, setSello] = useState<SelloVerificacion>(
    initialInforme?.sello_verificacion ||
      (person.url_foto && person.biografia ? "PRIMARIA" : "SIN_VERIFICAR")
  );

  const [fuentes, setFuentes] = useState<FuentePericialItem[]>(
    initialInforme?.fuentes && initialInforme.fuentes.length > 0
      ? initialInforme.fuentes
      : [
          {
            id: "f-1",
            tipo: "PRIMARIA",
            referencia: "Cotejo directo de matriz de prensaje y galleta de vinilo",
          },
        ]
  );

  const [estado, setEstado] = useState<EstadoEditorial>(
    initialInforme?.estado || (person.biografia ? "publicado" : "borrador")
  );

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  // Guardar pestaña 1: Datos
  const handleSaveDatos = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingDatos(true);
    try {
      const { error } = await supabase
        .from("personas")
        .update({
          nombre: nombre.trim(),
          apodo: apodo.trim() || null,
          fecha_nacimiento: fechaNacimiento.trim() || null,
          lugar_nacimiento: lugarNacimiento.trim() || null,
        })
        .eq("id_persona", person.id_persona);

      if (error) throw error;
      showNotification("Datos biográficos guardados correctamente.");
      router.refresh();
    } catch (err: unknown) {
      alert("Error al guardar datos: " + (err instanceof Error ? err.message : "Desconocido"));
    } finally {
      setIsSavingDatos(false);
    }
  };

  // Guardar pestaña 2: Retrato
  const handleUpdatePhoto = async (url: string) => {
    const { error } = await supabase
      .from("personas")
      .update({ url_foto: url })
      .eq("id_persona", person.id_persona);

    if (error) {
      throw new Error("Error al actualizar retrato: " + error.message);
    }
    setFotoUrl(url);
    showNotification("Retrato oficial actualizado en WebP.");
    router.refresh();
  };

  // Guardar pestaña 3: Informe Pericial
  const handleSaveInforme = async (data: {
    contenidoMd: string;
    sello: SelloVerificacion;
    fuentes: FuentePericialItem[];
    estado: EstadoEditorial;
  }) => {
    setInformeContenido(data.contenidoMd);
    setSello(data.sello);
    setFuentes(data.fuentes);
    setEstado(data.estado);

    try {
      // 1. Guardar en informes_personas
      const { error: informeError } = await supabase
        .from("informes_personas")
        .upsert(
          {
            id_persona: person.id_persona,
            contenido_md: data.contenidoMd,
            sello_verificacion: data.sello,
            fuentes: data.fuentes as unknown as import("@/types/database").Json,
            estado: data.estado,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "id_persona" }
        );

      if (informeError) {
        console.warn("Aviso en informes_personas:", informeError.message);
      }

      // 2. Sincronizar en tabla personas (compatibilidad con vistas actuales)
      await supabase
        .from("personas")
        .update({
          biografia: data.contenidoMd,
        })
        .eq("id_persona", person.id_persona);

      showNotification(`Informe pericial guardado como [${data.estado.toUpperCase()}].`);
      router.refresh();
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  // Árbol simulado para Vista Previa Fiel
  const previewArbol: ArbolGenealogicoResult = {
    ...arbol,
    persona: {
      id_persona: person.id_persona,
      nombre,
      apodo: apodo || null,
      fecha_nacimiento: fechaNacimiento || null,
      lugar_nacimiento: lugarNacimiento || null,
      url_foto: fotoUrl,
      biografia: informeContenido,
    },
  };

  const codigo = `INF-${String(person.id_persona).padStart(4, "0")}`;

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 border-2 border-[#1F1305] bg-[#10B981] text-white px-4 py-3 shadow-[4px_4px_0px_#1F1305] flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" />
          <span className="font-bold">{notification}</span>
        </div>
      )}

      {/* Barra de Migas de Pan y Acciones */}
      <div className="border-2 border-[#1F1305] bg-white p-3 shadow-[4px_4px_0px_#1F1305] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="flex items-center gap-1.5 border border-[#1F1305] bg-[#EDE0D0] px-3 py-1.5 font-bold hover:bg-white transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5 text-[#E80000]" />
            <span>Volver al Panel</span>
          </Link>
          <span className="text-[#5A5245] font-bold">/</span>
          <span className="border border-[#1F1305] bg-[#1F1305] text-[#EDE0D0] px-2 py-0.5 font-black">
            {codigo}
          </span>
          <span className="font-bold text-[#1F1305] text-sm">
            {nombre} {apodo ? `«${apodo}»` : ""}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/informes/${person.id_persona}`}
            target="_blank"
            className="flex items-center gap-1.5 border border-[#1F1305] bg-[#EDE0D0] px-3 py-1.5 font-bold hover:bg-white transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5 text-[#E80000]" />
            <span>Ver Expediente Público</span>
          </Link>
        </div>
      </div>

      {/* Pestañas Canónicas de la Ficha Pericial (5 Pestañas) */}
      <div className="border-2 border-[#1F1305] bg-[#EDE0D0] p-1.5 shadow-[4px_4px_0px_#1F1305] flex flex-wrap items-center gap-1.5">
        {[
          { id: "datos" as PersonTab, label: "1. Datos Biográficos", icon: User },
          { id: "retrato" as PersonTab, label: "2. Retrato Oficial", icon: Camera },
          { id: "informe" as PersonTab, label: "3. Informe Pericial", icon: FileText },
          { id: "participacion" as PersonTab, label: "4. Participación (Solo Lectura)", icon: GitFork },
          { id: "vista-previa" as PersonTab, label: "5. Vista Previa Fiel", icon: Eye },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 border-2 border-[#1F1305] px-3.5 py-2 font-bold transition-all ${
                isActive
                  ? "bg-[#1F1305] text-[#EDE0D0] shadow-[2px_2px_0px_#E80000] -translate-y-0.5"
                  : "bg-white text-[#1F1305] hover:bg-[#EDE0D0]"
              }`}
            >
              <Icon className={`h-3.5 w-3.5 ${isActive ? "text-[#F8C800]" : "text-[#E80000]"}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ============================================================ */}
      {/* PESTAÑA 1: DATOS BIOGRÁFICOS                                 */}
      {/* ============================================================ */}
      {activeTab === "datos" && (
        <form onSubmit={handleSaveDatos} className="border-2 border-[#1F1305] bg-white p-6 shadow-[4px_4px_0px_#1F1305] space-y-6">
          <div className="border-b-2 border-[#1F1305] pb-3">
            <h3 className="font-cooper text-xl font-black text-[#1F1305]">
              Ficha de Registro Civil y Fonográfico
            </h3>
            <p className="text-[#5A5245] mt-1">
              Información de filiación del músico o compositor registrada en la base de datos relacional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="font-bold text-[#1F1305] uppercase text-[11px] flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-[#E80000]" /> Nombre Completo / Registro Canónico
              </label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                className="w-full border-2 border-[#1F1305] bg-[#EDE0D0]/30 px-3 py-2 font-bold text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#E80000]"
                placeholder="Ej. Enrique Delgado Montes"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-[#1F1305] uppercase text-[11px] flex items-center gap-1.5">
                <Tag className="h-3.5 w-3.5 text-[#E80000]" /> Apodo o Seudónimo Oficial
              </label>
              <input
                type="text"
                value={apodo}
                onChange={(e) => setApodo(e.target.value)}
                className="w-full border-2 border-[#1F1305] bg-[#EDE0D0]/30 px-3 py-2 font-bold text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#E80000]"
                placeholder="Ej. El Brujo de la Guitarra"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-[#1F1305] uppercase text-[11px] flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-[#E80000]" /> Fecha de Nacimiento (o Época)
              </label>
              <input
                type="text"
                value={fechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
                className="w-full border-2 border-[#1F1305] bg-[#EDE0D0]/30 px-3 py-2 font-bold text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#E80000]"
                placeholder="Ej. 1939-04-14 o 1939"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-[#1F1305] uppercase text-[11px] flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-[#E80000]" /> Lugar de Nacimiento / Región
              </label>
              <input
                type="text"
                value={lugarNacimiento}
                onChange={(e) => setLugarNacimiento(e.target.value)}
                className="w-full border-2 border-[#1F1305] bg-[#EDE0D0]/30 px-3 py-2 font-bold text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#E80000]"
                placeholder="Ej. Rímac, Lima o Pucallpa, Ucayali"
              />
            </div>
          </div>

          <div className="pt-4 border-t-2 border-[#1F1305] flex justify-end">
            <button
              type="submit"
              disabled={isSavingDatos}
              className="flex items-center gap-2 border-2 border-[#1F1305] bg-[#1F1305] text-[#EDE0D0] px-6 py-2.5 font-black hover:bg-[#E80000] transition-colors disabled:opacity-50"
            >
              <Save className="h-4 w-4 text-[#F8C800]" />
              <span>{isSavingDatos ? "Guardando..." : "Guardar Ficha de Datos"}</span>
            </button>
          </div>
        </form>
      )}

      {/* ============================================================ */}
      {/* PESTAÑA 2: RETRATO OFICIAL                                   */}
      {/* ============================================================ */}
      {activeTab === "retrato" && (
        <div className="border-2 border-[#1F1305] bg-white p-6 shadow-[4px_4px_0px_#1F1305] space-y-6">
          <div className="border-b-2 border-[#1F1305] pb-3">
            <h3 className="font-cooper text-xl font-black text-[#1F1305]">
              Custodia Fotográfica del Músico
            </h3>
            <p className="text-[#5A5245] mt-1">
              Retrato oficial procesado y optimizado automáticamente a formato WebP para preservación patrimonial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <div className="border-2 border-[#1F1305] p-2 bg-[#EDE0D0]/40">
                <ImageUploader
                  folderPath="personas"
                  fileId={person.id_persona}
                  suffix="foto"
                  currentUrl={fotoUrl}
                  label="Fotografía del Músico / Compositor"
                  onUploaded={handleUpdatePhoto}
                />
              </div>
              <p className="text-[#5A5245] text-[11px]">
                * La imagen cargada se redimensiona y comprime en formato WebP con calidad del 85%, reduciendo el peso a menos de 100KB.
              </p>
            </div>

            <div className="border-2 border-[#1F1305] bg-[#EDE0D0] p-4 space-y-3">
              <h4 className="font-bold text-[#1F1305] uppercase text-[11px] border-b border-[#1F1305] pb-1">
                Estado del Retrato en Expediente
              </h4>
              {fotoUrl ? (
                <div className="space-y-3">
                  <div className="relative aspect-square max-w-[240px] mx-auto border-2 border-[#1F1305] overflow-hidden bg-black">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={fotoUrl}
                      alt={nombre}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-center gap-1.5 text-[#10B981] font-bold justify-center">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Retrato en Custodia Oficial</span>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center space-y-2 border-2 border-dashed border-[#1F1305]">
                  <Camera className="h-8 w-8 text-[#5A5245] mx-auto" />
                  <p className="font-bold text-[#E80000]">Sin Retrato Catalogado</p>
                  <p className="text-[#5A5245] text-[11px]">
                    Sube una fotografía de archivo o carátula de época para validar el sello de verificación.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* PESTAÑA 3: INFORME PERICIAL (EDITOR REUTILIZABLE)             */}
      {/* ============================================================ */}
      {activeTab === "informe" && (
        <div className="space-y-4">
          <EditorPericial
            idEntidad={person.id_persona}
            tipoEntidad="informe"
            codigoEntidad={codigo}
            tituloEntidad={nombre}
            initialContent={informeContenido}
            initialSello={sello}
            initialFuentes={fuentes}
            initialEstado={estado}
            onSave={handleSaveInforme}
            renderCustomPreview={(contentMd) => (
              <div className="p-4 bg-[#EDE0D0]/20">
                <InformeDetailView
                  arbol={{
                    ...previewArbol,
                    persona: { ...previewArbol.persona!, biografia: contentMd },
                  }}
                />
              </div>
            )}
          />
        </div>
      )}

      {/* ============================================================ */}
      {/* PESTAÑA 4: PARTICIPACIÓN FONOGRÁFICA (SOLO LECTURA)           */}
      {/* ============================================================ */}
      {activeTab === "participacion" && (
        <div className="space-y-6">
          {/* 1. Agrupaciones Integradas */}
          <div className="border-2 border-[#1F1305] bg-white p-5 shadow-[4px_4px_0px_#1F1305] space-y-3">
            <div className="flex items-center justify-between border-b-2 border-[#1F1305] pb-2">
              <h3 className="font-cooper text-lg font-black text-[#1F1305] flex items-center gap-2">
                <Users className="h-4 w-4 text-[#E80000]" /> Agrupaciones Integradas ({arbol.agrupaciones.length})
              </h3>
              <span className="text-[#5A5245] font-bold">Datos Automáticos de BD</span>
            </div>

            {arbol.agrupaciones.length === 0 ? (
              <p className="text-[#5A5245] py-2 italic">No tiene agrupaciones catalogadas formalmente.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-[#1F1305] text-[#EDE0D0] text-[11px]">
                    <tr>
                      <th className="p-2.5">AGRUPACIÓN</th>
                      <th className="p-2.5">ROL / CARGO</th>
                      <th className="p-2.5">REGIÓN</th>
                      <th className="p-2.5">PERÍODO</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1F1305]/20">
                    {arbol.agrupaciones.map((ag, idx) => (
                      <tr key={idx} className="hover:bg-[#EDE0D0]/30">
                        <td className="p-2.5 font-bold text-[#1F1305]">
                          <Link href={`/admin/grupo/${ag.id_grupo}`} className="hover:underline text-[#E80000]">
                            {ag.nombre_grupo}
                          </Link>
                        </td>
                        <td className="p-2.5 font-bold text-[#5A5245]">{ag.rol || "Integrante"}</td>
                        <td className="p-2.5">{ag.region || "—"}</td>
                        <td className="p-2.5 font-bold">
                          {ag.desde || ag.hasta
                            ? `${ag.desde || "¿?"} – ${ag.hasta || "Presente"}`
                            : "Período no especificado"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* 2. Grabaciones de Sesión */}
          <div className="border-2 border-[#1F1305] bg-white p-5 shadow-[4px_4px_0px_#1F1305] space-y-3">
            <div className="flex items-center justify-between border-b-2 border-[#1F1305] pb-2">
              <h3 className="font-cooper text-lg font-black text-[#1F1305] flex items-center gap-2">
                <Disc className="h-4 w-4 text-[#F1730C]" /> Grabaciones de Sesión ({arbol.grabaciones_sesion.length})
              </h3>
              <span className="text-[#5A5245] font-bold">Créditos de Pista / Fonograma</span>
            </div>

            {arbol.grabaciones_sesion.length === 0 ? (
              <p className="text-[#5A5245] py-2 italic">Sin registros de sesión directa catalogados.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-[#1F1305] text-[#EDE0D0] text-[11px]">
                    <tr>
                      <th className="p-2.5">TÍTULO DEL TEMA</th>
                      <th className="p-2.5">AGRUPACIONES</th>
                      <th className="p-2.5">ÁLBUM DE PRENSAJE</th>
                      <th className="p-2.5">ROL</th>
                      <th className="p-2.5">INSTRUMENTO</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1F1305]/20">
                    {arbol.grabaciones_sesion.map((gs, idx) => {
                      const primerPrensaje = gs.prensajes[0];
                      return (
                        <tr key={idx} className="hover:bg-[#EDE0D0]/30">
                          <td className="p-2.5 font-bold text-[#1F1305]">{gs.titulo_tema}</td>
                          <td className="p-2.5">{gs.grupos.join(", ") || "Varios"}</td>
                          <td className="p-2.5 text-[#5A5245]">
                            {primerPrensaje?.nombre_album
                              ? `${primerPrensaje.nombre_album} (${primerPrensaje.año_publicacion || ""})`
                              : "—"}
                          </td>
                          <td className="p-2.5 font-bold text-[#E80000]">{gs.rol}</td>
                          <td className="p-2.5">{gs.instrumento || "—"}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* 3. Composiciones Catalogadas */}
          <div className="border-2 border-[#1F1305] bg-white p-5 shadow-[4px_4px_0px_#1F1305] space-y-3">
            <div className="flex items-center justify-between border-b-2 border-[#1F1305] pb-2">
              <h3 className="font-cooper text-lg font-black text-[#1F1305] flex items-center gap-2">
                <FileText className="h-4 w-4 text-[#F8C800]" /> Obras Compuestas ({arbol.composiciones.length})
              </h3>
              <span className="text-[#5A5245] font-bold">Autoría / Galleta Original</span>
            </div>

            {arbol.composiciones.length === 0 ? (
              <p className="text-[#5A5245] py-2 italic">Sin obras de autoría registradas.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-[#1F1305] text-[#EDE0D0] text-[11px]">
                    <tr>
                      <th className="p-2.5">TÍTULO DEL TEMA</th>
                      <th className="p-2.5">CRÉDITO EN GALLETA</th>
                      <th className="p-2.5">INTÉRPRETES</th>
                      <th className="p-2.5">KEY / BPM</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1F1305]/20">
                    {arbol.composiciones.map((comp, idx) => (
                      <tr key={idx} className="hover:bg-[#EDE0D0]/30">
                        <td className="p-2.5 font-bold text-[#1F1305]">{comp.titulo_tema}</td>
                        <td className="p-2.5 font-bold text-[#E80000]">
                          {comp.credito_como || "Nombre propio"}
                        </td>
                        <td className="p-2.5 text-[#5A5245]">{comp.interpretes.join(", ") || "—"}</td>
                        <td className="p-2.5 font-bold">
                          {comp.camelot_code || "—"}{" "}
                          <span className="text-neutral-500 font-normal">
                            ({comp.bpm ? `${comp.bpm} BPM` : "S/BPM"})
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* PESTAÑA 5: VISTA PREVIA FIEL (COMPONENTE PÚBLICO)             */}
      {/* ============================================================ */}
      {activeTab === "vista-previa" && (
        <div className="border-2 border-[#1F1305] bg-[#EDE0D0]/20 p-6 shadow-[4px_4px_0px_#1F1305] space-y-4">
          <div className="flex items-center justify-between border-b-2 border-[#1F1305] pb-3 bg-white p-3">
            <div>
              <span className="border border-[#1F1305] bg-[#10B981] text-white px-2 py-0.5 font-black uppercase text-[10px]">
                Vista Previa Fiel Activa
              </span>
              <p className="text-[#5A5245] text-[11px] mt-1">
                Este componente renderiza exactamente el expediente público que verá el visitante en <code>/informes/[id]</code>.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab("informe")}
              className="border border-[#1F1305] bg-[#1F1305] text-[#EDE0D0] px-3 py-1 font-bold hover:bg-[#E80000] transition-colors"
            >
              Volver al Editor
            </button>
          </div>

          <div className="bg-[#FAF8F5] p-6 border-2 border-[#1F1305]">
            <InformeDetailView arbol={previewArbol} />
          </div>
        </div>
      )}
    </div>
  );
}
