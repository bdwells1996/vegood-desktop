import { BookOpen } from "lucide-react";
import { EmptyState } from "@/app/components/EmptyState";

export default function RecipeNotFound() {
	return (
		<EmptyState
			icon={BookOpen}
			heading="This recipe seems to be missing"
			description="It may have been removed or the link might be incorrect."
			actionLabel="Browse recipes"
			actionHref="/browse"
		/>
	);
}
