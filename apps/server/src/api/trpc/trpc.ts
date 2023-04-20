import { initTRPC } from '@trpc/server';
import { Context } from '../context/createContext';

export const t = initTRPC.context<Context>().create();

export const router = t.router;

export const mergeRouters = t.mergeRouters;
