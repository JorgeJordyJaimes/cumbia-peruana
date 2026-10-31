export type CategoriaHallazgo =
  | "Álbum del Mes"
  | "Voz Rescatada"
  | "Agrupación Olvidada"
  | "Subgénero a Descubrir";

export interface HallazgoRadarItem {
  id: string;
  mes: string;
  año: number;
  categoria: CategoriaHallazgo;
  titulo: string;
  subtitulo: string;
  artista: string;
  añoGrabacion?: number;
  sello?: string;
  porQueImporta: string;
  portadaUrl: string;
  youtubeUrl?: string;
  youtubeId?: string;
  spotifyUrl?: string;
  spotifyId?: string;
  enlaceExpediente: {
    tipo: "vinilo" | "informe" | "genealogia";
    url: string;
    label: string;
  };
}
