import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getWeekSummary } from '../../functions/get-week-summary'
import {z} from "zod";

export const getWeekSummaryRoute: FastifyPluginAsyncZod = async app => {
  app.get('/week-summary', {
    schema: {
      querystring: z.object({
        userEmail: z.string().email("Invalid email format"),
      })
    }
  }, async (request) => {
    const { userEmail } = request.query;
    return getWeekSummary(userEmail)
  })
}
