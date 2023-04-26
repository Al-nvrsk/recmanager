import React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import cls from './ReviewDatailsPage.module.scss'
import { Author, ReviewDetails, getReviewEditState, getReviewsState, getSetReviewEditState } from "@/entities/Review"
import { useTranslation } from "react-i18next"
import { getCurrentUser } from "@/entities/User"
import { Button, Space } from "antd"
import { getRouteMain, getRouteReviewEdit } from "@/shared/const/router"
import { trpc } from "@/shared/hooks/trpc"
import { Likes } from "@/entities/Likes"
import { showNetworkError } from "@/shared/components/showNetworkError/showNetworlError"

const ReviewDetailsPage = () => {
    const {t} = useTranslation()
    const location = useLocation()
    const isPreview = location.pathname === '/reviews/preview'
    const reviewEditState = getReviewEditState()
    const currentUser = getCurrentUser()
    const navigate = useNavigate()
    const setReviewEditState = getSetReviewEditState()
    
        const updateReview = trpc.updateReview.useMutation();
        const onSave = async() => {
            await updateReview.mutateAsync({authorId: currentUser!.id, ...reviewEditState})
        }

        if (updateReview.isSuccess) {
            setReviewEditState()
            navigate(getRouteMain())
        }

        if (updateReview.isError) {
            showNetworkError()
        }

        console.log('reviewEditState', reviewEditState)

    return (
        <div className={cls.ReviewDetailsPage}>
            {/* { isPreview && <EditButton /> } */}
            <div className={cls.EditButton}>
        <Space size={'large'}>
            {/* { reviewEditState?.id
                ?  */}
                <Button
                        type={'primary'}
                        onClick={onSave}
                        loading = {updateReview.isLoading}
                    >
                        {t('Save')}
                    </Button>
                    {/* : null
            } */}
                <Button
                    type={'primary'}
                    danger
                    onClick={() => navigate(-1)}
                >
                    {t('Back')}
                </Button>
            </Space>
            </div>

            <Author />

            <ReviewDetails />
            
            <Likes />
        </div>
    )
}

export default ReviewDetailsPage
