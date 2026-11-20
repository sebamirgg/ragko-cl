import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { I18nService } from '../../core/i18n/i18n.service';
import { UiStateService } from '../../core/services/ui-state.service';
import { HoneyId, POLLEN_REPORTS, SPECIES, pollenShares } from '../../data/pollen.data';
import { HexDividerComponent } from '../../shared/components/hex-divider/hex-divider';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-science',
  imports: [HexDividerComponent, RevealOnScrollDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './science.html',
  styles: `
    /* Ficha técnica: superficie apenas elevada con filete fino, sin sombras pesadas */
    .sheet {
      background: linear-gradient(180deg, rgb(var(--c-graphite) / 0.75), rgb(var(--c-graphite) / 0.35));
      border: 1px solid var(--hairline);
    }

    /* Botón de la ficha palinológica: halo cálido para que destaque sobre el fondo carbón */
    .lab-pill {
      box-shadow: 0 0 0 5px rgba(205, 134, 81, 0.12), 0 18px 40px -16px rgba(205, 134, 81, 0.45);
    }
    .lab-pill:hover {
      box-shadow: 0 0 0 7px rgba(205, 134, 81, 0.18), 0 22px 46px -16px rgba(205, 134, 81, 0.6);
    }
  `,
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
