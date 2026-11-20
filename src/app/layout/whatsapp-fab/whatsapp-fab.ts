import { ChangeDetectionStrategy, Component, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { I18nService } from '../../core/i18n/i18n.service';
import { ContactService } from '../../core/services/contact.service';
import { WhatsappIconComponent } from '../../shared/components/icons/whatsapp-icon';

/**
 * Botón flotante de WhatsApp: discreto, aparece al dejar atrás el hero
 * (donde ya hay un acceso directo) y muestra su etiqueta al pasar el cursor.
 */
@Component({
  selector: 'app-whatsapp-fab',
  imports: [WhatsappIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(window:scroll)': 'onScroll()' },
  template: `
    <a
      [href]="contact.whatsappUrl()"
      target="_blank"
      rel="noopener noreferrer"
      [attr.aria-label]="t().common.whatsappFab"
      [attr.tabindex]="visible() ? null : -1"
      [attr.aria-hidden]="visible() ? null : true"
      [class.is-visible]="visible()"
      class="fab group fixed bottom-6 right-6 z-40 flex items-center gap-0 hover:gap-3 h-14 pl-4 pr-4 rounded-full bg-amber-deep text-cream border border-cream/25 shadow-[0_18px_40px_-14px_rgba(30,26,22,0.7)] hover:bg-ink transition-all duration-500">
      <app-whatsapp-icon class="w-6 h-6" />
      <span class="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium group-hover:max-w-[16rem] group-focus-visible:max-w-[16rem] transition-[max-width] duration-500">
        {{ t().common.whatsappFab }}
      </span>
    </a>
  `,
  styles: `
    .fab {
      opacity: 0;
      transform: translateY(16px) scale(0.9);
      pointer-events: none;
    }
    .fab.is-visible {
      opacity: 1;
      transform: none;
      pointer-events: auto;
    }
    @media (prefers-reduced-motion: reduce) {
      .fab { transition: none; }
    }
  `,
})
export class WhatsappFabComponent {
  protected readonly t = inject(I18nService).t;
  protected readonly contact = inject(ContactService);
  protected readonly visible = signal(false);

  constructor() {
    if (isPlatformBrowser(inject(PLATFORM_ID))) this.onScroll();
  }

  protected onScroll(): void {
    this.visible.set(window.scrollY > window.innerHeight * 0.6);
  }
}
