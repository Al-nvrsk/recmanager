import { Rating } from "@/entities/Rating"
import { Button, Space, Typography } from "antd"
import React from "react"
import { Assessment } from "../Assesment/Assesment"
import ReactQuill from "react-quill"
import { getReviewEditState } from "@/features/ReviewEdit"
import { useTranslation } from "react-i18next"

const {Text, Title} = Typography

export const ReviewDetails = () => {
    const ReviewState = getReviewEditState()
    const {t} = useTranslation()
    
    return (
        <div>
            <Title >
                {ReviewState.ReviewName}
            </Title>
            <Space>
                <Title level={4} >{ReviewState.TypeOfWork}:</Title>
                <Title level={2} >{ReviewState.TitleOfWork}</Title>
            </Space>
            <div>
                <Space direction={'vertical'}>
                    <Assessment rate={ReviewState.AuthRating} />
                    <Assessment rate={(ReviewState.AuthRating)/2} isUsers />
                    <Text> {t('My assessment:')} </Text>
                    <Rating isUsers={true}/>
                    <Space>
                        {ReviewState.Tags.map(tag => (
                            <Button type={'dashed'} key={tag} >{tag}</Button>
                        ))}
                    </Space>
                </Space>    
            </div>
            <Text>
                <ReactQuill
                    theme={'bubble'}
                    value={ReviewState.ReviewText}
                    readOnly={true}
                />
            </Text>
        </div>
    )
}
