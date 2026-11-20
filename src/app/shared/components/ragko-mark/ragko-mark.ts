import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Isotipo de Ragko: flor de siete hexágonos. Toma el color de `currentColor`. */
@Component({
  selector: 'app-ragko-mark',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'inline-block shrink-0', 'aria-hidden': 'true' },
  template: `
    <svg class="block w-full h-full" viewBox="0 0 100 100" fill="none" stroke="currentColor"
         [attr.stroke-width]="strokeWidth()" stroke-linejoin="round">
      <polygon points="50,35 63,42.5 63,57.5 50,65 37,57.5 37,42.5" />
      <polygon points="50,12 63,19.5 63,34.5 50,42 37,34.5 37,19.5" />
      <polygon points="70,23.5 83,31 83,46 70,53.5 57,46 57,31" />
      <polygon points="70,46.5 83,54 83,69 70,76.5 57,69 57,54" />
      <polygon points="50,58 63,65.5 63,80.5 50,88 37,80.5 37,65.5" />
      <polygon points="30,46.5 43,54 43,69 30,76.5 17,69 17,54" />
      <polygon points="30,23.5 43,31 43,46 30,53.5 17,46 17,31" />
    </svg>
  `,
})
export class RagkoMarkComponent {
  readonly strokeWidth = input(7.5);
}
