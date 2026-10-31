import type { ArbolGenealogicoResult } from "@/types/database";

export interface PersonaResumen {
  id_persona: number;
  nombre: string;
  apodo: string | null;
  fecha_nacimiento: string | null;
  lugar_nacimiento: string | null;
  biografia: string | null;
  url_foto: string | null;
  agrupaciones_count?: number;
  temas_count?: number;
}

export type FuenteVerificacion = "PRIMARIA" | "SECUNDARIA" | "SIN_VERIFICAR";

export interface InformePericialData {
  expedienteCodigo: string;
  arbol: ArbolGenealogicoResult;
  fuenteVerificacion: FuenteVerificacion;
  fuenteDetalle: string;
}
