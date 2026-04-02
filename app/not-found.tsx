import { MapPin } from "lucide-react";
import { EmptyState } from "@/app/components/EmptyState";

export default function NotFound() {
	return (
		<EmptyState
			icon={MapPin}
			heading="Page not found"
			description="The page you're looking for doesn't exist or has been moved."
			actionLabel="Go home"
			actionHref="/"
		/>
	);
}
