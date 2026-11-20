import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { I18nService } from '../../core/i18n/i18n.service';
import { ContactService } from '../../core/services/contact.service';
import { IMAGES } from '../../data/images';
import { BeeComponent } from '../../shared/components/bee/bee';
import { WhatsappIconComponent } from '../../shared/components/icons/whatsapp-icon';
import { RagkoMarkComponent } from '../../shared/components/ragko-mark/ragko-mark';

@Component({
  selector: 'app-hero',
  imports: [BeeComponent, RagkoMarkComponent, WhatsappIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.html',
})
export class HeroComponent {
  protected readonly t = inject(I18nService).t;
  protected readonly contact = inject(ContactService);
  protected readonly images = IMAGES;
}
