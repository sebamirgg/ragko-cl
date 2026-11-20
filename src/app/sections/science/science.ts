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

    /* Acceso a la ficha de laboratorio: tarjeta-enlace sobria */
    .lab-link {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1.1rem 1.6rem 1.1rem 1.1rem;
      border-radius: 1rem;
      border: 1px solid #f6e8c7;
      background: linear-gradient(135deg, #fcf6e9 0%, #f6e8c7 55%, #ecd3a0 100%);
      color: #1e1a16;
      cursor: pointer;
      box-shadow: 0 0 0 6px rgba(227, 168, 87, 0.12), 0 24px 50px -20px rgba(227, 168, 87, 0.45);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .lab-link:hover {
      transform: translateY(-2px);
      box-shadow: 0 0 0 8px rgba(227, 168, 87, 0.18), 0 28px 60px -20px rgba(227, 168, 87, 0.6);
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
