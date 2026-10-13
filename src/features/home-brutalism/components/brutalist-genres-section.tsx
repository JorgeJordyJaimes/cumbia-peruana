"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Library,
  Disc,
  ArrowUpRight,
  X,
  ExternalLink,
  MapPin,
  Sliders,
  Radio,
  Activity,
} from "lucide-react";

export interface GeneroVertiente {
  id: number;
  slug: string;
  nombre: string;
  region: string;
  titulos: string;
  bandFreq: string;
  faderGain: string;
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
    slug: "cumbia-costena",
    nombre: "Cumbia Costeña",
    region: "LIMA & COSTA CENTRAL",
    titulos: "240+ títulos",
    bandFreq: "2 - 4.5 kHz [HIGH-MID]",
    faderGain: "+4.2 dB",
    colorAura: "from-[#F1730C]/10 via-transparent to-transparent",
    colorIcono: "text-[#F1730C]",
    instrumentos:
      "Fender Stratocaster con distorsión y reverberación de cinta, bajo eléctrico sincopado y timbales latinos.",
    gruposPioneros: ["Los Destellos", "Los Ecos", "Manzanita y su Conjunto", "Compay Quinto"],
    descripcionCorta:
      "El origen psicodélico de la cumbia peruana. Fusión de música criolla costeña, surf rock y ritmos afro-antillanos conducidos por el punteo eléctrico de Enrique Delgado.",
    descripcionLarga:
      "Fundada a finales de los años 60 en Lima, la Cumbia Costeña sustituyó el acordeón tradicional por el virtuosismo de la guitarra eléctrica solista. Músicos con honda formación en la música criolla como Enrique Delgado y Edilberto Cuestas adaptaron escalas pentatónicas, marineras y valses con efectos de wah-wah y eco analógico, creando una escuela instrumental respetada en todo el continente.",
  },
  {
    id: 2,
    slug: "cumbia-amazonica",
    nombre: "Cumbia Amazónica",
    region: "IQUITOS, PUCALLPA & TARAPOTO",
    titulos: "185+ títulos",
    bandFreq: "5 - 9 kHz [PRESENCE]",
    faderGain: "+5.0 dB",
    colorAura: "from-emerald-500/10 via-transparent to-transparent",
    colorIcono: "text-emerald-500",
    instrumentos:
      "Órgano Farfisa Compact, eco analógico Roland Space Echo, güiro, cencerro y tumbadoras.",
    gruposPioneros: ["Los Mirlos", "Juaneco y su Combo", "Los Silvers", "Los Continentales"],
    descripcionCorta:
      "Mística psicodélica de la selva. Guitarras espaciales y el hipnótico sonido del órgano Farfisa inspirado en aves, ríos y cosmovisión amazónica.",
    descripcionLarga:
      "Nacida en el corazón de Ucayali y Loreto a inicios de los 70, esta vertiente fusionó los cantos tradicionales de las etnias amazónicas con la psicodelia tropical. Juan Wong y Noé Fachín 'El Brujo' en Juaneco y su Combo, junto a Jorge Rodríguez en Los Mirlos de Moyobamba, registraron en cinta magnética melodías hipnóticas que recrean la espesura de la selva y el viaje ritual del ayahuasca.",
  },
  {
    id: 3,
    slug: "cumbia-andina-chicha",
    nombre: "Cumbia Andina / Chicha",
    region: "CARRETERA CENTRAL & LIMA ESTE",
    titulos: "160+ títulos",
    bandFreq: "40 - 120 Hz [SUB-BASS]",
    faderGain: "+6.0 dB",
    colorAura: "from-[#E80000]/10 via-transparent to-transparent",
    colorIcono: "text-[#E80000]",
    instrumentos:
      "Guitarras con eco de cinta profundo, timbales con campana metálica, sintetizadores y voz testimonial.",
    gruposPioneros: ["Chacalón y La Nueva Crema", "Los Shapis", "Los Ovnis", "Génesis"],
    descripcionCorta:
      "La voz de las migraciones provincianas. Pentafonía andina y huayno electrificado que narraron la resistencia obrera y el desarraigo en la capital.",
    descripcionLarga:
      "Un hito sociocultural sin precedentes en América Latina. A través de la Carretera Central y barrios populosos como La Victoria, El Agustino y Huancayo, agrupaciones como Los Shapis (Julio Simeón 'Chapulín' y Jaime Moreyra) y Lorenzo Palacios 'Chacalón' electrificaron el huayno andino, convirtiendo la chicha en el estandarte sonoro de millones de trabajadores provincianos.",
  },
  {
    id: 4,
    slug: "cumbia-nortena",
    nombre: "Cumbia Norteña",
    region: "PIURA, LAMBAYEQUE & TRUJILLO",
    titulos: "85+ títulos",
    bandFreq: "10 - 16 kHz [AIR/BRASS]",
    faderGain: "+3.8 dB",
    colorAura: "from-amber-400/10 via-transparent to-transparent",
    colorIcono: "text-amber-500",
    instrumentos:
      "Sección completa de metales (trompetas, trombones), bajo melódico prominente y percusión orquestal.",
    gruposPioneros: ["Armonía 10", "Agua Marina", "Grupo 5", "Cantaritos de Oro"],
    descripcionCorta:
      "Formato orquestal y vientos potentes. Grandes ensambles de la costa norte que llenaron estadios con arreglos de big band y bajo bailable.",
    descripcionLarga:
      "En el norte cálido de Sechura, Monsefú y Piura, la cumbia evolucionó hacia un formato orquestal con arreglos de bronces de precisión quirúrgica. Letras románticas y de profundo sentimiento popular se entrelazan con bases rítmicas sólidas conducidas por orquestas históricas como Armonía 10 de Walther Lozada y Agua Marina de los hermanos Quiroga.",
  },
  {
    id: 5,
    slug: "cumbia-surena",
    nombre: "Cumbia Sureña",
    region: "PUNO, JULIACA & AREQUIPA",
    titulos: "32+ títulos",
    bandFreq: "150 - 400 Hz [LOW-MID]",
    faderGain: "+2.5 dB",
    colorAura: "from-purple-500/10 via-transparent to-transparent",
    colorIcono: "text-purple-500",
    instrumentos:
      "Sintetizadores Roland D-50, módulos Korg M1, batería electrónica y ritmo acelerado.",
    gruposPioneros: ["Los Ronisch", "Sociedad de Juliaca", "Alaska", "Pintura Roja (etapa sur)"],
    descripcionCorta:
      "Sonido digital altiplánico. Sintetizadores de los años 90, baterías electrónicas y líricas melancólicas que traspasaron fronteras hacia Bolivia y Argentina.",
    descripcionLarga:
      "Desde el frío altiplánico de Juliaca y Puno, la Cumbia Sureña revolucionó los años 90 prescindiendo de los instrumentos analógicos tradicionales en favor de teclados Roland D-50 y percusiones programadas. Con compases rápidos y melodías cargadas de nostalgia andina, Los Ronisch crearon un sonido que influenció directamente a la cumbia villera argentina y a toda la cuenca del Titicaca.",
  },
  {
    id: 6,
    slug: "cumbia-sanjuanera",
    nombre: "Cumbia Sanjuanera",
    region: "SIERRA NORTE & SELVA ALTA",
    titulos: "17+ títulos",
    bandFreq: "600 - 1.8 kHz [MID-RANGE]",
    faderGain: "+4.6 dB",
    colorAura: "from-orange-500/10 via-transparent to-transparent",
    colorIcono: "text-orange-500",
    instrumentos:
      "Arpa andina tradicional o electrificada, timbales rápidos, güiro sincopado y voces agudas en contrapunto.",
    gruposPioneros: ["Corazón Serrano", "Sensual Karicia", "El Encanto de Corazón", "Son de Ríos"],
    descripcionCorta:
      "El arpa andina como protagonista. Ritmo sanjuanito acelerado a contratiempo originario de las sierras de Piura, Cajamarca y Jaén.",
    descripcionLarga:
      "Surgida en las serranías de Piura (Ayabaca, Huancabamba) y Cajamarca (Jaén), esta vertiente combinó el ritmo folclórico del sanjuanito con el arpa andina y la instrumentación tropical contemporánea. Grupos familiares como Corazón Serrano de Pacaipampa catapultaron este ritmo desde fiestas patronales de la sierra norte hasta convertirse en el mayor fenómeno musical masivo del país en el nuevo milenio.",
  },
];

