import { Skeleton } from "@/app/components/Skeleton/Skeleton";

function RecipeCardSkeleton() {
	return (
		<div className="flex flex-col overflow-hidden rounded-xl border border-border shadow-card-md bg-background">
			{/* Hero image */}
			<Skeleton className="h-50 w-full rounded-none" />

			{/* Content body */}
			<div className="flex flex-col pl-4 pr-4 py-4 gap-2 flex-1">
				{/* Title */}
				<Skeleton className="h-5 w-3/4" />
				{/* Rating */}
				<Skeleton className="h-4 w-1/2" />
				{/* Description */}
				<Skeleton className="h-4 w-full mt-1" />
				<Skeleton className="h-4 w-5/6" />
				{/* Tags */}
				<div className="flex gap-1.5 mt-2">
					<Skeleton className="h-6 w-16" />
					<Skeleton className="h-6 w-20" />
				</div>
				{/* Divider + allergens */}
				<Skeleton className="h-px w-full mt-auto" />
				<Skeleton className="h-7 w-24 mt-2" />
			</div>
		</div>
	);
}

function CategorySectionSkeleton({ cardCount = 4 }: { cardCount?: number }) {
	return (
		<section>
			<div className="mb-4 flex items-baseline justify-between">
				<Skeleton className="h-6 w-40" />
				<Skeleton className="h-4 w-16" />
			</div>
			<div className="grid grid-cols-1 sm-plus:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
				{Array.from({ length: cardCount }).map((_, i) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
					<RecipeCardSkeleton key={i} />
				))}
			</div>
		</section>
	);
}

export function BrowseViewSkeleton() {
	return (
		<>
			{/* Breadcrumb */}
			<Skeleton className="h-5 w-32 mb-6" />

			{/* Toolbar / search */}
			<Skeleton className="h-10 w-full mb-10" />

			{/* Category sections */}
			<div className="flex flex-col gap-10">
				<CategorySectionSkeleton cardCount={4} />
				<CategorySectionSkeleton cardCount={4} />
				<CategorySectionSkeleton cardCount={4} />
			</div>
		</>
	);
}
