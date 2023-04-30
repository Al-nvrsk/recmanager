import { userRouter } from "../routes/users";
import { appEnvRouter } from "../routes/appEnv";
import { mergeRouters } from "../../trpc/trpc";
import { reviewRouter } from "../routes/review";
import { tagsRouter } from "../routes/tags";
import { ratingRouter } from "../routes/rating";
import { commentRouter } from "../routes/comment";

export const appRouter = mergeRouters(
    userRouter,
    appEnvRouter,
    reviewRouter,
    tagsRouter,
    ratingRouter,
    commentRouter
    )

export type AppRouter = typeof appRouter;
