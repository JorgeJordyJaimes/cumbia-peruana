import type { Metadata } from "next";
import { BrutalistCoordinator, BrutalistFooter } from "@/features/home-brutalism";
import { equipoKumbiaSound } from "@/features/home-retro/data/cumbia-mock";
import Link from "next/link";
import {
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  HeartHandshake,
  Scale,
  Mail,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Legajo Institucional & Acta de Custodia | Kumbia Sound",
  description:
    "Acta fundacional, equipo de peritaje fonográfico, normas de catalogación e instrucciones de solicitud de rectificación del archivo histórico Kumbia Sound.",
};

export default function LegajoPage() {
  return (
    <div className="relative min-h-screen bg-[#EDE0D0] text-[#1F1305] selection:bg-[#F1730C] selection:text-[#1F1305] font-mono">
      <BrutalistCoordinator>
        <main id="contenido" className="container mx-auto max-w-7xl px-4 sm:px-6 pt-6 pb-20 space-y-12">
          
          {/* Breadcrumb / Retorno */}
          <div className="flex items-center justify-between border-b-2 border-[#1F1305] pb-4 text-xs">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-bold text-[#1F1305] hover:text-[#E80000] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>← Volver a la Portada Principal</span>
            </Link>

            <div className="flex items-center gap-2 border border-[#1F1305] bg-white px-2.5 py-1 text-[#E80000] font-bold shadow-[2px_2px_0px_#1F1305]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>LEGAJO INSTITUCIONAL // EXP-LEG-001</span>
            </div>
          </div>

          {/* Banner Hero Brutalista */}
          <div className="border-2 border-[#1F1305] bg-[#1F1305] text-[#EDE0D0] p-8 sm:p-12 shadow-[6px_6px_0px_#E80000] relative overflow-hidden">
            <div className="max-w-3xl space-y-5 relative z-10">
              <div className="inline-flex items-center gap-2 border-2 border-[#EDE0D0] bg-[#E80000] px-3.5 py-1 text-xs font-bold text-white shadow-[2px_2px_0px_#EDE0D0]">
                <Scale className="h-3.5 w-3.5" />
                <span>EXPEDIENTE INSTITUCIONAL &amp; REGLAS DE CUSTODIA</span>
              </div>

              <h1 className="font-cooper text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                Legajo &amp; Acta Fundacional
              </h1>

              <p className="font-sans text-sm sm:text-base text-[#EDE0D0]/90 leading-relaxed max-w-2xl">
                Este legajo compila la razón de ser, el manifiesto ético, el equipo de custodios,
                las normas de catalogación fonográfica y el canal oficial para solicitar rectificaciones de créditos autorales.
              </p>

              {/* Enlaces de ancla a los 5 apartados */}
              <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
                <a
                  href="#acta-fundacional"
                  className="border-2 border-white bg-white/10 hover:bg-white hover:text-[#1F1305] text-white px-3 py-1.5 transition-colors font-bold shadow-[2px_2px_0px_#1F1305]"
                >
                  01 / Acta Fundacional
                </a>
                <a
                  href="#equipo"
                  className="border-2 border-white bg-white/10 hover:bg-white hover:text-[#1F1305] text-white px-3 py-1.5 transition-colors font-bold shadow-[2px_2px_0px_#1F1305]"
                >
                  02 / Equipo de Peritaje
                </a>
                <a
                  href="#normas"
                  className="border-2 border-white bg-white/10 hover:bg-white hover:text-[#1F1305] text-white px-3 py-1.5 transition-colors font-bold shadow-[2px_2px_0px_#1F1305]"
                >
                  03 / Normas de Catalogación
                </a>
                <a
                  href="#rectificacion"
                  className="border-2 border-white bg-[#E80000] hover:bg-white hover:text-[#1F1305] text-white px-3 py-1.5 transition-colors font-bold shadow-[2px_2px_0px_#1F1305]"
                >
                  04 / Rectificación
                </a>
                <a
                  href="#contacto"
                  className="border-2 border-white bg-[#F1730C] hover:bg-white hover:text-[#1F1305] text-[#1F1305] px-3 py-1.5 transition-colors font-bold shadow-[2px_2px_0px_#1F1305]"
                >
                  05 / Contacto &amp; Canales
                </a>
              </div>
            </div>

            {/* Sello decorativo KS en segundo plano */}
            <div className="absolute -bottom-8 -right-6 text-white/[0.04] font-anton text-[220px] font-black pointer-events-none select-none leading-none">
              LEG
            </div>
          </div>

          {/* ============================================================ */}
          {/* APARTADO 1: ACTA FUNDACIONAL */}
          {/* ============================================================ */}
          <section id="acta-fundacional" className="scroll-mt-24 space-y-6">
            <div className="border-2 border-[#1F1305] bg-white p-6 sm:p-12 shadow-[6px_6px_0px_#1F1305] space-y-6">
              <div className="flex items-center justify-between border-b-2 border-[#1F1305] pb-3">
                <div className="flex items-center gap-2">
                  <span className="border border-[#1F1305] bg-[#E80000] text-white text-xs font-black px-2 py-0.5">
                    APARTADO 01
                  </span>
                  <h2 className="font-cooper text-2xl sm:text-4xl font-bold text-[#1F1305]">
                    Acta Fundacional &amp; Manifiesto
                  </h2>
                </div>
                <span className="text-xs text-[#665D4F] font-bold hidden sm:inline">FOLIO AF-1968</span>
              </div>

              {/* Aclaración histórica fundamental requerida */}
              <div className="border-l-4 border-[#E80000] bg-[#F8F3EA] p-4 text-xs sm:text-sm font-sans leading-relaxed text-[#1F1305]">
                <strong className="font-mono text-xs font-black text-[#E80000] uppercase block mb-1">
                  [DECLARACIÓN DE ORIGEN DEL COLECTIVO]
                </strong>
                El manifiesto de preservación y el colectivo humano de investigadores de <strong>Kumbia Sound</strong> son preexistentes a la construcción de este sitio web. Nuestra labor de auditoría y rescate en ferias de discos, archivos de prensa y contacto con familias de músicos comenzó años antes. Esta plataforma web es una herramienta tecnológica nacida al servicio de ese manifiesto preexistente, y no su punto de partida.
              </div>

              <div className="font-sans text-sm sm:text-base leading-relaxed text-[#1F1305] space-y-4 max-w-4xl">
                <p>
                  Durante las décadas de 1970 y 1980, la cumbia grabada en el Perú experimentó una de las mayores revoluciones creativas del continente. Sin embargo, este tesoro cultural fue objeto de una desidia documental sistemática: contratos abusivos que despojaban de regalías a los autores, sesionistas de primer nivel que grababan en la clandestinidad bajo seudónimos en galletas de vinilo, y discos de 45 RPM prensados sin nombres de sus vocalistas.
                </p>
                <p>
                  <strong>Kumbia Sound</strong> se fundamenta en un principio innegociable: <em>la música popular no es mercancía desechable, sino patrimonio inmaterial de la nación</em>. Catalogamos cada surco con el rigor de un peritaje legal para devolver el crédito histórico a quienes pusieron las manos en la guitarra, la percusión, la voz y la consola de grabación.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t-2 border-[#1F1305]/10 font-mono text-xs">
                <div className="border-2 border-[#1F1305] bg-[#EDE0D0] p-4 space-y-2 shadow-[2px_2px_0px_#1F1305]">
                  <div className="flex items-center gap-2 font-bold text-[#10B981]">
                    <ShieldCheck className="h-4 w-4" />
                    <span>PRESERVACIÓN SIN FINES DE LUCRO</span>
                  </div>
                  <p className="text-[#5A5245] leading-relaxed">
                    El archivo no cobra suscripciones, no vende discos físicos ni lucra con la investigación. Es un servicio documental público.
                  </p>
                </div>
                <div className="border-2 border-[#1F1305] bg-[#EDE0D0] p-4 space-y-2 shadow-[2px_2px_0px_#1F1305]">
                  <div className="flex items-center gap-2 font-bold text-[#E80000]">
                    <HeartHandshake className="h-4 w-4" />
                    <span>CUSTODIA DE DERECHOS MORALES</span>
                  </div>
                  <p className="text-[#5A5245] leading-relaxed">
                    No distribuimos archivos ilegales de audio (MP3/WAV). Custodiamos metadatos, letras y portadas periciales en alta definición.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ============================================================ */}
          {/* APARTADO 2: EQUIPO DE PERITAJE */}
          {/* ============================================================ */}
          <section id="equipo" className="scroll-mt-24 space-y-6">
            <div className="border-2 border-[#1F1305] bg-white p-6 sm:p-12 shadow-[6px_6px_0px_#1F1305] space-y-6">
              <div className="flex items-center justify-between border-b-2 border-[#1F1305] pb-3">
                <div className="flex items-center gap-2">
                  <span className="border border-[#1F1305] bg-[#F1730C] text-[#1F1305] text-xs font-black px-2 py-0.5">
                    APARTADO 02
                  </span>
                  <h2 className="font-cooper text-2xl sm:text-4xl font-bold text-[#1F1305]">
                    Equipo de Peritaje &amp; Custodios
                  </h2>
                </div>
                <span className="text-xs text-[#665D4F] font-bold hidden sm:inline">COLECTIVO AUDITOR</span>
              </div>

              <p className="font-sans text-sm text-[#5A5245] max-w-3xl">
                Los custodios que contrastan las matrices físicas, compilan los números de prensaje y realizan entrevistas testimoniales directas con los protagonistas de la época.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                {equipoKumbiaSound.map((member) => (
                  <div
                    key={member.id}
                    className="border-2 border-[#1F1305] bg-[#F8F3EA] p-6 space-y-4 shadow-[4px_4px_0px_#1F1305] flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-14 w-14 border-2 border-[#1F1305] bg-[#EDE0D0] shadow-[2px_2px_0px_#1F1305] overflow-hidden shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={member.fotoUrl}
                            alt={member.nombre}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-cooper text-lg font-bold text-[#1F1305]">{member.nombre}</h3>
                          <p className="font-mono text-xs font-bold text-[#E80000]">{member.rol}</p>
                        </div>
                      </div>

                      <p className="font-sans text-xs text-[#5A5245] leading-relaxed">
                        {member.bio}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#1F1305]/20 flex items-center gap-3 font-mono text-[11px] text-[#665D4F]">
                      {member.redes.map((r, rIdx) => (
                        <a
                          key={rIdx}
                          href={r.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#E80000] font-bold capitalize transition-colors flex items-center gap-1"
                        >
                          <span>{r.tipo}</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ============================================================ */}
          {/* APARTADO 3: NORMAS DE CATALOGACIÓN FONOGRÁFICA */}
          {/* ============================================================ */}
          <section id="normas" className="scroll-mt-24 space-y-6">
            <div className="border-2 border-[#1F1305] bg-white p-6 sm:p-12 shadow-[6px_6px_0px_#1F1305] space-y-6">
              <div className="flex items-center justify-between border-b-2 border-[#1F1305] pb-3">
                <div className="flex items-center gap-2">
                  <span className="border border-[#1F1305] bg-[#1F1305] text-white text-xs font-black px-2 py-0.5">
                    APARTADO 03
                  </span>
                  <h2 className="font-cooper text-2xl sm:text-4xl font-bold text-[#1F1305]">
                    Normas de Catalogación &amp; Criterios Técnicos
                  </h2>
                </div>
                <span className="text-xs text-[#665D4F] font-bold hidden sm:inline">PROTOCOLO ESTRICTO</span>
              </div>

              <div className="space-y-4 font-sans text-sm text-[#1F1305]">
                <p>
                  Todo dato ingresado a la base de datos de Kumbia Sound debe superar los siguientes 6 filtros de verificación documental:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 font-mono text-xs">
                  <div className="border-2 border-[#1F1305] bg-[#F8F3EA] p-4 space-y-2">
                    <span className="font-bold text-[#E80000] block">01 / DUALIDAD LADO A &amp; LADO B</span>
                    <p className="font-sans text-xs text-[#5A5245]">
                      Solo se admiten caras A y B para vinilos y casetes en el período 1968–2005. No existen lados C o D; compilatorios dobles se catalogan como álbumes independientes con números de catálogo propios.
                    </p>
                  </div>

                  <div className="border-2 border-[#1F1305] bg-[#F8F3EA] p-4 space-y-2">
                    <span className="font-bold text-[#E80000] block">02 / MOSAICOS Y SURCOS COMPUESTOS</span>
                    <p className="font-sans text-xs text-[#5A5245]">
                      Un surco continuo en vinilo que contiene múltiples temas se etiqueta con bandera booleana <code className="bg-white px-1">es_mosaico = TRUE</code> y se desglosa internamente en la tabla <code className="bg-white px-1">Mosaicos_Temas</code> para respetar la autoría sin falsear el conteo de pistas físicas.
                    </p>
                  </div>

                  <div className="border-2 border-[#1F1305] bg-[#F8F3EA] p-4 space-y-2">
                    <span className="font-bold text-[#E80000] block">03 / AISLAMIENTO DE LA COLUMNA VOZ</span>
                    <p className="font-sans text-xs text-[#5A5245]">
                      La voz principal se asocia estrictamente al cantante con instrumento &apos;Voz&apos; y <code className="bg-white px-1">credito_como = NULL</code>. El seudónimo en galleta pertenece al compositor y nunca debe contaminar al intérprete vocal.
                    </p>
                  </div>

                  <div className="border-2 border-[#1F1305] bg-[#F8F3EA] p-4 space-y-2">
                    <span className="font-bold text-[#E80000] block">04 / NOTACIÓN CAMELOT EXCLUSIVA</span>
                    <p className="font-sans text-xs text-[#5A5245]">
                      Se almacena única y exclusivamente la notación de la Rueda Camelot (1A a 12B). La notación clásica del círculo de quintas ha sido formalmente retirada de la base de datos para garantizar compatibilidad directa DJ.
                    </p>
                  </div>

                  <div className="border-2 border-[#1F1305] bg-[#F8F3EA] p-4 space-y-2">
                    <span className="font-bold text-[#E80000] block">05 / DURACIÓN EN SEGUNDOS ENTEROS</span>
                    <p className="font-sans text-xs text-[#5A5245]">
                      Todas las duraciones se normalizan matemáticamente a segundos totales enteros: <code className="bg-white px-1">(minutos * 60) + segundos</code>. Queda prohibido el uso de strings de tiempo o decimales.
                    </p>
                  </div>

                  <div className="border-2 border-[#1F1305] bg-[#F8F3EA] p-4 space-y-2">
                    <span className="font-bold text-[#E80000] block">06 / FUENTES PRIMARIAS VERIFICADAS</span>
                    <p className="font-sans text-xs text-[#5A5245]">
                      Prevalece la lectura directa del vinilo físico prensado, su galleta central y el surco muerto (matriz estampada), contrastada con contratos originales y entrevistas directas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ============================================================ */}
          {/* APARTADO 4: SOLICITUD DE RECTIFICACIÓN */}
          {/* ============================================================ */}
          <section id="rectificacion" className="scroll-mt-24 space-y-6">
            <div className="border-2 border-[#1F1305] bg-white p-6 sm:p-12 shadow-[6px_6px_0px_#1F1305] space-y-6">
              <div className="flex items-center justify-between border-b-2 border-[#1F1305] pb-3">
                <div className="flex items-center gap-2">
                  <span className="border border-[#1F1305] bg-[#E80000] text-white text-xs font-black px-2 py-0.5">
                    APARTADO 04
                  </span>
                  <h2 className="font-cooper text-2xl sm:text-4xl font-bold text-[#1F1305]">
                    Solicitud de Rectificación de Datos
                  </h2>
                </div>
                <span className="text-xs text-[#E80000] font-black">AUDITORÍA ESTRICTA</span>
              </div>

              <div className="border-2 border-[#1F1305] bg-[#F8F3EA] p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-6 w-6 text-[#E80000] shrink-0 mt-0.5" />
                  <div className="space-y-2 font-sans text-sm">
                    <p className="font-mono text-xs font-black text-[#1F1305] uppercase">
                      ¿CÓMO REPORTAR UN ERROR O APORTAR UN DATO DE SESIÓN?
                    </p>
                    <p className="text-[#5A5245]">
                      Kumbia Sound <strong>no es una wiki abierta editable</strong>. Toda corrección de autoría, voz o fecha de prensaje debe ser sometida a peritaje por el equipo custodio antes de su inserción en la base de datos oficial.
                    </p>
                    <p className="text-[#5A5245]">
                      Si eres coleccionista, familiar de un músico o posees un disco de vinilo cuya galleta o matriz aporte información contradictoria con lo publicado, sigue este procedimiento:
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 font-mono text-xs">
                  <div className="border border-[#1F1305] bg-white p-3 space-y-1">
                    <span className="font-bold text-[#E80000]">PASO 1 • EVIDENCIA FÍSICA</span>
                    <p className="text-[#665D4F]">Fotografía nítida de la galleta central o del surco muerto donde sea legible el código de matriz y el crédito.</p>
                  </div>
                  <div className="border border-[#1F1305] bg-white p-3 space-y-1">
                    <span className="font-bold text-[#E80000]">PASO 2 • IDENTIFICACIÓN</span>
                    <p className="text-[#665D4F]">Indica el código del expediente (ej. EXP-LP-014) y el nombre exacto de la pista en disputa.</p>
                  </div>
                  <div className="border border-[#1F1305] bg-white p-3 space-y-1">
                    <span className="font-bold text-[#E80000]">PASO 3 • ENVÍO</span>
                    <p className="text-[#665D4F]">Envía el expediente a nuestro correo oficial. El equipo responderá con la resolución del peritaje.</p>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="mailto:soundkumbia@gmail.com?subject=Solicitud%20de%20Rectificaci%C3%B3n%20Fonogr%C3%A1fica%20-%20Kumbia%20Sound"
                    className="inline-flex items-center gap-2 border-2 border-[#1F1305] bg-[#E80000] text-white px-5 py-2.5 font-mono text-xs font-bold shadow-[3px_3px_0px_#1F1305] hover:bg-[#1F1305] hover:text-[#EDE0D0] transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    <span>ENVIAR SOLICITUD DE RECTIFICACIÓN</span>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* ============================================================ */}
          {/* APARTADO 5: CONTACTO Y CANALES OFICIALES */}
          {/* ============================================================ */}
          <section id="contacto" className="scroll-mt-24 space-y-6">
            <div className="border-2 border-[#1F1305] bg-white p-6 sm:p-12 shadow-[6px_6px_0px_#1F1305] space-y-6">
              <div className="flex items-center justify-between border-b-2 border-[#1F1305] pb-3">
                <div className="flex items-center gap-2">
                  <span className="border border-[#1F1305] bg-[#F1730C] text-[#1F1305] text-xs font-black px-2 py-0.5">
                    APARTADO 05
                  </span>
                  <h2 className="font-cooper text-2xl sm:text-4xl font-bold text-[#1F1305]">
                    Contacto &amp; Canales Oficiales
                  </h2>
                </div>
                <span className="text-xs text-[#665D4F] font-bold hidden sm:inline">DEPÓSITO DE MATERIAL</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
                <div className="border-2 border-[#1F1305] bg-[#F8F3EA] p-5 space-y-3 shadow-[3px_3px_0px_#1F1305]">
                  <span className="font-bold text-[#E80000] block text-sm">CORREO INSTITUCIONAL</span>
                  <p className="text-[#5A5245]">Para correspondencia oficial, rectificaciones y donación de material digitalizado.</p>
                  <a
                    href="mailto:soundkumbia@gmail.com"
                    className="block font-bold text-[#1F1305] hover:text-[#E80000] underline"
                  >
                    soundkumbia@gmail.com
                  </a>
                </div>

                <div className="border-2 border-[#1F1305] bg-[#F8F3EA] p-5 space-y-3 shadow-[3px_3px_0px_#1F1305]">
                  <span className="font-bold text-[#E80000] block text-sm">CANAL DE YOUTUBE</span>
                  <p className="text-[#5A5245]">Fonoteca pública audiovisual con ripeos certificados de discos en 45 RPM.</p>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-bold text-[#1F1305] hover:text-[#E80000] underline"
                  >
                    <span>Ver Fonoteca Pública</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>

                <div className="border-2 border-[#1F1305] bg-[#F8F3EA] p-5 space-y-3 shadow-[3px_3px_0px_#1F1305]">
                  <span className="font-bold text-[#E80000] block text-sm">SPOTIFY MASTER</span>
                  <p className="text-[#5A5245]">Playlists curatoriales organizadas por vertientes, décadas y tonalidades armónicas.</p>
                  <a
                    href="https://spotify.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-bold text-[#1F1305] hover:text-[#E80000] underline"
                  >
                    <span>Escuchar Listas Oficiales</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </section>

        </main>
      </BrutalistCoordinator>

      <BrutalistFooter />
    </div>
  );
}
