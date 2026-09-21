export type CamelotNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
export type CamelotLetter = 'A' | 'B'
export type CamelotCode = `${CamelotNumber}${CamelotLetter}`

export type MusicalScale = 'Major' | 'Minor'

export interface HarmonicKey {
  camelot: CamelotCode
  standardKey: string
  scale: MusicalScale
}

export interface TemaDJ {
  id_tema: number
  titulo_tema: string
  grupo_principal?: string
  duracion_segundos: number | null
  bpm: number | null
  camelot_code: CamelotCode | null
  musical_key: string | null
  genero?: string
}

export interface BpmRangeFilter {
  minBpm?: number
  maxBpm?: number
}

export interface CamelotCompatibility {
  targetKey: CamelotCode
  compatibleKeys: CamelotCode[]
}
