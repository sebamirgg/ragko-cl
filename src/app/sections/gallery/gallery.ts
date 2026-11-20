import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { I18nService } from '../../core/i18n/i18n.service';
import { ContactService } from '../../core/services/contact.service';
import { GALLERY, GalleryPhoto } from '../../data/gallery.data';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-gallery',
  imports: [RevealOnScrollDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(document:keydown.escape)': 'selected.set(null)' },
  templateUrl: './gallery.html',
})
export class GalleryComponent {
  protected readonly t = inject(I18nService).t;
  protected readonly contact = inject(ContactService);
  protected readonly photos = GALLERY;
  protected readonly selected = signal<GalleryPhoto | null>(null);
}
