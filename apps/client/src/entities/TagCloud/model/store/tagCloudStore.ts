import { create } from 'zustand'
import  immer  from 'immer'
import { TagCloudSchema } from '../types/tagCloudSchema'

export const useTagCloudStore = create<TagCloudSchema>()(immer((set) => ({
    selectedTags: [],
    setSelectedTags: (tags: string[]) => {set(() => ({selectedTags: tags}))},
})))
