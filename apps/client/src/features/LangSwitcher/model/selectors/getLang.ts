import { Language } from "common-types";
import { useLangStore } from "../store/langStore";

export const getLang = () => useLangStore(state => state.lang) || Language.ENG
