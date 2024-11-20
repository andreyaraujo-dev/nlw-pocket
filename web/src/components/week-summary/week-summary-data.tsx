import ptBR from "dayjs/locale/pt-br";
import dayjs from "dayjs";
import { CheckCircle2 } from "lucide-react";
import { SummaryResponse } from "@/actions/get-week-summary";
import { removeGoalCompletion } from "@/actions/remove-goal-completion";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface WeekSummaryDataProps {
  data: SummaryResponse;
}

dayjs.locale(ptBR);

export function WeekSummaryData({ data }: WeekSummaryDataProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

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
    } else {
      toast({
        title: "Sucesso",
        description: "Conclusão de meta desfeita!",
        duration: 3000,
      });
      queryClient.invalidateQueries({ queryKey: ["week-summary"] });
      queryClient.invalidateQueries({ queryKey: ["pending-goals"] });
    }
  }

  return (
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
                        <span className="text-zinc-100">{goal.title}</span>” às{" "}
                        <span className="text-zinc-100">{time}h</span>
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
  );
}
