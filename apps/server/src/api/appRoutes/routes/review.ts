import { z } from 'zod';
import { router } from '../../trpc/trpc';
import { protectedProcedure, publicProcedure } from '../../procedure/procedure';
import { createReviewSchema } from 'validation-schema';

const t = (message: string) => message

export const reviewRouter = router({
    createReview: protectedProcedure
    .input(createReviewSchema(t))
    .mutation(async req => {
        const {Tags, ...reviewData} = req.input
        const tags = Tags.map(tag => ({tag}))
        console.log('reviewData', reviewData)
        try {
            const createReview = await req.ctx.prisma.reviews.create({
                data: {
                    AuthRating: reviewData.AuthRating,
                    ReviewName: reviewData.ReviewName,
                    ReviewText: reviewData.ReviewText,
                    TitleOfWork: reviewData.TitleOfWork,
                    authorId: reviewData.authorId,
                    TypeOfWork: {
                        create: {
                            category:reviewData.TypeOfWork
                        }
                    },
                    Tag: {
                        createMany: {
                            data: tags
                        }
                    }
                },
                include: {
                    TypeOfWork: true,
                    Tag: true
                }
            })
            return createReview
        } catch (e) {
            return e
        }
    }),

    getReviews: publicProcedure.query(async req => {
        try {
            const getReviews = await req.ctx.prisma.reviews.findMany()
            return getReviews
        } catch(e) {
            console.log(e)
        }
    })
});
