import { useSearchFilterStore } from "../../store/searchFilterStore";

export const getCurrentSearchType = () => useSearchFilterStore(state => state.currentsearchType)
