import { HoneyId, POLLEN_REPORTS, PollenReport } from './pollen.data';

/**
 * Lotes consultables en "Rastrea tu lote".
 * Lotes piloto construidos a partir de los informes Meliflora SpA N° 416 (Ulmo) y N° 411 (Tineo).
 * TODO: reemplazar por los lotes reales (o una API) cuando se defina la codificación oficial de etiquetas.
 */
export interface HoneyLot {
  code: string;
  honey: HoneyId;
  report: PollenReport;
}

export const LOTS: readonly HoneyLot[] = [
  { code: 'RGK-UL-416', honey: 'ulmo', report: POLLEN_REPORTS.ulmo },
  { code: 'RGK-TI-411', honey: 'tineo', report: POLLEN_REPORTS.tineo },
];

/** Normaliza lo que escribe el usuario: mayúsculas, sin espacios, guiones opcionales. */
export function normalizeLotCode(raw: string): string {
  return raw.toUpperCase().replace(/[^A-Z0-9]/g, '');
}

export function findLot(raw: string): HoneyLot | undefined {
  const wanted = normalizeLotCode(raw);
  return wanted ? LOTS.find((lot) => normalizeLotCode(lot.code) === wanted) : undefined;
}
