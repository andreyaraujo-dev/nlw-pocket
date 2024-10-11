type CreateGoalRequest = {
  title: string;
  desiredWeeklyFrequency: number;
  userEmail: string;
};

export async function createGoal({
  title,
  desiredWeeklyFrequency,
  userEmail,
}: CreateGoalRequest): Promise<void> {
  await fetch("http://localhost:3000/goals", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, desiredWeeklyFrequency, userEmail }),
  });
}
