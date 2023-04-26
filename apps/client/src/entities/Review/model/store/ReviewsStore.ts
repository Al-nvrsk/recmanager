import { create } from 'zustand'
import  immer  from 'immer'
import { Review } from '../types/Review'
import { ReviewsSchema } from '../types/ReviewsSchema'


export const useReviewsStore = create<ReviewsSchema>()(immer((set) => ({
    reviewsState: null,
    setReviewsState: (newReviewsState: Review[]) => {
        set(() => ({reviewsState: newReviewsState}))
    },
})))
