import clsx from "clsx";
import type { FC } from "react";
import { Icon, type SvgIconComponent } from "@/components/Icon";

/**
 * Badge component — flexible variant system for labels and icons.
 *
 * **Green** variant: pill shape with a coloured background, intended for
 * dietary / lifestyle labels (e.g. "Vegan", "Gluten-free"). Requires icon
 * and label.
 *
 * **Grey** variant: can render as a pill with text (e.g. time chip), a circle
 * with just an icon (e.g. allergen), or a pill with both text and icon.
 *
 * @example
 * // Green — dietary label
 * <Badge variant="green" icon={Leaf} label="Vegan" />
 *
 * // Grey — allergen icon only
 * <Badge variant="grey" icon={Wheat} iconAlt="Contains wheat" />
 *
 * // Grey — time chip (text only)
 * <Badge variant="grey" label="30 min" />
 */

export type BadgeVariant = "green" | "grey";

export interface BadgeProps {
	/** Visual variant. */
	variant: "green" | "grey";
	/** Visible text label. */
	label?: string;
	/** Icon component. */
	icon?: SvgIconComponent;
	/** Accessible label for the icon (used as aria-label when no visible text is present). */
	iconAlt?: string;
	/** Additional CSS classes. */
	className?: string;
}

/** Styling configuration for each badge variant. */
const VARIANT_CONFIG: Record<
	BadgeVariant,
	{ border: string; bg: string; text: string }
> = {
	green: {
		border: "border-primary-200",
		bg: "bg-primary-100",
		text: "text-primary-700",
	},
	grey: {
		border: "border-neutral-200",
		bg: "bg-neutral-50",
		text: "text-neutral-700",
	},
};

export const Badge: FC<BadgeProps> = ({
	variant,
	icon,
	label,
	iconAlt,
	className,
}) => {
	const config = VARIANT_CONFIG[variant];
	const isIconOnly = icon && !label;

	return (
		<span
			className={clsx(
				"inline-flex items-center border",
				config.border,
				isIconOnly && "size-7 rounded-full justify-center",
				!isIconOnly && ["gap-1.5 h-7 px-2.5 rounded-full", config.bg],
				className,
			)}
			role="img"
			aria-label={iconAlt ?? label}
		>
			{icon && (
				<span
					className={clsx(
						"shrink-0 flex items-center justify-center",
						config.text,
					)}
					aria-hidden="true"
				>
					<Icon icon={icon} size="xs" className="w-3.5 h-3.5" />
				</span>
			)}
			{label && (
				<span
					className={clsx(
						"text-[12px] leading-4.5 tracking-[-0.08px] font-normal whitespace-nowrap font-sans",
						config.text,
					)}
				>
					{label}
				</span>
			)}
		</span>
	);
};

export default Badge;
