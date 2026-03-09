import { Suspense } from "react";
import { getRecipesByCategory } from "@/db/queries/recipes";
import { BrowseView } from "./components/BrowseView";

export default async function BrowsePage() {
	const [categories] = await Promise.all([getRecipesByCategory()]);

	return (
		<div className="mx-auto max-w-6xl p-8">
			<Suspense>
				<BrowseView categories={categories} />
			</Suspense>
		</div>
	);
}
