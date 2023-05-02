import { useSearchFilterStore } from "../../store/searchFilterStore";

export const getSetPart = () => useSearchFilterStore(state => state.setPart)
