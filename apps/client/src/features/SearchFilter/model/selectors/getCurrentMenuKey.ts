import { useSearchFilterStore } from "../store/searchFilterStore";

export const getCurrentMenuKey = () => useSearchFilterStore(state => state.currentMenuKey) || 'added'
