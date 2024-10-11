export type Goal = {
  id: string;
  title: string;
  desiredWeeklyFrequency: number;
  completionCount: number;
};

export type GetPendingGoalsResponse = Goal[];

export async function getPendingGoals(
  userEmail: string
): Promise<GetPendingGoalsResponse> {
  const response = await fetch(
    `http://localhost:3000/pending-goals?userEmail=${userEmail}`
  );
  const data = await response.json();
  return data.pendingGoals;
}
