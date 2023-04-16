import { useThemeStore } from "../store/themeStore";

export const getTheme = () => useThemeStore(state => state.theme)
