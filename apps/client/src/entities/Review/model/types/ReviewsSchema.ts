import { Review } from "./Review";

export interface ReviewsSchema {
    reviewsState: Review[],
    setReviewsState:(newReviewsState?: Review[]) => void
}
