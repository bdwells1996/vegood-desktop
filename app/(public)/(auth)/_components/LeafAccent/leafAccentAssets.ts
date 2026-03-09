import monstera from "./assets/images/monstera.svg";
import fern from "./assets/images/fern.svg";
import eucalyptus from "./assets/images/eucalyptus.svg";
import leafVeined from "./assets/images/leaf-veined.svg";
import leafSmall from "./assets/images/leaf-small.svg";
import vine from "./assets/images/vine.svg";
import seedPods from "./assets/images/seed-pods.svg";
import botanical from "./assets/images/botanical.svg";
import leafSpray from "./assets/images/leaf-spray.svg";

export const leafAccentAssets = {
  monstera,
  fern,
  eucalyptus,
  "leaf-veined": leafVeined,
  "leaf-small": leafSmall,
  vine,
  "seed-pods": seedPods,
  botanical,
  "leaf-spray": leafSpray,
} as const;

export type LeafAccentVariant = keyof typeof leafAccentAssets;
