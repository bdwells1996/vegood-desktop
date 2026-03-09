"use client";

interface SearchInputProps {
	value: string;
	onChange: (value: string) => void;
}

export function SearchInput({ value, onChange }: SearchInputProps) {
	return (
		<div className="relative w-full max-w-md">
			<input
				type="text"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder="Search recipes…"
				className="w-full rounded-lg border border-border-primary bg-surface-primary px-4 py-2 pr-9 text-sm text-content-primary placeholder:text-content-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500"
			/>
			{value && (
				<button
					type="button"
					onClick={() => onChange("")}
					className="absolute right-2 top-1/2 -translate-y-1/2 text-content-tertiary hover:text-content-primary transition-colors"
					aria-label="Clear search"
				>
					×
				</button>
			)}
		</div>
	);
}
