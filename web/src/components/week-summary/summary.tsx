import { useQuery } from "@tanstack/react-query";
import ptBR from "dayjs/locale/pt-br";
import dayjs from "dayjs";

import { getWeekSummary } from "../../actions/get-week-summary.ts";
import { InOrbitIcon } from "../icons/in-orbit-icon.tsx";
import { PendingGoals } from "../goals/peding-goals.tsx";
import { Progress, ProgressIndicator } from "../ui/progress-bar.tsx";
import { Separator } from "../ui/separator.tsx";
import { CreateGoal } from "../goals/create-goal.tsx";
import { userStore } from "@/stores/user.ts";
import { WeekSummaryData } from "./week-summary-data.tsx";

dayjs.locale(ptBR);

export function Summary() {
  const user = userStore((state) => state.user);
  const { data } = useQuery({
    queryKey: ["week-summary"],
    queryFn: () => getWeekSummary(user.email),
    staleTime: 1000 * 60, // 60 seconds
    enabled: !!user.email,
  });

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

      <WeekSummaryData data={data} />
    </div>
  );
}
