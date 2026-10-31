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
          es_disco_split: boolean
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
          es_disco_split?: boolean
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
          es_disco_split?: boolean
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
        }
        Insert: {
          id_tema?: number
          titulo_tema: string
          duracion_segundos?: number | null
          letra?: string | null
          id_genero?: number | null
          bpm?: number | null
          camelot_code?: string | null
        }
        Update: {
          id_tema?: number
          titulo_tema?: string
          duracion_segundos?: number | null
          letra?: string | null
          id_genero?: number | null
          bpm?: number | null
          camelot_code?: string | null
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
          es_mosaico: boolean
          credito_galleta: string | null
        }
        Insert: {
          id_album_tema?: number
          id_album: number
          id_tema: number
          numero_pista?: number | null
          lado?: string | null
          es_mosaico?: boolean
          credito_galleta?: string | null
        }
        Update: {
          id_album_tema?: number
          id_album?: number
          id_tema?: number
          numero_pista?: number | null
          lado?: string | null
          es_mosaico?: boolean
          credito_galleta?: string | null
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
      mosaicos_temas: {
        Row: {
          id_mosaico_tema: number
          id_album_tema: number
          id_tema: number
          orden_segmento: number
          duracion_segmento_segundos: number | null
        }
        Insert: {
          id_mosaico_tema?: number
          id_album_tema: number
          id_tema: number
          orden_segmento: number
          duracion_segmento_segundos?: number | null
        }
        Update: {
          id_mosaico_tema?: number
          id_album_tema?: number
          id_tema?: number
          orden_segmento?: number
          duracion_segmento_segundos?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "mosaicos_temas_id_album_tema_fkey"
            columns: ["id_album_tema"]
            isOneToOne: false
            referencedRelation: "albumes_temas"
            referencedColumns: ["id_album_tema"]
          },
          {
            foreignKeyName: "mosaicos_temas_id_tema_fkey"
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
          credito_como: string | null
        }
        Insert: {
          id_tema: number
          id_compositor: number
          credito_como?: string | null
        }
        Update: {
          id_tema?: number
          id_compositor?: number
          credito_como?: string | null
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
      temas_generos: {
        Row: {
          id_tema: number
          id_genero: number
          es_principal: boolean
        }
        Insert: {
          id_tema: number
          id_genero: number
          es_principal?: boolean
        }
        Update: {
          id_tema?: number
          id_genero?: number
          es_principal?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "temas_generos_id_tema_fkey"
            columns: ["id_tema"]
            isOneToOne: false
            referencedRelation: "temas"
            referencedColumns: ["id_tema"]
          },
          {
            foreignKeyName: "temas_generos_id_genero_fkey"
            columns: ["id_genero"]
            isOneToOne: false
            referencedRelation: "generos"
            referencedColumns: ["id_genero"]
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
          credito_como: string | null
        }
        Insert: {
          id_tema_musicos?: number
          id_tema: number
          id_musico: number
          instrumento?: string | null
          id_rol: number
          credito_como?: string | null
        }
        Update: {
          id_tema_musicos?: number
          id_tema?: number
          id_musico?: number
          instrumento?: string | null
          id_rol?: number
          credito_como?: string | null
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
      informes_personas: {
        Row: {
          id_persona: number
          contenido_md: string
          sello_verificacion: string
          fuentes: Json
          estado: string
          publish_at: string | null
          updated_at: string | null
        }
        Insert: {
          id_persona: number
          contenido_md?: string
          sello_verificacion?: string
          fuentes?: Json
          estado?: string
          publish_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id_persona?: number
          contenido_md?: string
          sello_verificacion?: string
          fuentes?: Json
          estado?: string
          publish_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "informes_personas_id_persona_fkey"
            columns: ["id_persona"]
            isOneToOne: true
            referencedRelation: "personas"
            referencedColumns: ["id_persona"]
          }
        ]
      }
      grupo_historias: {
        Row: {
          id_grupo: number
          contenido_md: string
          fuentes: Json
          estado: string
          updated_at: string | null
        }
        Insert: {
          id_grupo: number
          contenido_md?: string
          fuentes?: Json
          estado?: string
          updated_at?: string | null
        }
        Update: {
          id_grupo?: number
          contenido_md?: string
          fuentes?: Json
          estado?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "grupo_historias_id_grupo_fkey"
            columns: ["id_grupo"]
            isOneToOne: true
            referencedRelation: "grupos"
            referencedColumns: ["id_grupo"]
          }
        ]
      }
      grupo_etapas: {
        Row: {
          id_etapa: number
          id_grupo: number
          orden: number
          fecha_inicio: string | null
          fecha_fin: string | null
          titulo: string
          id_director: number | null
          id_vocalista: number | null
          estilo: string | null
          texto_md: string
          created_at: string | null
        }
        Insert: {
          id_etapa?: number
          id_grupo: number
          orden?: number
          fecha_inicio?: string | null
          fecha_fin?: string | null
          titulo: string
          id_director?: number | null
          id_vocalista?: number | null
          estilo?: string | null
          texto_md?: string
          created_at?: string | null
        }
        Update: {
          id_etapa?: number
          id_grupo?: number
          orden?: number
          fecha_inicio?: string | null
          fecha_fin?: string | null
          titulo?: string
          id_director?: number | null
          id_vocalista?: number | null
          estilo?: string | null
          texto_md?: string
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "grupo_etapas_id_grupo_fkey"
            columns: ["id_grupo"]
            isOneToOne: false
            referencedRelation: "grupos"
            referencedColumns: ["id_grupo"]
          },
          {
            foreignKeyName: "grupo_etapas_id_director_fkey"
            columns: ["id_director"]
            isOneToOne: false
            referencedRelation: "personas"
            referencedColumns: ["id_persona"]
          },
          {
            foreignKeyName: "grupo_etapas_id_vocalista_fkey"
            columns: ["id_vocalista"]
            isOneToOne: false
            referencedRelation: "personas"
            referencedColumns: ["id_persona"]
          }
        ]
      }
      radar_hallazgos: {
        Row: {
          mes: string
          año: number
          nombre_mes: string
          categoria: string
          titulo: string
          subtitulo: string | null
          artista: string
          año_grabacion: number | null
          sello: string | null
          por_que_importa_md: string
          portada_url: string | null
          url_youtube: string | null
          url_spotify: string | null
          destino_tipo: string
          destino_id: number | null
          estado: string
          publish_at: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          mes: string
          año: number
          nombre_mes: string
          categoria: string
          titulo: string
          subtitulo?: string | null
          artista: string
          año_grabacion?: number | null
          sello?: string | null
          por_que_importa_md: string
          portada_url?: string | null
          url_youtube?: string | null
          url_spotify?: string | null
          destino_tipo?: string
          destino_id?: number | null
          estado?: string
          publish_at?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          mes?: string
          año?: number
          nombre_mes?: string
          categoria?: string
          titulo?: string
          subtitulo?: string | null
          artista?: string
          año_grabacion?: number | null
          sello?: string | null
          por_que_importa_md?: string
          portada_url?: string | null
          url_youtube?: string | null
          url_spotify?: string | null
          destino_tipo?: string
          destino_id?: number | null
          estado?: string
          publish_at?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      legajo_bloques: {
        Row: {
          clave: string
          titulo: string
          contenido_md: string
          orden: number
          updated_at: string | null
        }
        Insert: {
          clave: string
          titulo: string
          contenido_md?: string
          orden?: number
          updated_at?: string | null
        }
        Update: {
          clave?: string
          titulo?: string
          contenido_md?: string
          orden?: number
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_arbol_genealogico: {
        Args: {
          p_persona_id: number
        }
        Returns: Json
      }
      get_genealogia_versiones: {
        Args: {
          p_tema_id: number
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export interface ArbolGenealogicoResult {
  persona: {
    id_persona: number
    nombre: string
    apodo: string | null
    fecha_nacimiento: string | null
    lugar_nacimiento: string | null
    biografia: string | null
    url_foto: string | null
  } | null
  agrupaciones: Array<{
    id_grupo: number
    nombre_grupo: string
    rol: string
    region: string | null
    fecha_formacion: string | null
    desde: string | null
    hasta: string | null
    url_foto: string | null
  }>
  grabaciones_sesion: Array<{
    id_tema: number
    titulo_tema: string
    instrumento: string | null
    rol: string
    credito_como: string | null
    grupos: string[]
    prensajes: Array<{
      id_album: number
      nombre_album: string | null
      año_publicacion: number | null
      numero_catalogo: string | null
      sello: string | null
      lado: string | null
      pista: number | null
    }>
  }>
  composiciones: Array<{
    id_tema: number
    titulo_tema: string
    credito_como: string | null
    duracion_segundos: number | null
    bpm: number | null
    camelot_code: string | null
    generos: string[]
    interpretes: string[]
    total_versiones: number
  }>
}

export interface NodoGenealogiaVersion {
  id_tema: number
  id_tema_original: number | null
  nivel: number
  es_original_raiz: boolean
  es_tema_consultado: boolean
  titulo_tema: string
  duracion_segundos: number | null
  bpm: number | null
  camelot_code: string | null
  grupos: Array<{
    id_grupo: number
    nombre_grupo: string
    rol_participacion: string | null
  }>
  compositores: Array<{
    id_persona: number
    nombre: string
    apodo: string | null
    credito_como: string | null
  }>
  prensajes: Array<{
    id_album: number
    nombre_album: string | null
    año_publicacion: number | null
    numero_catalogo: string | null
    sello: string | null
    lado: string | null
    pista: number | null
  }>
}

export interface GenealogiaVersionesResult {
  tema_consultado_id: number
  tema_raiz_id: number
  total_nodos: number
  total_versiones: number
  nodos: NodoGenealogiaVersion[]
}

