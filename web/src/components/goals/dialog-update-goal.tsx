import { Goal } from "@/actions/get-pending-goals";

import { Button } from "../ui/button.tsx";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateGoal } from "@/actions/update-goal.ts";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast.ts";

interface DialogUpdateGoalProps {
  data: Goal;
  isOpenUpdateDialog: boolean;
  setIsOpenUpdateDialog: Dispatch<SetStateAction<boolean>>;
}

export function DialogUpdateGoal({
  data,
  isOpenUpdateDialog,
  setIsOpenUpdateDialog,
}: DialogUpdateGoalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [goal, setGoal] = useState<Goal | null>(null);
  const { mutateAsync, isPending, isSuccess, isError } = useMutation({
    mutationKey: ["update-goal"],
    mutationFn: (data: {
      id: string;
      title: string;
      desiredWeeklyFrequency: number;
    }) => updateGoal(data.id, data.title, data.desiredWeeklyFrequency),
  });

  useEffect(() => {
    setGoal(data);
  }, [data]);

  async function handleUpdate() {
    await mutateAsync({
      id: goal!.id,
      title: goal!.title,
      desiredWeeklyFrequency: goal!.desiredWeeklyFrequency,
    });

    queryClient.invalidateQueries({ queryKey: ["week-summary"] });
    queryClient.invalidateQueries({ queryKey: ["pending-goals"] });

    if (isSuccess) {
      toast({
        title: "Sucesso!",
        description: "Registro atualizado com sucesso.",
        duration: 3000,
      });
    }

    if (isError) {
      toast({
        title: "Ops... Ocorreu um erro",
        description: "Naõ foi possível atualizar o registro.",
        duration: 3000,
        variant: "destructive",
      });
    }

    setIsOpenUpdateDialog(false);
  }

  return (
    <Dialog open={isOpenUpdateDialog} onOpenChange={setIsOpenUpdateDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-zinc-100">
            Atualizar registro
          </DialogTitle>
        </DialogHeader>

        {goal && (
          <div className="w-full flex gap-2">
            <Input
              name="title"
              value={goal.title}
              className="flex-1"
              onChange={(e) =>
                setGoal((prev) => ({ ...prev, title: e.target.value } as Goal))
              }
            />
            <Input
              type="number"
              name="desiredWeeklyFrequency"
              value={goal.desiredWeeklyFrequency}
              onChange={(e) =>
                setGoal(
                  (prev) =>
                    ({
                      ...prev,
                      desiredWeeklyFrequency: Number(e.target.value),
                    } as Goal)
                )
              }
              className="w-24"
            />
          </div>
        )}

        <DialogFooter className="flex gap-2">
          <Button
            type="button"
            onClick={() => handleUpdate()}
            disabled={isPending}
          >
            {isPending && <Loader2 className="animate-spin" />}
            Atualizar
          </Button>
          <Button
            variant="secondary"
            type="button"
            onClick={() => setIsOpenUpdateDialog(false)}
          >
            Cancelar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
