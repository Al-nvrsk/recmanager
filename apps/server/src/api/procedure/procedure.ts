import { isAuthed } from "../middleware/authMiddleware";
import { t } from "../trpc/trpc";

export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(isAuthed)


