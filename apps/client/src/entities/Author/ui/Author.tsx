import { LikeTwoTone } from "@ant-design/icons"
import { Avatar, Space, Typography, Image } from "antd"
import React, { memo } from "react"
import dayjs from 'dayjs'
import { noDataImg } from "@/shared/const/NoDataImg"
import cls from './Author.module.scss'

const {Text} = Typography

interface AuthorProps {
    dateCreate?: string
    dateUpdate?: string
    avatar?: string | null
    login?: string
    likedNumber?: number
}

export const Author = memo((props: AuthorProps ) => {
    const { 
        avatar, login, likedNumber, dateCreate, dateUpdate
    } = props

    const isEdited = !(dateUpdate === dateCreate)

    return (
        <Space direction={'horizontal'} className={cls.Author}>
            <Avatar src={
                <Image src={avatar || ''} style={{ width: 32, height: 32 }} fallback={noDataImg} />
                } 
            />
            <Text>
                {login}
            </Text>
            <Text>
                {likedNumber}
            </Text>
            <LikeTwoTone />
            <Text type={"secondary"} >
                {dayjs(isEdited ? dateUpdate : dateCreate).format('DD/MM/YYYY hh:mm')} 
            </Text>
            <Text type={"secondary"}>
                {isEdited && 'Edited'}
            </Text>
        </Space>
    )
})
