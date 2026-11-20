import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { I18nService } from '../../core/i18n/i18n.service';
import { ContactService } from '../../core/services/contact.service';
import { UiStateService } from '../../core/services/ui-state.service';
import { BeeComponent } from '../../shared/components/bee/bee';
import { WhatsappIconComponent } from '../../shared/components/icons/whatsapp-icon';
import { RagkoMarkComponent } from '../../shared/components/ragko-mark/ragko-mark';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-contact',
  imports: [BeeComponent, RagkoMarkComponent, WhatsappIconComponent, RevealOnScrollDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.html',
})
export class ContactComponent {
  protected readonly t = inject(I18nService).t;
  protected readonly contact = inject(ContactService);
  protected readonly ui = inject(UiStateService);
}
