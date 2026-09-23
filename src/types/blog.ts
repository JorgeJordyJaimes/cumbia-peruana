export interface Articulo {
  id: string;
  titulo: string;
  slug: string;
  resumen: string | null;
  contenido: string;
  imagen_portada_url: string | null;
  autor_nombre: string;
  categoria: string;
  tiempo_lectura: string;
  publicado: boolean;
  fecha_publicacion: string;
  created_at: string;
  updated_at: string;
}

export type ArticuloInsert = Omit<Articulo, "id" | "created_at" | "updated_at"> & {
  id?: string;
};

export type ArticuloUpdate = Partial<ArticuloInsert>;

export interface ConfiguracionHome {
  id: number;
  cintillo_texto: string;
  cintillo_activo: boolean;
  hero_insignia: string;
  hero_titulo: string;
  hero_subtitulo: string;
  hero_boton_texto: string;
  hero_boton_url: string;
  albumes_destacados_ids: number[];
  seccion_blog_activa: boolean;
  updated_at: string;
}
