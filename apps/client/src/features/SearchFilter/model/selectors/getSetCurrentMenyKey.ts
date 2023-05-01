import { useSearchFilterStore } from "../store/searchFilterStore";

export const getSetCurrentMenuKey = () => useSearchFilterStore(state => state.setCurrentMenuKey)
