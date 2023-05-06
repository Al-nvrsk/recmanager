import { TRPCError } from '@trpc/server';
import { protectedProcedure, publicProcedure } from '../../procedure/procedure';
import { router } from '../../trpc/trpc';
import { z as zod } from 'zod';
import { authSchema, registrationSchema } from "common-files";

const t = (message: string) => message

export const userRouter = router({
    logout: publicProcedure
        .mutation(req => {
        delete req.ctx.req.session!.userId
        req.ctx.req.logout((err) => {
        if (err) {
            return req.ctx.res.json({message: err})
        }
        return req.ctx.res.json({message: "ok"})
        }) 
    }),

    createUser: publicProcedure
        .input(registrationSchema(t))
        .mutation(async req => {
            const { confirmPassword, ...rest } = req.input
            const user = await req.ctx.prisma.user.create({data: rest})
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
                });
            }
            req.ctx.req.session!.userId = user.id
        return
        }),

    getUser: protectedProcedure
        .input( zod.
            object({
                userId: zod.string(),
                author: zod.boolean()
            }).optional())
        .query( async(req) => {
            const id = req.input?.author ? req.input.userId : req.ctx.req.session!.userId
            const user = await req.ctx.prisma.user.findUnique({
                where: {id},
                include: {
                    theme: {
                        select : {theme: true}
                    },
                    lang: {
                        select: { lang: true}
                    },
                    post: {
                        select: {id:true}
                    }
                }
            })
            const likedNumber = await req.ctx.prisma.reviewRating.count({
                where: {
                    reviewId: {in: user?.post.map(value => value.id)},
                    likeStatus: 'liked'
                }
            })
        return  {likedNumber, ...user!}
        })
        
});


