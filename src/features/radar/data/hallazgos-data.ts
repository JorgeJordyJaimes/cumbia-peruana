import type { HallazgoRadarItem } from "../types";

export const HALLAZGO_DEL_MES_ACTUAL: HallazgoRadarItem = {
  id: "hallazgo-2026-10",
  mes: "Octubre",
  año: 2026,
  categoria: "Álbum del Mes",
  titulo: "El Gran Triunfo — Grupo Celeste (1975)",
  subtitulo: "La piedra angular de la cumbia testimonial y el debut inmortal de Chacalón",
  artista: "Grupo Celeste (Dir. Víctor Casahuamán / Voz: Lorenzo Palacios)",
  añoGrabacion: 1975,
  sello: "Sello Fama / Iempsa (LP-0012)",
  porQueImporta:
    "Este álbum define la transición estética de la cumbia peruana instrumental hacia la lírica testimonial del migrante andino en Lima. Víctor Casahuamán compone arreglos de primera guitarra que dialogan con el fraseo quejumbroso de Lorenzo Palacios 'Chacalón', consolidando un sonido proletario, crudo y directo que transformó la fonografía nacional para siempre.",
  portadaUrl: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=800",
  youtubeUrl: "https://www.youtube.com/results?search_query=grupo+celeste+el+gran+triunfo+1975",
  youtubeId: "dQw4w9WgXcQ", // Preview seguro
  spotifyUrl: "https://open.spotify.com/search/grupo%20celeste%20el%20gran%20triunfo",
  enlaceExpediente: {
    tipo: "vinilo",
    url: "/vinilos",
    label: "Inspeccionar Expediente en Vinilos →",
  },
};

export const ARCHIVO_HISTORICO_HALLAZGOS: HallazgoRadarItem[] = [
  {
    id: "hallazgo-2026-09",
    mes: "Septiembre",
    año: 2026,
    categoria: "Subgénero a Descubrir",
    titulo: "Cumbia Amazónica con Órgano & Moog: Juaneco y su Combo",
    subtitulo: "El sonido de la chicha selvática con reverberación psicodélica",
    artista: "Juaneco y su Combo (Dir. Juan Wong Paredes)",
    añoGrabacion: 1974,
    sello: "Infopesa (LP-8012)",
    porQueImporta:
      "Aislados en Pucallpa pero conectados con las innovaciones electrónicas mundiales, Juan Wong incorporó teclados Farfisa y sintetizadores Moog para simular cantos de aves amazónicas, creando una de las ramificaciones más singulares de la cumbia global.",
    portadaUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800",
    youtubeUrl: "https://www.youtube.com/results?search_query=juaneco+y+su+combo+mujer+hilandera",
    spotifyUrl: "https://open.spotify.com/search/juaneco%20y%20su%20combo",
    enlaceExpediente: {
      tipo: "genealogia",
      url: "/genealogia",
      label: "Ver Árbol Genealógico Amazónico →",
    },
  },
  {
    id: "hallazgo-2026-08",
    mes: "Agosto",
    año: 2026,
    categoria: "Voz Rescatada",
    titulo: "Claudio Morán: El Cantante Camaleónico de Sesión",
    subtitulo: "La voz de oro que grabó de incógnito en decenas de orquestas rivales",
    artista: "Claudio Morán (Voz de Sesión)",
    añoGrabacion: 1978,
    sello: "Varios Sellos (Infopesa / Odeón / Horóscopo)",
    porQueImporta:
      "Durante los años 70 y 80, Claudio Morán grabó como cantante principal para Los Destellos, Cuarteto Continental, Grupo Celeste y Los Titanes, a menudo sin recibir crédito tipográfico en la contraportada para evitar penalidades de exclusividad con las discográficas.",
    portadaUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800",
    youtubeUrl: "https://www.youtube.com/results?search_query=claudio+moran+cumbia+peruana",
    spotifyUrl: "https://open.spotify.com/search/claudio%20moran",
    enlaceExpediente: {
      tipo: "informe",
      url: "/informes",
      label: "Consultar Informe Pericial de Claudio Morán →",
    },
  },
  {
    id: "hallazgo-2026-07",
    mes: "Julio",
    año: 2026,
    categoria: "Agrupación Olvidada",
    titulo: "Manzanita y su Conjunto: Virtuosismo Criollo Eléctrico",
    subtitulo: "Punteos arpegiados de guitarra acústica llevados a la pastilla eléctrica",
    artista: "Manzanita (Juan Berardo Hernández Sánchez)",
    añoGrabacion: 1969,
    sello: "Virrey (VIR-045)",
    porQueImporta:
      "Formado en la escuela de la guitarra criolla limeña, Manzanita trasladó técnicas complejas de dedo pulgar y arpegios rápidos al punteo eléctrico de la cumbia instrumental, forjando el eslabón sonoro entre la música tradicional de la costa y el trópico.",
    portadaUrl: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&q=80&w=800",
    youtubeUrl: "https://www.youtube.com/results?search_query=manzanita+y+su+conjunto+arrebato",
    spotifyUrl: "https://open.spotify.com/search/manzanita%20y%20su%20conjunto",
    enlaceExpediente: {
      tipo: "informe",
      url: "/informes",
      label: "Ver Informe de Manzanita (INF-0026) →",
    },
  },
];
