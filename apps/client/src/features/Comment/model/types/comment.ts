import { CommentUser } from "./commentUser"

export interface Comment {
    args: {
        id: string
        text: string
        reviewId: string
        createdAt?: string
        updatedAt?: string
    }
    user: CommentUser
}
