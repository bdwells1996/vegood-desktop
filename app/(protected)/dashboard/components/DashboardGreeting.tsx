'use client'

interface DashboardGreetingProps {
  firstName: string | null | undefined
}

function getTimeOfDay(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'morning'
  if (hour < 17) return 'afternoon'
  return 'evening'
}

export function DashboardGreeting({ firstName }: DashboardGreetingProps) {
  return (
    <h1 className="text-h1 font-semibold text-content-primary">
      Good {getTimeOfDay()},{' '}
      <span className="text-primary-600">{firstName ?? 'there'}</span>
    </h1>
  )
}
