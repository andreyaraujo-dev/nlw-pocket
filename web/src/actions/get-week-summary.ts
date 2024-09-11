type GoalsPerDay = Record<
  string,
  {
    id: string
    title: string
    completedAt: string
  }[]
>

type SummaryResponse = {
  completed: number
  total: number
  goalsPerDay: GoalsPerDay
}

export async function getWeekSummary(): Promise<SummaryResponse> {
  const response = await fetch('http://localhost:3000/week-summary')
  const data = await response.json()
  return data.summary
}
