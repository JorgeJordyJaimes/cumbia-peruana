export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      personas: {
        Row: {
          id_persona: number
          nombre: string
          apodo: string | null
          fecha_nacimiento: string | null
          lugar_nacimiento: string | null
          biografia: string | null
          url_foto: string | null
        }
        Insert: {
          id_persona?: number
          nombre: string
          apodo?: string | null
          fecha_nacimiento?: string | null
          lugar_nacimiento?: string | null
          biografia?: string | null
          url_foto?: string | null
        }
        Update: {
          id_persona?: number
          nombre?: string
          apodo?: string | null
          fecha_nacimiento?: string | null
          lugar_nacimiento?: string | null
          biografia?: string | null
          url_foto?: string | null
        }
        Relationships: []
      }
      grupos: {
        Row: {
          id_grupo: number
          nombre_grupo: string
          id_director: number | null
          region: string | null
          fecha_formacion: string | null
          url_foto: string | null
        }
        Insert: {
          id_grupo?: number
          nombre_grupo: string
          id_director?: number | null
          region?: string | null
          fecha_formacion?: string | null
          url_foto?: string | null
        }
        Update: {
          id_grupo?: number
          nombre_grupo?: string
          id_director?: number | null
          region?: string | null
          fecha_formacion?: string | null
          url_foto?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "grupos_id_director_fkey"
            columns: ["id_director"]
            isOneToOne: false
            referencedRelation: "personas"
            referencedColumns: ["id_persona"]
          }
        ]
      }
      sellos_discograficos: {
        Row: {
          id_sello: number
          nombre_sello: string
          pais: string | null
          url_logo: string | null
        }
        Insert: {
          id_sello?: number
          nombre_sello: string
          pais?: string | null
          url_logo?: string | null
        }
        Update: {
          id_sello?: number
          nombre_sello?: string
          pais?: string | null
          url_logo?: string | null
        }
        Relationships: []
      }
      generos: {
        Row: {
          id_genero: number
          nombre_genero: string
        }
        Insert: {
          id_genero?: number
          nombre_genero: string
        }
        Update: {
          id_genero?: number
          nombre_genero?: string
        }
        Relationships: []
      }
      tipos_album: {
        Row: {
          id_tipo_album: number
          nombre_tipo: string
        }
        Insert: {
          id_tipo_album?: number
          nombre_tipo: string
        }
        Update: {
          id_tipo_album?: number
          nombre_tipo?: string
        }
        Relationships: []
      }
      roles: {
        Row: {
          id_rol: number
          nombre_rol: string
        }
        Insert: {
          id_rol?: number
          nombre_rol: string
        }
        Update: {
          id_rol?: number
          nombre_rol?: string
        }
        Relationships: []
      }
      albumes: {
        Row: {
          id_album: number
          id_grupo: number | null
          id_sello: number | null
          numero_catalogo: string | null
          año_publicacion: number | null
          nombre_album: string | null
          id_tipo_album: number
          es_recopilatorio: boolean
          incluido_en_lp: boolean
          extraido_de_lp: boolean
          solo_en_45: boolean
          lados_en_lp: "Lado A" | "Lado B" | "Ambos" | null
          id_lp_relacionado: number | null
          es_reedicion: boolean
          id_album_original: number | null
          comentario: string | null
          url_portada: string | null
          url_contraportada: string | null
          url_etiqueta: string | null
        }
        Insert: {
          id_album?: number
          id_grupo?: number | null
          id_sello?: number | null
          numero_catalogo?: string | null
          año_publicacion?: number | null
          nombre_album?: string | null
          id_tipo_album: number
          es_recopilatorio?: boolean
          incluido_en_lp?: boolean
          extraido_de_lp?: boolean
          solo_en_45?: boolean
          lados_en_lp?: "Lado A" | "Lado B" | "Ambos" | null
          id_lp_relacionado?: number | null
          es_reedicion?: boolean
          id_album_original?: number | null
          comentario?: string | null
          url_portada?: string | null
          url_contraportada?: string | null
          url_etiqueta?: string | null
        }
        Update: {
          id_album?: number
          id_grupo?: number | null
          id_sello?: number | null
          numero_catalogo?: string | null
          año_publicacion?: number | null
          nombre_album?: string | null
          id_tipo_album?: number
          es_recopilatorio?: boolean
          incluido_en_lp?: boolean
          extraido_de_lp?: boolean
          solo_en_45?: boolean
          lados_en_lp?: "Lado A" | "Lado B" | "Ambos" | null
          id_lp_relacionado?: number | null
          es_reedicion?: boolean
          id_album_original?: number | null
          comentario?: string | null
          url_portada?: string | null
          url_contraportada?: string | null
          url_etiqueta?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "albumes_id_grupo_fkey"
            columns: ["id_grupo"]
            isOneToOne: false
            referencedRelation: "grupos"
            referencedColumns: ["id_grupo"]
          },
          {
            foreignKeyName: "albumes_id_sello_fkey"
            columns: ["id_sello"]
            isOneToOne: false
            referencedRelation: "sellos_discograficos"
            referencedColumns: ["id_sello"]
          },
          {
            foreignKeyName: "albumes_id_tipo_album_fkey"
            columns: ["id_tipo_album"]
            isOneToOne: false
            referencedRelation: "tipos_album"
            referencedColumns: ["id_tipo_album"]
          }
        ]
      }
      temas: {
        Row: {
          id_tema: number
          titulo_tema: string
          duracion_segundos: number | null
          letra: string | null
          id_genero: number | null
          bpm: number | null
          camelot_code: string | null
          musical_key: string | null
        }
        Insert: {
          id_tema?: number
          titulo_tema: string
          duracion_segundos?: number | null
          letra?: string | null
          id_genero?: number | null
          bpm?: number | null
          camelot_code?: string | null
          musical_key?: string | null
        }
        Update: {
          id_tema?: number
          titulo_tema?: string
          duracion_segundos?: number | null
          letra?: string | null
          id_genero?: number | null
          bpm?: number | null
          camelot_code?: string | null
          musical_key?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "temas_id_genero_fkey"
            columns: ["id_genero"]
            isOneToOne: false
            referencedRelation: "generos"
            referencedColumns: ["id_genero"]
          }
        ]
      }
      albumes_temas: {
        Row: {
          id_album_tema: number
          id_album: number
          id_tema: number
          numero_pista: number | null
          lado: string | null
        }
        Insert: {
          id_album_tema?: number
          id_album: number
          id_tema: number
          numero_pista?: number | null
          lado?: string | null
        }
        Update: {
          id_album_tema?: number
          id_album?: number
          id_tema?: number
          numero_pista?: number | null
          lado?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "albumes_temas_id_album_fkey"
            columns: ["id_album"]
            isOneToOne: false
            referencedRelation: "albumes"
            referencedColumns: ["id_album"]
          },
          {
            foreignKeyName: "albumes_temas_id_tema_fkey"
            columns: ["id_tema"]
            isOneToOne: false
            referencedRelation: "temas"
            referencedColumns: ["id_tema"]
          }
        ]
      }
      temas_compositores: {
        Row: {
          id_tema: number
          id_compositor: number
        }
        Insert: {
          id_tema: number
          id_compositor: number
        }
        Update: {
          id_tema?: number
          id_compositor?: number
        }
        Relationships: [
          {
            foreignKeyName: "temas_compositores_id_tema_fkey"
            columns: ["id_tema"]
            isOneToOne: false
            referencedRelation: "temas"
            referencedColumns: ["id_tema"]
          },
          {
            foreignKeyName: "temas_compositores_id_compositor_fkey"
            columns: ["id_compositor"]
            isOneToOne: false
            referencedRelation: "personas"
            referencedColumns: ["id_persona"]
          }
        ]
      }
      temas_grupos: {
        Row: {
          id_tema: number
          id_grupo: number
          rol_participacion: string
        }
        Insert: {
          id_tema: number
          id_grupo: number
          rol_participacion?: string
        }
        Update: {
          id_tema?: number
          id_grupo?: number
          rol_participacion?: string
        }
        Relationships: [
          {
            foreignKeyName: "temas_grupos_id_tema_fkey"
            columns: ["id_tema"]
            isOneToOne: false
            referencedRelation: "temas"
            referencedColumns: ["id_tema"]
          },
          {
            foreignKeyName: "temas_grupos_id_grupo_fkey"
            columns: ["id_grupo"]
            isOneToOne: false
            referencedRelation: "grupos"
            referencedColumns: ["id_grupo"]
          }
        ]
      }
      grupos_musicos: {
        Row: {
          id_grupo_musico: number
          id_grupo: number
          id_musico: number
          desde: string | null
          hasta: string | null
        }
        Insert: {
          id_grupo_musico?: number
          id_grupo: number
          id_musico: number
          desde?: string | null
          hasta?: string | null
        }
        Update: {
          id_grupo_musico?: number
          id_grupo?: number
          id_musico?: number
          desde?: string | null
          hasta?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "grupos_musicos_id_grupo_fkey"
            columns: ["id_grupo"]
            isOneToOne: false
            referencedRelation: "grupos"
            referencedColumns: ["id_grupo"]
          },
          {
            foreignKeyName: "grupos_musicos_id_musico_fkey"
            columns: ["id_musico"]
            isOneToOne: false
            referencedRelation: "personas"
            referencedColumns: ["id_persona"]
          }
        ]
      }
      tema_musicos: {
        Row: {
          id_tema_musicos: number
          id_tema: number
          id_musico: number
          instrumento: string | null
          id_rol: number
        }
        Insert: {
          id_tema_musicos?: number
          id_tema: number
          id_musico: number
          instrumento?: string | null
          id_rol: number
        }
        Update: {
          id_tema_musicos?: number
          id_tema?: number
          id_musico?: number
          instrumento?: string | null
          id_rol?: number
        }
        Relationships: [
          {
            foreignKeyName: "tema_musicos_id_tema_fkey"
            columns: ["id_tema"]
            isOneToOne: false
            referencedRelation: "temas"
            referencedColumns: ["id_tema"]
          },
          {
            foreignKeyName: "tema_musicos_id_musico_fkey"
            columns: ["id_musico"]
            isOneToOne: false
            referencedRelation: "personas"
            referencedColumns: ["id_persona"]
          },
          {
            foreignKeyName: "tema_musicos_id_rol_fkey"
            columns: ["id_rol"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id_rol"]
          }
        ]
      }
      versiones: {
        Row: {
          id_version: number
          id_tema: number
          id_tema_original: number
        }
        Insert: {
          id_version?: number
          id_tema: number
          id_tema_original: number
        }
        Update: {
          id_version?: number
          id_tema?: number
          id_tema_original?: number
        }
        Relationships: [
          {
            foreignKeyName: "versiones_id_tema_fkey"
            columns: ["id_tema"]
            isOneToOne: false
            referencedRelation: "temas"
            referencedColumns: ["id_tema"]
          },
          {
            foreignKeyName: "versiones_id_tema_original_fkey"
            columns: ["id_tema_original"]
            isOneToOne: false
            referencedRelation: "temas"
            referencedColumns: ["id_tema"]
          }
        ]
      }
      articulos: {
        Row: {
          id: string
          titulo: string
          slug: string
          resumen: string | null
          contenido: string
          imagen_portada_url: string | null
          autor_nombre: string
          categoria: string
          tiempo_lectura: string
          publicado: boolean
          fecha_publicacion: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          titulo: string
          slug: string
          resumen?: string | null
          contenido: string
          imagen_portada_url?: string | null
          autor_nombre?: string
          categoria?: string
          tiempo_lectura?: string
          publicado?: boolean
          fecha_publicacion?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          titulo?: string
          slug?: string
          resumen?: string | null
          contenido?: string
          imagen_portada_url?: string | null
          autor_nombre?: string
          categoria?: string
          tiempo_lectura?: string
          publicado?: boolean
          fecha_publicacion?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      configuracion_home: {
        Row: {
          id: number
          cintillo_texto: string
          cintillo_activo: boolean
          hero_insignia: string
          hero_titulo: string
          hero_subtitulo: string
          hero_boton_texto: string
          hero_boton_url: string
          albumes_destacados_ids: number[]
          seccion_blog_activa: boolean
          updated_at: string
        }
        Insert: {
          id?: number
          cintillo_texto?: string
          cintillo_activo?: boolean
          hero_insignia?: string
          hero_titulo?: string
          hero_subtitulo?: string
          hero_boton_texto?: string
          hero_boton_url?: string
          albumes_destacados_ids?: number[]
          seccion_blog_activa?: boolean
          updated_at?: string
        }
        Update: {
          id?: number
          cintillo_texto?: string
          cintillo_activo?: boolean
          hero_insignia?: string
          hero_titulo?: string
          hero_subtitulo?: string
          hero_boton_texto?: string
          hero_boton_url?: string
          albumes_destacados_ids?: number[]
          seccion_blog_activa?: boolean
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
