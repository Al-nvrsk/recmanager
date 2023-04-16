import { Theme } from "./theme"

export interface ThemeSchema {
    theme: Theme
    setThemeState: (theme: Theme) => void
}
