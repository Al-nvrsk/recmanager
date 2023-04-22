import { useReviewEditStore } from "../store/reviewEditStore";

export const getReviewEditState =() => useReviewEditStore(state => state.reviewEditState)
