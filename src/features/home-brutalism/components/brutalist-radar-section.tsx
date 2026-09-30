"use client";

import { useState } from "react";
import Link from "next/link";
import { Disc, ArrowUpRight, X, Music, ExternalLink, Sparkles } from "lucide-react";

interface JoyaVinilo {
  id: string;
  categoria: string;
  ano: number;
  sello: string;
  catalogo: string;
  titulo: string;
  artista: string;
  bpm: number;
  camelot: string;
  tonalidad: string;
  esDestacado?: boolean;
  colorGalleta: string;
  colorBordeGalleta: string;
  descripcion: string;
  temasClave: string[];
  mediaType: "youtube" | "spotify";
  mediaId: string;
}

const JOYAS_FUNDACIONALES: JoyaVinilo[] = [
  {
    id: "los-destellos-1968",
    categoria: "INICIO PSICODÉLICO",
    ano: 1968,
    sello: "Odeón",
    catalogo: "ELD-1735",
    titulo: "Los Destellos",
    artista: "Los Destellos",
    bpm: 112,
    camelot: "8A",
    tonalidad: "Am",
    colorGalleta: "#1A2535",
    colorBordeGalleta: "#E80000",
    descripcion:
      "El vinilo matriz que fundó la cumbia peruana. Enrique Delgado sustituyó el acordeón colombiano por el punteo eléctrico de la Fender Stratocaster con distorsión y reverberación de cinta, creando un sonido continental irrepetible.",
    temasClave: ["El Avispón", "La Charapita", "Guajira Sicodélica", "El Campesino"],
    mediaType: "youtube",
    mediaId: "dQw4w9WgXcQ",
  },
  {
    id: "el-sonido-selvatico-1973",
    categoria: "OBRA CUMBRE DE LA SELVA",
    ano: 1973,
    sello: "Infopesa",
    catalogo: "LPS-8043",
    titulo: "El Sonido Selvático",
    artista: "Los Mirlos",
    bpm: 124,
    camelot: "8A",
    tonalidad: "Am",
    esDestacado: true,
    colorGalleta: "#F1730C",
    colorBordeGalleta: "#E80000",
    descripcion:
      "Consagración histórica de la cumbia amazónica peruana editada por Alberto Maraví. Guitarras espaciales cargadas de eco analógico Roland Space Echo, güiro sincopado y melodías hipnóticas que conquistaron toda Latinoamérica.",
    temasClave: ["El Sonido de los Mirlos", "El Tirofijo", "Amor Bizarro", "Lamento en la Selva"],
    mediaType: "youtube",
    mediaId: "M7lc1UVf-VE",
  },
  {
    id: "el-gran-cacique-1973",
    categoria: "HIMNO AMAZÓNICO",
    ano: 1973,
    sello: "Infopesa",
    catalogo: "LPS-8063",
    titulo: "El Gran Cacique",
    artista: "Juaneco y su Combo",
    bpm: 128,
    camelot: "8A",
    tonalidad: "Am",
    colorGalleta: "#851A1A",
    colorBordeGalleta: "#F1730C",
    descripcion:
      "La cúspide sonora de Pucallpa. Con el legendario órgano Farfisa de Juan Wong y la guitarra mística de Noé Fachín 'El Brujo'. Una grabación donde el folklore ucayalino se fusionó con la psicodelia tropical en cinta magnética.",
    temasClave: ["Mujer Hilandera", "Ya se ha muerto mi abuelo", "Vacilando con Ayahuasca", "Linda Nena"],
    mediaType: "youtube",
    mediaId: "dQw4w9WgXcQ",
  },
];

