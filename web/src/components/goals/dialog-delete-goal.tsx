import { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog.tsx";
import { Button } from "../ui/button.tsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeGoal } from "@/actions/remove-goal.ts";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast.ts";

interface DialogDeleteGoalProps {
  id: string;
  isOpenDeleteDialog: boolean;
  setIsOpenDeleteDialog: Dispatch<SetStateAction<boolean>>;
}

export function DialogDeleteGoal({
  id,
  isOpenDeleteDialog,
  setIsOpenDeleteDialog,
}: DialogDeleteGoalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, isError } = useMutation({
    mutationKey: ["remove-goal"],
    mutationFn: removeGoal,
  });

  async function handleDelete() {
    await mutateAsync(id);

    queryClient.invalidateQueries({ queryKey: ["pending-goals"] });
    queryClient.invalidateQueries({ queryKey: ["week-summary"] });

    if (!isPending) {
      toast({
        title: "Sucesso!",
        description: "Registro excluído com sucesso.",
        duration: 3000,
      });
    }

    if (isError) {
      toast({
        title: "Ops... Ocorreu um erro",
        description: "Naõ foi possível excluir o registro.",
        duration: 3000,
        variant: "destructive",
      });
    }

    setIsOpenDeleteDialog(false);
  }

  return (
    <Dialog open={isOpenDeleteDialog} onOpenChange={setIsOpenDeleteDialog}>
      <DialogContent className="w-11/12 md:w-full rounded-md">
        <DialogHeader>
          <DialogTitle className="text-zinc-100">Excluir registro</DialogTitle>
          <DialogDescription>
            Esta operação não pode ser desfeita!
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex gap-2 w-full flex-row justify-end">
          <Button
            className="flex-1 md:max-w-28"
            type="button"
            variant="destructive"
            onClick={() => handleDelete()}
            disabled={isPending}
          >
            {isPending && <Loader2 className="animate-spin" />}
            Excluir
          </Button>
          <Button
            className="flex-1 md:max-w-28"
            variant="secondary"
            type="button"
            onClick={() => setIsOpenDeleteDialog(false)}
          >
            Cancelar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
