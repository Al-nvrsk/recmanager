import { userRouter } from "../routes/users";
import { appEnvRouter } from "../routes/appEnv";
import { mergeRouters } from "../../trpc/trpc";
import { reviewRouter } from "../routes/review";
import { tagsRouter } from "../routes/tags";

export const appRouter = mergeRouters(userRouter, appEnvRouter, reviewRouter, tagsRouter)

export type AppRouter = typeof appRouter;
