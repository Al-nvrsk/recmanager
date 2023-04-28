import { Rating } from "@/entities/Rating"
import { Button, Space, Typography } from "antd"
import React from "react"
import { Assessment } from "../Assesment/Assesment"
import ReactQuill from "react-quill"
import { useTranslation } from "react-i18next"
import cls from './ReviewDetails.module.scss'
import { getReviewEditState } from "../../model/selectors/getReviewEditState"

const {Text, Title} = Typography

export const ReviewDetails = () => {
    const ReviewState = getReviewEditState()
    const {t} = useTranslation()
    
    return (
        <div>
            <Title >
                {ReviewState?.ReviewName}
            </Title>
            <Space>
                <Title level={4} className={cls.typeOfWork} >{ReviewState.TypeOfWork}:</Title>
                <Title level={2} >{ReviewState.TitleOfWork}</Title>
            </Space>
            <div>
                <Space direction={'vertical'}>
                    <Assessment rate={ReviewState.AuthRating} />
                    <Assessment rate={(ReviewState.AuthRating)/2} isUsers />
                    <Text> {t('My assessment:')} </Text>
                    <div className={cls.tags}>
                        {ReviewState.Tags.map((tag) => (
                            <Button type={'dashed'} key={tag} >{tag}</Button>
                        ))}
                    </div>
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
