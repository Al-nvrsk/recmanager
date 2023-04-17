import { Theme } from 'common-types'
export interface ThemeSchema {
    theme: Theme
    setThemeState: (theme: Theme) => void
}
