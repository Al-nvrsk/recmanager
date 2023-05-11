import { UserRole } from "common-files"

export  interface AdminPanelColumnType {
    key?: string
    id: string
    email: string
    login: string
    avatar: string | null
    role: string
    reviewsCount: number
    commentCount: number
    likesCount: number
}
