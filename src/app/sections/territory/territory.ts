import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { I18nService } from '../../core/i18n/i18n.service';
import { IMAGES } from '../../data/images';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-territory',
  imports: [RevealOnScrollDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './territory.html',
})
export class TerritoryComponent {
  protected readonly t = inject(I18nService).t;
  protected readonly photo = IMAGES.beekeeperHives;
}
