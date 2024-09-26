import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { removeGoal } from "../../functions/remove-goal";

export const removeGoalRoute: FastifyPluginAsyncZod = async (app) => {
  app.delete(
    "/goal/:id",
    {
      schema: {
        params: z.object({
          id: z.string(),
        }),
      },
    },
    async (request) => {
      const { id } = request.params;

      await removeGoal({
        id,
      });
    }
  );
};
