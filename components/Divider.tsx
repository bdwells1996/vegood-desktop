import { clsx } from "clsx";
import type { FC } from "react";

interface DividerProps {
	className?: string;
}

export const Divider: FC<DividerProps> = ({ className }) => (
	<div
		className={clsx("h-px w-full bg-neutral-200", className)}
		aria-hidden="true"
	/>
);
