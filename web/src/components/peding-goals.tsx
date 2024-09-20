import { Button } from '@/components/ui/button.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet.tsx'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Plus, Save, Trash } from 'lucide-react'
import { useState } from 'react'
import { createGoalCompletion } from '../actions/create-goal-completion.ts'
import { getPendingGoals } from '../actions/get-pending-goals.ts'
import { OutlineButton } from './ui/outline-button.tsx'

export function PendingGoals() {
  const queryClient = useQueryClient()
  const { data } = useQuery({
    queryKey: ['pending-goals'],
    queryFn: getPendingGoals,
    staleTime: 1000 * 60, // 60 seconds
  })
  const [goals, setGoals] = useState(data)

  function handleChangeGoal() {}

  if (!data) return null

  async function handleCompletionGoal(goalId: string) {
    await createGoalCompletion(goalId)

    queryClient.invalidateQueries({ queryKey: ['week-summary'] })
    queryClient.invalidateQueries({ queryKey: ['pending-goals'] })
  }

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button type="button" variant="secondary">
            Visualizar metas
          </Button>
        </SheetTrigger>

        <SheetContent className="flex flex-col gap-3 bg-zinc-950 border-zinc-900 pt-10">
          {goals
            ? goals.map(goal => (
                <div key={goal.id} className="flex gap-2">
                  <Input name={`title-${goal.id}`} value={goal.title} />
                  <Input
                    name={`desiredWeeklyFrequency-${goal.id}`}
                    type="number"
                    value={goal.desiredWeeklyFrequency}
                    className="w-1/3"
                  />

                  <Button type="button">
                    <Save size={15} />
                  </Button>
                  <Button type="button" variant="secondary">
                    <Trash size={15} />
                  </Button>
                </div>
              ))
            : null}
        </SheetContent>
      </Sheet>
      <div className="flex gap-3 flex-wrap">
        {data.map(goal => (
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
  )
}
