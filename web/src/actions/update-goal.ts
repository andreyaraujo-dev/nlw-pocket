export async function updateGoal(
  id: string,
  title: string,
  desiredWeeklyFrequency: number
): Promise<void> {
  await fetch(`http://localhost:3000/goals/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ title, desiredWeeklyFrequency }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
