import { TRPCError } from "@trpc/server"
import { t } from "../trpc/trpc";

export const isAuthed = t.middleware(req => {
    if (!req.ctx.req.session?.userId) {
      throw new TRPCError({ 
        code: 'UNAUTHORIZED',
        message: "Not id",
    });
    }
    return req.next(
      req
    );
  });

