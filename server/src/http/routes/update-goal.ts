import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { updateGoal } from "../../functions/update-goal";

export const updateGoalRoute: FastifyPluginAsyncZod = async (app) => {
  app.patch(
    "/goals/:id",
    {
      schema: {
        body: z.object({
          title: z.string(),
          desiredWeeklyFrequency: z.number().int().min(1).max(7),
        }),
        params: z.object({
          id: z.string(),
        }),
      },
    },
    async (request) => {
      const { title, desiredWeeklyFrequency } = request.body;
      const { id } = request.params;

      return updateGoal({
        id,
        title,
        desiredWeeklyFrequency,
      });
    }
  );
};
