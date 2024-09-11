import { Summary } from './components/Summary.tsx'
import { CreateGoal } from './components/create-goal.tsx'
import { Dialog } from './components/ui/dialog.tsx'

export function App() {
  return (
    <Dialog>
      {/*<EmptyGoals />*/}
      <Summary />

      <CreateGoal />
    </Dialog>
  )
}
