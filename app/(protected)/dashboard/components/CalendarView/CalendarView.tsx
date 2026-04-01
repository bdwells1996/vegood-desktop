"use client";

import clsx from "clsx";
import { CalendarDays } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/Icon";
import { CalendarViewItem } from "./CalendarViewItem";
import type { DayPlan } from "./calendarView.types";

interface CalendarViewProps {
	weekPlan: DayPlan[];
	onDaySelect?: (dayPlan: DayPlan) => void;
}

function getTodayIndex(weekPlan: DayPlan[]): number {
	const today = new Date();
	const idx = weekPlan.findIndex(
		(d) =>
			d.date.getFullYear() === today.getFullYear() &&
			d.date.getMonth() === today.getMonth() &&
			d.date.getDate() === today.getDate(),
	);
	return idx >= 0 ? idx : 0;
}

function isToday(date: Date): boolean {
	const today = new Date();
	return (
		date.getFullYear() === today.getFullYear() &&
		date.getMonth() === today.getMonth() &&
		date.getDate() === today.getDate()
	);
}

export function CalendarView({ weekPlan, onDaySelect }: CalendarViewProps) {
	const todayIdx = getTodayIndex(weekPlan);
	const [selectedIdx, setSelectedIdx] = useState(todayIdx);
	const isOnToday = selectedIdx === todayIdx;

	function handleSelect(dayPlan: DayPlan) {
		const idx = weekPlan.indexOf(dayPlan);
		setSelectedIdx(idx);
		onDaySelect?.(dayPlan);
	}

	function handleViewToday() {
		setSelectedIdx(todayIdx);
		onDaySelect?.(weekPlan[todayIdx]);
	}

	return (
		<div className="flex flex-col gap-4">
			{/* Header row */}
			<div className="flex items-center justify-between">
				<h2 className="text-h2 font-semibold text-content-primary">
					This week
				</h2>
				<div className="flex items-center gap-3">
					<button
						type="button"
						onClick={handleViewToday}
						disabled={isOnToday}
						className={clsx(
							"text-body cursor-pointer font-medium transition-colors",
							isOnToday
								? "pointer-events-none opacity-40 text-primary-600"
								: "text-primary-600 hover:text-primary-700",
						)}
					>
						View today
					</button>
					<Link
						href="/meal-plan"
						className="flex items-center gap-1.5 text-body font-medium text-content-secondary transition-colors hover:text-content-primary"
					>
						<Icon icon={CalendarDays} size="sm" aria-hidden />
						Full month
					</Link>
				</div>
			</div>

			{/* Calendar row */}
			<div className="grid grid-cols-7 gap-1 md:gap-2 overflow-x-auto">
				{weekPlan.map((dayPlan, idx) => (
					<CalendarViewItem
						key={dayPlan.date.toISOString()}
						dayPlan={dayPlan}
						isSelected={idx === selectedIdx}
						isToday={isToday(dayPlan.date)}
						onClick={handleSelect}
					/>
				))}
			</div>
		</div>
	);
}
