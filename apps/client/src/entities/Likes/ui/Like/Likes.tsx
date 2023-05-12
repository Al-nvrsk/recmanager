import { Space, Typography } from 'antd'
import cls from './Likes.module.scss'
import React, { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons'

const {Text} = Typography
interface LikeProps {
    likeStatus?: string
    setLikeStatus: (value: string) => void 
}

export const Likes = memo((props: LikeProps) => {
    const {setLikeStatus, likeStatus} = props
    const {t} = useTranslation()

    const onLiked = useCallback((status: string) => {
        setLikeStatus(status)
    }, [setLikeStatus])

    return (
        <Space direction={'horizontal'} className={cls.conteiner}>
                <Text className={cls.likeText}>
                    {t('Do you like this review?')}
                </Text>
                {likeStatus === 'liked'
                    ? <LikeFilled className={cls.liked} />
                    : <LikeOutlined className={cls.like}  onClick={() => onLiked('liked')} />
                }
                {likeStatus === 'disliked'
                    ? <DislikeFilled className={cls.liked} />
                    : <DislikeOutlined className={cls.like}  onClick={()=> onLiked('disliked')}/>
                }
            </Space>
    )
})
