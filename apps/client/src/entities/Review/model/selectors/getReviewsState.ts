import { useReviewsStore } from "../store/ReviewsStore";

export const getReviewsState =() => useReviewsStore(state => state.reviewsState)
