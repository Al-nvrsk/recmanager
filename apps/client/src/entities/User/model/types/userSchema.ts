import { User } from "./user";

export interface UserSchema {
    userState?: User
    setUserState: (value: User | null) => void
    isLoggedIn: boolean
    setIsLoggedIn: (newValue: boolean) => void
}
