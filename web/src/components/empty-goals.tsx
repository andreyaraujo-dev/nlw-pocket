import { Plus } from 'lucide-react'
import lestStart from '../assets/lets-start-illustration.svg'
import logo from '../assets/logo-in-orbit.svg'
import { Button } from './ui/button.tsx'
import { DialogTrigger } from './ui/dialog.tsx'

export function EmptyGoals() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-8">
      <img src={logo} alt="in.orbit" />
      <img src={lestStart} alt="lets start" />

      <p className="text-zinc-300 leading-relaxed max-w-80 text-center">
        Você ainda não cadastrou nenhuma meta, que tal cadastrar um agora mesmo?
      </p>

      <DialogTrigger asChild>
        <Button type="button">
          <Plus className="size-4" />
          Cadastrar meta
        </Button>
      </DialogTrigger>
    </div>
  )
}