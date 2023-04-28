import { router } from '../../trpc/trpc';
import { protectedProcedure, publicProcedure } from '../../procedure/procedure';
import { createReviewSchema } from 'validation-schema';
import { z as zod } from 'zod';

const t = (message: string) => message

export const reviewRouter = router({
    updateReview: protectedProcedure
        .input(createReviewSchema(t))
        .mutation(async req => {
            const {id='', Tags, ...reviewData} = req.input
            const tags = Tags.map(tag => ({tag}))
            try {
                const transaction = await req.ctx.prisma.$transaction(async (prisma) => {

                    const updateReview = await req.ctx.prisma.reviews.upsert({
                        where: {id},
                        update: {
                            AuthRating: reviewData.AuthRating,
                            ReviewName: reviewData.ReviewName,
                            ReviewText: reviewData.ReviewText,
                            TitleOfWork: reviewData.TitleOfWork,
                            TypeOfWork: reviewData.TypeOfWork,
                        },
                        create: {
                            AuthRating: reviewData.AuthRating,
                            ReviewName: reviewData.ReviewName,
                            ReviewText: reviewData.ReviewText,
                            TitleOfWork: reviewData.TitleOfWork,
                            authorId: reviewData.authorId,
                            TypeOfWork: reviewData.TypeOfWork,
                            Tags: {
                                createMany: {
                                    data: tags
                                }
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

    getReviews: publicProcedure.query(async req => {
        try {
            const getReviews = await req.ctx.prisma.reviews.findMany({
                include: {
                    Tags: {select: {tag: true}},
                    rating: {select: {userRate: true}}
                }
            })
            // @ts-ignore
            getReviews.forEach(review => review.rating = review.rating.reduce((acc, rate) => acc + (rate.userRate || 0), 0  )/review.rating.length)
            
            return getReviews 
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
