import { useSearchFilterStore } from "../../store/searchFilterStore";

export const getPart = () => useSearchFilterStore(state => state.part) || 1
