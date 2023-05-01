import { useSearchFilterStore } from "../store/searchFilterStore";

export const getSearchText = () => useSearchFilterStore(state => state.searchText)
