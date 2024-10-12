import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getWeekPendingGoals } from '../../functions/get-week-pending-goals'
import {z} from "zod";

export const getWeekPendingGoalsRoute: FastifyPluginAsyncZod = async app => {
  app.get('/pending-goals', {
    schema: {
      querystring: z.object({
        userEmail: z.string().email("Invalid email format"),
      })
    }
  }, async (request) => {
    const { userEmail } = request.query;
    return getWeekPendingGoals(userEmail);
  })
}
