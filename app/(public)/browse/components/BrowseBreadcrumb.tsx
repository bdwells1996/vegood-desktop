import { ChevronLeft } from "lucide-react";
import { Icon } from "@/components/Icon";

interface BrowseBreadcrumbProps {
	selectedCategoryTitle?: string | null;
	onClear: () => void;
}

export function BrowseBreadcrumb({
	selectedCategoryTitle,
	onClear,
}: BrowseBreadcrumbProps) {
	return (
		<div className="mb-6 flex items-center gap-2">
			{selectedCategoryTitle ? (
				<>
					<button
						type="button"
						aria-label={`Currently viewing ${selectedCategoryTitle}. Click here to go back and view all recipes.`}
						onClick={onClear}
						className="flex items-center gap-1 text-sm text-content-tertiary cursor-pointer hover:text-content-primary transition-colors"
					>
						<Icon icon={ChevronLeft} size="xs" aria-hidden />
						All recipes
					</button>
					<span className="text-content-tertiary">/</span>
					<span className="text-sm text-content-primary font-medium">
						{selectedCategoryTitle}
					</span>
				</>
			) : (
				<span className="text-sm text-content-primary font-medium">
					Browse Recipes
				</span>
			)}
		</div>
	);
}
