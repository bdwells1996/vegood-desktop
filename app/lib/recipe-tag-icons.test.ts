import { describe, it, expect } from "vitest";
import { Leaf, WheatOff, Sprout, Wheat, Egg, Tag } from "lucide-react";
import { getDietaryTags, getAllergenTags } from "./recipe-tag-icons";

describe("getDietaryTags", () => {
  it("returns correct icon and label for known dietary tags", () => {
    const result = getDietaryTags(["Vegan", "Gluten-Free"]);
    expect(result).toHaveLength(2);
    expect(result[0]).toMatchObject({ label: "Vegan", icon: Leaf });
    expect(result[1]).toMatchObject({ label: "Gluten-Free", icon: WheatOff });
  });

  it("returns correct icon for Vegetarian and Raw", () => {
    const result = getDietaryTags(["Vegetarian", "Raw"]);
    expect(result[0]).toMatchObject({ label: "Vegetarian", icon: Sprout });
    expect(result[1]).toMatchObject({ label: "Raw", icon: Sprout });
  });

  it("falls back to Tag icon and preserves label for unknown strings", () => {
    const result = getDietaryTags(["Unknown-Tag"]);
    expect(result[0]).toMatchObject({ label: "Unknown-Tag", icon: Tag });
  });

  it("returns empty array for empty input", () => {
    expect(getDietaryTags([])).toEqual([]);
  });
});

describe("getAllergenTags", () => {
  it("returns correct icon and label for known allergens", () => {
    const result = getAllergenTags(["Gluten", "Eggs"]);
    expect(result).toHaveLength(2);
    expect(result[0]).toMatchObject({ label: "Contains gluten", icon: Wheat });
    expect(result[1]).toMatchObject({ label: "Contains eggs", icon: Egg });
  });

  it("falls back to Tag icon for unknown allergens", () => {
    const result = getAllergenTags(["Shellfish"]);
    expect(result[0]).toMatchObject({
      label: "Contains shellfish",
      icon: Tag,
    });
  });

  it("returns empty array for empty input", () => {
    expect(getAllergenTags([])).toEqual([]);
  });
});
