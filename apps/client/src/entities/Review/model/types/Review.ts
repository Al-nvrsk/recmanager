import { EditReview } from "./EditReview"

export interface Review extends Omit<EditReview, 'Tags'> {
    id: string
    createdAt: string
    updateAt: string
    authorId: string
    Tags: {tag: string}[]
    // rating: null
}
