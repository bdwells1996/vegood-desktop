import { RecipeCard } from "@/app/components/RecipeCard";
import { getDietaryTags, getAllergenTags } from "@/app/lib/recipe-tag-icons";
import type { CategoryWithRecipes } from "@/db/queries/recipes";

interface CategorySectionProps {
  category: CategoryWithRecipes;
}

export function CategorySection({ category }: CategorySectionProps) {
  if (category.recipes.length === 0) return null;

  return (
    <section>
      <h2 className="mb-4 text-xl font-semibold">{category.title}</h2>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {category.recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            title={recipe.title}
            description={recipe.description ?? ""}
            imageSrc={recipe.imageUrl ?? "/images/placeholder.jpg"}
            imageAlt={`A photo of ${recipe.title}`}
            rating={recipe.rating ? Number(recipe.rating) : undefined}
            reviewCount={recipe.ratingCount}
            prepTime={recipe.timeMinutes ? `${recipe.timeMinutes} min` : ""}
            dietaryTags={getDietaryTags(recipe.dietaryTags)}
            allergens={getAllergenTags(recipe.allergens)}
          />
        ))}
      </div>
    </section>
  );
}
