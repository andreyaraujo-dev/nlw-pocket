type GoalsPerDay = Record<
  string,
  {
    id: string;
    title: string;
    completedAt: string;
  }[]
>;

export type SummaryResponse = {
  completed: number;
  total: number;
  goalsPerDay: GoalsPerDay;
};

export async function getWeekSummary(
  userEmail: string
): Promise<SummaryResponse> {
  const response = await fetch(
    `http://localhost:3000/week-summary?userEmail=${userEmail}`
  );
  const data = await response.json();
  return data.summary;
}
