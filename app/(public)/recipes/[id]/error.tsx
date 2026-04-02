"use client";

import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { EmptyState } from "@/app/components/EmptyState";
import { Button } from "@/components";

export default function RecipeError({
	error,
}: {
	error: Error & { digest?: string };
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className="flex flex-col items-center gap-3">
			<EmptyState
				icon={AlertCircle}
				heading="Something went wrong"
				description="We couldn't load this recipe. Please try again."
			/>
			<div className="flex gap-3">
				<Link href="/browse">
					<Button tabIndex={-1}>Browse recipes</Button>
				</Link>
			</div>
		</div>
	);
}
