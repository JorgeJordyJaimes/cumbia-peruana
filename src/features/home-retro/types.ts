export interface TemaDJ {
  id: string;
  titulo: string;
  artista: string;
  ano: number;
  sello: string;
  subgenero: string;
  primaryGenre?: string | null;
  secondaryGenre?: string | null;
  genres?: string[];
  bpm: number;
  camelot: string; // e.g. "8A"
  tonalidad: string; // e.g. "Am"
  duracion: string;
  portadaUrl: string;
  format?: string;
  side?: string | null;
}
