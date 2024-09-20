import { eq } from "drizzle-orm";
import { db } from "../db";
import { goalCompletions } from "../db/schema";

interface RemoveGoalCompletionRequest {
  id: string;
}

export async function removeGoalCompletion({
  id,
}: RemoveGoalCompletionRequest) {
  const goalCompletion = await db
    .select()
    .from(goalCompletions)
    .where(eq(goalCompletions.id, id))
    .limit(1);

  if (goalCompletion.length <= 0) {
    throw new Error("Goal completion not found");
  }

  const removeResult = await db
    .delete(goalCompletions)
    .where(eq(goalCompletions.id, id))
    .returning();

  return {
    goalCompletion: removeResult[0],
  };
}
