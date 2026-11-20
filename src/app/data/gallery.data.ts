import { Translation } from '../core/i18n/translations/es';
import { IMAGES, SiteImage } from './images';

/** Los textos de cada foto viven en translations/*.ts → gallery.items[id]. */
export type GalleryId = keyof Translation['gallery']['items'];

export interface GalleryPhoto {
  id: GalleryId;
  image: SiteImage;
  /** Clases de la grilla bento en escritorio. */
  span: string;
  /** Encuadre (object-position) para no cortar rostros. */
  position: string;
}

export const GALLERY: readonly GalleryPhoto[] = [
  { id: 'somos-ragko', image: IMAGES.somosRagko, span: 'md:col-span-7 md:row-span-2', position: '50% 58%' },
  { id: 'inspeccion-marco', image: IMAGES.frameInspection, span: 'md:col-span-5', position: '50% 38%' },
  { id: 'miel-cruda', image: IMAGES.rawHoney, span: 'md:col-span-5', position: '62% 45%' },
  { id: 'panal-cosecha', image: IMAGES.harvestFrame, span: 'md:col-span-4', position: '50% 42%' },
  { id: 'apicultor-territorio', image: IMAGES.beekeeperPoncho, span: 'md:col-span-4', position: '35% 45%' },
  { id: 'carpinteria', image: IMAGES.woodworkshop, span: 'md:col-span-4', position: '50% 55%' },
  { id: 'vivero-nativo', image: IMAGES.nativeNursery, span: 'md:col-span-6', position: '50% 32%' },
  { id: 'artesano', image: IMAGES.artisan, span: 'md:col-span-6', position: '65% 30%' },
];
