import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Separador tipo panal bajo los títulos de sección: líneas finas con tres celdas hexagonales. */
@Component({
  selector: 'app-hex-divider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'hex-ornament',
    'aria-hidden': 'true',
    '[class.justify-center]': "align() === 'center'",
  },
  template: `
    <svg class="w-14 h-5" viewBox="0 0 56 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round">
      <path d="M10 4.5l5.2 3v6L10 16.5l-5.2-3v-6z" opacity="0.55" />
      <path d="M28 1.5l7.4 4.25v8.5L28 18.5l-7.4-4.25v-8.5z" fill="currentColor" fill-opacity="0.18" />
      <path d="M46 4.5l5.2 3v6L46 16.5l-5.2-3v-6z" opacity="0.55" />
    </svg>
  `,
})
export class HexDividerComponent {
  readonly align = input<'center' | 'left'>('left');
}
