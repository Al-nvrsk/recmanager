export interface User {
    id: string;
    firstName: string;
    secondName: string;
    login: string;
    email: string
    avatar: string | null;
    role?: string;
    likedNumber?: number
}
