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

    getReviews: publicProcedure
        .input(zod.object({
            limit: zod.number().nullish(),
            part: zod.number().nullish(), // <-- "cursor" needs to exist, but can be any type
            workType: zod.string().optional(),
            search: zod.string(),
            tags: zod.array(zod.string()),
        }))
        .query(async req => {
            const { limit, part, workType, search, tags } = req.input;
            
            if (search === 'popular') {
                const getrate = await req.ctx.prisma.reviewRating.groupBy({
                    skip: limit!*(part!-1),
                    take: limit!, 
                    by: ['reviewId'],
                    where: { 
                        review: { 
                            TypeOfWork: workType ? {equals: workType} : {},
                            Tags: tags?.length>0 ? { some: { tag: {in : tags} } } : {}
                        }
                    },
                    orderBy: {
                        _avg: { userRate: 'desc' }
                    },
                    _avg: { userRate: true },
            })
                const getReviews = await req.ctx.prisma.reviews.findMany({
                    where:{id: {in: getrate.map(review => review.reviewId)}},
                    include: {
                        Tags: {select: {tag: true}},
                        rating: true
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
            return reviewsWithAvgRate.sort((prev, current) => current.rating - prev.rating )
        }

        if (search === 'added') {
            try{
                const getReviews = await req.ctx.prisma.reviews.findMany({
                skip: limit!*(part!-1),
                take: limit!, // get an extra item at the end which we'll use as next cursor
                where: {
                        TypeOfWork: workType ? {equals: workType} : {},
                        Tags: tags?.length>0 ? { some: { tag: {in : tags} } } : {}
                    },
                orderBy: {
                    createdAt: 'desc'
                    },
                
                    include: {
                        Tags: {select: {tag: true}},
                        rating: true
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
    }
    throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An unexpected request',
        });
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
    })
});
