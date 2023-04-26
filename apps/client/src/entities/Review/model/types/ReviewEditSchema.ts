import { EditReview } from "./EditReview";

export interface ReviewEditSchema {
    reviewEditState: EditReview,
    setReviewEditState:(reviewState?: EditReview) => void
}
