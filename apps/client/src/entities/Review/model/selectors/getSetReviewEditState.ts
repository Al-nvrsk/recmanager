import { useReviewEditStore } from "../store/ReviewEditStore";

export const getSetReviewEditState =() => useReviewEditStore(state => state.setReviewEditState)
