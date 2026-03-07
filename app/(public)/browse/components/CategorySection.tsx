import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { RecipeCard } from "@/app/components/RecipeCard";
import { getAllergenTags, getDietaryTags } from "@/app/lib/recipe-tag-icons";
import { Icon } from "@/components/Icon";
import type { CategoryWithRecipes } from "@/db/queries/recipes";

interface CategorySectionProps {
	category: CategoryWithRecipes;
}

export function CategorySection({ category }: CategorySectionProps) {
	if (category.recipes.length === 0) return null;

	return (
		<section>
			<div className="mb-4 flex items-baseline justify-between content-center">
				<h2 className="text-xl font-semibold">{category.title}</h2>
				<Link
					href={`/browse?category=${category.slug}`}
					className="text-sm text-primary-700 hover:underline flex"
				>
					View all{" "}
					<span className="text-content-secondary ml-1">
						({category.recipes.length})
					</span>
					<Icon icon={ChevronRight} />
				</Link>
			</div>
			<div className="flex gap-4 overflow-x-auto pb-4">
				{category.recipes.slice(0, 4).map((recipe) => (
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
