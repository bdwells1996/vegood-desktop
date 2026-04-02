import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidUUID } from "@/app/lib/validation";
import { getRecipeDetail } from "@/db/queries/recipes";
import { StepNavigator } from "./components/StepNavigator";

export default async function CookModePage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	if (!isValidUUID(id)) notFound();
	const recipe = await getRecipeDetail(id);

	if (!recipe) notFound();
	if (recipe.steps.length === 0) notFound();

	return (
		<div className="mx-auto max-w-6xl px-4 py-8 flex flex-col gap-6">
			{/* Back link */}
			<Link
				href={`/recipes/${recipe.id}`}
				className="inline-flex items-center gap-1.5 text-sm text-content-secondary hover:text-content-primary transition-colors w-fit"
			>
				<ChevronLeft className="size-4" />
				Back to recipe
			</Link>

			<div>
				<p className="text-xs font-medium uppercase tracking-widest text-content-tertiary mb-1">
					Cooking mode
				</p>
				<h1 className="text-2xl font-semibold tracking-tight text-content-primary">
					{recipe.title}
				</h1>
			</div>

			<StepNavigator recipeId={recipe.id} steps={recipe.steps} />
		</div>
	);
}
