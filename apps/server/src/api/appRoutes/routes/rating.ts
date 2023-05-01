import { router } from '../../trpc/trpc';
import { protectedProcedure } from '../../procedure/procedure';
import { z as zod } from 'zod';
import { prisma } from '../../../db';

const findId = async(userId: string, reviewId: string) => {
    const updateReview = await prisma.reviewRating.findFirst({
        where: {
            reviewId,
            userId
        }
    })
    return updateReview?.id || ''
}

export const ratingRouter = router({
    updateLikes: protectedProcedure
        .input(zod.object({
            reviewId: zod.string(),
            userId: zod.string(),
            likeStatus: zod.string()
        }))
        .mutation(async req => {
            const {reviewId, userId, likeStatus} = req.input
            try {
                    const editedReviewId = await findId(userId, reviewId)
                    const updateLike = await req.ctx.prisma.reviewRating.upsert({
                        where: {id: editedReviewId},
                        update: {likeStatus},
                        create: {
                            userId,
                            reviewId,
                            likeStatus
                        }
                    })

                    return updateLike
            } catch (e) {
                return e
            }
        }),

    updateRate: protectedProcedure
        .input(zod.object({
            reviewId: zod.string(),
            userId: zod.string(),
            myRate: zod.number()
        }))
        .mutation(async req => {
            const {reviewId, userId, myRate} = req.input
            try {
                const editedReviewId = await findId(userId, reviewId)
                const updateRate = await req.ctx.prisma.reviewRating.upsert({
                    where: {id: editedReviewId},
                    update: {userRate: myRate},
                    create: {
                        userId,
                        reviewId,
                        userRate: myRate
                    }
                })

                return updateRate
        } catch (e) {
            return e
        }
    }),
        
    getReviewRatings: protectedProcedure
        .input(zod.object({
            reviewId: zod.string(),
            userId: zod.string(),
        }))
        .mutation(async req => {
            const {reviewId, userId} = req.input
            try {
                    const reviewRatings = await req.ctx.prisma.reviewRating.findUnique({
                        where: {userId_reviewId: {reviewId,userId}}
                    })
                    console.log('reviewRatings', reviewRatings)
                    return reviewRatings
            } catch (e) {
                return e
            }
        }),
});
