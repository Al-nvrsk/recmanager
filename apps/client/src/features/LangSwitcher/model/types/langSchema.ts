import { Language } from "common-files"

export interface LangSchema {
    lang: Language
    setLang: (lang: Language) => void
}
