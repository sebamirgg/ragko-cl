import { TestBed } from '@angular/core/testing';

import { AppComponent } from './app';
import { I18nService } from './core/i18n/i18n.service';
import { en } from './core/i18n/translations/en';
import { es } from './core/i18n/translations/es';
import { pt } from './core/i18n/translations/pt';
import { findLot } from './data/lots.data';
import { POLLEN_REPORTS, pollenShares } from './data/pollen.data';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AppComponent] }).compileComponents();
  });

  it('crea la aplicación', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renderiza los textos del idioma activo y cambia al seleccionar otro', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    // Tras el primer render se aplica el idioma del navegador; luego lo fijamos explícitamente.
    await fixture.whenStable();
    const i18n = TestBed.inject(I18nService);
    const el = fixture.nativeElement as HTMLElement;
    const heroTitle = () => el.querySelector('#hero-title')?.textContent ?? '';

    for (const [code, dict] of [['es', es], ['en', en], ['pt', pt]] as const) {
      i18n.use(code);
      await fixture.whenStable();
      expect(heroTitle()).toContain(dict.hero.title);
      expect(document.documentElement.lang).toBe(i18n.language().locale);
    }
  });
});

describe('Traducciones', () => {
  /** Lista todas las rutas de claves de un objeto de traducción. */
  const keys = (obj: unknown, prefix = ''): string[] =>
    obj && typeof obj === 'object'
      ? Object.entries(obj).flatMap(([k, v]) => keys(v, prefix ? `${prefix}.${k}` : k))
      : [prefix];

  it('en y pt tienen exactamente las mismas claves que es', () => {
    expect(keys(en)).toEqual(keys(es));
    expect(keys(pt)).toEqual(keys(es));
  });

  it('no hay textos vacíos', () => {
    for (const dict of [es, en, pt]) {
      const empty = keys(dict).filter((path) => {
        const value = path.split('.').reduce<unknown>((o, k) => (o as Record<string, unknown>)[k], dict);
        return typeof value === 'string' && value.trim() === '';
      });
      expect(empty).toEqual([]);
    }
  });
});

describe('Trazabilidad', () => {
  it('encuentra lotes ignorando mayúsculas, espacios y guiones', () => {
    expect(findLot('rgk ul 416')?.honey).toBe('ulmo');
    expect(findLot('RGKTI411')?.honey).toBe('tineo');
    expect(findLot('RGK-XX-000')).toBeUndefined();
  });

  it('reproduce los porcentajes de los informes de laboratorio', () => {
    expect(pollenShares(POLLEN_REPORTS.ulmo)[0].percentage).toBe(81.0);
    expect(pollenShares(POLLEN_REPORTS.tineo)[0].percentage).toBe(69.6);
  });
});
