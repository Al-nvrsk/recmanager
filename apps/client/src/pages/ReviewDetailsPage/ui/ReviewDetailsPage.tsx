import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import cls from './ReviewDatailsPage.module.scss'
import { Author, ReviewDetails, getReviewEditState, getSetReviewEditState } from "@/entities/Review"
import { useTranslation } from "react-i18next"
import { getCurrentUser } from "@/entities/User"
import { Button, Space } from "antd"
import { getRouteMain } from "@/shared/const/router"
import { trpc } from "@/shared/hooks/trpc"
import { Likes } from "@/entities/Likes"
import { showNetworkError } from "@/shared/components/showNetworkError/showNetworlError"
import { Rating } from "@/entities/Rating"

const ReviewDetailsPage = () => {
    const {t} = useTranslation()
    const location = useLocation()
    const isPreview = location.pathname === '/reviews/preview'
    const reviewEditState = getReviewEditState()
    const currentUser = getCurrentUser()
    const navigate = useNavigate()
    const setReviewEditState = getSetReviewEditState()
    const [likeStatus, setLikeStatus] = useState('')
    const [myRate, setMyRate] = useState<number>()
    const getLikesAndRate = trpc.getReviewRatings.useMutation()
    const updateReview = trpc.updateReview.useMutation();
    const getUser = trpc.getUser.useQuery({userId:reviewEditState.authorId || '', author: true})
    const sendLike = trpc.updateLikes.useMutation()
    const sendMyRate = trpc.updateRate.useMutation()
    
    useEffect( () => {
        if (reviewEditState!.id && currentUser?.id) {
            getLikesAndRate.mutate({reviewId: reviewEditState!.id, userId: currentUser!.id})
        }
    },[])
    useEffect(() => {
        //TODO: fix types
        setLikeStatus(getLikesAndRate.data?.likeStatus)
        setMyRate(getLikesAndRate.data?.userRate)
    },[getLikesAndRate.isSuccess])

    useEffect(() => {
        if (likeStatus && reviewEditState.id && currentUser?.id) {
            sendLike.mutateAsync({likeStatus, reviewId: reviewEditState.id, userId: currentUser?.id})
        }
    }, [likeStatus])

    useEffect(() => {
        if (myRate && reviewEditState.id && currentUser?.id) {
            sendMyRate.mutateAsync({myRate, reviewId: reviewEditState.id, userId: currentUser?.id})
        }
    }, [myRate])

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

    return (
        <div className={cls.ReviewDetailsPage}>
            <div className={cls.EditButton}>
        <Space size={'large'}>

                {isPreview &&
                <Button
                        type={'primary'}
                        onClick={onSave}
                        loading = {updateReview.isLoading}
                    >
                        {t('Save')}
                    </Button>
                }

                <Button
                    type={'primary'}
                    danger
                    onClick={() => navigate(-1)}
                >
                    {t('Back')}
                </Button>
            </Space>
            </div>

            <Author dateCreate={reviewEditState.createdAt || ''} { ...getUser.data } />
            

            <ReviewDetails />
                <Rating 
                    isUsers={true}
                    setRatingNumber={setMyRate}
                    ratingNumber={myRate}
                />
                <Likes 
                    likeStatus={likeStatus}
                    setLikeStatus={setLikeStatus}
                />
        </div>
    )
}

export default ReviewDetailsPage
