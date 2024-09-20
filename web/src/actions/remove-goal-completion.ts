export async function removeGoalCompletion(id: string): Promise<void> {
  await fetch(`http://localhost:3000/completion/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
