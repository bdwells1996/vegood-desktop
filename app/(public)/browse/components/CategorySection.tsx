"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { RecipeCard } from "@/app/components/RecipeCard";
import { getAllergenTags, getDietaryTags } from "@/app/lib/recipe-tag-icons";
import { Icon } from "@/components/Icon";
import type { CategoryWithRecipes } from "@/db/queries/recipes";

interface CategorySectionProps {
	category: CategoryWithRecipes;
	cardsPerRow?: number;
	showAllCards?: boolean;
}

export function CategorySection({
	category,
	cardsPerRow = 4,
	showAllCards = false,
}: CategorySectionProps) {
	if (category.recipes.length === 0) return null;

	const displayCount = showAllCards
		? category.recipes.length
		: Math.min(category.recipes.length, cardsPerRow);

	return (
		<section>
			<div className="mb-4 flex items-baseline justify-between content-center">
				<h2 className="text-xl font-semibold">{category.title}</h2>
				<Link
					href={`/browse?category=${category.slug}`}
					className="text-sm text-primary-600 hover:text-primary-700 transition-colors flex"
				>
					View all{" "}
					<span className="text-content-secondary font-medium ml-1">
						({category.recipes.length})
					</span>
					<Icon icon={ChevronRight} />
				</Link>
			</div>
			<div className="grid grid-cols-1 sm-plus:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
				{category.recipes.slice(0, displayCount).map((recipe) => (
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
