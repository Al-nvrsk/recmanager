import { useThemeStore } from "../store/themeStore";

export const getSetTheme = () => useThemeStore(state => state.setThemeState)
