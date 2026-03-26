import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { getRecipeDetail, getRecipeRatingSummary } from "@/db/queries/recipes";
import { IngredientsList } from "./components/IngredientsList";
import { RecipeHeader } from "./components/RecipeHeader";

export default async function RecipePage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const [recipe, ratingSummary] = await Promise.all([
		getRecipeDetail(id),
		getRecipeRatingSummary(id),
	]);

	if (!recipe) notFound();

	return (
		<div className="mx-auto max-w-6xl px-4 py-8 flex flex-col gap-8 sm-plus:gap-10">
			<Link
				href="/browse"
				className="inline-flex items-center gap-1.5 text-sm text-content-secondary hover:text-content-primary transition-colors w-fit"
			>
				<ChevronLeft className="size-4" />
				Back to recipe
			</Link>
			<RecipeHeader recipe={recipe} ratingSummary={ratingSummary} />

			<IngredientsList steps={recipe.steps} />

			{/* Steps overview */}
			{recipe.steps.length > 0 && (
				<section aria-labelledby="steps-heading">
					<h2
						id="steps-heading"
						className="text-xl font-semibold tracking-tight text-content-primary mb-4"
					>
						Method
					</h2>
					<ol className="flex flex-col gap-4">
						{recipe.steps.map((step) => (
							<li
								key={step.id}
								className="flex gap-4 bg-neutral-50 p-4 rounded-md"
							>
								<span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-700 text-sm font-semibold">
									{step.stepNumber}
								</span>
								<p className="text-sm text-content-primary leading-relaxed pt-0.5">
									{step.instruction}
								</p>
							</li>
						))}
					</ol>
				</section>
			)}

			{/* Start cooking CTA */}
			{recipe.steps.length > 0 && (
				<div className="flex flex-col gap-4 justify-center items-center md:flex-row">
					<p>Want a more focused view?</p>
					<Link
						href={`/recipes/${recipe.id}/cook`}
						className="inline-flex items-center gap-2  rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 transition-colors"
					>
						Start Cooking
						<ChevronRight className="size-4" />
					</Link>
				</div>
			)}
		</div>
	);
}
