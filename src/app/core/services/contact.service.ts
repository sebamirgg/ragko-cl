import { Injectable, computed, inject } from '@angular/core';

import { SITE_CONFIG } from '../config/site.config';
import { I18nService } from '../i18n/i18n.service';

/** Genera los enlaces de contacto con mensajes prellenados en el idioma activo. */
@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly i18n = inject(I18nService);

  readonly email = SITE_CONFIG.email;
  readonly social = SITE_CONFIG.social;

  readonly whatsappUrl = computed(() => this.whatsapp(this.i18n.t().whatsapp.general));

  readonly emailUrl = computed(
    () => `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent(this.i18n.t().contact.emailSubject)}`,
  );

  /** Mensaje para consultar por una miel específica (nombre ya traducido). */
  honeyUrl(honeyName: string): string {
    const t = this.i18n.t();
    return this.whatsapp(this.i18n.format(t.whatsapp.honey, { honey: honeyName }));
  }

  private whatsapp(text: string): string {
    return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
  }
}
