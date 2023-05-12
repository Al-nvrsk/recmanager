import { getCurrentUser } from "@/entities/User"
import { CommentList, CreateComment } from "@/features/Comment"
import { Button, Space } from "antd"
import React from "react"
import { useState } from "react"
import { useTranslation } from "react-i18next"

interface ReviewDatailsPageComments {
    id: string
}

export const ReviewDatailsPageComments = (props: ReviewDatailsPageComments ) => {
    const { id } = props
    const currentUser = getCurrentUser()
    const [isOpen, setIsOpen] = useState(false)
    const {t} = useTranslation()

    return (
        <Space direction={'vertical'} size={'large'} style={{width:'100%'}}>
            {
            currentUser &&
            (!isOpen 
                ?   <Button onClick={() => setIsOpen(true)} type={'primary'}>
                        {t('Create new comment')}
                    </Button>
                :  <CreateComment setClose={setIsOpen} reviewId={id} />
            )
            }
            <CommentList id={id} addedNewComment={isOpen}  />
        </Space>
    )
}
