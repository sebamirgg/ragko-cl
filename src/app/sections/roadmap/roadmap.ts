import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { I18nService } from '../../core/i18n/i18n.service';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-roadmap',
  imports: [SectionHeadingComponent, RevealOnScrollDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './roadmap.html',
})
export class RoadmapComponent {
  protected readonly t = inject(I18nService).t;
}
