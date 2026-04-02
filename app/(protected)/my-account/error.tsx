"use client";

import { UserCircle } from "lucide-react";
import { useEffect } from "react";
import { EmptyState } from "@/app/components/EmptyState";

export default function MyAccountError({
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
			icon={UserCircle}
			heading="Couldn't load your profile"
			description="There was a problem fetching your account details. Please try again."
			actionLabel="Try again"
			actionHref="/my-account"
		/>
	);
}
