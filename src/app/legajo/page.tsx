import type { Metadata } from "next";
import { BrutalistCoordinator, BrutalistFooter } from "@/features/home-brutalism";
import Link from "next/link";
import {
  ArrowLeft,
  Sparkles,
  Compass,
  Radio,
  Disc3,
  Flame,
  Search,
  Mail,
  AlertCircle,
  ExternalLink,
  SlidersHorizontal,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Legajo: Manifiesto, Misión & Visión | Kumbia Sound",
  description:
    "Manifiesto cultural, misión, visión, principios fundacionales y normas de catalogación del archivo histórico Kumbia Sound.",
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
                <Compass className="h-3.5 w-3.5" />
                <span>DECLARACIÓN DE PRINCIPIOS, MISIÓN &amp; VISIÓN</span>
              </div>

              <h1 className="font-cooper text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                Manifiesto, Misión &amp; Visión
              </h1>

              <p className="font-sans text-sm sm:text-base text-[#EDE0D0]/90 leading-relaxed max-w-2xl">
                Descubrir, documentar y compartir la cumbia peruana, especialmente aquella que nunca fue &ldquo;éxito&rdquo;,
                para que más personas la escuchen, la entiendan y la bailen.
              </p>

              {/* Enlaces de ancla a los apartados */}
              <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
                <a
                  href="#quienes-somos"
                  className="border-2 border-white bg-white/10 hover:bg-white hover:text-[#1F1305] text-white px-3 py-1.5 transition-colors font-bold shadow-[2px_2px_0px_#1F1305]"
                >
                  01 / Origen &amp; Propósito
                </a>
                <a
                  href="#mision-vision"
                  className="border-2 border-white bg-white/10 hover:bg-white hover:text-[#1F1305] text-white px-3 py-1.5 transition-colors font-bold shadow-[2px_2px_0px_#1F1305]"
                >
                  02 / Misión &amp; Visión
                </a>
                <a
                  href="#principios"
                  className="border-2 border-white bg-white/10 hover:bg-white hover:text-[#1F1305] text-white px-3 py-1.5 transition-colors font-bold shadow-[2px_2px_0px_#1F1305]"
                >
                  03 / Principios
                </a>
                <a
                  href="#herramientas"
                  className="border-2 border-white bg-white/10 hover:bg-white hover:text-[#1F1305] text-white px-3 py-1.5 transition-colors font-bold shadow-[2px_2px_0px_#1F1305]"
                >
                  04 / Herramientas &amp; Invitación
                </a>
                <a
                  href="#normas"
                  className="border-2 border-white bg-white/10 hover:bg-white hover:text-[#1F1305] text-white px-3 py-1.5 transition-colors font-bold shadow-[2px_2px_0px_#1F1305]"
                >
                  05 / Normas de Catalogación
                </a>
                <a
                  href="#rectificacion"
                  className="border-2 border-white bg-[#E80000] hover:bg-white hover:text-[#1F1305] text-white px-3 py-1.5 transition-colors font-bold shadow-[2px_2px_0px_#1F1305]"
                >
                  06 / Rectificación &amp; Contacto
                </a>
              </div>
            </div>

            {/* Sello decorativo KS en segundo plano */}
            <div className="absolute -bottom-8 -right-6 text-white/[0.04] font-anton text-[220px] font-black pointer-events-none select-none leading-none">
              KS
            </div>
          </div>

          {/* ============================================================ */}
          {/* APARTADO 1: QUIÉNES SOMOS & POR QUÉ EXISTIMOS */}
          {/* ============================================================ */}
          <section id="quienes-somos" className="scroll-mt-24 space-y-6">
            <div className="border-2 border-[#1F1305] bg-white p-6 sm:p-12 shadow-[6px_6px_0px_#1F1305] space-y-8">
              <div className="flex items-center justify-between border-b-2 border-[#1F1305] pb-3">
                <div className="flex items-center gap-2">
                  <span className="border border-[#1F1305] bg-[#E80000] text-white text-xs font-black px-2 py-0.5">
                    APARTADO 01
                  </span>
                  <h2 className="font-cooper text-2xl sm:text-4xl font-bold text-[#1F1305]">
                    Quiénes somos &amp; Por qué existimos
                  </h2>
                </div>
                <span className="text-xs text-[#665D4F] font-bold hidden sm:inline">FOLIO ORIGEN // BUCARAMANGA</span>
              </div>

              {/* Quiénes somos */}
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#E80000] uppercase tracking-wider">
                  <Radio className="h-4 w-4" />
                  <span>El Centro de Nuestro Oído</span>
                </div>
                <div className="font-sans text-base sm:text-lg leading-relaxed text-[#1F1305] max-w-4xl space-y-4">
                  <p>
                    <strong>Kumbia Sound (KS)</strong> es un proyecto cultural nacido en <strong>Bucaramanga</strong>, una ciudad con una fascinación poco común en Colombia por la cumbia en todas sus formas: cumbia, tecnocumbia, y las voces de Colombia, Perú, Argentina, México, Chile y Ecuador.
                  </p>
                  <p>
                    Quienes hacemos KS crecimos entre cientos de canciones de todos esos países y, con el tiempo, nuestro oído se quedó en dos lugares: la cumbia colombiana y, sobre todo, la <strong>cumbia peruana</strong>. Allí está nuestro centro.
                  </p>
                </div>
              </div>

              {/* Por qué existimos */}
              <div className="border-2 border-[#1F1305] bg-[#EDE0D0] p-6 sm:p-8 space-y-4 shadow-[4px_4px_0px_#1F1305]">
                <div className="inline-flex items-center gap-2 font-mono text-xs font-black text-[#1F1305] uppercase tracking-wider border-b border-[#1F1305]/20 pb-1">
                  <Flame className="h-4 w-4 text-[#E80000]" />
                  <span>Por Qué Existimos: Romper la Monotonía</span>
                </div>
                <div className="font-sans text-base leading-relaxed text-[#1F1305] space-y-3">
                  <p>
                    Creemos que la cumbia peruana es un universo inmenso que se escucha de forma muy pequeña. En los bailes suenan siempre los mismos temas; cambia el orden, pero no el repertorio. Se baila y se disfruta, pero casi nadie se pregunta quién canta, quién toca la guitarra, a qué subgénero pertenece la canción o qué sello la editó.
                  </p>
                  <p>
                    Sin esa curiosidad, la música nueva no entra, y un género vivo se vuelve repetición.
                  </p>
                  <p className="font-cooper text-lg sm:text-xl font-bold text-[#E80000] pt-2 border-t border-[#1F1305]/15">
                    &ldquo;KS existe para romper esa monotonía y demostrar que hay joyas escondidas que merecen ser escuchadas.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ============================================================ */}
          {/* APARTADO 2: MISIÓN & VISIÓN */}
          {/* ============================================================ */}
          <section id="mision-vision" className="scroll-mt-24 space-y-6">
            <div className="border-2 border-[#1F1305] bg-white p-6 sm:p-12 shadow-[6px_6px_0px_#1F1305] space-y-8">
              <div className="flex items-center justify-between border-b-2 border-[#1F1305] pb-3">
                <div className="flex items-center gap-2">
                  <span className="border border-[#1F1305] bg-[#F1730C] text-[#1F1305] text-xs font-black px-2 py-0.5">
                    APARTADO 02
                  </span>
                  <h2 className="font-cooper text-2xl sm:text-4xl font-bold text-[#1F1305]">
                    Misión &amp; Visión
                  </h2>
                </div>
                <span className="text-xs text-[#665D4F] font-bold hidden sm:inline">HORIZONTE PATRIMONIAL</span>
              </div>

              {/* Misión */}
              <div className="space-y-4">
                <div className="border-l-4 border-[#E80000] bg-[#F8F3EA] p-5 sm:p-6 shadow-[2px_2px_0px_#1F1305]">
                  <span className="font-mono text-xs font-black text-[#E80000] uppercase tracking-wider block mb-1">
                    NUESTRA MISIÓN
                  </span>
                  <p className="font-cooper text-xl sm:text-2xl text-[#1F1305] leading-snug">
                    Descubrir, documentar y compartir la cumbia peruana, especialmente aquella que nunca fue &ldquo;éxito&rdquo;, para que más personas la escuchen, la entiendan y la bailen.
                  </p>
                </div>

                <p className="font-mono text-xs font-bold text-[#665D4F] uppercase pt-2">
                  Lo hacemos de tres maneras:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-1">
                  <div className="border-2 border-[#1F1305] bg-[#EDE0D0] p-5 space-y-3 shadow-[3px_3px_0px_#1F1305]">
                    <div className="flex items-center gap-2 font-bold text-[#1F1305]">
                      <Search className="h-4 w-4 text-[#E80000]" />
                      <span className="font-mono text-sm uppercase">1. Explorando</span>
                    </div>
                    <p className="font-sans text-xs sm:text-sm text-[#3A3026] leading-relaxed">
                      Buscamos y escuchamos los discos que nadie busca, asumiendo el riesgo de lo desconocido. Mientras menos conocido es un disco, mayor es la expectativa de encontrar algo extraordinario.
                    </p>
                  </div>

                  <div className="border-2 border-[#1F1305] bg-[#EDE0D0] p-5 space-y-3 shadow-[3px_3px_0px_#1F1305]">
                    <div className="flex items-center gap-2 font-bold text-[#1F1305]">
                      <Radio className="h-4 w-4 text-[#F1730C]" />
                      <span className="font-mono text-sm uppercase">2. Compartiendo</span>
                    </div>
                    <p className="font-sans text-xs sm:text-sm text-[#3A3026] leading-relaxed">
                      Publicamos la información y el contexto necesario para que cualquiera, en Bucaramanga, Lima, Ciudad de México, Buenos Aires, Santiago o Europa, pueda disfrutar lo que encontramos.
                    </p>
                  </div>

                  <div className="border-2 border-[#1F1305] bg-[#EDE0D0] p-5 space-y-3 shadow-[3px_3px_0px_#1F1305]">
                    <div className="flex items-center gap-2 font-bold text-[#1F1305]">
                      <Disc3 className="h-4 w-4 text-[#10B981]" />
                      <span className="font-mono text-sm uppercase">3. Conectando</span>
                    </div>
                    <p className="font-sans text-xs sm:text-sm text-[#3A3026] leading-relaxed">
                      Construimos, con rigor y paciencia, el mapa de la historia de la cumbia peruana desde 1968: quién cantó, quién tocó, qué sello grabó, cómo se relacionan canciones, artistas, estilos y discos.
                    </p>
                  </div>
                </div>
              </div>

              {/* Visión */}
              <div className="space-y-4 pt-6 border-t-2 border-[#1F1305]/15">
                <div className="border-l-4 border-[#F1730C] bg-[#F8F3EA] p-5 sm:p-6 shadow-[2px_2px_0px_#1F1305]">
                  <span className="font-mono text-xs font-black text-[#F1730C] uppercase tracking-wider block mb-1">
                    NUESTRA VISIÓN
                  </span>
                  <p className="font-cooper text-xl sm:text-2xl text-[#1F1305] leading-snug">
                    Que la cumbia peruana sea un género de repertorio siempre renovado, con una historia visible y accesible para todo el mundo.
                  </p>
                </div>

                <p className="font-mono text-xs font-bold text-[#665D4F] uppercase pt-2">
                  Imaginamos un futuro en el que:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 font-mono text-xs">
                  <div className="border-2 border-[#1F1305] bg-white p-4 space-y-1.5 shadow-[2px_2px_0px_#1F1305]">
                    <span className="font-bold text-[#E80000] block uppercase">● Rostro y Crédito</span>
                    <p className="font-sans text-xs text-[#5A5245]">
                      Quien se enamora de una voz puede descubrir su nombre, su rostro y todo lo que grabó.
                    </p>
                  </div>

                  <div className="border-2 border-[#1F1305] bg-white p-4 space-y-1.5 shadow-[2px_2px_0px_#1F1305]">
                    <span className="font-bold text-[#F1730C] block uppercase">● Coleccionismo Certero</span>
                    <p className="font-sans text-xs text-[#5A5245]">
                      El coleccionista sabe con claridad qué discos le faltan para completar la discografía de un grupo y si existen reediciones.
                    </p>
                  </div>

                  <div className="border-2 border-[#1F1305] bg-white p-4 space-y-1.5 shadow-[2px_2px_0px_#1F1305]">
                    <span className="font-bold text-[#10B981] block uppercase">● Bailes Renovados</span>
                    <p className="font-sans text-xs text-[#5A5245]">
                      Los DJs y organizadores se atreven a salir de lo seguro, y cada baile suena distinto del anterior.
                    </p>
                  </div>

                  <div className="border-2 border-[#1F1305] bg-white p-4 space-y-1.5 shadow-[2px_2px_0px_#1F1305]">
                    <span className="font-bold text-[#1F1305] block uppercase">● Historia sin Neblina</span>
                    <p className="font-sans text-xs text-[#5A5245]">
                      La historia de un género que se hizo de manera artesanal deja de estar en la neblina y queda documentada como patrimonio cultural compartido.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* ============================================================ */}
          {/* APARTADO 3: NUESTROS PRINCIPIOS INNEGOCIABLES */}
          {/* ============================================================ */}
          <section id="principios" className="scroll-mt-24 space-y-6">
            <div className="border-2 border-[#1F1305] bg-white p-6 sm:p-12 shadow-[6px_6px_0px_#1F1305] space-y-6">
              <div className="flex items-center justify-between border-b-2 border-[#1F1305] pb-3">
                <div className="flex items-center gap-2">
                  <span className="border border-[#1F1305] bg-[#E80000] text-white text-xs font-black px-2 py-0.5">
                    APARTADO 03
                  </span>
                  <h2 className="font-cooper text-2xl sm:text-4xl font-bold text-[#1F1305]">
                    Nuestros Principios
                  </h2>
                </div>
                <span className="text-xs text-[#E80000] font-black">CÓDIGO ÉTICO INMUTABLE</span>
              </div>

              <div className="space-y-4 pt-2">
                {/* Principio 1 */}
                <div className="border-2 border-[#1F1305] bg-[#EDE0D0] p-5 shadow-[3px_3px_0px_#1F1305] space-y-1">
                  <div className="flex items-center gap-2 font-mono text-sm font-black text-[#1F1305]">
                    <span className="bg-[#1F1305] text-[#EDE0D0] px-2 py-0.5 text-xs">01</span>
                    <span className="uppercase">La curiosidad es el motor</span>
                  </div>
                  <p className="font-sans text-sm text-[#3A3026] leading-relaxed pl-8">
                    Preguntar quién, cómo, cuándo y por qué es parte indispensable de disfrutar la música.
                  </p>
                </div>

                {/* Principio 2 */}
                <div className="border-2 border-[#1F1305] bg-[#EDE0D0] p-5 shadow-[3px_3px_0px_#1F1305] space-y-2 border-l-8 border-l-[#E80000]">
                  <div className="flex items-center gap-2 font-mono text-sm font-black text-[#E80000]">
                    <span className="bg-[#E80000] text-white px-2 py-0.5 text-xs">02</span>
                    <span className="uppercase">La música se comparte (No negociable)</span>
                  </div>
                  <p className="font-sans text-sm text-[#1F1305] leading-relaxed pl-8">
                    Estamos rotundamente en contra del <strong>oscurantismo</strong> de quienes esconden discos, rayan etiquetas o manipulan datos para que nadie más los consiga. Si queremos que el género no se agote, hay que hacer circular más canciones. <strong>Esto no es negociable.</strong>
                  </p>
                </div>

                {/* Principio 3 */}
                <div className="border-2 border-[#1F1305] bg-[#EDE0D0] p-5 shadow-[3px_3px_0px_#1F1305] space-y-1">
                  <div className="flex items-center gap-2 font-mono text-sm font-black text-[#1F1305]">
                    <span className="bg-[#1F1305] text-[#EDE0D0] px-2 py-0.5 text-xs">03</span>
                    <span className="uppercase">Arriesgarse es descubrir</span>
                  </div>
                  <p className="font-sans text-sm text-[#3A3026] leading-relaxed pl-8">
                    Preferimos lo desconocido a lo seguro, aun cuando provoque resistencia o incomodidad en los circuitos convencionales.
                  </p>
                </div>

                {/* Principio 4 */}
                <div className="border-2 border-[#1F1305] bg-[#EDE0D0] p-5 shadow-[3px_3px_0px_#1F1305] space-y-1">
                  <div className="flex items-center gap-2 font-mono text-sm font-black text-[#1F1305]">
                    <span className="bg-[#1F1305] text-[#EDE0D0] px-2 py-0.5 text-xs">04</span>
                    <span className="uppercase">El conocimiento es colectivo</span>
                  </div>
                  <p className="font-sans text-sm text-[#3A3026] leading-relaxed pl-8">
                    La historia de la cumbia peruana se construye hombro a hombro entre coleccionistas, músicos, DJs y oyentes de todos los países.
                  </p>
                </div>

                {/* Principio 5 */}
                <div className="border-2 border-[#1F1305] bg-[#EDE0D0] p-5 shadow-[3px_3px_0px_#1F1305] space-y-1">
                  <div className="flex items-center gap-2 font-mono text-sm font-black text-[#1F1305]">
                    <span className="bg-[#1F1305] text-[#EDE0D0] px-2 py-0.5 text-xs">05</span>
                    <span className="uppercase">Rigor con cariño</span>
                  </div>
                  <p className="font-sans text-sm text-[#3A3026] leading-relaxed pl-8">
                    Documentamos con el máximo cuidado y respeto pericial porque amamos profundamente lo que documentamos.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ============================================================ */}
          {/* APARTADO 4: NUESTRAS HERRAMIENTAS & UNA INVITACIÓN */}
          {/* ============================================================ */}
          <section id="herramientas" className="scroll-mt-24 space-y-6">
            <div className="border-2 border-[#1F1305] bg-white p-6 sm:p-12 shadow-[6px_6px_0px_#1F1305] space-y-8">
              <div className="flex items-center justify-between border-b-2 border-[#1F1305] pb-3">
                <div className="flex items-center gap-2">
                  <span className="border border-[#1F1305] bg-[#10B981] text-white text-xs font-black px-2 py-0.5">
                    APARTADO 04
                  </span>
                  <h2 className="font-cooper text-2xl sm:text-4xl font-bold text-[#1F1305]">
                    Nuestras Herramientas &amp; Una Invitación
                  </h2>
                </div>
                <span className="text-xs text-[#665D4F] font-bold hidden sm:inline">ECOSISTEMA CULTURAL</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Herramienta 1: Web */}
                <div className="border-2 border-[#1F1305] bg-[#F8F3EA] p-6 space-y-4 shadow-[4px_4px_0px_#1F1305] flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[#E80000]">
                      <SlidersHorizontal className="h-5 w-5" />
                      <h3 className="font-cooper text-xl font-bold text-[#1F1305]">La Web de Kumbia Sound</h3>
                    </div>
                    <p className="font-sans text-sm text-[#3A3026] leading-relaxed">
                      El lugar donde este proyecto toma forma: un archivo en el que cada tema se conecta con sus cantantes, directores, subgéneros, discos y reediciones.
                    </p>
                    <p className="font-sans text-sm text-[#3A3026] leading-relaxed">
                      Además, cada canción incluye su <strong>BPM exacto</strong> y su tonalidad en <strong>notación Camelot</strong>, lo que permite crear mezclas armónicas con canciones que los DJs quizá nunca habrían considerado. Así, la curiosidad se convierte en repertorio nuevo en la pista de baile.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#1F1305]/20">
                    <Link
                      href="/vinilos"
                      className="inline-flex items-center gap-2 text-xs font-bold text-[#E80000] hover:underline"
                    >
                      <span>Explorar el Catálogo de Vinilos</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>

                {/* Herramienta 2: YouTube */}
                <div className="border-2 border-[#1F1305] bg-[#F8F3EA] p-6 space-y-4 shadow-[4px_4px_0px_#1F1305] flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[#E80000]">
                      <Radio className="h-5 w-5" />
                      <h3 className="font-cooper text-xl font-bold text-[#1F1305]">El Canal de YouTube</h3>
                    </div>
                    <p className="font-sans text-sm text-[#3A3026] leading-relaxed">
                      La ventana abierta del proyecto hacia todo el mundo: música extraída directamente de prensajes físicos y datos musicológicos puestos al servicio de todos los oyentes y coleccionistas.
                    </p>
                    <p className="font-sans text-sm text-[#3A3026] leading-relaxed">
                      Aquí las joyas desclasificadas cobran vida sonora para que cualquiera pueda redescubrir lo que las grandes emisoras dejaron de programar.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#1F1305]/20">
                    <a
                      href="https://youtube.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-bold text-[#E80000] hover:underline"
                    >
                      <span>Visitar Canal Oficial de YouTube</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Una Invitación */}
              <div className="border-2 border-[#1F1305] bg-[#1F1305] text-[#EDE0D0] p-6 sm:p-8 space-y-3 shadow-[5px_5px_0px_#E80000]">
                <span className="font-mono text-xs font-black text-[#F8C800] uppercase tracking-wider block">
                  UNA INVITACIÓN ABIERTA
                </span>
                <p className="font-cooper text-lg sm:text-2xl text-white leading-relaxed">
                  &ldquo;Kumbia Sound es para quien baila y para quien colecciona, para quien pincha y para quien solo quiere saber de quién es esa voz. Si la cumbia peruana te mueve, ven a descubrir lo que todavía no has escuchado.&rdquo;
                </p>
              </div>
            </div>
          </section>

          {/* ============================================================ */}
          {/* APARTADO 5: NORMAS DE CATALOGACIÓN FONOGRÁFICA */}
          {/* ============================================================ */}
          <section id="normas" className="scroll-mt-24 space-y-6">
            <div className="border-2 border-[#1F1305] bg-white p-6 sm:p-12 shadow-[6px_6px_0px_#1F1305] space-y-6">
              <div className="flex items-center justify-between border-b-2 border-[#1F1305] pb-3">
                <div className="flex items-center gap-2">
                  <span className="border border-[#1F1305] bg-[#1F1305] text-white text-xs font-black px-2 py-0.5">
                    APARTADO 05
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
                      Prevalece la lectura directa del vinilo físico prensado, su galleta central y el surco muerto (matriz estampada), contrastada con contratos originales y testimonios directos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ============================================================ */}
          {/* APARTADO 6: SOLICITUD DE RECTIFICACIÓN & CONTACTO */}
          {/* ============================================================ */}
          <section id="rectificacion" className="scroll-mt-24 space-y-6">
            <div className="border-2 border-[#1F1305] bg-white p-6 sm:p-12 shadow-[6px_6px_0px_#1F1305] space-y-6">
              <div className="flex items-center justify-between border-b-2 border-[#1F1305] pb-3">
                <div className="flex items-center gap-2">
                  <span className="border border-[#1F1305] bg-[#E80000] text-white text-xs font-black px-2 py-0.5">
                    APARTADO 06
                  </span>
                  <h2 className="font-cooper text-2xl sm:text-4xl font-bold text-[#1F1305]">
                    Solicitud de Rectificación &amp; Contacto
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
                      Kumbia Sound <strong>no es una wiki abierta editable</strong>. Toda corrección de autoría, voz o fecha de prensaje debe ser sometida a peritaje por el archivo antes de su inserción en la base de datos oficial.
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

              {/* Canales Oficiales */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs pt-4 border-t-2 border-[#1F1305]/10">
                <div className="border-2 border-[#1F1305] bg-[#EDE0D0] p-5 space-y-3 shadow-[3px_3px_0px_#1F1305]">
                  <span className="font-bold text-[#E80000] block text-sm">CORREO INSTITUCIONAL</span>
                  <p className="text-[#5A5245]">Para correspondencia oficial, rectificaciones y donación de material digitalizado.</p>
                  <a
                    href="mailto:soundkumbia@gmail.com"
                    className="block font-bold text-[#1F1305] hover:text-[#E80000] underline"
                  >
                    soundkumbia@gmail.com
                  </a>
                </div>

                <div className="border-2 border-[#1F1305] bg-[#EDE0D0] p-5 space-y-3 shadow-[3px_3px_0px_#1F1305]">
                  <span className="font-bold text-[#E80000] block text-sm">CANAL DE YOUTUBE</span>
                  <p className="text-[#5A5245]">Fonoteca pública audiovisual con música y ripeos certificados de discos en 45 RPM.</p>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-bold text-[#1F1305] hover:text-[#E80000] underline"
                  >
                    <span>Visitar Fonoteca en YouTube</span>
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
