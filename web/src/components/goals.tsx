import { GetPendingGoalsResponse } from "@/actions/get-pending-goals.ts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet.tsx";
import { PenBox, Trash } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog.tsx";

interface GoalsProps {
  data: GetPendingGoalsResponse;
}

export function Goals({ data }: GoalsProps) {
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);

  async function handleDeleteGoal(id: string) {
    setIsOpenDeleteDialog(true);
    console.log(id);
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button type="button">Visualizar metas</Button>
      </SheetTrigger>

      <SheetContent className="flex flex-col gap-3 bg-zinc-950 border-zinc-900 pt-10">
        <SheetHeader>
          <SheetTitle className="text-zinc-100">Suas metas</SheetTitle>
          <SheetDescription>Gerencie suas metas cadastradas.</SheetDescription>
        </SheetHeader>

        {data ? (
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-zinc-900 font-bold">
                <TableHead className="rounded-tl-md">Meta</TableHead>
                <TableHead>Frequência</TableHead>
                <TableHead colSpan={2} className="rounded-tr-md" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((goal) => (
                <TableRow key={goal.id} className="hover:bg-zinc-900">
                  <TableCell>{goal.title}</TableCell>
                  <TableCell>{goal.desiredWeeklyFrequency}</TableCell>
                  <TableCell colSpan={2} className="flex gap-2">
                    <Button
                      type="button"
                      className="bg-violet-500 hover:bg-violet-600"
                    >
                      <PenBox size={15} />
                    </Button>

                    <Button
                      type="button"
                      onClick={() => handleDeleteGoal(goal.id)}
                    >
                      <Trash size={15} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : null}

        <Dialog open={isOpenDeleteDialog} onOpenChange={setIsOpenDeleteDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-zinc-100">
                Excluir registro
              </DialogTitle>
              <DialogDescription>
                Esta operação não pode ser desfeita!
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="flex gap-2">
              <Button type="button" variant="destructive">
                Excluir
              </Button>
              <DialogClose>
                <Button type="button">Cancelar</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </SheetContent>
    </Sheet>
  );
}
