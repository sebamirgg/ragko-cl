import { ChangeDetectionStrategy, Component, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { I18nService } from '../../core/i18n/i18n.service';
import { NAV_ITEMS } from '../../data/navigation';
import { LanguageSwitcherComponent } from '../../shared/components/language-switcher/language-switcher';
import { RagkoMarkComponent } from '../../shared/components/ragko-mark/ragko-mark';

@Component({
  selector: 'app-navbar',
  imports: [RagkoMarkComponent, LanguageSwitcherComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:scroll)': 'onScroll()',
    '(document:keydown.escape)': 'menuOpen.set(false)',
  },
  templateUrl: './navbar.html',
})
export class NavbarComponent {
  protected readonly t = inject(I18nService).t;
  protected readonly navItems = NAV_ITEMS;
  protected readonly scrolled = signal(false);
  protected readonly menuOpen = signal(false);

  constructor() {
    if (isPlatformBrowser(inject(PLATFORM_ID))) this.onScroll();
  }

  protected onScroll(): void {
    this.scrolled.set(window.scrollY > 40);
  }

  protected toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }
}
