import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { DashboardCalendarSection } from "./components/DashboardCalendarSection";
import { DashboardGreeting } from "./components/DashboardGreeting";
import { getWeekMealPlan } from "./queries";

export default async function DashboardPage() {
	const session = await auth();

	if (!session?.user) {
		redirect("/login");
	}

	const weekPlan = await getWeekMealPlan(session.user.id);

	const today = new Date();
	const initialSelectedDay =
		weekPlan.find(
			(d) =>
				d.date.getFullYear() === today.getFullYear() &&
				d.date.getMonth() === today.getMonth() &&
				d.date.getDate() === today.getDate(),
		) ??
		weekPlan[0] ??
		null;

	return (
		<div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
			<div className="mb-8">
				<DashboardGreeting firstName={session.user.firstName} />
				<p className="mt-1 text-body text-content-secondary">
					Here&apos;s your meal plan for the week.
				</p>
			</div>

			<DashboardCalendarSection
				weekPlan={weekPlan}
				initialSelectedDay={initialSelectedDay}
			/>
		</div>
	);
}
