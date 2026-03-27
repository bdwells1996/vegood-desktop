export type MealSlot = 'breakfast' | 'lunch' | 'dinner'

export type DayFillState = 'full' | 'partial' | 'empty'

export interface PlannedMeal {
  name: string
  recipeId?: string
  imageUrl?: string | null
}

export interface DayMeals {
  breakfast: PlannedMeal | null
  lunch: PlannedMeal | null
  dinner: PlannedMeal | null
}

export interface DayPlan {
  date: Date
  meals: DayMeals
}
