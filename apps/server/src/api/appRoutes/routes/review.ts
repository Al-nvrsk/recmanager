import { router } from '../../trpc/trpc';
import { protectedProcedure, publicProcedure } from '../../procedure/procedure';
import { createReviewSchema } from 'validation-schema';
import { ZodError, z as zod } from 'zod';
import { TRPCError } from '@trpc/server';

const t = (message: string) => message

export const reviewRouter = router({
    updateReview: protectedProcedure
        .input(createReviewSchema(t))
        .mutation(async req => {
            const {id='', Tags, authorId, ...reviewData} = req.input
            const tags = Tags.map(tag => ({tag}))
            try {
                const transaction = await req.ctx.prisma.$transaction(async (prisma) => {
                    const updateReview = await req.ctx.prisma.reviews.upsert({
                        where: {id},
                        update: {...reviewData},
                        create: {
                            ...reviewData,
                            authorId,
                            Tags: {
                                createMany: {data: tags}
                            }
                        }
                    })

                    if (!id)  {
                        return { ...updateReview }
                    }
                
                    await prisma.tags.deleteMany({
                        where: {postId: id}
                    })
                                
                    const updateTags = await prisma.tags.createMany({
                        data: Tags.map((tag) => ({
                            tag,
                            postId:id
                        }))
                    })
                    return { ...updateReview,  Tags: updateTags }
                })
                return transaction
            } catch (e) {
                return e
            }
        }),

    getReview: publicProcedure
        .input(
            zod.object({
                id: zod.string()
            })
        )
        .query(async req => {
            const {id} = req.input
            try {
                const getReview = await req.ctx.prisma.reviews.findFirst({
                    where: {id},
                    include: {
                        Tags: {select: {tag: true}},
                        rating: true,
                        comments: true
                    }
                })
                if (!getReview) {
                    throw new TRPCError({
                        code: 'INTERNAL_SERVER_ERROR',
                        message: 'No this review',
                    });
                }
                const {rating, ...reviewArgs} = getReview
                const avgUserRate = rating.reduce((acc, rate) => acc + (rate.userRate || 0), 0 )/rating.length;

                return {rating: avgUserRate, ...reviewArgs} 
            } catch(e) {
                console.log(e)
            }
        }),

    deleteReview: protectedProcedure
        .input( zod.
            object({
                id: zod.string()
            }))
        .mutation(async req => {
            const {id} = req.input
            try {
                const deleteReview = await req.ctx.prisma.reviews.delete({
                    where: {id}
                })
                return deleteReview
            } catch (e) {
                return e
            }        
    }),

    getAllMyReviews: publicProcedure
        .input(zod.object({
            authorId: zod.string()
        }))
        .query(async req => {
            const {authorId} = req.input
            try {
            const getReviews = await req.ctx.prisma.reviews.findMany({
                where: { authorId: {equals:authorId} },
                include: {
                    Tags: {select: {tag: true}},
                    rating: {select: {userRate: true}}
                }
            })
            const reviewsWithAvgRate = getReviews.map((review) => {
                const {rating, ...reviewArgs} = review
                const avgUserRate = rating.reduce((acc, rate) => acc + (rate.userRate || 0), 0 )/rating.length;
                return {
                    rating: avgUserRate,
                    ...reviewArgs,
                };
            })            
            return reviewsWithAvgRate 
        } catch(e) {
            console.log(e)
        }
    }),

});
