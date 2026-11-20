import { Translation } from '../core/i18n/translations/es';

export type SpeciesId = keyof Translation['pollen']['names'];
export type HoneyId = 'ulmo' | 'tineo';

export interface Species {
  scientific: string;
  /**
   * Color fijo por especie (el color sigue a la entidad en todos los gráficos).
   * Paleta categórica validada para la tarjeta clara de trazabilidad (#FFFBF2): banda de luminosidad,
   * croma y separación para daltonismo en el orden en que aparece en cada lote.
   * Ulmo (amarillo) y Capachito (rosa) quedan bajo 3:1 de contraste con el fondo, por eso el gráfico
   * siempre va acompañado de la tabla con los valores (regla de alivio).
   */
  color: string;
}

export const SPECIES: Record<SpeciesId, Species> = {
  eucryphia: { scientific: 'Eucryphia cordifolia', color: '#eda100' },
  weinmannia: { scientific: 'Weinmannia trichosperma', color: '#eb6834' },
  myrtaceae: { scientific: 'Myrtaceae spp.', color: '#2a78d6' },
  tepualia: { scientific: 'Tepualia stipularis', color: '#1baf7a' },
  aristotelia: { scientific: 'Aristotelia chilensis', color: '#6250d6' },
  caldcluvia: { scientific: 'Caldcluvia paniculata', color: '#008300' },
  calceolaria: { scientific: 'Calceolaria thyrsiflora', color: '#e87ba4' },
  other: { scientific: '—', color: '#b3a691' },
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
