'use client'

import { useState } from 'react'
import type { DayPlan } from './CalendarView/calendarView.types'
import { CalendarView } from './CalendarView'
import { DayDetailPanel } from './DayDetailPanel'

interface DashboardCalendarSectionProps {
  weekPlan: DayPlan[]
  initialSelectedDay: DayPlan | null
}

export function DashboardCalendarSection({ weekPlan, initialSelectedDay }: DashboardCalendarSectionProps) {
  const [selectedDay, setSelectedDay] = useState<DayPlan | null>(initialSelectedDay)

  return (
    <div className="flex flex-col gap-4">
      <CalendarView weekPlan={weekPlan} onDaySelect={setSelectedDay} />
      {selectedDay && (
        <DayDetailPanel dayPlan={selectedDay} onClose={() => setSelectedDay(null)} />
      )}
    </div>
  )
}
