import { UserRole } from "../consts/userConsts";

export interface User {
    id: string;
    firstName: string;
    secondName: string;
    username: string;
    email: string
    avatar?: string;
    roles?: UserRole;
}
