import { Translation } from '../core/i18n/translations/es';

export interface NavItem {
  /** id de la sección destino (ancla). */
  anchor: string;
  /** Clave del texto en translations/*.ts → nav. */
  label: keyof Translation['nav'];
}

/** Secciones enlazadas desde el menú principal y el footer, en orden de aparición. */
export const NAV_ITEMS: readonly NavItem[] = [
  { anchor: 'valor', label: 'value' },
  { anchor: 'territorio', label: 'territory' },
  { anchor: 'mieles', label: 'honeys' },
  { anchor: 'galeria', label: 'gallery' },
  { anchor: 'ciencia', label: 'science' },
  { anchor: 'composicion', label: 'traceability' },
  { anchor: 'ruta-do', label: 'roadmap' },
  { anchor: 'faq', label: 'faq' },
];
