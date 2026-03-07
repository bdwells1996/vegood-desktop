import {
  Bean,
  Droplet,
  Egg,
  Leaf,
  Nut,
  Sprout,
  Tag,
  Wheat,
  WheatOff,
} from "lucide-react";
import type { AllergenTag, DietaryTag } from "@/app/components/RecipeCard";

const DIETARY_TAG_MAP: Record<string, DietaryTag> = {
  vegan: { label: "Vegan", icon: Leaf, iconAlt: "Plant-based" },
  vegetarian: { label: "Vegetarian", icon: Sprout, iconAlt: "Vegetarian" },
  "gluten-free": { label: "Gluten-Free", icon: WheatOff, iconAlt: "No gluten" },
  raw: { label: "Raw", icon: Sprout, iconAlt: "Raw food" },
  "dairy-free": { label: "Dairy-Free", icon: Droplet, iconAlt: "No dairy" },
  "nut-free": { label: "Nut-Free", icon: Tag, iconAlt: "No nuts" },
};

const ALLERGEN_TAG_MAP: Record<string, AllergenTag> = {
  gluten: { label: "Contains gluten", icon: Wheat },
  nuts: { label: "Contains nuts", icon: Nut },
  soy: { label: "Contains soy", icon: Bean },
  dairy: { label: "Contains dairy", icon: Droplet },
  eggs: { label: "Contains eggs", icon: Egg },
  sesame: { label: "Contains sesame", icon: Wheat },
  coconut: { label: "Contains coconut", icon: Droplet },
};

export function getDietaryTags(tags: string[]): DietaryTag[] {
  return tags.map(
    (tag) => DIETARY_TAG_MAP[tag] ?? { label: tag, icon: Tag }
  );
}

export function getAllergenTags(tags: string[]): AllergenTag[] {
  return tags.map(
    (tag) => ALLERGEN_TAG_MAP[tag] ?? { label: `Contains ${tag}`, icon: Tag }
  );
}
