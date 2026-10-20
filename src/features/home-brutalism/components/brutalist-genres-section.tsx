"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Disc,
  ArrowUpRight,
  X,
  ExternalLink,
  MapPin,
  Sliders,
  Radio,
  FileCheck,
} from "lucide-react";

export interface GeneroVertiente {
  id: number;
  slug: string;
  nombre: string;
  region: string;
  titulosBase: number;
  titulos: string;
  colorAura: string;
  colorIcono: string;
  instrumentos: string;
  gruposPioneros: string[];
  descripcionCorta: string;
  descripcionLarga: string;
}

export const GENEROS_VERTIENTES: GeneroVertiente[] = [
  {
    id: 1,
    slug: "cumbia-ritmica",
    nombre: "Cumbia Rítmica",
    region: "LIMA & CONOS",
    titulosBase: 80,
    titulos: "80 títulos",
    colorAura: "from-[#F1730C]/10 via-transparent to-transparent",
    colorIcono: "text-[#F1730C]",
    instrumentos:
      "Timbales latinos con campana metálica, bajo eléctrico sincopado, güiro continuo y guitarra eléctrica de base rítmica.",
    gruposPioneros: ["Grupo Celeste", "Cielo Gris", "El Super Grupo", "Los Sander's de Ñaña", "Los Yungas"],
    descripcionCorta:
      "Cadencia bailable de pulso continuo y alta aceleración rítmica, concebida para fiestas populares y coliseos.",
    descripcionLarga:
      "La Cumbia Rítmica encabeza el catálogo con 80 registros matrices. Representa la evolución festiva y acelerada de la cumbia urbana en sellos como Horóscopo y Midas, donde la percusión continua de timbales y güiro sostiene melodías vivas lideradas por Grupo Celeste, Cielo Gris y El Super Grupo.",
  },
  {
    id: 2,
    slug: "cumbia-fuzz",
    nombre: "Cumbia Fuzz",
    region: "LIMA INDUSTRIAL & BREÑA",
    titulosBase: 75,
    titulos: "75 títulos",
    colorAura: "from-amber-500/10 via-transparent to-transparent",
    colorIcono: "text-amber-500",
    instrumentos:
      "Pedal de distorsión Fuzz Face, saturación valvular, wah-wah, guitarra eléctrica Fender/Ibanez y eco analógico.",
    gruposPioneros: ["Grupo Celeste", "El Super Grupo", "Cielo Gris"],
    descripcionCorta:
      "Psicodelia pura y distorsión analógica en la primera guitarra, heredera directa del rock de garaje peruano.",
    descripcionLarga:
      "Con 75 registros en la base de datos, la Cumbia Fuzz es el testimonio sonoro de la confluencia entre la psicodelia y el punteo tropical. El uso prominente de pedales de distorsión fuzz en las guitarras eléctricas aportó una textura ácida, saturada y electrizante que definió la personalidad instrumental de las producciones de Discos Horóscopo.",
  },
  {
    id: 3,
    slug: "cumbia-carretera",
    nombre: "Cumbia Carretera",
    region: "CARRETERA CENTRAL",
    titulosBase: 44,
    titulos: "44 títulos",
    colorAura: "from-[#E80000]/10 via-transparent to-transparent",
    colorIcono: "text-[#E80000]",
    instrumentos:
      "Guitarra solista con reverberación profunda, percusión andino-costeña, bajo caminante y teclados de apoyo.",
    gruposPioneros: ["Cielo Gris", "Los Sander's de Ñaña"],
    descripcionCorta:
      "El sonido del éxodo y la ruta. Guitarras de largo aliento que musicalizan el tránsito entre la sierra central y la capital.",
    descripcionLarga:
      "Nacida a lo largo del corredor vial que une Lima con el Valle del Mantaro (Vitarte, Ñaña, Chosica), la Cumbia Carretera cuenta con 44 obras catalogadas. Agrupaciones emblemáticas como Cielo Gris y Los Sander's de Ñaña inmortalizaron las vivencias del viajero, el chofer interprovincial y el trabajador migrante a través de melodías nostálgicas y cadencias de largo viaje.",
  },
  {
    id: 4,
    slug: "cumbia-chey",
    nombre: "Cumbia Chey",
    region: "LIMA POPULAR & MAG",
    titulosBase: 41,
    titulos: "41 títulos",
    colorAura: "from-emerald-500/10 via-transparent to-transparent",
    colorIcono: "text-emerald-500",
    instrumentos:
      "Timbal latino en redoble sincopado, cencerro agudo, tumbadoras y bajo punteado con púa.",
    gruposPioneros: ["Grupo Celeste", "El Super Grupo", "Cielo Gris"],
    descripcionCorta:
      "Variante bailable sincopada con acento en el contratiempo y cortes rápidos de percusión para pista.",
    descripcionLarga:
      "Registrada en 41 temas de la base de datos, la Cumbia Chey es una variante rítmica bailable catalogada formalmente en las galletas y matrices de la época. Se distingue por su acentuación rítmica rápida en contratiempo, donde el diálogo entre el cencerro y el timbal genera una base bailable inconfundible de finales de los años 70.",
  },
  {
    id: 5,
    slug: "cumbia-pompo",
    nombre: "Cumbia Pompo",
    region: "LIMA SUR & ENSAYOS",
    titulosBase: 37,
    titulos: "37 títulos",
    colorAura: "from-purple-500/10 via-transparent to-transparent",
    colorIcono: "text-purple-500",
    instrumentos:
      "Bombo con golpe sordo amortiguado ('pompo'), timbal grave, güiro metálico y bajo eléctrico acentuado.",
    gruposPioneros: ["Grupo Celeste", "El Super Grupo", "Cielo Gris"],
    descripcionCorta:
      "Base percusiva profunda y compacta conducida por el golpe seco y pesado del bombo ('pompo').",
    descripcionLarga:
      "Con 37 obras catalogadas, la Cumbia Pompo debe su nombre a la onomatopeya del golpe grave y seco del bombo y la percusión baja. Esta rítmica amortiguada crea una sensación de peso y profundidad sonora que sostiene de manera compacta los arreglos vocales y punteos melódicos.",
  },
  {
    id: 6,
    slug: "chicha-andina",
    nombre: "Chicha Andina",
    region: "HUANCAYO & LIMA ESTE",
    titulosBase: 30,
    titulos: "30 títulos",
    colorAura: "from-blue-500/10 via-transparent to-transparent",
    colorIcono: "text-blue-500",
    instrumentos:
      "Guitarra eléctrica con eco Roland Space Echo, escalas pentatónicas andinas, bajo melódico y timbales criollos.",
    gruposPioneros: ["Cielo Gris", "Grupo Celeste"],
    descripcionCorta:
      "Fusión visceral entre el huayno tradicional y la electricidad tropical, voz y sentimiento del migrante andino.",
    descripcionLarga:
      "Presente en 30 obras registradas, la Chicha Andina encarna la fusión seminal del huayno tradicional con la guitarra eléctrica provista de eco de cinta analógico. Sus letras narran el desarraigo, la añoranza de la tierra natal y la dignidad obrera, forjando la identidad sonora de las barriadas limeñas y del Valle del Mantaro.",
  },
];

