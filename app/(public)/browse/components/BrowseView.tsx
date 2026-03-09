"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { CategoryWithRecipes } from "@/db/queries/recipes";
import { CategorySection } from "./CategorySection";

interface BrowseViewProps {
	categories: CategoryWithRecipes[];
	isAuthenticated: boolean;
}

export function BrowseView({ categories }: BrowseViewProps) {
	const searchParams = useSearchParams();
	const selectedSlug = searchParams.get("category");
	const selectedCategory = selectedSlug
		? (categories.find((c) => c.slug === selectedSlug) ?? null)
		: null;

	return (
		<>
			<div className="mb-8 flex items-center justify-between">
				<div className="flex items-center gap-3">
					{selectedCategory && (
						<>
							<Link
								href="/browse"
								className="text-sm text-content-tertiary hover:text-content-primary transition-colors"
							>
								Browse
							</Link>
							<span className="text-content-tertiary">/</span>
						</>
					)}
					<h1 className="text-3xl font-bold">
						{selectedCategory ? selectedCategory.title : "Browse Recipes"}
					</h1>
				</div>
			</div>

			{selectedCategory ? (
				<CategorySection category={selectedCategory} showAllCards />
			) : (
				<div className="flex flex-col gap-10">
					{categories.map((category) => (
						<CategorySection
							key={category.id}
							category={category}
							showAllCards={false}
						/>
					))}
				</div>
			)}
		</>
	);
}
