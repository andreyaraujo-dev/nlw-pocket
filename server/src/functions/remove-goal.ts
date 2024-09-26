import { eq } from "drizzle-orm";
import { db } from "../db";
import { goalCompletions, goals } from "../db/schema";

interface RemoveGoalRequest {
  id: string;
}

export async function removeGoal({ id }: RemoveGoalRequest) {
  const goal = await db.select().from(goals).where(eq(goals.id, id)).limit(1);

  if (goal.length <= 0) {
    throw new Error("Goal not found");
  }

  const removeGoalCompletions = await db
    .delete(goalCompletions)
    .where(eq(goalCompletions.goalId, id))
    .returning();

  const removeResult = await db
    .delete(goals)
    .where(eq(goals.id, id))
    .returning();

  return {
    goal: removeResult[0],
    goalCompletions: removeGoalCompletions[0],
  };
}