export function BrutalistRadarSection() {
  const [selectedAlbum, setSelectedAlbum] = useState<JoyaVinilo | null>(null);

  return (
    <section id="radar-joyas" className="w-full border-b-2 border-[#1F1305] bg-[#160E06] text-white py-14 sm:py-20 scroll-mt-20 relative overflow-hidden">
      
      {/* Fondo con textura sutil de estudio */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(241,115,12,0.06)_0,transparent_70%)] pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 space-y-12 relative z-10">
        
        {/* CABECERA EDITORIAL CENTRADA */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 border border-[#E80000] bg-[#E80000]/15 px-3 py-1 font-mono text-xs font-bold text-[#E80000] tracking-widest uppercase shadow-[2px_2px_0px_#1F1305]">
            <Sparkles className="h-3.5 w-3.5 text-[#E80000]" />
            <span>SELECCIÓN HISTÓRICA DEL ARCHIVO // EL RADAR SONORO</span>
          </div>

          <h2 className="font-cooper text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Joyas Fundacionales <br className="hidden sm:inline" />
            <span className="text-[#F1730C]">: Prensajes Imprescindibles</span>
          </h2>

          <p className="font-mono text-xs sm:text-sm text-[#B8AFA6] leading-relaxed max-w-2xl mx-auto">
            Las tres producciones en vinilo que redefinieron el sonido de las guitarras eléctricas,
            los ecos de selva y el ritmo bailable del Perú en los años 70.
          </p>
        </div>

        {/* CUADRÍCULA DE LAS 3 JOYAS (CENTRAL ELEVADA & DESTACADA) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-end pt-4">
          {JOYAS_FUNDACIONALES.map((album) => {
            const isCenter = album.esDestacado;

            return (
              <div
                key={album.id}
                className={`relative flex flex-col justify-between transition-all duration-300 group ${
                  isCenter
                    ? "border-2 border-[#F1730C] bg-[#1F1305] p-6 sm:p-7 shadow-[8px_8px_0px_#E80000] lg:-translate-y-4 hover:-translate-y-6"
                    : "border-2 border-[#3E2C1B] bg-[#140D04] p-5 sm:p-6 shadow-[5px_5px_0px_#1F1305] hover:border-[#F1730C] hover:-translate-y-2"
                }`}
              >
                {/* Resalte decorativo superior para el disco cumbre central */}
                {isCenter && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 border border-[#1F1305] bg-[#E80000] text-white px-3 py-0.5 font-mono text-[10px] font-black uppercase tracking-wider shadow-[2px_2px_0px_#1F1305] z-20">
                    ★ DISCO CUMBRE DE LA DÉCADA ★
                  </div>
                )}

                <div className="space-y-5">
                  {/* Fila superior: Categoría y Año */}
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border ${
                        isCenter
                          ? "border-[#F1730C] bg-[#F1730C]/15 text-[#F1730C]"
                          : "border-[#3E2C1B] bg-white/5 text-[#B8AFA6]"
                      }`}
                    >
                      {album.categoria}
                    </span>

                    <span className="font-mono text-xs font-bold text-white bg-black/60 px-2 py-0.5 border border-[#3E2C1B]">
                      {album.ano}
                    </span>
                  </div>

                  {/* CAJA DE VINILO CON SURCOS CONCÉNTRICOS Y GALLETA CENTRAL */}
                  <div className="relative aspect-square w-full rounded-2xl bg-[#090602] border-2 border-[#1F1305] overflow-hidden flex flex-col justify-between p-4 shadow-inner group-hover:border-[#F1730C]/60 transition-colors">
                    
                    {/* Surcos de vinilo concéntricos simulados */}
                    <div
                      className="absolute inset-4 rounded-full border border-neutral-800 opacity-60 pointer-events-none"
                      style={{
                        background:
                          "repeating-radial-gradient(circle at center, rgba(255,255,255,0.04) 0, rgba(255,255,255,0.04) 2px, transparent 3px, transparent 6px)",
                      }}
                    />

                    {/* Efecto de brillo de vinilo en diagonal */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent pointer-events-none" />

                    {/* Disco central giratorio con la galleta del sello */}
                    <div className="relative w-full h-full flex items-center justify-center">
                      <div
                        className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 flex flex-col items-center justify-center shadow-2xl transition-transform duration-700 group-hover:rotate-180"
                        style={{
                          backgroundColor: album.colorGalleta,
                          borderColor: album.colorBordeGalleta,
                        }}
                      >
                        {/* Agujero central del vinilo */}
                        <div className="w-6 h-6 rounded-full border-2 border-black bg-[#EDE0D0] flex items-center justify-center shadow-inner">
                          <div className="w-2 h-2 rounded-full bg-black" />
                        </div>

                        {/* Texto de la galleta */}
                        <span className="font-mono text-[8px] font-black uppercase text-white mt-1 tracking-tighter">
                          {album.sello}
                        </span>
                      </div>
                    </div>

                    {/* Metadatos inferiores dentro de la carátula: Sello y Catálogo */}
                    <div className="relative z-10 flex items-center justify-between font-mono text-[11px] text-[#B8AFA6] border-t border-white/5 pt-2">
                      <span className="font-semibold text-white/90">{album.sello}</span>
                      <span className="text-[#F1730C] font-mono tracking-wider">{album.catalogo}</span>
                    </div>
                  </div>

                  {/* TÍTULO Y ARTISTA */}
                  <div className="space-y-1">
                    <h3 className="font-cooper text-2xl sm:text-3xl font-black text-white group-hover:text-[#F1730C] transition-colors leading-tight">
                      {album.titulo}
                    </h3>
                    <p className="font-mono text-xs text-[#B8AFA6] font-semibold">
                      {album.artista}
                    </p>
                  </div>
                </div>

                {/* BARRA INFERIOR: BPM, TONALIDAD CAMELOT Y VER FICHA */}
                <div className="pt-6 mt-6 border-t border-[#3E2C1B] flex items-center justify-between font-mono text-xs">
                  {/* Badge técnico DJ */}
                  <div className="flex items-center gap-1.5 border border-[#3E2C1B] bg-black/60 px-2.5 py-1 text-[11px] text-[#EDE0D0]">
                    <span className="w-2 h-2 rounded-full bg-[#E80000] animate-pulse" />
                    <span className="font-bold text-[#F1730C]">{album.bpm} BPM</span>
                    <span className="text-neutral-500">|</span>
                    <span className="font-bold text-white">{album.camelot} ({album.tonalidad})</span>
                  </div>

                  {/* Botón Ver Ficha */}
                  <button
                    type="button"
                    onClick={() => setSelectedAlbum(album)}
                    className="inline-flex items-center gap-1 text-[#B8AFA6] group-hover:text-[#F1730C] font-bold text-xs hover:underline transition-colors cursor-pointer"
                  >
                    <span>Ver Ficha</span>
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* BOTÓN AL RADAR COMPLETO */}
        <div className="pt-4 flex justify-center">
          <Link
            href="/radar"
            className="inline-flex items-center gap-2.5 border-2 border-[#1F1305] bg-[#F1730C] px-8 py-3.5 font-mono text-xs font-bold text-white shadow-[4px_4px_0px_#E80000] hover:bg-white hover:text-[#1F1305] hover:border-[#1F1305] hover:shadow-[4px_4px_0px_#1F1305] transition-all active:translate-x-0.5 active:translate-y-0.5"
          >
            <Disc className="h-4 w-4" />
            <span>EXPLORAR CATÁLOGO COMPLETO EN EL RADAR (45s & LPs)</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

      </div>

      {/* MODAL EDITORIAL: FICHA TÉCNICA DEL VINILO SELECCIONADO */}
      {selectedAlbum && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedAlbum(null)}
        >
          <div
            className="relative w-full max-w-xl border-2 border-[#1F1305] bg-[#1F1305] text-white p-6 sm:p-8 shadow-[8px_8px_0px_#E80000] space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cabecera del Modal */}
            <div className="flex items-start justify-between border-b border-[#3E2C1B] pb-4">
              <div className="space-y-1">
                <span className="font-mono text-[10px] font-bold tracking-widest text-[#E80000] uppercase">
                  {selectedAlbum.categoria} • PRENSAJE MATRIZ {selectedAlbum.ano}
                </span>
                <h3 className="font-cooper text-2xl sm:text-3xl font-black text-white">
                  {selectedAlbum.titulo}
                </h3>
                <p className="font-mono text-xs text-[#F1730C]">
                  {selectedAlbum.artista} {"//"} {selectedAlbum.sello} ({selectedAlbum.catalogo})
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedAlbum(null)}
                className="border border-[#3E2C1B] bg-white/10 p-1.5 text-white hover:bg-[#E80000] hover:text-white transition-colors"
                title="Cerrar ficha"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Reseña musicológica */}
            <div className="space-y-2 font-mono text-xs text-[#EDE0D0] leading-relaxed">
              <p className="font-bold text-[#F1730C] uppercase tracking-wider text-[11px]">
                RESEÑA HISTÓRICA & ANÁLISIS DE PRENSAJE:
              </p>
              <p className="text-[#B8AFA6] leading-relaxed">
                {selectedAlbum.descripcion}
              </p>
            </div>

            {/* Pistas emblemáticas */}
            <div className="space-y-2 border-t border-[#3E2C1B] pt-4 font-mono text-xs">
              <span className="text-[11px] font-bold text-white uppercase tracking-wider">
                CORTES Y TEMAS EMBLEMÁTICOS:
              </span>
              <div className="grid grid-cols-2 gap-2 pt-1">
                {selectedAlbum.temasClave.map((t, i) => (
                  <div
                    key={i}
                    className="border border-[#3E2C1B] bg-[#140D04] p-2 flex items-center gap-2 text-[11px] text-[#EDE0D0]"
                  >
                    <span className="text-[#E80000] font-bold">0{i + 1}.</span>
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Especificaciones DJ */}
            <div className="border border-[#3E2C1B] bg-[#0E0803] p-3 flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-2">
                <Music className="h-4 w-4 text-[#F1730C]" />
                <span className="text-white font-bold">{selectedAlbum.bpm} BPM</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-neutral-500">RUEDA CAMELOT:</span>
                <span className="text-[#E80000] font-bold">{selectedAlbum.camelot} ({selectedAlbum.tonalidad})</span>
              </div>
              <div className="text-[10px] text-neutral-400">
                PITCH ±3% / ±5%
              </div>
            </div>

            {/* Acciones */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <Link
                href="/radar"
                className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 border-2 border-[#1F1305] bg-[#E80000] py-2.5 font-mono text-xs font-bold text-white shadow-[3px_3px_0px_#EDE0D0] hover:bg-white hover:text-[#1F1305] transition-all"
              >
                <span>VER EN EL RADAR COMPLETO</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/match-bpm"
                className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 border-2 border-[#3E2C1B] bg-white/5 py-2.5 font-mono text-xs font-bold text-white hover:bg-[#F1730C] hover:text-white transition-all"
              >
                <span>CALCULAR MATCH DJ</span>
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
