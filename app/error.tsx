"use client";

import { AlertCircle } from "lucide-react";
import { useEffect } from "react";
import { EmptyState } from "@/app/components/EmptyState";

export default function GlobalError({
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
			icon={AlertCircle}
			heading="Something went wrong"
			description="An unexpected error occurred. Please try again."
			actionLabel="Try again"
			actionHref="/"
		/>
	);
}
