import { db } from '../db'
import { goals } from '../db/schema'

interface CreateGoalRequest {
  title: string
  desiredWeeklyFrequency: number
  userEmail: string
}

export async function createGoal({
  title,
  desiredWeeklyFrequency,
  userEmail
}: CreateGoalRequest) {
  const result = await db
    .insert(goals)
    .values({
      title,
      desiredWeeklyFrequency,
      userEmail
    })
    .returning()

  const goal = result[0]

  return {
    goal,
  }
}
