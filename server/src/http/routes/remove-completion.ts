import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { removeGoalCompletion } from "../../functions/remove-goal-completion";

export const removeCompletionRoute: FastifyPluginAsyncZod = async (app) => {
  app.delete(
    "/completion/:id",
    {
      schema: {
        params: z.object({
          id: z.string(),
        }),
      },
    },
    async (request) => {
      const { id } = request.params;

      await removeGoalCompletion({
        id,
      });
    }
  );
};
