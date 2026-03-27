"use client";

import { Plus, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { DAY_LABELS_LONG, MEAL_SLOT_CONFIG, MONTH_LABELS } from "../CalendarView/calendarView.config";
import type { MealSlotConfig } from "../CalendarView/calendarView.config";
import type { DayPlan, PlannedMeal } from "../CalendarView/calendarView.types";


interface DayDetailPanelProps {
	dayPlan: DayPlan;
	onClose: () => void;
}

interface MealRowProps {
	config: MealSlotConfig;
	meal: PlannedMeal | null;
}

function MealRow({ config: { label, icon }, meal }: MealRowProps) {
	return (
		<div className="flex items-center gap-4 rounded-lg border border-border p-4">
			<div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-background-secondary text-content-secondary overflow-hidden">
				{meal?.imageUrl ? (
					<Image
						src={meal.imageUrl}
						alt={meal.name}
						width={36}
						height={36}
						className="size-9 rounded-full object-cover"
					/>
				) : (
					<Icon icon={icon} size="sm" aria-hidden />
				)}
			</div>
			<div className="flex flex-1 flex-col gap-0.5 min-w-0">
				<span className="text-caption font-medium uppercase tracking-wide text-content-tertiary">
					{label}
				</span>
				{meal ? (
					<span className="text-body font-medium text-content-primary truncate">
						{meal.name}
					</span>
				) : (
					<span className="text-body text-content-tertiary">Not planned</span>
				)}
			</div>
			<Link
				href="/meal-plan"
				className="flex shrink-0 items-center gap-1 text-caption font-medium text-primary-600 hover:text-primary-700 transition-colors"
				aria-label={
					meal ? `Change ${label.toLowerCase()}` : `Add ${label.toLowerCase()}`
				}
			>
				<Icon icon={Plus} size="xs" aria-hidden />
				{meal ? "Change" : "Add"}
			</Link>
		</div>
	);
}

export function DayDetailPanel({ dayPlan, onClose }: DayDetailPanelProps) {
	const dayIdx = (dayPlan.date.getDay() + 6) % 7;
	const dayLabel = DAY_LABELS_LONG[dayIdx];
	const dateNum = dayPlan.date.getDate();
	const monthLabel = MONTH_LABELS[dayPlan.date.getMonth()];

	return (
		<div className="rounded-xl border border-border bg-background p-5 shadow-sm animate-in slide-in-from-top-2 duration-200">
			{/* Panel header */}
			<div className="mb-4 flex items-center justify-between">
				<div>
					<h3 className="text-h3 font-semibold text-content-primary">
						{dayLabel}
					</h3>
					<p className="text-caption text-content-tertiary">
						{dateNum} {monthLabel}
					</p>
				</div>
				<button
					type="button"
					onClick={onClose}
					className="flex size-8 items-center justify-center rounded-full text-content-tertiary hover:bg-background-secondary hover:text-content-primary transition-colors"
					aria-label="Close day detail"
				>
					<Icon icon={X} size="sm" aria-hidden />
				</button>
			</div>

			{/* Meal rows */}
			<div className="flex flex-col gap-2">
				{MEAL_SLOT_CONFIG.map((config) => (
					<MealRow
						key={config.slot}
						config={config}
						meal={dayPlan.meals[config.slot]}
					/>
				))}
			</div>
		</div>
	);
}
