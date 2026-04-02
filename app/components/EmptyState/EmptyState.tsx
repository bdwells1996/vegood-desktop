import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components";

interface EmptyStateProps {
	icon: LucideIcon;
	heading: string;
	description: string;
	actionLabel?: string;
	actionHref?: string;
}

export function EmptyState({
	icon: Icon,
	heading,
	description,
	actionLabel,
	actionHref,
}: EmptyStateProps) {
	return (
		<div className="flex flex-col items-center justify-center gap-4 py-24 px-4 text-center">
			<div className="flex size-14 items-center justify-center rounded-full bg-neutral-100">
				<Icon className="size-7 text-content-tertiary" />
			</div>
			<div className="flex flex-col gap-1.5 ">
				<h2 className="text-lg font-semibold tracking-tight text-content-primary">
					{heading}
				</h2>
				<p className="text-sm text-content-secondary">{description}</p>
			</div>
			{actionLabel && actionHref && (
				<Link href={actionHref}>
					<Button variant="primary" tabIndex="-1">
						{actionLabel}
					</Button>
				</Link>
			)}
		</div>
	);
}
