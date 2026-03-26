import Image from "next/image";
import type { FC } from "react";
import type { RecipeDetail } from "@/db/queries/recipes";
import { getIngredientImageUrl } from "@/lib/images";

interface IngredientsListProps {
	steps: RecipeDetail["steps"];
}

interface AggregatedIngredient {
	id: string;
	name: string;
	imageUrl: string | null;
	quantities: string[];
}

function aggregateIngredients(
	steps: RecipeDetail["steps"],
): AggregatedIngredient[] {
	const map = new Map<string, AggregatedIngredient>();

	for (const step of steps) {
		for (const si of step.stepIngredients) {
			const { ingredient, quantity, unit } = si;
			if (!map.has(ingredient.id)) {
				map.set(ingredient.id, {
					id: ingredient.id,
					name: ingredient.name,
					imageUrl: getIngredientImageUrl(ingredient.imageUrl),
					quantities: [],
				});
			}
			if (quantity) {
				const label = unit ? `${quantity} ${unit}` : quantity;
				map.get(ingredient.id)!.quantities.push(label);
			}
		}
	}

	return [...map.values()];
}

export const IngredientsList: FC<IngredientsListProps> = ({ steps }) => {
	const ingredients = aggregateIngredients(steps);

	if (ingredients.length === 0) return null;

	return (
		<section aria-labelledby="ingredients-heading">
			<h2
				id="ingredients-heading"
				className="text-xl font-semibold tracking-tight text-content-primary mb-4"
			>
				Ingredients
			</h2>
			<ul className="grid grid-cols-1 sm-plus:grid-cols-2 md:grid-cols-3 gap-3">
				{ingredients.map((ingredient) => (
					<li
						key={ingredient.id}
						className="flex items-center gap-3 rounded-xl border border-border bg-background p-3"
					>
						{ingredient.imageUrl ? (
							<div className="relative size-12 shrink-0 rounded-lg overflow-hidden">
								<Image
									src={ingredient.imageUrl}
									alt={ingredient.name}
									fill
									className="object-cover"
									sizes="48px"
								/>
							</div>
						) : (
							<div className="size-12 shrink-0 rounded-lg bg-neutral-100 flex items-center justify-center text-xl">
								🥗
							</div>
						)}
						<div className="min-w-0">
							<p className="text-sm font-medium text-content-primary truncate capitalize">
								{ingredient.name}
							</p>
							{ingredient.quantities.length > 0 && (
								<p className="text-xs text-content-tertiary truncate">
									{ingredient.quantities.join(", ")}
								</p>
							)}
						</div>
					</li>
				))}
			</ul>
		</section>
	);
};
