import { create } from 'zustand'
import  immer  from 'immer'
import { Review } from '../types/review'
import { ReviewSchema } from '../types/reviewSchema'

export const useReviewEditStore = create<ReviewSchema>()(immer((set) => ({
    reviewEditState: null,
    setReviewEditState: (reviewState: Review) => {
        set(() => ({reviewEditState: reviewState}))
    },
})))