export function BrutalistGenresSection() {
  const [selectedGenero, setSelectedGenero] = useState<GeneroVertiente | null>(null);

  return (
    <section
      id="biblioteca-generos"
      className="w-full border-b-2 border-[#1F1305] bg-[#EDE0D0] text-[#1F1305] py-12 sm:py-16 scroll-mt-20 relative overflow-hidden select-none"
    >
      <div className="container mx-auto max-w-7xl px-3 sm:px-6 space-y-8 relative z-10">
        
        {/* CABECERA: ANALIZADOR DE ESPECTRO & 6 BANDAS */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b-2 border-[#1F1305]">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 border-2 border-[#1F1305] bg-[#E80000] px-3 py-1 font-mono text-[10px] sm:text-xs font-bold text-white tracking-widest uppercase shadow-[2px_2px_0px_#1F1305]">
              <Sliders className="h-3.5 w-3.5 text-white" />
              <span>ANALIZADOR DE ESPECTRO // 6 BANDAS DE FRECUENCIA</span>
            </div>

            <h2 className="font-cooper text-3xl sm:text-4xl lg:text-5xl font-black text-[#1F1305] tracking-tight leading-tight">
              Vertientes & Curvas de Ecualización
            </h2>
          </div>

          <div className="max-w-md font-mono text-xs text-[#5A5245] leading-relaxed">
            <p>
              Descomposición electroacústica de la cumbia peruana en 6 espectros tonales:
              desde el sub-bass andino hasta el aire de los metales norteños.
            </p>
          </div>
        </div>

        {/* 6 BANDAS DE FRECUENCIA EN FORMATO CHASSIS DE RACK */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {GENEROS_VERTIENTES.map((genero) => {
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
                className="group relative flex flex-col justify-between items-center text-center p-3 sm:p-4 border-2 border-[#1F1305] bg-white min-h-[270px] sm:min-h-[300px] shadow-[4px_4px_0px_#1F1305] transition-all duration-200 hover:-translate-y-1 hover:shadow-[6px_6px_0px_#E80000] cursor-pointer overflow-hidden font-mono"
              >
                {/* Tornillos de montaje en rack (·) en la barra superior */}
                <div className="w-full flex items-center justify-between text-[8px] text-[#746B5C] font-bold border-b border-[#1F1305]/20 pb-1">
                  <span>(·) BAND-0{genero.id}</span>
                  <span className="text-[#E80000] font-black">{genero.faderGain}</span>
                  <span>(·)</span>
                </div>

                {/* Banda de frecuencia */}
                <div className="w-full pt-1.5">
                  <span className="text-[9px] uppercase font-bold text-[#746B5C] block line-clamp-1">
                    {genero.bandFreq}
                  </span>
                </div>

                {/* Fader Analógico Simulado con Aguja */}
                <div className="my-3 flex flex-col items-center justify-center w-full">
                  <div className="relative h-20 w-8 bg-[#EDE0D0] border-2 border-[#1F1305] flex items-center justify-center p-1">
                    {/* Canal del fader */}
                    <div className="w-1 h-full bg-[#1F1305]" />
                    {/* Perilla deslizante del fader */}
                    <div
                      className="absolute w-6 h-3 bg-[#1F1305] border border-white flex items-center justify-center shadow-sm transition-transform group-hover:scale-110"
                      style={{ top: `${20 + (genero.id * 8)}%` }}
                    >
                      <div className="w-3 h-0.5 bg-[#E80000]" />
                    </div>
                  </div>
                  <span className="text-[8px] text-[#5A5245] font-bold mt-1">EQ FADER</span>
                </div>

                {/* Pie de Módulo: Nombre y Pistas */}
                <div className="w-full space-y-1">
                  <h3 className="font-cooper text-xs sm:text-sm font-black text-[#1F1305] group-hover:text-[#E80000] transition-colors leading-tight">
                    {genero.nombre}
                  </h3>

                  <div className="flex items-center justify-center gap-1 text-[10px] text-[#746B5C] group-hover:text-[#1F1305] transition-colors font-bold">
                    <span className="text-[#E80000]">●</span>
                    <span>{genero.titulos}</span>
                  </div>
                </div>

                {/* Botón de inspeccionar esquina */}
                <div className="absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="h-3.5 w-3.5 text-[#E80000]" />
                </div>
              </div>
            );
          })}
        </div>

        {/* PIE DE SECCIÓN: RADAR & ACCESO */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t-2 border-[#1F1305] font-mono text-xs text-[#5A5245]">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-[#E80000]" />
            <span>Haz clic sobre cualquier banda de frecuencia para aislar sus instrumentos y fonogramas.</span>
          </div>

          <Link
            href="/radar"
            className="inline-flex items-center gap-2 text-[#1F1305] hover:text-[#E80000] font-bold transition-colors group"
          >
            <span>Monitorear frecuencias en El Radar 45s</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>

      {/* MODAL DETALLADO DE BANDA DE FRECUENCIA / VERTIENTE */}
      {selectedGenero && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 select-none"
          onClick={() => setSelectedGenero(null)}
        >
          <div
            className="relative w-full max-w-xl border-2 border-[#1F1305] bg-[#1F1305] text-white p-6 sm:p-8 shadow-[8px_8px_0px_#E80000] space-y-6 font-mono"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cabecera del Chasis Modal */}
            <div className="flex items-start justify-between border-b-2 border-[#3E2C1B] pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-[#E80000] uppercase">
                  <span>(·) CHASSIS BAND-0{selectedGenero.id}</span>
                  <span>•</span>
                  <span>{selectedGenero.bandFreq}</span>
                </div>
                <h3 className="font-cooper text-2xl sm:text-3xl font-black text-white">
                  {selectedGenero.nombre}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-[#F1730C]">
                  <MapPin className="h-3.5 w-3.5 text-[#F1730C]" />
                  <span>{selectedGenero.region}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedGenero(null)}
                className="border-2 border-[#3E2C1B] bg-white/10 p-1.5 text-white hover:bg-[#E80000] hover:text-white transition-colors"
                title="Cerrar ventana"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Reseña Histórica y Curva Sonora */}
            <div className="space-y-2 text-xs text-[#EDE0D0] leading-relaxed">
              <p className="font-bold text-[#F1730C] uppercase tracking-wider text-[11px]">
                ORIGEN ELECTROACÚSTICO & ANÁLISIS HISTÓRICO:
              </p>
              <p className="text-[#B8AFA6] leading-relaxed">
                {selectedGenero.descripcionLarga}
              </p>
            </div>

            {/* Instrumentación Matriz */}
            <div className="border-2 border-[#3E2C1B] bg-[#140D04] p-3.5 space-y-1.5 text-xs">
              <div className="flex items-center gap-2 text-white font-bold text-[11px] uppercase">
                <Sliders className="h-3.5 w-3.5 text-[#E80000]" />
                <span>CADENA DE GRABACIÓN & INSTRUMENTOS:</span>
              </div>
              <p className="text-[#B8AFA6] text-[11px] leading-relaxed">
                {selectedGenero.instrumentos}
              </p>
            </div>

            {/* Agrupaciones Pioneras */}
            <div className="space-y-2 border-t border-[#3E2C1B] pt-4 text-xs">
              <span className="text-[11px] font-bold text-white uppercase tracking-wider">
                CONJUNTOS & ORQUESTAS MATRIZ:
              </span>
              <div className="flex flex-wrap gap-2 pt-1">
                {selectedGenero.gruposPioneros.map((grupo, i) => (
                  <span
                    key={i}
                    className="border border-[#3E2C1B] bg-[#0E0803] px-2.5 py-1 text-[11px] font-semibold text-[#EDE0D0] flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E80000]" />
                    <span>{grupo}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Acciones */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <Link
                href="/radar"
                className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 border-2 border-[#1F1305] bg-[#E80000] py-2.5 text-xs font-bold text-white shadow-[3px_3px_0px_#EDE0D0] hover:bg-white hover:text-[#1F1305] transition-all"
              >
                <Radio className="h-4 w-4" />
                <span>SONDEAR EN EL RADAR</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/genealogia"
                className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 border-2 border-[#3E2C1B] bg-white/5 py-2.5 text-xs font-bold text-white hover:bg-[#F1730C] hover:text-white transition-all"
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
