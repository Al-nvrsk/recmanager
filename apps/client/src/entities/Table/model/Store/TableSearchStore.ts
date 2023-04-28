import { create } from 'zustand'
import  immer  from 'immer'

import { TableSearchSchema } from '../types/TableSearchSchema'

export const useTableSearchStore = create<TableSearchSchema>()(immer((set) => ({
    tableSearchState: null,
    setTableSearchState: (newSearch?: string) => {
        set(() => ({tableSearchState: newSearch }))
    },
})))
