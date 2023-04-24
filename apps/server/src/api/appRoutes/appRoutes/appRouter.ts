import { userRouter } from "../routes/users";
import { appEnvRouter } from "../routes/appEnv";
import { mergeRouters } from "../../trpc/trpc";
import { reviewRouter } from "../routes/review";

export const appRouter = mergeRouters(userRouter, appEnvRouter, reviewRouter)

export type AppRouter = typeof appRouter;
