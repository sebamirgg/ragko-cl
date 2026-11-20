import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { I18nService } from '../../core/i18n/i18n.service';
import { UiStateService } from '../../core/services/ui-state.service';
import { HoneyId, POLLEN_REPORTS, SPECIES, pollenShares } from '../../data/pollen.data';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-science',
  imports: [RevealOnScrollDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './science.html',
})
export class ScienceComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly ui = inject(UiStateService);
  protected readonly t = this.i18n.t;
  protected readonly species = SPECIES;

  protected readonly reports = (['ulmo', 'tineo'] as HoneyId[]).map((honey) => ({
    honey,
    report: POLLEN_REPORTS[honey],
    shares: pollenShares(POLLEN_REPORTS[honey], false),
  }));
}
