import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { createGoalCompletion } from "../actions/create-goal-completion.ts";
import { getPendingGoals } from "../actions/get-pending-goals.ts";
import { OutlineButton } from "./ui/outline-button.tsx";

import { Goals } from "./goals.tsx";

export function PendingGoals() {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["pending-goals"],
    queryFn: getPendingGoals,
    staleTime: 1000 * 60, // 60 seconds
  });
  const [goals, setGoals] = useState(data);

  function handleChangeGoal() {}

  if (!data) return null;

  // useEffect(() => {
  //   setGoals(data);
  // }, [data]);

  async function handleCompletionGoal(goalId: string) {
    await createGoalCompletion(goalId);

    queryClient.invalidateQueries({ queryKey: ["week-summary"] });
    queryClient.invalidateQueries({ queryKey: ["pending-goals"] });
  }

  return (
    <>
      <Goals data={data} />

      <div className="flex gap-3 flex-wrap">
        {data.map((goal) => (
          <OutlineButton
            key={goal.id}
            disabled={goal.completionCount >= goal.desiredWeeklyFrequency}
            onClick={() => handleCompletionGoal(goal.id)}
          >
            <Plus className="size-4 text-zinc-600" />
            {goal.title}
          </OutlineButton>
        ))}
      </div>
    </>
  );
}
