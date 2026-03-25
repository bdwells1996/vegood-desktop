import { Suspense } from "react";
import { getRecipesByCategory } from "@/db/queries/recipes";
import { BrowseView } from "./components/BrowseView";

export default async function BrowsePage({
	searchParams,
}: {
	searchParams: Promise<{ category?: string }>;
}) {
	const [categories, params] = await Promise.all([
		getRecipesByCategory(),
		searchParams,
	]);

	return (
		<div className="mx-auto max-w-6xl p-8">
			<Suspense>
				<BrowseView
					categories={categories}
					initialCategory={params.category ?? null}
				/>
			</Suspense>
		</div>
	);
}
