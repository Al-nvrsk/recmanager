import { router, publicProcedure } from '../utils/trpc';
import { z } from 'zod';
import { Language, Theme } from 'common-types'

const t = (message: string) => message

export const appEnvRouter = router({
    setTheme: publicProcedure
    .input(
        z.object({
        id: z.string(),
        theme: z.nativeEnum(Theme)
      }))
    .mutation(async req => {
      const { id, theme } = req.input
        const setTheme = await req.ctx.prisma.userTheme.upsert({
          where: {ownerId:id},
          update: {theme},
          create: {ownerId:id, theme}
        })
        return setTheme
    }),

    setLang: publicProcedure
    .input(
        z.object({
        id: z.string(),
        lang: z.nativeEnum(Language)
      }))
    .mutation(async req => {
      const { id, lang } = req.input
      const setLang = await req.ctx.prisma.userLang.upsert({
        where: {ownerId: id},
        update: {lang},
        create: {ownerId:id, lang}
      })
    }),
});

