import { Review } from "./review"

export interface ReviewSchema {
    reviewEditState: Review,
    setReviewEditState:(reviewState?: Review) => void
}
