import React from "react"
import { useLocation } from "react-router-dom"
import cls from './ReviewDatailsPage.module.scss'
import { Author, EditButton, Like, ReviewDetails } from "@/entities/Review"
import { useTranslation } from "react-i18next"

const ReviewDetailsPage = () => {
    const {t} = useTranslation()
    const location = useLocation()
    const isPreview = location.pathname === '/reviews/preview'
    
    return (
        <div className={cls.ReviewDetailsPage}>
            { isPreview && <EditButton /> }
            <Author />
            <ReviewDetails />
            
            <Like />
        </div>
    )
}

export default ReviewDetailsPage
