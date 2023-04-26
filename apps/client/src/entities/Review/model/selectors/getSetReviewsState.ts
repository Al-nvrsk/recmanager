import { useReviewsStore } from "../store/ReviewsStore";

export const getSetReviewsState =() => useReviewsStore(state => state.setReviewsState)
