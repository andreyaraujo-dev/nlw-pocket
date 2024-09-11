type GetPendingGoalsResponse = {
  id: string
  title: string
  desiredWeeklyFrequency: number
  completionCount: number
}[]

export async function getPendingGoals(): Promise<GetPendingGoalsResponse> {
  const response = await fetch('http://localhost:3000/pending-goals')
  const data = await response.json()
  return data.pendingGoals
}
