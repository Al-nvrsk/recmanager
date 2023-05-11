import { UserRole } from "common-files";

export interface User {
    id: string;
    firstName: string;
    secondName: string;
    login: string;
    email: string
    avatar: string | null;
    role?: UserRole;
    likedNumber?: number
}
