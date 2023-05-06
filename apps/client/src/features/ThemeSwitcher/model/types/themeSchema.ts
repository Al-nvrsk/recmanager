import { Theme } from 'common-files'
export interface ThemeSchema {
    theme: Theme
    setThemeState: (theme: Theme) => void
}
