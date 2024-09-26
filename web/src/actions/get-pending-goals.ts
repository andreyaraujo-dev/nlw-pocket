export type Goal = {
  id: string;
  title: string;
  desiredWeeklyFrequency: number;
  completionCount: number;
};

export type GetPendingGoalsResponse = Goal[];

export async function getPendingGoals(): Promise<GetPendingGoalsResponse> {
  const response = await fetch("http://localhost:3000/pending-goals");
  const data = await response.json();
  return data.pendingGoals;
}
