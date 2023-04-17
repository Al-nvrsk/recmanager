import { useLangStore } from "../store/langStore";

export const getSetLang = () => useLangStore(state => state.setLang)
