import { eq } from "drizzle-orm";
import { db } from "../db";
import { goals } from "../db/schema";

interface UpdateGoalRequest {
  id: string;
  title: string;
  desiredWeeklyFrequency: number;
}

export async function updateGoal({
  id,
  title,
  desiredWeeklyFrequency,
}: UpdateGoalRequest) {
  const goal = await db.select().from(goals).where(eq(goals.id, id)).limit(1);

  if (goal.length <= 0) {
    throw new Error("Goal not found");
  }

  const result = await db
    .update(goals)
    .set({
      title,
      desiredWeeklyFrequency,
    })
    .where(eq(goals.id, id))
    .returning();

  return {
    goal: result[0],
  };
}
