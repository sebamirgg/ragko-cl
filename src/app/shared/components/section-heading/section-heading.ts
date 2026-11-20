import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Encabezado estándar de sección: antetítulo, título serif, ornamento hexagonal opcional y bajada.
 * El id del título permite enlazarlo con aria-labelledby desde la <section>.
 */
@Component({
  selector: 'app-section-heading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <div class="space-y-5" [class.text-center]="align() === 'center'" [class.mx-auto]="align() === 'center'">
      <span class="kicker-pill">{{ kicker() }}</span>
      <h2 [id]="titleId()" class="display-title">
        {{ title() }}
      </h2>
      @if (ornament()) {
        <div class="hex-ornament pt-1" [class.justify-center]="align() === 'center'" aria-hidden="true">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
            <path d="M12 2l8.66 5v10L12 22l-8.66-5V7z" />
          </svg>
        </div>
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
  readonly ornament = input(false);
}
