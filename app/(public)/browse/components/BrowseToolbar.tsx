import { SearchInput } from "@/components/SearchInput/SearchInput";

interface BrowseToolbarProps {
	searchValue: string;
	onSearchChange: (value: string) => void;
}

export function BrowseToolbar({
	searchValue,
	onSearchChange,
}: BrowseToolbarProps) {
	return (
		<div className="flex items-center gap-4 rounded-lg bg-primary-50 px-4 py-3 mb-8">
			<SearchInput value={searchValue} onChange={onSearchChange} />
		</div>
	);
}
