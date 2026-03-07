import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { CategorySection } from "./CategorySection";
import type { CategoryWithRecipes } from "@/db/queries/recipes";

vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}));

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock("@/components/Icon", () => ({
  Icon: ({ icon: IconComponent, className }: { icon: React.ComponentType<{ className?: string; "aria-hidden"?: string }>; className?: string }) => (
    <IconComponent className={className} aria-hidden="true" />
  ),
}));

vi.mock("@/app/components/StarRating", () => ({
  StarRating: ({ rating }: { rating: number }) => (
    <div data-testid="star-rating">{rating}★</div>
  ),
}));

const makeRecipe = (overrides: Partial<CategoryWithRecipes["recipes"][0]> = {}): CategoryWithRecipes["recipes"][0] => ({
  id: "recipe-1",
  title: "Test Recipe",
  description: "A test description",
  imageUrl: "/images/test.jpg",
  timeMinutes: 30,
  rating: "4.5",
  ratingCount: 100,
  dietaryTags: ["Vegan"],
  allergens: ["Gluten"],
  authorId: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});

const makeCategory = (overrides: Partial<CategoryWithRecipes> = {}): CategoryWithRecipes => ({
  id: "cat-1",
  title: "Breakfast",
  description: null,
  slug: "breakfast",
  sortOrder: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
  recipes: [makeRecipe()],
  ...overrides,
});

describe("CategorySection", () => {
  it("renders the category title as an h2", () => {
    render(<CategorySection category={makeCategory()} />);
    expect(screen.getByRole("heading", { level: 2, name: "Breakfast" })).toBeInTheDocument();
  });

  it("renders a RecipeCard for each recipe in the category", () => {
    const category = makeCategory({
      recipes: [
        makeRecipe({ id: "r1", title: "Recipe One" }),
        makeRecipe({ id: "r2", title: "Recipe Two" }),
      ],
    });
    render(<CategorySection category={category} />);
    expect(screen.getByText("Recipe One")).toBeInTheDocument();
    expect(screen.getByText("Recipe Two")).toBeInTheDocument();
  });

  it("renders nothing when the category has no recipes", () => {
    const { container } = render(<CategorySection category={makeCategory({ recipes: [] })} />);
    expect(container.firstChild).toBeNull();
  });
});
