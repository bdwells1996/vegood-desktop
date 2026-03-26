import { count, eq } from "drizzle-orm";
import { hashSync } from "bcryptjs";
import { db } from "../db";
import {
  categories,
  ingredients,
  recipeCategories,
  recipeRatings,
  recipeStepIngredients,
  recipeSteps,
  recipes,
  users,
} from "../db/schema";

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------

const CATEGORIES = [
  { slug: "breakfast", title: "Breakfast", description: "Morning meals to start the day right.", sortOrder: 1 },
  { slug: "lunch", title: "Lunch", description: "Midday meals packed with flavour.", sortOrder: 2 },
  { slug: "dinner", title: "Dinner", description: "Satisfying evening meals.", sortOrder: 3 },
  { slug: "snacks", title: "Snacks", description: "Quick bites between meals.", sortOrder: 4 },
  { slug: "desserts", title: "Desserts", description: "Indulgent sweet treats.", sortOrder: 5 },
  { slug: "drinks", title: "Drinks", description: "Refreshing beverages and smoothies.", sortOrder: 6 },
  { slug: "soups-stews", title: "Soups & Stews", description: "Hearty warming bowls.", sortOrder: 7 },
  { slug: "meal-prep", title: "Meal Prep", description: "Batch-cook friendly recipes.", sortOrder: 8 },
] as const;

// ---------------------------------------------------------------------------
// Recipes (~25)
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Seed user (for ratings)
// ---------------------------------------------------------------------------

if (process.env.NODE_ENV === "production") {
  console.error("❌ Seed script must not be run in production.");
  process.exit(1);
}

const SEED_USER = {
  id: "seed-user-1",
  firstName: "Jamie",
  lastName: "Oliver",
  email: "jamie@vegood.app",
  passwordHash: hashSync("seed-account-not-for-login", 10),
};

// ---------------------------------------------------------------------------
// Ingredients (global normalised list)
// ---------------------------------------------------------------------------

type IngredientSeed = { name: string; slug: string; imageUrl: string };

