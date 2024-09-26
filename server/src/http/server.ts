import fastifyCors from "@fastify/cors";
import fastify from "fastify";
import {
  type ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { createCompletionRouter } from "./routes/create-completion";
import { createGoalRoute } from "./routes/create-goal";
import { getWeekPendingGoalsRoute } from "./routes/get-week-pending-goals";
import { getWeekSummaryRoute } from "./routes/get-week-summary";
import { removeCompletionRoute } from "./routes/remove-completion";
import { removeGoalRoute } from "./routes/remove-goal";
import { updateGoalRoute } from "./routes/update-goal";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: "*",
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(getWeekPendingGoalsRoute);
app.register(createGoalRoute);
app.register(createCompletionRouter);
app.register(getWeekSummaryRoute);
app.register(removeCompletionRoute);
app.register(removeGoalRoute);
app.register(updateGoalRoute);

app.listen({ port: 3000 }).then(() => {
  console.log("HTTP server listening on port 3000");
});
