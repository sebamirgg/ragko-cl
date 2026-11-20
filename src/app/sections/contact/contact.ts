import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { I18nService } from '../../core/i18n/i18n.service';
import { ContactService } from '../../core/services/contact.service';
import { UiStateService } from '../../core/services/ui-state.service';
import { IMAGES } from '../../data/images';
import { BeeComponent } from '../../shared/components/bee/bee';
import { WhatsappIconComponent } from '../../shared/components/icons/whatsapp-icon';
import { RagkoMarkComponent } from '../../shared/components/ragko-mark/ragko-mark';
import { SocialLinksComponent } from '../../shared/components/social-links/social-links';
import { HexDividerComponent } from '../../shared/components/hex-divider/hex-divider';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-contact',
  imports: [BeeComponent, HexDividerComponent, RagkoMarkComponent, WhatsappIconComponent, SocialLinksComponent, RevealOnScrollDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.html',
})
export class ContactComponent {
  protected readonly t = inject(I18nService).t;
  protected readonly contact = inject(ContactService);
  protected readonly ui = inject(UiStateService);
  protected readonly photo = IMAGES.beekeeperHives;
}
