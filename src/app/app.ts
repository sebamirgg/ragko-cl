import { ChangeDetectionStrategy, Component, afterNextRender, inject } from '@angular/core';

import { I18nService } from './core/i18n/i18n.service';
import { FooterComponent } from './layout/footer/footer';
import { NavbarComponent } from './layout/navbar/navbar';
import { ContactComponent } from './sections/contact/contact';
import { FaqComponent } from './sections/faq/faq';
import { GalleryComponent } from './sections/gallery/gallery';
import { HeroComponent } from './sections/hero/hero';
import { HoneysComponent } from './sections/honeys/honeys';
import { RoadmapComponent } from './sections/roadmap/roadmap';
import { ScienceComponent } from './sections/science/science';
import { TerritoryComponent } from './sections/territory/territory';
import { TraceabilityComponent } from './sections/traceability/traceability';
import { ValueComponent } from './sections/value/value';
import { LabReportModalComponent } from './shared/components/lab-report-modal/lab-report-modal';

@Component({
  selector: 'app-root',
  imports: [
    NavbarComponent,
    HeroComponent,
    ValueComponent,
    TerritoryComponent,
    HoneysComponent,
    GalleryComponent,
    ScienceComponent,
    TraceabilityComponent,
    RoadmapComponent,
    FaqComponent,
    ContactComponent,
    FooterComponent,
    LabReportModalComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
})
export class AppComponent {
  private readonly i18n = inject(I18nService);
  protected readonly t = this.i18n.t;

  constructor() {
    // El servidor siempre renderiza en el idioma por defecto; ya en el navegador
    // se aplica la preferencia guardada o la del navegador.
    afterNextRender(() => this.i18n.restorePreferredLanguage());
  }
}
