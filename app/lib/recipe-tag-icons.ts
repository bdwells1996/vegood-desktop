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
import type { DietaryTag, AllergenTag } from "@/app/components/RecipeCard";

const DIETARY_TAG_MAP: Record<string, DietaryTag> = {
  Vegan: { label: "Vegan", icon: Leaf, iconAlt: "Plant-based" },
  Vegetarian: { label: "Vegetarian", icon: Sprout, iconAlt: "Vegetarian" },
  "Gluten-Free": { label: "Gluten-Free", icon: WheatOff, iconAlt: "No gluten" },
  Raw: { label: "Raw", icon: Sprout, iconAlt: "Raw food" },
  "Dairy-Free": { label: "Dairy-Free", icon: Droplet, iconAlt: "No dairy" },
  "Nut-Free": { label: "Nut-Free", icon: Tag, iconAlt: "No nuts" },
};

const ALLERGEN_TAG_MAP: Record<string, AllergenTag> = {
  Gluten: { label: "Contains gluten", icon: Wheat },
  Nuts: { label: "Contains nuts", icon: Nut },
  Soy: { label: "Contains soy", icon: Bean },
  Dairy: { label: "Contains dairy", icon: Droplet },
  Eggs: { label: "Contains eggs", icon: Egg },
};

export function getDietaryTags(tags: string[]): DietaryTag[] {
  return tags.map(
    (tag) => DIETARY_TAG_MAP[tag] ?? { label: tag, icon: Tag }
  );
}

export function getAllergenTags(tags: string[]): AllergenTag[] {
  return tags.map(
    (tag) => ALLERGEN_TAG_MAP[tag] ?? { label: `Contains ${tag.toLowerCase()}`, icon: Tag }
  );
}
