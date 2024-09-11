import { useQuery } from '@tanstack/react-query'
import { getWeekSummary } from './actions/get-week-summary.ts'
import { CreateGoal } from './components/create-goal.tsx'
import { EmptyGoals } from './components/empty-goals.tsx'
import { Summary } from './components/summary.tsx'
import { Dialog } from './components/ui/dialog.tsx'

export function App() {
  const { data } = useQuery({
    queryKey: ['week-summary'],
    queryFn: getWeekSummary,
    staleTime: 1000 * 60, // 60 seconds
  })

  return (
    <Dialog>
      {data?.total && data.total > 0 ? <Summary /> : <EmptyGoals />}

      <CreateGoal />
    </Dialog>
  )
}
