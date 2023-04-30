import { EditReview } from "./EditReview"

export interface Review extends Omit<EditReview, 'Tags'> {
    id: string
    createdAt: string
    updatedAt: string
    Tags: {tag: string}[]
    rating: number
}
