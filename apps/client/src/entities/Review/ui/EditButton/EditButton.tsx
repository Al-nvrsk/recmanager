import { Button, Space } from "antd"
import React from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import cls from './EditButton.module.scss'
import { trpc } from "@/shared/hooks/trpc"
import { getReviewEditState } from "@/features/ReviewEdit"
import { getCurrentUser } from "@/entities/User"

export const EditButton = () => {
    const navigate = useNavigate()
    const {t} = useTranslation()
    const editedReviewState = getReviewEditState()
    const createReview = trpc.createReview.useMutation();
    const author = getCurrentUser()

    const onSave = async() => {
        const createdReview = await createReview.mutateAsync({authorId: author!.id, ...editedReviewState})
        console.log('review', createdReview)
    }
    
    return (
        <div className={cls.EditButton}>
            <Space size={'large'}>
                <Button
                    type={'primary'}
                    onClick={onSave}
                    loading = {createReview.isLoading}
                >
                    {t('Save')}
                </Button>
                <Button
                    type={'primary'}
                    danger
                    onClick={() => navigate(-1)}
                >
                    {t('Back')}
                </Button>
            </Space>
        </div>
    )
}
