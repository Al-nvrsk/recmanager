import { useReviewEditStore } from "../store/reviewEditStore";

export const getSetReviewEditState =() => useReviewEditStore(state => state.setReviewEditState)
