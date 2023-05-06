import { Language } from "common-files";
import { useLangStore } from "../store/langStore";

export const getLang = () => useLangStore(state => state.lang) || Language.ENG
