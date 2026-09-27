"use client";

import { Disc3, Heart, SlidersHorizontal, BookOpen, Layers } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { BadgeFormat } from "@/components/ui/badge-format";
import { BadgeDJ } from "@/components/ui/badge-dj";
import type { AlbumItem } from "@/features/albumes";

interface DistroCardItem {
  id: number;
  title: string;
  artist: string;
  year?: number | null;
  label?: string | null;
  catalogNumber?: string | null;
  format?: string | null;
  coverUrl?: string | null;
  bpm?: number | null;
  camelot?: string | null;
  musicalKey?: string | null;
}

interface DistroCatalogGridProps {
  albums: DistroCardItem[];
  onOpenDetails?: (album: AlbumItem) => void;
}

export function DistroCatalogGrid({ albums, onOpenDetails }: DistroCatalogGridProps) {
  // Tomamos los primeros 6 álbumes para la cuadrícula 4 + 2
  const topRow = albums.slice(0, 4);
  const bottomRow = albums.slice(4, 6);

  return (
    <section id="catalogo" className="py-12 sm:py-16 space-y-8">
      {/* Cabecera de Sección (Idéntico a "Новинки и обновления" de la Referencia) */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-white tracking-tight">
            Novedades & Hallazgos
          </h2>
          <p className="font-mono text-xs text-amber-400 mt-1 uppercase tracking-widest">
            Archivo Discográfico de Prensajes Históricos
          </p>
        </div>

        <span className="font-mono text-xs text-neutral-400">
          Mostrando selección de catálogo • 719 registros totales
        </span>
      </div>

      {/* Cuadrícula Asimétrica 4 + 2 + 1 (Distribución Exacta de la Imagen) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Fila Superior: 4 Tarjetas */}
        {topRow.map((album) => (
          <GlassCard
            key={album.id}
            className="group flex flex-col justify-between p-4 bg-neutral-950/80 border-white/10 hover:border-white/25 transition-all duration-300"
          >
            {/* Contenedor de Imagen de Portada con Ícono de Favorito */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 shadow-lg">
              {album.coverUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={album.coverUrl}
                  alt={album.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="h-full w-full flex flex-col items-center justify-center bg-gradient-to-br from-amber-950/40 via-neutral-900 to-black p-4 text-center">
                  <Disc3 className="h-12 w-12 text-amber-500/40 mb-2 group-hover:rotate-45 transition-transform duration-700" />
                  <span className="font-mono text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                    {album.label || "KUMBIA SOUND"}
                  </span>
                </div>
              )}

              {/* Botón de Guardar / Favorito en la esquina superior derecha */}
              <button
                type="button"
                className="absolute top-3 right-3 h-8 w-8 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/80 hover:text-rose-400 hover:scale-110 transition-all"
                title="Guardar en favoritos"
              >
                <Heart className="h-4 w-4" />
              </button>

              {/* Formato y Año en la esquina superior izquierda */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5">
                <BadgeFormat formatName={album.format || "LP 33 RPM"} size="sm" />
              </div>
            </div>

            {/* Información Editorial */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between font-mono text-[11px] text-neutral-400">
                <span className="truncate">{album.label || "Sello Particular"}</span>
                {album.year && <span className="text-white font-bold">{album.year}</span>}
              </div>

              <h4 className="font-bold text-white text-sm sm:text-base leading-snug line-clamp-1 group-hover:text-amber-300 transition-colors">
                {album.title}
              </h4>

              <p className="text-xs text-neutral-300 font-medium line-clamp-1">
                {album.artist}
              </p>

              {/* Especificaciones DJ en lugar de precio */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                <BadgeDJ
                  bpm={album.bpm}
                  camelot={album.camelot}
                  musicalKey={album.musicalKey}
                />
                {album.catalogNumber && (
                  <span className="font-mono text-[10px] text-neutral-400">
                    {album.catalogNumber}
                  </span>
                )}
              </div>
            </div>

            {/* Dos Botones de Acción en el Fondo (Idéntico a "Подробнее" y "В корзину") */}
            <div className="mt-4 pt-2 space-y-2">
              {/* Botón 1: Ver Ficha / Tracklist (Abre modal de contraportada) */}
              <button
                type="button"
                onClick={() =>
                  onOpenDetails?.({
                    id: album.id,
                    title: album.title,
                    artist: album.artist,
                    year: album.year,
                    label: album.label,
                    catalogNumber: album.catalogNumber,
                    format: album.format,
                    coverUrl: album.coverUrl,
                  })
                }
                className="w-full rounded-xl border border-white/15 bg-white/5 py-2 px-3 font-mono text-[11px] font-bold text-neutral-200 hover:border-white/30 hover:bg-white/10 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <BookOpen className="h-3.5 w-3.5 text-amber-400" />
                <span>Ver Ficha / Tracklist</span>
              </button>

              {/* Botón 2: Consulta Armónica DJ */}
              <a
                href="#dj-tools"
                className="w-full rounded-xl bg-amber-500 py-2.5 px-3 font-mono text-[11px] font-black uppercase tracking-wider text-black hover:bg-amber-400 transition-all shadow-md shadow-amber-500/20 flex items-center justify-center gap-1.5"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                <span>Consultar Armonía DJ</span>
              </a>
            </div>
          </GlassCard>
        ))}

        {/* Fila Inferior: 2 Tarjetas + 1 Banner de Doble Ancho */}
        {bottomRow.map((album) => (
          <GlassCard
            key={album.id}
            className="group flex flex-col justify-between p-4 bg-neutral-950/80 border-white/10 hover:border-white/25 transition-all duration-300"
          >
            {/* Contenedor de Imagen de Portada */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 shadow-lg">
              {album.coverUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={album.coverUrl}
                  alt={album.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="h-full w-full flex flex-col items-center justify-center bg-gradient-to-br from-amber-950/40 via-neutral-900 to-black p-4 text-center">
                  <Disc3 className="h-12 w-12 text-amber-500/40 mb-2 group-hover:rotate-45 transition-transform duration-700" />
                  <span className="font-mono text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                    {album.label || "KUMBIA SOUND"}
                  </span>
                </div>
              )}

              <button
                type="button"
                className="absolute top-3 right-3 h-8 w-8 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/80 hover:text-rose-400 hover:scale-110 transition-all"
                title="Guardar en favoritos"
              >
                <Heart className="h-4 w-4" />
              </button>

              <div className="absolute top-3 left-3 flex items-center gap-1.5">
                <BadgeFormat formatName={album.format || "LP 33 RPM"} size="sm" />
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between font-mono text-[11px] text-neutral-400">
                <span className="truncate">{album.label || "Sello Particular"}</span>
                {album.year && <span className="text-white font-bold">{album.year}</span>}
              </div>

              <h4 className="font-bold text-white text-sm sm:text-base leading-snug line-clamp-1 group-hover:text-amber-300 transition-colors">
                {album.title}
              </h4>

              <p className="text-xs text-neutral-300 font-medium line-clamp-1">
                {album.artist}
              </p>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                <BadgeDJ
                  bpm={album.bpm}
                  camelot={album.camelot}
                  musicalKey={album.musicalKey}
                />
                {album.catalogNumber && (
                  <span className="font-mono text-[10px] text-neutral-400">
                    {album.catalogNumber}
                  </span>
                )}
              </div>
            </div>

            <div className="mt-4 pt-2 space-y-2">
              <button
                type="button"
                onClick={() =>
                  onOpenDetails?.({
                    id: album.id,
                    title: album.title,
                    artist: album.artist,
                    year: album.year,
                    label: album.label,
                    catalogNumber: album.catalogNumber,
                    format: album.format,
                    coverUrl: album.coverUrl,
                  })
                }
                className="w-full rounded-xl border border-white/15 bg-white/5 py-2 px-3 font-mono text-[11px] font-bold text-neutral-200 hover:border-white/30 hover:bg-white/10 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <BookOpen className="h-3.5 w-3.5 text-amber-400" />
                <span>Ver Ficha / Tracklist</span>
              </button>

              <a
                href="#dj-tools"
                className="w-full rounded-xl bg-amber-500 py-2.5 px-3 font-mono text-[11px] font-black uppercase tracking-wider text-black hover:bg-amber-400 transition-all shadow-md shadow-amber-500/20 flex items-center justify-center gap-1.5"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                <span>Consultar Armonía DJ</span>
              </a>
            </div>
          </GlassCard>
        ))}

        {/* Tarjeta 7: Banner Ancho de Doble Columna (Idéntico a la Ilustración de la Referencia) */}
        <GlassCard
          variant="editorial"
          className="lg:col-span-2 p-8 sm:p-10 flex flex-col items-center justify-center text-center space-y-6 bg-gradient-to-br from-white/[0.05] via-neutral-950 to-black border-dashed border-white/20 relative overflow-hidden"
        >
          {/* Gráfico / Silueta de Coleccionista y Vinilo */}
          <div className="relative h-24 w-24 rounded-full bg-gradient-to-tr from-amber-500/20 via-rose-500/15 to-transparent border border-amber-500/30 flex items-center justify-center shadow-inner">
            <Disc3 className="h-12 w-12 text-amber-400 animate-spin-slow" />
          </div>

          <div className="max-w-md space-y-2">
            <h3 className="font-serif text-xl sm:text-2xl font-black text-white tracking-tight">
              Ingresos y Hallazgos Continuos
            </h3>
            <p className="font-mono text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Nuevas digitalizaciones y catalogaciones de vinilos se incorporan periódicamente — preservando juntos la memoria fonográfica del Perú.
            </p>
          </div>

          <a
            href="#catalogo"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-2.5 font-mono text-xs font-bold text-white hover:bg-white/10 hover:border-amber-400 transition-all"
          >
            <Layers className="h-4 w-4 text-amber-400" />
            <span>Explorar los 719 Álbumes Físicos</span>
          </a>
        </GlassCard>
      </div>
    </section>
  );
}