interface BrutalistGenresSectionProps {
  genreCounts?: Record<string, number>;
}

export function BrutalistGenresSection({ genreCounts }: BrutalistGenresSectionProps) {
  const [selectedGenero, setSelectedGenero] = useState<GeneroVertiente | null>(null);

  return (
    <section
      id="biblioteca-generos"
      className="w-full border-b-2 border-[#1F1305] bg-[#EDE0D0] brutalist-dots-light text-[#1F1305] py-12 sm:py-16 scroll-mt-20 relative overflow-hidden select-none font-mono"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 space-y-8 relative z-10">
        
        {/* CABECERA DE SUBGÉNEROS MUSICALES CATALOGADOS */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b-2 border-[#1F1305]">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 border-2 border-[#1F1305] bg-[#E80000] px-3 py-1 text-xs font-bold text-white tracking-widest uppercase shadow-[2px_2px_0px_#1F1305]">
              <FileCheck className="h-3.5 w-3.5 text-white" />
              <span>SUBGÉNEROS MATRICES // PERITAJE DISCOGRÁFICO</span>
            </div>

            <h2 className="font-cooper text-3xl sm:text-4xl lg:text-5xl font-black text-[#1F1305] tracking-tight leading-tight">
              Los 6 Subgéneros de la Cumbia Peruana
            </h2>
          </div>

          <div className="max-w-md text-xs text-[#5A5245] leading-relaxed">
            <p>
              Auditoría pericial de los 6 subgéneros y ritmos más catalogados en la bóveda:
              clasificación extraída directamente de las galletas, prensajes y matrices bajo custodia.
            </p>
          </div>
        </div>

        {/* 6 TARJETAS EN RETÍCULA CON BORDES DE 90° */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
          {GENEROS_VERTIENTES.map((genero) => {
            const count = genreCounts?.[genero.nombre] ?? genero.titulosBase;

            return (
              <div
                key={genero.id}
                onClick={() => setSelectedGenero(genero)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setSelectedGenero(genero);
                  }
                }}
                className="group relative flex flex-col justify-between items-center text-center p-4 sm:p-5 border-2 border-[#1F1305] bg-white min-h-[260px] sm:min-h-[290px] shadow-[4px_4px_0px_#1F1305] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-1 hover:shadow-[6px_6px_0px_#E80000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer overflow-hidden"
              >
                {/* Código de Subgénero en la parte superior */}
                <div className="w-full flex items-center justify-between border-b-2 border-[#EDE0D0] pb-1.5 text-xs">
                  <span className="font-anton text-base font-black text-[#E80000]">
                    SUB-0{genero.id}
                  </span>
                  <span className="text-[11px] uppercase font-bold text-[#746B5C] truncate max-w-[80px]" title={genero.region}>
                    {genero.region.split("&")[0].trim()}
                  </span>
                </div>

                {/* Emblema central de surco fonográfico */}
                <div className="my-3 flex items-center justify-center">
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 border-2 border-[#1F1305] bg-[#140D04] flex items-center justify-center shadow-md group-hover:scale-105 transition-all">
                    <div className="absolute inset-1 border border-[#3E2C1B]" />
                    <div className="relative z-10 w-6 h-6 border border-black bg-[#1F1305] flex items-center justify-center">
                      <Disc className="h-3.5 w-3.5 text-[#F1730C]" />
                    </div>
                  </div>
                </div>

                {/* Pie de tarjeta: Nombre y Conteo Real */}
                <div className="w-full space-y-1">
                  <h3 className="font-cooper text-xs sm:text-sm font-black text-[#1F1305] group-hover:text-[#E80000] transition-colors leading-tight">
                    {genero.nombre}
                  </h3>

                  <div className="flex items-center justify-center gap-1 text-[11px] text-[#746B5C] group-hover:text-[#1F1305] transition-colors font-bold">
                    <span className="text-[#E80000]">★</span>
                    <span>{count} títulos</span>
                  </div>
                </div>

                <div className="absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="h-3.5 w-3.5 text-[#E80000]" />
                </div>
              </div>
            );
          })}
        </div>

        {/* PIE DE SECCIÓN */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t-2 border-[#1F1305] text-xs text-[#5A5245]">
          <div className="flex items-center gap-2">
            <span className="text-[#E80000] font-black">●</span>
            <span>Haz clic en cualquier subgénero para abrir el informe de organología e instrumentos matriz.</span>
          </div>

          <Link
            href="/vinilos"
            className="inline-flex items-center gap-2 text-[#1F1305] hover:text-[#E80000] font-bold transition-colors group"
          >
            <span>Consultar evidencias en la Bóveda de Vinilos</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

      </div>

      {/* MODAL DEL INFORME PERICIAL DEL SUBGÉNERO */}
      {selectedGenero && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 select-none"
          onClick={() => setSelectedGenero(null)}
        >
          <div
            className="relative w-full max-w-xl border-2 border-[#1F1305] bg-[#1F1305] text-white p-6 sm:p-8 shadow-[8px_8px_0px_#E80000] space-y-6 font-mono"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cabecera del Modal */}
            <div className="flex items-start justify-between border-b-2 border-[#3E2C1B] pb-4">
              <div className="space-y-1">
                <span className="text-[11px] font-bold tracking-widest text-[#E80000] uppercase">
                  INFORME DE SUBGÉNERO NO. 0{selectedGenero.id} // LEGAJO PERICIAL
                </span>
                <h3 className="font-cooper text-2xl sm:text-3xl font-black text-white">
                  {selectedGenero.nombre}
                </h3>
                <div className="flex items-center gap-2 text-xs text-[#F1730C]">
                  <MapPin className="h-3.5 w-3.5 text-[#F1730C]" />
                  <span>{selectedGenero.region}</span>
                  <span className="text-[#746B5C]">|</span>
                  <span className="text-white font-bold">
                    ★ {genreCounts?.[selectedGenero.nombre] ?? selectedGenero.titulosBase} TÍTULOS EN BÓVEDA
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedGenero(null)}
                className="border-2 border-[#3E2C1B] bg-[#3E2C1B] p-1.5 text-white hover:bg-[#E80000] hover:text-white transition-colors cursor-pointer"
                title="Cerrar ventana"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Reseña Histórica */}
            <div className="space-y-2 text-xs text-[#EDE0D0] leading-relaxed">
              <p className="font-bold text-[#F1730C] uppercase tracking-wider text-[11px]">
                ORIGEN &amp; DESARROLLO EN CATÁLOGO:
              </p>
              <p className="text-[#B8AFA6] leading-relaxed">
                {selectedGenero.descripcionLarga}
              </p>
            </div>

            {/* Organología e Instrumentos */}
            <div className="border-2 border-[#3E2C1B] bg-[#140D04] p-3.5 space-y-1.5 text-xs">
              <div className="flex items-center gap-2 text-white font-bold text-[11px] uppercase">
                <Sliders className="h-3.5 w-3.5 text-[#E80000]" />
                <span>ORGANOLOGÍA &amp; INSTRUMENTOS MATRICES:</span>
              </div>
              <p className="text-[#B8AFA6] text-[11px] leading-relaxed">
                {selectedGenero.instrumentos}
              </p>
            </div>

            {/* Agrupaciones Pioneras y Grabadas en la Base de Datos */}
            <div className="space-y-2 border-t-2 border-[#3E2C1B] pt-4 text-xs">
              <span className="text-[11px] font-bold text-white uppercase tracking-wider">
                CONJUNTOS &amp; AGRUPACIONES REGISTRADAS:
              </span>
              <div className="flex flex-wrap gap-2 pt-1">
                {selectedGenero.gruposPioneros.map((grupo, i) => (
                  <span
                    key={i}
                    className="border border-[#3E2C1B] bg-[#0E0803] px-2.5 py-1 text-[11px] font-semibold text-[#EDE0D0] flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 bg-[#E80000]" />
                    <span>{grupo}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Acciones */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <Link
                href="/vinilos"
                className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 border-2 border-[#1F1305] bg-[#E80000] py-2.5 text-xs font-bold text-white shadow-[3px_3px_0px_#EDE0D0] hover:bg-white hover:text-[#1F1305] transition-all cursor-pointer"
              >
                <Radio className="h-4 w-4" />
                <span>EXPLORAR EN EL CATÁLOGO</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/genealogia"
                className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 border-2 border-[#3E2C1B] bg-[#140D04] py-2.5 text-xs font-bold text-white hover:bg-[#F1730C] hover:text-white transition-all cursor-pointer"
              >
                <span>VER ÁRBOL GENEALÓGICO</span>
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
