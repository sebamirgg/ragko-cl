import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';

import { I18nService } from '../../core/i18n/i18n.service';
import { ContactService } from '../../core/services/contact.service';
import { HoneyLot, LOTS, findLot } from '../../data/lots.data';
import { PollenShare, SPECIES, SpeciesId, pollenShares } from '../../data/pollen.data';
import { WhatsappIconComponent } from '../../shared/components/icons/whatsapp-icon';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

/* ---------- Geometría del panal (100 celdas hexagonales, 10 × 10, filas desfasadas) ---------- */
const COLS = 10;
const ROWS = 10;
const R = 10; // radio de la celda (vértice superior)
const W = Math.sqrt(3) * R; // ancho de la celda
const PAD = 2;
const CELL_R = R - 1.1; // celda algo más chica que el paso → separación visible entre celdas

/** Hexágono "pointy-top" centrado en (0,0). */
const HEX_POINTS = [-90, -30, 30, 90, 150, 210]
  .map((deg) => {
    const rad = (deg * Math.PI) / 180;
    return `${(CELL_R * Math.cos(rad)).toFixed(2)},${(CELL_R * Math.sin(rad)).toFixed(2)}`;
  })
  .join(' ');

const CENTERS = Array.from({ length: COLS * ROWS }, (_, i) => {
  const row = Math.floor(i / COLS);
  const col = i % COLS;
  return {
    x: PAD + W / 2 + col * W + (row % 2 ? W / 2 : 0),
    y: PAD + R + row * 1.5 * R,
  };
});

const VIEW_BOX = `0 0 ${(PAD * 2 + COLS * W + W / 2).toFixed(2)} ${(PAD * 2 + 2 * R + (ROWS - 1) * 1.5 * R).toFixed(2)}`;

interface HexCell {
  x: number;
  y: number;
  species: SpeciesId;
  color: string;
}

type StepKey = 'bloom' | 'apiary' | 'harvest' | 'extraction' | 'lab' | 'bottling';

const STEP_ICONS: Record<StepKey, string> = {
  bloom: 'M12 7.5a2.5 2.5 0 110 5 2.5 2.5 0 010-5zM12 2.5v3M12 14.5v7M6.5 6.5l2 2M17.5 6.5l-2 2M4.5 12h3M16.5 12h3M9 18c-2 0-3.5-1-4-3 2 0 3.5 1 4 3zM15 18c2 0 3.5-1 4-3-2 0-3.5 1-4 3z',
  apiary: 'M12 21s-6-5.33-6-10a6 6 0 1112 0c0 4.67-6 10-6 10zM12 13a2 2 0 100-4 2 2 0 000 4z',
  harvest: 'M4 5h16v14H4zM8 9l2-1.2 2 1.2v2.4l-2 1.2-2-1.2zM12 11.4l2-1.2 2 1.2v2.4l-2 1.2-2-1.2z',
  extraction: 'M12 3s-5.5 6.2-5.5 10.2a5.5 5.5 0 0011 0C17.5 9.2 12 3 12 3zM9.5 14a2.5 2.5 0 002.5 2.5',
  lab: 'M9 3h6M10 3v6l-5 9a2 2 0 001.8 3h10.4a2 2 0 001.8-3l-5-9V3M7.5 15h9',
  bottling: 'M9 3h6v3H9zM7.5 6h9l1 3v10a2 2 0 01-2 2h-7a2 2 0 01-2-2V9zM9.5 13h5',
};

/** Reparte 100 celdas según los porcentajes (método del mayor resto, siempre suma 100). */
function allocateCells(shares: PollenShare[], total = COLS * ROWS): { species: SpeciesId; cells: number }[] {
  const sum = shares.reduce((s, x) => s + x.grains, 0);
  const raw = shares.map((s) => ({ species: s.species, exact: (s.grains / sum) * total }));
  const result = raw.map((r) => ({ species: r.species, cells: Math.floor(r.exact), rest: r.exact % 1 }));
  let missing = total - result.reduce((s, r) => s + r.cells, 0);
  [...result]
    .sort((a, b) => b.rest - a.rest)
    .forEach((r) => {
      if (missing > 0) {
        r.cells++;
        missing--;
      }
    });
  return result.map(({ species, cells }) => ({ species, cells }));
}

@Component({
  selector: 'app-traceability',
  imports: [SectionHeadingComponent, RevealOnScrollDirective, WhatsappIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './traceability.html',
  styleUrl: './traceability.css',
})
export class TraceabilityComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly contact = inject(ContactService);
  protected readonly t = this.i18n.t;

  protected readonly lots = LOTS;
  protected readonly species = SPECIES;
  protected readonly viewBox = VIEW_BOX;
  protected readonly hexPoints = HEX_POINTS;

  protected readonly query = signal(LOTS[0].code);
  protected readonly lot = signal<HoneyLot>(LOTS[0]);
  protected readonly notFound = signal<string | null>(null);
  /** Especie resaltada al pasar el cursor por el panal o la tabla. */
  protected readonly highlighted = signal<SpeciesId | null>(null);

  protected readonly shares = computed(() => pollenShares(this.lot().report));
  protected readonly primary = computed(() => this.shares()[0]);
  protected readonly honeyName = computed(() => this.t().trace.lots[this.lot().honey].honey);

  protected readonly cells = computed<HexCell[]>(() => {
    const cells: HexCell[] = [];
    for (const { species, cells: count } of allocateCells(this.shares())) {
      for (let i = 0; i < count; i++) {
        const center = CENTERS[cells.length];
        cells.push({ ...center, species, color: SPECIES[species].color });
      }
    }
    return cells;
  });

  protected readonly highlightedShare = computed(() => {
    const id = this.highlighted();
    return id ? this.shares().find((s) => s.species === id) ?? null : null;
  });

  protected readonly steps = computed(() => {
    const t = this.t().trace;
    const lot = this.lot();
    const lotText = t.lots[lot.honey];
    const items: { key: StepKey; detail: string; note?: string }[] = [
      { key: 'bloom', detail: lotText.bloom },
      { key: 'apiary', detail: t.apiaryDetail, note: t.apiaryNote },
      { key: 'harvest', detail: lotText.harvest },
      { key: 'extraction', detail: t.extractionDetail },
      {
        key: 'lab',
        detail: this.i18n.format(t.labDetail, {
          report: lot.report.report,
          sample: lot.report.sample,
          grains: this.i18n.integer(lot.report.totalGrains),
        }),
      },
      { key: 'bottling', detail: t.bottlingDetail },
    ];
    return items.map((item) => ({ ...item, title: t.steps[item.key], icon: STEP_ICONS[item.key] }));
  });

  protected onInput(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
  }

  protected search(event?: Event): void {
    event?.preventDefault();
    const found = findLot(this.query());
    if (found) {
      this.lot.set(found);
      this.query.set(found.code);
      this.notFound.set(null);
      this.highlighted.set(null);
    } else {
      this.notFound.set(this.query().trim());
    }
  }

  protected tryLot(code: string): void {
    this.query.set(code);
    this.search();
  }

  protected toggleHighlight(id: SpeciesId): void {
    this.highlighted.update((current) => (current === id ? null : id));
  }
}
