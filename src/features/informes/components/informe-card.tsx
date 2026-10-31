import Link from "next/link";
import Image from "next/image";
import { FileText, ArrowRight, User } from "lucide-react";
import type { PersonaResumen } from "../types";

interface InformeCardProps {
  persona: PersonaResumen;
}

export function InformeCard({ persona }: InformeCardProps) {
  const codigoExpediente = `INF-${String(persona.id_persona).padStart(4, "0")}`;

  // Determinación de verificación documental pericial
  const tieneBio = Boolean(persona.biografia && persona.biografia.length > 30);
  const tieneFoto = Boolean(persona.url_foto);
  const estadoVerificacion = tieneBio && tieneFoto
    ? { label: "FUENTE PRIMARIA", bg: "bg-[#2E7D32]", border: "border-[#1F1305]", text: "text-white" }
    : tieneBio
    ? { label: "FUENTE SECUNDARIA", bg: "bg-[#F1730C]", border: "border-[#1F1305]", text: "text-white" }
    : { label: "SIN VERIFICAR", bg: "bg-[#D6C7B2]", border: "border-[#1F1305]", text: "text-[#1F1305]" };

  const iniciales = persona.nombre
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();

  return (
    <article className="border-2 border-[#1F1305] bg-white p-5 shadow-[4px_4px_0px_#1F1305] flex flex-col justify-between transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_#E80000]">
      {/* Encabezado del Expediente */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b-2 border-[#1F1305] pb-3 font-mono text-xs">
          <span className="border border-[#1F1305] bg-[#1F1305] px-2 py-0.5 font-black text-[#EDE0D0]">
            {codigoExpediente}
          </span>
          <span
            className={`border px-2 py-0.5 font-bold uppercase tracking-wider ${estadoVerificacion.bg} ${estadoVerificacion.border} ${estadoVerificacion.text}`}
          >
            [{estadoVerificacion.label}]
          </span>
        </div>

        {/* Retrato y Datos Principales */}
        <div className="flex items-start gap-4">
          <div className="relative h-20 w-20 shrink-0 border-2 border-[#1F1305] bg-[#EDE0D0] overflow-hidden shadow-[2px_2px_0px_#1F1305]">
            {persona.url_foto ? (
              <Image
                src={persona.url_foto}
                alt={persona.nombre}
                fill
                sizes="80px"
                className="object-cover grayscale contrast-125"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center bg-[#D6C7B2] font-mono text-xs font-black text-[#1F1305]">
                <User className="h-6 w-6 text-[#1F1305]/60 mb-0.5" />
                <span>{iniciales}</span>
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1 space-y-1">
            <h3 className="font-cooper text-lg font-black text-[#1F1305] leading-snug line-clamp-2">
              {persona.nombre}
            </h3>
            {persona.apodo && (
              <p className="font-mono text-xs font-bold text-[#E80000]">
                «{persona.apodo}»
              </p>
            )}
            {persona.lugar_nacimiento && (
              <p className="font-mono text-[11px] text-[#5A5245] truncate">
                📍 {persona.lugar_nacimiento}
              </p>
            )}
            {persona.fecha_nacimiento && (
              <p className="font-mono text-[11px] text-[#5A5245]">
                📅 N. {persona.fecha_nacimiento}
              </p>
            )}
          </div>
        </div>

        {/* Extracto Pericial */}
        <div className="border-t border-[#1F1305]/20 pt-3">
          <p className="font-sans text-xs text-[#5A5245] line-clamp-3 leading-relaxed">
            {persona.biografia || "Expediente biográfico preliminar. Sesiones de grabación y créditos de autoría catalogados bajo cotejo de galletas y matrices fonográficas."}
          </p>
        </div>
      </div>

      {/* Pie de Expediente: Enlace a Detalle */}
      <div className="mt-5 pt-3 border-t-2 border-[#1F1305]">
        <Link
          href={`/informes/${persona.id_persona}`}
          className="w-full flex items-center justify-between border border-[#1F1305] bg-[#EDE0D0] px-3 py-2 font-mono text-xs font-black text-[#1F1305] hover:bg-[#1F1305] hover:text-white transition-colors"
        >
          <span className="flex items-center gap-1.5">
            <FileText className="h-3.5 w-3.5 text-[#E80000]" />
            Abrir Expediente Pericial
          </span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
