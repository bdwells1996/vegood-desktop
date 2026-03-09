"use client";

import { Clock } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { type FC, useState } from "react";
import { Badge } from "@/app/components/Badge";
import { CollapserChip } from "@/app/components/CollapserChip";
import { StarRating } from "@/app/components/StarRating";
import { Divider } from "@/components/Divider";
import type { SvgIconComponent } from "@/components/Icon";

// ─── Dietary tag ──────────────────────────────────────────────────────────────

export interface DietaryTag {
	/** Short label shown on the badge, e.g. "Vegan". */
	label: string;
	/** Icon component (renders via the Icon component). */
	icon: SvgIconComponent;
	/** Accessible description of the icon if different from the label. */
	iconAlt?: string;
}

// ─── Allergen ─────────────────────────────────────────────────────────────────

export interface AllergenTag {
	/** Accessible name, e.g. "Contains gluten". */
	label: string;
	/** Icon component (renders via the Icon component). */
	icon: SvgIconComponent;
}

// ─── RecipeCard props ─────────────────────────────────────────────────────────

export interface RecipeCardProps {
	/** Recipe title displayed as the card heading. */
	title: string;
	/** Short description (2–3 lines recommended). */
	description: string;
	/**
	 * URL for the recipe hero image.
	 * Passed directly to Next.js `<Image>` so it must be an allowed domain
	 * in `next.config.ts`, or a local `/public` path.
	 */
	imageSrc: string;
	/** Alt text for the hero image — describe the dish, not the page. */
	imageAlt: string;
	/** Numeric star rating between 0 and 5. Supports decimals (e.g. 4.6). Optional. */
	rating?: number;
	/** Human-readable review count shown next to the stars, e.g. 876. */
	reviewCount: number;
	/** Preparation time label shown in the top-right chip, e.g. "30 min". */
	prepTime: string;
	/**
	 * Dietary / lifestyle badges rendered with the green Badge variant.
	 * Typically 1–3 tags such as "Vegan", "Gluten-free", "Raw".
	 */
	dietaryTags?: DietaryTag[];
	/**
	 * Allergen icon badges rendered with the grey Badge variant below
	 * the dietary tags. Displayed in a horizontal row with an "ALLERGENS" label.
	 */
	allergens?: AllergenTag[];
	/**
	 * Optional URL to navigate to when the card is clicked.
	 * When provided, the card becomes a clickable link.
	 */
	href?: string;
}

const VISIBLE_TAG_COUNT = 3;

/**
 * RecipeCard — displays a recipe with image, title, rating, description,
 * dietary labels, and allergen icons.
 *
 * When more than 2 dietary tags are present a CollapserChip is rendered
 * that expands/collapses the remaining tags. The card height animates
 * smoothly using Motion's layout animation.
 */
export const RecipeCard: FC<RecipeCardProps> = ({
	title,
	description,
	imageSrc,
	imageAlt,
	rating,
	reviewCount,
	prepTime,
	dietaryTags = [],
	allergens = [],
	href,
}) => {
	const [isExpanded, setIsExpanded] = useState(false);

	const formattedRating = rating?.toFixed(1);
	const formattedReviewCount = reviewCount.toLocaleString();

	const hasOverflow = dietaryTags.length > VISIBLE_TAG_COUNT;
	const visibleTags =
		hasOverflow && !isExpanded
			? dietaryTags.slice(0, VISIBLE_TAG_COUNT)
			: dietaryTags;
	const hiddenCount = dietaryTags.length - VISIBLE_TAG_COUNT;

	const article = (
		<motion.article
			layout
			transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
			className="
        relative flex flex-col overflow-hidden
        w-full
        rounded-xl
        bg-background
        shadow-card-md
        border border-border
        hover:shadow-none transition-shadow
      "
			aria-label={title}
		>
			{/* ── Hero image ──────────────────────────────────────────────────── */}
			<div className="relative h-50 w-full shrink-0 overflow-hidden">
				<Image
					src={imageSrc}
					alt={imageAlt}
					fill
					className="object-cover"
					sizes="283px"
					priority={false}
				/>

				{/* Time chip — top-right overlay */}
				<Badge
					variant="grey"
					label={prepTime}
					className="absolute top-3 right-3 shadow-sm"
					icon={Clock}
				/>
			</div>

			{/* ── Content body ─────────────────────────────────────────────────── */}
			<div className="flex flex-col pl-4 pr-4 py-4 flex-1">
				{/* Title + Rating row */}
				<div className="flex flex-col gap-1">
					<h3
						className="
              text-[16px] leading-6 font-medium
              tracking-[-0.4625px]
              text-content-primary
              whitespace-nowrap overflow-hidden text-ellipsis
              font-sans
            "
					>
						{title}
					</h3>

					{rating !== undefined && (
						<div className="flex items-center gap-1.5">
							<StarRating rating={rating} />
							<span
								className="text-[12px] leading-4.5 font-normal tracking-[-0.08px] text-content-tertiary whitespace-nowrap font-sans"
								aria-hidden="true"
							>
								{formattedRating} ({formattedReviewCount})
							</span>
						</div>
					)}
				</div>

				{/* Description */}
				<p
					className="
            text-[13px] leading-5 font-normal
            tracking-[-0.1562px]
            text-content-secondary
            line-clamp-2
            font-sans
          "
				>
					{description}
				</p>

				{/* Dietary tags — green Badge variant */}
				{dietaryTags.length > 0 && (
					<div className="flex flex-wrap gap-1.5 mt-3 mb-4">
						{visibleTags.map((tag) => (
							<Badge
								key={tag.label}
								variant="green"
								icon={tag.icon}
								label={tag.label}
								iconAlt={tag.iconAlt}
							/>
						))}
						{hasOverflow && (
							<CollapserChip
								count={hiddenCount}
								isExpanded={isExpanded}
								onToggle={() => setIsExpanded((prev) => !prev)}
							/>
						)}
					</div>
				)}

				<Divider className="mt-auto" />

				{/* Allergens — grey Badge variant with section label or "Allergen free" */}
				<div className="flex items-center gap-2 mt-2">
					<span
						className="
              text-[11px] leading-[16.5px] font-normal
              tracking-[1.0645px] uppercase
              text-content-tertiary
              whitespace-nowrap
              font-sans
              min-h-7
              flex
              items-center
            "
					>
						{allergens.length > 0 ? "Allergens" : "Allergen free"}
					</span>
					{allergens.length > 0 && (
						<ul className="flex items-center gap-1" aria-label="Allergens">
							{allergens.map((allergen) => (
								<li key={allergen.label}>
									<Badge
										variant="grey"
										icon={allergen.icon}
										iconAlt={allergen.label}
									/>
								</li>
							))}
						</ul>
					)}
				</div>
			</div>
		</motion.article>
	);

	if (href) {
		return (
			<Link href={href} className="block">
				{article}
			</Link>
		);
	}

	return article;
};

export default RecipeCard;
