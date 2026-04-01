import { db } from "@/db";
import { and, eq, gte, lte } from "drizzle-orm";
import { mealPlans, recipes } from "@/db/schema";
import type { DayPlan } from "./components/CalendarView/calendarView.types";

function getWeekDates(): Date[] {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7));
  monday.setHours(0, 0, 0, 0);

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

function toDateString(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export async function getWeekMealPlan(userId: string): Promise<DayPlan[]> {
  if (!userId) throw new Error("userId is required");

  const weekDates = getWeekDates();
  const monday = weekDates[0];
  const sunday = weekDates[6];

  const rows = await db
    .select({
      date: mealPlans.date,
      slot: mealPlans.slot,
      recipeId: mealPlans.recipeId,
      recipeTitle: recipes.title,
      recipeImageUrl: recipes.imageUrl,
    })
    .from(mealPlans)
    .innerJoin(recipes, eq(mealPlans.recipeId, recipes.id))
    .where(
      and(
        eq(mealPlans.userId, userId),
        gte(mealPlans.date, toDateString(monday)),
        lte(mealPlans.date, toDateString(sunday))
      )
    );

  return weekDates.map((date) => {
    const dateStr = toDateString(date);
    const dayRows = rows.filter((r) => r.date === dateStr);

    const find = (slot: "breakfast" | "lunch" | "dinner") => {
      const row = dayRows.find((r) => r.slot === slot);
      return row
        ? { name: row.recipeTitle, recipeId: row.recipeId, imageUrl: row.recipeImageUrl }
        : null;
    };

    return {
      date,
      meals: {
        breakfast: find("breakfast"),
        lunch: find("lunch"),
        dinner: find("dinner"),
      },
    };
  });
}
