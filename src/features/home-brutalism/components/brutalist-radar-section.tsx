"use client";

import { useState } from "react";
import Link from "next/link";
import { Disc, ArrowUpRight, X, Music, ExternalLink, Sparkles, Radio } from "lucide-react";
import type { AlbumItem } from "@/features/albumes";

interface JoyaVinilo {
  id: string;
  idAlbum?: number;
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
  coverUrl?: string | null;
  descripcion: string;
  temasClave: string[];
  mediaType: "youtube" | "spotify";
  mediaId: string;
}

const JOYAS_FUNDACIONALES: JoyaVinilo[] = [
  {
    id: "clase-aparte-1971",
    idAlbum: 6,
    categoria: "VIRTUOSISMO & GUITARRA DE ORO",
    ano: 1971,
    sello: "Odeón",
    catalogo: "ELD-2034",
    titulo: "Clase Aparte",
    artista: "Los Destellos",
    bpm: 110,
    camelot: "8A",
    tonalidad: "Am",
    colorGalleta: "#1A2535",
    colorBordeGalleta: "#E80000",
    coverUrl:
      "https://zinwvwulzdcmuhxrpnol.supabase.co/storage/v1/object/public/media/albumes/6-portada-1789959564303.webp",
    descripcion:
      "Una de las obras más depuradas de Enrique Delgado. Grabado con técnica impecable en los estudios de Odeón / IEMPSA, este LP destaca por punteos de guitarra ágiles, virtuosismo instrumental y una refinada mezcla de tradición criolla costeña con rock psicodélico.",
    temasClave: ["Para Elena", "El Pacífico", "La Fatídica", "El Eléctrico", "¿Tú Dónde Estás?"],
    mediaType: "youtube",
    mediaId: "dQw4w9WgXcQ",
  },
  {
    id: "mundial-1970",
    idAlbum: 4,
    categoria: "EL FENÓMENO CONTINENTAL DE ELSA",
    ano: 1970,
    sello: "Odeón",
    catalogo: "ELD-1915",
    titulo: "Mundial",
    artista: "Los Destellos",
    bpm: 108,
    camelot: "8B",
    tonalidad: "C",
    esDestacado: true,
    colorGalleta: "#F1730C",
    colorBordeGalleta: "#E80000",
    coverUrl:
      "https://zinwvwulzdcmuhxrpnol.supabase.co/storage/v1/object/public/media/albumes/4-portada-1789959558645.webp",
    descripcion:
      "El álbum definitivo que inmortalizó el tema 'Elsa', consagrando a Los Destellos en el pináculo de la música latinoamericana en pleno año del Mundial México 70. Arreglos magistrales de timbal, güiro y la inconfundible guitarra solista de Enrique Delgado.",
    temasClave: ["Elsa", "Ronda Tropical", "El Baile de la Coja", "Luchita", "Muchachita Celosa"],
    mediaType: "youtube",
    mediaId: "dQw4w9WgXcQ",
  },
  {
    id: "en-orbita-1969",
    idAlbum: 2,
    categoria: "PSICODELIA & CUMBIA ESPACIAL",
    ano: 1969,
    sello: "Odeón",
    catalogo: "ELD-1795",
    titulo: "En Órbita",
    artista: "Los Destellos",
    bpm: 118,
    camelot: "7A",
    tonalidad: "Dm",
    colorGalleta: "#851A1A",
    colorBordeGalleta: "#F1730C",
    coverUrl:
      "https://zinwvwulzdcmuhxrpnol.supabase.co/storage/v1/object/public/media/albumes/2-portada-1789959550187.webp",
    descripcion:
      "Lanzado en plena era de la llegada a la Luna, 'En Órbita' expandió los límites de la música tropical incorporando distorsión, efectos espaciales de cinta magnética y la célebre relectura tropical de la pieza clásica 'Para Elisa' de Beethoven.",
    temasClave: ["Para Elisa", "Descarga Destellos", "El Pollito", "Cumbia del Desierto", "Boogaloo de Los Destellos"],
    mediaType: "youtube",
    mediaId: "dQw4w9WgXcQ",
  },
];

interface BrutalistRadarSectionProps {
  albums?: AlbumItem[];
}

