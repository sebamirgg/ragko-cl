import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  inject,
  input,
  signal,
  viewChildren,
} from '@angular/core';

import { I18nService } from '../../../core/i18n/i18n.service';
import { LanguageCode } from '../../../core/i18n/languages';
import { FlagComponent } from '../flag/flag';

let nextId = 0;

/**
 * Selector de idioma con bandera + nombre + código.
 * - `dropdown`: botón compacto con menú desplegable (barra de navegación).
 * - `inline`: todas las opciones visibles en fila (menú móvil).
 * Accesible: navegación con flechas, Escape para cerrar y cierre al hacer clic fuera.
 */
@Component({
  selector: 'app-language-switcher',
  imports: [FlagComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'relative block',
    '(document:click)': 'onDocumentClick($event)',
    '(keydown.escape)': 'close(true)',
  },
  templateUrl: './language-switcher.html',
})
export class LanguageSwitcherComponent {
  protected readonly i18n = inject(I18nService);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly options = viewChildren<ElementRef<HTMLButtonElement>>('option');
  private readonly trigger = viewChildren<ElementRef<HTMLButtonElement>>('trigger');

  readonly variant = input<'dropdown' | 'inline'>('dropdown');

  protected readonly t = this.i18n.t;
  protected readonly open = signal(false);
  protected readonly menuId = `lang-menu-${nextId++}`;
  protected readonly current = computed(() => this.i18n.language());

  protected toggle(): void {
    this.open.update((v) => !v);
    if (this.open()) {
      const index = this.i18n.languages.findIndex((l) => l.code === this.i18n.lang());
      queueMicrotask(() => this.options()[Math.max(index, 0)]?.nativeElement.focus());
    }
  }

  protected select(code: LanguageCode): void {
    this.i18n.use(code);
    this.close(true);
  }

  close(returnFocus = false): void {
    if (!this.open()) return;
    this.open.set(false);
    if (returnFocus) this.trigger()[0]?.nativeElement.focus();
  }

  protected onDocumentClick(event: MouseEvent): void {
    if (this.open() && !this.host.nativeElement.contains(event.target as Node)) {
      this.close();
    }
  }

  protected moveFocus(event: Event, delta: number): void {
    event.preventDefault();
    const items = this.options();
    const active = items.findIndex((o) => o.nativeElement === document.activeElement);
    const next = (active + delta + items.length) % items.length;
    items[next]?.nativeElement.focus();
  }
}
