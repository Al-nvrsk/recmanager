import { create } from 'zustand'
import  immer  from 'immer'
import { SearchFilterSchema } from '../types/searchFilterSchema'
import { MenuItemKey } from '../consts/menuItemKey'
import { WorkType } from '@/shared/types/workType'

export const useSearchFilterStore = create<SearchFilterSchema>()(immer((set) => ({
    currentMenuKey: MenuItemKey.ADDED,
    setCurrentMenuKey: (key:MenuItemKey) => {set(() => ({currentMenuKey: key}))},

    searchText: '',
    setSearchText: (inputText: string) => {set(() => ({searchText: inputText}))},

    searchWorkType: undefined, 
    setSearchWorkType: (selectedWorkType?: string) => {set(() => ({searchWorkType: selectedWorkType}))}
})))
