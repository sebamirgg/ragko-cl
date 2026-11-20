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
  styles: `
    /* Ficha técnica: superficie apenas elevada con filete fino, sin sombras pesadas */
    .sheet {
      background: linear-gradient(180deg, rgb(var(--c-graphite) / 0.75), rgb(var(--c-graphite) / 0.35));
      border: 1px solid var(--hairline);
    }

    /* Acceso a la ficha de laboratorio: tarjeta-enlace sobria */
    .lab-link {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 1.4rem 1rem 1rem;
      border-radius: 1rem;
      border: 1px solid var(--hairline);
      background: rgb(var(--c-graphite) / 0.5);
      cursor: pointer;
      transition: border-color 0.3s ease, background-color 0.3s ease;
    }
    .lab-link:hover {
      border-color: rgb(var(--c-accent) / 0.6);
      background: rgb(var(--c-graphite) / 0.9);
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
