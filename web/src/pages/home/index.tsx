import { useQuery } from "@tanstack/react-query";
import { getWeekSummary } from "../../actions/get-week-summary.ts";
import { EmptyGoals } from "../../components/empty-goals.tsx";
import { Summary } from "../../components/summary.tsx";
import { useEffect } from "react";
import { getUserProfile } from "@/actions/get-user-profile.ts";
import { userStore } from "@/stores/user.ts";

export function Home() {
  const updateUser = userStore((state) => state.update);

  const { data } = useQuery({
    queryKey: ["week-summary"],
    queryFn: getWeekSummary,
    staleTime: 1000 * 60, // 60 seconds
  });

  useEffect(() => {
    (async () => {
      const response = await getUserProfile();
      console.log(response);
    })();
  }, []);

  return <>{data?.total && data.total > 0 ? <Summary /> : <EmptyGoals />}</>;
}
