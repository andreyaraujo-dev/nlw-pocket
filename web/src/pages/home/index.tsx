import { useQuery } from "@tanstack/react-query";

import { getWeekSummary } from "../../actions/get-week-summary.ts";
import { EmptyGoals } from "../../components/goals";
import { Summary } from "../../components/week-summary";
import { useEffect } from "react";
import { getUserProfile } from "@/actions/get-user-profile.ts";
import { userStore } from "@/stores/user.ts";
import { Header } from "@/components/header";

export function Home() {
  const updateUser = userStore((state) => state.update);
  const user = userStore((state) => state.user);
  const { data } = useQuery({
    queryKey: ["week-summary"],
    queryFn: () => getWeekSummary(user.email),
    staleTime: 1000 * 60, // 60 seconds
    enabled: !!user.email,
  });

  const { data: userProfile, isSuccess } = useQuery({
    queryKey: ["user"],
    queryFn: getUserProfile,
  });

  useEffect(() => {
    if (isSuccess) {
      updateUser({
        email: userProfile.email,
        name: userProfile.name,
        imageUrl: userProfile.imageUrl,
      });
    }
  }, [isSuccess]);

  return (
    <>
      <Header />
      {data?.total && data.total > 0 ? <Summary /> : <EmptyGoals />}
    </>
  );
}
