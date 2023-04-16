import { create } from 'zustand'
import  immer  from 'immer'
import { UserSchema } from '../types/userSchema'
import { User } from '../types/user'

export const useUserStore = create<UserSchema>()(immer((set) => ({
    userState: null,
    setUserState: (user: User) => set(() => ({userState: user})),
})))
