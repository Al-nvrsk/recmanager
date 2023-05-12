import { ReviewEdit } from "@/entities/Review"
import React from "react"
import cls from './ReviewEditPage.module.scss'

const ReviewEditPage = () => {

    return (
        <div className={cls.ReviewEditPage}>
            <ReviewEdit />
        </div>
    )
}

export default ReviewEditPage
