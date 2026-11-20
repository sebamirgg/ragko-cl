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
    <div class="space-y-4" [class.text-center]="align() === 'center'" [class.mx-auto]="align() === 'center'">
      <span class="block text-xs font-bold uppercase tracking-[0.24em] text-terracotta">{{ kicker() }}</span>
      <h2 [id]="titleId()" class="font-serif text-3xl sm:text-5xl font-semibold text-bone leading-tight">
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
        <p class="text-sm sm:text-base text-muted leading-relaxed">{{ subtitle() }}</p>
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
