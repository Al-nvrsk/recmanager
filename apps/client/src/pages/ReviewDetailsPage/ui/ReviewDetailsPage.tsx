import { getReviewEditState } from "@/features/ReviewEdit"
import { Button } from "antd"
import React from "react"
import { memo } from "react"
import { useNavigate } from "react-router-dom"

const ReviewDetailsPage = memo(() => {
    const navigate = useNavigate()
    const ReviewState = getReviewEditState()

    return (
        <div>
            <Button 
                onClick={() => navigate(-1)}
            >
                Back
            </Button>
            ReviewDetailsPage
            {ReviewState.ReviewName}
            {ReviewState.TitleOfWork}
            {ReviewState.ReviewText}
            
        </div>
    )
})

export default ReviewDetailsPage
