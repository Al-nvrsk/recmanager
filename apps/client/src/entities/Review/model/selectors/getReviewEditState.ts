import { useReviewEditStore } from "../store/ReviewEditStore";

export const getReviewEditState =() => useReviewEditStore(state => state.reviewEditState)
