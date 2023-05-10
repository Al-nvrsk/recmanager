export const avgRate = (reviews: Record<string, any>[]) => {
    const withAvgRate = reviews.map((review) => {
        const {rating, ...reviewArgs} = review
        const avgUserRate = parseFloat(
            (
                rating.reduce((acc:number, rate: Record<string, number>) =>
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
