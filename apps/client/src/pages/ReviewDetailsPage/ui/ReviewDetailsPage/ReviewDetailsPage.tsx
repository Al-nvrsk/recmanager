import React, { memo, useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import cls from './ReviewDatailsPage.module.scss'
import { ReviewDetails, getReviewEditState, getSetReviewEditState } from "@/entities/Review"
import { useTranslation } from "react-i18next"
import { getCurrentUser } from "@/entities/User"
import { Button, Space, Spin, Typography } from "antd"
import { getRouteMain } from "@/shared/const/router"
import { trpc } from "@/shared/hooks/trpc/trpc"
import { Likes } from "@/entities/Likes"
import { showNetworkError } from "@/shared/components/showNetworkError/showNetworlError"
import { Rating } from "@/entities/Rating"
import { useParams } from 'react-router-dom'
import { ReviewDatailsPageComments } from "../ReviewDatailsPageComments/ReviewDatailsPageComments"
import { Author } from "@/entities/Author"
import { Loader } from "@/shared/ui/Loader/Loader"

const {Text} = Typography

const ReviewDetailsPage = () => {
    const {t} = useTranslation()
    const { id } = useParams<{id: string}>();
    const isPreview =  id === 'preview'
    const reviewEditState = getReviewEditState()

    const currentUser = getCurrentUser()
    const navigate = useNavigate()
    const setReviewEditState = getSetReviewEditState()
    const [likeStatus, setLikeStatus] = useState('')
    const [myRate, setMyRate] = useState<number>()

    const getReview = trpc.getReview.useQuery({id: id || ''})
    const getLikesAndRate = trpc.getReviewRatings.useMutation()
    const updateReview = trpc.updateReview.useMutation();
    const getUser = trpc.getUser.useQuery({userId:getReview.data?.authorId || '', author: true})
    const sendLike = trpc.updateLikes.useMutation()
    const sendMyRate = trpc.updateRate.useMutation()

    useEffect( () => {
        if (getReview.data?.id && currentUser?.id) {
            getLikesAndRate.mutateAsync({reviewId: getReview.data.id, userId: currentUser.id})
        }
    },[getReview.data?.id, currentUser?.id])
    
    useEffect(() => {
        setLikeStatus(getLikesAndRate.data?.likeStatus)
        setMyRate(getLikesAndRate.data?.userRate)
    },[getLikesAndRate.isSuccess])


    useEffect(() => {
        if (likeStatus && getReview.data?.id && currentUser?.id) {
            sendLike.mutate({
                likeStatus,
                reviewId: getReview.data.id,
                userId: currentUser?.id,
                authorId: getReview.data.authorId
            })
        }
    }, [likeStatus])

    useEffect(() => {
        if (myRate && getReview.data?.id && currentUser?.id) {
            sendMyRate.mutateAsync({
                myRate,
                reviewId: getReview.data.id,
                userId: currentUser?.id,
                authorId: getReview.data.authorId
            })
        }
    }, [myRate])

    const onSave = useCallback(async() => {
        if (!currentUser?.id) {
            return}
            await updateReview.mutateAsync({authorId: currentUser.id, ...reviewEditState})
        }, [currentUser, reviewEditState])

    if (updateReview.isSuccess) {
        setReviewEditState()
        navigate(getRouteMain())
    }

    if (updateReview.isError) {
        showNetworkError()
    }

    if (getReview.isLoading && !reviewEditState) {
        return (
            <Loader />
        )
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
            
            {!isPreview &&
                <Author 
                    dateCreate={getReview.data?.createdAt}
                    dateUpdate={getReview.data?.updatedAt}
                    { ...getUser.data }
                />
            }

            <ReviewDetails reviewState={isPreview ? reviewEditState : getReview.data!} />
                {(currentUser && !isPreview) &&
                <>
                    <Space direction={'vertical'} size={'middle'} className={cls.assessment} >
                        <div >
                            <Text> {t('My assessment:')} </Text>
                            <Rating 
                                isUsers={true}
                                setRatingNumber={setMyRate}
                                ratingNumber={myRate}
                            />
                        </div>
                        <Likes 
                            likeStatus={likeStatus}
                            setLikeStatus={setLikeStatus}
                        />
                    </Space>
                </>
                }
                {(id && !isPreview) &&
                <ReviewDatailsPageComments id={id} />}
        </div>
    )
}

export default memo(ReviewDetailsPage)
