import { Button, Space, Typography } from "antd"
import React from "react"
import { Assessment } from "../Assesment/Assesment"
import ReactQuill from "react-quill"
import { useTranslation } from "react-i18next"
import cls from './ReviewDetails.module.scss'
import { Review } from "../../model/types/Review"
import { EditReview } from "../../model/types/EditReview"

const {Text, Title} = Typography

interface ReviewDetailsProps {
    reviewState: Review | EditReview
}

export const ReviewDetails = ({reviewState}: ReviewDetailsProps) => {
    const {t} = useTranslation()

    if (!reviewState) {
        return (
            <div>
                <Text>
                    {t('No data')}
                </Text>
            </div>
        )
    }
    
    return (
        <div>
            <Title >
                {reviewState?.ReviewName}
            </Title>
            <Space>
                <Title level={4} className={cls.typeOfWork} >{reviewState.TypeOfWork}:</Title>
                <Title level={2} >{reviewState.TitleOfWork}</Title>
            </Space>
            <div>
                <Space direction={'vertical'}>
                    <Assessment rate={reviewState.AuthRating} />
                    {('rating' in reviewState) 
                        ? <Assessment rate={reviewState.rating} isUsers />
                        : null
                    }
                    <div className={cls.tags}>
                        {reviewState.Tags.map((tagValue) => ( 
                            (typeof tagValue === 'string')
                            ? <Button type={'dashed'} key={tagValue} >{tagValue}</Button>
                            : <Button type={'dashed'} key={tagValue.tag} >{tagValue.tag}</Button>
                        ))}
                    </div>
                </Space>    
            </div>
            <Text>
                <ReactQuill
                    theme={'bubble'}
                    value={reviewState.ReviewText}
                    readOnly={true}
                />
            </Text>
        </div>
    )
}
