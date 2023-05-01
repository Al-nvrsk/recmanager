import { router } from '../../trpc/trpc';
import { publicProcedure } from '../../procedure/procedure';
import { z as zod } from 'zod';

export const searchRouter = router({
    searchText: publicProcedure
        .input(zod.object({
            text: zod.string(),
            workType: zod.string().optional(),
            tags: zod.array(zod.string()),
        }))
        .mutation(async req => {
            const {text, workType, tags} = req.input
            try {
                    const searchReviewText = await req.ctx.prisma.reviews.findMany({
                        where: {  TypeOfWork: workType ? {equals: workType} : {},
                                    Tags: tags?.length>0 ? {some: {tag: {in: tags}}}: {},
                            OR:[ { ReviewText: { search: text } }, 
                                { ReviewName: { search: text } },
                                { TitleOfWork: { search: text } },
                                { TypeOfWork: { search: text } },
                                { comments: { some: {text: { search: text}} }},
                                { author: { OR: [
                                    {firstName : { search: text }},
                                    {secondName : { search: text}},
                                    {login: { search: text}}
                                ]
                                }},
                                { Tags: {some : { tag: { search: text}}}}
                            ] 
                        },
                        include: {
                            Tags: {select: {tag: true}},
                            rating: true,
                        },
                        distinct: ['id']
                    })

                    const searchedReview = searchReviewText?.map((review) => {
                        const {rating, ...reviewArgs} = review
                        const avgUserRate = rating.reduce((acc, rate) => acc + (rate.userRate || 0), 0 )/rating.length;
                        return {
                            rating: avgUserRate,
                            ...reviewArgs,
                        };
                    })

                return searchedReview
            } catch (e) {
                return e
            }
        }),
});
