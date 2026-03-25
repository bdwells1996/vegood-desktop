"use client";

import { useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import type { CategoryWithRecipes } from "@/db/queries/recipes";
import { CategorySection } from "./CategorySection";
import { BrowseToolbar } from "./BrowseToolbar";

interface BrowseViewProps {
	categories: CategoryWithRecipes[];
	initialCategory?: string | null;
}

export function BrowseView({
	categories,
	initialCategory = null,
}: BrowseViewProps) {
	const [selectedCategorySlug, setSelectedCategorySlug] = useState<
		string | null
	>(initialCategory);
	const [searchTerm, setSearchTerm] = useState("");
	const [debouncedSearch] = useDebounce(searchTerm, 300);

	function selectCategory(slug: string) {
		setSelectedCategorySlug(slug);
		setSearchTerm("");
		window.history.replaceState(null, "", `/browse?category=${slug}`);
	}

	function clearCategory() {
		setSelectedCategorySlug(null);
		setSearchTerm("");
		window.history.replaceState(null, "", "/browse");
	}

	const selectedCategory = selectedCategorySlug
		? (categories.find((c) => c.slug === selectedCategorySlug) ?? null)
		: null;

	const filteredCategories = useMemo(() => {
		const term = debouncedSearch.toLowerCase();

		if (selectedCategorySlug) {
			const cat = categories.find((c) => c.slug === selectedCategorySlug);
			if (!cat) return [];
			return [
				{
					...cat,
					recipes: term
						? cat.recipes.filter((r) => r.title.toLowerCase().includes(term))
						: cat.recipes,
				},
			];
		}

		return categories
			.map((cat) => ({
				...cat,
				recipes: term
					? cat.recipes.filter((r) => r.title.toLowerCase().includes(term))
					: cat.recipes,
			}))
			.filter((cat) => cat.recipes.length > 0);
	}, [categories, selectedCategorySlug, debouncedSearch]);

	return (
		<>
			<div className="mb-6 flex items-center gap-3">
				{selectedCategory && (
					<>
						<button
							type="button"
							onClick={clearCategory}
							className="text-sm text-content-tertiary hover:text-content-primary transition-colors"
						>
							Browse
						</button>
						<span className="text-content-tertiary">/</span>
					</>
				)}
				<h1 className="text-3xl font-semibold">
					{selectedCategory ? selectedCategory.title : "Browse Recipes"}
				</h1>
			</div>

			<BrowseToolbar searchValue={searchTerm} onSearchChange={setSearchTerm} />

			{filteredCategories.length === 0 && debouncedSearch ? (
				<p className="text-content-secondary">
					No recipes found for &lsquo;{debouncedSearch}&rsquo;
				</p>
			) : selectedCategory ? (
				<CategorySection category={filteredCategories[0]} showAllCards />
			) : (
				<div className="flex flex-col gap-10">
					{filteredCategories.map((category) => (
						<CategorySection
							key={category.id}
							category={category}
							showAllCards={false}
							onViewAll={selectCategory}
						/>
					))}
				</div>
			)}
		</>
	);
}
