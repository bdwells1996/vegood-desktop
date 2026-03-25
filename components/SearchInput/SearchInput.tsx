"use client";

import { Search, X } from "lucide-react";
import { Icon } from "@/components/Icon";

interface SearchInputProps {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
}

export function SearchInput({
	value,
	onChange,
	placeholder = "Search recipes…",
}: SearchInputProps) {
	return (
		<div className="flex w-ful gap-2 items-center justify-between rounded-lg border border-border bg-background py-2 px-4 text-sm text-content-primary placeholder:text-content-secondary focus:outline-none focus:ring-2 focus:ring-primary-500 md:w-[300px]">
			<input
				id="search"
				name="search"
				type="text"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder={placeholder}
				className="flex-1"
			/>

			{value ? (
				<button
					type="button"
					onClick={() => onChange("")}
					className="rounded text-content-secondary cursor-pointer hover:text-content-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
					aria-label="Clear search"
				>
					<Icon icon={X} size="xs" aria-hidden />
				</button>
			) : (
				<Icon
					icon={Search}
					size="xs"
					className="text-content-secondary"
					aria-hidden
				/>
			)}
		</div>
	);
}
