import { create } from 'zustand'
import  immer  from 'immer'
import { ThemeSchema } from '../types/themeSchema'
import { Theme } from '../types/theme'

export const useThemeStore = create<ThemeSchema>()(immer((set) => ({
    theme: 'light',
    setThemeState: (newTheme: Theme) => set(() => ({theme: newTheme})),
})))
