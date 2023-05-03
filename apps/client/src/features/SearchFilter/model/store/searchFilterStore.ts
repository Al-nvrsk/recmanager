import { create } from 'zustand'
import  immer  from 'immer'
import { SearchFilterSchema } from '../types/searchFilterSchema'
import { WorkType } from '@/shared/types/workType'
import { MenuItemKey } from 'common-types'

export const useSearchFilterStore = create<SearchFilterSchema>()(immer((set) => ({
    currentMenuKey: MenuItemKey.ADDED,
    setCurrentMenuKey: (key:MenuItemKey) => {set(() => ({currentMenuKey: key}))},

    searchText: '',
    setSearchText: (inputText: string) => {set(() => ({searchText: inputText}))},

    searchWorkType: undefined, 
    setSearchWorkType: (selectedWorkType?: string) => {set(() => ({searchWorkType: selectedWorkType}))},

    part: 1,
    setPart : (newNumber: number) => {set(() => ({part: newNumber}))},
})))
