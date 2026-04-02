"use client";

import { ChefHat } from "lucide-react";
import { useEffect } from "react";
import { EmptyState } from "@/app/components/EmptyState";

export default function BrowseError({
	error,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<EmptyState
			icon={ChefHat}
			heading="Couldn't load recipes"
			description="There was a problem fetching the recipe list. Please try again."
			actionLabel="Try again"
			actionHref="/browse"
		/>
	);
}
