import { Language } from "common-types"

export interface LangSchema {
    lang: Language
    setLang: (lang: Language) => void
}