export function BrutalistRadarSection({ albums = [] }: BrutalistRadarSectionProps) {
  const [selectedAlbum, setSelectedAlbum] = useState<JoyaVinilo | null>(null);

  // Mapear con portadas en vivo desde Supabase
  const displayedAlbums: JoyaVinilo[] = JOYAS_FUNDACIONALES.map((joya) => {
    const live = albums.find(
      (a) =>
        (joya.idAlbum && a.id === joya.idAlbum) ||
        (joya.catalogo && a.catalogNumber === joya.catalogo) ||
        a.title.toLowerCase().trim() === joya.titulo.toLowerCase().trim()
    );
    return {
      ...joya,
      coverUrl: live?.coverUrl || joya.coverUrl,
    };
  });

  return (
    <section id="radar-joyas" className="w-full border-b-2 border-[#1F1305] bg-[#160E06] text-white py-12 sm:py-16 scroll-mt-20 relative overflow-hidden select-none">
      
      <div className="container mx-auto max-w-7xl px-3 sm:px-6 space-y-10 relative z-10">
        
        {/* CABECERA TELEMÉTRICA DEL RADAR */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-[#3E2C1B] pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 border-2 border-[#E80000] bg-[#E80000]/15 px-3 py-1 font-mono text-[10px] sm:text-xs font-bold text-[#E80000] tracking-widest uppercase shadow-[2px_2px_0px_#1F1305]">
              <Radio className="h-3.5 w-3.5 text-[#E80000] animate-pulse" />
              <span>RADAR SONORO // SONDA DE CORTE EN DISCO MATRIZ</span>
            </div>

            <h2 className="font-cooper text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Joyas Fundacionales <span className="text-[#F1730C]">: Prensajes Cumbre</span>
            </h2>
          </div>

          <div className="max-w-md font-mono text-xs text-[#B8AFA6] leading-relaxed">
            <p>
              Tres registros de prensado directo en Odeón / IEMPSA con aguja de zafiro.
              Guitarras solistas de Enrique Delgado con afinación precisa a 440 Hz.
            </p>
          </div>
        </div>

        {/* CUADRÍCULA DE LAS 3 JOYAS (CHASSIS RACK DE 19 PULGADAS CON 90° PUROS) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-end pt-2">
          {displayedAlbums.map((album) => {
            const isCenter = album.esDestacado;

            return (
              <div
                key={album.id}
                className={`relative flex flex-col justify-between transition-all duration-200 group font-mono ${
                  isCenter
                    ? "border-2 border-[#F1730C] bg-[#1F1305] p-5 sm:p-6 shadow-[8px_8px_0px_#E80000] lg:-translate-y-3"
                    : "border-2 border-[#3E2C1B] bg-[#120B04] p-4 sm:p-5 shadow-[5px_5px_0px_#1F1305] hover:border-[#F1730C]"
                }`}
              >
                {/* Tornillos de montaje en rack (·) en la barra superior */}
                <div className="flex items-center justify-between text-[9px] text-[#8E8478] pb-3 border-b border-[#3E2C1B]">
                  <span className="font-bold text-[#E80000]">(·) RACK-{album.catalogo}</span>
                  <span className="text-white font-bold">{album.ano} MASTER CUT</span>
                  <span className="font-bold text-[#E80000]">(·)</span>
                </div>

                {/* Resalte para el disco central */}
                {isCenter && (
                  <div className="my-2 border border-[#E80000] bg-[#E80000] text-white text-center py-0.5 text-[9px] font-black uppercase tracking-wider">
                    ★ DISCO CUMBRE DEL CATÁLOGO ★
                  </div>
                )}

                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#F1730C]">
                      {album.categoria}
                    </span>
                    <span className="text-[10px] text-white bg-black/60 px-1.5 py-0.2 border border-[#3E2C1B]">
                      {album.sello}
                    </span>
                  </div>

                  {/* CARÁTULA DEL LP CON DISCO DESLIZANTE MECÁNICO */}
                  <div className="relative aspect-square w-full select-none flex items-center justify-start overflow-hidden">
                    
                    {/* Disco de vinilo que asoma */}
                    <div
                      aria-hidden="true"
                      className="absolute right-0 top-1/2 -translate-y-1/2 w-[84%] aspect-square bg-[#0E0E10] border-2 border-[#1F1305] shadow-2xl flex items-center justify-center transition-transform duration-500 ease-out translate-x-2 group-hover:translate-x-8 z-0 overflow-hidden"
                    >
                      <div className="absolute inset-2 border border-white/10" />
                      <div className="absolute inset-6 border border-white/5" />
                      <div className="absolute inset-10 border border-white/10" />
                      
                      {/* Galleta central */}
                      <div
                        className="w-16 h-16 border-2 flex flex-col items-center justify-center text-center p-1"
                        style={{
                          backgroundColor: album.colorGalleta,
                          borderColor: album.colorBordeGalleta,
                        }}
                      >
                        <div className="w-3 h-3 border border-black bg-white" />
                        <span className="text-[7px] font-mono font-black uppercase text-white mt-1">
                          {album.sello}
                        </span>
                      </div>
                    </div>

                    {/* Funda del LP con esquinas de 90° */}
                    <div className="relative z-10 w-[84%] aspect-square border-2 border-[#1F1305] bg-[#0A0704] overflow-hidden shadow-xl flex flex-col justify-between group-hover:border-[#F1730C] transition-colors">
                      {album.coverUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={album.coverUrl}
                          alt={`Carátula de ${album.titulo} - Los Destellos`}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-[#1A1108] flex items-center justify-center">
                          <Disc className="w-12 h-12 text-white/20 animate-spin" />
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40 pointer-events-none" />

                      {/* Badges superiores sobre la portada */}
                      <div className="relative z-10 flex items-start justify-between p-2">
                        <span className="text-[9px] font-black uppercase text-white bg-black/80 px-1.5 py-0.5 border border-white/20">
                          {album.sello}
                        </span>
                        <span className="text-[9px] font-bold text-[#F1730C] bg-black/80 px-1.5 py-0.5 border border-white/20">
                          {album.catalogo}
                        </span>
                      </div>

                      {/* Pie de carátula */}
                      <div className="relative z-10 p-2 flex items-center justify-between border-t border-white/10 bg-black/70">
                        <span className="text-[9px] font-bold text-white">
                          LP 33 RPM • ESTÉREO
                        </span>
                        <span className="text-[9px] font-bold text-[#F1730C]">
                          {album.ano}
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* TÍTULO Y ARTISTA */}
                  <div className="space-y-0.5 pt-1">
                    <h3 className="font-cooper text-xl sm:text-2xl font-black text-white group-hover:text-[#F1730C] transition-colors leading-tight">
                      {album.titulo}
                    </h3>
                    <p className="text-xs text-[#B8AFA6] font-semibold">
                      {album.artista}
                    </p>
                  </div>
                </div>

                {/* BARRA INFERIOR: BPM, CAMELOT Y VER FICHA */}
                <div className="pt-4 mt-4 border-t border-[#3E2C1B] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 border border-[#3E2C1B] bg-black/70 px-2 py-0.5 text-[10px] text-[#EDE0D0]">
                    <span className="w-1.5 h-1.5 bg-[#E80000] animate-pulse" />
                    <span className="font-bold text-[#F1730C]">{album.bpm} BPM</span>
                    <span className="text-neutral-500">|</span>
                    <span className="font-bold text-white">{album.camelot} ({album.tonalidad})</span>
                  </div>

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
        <div className="pt-2 flex justify-center">
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 select-none font-mono"
          onClick={() => setSelectedAlbum(null)}
        >
          <div
            className="relative w-full max-w-2xl border-2 border-[#1F1305] bg-[#1F1305] text-white p-6 sm:p-8 shadow-[8px_8px_0px_#E80000] space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cabecera del Modal */}
            <div className="flex items-start justify-between border-b-2 border-[#3E2C1B] pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-[#E80000] uppercase">
                  <span>(·) FICHA MATRIZ {selectedAlbum.ano}</span>
                  <span>•</span>
                  <span>{selectedAlbum.categoria}</span>
                </div>
                <h3 className="font-cooper text-2xl sm:text-3xl font-black text-white">
                  {selectedAlbum.titulo}
                </h3>
                <p className="text-xs text-[#F1730C]">
                  {selectedAlbum.artista} {"//"} {selectedAlbum.sello} ({selectedAlbum.catalogo})
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedAlbum(null)}
                className="border-2 border-[#3E2C1B] bg-white/10 p-1.5 text-white hover:bg-[#E80000] hover:text-white transition-colors"
                title="Cerrar ficha"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* CUERPO DEL MODAL */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-start">
              {selectedAlbum.coverUrl && (
                <div className="sm:col-span-5 relative aspect-square border-2 border-[#3E2C1B] overflow-hidden bg-black shadow-xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selectedAlbum.coverUrl}
                    alt={selectedAlbum.titulo}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center text-[10px] text-white/90 bg-black/70 px-2 py-0.5 border border-white/10">
                    <span>{selectedAlbum.sello}</span>
                    <span className="text-[#F1730C] font-bold">{selectedAlbum.catalogo}</span>
                  </div>
                </div>
              )}

              <div className={`${selectedAlbum.coverUrl ? "sm:col-span-7" : "sm:col-span-12"} space-y-4`}>
                <div className="space-y-1 text-xs leading-relaxed">
                  <p className="font-bold text-[#F1730C] uppercase tracking-wider text-[11px]">
                    RESEÑA HISTÓRICA:
                  </p>
                  <p className="text-[#B8AFA6] leading-relaxed text-[11px]">
                    {selectedAlbum.descripcion}
                  </p>
                </div>

                <div className="border-2 border-[#3E2C1B] bg-[#0E0803] p-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <Music className="h-3.5 w-3.5 text-[#F1730C]" />
                    <span className="text-white font-bold text-xs">{selectedAlbum.bpm} BPM</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px]">
                    <span className="text-neutral-500">CAMELOT:</span>
                    <span className="text-[#E80000] font-bold">{selectedAlbum.camelot} ({selectedAlbum.tonalidad})</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pistas emblemáticas */}
            <div className="space-y-2 border-t-2 border-[#3E2C1B] pt-4 text-xs">
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

            {/* Acciones */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <Link
                href="/radar"
                className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 border-2 border-[#1F1305] bg-[#E80000] py-2.5 text-xs font-bold text-white shadow-[3px_3px_0px_#EDE0D0] hover:bg-white hover:text-[#1F1305] transition-all"
              >
                <span>VER EN EL RADAR COMPLETO</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/match-bpm"
                className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 border-2 border-[#3E2C1B] bg-white/5 py-2.5 text-xs font-bold text-white hover:bg-[#F1730C] hover:text-white transition-all"
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
