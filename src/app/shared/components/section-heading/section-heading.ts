import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { HexDividerComponent } from '../hex-divider/hex-divider';

/**
 * Encabezado estándar de sección: antetítulo, título serif, ornamento hexagonal opcional y bajada.
 * El id del título permite enlazarlo con aria-labelledby desde la <section>.
 */
@Component({
  selector: 'app-section-heading',
  imports: [HexDividerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <div class="space-y-5" [class.text-center]="align() === 'center'" [class.mx-auto]="align() === 'center'">
      <span class="kicker-pill">{{ kicker() }}</span>
      <h2 [id]="titleId()" class="display-title">
        {{ title() }}
      </h2>
      @if (ornament()) {
        <app-hex-divider [align]="align()" />
      }
      @if (subtitle()) {
        <p class="lead">{{ subtitle() }}</p>
      }
    </div>
  `,
})
export class SectionHeadingComponent {
  readonly kicker = input.required<string>();
  readonly title = input.required<string>();
  readonly subtitle = input<string>();
  readonly titleId = input<string>();
  readonly align = input<'center' | 'left'>('center');
  readonly ornament = input(true);
}
