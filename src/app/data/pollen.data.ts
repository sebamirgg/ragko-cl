import { Translation } from '../core/i18n/translations/es';

export type SpeciesId = keyof Translation['pollen']['names'];
export type HoneyId = 'ulmo' | 'tineo';

export interface Species {
  scientific: string;
  /**
   * Color fijo por especie (el color sigue a la entidad en todos los gráficos).
   * Paleta categórica validada para fondo oscuro (#14171A): banda de luminosidad,
   * croma, separación para daltonismo y contraste ≥ 3:1 en el orden en que aparece en cada lote.
   */
  color: string;
}

export const SPECIES: Record<SpeciesId, Species> = {
  eucryphia: { scientific: 'Eucryphia cordifolia', color: '#c98500' },
  weinmannia: { scientific: 'Weinmannia trichosperma', color: '#d95926' },
  myrtaceae: { scientific: 'Myrtaceae spp.', color: '#3987e5' },
  tepualia: { scientific: 'Tepualia stipularis', color: '#199e70' },
  aristotelia: { scientific: 'Aristotelia chilensis', color: '#9085e9' },
  caldcluvia: { scientific: 'Caldcluvia paniculata', color: '#0ca30c' },
  calceolaria: { scientific: 'Calceolaria thyrsiflora', color: '#d55181' },
  other: { scientific: '—', color: '#5b616b' },
};

export interface PollenCount {
  species: SpeciesId;
  grains: number;
}

export interface PollenReport {
  honey: HoneyId;
  /** N° de informe Meliflora SpA. */
  report: number;
  sample: string;
  totalGrains: number;
  /** Especies identificadas, de mayor a menor. El resto se agrupa como "otros". */
  counts: PollenCount[];
}

export const POLLEN_REPORTS: Record<HoneyId, PollenReport> = {
  ulmo: {
    honey: 'ulmo',
    report: 416,
    sample: 'RP004',
    totalGrains: 652,
    counts: [
      { species: 'eucryphia', grains: 528 },
      { species: 'tepualia', grains: 32 },
      { species: 'aristotelia', grains: 26 },
      { species: 'weinmannia', grains: 15 },
      { species: 'myrtaceae', grains: 12 },
    ],
  },
  tineo: {
    honey: 'tineo',
    report: 411,
    sample: 'RP003',
    totalGrains: 667,
    counts: [
      { species: 'weinmannia', grains: 464 },
      { species: 'myrtaceae', grains: 50 },
      { species: 'caldcluvia', grains: 42 },
      { species: 'calceolaria', grains: 34 },
      { species: 'eucryphia', grains: 7 },
    ],
  },
};

export interface PollenShare extends PollenCount {
  /** Porcentaje sobre el total de granos contados (1 decimal, como en el informe). */
  percentage: number;
  isPrimary: boolean;
}

/** Composición completa del informe, incluida la fracción "otros pólenes". */
export function pollenShares(report: PollenReport, includeOther = true): PollenShare[] {
  const round1 = (n: number) => Math.round(n * 10) / 10;
  const shares: PollenShare[] = report.counts.map((c, i) => ({
    ...c,
    percentage: round1((c.grains / report.totalGrains) * 100),
    isPrimary: i === 0,
  }));
  const counted = report.counts.reduce((sum, c) => sum + c.grains, 0);
  const other = report.totalGrains - counted;
  if (includeOther && other > 0) {
    shares.push({
      species: 'other',
      grains: other,
      percentage: round1((other / report.totalGrains) * 100),
      isPrimary: false,
    });
  }
  return shares;
}
