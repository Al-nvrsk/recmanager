import { TRPCError } from '@trpc/server';
import { publicProcedure } from '../../procedure/procedure';
import { router } from '../../trpc/trpc';
import { z as zod } from 'zod';
import { authSchema, registrationSchema } from "common-files";
import { unExpectedError } from '../../utils/errors/unExpectedError';

const t = (message: string) => message

export const userRouter = router({
    logout: publicProcedure
        .mutation(async req => {
            delete req.ctx.req.session!.userId
            req.ctx.req.logout((err) => {
            if (err) {
                unExpectedError()
            }
        }) 
        return {message: "ok"}
    }),

    createUser: publicProcedure
        .input(registrationSchema(t))
        .mutation(async req => {
            const { confirmPassword, ...rest } = req.input
            try {
            const user = await req.ctx.prisma.user.create({data: rest})
            req.ctx.req.session!.userId = user.id
            return user
            } catch (error) {
                unExpectedError('This user already exists')
            }
        }),

    authUser: publicProcedure
        .input(authSchema(t))
        .mutation( async (req) => {
            const data = req.input
            try {
                const user = await req.ctx.prisma.user.findUnique({
                    where:{login:data.login},
                    include:{theme: true, lang: true}
                })
                if (user?.password !== data.password) {
                    throw new TRPCError({
                        code: 'INTERNAL_SERVER_ERROR',
                        message: 'Login or password is not correct',
                    });
                }   
                req.ctx.req.session!.userId = user.id
            } catch (e) {
                unExpectedError()
            }
        return
        }),

    getUser: publicProcedure
        .input( zod.
            object({
                userId: zod.string(),
                author: zod.boolean()
            }).optional())
        .query( async(req) => {
            const id = req.input?.author ? req.input.userId : req.ctx.req.session!.userId
            try {
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
            } catch(e) {
                unExpectedError()
            }
        })
        
});


