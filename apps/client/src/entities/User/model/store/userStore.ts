import { create } from 'zustand'
import  immer  from 'immer'
import { UserSchema } from '../types/userSchema'
import { User } from '../types/user'
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localStorege'

export const useUserStore = create<UserSchema>()(immer((set) => ({
    userState: null,
    setUserState: (user: User | null) => set(() => ({userState: user})),
        // user 
        // ? localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(user))
        // : localStorage.removeItem(USER_LOCALSTORAGE_KEY)
    // }
    isLoggedIn: false,
    setIsLoggedIn: (newValue: boolean) =>  set(() => ({isLoggedIn: newValue})),
})))
