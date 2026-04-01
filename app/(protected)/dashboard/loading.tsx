import { Skeleton } from "@/app/components/Skeleton";

function CalendarViewSkeleton() {
	return (
		<div className="flex flex-col gap-4">
			{/* Header row */}
			<div className="flex items-center justify-between">
				<Skeleton className="h-8 w-32" />
				<div className="flex items-center gap-3">
					<Skeleton className="h-5 w-20" />
					<Skeleton className="h-5 w-24" />
				</div>
			</div>

			{/* 7-column calendar grid */}
			<div className="grid grid-cols-7 gap-1 md:gap-2">
				{Array.from({ length: 7 }).map((_, i) => (
					<div
						// biome-ignore lint/suspicious/noArrayIndexKey: static skeleton
						key={i}
						className="flex flex-col items-center gap-1 rounded-xl bg-background-secondary p-2 md:gap-3 md:p-3"
					>
						{/* Day label + date number */}
						<div className="flex flex-col items-center gap-0.5">
							<Skeleton className="h-2.5 w-6" />
							<Skeleton className="h-5 w-5 rounded-full md:h-7 md:w-7" />
						</div>
						{/* Status circle — desktop only */}
						<Skeleton className="hidden md:block size-12 rounded-full" />
						{/* Meal icons row — desktop only */}
						<div className="hidden md:flex gap-1.5">
							<Skeleton className="size-3 rounded-sm" />
							<Skeleton className="size-3 rounded-sm" />
							<Skeleton className="size-3 rounded-sm" />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

function MealRowSkeleton() {
	return (
		<div className="flex items-center gap-4 p-4">
			<Skeleton className="size-9 shrink-0 rounded-full" />
			<div className="flex flex-1 flex-col gap-1.5">
				<Skeleton className="h-3 w-16" />
				<Skeleton className="h-4 w-40" />
			</div>
			<Skeleton className="h-4 w-14 shrink-0" />
		</div>
	);
}

function DayDetailPanelSkeleton() {
	return (
		<div className="rounded-xl bg-background-secondary p-5 shadow-sm">
			{/* Panel header */}
			<div className="mb-4 flex items-center justify-between">
				<div className="flex flex-col gap-1.5">
					<Skeleton className="h-6 w-28" />
					<Skeleton className="h-3.5 w-20" />
				</div>
				<Skeleton className="size-8 rounded-full" />
			</div>

			{/* Meal rows */}
			<div className="flex flex-col gap-2">
				<MealRowSkeleton />
				<MealRowSkeleton />
				<MealRowSkeleton />
			</div>
		</div>
	);
}

export default function DashboardLoading() {
	return (
		<div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
			{/* Greeting block */}
			<div className="mb-8">
				<Skeleton className="h-10 w-72" />
				<Skeleton className="mt-2 h-5 w-56" />
			</div>

			{/* Calendar section */}
			<div className="flex flex-col gap-4 ">
				<CalendarViewSkeleton />
				<DayDetailPanelSkeleton />
			</div>
		</div>
	);
}
