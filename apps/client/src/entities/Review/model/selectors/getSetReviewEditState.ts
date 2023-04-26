import { useReviewEditStore } from "../store/itStore";

export const getSetReviewEditState =() => useReviewEditStore(state => state.setReviewEditState)
