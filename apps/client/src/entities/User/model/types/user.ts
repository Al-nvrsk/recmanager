import { UserRole } from "../consts/userConsts";

export interface User {
    id: string;
    firstName: string;
    secondName: string;
    login: string;
    email: string
    avatar: string | null;
    roles?: UserRole;
}
