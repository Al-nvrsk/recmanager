import { useSearchFilterStore } from "../store/searchFilterStore";

export const getSearchWorkType = () => useSearchFilterStore(state => state.searchWorkType) || ''
