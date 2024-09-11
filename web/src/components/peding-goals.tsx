import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { getPendingGoals } from '../actions/get-pending-goals.ts'
import { OutlineButton } from './ui/outline-button.tsx'

export function PendingGoals() {
  const { data } = useQuery({
    queryKey: ['pending-goals'],
    queryFn: getPendingGoals,
    staleTime: 1000 * 60, // 60 seconds
  })

  if (!data) return null

  return (
    <div className="flex gap-3 flex-wrap">
      {data.map(goal => (
        <OutlineButton
          key={goal.id}
          disabled={goal.completionCount >= goal.desiredWeeklyFrequency}
        >
          <Plus className="size-4 text-zinc-600" />
          {goal.title}
        </OutlineButton>
      ))}
    </div>
  )
}
