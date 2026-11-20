import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { FlagCode } from '../../../core/i18n/languages';

let nextId = 0;

/**
 * Banderas en SVG (los emojis de bandera no se ven en Windows).
 * Chile → español · Reino Unido → inglés · Brasil → portugués.
 */
@Component({
  selector: 'app-flag',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'aria-hidden': 'true',
    class: 'inline-block shrink-0 overflow-hidden rounded-[3px] ring-1 ring-black/30 w-5 h-[14px]',
  },
  template: `
    @switch (code()) {
      @case ('cl') {
        <svg viewBox="0 0 30 20" preserveAspectRatio="xMidYMid slice" class="block w-full h-full">
          <rect width="30" height="10" fill="#fff" />
          <rect y="10" width="30" height="10" fill="#D52B1E" />
          <rect width="10" height="10" fill="#0039A6" />
          <polygon fill="#fff"
            points="5,2 5.674,4.073 7.853,4.073 6.09,5.354 6.763,7.427 5,6.146 3.237,7.427 3.91,5.354 2.147,4.073 4.326,4.073" />
        </svg>
      }
      @case ('gb') {
        <svg viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice" class="block w-full h-full">
          <defs>
            <clipPath [attr.id]="clipId + '-s'"><rect width="60" height="30" /></clipPath>
            <clipPath [attr.id]="clipId + '-t'"><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" /></clipPath>
          </defs>
          <g [attr.clip-path]="'url(#' + clipId + '-s)'">
            <rect width="60" height="30" fill="#012169" />
            <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6" />
            <path d="M0,0 L60,30 M60,0 L0,30" [attr.clip-path]="'url(#' + clipId + '-t)'" stroke="#C8102E" stroke-width="4" />
            <path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10" />
            <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" stroke-width="6" />
          </g>
        </svg>
      }
      @case ('br') {
        <svg viewBox="0 0 20 14" preserveAspectRatio="xMidYMid slice" class="block w-full h-full">
          <rect width="20" height="14" fill="#009C3B" />
          <polygon points="1.7,7 10,1.3 18.3,7 10,12.7" fill="#FFDF00" />
          <circle cx="10" cy="7" r="3.4" fill="#002776" />
          <path d="M6.7 6.3 Q10 5.4 13.3 7.6" stroke="#fff" stroke-width="0.55" fill="none" />
        </svg>
      }
    }
  `,
})
export class FlagComponent {
  readonly code = input.required<FlagCode>();
  protected readonly clipId = `flag-${nextId++}`;
}
