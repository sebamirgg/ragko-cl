import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';

import { I18nService } from '../../core/i18n/i18n.service';
import { ContactService } from '../../core/services/contact.service';
import { IMAGES, SiteImage } from '../../data/images';
import { HoneyId, POLLEN_REPORTS, SPECIES, pollenShares } from '../../data/pollen.data';
import { WhatsappIconComponent } from '../../shared/components/icons/whatsapp-icon';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

interface HoneyCard {
  id: HoneyId;
  image: SiteImage;
  position: string;
}

@Component({
  selector: 'app-honeys',
  imports: [SectionHeadingComponent, RevealOnScrollDirective, WhatsappIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './honeys.html',
})
export class HoneysComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly contact = inject(ContactService);
  protected readonly t = this.i18n.t;

  protected readonly cards: HoneyCard[] = [
    { id: 'tineo', image: IMAGES.tineoFrame, position: '50% 25%' },
    { id: 'ulmo', image: IMAGES.ulmoJar, position: '60% 50%' },
  ];

  /** Pestaña activa en móvil (en escritorio se ven ambas fichas). */
  protected readonly active = signal<HoneyId>('ulmo');

  protected readonly purity = computed(() => {
    const result = {} as Record<HoneyId, { value: string; report: number; scientific: string }>;
    for (const id of ['ulmo', 'tineo'] as HoneyId[]) {
      const report = POLLEN_REPORTS[id];
      const primary = pollenShares(report, false)[0];
      result[id] = {
        value: this.i18n.decimal(primary.percentage),
        report: report.report,
        scientific: SPECIES[primary.species].scientific,
      };
    }
    return result;
  });
}
