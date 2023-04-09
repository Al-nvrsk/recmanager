import { userRouter } from '../routes/users';
import { mergeRouters } from '../utils/trpc';

// import { postRouter } from './post';
 
export const appRouter = mergeRouters(userRouter)
 
export type AppRouter = typeof appRouter;
