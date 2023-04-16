import { appEnvRouter } from '../routes/appEnv';
import { userRouter } from '../routes/users';
import { mergeRouters } from '../utils/trpc';

// import { postRouter } from './post';
 
export const appRouter = mergeRouters(userRouter, appEnvRouter)
 
export type AppRouter = typeof appRouter;
