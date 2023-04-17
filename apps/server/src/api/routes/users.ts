import { router, publicProcedure } from '../utils/trpc';
import { authSchema, registrationSchema } from 'validation-schema';
import { TRPCError } from '@trpc/server';

const t = (message: string) => message

export const userRouter = router({
  createUser: publicProcedure
    .input(registrationSchema(t))
    .mutation(async req => {
      const { confirmPassword, ...rest } = req.input
      const user = await req.ctx.prisma.user.create({data:rest})
      return user
    }),
  authUser: publicProcedure
    .input(authSchema(t))
    .mutation( async (req) => {
      const data = req.input
      const user = await req.ctx.prisma.user.findUnique({
        where:{login:data.login},
        include:{theme: true, lang: true}
      })
      if (user?.password !== data.password) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An unexpected error occurred, please try again later.',
          // optional: pass the original error to retain stack trace
          // cause: TypeError,
        });
      } 
      return user
    }),
});


