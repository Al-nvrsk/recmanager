import { useSearchFilterStore } from "../../store/searchFilterStore";

export const getSetCurrentSearchType = () => useSearchFilterStore(state => state.setCurrentSearchType)
