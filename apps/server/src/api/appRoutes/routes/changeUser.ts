import { protectedProcedure } from '../../procedure/procedure';
import { router } from '../../trpc/trpc';
import { z as zod } from 'zod';
import { changeUserSchema } from "common-files";
import { unExpectedError } from '../../utils/errors/unExpectedError';

const t = (message: string) => message

export const changeUserRouter = router({
    changeAvatar: protectedProcedure
        .input(zod.object({
            id: zod.string(),
            avatar: zod.string()
        }))
        .mutation(async req => {
            const { id, avatar } = req.input
            try {
                const changedUserAvatar = await req.ctx.prisma.user.update({
                    where: {id},
                    data: {avatar}
                })
                return changedUserAvatar
            } catch (error) {
                unExpectedError()
            }
        }),

    changeUser: protectedProcedure
        .input(changeUserSchema(t))
        .mutation(async req => {
            const { email, firstName,login, secondName, id } = req.input
            try {
                const changedUser = await req.ctx.prisma.user.update({
                    where: {id},
                    data: {email, firstName, secondName, login}
                })
                return changedUser
            } catch (error) {
                unExpectedError()
            }
        }),
});
