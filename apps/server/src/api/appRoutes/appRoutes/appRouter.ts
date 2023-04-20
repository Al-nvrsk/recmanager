import { userRouter } from "../routes/users";
import { appEnvRouter } from "../routes/appEnv";
import { mergeRouters } from "../../trpc/trpc";

// import { postRouter } from './post';

export const appRouter = mergeRouters(userRouter, appEnvRouter)

export type AppRouter = typeof appRouter;
