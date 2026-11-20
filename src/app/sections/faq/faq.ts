import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { I18nService } from '../../core/i18n/i18n.service';
import { ContactService } from '../../core/services/contact.service';
import { IMAGES } from '../../data/images';
import { BeeComponent } from '../../shared/components/bee/bee';
import { HexDividerComponent } from '../../shared/components/hex-divider/hex-divider';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-faq',
  imports: [HexDividerComponent, BeeComponent, RevealOnScrollDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './faq.html',
  styleUrl: './faq.css',
})
export class FaqComponent {
  protected readonly t = inject(I18nService).t;
  protected readonly contact = inject(ContactService);
  protected readonly image = IMAGES.somosRagko;
  protected readonly open = signal<number | null>(0);

  protected toggle(index: number): void {
    this.open.update((current) => (current === index ? null : index));
  }
}
