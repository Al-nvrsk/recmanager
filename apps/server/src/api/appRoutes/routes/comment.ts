import { router } from '../../trpc/trpc';
import { protectedProcedure, publicProcedure } from '../../procedure/procedure';
import { z as zod } from 'zod';

export const commentRouter = router({
    updateComment: protectedProcedure
        .input(zod.object({
            userId: zod.string(),
            id: zod.string().optional(),
            reviewId: zod.string(),
            text: zod.string()
        }))
        .mutation(async req => {
            const {id = '', userId, reviewId, text} = req.input
            try {
                const updateComment = await req.ctx.prisma.comments.upsert({
                    where: {id},
                    update: {text},
                    create: {
                        reviewId,
                        userId,
                        text
                    }
                })
                    
                return updateComment
            } catch (e) {
                return e
            }
        }),

    getComments: publicProcedure
        .input(zod.object({
            id: zod.string()
        }))
        .query(async req => {
            const {id} = req.input
        try {
            const getComments = await req.ctx.prisma.comments.findMany({
                where: {
                    reviewId: id
                    },
                include: {
                    user: {
                        select: {
                            avatar: true,
                            login: true,
                            id: true,
                            post: {
                                select: {id:true}
                            }
                        }
                    }
                }
            })
            const comments = await Promise.all(getComments.map(async(comment) => {
                const {userId, user, ...args} = comment
                const userLikes = await req.ctx.prisma.reviewRating.count({
                    where: {
                        reviewId: {in: user?.post.map(value => value.id)},
                        likeStatus: 'liked'
                    }
                })
                const {post, ...userArgs} = user
                return {args, user:{ userLikes, ...userArgs }}
            }))
            return await comments
        } catch(e) {
            console.log(e)
        }
    }),

    deleteComment: protectedProcedure
        .input( zod.
            object({
                id: zod.string()
            }))
        .mutation(async req => {
            const {id} = req.input
            try {
                const deleteComment = await req.ctx.prisma.comments.delete({
                    where: {id}
                })
                return deleteComment
            } catch (e) {
                return e
            }        
        
    })
});
