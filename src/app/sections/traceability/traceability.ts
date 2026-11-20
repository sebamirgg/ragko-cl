import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';

import { I18nService } from '../../core/i18n/i18n.service';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

type PartId = 'fructose' | 'glucose' | 'water' | 'sugars' | 'pollen' | 'bioactive';
type CellId = 'core' | PartId;

interface CombCell {
  id: CellId;
  /** Posición de la celda dentro del panal, en % del contenedor. */
  left: number;
  top: number;
  /** Proporción aproximada (para la barra del detalle). null = centro del panal. */
  share: number | null;
  icon: string;
}

/**
 * Panal de 7 celdas "flat-top": una al centro y seis alrededor.
 * Caja total = 2,5 anchos × 3 altos de celda, por eso cada celda mide 40% × 33,3%.
 * Orden horario desde arriba.
 */
const CELLS: readonly CombCell[] = [
  { id: 'fructose', left: 30, top: 0, share: 38, icon: 'M12 8c-1.6-2-5.2-1.8-6.1 1.2-1 3.2 1.2 8.8 4.1 10.6.9.5 1.4.3 2 0 .6.3 1.1.5 2 0 2.9-1.8 5.1-7.4 4.1-10.6C17.2 6.2 13.6 6 12 8zM12 8c0-2 1-3.6 3-4.5' },
  { id: 'glucose', left: 60, top: 100 / 6, share: 31, icon: 'M13 2.5L4.5 13.5H11l-1 8 8.5-11H12z' },
  { id: 'water', left: 60, top: 50, share: 17, icon: 'M12 3s-6 6.6-6 11a6 6 0 0012 0c0-4.4-6-11-6-11zM9.5 14.5a2.5 2.5 0 002.5 2.5' },
  { id: 'sugars', left: 30, top: 200 / 3, share: 10, icon: 'M4 13.5l4-2.3 4 2.3v4.6l-4 2.3-4-2.3zM12 13.5l4-2.3 4 2.3v4.6l-4 2.3-4-2.3zM8 6.6l4-2.3 4 2.3v4.6l-4 2.3-4-2.3z' },
  { id: 'pollen', left: 0, top: 50, share: 0.5, icon: 'M12 9.5a2.5 2.5 0 110 5 2.5 2.5 0 010-5zM12 2.5v4M12 17.5v4M2.5 12h4M17.5 12h4M5.3 5.3l2.8 2.8M15.9 15.9l2.8 2.8M18.7 5.3l-2.8 2.8M8.1 15.9l-2.8 2.8' },
  { id: 'bioactive', left: 0, top: 100 / 6, share: 3, icon: 'M12 3l2.2 6.8L21 12l-6.8 2.2L12 21l-2.2-6.8L3 12l6.8-2.2z' },
  { id: 'core', left: 30, top: 100 / 3, share: null, icon: 'M12 2.5l8.2 4.75v9.5L12 21.5l-8.2-4.75v-9.5z' },
];

@Component({
  selector: 'app-traceability',
  imports: [SectionHeadingComponent, RevealOnScrollDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './traceability.html',
  styleUrl: './traceability.css',
})
export class TraceabilityComponent {
  private readonly i18n = inject(I18nService);
  protected readonly t = this.i18n.t;

  protected readonly cells = CELLS;
  protected readonly selected = signal<CellId>('core');

  /** Textos traducidos de cada celda. */
  protected readonly texts = computed(() => {
    const trace = this.t().trace;
    return { core: trace.core, ...trace.parts } as Record<CellId, (typeof trace)['core']>;
  });

  protected readonly detail = computed(() => {
    const id = this.selected();
    const cell = CELLS.find((c) => c.id === id)!;
    const index = CELLS.filter((c) => c.id !== 'core').indexOf(cell);
    return { ...cell, ...this.texts()[id], number: index >= 0 ? index + 1 : null };
  });

  protected select(id: CellId): void {
    this.selected.set(id);
  }
}
