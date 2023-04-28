import { EditReview } from "./EditReview"

export interface Review extends Omit<EditReview, 'Tags'> {
    id: string
    createdAt: string
    updateAt: string
    Tags: {tag: string}[]
    rating: any //TODO: fix
}
