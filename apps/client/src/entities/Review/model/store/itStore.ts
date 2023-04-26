import { create } from 'zustand'
import  immer  from 'immer'
import { ReviewEditSchema } from '../types/ReviewEditSchema'
import { EditReview } from '../types/EditReview'

export const useReviewEditStore = create<ReviewEditSchema>()(immer((set) => ({
    reviewEditState: null,
    setReviewEditState: (editedState?: EditReview) => {
        set(() => ({reviewEditState: editedState }))
    },
})))
