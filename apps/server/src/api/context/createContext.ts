
import { inferAsyncReturnType } from '@trpc/server';
import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import { prisma } from '../../db';

export const createContext = ({ req, res }: CreateExpressContextOptions) => {
  return { req, res, prisma };
};

export type Context = inferAsyncReturnType<typeof createContext>;
