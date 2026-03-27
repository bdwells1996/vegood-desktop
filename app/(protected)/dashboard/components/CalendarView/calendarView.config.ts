import { Coffee, Salad, Soup } from 'lucide-react'
import type { SvgIconComponent } from '@/components/Icon'
import type { MealSlot } from './calendarView.types'

export interface MealSlotConfig {
  slot: MealSlot
  label: string
  icon: SvgIconComponent
}

export const DAY_LABELS_SHORT = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const DAY_LABELS_LONG = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
export const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const MEAL_SLOT_CONFIG: MealSlotConfig[] = [
  { slot: 'breakfast', label: 'Breakfast', icon: Coffee },
  { slot: 'lunch',     label: 'Lunch',     icon: Salad  },
  { slot: 'dinner',    label: 'Dinner',    icon: Soup   },
]
