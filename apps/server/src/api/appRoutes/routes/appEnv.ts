import { z as zod } from 'zod';
import { Language, Theme } from 'common-files'
import { router } from '../../trpc/trpc';
import { protectedProcedure } from '../../procedure/procedure';

export const appEnvRouter = router({
    setTheme: protectedProcedure
    .input(
        zod.object({
            id: zod.string(),
            theme: zod.nativeEnum(Theme)
        }))
    .mutation(async req => {
        const { id, theme } = req.input
        try {
            const setTheme = await req.ctx.prisma.userTheme.upsert({
                where: {ownerId:id},
                update: {theme},
                create: {ownerId:id, theme}
            })
            return setTheme
        } catch (e) {
            return e
        }
    }),

    setLang: protectedProcedure
    .input(
        zod.object({
            id: zod.string(),
            lang: zod.nativeEnum(Language)
        }))
    .mutation(async req => {
        const { id, lang } = req.input
        try {
            const setLang = await req.ctx.prisma.userLang.upsert({
                where: {ownerId: id},
                update: {lang},
                create: {ownerId:id, lang}
            })
            return setLang
        } catch (e) {
            return e
        }
    }),
});

