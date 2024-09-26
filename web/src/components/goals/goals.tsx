import { GetPendingGoalsResponse, Goal } from "@/actions/get-pending-goals.ts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table.tsx";
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

import { DialogUpdateGoal } from "./dialog-update-goal.tsx";
import { DialogDeleteGoal } from "./dialog-delete-goal.tsx";

interface GoalsProps {
  data: GetPendingGoalsResponse;
}

export function Goals({ data }: GoalsProps) {
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
  const [isOpenUpdateDialog, setIsOpenUpdateDialog] = useState(false);

  const [goalForUpdate, setGoalForUpdate] = useState<Goal | null>(null);
  const [goalIdForDelete, setGoalIdForDelete] = useState("");

  function handleDeleteGoal(id: string) {
    setIsOpenDeleteDialog(true);
    setGoalIdForDelete(id);
  }
  function handleUpdateGoal(data: Goal) {
    setIsOpenUpdateDialog(true);
    setGoalForUpdate(data);
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button type="button" variant="secondary">
          Visualizar metas
        </Button>
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
                      onClick={() => handleUpdateGoal(goal)}
                    >
                      <PenBox size={15} />
                    </Button>

                    <Button
                      variant="secondary"
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

        <DialogDeleteGoal
          isOpenDeleteDialog={isOpenDeleteDialog}
          setIsOpenDeleteDialog={setIsOpenDeleteDialog}
          id={goalIdForDelete}
        />

        <DialogUpdateGoal
          isOpenUpdateDialog={isOpenUpdateDialog}
          setIsOpenUpdateDialog={setIsOpenUpdateDialog}
          data={goalForUpdate as Goal}
        />
      </SheetContent>
    </Sheet>
  );
}
