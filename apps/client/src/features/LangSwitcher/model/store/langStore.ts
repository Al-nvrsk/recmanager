import { create } from 'zustand'
import  immer  from 'immer'
import { Language } from 'common-types'
import { LangSchema } from '../types/langSchema'

export const useLangStore = create<LangSchema>()(immer((set) => ({
    lang: 'ENG',
    setLang: (newLang: Language) => {set(() => ({lang: newLang}))},
})))
