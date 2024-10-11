import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { createGoal } from "../actions/create-goal.ts";
import { Button } from "./ui/button.tsx";
import { Input } from "./ui/input.tsx";
import { Label } from "./ui/label.tsx";
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from "./ui/radio-group.tsx";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "./ui/sheet.tsx";
import { useToast } from "@/hooks/use-toast.ts";
import { DialogTrigger } from "./ui/dialog.tsx";
import { Plus } from "lucide-react";
import { useState } from "react";
import { userStore } from "@/stores/user.ts";

const createGoalForm = z.object({
  title: z.string().min(1, "Informe a atividade que deseja realizar"),
  desiredWeeklyFrequency: z.coerce.number().min(1).max(7),
});

type CreateGoalForm = z.infer<typeof createGoalForm>;

export function CreateGoal() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { register, control, handleSubmit, formState, reset } =
    useForm<CreateGoalForm>({
      resolver: zodResolver(createGoalForm),
    });
  const [isOpen, setIsOpen] = useState(false);
  const userEmail = userStore((state) => state.email);

  async function handleCreateGoal(data: CreateGoalForm) {
    try {
      await createGoal({
        title: data.title,
        desiredWeeklyFrequency: data.desiredWeeklyFrequency,
        userEmail,
      });

      queryClient.invalidateQueries({ queryKey: ["week-summary"] });
      queryClient.invalidateQueries({ queryKey: ["pending-goals"] });

      reset();

      toast({
        title: "Sucesso!",
        description: "Meta cadastrada com sucesso.",
      });
      setIsOpen(false);
    } catch (error) {
      console.error(`[create-goal] - ${error}`);
      toast({
        title: "Ops...",
        description: "Não foi possível cadastrar a meta.",
        variant: "destructive",
      });
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button type="button" className="bg-violet-500 hover:bg-violet-600">
          <Plus className="size-4" />
          Cadastrar meta
        </Button>
      </DialogTrigger>
      <SheetContent className="bg-zinc-950 border-zinc-900">
        <div className="flex flex-col gap-6 h-full">
          <div className="flex flex-col gap-3 h-full">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-zinc-100">Cadastrar meta</SheetTitle>
            </div>

            <SheetDescription>
              Adicione atividades que te fazem bem e que você quer continuar
              praticando toda semana.
            </SheetDescription>

            <form
              onSubmit={handleSubmit(handleCreateGoal)}
              className="flex-1 flex flex-col justify-between"
            >
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="title">Qual a atividade?</Label>
                  <Input
                    id="title"
                    autoFocus
                    placeholder="Praticar exercícios, meditar, etc..."
                    {...register("title")}
                  />

                  {formState.errors.title && (
                    <p className="text-red-400 text-sm">
                      {formState.errors.title.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="title">Quantas vezes na semana?</Label>
                  <Controller
                    control={control}
                    name="desiredWeeklyFrequency"
                    defaultValue={1}
                    render={({ field }) => {
                      return (
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={String(field.value)}
                        >
                          <RadioGroupItem value="1">
                            <RadioGroupIndicator />
                            <span className="text-zinc-500 text-sm font-medium leading-none">
                              1x na semana
                            </span>
                            <span className="text-ls leading-none">🥱</span>
                          </RadioGroupItem>

                          <RadioGroupItem value="2">
                            <RadioGroupIndicator />
                            <span className="text-zinc-500 text-sm font-medium leading-none">
                              2x na semana
                            </span>
                            <span className="text-ls leading-none">🙂</span>
                          </RadioGroupItem>

                          <RadioGroupItem value="3">
                            <RadioGroupIndicator />
                            <span className="text-zinc-500 text-sm font-medium leading-none">
                              3x na semana
                            </span>
                            <span className="text-ls leading-none">😎</span>
                          </RadioGroupItem>

                          <RadioGroupItem value="4">
                            <RadioGroupIndicator />
                            <span className="text-zinc-500 text-sm font-medium leading-none">
                              4x na semana
                            </span>
                            <span className="text-ls leading-none">😜</span>
                          </RadioGroupItem>

                          <RadioGroupItem value="5">
                            <RadioGroupIndicator />
                            <span className="text-zinc-500 text-sm font-medium leading-none">
                              5x na semana
                            </span>
                            <span className="text-ls leading-none">🤨</span>
                          </RadioGroupItem>

                          <RadioGroupItem value="6">
                            <RadioGroupIndicator />
                            <span className="text-zinc-500 text-sm font-medium leading-none">
                              6x na semana
                            </span>
                            <span className="text-ls leading-none">🤯</span>
                          </RadioGroupItem>

                          <RadioGroupItem value="7">
                            <RadioGroupIndicator />
                            <span className="text-zinc-500 text-sm font-medium leading-none">
                              Todos dias da semana
                            </span>
                            <span className="text-ls leading-none">🔥</span>
                          </RadioGroupItem>
                        </RadioGroup>
                      );
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <SheetClose asChild>
                  <Button type="button" className="flex-1" variant="secondary">
                    Fechar
                  </Button>
                </SheetClose>
                <Button className="flex-1 bg-violet-500 hover:bg-violet-600">
                  Salvar
                </Button>
              </div>
            </form>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
