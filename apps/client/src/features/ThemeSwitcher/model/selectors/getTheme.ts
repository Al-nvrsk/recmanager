import { Theme } from "common-files";
import { useThemeStore } from "../store/themeStore";

export const getTheme = () => useThemeStore(state => state.theme) || Theme.LIGHT
