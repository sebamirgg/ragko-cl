import { en } from './translations/en';
import { es, Translation } from './translations/es';
import { pt } from './translations/pt';

export type LanguageCode = 'es' | 'en' | 'pt';
/** Banderas disponibles: idiomas del sitio + países de referencia (Ruta D.O.). */
export type FlagCode = 'cl' | 'gb' | 'br' | 'es' | 'fr';

export interface LanguageOption {
  code: LanguageCode;
  /** Nombre del idioma en su propio idioma (endónimo). */
  name: string;
  /** Código visible en el selector. */
  short: string;
  /** Bandera mostrada junto al idioma. */
  flag: FlagCode;
  /** Valor para <html lang> y para formatear números. */
  locale: string;
}

/**
 * Idiomas disponibles. Para agregar uno nuevo:
 * 1. Crear translations/<código>.ts tipado como `Translation`.
 * 2. Agregarlo aquí y en TRANSLATIONS (y su bandera en FlagComponent si es nueva).
 */
export const LANGUAGES: readonly LanguageOption[] = [
  { code: 'es', name: 'Español', short: 'ES', flag: 'cl', locale: 'es-CL' },
  { code: 'en', name: 'English', short: 'EN', flag: 'gb', locale: 'en' },
  { code: 'pt', name: 'Português', short: 'PT', flag: 'br', locale: 'pt-BR' },
];

export const DEFAULT_LANGUAGE: LanguageCode = 'es';

export const TRANSLATIONS: Record<LanguageCode, Translation> = { es, en, pt };

export function isLanguageCode(value: unknown): value is LanguageCode {
  return typeof value === 'string' && LANGUAGES.some((l) => l.code === value);
}
