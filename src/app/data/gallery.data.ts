import { Translation } from '../core/i18n/translations/es';
import { IMAGES, SiteImage } from './images';

/** Los textos de cada foto viven en translations/*.ts → gallery.items[id]. */
export type GalleryId = keyof Translation['gallery']['items'];

export interface GalleryPhoto {
  id: GalleryId;
  image: SiteImage;
  /** Clases de la grilla bento (móvil y escritorio). */
  span: string;
  /** Encuadre (object-position) para no cortar rostros. */
  position: string;
  /**
   * Reencuadre extra para fotos cuadradas de redes con la marca de agua "Ragko" impresa:
   * se amplía la foto desde el borde opuesto a la marca para dejarla fuera de la celda.
   */
  crop?: { scale: number; origin: string };
}

/**
 * Bento asimétrico: 2 columnas en móvil, 4 en escritorio (grid-flow-dense rellena los huecos).
 * El orden importa: define cómo encajan las piezas grandes y pequeñas.
 */
export const GALLERY: readonly GalleryPhoto[] = [
  { id: 'somos-ragko', image: IMAGES.somosRagko, span: 'col-span-2 row-span-2', position: '50% 78%', crop: { scale: 1.15, origin: '50% 100%' } },
  { id: 'miel-cruda', image: IMAGES.rawHoney, span: 'col-span-2', position: '62% 45%' },
  { id: 'inspeccion-marco', image: IMAGES.frameInspection, span: 'row-span-2', position: '50% 38%' },
  { id: 'panal-operculado', image: IMAGES.honeycombCloseUp, span: 'row-span-2 lg:row-span-1', position: '50% 40%' },
  { id: 'panal-cosecha', image: IMAGES.harvestFrame, span: '', position: '50% 42%', crop: { scale: 1.5, origin: '60% 0%' } },
  { id: 'apicultor-territorio', image: IMAGES.beekeeperPoncho, span: '', position: '35% 45%', crop: { scale: 1.45, origin: '25% 0%' } },
  { id: 'carpinteria', image: IMAGES.woodworkshop, span: 'col-span-2 lg:col-span-1', position: '50% 55%', crop: { scale: 1.35, origin: '50% 100%' } },
  { id: 'vivero-nativo', image: IMAGES.nativeNursery, span: 'col-span-2', position: '50% 32%' },
  { id: 'artesano', image: IMAGES.artisan, span: 'col-span-2', position: '65% 30%' },
];
