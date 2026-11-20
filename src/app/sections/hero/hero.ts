import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { I18nService } from '../../core/i18n/i18n.service';
import { ContactService } from '../../core/services/contact.service';
import { IMAGES } from '../../data/images';
import { BeeComponent } from '../../shared/components/bee/bee';
import { WhatsappIconComponent } from '../../shared/components/icons/whatsapp-icon';
import { RagkoMarkComponent } from '../../shared/components/ragko-mark/ragko-mark';

@Component({
  selector: 'app-hero',
  imports: [BeeComponent, RagkoMarkComponent, WhatsappIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.html',
  styles: `
    .hero-title {
      font-size: clamp(2.6rem, 1.4rem + 4.4vw, 5.25rem);
      line-height: 1.02;
      text-wrap: balance;
    }

    /* Acercamiento lento de la fotografía al cargar */
    .hero-photo {
      animation: heroZoom 2.8s cubic-bezier(0.16, 1, 0.3, 1) both;
    }
    @keyframes heroZoom {
      from { transform: scale(1.08); }
      to { transform: scale(1); }
    }

    /* Indicador de scroll: una gota de luz que baja por la línea */
    .scroll-cue::after {
      content: '';
      position: absolute;
      left: 0;
      width: 1px;
      height: 40%;
      background: #f6e8c7;
      animation: scrollCue 2.2s ease-in-out infinite;
    }
    @keyframes scrollCue {
      from { top: -40%; }
      to { top: 100%; }
    }

    @media (prefers-reduced-motion: reduce) {
      .hero-photo, .scroll-cue::after { animation: none; }
    }
  `,
})
export class HeroComponent {
  protected readonly t = inject(I18nService).t;
  protected readonly contact = inject(ContactService);
  protected readonly images = IMAGES;
}
