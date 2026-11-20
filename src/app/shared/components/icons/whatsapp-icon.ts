import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-whatsapp-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'inline-block shrink-0', 'aria-hidden': 'true' },
  template: `
    <svg class="block w-full h-full" viewBox="0 0 24 24">
      <!-- Globo de diálogo -->
      <path d="M3.2 20.8l1.3-4.6A9.2 9.2 0 1 1 8 19.6z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />
      <!-- Auricular -->
      <path fill="currentColor" transform="translate(12 12) scale(1.25) translate(-12 -12)"
            d="M15.423 14.416c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824z" />
    </svg>
  `,
})
export class WhatsappIconComponent {}
