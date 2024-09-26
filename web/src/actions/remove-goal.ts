export async function removeGoal(id: string): Promise<void> {
  await fetch(`http://localhost:3000/goal/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
