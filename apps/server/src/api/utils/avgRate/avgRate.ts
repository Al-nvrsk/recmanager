import { ReviewRating, Reviews } from "@prisma/client";

type avgRateProps = (Reviews & {
    rating: ReviewRating[];
    Tags: {
        tag: string;
    }[];
})[]

export const avgRate = (reviews: avgRateProps) => {
    const withAvgRate = reviews.map((review) => {
        const {rating, ...reviewArgs} = review
        const avgUserRate = parseFloat(
            (
                rating.reduce((acc, rate) =>
                    acc + (rate.userRate || 0), 0 ) / rating.length
            )
            .toFixed(1)
            );
        return {
            rating: avgUserRate,
            ...reviewArgs,
        };
    })
    return withAvgRate
} 
