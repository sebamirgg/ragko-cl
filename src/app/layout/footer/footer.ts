import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { I18nService } from '../../core/i18n/i18n.service';
import { NAV_ITEMS } from '../../data/navigation';
import { RagkoMarkComponent } from '../../shared/components/ragko-mark/ragko-mark';

@Component({
  selector: 'app-footer',
  imports: [RagkoMarkComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer.html',
})
export class FooterComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly t = this.i18n.t;
  protected readonly navItems = [...NAV_ITEMS, { anchor: 'contacto', label: 'cta' as const }];
  protected readonly year = new Date().getFullYear();
}
