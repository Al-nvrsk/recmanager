import { useSearchFilterStore } from "../store/searchFilterStore";

export const getSetSearchWorkType = () => useSearchFilterStore(state => state.setSearchWorkType)
