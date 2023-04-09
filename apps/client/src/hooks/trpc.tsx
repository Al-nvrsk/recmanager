import { createTRPCReact } from '@trpc/react-query';
import  { AppRouter } from "server/src/api"

export const trpc = createTRPCReact<AppRouter>();
