"use client";

import { CalendarDays } from "lucide-react";
import { useEffect } from "react";
import { EmptyState } from "@/app/components/EmptyState";

export default function DashboardError({
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
			icon={CalendarDays}
			heading="Couldn't load your meal plan"
			description="There was a problem fetching your dashboard. Please try again."
			actionLabel="Try again"
			actionHref="/dashboard"
		/>
	);
}
