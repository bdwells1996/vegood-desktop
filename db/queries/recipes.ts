import { asc, avg, count, eq } from "drizzle-orm";
import { db } from "../index";
import {
	categories,
	recipeCategories,
	recipeRatings,
	recipes,
} from "../schema";

export type Recipe = typeof recipes.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type RecipeWithCategories = Recipe & { categories: Category[] };
export type CategoryWithRecipes = Category & { recipes: Recipe[] };

const DEFAULT_RECIPE_LIMIT = 200;

export async function getRecipes(
	limit = DEFAULT_RECIPE_LIMIT,
): Promise<RecipeWithCategories[]> {
	const rows = await db
		.select()
		.from(recipes)
		.leftJoin(recipeCategories, eq(recipeCategories.recipeId, recipes.id))
		.leftJoin(categories, eq(categories.id, recipeCategories.categoryId))
		.limit(limit);

	return aggregateRecipesWithCategories(rows);
}

export async function getRecipeById(
	id: string,
): Promise<RecipeWithCategories | null> {
	const rows = await db
		.select()
		.from(recipes)
		.leftJoin(recipeCategories, eq(recipeCategories.recipeId, recipes.id))
		.leftJoin(categories, eq(categories.id, recipeCategories.categoryId))
		.where(eq(recipes.id, id));

	const results = aggregateRecipesWithCategories(rows);
	return results[0] ?? null;
}

export async function getCategoryBySlug(
	slug: string,
): Promise<CategoryWithRecipes | null> {
	const [category] = await db
		.select()
		.from(categories)
		.where(eq(categories.slug, slug))
		.limit(1);

	if (!category) return null;

	const rows = await db
		.select()
		.from(recipes)
		.leftJoin(recipeCategories, eq(recipeCategories.recipeId, recipes.id))
		.leftJoin(categories, eq(categories.id, recipeCategories.categoryId))
		.where(eq(recipeCategories.categoryId, category.id));

	const recipeMap = new Map<string, Recipe>();
	for (const row of rows) {
		if (!recipeMap.has(row.recipes.id)) {
			recipeMap.set(row.recipes.id, row.recipes);
		}
	}

	return { ...category, recipes: [...recipeMap.values()] };
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
		.leftJoin(categories, eq(categories.id, recipeCategories.categoryId))
		.limit(DEFAULT_RECIPE_LIMIT);

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
			recipe.categories.some((c) => c.id === category.id),
		),
	}));
}

// ─── Recipe detail ────────────────────────────────────────────────────────────

export type RecipeDetail = NonNullable<
	Awaited<ReturnType<typeof getRecipeDetail>>
>;
export type RatingSummary = { avg: string | null; count: number };

export async function getRecipeDetail(id: string) {
	try {
		return await db.query.recipes.findFirst({
			where: eq(recipes.id, id),
			with: {
				steps: {
					orderBy: (steps) => [asc(steps.stepNumber)],
					with: {
						stepIngredients: {
							with: { ingredient: true },
						},
					},
				},
			},
		});
	} catch (err) {
		// Postgres error 22P02: invalid_text_representation (e.g. malformed UUID)
		if (
			typeof err === "object" &&
			err !== null &&
			"code" in err &&
			(err as { code: string }).code === "22P02"
		) {
			return undefined;
		}
		throw err;
	}
}

export async function getRecipeRatingSummary(
	recipeId: string,
): Promise<RatingSummary> {
	const [row] = await db
		.select({ avg: avg(recipeRatings.score), count: count() })
		.from(recipeRatings)
		.where(eq(recipeRatings.recipeId, recipeId));

	return { avg: row?.avg ?? null, count: Number(row?.count ?? 0) };
}

// ─── Internal helpers ─────────────────────────────────────────────────────────

type JoinRow = {
	recipes: Recipe;
	recipe_categories: typeof recipeCategories.$inferSelect | null;
	categories: Category | null;
};

function aggregateRecipesWithCategories(
	rows: JoinRow[],
): RecipeWithCategories[] {
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
