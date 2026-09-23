export interface MusicoGenealogia {
  id: string;
  nombre: string;
  apodo?: string;
  rolPrincipal: string;
  instrumentos: string[];
  fotoUrl: string;
  periodoActivo: string;
  trayectoria: {
    grupo: string;
    anos: string;
    rol: string;
    sellos: string[];
    temasClave: string[];
  }[];
  biografiaResumen: string;
}

export interface TemaDJ {
  id: string;
  titulo: string;
  artista: string;
  ano: number;
  sello: string;
  subgenero: "Costeña" | "Amazónica" | "Andina / Chicha" | "Psicodélica";
  bpm: number;
  camelot: string; // e.g. "8A"
  tonalidad: string; // e.g. "Am"
  duracion: string;
  portadaUrl: string;
}

export interface RadarItem {
  id: string;
  tipo: "semana" | "mes" | "playlist";
  titulo: string;
  artista: string;
  ano?: number;
  sello?: string;
  descripcion: string;
  portadaUrl: string;
  bpm?: number;
  camelot?: string;
  // Para Lite Embed:
  mediaType: "youtube" | "spotify";
  mediaId: string; // ID para armar embed cuando se presiona play
  duracionTexto?: string;
}

export interface HistoriaFondo {
  id: string;
  titulo: string;
  slug: string;
  resumen: string;
  categoria: string;
  tiempoLectura: string;
  fecha: string;
  autor: string;
  portadaUrl: string;
}

export interface MiembroEquipo {
  id: string;
  nombre: string;
  rol: string;
  fotoUrl: string;
  bio: string;
  redes: {
    tipo: "instagram" | "twitter" | "spotify" | "github";
    url: string;
  }[];
}
