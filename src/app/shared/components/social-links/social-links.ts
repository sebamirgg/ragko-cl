import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';

import { ContactService } from '../../../core/services/contact.service';
import { WhatsappIconComponent } from '../icons/whatsapp-icon';

/** Enlaces a redes y WhatsApp en botones circulares de línea fina (Contacto y footer). */
@Component({
  selector: 'app-social-links',
  imports: [WhatsappIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-wrap items-center gap-3' },
  template: `
    <a [href]="contact.social.instagram" target="_blank" rel="noopener noreferrer" class="icon-btn" aria-label="Instagram · Cooperativa Ragko">
      <svg class="w-[18px] h-[18px]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true">
        <rect width="18" height="18" x="3" y="3" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" stroke="none" />
      </svg>
    </a>
    <a [href]="contact.social.facebook" target="_blank" rel="noopener noreferrer" class="icon-btn" aria-label="Facebook · Cooperativa Ragko">
      <svg class="w-[18px] h-[18px]" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.6 1.6-1.6h1.6V4.3a21 21 0 00-2.4-.1c-2.3 0-3.9 1.4-3.9 4v2.3H8.8v3h2.6V21" />
      </svg>
    </a>
    @if (whatsapp()) {
      <a [href]="contact.whatsappUrl()" target="_blank" rel="noopener noreferrer" class="icon-btn" aria-label="WhatsApp · Cooperativa Ragko">
        <app-whatsapp-icon class="w-[18px] h-[18px]" />
      </a>
    }
    <a [href]="contact.emailUrl()" class="icon-btn" [attr.aria-label]="'Email · ' + contact.email">
      <svg class="w-[18px] h-[18px]" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3.5 6.5l8.5 6 8.5-6" />
      </svg>
    </a>
  `,
})
export class SocialLinksComponent {
  protected readonly contact = inject(ContactService);
  /** Incluir el acceso a WhatsApp (en Contacto ya hay un botón principal). */
  readonly whatsapp = input(true);
}