const INGREDIENTS: IngredientSeed[] = [
  { name: "rolled oats", slug: "rolled-oats", imageUrl: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=200" },
  { name: "almond milk", slug: "almond-milk", imageUrl: "https://images.unsplash.com/photo-1600788886242-5c96aabe3757?w=200" },
  { name: "mixed berries", slug: "mixed-berries", imageUrl: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=200" },
  { name: "maple syrup", slug: "maple-syrup", imageUrl: "https://images.unsplash.com/photo-1589375575050-a0a04b0cf517?w=200" },
  { name: "chia seeds", slug: "chia-seeds", imageUrl: "https://images.unsplash.com/photo-1514733670139-4d660d46da2a?w=200" },
  { name: "avocado", slug: "avocado", imageUrl: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=200" },
  { name: "sourdough bread", slug: "sourdough-bread", imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200" },
  { name: "hemp seeds", slug: "hemp-seeds", imageUrl: "https://images.unsplash.com/photo-1609501676723-f5f40dba1ef7?w=200" },
  { name: "lemon", slug: "lemon", imageUrl: "https://images.unsplash.com/photo-1590502593747-42a996133562?w=200" },
  { name: "chilli flakes", slug: "chilli-flakes", imageUrl: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=200" },
  { name: "red lentils", slug: "red-lentils", imageUrl: "https://images.unsplash.com/photo-1601063458289-77247ba485ec?w=200" },
  { name: "cumin", slug: "cumin", imageUrl: "https://images.unsplash.com/photo-1588321428286-5e26ff0e0b09?w=200" },
  { name: "turmeric", slug: "turmeric", imageUrl: "https://images.unsplash.com/photo-1615485500834-bc10199bc727?w=200" },
  { name: "canned tomatoes", slug: "canned-tomatoes", imageUrl: "https://images.unsplash.com/photo-1561136594-7f68413baa99?w=200" },
  { name: "kale", slug: "kale", imageUrl: "https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?w=200" },
  { name: "vegetable stock", slug: "vegetable-stock", imageUrl: "https://images.unsplash.com/photo-1547592180-85f173990554?w=200" },
  { name: "onion", slug: "onion", imageUrl: "https://images.unsplash.com/photo-1518977956812-cd3dbadaaf31?w=200" },
  { name: "garlic", slug: "garlic", imageUrl: "https://images.unsplash.com/photo-1501420193885-a5c9de15bb1b?w=200" },
  { name: "coconut milk", slug: "coconut-milk", imageUrl: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=200" },
  { name: "tofu", slug: "tofu", imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200" },
  { name: "courgette", slug: "courgette", imageUrl: "https://images.unsplash.com/photo-1587334274328-64186a80aeee?w=200" },
  { name: "green curry paste", slug: "green-curry-paste", imageUrl: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=200" },
  { name: "jasmine rice", slug: "jasmine-rice", imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200" },
  { name: "sugar snap peas", slug: "sugar-snap-peas", imageUrl: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=200" },
];

// ---------------------------------------------------------------------------
// Detailed recipe data (steps + per-step ingredients)
// ---------------------------------------------------------------------------

type StepSeed = {
  stepNumber: number;
  instruction: string;
  ingredients: { slug: string; quantity: string; unit: string }[];
};

type DetailedRecipeSeed = {
  title: string;
  prepTimeMins: number;
  cookTimeMins: number;
  servings: number;
  cuisine: string;
  difficulty: string;
  steps: StepSeed[];
};

const DETAILED_RECIPES: DetailedRecipeSeed[] = [
  {
    title: "Overnight Oats with Berries",
    prepTimeMins: 5,
    cookTimeMins: 0,
    servings: 1,
    cuisine: "International",
    difficulty: "Easy",
    steps: [
      {
        stepNumber: 1,
        instruction: "Add the rolled oats to a jar or bowl. Pour over the almond milk and stir well to combine.",
        ingredients: [
          { slug: "rolled-oats", quantity: "80", unit: "g" },
          { slug: "almond-milk", quantity: "200", unit: "ml" },
        ],
      },
      {
        stepNumber: 2,
        instruction: "Stir in the chia seeds, then drizzle over the maple syrup. Cover and refrigerate overnight (at least 6 hours).",
        ingredients: [
          { slug: "chia-seeds", quantity: "1", unit: "tbsp" },
          { slug: "maple-syrup", quantity: "1", unit: "tbsp" },
        ],
      },
      {
        stepNumber: 3,
        instruction: "In the morning, top with fresh mixed berries and serve cold.",
        ingredients: [
          { slug: "mixed-berries", quantity: "100", unit: "g" },
        ],
      },
    ],
  },
  {
    title: "Lentil Soup",
    prepTimeMins: 10,
    cookTimeMins: 35,
    servings: 4,
    cuisine: "Middle Eastern",
    difficulty: "Easy",
    steps: [
      {
        stepNumber: 1,
        instruction: "Dice the onion and mince the garlic. Heat a little oil in a large pot over medium heat and sauté the onion for 5 minutes until softened.",
        ingredients: [
          { slug: "onion", quantity: "1", unit: "large" },
          { slug: "garlic", quantity: "3", unit: "cloves" },
        ],
      },
      {
        stepNumber: 2,
        instruction: "Add the cumin and turmeric to the pot and stir for 1 minute until fragrant.",
        ingredients: [
          { slug: "cumin", quantity: "1.5", unit: "tsp" },
          { slug: "turmeric", quantity: "1", unit: "tsp" },
        ],
      },
      {
        stepNumber: 3,
        instruction: "Rinse the red lentils, then add them to the pot along with the canned tomatoes and vegetable stock. Bring to a boil, then reduce heat and simmer for 25 minutes.",
        ingredients: [
          { slug: "red-lentils", quantity: "300", unit: "g" },
          { slug: "canned-tomatoes", quantity: "400", unit: "g" },
          { slug: "vegetable-stock", quantity: "1", unit: "litre" },
        ],
      },
      {
        stepNumber: 4,
        instruction: "Stir in the kale and cook for a further 3–4 minutes until wilted. Season with salt and a squeeze of lemon juice.",
        ingredients: [
          { slug: "kale", quantity: "2", unit: "handfuls" },
          { slug: "lemon", quantity: "0.5", unit: "" },
        ],
      },
    ],
  },
  {
    title: "Thai Green Curry",
    prepTimeMins: 10,
    cookTimeMins: 25,
    servings: 4,
    cuisine: "Thai",
    difficulty: "Medium",
    steps: [
      {
        stepNumber: 1,
        instruction: "Press the tofu to remove excess moisture, then cut into 2 cm cubes. Slice the courgette into half-moons and trim the sugar snap peas.",
        ingredients: [
          { slug: "tofu", quantity: "400", unit: "g" },
          { slug: "courgette", quantity: "1", unit: "medium" },
          { slug: "sugar-snap-peas", quantity: "150", unit: "g" },
        ],
      },
      {
        stepNumber: 2,
        instruction: "Heat a wok or large pan over high heat. Fry the green curry paste for 1–2 minutes, stirring constantly, until it begins to stick to the pan.",
        ingredients: [
          { slug: "green-curry-paste", quantity: "3", unit: "tbsp" },
        ],
      },
      {
        stepNumber: 3,
        instruction: "Pour in the coconut milk and bring to a simmer. Add the tofu, courgette and sugar snap peas. Cook for 10 minutes.",
        ingredients: [
          { slug: "coconut-milk", quantity: "400", unit: "ml" },
        ],
      },
      {
        stepNumber: 4,
        instruction: "While the curry simmers, cook the jasmine rice according to packet instructions. Serve the curry ladled over the rice.",
        ingredients: [
          { slug: "jasmine-rice", quantity: "320", unit: "g" },
        ],
      },
    ],
  },
];

type RecipeSeed = {
  title: string;
  description: string;
  imageUrl: string;
  timeMinutes: number;
  rating: string;
  ratingCount: number;
  dietaryTags: string[];
  allergens: string[];
};

const RECIPES: RecipeSeed[] = [
  {
    title: "Overnight Oats with Berries",
    description: "Creamy oats soaked overnight with almond milk, topped with fresh mixed berries and a drizzle of maple syrup.",
    imageUrl: "https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=800",
    timeMinutes: 10,
    rating: "4.80",
    ratingCount: 312,
    dietaryTags: ["vegan", "gluten-free"],
    allergens: ["nuts"],
  },
  {
    title: "Avocado Toast with Hemp Seeds",
    description: "Smashed avocado on toasted sourdough, sprinkled with hemp seeds, chilli flakes and a squeeze of lemon.",
    imageUrl: "https://images.unsplash.com/photo-1541519227354-08fa5d50c820?w=800",
    timeMinutes: 10,
    rating: "4.65",
    ratingCount: 198,
    dietaryTags: ["vegan"],
    allergens: ["gluten"],
  },
  {
    title: "Banana Pancakes",
    description: "Fluffy two-ingredient banana pancakes with no added sugar — perfect with fresh fruit.",
    imageUrl: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800",
    timeMinutes: 20,
    rating: "4.70",
    ratingCount: 245,
    dietaryTags: ["vegan", "gluten-free"],
    allergens: [],
  },
  {
    title: "Green Smoothie Bowl",
    description: "Blended spinach, banana and mango topped with granola, kiwi and chia seeds.",
    imageUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800",
    timeMinutes: 10,
    rating: "4.55",
    ratingCount: 134,
    dietaryTags: ["vegan", "gluten-free", "raw"],
    allergens: ["nuts"],
  },
  {
    title: "Chia Pudding with Mango",
    description: "Coconut milk chia pudding layered with fresh mango cubes and toasted coconut flakes.",
    imageUrl: "https://images.unsplash.com/photo-1546039907-7fa05f864c02?w=800",
    timeMinutes: 5,
    rating: "4.75",
    ratingCount: 289,
    dietaryTags: ["vegan", "gluten-free", "raw"],
    allergens: ["coconut"],
  },
  {
    title: "Rainbow Quinoa Salad",
    description: "Protein-packed quinoa tossed with roasted peppers, cucumber, cherry tomatoes and a tahini dressing.",
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800",
    timeMinutes: 25,
    rating: "4.60",
    ratingCount: 176,
    dietaryTags: ["vegan", "gluten-free"],
    allergens: ["sesame"],
  },
  {
    title: "Chickpea & Avocado Wrap",
    description: "Mashed spiced chickpeas and creamy avocado in a wholegrain wrap with shredded lettuce and tomato.",
    imageUrl: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800",
    timeMinutes: 15,
    rating: "4.50",
    ratingCount: 143,
    dietaryTags: ["vegan"],
    allergens: ["gluten"],
  },
  {
    title: "Lentil Soup",
    description: "Red lentils slow-simmered with cumin, turmeric, tomatoes and kale — hearty and warming.",
    imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800",
    timeMinutes: 40,
    rating: "4.85",
    ratingCount: 421,
    dietaryTags: ["vegan", "gluten-free"],
    allergens: [],
  },
  {
    title: "Roasted Veggie Buddha Bowl",
    description: "Oven-roasted sweet potato, broccoli and chickpeas over brown rice with tahini dressing.",
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800",
    timeMinutes: 45,
    rating: "4.78",
    ratingCount: 337,
    dietaryTags: ["vegan", "gluten-free"],
    allergens: ["sesame"],
  },
  {
    title: "Creamy Tomato Pasta",
    description: "Sun-dried tomato and cashew cream sauce tossed with penne and fresh basil.",
    imageUrl: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800",
    timeMinutes: 30,
    rating: "4.70",
    ratingCount: 262,
    dietaryTags: ["vegan"],
    allergens: ["gluten", "nuts"],
  },
  {
    title: "Black Bean Tacos",
    description: "Smoky black beans in corn tortillas with pico de gallo, guacamole and pickled jalapeños.",
    imageUrl: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800",
    timeMinutes: 25,
    rating: "4.82",
    ratingCount: 389,
    dietaryTags: ["vegan", "gluten-free"],
    allergens: [],
  },
  {
    title: "Thai Green Curry",
    description: "Fragrant coconut milk curry with tofu, courgette and sugar snap peas. Serve with jasmine rice.",
    imageUrl: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800",
    timeMinutes: 35,
    rating: "4.88",
    ratingCount: 504,
    dietaryTags: ["vegan", "gluten-free"],
    allergens: ["coconut", "soy"],
  },
  {
    title: "Mushroom Bolognese",
    description: "Finely chopped mushrooms and walnuts in a rich tomato sauce over spaghetti.",
    imageUrl: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=800",
    timeMinutes: 50,
    rating: "4.72",
    ratingCount: 278,
    dietaryTags: ["vegan"],
    allergens: ["gluten", "nuts"],
  },
  {
    title: "Stuffed Bell Peppers",
    description: "Peppers filled with herbed quinoa, black beans and corn, baked until tender.",
    imageUrl: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800",
    timeMinutes: 55,
    rating: "4.65",
    ratingCount: 192,
    dietaryTags: ["vegan", "gluten-free"],
    allergens: [],
  },
  {
    title: "Cauliflower Tikka Masala",
    description: "Cauliflower florets simmered in a creamy spiced tomato sauce. Serve with naan or basmati.",
    imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800",
    timeMinutes: 40,
    rating: "4.80",
    ratingCount: 356,
    dietaryTags: ["vegan", "gluten-free"],
    allergens: ["coconut"],
  },
  {
    title: "Tomato & Basil Bruschetta",
    description: "Diced ripe tomatoes with garlic and basil on toasted baguette — simple Italian classic.",
    imageUrl: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=800",
    timeMinutes: 15,
    rating: "4.55",
    ratingCount: 118,
    dietaryTags: ["vegan"],
    allergens: ["gluten"],
  },
  {
    title: "Hummus & Veggie Platter",
    description: "Homemade roasted garlic hummus served with carrot sticks, cucumber, peppers and pitta.",
    imageUrl: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=800",
    timeMinutes: 15,
    rating: "4.68",
    ratingCount: 214,
    dietaryTags: ["vegan"],
    allergens: ["sesame", "gluten"],
  },
  {
    title: "Chocolate Avocado Mousse",
    description: "Rich and velvety chocolate mousse made with ripe avocados, cacao and maple syrup.",
    imageUrl: "https://images.unsplash.com/photo-1541795795328-f073b763494e?w=800",
    timeMinutes: 10,
    rating: "4.90",
    ratingCount: 478,
    dietaryTags: ["vegan", "gluten-free", "raw"],
    allergens: [],
  },
  {
    title: "Banana Nice Cream",
    description: "Blended frozen bananas churned into an ice-cream-like dessert — no churn, no dairy needed.",
    imageUrl: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
    timeMinutes: 10,
    rating: "4.85",
    ratingCount: 391,
    dietaryTags: ["vegan", "gluten-free", "raw"],
    allergens: [],
  },
  {
    title: "Mango Lassi",
    description: "Chilled blended mango with coconut yoghurt, cardamom and a squeeze of lime.",
    imageUrl: "https://images.unsplash.com/photo-1523371054106-bbf80586c38c?w=800",
    timeMinutes: 5,
    rating: "4.75",
    ratingCount: 227,
    dietaryTags: ["vegan", "gluten-free"],
    allergens: ["coconut"],
  },
  {
    title: "Golden Turmeric Latte",
    description: "Warm oat milk infused with turmeric, ginger, cinnamon and a touch of black pepper.",
    imageUrl: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800",
    timeMinutes: 5,
    rating: "4.70",
    ratingCount: 183,
    dietaryTags: ["vegan", "gluten-free"],
    allergens: [],
  },
  {
    title: "Minestrone Soup",
    description: "Classic Italian vegetable soup with cannellini beans, pasta and fresh herbs.",
    imageUrl: "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=800",
    timeMinutes: 45,
    rating: "4.68",
    ratingCount: 231,
    dietaryTags: ["vegan"],
    allergens: ["gluten"],
  },
  {
    title: "Roasted Tomato Bisque",
    description: "Slow-roasted tomatoes blended smooth with garlic and thyme — serve with crusty bread.",
    imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800",
    timeMinutes: 60,
    rating: "4.77",
    ratingCount: 296,
    dietaryTags: ["vegan", "gluten-free"],
    allergens: [],
  },
  {
    title: "Meal Prep Grain Bowls",
    description: "Batch-cooked farro, roasted veg and marinated tofu — portion into 5 containers for the week.",
    imageUrl: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=800",
    timeMinutes: 60,
    rating: "4.73",
    ratingCount: 318,
    dietaryTags: ["vegan"],
    allergens: ["gluten", "soy"],
  },
  {
    title: "Energy Bites",
    description: "No-bake oat and peanut butter balls rolled in shredded coconut — ideal for snacking all week.",
    imageUrl: "https://images.unsplash.com/photo-1604548737895-f940984e76f1?w=800",
    timeMinutes: 15,
    rating: "4.82",
    ratingCount: 402,
    dietaryTags: ["vegan"],
    allergens: ["nuts", "gluten", "coconut"],
  },
];

// ---------------------------------------------------------------------------
// Recipe → category mapping (title → slugs)
// ---------------------------------------------------------------------------

const RECIPE_CATEGORY_MAP: Record<string, string[]> = {
  "Overnight Oats with Berries": ["breakfast", "meal-prep"],
  "Avocado Toast with Hemp Seeds": ["breakfast"],
  "Banana Pancakes": ["breakfast"],
  "Green Smoothie Bowl": ["breakfast", "drinks"],
  "Chia Pudding with Mango": ["breakfast", "meal-prep"],
  "Rainbow Quinoa Salad": ["lunch"],
  "Chickpea & Avocado Wrap": ["lunch"],
  "Lentil Soup": ["lunch", "dinner", "soups-stews"],
  "Roasted Veggie Buddha Bowl": ["lunch", "dinner", "meal-prep"],
  "Creamy Tomato Pasta": ["dinner"],
  "Black Bean Tacos": ["dinner"],
  "Thai Green Curry": ["dinner"],
  "Mushroom Bolognese": ["dinner"],
  "Stuffed Bell Peppers": ["dinner"],
  "Cauliflower Tikka Masala": ["dinner"],
  "Tomato & Basil Bruschetta": ["snacks"],
  "Hummus & Veggie Platter": ["snacks", "meal-prep"],
  "Chocolate Avocado Mousse": ["desserts"],
  "Banana Nice Cream": ["desserts", "snacks"],
  "Mango Lassi": ["drinks"],
  "Golden Turmeric Latte": ["drinks"],
  "Minestrone Soup": ["lunch", "dinner", "soups-stews"],
  "Roasted Tomato Bisque": ["soups-stews"],
  "Meal Prep Grain Bowls": ["dinner", "meal-prep"],
  "Energy Bites": ["snacks", "meal-prep"],
};

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log("🌱 Starting seed...\n");
  const url = process.env.DATABASE_URL;
  console.log("DB URL:", url ? `set (host: ${new URL(url).host})` : "NOT SET");

  // 1. Upsert categories
  const upsertedCategories = await db
    .insert(categories)
    .values(CATEGORIES.map(({ slug, title, description, sortOrder }) => ({ slug, title, description, sortOrder })))
    .onConflictDoUpdate({
      target: categories.slug,
      set: {
        title: categories.title,
        description: categories.description,
        sortOrder: categories.sortOrder,
      },
    })
    .returning();

  console.log(`✅ Categories: ${upsertedCategories.length} upserted`);

  const categoryBySlug = Object.fromEntries(upsertedCategories.map((c) => [c.slug, c]));

  // 2. Check if recipes already exist
  const [{ value: recipeCount }] = await db.select({ value: count() }).from(recipes);

  let recipeIdByTitle: Record<string, string> = {};

  if (Number(recipeCount) === 0) {
    // Insert recipes
    const inserted = await db.insert(recipes).values(RECIPES).returning();
    recipeIdByTitle = Object.fromEntries(inserted.map((r) => [r.title, r.id]));
    console.log(`✅ Recipes: ${inserted.length} inserted`);
  } else {
    console.log(`⏭️  Recipes: skipping inserts (${recipeCount} already in table)`);
    // Look up existing IDs by title for join inserts below
    const existing = await db.select({ id: recipes.id, title: recipes.title }).from(recipes);
    recipeIdByTitle = Object.fromEntries(existing.map((r) => [r.title, r.id]));
  }

  // 3. Upsert recipe_categories join rows
  const joinRows: { recipeId: string; categoryId: string }[] = [];

  for (const [title, slugs] of Object.entries(RECIPE_CATEGORY_MAP)) {
    const recipeId = recipeIdByTitle[title];
    if (!recipeId) continue;
    for (const slug of slugs) {
      const category = categoryBySlug[slug];
      if (!category) continue;
      joinRows.push({ recipeId, categoryId: category.id });
    }
  }

  if (joinRows.length > 0) {
    await db.insert(recipeCategories).values(joinRows).onConflictDoNothing();
    console.log(`✅ Recipe-categories: ${joinRows.length} rows upserted`);
  }

  // 4. Upsert seed user
  await db
    .insert(users)
    .values(SEED_USER)
    .onConflictDoNothing();
  console.log("✅ Seed user upserted");

  // 5. Upsert ingredients
  const upsertedIngredients = await db
    .insert(ingredients)
    .values(INGREDIENTS)
    .onConflictDoUpdate({
      target: ingredients.slug,
      set: { name: ingredients.name, imageUrl: ingredients.imageUrl },
    })
    .returning();

  const ingredientBySlug = Object.fromEntries(upsertedIngredients.map((i) => [i.slug, i]));
  console.log(`✅ Ingredients: ${upsertedIngredients.length} upserted`);

  // 6. Seed detailed recipe data (steps + step ingredients + ratings)
  for (const detail of DETAILED_RECIPES) {
    const recipeId = recipeIdByTitle[detail.title];
    if (!recipeId) {
      console.log(`⚠️  Recipe not found: "${detail.title}" — skipping steps`);
      continue;
    }

    // Check if steps already exist before opening a transaction
    const [{ value: existingStepCount }] = await db
      .select({ value: count() })
      .from(recipeSteps)
      .where(eq(recipeSteps.recipeId, recipeId));

    if (Number(existingStepCount) > 0) {
      console.log(`⏭️  Steps for "${detail.title}": skipping (already seeded)`);
      continue;
    }

    await db.transaction(async (tx) => {
      // Update recipe with new fields
      await tx
        .update(recipes)
        .set({
          prepTimeMins: detail.prepTimeMins,
          cookTimeMins: detail.cookTimeMins,
          servings: detail.servings,
          cuisine: detail.cuisine,
          difficulty: detail.difficulty,
        })
        .where(eq(recipes.id, recipeId));

      // Batch-insert all steps for this recipe
      const insertedSteps = await tx
        .insert(recipeSteps)
        .values(
          detail.steps.map((s) => ({
            recipeId,
            stepNumber: s.stepNumber,
            instruction: s.instruction,
          }))
        )
        .returning();

      // Build step ingredient rows across all steps in one batch
      const stepIngredientRows: {
        stepId: string;
        ingredientId: string;
        quantity: string | null;
        unit: string | null;
      }[] = [];

      for (const insertedStep of insertedSteps) {
        const stepSeed = detail.steps.find((s) => s.stepNumber === insertedStep.stepNumber);
        if (!stepSeed) continue;

        for (const si of stepSeed.ingredients) {
          const ingredient = ingredientBySlug[si.slug];
          if (!ingredient) {
            console.log(`⚠️  Ingredient slug not found: "${si.slug}"`);
            continue;
          }
          stepIngredientRows.push({
            stepId: insertedStep.id,
            ingredientId: ingredient.id,
            quantity: si.quantity || null,
            unit: si.unit || null,
          });
        }
      }

      if (stepIngredientRows.length > 0) {
        await tx.insert(recipeStepIngredients).values(stepIngredientRows);
      }

      // Seed a rating
      await tx
        .insert(recipeRatings)
        .values({ recipeId, userId: SEED_USER.id, score: 5, review: "Absolutely delicious!" })
        .onConflictDoNothing();
    });

    console.log(`✅ Steps + ingredients seeded for "${detail.title}"`);
  }

  console.log("\n🎉 Seed complete.");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
