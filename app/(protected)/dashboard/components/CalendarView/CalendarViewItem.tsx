"use client";

import clsx from "clsx";
import { CheckCircle2, CircleDashed, Plus } from "lucide-react";
import { Icon } from "@/components/Icon";
import { DAY_LABELS_SHORT, MEAL_SLOT_CONFIG } from "./calendarView.config";
import type { DayFillState, DayPlan } from "./calendarView.types";

interface CalendarViewItemProps {
	dayPlan: DayPlan;
	isSelected: boolean;
	isToday: boolean;
	onClick: (dayPlan: DayPlan) => void;
}

function getDayFillState(dayPlan: DayPlan): DayFillState {
	const { breakfast, lunch, dinner } = dayPlan.meals;
	const filled = [breakfast, lunch, dinner].filter(Boolean).length;
	if (filled === 3) return "full";
	if (filled > 0) return "partial";
	return "empty";
}



// Border colour on mobile conveys status at a glance.
// On desktop, border reverts to selection/today logic and status is shown via the icon circle.
const mobileBorderByState: Record<DayFillState, string> = {
	full: "border-primary-500",
	partial: "border-warning",
	empty: "border-neutral-200",
};

export function CalendarViewItem({
	dayPlan,
	isSelected,
	isToday,
	onClick,
}: CalendarViewItemProps) {
	const state = getDayFillState(dayPlan);
	const dayIndex = (dayPlan.date.getDay() + 6) % 7; // Mon=0 … Sun=6
	const dayLabel = DAY_LABELS_SHORT[dayIndex];
	const dateNum = dayPlan.date.getDate();

	return (
		<button
			type="button"
			onClick={() => onClick(dayPlan)}
			className={clsx(
				"flex flex-col items-center rounded-xl border-2 transition-all",
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
				// Mobile: compact, status-coloured border, ring shows selection
				"gap-1 p-2",
				mobileBorderByState[state],
				// Desktop: expand layout, border switches to selection/today logic
				"md:gap-3 md:p-3 md:ring-0",
				isSelected
					? "md:border-primary-500 md:shadow-sm"
					: isToday
						? "md:border-primary-300"
						: "md:border-border md:hover:border-neutral-300",
			)}
			aria-pressed={isSelected}
			aria-label={`${dayLabel} ${dateNum} — ${state}`}
		>
			{/* Day label — visible on both breakpoints */}
			<div className="flex flex-col items-center gap-0.5">
				<span
					className={clsx(
						"font-semibold uppercase tracking-widest",
						"text-[9px] md:text-overline",
						isToday ? "text-primary-600" : "text-content-secondary",
					)}
				>
					{dayLabel}
				</span>
				<span
					className={clsx(
						"flex items-center justify-center rounded-full font-medium",
						"size-5 text-[10px] md:size-7 md:text-sm",
						isToday ? "bg-primary-500 text-white" : "text-content-primary",
					)}
				>
					{dateNum}
				</span>
			</div>

			{/* State indicator circle — desktop only */}
			<div
				className={clsx(
					"hidden md:flex size-12 items-center justify-center rounded-full border-2",
					state === "full" && "border-primary-200 bg-primary-100",
					state === "partial" && "border-warning/40 bg-warning/10",
					state === "empty" &&
						"border-dashed border-neutral-300 bg-transparent",
				)}
			>
				{state === "full" && (
					<Icon
						icon={CheckCircle2}
						size="md"
						className="text-primary-600"
						aria-hidden
					/>
				)}
				{state === "partial" && (
					<Icon
						icon={CircleDashed}
						size="md"
						className="text-warning"
						aria-hidden
					/>
				)}
				{state === "empty" && (
					<Icon
						icon={Plus}
						size="md"
						className="text-neutral-400"
						aria-hidden
					/>
				)}
			</div>

			{/* Meal slot icons — desktop only */}
			<div className="hidden md:flex gap-1.5">
				{MEAL_SLOT_CONFIG.map(({ slot, label, icon }) => (
					<Icon
						key={slot}
						icon={icon}
						size="xs"
						aria-label={label}
						className={clsx(
							dayPlan.meals[slot] ? "text-primary-500" : "text-neutral-300",
						)}
					/>
				))}
			</div>
		</button>
	);
}
