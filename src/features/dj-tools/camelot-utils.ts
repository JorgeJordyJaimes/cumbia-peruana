import type { CamelotCode, CamelotNumber, CamelotLetter } from '@/types/domain'

export interface CamelotInfo {
  code: CamelotCode
  number: CamelotNumber
  letter: CamelotLetter
  standardKey: string
  mode: 'Menor' | 'Mayor'
  color: string
}

export const CAMELOT_WHEEL: Record<CamelotCode, { standardKey: string; mode: 'Menor' | 'Mayor'; color: string }> = {
  // Minor Keys (A)
  '1A': { standardKey: 'Abm', mode: 'Menor', color: '#06b6d4' },
  '2A': { standardKey: 'Ebm', mode: 'Menor', color: '#0ea5e9' },
  '3A': { standardKey: 'Bbm', mode: 'Menor', color: '#3b82f6' },
  '4A': { standardKey: 'Fm', mode: 'Menor', color: '#6366f1' },
  '5A': { standardKey: 'Cm', mode: 'Menor', color: '#8b5cf6' },
  '6A': { standardKey: 'Gm', mode: 'Menor', color: '#a855f7' },
  '7A': { standardKey: 'Dm', mode: 'Menor', color: '#d946ef' },
  '8A': { standardKey: 'Am', mode: 'Menor', color: '#ec4899' },
  '9A': { standardKey: 'Em', mode: 'Menor', color: '#f43f5e' },
  '10A': { standardKey: 'Bm', mode: 'Menor', color: '#ef4444' },
  '11A': { standardKey: 'F#m', mode: 'Menor', color: '#f97316' },
  '12A': { standardKey: 'Dbm', mode: 'Menor', color: '#eab308' },

  // Major Keys (B)
  '1B': { standardKey: 'B', mode: 'Mayor', color: '#14b8a6' },
  '2B': { standardKey: 'F#', mode: 'Mayor', color: '#10b981' },
  '3B': { standardKey: 'Db', mode: 'Mayor', color: '#22c55e' },
  '4B': { standardKey: 'Ab', mode: 'Mayor', color: '#84cc16' },
  '5B': { standardKey: 'Eb', mode: 'Mayor', color: '#a3e635' },
  '6B': { standardKey: 'Bb', mode: 'Mayor', color: '#facc15' },
  '7B': { standardKey: 'F', mode: 'Mayor', color: '#f59e0b' },
  '8B': { standardKey: 'C', mode: 'Mayor', color: '#f97316' },
  '9B': { standardKey: 'G', mode: 'Mayor', color: '#fb7185' },
  '10B': { standardKey: 'D', mode: 'Mayor', color: '#f43f5e' },
  '11B': { standardKey: 'A', mode: 'Mayor', color: '#e11d48' },
  '12B': { standardKey: 'E', mode: 'Mayor', color: '#ca8a04' },
}

export function parseCamelot(code: string): { number: CamelotNumber; letter: CamelotLetter } | null {
  const match = code.toUpperCase().match(/^([1-9]|1[0-2])([AB])$/)
  if (!match) return null
  return {
    number: parseInt(match[1], 10) as CamelotNumber,
    letter: match[2] as CamelotLetter,
  }
}

export interface HarmonicTransition {
  code: CamelotCode
  type: 'identical' | 'subdominant' | 'dominant' | 'relative'
  label: string
  description: string
}

export function getHarmonicTransitions(code: CamelotCode): HarmonicTransition[] {
  const parsed = parseCamelot(code)
  if (!parsed) return []

  const { number, letter } = parsed
  const oppositeLetter: CamelotLetter = letter === 'A' ? 'B' : 'A'

  const nextNum = (number === 12 ? 1 : number + 1) as CamelotNumber
  const prevNum = (number === 1 ? 12 : number - 1) as CamelotNumber

  return [
    {
      code: `${number}${letter}` as CamelotCode,
      type: 'identical',
      label: 'Misma Clave (Tono Exacto)',
      description: 'Mezcla perfecta y uniforme sin choque tonal.',
    },
    {
      code: `${nextNum}${letter}` as CamelotCode,
      type: 'dominant',
      label: 'Energía Ascendente (+1)',
      description: 'Eleva la intensidad armónica en la pista de baile.',
    },
    {
      code: `${prevNum}${letter}` as CamelotCode,
      type: 'subdominant',
      label: 'Energía Descendente (-1)',
      description: 'Suaviza y profundiza la atmósfera sonora.',
    },
    {
      code: `${number}${oppositeLetter}` as CamelotCode,
      type: 'relative',
      label: letter === 'A' ? 'Relativa Mayor' : 'Relativa Menor',
      description: 'Cambio de color y emoción manteniendo notas base.',
    },
  ]
}

export function isHarmonicallyCompatible(codeA: string, codeB: string): boolean {
  if (codeA === codeB) return true
  const transitions = getHarmonicTransitions(codeA as CamelotCode)
  return transitions.some((t) => t.code === codeB)
}
