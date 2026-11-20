import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { I18nService } from '../../../core/i18n/i18n.service';
import { ContactService } from '../../../core/services/contact.service';
import { UiStateService } from '../../../core/services/ui-state.service';
import { HoneyId, POLLEN_REPORTS, SPECIES, pollenShares } from '../../../data/pollen.data';

/** Ficha técnica melisopalinológica (Meliflora SpA). Se abre desde Ciencia y desde Contacto. */
@Component({
  selector: 'app-lab-report-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(document:keydown.escape)': 'ui.closeLabReport()' },
  templateUrl: './lab-report-modal.html',
})
export class LabReportModalComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly ui = inject(UiStateService);
  protected readonly contact = inject(ContactService);
  protected readonly t = this.i18n.t;
  protected readonly species = SPECIES;

  /** Tineo primero, como en el informe original; se muestran las 4 especies principales. */
  protected readonly reports = (['tineo', 'ulmo'] as HoneyId[]).map((honey) => ({
    honey,
    report: POLLEN_REPORTS[honey],
    shares: pollenShares(POLLEN_REPORTS[honey], false).slice(0, 4),
  }));
}
