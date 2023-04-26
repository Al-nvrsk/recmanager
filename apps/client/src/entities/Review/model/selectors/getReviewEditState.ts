import { useReviewEditStore } from "../store/itStore";

export const getReviewEditState =() => useReviewEditStore(state => state.reviewEditState)
