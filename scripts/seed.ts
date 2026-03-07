import { count } from "drizzle-orm";
import { db } from "../db";
import { categories, recipeCategories, recipes } from "../db/schema";

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
  console.log("DB URL:", url ? `${url.slice(0, 30)}...` : "NOT SET");

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

  console.log("\n🎉 Seed complete.");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
