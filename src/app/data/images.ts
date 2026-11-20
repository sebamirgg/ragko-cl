/** Rutas de las fotografías oficiales de Cooperativa Ragko (src/resources/images/ragko). */
const BASE = 'resources/images/ragko/';

export interface SiteImage {
  src: string;
  width: number;
  height: number;
}

const img = (file: string, width: number, height: number): SiteImage => ({ src: BASE + file, width, height });

export const IMAGES = {
  heroApiary: img('519673547_122181544526360516_8621292655219364027_n.jpg', 1920, 1080),
  honeycombCloseUp: img('537420222_17991340805834096_7377982852245683548_n.jpg', 1440, 1920),
  beekeeperHives: img('752620232_1012315631599638_1931829109803749546_n.jpg', 2048, 1356),
  tineoFrame: img('469778389_122145428474360516_7176839494713472223_n.jpg', 1080, 1080),
  ulmoJar: img('517713686_122181544478360516_4059500393000600636_n.jpg', 1920, 1080),
  somosRagko: img('536906883_17991340778834096_1412348170191393273_n.jpg', 1440, 1920),
  frameInspection: img('537557789_17991340787834096_7760877650663504961_n.jpg', 1440, 1920),
  rawHoney: img('504433901_122181544532360516_4371677576195456262_n.jpg', 1920, 1080),
  harvestFrame: img('471162984_122148022298360516_8803662300688134095_n.jpg', 1080, 1080),
  beekeeperPoncho: img('469585389_122145187406360516_7796380910404264648_n.jpg', 1080, 1080),
  woodworkshop: img('470211605_122146318676360516_2544973137349315083_n.jpg', 1080, 1080),
  nativeNursery: img('470178672_122146522922360516_4337231496104999354_n.jpg', 1080, 1080),
  artisan: img('471325302_122148031820360516_5120646425514352722_n.jpg', 960, 960),
} satisfies Record<string, SiteImage>;
