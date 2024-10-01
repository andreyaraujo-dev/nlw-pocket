import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { createGoalCompletion } from "../actions/create-goal-completion.ts";
import { getPendingGoals } from "../actions/get-pending-goals.ts";
import { OutlineButton } from "./ui/outline-button.tsx";
import { Goals } from "./goals/goals.tsx";
import { useToast } from "@/hooks/use-toast.ts";

export function PendingGoals() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["pending-goals"],
    queryFn: getPendingGoals,
    staleTime: 1000 * 60, // 60 seconds
  });
  if (!data) return null;

  async function handleCompletionGoal(goalId: string) {
    try {
      await createGoalCompletion(goalId);

      queryClient.invalidateQueries({ queryKey: ["week-summary"] });
      queryClient.invalidateQueries({ queryKey: ["pending-goals"] });
      toast({
        title: "Sucesso!",
        description: "Meta concluída com sucesso.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Ops...",
        description: "Não foi possível concluir a meta.",
        variant: "destructive",
      });
    }
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
