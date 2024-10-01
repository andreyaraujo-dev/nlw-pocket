import { useToast } from "@/hooks/use-toast.ts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import ptBR from "dayjs/locale/pt-br";
import { CheckCircle2 } from "lucide-react";
import { getWeekSummary } from "../actions/get-week-summary.ts";
import { removeGoalCompletion } from "../actions/remove-goal-completion.ts";
import { InOrbitIcon } from "./icons/in-orbit-icon.tsx";
import { PendingGoals } from "./peding-goals.tsx";
import { Progress, ProgressIndicator } from "./ui/progress-bar.tsx";
import { Separator } from "./ui/separator.tsx";
import { CreateGoal } from "./create-goal.tsx";

dayjs.locale(ptBR);

export function Summary() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["week-summary"],
    queryFn: getWeekSummary,
    staleTime: 1000 * 60, // 60 seconds
  });

  const { mutateAsync, isError } = useMutation({
    mutationKey: ["remove-goal-completion"],
    mutationFn: removeGoalCompletion,
  });

  async function handleRemoveGoalCompletion(id: string) {
    await mutateAsync(id);
    console.log(isError);

    if (isError) {
      toast({
        title: "Ops...",
        description: "Não foi possível realizar a operação",
        variant: "destructive",
      });
    }

    toast({
      title: "Sucesso",
      description: "Conclusão de meta desfeita!",
      duration: 3000,
    });

    queryClient.invalidateQueries({ queryKey: ["week-summary"] });
    queryClient.invalidateQueries({ queryKey: ["pending-goals"] });
  }

  if (!data) return null;

  const firstDayOfWeek = dayjs().startOf("week").format("D MMM");
  const lastDayOfWeek = dayjs().endOf("week").format("D MMM");

  const completedPercentage = Math.round((data?.completed * 100) / data.total);

  return (
    <div className="py-10 max-w-[480px] px-5 mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <InOrbitIcon />
          <span className="text-lg font-semibold capitalize">
            {firstDayOfWeek} - {lastDayOfWeek}
          </span>
        </div>

        <CreateGoal />
      </div>

      <div className="flex flex-col gap-3">
        <Progress value={8} max={15}>
          <ProgressIndicator style={{ width: `${completedPercentage}%` }} />
        </Progress>

        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>
            Você completou{" "}
            <span className="text-zinc-100">{data?.completed}</span> de{" "}
            <span className="text-zinc-100">{data?.total}</span> metas nessa
            semana.
          </span>
          <span>{completedPercentage}%</span>
        </div>
      </div>

      <Separator />

      <PendingGoals />

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-medium">Sua semana</h2>

        {data.goalsPerDay ? (
          Object.entries(data.goalsPerDay).map(([date, goals]) => {
            const weekDay = dayjs(date).format("dddd");
            const formattedDate = dayjs(date).format("D[ de ]MMMM");

            return (
              <div key={date} className="flex flex-col gap-4">
                <h3 className="font-medium">
                  <span className="capitalize">{weekDay}</span>{" "}
                  <span className="text-zinc-400">({formattedDate})</span>
                </h3>

                <ul className="flex flex-col gap-3">
                  {goals.map((goal) => {
                    const time = dayjs(goal.completedAt).format("HH:mm");

                    return (
                      <li className="flex items-center gap-2" key={goal.id}>
                        <CheckCircle2 className="size-4 text-pink-500" />
                        <span className="text-sm text-zinc-400">
                          Você completou “
                          <span className="text-zinc-100">{goal.title}</span>”
                          às <span className="text-zinc-100">{time}h</span>
                        </span>

                        <span
                          className="text-xs text-zinc-500 hover:text-zinc-400 hover:cursor-pointer"
                          onClick={() => handleRemoveGoalCompletion(goal.id)}
                        >
                          (remover)
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })
        ) : (
          <span className="text-zinc-500">
            Nenhuma meta concluída nessa semana.
          </span>
        )}
      </div>
    </div>
  );
}
