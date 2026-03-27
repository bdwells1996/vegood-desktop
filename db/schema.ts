import {
  date,
  integer,
  numeric,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  unique,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 100 }).notNull(),
  description: text("description"),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const recipes = pgTable("recipes", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  imageUrl: text("image_url"),
  timeMinutes: integer("time_minutes"),
  // Legacy denormalised rating — kept for seed data compatibility.
  // Use getRecipeRatingSummary() from recipeRatings as the authoritative source.
  rating: numeric("rating", { precision: 3, scale: 2 }),
  ratingCount: integer("rating_count").default(0).notNull(),
  dietaryTags: text("dietary_tags").array().default([]).notNull(),
  allergens: text("allergens").array().default([]).notNull(),
  authorId: uuid("author_id"),
  prepTimeMins: integer("prep_time_mins"),
  cookTimeMins: integer("cook_time_mins"),
  servings: integer("servings"),
  cuisine: varchar("cuisine", { length: 100 }),
  difficulty: varchar("difficulty", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const recipeCategories = pgTable(
  "recipe_categories",
  {
    recipeId: uuid("recipe_id")
      .notNull()
      .references(() => recipes.id, { onDelete: "cascade" }),
    categoryId: uuid("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.recipeId, t.categoryId] })]
);

export const recipeSteps = pgTable("recipe_steps", {
  id: uuid("id").primaryKey().defaultRandom(),
  recipeId: uuid("recipe_id")
    .notNull()
    .references(() => recipes.id, { onDelete: "cascade" }),
  stepNumber: integer("step_number").notNull(),
  instruction: text("instruction").notNull(),
});

export const ingredients = pgTable("ingredients", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  imageUrl: text("image_url"),
});

export const recipeStepIngredients = pgTable("recipe_step_ingredients", {
  id: uuid("id").primaryKey().defaultRandom(),
  stepId: uuid("step_id")
    .notNull()
    .references(() => recipeSteps.id, { onDelete: "cascade" }),
  ingredientId: uuid("ingredient_id")
    .notNull()
    .references(() => ingredients.id),
  quantity: varchar("quantity", { length: 50 }),
  unit: varchar("unit", { length: 50 }),
});

export const recipeRatings = pgTable(
  "recipe_ratings",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    recipeId: uuid("recipe_id")
      .notNull()
      .references(() => recipes.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    score: integer("score").notNull(),
    review: text("review"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [unique().on(t.recipeId, t.userId)]
);

// ─── Relations ────────────────────────────────────────────────────────────────

export const recipesRelations = relations(recipes, ({ many }) => ({
  recipeCategories: many(recipeCategories),
  steps: many(recipeSteps),
  ratings: many(recipeRatings),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  recipeCategories: many(recipeCategories),
}));

export const recipeCategoriesRelations = relations(recipeCategories, ({ one }) => ({
  recipe: one(recipes, { fields: [recipeCategories.recipeId], references: [recipes.id] }),
  category: one(categories, { fields: [recipeCategories.categoryId], references: [categories.id] }),
}));

export const recipeStepsRelations = relations(recipeSteps, ({ one, many }) => ({
  recipe: one(recipes, { fields: [recipeSteps.recipeId], references: [recipes.id] }),
  stepIngredients: many(recipeStepIngredients),
}));

export const ingredientsRelations = relations(ingredients, ({ many }) => ({
  stepIngredients: many(recipeStepIngredients),
}));

export const recipeStepIngredientsRelations = relations(recipeStepIngredients, ({ one }) => ({
  step: one(recipeSteps, { fields: [recipeStepIngredients.stepId], references: [recipeSteps.id] }),
  ingredient: one(ingredients, { fields: [recipeStepIngredients.ingredientId], references: [ingredients.id] }),
}));

export const recipeRatingsRelations = relations(recipeRatings, ({ one }) => ({
  recipe: one(recipes, { fields: [recipeRatings.recipeId], references: [recipes.id] }),
  user: one(users, { fields: [recipeRatings.userId], references: [users.id] }),
}));

// ─── Meal Plans ───────────────────────────────────────────────────────────────

export const mealSlotEnum = pgEnum("meal_slot", ["breakfast", "lunch", "dinner"]);

export const mealPlans = pgTable(
  "meal_plans",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    date: date("date").notNull(),
    slot: mealSlotEnum("slot").notNull(),
    recipeId: uuid("recipe_id")
      .notNull()
      .references(() => recipes.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [unique().on(t.userId, t.date, t.slot)]
);

export const mealPlansRelations = relations(mealPlans, ({ one }) => ({
  user: one(users, { fields: [mealPlans.userId], references: [users.id] }),
  recipe: one(recipes, { fields: [mealPlans.recipeId], references: [recipes.id] }),
}));
