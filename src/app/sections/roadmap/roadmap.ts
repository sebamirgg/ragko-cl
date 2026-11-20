import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { I18nService } from '../../core/i18n/i18n.service';
import { BeeComponent } from '../../shared/components/bee/bee';
import { FlagComponent } from '../../shared/components/flag/flag';
import { RagkoMarkComponent } from '../../shared/components/ragko-mark/ragko-mark';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-roadmap',
  imports: [SectionHeadingComponent, RevealOnScrollDirective, BeeComponent, FlagComponent, RagkoMarkComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './roadmap.html',
  styles: `
    /* Hilo conductor: se intensifica hacia la meta (el sello) */
    .timeline-line {
      background: linear-gradient(180deg, rgba(205, 134, 81, 0.35) 0%, #cd8651 100%);
    }
    .timeline-line--h {
      background: linear-gradient(90deg, rgba(205, 134, 81, 0.35) 0%, #cd8651 100%);
    }

    /* Sello de destino: anillo punteado que gira muy lento */
    .seal {
      background: radial-gradient(circle, rgba(252, 246, 233, 0.9) 0%, rgba(252, 246, 233, 0.4) 70%, transparent 100%);
    }
    .seal-ring {
      animation: sealSpin 40s linear infinite;
    }
    @keyframes sealSpin {
      to { transform: rotate(360deg); }
    }

    /* Meta: halo hexagonal que late suavemente */
    .goal-pulse {
      clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
      background: rgba(205, 134, 81, 0.45);
      animation: goalPulse 2.4s ease-out infinite;
    }
    @keyframes goalPulse {
      from { transform: scale(1); opacity: 0.8; }
      to { transform: scale(1.7); opacity: 0; }
    }

    @media (prefers-reduced-motion: reduce) {
      .seal-ring, .goal-pulse { animation: none; }
    }
  `,
})
export class RoadmapComponent {
  protected readonly t = inject(I18nService).t;
}
