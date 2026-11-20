import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, computed, effect, inject, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { DEFAULT_LANGUAGE, LANGUAGES, LanguageCode, LanguageOption, TRANSLATIONS, isLanguageCode } from './languages';
import { Translation } from './translations/es';

const STORAGE_KEY = 'ragko.lang';

/**
 * Servicio de internacionalización basado en signals.
 *
 * - `t()` entrega el diccionario tipado del idioma activo: en las plantillas se usa como
 *   `{{ t().hero.title }}`, con autocompletado y verificación de claves en compilación.
 * - El idioma elegido se recuerda en localStorage; en la primera visita se detecta desde el navegador.
 * - Mantiene sincronizados <html lang>, el <title> y la meta descripción.
 */
@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  private readonly current = signal<LanguageCode>(DEFAULT_LANGUAGE);

  readonly languages = LANGUAGES;
  readonly lang = this.current.asReadonly();
  readonly language = computed<LanguageOption>(
    () => LANGUAGES.find((l) => l.code === this.current()) ?? LANGUAGES[0],
  );
  readonly t = computed<Translation>(() => TRANSLATIONS[this.current()]);

  private readonly numberFormats = computed(() => {
    const locale = this.language().locale;
    return {
      one: new Intl.NumberFormat(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 }),
      int: new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }),
    };
  });

  constructor() {
    effect(() => {
      const language = this.language();
      const t = this.t();
      this.document.documentElement.lang = language.locale;
      this.title.setTitle(t.meta.title);
      this.meta.updateTag({ name: 'description', content: t.meta.description });
    });
  }

  /** Cambia el idioma y guarda la preferencia. */
  use(code: LanguageCode): void {
    this.current.set(code);
    if (this.isBrowser) {
      try {
        localStorage.setItem(STORAGE_KEY, code);
      } catch {
        /* almacenamiento no disponible (modo privado, etc.) */
      }
    }
  }

  /**
   * Aplica la preferencia guardada o el idioma del navegador.
   * Se llama después de la hidratación para no alterar el HTML renderizado en servidor.
   */
  restorePreferredLanguage(): void {
    if (!this.isBrowser) return;

    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      stored = null;
    }
    if (isLanguageCode(stored)) {
      this.current.set(stored);
      return;
    }

    const preferred = (navigator.languages ?? [navigator.language])
      .map((l) => l.slice(0, 2).toLowerCase())
      .find(isLanguageCode);
    if (preferred) this.current.set(preferred);
  }

  /** Reemplaza marcadores {clave} de un texto traducido. */
  format(template: string, params: Record<string, string | number>): string {
    return template.replace(/\{(\w+)\}/g, (match, key: string) =>
      key in params ? String(params[key]) : match,
    );
  }

  /** Número con un decimal según el idioma activo (81,0 · 81.0). */
  decimal(value: number): string {
    return this.numberFormats().one.format(value);
  }

  /** Número entero con separador de miles según el idioma activo. */
  integer(value: number): string {
    return this.numberFormats().int.format(value);
  }
}
