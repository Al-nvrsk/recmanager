import { useSearchFilterStore } from "../store/searchFilterStore";

export const getSetSearchText = () => useSearchFilterStore(state => state.setSearchText)
