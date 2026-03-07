import { eq } from "drizzle-orm";
import { db } from "../index";
import { categories, recipeCategories, recipes } from "../schema";

export type Recipe = typeof recipes.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type RecipeWithCategories = Recipe & { categories: Category[] };
export type CategoryWithRecipes = Category & { recipes: Recipe[] };

export async function getRecipes(): Promise<RecipeWithCategories[]> {
  const rows = await db
    .select()
    .from(recipes)
    .leftJoin(recipeCategories, eq(recipeCategories.recipeId, recipes.id))
    .leftJoin(categories, eq(categories.id, recipeCategories.categoryId));

  return aggregateRecipesWithCategories(rows);
}

export async function getRecipeById(id: string): Promise<RecipeWithCategories | null> {
  const rows = await db
    .select()
    .from(recipes)
    .leftJoin(recipeCategories, eq(recipeCategories.recipeId, recipes.id))
    .leftJoin(categories, eq(categories.id, recipeCategories.categoryId))
    .where(eq(recipes.id, id));

  const results = aggregateRecipesWithCategories(rows);
  return results[0] ?? null;
}

export async function getRecipesByCategory(): Promise<CategoryWithRecipes[]> {
  const allCategories = await db
    .select()
    .from(categories)
    .orderBy(categories.sortOrder);

  const rows = await db
    .select()
    .from(recipes)
    .leftJoin(recipeCategories, eq(recipeCategories.recipeId, recipes.id))
    .leftJoin(categories, eq(categories.id, recipeCategories.categoryId));

  const recipeMap = new Map<string, RecipeWithCategories>();
  for (const row of rows) {
    const recipe = row.recipes;
    if (!recipeMap.has(recipe.id)) {
      recipeMap.set(recipe.id, { ...recipe, categories: [] });
    }
    if (row.categories) {
      recipeMap.get(recipe.id)!.categories.push(row.categories);
    }
  }

  return allCategories.map((category) => ({
    ...category,
    recipes: [...recipeMap.values()].filter((recipe) =>
      recipe.categories.some((c) => c.id === category.id)
    ),
  }));
}

type JoinRow = {
  recipes: Recipe;
  recipe_categories: typeof recipeCategories.$inferSelect | null;
  categories: Category | null;
};

function aggregateRecipesWithCategories(rows: JoinRow[]): RecipeWithCategories[] {
  const recipeMap = new Map<string, RecipeWithCategories>();

  for (const row of rows) {
    const recipe = row.recipes;
    if (!recipeMap.has(recipe.id)) {
      recipeMap.set(recipe.id, { ...recipe, categories: [] });
    }
    if (row.categories) {
      recipeMap.get(recipe.id)!.categories.push(row.categories);
    }
  }

  return [...recipeMap.values()];
}
