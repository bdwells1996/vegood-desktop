import { describe, it, expect } from "vitest";
import { Egg, Leaf, Sprout, Tag, Wheat, WheatOff } from "lucide-react";
import { getAllergenTags, getDietaryTags } from "./recipe-tag-icons";

describe("getDietaryTags", () => {
  it("returns correct icon and label for known dietary tags", () => {
    const result = getDietaryTags(["vegan", "gluten-free"]);
    expect(result).toHaveLength(2);
    expect(result[0]).toMatchObject({ label: "Vegan", icon: Leaf });
    expect(result[1]).toMatchObject({ label: "Gluten-Free", icon: WheatOff });
  });

  it("returns correct icon for vegetarian and raw", () => {
    const result = getDietaryTags(["vegetarian", "raw"]);
    expect(result[0]).toMatchObject({ label: "Vegetarian", icon: Sprout });
    expect(result[1]).toMatchObject({ label: "Raw", icon: Sprout });
  });

  it("falls back to Tag icon and preserves label for unknown strings", () => {
    const result = getDietaryTags(["unknown-tag"]);
    expect(result[0]).toMatchObject({ label: "unknown-tag", icon: Tag });
  });

  it("returns empty array for empty input", () => {
    expect(getDietaryTags([])).toEqual([]);
  });
});

describe("getAllergenTags", () => {
  it("returns correct icon and label for known allergens", () => {
    const result = getAllergenTags(["gluten", "eggs"]);
    expect(result).toHaveLength(2);
    expect(result[0]).toMatchObject({ label: "Contains gluten", icon: Wheat });
    expect(result[1]).toMatchObject({ label: "Contains eggs", icon: Egg });
  });

  it("falls back to Tag icon for unknown allergens", () => {
    const result = getAllergenTags(["shellfish"]);
    expect(result[0]).toMatchObject({
      label: "Contains shellfish",
      icon: Tag,
    });
  });

  it("returns empty array for empty input", () => {
    expect(getAllergenTags([])).toEqual([]);
  });
});
