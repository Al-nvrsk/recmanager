import { Space, Typography } from 'antd'
import cls from './Like.module.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { DislikeTwoTone, LikeTwoTone } from '@ant-design/icons'

const {Text} = Typography

interface LikeProps {
    reviewId?: string
    userId?: string
    onClose?: () => void 
}

export const Like = (props: LikeProps) => {
    const {reviewId, userId, onClose} = props
    const {t} = useTranslation()
    return (
        <Space direction={'horizontal'} className={cls.conteiner}>
                <Text className={cls.likeText}>
                    {t('Do you like this review?')}
                </Text>
                <DislikeTwoTone className={cls.Like} onClick={()=>console.log('closed')} />
                <LikeTwoTone className={cls.Like} />
            </Space>
    )
}
